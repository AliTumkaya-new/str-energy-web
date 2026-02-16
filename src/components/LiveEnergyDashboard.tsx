"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Database,
  Clock,
  BarChart3,
  TrendingUp,
  Zap,
  Search,
  FileSpreadsheet,
} from "lucide-react";

/* ─────────────── i18n ─────────────── */
const copyByLang = {
  tr: {
    headline: "Canlı Enerji Verisi",
    subhead: "PTF, YEKDEM ve üretim verilerini tek panelde izleyin.",
    badge: "CANLI",
    regionTR: "Türkiye",
    regionEU: "Avrupa",
    regionGlobal: "Global",
    comingSoon: "Yakında",
    dataset: "Veri Seti",
    optGeneration: "Gerçek Zamanlı Üretim",
    optYekdem: "YEKDEM Birim Maliyet",
    optPtf: "PTF (Piyasa Takas Fiyatı)",
    optLoadPlan: "Yük Tahmin Planı",
    optWeightedAvg: "GİP Ağırlıklı Ortalama",
    start: "Başlangıç",
    end: "Bitiş",
    query: "Sorgula",
    searchPlaceholder: "Tabloda ara…",
    records: "Kayıt",
    columns: "Kolon",
    range: "Aralık",
    source: "Veri Kaynağı",
    lastUpdate: "Son Güncelleme",
    noData: "Bu aralık için veri bulunamadı.",
    errorMsg: "Veri çekilemedi. Lütfen tarih aralığını kontrol edin.",
    exportCsv: "CSV İndir",
    total: "Toplam",
    dayNames: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],

  },
  en: {
    headline: "Live Energy Data",
    subhead: "Monitor PTF, YEKDEM, and generation data in one panel.",
    badge: "LIVE",
    regionTR: "Turkey",
    regionEU: "Europe",
    regionGlobal: "Global",
    comingSoon: "Coming Soon",
    dataset: "Dataset",
    optGeneration: "Realtime Generation",
    optYekdem: "YEKDEM Unit Cost",
    optPtf: "PTF (Market Clearing Price)",
    optLoadPlan: "Load Estimation Plan",
    optWeightedAvg: "Weighted Average Price",
    start: "Start",
    end: "End",
    query: "Query",
    searchPlaceholder: "Search in table…",
    records: "Records",
    columns: "Columns",
    range: "Range",
    source: "Data Source",
    lastUpdate: "Last Updated",
    noData: "No data found for this range.",
    errorMsg: "Failed to load data. Please check the date range.",
    exportCsv: "Export CSV",
    total: "Total",
    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

  },
  ru: {
    headline: "Данные в реальном времени",
    subhead: "PTF, YEKDEM и генерация в одном окне.",
    badge: "LIVE",
    regionTR: "Турция",
    regionEU: "Европа",
    regionGlobal: "Глобальный",
    comingSoon: "Скоро",
    dataset: "Набор данных",
    optGeneration: "Генерация в реальном времени",
    optYekdem: "YEKDEM стоимость",
    optPtf: "PTF (рыночная цена)",
    optLoadPlan: "План нагрузки",
    optWeightedAvg: "Средневзвешенная цена",
    start: "Начало",
    end: "Конец",
    query: "Запрос",
    searchPlaceholder: "Поиск в таблице…",
    records: "Записи",
    columns: "Колонки",
    range: "Период",
    source: "Источник",
    lastUpdate: "Обновлено",
    noData: "Данных за этот период нет.",
    errorMsg: "Не удалось загрузить данные. Проверьте диапазон дат.",
    exportCsv: "Экспорт CSV",
    total: "Итого",
    dayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],

  },
} as const;

/* ─────────────── column maps ─────────────── */
const generationMap: Record<string, { label: { tr: string; en: string; ru: string }; aliases: string[] }> = {
  date: { label: { tr: "Tarih", en: "Date", ru: "Дата" }, aliases: ["date"] },
  hour: { label: { tr: "Saat", en: "Hour", ru: "Час" }, aliases: ["hour", "time"] },
  total: { label: { tr: "Toplam (MWh)", en: "Total (MWh)", ru: "Итого (MWh)" }, aliases: ["total", "totalMwh", "totalMW", "totalMw"] },
  naturalGas: { label: { tr: "Doğal Gaz", en: "Natural Gas", ru: "Природный газ" }, aliases: ["naturalGas", "natural_gas"] },
  dammedHydro: { label: { tr: "Barajlı", en: "Dammed Hydro", ru: "Плотинная ГЭС" }, aliases: ["dammedHydro", "dammed_hydro", "dammed"] },
  lignite: { label: { tr: "Linyit", en: "Lignite", ru: "Лигнит" }, aliases: ["lignite"] },
  river: { label: { tr: "Akarsu", en: "Run-of-River", ru: "Русловая ГЭС" }, aliases: ["river", "runOfRiver", "run_of_river"] },
  importCoal: { label: { tr: "İthal Kömür", en: "Imported Coal", ru: "Импортный уголь" }, aliases: ["importCoal", "import_coal", "importedCoal"] },
  wind: { label: { tr: "Rüzgar", en: "Wind", ru: "Ветер" }, aliases: ["wind", "windPower", "wind_power"] },
  solar: { label: { tr: "Güneş", en: "Solar", ru: "Солнечная" }, aliases: ["solar", "sun", "solarPower", "solar_power"] },
  fuelOil: { label: { tr: "Fuel Oil", en: "Fuel Oil", ru: "Мазут" }, aliases: ["fuelOil", "fuel_oil", "fueloil"] },
  geothermal: { label: { tr: "Jeotermal", en: "Geothermal", ru: "Геотермальная" }, aliases: ["geothermal", "geoThermal"] },
  asphaltiteCoal: { label: { tr: "Asfaltit Kömür", en: "Asphaltite Coal", ru: "Асфальтит" }, aliases: ["asphaltiteCoal", "asphaltite", "asphaltite_coal"] },
  hardCoal: { label: { tr: "Taş Kömür", en: "Hard Coal", ru: "Каменный уголь" }, aliases: ["hardCoal", "hard_coal", "stoneCoal", "coal"] },
  biomass: { label: { tr: "Biyokütle", en: "Biomass", ru: "Биомасса" }, aliases: ["biomass", "bioMass"] },
  naphtha: { label: { tr: "Nafta", en: "Naphtha", ru: "Нафта" }, aliases: ["naphtha", "nafta"] },
  lng: { label: { tr: "LNG", en: "LNG", ru: "LNG" }, aliases: ["lng", "LNG"] },
  international: { label: { tr: "Uluslararası", en: "International", ru: "Международный" }, aliases: ["international", "interconnection"] },
  blackHeat: { label: { tr: "Atık Isı", en: "Waste Heat", ru: "Отходящее тепло" }, aliases: ["blackHeat", "wasteHeat", "waste_heat"] },
};

const ptfMap: Record<string, { label: { tr: string; en: string; ru: string }; aliases: string[] }> = {
  date: { label: { tr: "Tarih", en: "Date", ru: "Дата" }, aliases: ["date"] },
  hour: { label: { tr: "Saat", en: "Hour", ru: "Час" }, aliases: ["hour", "time"] },
  price: { label: { tr: "PTF (TL/MWh)", en: "PTF (TL/MWh)", ru: "PTF (TL/MWh)" }, aliases: ["price", "mcp", "ptf", "mcpValue", "mcpvalue"] },
};

const loadPlanMap: Record<string, { label: { tr: string; en: string; ru: string }; aliases: string[] }> = {
  date: { label: { tr: "Tarih", en: "Date", ru: "Дата" }, aliases: ["date"] },
  hour: { label: { tr: "Saat", en: "Hour", ru: "Час" }, aliases: ["hour", "time"] },
  lep: { label: { tr: "Yük Tahmin (MWh)", en: "Load Forecast (MWh)", ru: "Прогноз нагрузки (MWh)" }, aliases: ["lep", "loadEstimation", "loadEstimationPlan", "loadPlan"] },
};

const weightedAvgMap: Record<string, { label: { tr: string; en: string; ru: string }; aliases: string[] }> = {
  date: { label: { tr: "Tarih", en: "Date", ru: "Дата" }, aliases: ["date"] },
  hour: { label: { tr: "Saat", en: "Hour", ru: "Час" }, aliases: ["hour", "time"] },
  price: { label: { tr: "GİP AOF (TL/MWh)", en: "WAP (TL/MWh)", ru: "WAP (TL/MWh)" }, aliases: ["price", "weightedAveragePrice", "wap", "avgPrice"] },
};

const generationOrder = Object.keys(generationMap);

type DatasetKey = "generation" | "yekdem-unit-cost" | "ptf" | "load-plan" | "weighted-avg";
type RegionKey = "tr" | "eu" | "global";

/* ─────────────── helpers ─────────────── */
const pickValue = (source: Record<string, unknown>, aliases: string[]) => {
  for (const key of aliases) {
    if (key in source) return source[key];
  }
  return undefined;
};

const parseNumber = (value: unknown) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const normalized = value.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const parsed = Number(normalized);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return 0;
};

const formatNumber = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "0,00";
  if (typeof value === "number") {
    return new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  }
  if (typeof value === "string") {
    const normalized = value.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const parsed = Number(normalized);
    if (!Number.isNaN(parsed)) {
      return new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(parsed);
    }
  }
  return value;
};

const formatDateLabel = (value: string) => {
  if (!value) return value;
  const datePart = value.slice(0, 10);
  if (!/\d{4}-\d{2}-\d{2}/.test(datePart)) return value;
  return datePart.split("-").reverse().join(".");
};

const formatTimeLabel = (value: string) => {
  if (!value) return value;
  if (value.includes("T")) return value.slice(11, 16);
  if (/^\d{2}:\d{2}$/.test(value)) return value;
  return value;
};

const toDateString = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const displayDate = (value: string) => {
  if (!value) return "";
  const parts = value.split("-");
  if (parts.length !== 3) return value;
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
};

const monthLabel = (date: Date) =>
  date.toLocaleString("tr-TR", { month: "long", year: "numeric" });

const buildCalendar = (view: Date) => {
  const year = view.getFullYear();
  const month = view.getMonth();
  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ date: Date | null; label: number }> = [];
  for (let i = 0; i < startDay; i += 1) cells.push({ date: null, label: 0 });
  for (let day = 1; day <= daysInMonth; day += 1) cells.push({ date: new Date(year, month, day), label: day });
  return cells;
};




/* ─────────────── COMPONENT ─────────────── */
export default function LiveEnergyDashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { language } = useLanguage();
  const copy = copyByLang[language] ?? copyByLang.tr;

  /* state */
  const [region, setRegion] = useState<RegionKey>("tr");
  const [dataset, setDataset] = useState<DatasetKey>("generation");
  const today = new Date();
  const [startDate, setStartDate] = useState(toDateString(today));
  const [endDate, setEndDate] = useState(toDateString(today));
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startView, setStartView] = useState(() => new Date());
  const [endView, setEndView] = useState(() => new Date());
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastFetchTime, setLastFetchTime] = useState<string | null>(null);


  useEffect(() => { setRows([]); setError(""); }, [dataset]);

  /* close calendars on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (startRef.current && !startRef.current.contains(target)) setStartOpen(false);
      if (endRef.current && !endRef.current.contains(target)) setEndOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* data fetch */
  const fetchData = useCallback(async () => {
    if (region !== "tr") return;
    setIsLoading(true);
    setError("");
    try {
      const start = `${startDate}T00:00:00+03:00`;
      const end = `${endDate}T23:59:59+03:00`;
      const endpointMap: Record<DatasetKey, string> = {
        generation: "/api/energy/realtime-generation",
        "yekdem-unit-cost": "/api/energy/yekdem-unit-cost",
        ptf: "/api/energy/ptf",
        "load-plan": "/api/energy/load-estimation-plan",
        "weighted-avg": "/api/energy/weighted-average-price",
      };
      const response = await fetch(endpointMap[dataset], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate: start, endDate: end }),
      });
      if (!response.ok) throw new Error("request failed");
      const data = await response.json();
      setRows(Array.isArray(data?.items) ? data.items : []);
      setLastFetchTime(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
    } catch {
      setRows([]);
      setError(copy.errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [region, dataset, startDate, endDate, copy.errorMsg]);

  /* computed columns + rows */
  const columns = useMemo(() => {
    if (rows.length === 0) return [] as string[];
    const keys = Object.keys(rows[0] || {});
    const preferred = ["date", "time", "total", "renewable", "nonRenewable", "fuelType", "value"];
    return [...preferred.filter((k) => keys.includes(k)), ...keys.filter((k) => !preferred.includes(k))];
  }, [rows]);

  const filteredRows = useMemo(() => {
    if (!search) return rows;
    const lower = search.toLowerCase();
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(lower));
  }, [rows, search]);

  const displayColumns = useMemo(() => {
    if (dataset === "generation") return generationOrder;
    if (dataset === "ptf") return ["date", "hour", "price"];
    if (dataset === "load-plan") return ["date", "hour", "lep"];
    if (dataset === "weighted-avg") return ["date", "hour", "price"];
    return columns;
  }, [dataset, columns]);

  const displayRows: Record<string, unknown>[] = useMemo(() => {
    if (dataset === "generation") {
      return filteredRows.map((row) => {
        const source = row as Record<string, unknown>;
        const dateValue = typeof source.date === "string" ? source.date : "";
        const datePart = dateValue ? dateValue.slice(0, 10) : "";
        const timePart = dateValue ? dateValue.slice(11, 16) : String(source.hour || "");
        const mapped: Record<string, unknown> = {
          date: datePart ? datePart.split("-").reverse().join(".") : dateValue,
          hour: timePart,
        };
        generationOrder.forEach((key) => {
          if (key === "date" || key === "hour") return;
          const aliases = generationMap[key]?.aliases || [key];
          mapped[key] = formatNumber(pickValue(source, aliases) ?? 0);
        });
        return mapped;
      });
    }
    if (dataset === "ptf") {
      return filteredRows.map((row) => {
        const source = row as Record<string, unknown>;
        const dateValue = String(pickValue(source, ptfMap.date.aliases) || "");
        const hourValue = String(pickValue(source, ptfMap.hour.aliases) || "");
        return {
          date: formatDateLabel(dateValue),
          hour: formatTimeLabel(hourValue || dateValue),
          price: formatNumber(pickValue(source, ptfMap.price.aliases) ?? 0),
        } as Record<string, unknown>;
      });
    }
    if (dataset === "load-plan") {
      return filteredRows.map((row) => {
        const source = row as Record<string, unknown>;
        const dateValue = String(pickValue(source, loadPlanMap.date.aliases) || "");
        const hourValue = String(pickValue(source, loadPlanMap.hour.aliases) || "");
        return {
          date: formatDateLabel(dateValue),
          hour: formatTimeLabel(hourValue || dateValue),
          lep: formatNumber(pickValue(source, loadPlanMap.lep.aliases) ?? 0),
        } as Record<string, unknown>;
      });
    }
    if (dataset === "weighted-avg") {
      return filteredRows.map((row) => {
        const source = row as Record<string, unknown>;
        const dateValue = String(pickValue(source, weightedAvgMap.date.aliases) || "");
        const hourValue = String(pickValue(source, weightedAvgMap.hour.aliases) || "");
        return {
          date: formatDateLabel(dateValue),
          hour: formatTimeLabel(hourValue || dateValue),
          price: formatNumber(pickValue(source, weightedAvgMap.price.aliases) ?? 0),
        } as Record<string, unknown>;
      });
    }
    return filteredRows;
  }, [dataset, filteredRows]);


  const columnIsNumeric = useMemo(() => {
    const result: Record<string, boolean> = {};
    if (dataset === "generation") {
      displayColumns.forEach((col) => { result[col] = col !== "date" && col !== "hour"; });
      return result;
    }
    if (dataset === "ptf" || dataset === "weighted-avg") {
      displayColumns.forEach((col) => { result[col] = col === "price"; });
      return result;
    }
    if (dataset === "load-plan") {
      displayColumns.forEach((col) => { result[col] = col === "lep"; });
      return result;
    }
    const sample = displayRows[0] || {};
    displayColumns.forEach((col) => {
      const value = (sample as Record<string, unknown>)[col];
      if (typeof value === "number") { result[col] = true; return; }
      if (typeof value === "string") {
        const normalized = value.replace(/[\s,]/g, "");
        result[col] = /^-?\d+(\.\d+)?$/.test(normalized);
        return;
      }
      result[col] = false;
    });
    return result;
  }, [dataset, displayRows, displayColumns]);

  const totalRow = useMemo(() => {
    if (displayRows.length === 0) return null;
    const totals: Record<string, unknown> = {};
    if (dataset === "generation") {
      totals.date = copy.total;
      totals.hour = "";
      generationOrder.forEach((key) => {
        if (key === "date" || key === "hour") return;
        const aliases = generationMap[key]?.aliases || [key];
        const sum = filteredRows.reduce((acc, row) => acc + parseNumber(pickValue(row as Record<string, unknown>, aliases)), 0);
        totals[key] = formatNumber(sum);
      });
      return totals;
    }
    totals[displayColumns[0] || "label"] = copy.total;
    displayColumns.forEach((col) => {
      if (!columnIsNumeric[col]) return;
      const sum = filteredRows.reduce((acc, row) => acc + parseNumber((row as Record<string, unknown>)[col]), 0);
      totals[col] = formatNumber(sum);
    });
    return totals;
  }, [dataset, displayRows.length, displayColumns, filteredRows, columnIsNumeric, copy.total]);

  const datasetLabel = {
    generation: copy.optGeneration,
    "yekdem-unit-cost": copy.optYekdem,
    ptf: copy.optPtf,
    "load-plan": copy.optLoadPlan,
    "weighted-avg": copy.optWeightedAvg,
  }[dataset];

  /* CSV export — professional, Excel-compatible */
  const exportCsv = () => {
    if (displayRows.length === 0) return;
    const safeLang = language === "en" || language === "ru" ? language : "tr";
    const labelFor = (label: { tr: string; en: string; ru: string } | string) =>
      typeof label === "string" ? label : label[safeLang] || label.tr;
    const getColumnMap = () => {
      if (dataset === "generation") return generationMap;
      if (dataset === "ptf") return ptfMap;
      if (dataset === "load-plan") return loadPlanMap;
      if (dataset === "weighted-avg") return weightedAvgMap;
      return {};
    };
    const colMap = getColumnMap();
    const escapeCell = (val: string) => {
      const s = String(val);
      if (s.includes('"') || s.includes(';') || s.includes('\n') || s.includes('\r')) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return `"${s}"`;
    };

    const datasetLabels: Record<string, { tr: string; en: string; ru: string }> = {
      generation: { tr: "Gerçek Zamanlı Üretim", en: "Realtime Generation", ru: "Генерация в реальном времени" },
      ptf: { tr: "PTF (Piyasa Takas Fiyatı)", en: "PTF (Market Clearing Price)", ru: "PTF (рыночная цена)" },
      "yekdem-unit-cost": { tr: "YEKDEM Birim Maliyet", en: "YEKDEM Unit Cost", ru: "YEKDEM стоимость" },
      "load-plan": { tr: "Yük Tahmin Planı", en: "Load Estimation Plan", ru: "План нагрузки" },
      "weighted-avg": { tr: "GİP Ağırlıklı Ortalama", en: "Weighted Average Price", ru: "Средневзвешенная цена" },
    };

    const reportLabel = datasetLabels[dataset]?.[safeLang] || dataset;
    const dateRangeLabel = safeLang === "en" ? "Date Range" : safeLang === "ru" ? "Период" : "Tarih Aralığı";
    const reportTitleLabel = safeLang === "en" ? "Report" : safeLang === "ru" ? "Отчёт" : "Rapor";
    const sourceLabel = safeLang === "en" ? "Source" : safeLang === "ru" ? "Источник" : "Kaynak";
    const generatedLabel = safeLang === "en" ? "Generated" : safeLang === "ru" ? "Создано" : "Oluşturulma";
    const recordCountLabel = safeLang === "en" ? "Records" : safeLang === "ru" ? "Записей" : "Kayıt Sayısı";

    const now = new Date();
    const generatedAt = now.toLocaleString(safeLang === "en" ? "en-GB" : safeLang === "ru" ? "ru-RU" : "tr-TR", {
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    /* Header block — STR Energy branding */
    const colCount = displayColumns.length;
    const pad = (text: string) => {
      const cells = [escapeCell(text)];
      for (let i = 1; i < colCount; i++) cells.push('""');
      return cells.join(";");
    };

    const brandingRows = [
      pad("═══════════════════════════════════════════"),
      pad("STR ENERGY — www.str.energy"),
      pad(`${reportTitleLabel}: ${reportLabel}`),
      pad(`${dateRangeLabel}: ${displayDate(startDate)} — ${displayDate(endDate)}`),
      pad(`${sourceLabel}: EPİAŞ / EXIST`),
      pad(`${generatedLabel}: ${generatedAt}`),
      pad(`${recordCountLabel}: ${displayRows.length}`),
      pad("═══════════════════════════════════════════"),
      pad(""), /* empty line before data */
    ];

    const headers = displayColumns.map((col) => escapeCell(labelFor(colMap[col]?.label || col)));
    const dataLines = displayRows.map((row) =>
      displayColumns.map((col) => escapeCell(String(row[col] ?? ""))).join(";")
    );


    const BOM = "\ufeff";
    const csvContent = BOM + [...brandingRows, headers.join(";"), ...dataLines].join("\r\n");
    const datasetNames: Record<string, string> = {
      generation: "uretim", ptf: "ptf", "yekdem-unit-cost": "yekdem",
      "load-plan": "yuk-tahmin", "weighted-avg": "gip-aof",
    };
    const fileName = `STR-Energy_${datasetNames[dataset] || dataset}_${startDate}_${endDate}.csv`;

    /* Use data URI for reliable download with correct filename */
    const encodedCsv = encodeURIComponent(csvContent);
    const dataUri = `data:text/csv;charset=utf-8,${encodedCsv}`;
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const safeLang = language === "en" || language === "ru" ? language : "tr";
  const labelFor = (label: { tr: string; en: string; ru: string } | string) =>
    typeof label === "string" ? label : label[safeLang] || label.tr;
  const getMapForDataset = () => {
    if (dataset === "generation") return generationMap;
    if (dataset === "ptf") return ptfMap;
    if (dataset === "load-plan") return loadPlanMap;
    if (dataset === "weighted-avg") return weightedAvgMap;
    return {} as Record<string, { label: { tr: string; en: string; ru: string }; aliases: string[] }>;
  };

  /* theme styles */
  const sectionBg = isDark ? "bg-zinc-950/50" : "bg-gradient-to-b from-zinc-50 to-white";
  const cardBg = isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-white border-zinc-200 shadow-xl shadow-black/[0.03]";
  const headingColor = isDark ? "text-white" : "text-zinc-900";
  const subtextColor = isDark ? "text-zinc-400" : "text-zinc-500";
  const inputBg = isDark ? "bg-zinc-900 border-zinc-700 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900";
  const tableBorderColor = isDark ? "border-zinc-800" : "border-zinc-100";
  const tableHeaderBg = isDark ? "bg-zinc-900/50" : "bg-zinc-50";
  const tableRowEven = isDark ? "bg-zinc-900/30" : "bg-zinc-50/50";

  /* region tabs */
  const regions: { key: RegionKey; label: string; flag: string; active: boolean }[] = [
    { key: "tr", label: copy.regionTR, flag: "/flags/tr.svg", active: true },
    { key: "eu", label: copy.regionEU, flag: "/flags/eu.svg", active: false },
    { key: "global", label: copy.regionGlobal, flag: "/flags/global.svg", active: false },
  ];

  /* dataset options */
  const datasetOptions: { value: DatasetKey; label: string; icon: typeof Zap }[] = [
    { value: "generation", label: copy.optGeneration, icon: Zap },
    { value: "ptf", label: copy.optPtf, icon: TrendingUp },
    { value: "yekdem-unit-cost", label: copy.optYekdem, icon: BarChart3 },
    { value: "load-plan", label: copy.optLoadPlan, icon: TrendingUp },
    { value: "weighted-avg", label: copy.optWeightedAvg, icon: BarChart3 },
  ];

  return (
    <section id="live-energy" className={`py-16 md:py-24 ${sectionBg}`}>
      <div className="container">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold tracking-wider mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {copy.badge}
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${headingColor}`}>
            {copy.headline}
          </h2>
          <p className={`max-w-2xl mx-auto ${subtextColor}`}>{copy.subhead}</p>
        </motion.div>

        {/* ── Main Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl border overflow-hidden ${cardBg}`}
        >
          {/* Region Tabs */}
          <div className={`flex items-center gap-1 p-1.5 border-b ${tableBorderColor}`}>
            {regions.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => r.active && setRegion(r.key)}
                className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  region === r.key
                    ? isDark
                      ? "bg-zinc-800 text-white shadow-lg"
                      : "bg-white text-zinc-900 shadow-md"
                    : r.active
                      ? isDark
                        ? "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                      : "text-zinc-600 opacity-50 cursor-not-allowed"
                }`}
              >
                <Image
                  src={r.flag}
                  alt={r.label}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full object-cover"
                  style={r.key !== "global" ? { boxShadow: "0 0 0 1px rgba(0,0,0,0.1)" } : {}}
                />
                <span>{r.label}</span>
                {!r.active && (
                  <span className="ml-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500">
                    {copy.comingSoon}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Controls Bar */}
          <div className={`px-5 py-4 border-b ${tableBorderColor}`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-wrap items-end gap-3">
                {/* Dataset selector */}
                <div className="flex flex-col gap-1.5">
                  <label className={`text-[11px] font-semibold uppercase tracking-wider ${subtextColor}`}>
                    {copy.dataset}
                  </label>
                  <select
                    value={dataset}
                    onChange={(e) => setDataset(e.target.value as DatasetKey)}
                    className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/30 ${inputBg}`}
                  >
                    {datasetOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Start date */}
                <div ref={startRef} className="relative flex flex-col gap-1.5">
                  <label className={`text-[11px] font-semibold uppercase tracking-wider ${subtextColor}`}>
                    {copy.start}
                  </label>
                  <button
                    type="button"
                    onClick={() => setStartOpen((p) => !p)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition focus:ring-2 focus:ring-orange-500/30 ${inputBg}`}
                  >
                    <Calendar className="h-3.5 w-3.5 opacity-50" />
                    <span>{displayDate(startDate)}</span>
                  </button>
                  <AnimatePresence>
                    {startOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className={`absolute left-0 top-full z-30 mt-2 w-64 rounded-xl border p-3 shadow-2xl ${isDark ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`}
                      >
                        <div className="flex items-center justify-between pb-2">
                          <button type="button" onClick={() => setStartView(new Date(startView.getFullYear(), startView.getMonth() - 1, 1))} className={`h-7 w-7 rounded-full flex items-center justify-center ${isDark ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-600"}`}>
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <span className={`text-sm font-semibold ${headingColor}`}>{monthLabel(startView)}</span>
                          <button type="button" onClick={() => setStartView(new Date(startView.getFullYear(), startView.getMonth() + 1, 1))} className={`h-7 w-7 rounded-full flex items-center justify-center ${isDark ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-600"}`}>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-0.5 text-[11px] text-zinc-500 mb-1">
                          {copy.dayNames.map((d) => <div key={d} className="text-center py-1">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-0.5">
                          {buildCalendar(startView).map((cell, idx) => {
                            if (!cell.date) return <div key={`e-${idx}`} className="h-8" />;
                            const val = toDateString(cell.date);
                            const isSel = val === startDate;
                            return (
                              <button key={val} type="button" onClick={() => { setStartDate(val); setStartOpen(false); }}
                                className={`h-8 rounded-lg text-sm transition ${isSel ? "bg-orange-500 text-white font-semibold" : isDark ? "text-zinc-200 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`}
                              >{cell.label}</button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* End date */}
                <div ref={endRef} className="relative flex flex-col gap-1.5">
                  <label className={`text-[11px] font-semibold uppercase tracking-wider ${subtextColor}`}>
                    {copy.end}
                  </label>
                  <button
                    type="button"
                    onClick={() => setEndOpen((p) => !p)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition focus:ring-2 focus:ring-orange-500/30 ${inputBg}`}
                  >
                    <Calendar className="h-3.5 w-3.5 opacity-50" />
                    <span>{displayDate(endDate)}</span>
                  </button>
                  <AnimatePresence>
                    {endOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className={`absolute left-0 top-full z-30 mt-2 w-64 rounded-xl border p-3 shadow-2xl ${isDark ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`}
                      >
                        <div className="flex items-center justify-between pb-2">
                          <button type="button" onClick={() => setEndView(new Date(endView.getFullYear(), endView.getMonth() - 1, 1))} className={`h-7 w-7 rounded-full flex items-center justify-center ${isDark ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-600"}`}>
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <span className={`text-sm font-semibold ${headingColor}`}>{monthLabel(endView)}</span>
                          <button type="button" onClick={() => setEndView(new Date(endView.getFullYear(), endView.getMonth() + 1, 1))} className={`h-7 w-7 rounded-full flex items-center justify-center ${isDark ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-600"}`}>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-0.5 text-[11px] text-zinc-500 mb-1">
                          {copy.dayNames.map((d) => <div key={d} className="text-center py-1">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-0.5">
                          {buildCalendar(endView).map((cell, idx) => {
                            if (!cell.date) return <div key={`e2-${idx}`} className="h-8" />;
                            const val = toDateString(cell.date);
                            const isSel = val === endDate;
                            return (
                              <button key={val} type="button" onClick={() => { setEndDate(val); setEndOpen(false); }}
                                className={`h-8 rounded-lg text-sm transition ${isSel ? "bg-orange-500 text-white font-semibold" : isDark ? "text-zinc-200 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`}
                              >{cell.label}</button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Search */}
                <div className="flex flex-col gap-1.5">
                  <label className={`text-[11px] font-semibold uppercase tracking-wider ${subtextColor}`}>
                    &nbsp;
                  </label>
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 ${subtextColor}`} />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={copy.searchPlaceholder}
                      className={`rounded-lg border pl-8 pr-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/30 w-44 ${inputBg}`}
                    />
                  </div>
                </div>
              </div>

              {/* Query Button */}
              <button
                type="button"
                onClick={fetchData}
                disabled={isLoading || region !== "tr"}
                className={`inline-flex items-center justify-center rounded-xl px-10 py-3 text-sm font-bold tracking-wide uppercase transition-all duration-200 ${
                  isLoading
                    ? "opacity-60 cursor-wait"
                    : "hover:shadow-xl hover:shadow-orange-500/25 active:scale-[0.97] hover:-translate-y-0.5"
                } bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 text-white`}
                style={{ backgroundSize: "200% 100%" }}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {copy.query}
              </button>
            </div>
          </div>

          {/* KPI Strip */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-px ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`}>
            {[
              { icon: Database, label: copy.records, value: String(displayRows.length) },
              { icon: BarChart3, label: copy.columns, value: String(displayColumns.length) },
              { icon: Clock, label: copy.range, value: `${displayDate(startDate)} – ${displayDate(endDate)}` },
              { icon: TrendingUp, label: copy.dataset, value: datasetLabel },
            ].map((kpi) => (
              <div key={kpi.label} className={`flex items-center gap-3 px-5 py-3.5 ${isDark ? "bg-zinc-900/80" : "bg-white"}`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`}>
                  <kpi.icon className={`h-4 w-4 ${isDark ? "text-orange-400" : "text-orange-500"}`} />
                </div>
                <div className="min-w-0">
                  <div className={`text-[10px] font-semibold uppercase tracking-wider ${subtextColor}`}>{kpi.label}</div>
                  <div className={`text-sm font-semibold truncate ${headingColor}`}>{kpi.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Area */}
          <div className="relative">
            {/* Loading overlay — shimmer skeleton when no data yet, blur when data exists */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`${displayRows.length > 0 ? "absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-sm" : ""}`}
                >
                  {displayRows.length > 0 ? (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-medium shadow-xl">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {language === "tr" ? "Yükleniyor…" : language === "ru" ? "Загрузка…" : "Loading…"}
                    </div>
                  ) : (
                    /* Shimmer skeleton table */
                    <div className="w-full">
                      {/* Skeleton header row */}
                      <div className={`flex gap-px border-b ${tableBorderColor}`}>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={`sh-${i}`}
                            className={`flex-1 px-3 py-3 ${isDark ? "bg-zinc-900/80" : "bg-zinc-50"}`}
                          >
                            <div className={`h-2.5 rounded-full animate-pulse ${isDark ? "bg-zinc-700" : "bg-zinc-200"}`} style={{ width: `${50 + (i % 3) * 20}%`, animationDelay: `${i * 80}ms` }} />
                          </div>
                        ))}
                      </div>
                      {/* Skeleton data rows */}
                      {Array.from({ length: 8 }).map((_, rowIdx) => (
                        <div
                          key={`sr-${rowIdx}`}
                          className={`flex gap-px border-b ${tableBorderColor}`}
                        >
                          {Array.from({ length: 6 }).map((_, colIdx) => (
                            <div
                              key={`sc-${rowIdx}-${colIdx}`}
                              className={`flex-1 px-3 py-3 ${isDark ? "bg-zinc-900/40" : "bg-white"}`}
                            >
                              <div
                                className={`h-2 rounded-full animate-pulse ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`}
                                style={{
                                  width: `${30 + ((rowIdx + colIdx) % 5) * 15}%`,
                                  animationDelay: `${(rowIdx * 6 + colIdx) * 60}ms`,
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                      {/* Spinner badge */}
                      <div className="flex justify-center py-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-medium shadow-xl">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {language === "tr" ? "Veriler yükleniyor…" : language === "ru" ? "Загрузка данных…" : "Loading data…"}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {error && (
              <div className={`mx-5 my-4 rounded-lg border px-4 py-3 text-sm ${isDark ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-red-200 bg-red-50 text-red-600"}`}>
                {error}
              </div>
            )}

            {/* Empty state */}
            {!error && displayRows.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`}>
                  <Database className={`h-6 w-6 ${subtextColor}`} />
                </div>
                <p className={`text-sm ${subtextColor}`}>{copy.noData}</p>
                <p className={`text-xs ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
                  {copy.start} & {copy.end} → {copy.query}
                </p>
              </div>
            )}

            {/* Data Table */}
            {displayRows.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={`${tableHeaderBg} border-b ${tableBorderColor}`}>
                      {displayColumns.map((col) => (
                        <th
                          key={col}
                          className={`px-3 py-2.5 font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap ${
                            columnIsNumeric[col] ? "text-right" : "text-left"
                          } ${subtextColor}`}
                        >
                          {labelFor(getMapForDataset()[col]?.label || col)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayRows.map((row, index) => (
                      <tr
                        key={index}
                        className={`border-b ${tableBorderColor} transition-colors ${
                          index % 2 === 0 ? tableRowEven : ""
                        } ${isDark ? "hover:bg-zinc-800/50" : "hover:bg-orange-50/50"}`}
                      >
                        {displayColumns.map((col) => (
                          <td
                            key={col}
                            className={`px-3 py-2 whitespace-nowrap text-xs ${
                              columnIsNumeric[col]
                                ? `text-right tabular-nums ${isDark ? "text-zinc-300" : "text-zinc-700"}`
                                : `text-left ${isDark ? "text-zinc-400" : "text-zinc-600"}`
                            }`}
                          >
                            {columnIsNumeric[col] ? String(row[col] ?? "0,00") : String(row[col] ?? "-")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  {totalRow && (
                    <tfoot>
                      <tr className={`${isDark ? "bg-zinc-800/50" : "bg-orange-50"} border-t-2 ${isDark ? "border-zinc-700" : "border-orange-200"}`}>
                        {displayColumns.map((col, idx) => (
                          <td
                            key={col}
                            className={`px-3 py-2.5 text-xs font-bold ${
                              columnIsNumeric[col]
                                ? `text-right tabular-nums ${isDark ? "text-orange-400" : "text-orange-600"}`
                                : `text-left ${headingColor}`
                            }`}
                          >
                            {idx === 0 ? copy.total : String(totalRow[col] ?? (columnIsNumeric[col] ? "0,00" : ""))}
                          </td>
                        ))}
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-5 py-3 border-t ${tableBorderColor}`}>
            <div className={`flex flex-wrap items-center gap-3 text-[11px] ${subtextColor}`}>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {copy.source}: <span className={`font-semibold ${headingColor}`}>EPİAŞ</span>
              </span>
              {lastFetchTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {copy.lastUpdate}: <span className={`font-semibold ${headingColor}`}>{lastFetchTime}</span>
                </span>
              )}
              <span>{displayRows.length} {copy.records.toLowerCase()}</span>
            </div>
            <button
              type="button"
              onClick={exportCsv}
              disabled={displayRows.length === 0}
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition ${
                displayRows.length > 0
                  ? isDark
                    ? "text-orange-400 hover:bg-orange-500/10 border border-orange-500/20"
                    : "text-orange-600 hover:bg-orange-50 border border-orange-200"
                  : "opacity-30 cursor-not-allowed border border-transparent"
              }`}
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              {copy.exportCsv}
            </button>
          </div>



        </motion.div>
      </div>
    </section>
  );
}
