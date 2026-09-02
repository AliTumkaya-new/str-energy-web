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
  "brand.expansion": { tr: "Smart Technologies for Renewables", en: "Smart Technologies for Renewables", ru: "Smart Technologies for Renewables" },

  // Header
  "nav.products": { tr: "Platform", en: "Platform", ru: "Платформа" },
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
  "nav.investors": { tr: "Yatırımcılar", en: "Investors", ru: "Инвесторам" },
  "nav.editorialPolicy": { tr: "Editoryal İlkeler", en: "Editorial Standards", ru: "Редакционные стандарты" },
  "nav.editorialTeam": { tr: "Editoryal Ekip", en: "Editorial Team", ru: "Редакционная команда" },
  "chat.title": { tr: "Canlı Enerji Asistanı", en: "Live Energy Assistant", ru: "Энергетический ассистент" },
  "chat.subtitle": { tr: "Piyasa verisi ve platform sorularında hızlı yanıt.", en: "Fast answers on market data and the platform.", ru: "Ответы по рыночным данным и платформе." },
  "chat.placeholder": { tr: "Bir şey sorun…", en: "Ask anything…", ru: "Задайте вопрос…" },
  "chat.send": { tr: "Gönder", en: "Send", ru: "Отправить" },
  "chat.open": { tr: "Asistanı aç", en: "Open assistant", ru: "Открыть ассистента" },
  "chat.minimize": { tr: "Kapat", en: "Minimize", ru: "Свернуть" },
  "chat.empty": { tr: "PTF, YEKDEM veya STR Energy Intelligence Platform hakkında sorun.", en: "Ask about PTF, YEKDEM or STR Energy Intelligence Platform.", ru: "Спросите о PTF, YEKDEM или STR Energy Intelligence Platform." },
  "chat.loading": { tr: "Yanıt hazırlanıyor…", en: "Preparing response…", ru: "Готовим ответ…" },
  "chat.error": { tr: "Şu an yanıt veremiyorum. Lütfen tekrar deneyin.", en: "I cannot respond right now. Please try again.", ru: "Сейчас не могу ответить. Попробуйте еще раз." },
  "chat.suggestion.ptf": { tr: "Bugün PTF nedir?", en: "What is today's PTF?", ru: "Какая сегодня PTF?" },
  "chat.suggestion.yekdem": { tr: "YEKDEM üretimi anlık ver.", en: "Show live YEKDEM generation.", ru: "Покажи текущую генерацию YEKDEM." },
  "chat.suggestion.product": { tr: "STR Energy Intelligence Platform neler yapıyor?", en: "What does STR Energy Intelligence Platform do?", ru: "Что делает STR Energy Intelligence Platform?" },

  "nav.products.cta": { tr: "İlgini çekti mi? Demo talep et →", en: "Interested? Request a demo →", ru: "Интересно? Запросить демо →" },
  "nav.products.cta.link": { tr: "İletişime geç", en: "Contact us", ru: "Связаться" },

  // Hero
  "hero.title1": { tr: "STR Energy Intelligence", en: "STR Energy Intelligence", ru: "STR Energy Intelligence" },
  "hero.title2": { tr: "Platform", en: "Platform", ru: "Platform" },
  "hero.description": {
    tr: "STR Energy, saha ekipmanlarına doğrudan bağlanan, gerçek zamanlı tüketimi analiz eden ve tesislerin enerji maliyetini, israfı ve karbon emisyonlarını azaltmasına yardımcı olan yapay zekâ destekli bir endüstriyel enerji zekâsı platformu geliştirir.",
    en: "STR Energy develops an AI-powered industrial energy intelligence platform that connects directly to field equipment, analyzes real-time consumption and helps facilities reduce energy cost, waste and carbon emissions.",
    ru: "STR Energy разрабатывает платформу промышленной энергетической аналитики на базе ИИ, которая напрямую подключается к полевому оборудованию, анализирует потребление в реальном времени и помогает предприятиям снижать энергозатраты, потери и выбросы углерода."
  },
  "hero.cta": { tr: "Demo Talep Et", en: "Request a Demo", ru: "Запросить демо" },
  "hero.cta2": { tr: "Platformu İncele", en: "Explore the Platform", ru: "О платформе" },

  // Stats
  "stats.companies": { tr: "Şirket", en: "Companies", ru: "Компаний" },
  "stats.systems": { tr: "SCADA / AMI / DMS", en: "SCADA / AMI / DMS", ru: "SCADA / AMI / DMS" },
  "stats.uptime": { tr: "Çalışma Süresi", en: "Uptime", ru: "Время работы" },
  "stats.support": { tr: "Destek", en: "Support", ru: "Поддержка" },
  "stats.stage": { tr: "Girişim aşaması", en: "Venture stage", ru: "Стадия проекта" },
  "stats.field": { tr: "Saha bağlantısı", en: "Field connectivity", ru: "Полевое подключение" },
  "stats.intelligence": { tr: "Zekâ katmanı", en: "Intelligence layer", ru: "Уровень аналитики" },
  "stats.pilot": { tr: "İşbirliği modeli", en: "Collaboration model", ru: "Модель сотрудничества" },

  // Products
  "products.title": { tr: "Yeni ürün: endüstriyel enerjinin karar katmanı", en: "New product: the decision layer for industrial energy", ru: "Новый продукт: уровень принятия решений для промышленной энергетики" },
  "products.subtitle": { tr: "Sahadan gelen ham enerji verisini; ne olduğunu gösteren, ne olacağını tahmin eden ve performans farkının nedenini açıklayan operasyonel zekâya dönüştürür.", en: "It turns raw field energy data into operational intelligence that shows what is happening, predicts what comes next and explains the cause of performance gaps.", ru: "Она превращает полевые энергетические данные в операционную аналитику: показывает текущую ситуацию, прогнозирует будущее и объясняет причины отклонений." },
  "products.index.title": { tr: "STR Energy Intelligence Platform", en: "STR Energy Intelligence Platform", ru: "STR Energy Intelligence Platform" },
  "products.index.subtitle": { tr: "Endüstriyel tesisler için saha bağlantısı, enerji analitiği, öngörü ve kök neden açıklamasını tek üründe birleştiren platform.", en: "A single product for industrial facilities that combines field connectivity, energy analytics, forecasting and root-cause explanations.", ru: "Единый продукт для промышленных предприятий: подключение оборудования, энергетическая аналитика, прогнозирование и объяснение первопричин." },
  "products.index.details": { tr: "Platformu incele", en: "Explore the platform", ru: "О платформе" },

  // Product
  "product.intelligence": { tr: "STR Energy Intelligence Platform", en: "STR Energy Intelligence Platform", ru: "STR Energy Intelligence Platform" },
  "product.intelligence.desc": { tr: "Gerçek zamanlı enerji zekâsı, AI tahminleme ve üretim performansı analizi", en: "Real-time energy intelligence, AI forecasting and production performance analysis", ru: "Энергетическая аналитика в реальном времени, ИИ-прогнозы и анализ производства" },

  // Header dropdown descriptions
  "nav.about.desc": { tr: "STR Enerji hakkında", en: "About STR Energy", ru: "О STR Energy" },
  "nav.privacy.desc": { tr: "Gizlilik ve veri politikası", en: "Privacy & data policy", ru: "Политика конфиденциальности" },
  "nav.contacts.desc": { tr: "Bizimle iletişime geçin", en: "Get in touch", ru: "Связаться с нами" },
  "nav.insights.desc": { tr: "Enerji piyasası rehberleri", en: "Energy market guides", ru: "Energy market guides" },
  "nav.marketData.desc": { tr: "Bağımsız enerji piyasası veri araştırması", en: "Independent energy market data research", ru: "Независимое исследование рыночных данных" },
  "nav.methodology.desc": { tr: "Kaynak, kapsam ve veri sınırlamaları", en: "Sources, scope and data limitations", ru: "Источники, охват и ограничения данных" },
  "nav.investors.desc": { tr: "Erken aşama yatırım ve stratejik ortaklık", en: "Early-stage investment and strategic partnerships", ru: "Ранние инвестиции и стратегическое партнерство" },
  "nav.editorialPolicy.desc": { tr: "Yayın, kaynak ve düzeltme standartları", en: "Publishing, sourcing and corrections", ru: "Публикация, источники и исправления" },

  // About
  "about.title": { tr: "STR Enerji", en: "STR Energy", ru: "STR Energy" },
  "about.subtitle": { tr: "Smart Technologies for Renewables", en: "Smart Technologies for Renewables", ru: "Smart Technologies for Renewables" },
  "about.description": {
    tr: "STR Energy, saha ekipmanlarına doğrudan bağlanan, gerçek zamanlı tüketimi analiz eden ve tesislerin enerji maliyetini, israfı ve karbon emisyonlarını azaltmasına yardımcı olan yapay zekâ destekli bir endüstriyel enerji zekâsı platformu geliştirir.",
    en: "STR Energy develops an AI-powered industrial energy intelligence platform that connects directly to field equipment, analyzes real-time consumption and helps facilities reduce energy cost, waste and carbon emissions.",
    ru: "STR Energy разрабатывает платформу промышленной энергетической аналитики на базе ИИ, напрямую подключенную к полевому оборудованию и помогающую снижать затраты, потери и выбросы."
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

  // Devices
  "devices.section.badge": { tr: "Özellikler", en: "Features", ru: "Возможности" },
  "devices.section.title": { tr: "Başarı için gereken her şey", en: "Everything you need to succeed", ru: "Все, что нужно для успеха" },
  "devices.section.subtitle": {
    tr: "Enerji operasyonlarınız için entegrasyon, analitik ve otomasyon bileşenleri.",
    en: "Integration, analytics, and automation for your energy operations.",
    ru: "Интеграция, аналитика и автоматизация для ваших энергетических операций."
  },
  "devices.card1.title": { tr: "Saha entegrasyonu", en: "Field integration", ru: "Полевые интеграции" },
  "devices.card1.desc": {
    tr: "SCADA, AMI ve DMS akışlarını tek panelde izleyin, saha ekipleriyle koordinasyonu hızlandırın.",
    en: "Monitor SCADA, AMI, and DMS flows in one panel and speed up field coordination.",
    ru: "Отслеживайте потоки SCADA, AMI и DMS в одной панели и ускоряйте координацию с полевыми командами."
  },
  "devices.card2.title": { tr: "Operasyon görünürlüğü", en: "Operational visibility", ru: "Операционная прозрачность" },
  "devices.card2.desc": {
    tr: "Uyarı, alarm ve rapor akışını tek merkezden yönetin, karar sürecini hızlandırın.",
    en: "Manage alerts, alarms, and reporting from one place to accelerate decisions.",
    ru: "Управляйте уведомлениями, авариями и отчетами из одного места, ускоряя решения."
  },
  "devices.card3.title": { tr: "Verimlilik ve maliyet", en: "Efficiency and cost", ru: "Эффективность и затраты" },
  "devices.card3.desc": {
    tr: "Kayıp/kaçak analizi ve optimizasyon ile maliyetleri düşürün, performansı artırın.",
    en: "Reduce costs and improve performance with loss analysis and optimization.",
    ru: "Снижайте затраты и повышайте эффективность с анализом потерь и оптимизацией."
  },

  // Company pages
  "about.page.title": { tr: "STR Energy — Smart Technologies for Renewables", en: "STR Energy — Smart Technologies for Renewables", ru: "STR Energy — Smart Technologies for Renewables" },
  "about.page.subtitle": {
    tr: "Endüstriyel enerji verisini ölçülebilir performansa dönüştüren erken aşama bir enerji teknolojileri girişimiyiz.",
    en: "We are an early-stage energy technology startup turning industrial energy data into measurable performance.",
    ru: "Мы — энергетический технологический стартап ранней стадии, превращающий промышленные данные в измеримую эффективность."
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
  "faq.subtitle": { tr: "STR Enerji platformu hakkında en popüler sorulara cevaplar", en: "Answers to the most popular questions about the STR Energy platform", ru: "Ответы на популярные вопросы о платформе STR Energy" },
  "faq.q1": { tr: "Platform mevcut enerji analizörlerimize bağlanabilir mi?", en: "Can the platform connect to our existing energy analyzers?", ru: "Может ли платформа подключаться к нашим анализаторам энергии?" },
  "faq.a1": { tr: "Evet. Keşif aşamasında cihaz, register haritası ve ağ yapısı doğrulanır; RS485 / Modbus RTU veya Modbus TCP üzerinden uygun edge bağlantısı planlanır.", en: "Yes. During discovery, we verify devices, register maps and network topology, then plan the appropriate edge connection over RS485 / Modbus RTU or Modbus TCP.", ru: "Да. На этапе обследования проверяются устройства, карты регистров и топология сети, после чего планируется edge-подключение по RS485 / Modbus RTU или Modbus TCP." },
  "faq.q2": { tr: "Platform üretim kaybının nedenini açıklayabilir mi?", en: "Can the platform explain the cause of a production gap?", ru: "Может ли платформа объяснить причину производственного разрыва?" },
  "faq.a2": { tr: "Platform beklenen üretim veya tüketim baz çizgisini gerçekleşen verilerle karşılaştırır; duruş, ekipman verimsizliği, hat hızı, baz yük ve proses sapması gibi olası etkenleri kanıtlarıyla sıralar.", en: "The platform compares expected production or consumption baselines with actual data and ranks likely drivers such as downtime, equipment inefficiency, line speed, base load and process deviation with supporting evidence.", ru: "Платформа сравнивает ожидаемые производственные или потребительские базовые значения с фактическими данными и ранжирует вероятные причины: простои, неэффективность оборудования, скорость линии, базовую нагрузку и отклонения процесса." },
  "faq.q3": { tr: "Teknik destek sağlıyor musunuz?", en: "Do you provide technical support?", ru: "Предоставляете ли вы техническую поддержку?" },
  "faq.a3": { tr: "Evet. Pilot, entegrasyon ve devreye alma sürecinde kurucu ekip ve teknik ekip doğrudan destek verir.", en: "Yes. The founding and technical teams provide direct support throughout pilots, integration and commissioning.", ru: "Да. Команда основателей и технические специалисты напрямую поддерживают пилоты, интеграцию и ввод в эксплуатацию." },
  "faq.q4": { tr: "STR neyin kısaltmasıdır?", en: "What does STR stand for?", ru: "Что означает STR?" },
  "faq.a4": { tr: "STR, Smart Technologies for Renewables ifadesinin kısaltmasıdır. Enerji sistemlerini daha akıllı, ölçülebilir ve sürdürülebilir hale getiren teknolojiler geliştiriyoruz.", en: "STR stands for Smart Technologies for Renewables. We build technology that makes energy systems smarter, measurable and more sustainable.", ru: "STR означает Smart Technologies for Renewables. Мы создаем технологии для более умных, измеримых и устойчивых энергосистем." },
  "faq.q5": { tr: "STR Energy yatırım arıyor mu?", en: "Is STR Energy raising investment?", ru: "STR Energy привлекает инвестиции?" },
  "faq.a5": { tr: "Evet. Erken aşama ürün geliştirme ve pilot doğrulama sürecindeyiz; yatırımcılar ve stratejik sanayi partnerleriyle görüşmelere açığız.", en: "Yes. We are in early-stage product development and pilot validation, and we are open to conversations with investors and strategic industrial partners.", ru: "Да. Мы находимся на ранней стадии разработки и пилотной проверки и открыты к диалогу с инвесторами и промышленными партнерами." },

  // Footer
  "footer.description": { tr: "Smart Technologies for Renewables. Endüstriyel enerji verisini yapay zekâ destekli kararlara dönüştüren erken aşama enerji teknolojileri girişimi.", en: "Smart Technologies for Renewables. An early-stage energy technology startup turning industrial energy data into AI-powered decisions.", ru: "Smart Technologies for Renewables. Энергетический стартап ранней стадии, превращающий промышленные данные в решения на базе ИИ." },
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
