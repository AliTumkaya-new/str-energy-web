import { NextResponse } from "next/server";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

import { analyzeCbamExcel, analyzeCbamRows } from "@/lib/cbamExcelAnalyzer";
import { publicEntitlement, readCbamSession, readCbamUsage, setCbamUsageCookie } from "@/lib/cbamProductSession";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".xlsx", ".xlsm", ".csv", ".txt", ".pdf"];

function fileExtension(fileName: string) {
  const lower = fileName.toLocaleLowerCase("tr-TR");
  return ALLOWED_EXTENSIONS.find((extension) => lower.endsWith(extension)) ?? "";
}

function isAllowedUpload(fileName: string) {
  return Boolean(fileExtension(fileName));
}

function publicErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message.includes("Cannot read properties") || message.includes("sheets")) {
    return "Excel dosyası okunamadı. Lütfen dosyayı .xlsx olarak yeniden kaydedip tekrar yükleyin.";
  }
  return message || "Excel dosyası analiz edilemedi.";
}

function splitDelimitedLine(line: string, delimiter: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

function parseDelimitedText(text: string) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const delimiter = [";", "\t", ","]
    .map((item) => ({
      item,
      score: lines.slice(0, 12).reduce((total, line) => total + splitDelimitedLine(line, item).length, 0),
    }))
    .sort((a, b) => b.score - a.score)[0]?.item ?? ";";

  return lines.map((line) => splitDelimitedLine(line, delimiter));
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pickNumber(text: string, aliases: string[]) {
  for (const alias of aliases) {
    const regex = new RegExp(`${escapeRegex(alias)}[^\\d\\-]{0,80}(-?\\d[\\d.,\\s]*)`, "i");
    const match = text.match(regex);
    if (match) return match[1].trim();
  }
  return "";
}

function pickText(text: string, aliases: string[]) {
  for (const alias of aliases) {
    const regex = new RegExp(`${escapeRegex(alias)}\\s*[:\\-]?\\s*([^\\n]{2,80})`, "i");
    const match = text.match(regex);
    if (match) return match[1].trim();
  }
  return "";
}

function rowsFromPdfText(text: string) {
  const delimitedRows = parseDelimitedText(text).filter((row) => row.length > 2);
  const hasLikelyHeader = delimitedRows.some((row) =>
    row.some((cell) => /elektrik|electricity|doğalgaz|dogalgaz|natural gas|üretim|uretim|production/i.test(cell)),
  );
  if (hasLikelyHeader) return delimitedRows;

  return [
    [
      "Ürün",
      "Tesis",
      "Elektrik Tüketimi (kWh)",
      "Doğalgaz Tüketimi (m3)",
      "Su Tüketimi (m3)",
      "Üretim Ağırlığı (kg)",
      "Toplam Emisyon (kgCO2e)",
    ],
    [
      pickText(text, ["Ürün Kodu", "Ürün", "Product", "Product Code"]) || "PDF toplamı",
      pickText(text, ["Tesis/Hat", "Tesis", "Facility", "Plant"]),
      pickNumber(text, ["Elektrik Tüketimi", "Elektrik", "Electricity Consumption", "Electricity"]),
      pickNumber(text, ["Doğalgaz Tüketimi", "Doğalgaz", "Dogalgaz", "Natural Gas"]),
      pickNumber(text, ["Su Tüketimi", "Su", "Water Consumption", "Water"]),
      pickNumber(text, ["Üretim Ağırlığı", "Üretim Miktarı", "Production Weight", "Production"]),
      pickNumber(text, ["Toplam Emisyon", "Total Emission"]),
    ],
  ];
}

async function analyzeUploadedFile(buffer: Buffer, fileName: string) {
  const extension = fileExtension(fileName);
  if (extension === ".xlsx" || extension === ".xlsm") return analyzeCbamExcel(buffer, fileName);
  if (extension === ".csv" || extension === ".txt") return analyzeCbamRows(parseDelimitedText(buffer.toString("utf8")), fileName, "Yüklenen tablo");
  if (extension === ".pdf") {
    const parsed = await pdfParse(buffer);
    const text = parsed.text.trim();
    if (!text) {
      throw new Error("PDF içinden metin okunamadı. Taranmış/görsel PDF için önce OCR yapılmış metinli PDF veya Excel/CSV yükleyin.");
    }
    return analyzeCbamRows(rowsFromPdfText(text), fileName, "PDF metni");
  }

  throw new Error("Desteklenen formatlar: .xlsx, .xlsm, .csv, .txt ve metin tabanlı .pdf.");
}

export async function POST(request: Request) {
  try {
    const session = readCbamSession(request);
    if (!session) {
      return NextResponse.json(
        { error: "Analiz yapabilmek için önce STR CBAM Export hesabınıza giriş yapın." },
        { status: 401 },
      );
    }
    const usage = readCbamUsage(request, session.email);
    const entitlement = publicEntitlement(usage);
    if (entitlement.remaining <= 0) {
      return NextResponse.json(
        {
          error: "Ücretsiz 3 analiz hakkınız doldu. Devam etmek için ücretli plana geçin.",
          entitlement,
          billingRequired: true,
        },
        { status: 402 },
      );
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "Excel dosyası en fazla 8 MB olabilir." },
        { status: 413 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Analiz için .xlsx, .xlsm, .csv, .txt veya metin tabanlı .pdf dosyası yükleyin." },
        { status: 400 },
      );
    }

    if (!isAllowedUpload(file.name)) {
      return NextResponse.json(
        { error: "Desteklenen formatlar: .xlsx, .xlsm, .csv, .txt ve metin tabanlı .pdf." },
        { status: 400 },
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "Excel dosyası en fazla 8 MB olabilir." },
        { status: 413 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await analyzeUploadedFile(buffer, file.name);
    const nextUsage = { ...usage, used: usage.used + 1 };
    const nextEntitlement = publicEntitlement(nextUsage);

    const response = NextResponse.json({ result, entitlement: nextEntitlement });
    setCbamUsageCookie(response, nextUsage);
    return response;
  } catch (error) {
    return NextResponse.json({ error: publicErrorMessage(error) }, { status: 422 });
  }
}
