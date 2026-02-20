"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
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
  "nav.products": { tr: "Ürünler", en: "Products", ru: "Продукты" },
  "nav.company": { tr: "Şirket", en: "Company", ru: "Компания" },
  "nav.contacts": { tr: "İletişim", en: "Contacts", ru: "Контакты" },
  "nav.about": { tr: "Hakkımızda", en: "About us", ru: "О нас" },
  "nav.testimonials": { tr: "Referanslar", en: "Testimonials", ru: "Отзывы" },
  "nav.privacy": { tr: "Gizlilik Politikası", en: "Privacy Policy", ru: "Политика" },
  "nav.help": { tr: "Yardım Merkezi", en: "Help Center", ru: "Помощь" },
  "nav.news": { tr: "Haberler", en: "News", ru: "Новости" },

  // Chat widget
  "chat.title": { tr: "Canlı Enerji Asistanı", en: "Live Energy Assistant", ru: "Энергетический ассистент" },
  "chat.subtitle": { tr: "PTF, YEKDEM ve ürün sorularında hızlı yanıt.", en: "Fast answers for PTF, YEKDEM, and product questions.", ru: "Быстрые ответы по PTF, YEKDEM и продуктам." },
  "chat.placeholder": { tr: "Bir şey sorun…", en: "Ask anything…", ru: "Задайте вопрос…" },
  "chat.send": { tr: "Gönder", en: "Send", ru: "Отправить" },
  "chat.open": { tr: "Asistanı aç", en: "Open assistant", ru: "Открыть ассистента" },
  "chat.minimize": { tr: "Kapat", en: "Minimize", ru: "Свернуть" },
  "chat.empty": { tr: "Size yardımcı olmak için buradayım. PTF, YEKDEM veya ürünlerle ilgili sorun.", en: "I am here to help. Ask about PTF, YEKDEM, or our products.", ru: "Я здесь, чтобы помочь. Спросите о PTF, YEKDEM или продуктах." },
  "chat.loading": { tr: "Yanıt hazırlanıyor…", en: "Preparing response…", ru: "Готовим ответ…" },
  "chat.error": { tr: "Şu an yanıt veremiyorum. Lütfen tekrar deneyin.", en: "I cannot respond right now. Please try again.", ru: "Сейчас не могу ответить. Попробуйте еще раз." },
  "chat.suggestion.ptf": { tr: "Bugün PTF nedir?", en: "What is today's PTF?", ru: "Какая сегодня PTF?" },
  "chat.suggestion.yekdem": { tr: "YEKDEM üretimi anlık ver.", en: "Show live YEKDEM generation.", ru: "Покажи текущую генерацию YEKDEM." },
  "chat.suggestion.product": { tr: "EnergyOS ile neler yapılıyor?", en: "What does EnergyOS provide?", ru: "Что дает EnergyOS?" },

  "nav.products.cta": { tr: "İlgini çekti mi? Demo talep et →", en: "Interested? Request a demo →", ru: "Интересно? Запросить демо →" },
  "nav.products.cta.link": { tr: "İletişime geç", en: "Contact us", ru: "Связаться" },

  // Hero
  "hero.title1": { tr: "Enerji", en: "Energy", ru: "Энергия" },
  "hero.title2": { tr: "Yazılım Ar-Ge", en: "Software R&D", ru: "Разработка ПО" },
  "hero.description": {
    tr: "Şebeke, tesis ve sayaç verilerinizi tek platformda birleştirin. Gerçek zamanlı izleme, analitik ve otomasyonla verimliliği artırın.",
    en: "Unify grid, facility, and meter data in one platform. Boost efficiency with real-time monitoring, analytics, and automation.",
    ru: "Объединяйте данные сети, объектов и счетчиков на одной платформе. Повышайте эффективность с мониторингом в реальном времени, аналитикой и автоматизацией."
  },
  "hero.cta": { tr: "Projeni Görüşelim", en: "Discuss Project", ru: "Обсудить проект" },
  "hero.cta2": { tr: "Ürünler", en: "Products", ru: "Продукты" },

  // Stats
  "stats.companies": { tr: "Şirket", en: "Companies", ru: "Компаний" },
  "stats.systems": { tr: "SCADA / AMI / DMS", en: "SCADA / AMI / DMS", ru: "SCADA / AMI / DMS" },
  "stats.uptime": { tr: "Çalışma Süresi", en: "Uptime", ru: "Время работы" },
  "stats.support": { tr: "Destek", en: "Support", ru: "Поддержка" },

  // Products
  "products.title": { tr: "Enerji operasyonları için ihtiyacınız olan her şey", en: "Everything you need for energy operations", ru: "Все для энергетических операций" },
  "products.subtitle": { tr: "STR Enerji, şebeke, tesis ve sayaç verilerini tek çatı altında birleştirerek izleme, analitik ve optimizasyon sunar.", en: "STR Energy unifies grid, facility, and meter data to deliver monitoring, analytics, and optimization.", ru: "STR Energy объединяет данные сети, объектов и счетчиков для мониторинга, аналитики и оптимизации." },

  // Product names
  "product.energyos": { tr: "EnergyOS", en: "EnergyOS", ru: "EnergyOS" },
  "product.energyos.desc": { tr: "Enerji yönetimi ve otomasyon", en: "Energy management & automation", ru: "Управление энергией и автоматизация" },
  "product.gridanalytics": { tr: "GridAnalytics", en: "GridAnalytics", ru: "GridAnalytics" },
  "product.gridanalytics.desc": { tr: "Şebeke analizi ve raporlama", en: "Grid analytics & reporting", ru: "Аналитика сети и отчётность" },
  "product.powerforecast": { tr: "PowerForecast", en: "PowerForecast", ru: "PowerForecast" },
  "product.powerforecast.desc": { tr: "Tüketim tahmini ve planlama", en: "Consumption forecasting & planning", ru: "Прогнозирование потребления и планирование" },
  "product.securegrid": { tr: "SecureGrid", en: "SecureGrid", ru: "SecureGrid" },
  "product.securegrid.desc": { tr: "Güvenlik ve siber koruma", en: "Security & cyber protection", ru: "Безопасность и киберзащита" },
  "product.smartmeter": { tr: "SmartMeter Hub", en: "SmartMeter Hub", ru: "SmartMeter Hub" },
  "product.smartmeter.desc": { tr: "Akıllı sayaç entegrasyonu", en: "Smart meter integration", ru: "Интеграция умных счётчиков" },
  "product.energycloud": { tr: "EnergyCloud", en: "EnergyCloud", ru: "EnergyCloud" },
  "product.energycloud.desc": { tr: "Bulut tabanlı enerji platformu", en: "Cloud-based energy platform", ru: "Облачная энергетическая платформа" },

  // Header dropdown descriptions
  "nav.about.desc": { tr: "STR Enerji hakkında", en: "About STR Energy", ru: "О STR Energy" },
  "nav.testimonials.desc": { tr: "Müşteri deneyimleri", en: "Customer experiences", ru: "Отзывы клиентов" },
  "nav.privacy.desc": { tr: "Gizlilik ve veri politikası", en: "Privacy & data policy", ru: "Политика конфиденциальности" },
  "nav.help.desc": { tr: "Destek ve sık sorulan sorular", en: "Support & FAQs", ru: "Поддержка и FAQ" },
  "nav.contacts.desc": { tr: "Bizimle iletişime geçin", en: "Get in touch", ru: "Связаться с нами" },
  "nav.news.desc": { tr: "Duyurular ve güncellemeler", en: "Announcements and updates", ru: "Анонсы и обновления" },

  // About
  "about.title": { tr: "STR Enerji", en: "STR Energy", ru: "STR Energy" },
  "about.subtitle": { tr: "Enerji operasyonlarınızın dijital temeli", en: "Digital foundation for your energy operations", ru: "Цифровой фундамент ваших энергетических операций" },
  "about.description": {
    tr: "STR Enerji, elektrik şebekeleri ve tesisler için gerçek zamanlı izleme, analitik ve optimizasyon sağlayan enerji yazılımları geliştirir. Veriyi tek platformda toplayarak operasyonel verimliliği artırırız.",
    en: "STR Energy builds energy software for grids and facilities, enabling real-time monitoring, analytics, and optimization. We unify data on a single platform to boost operational efficiency.",
    ru: "STR Energy разрабатывает ПО для сетей и объектов, обеспечивая мониторинг в реальном времени, аналитику и оптимизацию. Мы объединяем данные на одной платформе для повышения эффективности."
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

  // Testimonials
  "testimonials.title": { tr: "Müşterilerimiz ne diyor", en: "What our clients say", ru: "Что говорят наши клиенты" },
  "testimonials.subtitle": { tr: "Binlerce şirket STR Enerji'ye güveniyor", en: "Thousands of companies trust STR Energy with their business", ru: "Тысячи компаний доверяют STR Energy" },

  // Company pages
  "about.page.title": { tr: "STR Enerji Hakkında", en: "About STR Energy", ru: "О STR Energy" },
  "about.page.subtitle": {
    tr: "Enerji verisini tek platformda birleştirerek izleme, analiz ve optimizasyonu kolaylaştırıyoruz.",
    en: "We unify energy data in one platform to simplify monitoring, analytics, and optimization.",
    ru: "Мы объединяем данные об энергии на одной платформе, упрощая мониторинг, аналитику и оптимизацию."
  },
  "about.page.mission.title": { tr: "Misyonumuz", en: "Our Mission", ru: "Наша миссия" },
  "about.page.mission.desc": {
    tr: "Şebeke, tesis ve sayaç verilerini tek ekranda birleştirerek, enerji operasyonlarının verimliliğini artıran güvenilir yazılımlar geliştiriyoruz.",
    en: "We build reliable software that unifies grid, facility, and meter data to improve energy operations efficiency.",
    ru: "Мы создаем надежное ПО, объединяющее данные сети, объектов и счетчиков для повышения эффективности."
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
  "testimonials.page.title": { tr: "Müşterilerimiz ne diyor", en: "What our clients say", ru: "Что говорят наши клиенты" },
  "testimonials.page.subtitle": {
    tr: "Binlerce şirket STR Enerji çözümleriyle operasyonlarını hızlandırıyor.",
    en: "Thousands of companies accelerate operations with STR Energy solutions.",
    ru: "Тысячи компаний ускоряют операции с решениями STR Energy."
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
  "help.page.title": { tr: "Yardım Merkezi", en: "Help Center", ru: "Центр помощи" },
  "help.page.subtitle": { tr: "Destek, onboarding ve sık sorulan sorular için hızlı yanıtlar.", en: "Quick answers for support, onboarding, and FAQs.", ru: "Быстрые ответы по поддержке и вопросам." },
  "help.faq1.q": { tr: "Destek taleplerine ne kadar sürede dönüş yapıyorsunuz?", en: "How fast do you respond to support requests?", ru: "Как быстро вы отвечаете на запросы?" },
  "help.faq1.a": { tr: "Standart destek paketinde 4 saat içinde, kurumsal pakette 1 saat içinde dönüş sağlıyoruz.", en: "We respond within 4 hours on standard plans and within 1 hour on enterprise plans.", ru: "Мы отвечаем в течение 4 часов (стандарт) и 1 часа (enterprise)." },
  "help.faq2.q": { tr: "Kurulum süreci nasıl ilerliyor?", en: "How does the setup process work?", ru: "Как проходит установка?" },
  "help.faq2.a": { tr: "Keşif, entegrasyon ve eğitim adımlarıyla 2-6 hafta içinde canlıya geçiyoruz.", en: "We go live in 2–6 weeks with discovery, integration, and training steps.", ru: "Запуск за 2–6 недель с этапами обследования, интеграции и обучения." },
  "help.faq3.q": { tr: "Verilerim nerede saklanıyor?", en: "Where is my data stored?", ru: "Где хранятся данные?" },
  "help.faq3.a": { tr: "Verileriniz KVKK uyumlu olarak Türkiye veya AB veri merkezlerinde saklanır.", en: "Your data is stored in Turkey or EU data centers in compliance with regulations.", ru: "Ваши данные хранятся в центрах обработки данных в Турции или ЕС." },
  "contacts.page.title": { tr: "İletişim", en: "Contacts", ru: "Контакты" },
  "contacts.page.subtitle": { tr: "Ekibimizle hızlıca iletişime geçin.", en: "Get in touch with our team quickly.", ru: "Свяжитесь с нашей командой." },
  "contacts.card.email": { tr: "E‑posta", en: "Email", ru: "Эл. почта" },
  "contacts.card.phone": { tr: "Telefon", en: "Phone", ru: "Телефон" },
  "contacts.card.office": { tr: "Ofis", en: "Office", ru: "Офис" },
  "contacts.value.phone": { tr: "+90 544 918 70 90", en: "+90 544 918 70 90", ru: "+90 544 918 70 90" },
  "contacts.value.phone.href": { tr: "+905449187090", en: "+905449187090", ru: "+905449187090" },
  "contacts.value.office": { tr: "Mücahitler, 72037. Sk No:2, Okan Towers, 27060 Şehitkamil/Gaziantep", en: "Mücahitler, 72037. Sk No:2, Okan Towers, 27060 Şehitkamil/Gaziantep", ru: "Мюджахитлер, 72037. Sk No:2, Okan Towers, 27060 Шехиткамиль/Газиантеп" },

  // FAQ
  "faq.title": { tr: "Sıkça Sorulan Sorular", en: "Frequently Asked Questions", ru: "Часто задаваемые вопросы" },
  "faq.subtitle": { tr: "STR Enerji platformu hakkında en popüler sorulara cevaplar", en: "Answers to the most popular questions about the STR Energy platform", ru: "Ответы на популярные вопросы о платформе STR Energy" },
  "faq.q1": { tr: "STR Enerji'yi nasıl kullanmaya başlarım?", en: "How to start using STR Energy?", ru: "Как начать использовать STR Energy?" },
  "faq.a1": { tr: "Bize danışmanlık için ulaşın, işletmeniz için en iyi mikroservis setini seçmenize yardımcı olacağız.", en: "Contact us for a consultation, and we will help you choose the best set of microservices for your business.", ru: "Свяжитесь с нами для консультации." },
  "faq.q2": { tr: "Sadece bir ürün kullanabilir miyim?", en: "Can I use only one product?", ru: "Могу ли я использовать только один продукт?" },
  "faq.a2": { tr: "Evet, her ürün bağımsız olarak çalışabilir. Ancak birlikte kullanıldığında daha güçlü entegrasyonlar elde edersiniz.", en: "Yes, each product can work independently. However, you get stronger integrations when used together.", ru: "Да, каждый продукт может работать независимо." },
  "faq.q3": { tr: "Teknik destek sağlıyor musunuz?", en: "Do you provide technical support?", ru: "Предоставляете ли вы техническую поддержку?" },
  "faq.a3": { tr: "Evet, 7/24 teknik destek sağlıyoruz. İstediğiniz zaman bize ulaşabilirsiniz.", en: "Yes, we provide 24/7 technical support. You can reach us anytime.", ru: "Да, мы предоставляем поддержку 24/7." },

  // Footer
  "footer.description": { tr: "Enerji operasyonlarınız için dijital temel. Şebeke, tesis ve sayaç verilerini tek platformda birleştiren çözümler.", en: "Digital foundation for energy operations. Solutions that unify grid, facility, and meter data in one platform.", ru: "Цифровой фундамент для энергетических операций. Решения, объединяющие данные сети, объектов и счетчиков в одной платформе." },
  "footer.navigation": { tr: "Navigasyon", en: "Navigation", ru: "Навигация" },
  "footer.main": { tr: "Ana Sayfa", en: "Main", ru: "Главная" },
  "footer.faq": { tr: "SSS", en: "FAQ", ru: "FAQ" },
  "footer.company": { tr: "Şirket", en: "Company", ru: "Компания" },
  "footer.contacts": { tr: "İletişim", en: "Contacts", ru: "Контакты" },
  "footer.rights": { tr: "Tüm hakları saklıdır.", en: "All rights reserved.", ru: "Все права защищены." },
  "footer.cta.title": { tr: "Projeni bizimle tartışmaya hazır mısın?", en: "Ready to discuss your project with us?", ru: "Готовы обсудить ваш проект?" },
  "footer.cta.button": { tr: "Uzman desteği almak", en: "Get expert support", ru: "Получить консультацию" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");
  const pathname = usePathname();

  useEffect(() => {
    const pathLocale = getLocaleFromPathname(pathname) as SupportedLocale | null;
    if (pathLocale && pathLocale !== language) {
      setLanguage(pathLocale);
      localStorage.setItem("language", pathLocale);
      return;
    }

    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (!pathLocale && savedLanguage && supportedLocales.includes(savedLanguage as SupportedLocale)) {
      setLanguage(savedLanguage);
    }
  }, [pathname, language]);

  useEffect(() => {
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
