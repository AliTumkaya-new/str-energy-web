import type { Metadata } from "next";
import type { SupportedLocale } from "@/lib/locale";
import { getInsight } from "@/lib/insights";

export const SITE_URL = "https://www.str-energy.com";
export const SITE_NAME = "STR Energy";

type SeoCopy = Record<SupportedLocale, { title: string; description: string }>;

const routeSeo: Record<string, SeoCopy> = {
  "": {
    tr: {
      title: "Enerji Yazılımı, Piyasa Verileri ve Analitik | STR Energy",
      description: "EPİAŞ, ENTSO-E ve EIA enerji verileri; gerçek zamanlı izleme, enerji yönetimi, tahminleme, şebeke analitiği ve otomasyon çözümleri.",
    },
    en: {
      title: "Energy Software, Market Data and Analytics | STR Energy",
      description: "Energy data from EPİAŞ, ENTSO-E and EIA with real-time monitoring, energy management, forecasting, grid analytics and automation solutions.",
    },
    ru: {
      title: "Энергетическое ПО, данные и аналитика | STR Energy",
      description: "Данные EPİAŞ, ENTSO-E и EIA, мониторинг, управление энергией, прогнозирование, аналитика сетей и автоматизация.",
    },
  },
  products: {
    tr: { title: "Enerji Yazılım Ürünleri | STR Energy", description: "Enerji yönetimi, piyasa verileri, şebeke analitiği, tahminleme, güvenlik, sayaç ve bulut ürünlerini inceleyin." },
    en: { title: "Energy Software Products | STR Energy", description: "Explore products for energy management, market data, grid analytics, forecasting, security, smart metering and cloud infrastructure." },
    ru: { title: "Программные продукты для энергетики | STR Energy", description: "Продукты для управления энергией, рыночных данных, аналитики сетей, прогнозирования, безопасности и облака." },
  },
  "products/energypulse": {
    tr: { title: "EnergyPulse | Canlı Enerji Piyasası Verileri", description: "Türkiye, Avrupa ve küresel enerji piyasalarını tek üründe izleyin. PTF, YEKDEM, üretim, yük, fiyat, kapasite ve karbon verilerini sorgulayın." },
    en: { title: "EnergyPulse | Live Global Energy Market Data", description: "Monitor energy markets across Türkiye, Europe and the world. Query generation, load, prices, capacity, carbon, PTF and YEKDEM data." },
    ru: { title: "EnergyPulse | Данные мировых энергорынков", description: "Данные энергетических рынков Турции, Европы и мира: генерация, нагрузка, цены, мощности и выбросы углерода." },
  },
  "products/energyos": product("EnergyOS", "enerji yönetimi ve otomasyon", "energy management and automation", "управление энергией и автоматизация"),
  "products/gridanalytics": product("GridAnalytics", "şebeke analitiği ve raporlama", "power grid analytics and reporting", "аналитика электрических сетей"),
  "products/powerforecast": product("PowerForecast", "enerji tüketim tahmini ve planlama", "energy demand forecasting and planning", "прогнозирование спроса на энергию"),
  "products/securegrid": product("SecureGrid", "enerji altyapısı siber güvenliği", "energy infrastructure cybersecurity", "кибербезопасность энергетики"),
  "products/smartmeter": product("SmartMeter Hub", "akıllı sayaç entegrasyonu", "smart meter integration", "интеграция интеллектуальных счетчиков"),
  "products/energycloud": product("EnergyCloud", "bulut tabanlı enerji veri platformu", "cloud energy data platform", "облачная платформа энергетических данных"),
  "products/climateos": product("ClimateOS", "karbon ve emisyon yönetimi", "carbon and emissions management", "управление углеродом и выбросами"),
  about: {
    tr: { title: "STR Energy Hakkında | Enerji Teknolojileri", description: "STR Energy'nin enerji yazılımı, veri analitiği, otomasyon ve uluslararası teknoloji ortaklığı yaklaşımını keşfedin." },
    en: { title: "About STR Energy | Energy Technology Company", description: "Discover STR Energy's approach to energy software, data analytics, automation and international technology partnerships." },
    ru: { title: "О компании STR Energy", description: "Энергетическое программное обеспечение, аналитика данных, автоматизация и международное технологическое партнерство." },
  },
  news: {
    tr: { title: "Enerji Teknolojileri Haberleri | STR Energy", description: "STR Energy ürünleri, enerji projeleri, piyasa verileri, teknoloji ortaklıkları ve şirket gelişmeleri." },
    en: { title: "Energy Technology News | STR Energy", description: "Updates on STR Energy products, energy projects, market data, technology partnerships and company developments." },
    ru: { title: "Новости энергетических технологий | STR Energy", description: "Новости продуктов, энергетических проектов, рыночных данных и партнерств STR Energy." },
  },
  insights: {
    tr: { title: "Enerji Bilgi Merkezi | STR Energy", description: "Elektrik piyasaları, enerji yönetimi, tahminleme, karbon, yenilenebilir enerji, depolama, şebeke teknolojileri ve OT güvenliği hakkında teknik rehberler." },
    en: { title: "Energy Insights and Market Guides | STR Energy", description: "Technical guides to electricity markets, energy management, forecasting, carbon, renewables, storage, grid technologies and OT cybersecurity." },
    ru: { title: "Energy Insights | STR Energy", description: "Technical energy market and data guides from STR Energy." },
  },
  contacts: {
    tr: { title: "İletişim | STR Energy", description: "Enerji yazılımı, veri analitiği, otomasyon, proje ve teknoloji ortaklığı ihtiyaçlarınız için STR Energy ile iletişime geçin." },
    en: { title: "Contact | STR Energy", description: "Contact STR Energy for energy software, data analytics, automation, projects and technology partnerships." },
    ru: { title: "Контакты | STR Energy", description: "Свяжитесь с STR Energy по вопросам энергетического ПО, аналитики, автоматизации и партнерства." },
  },
};

function product(name: string, tr: string, en: string, ru: string): SeoCopy {
  return {
    tr: { title: `${name} | ${capitalize(tr)}`, description: `${name}, ${tr} için STR Energy tarafından geliştirilen ölçeklenebilir enerji yazılımı ürünüdür.` },
    en: { title: `${name} | ${capitalize(en)}`, description: `${name} is STR Energy's scalable software product for ${en}.` },
    ru: { title: `${name} | ${capitalize(ru)}`, description: `${name} — масштабируемый продукт STR Energy для ${ru}.` },
  };
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function buildMetadata(locale: SupportedLocale, path = ""): Metadata {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  const insight = normalizedPath.startsWith("insights/") ? getInsight(normalizedPath.slice("insights/".length)) : undefined;
  const insightLocale = locale === "tr" ? "tr" : "en";
  const copy = insight
    ? { title: `${insight.title[insightLocale]} | STR Energy`, description: insight.description[insightLocale] }
    : routeSeo[normalizedPath]?.[locale] ?? routeSeo[""][locale];
  const canonical = `${SITE_URL}/${locale}${normalizedPath ? `/${normalizedPath}` : ""}`;
  const languageAlternates = insight
    ? { tr: `${SITE_URL}/tr/${normalizedPath}`, en: `${SITE_URL}/en/${normalizedPath}`, "x-default": `${SITE_URL}/en/${normalizedPath}` }
    : { tr: `${SITE_URL}/tr${normalizedPath ? `/${normalizedPath}` : ""}`, en: `${SITE_URL}/en${normalizedPath ? `/${normalizedPath}` : ""}`, ru: `${SITE_URL}/ru${normalizedPath ? `/${normalizedPath}` : ""}`, "x-default": `${SITE_URL}/en${normalizedPath ? `/${normalizedPath}` : ""}` };

  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical, languages: languageAlternates },
    openGraph: {
      type: insight ? "article" : "website",
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "tr" ? "tr_TR" : locale === "ru" ? "ru_RU" : "en_US",
      title: copy.title,
      description: copy.description,
      images: [{ url: `${SITE_URL}/og-image.svg`, width: 1200, height: 630, alt: `${SITE_NAME} energy technology` }],
      ...(insight ? { publishedTime: insight.publishedAt ?? "2026-07-16", modifiedTime: insight.updatedAt ?? insight.publishedAt ?? "2026-07-16" } : {}),
    },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description, images: [`${SITE_URL}/og-image.svg`] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: "Energy software, market data, analytics, forecasting and automation solutions for utilities, industrial facilities and energy professionals.",
      contactPoint: { "@type": "ContactPoint", telephone: "+90-544-918-70-90", contactType: "sales", availableLanguage: ["Turkish", "English", "Russian"] },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["tr", "en", "ru"],
    },
  ],
};
