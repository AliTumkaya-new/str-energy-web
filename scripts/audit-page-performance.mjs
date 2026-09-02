import { chromium, devices } from "playwright";

const targetUrl = process.argv[2] ?? "http://127.0.0.1:3000/tr";
const waitMs = Number(process.argv[3] ?? 5000);
const screenshotPath = process.argv[4];
const browser = await chromium.launch({ headless: true });

try {
  const context = await browser.newContext({
    ...devices["Pixel 7"],
    serviceWorkers: "block",
  });
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__strAudit = { cls: 0, lcp: 0, longTasks: [] };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__strAudit.lcp = entry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__strAudit.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__strAudit.longTasks.push(entry.duration);
    }).observe({ type: "longtask", buffered: true });
  });

  await page.goto(targetUrl, { waitUntil: "load", timeout: 90_000 });
  await page.waitForTimeout(waitMs);

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const jsResources = resources.filter((entry) => entry.initiatorType === "script" || entry.name.includes("/_next/static/chunks/"));
    const bytes = (entries, key) => entries.reduce((sum, entry) => sum + (entry[key] || 0), 0);
    const firstContentfulPaint = performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
    const audit = window.__strAudit;

    return {
      url: location.href,
      domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
      loadMs: Math.round(navigation.loadEventEnd),
      firstContentfulPaintMs: Math.round(firstContentfulPaint),
      largestContentfulPaintMs: Math.round(audit.lcp),
      cumulativeLayoutShift: Number(audit.cls.toFixed(4)),
      totalBlockingTimeMs: Math.round(audit.longTasks.reduce((sum, duration) => sum + Math.max(0, duration - 50), 0)),
      requests: resources.length + 1,
      transferredKb: Math.round((bytes(resources, "transferSize") + navigation.transferSize) / 1024),
      encodedKb: Math.round((bytes(resources, "encodedBodySize") + navigation.encodedBodySize) / 1024),
      javascriptRequests: jsResources.length,
      javascriptTransferredKb: Math.round(bytes(jsResources, "transferSize") / 1024),
      domElements: document.querySelectorAll("*").length,
    };
  });

  if (screenshotPath) {
    await page.evaluate(async () => {
      const step = Math.max(320, Math.floor(window.innerHeight * 0.8));
      for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
        window.scrollTo(0, top);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }

  console.log(JSON.stringify(metrics, null, 2));
  await context.close();
} finally {
  await browser.close();
}
