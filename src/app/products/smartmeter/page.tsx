"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useLocaleHref } from "@/lib/useLocaleHref";
import { Cpu, Gauge, Radio, Database, Wifi, BarChart3, Settings, Activity, ArrowRight, Minus, Plus } from "lucide-react";

export default function SmartMeterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { language } = useLanguage();
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();
  const withLocale = useLocaleHref();

  const copyByLang = {
    tr: {
      badge: "Akıllı Sayaç Yönetimi",
      title: "Milyonlarca sayacı",
      accent: "tek noktadan",
      desc: "SmartMeter Hub ile AMI/AMR sistemlerinizi entegre edin.",
      cta: "Demo Talep Edin",
      howTitle: "SmartMeter Hub'ı ",
      howAccent: "5 adımda",
      howSuffix: " başlatın",
      featuresTitle: "Sayaç yönetim ",
      featuresAccent: "özellikleri",
      faqTitle: "SSS",
      ctaBottomTitle: "Sayaç yönetimini ",
      ctaBottomAccent: "modernleştirin",
      ctaBottomPrimary: "İletişime Geçin",
      ctaBottomSecondary: "Ana Sayfa",
      steps: [
        { num: 1, title: "Sayaç Bağlantısı", desc: "Akıllı sayaçları entegre ederiz" },
        { num: 2, title: "Gateway Kurulum", desc: "IoT gateway yapılandırırız" },
        { num: 3, title: "Veri Akışı", desc: "Gerçek zamanlı veri toplama" },
        { num: 4, title: "Dashboard", desc: "İzleme panelini kurarız" },
        { num: 5, title: "Analitik", desc: "Veri analizi ve raporlama" },
      ],
      integrations: [
        { icon: Radio, title: "AMI/AMR", desc: "Tüm sayaç protokolleri." },
        { icon: Wifi, title: "LoRaWAN", desc: "Düşük güç geniş alan ağları." },
        { icon: Database, title: "MDM", desc: "Sayaç veri yönetimi." },
        { icon: Activity, title: "DLMS/COSEM", desc: "Standart protokoller." },
      ],
      features: [
        { icon: Cpu, title: "Sayaç Yönetimi", desc: "Milyonlarca sayacı yönetin" },
        { icon: Gauge, title: "Okuma Planı", desc: "Otomatik okuma programları" },
        { icon: BarChart3, title: "Tüketim Analizi", desc: "Müşteri bazında analiz" },
        { icon: Settings, title: "Uzaktan Kontrol", desc: "Kesme/bağlama" },
        { icon: Activity, title: "Kayıp Tespiti", desc: "Kaçak algılama" },
        { icon: Database, title: "Veri Validasyon", desc: "Otomatik doğrulama" },
      ],
      faqs: [
        { q: "Hangi sayaç markaları destekleniyor?", a: "Landis+Gyr, Itron, Elster, Kamstrup ve diğer tüm major markalar." },
        { q: "Gateway başına kaç sayaç?", a: "Gateway modeline göre 1,000-10,000 sayaç." },
        { q: "Veri kaybı olursa?", a: "Store and forward ile veri kaybı yaşanmaz." },
      ],
    },
    en: {
      badge: "Smart Meter Management",
      title: "Manage millions of meters",
      accent: "from one place",
      desc: "Integrate your AMI/AMR systems with SmartMeter Hub.",
      cta: "Request Demo",
      howTitle: "Launch SmartMeter Hub in ",
      howAccent: "5 steps",
      howSuffix: "",
      featuresTitle: "Meter management ",
      featuresAccent: "capabilities",
      faqTitle: "FAQ",
      ctaBottomTitle: "Modernize meter management ",
      ctaBottomAccent: "today",
      ctaBottomPrimary: "Contact Us",
      ctaBottomSecondary: "Home",
      steps: [
        { num: 1, title: "Meter Connection", desc: "We integrate smart meters" },
        { num: 2, title: "Gateway Setup", desc: "We configure IoT gateways" },
        { num: 3, title: "Data Streaming", desc: "Real‑time data collection" },
        { num: 4, title: "Dashboard", desc: "We set up monitoring" },
        { num: 5, title: "Analytics", desc: "Reporting and insights" },
      ],
      integrations: [
        { icon: Radio, title: "AMI/AMR", desc: "All meter protocols." },
        { icon: Wifi, title: "LoRaWAN", desc: "Low‑power wide‑area networks." },
        { icon: Database, title: "MDM", desc: "Meter data management." },
        { icon: Activity, title: "DLMS/COSEM", desc: "Standard protocols." },
      ],
      features: [
        { icon: Cpu, title: "Meter Management", desc: "Manage millions of meters" },
        { icon: Gauge, title: "Reading Schedules", desc: "Automated reading plans" },
        { icon: BarChart3, title: "Consumption Analytics", desc: "Customer‑level analysis" },
        { icon: Settings, title: "Remote Control", desc: "Connect/disconnect" },
        { icon: Activity, title: "Loss Detection", desc: "Theft detection" },
        { icon: Database, title: "Data Validation", desc: "Automated validation" },
      ],
      faqs: [
        { q: "Which meter brands are supported?", a: "Landis+Gyr, Itron, Elster, Kamstrup and other major brands." },
        { q: "Meters per gateway?", a: "Depending on model: 1,000–10,000 meters." },
        { q: "What if data is lost?", a: "Store‑and‑forward prevents data loss." },
      ],
    },
    ru: {
      badge: "Управление умными счетчиками",
      title: "Управляйте миллионами счетчиков",
      accent: "из одной точки",
      desc: "Интегрируйте AMI/AMR системы с SmartMeter Hub.",
      cta: "Запросить демо",
      howTitle: "Запустите SmartMeter Hub за ",
      howAccent: "5 шагов",
      howSuffix: "",
      featuresTitle: "Возможности ",
      featuresAccent: "управления",
      faqTitle: "FAQ",
      ctaBottomTitle: "Модернизируйте управление ",
      ctaBottomAccent: "сегодня",
      ctaBottomPrimary: "Связаться",
      ctaBottomSecondary: "Главная",
      steps: [
        { num: 1, title: "Подключение счетчиков", desc: "Интегрируем умные счетчики" },
        { num: 2, title: "Настройка gateway", desc: "Настраиваем IoT‑шлюзы" },
        { num: 3, title: "Поток данных", desc: "Сбор данных в реальном времени" },
        { num: 4, title: "Dashboard", desc: "Настраиваем мониторинг" },
        { num: 5, title: "Аналитика", desc: "Отчеты и аналитика" },
      ],
      integrations: [
        { icon: Radio, title: "AMI/AMR", desc: "Все протоколы счетчиков." },
        { icon: Wifi, title: "LoRaWAN", desc: "LPWAN сети." },
        { icon: Database, title: "MDM", desc: "Управление данными счетчиков." },
        { icon: Activity, title: "DLMS/COSEM", desc: "Стандартные протоколы." },
      ],
      features: [
        { icon: Cpu, title: "Управление счетчиками", desc: "Управляйте миллионами устройств" },
        { icon: Gauge, title: "План чтения", desc: "Автоматические расписания" },
        { icon: BarChart3, title: "Анализ потребления", desc: "Анализ по клиентам" },
        { icon: Settings, title: "Удаленное управление", desc: "Отключение/подключение" },
        { icon: Activity, title: "Выявление потерь", desc: "Обнаружение хищений" },
        { icon: Database, title: "Валидация данных", desc: "Автопроверка" },
      ],
      faqs: [
        { q: "Какие марки счетчиков поддерживаются?", a: "Landis+Gyr, Itron, Elster, Kamstrup и другие ведущие бренды." },
        { q: "Сколько счетчиков на gateway?", a: "В зависимости от модели: 1 000–10 000 счетчиков." },
        { q: "Что если данные потеряются?", a: "Store‑and‑forward предотвращает потерю данных." },
      ],
    },
  } as const;

  const copy = copyByLang[language] ?? copyByLang.tr;
  const steps = copy.steps;
  const integrations = copy.integrations;
  const features = copy.features;
  const faqs = copy.faqs;

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
  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Header variant="floating" />
      <section
        ref={heroRef}
        onPointerEnter={onHeroPointerEnter}
        onPointerLeave={onHeroPointerLeave}
        onPointerMove={onHeroPointerMove}
        className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%]"
      >
        <div className="absolute inset-0 opacity-20 bg-linear-to-br from-teal-500/20 to-cyan-500/10" />
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="ticks" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm mb-6"><Cpu className="w-4 h-4" />{copy.badge}</div>
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${heading}`}>{copy.title}<br /><span className="text-teal-400">{copy.accent}</span></h1>
            <p className={`text-lg mb-10 max-w-2xl mx-auto ${desc}`}>{copy.desc}</p>
            <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 text-white font-semibold rounded-full">{copy.cta}</Link>
          </motion.div>
        </div>
      </section>
      <section id="how-it-works" className={`py-20 ${sectionAlt}`}>
        <div className="container text-center mb-12"><h2 className={`text-3xl font-bold ${heading}`}>{copy.howTitle}<span className="text-teal-400">{copy.howAccent}</span>{copy.howSuffix}</h2></div>
        <div className="container grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center mx-auto mb-4">{s.num}</div>
              <h3 className={`font-semibold mb-1 ${heading}`}>{s.title}</h3>
              <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className={`py-20 ${sectionGradient}`}>
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`${cardAlt} border rounded-xl p-6 hover:border-teal-500/30`}>
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4"><item.icon className="w-5 h-5 text-teal-400" /></div>
              <h3 className={`font-semibold mb-2 ${heading}`}>{item.title}</h3>
              <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="features" className={`py-20 ${sectionBase}`}>
        <div className="container text-center mb-12"><h2 className={`text-3xl font-bold ${heading}`}>{copy.featuresTitle}<span className="text-teal-400">{copy.featuresAccent}</span></h2></div>
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`${card} border rounded-xl p-5 hover:border-teal-500/30`}>
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3"><f.icon className="w-5 h-5 text-teal-400" /></div>
              <h3 className={`font-semibold mb-1 ${heading}`}>{f.title}</h3>
              <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="faq" className={`py-20 ${sectionAlt}`}>
        <div className="container max-w-3xl text-center mb-12"><h2 className={`text-3xl font-bold ${heading}`}>{copy.faqTitle}</h2></div>
        <div className="container max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className={`w-full flex items-center justify-between p-5 rounded-xl text-left border ${openFaq === i ? `${isDark ? "bg-zinc-900" : "bg-white"} border-teal-500/30` : `${isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-50 border-black/10"}`}`}>
                <span className={heading}>{faq.q}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${openFaq === i ? "bg-teal-500" : isDark ? "bg-zinc-800" : "bg-zinc-200"}`}>{openFaq === i ? <Minus className="w-3 h-3 text-white" /> : <Plus className={`w-3 h-3 ${isDark ? "text-gray-400" : "text-zinc-700"}`} />}</div>
              </button>
              {openFaq === i && <div className={`p-5 pt-0 text-sm ${isDark ? "text-gray-400" : "text-zinc-700"}`}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
      <section className={`py-16 border-t text-center ${sectionBase} ${isDark ? "border-zinc-800" : "border-black/10"}`}>
        <h2 className={`text-2xl font-bold mb-4 ${heading}`}>{copy.ctaBottomTitle}<span className="text-teal-400">{copy.ctaBottomAccent}</span></h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 text-white font-semibold rounded-full">{copy.ctaBottomPrimary} <ArrowRight className="w-4 h-4" /></Link>
          <Link href={withLocale("/")} className={`px-8 py-4 border font-semibold rounded-full ${isDark ? "border-zinc-700 text-white hover:bg-zinc-900" : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"}`}>{copy.ctaBottomSecondary}</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
