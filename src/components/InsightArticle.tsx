"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock3, ExternalLink, List } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";
import { getInsight, insights, type InsightLocale } from "@/lib/insights";

const copy = {
  tr: {
    back: "Tüm rehberler",
    summary: "Kısa özet",
    contents: "Bu yazıda",
    sources: "Kaynaklar",
    related: "İlgili makaleler",
    relatedDescription: "Konuyu tamamlayan diğer STR Energy rehberleri.",
    product: "Veriyi EnergyPulse'ta incele",
    published: "Yayımlandı",
    updated: "Güncellendi",
    minute: "dk okuma",
    read: "Makaleyi oku",
  },
  en: {
    back: "All insights",
    summary: "Key takeaways",
    contents: "In this article",
    sources: "Sources",
    related: "Related articles",
    relatedDescription: "More STR Energy guides to continue exploring the topic.",
    product: "Explore the data in EnergyPulse",
    published: "Published",
    updated: "Updated",
    minute: "min read",
    read: "Read article",
  },
} as const;

function relatedFor(slug: string, category: string) {
  const sameCategory = insights.filter((item) => item.slug !== slug && item.category.en === category);
  const otherArticles = insights.filter((item) => item.slug !== slug && item.category.en !== category);
  return [...sameCategory, ...otherArticles].slice(0, 3);
}

export default function InsightArticle({ slug }: { slug: string }) {
  const article = getInsight(slug);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const locale: InsightLocale = language === "tr" ? "tr" : "en";
  const isDark = theme === "dark";
  if (!article) return null;

  const labels = copy[locale];
  const publishedAt = article.publishedAt ?? "2026-07-16";
  const updatedAt = article.updatedAt ?? publishedAt;
  const readMinutes = article.readMinutes ?? 4;
  const dateFormatter = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const publishedLabel = dateFormatter.format(new Date(`${publishedAt}T00:00:00Z`));
  const updatedLabel = dateFormatter.format(new Date(`${updatedAt}T00:00:00Z`));
  const relatedArticles = relatedFor(article.slug, article.category.en);
  const canonical = `https://www.str-energy.com/${locale}/insights/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title[locale],
    description: article.description[locale],
    datePublished: publishedAt,
    dateModified: updatedAt,
    inLanguage: locale,
    mainEntityOfPage: canonical,
    articleSection: article.category[locale],
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
          <header className={`relative overflow-hidden border-b pb-14 pt-28 md:pb-16 md:pt-36 ${isDark ? "border-white/10" : "border-black/10"}`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(249,115,22,0.14),transparent_45%)]" />
            <div className="container relative mx-auto max-w-6xl">
              <Link href={withLocale("/insights")} className={`inline-flex items-center gap-2 text-sm font-semibold transition ${isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-black"}`}>
                <ArrowLeft className="h-4 w-4" />
                {labels.back}
              </Link>
              <p className="mt-9 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">{article.category[locale]}</p>
              <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">{article.title[locale]}</h1>
              <p className={`mt-6 max-w-4xl text-lg leading-8 ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>{article.intro[locale]}</p>
              <div className={`mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-orange-500" />{updatedAt === publishedAt ? labels.published : labels.updated}: <time dateTime={updatedAt}>{updatedAt === publishedAt ? publishedLabel : updatedLabel}</time></span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-orange-500" />{readMinutes} {labels.minute}</span>
                <span>STR Energy</span>
              </div>
            </div>
          </header>

          <div className="container mx-auto grid max-w-6xl gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
            <div className="min-w-0 space-y-12">
              {article.sections.map((section, index) => (
                <section id={`section-${index + 1}`} key={section.heading[locale]} className="scroll-mt-32">
                  <div className="flex items-start gap-4">
                    <span className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isDark ? "bg-orange-500/15 text-orange-400" : "bg-orange-100 text-orange-600"}`}>{index + 1}</span>
                    <div>
                      <h2 className="text-2xl font-bold leading-tight md:text-3xl">{section.heading[locale]}</h2>
                      <p className={`mt-4 text-base leading-8 md:text-[17px] ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>{section.body[locale]}</p>
                    </div>
                  </div>
                </section>
              ))}

              <section className={`rounded-2xl border p-6 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-zinc-50"}`}>
                <h2 className="text-xl font-bold">{labels.sources}</h2>
                <ul className="mt-4 space-y-3">
                  {article.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 text-sm font-semibold leading-6 text-orange-500 hover:underline">
                        {source.label}<ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <nav aria-label={labels.contents} className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white shadow-sm"}`}>
                <h2 className="flex items-center gap-2 font-bold"><List className="h-4 w-4 text-orange-500" />{labels.contents}</h2>
                <ol className="mt-4 space-y-3">
                  {article.sections.map((section, index) => (
                    <li key={section.heading[locale]}>
                      <a href={`#section-${index + 1}`} className={`flex gap-3 text-sm leading-5 transition ${isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900"}`}>
                        <span className="font-bold text-orange-500">{String(index + 1).padStart(2, "0")}</span>
                        {section.heading[locale]}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white shadow-sm"}`}>
                <h2 className="font-bold">{labels.summary}</h2>
                <ul className="mt-4 space-y-4">
                  {article.takeaways[locale].map((item) => (
                    <li key={item} className={`flex gap-3 text-sm leading-6 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={withLocale("/products/energypulse")} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-orange-600">
                  {labels.product}<ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>

          <section className={`border-t py-16 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-zinc-50"}`}>
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold">{labels.related}</h2>
              <p className={`mt-3 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{labels.relatedDescription}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} href={withLocale(`/insights/${related.slug}`)} className={`group rounded-2xl border p-5 transition hover:-translate-y-1 ${isDark ? "border-white/10 bg-black hover:border-orange-500/40" : "border-black/10 bg-white hover:border-orange-500/40 hover:shadow-md"}`}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-500">{related.category[locale]}</p>
                    <h3 className="mt-3 text-lg font-bold leading-6">{related.title[locale]}</h3>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-orange-500">{labels.read}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </div>
  );
}
