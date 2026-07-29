"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";
import { getInsight, type InsightLocale } from "@/lib/insights";

export default function InsightArticle({ slug }: { slug: string }) {
  const article = getInsight(slug);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const locale: InsightLocale = language === "tr" ? "tr" : "en";
  const isDark = theme === "dark";
  if (!article) return null;

  const labels = locale === "tr"
    ? { back: "Tüm rehberler", summary: "Kısa özet", sources: "Kaynaklar", product: "Veriyi EnergyPulse'ta incele", updated: "Güncellendi: 16 Temmuz 2026" }
    : { back: "All insights", summary: "Key takeaways", sources: "Sources", product: "Explore the data in EnergyPulse", updated: "Updated: July 16, 2026" };
  const canonical = `https://www.str-energy.com/${locale}/insights/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title[locale],
    description: article.description[locale],
    datePublished: "2026-07-16",
    dateModified: "2026-07-16",
    inLanguage: locale,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "STR Energy", url: "https://www.str-energy.com" },
    publisher: { "@type": "Organization", name: "STR Energy", logo: { "@type": "ImageObject", url: "https://www.str-energy.com/logo.png" } },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "STR Energy", item: `https://www.str-energy.com/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "tr" ? "Bilgi Merkezi" : "Insights", item: `https://www.str-energy.com/${locale}/insights` },
      { "@type": "ListItem", position: 3, name: article.title[locale], item: canonical },
    ],
  };

  return (
    <div className={isDark ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-zinc-900"}>
      <Header variant="floating" />
      <main>
        <article>
          <header className="container mx-auto max-w-4xl px-4 pb-12 pt-36 md:pt-44">
            <Link href={withLocale("/insights")} className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-black"}`}><ArrowLeft className="h-4 w-4" />{labels.back}</Link>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">{article.category[locale]}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl">{article.title[locale]}</h1>
            <p className={`mt-6 text-lg leading-8 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{article.intro[locale]}</p>
            <p className={`mt-5 text-xs ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>{labels.updated} · STR Energy</p>
          </header>

          <div className="container mx-auto grid max-w-5xl gap-10 px-4 pb-24 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-12">
              {article.sections.map((section) => (
                <section key={section.heading[locale]}>
                  <h2 className="text-2xl font-bold md:text-3xl">{section.heading[locale]}</h2>
                  <p className={`mt-4 text-base leading-8 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>{section.body[locale]}</p>
                </section>
              ))}
              <section className={`rounded-2xl border p-6 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-zinc-50"}`}>
                <h2 className="text-xl font-bold">{labels.sources}</h2>
                <ul className="mt-4 space-y-3">
                  {article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:underline">{source.label}<ExternalLink className="h-3.5 w-3.5" /></a></li>)}
                </ul>
              </section>
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white shadow-sm"}`}>
                <h2 className="font-bold">{labels.summary}</h2>
                <ul className="mt-4 space-y-4">{article.takeaways[locale].map((item) => <li key={item} className={`flex gap-3 text-sm leading-6 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-orange-500" />{item}</li>)}</ul>
                <Link href={withLocale("/products/energypulse")} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-center text-xs font-bold text-white hover:bg-orange-600">{labels.product}<ArrowRight className="h-4 w-4" /></Link>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </div>
  );
}
