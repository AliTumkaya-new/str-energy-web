"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";
import { useLanguage } from "@/context/LanguageContext";
import {
  Zap,
  BarChart3,
  Shield,
  Clock,
  Settings,
  Database,
  LineChart,
  Bell,
  Users,
  ArrowRight,
  Minus,
  Plus,
  MonitorSmartphone,
  Server,
  Gauge,
} from "lucide-react";


export default function EnergyOSPage() {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [patternHot, setPatternHot] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const withLocale = useLocaleHref();

  const copyByLang = {
    tr: {
      heroBadge: "Yeni Nesil Enerji Yönetimi",
      heroTitle: "Enerji sistemlerinizi",
      heroAccent: "7/24 kontrol edin",
      heroDesc:
        "EnergyOS ile SCADA, RTU ve akıllı sayaçlarınızı tek platformdan yönetin. Yapay zeka destekli tahminleme ve otomatik alarm yönetimi.",
      heroCta: "Demo Talep Edin",
      howBadge: "Nasıl Çalışır",
      howTitle: "EnergyOS'u ",
      howAccent: "5 adımda",
      howSuffix: " başlatın",
      integrationsTitle: "Tüm sistemlerinizle ",
      integrationsAccent: "entegre",
      integrationsDesc: "EnergyOS, endüstriyel sistemlerinizle sorunsuz çalışır",
      featuresBadge: "Özellikler",
      featuresTitle: "Başarı için ihtiyacınız olan ",
      featuresAccent: "her şey",
      featuresDesc: "Enerji yönetimi, izleme ve kontrolde eksiksiz çözüm",
      faqBadge: "Sıkça Sorulan Sorular",
      faqTitle: "SSS",
      ctaTitle: "Enerji yönetiminizi ",
      ctaAccent: "dönüştürmeye",
      ctaDesc: "Uzman ekibimizle iletişime geçin ve projenizi konuşalım",
      ctaPrimary: "İletişime Geçin",
      ctaSecondary: "Ana Sayfaya Dön",
      steps: [
        { num: 1, title: "Sistem Analizi", desc: "Mevcut altyapınızı analiz ederiz" },
        { num: 2, title: "SCADA Entegrasyonu", desc: "RTU/PLC bağlantılarını kurarız" },
        { num: 3, title: "Veri Akışı", desc: "Gerçek zamanlı veri toplama başlar" },
        { num: 4, title: "Dashboard", desc: "Kontrol panelini özelleştiririz" },
        { num: 5, title: "Canlıya Geçiş", desc: "7/24 izleme ve kontrol aktif" },
      ],
      integrations: [
        { icon: Server, title: "SCADA", desc: "Endüstriyel otomasyon sistemleri ile tam entegrasyon." },
        { icon: Database, title: "Historian", desc: "Tarihsel veri depolama ve analiz entegrasyonu." },
        { icon: MonitorSmartphone, title: "IoT Gateway", desc: "Akıllı sayaç ve sensör bağlantıları." },
        { icon: Gauge, title: "DCS", desc: "Dağıtık kontrol sistemleri entegrasyonu." },
      ],
      features: [
        { icon: LineChart, title: "Gerçek Zamanlı İzleme", desc: "Tüm enerji verilerinizi anlık görüntüleyin" },
        { icon: Bell, title: "Alarm Yönetimi", desc: "Kritik durumlar için akıllı bildirimler" },
        { icon: BarChart3, title: "Raporlama", desc: "Otomatik ve özelleştirilebilir raporlar" },
        { icon: Shield, title: "Siber Güvenlik", desc: "OT/IT güvenlik katmanları" },
        { icon: Settings, title: "Uzaktan Kontrol", desc: "Güvenli uzaktan kumanda özellikleri" },
        { icon: Users, title: "Çoklu Kullanıcı", desc: "Rol tabanlı erişim kontrolü" },
        { icon: Database, title: "Veri Arşivi", desc: "Sınırsız tarihsel veri saklama" },
        { icon: Clock, title: "SLA Takibi", desc: "Servis seviyesi izleme" },
      ],
      faqs: [
        { q: "Kurulum süresi ne kadar?", a: "Proje kapsamına göre 2-8 hafta arasında değişir. Pilot projeler 2 haftada tamamlanabilir." },
        { q: "Mevcut SCADA sistemimiz ile çalışır mı?", a: "Evet, Siemens, ABB, Schneider ve diğer tüm büyük SCADA markaları ile entegre çalışır." },
        { q: "Veri güvenliği nasıl sağlanıyor?", a: "End-to-end şifreleme, VPN tünelleri ve rol tabanlı erişim kontrolü ile maksimum güvenlik." },
        { q: "Bulut mu yoksa on-premise mi?", a: "Her iki seçenek de mevcuttur. Hibrit yapılandırma da desteklenmektedir." },
      ],
    },
    en: {
      heroBadge: "Next‑Gen Energy Management",
      heroTitle: "Control your energy",
      heroAccent: "24/7",
      heroDesc:
        "Manage SCADA, RTU, and smart meters from a single platform. AI‑powered forecasting and automated alarm management.",
      heroCta: "Request Demo",
      howBadge: "How It Works",
      howTitle: "Launch EnergyOS in ",
      howAccent: "5 steps",
      howSuffix: "",
      integrationsTitle: "Integrated with ",
      integrationsAccent: "your systems",
      integrationsDesc: "EnergyOS works seamlessly with industrial systems",
      featuresBadge: "Features",
      featuresTitle: "Everything you need ",
      featuresAccent: "to succeed",
      featuresDesc: "A complete solution for monitoring, control, and energy operations",
      faqBadge: "Frequently Asked Questions",
      faqTitle: "FAQ",
      ctaTitle: "Ready to ",
      ctaAccent: "transform",
      ctaDesc: "Talk to our experts and plan your project",
      ctaPrimary: "Contact Us",
      ctaSecondary: "Back to Home",
      steps: [
        { num: 1, title: "System Analysis", desc: "We analyze your current infrastructure" },
        { num: 2, title: "SCADA Integration", desc: "We connect RTU/PLC systems" },
        { num: 3, title: "Data Flow", desc: "Real‑time data collection starts" },
        { num: 4, title: "Dashboard", desc: "We customize the control panel" },
        { num: 5, title: "Go Live", desc: "24/7 monitoring and control" },
      ],
      integrations: [
        { icon: Server, title: "SCADA", desc: "Full integration with industrial automation systems." },
        { icon: Database, title: "Historian", desc: "Historical data storage and analytics integration." },
        { icon: MonitorSmartphone, title: "IoT Gateway", desc: "Smart meter and sensor connectivity." },
        { icon: Gauge, title: "DCS", desc: "Distributed control systems integration." },
      ],
      features: [
        { icon: LineChart, title: "Real‑Time Monitoring", desc: "View all energy data in real time" },
        { icon: Bell, title: "Alarm Management", desc: "Smart alerts for critical situations" },
        { icon: BarChart3, title: "Reporting", desc: "Automated and customizable reports" },
        { icon: Shield, title: "Cyber Security", desc: "OT/IT security layers" },
        { icon: Settings, title: "Remote Control", desc: "Secure remote control features" },
        { icon: Users, title: "Multi‑User", desc: "Role‑based access control" },
        { icon: Database, title: "Data Archive", desc: "Unlimited historical data storage" },
        { icon: Clock, title: "SLA Tracking", desc: "Service level monitoring" },
      ],
      faqs: [
        { q: "How long does setup take?", a: "Depending on scope, it takes 2–8 weeks. Pilot projects can be completed in 2 weeks." },
        { q: "Can it work with our SCADA system?", a: "Yes. We integrate with Siemens, ABB, Schneider, and other major SCADA brands." },
        { q: "How is data security ensured?", a: "End‑to‑end encryption, VPN tunnels, and role‑based access control." },
        { q: "Cloud or on‑premise?", a: "Both options are available. Hybrid configurations are supported." },
      ],
    },
    ru: {
      heroBadge: "Энергоменеджмент нового поколения",
      heroTitle: "Контролируйте энергию",
      heroAccent: "24/7",
      heroDesc:
        "Управляйте SCADA, RTU и умными счетчиками с одной платформы. Прогнозирование с ИИ и автоматические тревоги.",
      heroCta: "Запросить демо",
      howBadge: "Как это работает",
      howTitle: "Запустите EnergyOS за ",
      howAccent: "5 шагов",
      howSuffix: "",
      integrationsTitle: "Интеграция с ",
      integrationsAccent: "вашими системами",
      integrationsDesc: "EnergyOS бесшовно работает с промышленными системами",
      featuresBadge: "Возможности",
      featuresTitle: "Все, что нужно ",
      featuresAccent: "для успеха",
      featuresDesc: "Полное решение для мониторинга, контроля и управления энергией",
      faqBadge: "Часто задаваемые вопросы",
      faqTitle: "FAQ",
      ctaTitle: "Готовы ",
      ctaAccent: "трансформировать",
      ctaDesc: "Свяжитесь с экспертами и обсудите проект",
      ctaPrimary: "Связаться",
      ctaSecondary: "На главную",
      steps: [
        { num: 1, title: "Анализ системы", desc: "Анализируем текущую инфраструктуру" },
        { num: 2, title: "Интеграция SCADA", desc: "Подключаем RTU/PLC" },
        { num: 3, title: "Поток данных", desc: "Старт сбора данных в реальном времени" },
        { num: 4, title: "Dashboard", desc: "Настраиваем панель управления" },
        { num: 5, title: "Запуск", desc: "Круглосуточный мониторинг" },
      ],
      integrations: [
        { icon: Server, title: "SCADA", desc: "Полная интеграция с системами промышленной автоматизации." },
        { icon: Database, title: "Historian", desc: "Интеграция исторических данных и аналитики." },
        { icon: MonitorSmartphone, title: "IoT Gateway", desc: "Подключение умных счетчиков и датчиков." },
        { icon: Gauge, title: "DCS", desc: "Интеграция распределенных систем управления." },
      ],
      features: [
        { icon: LineChart, title: "Мониторинг в реальном времени", desc: "Просматривайте данные в реальном времени" },
        { icon: Bell, title: "Управление тревогами", desc: "Умные уведомления о критических событиях" },
        { icon: BarChart3, title: "Отчеты", desc: "Автоматические и настраиваемые отчеты" },
        { icon: Shield, title: "Кибербезопасность", desc: "Слои безопасности OT/IT" },
        { icon: Settings, title: "Удаленное управление", desc: "Безопасное удаленное управление" },
        { icon: Users, title: "Мультипользователь", desc: "Ролевой доступ" },
        { icon: Database, title: "Архив данных", desc: "Безлимитное хранение исторических данных" },
        { icon: Clock, title: "Контроль SLA", desc: "Мониторинг уровня сервиса" },
      ],
      faqs: [
        { q: "Сколько занимает внедрение?", a: "В зависимости от объема — 2–8 недель. Пилот можно завершить за 2 недели." },
        { q: "Совместимо ли с нашей SCADA?", a: "Да. Интегрируемся с Siemens, ABB, Schneider и другими брендами." },
        { q: "Как обеспечивается безопасность?", a: "Сквозное шифрование, VPN‑туннели и ролевой доступ." },
        { q: "Облако или on‑premise?", a: "Обе опции доступны. Поддерживается гибрид." },
      ],
    },
  } as const;

  const copy = copyByLang[language] ?? copyByLang.tr;
  const steps = copy.steps;
  const integrations = copy.integrations;
  const features = copy.features;
  const faqs = copy.faqs;

  const heroRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const pageBg = isDark ? "bg-black text-white" : "bg-white text-zinc-900";
  const sectionBase = isDark ? "bg-black" : "bg-white";
  const sectionAlt = isDark ? "bg-zinc-950" : "bg-zinc-50";
  const sectionGradient = isDark
    ? "bg-gradient-to-b from-zinc-950 to-black"
    : "bg-gradient-to-b from-zinc-50 to-white";
  const heading = isDark ? "text-white" : "text-zinc-900";
  const desc = isDark ? "text-gray-400" : "text-zinc-600";
  const card = isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-black/10";
  const cardAlt = isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-50 border-black/10";

  const updateHeroVars = () => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty("--str-hex-x", `${lastPosRef.current.x}px`);
    heroRef.current.style.setProperty("--str-hex-y", `${lastPosRef.current.y}px`);
  };

  const onHeroPointerMove: React.PointerEventHandler<HTMLElement> = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    lastPosRef.current = { x, y };

    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateHeroVars();
    });
  };

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Header variant="floating" />

      {/* Hero Section with Pattern */}
      <section
        ref={heroRef}
        onPointerEnter={(e: React.PointerEvent<HTMLElement>) => {
          setPatternHot(true);
          onHeroPointerMove(e);
        }}
        onPointerLeave={() => setPatternHot(false)}
        onPointerMove={(e) => {
          if (!patternHot) setPatternHot(true);
          onHeroPointerMove(e);
        }}
        style={{
          // Fallback center
          ...(undefined as unknown as { [key: string]: string }),
        }}
        className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%]"
      >
        <div className="absolute inset-x-0 bottom-0 top-16 md:top-20">
          {/* Base pattern (nötr) */}
          <div className="absolute inset-0 opacity-35">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hatchPatternBase" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path
                    d="M -12 48 L 48 -12"
                    stroke={isDark ? "rgba(244,244,245,0.22)" : "rgba(24,24,27,0.14)"}
                    strokeWidth="0.8"
                  />
                  <path
                    d="M 0 60 L 60 0"
                    stroke={isDark ? "rgba(244,244,245,0.14)" : "rgba(24,24,27,0.09)"}
                    strokeWidth="0.8"
                  />
                  <path
                    d="M 24 0 L 24 48"
                    stroke={isDark ? "rgba(244,244,245,0.08)" : "rgba(24,24,27,0.06)"}
                    strokeWidth="0.6"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hatchPatternBase)" />
            </svg>
          </div>

          {/* Hover overlay (turuncu, sadece imleç çevresinde) */}
          <div
            className={`absolute inset-0 transition-opacity duration-200 ${patternHot ? "opacity-100" : "opacity-0"}`}
            style={{
              WebkitMaskImage:
                "radial-gradient(240px circle at var(--str-hex-x) var(--str-hex-y), #000 0%, rgba(0,0,0,0.35) 35%, transparent 70%)",
              maskImage:
                "radial-gradient(240px circle at var(--str-hex-x) var(--str-hex-y), #000 0%, rgba(0,0,0,0.35) 35%, transparent 70%)",
            }}
          >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hatchPatternHot" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M -12 48 L 48 -12" stroke="rgba(249,115,22,0.55)" strokeWidth="0.9" />
                  <path d="M 0 60 L 60 0" stroke="rgba(249,115,22,0.35)" strokeWidth="0.9" />
                  <path d="M 24 0 L 24 48" stroke="rgba(249,115,22,0.18)" strokeWidth="0.7" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hatchPatternHot)" />
            </svg>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-500 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              {copy.heroBadge}
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${heading}`}>
              {copy.heroTitle}
              <br />
              <span className="text-orange-500">{copy.heroAccent}</span>
            </h1>
            
            <p className={`text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${desc}`}>
              {copy.heroDesc}
            </p>

            <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-orange-500/25">
              {copy.heroCta}
            </Link>
          </motion.div>
        </div>
      </section>
      <section id="how-it-works" className={`py-20 ${sectionAlt}`}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-orange-500 text-sm font-medium mb-2">{copy.howBadge}</p>
            <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>
              {copy.howTitle}<span className="text-orange-500">{copy.howAccent}</span>{copy.howSuffix}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500 text-black font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className={`font-semibold mb-1 ${heading}`}>{step.title}</h3>
                <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className={`py-20 ${sectionGradient}`}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${heading}`}>
              {copy.integrationsTitle}<span className="text-orange-500">{copy.integrationsAccent}</span>
            </h2>
            <p className={desc}>{copy.integrationsDesc}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrations.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${cardAlt} border rounded-xl p-6 hover:border-orange-500/30 transition-colors`}
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className={`font-semibold mb-2 ${heading}`}>{item.title}</h3>
                <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className={`py-20 ${sectionBase}`}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-orange-500 text-sm font-medium mb-2">{copy.featuresBadge}</p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${heading}`}>
              {copy.featuresTitle}<span className="text-orange-500">{copy.featuresAccent}</span>
            </h2>
            <p className={desc}>{copy.featuresDesc}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`${card} border rounded-xl p-5 hover:border-orange-500/30 transition-colors`}
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className={`font-semibold mb-1 ${heading}`}>{feature.title}</h3>
                <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-20 ${sectionAlt}`}>
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-orange-500 text-sm font-medium mb-2">{copy.faqBadge}</p>
            <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>{copy.faqTitle}</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`w-full flex items-center justify-between gap-4 p-5 rounded-xl text-left transition-all ${
                    openFaq === index
                      ? `${isDark ? "bg-zinc-900" : "bg-white"} border border-orange-500/30`
                      : `${isDark ? "bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700" : "bg-zinc-50 border border-black/10 hover:border-black/20"}`
                  }`}
                >
                  <span className={`font-medium ${heading}`}>{faq.q}</span>
                  <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    openFaq === index
                      ? "bg-orange-500 text-black"
                      : isDark
                        ? "bg-zinc-800 text-gray-400"
                        : "bg-zinc-200 text-zinc-700"
                  }`}>
                    {openFaq === index ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>
                {openFaq === index && (
                  <div className={`p-5 pt-0 text-sm ${isDark ? "text-gray-400" : "text-zinc-700"}`}>{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={`py-16 border-t ${sectionBase} ${isDark ? "border-zinc-800" : "border-black/10"}`}>
        <div className="container text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${heading}`}>
            {copy.ctaTitle}<span className="text-orange-500">{copy.ctaAccent}</span> hazır mısınız?
          </h2>
          <p className={`${desc} mb-8 max-w-xl mx-auto`}>{copy.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-full transition-all">
              {copy.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={withLocale("/")} className={`px-8 py-4 border font-semibold rounded-full transition-all ${isDark ? "border-zinc-700 text-white hover:bg-zinc-900" : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"}`}>
              {copy.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
