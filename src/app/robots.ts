import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/portal/"],
      },
    ],
    sitemap: "https://www.str-energy.com/sitemap.xml",
    host: "https://www.str-energy.com",
  };
}
