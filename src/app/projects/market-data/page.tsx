"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Database, Factory, FlaskConical } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LiveEnergyDashboard from "@/components/LiveEnergyDashboard";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const copyByLanguage = {
  tr: {
    badge: "BAĞIMSIZ AR-GE PROJESİ",
    title: "Enerji piyasası verileri için ayrı bir araştırma ve veri deneyimi.",
    description:
      "STR Energy Piyasa Veri Projesi; EPİAŞ, ENTSO-E ve EIA gibi resmi kaynaklardaki üretim, tüketim, fiyat, kapasite ve karbon verilerini araştırmak ve karşılaştırmak için geliştirilir.",
    boundaryTitle: "Ürün ve proje birbirinden ayrıdır",
    productTitle: "STR Energy Intelligence Platform",
    productDescription:
      "Endüstriyel tesislere, enerji analizörlerine ve saha ekipmanlarına bağlanan ticari enerji zekâsı ürünüdür.",
    projectTitle: "Piyasa Veri Projesi",
    projectDescription:
      "Enerji piyasası ve açık veri kaynakları üzerinde çalışan bağımsız araştırma, görselleştirme ve veri erişim projesidir.",
    productAction: "Endüstriyel platformu incele",
    dataTitle: "Piyasa veri çalışma alanı",
    dataDescription:
      "Aşağıdaki ekran yalnızca Piyasa Veri Projesi kapsamındadır; STR Energy Intelligence Platform'un bir modülü değildir.",
  },
  en: {
    badge: "INDEPENDENT R&D PROJECT",
    title: "A separate research and data experience for energy markets.",
    description:
      "STR Energy Market Data Project is developed to explore and compare generation, consumption, price, capacity and carbon data from official sources such as EPİAŞ, ENTSO-E and EIA.",
    boundaryTitle: "The product and the project are separate",
    productTitle: "STR Energy Intelligence Platform",
    productDescription:
      "The commercial energy intelligence product that connects to industrial facilities, energy analyzers and field equipment.",
    projectTitle: "Market Data Project",
    projectDescription:
      "An independent research, visualization and data-access project focused on energy markets and open datasets.",
    productAction: "Explore the industrial platform",
    dataTitle: "Market data workspace",
    dataDescription:
      "The interface below belongs only to the Market Data Project; it is not a module of STR Energy Intelligence Platform.",
  },
  ru: {
    badge: "НЕЗАВИСИМЫЙ R&D-ПРОЕКТ",
    title: "Отдельная исследовательская среда для данных энергорынков.",
    description:
      "Проект рыночных данных STR Energy предназначен для исследования и сравнения производства, потребления, цен, мощности и выбросов из официальных источников EPİAŞ, ENTSO-E и EIA.",
    boundaryTitle: "Продукт и проект разделены",
    productTitle: "STR Energy Intelligence Platform",
    productDescription:
      "Коммерческий продукт энергетической аналитики, подключаемый к промышленным объектам, анализаторам и полевому оборудованию.",
    projectTitle: "Проект рыночных данных",
    projectDescription:
      "Независимый исследовательский проект визуализации и доступа к открытым данным энергетических рынков.",
    productAction: "О промышленной платформе",
    dataTitle: "Рабочая область рыночных данных",
    dataDescription:
      "Интерфейс ниже относится только к проекту рыночных данных и не является модулем STR Energy Intelligence Platform.",
  },
} as const;

export default function MarketDataProjectPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const copy = copyByLanguage[language] ?? copyByLanguage.tr;
  const isDark = theme === "dark";
  const muted = isDark ? "text-zinc-400" : "text-zinc-600";
  const panel = isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white";

  return (
    <div className={isDark ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-zinc-900"}>
      <Header variant="floating" />

      <main>
        <section className="relative overflow-hidden pb-20 pt-32 md:pb-24 md:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.14),transparent_42%)]" />
          <div className="container relative">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-blue-500">
                <FlaskConical className="h-4 w-4" />
                {copy.badge}
              </div>
              <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight md:text-6xl">{copy.title}</h1>
              <p className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed ${muted}`}>{copy.description}</p>
            </div>

            <div className={`mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border ${panel}`}>
              <div className={`border-b px-7 py-5 ${isDark ? "border-white/10" : "border-black/10"}`}>
                <h2 className="text-lg font-semibold">{copy.boundaryTitle}</h2>
              </div>
              <div className="grid md:grid-cols-2">
                <div className={`p-7 md:p-9 ${isDark ? "md:border-r md:border-white/10" : "md:border-r md:border-black/10"}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Factory className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-xs font-semibold tracking-[0.14em] text-orange-500">PRODUCT</div>
                  <h3 className="mt-2 text-xl font-bold">{copy.productTitle}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{copy.productDescription}</p>
                  <Link
                    href={withLocale("/products/energy-intelligence-platform")}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 transition hover:text-orange-400"
                  >
                    {copy.productAction}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className={`p-7 md:p-9 ${isDark ? "border-t border-white/10 md:border-t-0" : "border-t border-black/10 md:border-t-0"}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <Database className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-xs font-semibold tracking-[0.14em] text-blue-500">R&D PROJECT</div>
                  <h3 className="mt-2 text-xl font-bold">{copy.projectTitle}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{copy.projectDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`border-y py-12 ${isDark ? "border-white/10 bg-zinc-950/60" : "border-black/10 bg-zinc-50"}`}>
          <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-500">
                <BarChart3 className="h-4 w-4" />
                {copy.dataTitle}
              </div>
              <p className={`mt-2 max-w-3xl leading-relaxed ${muted}`}>{copy.dataDescription}</p>
            </div>
          </div>
        </section>

        <LiveEnergyDashboard />
      </main>

      <Footer compact />
    </div>
  );
}
