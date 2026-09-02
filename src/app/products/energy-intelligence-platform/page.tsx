"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Cable,
  CheckCircle2,
  CircleDollarSign,
  Factory,
  FileCheck2,
  Gauge,
  Network,
  ScanSearch,
  ServerCog,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const copyByLanguage = {
  tr: {
    badge: "YAPAY ZEKÂ DESTEKLİ ENDÜSTRİYEL ENERJİ ZEKÂSI",
    title: "Enerjiyi izlemekten",
    accent: "nedenini açıklamaya.",
    description:
      "STR Energy Intelligence Platform, saha ekipmanlarına doğrudan bağlanır; gerçek zamanlı enerji ve üretim verisini analiz eder, geleceği tahmin eder ve beklenen performans ile gerçekleşen sonuç arasındaki farkın nedenlerini açıklar.",
    primary: "Demo talep et",
    secondary: "Yetenekleri incele",
    fieldNote: "Saha bağlantısı",
    fieldValue: "RS485 · Modbus RTU/TCP · Enerji analizörü",
    decisionNote: "Karar katmanı",
    decisionValue: "AI tahmin · Kök neden · Maliyet · Karbon",
    flowEyebrow: "SAHADAN KARARA",
    flowTitle: "Tek veri zinciri, tek doğruluk kaynağı",
    flowDescription:
      "Mevcut enerji analizörleri ve endüstriyel sistemlerden gelen sinyaller, bağlamı korunarak güvenli biçimde işlenir ve aksiyona dönüşür.",
    flow: [
      ["Saha ekipmanı", "Enerji analizörü, sayaç, PLC ve üretim sinyalleri"],
      ["RS485 / Modbus", "Modbus RTU/TCP ve doğrulanmış register haritaları"],
      ["Edge veri katmanı", "Zaman damgası, kalite kontrolü ve güvenli aktarım"],
      ["Enerji zekâsı", "AI modelleri, dijital ikiz ve operasyonel bağlam"],
      ["Karar ve rapor", "Uyarı, aksiyon, maliyet, karbon ve ISO 50001"],
    ],
    capabilityEyebrow: "PLATFORM YETENEKLERİ",
    capabilityTitle: "Enerji performansının tamamı tek üründe",
    capabilities: [
      ["Gerçek zamanlı enerji izleme", "Tesis, hat, proses ve ekipman bazında tüketim, güç, talep ve enerji yoğunluğunu canlı izleyin."],
      ["AI anomali tespiti", "Normal çalışma profilinden sapmaları erken yakalayın; etkisine göre önceliklendirilmiş uyarılar alın."],
      ["Enerji tüketim tahmini", "Üretim planı, vardiya, hava ve proses değişkenleriyle gelecek tüketimi öngörün."],
      ["Maliyet ve karbon etkisi", "Her sapmanın tarife bazlı maliyetini ve emisyon karşılığını birlikte görün."],
      ["ISO 50001 raporlaması", "Enerji baz çizgileri, EnPI göstergeleri, hedefler ve iyileştirme kanıtları için rapor akışı oluşturun."],
      ["Dijital ikiz ve ekipman analizi", "Ekipmanın beklenen davranışını modelleyin; verim, yük ve proses ilişkisini bağlam içinde değerlendirin."],
    ],
    gapEyebrow: "TAHMİN · KARŞILAŞTIRMA · AÇIKLAMA",
    gapTitle: "Ne kadar fark var değil, neden fark var?",
    gapDescription:
      "Platform, üretim planı ve proses koşullarına göre normalde üretilebilecek miktarı ve beklenen enerji tüketimini hesaplar. Gerçekleşen sonuçla farkı ölçer, olası nedenleri kanıtlarıyla sıralar.",
    preview: "ÖRNEK ANALİZ EKRANI",
    window: "Hat 02 · Son vardiya",
    expectedProduction: "Beklenen üretim",
    actualProduction: "Gerçekleşen üretim",
    productionGap: "Üretim farkı",
    expectedIntensity: "Beklenen özgül tüketim",
    actualIntensity: "Gerçekleşen özgül tüketim",
    energyImpact: "Ek enerji etkisi",
    explanationTitle: "Farkı açıklayan başlıca etkenler",
    explanations: [
      ["Plansız duruş ve yeniden başlatma", "38%", "Hat durum sinyali ile üretim sayacı aynı zaman aralığında sapıyor."],
      ["Kompresör verim kaybı", "27%", "Benzer yükte güç tüketimi son 30 günlük baz çizginin üzerinde."],
      ["Hat hızı düşüşü", "21%", "Çevrim süresi uzarken yardımcı yükler sabit kalıyor."],
      ["Açıklanamayan kalan fark", "14%", "Operatör notu veya ek proses verisi ile doğrulama gerekiyor."],
    ],
    evidence: "Her açıklama; ilgili sinyal, zaman aralığı, baz çizgi ve güven seviyesiyle birlikte izlenebilir.",
    illustrative: "Gösterilen değerler ürün yaklaşımını anlatan temsili verilerdir; gerçek modeller tesis verisiyle kalibre edilir.",
    methodEyebrow: "ÇALIŞMA MODELİ",
    methodTitle: "Ölç, öğren, açıkla, iyileştir",
    methods: [
      ["01", "Bağlan", "Cihazlar, register haritaları, üretim sayaçları ve proses sinyalleri keşfedilir."],
      ["02", "Baz çizgiyi öğren", "Normal tüketim ve üretim davranışı ekipman, vardiya ve ürün bağlamında modellenir."],
      ["03", "Tahmin et ve karşılaştır", "Beklenen değerler üretilir; gerçekleşen sonuç ve performans farkı anlık hesaplanır."],
      ["04", "Nedeni açıkla", "Sapmayı etkileyen duruş, baz yük, verimsizlik ve proses faktörleri kanıtlarıyla sıralanır."],
      ["05", "Etkiyi doğrula", "Alınan aksiyonun enerji, maliyet, üretim ve karbon sonucuna etkisi takip edilir."],
    ],
    outcomesEyebrow: "TEK ORTAK GÖRÜNÜM",
    outcomesTitle: "Enerji, üretim ve sürdürülebilirlik ekipleri aynı veride buluşur",
    outcomes: [
      "Enerji yöneticisi için tüketim, EnPI ve ISO 50001 kanıtları",
      "Üretim ekibi için beklenen–gerçekleşen performans ve kayıp nedenleri",
      "Bakım ekibi için ekipman bazlı anomali ve verimsizlik sinyalleri",
      "Finans ve sürdürülebilirlik için maliyet ve karbon etkisi",
    ],
    ctaTitle: "Tesisinizdeki görünmeyen enerji ve üretim farkını birlikte bulalım.",
    ctaDescription: "Mevcut analizörlerinizi, Modbus ağınızı ve en kritik üretim hattınızı birlikte değerlendirerek pilot kapsamı belirleyelim.",
    ctaPrimary: "Pilot görüşmesi planla",
    ctaSecondary: "İletişime geç",
  },
  en: {
    badge: "AI-POWERED INDUSTRIAL ENERGY INTELLIGENCE",
    title: "Beyond monitoring energy:",
    accent: "explain what drives it.",
    description:
      "STR Energy Intelligence Platform connects directly to field equipment, analyzes real-time energy and production data, forecasts what comes next and explains the gap between expected performance and actual results.",
    primary: "Request a demo",
    secondary: "Explore capabilities",
    fieldNote: "Field connectivity",
    fieldValue: "RS485 · Modbus RTU/TCP · Energy analyzers",
    decisionNote: "Decision layer",
    decisionValue: "AI forecast · Root cause · Cost · Carbon",
    flowEyebrow: "FROM FIELD TO DECISION",
    flowTitle: "One data chain, one source of truth",
    flowDescription:
      "Signals from existing energy analyzers and industrial systems are securely processed with their context intact and turned into action.",
    flow: [
      ["Field equipment", "Energy analyzers, meters, PLCs and production signals"],
      ["RS485 / Modbus", "Modbus RTU/TCP and verified register maps"],
      ["Edge data layer", "Timestamps, quality checks and secure transfer"],
      ["Energy intelligence", "AI models, digital twins and operational context"],
      ["Decision and reporting", "Alerts, action, cost, carbon and ISO 50001"],
    ],
    capabilityEyebrow: "PLATFORM CAPABILITIES",
    capabilityTitle: "The full energy performance cycle in one product",
    capabilities: [
      ["Real-time energy monitoring", "Track consumption, power, demand and energy intensity live by facility, line, process and equipment."],
      ["AI anomaly detection", "Detect deviations from normal operating profiles early and receive impact-prioritized alerts."],
      ["Energy consumption forecasting", "Forecast future consumption using production plans, shifts, weather and process variables."],
      ["Cost and carbon impact", "See the tariff-based cost and emissions impact of every deviation together."],
      ["ISO 50001 reporting", "Build reporting workflows for energy baselines, EnPIs, objectives and improvement evidence."],
      ["Digital twin and equipment analytics", "Model expected equipment behavior and evaluate efficiency, load and process relationships in context."],
    ],
    gapEyebrow: "FORECAST · COMPARE · EXPLAIN",
    gapTitle: "Not only how large the gap is — why it exists.",
    gapDescription:
      "The platform calculates normally achievable production and expected energy consumption from the production plan and process conditions. It measures the gap against actual results and ranks likely causes with supporting evidence.",
    preview: "ILLUSTRATIVE ANALYSIS VIEW",
    window: "Line 02 · Last shift",
    expectedProduction: "Expected production",
    actualProduction: "Actual production",
    productionGap: "Production gap",
    expectedIntensity: "Expected specific energy",
    actualIntensity: "Actual specific energy",
    energyImpact: "Additional energy impact",
    explanationTitle: "Leading factors that explain the gap",
    explanations: [
      ["Unplanned stop and restart", "38%", "Line-state signals and the production counter diverge in the same time window."],
      ["Compressor efficiency loss", "27%", "Power use at comparable load is above the 30-day baseline."],
      ["Reduced line speed", "21%", "Cycle time increases while auxiliary loads remain constant."],
      ["Remaining unexplained gap", "14%", "Operator notes or additional process data are required for validation."],
    ],
    evidence: "Every explanation remains traceable to the relevant signal, time window, baseline and confidence level.",
    illustrative: "Values shown are illustrative of the product approach; production models are calibrated with facility data.",
    methodEyebrow: "OPERATING MODEL",
    methodTitle: "Measure, learn, explain, improve",
    methods: [
      ["01", "Connect", "Discover devices, register maps, production counters and process signals."],
      ["02", "Learn the baseline", "Model normal energy and production behavior by equipment, shift and product context."],
      ["03", "Forecast and compare", "Generate expected values and calculate actual performance gaps continuously."],
      ["04", "Explain the cause", "Rank downtime, base-load, inefficiency and process factors with supporting evidence."],
      ["05", "Verify impact", "Track how each action changes energy, cost, production and carbon outcomes."],
    ],
    outcomesEyebrow: "ONE SHARED VIEW",
    outcomesTitle: "Energy, production and sustainability teams work from the same evidence",
    outcomes: [
      "Consumption, EnPIs and ISO 50001 evidence for energy managers",
      "Expected-versus-actual performance and loss drivers for production teams",
      "Equipment-level anomaly and inefficiency signals for maintenance teams",
      "Cost and carbon impact for finance and sustainability teams",
    ],
    ctaTitle: "Let’s find the hidden energy and production gap in your facility.",
    ctaDescription: "We can review your existing analyzers, Modbus network and most critical production line to define a focused pilot.",
    ctaPrimary: "Plan a pilot session",
    ctaSecondary: "Contact us",
  },
  ru: {
    badge: "ПРОМЫШЛЕННАЯ ЭНЕРГЕТИЧЕСКАЯ АНАЛИТИКА НА БАЗЕ ИИ",
    title: "Не просто контролировать энергию,",
    accent: "а объяснять причины.",
    description:
      "STR Energy Intelligence Platform напрямую подключается к полевому оборудованию, анализирует данные энергии и производства в реальном времени, прогнозирует будущие значения и объясняет разрыв между ожидаемой и фактической эффективностью.",
    primary: "Запросить демо",
    secondary: "Возможности",
    fieldNote: "Полевое подключение",
    fieldValue: "RS485 · Modbus RTU/TCP · Анализаторы энергии",
    decisionNote: "Уровень решений",
    decisionValue: "ИИ-прогноз · Причины · Затраты · Углерод",
    flowEyebrow: "ОТ ПОЛЯ К РЕШЕНИЮ",
    flowTitle: "Единая цепочка данных и источник истины",
    flowDescription: "Сигналы существующих анализаторов и промышленных систем безопасно обрабатываются с сохранением контекста и превращаются в действия.",
    flow: [
      ["Полевое оборудование", "Анализаторы энергии, счетчики, PLC и производственные сигналы"],
      ["RS485 / Modbus", "Modbus RTU/TCP и проверенные карты регистров"],
      ["Edge-уровень", "Временные метки, контроль качества и защищенная передача"],
      ["Энергетическая аналитика", "ИИ-модели, цифровые двойники и операционный контекст"],
      ["Решения и отчеты", "Оповещения, действия, затраты, углерод и ISO 50001"],
    ],
    capabilityEyebrow: "ВОЗМОЖНОСТИ ПЛАТФОРМЫ",
    capabilityTitle: "Полный цикл энергоэффективности в одном продукте",
    capabilities: [
      ["Мониторинг энергии в реальном времени", "Контроль потребления, мощности, спроса и энергоемкости по объекту, линии и оборудованию."],
      ["ИИ-обнаружение аномалий", "Раннее выявление отклонений от нормального профиля и приоритизация по влиянию."],
      ["Прогноз энергопотребления", "Прогноз с учетом производственного плана, смен, погоды и технологических переменных."],
      ["Затраты и углерод", "Совместная оценка тарифной стоимости и выбросов для каждого отклонения."],
      ["Отчетность ISO 50001", "Рабочие процессы для базовых линий, EnPI, целей и доказательств улучшений."],
      ["Цифровой двойник и аналитика оборудования", "Моделирование ожидаемого поведения и связей эффективности, нагрузки и процесса."],
    ],
    gapEyebrow: "ПРОГНОЗ · СРАВНЕНИЕ · ОБЪЯСНЕНИЕ",
    gapTitle: "Не только величина разрыва, но и его причины.",
    gapDescription: "Платформа рассчитывает достижимое производство и ожидаемое энергопотребление по плану и условиям процесса, сравнивает их с фактом и ранжирует вероятные причины с доказательствами.",
    preview: "ПРИМЕР АНАЛИТИЧЕСКОГО ЭКРАНА",
    window: "Линия 02 · Последняя смена",
    expectedProduction: "Ожидаемое производство",
    actualProduction: "Фактическое производство",
    productionGap: "Разрыв производства",
    expectedIntensity: "Ожидаемая удельная энергия",
    actualIntensity: "Фактическая удельная энергия",
    energyImpact: "Дополнительная энергия",
    explanationTitle: "Основные факторы разрыва",
    explanations: [
      ["Незапланированный останов и перезапуск", "38%", "Состояние линии и счетчик производства расходятся в одном интервале."],
      ["Потеря эффективности компрессора", "27%", "При сопоставимой нагрузке мощность выше 30-дневной базовой линии."],
      ["Снижение скорости линии", "21%", "Время цикла растет, а вспомогательные нагрузки остаются постоянными."],
      ["Оставшийся необъясненный разрыв", "14%", "Для проверки нужны заметки оператора или дополнительные данные процесса."],
    ],
    evidence: "Каждое объяснение связано с сигналом, временным интервалом, базовой линией и уровнем уверенности.",
    illustrative: "Значения приведены для иллюстрации подхода; реальные модели калибруются данными предприятия.",
    methodEyebrow: "МОДЕЛЬ РАБОТЫ",
    methodTitle: "Измерять, обучаться, объяснять, улучшать",
    methods: [
      ["01", "Подключить", "Определить устройства, карты регистров, счетчики производства и сигналы процесса."],
      ["02", "Изучить базовую линию", "Смоделировать нормальное поведение по оборудованию, смене и продукту."],
      ["03", "Прогнозировать и сравнить", "Рассчитывать ожидаемые значения и разрывы с фактом непрерывно."],
      ["04", "Объяснить причину", "Ранжировать простои, базовую нагрузку, неэффективность и факторы процесса."],
      ["05", "Проверить эффект", "Отслеживать влияние действий на энергию, затраты, производство и углерод."],
    ],
    outcomesEyebrow: "ЕДИНОЕ ПРЕДСТАВЛЕНИЕ",
    outcomesTitle: "Энергетика, производство и устойчивое развитие работают с одними данными",
    outcomes: [
      "Потребление, EnPI и доказательства ISO 50001 для энергоменеджеров",
      "Ожидаемая и фактическая эффективность и причины потерь для производства",
      "Аномалии и неэффективность оборудования для технического обслуживания",
      "Затраты и углерод для финансов и устойчивого развития",
    ],
    ctaTitle: "Найдем скрытый энергетический и производственный разрыв на вашем предприятии.",
    ctaDescription: "Оценим существующие анализаторы, сеть Modbus и критическую производственную линию, чтобы определить пилот.",
    ctaPrimary: "Запланировать пилот",
    ctaSecondary: "Связаться",
  },
} as const;

const flowIcons = [Factory, Cable, ServerCog, BrainCircuit, FileCheck2];
const capabilityIcons = [Activity, TriangleAlert, TrendingUp, CircleDollarSign, FileCheck2, Network];

export default function EnergyIntelligencePlatformPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const copy = copyByLanguage[language] ?? copyByLanguage.tr;
  const isDark = theme === "dark";
  const page = isDark ? "bg-black text-white" : "bg-white text-zinc-900";
  const muted = isDark ? "text-zinc-400" : "text-zinc-600";
  const panel = isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white";
  const softPanel = isDark ? "border-white/10 bg-white/[0.035]" : "border-black/10 bg-zinc-50";

  return (
    <div className={`min-h-screen ${page}`}>
      <Header variant="floating" />

      <main>
        <section className="relative overflow-hidden px-0 pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(249,115,22,0.18),transparent_38%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-5xl text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-orange-500">
                <BrainCircuit className="h-4 w-4" />
                {copy.badge}
              </div>
              <h1 className="mt-7 text-4xl font-bold leading-[1.06] tracking-tight md:text-6xl lg:text-7xl">
                {copy.title}
                <br />
                <span className="text-orange-500">{copy.accent}</span>
              </h1>
              <p className={`mx-auto mt-7 max-w-3xl text-lg leading-relaxed md:text-xl ${muted}`}>{copy.description}</p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={withLocale("/contacts")} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-semibold text-black transition hover:bg-orange-400 sm:w-auto">
                  {copy.primary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#capabilities" className={`inline-flex w-full items-center justify-center rounded-full border px-7 py-4 font-semibold transition sm:w-auto ${isDark ? "border-white/15 hover:bg-white/5" : "border-black/15 hover:bg-black/5"}`}>
                  {copy.secondary}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 ${panel}`}
            >
              {[
                [Cable, copy.fieldNote, copy.fieldValue],
                [ScanSearch, copy.decisionNote, copy.decisionValue],
              ].map(([Icon, label, value], index) => {
                const ItemIcon = Icon as typeof Cable;
                return (
                  <div key={String(label)} className={`flex items-center gap-4 p-5 ${index === 1 ? (isDark ? "sm:border-l sm:border-white/10" : "sm:border-l sm:border-black/10") : ""}`}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                      <ItemIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className={`text-xs font-medium uppercase tracking-wider ${muted}`}>{String(label)}</div>
                      <div className="mt-1 text-sm font-semibold">{String(value)}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className={`border-y py-20 md:py-24 ${isDark ? "border-white/10 bg-zinc-950/60" : "border-black/10 bg-zinc-50"}`}>
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.flowEyebrow}</p>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">{copy.flowTitle}</h2>
              <p className={`mt-5 text-lg leading-relaxed ${muted}`}>{copy.flowDescription}</p>
            </div>
            <div className="mt-12 grid gap-4 lg:grid-cols-5">
              {copy.flow.map(([title, description], index) => {
                const Icon = flowIcons[index] ?? Gauge;
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className={`relative rounded-2xl border p-5 ${panel}`}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500"><Icon className="h-5 w-5" /></div>
                      <span className={`text-xs font-mono ${muted}`}>0{index + 1}</span>
                    </div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{description}</p>
                    {index < copy.flow.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 text-orange-500 lg:block" />}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="capabilities" className="scroll-mt-24 py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.capabilityEyebrow}</p>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">{copy.capabilityTitle}</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {copy.capabilities.map(([title, description], index) => {
                const Icon = capabilityIcons[index] ?? BarChart3;
                return (
                  <motion.article
                    key={title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-2xl border p-6 transition hover:-translate-y-1 hover:border-orange-500/35 ${softPanel}`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-500"><Icon className="h-5 w-5" /></div>
                    <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                    <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`border-y py-20 md:py-28 ${isDark ? "border-white/10 bg-zinc-950/60" : "border-black/10 bg-zinc-50"}`}>
          <div className="container">
            <div className="grid items-start gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.gapEyebrow}</p>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">{copy.gapTitle}</h2>
                <p className={`mt-5 text-lg leading-relaxed ${muted}`}>{copy.gapDescription}</p>
                <div className={`mt-7 rounded-2xl border p-5 ${softPanel}`}>
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                    <p className={`text-sm leading-relaxed ${muted}`}>{copy.evidence}</p>
                  </div>
                </div>
              </div>

              <div className={`overflow-hidden rounded-3xl border shadow-2xl ${panel}`}>
                <div className={`flex flex-col justify-between gap-3 border-b px-6 py-5 sm:flex-row sm:items-center ${isDark ? "border-white/10" : "border-black/10"}`}>
                  <div>
                    <div className="text-xs font-semibold tracking-[0.14em] text-orange-500">{copy.preview}</div>
                    <div className={`mt-1 text-sm ${muted}`}>{copy.window}</div>
                  </div>
                  <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    AI baseline active
                  </div>
                </div>

                <div className="grid gap-px sm:grid-cols-3">
                  {[
                    [copy.expectedProduction, "1,240", "unit"],
                    [copy.actualProduction, "1,108", "unit"],
                    [copy.productionGap, "−10.6%", "−132 unit"],
                  ].map(([label, value, suffix], index) => (
                    <div key={label} className={`p-5 ${index > 0 ? (isDark ? "sm:border-l sm:border-white/10" : "sm:border-l sm:border-black/10") : ""}`}>
                      <div className={`text-xs ${muted}`}>{label}</div>
                      <div className={`mt-2 text-2xl font-bold ${index === 2 ? "text-orange-500" : ""}`}>{value}</div>
                      <div className={`mt-1 text-xs ${muted}`}>{suffix}</div>
                    </div>
                  ))}
                </div>

                <div className={`border-y p-6 ${isDark ? "border-white/10 bg-black/20" : "border-black/10 bg-zinc-50"}`}>
                  <div className="grid gap-5 sm:grid-cols-3">
                    {[
                      [copy.expectedIntensity, "0.82 kWh/unit", ""],
                      [copy.actualIntensity, "0.94 kWh/unit", "+14.6%"],
                      [copy.energyImpact, "+133 kWh", "+₺ impact"],
                    ].map(([label, value, detail]) => (
                      <div key={label}>
                        <div className={`text-xs ${muted}`}>{label}</div>
                        <div className="mt-2 font-semibold">{value}</div>
                        {detail && <div className="mt-1 text-xs font-medium text-orange-500">{detail}</div>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 font-semibold"><BrainCircuit className="h-5 w-5 text-orange-500" />{copy.explanationTitle}</div>
                  <div className="mt-5 space-y-5">
                    {copy.explanations.map(([title, share, description]) => (
                      <div key={title}>
                        <div className="flex items-center justify-between gap-4 text-sm">
                          <span className="font-medium">{title}</span>
                          <span className="font-mono font-semibold text-orange-500">{share}</span>
                        </div>
                        <div className={`mt-2 h-1.5 overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                          <div className="h-full rounded-full bg-orange-500" style={{ width: share }} />
                        </div>
                        <p className={`mt-2 text-xs leading-relaxed ${muted}`}>{description}</p>
                      </div>
                    ))}
                  </div>
                  <p className={`mt-6 border-t pt-4 text-xs leading-relaxed ${isDark ? "border-white/10 text-zinc-500" : "border-black/10 text-zinc-500"}`}>{copy.illustrative}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.methodEyebrow}</p>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">{copy.methodTitle}</h2>
            </div>
            <div className="mt-12 grid gap-4 lg:grid-cols-5">
              {copy.methods.map(([number, title, description]) => (
                <div key={number} className={`rounded-2xl border p-5 ${softPanel}`}>
                  <div className="font-mono text-sm font-semibold text-orange-500">{number}</div>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{description}</p>
                </div>
              ))}
            </div>

            <div className={`mt-16 grid overflow-hidden rounded-3xl border lg:grid-cols-[0.85fr_1.15fr] ${panel}`}>
              <div className={`p-7 md:p-10 ${isDark ? "bg-orange-500/10" : "bg-orange-50"}`}>
                <p className="text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.outcomesEyebrow}</p>
                <h2 className="mt-4 text-2xl font-bold leading-tight md:text-4xl">{copy.outcomesTitle}</h2>
              </div>
              <div className="p-7 md:p-10">
                <ul className="space-y-5">
                  {copy.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                      <span className={`leading-relaxed ${muted}`}>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl bg-orange-500 px-7 py-12 text-center text-black md:px-12 md:py-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4),transparent_34%)]" />
              <div className="relative mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold leading-tight md:text-5xl">{copy.ctaTitle}</h2>
                <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-black/70">{copy.ctaDescription}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href={withLocale("/contacts")} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-7 py-4 font-semibold text-white transition hover:bg-zinc-800 sm:w-auto">
                    {copy.ctaPrimary}<ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={withLocale("/contacts")} className="inline-flex w-full items-center justify-center rounded-full border border-black/20 px-7 py-4 font-semibold transition hover:bg-black/5 sm:w-auto">
                    {copy.ctaSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer compact />
    </div>
  );
}
