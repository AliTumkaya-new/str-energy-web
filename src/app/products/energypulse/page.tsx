"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveEnergyDashboard from "@/components/LiveEnergyDashboard";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const copyByLanguage = {
  tr: {
    eyebrow: "GLOBAL ENERJİ VERİ ÜRÜNÜ",
    title: "Enerji piyasalarını tek ekranda takip edin.",
    description: "EnergyPulse; EPİAŞ, ENTSO-E ve EIA kaynaklarından Türkiye, Avrupa ve küresel enerji verilerini sorgulamanızı, karşılaştırmanızı ve dışa aktarmanızı sağlar.",
    sources: ["Gerçek zamanlı üretim, PTF ve YEKDEM", "Gün öncesi fiyatlar, yük ve sınır ötesi akışlar", "Üretim, tüketim, kapasite, fiyat ve karbon verileri"],
  },
  en: {
    eyebrow: "GLOBAL ENERGY DATA PRODUCT",
    title: "Track energy markets in one place.",
    description: "EnergyPulse brings together energy data from EPİAŞ, ENTSO-E and EIA so professionals can query, compare and export market information across Türkiye, Europe and global markets.",
    sources: ["Real-time generation, PTF and YEKDEM", "Day-ahead prices, load and cross-border flows", "Generation, consumption, capacity, price and carbon data"],
  },
  ru: {
    eyebrow: "ГЛОБАЛЬНЫЕ ЭНЕРГЕТИЧЕСКИЕ ДАННЫЕ",
    title: "Энергетические рынки в одном интерфейсе.",
    description: "EnergyPulse объединяет данные EPİAŞ, ENTSO-E и EIA для анализа и экспорта показателей Турции, Европы и мировых рынков.",
    sources: ["Генерация, PTF и YEKDEM", "Цены, нагрузка и трансграничные потоки", "Производство, потребление, мощности и углерод"],
  },
} as const;

export default function EnergyPulsePage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const copy = copyByLanguage[language] ?? copyByLanguage.tr;
  const isDark = theme === "dark";

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EnergyPulse",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `https://www.str-energy.com/${language}/products/energypulse`,
    description: copy.description,
    provider: { "@type": "Organization", name: "STR Energy", url: "https://www.str-energy.com" },
    featureList: copy.sources,
  };

  return (
    <div className={isDark ? "bg-black text-white" : "bg-white text-zinc-900"}>
      <Header variant="floating" />
      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-36 md:pb-24 md:pt-44">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.16),transparent_52%)]" />
          <div className="container relative mx-auto max-w-5xl text-center">
            <p className="text-xs font-bold tracking-[0.24em] text-orange-500">{copy.eyebrow}</p>
            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              EnergyPulse
              <span className="mt-2 block text-orange-500">{copy.title}</span>
            </h1>
            <p className={`mx-auto mt-6 max-w-3xl text-base leading-8 md:text-lg ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {copy.description}
            </p>
            <div className="mx-auto mt-10 grid max-w-4xl gap-3 text-left md:grid-cols-3">
              {copy.sources.map((source, index) => (
                <div key={source} className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-zinc-50"}`}>
                  <span className="text-xs font-bold text-orange-500">0{index + 1}</span>
                  <p className="mt-3 text-sm leading-6">{source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <LiveEnergyDashboard />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
    </div>
  );
}
