import ExcelJS from "exceljs";
import JSZip from "jszip";

import type {
  CbamExcelAnalysisResult,
  CbamExcelFactor,
  CbamExcelFactorKey,
  CbamExcelProductSummary,
} from "@/lib/cbamExcelTypes";

type FieldKey =
  | "period"
  | "product"
  | "cnCode"
  | "facility"
  | "electricityKwh"
  | "naturalGasM3"
  | "waterM3"
  | "productionTon"
  | "productionKg"
  | "productionAmount"
  | "electricityEmissionKg"
  | "naturalGasEmissionKg"
  | "waterEmissionKg"
  | "totalEmissionKg"
  | "dataQuality"
  | "dataSource";

type HeaderMatch = {
  field: FieldKey;
  label: string;
  column: number;
};

type RowValues = Partial<Record<FieldKey, string | number>>;

type CellLike = {
  value: unknown;
  text: string;
};

type RowLike = {
  eachCell: (options: { includeEmpty: boolean }, callback: (cell: CellLike, column: number) => void) => void;
  getCell: (column: number) => CellLike;
};

type WorksheetLike = {
  name: string;
  rowCount: number;
  columnCount: number;
  getRow: (rowNumber: number) => RowLike;
};

export const DEFAULT_CBAM_FACTORS: CbamExcelFactor[] = [
  {
    key: "electricity",
    label: "Elektrik",
    activityUnit: "kWh",
    factor: 0.42,
    factorUnit: "kgCO2e / kWh",
    note: "Ön analiz varsayımıdır; ülke, tedarikçi veya tesis özelindeki doğrulanmış faktörle değiştirilmelidir.",
  },
  {
    key: "naturalGas",
    label: "Doğalgaz",
    activityUnit: "m3",
    factor: 1.93,
    factorUnit: "kgCO2e / m3",
    note: "Alt ısıl değer ve gaz kompozisyonuna göre doğrulanmalıdır.",
  },
  {
    key: "water",
    label: "Su",
    activityUnit: "m3",
    factor: 0.344,
    factorUnit: "kgCO2e / m3",
    note: "Operasyonel çevresel etki ön görünümü içindir; CBAM ürün emisyon metodolojisinde ayrıca değerlendirilmelidir.",
  },
];

const REQUIRED_FIELD_GROUPS: Array<{ label: string; fields: FieldKey[] }> = [
  { label: "Elektrik tüketimi veya elektrik emisyonu", fields: ["electricityKwh", "electricityEmissionKg"] },
  { label: "Doğalgaz tüketimi veya doğalgaz emisyonu", fields: ["naturalGasM3", "naturalGasEmissionKg"] },
  { label: "Üretim miktarı veya üretim ağırlığı", fields: ["productionTon", "productionKg", "productionAmount"] },
];

function normalizeHeader(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "");
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function textValueForField(field: FieldKey, value: unknown) {
  if (field === "period" && typeof value === "number" && value > 20000 && value < 80000) {
    const date = new Date(Date.UTC(1899, 11, 30 + value));
    return date.toISOString().slice(0, 10);
  }
  return normalizeText(value);
}

function classifyHeader(label: string): FieldKey | null {
  const normalized = normalizeHeader(label);
  if (!normalized) return null;

  if (["donem", "ay", "tarih", "period", "date", "month"].includes(normalized)) return "period";
  if (["urun", "urunadi", "rn", "product", "productname", "malzeme", "sku"].includes(normalized)) return "product";
  if (normalized.includes("urun") && !normalized.includes("birim")) return "product";
  if (normalized.includes("productname")) return "product";
  if (
    ["cn", "cncode", "cnkodu", "gtip", "gtipkodu", "hscode", "hstariff", "customscode", "tariffcode"].includes(
      normalized,
    )
  ) {
    return "cnCode";
  }
  if ((normalized.includes("cn") || normalized.includes("gtip") || normalized.includes("hs")) && normalized.includes("kod")) {
    return "cnCode";
  }
  if (
    ["tesis", "facility", "plant", "lokasyon", "isletme", "tesishat", "hat"].includes(normalized) ||
    normalized.includes("tesis") ||
    normalized.includes("facility") ||
    normalized.includes("plant")
  ) {
    return "facility";
  }

  if (normalized.includes("verikaynagi") || normalized.includes("datasource") || normalized.includes("source")) {
    return "dataSource";
  }

  if (
    normalized.includes("verikalitesi") ||
    normalized.includes("kalitepuani") ||
    normalized.includes("qualityscore") ||
    normalized.includes("dataquality")
  ) {
    return "dataQuality";
  }

  if (normalized.includes("toplam") && normalized.includes("emisyon")) return "totalEmissionKg";
  if ((normalized.includes("elektrik") || normalized.includes("electricity")) && normalized.includes("emisyon")) {
    return "electricityEmissionKg";
  }
  if (
    (normalized.includes("dogalgaz") || normalized.includes("naturalgas") || normalized.includes("fuelgas") || normalized.includes("gaz")) &&
    normalized.includes("emisyon")
  ) {
    return "naturalGasEmissionKg";
  }
  if ((normalized.includes("su") || normalized.includes("water")) && normalized.includes("emisyon")) return "waterEmissionKg";

  if (
    (normalized.includes("elektrik") || normalized.includes("electricity")) &&
    (normalized.includes("kwh") || normalized.includes("tuketim") || normalized.includes("consumption"))
  ) {
    return "electricityKwh";
  }
  if (normalized === "kwh" || normalized === "elektrikkwh" || normalized === "electricitykwh") {
    return "electricityKwh";
  }

  if (
    normalized.includes("dogalgaz") ||
    normalized.includes("naturalgas") ||
    normalized.includes("fuelgas") ||
    normalized.includes("gaz") ||
    normalized.includes("gazm3") ||
    normalized.includes("gassm3")
  ) {
    return "naturalGasM3";
  }
  if (["sm3", "nm3", "m3gaz", "m3gas"].includes(normalized)) return "naturalGasM3";

  if (
    (normalized.includes("su") || normalized.includes("water")) &&
    (normalized.includes("m3") || normalized.includes("tuketim") || normalized.includes("consumption"))
  ) {
    return "waterM3";
  }
  if (normalized === "sum3" || normalized === "waterm3") return "waterM3";

  if (
    (normalized.includes("uretim") ||
      normalized.includes("retim") ||
      normalized.includes("tonaj") ||
      normalized.includes("production") ||
      normalized.includes("output")) &&
    (normalized.includes("kg") || normalized.includes("agirlik") || normalized.includes("weight"))
  ) {
    return "productionKg";
  }
  if (
    (normalized.includes("uretim") ||
      normalized.includes("retim") ||
      normalized.includes("tonaj") ||
      normalized.includes("production") ||
      normalized.includes("output")) &&
    normalized.includes("ton")
  ) {
    return "productionTon";
  }
  if (
    (normalized.includes("uretim") || normalized.includes("retim") || normalized.includes("production") || normalized.includes("output")) &&
    (normalized.includes("adet") || normalized.includes("piece") || normalized.includes("pcs") || normalized.includes("miktar") || normalized.includes("amount"))
  ) {
    return "productionAmount";
  }
  if (["ton", "tonurun", "productionton", "uretimton"].includes(normalized)) return "productionTon";

  return null;
}

function cellDisplayValue(cell: CellLike) {
  if (cell.value instanceof Date) return cell.value.toISOString().slice(0, 10);
  if (typeof cell.value === "object" && cell.value && "text" in cell.value) {
    return String(cell.value.text ?? "");
  }
  if (typeof cell.value === "object" && cell.value && "result" in cell.value) {
    return String(cell.value.result ?? "");
  }
  return cell.text || String(cell.value ?? "");
}

function getHeaderRowCandidate(worksheet: WorksheetLike) {
  let best:
    | {
        rowNumber: number;
        matches: HeaderMatch[];
      }
    | null = null;

  const maxScanRows = Math.min(10, worksheet.rowCount);
  for (let rowNumber = 1; rowNumber <= maxScanRows; rowNumber += 1) {
    const row = worksheet.getRow(rowNumber);
    const matches = new Map<FieldKey, HeaderMatch>();

    row.eachCell({ includeEmpty: false }, (cell, column) => {
      const label = normalizeText(cellDisplayValue(cell));
      const field = classifyHeader(label);
      if (field && !matches.has(field)) matches.set(field, { field, label, column });
    });

    const current = Array.from(matches.values());
    if (!best || current.length > best.matches.length) best = { rowNumber, matches: current };
  }

  return best;
}

function selectWorksheet(worksheets: WorksheetLike[]) {
  const candidates = worksheets
    .map((worksheet) => {
      const header = getHeaderRowCandidate(worksheet);
      if (!header) return null;
      const fields = new Set(header.matches.map((match) => match.field));
      const requiredScore = REQUIRED_FIELD_GROUPS.reduce(
        (score, group) => score + (group.fields.some((field) => fields.has(field)) ? 6 : 0),
        0,
      );

      return {
        worksheet,
        header,
        score: requiredScore + header.matches.length,
      };
    })
    .filter((item): item is { worksheet: WorksheetLike; header: { rowNumber: number; matches: HeaderMatch[] }; score: number } =>
      Boolean(item),
    )
    .sort((a, b) => b.score - a.score);

  const selected = candidates[0];
  if (!selected || selected.score <= 0) {
    throw new Error("Excel başlıkları okunamadı. İlk satırlarda elektrik, doğalgaz, su veya üretim kolonları bulunamadı.");
  }

  return selected;
}

function parseNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (value instanceof Date) return 0;

  const raw = String(value ?? "")
    .trim()
    .replace(/\s/g, "")
    .replace(/[^\d,.-]/g, "");

  if (!raw) return 0;

  const hasComma = raw.includes(",");
  const hasDot = raw.includes(".");
  let normalized = raw;

  if (hasComma && hasDot) {
    normalized = raw.lastIndexOf(",") > raw.lastIndexOf(".")
      ? raw.replace(/\./g, "").replace(",", ".")
      : raw.replace(/,/g, "");
  } else if (hasComma) {
    normalized = raw.replace(",", ".");
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function emissionFor(value: number, factorKey: CbamExcelFactorKey) {
  const factor = DEFAULT_CBAM_FACTORS.find((item) => item.key === factorKey);
  return factor ? (value * factor.factor) / 1000 : 0;
}

function isTextField(field: FieldKey) {
  return field === "product" || field === "period" || field === "cnCode" || field === "facility" || field === "dataSource";
}

function round(value: number, digits = 3) {
  const multiplier = 10 ** digits;
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}

function isOpenXmlWorkbook(buffer: Buffer) {
  return buffer.length > 4 && buffer[0] === 0x50 && buffer[1] === 0x4b;
}

function excelReadErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (
    message.includes("sheets") ||
    message.includes("Corrupted zip") ||
    message.includes("end of central directory") ||
    message.includes("Can't find end of central directory")
  ) {
    return "Excel dosyası okunamadı. Lütfen dosyayı Excel veya Google Sheets içinde .xlsx olarak yeniden kaydedip tekrar yükleyin.";
  }

  return "Excel dosyası okunamadı. Dosyanın bozuk olmadığından ve .xlsx/.xlsm formatında olduğundan emin olun.";
}

function xmlDecode(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function xmlAttribute(source: string, name: string) {
  const match = source.match(new RegExp(`\\b${name}="([^"]*)"`, "i"));
  return match ? xmlDecode(match[1]) : "";
}

function columnIndexFromRef(ref: string) {
  const letters = ref.replace(/[^A-Za-z]/g, "").toUpperCase();
  let index = 0;
  for (const letter of letters) {
    index = index * 26 + letter.charCodeAt(0) - 64;
  }
  return Math.max(1, index);
}

function matrixWorksheet(name: string, rows: unknown[][]): WorksheetLike {
  const columnCount = rows.reduce((max, row) => Math.max(max, row.length), 0);
  return {
    name,
    rowCount: rows.length,
    columnCount,
    getRow(rowNumber: number) {
      const row = rows[rowNumber - 1] ?? [];
      return {
        eachCell(options, callback) {
          const maxColumn = options.includeEmpty ? columnCount : row.length;
          for (let index = 0; index < maxColumn; index += 1) {
            const value = row[index];
            if (!options.includeEmpty && (value === undefined || value === null || value === "")) continue;
            callback({ value, text: String(value ?? "") }, index + 1);
          }
        },
        getCell(column: number) {
          const value = row[column - 1];
          return { value, text: String(value ?? "") };
        },
      };
    },
  };
}

export async function analyzeCbamExcel(buffer: Buffer, fileName: string): Promise<CbamExcelAnalysisResult> {
  if (!isOpenXmlWorkbook(buffer)) {
    throw new Error("Yüklenen dosya gerçek bir .xlsx/.xlsm Excel dosyası gibi görünmüyor. Lütfen dosyayı .xlsx olarak dışa aktarın ve tekrar yükleyin.");
  }

  return analyzeCbamWorksheets(await loadWorkbookWorksheets(buffer), fileName);
}

export function analyzeCbamRows(rows: unknown[][], fileName: string, sheetName = "Yüklenen veri"): CbamExcelAnalysisResult {
  return analyzeCbamWorksheets([matrixWorksheet(sheetName, rows)], fileName);
}

function excelJsWorksheet(worksheet: ExcelJS.Worksheet): WorksheetLike {
  return {
    name: worksheet.name,
    rowCount: worksheet.rowCount,
    columnCount: worksheet.columnCount,
    getRow(rowNumber: number) {
      const row = worksheet.getRow(rowNumber);
      return {
        eachCell(options, callback) {
          row.eachCell(options, (cell, column) => callback(cell as CellLike, column));
        },
        getCell(column: number) {
          return row.getCell(column) as CellLike;
        },
      };
    },
  };
}

function worksheetTargetPath(target: string) {
  const normalized = target.replace(/^\/+/, "");
  return normalized.startsWith("xl/") ? normalized : `xl/${normalized}`;
}

function parseSharedStrings(xml: string) {
  const values: string[] = [];
  const siRegex = /<(?:\w+:)?si\b[^>]*>([\s\S]*?)<\/(?:\w+:)?si>/g;
  let match: RegExpExecArray | null;
  while ((match = siRegex.exec(xml))) {
    const parts = [...match[1].matchAll(/<(?:\w+:)?t\b[^>]*>([\s\S]*?)<\/(?:\w+:)?t>/g)].map((part) => xmlDecode(part[1]));
    values.push(parts.join(""));
  }
  return values;
}

function parseWorksheetXml(xml: string, sharedStrings: string[]) {
  const rows: unknown[][] = [];
  const rowRegex = /<(?:\w+:)?row\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?row>/g;
  let rowMatch: RegExpExecArray | null;

  while ((rowMatch = rowRegex.exec(xml))) {
    const rowNumber = Number(xmlAttribute(rowMatch[1], "r")) || rows.length + 1;
    const row: unknown[] = rows[rowNumber - 1] ?? [];
    const cellRegex = /<(?:\w+:)?c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/(?:\w+:)?c>)/g;
    let cellMatch: RegExpExecArray | null;

    while ((cellMatch = cellRegex.exec(rowMatch[2]))) {
      const attrs = cellMatch[1];
      const body = cellMatch[2] ?? "";
      const ref = xmlAttribute(attrs, "r");
      const type = xmlAttribute(attrs, "t");
      const column = ref ? columnIndexFromRef(ref) : row.length + 1;
      const valueMatch = body.match(/<(?:\w+:)?v\b[^>]*>([\s\S]*?)<\/(?:\w+:)?v>/);
      const inlineMatch = body.match(/<(?:\w+:)?t\b[^>]*>([\s\S]*?)<\/(?:\w+:)?t>/);
      const raw = valueMatch ? xmlDecode(valueMatch[1]) : inlineMatch ? xmlDecode(inlineMatch[1]) : "";

      let value: unknown = raw;
      if (type === "s") {
        value = sharedStrings[Number(raw)] ?? raw;
      } else if (type !== "str" && type !== "inlineStr" && raw !== "") {
        const numeric = Number(raw);
        value = Number.isFinite(numeric) ? numeric : raw;
      }

      row[column - 1] = value;
    }

    rows[rowNumber - 1] = row;
  }

  return rows;
}

async function loadOpenXmlWorksheets(buffer: Buffer) {
  const zip = await JSZip.loadAsync(buffer);
  const workbookXml = await zip.file("xl/workbook.xml")?.async("string");
  const relsXml = await zip.file("xl/_rels/workbook.xml.rels")?.async("string");
  if (!workbookXml || !relsXml) throw new Error(excelReadErrorMessage(new Error("Missing workbook XML")));

  const sharedStringsXml = await zip.file("xl/sharedStrings.xml")?.async("string");
  const sharedStrings = sharedStringsXml ? parseSharedStrings(sharedStringsXml) : [];
  const rels = new Map<string, string>();
  const relRegex = /<Relationship\b([^>]*)\/?>/g;
  let relMatch: RegExpExecArray | null;
  while ((relMatch = relRegex.exec(relsXml))) {
    const type = xmlAttribute(relMatch[1], "Type");
    if (!type.includes("/worksheet")) continue;
    rels.set(xmlAttribute(relMatch[1], "Id"), worksheetTargetPath(xmlAttribute(relMatch[1], "Target")));
  }

  const worksheets: WorksheetLike[] = [];
  const sheetRegex = /<(?:\w+:)?sheet\b([^>]*)\/?>/g;
  let sheetMatch: RegExpExecArray | null;
  while ((sheetMatch = sheetRegex.exec(workbookXml))) {
    const attrs = sheetMatch[1];
    const name = xmlAttribute(attrs, "name") || `Sheet ${worksheets.length + 1}`;
    const relationId = xmlAttribute(attrs, "r:id");
    const target = rels.get(relationId);
    if (!target) continue;
    const sheetXml = await zip.file(target)?.async("string");
    if (!sheetXml) continue;
    worksheets.push(matrixWorksheet(name, parseWorksheetXml(sheetXml, sharedStrings)));
  }

  if (worksheets.length === 0) throw new Error("Excel dosyasında okunabilir çalışma sayfası bulunamadı.");
  return worksheets;
}

async function loadWorkbookWorksheets(buffer: Buffer) {
  const workbook = new ExcelJS.Workbook();
  const excelBuffer = buffer as unknown as Parameters<typeof workbook.xlsx.load>[0];
  try {
    await workbook.xlsx.load(excelBuffer);
    return workbook.worksheets.map(excelJsWorksheet);
  } catch {
    return loadOpenXmlWorksheets(buffer);
  }
}

function qualityScore({
  rowsParsed,
  rowsSkipped,
  missingColumns,
  hasProductColumn,
  hasPeriodColumn,
}: {
  rowsParsed: number;
  rowsSkipped: number;
  missingColumns: string[];
  hasProductColumn: boolean;
  hasPeriodColumn: boolean;
}) {
  let score = 100;
  score -= missingColumns.length * 12;
  if (!hasProductColumn) score -= 8;
  if (!hasPeriodColumn) score -= 6;
  if (rowsParsed === 0) score -= 50;
  if (rowsSkipped > 0) score -= Math.min(18, rowsSkipped * 2);
  return Math.max(0, Math.min(100, score));
}

function buildWarnings({
  rowsParsed,
  rowsSkipped,
  missingColumns,
  productionTon,
  hasProductColumn,
}: {
  rowsParsed: number;
  rowsSkipped: number;
  missingColumns: string[];
  productionTon: number;
  hasProductColumn: boolean;
}) {
  const warnings: string[] = [];

  if (rowsParsed === 0) warnings.push("Hesaplanabilir veri satırı bulunamadı.");
  if (rowsSkipped > 0) warnings.push(`${rowsSkipped} satırda okunabilir faaliyet verisi bulunamadığı için hesap dışı bırakıldı.`);
  if (missingColumns.length > 0) warnings.push(`Eksik veya eşleşmeyen kritik kolon: ${missingColumns.join(", ")}.`);
  if (productionTon <= 0) warnings.push("Üretim miktarı bulunamadığı için ürün başına emisyon yoğunluğu hesaplanamadı.");
  if (!hasProductColumn) warnings.push("Ürün kolonu bulunamadı; tüm satırlar tesis toplamı olarak gruplandı.");

  warnings.push("Sonuçlar ön analiz amaçlıdır; resmi CBAM/kurumsal raporlama için doğrulanmış emisyon faktörleri ve metodoloji kullanılmalıdır.");
  return warnings;
}

function analyzeCbamWorksheets(worksheets: WorksheetLike[], fileName: string): CbamExcelAnalysisResult {
  const { worksheet, header } = selectWorksheet(worksheets);
  const { rowNumber: headerRowNumber, matches } = header;
  const matchByField = new Map(matches.map((match) => [match.field, match]));
  const detectedColumns = Object.fromEntries(matches.map((match) => [match.field, match.label]));
  const missingColumns = REQUIRED_FIELD_GROUPS.filter((group) => !group.fields.some((field) => matchByField.has(field))).map(
    (group) => group.label,
  );

  const productGroups = new Map<string, CbamExcelProductSummary>();
  const totals = {
    electricityKwh: 0,
    naturalGasM3: 0,
    waterM3: 0,
    productionTon: 0,
  };
  const emissionTotals = {
    electricityTco2e: 0,
    naturalGasTco2e: 0,
    waterTco2e: 0,
    totalTco2e: 0,
  };
  let rowsParsed = 0;
  let rowsSkipped = 0;
  let dataQualityTotal = 0;
  let dataQualityCount = 0;

  for (let rowNumber = headerRowNumber + 1; rowNumber <= worksheet.rowCount; rowNumber += 1) {
    const row = worksheet.getRow(rowNumber);
    const values: RowValues = {};

    matches.forEach((match) => {
      const cell = row.getCell(match.column);
      values[match.field] = isTextField(match.field)
        ? textValueForField(match.field, cell.value ?? cellDisplayValue(cell))
        : parseNumber(cell.value ?? cell.text);
    });

    const electricityKwh = Number(values.electricityKwh ?? 0);
    const naturalGasM3 = Number(values.naturalGasM3 ?? 0);
    const waterM3 = Number(values.waterM3 ?? 0);
    const productionKg = Number(values.productionKg ?? 0);
    const productionAmount = Number(values.productionAmount ?? 0);
    const productionTon = Number(values.productionTon ?? 0) || (productionKg > 0 ? productionKg / 1000 : 0);
    const electricityEmissionKg = Number(values.electricityEmissionKg ?? 0);
    const naturalGasEmissionKg = Number(values.naturalGasEmissionKg ?? 0);
    const waterEmissionKg = Number(values.waterEmissionKg ?? 0);
    const totalEmissionKg = Number(values.totalEmissionKg ?? 0);
    const dataQuality = Number(values.dataQuality ?? 0);
    const hasEmission = electricityEmissionKg > 0 || naturalGasEmissionKg > 0 || waterEmissionKg > 0 || totalEmissionKg > 0;
    const hasActivity = electricityKwh > 0 || naturalGasM3 > 0 || waterM3 > 0 || productionTon > 0 || productionAmount > 0 || hasEmission;

    if (!hasActivity) {
      rowsSkipped += 1;
      continue;
    }

    rowsParsed += 1;
    if (dataQuality > 0) {
      dataQualityTotal += Math.max(0, Math.min(100, dataQuality));
      dataQualityCount += 1;
    }
    totals.electricityKwh += electricityKwh;
    totals.naturalGasM3 += naturalGasM3;
    totals.waterM3 += waterM3;
    totals.productionTon += productionTon;

    const productName = normalizeText(values.product) || "Tesis toplamı";
    const productCnCode = normalizeText(values.cnCode);
    const productGroupKey = productCnCode ? `${productName}__${productCnCode}` : productName;
    const rowElectricityTco2e = electricityEmissionKg > 0 ? electricityEmissionKg / 1000 : emissionFor(electricityKwh, "electricity");
    const rowNaturalGasTco2e = naturalGasEmissionKg > 0 ? naturalGasEmissionKg / 1000 : emissionFor(naturalGasM3, "naturalGas");
    const rowWaterTco2e = waterEmissionKg > 0 ? waterEmissionKg / 1000 : emissionFor(waterM3, "water");
    const rowEmissionTco2e = totalEmissionKg > 0 ? totalEmissionKg / 1000 : rowElectricityTco2e + rowNaturalGasTco2e + rowWaterTco2e;
    emissionTotals.electricityTco2e += rowElectricityTco2e;
    emissionTotals.naturalGasTco2e += rowNaturalGasTco2e;
    emissionTotals.waterTco2e += rowWaterTco2e;
    emissionTotals.totalTco2e += rowEmissionTco2e;

    const current =
      productGroups.get(productGroupKey) ??
      ({
        product: productName,
        cnCode: productCnCode,
        facility: normalizeText(values.facility),
        period: normalizeText(values.period),
        rows: 0,
        productionTon: 0,
        electricityKwh: 0,
        naturalGasM3: 0,
        waterM3: 0,
        electricityTco2e: 0,
        naturalGasTco2e: 0,
        waterTco2e: 0,
        totalTco2e: 0,
        intensityTco2ePerTon: null,
      } satisfies CbamExcelProductSummary);

    if (!current.cnCode && productCnCode) current.cnCode = productCnCode;
    if (!current.facility && normalizeText(values.facility)) current.facility = normalizeText(values.facility);
    if (!current.period && normalizeText(values.period)) current.period = normalizeText(values.period);
    current.rows += 1;
    current.productionTon += productionTon;
    current.electricityKwh += electricityKwh;
    current.naturalGasM3 += naturalGasM3;
    current.waterM3 += waterM3;
    current.electricityTco2e += rowElectricityTco2e;
    current.naturalGasTco2e += rowNaturalGasTco2e;
    current.waterTco2e += rowWaterTco2e;
    current.totalTco2e += rowEmissionTco2e;
    productGroups.set(productGroupKey, current);
  }

  const electricityTco2e = emissionTotals.electricityTco2e || emissionFor(totals.electricityKwh, "electricity");
  const naturalGasTco2e = emissionTotals.naturalGasTco2e || emissionFor(totals.naturalGasM3, "naturalGas");
  const waterTco2e = emissionTotals.waterTco2e || emissionFor(totals.waterM3, "water");
  const totalTco2e = emissionTotals.totalTco2e || electricityTco2e + naturalGasTco2e + waterTco2e;

  const breakdown = [
    {
      key: "electricity" as const,
      label: "Elektrik",
      activity: round(totals.electricityKwh, 2),
      activityUnit: "kWh",
      emissionTco2e: round(electricityTco2e),
      share: totalTco2e > 0 ? round((electricityTco2e / totalTco2e) * 100, 1) : 0,
    },
    {
      key: "naturalGas" as const,
      label: "Doğalgaz",
      activity: round(totals.naturalGasM3, 2),
      activityUnit: "m3",
      emissionTco2e: round(naturalGasTco2e),
      share: totalTco2e > 0 ? round((naturalGasTco2e / totalTco2e) * 100, 1) : 0,
    },
    {
      key: "water" as const,
      label: "Su",
      activity: round(totals.waterM3, 2),
      activityUnit: "m3",
      emissionTco2e: round(waterTco2e),
      share: totalTco2e > 0 ? round((waterTco2e / totalTco2e) * 100, 1) : 0,
    },
  ];

  const products = Array.from(productGroups.values())
    .map((product) => ({
      ...product,
      productionTon: round(product.productionTon, 3),
      electricityKwh: round(product.electricityKwh, 2),
      naturalGasM3: round(product.naturalGasM3, 2),
      waterM3: round(product.waterM3, 2),
      electricityTco2e: round(product.electricityTco2e),
      naturalGasTco2e: round(product.naturalGasTco2e),
      waterTco2e: round(product.waterTco2e),
      totalTco2e: round(product.totalTco2e),
      intensityTco2ePerTon: product.productionTon > 0 ? round(product.totalTco2e / product.productionTon, 4) : null,
    }))
    .sort((a, b) => b.totalTco2e - a.totalTco2e);

  const roundedTotals = {
    electricityKwh: round(totals.electricityKwh, 2),
    naturalGasM3: round(totals.naturalGasM3, 2),
    waterM3: round(totals.waterM3, 2),
    productionTon: round(totals.productionTon, 3),
    totalTco2e: round(totalTco2e),
    intensityTco2ePerTon: totals.productionTon > 0 ? round(totalTco2e / totals.productionTon, 4) : null,
  };
  const calculatedQualityScore = qualityScore({
    rowsParsed,
    rowsSkipped,
    missingColumns,
    hasProductColumn: matchByField.has("product"),
    hasPeriodColumn: matchByField.has("period"),
  });
  const workbookQualityScore = dataQualityCount > 0 ? Math.round(dataQualityTotal / dataQualityCount) : null;

  return {
    fileName,
    sheetName: worksheet.name,
    generatedAt: new Date().toISOString(),
    facilities: Array.from(new Set(products.map((product) => product.facility).filter(Boolean))).slice(0, 12),
    periods: Array.from(new Set(products.map((product) => product.period).filter(Boolean))).slice(0, 12),
    rowsParsed,
    rowsSkipped,
    qualityScore: workbookQualityScore ?? calculatedQualityScore,
    detectedColumns,
    missingColumns,
    totals: roundedTotals,
    breakdown,
    products,
    warnings: buildWarnings({
      rowsParsed,
      rowsSkipped,
      missingColumns,
      productionTon: totals.productionTon,
      hasProductColumn: matchByField.has("product"),
    }),
    factors: DEFAULT_CBAM_FACTORS,
    assumptions: [
      "Yüklenen dosyada başlıkları en iyi eşleşen veri sayfası analiz edilir.",
      "Dosyada hazır emisyon kolonları varsa bunlar kullanılır; yoksa tüketimler varsayılan emisyon faktörleriyle tCO2e değerine çevrilir.",
      "Üretim miktarı ton veya kg cinsinden verilirse ürün başına emisyon yoğunluğu hesaplanır.",
      "Bu motor ön analiz ve veri kalite kontrolü içindir; doğrulama öncesi tesis özel faktörleriyle güncellenmelidir.",
    ],
  };
}
