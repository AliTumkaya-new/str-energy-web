"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";
import { insights, getReadMinutes, type InsightLocale } from "@/lib/insights";
import AdSenseUnit from "@/components/AdSenseUnit";

const featuredSlugs = [
  "cop31-iklim-zirvesi-turkiye-enerji-donusumu-yol-haritasi",
  "green-hydrogen-electrolyzer-industrial-decarbonization",
  "grid-scale-bess-battery-storage-arbitrage-regulation",
  "small-modular-reactors-smr-nuclear-energy",
  "ai-digital-twins-smart-grid-management",
  "turkiye-ets-carbon-market-climate-law",
];

const copy = {
  tr: {
    badge: "ENERJİ GÜNDEMİ & REHBERLER",
    title: "Güncel Enerji Gündemi ve Derinlemesine Analizler",
    subtitle:
      "COP31 iklim diplomasisi, yeşil hidrojen, batarya depolama ve akıllı şebeke teknolojileri üzerine birincil teknik kaynaklara dayanan kapsamlı STR Energy analizleri.",
    viewAll: "Tüm Rehberleri İncele",
    guidesCount: "kapsamlı rehber",
    readMore: "Analizi oku",
    minute: "dk okuma",
  },
  en: {
    badge: "ENERGY AGENDA & INSIGHTS",
    title: "Current Energy Agenda and In-Depth Technical Guides",
    subtitle:
      "Comprehensive STR Energy analyses on COP31 climate diplomacy, green hydrogen, battery storage, and smart grid systems grounded in verified primary data.",
    viewAll: "Explore All Guides",
    guidesCount: "in-depth guides",
    readMore: "Read analysis",
    minute: "min read",
  },
  ru: {
    badge: "ЭНЕРГЕТИЧЕСКАЯ ПОВЕСТКА",
    title: "Актуальная энергетическая повестка и экспертные руководства",
    subtitle:
      "Глубокие технические обзоры STR Energy по COP31, зеленому водороду, накопителям энергии и умным сетям на основе первичных данных.",
    viewAll: "Смотреть все материалы",
    guidesCount: "руководств",
    readMore: "Читать анализ",
    minute: "мин",
  },
} as const;

export default function LatestInsightsSection() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const isDark = theme === "dark";
  const locale: InsightLocale = language === "tr" ? "tr" : "en";
  const text = copy[language as keyof typeof copy] || copy.en;

  const featuredArticles = featuredSlugs
    .map((slug) => insights.find((item) => item.slug === slug))
    .filter(Boolean) as typeof insights;

  return (
    <section className={`relative py-24 overflow-hidden border-t ${isDark ? "bg-black border-white/5" : "bg-zinc-50/70 border-black/10"}`}>
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-orange-500/10 text-orange-500 border border-orange-500/20 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              {text.badge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {text.title}
            </h2>
            <p className={`mt-4 max-w-2xl text-base md:text-lg leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {text.subtitle}
            </p>
          </div>

          <Link
            href={withLocale("/insights")}
            className="inline-flex items-center gap-2 self-start md:self-end px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 hover:bg-orange-400 text-white transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 shrink-0"
          >
            {text.viewAll} ({insights.length} {text.guidesCount})
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article, index) => {
            const readMinutes = getReadMinutes(article, locale);
            return (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                  isDark
                    ? "bg-zinc-950/70 border-white/10 hover:border-orange-500/50 hover:bg-zinc-900/60 hover:shadow-[0_20px_40px_-20px_rgba(249,115,22,0.15)]"
                    : "bg-white border-black/10 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs mb-4">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-orange-500 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20">
                      {article.category[locale]}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-xs ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                      <Clock3 className="h-3.5 w-3.5 text-orange-500/80" />
                      {readMinutes} {text.minute}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-snug tracking-tight group-hover:text-orange-500 transition-colors">
                    <Link href={withLocale(`/insights/${article.slug}`)}>
                      {article.title[locale]}
                    </Link>
                  </h3>

                  <p className={`mt-3 text-sm leading-relaxed line-clamp-3 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                    {article.description[locale]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-inherit flex items-center justify-between">
                  <Link
                    href={withLocale(`/insights/${article.slug}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 group-hover:text-orange-400 transition"
                  >
                    {text.readMore}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <span className={`text-[11px] ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
                    {article.publishedAt}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* In-feed AdSense Banner */}
        <AdSenseUnit variant="banner" className="mt-14" />
      </div>
    </section>
  );
}
