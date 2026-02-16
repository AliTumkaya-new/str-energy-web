import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://str.energy";
  const now = new Date();

  const staticPages = [
    "",
    "/about",
    "/contacts",
    "/news",
    "/testimonials",
    "/privacy",
    "/help",
    "/portal",
  ];

  const productPages = [
    "/products",
    "/products/energyos",
    "/products/energycloud",
    "/products/powerforecast",
    "/products/gridanalytics",
    "/products/securegrid",
    "/products/smartmeter",
  ];

  const locales = ["", "/en", "/ru"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of [...staticPages, ...productPages]) {
      entries.push({
        url: `${baseUrl}${locale}${page}`,
        lastModified: now,
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : page.startsWith("/products") ? 0.8 : 0.6,
      });
    }
  }

  return entries;
}
