/**
 * EIA (U.S. Energy Information Administration) API v2 helper
 * https://www.eia.gov/opendata/
 *
 * Env var: EIA_API_KEY
 */

const BASE = "https://api.eia.gov/v2";

/* ─── Country codes (ISO 3166-1 alpha-3) used by EIA international dataset ─── */
export const EIA_COUNTRIES: { code: string; label: { tr: string; en: string; ru: string } }[] = [
  { code: "USA", label: { tr: "ABD", en: "United States", ru: "США" } },
  { code: "CHN", label: { tr: "Çin", en: "China", ru: "Китай" } },
  { code: "IND", label: { tr: "Hindistan", en: "India", ru: "Индия" } },
  { code: "JPN", label: { tr: "Japonya", en: "Japan", ru: "Япония" } },
  { code: "RUS", label: { tr: "Rusya", en: "Russia", ru: "Россия" } },
  { code: "DEU", label: { tr: "Almanya", en: "Germany", ru: "Германия" } },
  { code: "BRA", label: { tr: "Brezilya", en: "Brazil", ru: "Бразилия" } },
  { code: "CAN", label: { tr: "Kanada", en: "Canada", ru: "Канада" } },
  { code: "KOR", label: { tr: "Güney Kore", en: "South Korea", ru: "Южная Корея" } },
  { code: "FRA", label: { tr: "Fransa", en: "France", ru: "Франция" } },
  { code: "GBR", label: { tr: "Birleşik Krallık", en: "United Kingdom", ru: "Великобритания" } },
  { code: "AUS", label: { tr: "Avustralya", en: "Australia", ru: "Австралия" } },
  { code: "MEX", label: { tr: "Meksika", en: "Mexico", ru: "Мексика" } },
  { code: "IDN", label: { tr: "Endonezya", en: "Indonesia", ru: "Индонезия" } },
  { code: "SAU", label: { tr: "Suudi Arabistan", en: "Saudi Arabia", ru: "Саудовская Аравия" } },
  { code: "TUR", label: { tr: "Türkiye", en: "Turkey", ru: "Турция" } },
  { code: "ZAF", label: { tr: "Güney Afrika", en: "South Africa", ru: "ЮАР" } },
  { code: "IRN", label: { tr: "İran", en: "Iran", ru: "Иран" } },
  { code: "ITA", label: { tr: "İtalya", en: "Italy", ru: "Италия" } },
  { code: "ESP", label: { tr: "İspanya", en: "Spain", ru: "Испания" } },
  { code: "THA", label: { tr: "Tayland", en: "Thailand", ru: "Таиланд" } },
  { code: "EGY", label: { tr: "Mısır", en: "Egypt", ru: "Египет" } },
  { code: "POL", label: { tr: "Polonya", en: "Poland", ru: "Польша" } },
  { code: "ARG", label: { tr: "Arjantin", en: "Argentina", ru: "Аргентина" } },
  { code: "NOR", label: { tr: "Norveç", en: "Norway", ru: "Норвегия" } },
  { code: "NGA", label: { tr: "Nijerya", en: "Nigeria", ru: "Нигерия" } },
  { code: "SWE", label: { tr: "İsveç", en: "Sweden", ru: "Швеция" } },
  { code: "ARE", label: { tr: "BAE", en: "UAE", ru: "ОАЭ" } },
  { code: "VNM", label: { tr: "Vietnam", en: "Vietnam", ru: "Вьетнам" } },
  { code: "NLD", label: { tr: "Hollanda", en: "Netherlands", ru: "Нидерланды" } },
];

/**
 * EIA International product IDs
 *
 * Common productId values for the /v2/international route:
 * - 2   = Total electricity net generation (billion kWh)
 * - 79  = Electricity installed capacity (million kW)
 * - 12  = Total primary energy consumption (quad Btu — we filter for electricity)
 *
 * activityId:
 * - 1   = Production
 * - 2   = Consumption
 * - 7   = Imports
 * - 8   = Exports
 * - 12  = Installed capacity
 */

function getApiKey(): string {
  const key = process.env.EIA_API_KEY;
  if (!key) throw new Error("EIA_API_KEY env var not set");
  return key;
}

/** Generic EIA v2 data fetcher */
async function eiaFetch(route: string, params: Record<string, string | string[]>): Promise<{
  items: Array<Record<string, unknown>>;
  notice?: string;
}> {
  const url = new URL(`${BASE}${route}`);
  url.searchParams.set("api_key", getApiKey());

  // Handle array params like data[0]=value
  for (const [key, val] of Object.entries(params)) {
    if (Array.isArray(val)) {
      val.forEach((v, i) => url.searchParams.set(`${key}[${i}]`, v));
    } else {
      url.searchParams.set(key, val);
    }
  }

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[eia] ${res.status}`, body.slice(0, 500));
    if (res.status === 401 || res.status === 403) {
      return { items: [], notice: "EIA API key geçersiz veya eksik." };
    }
    return { items: [], notice: `EIA API hatası (${res.status})` };
  }

  const json = await res.json();
  const data = json?.response?.data;
  if (!Array.isArray(data) || data.length === 0) {
    return { items: [], notice: "Seçilen parametreler için EIA verisi bulunamadı." };
  }
  return { items: data };
}

/* ════════════════════════════════════════════════════════════
   1) Electricity Generation — international
   ════════════════════════════════════════════════════════════ */
export async function fetchElectricityGeneration(
  countryCode: string,
  startYear: string,
  endYear: string
): Promise<{ items: Array<Record<string, unknown>>; notice?: string }> {
  /*
   * EIA international route:
   * /v2/international/data/?frequency=annual&data[0]=value
   *   &facets[activityId][]=1  (production)
   *   &facets[productId][]=79  (electricity-generation)
   *   &facets[countryRegionId][]=USA
   *   &facets[unit][]=BKWH
   *   &start=2015&end=2023
   */
  const result = await eiaFetch("/international/data/", {
    frequency: "annual",
    data: ["value"],
    "facets[activityId]": ["1"],
    "facets[productId]": ["2"],
    "facets[countryRegionId]": [countryCode],
    "facets[unit]": ["BKWH"],
    start: startYear,
    end: endYear,
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    length: "5000",
  });

  if (result.items.length === 0) return result;

  // Transform to cleaner format
  const items = result.items.map((row) => ({
    period: String(row.period || ""),
    product: String(row.productName || ""),
    value: Number(row.value ?? 0),
    unit: String(row.unitName || row.unit || "Billion kWh"),
    country: String(row.countryRegionName || countryCode),
  }));

  return { items };
}

/* ════════════════════════════════════════════════════════════
   2) Electricity Consumption — international
   ════════════════════════════════════════════════════════════ */
export async function fetchElectricityConsumption(
  countryCode: string,
  startYear: string,
  endYear: string
): Promise<{ items: Array<Record<string, unknown>>; notice?: string }> {
  const result = await eiaFetch("/international/data/", {
    frequency: "annual",
    data: ["value"],
    "facets[activityId]": ["2"],
    "facets[productId]": ["2"],
    "facets[countryRegionId]": [countryCode],
    "facets[unit]": ["BKWH"],
    start: startYear,
    end: endYear,
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    length: "5000",
  });

  if (result.items.length === 0) return result;

  const items = result.items.map((row) => ({
    period: String(row.period || ""),
    product: String(row.productName || ""),
    value: Number(row.value ?? 0),
    unit: String(row.unitName || row.unit || "Billion kWh"),
    country: String(row.countryRegionName || countryCode),
  }));

  return { items };
}

/* ════════════════════════════════════════════════════════════
   3) Installed Capacity — international
   ════════════════════════════════════════════════════════════ */
export async function fetchInstalledCapacity(
  countryCode: string,
  startYear: string,
  endYear: string
): Promise<{ items: Array<Record<string, unknown>>; notice?: string }> {
  const result = await eiaFetch("/international/data/", {
    frequency: "annual",
    data: ["value"],
    "facets[activityId]": ["12"],
    "facets[productId]": ["79"],
    "facets[countryRegionId]": [countryCode],
    "facets[unit]": ["MK"],
    start: startYear,
    end: endYear,
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    length: "5000",
  });

  if (result.items.length === 0) return result;

  const items = result.items.map((row) => ({
    period: String(row.period || ""),
    product: String(row.productName || ""),
    value: Number(row.value ?? 0),
    unit: String(row.unitName || row.unit || "Million kW"),
    country: String(row.countryRegionName || countryCode),
  }));

  return { items };
}

/* ════════════════════════════════════════════════════════════
   4) Electricity Prices — US retail (state level)
   ════════════════════════════════════════════════════════════ */
export async function fetchElectricityPrices(
  startMonth: string,
  endMonth: string,
  sectorId = "ALL"
): Promise<{ items: Array<Record<string, unknown>>; notice?: string }> {
  /*
   * /v2/electricity/retail-sales/data/
   * frequency=monthly
   * data[0]=price / revenue / sales / customers
   * facets[sectorId][]=RES / COM / IND / ALL
   * facets[stateid][]=US (national) or state codes
   */
  const result = await eiaFetch("/electricity/retail-sales/data/", {
    frequency: "monthly",
    data: ["price"],
    "facets[sectorid]": [sectorId],
    "facets[stateid]": ["US"],
    start: startMonth,
    end: endMonth,
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    length: "5000",
  });

  if (result.items.length === 0) return result;

  const items = result.items.map((row) => ({
    period: String(row.period || ""),
    sector: String(row.sectorName || row.sectorid || ""),
    price: Number(row.price ?? 0),
    unit: "cents/kWh",
    state: String(row.stateDescription || row.stateid || "US"),
  }));

  return { items };
}

/* ════════════════════════════════════════════════════════════
   5) Carbon Intensity (CO₂ emissions from electricity)
   ════════════════════════════════════════════════════════════ */
export async function fetchCarbonIntensity(
  countryCode: string,
  startYear: string,
  endYear: string
): Promise<{ items: Array<Record<string, unknown>>; notice?: string }> {
  /*
   * CO₂ emissions from electricity and heat production
   * productId=4008 (CO2 emissions) activityId=1 (production)
   * unit= MMTCD (million metric tons of carbon dioxide)
   */
  const result = await eiaFetch("/international/data/", {
    frequency: "annual",
    data: ["value"],
    "facets[activityId]": ["1"],
    "facets[productId]": ["4008"],
    "facets[countryRegionId]": [countryCode],
    "facets[unit]": ["MMTCD"],
    start: startYear,
    end: endYear,
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    length: "5000",
  });

  if (result.items.length === 0) return result;

  const items = result.items.map((row) => ({
    period: String(row.period || ""),
    product: String(row.productName || "CO₂ Emissions"),
    value: Number(row.value ?? 0),
    unit: String(row.unitName || row.unit || "Million Metric Tons CO₂"),
    country: String(row.countryRegionName || countryCode),
  }));

  return { items };
}
