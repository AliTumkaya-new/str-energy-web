import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { insights } from "@/lib/insights";

const locales = ["tr", "en", "ru"] as const;
const routes = [
  "",
  "about",
  "contacts",
  "privacy",
  "terms",
  "cookie-policy",
  "disclaimer",
  "editorial-policy",
  "authors/str-energy-editorial-team",
  "methodology/market-data",
  "projects/market-data",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-02T00:00:00.000Z");

  const coreEntries = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route ? `/${route}` : ""}`,
      lastModified,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "projects/market-data" ? 0.8 : 0.65,
      alternates: {
        languages: {
          tr: `${SITE_URL}/tr${route ? `/${route}` : ""}`,
          en: `${SITE_URL}/en${route ? `/${route}` : ""}`,
          ru: `${SITE_URL}/ru${route ? `/${route}` : ""}`,
          "x-default": `${SITE_URL}/en${route ? `/${route}` : ""}`,
        },
      },
    }))
  );
  const insightIndexEntries = (["tr", "en"] as const).map((locale) => ({
    url: `${SITE_URL}/${locale}/insights`,
    lastModified: new Date("2026-09-02T00:00:00.000Z"),
    changeFrequency: "weekly" as const,
    priority: 0.85,
    alternates: { languages: { tr: `${SITE_URL}/tr/insights`, en: `${SITE_URL}/en/insights`, "x-default": `${SITE_URL}/en/insights` } },
  }));
  const insightEntries = insights.flatMap((article) =>
    (["tr", "en"] as const).map((locale) => ({
      url: `${SITE_URL}/${locale}/insights/${article.slug}`,
      lastModified: new Date(`${article.updatedAt ?? article.publishedAt ?? "2026-07-16"}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/insights/${article.slug}`, en: `${SITE_URL}/en/insights/${article.slug}`, "x-default": `${SITE_URL}/en/insights/${article.slug}` } },
    }))
  );
  return [...coreEntries, ...insightIndexEntries, ...insightEntries];
}
