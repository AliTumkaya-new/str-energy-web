/**
 * ENTSO-E Transparency Platform API helper
 * https://transparency.entsoe.eu/
 *
 * Free API key: register at https://transparency.entsoe.eu/ → account settings → "Web API Security Token"
 * Set env var: ENTSOE_API_KEY
 */

import { fetchWithRetry } from "@/lib/fetchWithRetry";

const BASE_URL = "https://web-api.tp.entsoe.eu/api";

/* ─── Area EIC codes for EU countries ─── */
export const COUNTRY_EIC: Record<string, string> = {
  DE: "10Y1001A1001A83F", // Germany
  FR: "10YFR-RTE------C", // France
  ES: "10YES-REE------0", // Spain
  IT: "10YIT-GRTN-----B", // Italy
  NL: "10YNL----------L", // Netherlands
  BE: "10YBE----------2", // Belgium
  AT: "10YAT-APG------L", // Austria
  PL: "10YPL-AREA-----S", // Poland
  PT: "10YPT-REN------W", // Portugal
  CH: "10YCH-SWISSGRIDZ", // Switzerland
  CZ: "10YCZ-CEPS-----N", // Czech Republic
  DK: "10Y1001A1001A65H", // Denmark
  SE: "10YSE-1--------K", // Sweden
  NO: "10YNO-0--------C", // Norway
  FI: "10YFI-1--------U", // Finland
  GR: "10YGR-HTSO-----Y", // Greece
  RO: "10YRO-TEL------P", // Romania
  BG: "10YCA-BULGARIA-R", // Bulgaria
  HU: "10YHU-MAVIR----U", // Hungary
  HR: "10YHR-HEP------M", // Croatia
  SK: "10YSK-SEPS-----K", // Slovakia
  SI: "10YSI-ELES-----O", // Slovenia
  IE: "10YIE-1001A00010", // Ireland
  LT: "10YLT-1001A0008Q", // Lithuania
  LV: "10YLV-1001A00074", // Latvia
  EE: "10Y1001A1001A39I", // Estonia
  RS: "10YCS-SERBIANSOB", // Serbia
  BA: "10YBA-JPCC-----D", // Bosnia
  MK: "10YMK-MEPSO----8", // North Macedonia
  ME: "10YCS-CG-TSO---S", // Montenegro
  AL: "10YAL-KESH-----5", // Albania
  XK: "10Y1001C--00100H", // Kosovo
  LU: "10YLU-CEGEDEL-NQ", // Luxembourg
};

export const COUNTRY_LABELS: Record<string, { tr: string; en: string; ru: string }> = {
  DE: { tr: "Almanya", en: "Germany", ru: "Германия" },
  FR: { tr: "Fransa", en: "France", ru: "Франция" },
  ES: { tr: "İspanya", en: "Spain", ru: "Испания" },
  IT: { tr: "İtalya", en: "Italy", ru: "Италия" },
  NL: { tr: "Hollanda", en: "Netherlands", ru: "Нидерланды" },
  BE: { tr: "Belçika", en: "Belgium", ru: "Бельгия" },
  AT: { tr: "Avusturya", en: "Austria", ru: "Австрия" },
  PL: { tr: "Polonya", en: "Poland", ru: "Польша" },
  PT: { tr: "Portekiz", en: "Portugal", ru: "Португалия" },
  CH: { tr: "İsviçre", en: "Switzerland", ru: "Швейцария" },
  CZ: { tr: "Çekya", en: "Czech Republic", ru: "Чехия" },
  DK: { tr: "Danimarka", en: "Denmark", ru: "Дания" },
  SE: { tr: "İsveç", en: "Sweden", ru: "Швеция" },
  NO: { tr: "Norveç", en: "Norway", ru: "Норвегия" },
  FI: { tr: "Finlandiya", en: "Finland", ru: "Финляндия" },
  GR: { tr: "Yunanistan", en: "Greece", ru: "Греция" },
  RO: { tr: "Romanya", en: "Romania", ru: "Румыния" },
  BG: { tr: "Bulgaristan", en: "Bulgaria", ru: "Болгария" },
  HU: { tr: "Macaristan", en: "Hungary", ru: "Венгрия" },
  HR: { tr: "Hırvatistan", en: "Croatia", ru: "Хорватия" },
  SK: { tr: "Slovakya", en: "Slovakia", ru: "Словакия" },
  SI: { tr: "Slovenya", en: "Slovenia", ru: "Словения" },
  IE: { tr: "İrlanda", en: "Ireland", ru: "Ирландия" },
  LT: { tr: "Litvanya", en: "Lithuania", ru: "Литва" },
  LV: { tr: "Letonya", en: "Latvia", ru: "Латвия" },
  EE: { tr: "Estonya", en: "Estonia", ru: "Эстония" },
  RS: { tr: "Sırbistan", en: "Serbia", ru: "Сербия" },
  BA: { tr: "Bosna-Hersek", en: "Bosnia-Herzegovina", ru: "Босния" },
  MK: { tr: "Kuzey Makedonya", en: "North Macedonia", ru: "Северная Македония" },
  ME: { tr: "Karadağ", en: "Montenegro", ru: "Черногория" },
  AL: { tr: "Arnavutluk", en: "Albania", ru: "Албания" },
  XK: { tr: "Kosova", en: "Kosovo", ru: "Косово" },
  LU: { tr: "Lüksemburg", en: "Luxembourg", ru: "Люксембург" },
};

/** Country flag filename → /flags/xx.svg */
export const countryFlag = (code: string) => `/flags/${code.toLowerCase()}.svg`;

/* ─── Helpers ─── */

function getApiKey(): string {
  const key = process.env.ENTSOE_API_KEY;
  if (!key) throw new Error("ENTSOE_API_KEY env var not set");
  return key;
}

/** Convert YYYY-MM-DD to ENTSO-E format: YYYYMMDD0000 */
function toEntsoeTs(dateStr: string, endOfDay = false): string {
  const d = dateStr.replace(/-/g, "");
  return endOfDay ? `${d}2300` : `${d}0000`;
}

/** Parse simple XML text content between tags */
function xmlText(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}>([^<]*)</${tag}>`, "g");
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) results.push(m[1]);
  return results;
}

/** Parse all <TimeSeries> blocks from ENTSO-E XML */
function parseTimeSeries(xml: string) {
  const tsBlocks = xml.split("<TimeSeries>").slice(1).map((b) => b.split("</TimeSeries>")[0]);
  return tsBlocks;
}

/** Parse <Period> → points from a TimeSeries block */
function parsePeriodPoints(block: string): Array<{ position: number; quantity: number; start: string; resolution: string }> {
  const periods = block.split("<Period>").slice(1).map((p) => p.split("</Period>")[0]);
  const results: Array<{ position: number; quantity: number; start: string; resolution: string }> = [];

  for (const period of periods) {
    const startMatch = period.match(/<start>([^<]+)<\/start>/);
    const resMatch = period.match(/<resolution>([^<]+)<\/resolution>/);
    const start = startMatch?.[1] ?? "";
    const resolution = resMatch?.[1] ?? "PT60M";

    const points = period.split("<Point>").slice(1).map((pt) => pt.split("</Point>")[0]);
    for (const pt of points) {
      const pos = parseInt(pt.match(/<position>([^<]+)<\/position>/)?.[1] ?? "0", 10);
      const qty = parseFloat(pt.match(/<quantity>([^<]+)<\/quantity>/)?.[1] ?? "0");
      results.push({ position: pos, quantity: qty, start, resolution });
    }
  }
  return results;
}

/** Convert period start + position to hour string */
function positionToHour(start: string, position: number, resolution: string): string {
  const d = new Date(start);
  const minutes = resolution === "PT15M" ? 15 : resolution === "PT30M" ? 30 : 60;
  d.setMinutes(d.getMinutes() + (position - 1) * minutes);
  return d.toISOString().slice(11, 16);
}

function positionToDate(start: string, position: number, resolution: string): string {
  const d = new Date(start);
  const minutes = resolution === "PT15M" ? 15 : resolution === "PT30M" ? 30 : 60;
  d.setMinutes(d.getMinutes() + (position - 1) * minutes);
  return d.toISOString().slice(0, 10);
}

/* ─── ENTSO-E generation type codes ─── */
const GEN_TYPE_LABELS: Record<string, { tr: string; en: string; ru: string }> = {
  B01: { tr: "Biyokütle", en: "Biomass", ru: "Биомасса" },
  B02: { tr: "Linyit / Kahverengi Kömür", en: "Brown Coal / Lignite", ru: "Бурый уголь" },
  B03: { tr: "Fosil Kömür Gazı", en: "Fossil Coal-derived Gas", ru: "Угольный газ" },
  B04: { tr: "Fosil Gaz", en: "Fossil Gas", ru: "Природный газ" },
  B05: { tr: "Taş Kömür", en: "Fossil Hard Coal", ru: "Каменный уголь" },
  B06: { tr: "Fuel Oil / Petrol", en: "Fossil Oil", ru: "Мазут" },
  B09: { tr: "Jeotermal", en: "Geothermal", ru: "Геотермальная" },
  B10: { tr: "Barajlı Hidro", en: "Hydro Pumped Storage", ru: "ГАЭС" },
  B11: { tr: "Akarsu", en: "Hydro Run-of-River", ru: "Русловая ГЭС" },
  B12: { tr: "Barajlı Hidroelektrik", en: "Hydro Water Reservoir", ru: "Плотинная ГЭС" },
  B14: { tr: "Nükleer", en: "Nuclear", ru: "Атомная" },
  B15: { tr: "Diğer Yenilenebilir", en: "Other Renewable", ru: "Другие ВИЭ" },
  B16: { tr: "Güneş", en: "Solar", ru: "Солнечная" },
  B17: { tr: "Atık", en: "Waste", ru: "Отходы" },
  B18: { tr: "Rüzgar (Kara)", en: "Wind Onshore", ru: "Ветер (суша)" },
  B19: { tr: "Rüzgar (Deniz)", en: "Wind Offshore", ru: "Ветер (море)" },
  B20: { tr: "Diğer", en: "Other", ru: "Другое" },
};

/* ─── Public API functions ─── */

/**
 * Day-ahead prices for a country
 */
export async function fetchDayAheadPrices(
  countryCode: string,
  startDate: string,
  endDate: string
): Promise<{ items: Array<Record<string, unknown>>; notice?: string }> {
  const eic = COUNTRY_EIC[countryCode];
  if (!eic) return { items: [], notice: `Unknown country: ${countryCode}` };

  const url = `${BASE_URL}?securityToken=${getApiKey()}&documentType=A44&in_Domain=${encodeURIComponent(eic)}&out_Domain=${encodeURIComponent(eic)}&periodStart=${toEntsoeTs(startDate)}&periodEnd=${toEntsoeTs(endDate, true)}`;

  const res = await fetchWithRetry(
    url,
    { headers: { Accept: "application/xml" } },
    { timeoutMs: 12_000, attempts: 2, retryDelayMs: 350 }
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[entsoe/day-ahead]", res.status, body.slice(0, 300));
    if (res.status === 401) return { items: [], notice: "ENTSO-E API key geçersiz." };
    if (body.includes("No matching data found")) return { items: [], notice: "Seçilen tarih aralığında veri bulunamadı." };
    return { items: [], notice: "ENTSO-E servisinden veri alınamadı." };
  }

  const xml = await res.text();
  const items: Array<Record<string, unknown>> = [];

  const tsBlocks = parseTimeSeries(xml);
  for (const block of tsBlocks) {
    const currency = xmlText(block, "currency_Unit.name")[0] || "EUR";
    const points = parsePeriodPoints(block);
    for (const pt of points) {
      items.push({
        date: positionToDate(pt.start, pt.position, pt.resolution),
        hour: positionToHour(pt.start, pt.position, pt.resolution),
        price: pt.quantity,
        currency,
      });
    }
  }

  return { items };
}

/**
 * Actual generation by fuel type for a country
 */
export async function fetchActualGeneration(
  countryCode: string,
  startDate: string,
  endDate: string
): Promise<{ items: Array<Record<string, unknown>>; notice?: string }> {
  const eic = COUNTRY_EIC[countryCode];
  if (!eic) return { items: [], notice: `Unknown country: ${countryCode}` };

  const url = `${BASE_URL}?securityToken=${getApiKey()}&documentType=A75&processType=A16&in_Domain=${encodeURIComponent(eic)}&periodStart=${toEntsoeTs(startDate)}&periodEnd=${toEntsoeTs(endDate, true)}`;

  const res = await fetchWithRetry(
    url,
    { headers: { Accept: "application/xml" } },
    { timeoutMs: 12_000, attempts: 2, retryDelayMs: 350 }
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[entsoe/generation]", res.status, body.slice(0, 300));
    if (body.includes("No matching data found")) return { items: [], notice: "Seçilen tarih aralığında üretim verisi bulunamadı." };
    return { items: [], notice: "ENTSO-E servisinden veri alınamadı." };
  }

  const xml = await res.text();
  // Group by date+hour, each fuel type as a column
  const hourlyMap = new Map<string, Record<string, unknown>>();

  const tsBlocks = parseTimeSeries(xml);
  for (const block of tsBlocks) {
    // Extract MktPSRType → psrType
    const psrMatch = block.match(/<psrType>([^<]+)<\/psrType>/);
    const psrType = psrMatch?.[1] || "B20";

    const points = parsePeriodPoints(block);
    for (const pt of points) {
      const date = positionToDate(pt.start, pt.position, pt.resolution);
      const hour = positionToHour(pt.start, pt.position, pt.resolution);
      const key = `${date}_${hour}`;

      if (!hourlyMap.has(key)) {
        hourlyMap.set(key, { date, hour, total: 0 });
      }
      const row = hourlyMap.get(key)!;
      row[psrType] = pt.quantity;
      row.total = (row.total as number) + pt.quantity;
    }
  }

  const items = Array.from(hourlyMap.values()).sort((a, b) => {
    const ka = `${a.date}_${a.hour}`;
    const kb = `${b.date}_${b.hour}`;
    return ka.localeCompare(kb);
  });

  return { items };
}

/**
 * Actual total load (consumption) for a country
 */
export async function fetchActualLoad(
  countryCode: string,
  startDate: string,
  endDate: string
): Promise<{ items: Array<Record<string, unknown>>; notice?: string }> {
  const eic = COUNTRY_EIC[countryCode];
  if (!eic) return { items: [], notice: `Unknown country: ${countryCode}` };

  const url = `${BASE_URL}?securityToken=${getApiKey()}&documentType=A65&processType=A16&outBiddingZone_Domain=${encodeURIComponent(eic)}&periodStart=${toEntsoeTs(startDate)}&periodEnd=${toEntsoeTs(endDate, true)}`;

  const res = await fetchWithRetry(
    url,
    { headers: { Accept: "application/xml" } },
    { timeoutMs: 12_000, attempts: 2, retryDelayMs: 350 }
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[entsoe/load]", res.status, body.slice(0, 300));
    if (body.includes("No matching data found")) return { items: [], notice: "Seçilen tarih aralığında tüketim verisi bulunamadı." };
    return { items: [], notice: "ENTSO-E servisinden veri alınamadı." };
  }

  const xml = await res.text();
  const items: Array<Record<string, unknown>> = [];

  const tsBlocks = parseTimeSeries(xml);
  for (const block of tsBlocks) {
    const points = parsePeriodPoints(block);
    for (const pt of points) {
      items.push({
        date: positionToDate(pt.start, pt.position, pt.resolution),
        hour: positionToHour(pt.start, pt.position, pt.resolution),
        load: pt.quantity,
      });
    }
  }

  return { items };
}

/**
 * Cross-border physical flows between two countries
 */
export async function fetchCrossBorderFlows(
  fromCountry: string,
  toCountry: string,
  startDate: string,
  endDate: string
): Promise<{ items: Array<Record<string, unknown>>; notice?: string }> {
  const fromEic = COUNTRY_EIC[fromCountry];
  const toEic = COUNTRY_EIC[toCountry];
  if (!fromEic || !toEic) return { items: [], notice: `Unknown country code` };

  const url = `${BASE_URL}?securityToken=${getApiKey()}&documentType=A11&in_Domain=${encodeURIComponent(toEic)}&out_Domain=${encodeURIComponent(fromEic)}&periodStart=${toEntsoeTs(startDate)}&periodEnd=${toEntsoeTs(endDate, true)}`;

  const res = await fetchWithRetry(
    url,
    { headers: { Accept: "application/xml" } },
    { timeoutMs: 12_000, attempts: 2, retryDelayMs: 350 }
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[entsoe/flows]", res.status, body.slice(0, 300));
    if (body.includes("No matching data found")) return { items: [], notice: "Seçilen tarih aralığında veri bulunamadı." };
    return { items: [], notice: "ENTSO-E servisinden veri alınamadı." };
  }

  const xml = await res.text();
  const items: Array<Record<string, unknown>> = [];

  const tsBlocks = parseTimeSeries(xml);
  for (const block of tsBlocks) {
    const points = parsePeriodPoints(block);
    for (const pt of points) {
      items.push({
        date: positionToDate(pt.start, pt.position, pt.resolution),
        hour: positionToHour(pt.start, pt.position, pt.resolution),
        flow: pt.quantity,
        from: fromCountry,
        to: toCountry,
      });
    }
  }

  return { items };
}

export { GEN_TYPE_LABELS };
