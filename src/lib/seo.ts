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
      description: "Türkiye merkezli STR Energy; endüstriyel enerji verisi, yapay zeka analitiği, şebeke optimizasyonu ve uygulamalı Ar-Ge alanında yüksek katma değerli çözümler sunar.",
    },
    en: {
      title: "Energy Software R&D | STR Energy",
      description: "STR Energy develops high-impact energy software, industrial data analytics, smart grid intelligence and applied energy R&D solutions for modern clean energy systems.",
    },
    ru: {
      title: "Энергетическое ПО и R&D | STR Energy",
      description: "STR Energy разрабатывает высокотехнологичное энергетическое ПО, промышленную аналитику данных, умные сети и прикладные R&D решения для современной энергосистемы.",
    },
  },
  products: {
    tr: {
      title: "STR Energy Intelligence Platform",
      description: "Endüstriyel tesisler için saha IoT bağlantısı, anomali tespiti, yapay zekâ destekli tüketim tahminlemesi ve kök neden analitiğini birleştiren kurumsal enerji zekâsı platformu.",
    },
    en: {
      title: "STR Energy Intelligence Platform",
      description: "Enterprise industrial energy intelligence platform combining IoT field connectivity, real-time energy analytics, AI demand forecasting and root-cause diagnostic engines.",
    },
    ru: {
      title: "STR Energy Intelligence Platform",
      description: "Корпоративная платформа промышленной энергоаналитики, объединяющая подключение IoT, анализ данных в реальном времени, ИИ-прогнозирование и диагностику инцидентов.",
    },
  },
  "products/energy-intelligence-platform": {
    tr: {
      title: "STR Energy Intelligence Platform | Endüstriyel Enerji Zekâsı",
      description: "Modbus ve RS485 entegrasyonu, gerçek zamanlı güç izleme, AI anomali tespiti, tüketim tahmini, ISO 50001 raporlaması ve dijital ikiz sunan endüstriyel enerji platformu.",
    },
    en: {
      title: "STR Energy Intelligence Platform | Industrial Energy Intelligence",
      description: "Industrial energy platform featuring Modbus RS485 integration, real-time power monitoring, AI anomaly detection, demand forecasting, ISO 50001 and digital twin models.",
    },
    ru: {
      title: "STR Energy Intelligence Platform | Промышленная энергетическая аналитика",
      description: "Промышленная платформа с интеграцией Modbus RS485, мониторингом мощности, выявлением аномалий с ИИ, прогнозированием спроса, ISO 50001 и цифровыми двойниками систем.",
    },
  },
  "projects/market-data": {
    tr: {
      title: "STR Energy Piyasa Veri Projesi",
      description: "EPİAŞ, ENTSO-E ve EIA resmi kaynaklarından elektrik üretimi, tüketimi, PTF piyasa takas fiyatları, kurulu güç ve karbon emisyon verilerini analiz eden açık araştırma projesi.",
    },
    en: {
      title: "STR Energy Market Data Project",
      description: "Independent open energy market research project tracking electricity generation, consumption, day-ahead MCP prices, installed capacity and carbon intensity from EPİAŞ and ENTSO-E.",
    },
    ru: {
      title: "Проект рыночных данных STR Energy",
      description: "Открытый исследовательский проект по электрогенерации, потреблению, рыночным ценам MCP, установленной мощности и углеродным данным на основе официальных отчетов EPİAŞ и ENTSO-E.",
    },
  },
  "energy-startup": {
    tr: {
      title: "Enerji Yazılım ve Ar-Ge Girişimi | STR Energy",
      description: "Türkiye'nin temiz enerji dönüşümüne odaklanan genç girişimciler tarafından kurulan STR Energy'nin yenilikçi enerji veri mimarisi ve uygulamalı Ar-Ge vizyonunu keşfedin.",
    },
    en: {
      title: "Energy Software and R&D Venture | STR Energy",
      description: "Discover STR Energy, an energy software and applied R&D venture founded by tech entrepreneurs in Türkiye focused on clean transition, smart grids and industrial data intelligence.",
    },
    ru: {
      title: "Энергетическое ПО и R&D | STR Energy",
      description: "Познакомьтесь с STR Energy — стартапом в сфере энергетического ПО и прикладных исследований, созданным в Турции для ускорения перехода к чистой и умной энергетике.",
    },
  },
  about: {
    tr: {
      title: "STR Energy Hakkında | Enerji Yazılım Ar-Ge",
      description: "STR Energy hakkında kurumsal bilgiler, misyonumuz, genç mühendislik ekibimiz, endüstriyel enerji yazılımlarımız ve temiz teknoloji alanındaki uygulamalı Ar-Ge çalışmalarımız.",
    },
    en: {
      title: "About STR Energy | Energy Software R&D",
      description: "Learn about STR Energy: corporate mission, engineering team, advanced industrial energy analytics software, smart grid technologies and applied clean energy research programs.",
    },
    ru: {
      title: "О STR Energy | Энергетическое ПО и R&D",
      description: "Узнайте о STR Energy: корпоративная миссия, команда инженеров, передовое промышленное программное обеспечение для анализа энергии и программы прикладных исследований.",
    },
  },
  "editorial-policy": {
    tr: {
      title: "Editoryal İlkeler ve İçerik Standartları | STR Energy",
      description: "STR Energy teknik rehberleri, piyasa analizleri ve araştırma raporlarının yazarlık ilkeleri, birincil veri doğrulama kuralları, bağımsızlık ve editoryal şeffaflık standartları.",
    },
    en: {
      title: "Editorial Standards and Content Policy | STR Energy",
      description: "STR Energy editorial standards, primary source verification methodologies, peer-review workflow, author independence and correction protocols for all technical market guides.",
    },
    ru: {
      title: "Редакционные стандарты | STR Energy",
      description: "Редакционные стандарты STR Energy: принципы авторства, проверка первичных источников, прозрачность методологии и протоколы исправлений для всех технических руководств.",
    },
  },
  "authors/str-energy-editorial-team": {
    tr: {
      title: "STR Energy Editoryal Ekibi | Yazar Profili",
      description: "Elektrik piyasaları, endüstriyel enerji verimliliği, batarya depolama ve şebeke yazılımları konusunda uzmanlaşmış STR Energy teknik editoryal araştırma ekibi profili.",
    },
    en: {
      title: "STR Energy Editorial Team | Author Profile",
      description: "Author profile for the STR Energy editorial and research team, specializing in wholesale power markets, industrial energy efficiency, BESS storage and smart grid software.",
    },
    ru: {
      title: "Редакционная команда STR Energy",
      description: "Профиль редакционной группы STR Energy, специализирующейся на рынках электроэнергии, промышленной энергоэффективности, системах накопления энергии BESS и сетях.",
    },
  },
  "methodology/market-data": {
    tr: {
      title: "Piyasa Veri Projesi Metodolojisi | STR Energy",
      description: "EPİAŞ Şeffaflık Platformu, ENTSO-E Veri Portalı ve EIA veri setlerinin toplama, temizleme, doğrulama, döviz kuru dönüşümleri ve zaman serisi analitiği metodolojisi rehberi.",
    },
    en: {
      title: "Market Data Project Methodology | STR Energy",
      description: "Data processing methodology, validation rules, currency conversions, latency metrics and analytical limitations for EPİAŞ Transparency, ENTSO-E and US EIA energy datasets.",
    },
    ru: {
      title: "Методология рыночных данных | STR Energy",
      description: "Методология сбора, валидации, очистки, конвертации валют и временного анализа данных энергорынков на основе платформ прозрачности EPİAŞ, портала ENTSO-E и отчетов EIA.",
    },
  },
  insights: {
    tr: {
      title: "Enerji Bilgi Merkezi | STR Energy",
      description: "Elektrik piyasaları, PTF dinamikleri, ISO 50001, batarya depolama, yeşil hidrojen, COP31 iklim politikaları ve akıllı şebeke teknolojileri üzerine kapsamlı teknik uzmanlık rehberleri.",
    },
    en: {
      title: "Energy Insights and Market Guides | STR Energy",
      description: "Comprehensive technical guides and market intelligence covering wholesale electricity trading, ISO 50001, battery storage, green hydrogen, COP31 and smart grid innovations.",
    },
    ru: {
      title: "Energy Insights | STR Energy",
      description: "Технические руководства и аналитика рынков электроэнергии, торговли на сутки вперед, ISO 50001, накопителей BESS, зеленого водорода, климата COP31 и интеллектуальных сетей.",
    },
  },
  contacts: {
    tr: {
      title: "İletişim | STR Energy",
      description: "Endüstriyel enerji yazılımları, veri analitiği, IoT otomasyon çözümleri, kurumsal enerji projeleri ve teknoloji ortaklığı talepleriniz için STR Energy uzmanlarıyla iletişim kurun.",
    },
    en: {
      title: "Contact | STR Energy",
      description: "Get in touch with STR Energy engineering and advisory teams for industrial energy management software, IoT monitoring, market data solutions and R&D technology partnerships.",
    },
    ru: {
      title: "Контакты | STR Energy",
      description: "Свяжитесь со специалистами STR Energy для обсуждения промышленного энергетического ПО, мониторинга IoT, аналитики энергорынков и совместных исследовательских R&D проектов.",
    },
  },
  privacy: {
    tr: {
      title: "Gizlilik Politikası | STR Energy",
      description: "STR Energy web sitesi ve dijital hizmetlerinde 6698 sayılı KVKK ve uluslararası veri koruma standartlarına uygun kişisel veri işleme, saklama ve kullanıcı hakları politikası metni.",
    },
    en: {
      title: "Privacy Policy | STR Energy",
      description: "Comprehensive privacy policy detailing personal data processing, storage practices, third-party analytics integrations and individual rights under applicable global regulations.",
    },
    ru: {
      title: "Политика конфиденциальности | STR Energy",
      description: "Политика конфиденциальности STR Energy: порядок обработки, защиты и хранения персональных данных пользователей в соответствии с законодательством и международными стандартами.",
    },
  },
  terms: {
    tr: {
      title: "Kullanım Şartları | STR Energy",
      description: "str-energy.com web sitesi, enerji piyasası veri projeleri, teknik içerikler, API servisleri ve STR Energy kurumsal hizmetlerinin kullanım koşulları ve yasal sorumluluk sınırları.",
    },
    en: {
      title: "Terms of Service | STR Energy",
      description: "Terms of service governing the usage of str-energy.com, market data tools, technical research publications, software APIs and STR Energy commercial and informational services.",
    },
    ru: {
      title: "Условия использования | STR Energy",
      description: "Условия использования веб-сайта str-energy.com, аналитических инструментов энергорынка, технических публикаций, API и сервисов исследовательской компании STR Energy.",
    },
  },
  "cookie-policy": {
    tr: {
      title: "Çerez Politikası | STR Energy",
      description: "STR Energy web sitesinde kullanılan zorunlu, analitik ve reklam çerezleri, çerez kullanım amaçları, çerez onay tercihleri ve tarayıcı çerez yönetimi hakkında ayrıntılı rehber.",
    },
    en: {
      title: "Cookie Policy | STR Energy",
      description: "Detailed cookie policy explaining essential, functional, analytical and advertising cookies utilized across STR Energy platforms along with user consent controls and settings.",
    },
    ru: {
      title: "Политика cookie | STR Energy",
      description: "Подробная политика в отношении файлов cookie: обязательные, аналитические и рекламные cookie на сайте STR Energy, управление согласием пользователей и настройки браузера.",
    },
  },
  disclaimer: {
    tr: {
      title: "Sorumluluk Reddi | STR Energy",
      description: "STR Energy platformundaki enerji piyasası verileri, fiyat tahminleri, teknik rehberler ve analiz modellerinin kullanım sınırları ile resmi yasal sorumluluk reddi beyanı metni.",
    },
    en: {
      title: "Disclaimer | STR Energy",
      description: "Official legal disclaimer detailing the educational and informational nature of energy market datasets, technical guides, algorithmic models and operational risk boundaries.",
    },
    ru: {
      title: "Отказ от ответственности | STR Energy",
      description: "Официальный отказ от ответственности: разъяснение информационного характера рыночных данных, аналитических моделей, технических руководств и границ ответственности STR Energy.",
    },
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
      images: insight?.image
        ? [{ url: `${SITE_URL}${insight.image.src}`, width: 1200, height: 630, alt: insight.image.alt[insightLocale] }]
        : [{ url: `${SITE_URL}/og-image.svg`, width: 1200, height: 630, alt: `${SITE_NAME} energy technology` }],
      ...(insight ? { publishedTime: insight.publishedAt, modifiedTime: insight.updatedAt, authors: [`${SITE_URL}/${insightLocale}/authors/str-energy-editorial-team`], section: insight.category[insightLocale] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [insight?.image ? `${SITE_URL}${insight.image.src}` : `${SITE_URL}/og-image.svg`],
    },
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
