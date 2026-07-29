"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";
import { insights, type InsightLocale } from "@/lib/insights";

const copy = {
  tr: { eyebrow: "ENERJİ BİLGİ MERKEZİ", title: "Enerji verisini anlamak için güvenilir rehberler", description: "Elektrik piyasaları, enerji yönetimi, tahminleme ve global veri setlerini teknik doğrulukla açıklayan STR Energy içerikleri.", read: "Rehberi oku" },
  en: { eyebrow: "ENERGY INSIGHTS", title: "Practical guides for understanding energy data", description: "STR Energy articles explaining electricity markets, energy management, forecasting and global datasets with technical clarity.", read: "Read guide" },
} as const;

export default function InsightsIndex() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const locale: InsightLocale = language === "tr" ? "tr" : "en";
  const text = copy[locale];
  const isDark = theme === "dark";

  return (
    <div className={isDark ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-zinc-900"}>
      <Header variant="floating" />
      <main>
        <section className="relative overflow-hidden px-4 pb-14 pt-36 md:pb-20 md:pt-44">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.14),transparent_50%)]" />
          <div className="container relative mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-orange-500"><BookOpen className="h-4 w-4" />{text.eyebrow}</div>
            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{text.title}</h1>
            <p className={`mx-auto mt-6 max-w-3xl text-base leading-8 md:text-lg ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{text.description}</p>
          </div>
        </section>
        <section className="container mx-auto grid gap-5 px-4 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((article) => (
            <article key={article.slug} className={`group flex min-h-72 flex-col rounded-2xl border p-6 transition ${isDark ? "border-white/10 bg-white/[0.03] hover:border-orange-500/35" : "border-black/10 bg-zinc-50 hover:border-orange-500/35"}`}>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-500">{article.category[locale]}</p>
              <h2 className="mt-4 text-xl font-bold leading-7">{article.title[locale]}</h2>
              <p className={`mt-3 text-sm leading-6 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{article.description[locale]}</p>
              <Link href={withLocale(`/insights/${article.slug}`)} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-orange-500">
                {text.read}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
