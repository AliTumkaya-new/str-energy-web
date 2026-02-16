"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useTheme } from "@/context/ThemeContext";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useLocaleHref } from "@/lib/useLocaleHref";
import { useLanguage } from "@/context/LanguageContext";
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Database,
  Cpu,
  Zap,
  Bell,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";


export default function GridAnalyticsPage() {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();
  const withLocale = useLocaleHref();

  const copyByLang = {
    tr: {
      badge: "Büyük Veri Analitiği",
      title: "Şebeke verilerinizi",
      accent: "anlamlı içgörülere",
      desc: "GridAnalytics ile petabayt ölçeğinde veri işleyin, yapay zeka ile analiz edin ve operasyonlarınızı optimize edin.",
      cta: "Demo Talep Edin",
      howTitle: "GridAnalytics'i ",
      howAccent: "5 adımda",
      howSuffix: " başlatın",
      featuresTitle: "Analitik ",
      featuresAccent: "özellikleri",
      faqTitle: "SSS",
      ctaBottomTitle: "Verilerinizi ",
      ctaBottomAccent: "değere",
      ctaBottomPrimary: "İletişime Geçin",
      ctaBottomSecondary: "Ana Sayfa",
      steps: [
        { num: 1, title: "Veri Bağlantısı", desc: "Şebeke verilerinizi bağlarız" },
        { num: 2, title: "AI Modelleme", desc: "Yapay zeka modellerini eğitiriz" },
        { num: 3, title: "Dashboard", desc: "Analitik panelini kurarız" },
        { num: 4, title: "Tahminleme", desc: "Predictive analytics başlar" },
        { num: 5, title: "Optimizasyon", desc: "Sürekli iyileştirme döngüsü" },
      ],
      integrations: [
        { icon: Database, title: "Big Data", desc: "Petabayt ölçeğinde veri işleme kapasitesi." },
        { icon: Cpu, title: "Machine Learning", desc: "Özel eğitilmiş ML modelleri." },
        { icon: Zap, title: "Real-time", desc: "Anlık veri akışı ve analiz." },
        { icon: LineChart, title: "Visualization", desc: "İnteraktif görselleştirme araçları." },
      ],
      features: [
        { icon: BarChart3, title: "Şebeke Analizi", desc: "Tüm şebeke verilerini tek ekranda" },
        { icon: TrendingUp, title: "Trend Analizi", desc: "Geçmiş verilere dayalı trend tespiti" },
        { icon: PieChart, title: "Kayıp Analizi", desc: "Teknik ve ticari kayıp hesaplama" },
        { icon: Bell, title: "Anomali Tespiti", desc: "AI destekli anormallik algılama" },
        { icon: LineChart, title: "Tahminleme", desc: "Yük ve tüketim tahminleri" },
        { icon: Database, title: "Veri Ambarı", desc: "Merkezi veri depolama" },
      ],
      faqs: [
        { q: "Hangi veri kaynaklarını destekliyorsunuz?", a: "SCADA, AMI, DMS, OMS ve tüm standart enerji protokollerini destekliyoruz." },
        { q: "ML modelleri ne kadar sürede eğitiliyor?", a: "Veri kalitesine bağlı olarak 2-4 hafta içinde ilk modeller hazır olur." },
        { q: "Real-time analiz gecikme süresi nedir?", a: "Ortalama 100ms altında gecikme ile gerçek zamanlı analiz sağlıyoruz." },
      ],
    },
    en: {
      badge: "Big Data Analytics",
      title: "Turn your grid data",
      accent: "into insights",
      desc: "Process petabyte-scale data, analyze with AI, and optimize operations with GridAnalytics.",
      cta: "Request Demo",
      howTitle: "Launch GridAnalytics in ",
      howAccent: "5 steps",
      howSuffix: "",
      featuresTitle: "Analytics ",
      featuresAccent: "features",
      faqTitle: "FAQ",
      ctaBottomTitle: "Turn your data into ",
      ctaBottomAccent: "value",
      ctaBottomPrimary: "Contact Us",
      ctaBottomSecondary: "Home",
      steps: [
        { num: 1, title: "Data Connection", desc: "We connect your grid data" },
        { num: 2, title: "AI Modeling", desc: "We train AI models" },
        { num: 3, title: "Dashboard", desc: "We set up analytics dashboards" },
        { num: 4, title: "Forecasting", desc: "Predictive analytics starts" },
        { num: 5, title: "Optimization", desc: "Continuous improvement loop" },
      ],
      integrations: [
        { icon: Database, title: "Big Data", desc: "Petabyte-scale data processing." },
        { icon: Cpu, title: "Machine Learning", desc: "Custom-trained ML models." },
        { icon: Zap, title: "Real-time", desc: "Live data streams and analytics." },
        { icon: LineChart, title: "Visualization", desc: "Interactive visualization tools." },
      ],
      features: [
        { icon: BarChart3, title: "Grid Analysis", desc: "All grid data in one view" },
        { icon: TrendingUp, title: "Trend Analysis", desc: "Detect trends from historical data" },
        { icon: PieChart, title: "Loss Analysis", desc: "Technical and commercial loss calculation" },
        { icon: Bell, title: "Anomaly Detection", desc: "AI-powered anomaly detection" },
        { icon: LineChart, title: "Forecasting", desc: "Load and consumption forecasts" },
        { icon: Database, title: "Data Warehouse", desc: "Centralized data storage" },
      ],
      faqs: [
        { q: "Which data sources do you support?", a: "We support SCADA, AMI, DMS, OMS, and all standard energy protocols." },
        { q: "How long does ML training take?", a: "Depending on data quality, initial models are ready in 2–4 weeks." },
        { q: "What is real-time latency?", a: "We deliver real-time analytics with average latency under 100ms." },
      ],
    },
    ru: {
      badge: "Аналитика больших данных",
      title: "Превратите данные сети",
      accent: "в инсайты",
      desc: "Обрабатывайте данные в масштабах петабайт, анализируйте с ИИ и оптимизируйте операции с GridAnalytics.",
      cta: "Запросить демо",
      howTitle: "Запустите GridAnalytics за ",
      howAccent: "5 шагов",
      howSuffix: "",
      featuresTitle: "Аналитические ",
      featuresAccent: "возможности",
      faqTitle: "FAQ",
      ctaBottomTitle: "Превратите данные в ",
      ctaBottomAccent: "ценность",
      ctaBottomPrimary: "Связаться",
      ctaBottomSecondary: "Главная",
      steps: [
        { num: 1, title: "Подключение данных", desc: "Подключаем данные сети" },
        { num: 2, title: "ИИ‑модели", desc: "Обучаем модели ИИ" },
        { num: 3, title: "Dashboard", desc: "Настраиваем аналитическую панель" },
        { num: 4, title: "Прогнозирование", desc: "Запуск predictive analytics" },
        { num: 5, title: "Оптимизация", desc: "Цикл непрерывных улучшений" },
      ],
      integrations: [
        { icon: Database, title: "Big Data", desc: "Обработка данных в масштабах петабайт." },
        { icon: Cpu, title: "Machine Learning", desc: "Индивидуально обученные ML‑модели." },
        { icon: Zap, title: "Real-time", desc: "Потоки данных и аналитика в реальном времени." },
        { icon: LineChart, title: "Visualization", desc: "Интерактивные инструменты визуализации." },
      ],
      features: [
        { icon: BarChart3, title: "Анализ сети", desc: "Все данные сети на одном экране" },
        { icon: TrendingUp, title: "Тренды", desc: "Выявление трендов по истории" },
        { icon: PieChart, title: "Анализ потерь", desc: "Расчет технических и коммерческих потерь" },
        { icon: Bell, title: "Поиск аномалий", desc: "ИИ‑детекция аномалий" },
        { icon: LineChart, title: "Прогнозирование", desc: "Прогнозы нагрузки и потребления" },
        { icon: Database, title: "Хранилище данных", desc: "Централизованное хранение" },
      ],
      faqs: [
        { q: "Какие источники данных поддерживаются?", a: "SCADA, AMI, DMS, OMS и стандартные энергетические протоколы." },
        { q: "Сколько длится обучение ML?", a: "В зависимости от качества данных — 2–4 недели." },
        { q: "Какова задержка в реальном времени?", a: "Средняя задержка ниже 100 мс." },
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
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="grid" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              {copy.badge}
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${heading}`}>
              {copy.title}
              <br /><span className="text-blue-400">{copy.accent}</span>
            </h1>
            <p className={`text-lg mb-10 max-w-2xl mx-auto ${desc}`}>
              {copy.desc}
            </p>
            <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full">{copy.cta}</Link>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className={`py-20 ${sectionAlt}`}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>{copy.howTitle}<span className="text-blue-400">{copy.howAccent}</span>{copy.howSuffix}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{step.num}</div>
                <h3 className={`font-semibold mb-1 ${heading}`}>{step.title}</h3>
                <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-20 ${sectionGradient}`}>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrations.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`${cardAlt} border rounded-xl p-6 hover:border-blue-500/30`}>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4"><item.icon className="w-5 h-5 text-blue-400" /></div>
                <h3 className={`font-semibold mb-2 ${heading}`}>{item.title}</h3>
                <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className={`py-20 ${sectionBase}`}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>{copy.featuresTitle}<span className="text-blue-400">{copy.featuresAccent}</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`${card} border rounded-xl p-5 hover:border-blue-500/30`}>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3"><f.icon className="w-5 h-5 text-blue-400" /></div>
                <h3 className={`font-semibold mb-1 ${heading}`}>{f.title}</h3>
                <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className={`py-20 ${sectionAlt}`}>
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${heading}`}>{copy.faqTitle}</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className={`w-full flex items-center justify-between gap-4 p-5 rounded-xl text-left border ${openFaq === i ? `${isDark ? "bg-zinc-900" : "bg-white"} border-blue-500/30` : `${isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-50 border-black/10"}`}`}>
                  <span className={`font-medium ${heading}`}>{faq.q}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${openFaq === i ? "bg-blue-500" : isDark ? "bg-zinc-800" : "bg-zinc-200"}`}>{openFaq === i ? <Minus className="w-3 h-3 text-white" /> : <Plus className={`w-3 h-3 ${isDark ? "text-gray-400" : "text-zinc-700"}`} />}</div>
                </button>
                {openFaq === i && <div className={`p-5 pt-0 text-sm ${isDark ? "text-gray-400" : "text-zinc-700"}`}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-16 border-t ${sectionBase} ${isDark ? "border-zinc-800" : "border-black/10"}`}>
        <div className="container text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${heading}`}>{copy.ctaBottomTitle}<span className="text-blue-400">{copy.ctaBottomAccent}</span></h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full">{copy.ctaBottomPrimary} <ArrowRight className="w-4 h-4" /></Link>
            <Link href={withLocale("/")} className={`px-8 py-4 border font-semibold rounded-full ${isDark ? "border-zinc-700 text-white hover:bg-zinc-900" : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"}`}>{copy.ctaBottomSecondary}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
