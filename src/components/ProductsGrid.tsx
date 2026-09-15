"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  Cable,
  CheckCircle2,
  CircleDollarSign,
  Cpu,
  Factory,
  FileCheck2,
  Gauge,
  Layers,
  Radio,
  RotateCcw,
  ScanSearch,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";
import CircuitBoardPattern from "@/components/CircuitBoardPattern";

const copyByLanguage = {
  tr: {
    badge: "YENİ ÜRÜN",
    productName: "STR ENERGY INTELLIGENCE PLATFORM",
    heading: "Veriyi Karara Dönüştüren",
    headingAccent: "Dört Çekirdek Yetenek.",
    intro:
      "Geleneksel SCADA ve sayaçlar yalnızca geçmişi kaydeder. STR Karar Katmanı ise sahadaki yüksek frekanslı telemetriyi yapay zekâ, tahmin ve dijital ikiz modelleriyle işleyerek operasyonel kararlara dönüştürür.",
    primaryBtn: "Platformu keşfet",
    secondaryBtn: "Pilot görüşmesi planla",

    // The 4 requested capability pillars
    pillars: [
      {
        id: "forecast",
        badge: "ÖNGÖRÜ MOTORU",
        title: "Enerji ve Üretim Tahmini",
        desc: "Gelecek vardiya tüketimini, pik talep riskini ve beklenen üretimi makine öğrenimi modelleriyle saatlik hassasiyetle hesaplar.",
      },
      {
        id: "anomaly",
        badge: "GERÇEK ZAMANLI ML",
        title: "Yapay Zekâ Anomali Tespiti",
        desc: "Faz dengesizliği, aşırı reaktif güç, beklenmeyen tüketim sıçramaları ve sinsi verim kayıplarını milisaniyeler içinde yakalar.",
      },
      {
        id: "twin",
        badge: "TERMAL & ELEKTRİKSEL MODEL",
        title: "Fizik Tabanlı Dijital İkiz",
        desc: "Tesis ve ekipman davranışını gerçek çalışma prosesi, motor yükleri ve ortam dinamikleriyle eş zamanlı simüle eder.",
      },
      {
        id: "rootcause",
        badge: "KARAR & MALİYET ANALİTİĞİ",
        title: "Açıklanabilir Kök Neden Katmanı",
        desc: "Beklenen ile gerçekleşen arasındaki farkın kaynağını, plansız duruş maliyetini ve net aksiyon önerilerini raporlar.",
      },
    ],

    // Pipeline visuals
    pipelineTitle: "CANLI TELEMETRİ & KARAR AKIŞI",
    pipelineSub: "Hat 02 · 3x400V Modbus Ağ Geçidi",
    liveBadge: "CANLI OT AKIŞI",
    nodeField: "Saha Cihazları",
    nodeFieldSub: "RS485 / Modbus RTU",
    nodeGateway: "Edge Gateway",
    nodeGatewaySub: "Önişleme · 100ms",
    nodeDecision: "STR Karar Katmanı",
    nodeDecisionSub: "Yapay Zekâ & Çıkarım",

    // Simulator controls
    simNormal: "Normal Çalışma",
    simAnomaly: "Anomali Simüle Et",
    simNormalDesc: "Tüm proses parametreleri nominal eşikler dahilinde.",
    simAnomalyTitle: "KRİTİK SAPMA: +19.6% AŞIRI YÜK",
    simAnomalyDesc: "Hat 02 Motor Sürücüsü: Faz-2 akım dengesizliği ve aşırı mekanik sürtünme tespit edildi. Önerilen aksiyon: Devir optimizasyonu.",

    // Tabs
    tabStream: "Canlı Veri Akışı",
    tabAnalysis: "Anomali Analizi",
    tabTwin: "Dijital İkiz",

    // Metrics
    metricPower: "Anlık Şebeke Gücü",
    metricPackets: "İşlenen Paket",
    metricConfidence: "AI Güven Skoru",
    metricExpected: "Beklenen Üretim",
    metricActual: "Gerçekleşen Üretim",
    metricGap: "Performans Farkı",
    unitPieces: "adet",

    // Chain & Grid
    chainTitle: "SAHADAN KARARA TEK VERİ ZİNCİRİ",
    chainSteps: ["BAĞLAN", "İZLE", "TAHMİN ET", "AÇIKLA", "İYİLEŞTİR"],
    gridTitle: "TEK ÜRÜN · UÇTAN UCA YETENEK",
    features: [
      ["RS485 / Modbus entegrasyonu", "Analizör, sayaç, PLC ve saha ekipmanları"],
      ["Gerçek zamanlı izleme", "Tesis, hat, proses ve ekipman görünümü"],
      ["AI anomali tespiti", "Sapma, önem derecesi ve kök neden sinyali"],
      ["Tüketim ve üretim tahmini", "Beklenen değer ve gerçekleşen performans farkı"],
      ["Maliyet ve karbon etkisi", "Her sapmanın parasal ve emisyon karşılığı"],
      ["ISO 50001 raporlaması", "Baz çizgi, EnPI ve denetlenebilir kanıt akışı"],
      ["Dijital ikiz analizi", "Ekipman davranışını proses bağlamında modelleme"],
      ["Uçtan uca güvenlik", "Endüstriyel seviye veri şifreleme ve yerel ağ güvenliği"],
    ],
    footnote: "Temsili telemetri simülasyonudur; modeller saha analizör verileriyle kalibre edilir.",
  },
  en: {
    badge: "NEW PRODUCT",
    productName: "STR ENERGY INTELLIGENCE PLATFORM",
    heading: "Four Core Capabilities",
    headingAccent: "Turning Data into Decisions.",
    intro:
      "Legacy SCADA and energy meters only record what happened in the past. The STR Decision Layer processes high-frequency field telemetry with AI, forecasting and digital twin models to drive operational decisions.",
    primaryBtn: "Explore platform",
    secondaryBtn: "Plan pilot meeting",

    pillars: [
      {
        id: "forecast",
        badge: "FORECASTING ENGINE",
        title: "Energy & Production Forecasting",
        desc: "Predicts upcoming shift consumption, peak demand spikes and expected throughput using machine learning models with hourly accuracy.",
      },
      {
        id: "anomaly",
        badge: "REAL-TIME ML",
        title: "AI Anomaly Detection",
        desc: "Detects phase imbalances, reactive power surges, unexpected spikes and hidden efficiency drains in milliseconds.",
      },
      {
        id: "twin",
        badge: "PHYSICS-INFORMED MODEL",
        title: "Digital Twin Simulation",
        desc: "Simulates facility and equipment behaviors against real operating parameters, motor loads and physical plant dynamics.",
      },
      {
        id: "rootcause",
        badge: "DECISION & COST ANALYTICS",
        title: "Explainable Root-Cause Layer",
        desc: "Pinpoints the exact drivers of expected-vs-actual performance gaps, downtime cost impact and actionable recommendations.",
      },
    ],

    pipelineTitle: "LIVE TELEMETRY & DECISION FLOW",
    pipelineSub: "Line 02 · 3x400V Modbus Gateway",
    liveBadge: "LIVE OT STREAM",
    nodeField: "Field Devices",
    nodeFieldSub: "RS485 / Modbus RTU",
    nodeGateway: "Edge Gateway",
    nodeGatewaySub: "Pre-processing · 100ms",
    nodeDecision: "STR Decision Layer",
    nodeDecisionSub: "AI Engine & Inference",

    simNormal: "Normal Operation",
    simAnomaly: "Simulate Anomaly",
    simNormalDesc: "All operational parameters within nominal thresholds.",
    simAnomalyTitle: "CRITICAL DEVIATION: +19.6% OVERLOAD",
    simAnomalyDesc: "Line 02 Motor Drive: Phase-2 imbalance and excessive mechanical friction detected. Recommended action: Speed optimization.",

    tabStream: "Live Data Stream",
    tabAnalysis: "Anomaly Analysis",
    tabTwin: "Digital Twin",

    metricPower: "Live Grid Power",
    metricPackets: "Processed Packets",
    metricConfidence: "AI Confidence",
    metricExpected: "Expected Output",
    metricActual: "Actual Output",
    metricGap: "Performance Gap",
    unitPieces: "units",

    chainTitle: "ONE DATA CHAIN FROM FIELD TO DECISION",
    chainSteps: ["CONNECT", "MONITOR", "FORECAST", "EXPLAIN", "OPTIMIZE"],
    gridTitle: "ONE PRODUCT · END-TO-END CAPABILITIES",
    features: [
      ["RS485 / Modbus integration", "Analyzers, meters, PLCs and field sensors"],
      ["Real-time telemetry", "Facility, line, process and machine visibility"],
      ["AI anomaly detection", "Deviation, severity and root-cause signaling"],
      ["Consumption & output forecasting", "Expected targets versus actual performance"],
      ["Cost & carbon impact", "Monetary and emission cost of every deviation"],
      ["ISO 50001 compliance", "Baselines, EnPIs and auditable evidence stream"],
      ["Digital twin modeling", "Equipment behavior modeled in process context"],
      ["End-to-end security", "Industrial-grade encryption and on-prem gateway isolation"],
    ],
    footnote: "Illustrative telemetry simulation; models are calibrated with plant analyzer data.",
  },
  ru: {
    badge: "НОВЫЙ ПРОДУКТ",
    productName: "STR ENERGY INTELLIGENCE PLATFORM",
    heading: "Четыре ключевых модуля,",
    headingAccent: "превращающих данные в решения.",
    intro:
      "Традиционные SCADA и счетчики лишь фиксируют историю. Уровень решений STR обрабатывает высокочастотную телеметрию с помощью ИИ, прогнозов и цифровых двойников для принятия оперативных решений.",
    primaryBtn: "Открыть платформу",
    secondaryBtn: "Обсудить пилот",

    pillars: [
      {
        id: "forecast",
        badge: "МОДУЛЬ ПРОГНОЗОВ",
        title: "Прогноз энергии и выработки",
        desc: "Рассчитывает потребление следующей смены, риск пиковых нагрузок и ожидаемый выпуск продукции с помощью моделей ML.",
      },
      {
        id: "anomaly",
        badge: "ML В РЕАЛЬНОМ ВРЕМЕНИ",
        title: "ИИ-обнаружение аномалий",
        desc: "Мгновенно выявляет перекос фаз, всплески реактивной мощности и скрытые потери эффективности оборудования.",
      },
      {
        id: "twin",
        badge: "ФИЗИЧЕСКАЯ МОДЕЛЬ",
        title: "Физический цифровой двойник",
        desc: "Моделирует динамику оборудования с учетом реального технологического процесса, нагрузок двигателей и условий среды.",
      },
      {
        id: "rootcause",
        badge: "АНАЛИТИКА ПЕРВОПРИЧИН",
        title: "Объяснимый уровень решений",
        desc: "Указывает точный источник разрыва между планом и фактом, рассчитывает стоимость простоя и дает четкие рекомендации.",
      },
    ],

    pipelineTitle: "ПОТОК ТЕЛЕМЕТРИИ И ПРИНЯТИЯ РЕШЕНИЙ",
    pipelineSub: "Линия 02 · Шлюз 3x400V Modbus",
    liveBadge: "ЖИВОЙ ПОТОК OT",
    nodeField: "Полевые датчики",
    nodeFieldSub: "RS485 / Modbus RTU",
    nodeGateway: "Edge Gateway",
    nodeGatewaySub: "Предобработка · 100мс",
    nodeDecision: "Уровень решений STR",
    nodeDecisionSub: "ИИ и инференс",

    simNormal: "Штатный режим",
    simAnomaly: "Симуляция аномалии",
    simNormalDesc: "Все технологические параметры находятся в пределах нормы.",
    simAnomalyTitle: "КРИТИЧЕСКОЕ ОТКЛОНЕНИЕ: +19.6% ПЕРЕГРУЗКА",
    simAnomalyDesc: "Привод линии 02: обнаружен перекос фазы-2 и механическое трение. Рекомендация: оптимизация скорости.",

    tabStream: "Поток телеметрии",
    tabAnalysis: "Анализ аномалий",
    tabTwin: "Цифровой двойник",

    metricPower: "Мощность сети",
    metricPackets: "Обработано пакетов",
    metricConfidence: "Точность ИИ",
    metricExpected: "План выпуска",
    metricActual: "Факт выпуска",
    metricGap: "Разрыв эффективности",
    unitPieces: "ед.",

    chainTitle: "ЕДИНАЯ ЦЕПОЧКА ОТ ПОЛЯ ДО РЕШЕНИЯ",
    chainSteps: ["ПОДКЛЮЧИТЬ", "КОНТРОЛИРОВАТЬ", "ПРОГНОЗ", "ОБЪЯСНИТЬ", "УЛУЧШИТЬ"],
    gridTitle: "ОДИН ПРОДУКТ · ПОЛНЫЙ ЦИКЛ",
    features: [
      ["Интеграция RS485 / Modbus", "Анализаторы, счетчики, PLC и датчики"],
      ["Мониторинг онлайн", "Объект, линия, процесс и оборудование"],
      ["ИИ-обнаружение аномалий", "Сигналы отклонений, критичность и причины"],
      ["Прогноз потребления и выпуска", "Ожидаемые целевые показатели и факт"],
      ["Влияние на затраты и углерод", "Финансовое и экологическое выражение потерь"],
      ["Отчетность ISO 50001", "Базовые линии, EnPI и проверяемые данные"],
      ["Цифровой двойник", "Моделирование поведения оборудования в процессе"],
      ["Безопасность полного цикла", "Промышленное шифрование и изоляция шлюзов"],
    ],
    footnote: "Модели калибруются по реальным данным анализаторов объекта.",
  },
} as const;

const pillarIcons = {
  forecast: TrendingUp,
  anomaly: Activity,
  twin: Cpu,
  rootcause: BrainCircuit,
};

const featureIcons = [
  Cable,
  Activity,
  BrainCircuit,
  TrendingDown,
  CircleDollarSign,
  FileCheck2,
  Factory,
  Layers,
];

export default function ProductsGrid() {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const copy = copyByLanguage[language] ?? copyByLanguage.tr;
  const isDark = theme === "dark";

  // Interactive simulation state
  const [isAnomalySimulated, setIsAnomalySimulated] = useState(false);
  const [activeTab, setActiveTab] = useState<"stream" | "analysis" | "twin">("stream");

  // Dynamic live pulse numbers
  const [livePower, setLivePower] = useState(428.4);
  const [packetCount, setPacketCount] = useState(15840);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePower((prev) => {
        const base = isAnomalySimulated ? 512.6 : 428.4;
        const delta = Math.random() * 2.4 - 1.2;
        return +(base + delta).toFixed(1);
      });
      setPacketCount((prev) => prev + Math.floor(Math.random() * 5 + 2));
    }, 1500);
    return () => clearInterval(interval);
  }, [isAnomalySimulated]);

  return (
    <section id="products" className={`py-20 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="container">
        {/* Clean, Non-Repetitive Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("products.badge")}</span>
          </div>

          <h2 className={`mt-4 text-3xl font-bold tracking-tight md:text-5xl ${isDark ? "text-white" : "text-zinc-950"}`}>
            {t("products.title")}
          </h2>

          <p className={`mx-auto mt-4 max-w-2xl leading-relaxed text-sm md:text-base ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
            {t("products.subtitle")}
          </p>
        </motion.div>

        {/* Main Intelligence Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950 text-white shadow-2xl shadow-orange-950/20"
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="pointer-events-none absolute -left-48 -top-48 h-[36rem] w-[36rem] rounded-full bg-orange-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />

          {/* Top Main Grid: Capabilities on Left, Live Telemetry Pipeline on Right */}
          <div className="relative grid gap-10 p-6 sm:p-8 md:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12 items-center">
            
            {/* Left Column (5 Cols): Structured Modules / Bullet Pillars */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-orange-400">
                <BrainCircuit className="h-3.5 w-3.5" />
                <span>{copy.productName}</span>
              </div>

              <h3 className="mt-4 text-3xl font-bold leading-tight md:text-4xl text-white">
                {copy.heading}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  {copy.headingAccent}
                </span>
              </h3>

              <p className="mt-3 text-sm md:text-base leading-relaxed text-zinc-400">
                {copy.intro}
              </p>

              {/* 4 Clean, High-Contrast Bullet Pillars */}
              <div className="mt-6 grid gap-3">
                {copy.pillars.map((item, idx) => {
                  const Icon = pillarIcons[item.id as keyof typeof pillarIcons] || Activity;
                  return (
                    <div
                      key={item.id}
                      className="group/item relative flex items-start gap-3.5 rounded-2xl border border-white/5 bg-white/[0.025] p-3.5 sm:p-4 transition-all duration-200 hover:border-orange-500/35 hover:bg-orange-500/[0.04]"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400 transition-transform group-hover/item:scale-110">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold tracking-wider text-orange-400/90 uppercase">
                            {item.badge}
                          </span>
                          <span className="text-[10px] text-zinc-600 font-mono">0{idx + 1}</span>
                        </div>
                        <h4 className="mt-0.5 text-sm font-semibold text-white group-hover/item:text-orange-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={withLocale("/products/energy-intelligence-platform")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 shadow-lg shadow-orange-500/20"
                >
                  {copy.primaryBtn}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={withLocale("/contacts")}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  {copy.secondaryBtn}
                </Link>
              </div>
            </div>

            {/* Right Column (6 Cols): Interactive Live Data Stream & Decision Console */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/85 p-5 sm:p-6 shadow-2xl shadow-black/80 backdrop-blur-xl">
                {/* Circuit background overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-15">
                  <CircuitBoardPattern
                    className="w-full h-full"
                    stroke="rgba(249,115,22,0.28)"
                    strokeWidth={0.7}
                    nodeFill="rgba(249,115,22,0.5)"
                    id="products_circuit_stream"
                  />
                </div>

                {/* Console Header */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-orange-400">
                      <Radio className="h-3.5 w-3.5 animate-pulse text-orange-400" />
                      <span>{copy.pipelineTitle}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-400">{copy.pipelineSub}</div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-medium text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span>{copy.liveBadge}</span>
                  </div>
                </div>

                {/* VISUAL DATA PIPELINE: Field -> Gateway -> STR AI Decision Layer */}
                <div className="relative z-10 my-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="grid grid-cols-3 gap-2 text-center items-center">
                    {/* Node 1: Field Devices */}
                    <div className="flex flex-col items-center rounded-xl border border-blue-500/20 bg-blue-500/5 p-2.5">
                      <Cable className="h-4 w-4 text-blue-400 mb-1" />
                      <span className="text-[11px] font-semibold text-zinc-200">{copy.nodeField}</span>
                      <span className="text-[9px] text-zinc-400 font-mono">{copy.nodeFieldSub}</span>
                    </div>

                    {/* Node 2: Gateway */}
                    <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                      <Cpu className="h-4 w-4 text-zinc-300 mb-1" />
                      <span className="text-[11px] font-semibold text-zinc-200">{copy.nodeGateway}</span>
                      <span className="text-[9px] text-zinc-400 font-mono">{copy.nodeGatewaySub}</span>
                    </div>

                    {/* Node 3: AI Decision Layer */}
                    <div className={`flex flex-col items-center rounded-xl border p-2.5 transition-all ${
                      isAnomalySimulated
                        ? "border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-lg shadow-amber-500/20"
                        : "border-orange-500/30 bg-orange-500/10 text-orange-400"
                    }`}>
                      <BrainCircuit className="h-4 w-4 mb-1 animate-pulse" />
                      <span className="text-[11px] font-semibold">{copy.nodeDecision}</span>
                      <span className="text-[9px] font-mono opacity-80">{copy.nodeDecisionSub}</span>
                    </div>
                  </div>

                  {/* High-Tech Animated Data Flow Particle Beam */}
                  <div className="mt-3 relative h-2 w-full overflow-hidden rounded-full bg-zinc-900 border border-white/10">
                    <motion.div
                      className={`h-full w-28 rounded-full ${
                        isAnomalySimulated
                          ? "bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                          : "bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                      }`}
                      animate={{ x: ["-100%", "450%"] }}
                      transition={{
                        duration: isAnomalySimulated ? 1.2 : 2.0,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[9px] font-mono text-zinc-500">
                    <span>99.9% Sinyal Kalitesi</span>
                    <span>12ms Düşük Gecikme</span>
                    <span>TLS Endüstriyel Şifreleme</span>
                  </div>
                </div>

                {/* Interactive Simulation Switcher */}
                <div className="relative z-10 my-3 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-2">
                  <div className="text-[11px] text-zinc-400 pl-1">
                    <span className="hidden sm:inline">İnteraktif Test: </span>
                    <span className="font-semibold text-zinc-200">Karar Mekanizması</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIsAnomalySimulated(false)}
                      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                        !isAnomalySimulated
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{copy.simNormal}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAnomalySimulated(true)}
                      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                        isAnomalySimulated
                          ? "bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20"
                          : "text-zinc-400 hover:text-amber-400"
                      }`}
                    >
                      <AlertTriangle className="h-3 w-3" />
                      <span>{copy.simAnomaly}</span>
                    </button>
                  </div>
                </div>

                {/* Anomaly Dynamic Alert Banner */}
                <AnimatePresence>
                  {isAnomalySimulated ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative z-10 mb-3 overflow-hidden rounded-xl border border-amber-500/40 bg-amber-500/10 p-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5 animate-bounce" />
                        <div>
                          <div className="text-xs font-bold text-amber-300">{copy.simAnomalyTitle}</div>
                          <div className="mt-0.5 text-[11px] text-amber-200/90 leading-relaxed">
                            {copy.simAnomalyDesc}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative z-10 mb-3 overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2.5"
                    >
                      <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>{copy.simNormalDesc}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Tabs */}
                <div className="relative z-10 grid grid-cols-3 gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1 text-center text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab("stream")}
                    className={`rounded-lg py-1.5 transition-all ${
                      activeTab === "stream" ? "bg-orange-500 text-black shadow" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {copy.tabStream}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("analysis")}
                    className={`rounded-lg py-1.5 transition-all ${
                      activeTab === "analysis" ? "bg-orange-500 text-black shadow" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {copy.tabAnalysis}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("twin")}
                    className={`rounded-lg py-1.5 transition-all ${
                      activeTab === "twin" ? "bg-orange-500 text-black shadow" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {copy.tabTwin}
                  </button>
                </div>

                {/* Tab Content Display */}
                <div className="relative z-10 mt-3 min-h-[175px]">
                  <AnimatePresence mode="wait">
                    {activeTab === "stream" && (
                      <motion.div
                        key="stream"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2.5"
                      >
                        <div className="grid grid-cols-3 gap-2">
                          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                            <div className="text-[10px] text-zinc-400 leading-tight">{copy.metricPower}</div>
                            <div className={`mt-1 font-mono text-xl font-bold ${isAnomalySimulated ? "text-amber-400" : "text-white"}`}>
                              {livePower} <span className="text-[10px] font-normal text-zinc-500">kW</span>
                            </div>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                            <div className="text-[10px] text-zinc-400 leading-tight">{copy.metricPackets}</div>
                            <div className="mt-1 font-mono text-xl font-bold text-orange-400">
                              {packetCount.toLocaleString()} <span className="text-[10px] font-normal text-zinc-500">pkt</span>
                            </div>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                            <div className="text-[10px] text-zinc-400 leading-tight">{copy.metricConfidence}</div>
                            <div className="mt-1 font-mono text-xl font-bold text-emerald-400">
                              %99.4
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-2.5 font-mono text-[11px] text-zinc-400 space-y-1">
                          <div className="flex justify-between text-zinc-500 text-[9px]">
                            <span>CANLI PROTOKOL GÜNLÜĞÜ</span>
                            <span className="text-emerald-400">● SENKRONİZE</span>
                          </div>
                          <div className="text-zinc-300">
                            &gt; Modbus RTU Slave #04: 3x398V · 50.01Hz · PF 0.98
                          </div>
                          <div className={isAnomalySimulated ? "text-amber-300" : "text-orange-400/90"}>
                            {isAnomalySimulated
                              ? "> AI Uyarısı: Akım dalgalanması eşik üstü (+18.4 kW sapma)"
                              : "> AI Twin Delta: Anomali eşiği altında, stabil tüketim"}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "analysis" && (
                      <motion.div
                        key="analysis"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <Metric label={copy.metricExpected} value="1.240" suffix={copy.unitPieces} />
                          <Metric label={copy.metricActual} value={isAnomalySimulated ? "1.020" : "1.190"} suffix={copy.unitPieces} warning={isAnomalySimulated} />
                          <Metric label={copy.metricGap} value={isAnomalySimulated ? "−17.7" : "−4.0"} suffix="%" warning={isAnomalySimulated} />
                          <Metric label="Özgül Enerji Sapması" value={isAnomalySimulated ? "+21.4" : "+1.8"} suffix="%" warning={isAnomalySimulated} />
                        </div>

                        <div className="mt-2.5 rounded-xl border border-orange-500/20 bg-orange-500/[0.08] p-3">
                          <div className="flex items-start gap-2">
                            <ScanSearch className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                            <div>
                              <div className="text-[9px] uppercase tracking-wider text-zinc-400">Öne Çıkan Kök Neden</div>
                              <div className="text-xs font-semibold text-white">
                                {isAnomalySimulated
                                  ? "2 No'lu hatta faz dengesizliği ve motor sürtünme artışı"
                                  : "Rölanti tüketimi nominal, proses optimize çalışıyor"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "twin" && (
                      <motion.div
                        key="twin"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2.5"
                      >
                        <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-white">Fiziksel Ekipman Modeli</span>
                            <span className="text-[10px] text-orange-400 font-mono">Fizik-Tabanlı Model</span>
                          </div>
                          <div className="mt-2.5 flex items-baseline justify-between">
                            <span className="text-xs text-zinc-400">Korelasyon Skoru</span>
                            <span className="font-mono text-lg font-bold text-emerald-400">98.4%</span>
                          </div>
                          <div className="mt-1 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full w-[98.4%] rounded-full bg-emerald-400" />
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-2.5 text-xs leading-relaxed text-zinc-400">
                          Üretim hattının motor devri, sıcaklık ve şebeke yükü gerçek zamanlı dijital ikiz üzerinde doğrulanarak kayıp/kaçak minimize edilir.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="relative z-10 mt-3 text-[10px] text-zinc-500">{copy.footnote}</p>
              </div>
            </div>
          </div>

          {/* Workflow Steps: Sahadan Karara Tek Veri Zinciri */}
          <div className="relative border-y border-white/10 bg-white/[0.02] px-6 py-5 sm:px-8 md:px-10 lg:px-12">
            <div className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.16em] text-zinc-400">
              <Gauge className="h-3.5 w-3.5 text-orange-500" />
              <span>{copy.chainTitle}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {copy.chainSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-orange-500/25 bg-orange-500/10 text-[10px] font-bold text-orange-400">
                    0{index + 1}
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-zinc-300">{step}</span>
                  {index < copy.chainSteps.length - 1 && (
                    <ArrowRight className="ml-auto hidden h-3 w-3 text-zinc-700 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 8-Grid Capabilities: Tek Ürün · Uçtan Uca Yetenek */}
          <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="mb-6 text-xs font-semibold tracking-[0.16em] text-orange-500">
              {copy.gridTitle}
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {copy.features.map(([title, description], index) => {
                const Icon = featureIcons[index] || Zap;
                return (
                  <div key={title} className="bg-zinc-950 p-5 transition-colors hover:bg-zinc-900/60">
                    <Icon className="h-4 w-4 text-orange-500" />
                    <h4 className="mt-3 text-sm font-semibold text-white">{title}</h4>
                    <p className="mt-1.5 text-xs leading-5 text-zinc-400">{description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  suffix,
  warning = false,
}: {
  label: string;
  value: string;
  suffix: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="text-[10px] leading-4 text-zinc-400 truncate">{label}</div>
      <div className={`mt-1 font-mono text-xl font-bold ${warning ? "text-amber-400" : "text-white"}`}>
        {value}
        <span className="ml-1 text-xs font-normal text-zinc-500">{suffix}</span>
      </div>
    </div>
  );
}
