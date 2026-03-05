import { spawn } from "node:child_process";
import { mkdir, rename } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import ffmpegStatic from "ffmpeg-static";
import { chromium } from "playwright";

const ROOT = process.cwd();
const VIDEO_DIR = path.join(ROOT, "artifacts", "videos");
const TEMP_VIDEO_DIR = path.join(VIDEO_DIR, ".tmp");
const VIDEO_LANG = process.env.VIDEO_LANG || "en";
const VIDEO_USE_MOCK = process.env.VIDEO_USE_MOCK !== "false";
const START_PORT = Number(process.env.VIDEO_PORT || 3300);
const TARGET_VIDEO_MS = Math.max(10_000, Number(process.env.VIDEO_DURATION_MS || 30_000));
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, "-");
const VIDEO_BASENAME = `live-energy-${VIDEO_LANG}-${TIMESTAMP}`;

let serverProcess;

try {
  console.log("Preparing recording...");
  await mkdir(VIDEO_DIR, { recursive: true });
  await mkdir(TEMP_VIDEO_DIR, { recursive: true });

  const port = await findFreePort(START_PORT, START_PORT + 40);
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Using base URL: ${baseUrl}`);

  serverProcess = startNextServer(port);
  console.log("Waiting for Next.js server...");
  await waitForServer(baseUrl, 120_000);
  console.log("Server is ready.");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: TEMP_VIDEO_DIR,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();
  const recordingStartedAt = Date.now();
  const videoHandle = page.video();
  if (!videoHandle) {
    throw new Error("Playwright video recording did not initialize.");
  }

  if (VIDEO_USE_MOCK) {
    await enableApiMocks(page);
  }

  await page.goto(`${baseUrl}/${VIDEO_LANG}`, {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  console.log(`Page loaded for language: ${VIDEO_LANG}`);

  await page.waitForLoadState("networkidle", { timeout: 120_000 }).catch(() => {});
  await page.addStyleTag({ content: "* { cursor: none !important; }" });
  await page.waitForTimeout(1_100);

  const liveSection = page.locator("#live-energy");
  if ((await liveSection.count()) === 0) {
    throw new Error("Could not find #live-energy section on the page.");
  }

  const liveSectionY = await page.$eval("#live-energy", (el) =>
    Math.max((el).getBoundingClientRect().top + window.scrollY - 72, 0)
  );

  await wheelToTarget(page, liveSectionY);
  await page.waitForTimeout(800);

  await runLiveEnergyShowcase(page);
  console.log("Turkey, Europe, and Global showcase completed.");

  await padVideoDuration(page, recordingStartedAt, TARGET_VIDEO_MS);

  await context.close();
  await browser.close();

  const rawVideoPath = await videoHandle.path();
  const webmOutputPath = path.join(VIDEO_DIR, `${VIDEO_BASENAME}.webm`);
  await rename(rawVideoPath, webmOutputPath);

  let mp4OutputPath = "";
  const ffmpegPath = ffmpegStatic || "";
  if (ffmpegPath) {
    mp4OutputPath = path.join(VIDEO_DIR, `${VIDEO_BASENAME}.mp4`);
    try {
      await transcodeToMp4(ffmpegPath, webmOutputPath, mp4OutputPath);
    } catch {
      mp4OutputPath = "";
    }
  }

  console.log(`WEBM video: ${webmOutputPath}`);
  if (mp4OutputPath) {
    console.log(`MP4 video: ${mp4OutputPath}`);
  } else {
    console.log("MP4 conversion skipped (Playwright FFmpeg binary not found).");
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  await stopProcessTree(serverProcess);
}

function startNextServer(port) {
  const command = process.platform === "win32"
    ? `npm run start -- --port ${port}`
    : `npm run start -- --port ${port}`;

  const child = spawn(command, {
    cwd: ROOT,
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout.on("data", (chunk) => {
    const text = chunk.toString();
    if (/error|failed/i.test(text)) {
      process.stdout.write(`[next] ${text}`);
    }
  });

  child.stderr.on("data", (chunk) => {
    const text = chunk.toString();
    if (text.trim()) {
      process.stderr.write(`[next] ${text}`);
    }
  });

  return child;
}

async function waitForServer(baseUrl, timeoutMs) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (serverProcess && serverProcess.exitCode !== null) {
      throw new Error(`Next.js server exited early with code ${serverProcess.exitCode}`);
    }

    try {
      const response = await fetch(baseUrl, {
        method: "GET",
        signal: AbortSignal.timeout(2_000),
      });
      if (response.ok || response.status < 500) {
        return;
      }
    } catch {
      // Keep polling.
    }
    await delay(700);
  }

  throw new Error(`Timed out waiting for Next.js server at ${baseUrl}`);
}

async function enableApiMocks(page) {
  await page.route("**/api/energy/realtime-generation", async (route) => {
    const requestBody = route.request().postData() || "";
    const matchedDate = requestBody.match(/\d{4}-\d{2}-\d{2}/);
    const baseDate = matchedDate ? matchedDate[0] : todayIsoDate();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ items: buildMockTrGenerationItems(baseDate) }),
    });
  });

  await page.route("**/api/energy/ptf", async (route) => {
    const requestBody = route.request().postData() || "";
    const matchedDate = requestBody.match(/\d{4}-\d{2}-\d{2}/);
    const baseDate = matchedDate ? matchedDate[0] : todayIsoDate();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ items: buildMockTrPtfItems(baseDate) }),
    });
  });

  await page.route("**/api/entsoe/day-ahead-prices", async (route) => {
    const requestBody = route.request().postData() || "";
    const matchedDate = requestBody.match(/\d{4}-\d{2}-\d{2}/);
    const baseDate = matchedDate ? matchedDate[0] : todayIsoDate();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ items: buildMockEuDayAheadItems(baseDate) }),
    });
  });

  await page.route("**/api/eia/generation", async (route) => {
    const requestBody = route.request().postData() || "";
    const startYearMatch = requestBody.match(/"startYear"\s*:\s*"(\d{4})"/);
    const endYearMatch = requestBody.match(/"endYear"\s*:\s*"(\d{4})"/);
    const startYear = startYearMatch ? Number(startYearMatch[1]) : 2021;
    const endYear = endYearMatch ? Number(endYearMatch[1]) : 2024;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ items: buildMockGlobalGenerationItems(startYear, endYear) }),
    });
  });

  await page.route("**/api/eia/prices", async (route) => {
    const requestBody = route.request().postData() || "";
    const startMonthMatch = requestBody.match(/"startMonth"\s*:\s*"(\d{4})-(\d{2})"/);
    const endMonthMatch = requestBody.match(/"endMonth"\s*:\s*"(\d{4})-(\d{2})"/);
    const sectorMatch = requestBody.match(/"sector"\s*:\s*"([A-Z]+)"/);
    const startYear = startMonthMatch ? Number(startMonthMatch[1]) : 2021;
    const endYear = endMonthMatch ? Number(endMonthMatch[1]) : 2024;
    const sector = sectorMatch ? sectorMatch[1] : "ALL";
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ items: buildMockGlobalPriceItems(startYear, endYear, sector) }),
    });
  });
}

function buildMockTrGenerationItems(dateIso) {
  const items = [];
  for (let hour = 0; hour < 24; hour += 1) {
    const hourLabel = String(hour + 1).padStart(2, "0");
    const wind = 1800 + Math.round(350 * Math.sin(hour / 3));
    const solar = Math.max(0, Math.round(2300 * Math.sin(((hour - 6) / 12) * Math.PI)));
    const naturalGas = 5400 + Math.round(450 * Math.cos(hour / 4));
    const hydro = 1200 + Math.round(260 * Math.sin(hour / 5));
    const total = naturalGas + wind + solar + hydro + 900;

    items.push({
      date: dateIso,
      hour: hourLabel,
      total,
      naturalGas,
      wind,
      solar,
      dammedHydro: hydro,
      lignite: 900,
    });
  }
  return items;
}

function buildMockTrPtfItems(dateIso) {
  const items = [];
  for (let hour = 0; hour < 24; hour += 1) {
    items.push({
      date: dateIso,
      hour: String(hour + 1).padStart(2, "0"),
      price: Number((2410 + 160 * Math.sin(hour / 2.8)).toFixed(2)),
    });
  }
  return items;
}

function buildMockEuDayAheadItems(dateIso) {
  const items = [];
  for (let hour = 0; hour < 24; hour += 1) {
    items.push({
      date: dateIso,
      hour: String(hour + 1).padStart(2, "0"),
      price: Number((72 + 8 * Math.sin(hour / 3)).toFixed(2)),
      currency: "EUR",
    });
  }
  return items;
}

function buildMockGlobalGenerationItems(startYear, endYear) {
  const products = ["Natural Gas", "Coal", "Nuclear", "Renewables"];
  const items = [];
  const safeStart = Math.min(startYear, endYear);
  const safeEnd = Math.max(startYear, endYear);

  for (let year = safeStart; year <= safeEnd; year += 1) {
    for (let i = 0; i < products.length; i += 1) {
      items.push({
        period: String(year),
        product: products[i],
        value: Number((340 + i * 45 + (year - safeStart) * 7.5).toFixed(2)),
        unit: "Billion kWh",
        country: "USA",
      });
    }
  }

  return items;
}

function buildMockGlobalPriceItems(startYear, endYear, sector) {
  const items = [];
  const safeStart = Math.min(startYear, endYear);
  const safeEnd = Math.max(startYear, endYear);
  const baseBySector = {
    ALL: 12.1,
    RES: 14.4,
    COM: 11.8,
    IND: 8.9,
  };
  const base = baseBySector[sector] ?? baseBySector.ALL;

  for (let year = safeStart; year <= safeEnd; year += 1) {
    for (let month = 1; month <= 12; month += 3) {
      const mm = String(month).padStart(2, "0");
      items.push({
        period: `${year}-${mm}`,
        sector,
        price: Number((base + (year - safeStart) * 0.18 + month * 0.03).toFixed(2)),
        unit: "cents/kWh",
        state: "U.S. Average",
      });
    }
  }

  return items;
}

function todayIsoDate() {
  const d = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

async function wheelToTarget(page, targetY) {
  let attempts = 0;
  let currentY = await page.evaluate(() => window.scrollY);

  while (Math.abs(currentY - targetY) > 6 && attempts < 420) {
    const delta = targetY - currentY;
    const step = Math.sign(delta) * Math.min(140, Math.max(30, Math.abs(delta) * 0.35));
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(70);
    currentY = await page.evaluate(() => window.scrollY);
    attempts += 1;
  }
}

async function runLiveEnergyShowcase(page) {
  await centerOnLiveSection(page, 300);

  await runTurkeyFlow(page);
  await page.waitForTimeout(350);

  await runEuropeFlow(page);
  await page.waitForTimeout(350);

  await runGlobalFlow(page);
  await centerOnLiveSection(page, 350);
}

async function runTurkeyFlow(page) {
  await clickRegion(page, "tr");
  await centerOnLiveSection(page, 120);
  const targetIso = await isoDateDaysBack(page, 3);
  await pickDateSlow(page, "start", targetIso);
  await page.waitForTimeout(140);
  await pickDateSlow(page, "end", targetIso);
  await page.waitForTimeout(220);
  await triggerQueryAndRequireRows(page, 24_000);
  await page.waitForTimeout(420);
  await selectOptionSlow(page, '[data-testid="live-dataset-tr"]', "ptf", 420);
  await page.waitForTimeout(160);
  await triggerQueryAndRequireRows(page, 24_000);
  await page.waitForTimeout(420);
}

async function runEuropeFlow(page) {
  await clickRegion(page, "eu");
  await centerOnLiveSection(page, 120);
  await selectOptionSlow(page, '[data-testid="live-dataset-eu"]', "eu-day-ahead", 320);
  await page.waitForTimeout(160);
  await triggerQueryAndRequireRows(page, 24_000);
  await page.waitForTimeout(500);
}

async function runGlobalFlow(page) {
  await clickRegion(page, "global");
  await centerOnLiveSection(page, 180);
  await selectOptionSlow(page, '[data-testid="live-dataset-global"]', "gl-generation", 260);
  await selectOptionSlow(page, '[data-testid="live-global-country"]', "USA", 260);
  await selectOptionSlow(page, '[data-testid="live-dataset-global"]', "gl-prices", 300);
  await selectOptionSlow(page, '[data-testid="live-global-sector"]', "COM", 320);
  await selectGlobalYearsSlow(page, "2020", "2023");
  await page.waitForTimeout(180);
  await triggerQueryAndRequireRows(page, 24_000);
  await page.waitForTimeout(650);
}

async function clickRegion(page, key) {
  const button = page.locator(`[data-testid="live-region-${key}"]`);
  await button.waitFor({ state: "visible", timeout: 20_000 });
  await button.click();
  await page.waitForTimeout(360);
}

async function centerOnLiveSection(page, settleMs = 0) {
  const targetY = await page.$eval("#live-energy", (el) =>
    Math.max((el).getBoundingClientRect().top + window.scrollY - 78, 0)
  );
  await wheelToTarget(page, targetY);
  if (settleMs > 0) {
    await page.waitForTimeout(settleMs);
  }
}

async function isoDateDaysBack(page, daysBack) {
  return page.evaluate((days) => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - days);
    const pad = (value) => String(value).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, daysBack);
}

async function pickDateSlow(page, side, dateIso) {
  const toggle = page.locator(`[data-testid="live-${side}-date-toggle"]`);
  await toggle.click();
  await page.waitForTimeout(420);

  const dayOption = page.locator(`[data-testid="live-${side}-date-option-${dateIso}"]`);
  const prevButton = page.locator(`[data-testid="live-${side}-month-prev"]`);

  for (let i = 0; i < 24; i += 1) {
    const hasDayOption = (await dayOption.count()) > 0;
    if (hasDayOption) {
      const target = dayOption.first();
      const visible = await target.isVisible().catch(() => false);
      if (visible) {
        await target.hover().catch(() => {});
        await page.waitForTimeout(180);
        await target.click();
        await page.waitForTimeout(220);
        return;
      }
    }

    await prevButton.click();
    await page.waitForTimeout(220);
  }

  throw new Error(`Could not select ${side} date option ${dateIso}`);
}

async function selectGlobalYearsSlow(page, startYear, endYear) {
  const startYearSelect = page.locator('[data-testid="live-global-start-year"]');
  const endYearSelect = page.locator('[data-testid="live-global-end-year"]');
  await startYearSelect.waitFor({ state: "visible", timeout: 20_000 });
  await endYearSelect.waitFor({ state: "visible", timeout: 20_000 });
  await startYearSelect.selectOption(startYear);
  await page.waitForTimeout(250);
  await endYearSelect.selectOption(endYear);
  await page.waitForTimeout(250);
}

async function selectOptionSlow(page, selector, value, settleMs = 550) {
  const select = page.locator(selector);
  await select.waitFor({ state: "visible", timeout: 20_000 });
  await select.click();
  await page.waitForTimeout(100);
  await select.selectOption(value);
  await page.waitForTimeout(settleMs);
}

async function triggerQueryAndRequireRows(page, timeoutMs) {
  const queryButton = page.locator('[data-testid="live-query-button"]');
  await queryButton.waitFor({ state: "visible", timeout: 30_000 });
  const state = await triggerQueryAndReadState(page, queryButton, timeoutMs);
  if (state === "rows") return;
  if (state === "error") {
    const errorText = await page
      .locator('[data-testid="live-query-error"]')
      .first()
      .innerText()
      .catch(() => "Unknown query error");
    throw new Error(`Live query failed: ${errorText.trim()}`);
  }
  throw new Error("Live query completed without visible rows.");
}

async function triggerQueryAndReadState(page, buttonLocator, timeoutMs) {
  const rowsLocator = page.locator("#live-energy table tbody tr");
  const errorLocator = page.locator('[data-testid="live-query-error"]');

  await buttonLocator.click({ force: true });
  await waitForQueryCycle(buttonLocator, timeoutMs);

  const stateWindowStartedAt = Date.now();
  while (Date.now() - stateWindowStartedAt < 5_000) {
    if ((await errorLocator.count()) > 0) return "error";
    const rowsNow = await rowsLocator.count();
    if (rowsNow > 0) return "rows";
    await page.waitForTimeout(80);
  }

  return "empty";
}

async function waitForQueryCycle(buttonLocator, timeoutMs) {
  const startedAt = Date.now();
  let sawDisabled = false;

  while (Date.now() - startedAt < timeoutMs) {
    const isDisabled = await buttonLocator.isDisabled();
    if (isDisabled) {
      sawDisabled = true;
    }
    if (sawDisabled && !isDisabled) {
      return;
    }
    if (!sawDisabled && Date.now() - startedAt > 900) {
      return;
    }
    await delay(70);
  }
}

async function padVideoDuration(page, recordingStartedAt, targetDurationMs) {
  const elapsed = Date.now() - recordingStartedAt;
  const remaining = targetDurationMs - elapsed;
  if (remaining > 0) {
    await page.waitForTimeout(remaining);
  }
}

async function transcodeToMp4(ffmpegPath, inputPath, outputPath) {
  try {
    await runCommand(ffmpegPath, [
      "-y",
      "-i",
      inputPath,
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-an",
      outputPath,
    ]);
  } catch {
    await runCommand(ffmpegPath, [
      "-y",
      "-i",
      inputPath,
      "-c:v",
      "mpeg4",
      "-q:v",
      "5",
      "-an",
      outputPath,
    ]);
  }
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      shell: process.platform === "win32",
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(stderr || `${command} failed with exit code ${code}`));
    });
  });
}

async function findFreePort(start, end) {
  for (let port = start; port <= end; port += 1) {
    if (await isPortFree(port)) {
      return port;
    }
  }
  throw new Error(`No free port available in range ${start}-${end}`);
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const tester = net.createServer();
    tester.once("error", () => resolve(false));
    tester.once("listening", () => {
      tester.close(() => resolve(true));
    });
    tester.listen(port);
  });
}

async function stopProcessTree(child) {
  if (!child || child.exitCode !== null) return;

  if (process.platform === "win32") {
    try {
      await runCommand("taskkill", ["/PID", String(child.pid), "/T", "/F"]);
    } catch {
      // Ignore shutdown errors.
    }
    return;
  }

  child.kill("SIGTERM");
  await delay(600);
  if (child.exitCode === null) {
    child.kill("SIGKILL");
  }
}
