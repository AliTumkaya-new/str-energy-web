import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { insightSlugs } from "@/lib/insights";

const locales = ["tr", "en", "ru"] as const;
const routes = [
  "",
  "about",
  "contacts",
  "news",
  "testimonials",
  "privacy",
  "terms",
  "cookie-policy",
  "disclaimer",
  "help",
  "products",
  "products/energypulse",
  "products/energyos",
  "products/gridanalytics",
  "products/powerforecast",
  "products/securegrid",
  "products/smartmeter",
  "products/energycloud",
  "products/climateos",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-16T00:00:00.000Z");

  const coreEntries = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route ? `/${route}` : ""}`,
      lastModified,
      changeFrequency: route === "" || route === "news" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "products/energypulse" ? 0.95 : route.startsWith("products") ? 0.85 : 0.65,
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
  const insightEntries = ["", ...insightSlugs].flatMap((slug) =>
    (["tr", "en"] as const).map((locale) => ({
      url: `${SITE_URL}/${locale}/insights${slug ? `/${slug}` : ""}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/insights${slug ? `/${slug}` : ""}`, en: `${SITE_URL}/en/insights${slug ? `/${slug}` : ""}`, "x-default": `${SITE_URL}/en/insights${slug ? `/${slug}` : ""}` } },
    }))
  );
  return [...coreEntries, ...insightEntries];
}
