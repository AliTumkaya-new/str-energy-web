"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Cable,
  CircleDollarSign,
  Factory,
  FileCheck2,
  Gauge,
  ScanSearch,
  Sparkles,
  TrendingDown,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const copyByLanguage = {
  tr: {
    launch: "YENİ ÜRÜN · STR ENERGY INTELLIGENCE PLATFORM",
    title: "Enerjiyi ölçen değil,",
    accent: "performansı açıklayan platform.",
    description:
      "RS485 / Modbus ve enerji analizörlerinden gelen veriyi tek karar katmanında birleştirir. Normalde ne kadar üretim ve tüketim olması gerektiğini hesaplar; gerçekleşen farkı, kaynağını ve işletmeye etkisini açıklar.",
    primary: "Platformu keşfet",
    secondary: "Pilot görüşmesi planla",
    proof: "SAHADAN KARARA TEK VERİ ZİNCİRİ",
    steps: ["BAĞLAN", "İZLE", "TAHMİN ET", "AÇIKLA", "İYİLEŞTİR"],
    screen: "TEMSİLİ CANLI ANALİZ",
    line: "Hat 02 · Son vardiya",
    expected: "Beklenen üretim",
    actual: "Gerçekleşen üretim",
    unit: "adet",
    gap: "Performans farkı",
    intensity: "Özgül enerji sapması",
    root: "Öne çıkan olası neden",
    rootValue: "Plansız duruş ve yeniden başlatma",
    confidence: "Açıklanan fark",
    note: "Temsili değerlerdir; gerçek model tesis verisiyle kalibre edilir.",
    capability: "TEK ÜRÜN · UÇTAN UCA YETENEK",
    features: [
      ["RS485 / Modbus entegrasyonu", "Analizör, sayaç, PLC ve saha ekipmanı"],
      ["Gerçek zamanlı izleme", "Tesis, hat, proses ve ekipman görünümü"],
      ["AI anomali tespiti", "Sapma, önem derecesi ve kök neden sinyali"],
      ["Tüketim ve üretim tahmini", "Beklenen değer ve gerçekleşen performans farkı"],
      ["Maliyet ve karbon etkisi", "Her sapmanın parasal ve emisyon karşılığı"],
      ["ISO 50001 raporlaması", "Baz çizgi, EnPI ve denetlenebilir kanıt akışı"],
      ["Dijital ikiz analizi", "Ekipman davranışını proses bağlamında modelleme"],
    ],
  },
  en: {
    launch: "NEW PRODUCT · STR ENERGY INTELLIGENCE PLATFORM",
    title: "Not another energy meter —",
    accent: "a platform that explains performance.",
    description:
      "It unifies RS485 / Modbus and energy-analyzer data in one decision layer. It calculates expected production and consumption, then explains the actual gap, its likely source and business impact.",
    primary: "Explore the platform",
    secondary: "Plan a pilot conversation",
    proof: "ONE DATA CHAIN FROM FIELD TO DECISION",
    steps: ["CONNECT", "MONITOR", "FORECAST", "EXPLAIN", "IMPROVE"],
    screen: "ILLUSTRATIVE LIVE ANALYSIS",
    line: "Line 02 · Last shift",
    expected: "Expected production",
    actual: "Actual production",
    unit: "units",
    gap: "Performance gap",
    intensity: "Specific energy deviation",
    root: "Leading likely cause",
    rootValue: "Unplanned stop and restart",
    confidence: "Gap explained",
    note: "Illustrative values; production models are calibrated with facility data.",
    capability: "ONE PRODUCT · END-TO-END CAPABILITY",
    features: [
      ["RS485 / Modbus integration", "Analyzers, meters, PLCs and field equipment"],
      ["Real-time monitoring", "Facility, line, process and equipment visibility"],
      ["AI anomaly detection", "Deviation, severity and root-cause signals"],
      ["Consumption and production forecasts", "Expected values and actual performance gaps"],
      ["Cost and carbon impact", "Financial and emissions impact of every deviation"],
      ["ISO 50001 reporting", "Baselines, EnPIs and auditable evidence flows"],
      ["Digital twin analytics", "Equipment behavior modeled in process context"],
    ],
  },
  ru: {
    launch: "НОВЫЙ ПРОДУКТ · STR ENERGY INTELLIGENCE PLATFORM",
    title: "Не просто измеряет энергию —",
    accent: "объясняет эффективность.",
    description:
      "Платформа объединяет RS485 / Modbus и анализаторы энергии в едином уровне решений. Она рассчитывает ожидаемое производство и потребление, а затем объясняет фактический разрыв, его источник и влияние на бизнес.",
    primary: "Посмотреть платформу",
    secondary: "Обсудить пилот",
    proof: "ЕДИНАЯ ЦЕПОЧКА ОТ ПОЛЯ ДО РЕШЕНИЯ",
    steps: ["ПОДКЛЮЧИТЬ", "КОНТРОЛИРОВАТЬ", "ПРОГНОЗ", "ОБЪЯСНИТЬ", "УЛУЧШИТЬ"],
    screen: "ПРИМЕР АНАЛИЗА В РЕАЛЬНОМ ВРЕМЕНИ",
    line: "Линия 02 · Последняя смена",
    expected: "Ожидаемое производство",
    actual: "Фактическое производство",
    unit: "ед.",
    gap: "Разрыв эффективности",
    intensity: "Отклонение удельной энергии",
    root: "Основная вероятная причина",
    rootValue: "Незапланированный останов и перезапуск",
    confidence: "Объясненная доля разрыва",
    note: "Значения приведены для примера; модель калибруется данными предприятия.",
    capability: "ОДИН ПРОДУКТ · ПОЛНЫЙ ЦИКЛ",
    features: [
      ["Интеграция RS485 / Modbus", "Анализаторы, счетчики, PLC и полевое оборудование"],
      ["Мониторинг в реальном времени", "Объект, линия, процесс и оборудование"],
      ["ИИ-обнаружение аномалий", "Отклонение, приоритет и сигналы причин"],
      ["Прогноз потребления и выпуска", "Ожидаемые значения и фактический разрыв"],
      ["Затраты и углерод", "Финансовое и эмиссионное влияние отклонений"],
      ["Отчетность ISO 50001", "Базовые линии, EnPI и проверяемые доказательства"],
      ["Аналитика цифрового двойника", "Модель оборудования в контексте процесса"],
    ],
  },
} as const;

const icons = [Cable, Activity, BrainCircuit, TrendingDown, CircleDollarSign, FileCheck2, Factory];

export default function ProductsGrid() {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const copy = copyByLanguage[language] ?? copyByLanguage.tr;
  const isDark = theme === "dark";

  return (
    <section id="products" className={`py-20 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className={`text-3xl font-bold md:text-5xl ${isDark ? "text-white" : "text-zinc-950"}`}>{t("products.title")}</h2>
          <p className={`mx-auto mt-5 max-w-3xl leading-7 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{t("products.subtitle")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 text-white shadow-2xl shadow-orange-950/20">
          <div className="pointer-events-none absolute -left-40 -top-44 h-[34rem] w-[34rem] rounded-full bg-orange-500/15 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.12),transparent_48%)]" />

          <div className="relative grid gap-10 p-7 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-14">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-orange-400"><Sparkles className="h-4 w-4" /> {copy.launch}</div>
              <h3 className="mt-7 max-w-2xl text-4xl font-bold leading-[1.08] md:text-6xl">{copy.title}<br /><span className="text-orange-500">{copy.accent}</span></h3>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">{copy.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={withLocale("/products/energy-intelligence-platform")} className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-orange-400">{copy.primary}<ArrowRight className="h-4 w-4" /></Link>
                <Link href={withLocale("/contacts")} className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5">{copy.secondary}</Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/70 p-5 shadow-2xl shadow-black/40 backdrop-blur md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div><div className="text-[10px] font-semibold tracking-[0.16em] text-orange-500">{copy.screen}</div><div className="mt-1 text-sm text-zinc-400">{copy.line}</div></div>
                <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"/>LIVE</div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Metric label={copy.expected} value="1.240" suffix={copy.unit} />
                <Metric label={copy.actual} value="1.108" suffix={copy.unit} warning />
                <Metric label={copy.gap} value="−10,6" suffix="%" warning />
                <Metric label={copy.intensity} value="+14,6" suffix="%" warning />
              </div>
              <div className="mt-3 rounded-2xl border border-orange-500/20 bg-orange-500/[0.07] p-4">
                <div className="flex items-start gap-3"><ScanSearch className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" /><div><div className="text-xs text-zinc-500">{copy.root}</div><div className="mt-1 text-sm font-semibold text-white">{copy.rootValue}</div></div></div>
                <div className="mt-4 flex items-center justify-between text-xs"><span className="text-zinc-500">{copy.confidence}</span><span className="font-semibold text-orange-400">%86</span></div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[86%] rounded-full bg-gradient-to-r from-orange-600 to-orange-400"/></div>
              </div>
              <p className="mt-4 text-[11px] leading-5 text-zinc-600">{copy.note}</p>
            </div>
          </div>

          <div className="relative border-y border-white/10 bg-white/[0.025] px-7 py-6 md:px-10 lg:px-14">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold tracking-[0.16em] text-zinc-500"><Gauge className="h-4 w-4 text-orange-500"/>{copy.proof}</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {copy.steps.map((step, index) => <div key={step} className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-orange-500/25 bg-orange-500/10 text-[10px] font-bold text-orange-400">0{index + 1}</span><span className="text-xs font-semibold tracking-wide text-zinc-300">{step}</span>{index < copy.steps.length - 1 && <ArrowRight className="ml-auto hidden h-3 w-3 text-zinc-700 sm:block"/>}</div>)}
            </div>
          </div>

          <div className="relative p-7 md:p-10 lg:p-14">
            <div className="mb-7 text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.capability}</div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {copy.features.map(([title, description], index) => { const Icon = icons[index]; return <div key={title} className="bg-zinc-950 p-5 md:p-6"><Icon className="h-5 w-5 text-orange-500"/><h4 className="mt-4 text-sm font-semibold text-white">{title}</h4><p className="mt-2 text-xs leading-5 text-zinc-500">{description}</p></div>; })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Metric({ label, value, suffix, warning = false }: { label: string; value: string; suffix: string; warning?: boolean }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><div className="text-[11px] leading-4 text-zinc-500">{label}</div><div className={`mt-3 text-2xl font-semibold ${warning ? "text-orange-400" : "text-white"}`}>{value}<span className="ml-1 text-xs font-normal text-zinc-600">{suffix}</span></div></div>;
}
