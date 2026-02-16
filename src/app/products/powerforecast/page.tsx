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
  LineChart,
  Brain,
  TrendingUp,
  Cloud,
  Cpu,
  BarChart3,
  Calendar,
  Target,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";


export default function PowerForecastPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { language } = useLanguage();
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();
  const withLocale = useLocaleHref();

  const copyByLang = {
    tr: {
      badge: "AI Destekli Tahminleme",
      title: "Enerji tüketimini",
      accent: "geleceği görün",
      desc: "PowerForecast yapay zeka ile enerji tüketimini tahmin eder. Yük dengeleme ve kapasite planlamasını optimize edin.",
      cta: "Demo Talep Edin",
      howTitle: "PowerForecast'i ",
      howAccent: "5 adımda",
      howSuffix: " başlatın",
      featuresTitle: "Tahminleme ",
      featuresAccent: "özellikleri",
      faqTitle: "SSS",
      ctaBottomTitle: "Enerji planlamanızı ",
      ctaBottomAccent: "güçlendirin",
      ctaBottomPrimary: "İletişime Geçin",
      ctaBottomSecondary: "Ana Sayfa",
      steps: [
        { num: 1, title: "Veri Toplama", desc: "Tarihsel verileri yükleriz" },
        { num: 2, title: "Model Eğitimi", desc: "AI modellerini eğitiriz" },
        { num: 3, title: "Validasyon", desc: "Tahmin doğruluğunu test ederiz" },
        { num: 4, title: "Entegrasyon", desc: "Sisteminize bağlarız" },
        { num: 5, title: "Tahminleme", desc: "7/24 tahmin servisi başlar" },
      ],
      integrations: [
        { icon: Brain, title: "Deep Learning", desc: "LSTM ve Transformer modelleri." },
        { icon: Cloud, title: "Weather API", desc: "Meteoroloji verisi entegrasyonu." },
        { icon: Cpu, title: "GPU Computing", desc: "Yüksek performanslı hesaplama." },
        { icon: BarChart3, title: "BI Tools", desc: "Power BI, Tableau entegrasyonu." },
      ],
      features: [
        { icon: LineChart, title: "Yük Tahmini", desc: "Saatlik, günlük, haftalık yük tahmini" },
        { icon: TrendingUp, title: "Tüketim Analizi", desc: "Müşteri segmentine göre analiz" },
        { icon: Calendar, title: "Sezonluk Modeller", desc: "Mevsimsel tüketim desenleri" },
        { icon: Target, title: "%95+ Doğruluk", desc: "Yüksek tahmin isabeti" },
        { icon: Brain, title: "Otomatik Öğrenme", desc: "Sürekli model iyileştirme" },
        { icon: Cloud, title: "Hava Durumu", desc: "Meteoroloji tabanlı düzeltme" },
      ],
      faqs: [
        { q: "Tahmin doğruluğu nasıl ölçülüyor?", a: "MAPE, RMSE ve MAE metrikleri ile sürekli izliyoruz. Ortalama MAPE değerimiz %3-5 aralığındadır." },
        { q: "Minimum veri gereksinimi nedir?", a: "İyi bir model için en az 2 yıllık saatlik veri öneriyoruz, ancak 6 aylık veri ile de başlayabilirsiniz." },
        { q: "Real-time tahmin mümkün mü?", a: "Evet, Enterprise pakette dakika bazında güncellenen tahminler sunuyoruz." },
      ],
    },
    en: {
      badge: "AI‑Powered Forecasting",
      title: "See energy demand",
      accent: "before it happens",
      desc: "PowerForecast predicts energy consumption with AI. Optimize load balancing and capacity planning.",
      cta: "Request Demo",
      howTitle: "Launch PowerForecast in ",
      howAccent: "5 steps",
      howSuffix: "",
      featuresTitle: "Forecasting ",
      featuresAccent: "capabilities",
      faqTitle: "FAQ",
      ctaBottomTitle: "Strengthen your ",
      ctaBottomAccent: "energy planning",
      ctaBottomPrimary: "Contact Us",
      ctaBottomSecondary: "Home",
      steps: [
        { num: 1, title: "Data Collection", desc: "We ingest historical data" },
        { num: 2, title: "Model Training", desc: "We train AI models" },
        { num: 3, title: "Validation", desc: "We validate forecast accuracy" },
        { num: 4, title: "Integration", desc: "We connect to your systems" },
        { num: 5, title: "Forecasting", desc: "24/7 forecasting service" },
      ],
      integrations: [
        { icon: Brain, title: "Deep Learning", desc: "LSTM and Transformer models." },
        { icon: Cloud, title: "Weather API", desc: "Weather data integration." },
        { icon: Cpu, title: "GPU Computing", desc: "High‑performance computation." },
        { icon: BarChart3, title: "BI Tools", desc: "Power BI, Tableau integration." },
      ],
      features: [
        { icon: LineChart, title: "Load Forecast", desc: "Hourly, daily, weekly forecasts" },
        { icon: TrendingUp, title: "Consumption Analysis", desc: "Segment‑based analysis" },
        { icon: Calendar, title: "Seasonal Models", desc: "Seasonal patterns" },
        { icon: Target, title: "95%+ Accuracy", desc: "High forecast precision" },
        { icon: Brain, title: "Auto‑Learning", desc: "Continuous model improvement" },
        { icon: Cloud, title: "Weather Inputs", desc: "Weather‑based adjustments" },
      ],
      faqs: [
        { q: "How is accuracy measured?", a: "We monitor MAPE, RMSE, and MAE. Typical MAPE is 3–5%." },
        { q: "Minimum data requirement?", a: "We recommend 2 years of hourly data, but 6 months can work to start." },
        { q: "Is real‑time forecasting possible?", a: "Yes. Enterprise plans offer minute‑level updates." },
      ],
    },
    ru: {
      badge: "Прогнозирование с ИИ",
      title: "Увидьте спрос",
      accent: "заранее",
      desc: "PowerForecast прогнозирует потребление энергии с ИИ. Оптимизируйте баланс и планирование мощности.",
      cta: "Запросить демо",
      howTitle: "Запустите PowerForecast за ",
      howAccent: "5 шагов",
      howSuffix: "",
      featuresTitle: "Прогнозные ",
      featuresAccent: "возможности",
      faqTitle: "FAQ",
      ctaBottomTitle: "Укрепите ",
      ctaBottomAccent: "планирование",
      ctaBottomPrimary: "Связаться",
      ctaBottomSecondary: "Главная",
      steps: [
        { num: 1, title: "Сбор данных", desc: "Загружаем историю" },
        { num: 2, title: "Обучение моделей", desc: "Обучаем модели ИИ" },
        { num: 3, title: "Валидация", desc: "Проверяем точность" },
        { num: 4, title: "Интеграция", desc: "Подключаем к системе" },
        { num: 5, title: "Прогнозирование", desc: "Круглосуточный сервис" },
      ],
      integrations: [
        { icon: Brain, title: "Deep Learning", desc: "Модели LSTM и Transformer." },
        { icon: Cloud, title: "Weather API", desc: "Интеграция погодных данных." },
        { icon: Cpu, title: "GPU Computing", desc: "Высокопроизводительные вычисления." },
        { icon: BarChart3, title: "BI Tools", desc: "Интеграция Power BI, Tableau." },
      ],
      features: [
        { icon: LineChart, title: "Прогноз нагрузки", desc: "Часовые, дневные, недельные прогнозы" },
        { icon: TrendingUp, title: "Анализ потребления", desc: "Анализ по сегментам" },
        { icon: Calendar, title: "Сезонные модели", desc: "Сезонные паттерны" },
        { icon: Target, title: "95%+ точность", desc: "Высокая точность прогнозов" },
        { icon: Brain, title: "Самообучение", desc: "Постоянное улучшение моделей" },
        { icon: Cloud, title: "Погода", desc: "Корректировки по погоде" },
      ],
      faqs: [
        { q: "Как измеряется точность?", a: "Мы отслеживаем MAPE, RMSE и MAE. Средний MAPE 3–5%." },
        { q: "Минимальные требования к данным?", a: "Рекомендуем 2 года почасовых данных, но можно начать с 6 месяцев." },
        { q: "Возможен ли real‑time прогноз?", a: "Да. В Enterprise планы входят обновления по минутам." },
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
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(168,85,247,0.20),transparent,rgba(59,130,246,0.20))]" />
        </div>
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="diagonal" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              {copy.badge}
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${heading}`}>
              {copy.title}
              <br /><span className="text-purple-400">{copy.accent}</span>
            </h1>
            <p className={`text-lg mb-10 max-w-2xl mx-auto ${desc}`}>
              {copy.desc}
            </p>
            <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-full">{copy.cta}</Link>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className={`py-20 ${sectionAlt}`}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>{copy.howTitle}<span className="text-purple-400">{copy.howAccent}</span>{copy.howSuffix}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{step.num}</div>
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
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`${cardAlt} border rounded-xl p-6 hover:border-purple-500/30`}>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4"><item.icon className="w-5 h-5 text-purple-400" /></div>
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
            <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>{copy.featuresTitle}<span className="text-purple-400">{copy.featuresAccent}</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`${card} border rounded-xl p-5 hover:border-purple-500/30`}>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3"><f.icon className="w-5 h-5 text-purple-400" /></div>
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
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className={`w-full flex items-center justify-between gap-4 p-5 rounded-xl text-left border ${openFaq === i ? `${isDark ? "bg-zinc-900" : "bg-white"} border-purple-500/30` : `${isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-50 border-black/10"}`}`}>
                  <span className={`font-medium ${heading}`}>{faq.q}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${openFaq === i ? "bg-purple-500" : isDark ? "bg-zinc-800" : "bg-zinc-200"}`}>{openFaq === i ? <Minus className="w-3 h-3 text-white" /> : <Plus className={`w-3 h-3 ${isDark ? "text-gray-400" : "text-zinc-700"}`} />}</div>
                </button>
                {openFaq === i && <div className={`p-5 pt-0 text-sm ${isDark ? "text-gray-400" : "text-zinc-700"}`}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-16 border-t ${sectionBase} ${isDark ? "border-zinc-800" : "border-black/10"}`}>
        <div className="container text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${heading}`}>{copy.ctaBottomTitle}<span className="text-purple-400">{copy.ctaBottomAccent}</span></h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-full">{copy.ctaBottomPrimary} <ArrowRight className="w-4 h-4" /></Link>
            <Link href={withLocale("/")} className={`px-8 py-4 border font-semibold rounded-full ${isDark ? "border-zinc-700 text-white hover:bg-zinc-900" : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"}`}>{copy.ctaBottomSecondary}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
