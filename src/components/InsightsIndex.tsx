"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, Search, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";
import { insights, type InsightLocale } from "@/lib/insights";

const copy = {
  tr: {
    eyebrow: "ENERJİ BİLGİ MERKEZİ",
    title: "Enerji piyasalarını daha iyi anlamak için pratik rehberler",
    description: "Elektrik piyasaları, enerji yönetimi, tahminleme, karbon ve şebeke teknolojilerini teknik doğrulukla anlatan güncel STR Energy içerikleri.",
    search: "Makale veya konu ara",
    all: "Tümü",
    guide: "rehber",
    results: "sonuç",
    read: "Makaleyi oku",
    minute: "dk okuma",
    emptyTitle: "Aramanızla eşleşen bir makale bulunamadı.",
    emptyAction: "Filtreleri temizle",
  },
  en: {
    eyebrow: "ENERGY INSIGHTS",
    title: "Practical guides for understanding energy markets",
    description: "Current STR Energy guides explaining electricity markets, energy management, forecasting, carbon and grid technologies with technical clarity.",
    search: "Search articles or topics",
    all: "All",
    guide: "guides",
    results: "results",
    read: "Read article",
    minute: "min read",
    emptyTitle: "No articles match your search.",
    emptyAction: "Clear filters",
  },
} as const;

function normalise(value: string, locale: InsightLocale) {
  return value.toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US").trim();
}

export default function InsightsIndex() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const locale: InsightLocale = language === "tr" ? "tr" : "en";
  const text = copy[locale];
  const isDark = theme === "dark";
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const byKey = new Map<string, string>();
    insights.forEach((article) => byKey.set(article.category.en, article.category[locale]));
    return [...byKey.entries()].sort((a, b) => a[1].localeCompare(b[1], locale));
  }, [locale]);

  const filteredInsights = useMemo(() => {
    const term = normalise(query, locale);
    return insights.filter((article) => {
      if (selectedCategory !== "all" && article.category.en !== selectedCategory) return false;
      if (!term) return true;
      const searchable = [article.title[locale], article.description[locale], article.category[locale], ...article.takeaways[locale]].join(" ");
      return normalise(searchable, locale).includes(term);
    });
  }, [locale, query, selectedCategory]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("all");
  };

  return (
    <div className={isDark ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-zinc-900"}>
      <Header variant="floating" />
      <main>
        <section className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.16),transparent_52%)]" />
          <div className="container relative mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-orange-500">
              <BookOpen className="h-4 w-4" />
              {text.eyebrow}
            </div>
            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{text.title}</h1>
            <p className={`mx-auto mt-6 max-w-3xl text-base leading-8 md:text-lg ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{text.description}</p>
            <div className={`mx-auto mt-7 inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${isDark ? "border-white/10 bg-white/5 text-zinc-300" : "border-black/10 bg-white text-zinc-700"}`}>
              {insights.length} {text.guide}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl pb-24">
          <div className={`sticky top-20 z-20 rounded-2xl border p-3 shadow-sm backdrop-blur-xl ${isDark ? "border-white/10 bg-black/85" : "border-black/10 bg-white/90"}`}>
            <div className="relative">
              <Search className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${isDark ? "text-zinc-500" : "text-zinc-400"}`} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={text.search}
                aria-label={text.search}
                className={`h-11 w-full rounded-xl border pl-11 pr-11 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 ${isDark ? "border-white/10 bg-white/5 text-white placeholder:text-zinc-600" : "border-black/10 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400"}`}
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label={text.emptyAction} className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 ${isDark ? "text-zinc-400 hover:bg-white/10" : "text-zinc-500 hover:bg-black/5"}`}>
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label={text.eyebrow}>
              <button type="button" aria-pressed={selectedCategory === "all"} onClick={() => setSelectedCategory("all")} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${selectedCategory === "all" ? "bg-orange-500 text-white" : isDark ? "bg-white/5 text-zinc-400 hover:text-white" : "bg-zinc-100 text-zinc-600 hover:text-zinc-900"}`}>
                {text.all}
              </button>
              {categories.map(([key, label]) => (
                <button key={key} type="button" aria-pressed={selectedCategory === key} onClick={() => setSelectedCategory(key)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${selectedCategory === key ? "bg-orange-500 text-white" : isDark ? "bg-white/5 text-zinc-400 hover:text-white" : "bg-zinc-100 text-zinc-600 hover:text-zinc-900"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className={`mb-5 mt-7 text-sm ${isDark ? "text-zinc-500" : "text-zinc-500"}`} aria-live="polite">
            {filteredInsights.length} {text.results}
          </div>

          {filteredInsights.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredInsights.map((article) => (
                <article key={article.slug} className={`group flex min-h-80 flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 ${isDark ? "border-white/10 bg-white/[0.03] hover:border-orange-500/40 hover:bg-white/[0.05]" : "border-black/10 bg-zinc-50 hover:border-orange-500/40 hover:bg-white hover:shadow-lg"}`}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-500">{article.category[locale]}</p>
                  <h2 className="mt-4 text-xl font-bold leading-7">{article.title[locale]}</h2>
                  <p className={`mt-3 text-sm leading-6 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{article.description[locale]}</p>
                  <div className={`mt-auto flex items-end justify-between gap-4 pt-7 text-xs ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                    <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{article.readMinutes ?? 4} {text.minute}</span>
                    <Link href={withLocale(`/insights/${article.slug}`)} className="inline-flex items-center gap-2 font-bold text-orange-500">
                      {text.read}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={`rounded-2xl border px-6 py-16 text-center ${isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-zinc-50"}`}>
              <p className="text-lg font-bold">{text.emptyTitle}</p>
              <button type="button" onClick={clearFilters} className="mt-5 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">{text.emptyAction}</button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
