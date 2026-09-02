import type { Metadata } from "next";
import type { SupportedLocale } from "@/lib/locale";
import { getInsight } from "@/lib/insights";

export const SITE_URL = "https://www.str-energy.com";
export const SITE_NAME = "STR Energy";

type SeoCopy = Record<SupportedLocale, { title: string; description: string }>;

const routeSeo: Record<string, SeoCopy> = {
  "": {
    tr: {
      title: "Enerji Yazılım Ar-Ge | STR Energy",
      description: "Genç girişimciler tarafından Türkiye’de kurulan STR Energy; enerji verisi, yazılım ve uygulamalı Ar-Ge alanlarında ölçülebilir çözümler geliştirir.",
    },
    en: {
      title: "Energy Software R&D | STR Energy",
      description: "Founded in Türkiye by young entrepreneurs, STR Energy develops measurable solutions across energy data, software and applied R&D.",
    },
    ru: {
      title: "Энергетическое ПО и R&D | STR Energy",
      description: "STR Energy основана в Турции молодыми предпринимателями и разрабатывает решения в области энергетических данных, ПО и прикладных исследований.",
    },
  },
  products: {
    tr: { title: "STR Energy Intelligence Platform", description: "Saha bağlantısı, enerji analitiği, AI tahminleme ve kök neden açıklamasını birleştiren tek endüstriyel enerji zekâsı platformu." },
    en: { title: "STR Energy Intelligence Platform", description: "One industrial energy intelligence platform combining field connectivity, energy analytics, AI forecasting and root-cause explanations." },
    ru: { title: "STR Energy Intelligence Platform", description: "Единая платформа, объединяющая полевое подключение, энергетику, ИИ-прогнозы и объяснение первопричин." },
  },
  "products/energy-intelligence-platform": {
    tr: { title: "STR Energy Intelligence Platform | Endüstriyel Enerji Zekâsı", description: "RS485 ve Modbus entegrasyonu, gerçek zamanlı enerji izleme, AI anomali tespiti, tüketim tahmini, beklenen-gerçekleşen üretim analizi, maliyet, karbon, ISO 50001 ve dijital ikiz." },
    en: { title: "STR Energy Intelligence Platform | Industrial Energy Intelligence", description: "RS485 and Modbus integration, real-time monitoring, AI anomaly detection, consumption forecasts, expected-vs-actual production analysis, cost, carbon, ISO 50001 and digital twins." },
    ru: { title: "STR Energy Intelligence Platform | Промышленная энергетическая аналитика", description: "RS485 и Modbus, мониторинг, ИИ-аномалии, прогнозы, сравнение производства, затраты, углерод, ISO 50001 и цифровые двойники." },
  },
  "projects/market-data": {
    tr: { title: "STR Energy Piyasa Veri Projesi", description: "EPİAŞ, ENTSO-E ve EIA kaynaklı üretim, tüketim, fiyat, kapasite ve karbon verileri için bağımsız enerji piyasası araştırma projesi." },
    en: { title: "STR Energy Market Data Project", description: "An independent energy market research project for generation, consumption, price, capacity and carbon data from EPİAŞ, ENTSO-E and EIA." },
    ru: { title: "Проект рыночных данных STR Energy", description: "Независимый исследовательский проект по производству, потреблению, ценам, мощности и выбросам из EPİAŞ, ENTSO-E и EIA." },
  },
  "energy-startup": {
    tr: { title: "Enerji Yazılım ve Ar-Ge Girişimi | STR Energy", description: "Genç girişimciler tarafından Türkiye’de kurulan STR Energy’nin enerji verisi, yazılım ve uygulamalı Ar-Ge yaklaşımı." },
    en: { title: "Energy Software and R&D Venture | STR Energy", description: "Meet the energy data, software and applied R&D venture founded in Türkiye by young entrepreneurs." },
    ru: { title: "Энергетическое ПО и R&D | STR Energy", description: "Проект в области энергетических данных, ПО и прикладных исследований, основанный в Турции молодыми предпринимателями." },
  },
  about: {
    tr: { title: "STR Energy Hakkında | Enerji Yazılım Ar-Ge", description: "Genç girişimciler tarafından Türkiye’de kurulan STR Energy’nin enerji verisi, yazılım ve uygulamalı Ar-Ge çalışmaları." },
    en: { title: "About STR Energy | Energy Software R&D", description: "Meet STR Energy, an energy software and applied R&D venture founded in Türkiye by young entrepreneurs." },
    ru: { title: "О STR Energy | Энергетическое ПО и R&D", description: "Проект в области энергетического ПО и прикладных исследований, основанный в Турции молодыми предпринимателями." },
  },
  "editorial-policy": {
    tr: { title: "Editoryal İlkeler ve İçerik Standartları | STR Energy", description: "STR Energy teknik rehberlerinin yazarlık, birincil kaynak, doğrulama, güncelleme ve düzeltme standartları." },
    en: { title: "Editorial Standards and Content Policy | STR Energy", description: "How STR Energy technical guides handle authorship, primary sources, verification, updates and corrections." },
    ru: { title: "Редакционные стандарты | STR Energy", description: "Авторство, первичные источники, проверка, обновление и исправление технических материалов STR Energy." },
  },
  "authors/str-energy-editorial-team": {
    tr: { title: "STR Energy Editoryal Ekibi | Yazar Profili", description: "Enerji piyasaları, endüstriyel enerji yönetimi ve saha veri mimarisi rehberlerinin kurumsal yayıncı profili." },
    en: { title: "STR Energy Editorial Team | Author Profile", description: "Institutional author profile for guides on energy markets, industrial energy management and field-data architecture." },
    ru: { title: "Редакционная команда STR Energy", description: "Корпоративный профиль автора материалов об энергорынках и промышленном энергоменеджменте." },
  },
  "methodology/market-data": {
    tr: { title: "Piyasa Veri Projesi Metodolojisi | STR Energy", description: "EPİAŞ, ENTSO-E ve EIA verilerinin kaynağı, doğrulaması, dönüşümleri, güncelliği ve karşılaştırma sınırlamaları." },
    en: { title: "Market Data Project Methodology | STR Energy", description: "Sources, validation, transformations, freshness and comparison limits for EPİAŞ, ENTSO-E and EIA data." },
    ru: { title: "Методология рыночных данных | STR Energy", description: "Источники, проверка, преобразования и ограничения данных EPİAŞ, ENTSO-E и EIA." },
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
  privacy: {
    tr: { title: "Gizlilik Politikası | STR Energy", description: "STR Energy web sitesi için kişisel veri işleme, saklama, üçüncü taraf hizmetler ve KVKK kapsamındaki kullanıcı hakları." },
    en: { title: "Privacy Policy | STR Energy", description: "Personal-data processing, retention, third-party services and user rights for the STR Energy website." },
    ru: { title: "Политика конфиденциальности | STR Energy", description: "Обработка, хранение данных, сторонние сервисы и права пользователей сайта STR Energy." },
  },
  terms: {
    tr: { title: "Kullanım Şartları | STR Energy", description: "str-energy.com web sitesi, piyasa verileri ve STR Energy hizmetleri için kullanım koşulları." },
    en: { title: "Terms of Service | STR Energy", description: "Terms governing use of str-energy.com, market data and STR Energy services." },
    ru: { title: "Условия использования | STR Energy", description: "Условия использования сайта, рыночных данных и сервисов STR Energy." },
  },
  "cookie-policy": {
    tr: { title: "Çerez Politikası | STR Energy", description: "STR Energy sitesindeki zorunlu, analitik ve reklam çerezleri ile kullanıcı tercihleri hakkında bilgi." },
    en: { title: "Cookie Policy | STR Energy", description: "Information about essential, analytics and advertising cookies and user choices on STR Energy." },
    ru: { title: "Политика cookie | STR Energy", description: "Информация об обязательных, аналитических и рекламных cookie на сайте STR Energy." },
  },
  disclaimer: {
    tr: { title: "Sorumluluk Reddi | STR Energy", description: "Enerji piyasası verileri, teknik rehberler ve görselleştirmelerin kullanım sınırları." },
    en: { title: "Disclaimer | STR Energy", description: "Limitations on the use of energy-market data, technical guides and visualisations." },
    ru: { title: "Отказ от ответственности | STR Energy", description: "Ограничения использования рыночных данных, технических материалов и визуализаций." },
  },
};

const noIndexPaths = ["portal", "portal/climateos"];

export function buildMetadata(locale: SupportedLocale, path = ""): Metadata {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  const insight = normalizedPath.startsWith("insights/") ? getInsight(normalizedPath.slice("insights/".length)) : undefined;
  const insightLocale = locale === "tr" ? "tr" : "en";
  const copy = insight
    ? { title: `${insight.title[insightLocale]} | STR Energy`, description: insight.description[insightLocale] }
    : routeSeo[normalizedPath]?.[locale] ?? routeSeo[""][locale];
  const canonical = `${SITE_URL}/${locale}${normalizedPath ? `/${normalizedPath}` : ""}`;
  const shouldIndex = !noIndexPaths.includes(normalizedPath);
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
      ...(insight ? { publishedTime: insight.publishedAt, modifiedTime: insight.updatedAt, authors: [`${SITE_URL}/${insightLocale}/authors/str-energy-editorial-team`], section: insight.category[insightLocale] } : {}),
    },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description, images: [`${SITE_URL}/og-image.svg`] },
    robots: { index: shouldIndex, follow: shouldIndex, googleBot: { index: shouldIndex, follow: shouldIndex, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    ...(insight ? { authors: [{ name: "STR Energy Editorial Team", url: `${SITE_URL}/${insightLocale}/authors/str-energy-editorial-team` }], category: insight.category[insightLocale] } : {}),
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "Energy Software R&D",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      slogan: "Energy Software R&D",
      description: "STR Energy is an energy software and applied R&D venture founded in Türkiye by young entrepreneurs.",
      knowsAbout: ["energy software", "energy data", "applied research", "energy analytics", "energy efficiency"],
      sameAs: ["https://www.linkedin.com/company/str-enerji"],
      publishingPrinciples: `${SITE_URL}/en/editorial-policy`,
      contactPoint: { "@type": "ContactPoint", telephone: "+90-544-918-70-90", contactType: "sales", availableLanguage: ["Turkish", "English", "Russian"] },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: "Energy Software R&D",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["tr", "en", "ru"],
    },
  ],
};
