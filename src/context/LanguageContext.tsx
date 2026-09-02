"use client";

import React, { createContext, useContext, useCallback, ReactNode, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, supportedLocales, type SupportedLocale } from "@/lib/locale";

type Language = "tr" | "en" | "ru";

interface Translations {
  [key: string]: {
    tr: string;
    en: string;
    ru: string;
  };
}

const translations: Translations = {
  // Brand
  "brand.name": { tr: "STR Enerji", en: "STR Energy", ru: "STR Energy" },
  // Header
  "nav.products": { tr: "Ar-Ge", en: "R&D", ru: "R&D" },
  "nav.company": { tr: "Şirket", en: "Company", ru: "Компания" },
  "nav.contacts": { tr: "İletişim", en: "Contacts", ru: "Контакты" },
  "nav.about": { tr: "Hakkımızda", en: "About us", ru: "О нас" },
  "nav.privacy": { tr: "Gizlilik Politikası", en: "Privacy Policy", ru: "Политика" },
  "nav.terms": { tr: "Kullanım Şartları", en: "Terms of Service", ru: "Условия использования" },
  "nav.cookiePolicy": { tr: "Çerez Politikası", en: "Cookie Policy", ru: "Политика cookie" },
  "nav.disclaimer": { tr: "Sorumluluk Reddi", en: "Disclaimer", ru: "Отказ от ответственности" },
  "nav.insights": { tr: "Bilgi Merkezi", en: "Insights", ru: "Insights" },
  "nav.marketData": { tr: "Piyasa Veri Projesi", en: "Market Data Project", ru: "Проект рыночных данных" },
  "nav.methodology": { tr: "Veri Metodolojisi", en: "Data Methodology", ru: "Методология данных" },
  "nav.investors": { tr: "Girişim", en: "Venture", ru: "Проект" },
  "nav.editorialPolicy": { tr: "Editoryal İlkeler", en: "Editorial Standards", ru: "Редакционные стандарты" },
  "nav.editorialTeam": { tr: "Editoryal Ekip", en: "Editorial Team", ru: "Редакционная команда" },
  "chat.title": { tr: "Canlı Enerji Asistanı", en: "Live Energy Assistant", ru: "Энергетический ассистент" },
  "chat.subtitle": { tr: "Piyasa verisi ve Ar-Ge çalışmaları hakkında hızlı yanıt.", en: "Fast answers on market data and R&D work.", ru: "Ответы по рыночным данным и R&D." },
  "chat.placeholder": { tr: "Bir şey sorun…", en: "Ask anything…", ru: "Задайте вопрос…" },
  "chat.send": { tr: "Gönder", en: "Send", ru: "Отправить" },
  "chat.open": { tr: "Asistanı aç", en: "Open assistant", ru: "Открыть ассистента" },
  "chat.minimize": { tr: "Kapat", en: "Minimize", ru: "Свернуть" },
  "chat.empty": { tr: "PTF, YEKDEM veya enerji yazılım çalışmalarımız hakkında sorun.", en: "Ask about PTF, YEKDEM or our energy software work.", ru: "Спросите о PTF, YEKDEM или наших разработках." },
  "chat.loading": { tr: "Yanıt hazırlanıyor…", en: "Preparing response…", ru: "Готовим ответ…" },
  "chat.error": { tr: "Şu an yanıt veremiyorum. Lütfen tekrar deneyin.", en: "I cannot respond right now. Please try again.", ru: "Сейчас не могу ответить. Попробуйте еще раз." },
  "chat.suggestion.ptf": { tr: "Bugün PTF nedir?", en: "What is today's PTF?", ru: "Какая сегодня PTF?" },
  "chat.suggestion.yekdem": { tr: "YEKDEM üretimi anlık ver.", en: "Show live YEKDEM generation.", ru: "Покажи текущую генерацию YEKDEM." },
  "chat.suggestion.product": { tr: "STR Energy hangi alanlarda çalışıyor?", en: "What does STR Energy work on?", ru: "Над чем работает STR Energy?" },

  "nav.products.cta": { tr: "Bir proje fikriniz mi var? →", en: "Have a project in mind? →", ru: "Есть идея проекта? →" },
  "nav.products.cta.link": { tr: "İletişime geç", en: "Contact us", ru: "Связаться" },

  // Hero
  "hero.title1": { tr: "Enerji", en: "Energy", ru: "Энергетика" },
  "hero.title2": { tr: "Yazılım Ar-Ge", en: "Software R&D", ru: "Разработка ПО" },
  "hero.description": {
    tr: "Genç girişimciler tarafından Türkiye’de kurulan STR Energy; enerji verisi, yazılım ve Ar-Ge çalışmalarını gerçek ihtiyaçlara odaklanan, anlaşılır ve ölçülebilir çözümlere dönüştürür.",
    en: "Founded in Türkiye by young entrepreneurs, STR Energy turns energy data, software and R&D into clear, measurable solutions built around real needs.",
    ru: "STR Energy, основанная в Турции молодыми предпринимателями, превращает энергетические данные, программные разработки и R&D в понятные и измеримые решения для реальных задач."
  },
  "hero.cta": { tr: "Projeni Görüşelim", en: "Discuss Your Project", ru: "Обсудить проект" },
  "hero.cta2": { tr: "Çalışmalarımız", en: "Our Work", ru: "Наши проекты" },

  // Products
  "products.index.title": { tr: "STR Energy Intelligence Platform", en: "STR Energy Intelligence Platform", ru: "STR Energy Intelligence Platform" },
  "products.index.subtitle": { tr: "Endüstriyel tesisler için saha bağlantısı, enerji analitiği, öngörü ve kök neden açıklamasını tek üründe birleştiren platform.", en: "A single product for industrial facilities that combines field connectivity, energy analytics, forecasting and root-cause explanations.", ru: "Единый продукт для промышленных предприятий: подключение оборудования, энергетическая аналитика, прогнозирование и объяснение первопричин." },
  "products.index.details": { tr: "Platformu incele", en: "Explore the platform", ru: "О платформе" },

  // Product
  "product.intelligence": { tr: "Enerji Yazılım Ar-Ge", en: "Energy Software R&D", ru: "Энергетическое ПО и R&D" },
  "product.intelligence.desc": { tr: "Veri, yazılım ve uygulamalı araştırma çalışmalarımız", en: "Our data, software and applied research work", ru: "Наши проекты в области данных, ПО и прикладных исследований" },

  // Header dropdown descriptions
  "nav.about.desc": { tr: "STR Enerji hakkında", en: "About STR Energy", ru: "О STR Energy" },
  "nav.privacy.desc": { tr: "Gizlilik ve veri politikası", en: "Privacy & data policy", ru: "Политика конфиденциальности" },
  "nav.contacts.desc": { tr: "Bizimle iletişime geçin", en: "Get in touch", ru: "Связаться с нами" },
  "nav.insights.desc": { tr: "Enerji piyasası rehberleri", en: "Energy market guides", ru: "Energy market guides" },
  "nav.marketData.desc": { tr: "Bağımsız enerji piyasası veri araştırması", en: "Independent energy market data research", ru: "Независимое исследование рыночных данных" },
  "nav.methodology.desc": { tr: "Kaynak, kapsam ve veri sınırlamaları", en: "Sources, scope and data limitations", ru: "Источники, охват и ограничения данных" },
  "nav.investors.desc": { tr: "Genç girişimciler tarafından kurulan ekibimiz", en: "Our venture founded by young entrepreneurs", ru: "Проект, основанный молодыми предпринимателями" },
  "nav.editorialPolicy.desc": { tr: "Yayın, kaynak ve düzeltme standartları", en: "Publishing, sourcing and corrections", ru: "Публикация, источники и исправления" },

  // About
  "about.title": { tr: "STR Enerji", en: "STR Energy", ru: "STR Energy" },
  "about.home.title": { tr: "Genç girişimcilerden enerji için yeni fikirler", en: "Young founders, practical ideas for energy", ru: "Молодые основатели и практичные идеи для энергетики" },
  "about.subtitle": { tr: "Genç girişimcilerden enerji yazılım ve Ar-Ge çalışmaları", en: "Energy software and R&D by young entrepreneurs", ru: "Энергетическое ПО и R&D от молодых предпринимателей" },
  "about.description": {
    tr: "STR Energy, genç girişimciler tarafından Türkiye’de kuruldu. Enerji sektöründeki gerçek problemleri veri, yazılım ve araştırma yaklaşımıyla ele alıyor; sade, güvenilir ve geliştirilebilir teknolojiler üretiyoruz.",
    en: "STR Energy was founded in Türkiye by young entrepreneurs. We approach real energy-sector problems through data, software and research, building clear, reliable and extensible technology.",
    ru: "STR Energy основана в Турции молодыми предпринимателями. Мы решаем реальные задачи энергетики с помощью данных, программного обеспечения и исследований, создавая понятные и надежные технологии."
  },
  "about.feature1": { tr: "Ölçeklenebilirlik: Sınırsız büyüme", en: "Scalability: Grow without limits", ru: "Масштабируемость: расти без ограничений" },
  "about.feature2": { tr: "Hız: Aylar değil, günler içinde uygulama", en: "Speed: Implementation in days, not months", ru: "Скорость: внедрение за дни, а не месяцы" },

  // Partners
  "partners.badge": { tr: "Partnerlik", en: "Partnership", ru: "Партнерство" },
  "partners.title": {
    tr: "Avrupa ve Türkiye projelerinde partnerlik",
    en: "Partnerships across Europe and Turkey",
    ru: "Партнерства в Европе и Турции"
  },
  "partners.subtitle": {
    tr: "Enerji projelerinde teknoloji ve çözüm partneri olarak yer alıyoruz. Projelerde birlikte daha hızlı ve güvenli teslimatlar sağlıyoruz.",
    en: "We act as a technology and solution partner on energy projects, enabling faster and more reliable delivery.",
    ru: "Мы выступаем технологическим и решающим партнером в энергетических проектах, ускоряя и повышая надежность поставок."
  },
  "partners.note": {
    tr: "Yeni projelerde teknoloji partneri olmak istiyoruz. Uygun ortaklık modeli için görüşelim.",
    en: "We want to be your technology partner on upcoming projects. Let's discuss the right model.",
    ru: "Мы хотим стать вашим технологическим партнером в новых проектах. Давайте обсудим формат."
  },
  "partners.cta": { tr: "Partnerlik için görüşelim", en: "Discuss partnership", ru: "Обсудить партнерство" },
  "partners.eu.title": { tr: "Avrupa Proje Partneri", en: "European Project Partner", ru: "Партнер по проектам Европы" },
  "partners.eu.desc": {
    tr: "Avrupa'daki enerji projelerinde teknoloji partneri olarak çalışıyoruz.",
    en: "We partner on European energy projects as the technology provider.",
    ru: "Мы работаем технологическим партнером в европейских проектах."
  },
  "partners.tr.title": { tr: "Türkiye Çözüm Ortaklığı", en: "Turkey Solution Partner", ru: "Партнер по решениям в Турции" },
  "partners.tr.desc": {
    tr: "Türkiye'de enerji projelerinde saha entegrasyonları ve operasyonlar için çözüm ortağıyız.",
    en: "We support energy projects in Turkey with field integrations and operations.",
    ru: "Мы поддерживаем проекты в Турции с интеграцией на местах и операциями."
  },
  "partners.rnd.title": { tr: "Ar-Ge ve Hibe Programları", en: "R&D and Funding Programs", ru: "Программы R&D и финансирования" },
  "partners.rnd.desc": {
    tr: "TUBITAK ve Horizon benzeri programlarda proje hazırlığı ve teknoloji desteği sağlıyoruz.",
    en: "We support proposal preparation and technology delivery for programs such as TUBITAK and Horizon.",
    ru: "Мы поддерживаем подготовку проектов и технологическую поставку для программ TUBITAK и Horizon."
  },
  "partners.industry.title": { tr: "Sanayi ve Tesis Entegrasyonları", en: "Industry & Facility Integrations", ru: "Интеграции в промышленности и на объектах" },
  "partners.industry.desc": {
    tr: "OSB ve endüstriyel tesislerde enerji izleme, otomasyon ve entegrasyon sağlıyoruz.",
    en: "We deliver monitoring, automation, and integration for industrial zones and facilities.",
    ru: "Мы внедряем мониторинг, автоматизацию и интеграцию для промышленных зон и объектов."
  },

  // Company pages
  "about.page.title": { tr: "STR Energy", en: "STR Energy", ru: "STR Energy" },
  "about.page.subtitle": {
    tr: "Genç girişimciler tarafından Türkiye’de kurulan enerji yazılım ve Ar-Ge girişimiyiz.",
    en: "An energy software and R&D venture founded in Türkiye by young entrepreneurs.",
    ru: "Проект в области энергетического ПО и R&D, основанный в Турции молодыми предпринимателями."
  },
  "about.page.mission.title": { tr: "Misyonumuz", en: "Our Mission", ru: "Наша миссия" },
  "about.page.mission.desc": {
    tr: "Saha verisini gerçek zamanlı enerji zekâsına dönüştürerek tesislerin üretim performansını artırmasına; enerji maliyetini, israfı ve karbon emisyonlarını azaltmasına yardımcı oluyoruz.",
    en: "We turn field data into real-time energy intelligence that helps facilities improve production performance and reduce energy cost, waste and carbon emissions.",
    ru: "Мы превращаем полевые данные в энергетическую аналитику, помогающую повышать производство и снижать затраты, потери и выбросы."
  },
  "about.page.vision.title": { tr: "Vizyonumuz", en: "Our Vision", ru: "Наше видение" },
  "about.page.vision.desc": {
    tr: "Sürdürülebilirlik hedeflerine ulaşmayı hızlandıran, gerçek zamanlı enerji yönetiminde global ölçekte referans olmak.",
    en: "To be a global reference in real-time energy management that accelerates sustainability goals.",
    ru: "Стать глобальным ориентиром в управлении энергией в реальном времени, ускоряя устойчивые цели."
  },
  "about.page.partner.title": { tr: "Partnerlik", en: "Partnership", ru: "Партнерство" },
  "about.page.partner.desc": {
    tr: "Avrupa'daki projelerde teknoloji partneri olarak yer alıyor, Türkiye'deki enerji projelerinde de çözüm ortağı olarak çalışıyoruz.",
    en: "We partner on energy projects across Europe and serve as a solution partner for projects in Turkey.",
    ru: "Мы выступаем технологическим партнером в проектах по Европе и партнером по решениям в проектах в Турции."
  },
  "about.page.value1.title": { tr: "Yenilikçilik", en: "Innovation", ru: "Инновации" },
  "about.page.value1.desc": {
    tr: "Enerji operasyonlarını daha akıllı ve sürdürülebilir hale getiren çözümler geliştiriyoruz.",
    en: "We build solutions that make energy operations smarter and more sustainable.",
    ru: "Мы создаем решения, делающие энергетику умнее и устойчивее."
  },
  "about.page.value2.title": { tr: "Güvenilirlik", en: "Reliability", ru: "Надежность" },
  "about.page.value2.desc": {
    tr: "Kritik altyapılarda yüksek erişilebilirlik ve güvenlik önceliğimizdir.",
    en: "High availability and security are our priority for critical infrastructure.",
    ru: "Высокая доступность и безопасность — приоритет для критической инфраструктуры."
  },
  "about.page.value3.title": { tr: "Müşteri Odaklılık", en: "Customer Focus", ru: "Клиентоориентированность" },
  "about.page.value3.desc": {
    tr: "Her projeyi iş hedeflerinizle uyumlu, ölçülebilir değer üretmek için tasarlarız.",
    en: "We design every project to deliver measurable value aligned with your business goals.",
    ru: "Мы проектируем каждый проект для измеримой ценности, согласованной с целями бизнеса."
  },
  "privacy.page.title": { tr: "Gizlilik Politikası", en: "Privacy Policy", ru: "Политика конфиденциальности" },
  "privacy.page.subtitle": {
    tr: "STR Enerji veri gizliliği ve KVKK uyumluluğu hakkında özet bilgiler.",
    en: "Summary of STR Energy data privacy and compliance.",
    ru: "Кратко о конфиденциальности данных и соблюдении требований."
  },
  "privacy.section1.title": { tr: "Veri Toplama", en: "Data Collection", ru: "Сбор данных" },
  "privacy.section1.desc": { tr: "Platform kullanım verilerini hizmet kalitesi ve güvenliği için anonim şekilde toplarız.", en: "We collect usage data anonymously for service quality and security.", ru: "Мы анонимно собираем данные использования для качества и безопасности." },
  "privacy.section2.title": { tr: "Veri İşleme", en: "Data Processing", ru: "Обработка данных" },
  "privacy.section2.desc": { tr: "Veriler yalnızca hizmet sunumu, performans iyileştirme ve güvenlik amaçlarıyla işlenir.", en: "Data is processed only for service delivery, performance, and security.", ru: "Данные обрабатываются только для предоставления сервиса, производительности и безопасности." },
  "privacy.section3.title": { tr: "Veri Saklama", en: "Data Retention", ru: "Хранение данных" },
  "privacy.section3.desc": { tr: "Veri saklama süreleri yasal gerekliliklere ve sözleşme şartlarına göre belirlenir.", en: "Retention periods follow legal and contractual requirements.", ru: "Сроки хранения определяются законом и договорами." },
  "privacy.section4.title": { tr: "Haklarınız", en: "Your Rights", ru: "Ваши права" },
  "privacy.section4.desc": { tr: "KVKK kapsamında erişim, düzeltme ve silme taleplerinizi bize iletebilirsiniz.", en: "You can request access, correction, and deletion under applicable laws.", ru: "Вы можете запросить доступ, исправление и удаление данных." },
  "contacts.page.title": { tr: "İletişim", en: "Contacts", ru: "Контакты" },
  "contacts.page.subtitle": { tr: "Ekibimizle hızlıca iletişime geçin.", en: "Get in touch with our team quickly.", ru: "Свяжитесь с нашей командой." },
  "contacts.card.email": { tr: "E‑posta", en: "Email", ru: "Эл. почта" },
  "contacts.card.phone": { tr: "Telefon", en: "Phone", ru: "Телефон" },
  "contacts.card.office": { tr: "Ofis", en: "Office", ru: "Офис" },
  "contacts.value.phone": { tr: "+90 544 918 70 90", en: "+90 544 918 70 90", ru: "+90 544 918 70 90" },
  "contacts.value.phone.href": { tr: "+905449187090", en: "+905449187090", ru: "+905449187090" },
  "contacts.value.office": { tr: "İskenderun / Hatay", en: "Iskenderun / Hatay, Turkey", ru: "Искендерун / Хатай, Турция" },

  // FAQ
  "faq.title": { tr: "Sıkça Sorulan Sorular", en: "Frequently Asked Questions", ru: "Часто задаваемые вопросы" },
  "faq.subtitle": { tr: "STR Energy ve çalışmalarımız hakkında merak edilenler", en: "Common questions about STR Energy and our work", ru: "Ответы на частые вопросы о STR Energy и нашей работе" },
  "faq.q1": { tr: "Enerji verisi çalışmalarınıza nasıl dahil ediliyor?", en: "How is energy data incorporated into your work?", ru: "Как энергетические данные используются в ваших проектах?" },
  "faq.a1": { tr: "Önce veri kaynağı, ölçüm kapsamı ve iş hedefi birlikte doğrulanır. Ardından güvenilir veri akışı kurulur; analiz, raporlama veya yazılım geliştirme kapsamı ihtiyaca göre belirlenir.", en: "We first validate the data source, measurement scope and business objective together. We then establish a reliable data flow and define analytics, reporting or software development around the actual need.", ru: "Сначала мы совместно проверяем источник данных, границы измерения и бизнес-цель. Затем выстраиваем надежный поток данных и определяем аналитику, отчетность или разработку ПО под реальную задачу." },
  "faq.q2": { tr: "Bir Ar-Ge çalışmasına nasıl başlanıyor?", en: "How does an R&D project begin?", ru: "Как начинается R&D-проект?" },
  "faq.a2": { tr: "İlk görüşmede problem, mevcut veri ve beklenen çıktı netleştirilir. Uygun olduğunda kısa bir keşif kapsamı hazırlanır; teknik yaklaşım, doğrulama ölçütleri ve sonraki adımlar birlikte belirlenir.", en: "The first conversation clarifies the problem, available data and expected outcome. When there is a fit, we define a focused discovery scope, technical approach, validation criteria and next steps together.", ru: "На первой встрече мы уточняем задачу, доступные данные и ожидаемый результат. Затем вместе определяем объем исследования, технический подход, критерии проверки и следующие шаги." },
  "faq.q3": { tr: "Teknik destek sağlıyor musunuz?", en: "Do you provide technical support?", ru: "Предоставляете ли вы техническую поддержку?" },
  "faq.a3": { tr: "Evet. Pilot, entegrasyon ve devreye alma sürecinde kurucu ekip ve teknik ekip doğrudan destek verir.", en: "Yes. The founding and technical teams provide direct support throughout pilots, integration and commissioning.", ru: "Да. Команда основателей и технические специалисты напрямую поддерживают пилоты, интеграцию и ввод в эксплуатацию." },
  "faq.q4": { tr: "STR Energy kimler tarafından kuruldu?", en: "Who founded STR Energy?", ru: "Кем основана STR Energy?" },
  "faq.a4": { tr: "STR Energy, enerji ve teknoloji alanında üretmek isteyen genç girişimciler tarafından Türkiye’de kuruldu. Çalışmalarımız veri, yazılım ve uygulamalı Ar-Ge odağında ilerliyor.", en: "STR Energy was founded in Türkiye by young entrepreneurs working at the intersection of energy and technology. Our work focuses on data, software and applied R&D.", ru: "STR Energy основана в Турции молодыми предпринимателями, работающими на стыке энергетики и технологий. Мы сосредоточены на данных, программном обеспечении и прикладных исследованиях." },
  "faq.q5": { tr: "STR Energy kimlerle çalışıyor?", en: "Who does STR Energy work with?", ru: "С кем работает STR Energy?" },
  "faq.a5": { tr: "Enerji verisi, yazılım geliştirme ve Ar-Ge ihtiyacı bulunan kurumlar; proje ortakları, sanayi kuruluşları ve teknoloji ekipleriyle çalışıyoruz.", en: "We work with organizations, industrial teams and technology partners that need energy-data, software-development or R&D support.", ru: "Мы работаем с организациями, промышленными командами и технологическими партнерами, которым нужны энергетические данные, разработка ПО или R&D." },

  // Footer
  "footer.description": { tr: "Genç girişimciler tarafından Türkiye’de kurulan enerji yazılım ve Ar-Ge girişimi.", en: "An energy software and R&D venture founded in Türkiye by young entrepreneurs.", ru: "Проект в области энергетического ПО и R&D, основанный в Турции молодыми предпринимателями." },
  "footer.navigation": { tr: "Navigasyon", en: "Navigation", ru: "Навигация" },
  "footer.main": { tr: "Ana Sayfa", en: "Main", ru: "Главная" },
  "footer.faq": { tr: "SSS", en: "FAQ", ru: "FAQ" },
  "footer.company": { tr: "Şirket", en: "Company", ru: "Компания" },
  "footer.contacts": { tr: "İletişim", en: "Contacts", ru: "Контакты" },
  "footer.rights": { tr: "Tüm hakları saklıdır.", en: "All rights reserved.", ru: "Все права защищены." },
  "footer.cta.title": { tr: "Projeni bizimle tartışmaya hazır mısın?", en: "Ready to discuss your project with us?", ru: "Готовы обсудить ваш проект?" },
  "footer.cta.button": { tr: "Uzman desteği almak", en: "Get expert support", ru: "Получить консультацию" },
};
const LANGUAGE_EVENT = "str-language-change";

function getLanguageSnapshot(): Language {
  if (typeof window === "undefined") return "tr";
  const saved = localStorage.getItem("language");
  if (saved === "tr" || saved === "en" || saved === "ru") return saved;
  return "tr";
}

function getLanguageServerSnapshot(): Language {
  return "tr";
}

function subscribeLanguage(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(LANGUAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(LANGUAGE_EVENT, handleChange);
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pathLocale = getLocaleFromPathname(pathname) as Language | null;
  const storedLanguage = useSyncExternalStore(subscribeLanguage, getLanguageSnapshot, getLanguageServerSnapshot);
  const language = pathLocale ?? storedLanguage;

  const setLanguage = useCallback((lang: Language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      window.dispatchEvent(new Event(LANGUAGE_EVENT));
    }
  }, []);

  useEffect(() => {
    if (!supportedLocales.includes(language as SupportedLocale)) return;
    localStorage.setItem("language", language);
  }, [language]);

  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
