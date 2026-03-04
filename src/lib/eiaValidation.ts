import { EIA_COUNTRIES } from "@/lib/eiaApi";

const COUNTRY_SET = new Set(EIA_COUNTRIES.map((item) => item.code));
const SECTOR_SET = new Set(["ALL", "RES", "COM", "IND"]);
const MIN_YEAR = 1990;
const MAX_YEAR = new Date().getUTCFullYear() + 1;
const MAX_YEAR_SPAN = 40;
const MAX_MONTH_SPAN = 240;

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;
  return value as Record<string, unknown>;
}

function parseYear(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!/^\d{4}$/.test(trimmed)) return null;
  const year = Number(trimmed);
  if (!Number.isInteger(year) || year < MIN_YEAR || year > MAX_YEAR) return null;
  return String(year);
}

function parseMonthPeriod(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{4})-(0[1-9]|1[0-2])$/);
  if (!match) return null;
  const year = Number(match[1]);
  if (!Number.isInteger(year) || year < MIN_YEAR || year > MAX_YEAR) return null;
  return `${match[1]}-${match[2]}`;
}

function monthIndex(period: string): number {
  const [year, month] = period.split("-").map(Number);
  return year * 12 + month;
}

export function parseCountryYearParams(body: unknown): { country: string; startYear: string; endYear: string } | null {
  const rec = asRecord(body);
  if (!rec) return null;

  const rawCountry = typeof rec.country === "string" ? rec.country.trim().toUpperCase() : "";
  if (!COUNTRY_SET.has(rawCountry)) return null;

  const startYear = parseYear(rec.startYear);
  const endYear = parseYear(rec.endYear);
  if (!startYear || !endYear) return null;

  const start = Number(startYear);
  const end = Number(endYear);
  if (end < start) return null;
  if (end - start > MAX_YEAR_SPAN) return null;

  return { country: rawCountry, startYear, endYear };
}

export function parsePriceParams(body: unknown): { startMonth: string; endMonth: string; sector: string } | null {
  const rec = asRecord(body);
  if (!rec) return null;

  const startMonth = parseMonthPeriod(rec.startMonth);
  const endMonth = parseMonthPeriod(rec.endMonth);
  if (!startMonth || !endMonth) return null;

  const startIdx = monthIndex(startMonth);
  const endIdx = monthIndex(endMonth);
  if (endIdx < startIdx) return null;
  if (endIdx - startIdx > MAX_MONTH_SPAN) return null;

  const rawSector = typeof rec.sector === "string" ? rec.sector.trim().toUpperCase() : "ALL";
  const sector = SECTOR_SET.has(rawSector) ? rawSector : "ALL";

  return { startMonth, endMonth, sector };
}

