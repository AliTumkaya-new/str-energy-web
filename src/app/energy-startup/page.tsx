"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Cable, CheckCircle2, Factory, Globe2, Handshake, Rocket } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const copyByLanguage = {
  tr: {
    badge: "ERKEN AŞAMA · ENERJİ TEKNOLOJİLERİ · TÜRKİYE",
    title: "Türkiye’den doğan erken aşama enerji teknolojileri girişimi",
    accent: "Sahadaki enerjiyi açıklanabilir kararlara dönüştürüyoruz.",
    description:
      "STR — Smart Technologies for Renewables, endüstriyel tesislerin enerji maliyetini, israfını ve karbon etkisini azaltmalarına yardımcı olacak enerji zekâsı altyapısını geliştiriyor.",
    primary: "Yatırım ve ortaklık görüşmesi",
    secondary: "Ürünü incele",
    stageLabel: "MEVCUT AŞAMA",
    stageTitle: "Ürün geliştirme ve pilot doğrulama",
    stageText:
      "Henüz yolun başındayız. Teknolojimizi gerçek saha verisiyle doğrulamak, tekrarlanabilir pilot modelini kurmak ve pazara çıkış kapasitemizi güçlendirmek için yatırımcılar ve sanayi ortaklarıyla görüşüyoruz.",
    builtLabel: "NE İNŞA EDİYORUZ?",
    builtTitle: "Enerji yönetimi yazılımından daha ileri bir karar katmanı",
    builtText:
      "STR Energy Intelligence Platform, RS485 / Modbus ve enerji analizörlerinden gelen veriyi üretim bağlamıyla birleştirir; beklenen performansı hesaplar, gerçekleşen sonuçtaki sapmayı bulur ve farkın olası nedenlerini açıklar.",
    pillars: [
      ["Sahaya doğrudan bağlantı", "Mevcut analizör, sayaç, PLC ve üretim sinyallerini ortak veri modelinde birleştirme"],
      ["Açıklanabilir enerji AI’ı", "Anomaliyi işaretlemekle kalmayıp performans farkının nedenlerini ve etkisini sıralama"],
      ["Ölçülebilir iş sonucu", "Enerji, üretim, maliyet, karbon ve ISO 50001 çıktısını aynı karar akışında izleme"],
    ],
    whyLabel: "NEDEN ŞİMDİ?",
    whyTitle: "Sanayi daha fazla veriye değil, veriden çıkan net karara ihtiyaç duyuyor.",
    whyItems: [
      "Dağınık saha verisi enerji ve üretim ekipleri arasında ortak bir doğruluk kaynağı oluşturmuyor.",
      "Klasik izleme sistemleri sapmayı gösteriyor; ancak nedenini ve üretim etkisini çoğu zaman açıklamıyor.",
      "Maliyet, karbon ve operasyonel verimlilik artık aynı operasyonel kararda birlikte ele alınmak zorunda.",
    ],
    focusLabel: "YATIRIM VE ORTAKLIK ODAĞI",
    focusTitle: "Bir sonraki doğrulama eşiğini birlikte geçmek istiyoruz.",
    focusText:
      "Erken aşama yatırım ve stratejik iş birliklerini dört somut kapasiteyi hızlandırmak için değerlendiriyoruz:",
    focus: [
      ["Ürün Ar-Ge", "AI karar katmanı, dijital ikiz ve güvenilir veri altyapısı"],
      ["Saha entegrasyonu", "Edge bağlantı, Modbus cihaz kapsamı ve devreye alma araçları"],
      ["Endüstriyel pilotlar", "Gerçek tesislerde ölçülebilir teknik ve ticari doğrulama"],
      ["Ekip ve pazara çıkış", "Ürün, enerji mühendisliği ve kurumsal satış kapasitesi"],
    ],
    partnerTitle: "Kimlerle tanışmak istiyoruz?",
    partnerItems: [
      "Enerji, iklim teknolojileri ve endüstriyel yazılıma odaklanan erken aşama yatırımcılar",
      "Pilot tesis sağlayabilecek üretim ve enerji yoğun sanayi kuruluşları",
      "Enerji analizörü, otomasyon, edge ve sistem entegrasyonu alanındaki teknoloji ortakları",
    ],
    ctaTitle: "Enerji zekâsının bir sonraki endüstriyel katmanını birlikte kuralım.",
    ctaText: "Yatırım, pilot tesis veya stratejik teknoloji ortaklığı için doğrudan bizimle iletişime geçin.",
    cta: "Tanışma görüşmesi planla",
  },
  en: {
    badge: "EARLY STAGE · ENERGY TECHNOLOGY · TÜRKİYE",
    title: "An early-stage energy technology startup born in Türkiye",
    accent: "Turning field energy data into explainable decisions.",
    description:
      "STR — Smart Technologies for Renewables is building the energy intelligence infrastructure that helps industrial facilities reduce energy cost, waste and carbon impact.",
    primary: "Investment and partnership conversation",
    secondary: "Explore the product",
    stageLabel: "CURRENT STAGE",
    stageTitle: "Product development and pilot validation",
    stageText:
      "We are at the beginning of the journey. We are speaking with investors and industrial partners to validate our technology with real field data, establish a repeatable pilot model and strengthen go-to-market capacity.",
    builtLabel: "WHAT ARE WE BUILDING?",
    builtTitle: "A decision layer that goes beyond energy management software",
    builtText:
      "STR Energy Intelligence Platform combines RS485 / Modbus and energy-analyzer data with production context. It calculates expected performance, detects the deviation in actual results and explains likely drivers of the gap.",
    pillars: [
      ["Direct field connectivity", "Unify existing analyzers, meters, PLCs and production signals in one data model"],
      ["Explainable energy AI", "Go beyond anomaly flags to rank the causes and impact of performance gaps"],
      ["Measurable business outcomes", "Track energy, production, cost, carbon and ISO 50001 outputs in one decision flow"],
    ],
    whyLabel: "WHY NOW?",
    whyTitle: "Industry does not need more data. It needs clear decisions from data.",
    whyItems: [
      "Fragmented field data does not create one source of truth across energy and production teams.",
      "Conventional monitoring shows deviations, but rarely explains their cause and production impact.",
      "Cost, carbon and operational efficiency now have to be managed in the same operational decision.",
    ],
    focusLabel: "INVESTMENT AND PARTNERSHIP FOCUS",
    focusTitle: "We want to cross the next validation threshold together.",
    focusText: "We are exploring early-stage investment and strategic partnerships to accelerate four concrete capabilities:",
    focus: [
      ["Product R&D", "AI decision layer, digital twins and dependable data infrastructure"],
      ["Field integration", "Edge connectivity, Modbus device coverage and commissioning tools"],
      ["Industrial pilots", "Measurable technical and commercial validation in real facilities"],
      ["Team and go-to-market", "Product, energy engineering and enterprise sales capacity"],
    ],
    partnerTitle: "Who do we want to meet?",
    partnerItems: [
      "Early-stage investors focused on energy, climate technology and industrial software",
      "Manufacturers and energy-intensive operators able to host a pilot facility",
      "Technology partners in energy analyzers, automation, edge and systems integration",
    ],
    ctaTitle: "Let’s build the next industrial layer of energy intelligence.",
    ctaText: "Contact us directly about investment, a pilot facility or a strategic technology partnership.",
    cta: "Schedule an introduction",
  },
  ru: {
    badge: "РАННЯЯ СТАДИЯ · ЭНЕРГЕТИЧЕСКИЕ ТЕХНОЛОГИИ · ТУРЦИЯ",
    title: "Энергетический технологический стартап ранней стадии из Турции",
    accent: "Превращаем полевые данные в объяснимые решения.",
    description:
      "STR — Smart Technologies for Renewables разрабатывает инфраструктуру энергетической аналитики, которая помогает промышленным предприятиям снижать затраты, потери и углеродное воздействие.",
    primary: "Инвестиции и партнерство",
    secondary: "Посмотреть продукт",
    stageLabel: "ТЕКУЩИЙ ЭТАП",
    stageTitle: "Разработка продукта и пилотная проверка",
    stageText:
      "Мы в начале пути и общаемся с инвесторами и промышленными партнерами, чтобы проверить технологию на реальных данных, создать повторяемую пилотную модель и усилить выход на рынок.",
    builtLabel: "ЧТО МЫ СОЗДАЕМ?",
    builtTitle: "Уровень принятия решений поверх систем энергоменеджмента",
    builtText:
      "STR Energy Intelligence Platform объединяет данные RS485 / Modbus и анализаторов энергии с производственным контекстом, рассчитывает ожидаемую эффективность и объясняет причины отклонений.",
    pillars: [
      ["Прямое подключение к полю", "Единая модель для анализаторов, счетчиков, PLC и производственных сигналов"],
      ["Объяснимый энергетический ИИ", "Ранжирование причин и влияния разрыва, а не только сигнал об аномалии"],
      ["Измеримый бизнес-результат", "Энергия, производство, затраты, углерод и ISO 50001 в одном потоке решений"],
    ],
    whyLabel: "ПОЧЕМУ СЕЙЧАС?",
    whyTitle: "Промышленности нужны не дополнительные данные, а ясные решения.",
    whyItems: [
      "Разрозненные полевые данные не создают общего источника истины для энергетики и производства.",
      "Обычный мониторинг показывает отклонение, но редко объясняет причину и влияние на выпуск.",
      "Затраты, углерод и операционная эффективность должны управляться в одном решении.",
    ],
    focusLabel: "ФОКУС ИНВЕСТИЦИЙ И ПАРТНЕРСТВА",
    focusTitle: "Следующий этап проверки мы хотим пройти вместе.",
    focusText: "Ранние инвестиции и стратегические партнерства помогут ускорить четыре направления:",
    focus: [
      ["Разработка продукта", "ИИ-уровень решений, цифровые двойники и надежная инфраструктура"],
      ["Полевая интеграция", "Edge-подключение, устройства Modbus и инструменты ввода"],
      ["Промышленные пилоты", "Измеримая техническая и коммерческая проверка на предприятиях"],
      ["Команда и рынок", "Продукт, энергетическая инженерия и корпоративные продажи"],
    ],
    partnerTitle: "С кем мы хотим познакомиться?",
    partnerItems: [
      "Ранние инвесторы в энергетику, климатические технологии и промышленное ПО",
      "Промышленные компании, готовые предоставить площадку для пилота",
      "Партнеры по анализаторам энергии, автоматизации, edge и системной интеграции",
    ],
    ctaTitle: "Давайте вместе создадим новый слой промышленной энергетической аналитики.",
    ctaText: "Свяжитесь с нами по вопросам инвестиций, пилотной площадки или технологического партнерства.",
    cta: "Назначить встречу",
  },
} as const;

const pillarIcons = [Cable, BrainCircuit, Factory];
const focusIcons = [BrainCircuit, Cable, Factory, Globe2];

export default function EnergyStartupPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const copy = copyByLanguage[language] ?? copyByLanguage.tr;
  const isDark = theme === "dark";

  return (
    <>
      <Header />
      <main className={isDark ? "bg-black" : "bg-white"}>
        <section className="relative overflow-hidden px-4 pb-20 pt-36 md:pt-44">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="container relative text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-orange-500">
              <Rocket className="h-4 w-4" /> {copy.badge}
            </div>
            <h1 className={`mx-auto mt-7 max-w-5xl text-4xl font-bold leading-[1.08] md:text-6xl ${isDark ? "text-white" : "text-zinc-950"}`}>
              {copy.title}
            </h1>
            <p className="mt-5 text-xl font-semibold text-orange-500 md:text-2xl">{copy.accent}</p>
            <p className={`mx-auto mt-6 max-w-3xl text-base leading-8 md:text-lg ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {copy.description}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={withLocale("/contacts")} className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-semibold text-black transition hover:bg-orange-400">
                {copy.primary}<ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={withLocale("/products/energy-intelligence-platform")} className={`inline-flex items-center justify-center rounded-full border px-7 py-4 font-semibold transition ${isDark ? "border-white/15 text-white hover:bg-white/5" : "border-black/15 text-zinc-950 hover:bg-black/5"}`}>
                {copy.secondary}
              </Link>
            </div>
          </div>
        </section>

        <section className={`border-y py-16 ${isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-zinc-50"}`}>
          <div className="container grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.stageLabel}</div>
              <h2 className={`mt-4 text-3xl font-bold ${isDark ? "text-white" : "text-zinc-950"}`}>{copy.stageTitle}</h2>
            </div>
            <p className={`text-base leading-8 md:text-lg ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{copy.stageText}</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.builtLabel}</div>
              <h2 className={`mt-4 text-3xl font-bold leading-tight md:text-5xl ${isDark ? "text-white" : "text-zinc-950"}`}>{copy.builtTitle}</h2>
              <p className={`mt-6 text-base leading-8 md:text-lg ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{copy.builtText}</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {copy.pillars.map(([title, description], index) => {
                const Icon = pillarIcons[index];
                return <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className={`rounded-3xl border p-7 ${isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white"}`}>
                  <Icon className="h-6 w-6 text-orange-500" />
                  <h3 className={`mt-5 text-xl font-semibold ${isDark ? "text-white" : "text-zinc-950"}`}>{title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{description}</p>
                </motion.div>;
              })}
            </div>
          </div>
        </section>

        <section className={`py-20 ${isDark ? "bg-zinc-950" : "bg-zinc-50"}`}>
          <div className="container grid gap-12 lg:grid-cols-2">
            <div>
              <div className="text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.whyLabel}</div>
              <h2 className={`mt-4 text-3xl font-bold leading-tight md:text-4xl ${isDark ? "text-white" : "text-zinc-950"}`}>{copy.whyTitle}</h2>
            </div>
            <div className="space-y-4">
              {copy.whyItems.map((item) => <div key={item} className={`flex gap-4 rounded-2xl border p-5 ${isDark ? "border-white/10 bg-black" : "border-black/10 bg-white"}`}><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500"/><p className={`leading-7 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{item}</p></div>)}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.focusLabel}</div>
              <h2 className={`mt-4 text-3xl font-bold leading-tight md:text-5xl ${isDark ? "text-white" : "text-zinc-950"}`}>{copy.focusTitle}</h2>
              <p className={`mt-6 text-base leading-8 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{copy.focusText}</p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-orange-500/15 bg-orange-500/15 md:grid-cols-2 lg:grid-cols-4">
              {copy.focus.map(([title, description], index) => {
                const Icon = focusIcons[index];
                return <div key={title} className={`p-7 ${isDark ? "bg-zinc-950" : "bg-white"}`}><Icon className="h-6 w-6 text-orange-500"/><h3 className={`mt-5 font-semibold ${isDark ? "text-white" : "text-zinc-950"}`}>{title}</h3><p className={`mt-3 text-sm leading-6 ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{description}</p></div>;
              })}
            </div>
            <div className={`mt-12 rounded-3xl border p-7 md:p-9 ${isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-zinc-50"}`}>
              <div className="flex items-center gap-3"><Handshake className="h-6 w-6 text-orange-500"/><h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-zinc-950"}`}>{copy.partnerTitle}</h3></div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">{copy.partnerItems.map((item) => <div key={item} className={`flex gap-3 text-sm leading-6 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500"/>{item}</div>)}</div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="container rounded-[2rem] bg-orange-500 px-6 py-12 text-center text-black md:px-12 md:py-16">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{copy.ctaTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-black/70">{copy.ctaText}</p>
            <Link href={withLocale("/contacts")} className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 font-semibold text-white transition hover:bg-zinc-800">{copy.cta}<ArrowRight className="h-4 w-4"/></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
