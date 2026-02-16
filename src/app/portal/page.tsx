"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useLocaleHref } from "@/lib/useLocaleHref";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Check,
  Database,
  Lock,
  Mail,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Shield,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

type Plan = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
};

const copyByLang = {
  tr: {
    heroBadge: "Enerji operasyonları için tek kontrol merkezi",
    heroTitle: "Şebeke ve tesis verilerini",
    heroAccent: "tek platformda",
    heroTitleSuffix: "izleyin ve optimize edin",
    heroDesc: "SCADA, AMI ve saha verilerini birleştirin. Gerçek zamanlı izleme, kayıp analizi ve alarm yönetimiyle operasyonel verimliliği artırın.",
    heroPrimary: "Demo talep et",
    heroSecondary: "Nasıl çalışır",
    kpis: [
      { label: "Kurulum", value: "1–3 hafta" },
      { label: "Uptime", value: "99.9%" },
      { label: "Alarm süresi", value: "<1 dk" },
      { label: "Kayıp oranı", value: "-%12" },
    ],
    howBadge: "Nasıl çalışır",
    howTitle: "5 adımda canlıya alın",
    howDesc: "Veri kaynaklarını bağlayın, panelleri kurun, alarmları tanımlayın.",
    steps: [
      { num: 1, title: "Veri bağlantısı", desc: "SCADA, AMI, DMS ve OMS kaynaklarını bağlarız." },
      { num: 2, title: "Modelleme", desc: "İş kuralları, KPI ve alarm eşiklerini tanımlarız." },
      { num: 3, title: "Dashboard", desc: "Operasyon panelini kurar ve özelleştiririz." },
      { num: 4, title: "Alarm yönetimi", desc: "Anomali ve kesinti alarmlarını devreye alırız." },
      { num: 5, title: "Optimizasyon", desc: "Sürekli iyileştirme ve kayıp azaltma döngüsü." },
    ],
    integrationsBadge: "Entegrasyonlar",
    integrationsTitle: "Tüm enerji kaynaklarınız",
    integrationsAccent: "tek yerde",
    integrationsDesc: "Saha, şebeke ve sayaç verilerini tek hat üzerinde birleştirin.",
    integrations: [
      { icon: Database, title: "SCADA", desc: "Gerçek zamanlı izleme ve kontrol verileri." },
      { icon: BarChart3, title: "DMS / OMS", desc: "Arıza ve kesinti yönetimi entegrasyonu." },
      { icon: Bell, title: "AMI / AMR", desc: "Sayaç okuma ve tüketim verileri." },
      { icon: Workflow, title: "GIS / IoT", desc: "Saha varlıkları ve sensör verisi." },
    ],
    featuresBadge: "Özellikler",
    featuresTitle: "Enerji operasyonları için",
    featuresAccent: "tam görünürlük",
    featuresDesc: "İzleme, analitik, alarm ve optimizasyon tek platformda.",
    features: [
      { icon: BarChart3, title: "Şebeke Analizi", desc: "Teknik ve ticari kayıp analizleri." },
      { icon: Bell, title: "Alarm Yönetimi", desc: "Kesinti, arıza ve anomali bildirimleri." },
      { icon: Bot, title: "Tahminleme", desc: "Yük ve tüketim tahminleriyle planlama." },
      { icon: Workflow, title: "Operasyon Akışı", desc: "Onay, müdahale ve iş emri süreçleri." },
      { icon: Users, title: "Rol Bazlı Erişim", desc: "RBAC ile güvenli yetkilendirme." },
      { icon: Shield, title: "Veri Güvenliği", desc: "Şifreleme, audit log ve yedekleme." },
    ],
    previewLabel: "Önizleme",
    trustBadge: "Güvenilir enerji operasyonları",
    trustTitleLine1: "Kesintileri azaltın,",
    trustTitleLine2: "kayıpları görün",
    trustDesc: "Tek bir kaynak gerçekliğe bağlanın: şebeke, sayaç, tesis ve saha verisi.",
    trustCards: [
      { icon: Lock, title: "Siber Güvenlik", desc: "Şifreleme, RBAC ve audit log" },
      { icon: Workflow, title: "Süreç Otomasyonu", desc: "Tetikleyiciler + standart akışlar" },
      { icon: Users, title: "Ekip Koordinasyonu", desc: "Görevler + müdahale takibi" },
      { icon: Shield, title: "Veri Bütünlüğü", desc: "Kalite kontrol + yedekleme" },
    ],
    dashboardLabel: "Örnek operasyon paneli",
    dashboardTitle: "Bugün",
    dashboardKpis: [
      { label: "Aktif trafo", value: "128" },
      { label: "Anomali", value: "7" },
      { label: "Kesinti", value: "2" },
      { label: "Talep tahmini", value: "+3.1%" },
    ],
    activityTitle: "Aktivite",
    activityItems: [
      { label: "Alarm: gerilim düşümü", time: "1 dk" },
      { label: "İş emri: saha kontrolü", time: "12 dk" },
      { label: "Rapor: kayıp analizi", time: "1 sa" },
    ],
    pricingBadge: "Fiyatlandırma",
    pricingTitle: "Takımınıza uygun plan",
    pricingDesc: "Basit planlar, hızlı başlangıç. Detaylar için demo isteyin.",
    pricingHighlight: "Önerilen",
    pricingPeriod: "/ ay",
    pricingCta: "Teklif al",
    plans: [
      {
        name: "Starter",
        price: "₺0",
        tagline: "Küçük ekipler için başlangıç",
        features: ["3 kullanıcı", "1 pipeline", "Temel otomasyon", "Standart raporlar"],
      },
      {
        name: "Plus",
        price: "₺990",
        tagline: "Büyüyen ekipler için",
        features: ["10 kullanıcı", "6 pipeline", "Gelişmiş otomasyon", "Entegrasyonlar"],
        highlight: true,
      },
      {
        name: "Pro",
        price: "₺2.490",
        tagline: "Kurumsal süreçler için",
        features: ["Sınırsız pipeline", "SLA kontrolü", "Audit log", "Özel roller"],
      },
    ] as Plan[],
    faqBadge: "SSS",
    faqTitle: "Satın almadan önce",
    faqDesc: "Sık gelen soruların kısa yanıtları.",
    faqs: [
      { q: "Kurulum ne kadar sürer?", a: "Tipik olarak 1–3 gün: pipeline, kanallar ve ekip eğitimi." },
      { q: "Birden fazla kanal bağlanabilir mi?", a: "Evet. Birden fazla kanal/hesap tek şirkete bağlanabilir." },
      { q: "Kredi kartı gerekiyor mu?", a: "Hayır. Demo ve deneme süreci kart olmadan başlatılabilir." },
      { q: "Destek ve eğitim var mı?", a: "Evet. Kurulum, veri aktarımı ve ekip eğitimi için destek sağlanır." },
    ],
    ctaTitle: "Süreçlerinizi bugün iyileştirin",
    ctaDesc: "Demo alarak senaryonuza göre net bir yol haritası çıkaralım.",
    ctaPrimary: "Demo talep et",
    ctaSecondary: "Ürünleri gör",
  },
  en: {
    heroBadge: "One control center for energy operations",
    heroTitle: "Unify grid and facility data",
    heroAccent: "in one platform",
    heroTitleSuffix: "to monitor and optimize",
    heroDesc: "Connect SCADA, AMI, and field data. Improve efficiency with real-time monitoring, loss analysis, and alarm management.",
    heroPrimary: "Request demo",
    heroSecondary: "How it works",
    kpis: [
      { label: "Setup", value: "1–3 weeks" },
      { label: "Uptime", value: "99.9%" },
      { label: "Alarm latency", value: "<1 min" },
      { label: "Loss rate", value: "-12%" },
    ],
    howBadge: "How it works",
    howTitle: "Go live in 5 steps",
    howDesc: "Connect data sources, configure dashboards, and enable alarms.",
    steps: [
      { num: 1, title: "Data connection", desc: "Connect SCADA, AMI, DMS, and OMS sources." },
      { num: 2, title: "Modeling", desc: "Define rules, KPIs, and alarm thresholds." },
      { num: 3, title: "Dashboard", desc: "Set up and customize the operations view." },
      { num: 4, title: "Alarm management", desc: "Enable anomaly and outage alerts." },
      { num: 5, title: "Optimization", desc: "Continuous improvement and loss reduction." },
    ],
    integrationsBadge: "Integrations",
    integrationsTitle: "All energy sources",
    integrationsAccent: "in one place",
    integrationsDesc: "Bring grid, facility, and meter data together on one stream.",
    integrations: [
      { icon: Database, title: "SCADA", desc: "Real-time monitoring and control data." },
      { icon: BarChart3, title: "DMS / OMS", desc: "Outage and fault management integration." },
      { icon: Bell, title: "AMI / AMR", desc: "Meter readings and consumption data." },
      { icon: Workflow, title: "GIS / IoT", desc: "Field assets and sensor data." },
    ],
    featuresBadge: "Features",
    featuresTitle: "Full visibility",
    featuresAccent: "for energy operations",
    featuresDesc: "Monitoring, analytics, alarms, and optimization in one platform.",
    features: [
      { icon: BarChart3, title: "Grid Analytics", desc: "Technical and commercial loss analysis." },
      { icon: Bell, title: "Alarm Management", desc: "Outage, fault, and anomaly alerts." },
      { icon: Bot, title: "Forecasting", desc: "Load and consumption forecasting for planning." },
      { icon: Workflow, title: "Operational Workflow", desc: "Approvals, interventions, and work orders." },
      { icon: Users, title: "Role-Based Access", desc: "Secure authorization with RBAC." },
      { icon: Shield, title: "Data Security", desc: "Encryption, audit logs, and backups." },
    ],
    previewLabel: "Preview",
    trustBadge: "Reliable energy operations",
    trustTitleLine1: "Reduce outages,",
    trustTitleLine2: "see losses clearly",
    trustDesc: "Connect to a single source of truth: grid, meter, facility, and field data.",
    trustCards: [
      { icon: Lock, title: "Cybersecurity", desc: "Encryption, RBAC, and audit logs" },
      { icon: Workflow, title: "Process automation", desc: "Triggers + standard flows" },
      { icon: Users, title: "Team coordination", desc: "Tasks + intervention tracking" },
      { icon: Shield, title: "Data integrity", desc: "Quality control + backups" },
    ],
    dashboardLabel: "Sample operations view",
    dashboardTitle: "Today",
    dashboardKpis: [
      { label: "Active transformers", value: "128" },
      { label: "Anomalies", value: "7" },
      { label: "Outages", value: "2" },
      { label: "Demand forecast", value: "+3.1%" },
    ],
    activityTitle: "Activity",
    activityItems: [
      { label: "Alert: voltage drop", time: "1 min" },
      { label: "Work order: field check", time: "12 min" },
      { label: "Report: loss analysis", time: "1 hr" },
    ],
    pricingBadge: "Pricing",
    pricingTitle: "Plan that fits your team",
    pricingDesc: "Simple plans, fast start. Request a demo for details.",
    pricingHighlight: "Recommended",
    pricingPeriod: "/ mo",
    pricingCta: "Get quote",
    plans: [
      {
        name: "Starter",
        price: "$0",
        tagline: "For small teams",
        features: ["3 users", "1 pipeline", "Basic automation", "Standard reports"],
      },
      {
        name: "Plus",
        price: "$39",
        tagline: "For growing teams",
        features: ["10 users", "6 pipelines", "Advanced automation", "Integrations"],
        highlight: true,
      },
      {
        name: "Pro",
        price: "$99",
        tagline: "For enterprise workflows",
        features: ["Unlimited pipelines", "SLA control", "Audit logs", "Custom roles"],
      },
    ] as Plan[],
    faqBadge: "FAQ",
    faqTitle: "Before you buy",
    faqDesc: "Short answers to common questions.",
    faqs: [
      { q: "How long does setup take?", a: "Typically 1–3 days for pipeline, channels, and team training." },
      { q: "Can we connect multiple channels?", a: "Yes. Multiple channels and accounts can be linked to one company." },
      { q: "Do you require a credit card?", a: "No. Demo and trial can start without a card." },
      { q: "Do you provide support and training?", a: "Yes. We support setup, data migration, and team training." },
    ],
    ctaTitle: "Improve your workflows today",
    ctaDesc: "Get a demo and we will map a clear roadmap for your scenario.",
    ctaPrimary: "Request demo",
    ctaSecondary: "View products",
  },
  ru: {
    heroBadge: "Единый центр управления энергией",
    heroTitle: "Объедините данные сети",
    heroAccent: "в одной платформе",
    heroTitleSuffix: "для мониторинга и оптимизации",
    heroDesc: "Подключите SCADA, AMI и полевые данные. Повышайте эффективность с мониторингом в реальном времени, анализом потерь и управлением тревогами.",
    heroPrimary: "Запросить демо",
    heroSecondary: "Как это работает",
    kpis: [
      { label: "Запуск", value: "1–3 недели" },
      { label: "Uptime", value: "99.9%" },
      { label: "Задержка тревоги", value: "<1 мин" },
      { label: "Потери", value: "-12%" },
    ],
    howBadge: "Как это работает",
    howTitle: "Запустите за 5 шагов",
    howDesc: "Без сложной настройки. Подключите источники, настройте панели и тревоги.",
    steps: [
      { num: 1, title: "Подключение данных", desc: "SCADA, AMI, DMS и OMS источники." },
      { num: 2, title: "Моделирование", desc: "Определите правила, KPI и пороги тревог." },
      { num: 3, title: "Дашборд", desc: "Настройте операционный интерфейс." },
      { num: 4, title: "Управление тревогами", desc: "Включите оповещения об аномалиях и отключениях." },
      { num: 5, title: "Оптимизация", desc: "Постоянное улучшение и снижение потерь." },
    ],
    integrationsBadge: "Интеграции",
    integrationsTitle: "Все источники энергии",
    integrationsAccent: "в одном месте",
    integrationsDesc: "Объединяйте данные сети, объектов и счетчиков в одном потоке.",
    integrations: [
      { icon: Database, title: "SCADA", desc: "Данные мониторинга и управления в реальном времени." },
      { icon: BarChart3, title: "DMS / OMS", desc: "Интеграция управления авариями и отключениями." },
      { icon: Bell, title: "AMI / AMR", desc: "Показания счетчиков и данные потребления." },
      { icon: Workflow, title: "GIS / IoT", desc: "Активы на местности и сенсорные данные." },
    ],
    featuresBadge: "Возможности",
    featuresTitle: "Полная прозрачность",
    featuresAccent: "для энергоопераций",
    featuresDesc: "Мониторинг, аналитика, тревоги и оптимизация в одной платформе.",
    features: [
      { icon: BarChart3, title: "Аналитика сети", desc: "Анализ технических и коммерческих потерь." },
      { icon: Bell, title: "Управление тревогами", desc: "Оповещения об авариях и аномалиях." },
      { icon: Bot, title: "Прогнозирование", desc: "Прогнозы нагрузки и потребления." },
      { icon: Workflow, title: "Операционные процессы", desc: "Согласования, вмешательства и наряды." },
      { icon: Users, title: "Ролевой доступ", desc: "Безопасное управление правами." },
      { icon: Shield, title: "Безопасность данных", desc: "Шифрование, audit log и резервирование." },
    ],
    previewLabel: "Предпросмотр",
    trustBadge: "Надежные энергооперации",
    trustTitleLine1: "Снижайте отключения,",
    trustTitleLine2: "видьте потери",
    trustDesc: "Единый источник правды: сеть, счетчики, объекты и полевая инфраструктура.",
    trustCards: [
      { icon: Lock, title: "Кибербезопасность", desc: "Шифрование, RBAC и audit log" },
      { icon: Workflow, title: "Автоматизация процессов", desc: "Триггеры + стандартные потоки" },
      { icon: Users, title: "Координация команды", desc: "Задачи + контроль вмешательств" },
      { icon: Shield, title: "Целостность данных", desc: "Контроль качества + резервирование" },
    ],
    dashboardLabel: "Пример панели операций",
    dashboardTitle: "Сегодня",
    dashboardKpis: [
      { label: "Активные подстанции", value: "128" },
      { label: "Аномалии", value: "7" },
      { label: "Отключения", value: "2" },
      { label: "Прогноз нагрузки", value: "+3.1%" },
    ],
    activityTitle: "Активность",
    activityItems: [
      { label: "Тревога: просадка напряжения", time: "1 мин" },
      { label: "Наряд: выезд на объект", time: "12 мин" },
      { label: "Отчет: анализ потерь", time: "1 ч" },
    ],
    pricingBadge: "Цены",
    pricingTitle: "План для вашей команды",
    pricingDesc: "Простые планы, быстрый старт. Запросите демо для деталей.",
    pricingHighlight: "Рекомендуем",
    pricingPeriod: "/ мес",
    pricingCta: "Получить предложение",
    plans: [
      {
        name: "Starter",
        price: "$0",
        tagline: "Для небольших команд",
        features: ["3 пользователя", "1 воронка", "Базовая автоматизация", "Стандартные отчеты"],
      },
      {
        name: "Plus",
        price: "$39",
        tagline: "Для растущих команд",
        features: ["10 пользователей", "6 воронок", "Расширенная автоматизация", "Интеграции"],
        highlight: true,
      },
      {
        name: "Pro",
        price: "$99",
        tagline: "Для корпоративных процессов",
        features: ["Неограниченные воронки", "Контроль SLA", "Audit log", "Специальные роли"],
      },
    ] as Plan[],
    faqBadge: "FAQ",
    faqTitle: "Перед покупкой",
    faqDesc: "Краткие ответы на популярные вопросы.",
    faqs: [
      { q: "Сколько занимает настройка?", a: "Обычно 1–3 дня: воронка, каналы и обучение команды." },
      { q: "Можно подключить несколько каналов?", a: "Да. Несколько каналов/аккаунтов можно привязать к одной компании." },
      { q: "Нужна ли кредитная карта?", a: "Нет. Демо и пробный период запускаются без карты." },
      { q: "Есть ли поддержка и обучение?", a: "Да. Поддерживаем внедрение, миграцию данных и обучение команды." },
    ],
    ctaTitle: "Улучшите процессы сегодня",
    ctaDesc: "Запросите демо — составим четкий план под ваш сценарий.",
    ctaPrimary: "Запросить демо",
    ctaSecondary: "Посмотреть продукты",
  },
} as const;

export default function PortalLandingPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const withLocale = useLocaleHref();
  const copy = copyByLang[language] ?? copyByLang.tr;

  const steps = copy.steps;
  const integrations = copy.integrations;
  const features = copy.features;
  const plans = copy.plans;
  const faqs = copy.faqs;

  const palette = useMemo(() => {
    return {
      page: isDark ? "bg-black text-white" : "bg-white text-zinc-900",
      sectionAlt: isDark ? "bg-zinc-950" : "bg-zinc-50",
      border: isDark ? "border-white/10" : "border-black/10",
      heading: isDark ? "text-white" : "text-zinc-900",
      desc: isDark ? "text-gray-400" : "text-zinc-600",
      card: isDark ? "bg-zinc-900/50 border-white/10" : "bg-white border-black/10",
      cardAlt: isDark ? "bg-zinc-900/50 border-white/10" : "bg-zinc-50 border-black/10",
    };
  }, [isDark]);

  return (
    <div className={`min-h-screen ${palette.page}`}>
      <Header />

      <section className="relative pt-28 md:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-linear-to-br from-orange-500/20 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-180 h-180 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${palette.border} ${isDark ? "bg-zinc-900/40" : "bg-white/60"}`}>
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className={`${isDark ? "text-gray-300" : "text-zinc-700"} text-sm`}>{copy.heroBadge}</span>
            </div>

            <h1 className={`mt-6 text-4xl md:text-6xl font-bold tracking-tight ${palette.heading}`}>
              {copy.heroTitle}
              {copy.heroAccent && <span className="text-orange-500"> {copy.heroAccent}</span>}
              <br />
              {copy.heroTitleSuffix}
            </h1>

            <p className={`mt-5 text-lg md:text-xl ${palette.desc} max-w-2xl`}>
              {copy.heroDesc}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={withLocale("/contacts")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-full"
              >
                {copy.heroPrimary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#how-it-works"
                className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border ${palette.border} ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"} font-semibold`}
              >
                {copy.heroSecondary}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
              {copy.kpis.map((kpi) => (
                <div key={kpi.label} className={`rounded-2xl border ${palette.border} ${isDark ? "bg-zinc-900/30" : "bg-white/60"} px-4 py-3`}>
                  <div className={`text-sm ${palette.desc}`}>{kpi.label}</div>
                  <div className={`text-xl font-bold ${palette.heading}`}>{kpi.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className={`py-20 ${palette.sectionAlt}`}>
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-orange-500 text-sm font-medium mb-2">{copy.howBadge}</p>
            <h2 className={`text-3xl md:text-4xl font-bold ${palette.heading}`}>
              {copy.howTitle}
            </h2>
            <p className={`mt-3 ${palette.desc}`}>
              {copy.howDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500 text-black font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className={`font-semibold mb-1 ${palette.heading}`}>{step.title}</h3>
                <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-orange-500 text-sm font-medium mb-2">{copy.integrationsBadge}</p>
            <h2 className={`text-3xl md:text-4xl font-bold ${palette.heading}`}>
              {copy.integrationsTitle}
              <span className="text-orange-500"> {copy.integrationsAccent}</span>
            </h2>
            <p className={`mt-3 ${palette.desc}`}>{copy.integrationsDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrations.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border p-6 ${palette.cardAlt} hover:border-orange-500/30 transition-colors`}
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className={`font-semibold mb-2 ${palette.heading}`}>{item.title}</h3>
                <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-20 ${palette.sectionAlt}`}>
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-orange-500 text-sm font-medium mb-2">{copy.featuresBadge}</p>
            <h2 className={`text-3xl md:text-4xl font-bold ${palette.heading}`}>
              {copy.featuresTitle}
              <span className="text-orange-500"> {copy.featuresAccent}</span>
            </h2>
            <p className={`mt-3 ${palette.desc}`}>{copy.featuresDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`rounded-2xl border p-6 ${palette.card} hover:border-orange-500/30 transition-colors`}
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className={`font-semibold ${palette.heading}`}>{f.title}</h3>
                <p className={`mt-2 text-sm ${isDark ? "text-gray-500" : "text-zinc-600"}`}>{f.desc}</p>

                <div className={`mt-5 rounded-xl border ${palette.border} ${isDark ? "bg-black/20" : "bg-white/60"} h-28`}>
                  <div className="p-4 text-xs">
                    <span className={`${isDark ? "text-gray-500" : "text-zinc-500"}`}>{copy.previewLabel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-orange-500 text-sm font-medium mb-2">{copy.trustBadge}</p>
              <h2 className={`text-3xl md:text-4xl font-bold ${palette.heading}`}>
                {copy.trustTitleLine1}
                <br />
                {copy.trustTitleLine2}
              </h2>
              <p className={`mt-4 ${palette.desc} max-w-xl`}>
                {copy.trustDesc}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {copy.trustCards.map((item) => (
                  <div key={item.title} className={`rounded-2xl border ${palette.border} ${isDark ? "bg-zinc-900/30" : "bg-white/60"} p-5`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <div className={`font-semibold ${palette.heading}`}>{item.title}</div>
                        <div className={`text-sm ${palette.desc}`}>{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-3xl border ${palette.border} ${isDark ? "bg-zinc-900/30" : "bg-white/60"} p-6`}>
              <div className={`text-sm ${palette.desc}`}>{copy.dashboardLabel}</div>
              <div className={`mt-2 text-2xl font-bold ${palette.heading}`}>{copy.dashboardTitle}</div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {copy.dashboardKpis.map((kpi) => (
                  <div key={kpi.label} className={`rounded-2xl border ${palette.border} ${isDark ? "bg-black/20" : "bg-zinc-50"} px-4 py-3`}>
                    <div className={`text-xs ${palette.desc}`}>{kpi.label}</div>
                    <div className={`text-lg font-bold ${palette.heading}`}>{kpi.value}</div>
                  </div>
                ))}
              </div>
              <div className={`mt-4 rounded-2xl border ${palette.border} ${isDark ? "bg-black/20" : "bg-zinc-50"} p-4`}>
                <div className={`text-sm font-semibold ${palette.heading}`}>{copy.activityTitle}</div>
                <div className={`mt-3 space-y-2 text-sm ${palette.desc}`}>
                  {copy.activityItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <span>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-20 ${palette.sectionAlt}`}>
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-orange-500 text-sm font-medium mb-2">{copy.pricingBadge}</p>
            <h2 className={`text-3xl md:text-4xl font-bold ${palette.heading}`}>{copy.pricingTitle}</h2>
            <p className={`mt-3 ${palette.desc}`}>{copy.pricingDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl border p-6 ${plan.highlight ? "border-orange-500/40" : palette.border} ${
                  isDark ? "bg-zinc-900/30" : "bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`text-sm ${palette.desc}`}>{plan.tagline}</div>
                    <div className={`mt-1 text-xl font-bold ${palette.heading}`}>{plan.name}</div>
                  </div>
                  {plan.highlight && (
                    <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500 text-black">
                      {copy.pricingHighlight}
                    </div>
                  )}
                </div>

                <div className={`mt-5 text-4xl font-bold ${palette.heading}`}>{plan.price}</div>
                <div className={`mt-1 text-sm ${palette.desc}`}>{copy.pricingPeriod}</div>

                <div className="mt-6 space-y-2">
                  {plan.features.map((f) => (
                    <div key={f} className={`flex items-center gap-2 text-sm ${palette.desc}`}>
                      <Check className="w-4 h-4 text-orange-500" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={withLocale("/contacts")}
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold ${
                    plan.highlight
                      ? "bg-orange-500 hover:bg-orange-400 text-black"
                      : isDark
                        ? "border border-white/10 hover:bg-white/5"
                        : "border border-black/10 hover:bg-black/5"
                  }`}
                >
                  {copy.pricingCta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-orange-500 text-sm font-medium mb-2">{copy.faqBadge}</p>
            <h2 className={`text-3xl md:text-4xl font-bold ${palette.heading}`}>{copy.faqTitle}</h2>
            <p className={`mt-3 ${palette.desc}`}>{copy.faqDesc}</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={faq.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between gap-4 p-5 rounded-2xl text-left border transition-colors ${
                    openFaq === i
                      ? `${isDark ? "bg-zinc-900" : "bg-white"} border-orange-500/30`
                      : `${isDark ? "bg-zinc-900/40 border-white/10" : "bg-zinc-50 border-black/10"}`
                  }`}
                >
                  <span className={`font-semibold ${palette.heading}`}>{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      openFaq === i ? "bg-orange-500" : isDark ? "bg-zinc-800" : "bg-zinc-200"
                    }`}
                  >
                    {openFaq === i ? (
                      <Minus className="w-4 h-4 text-black" />
                    ) : (
                      <Plus className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-zinc-700"}`} />
                    )}
                  </div>
                </button>
                {openFaq === i && (
                  <div className={`px-5 pb-5 pt-3 text-sm ${isDark ? "text-gray-400" : "text-zinc-700"}`}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-16 border-t ${palette.border}`}>
        <div className="container text-center">
          <h2 className={`text-2xl md:text-3xl font-bold ${palette.heading}`}>{copy.ctaTitle}</h2>
          <p className={`mt-3 ${palette.desc} max-w-xl mx-auto`}>{copy.ctaDesc}</p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={withLocale("/contacts")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-full"
            >
              {copy.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={withLocale("/products")}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full border font-semibold ${
                isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
              }`}
            >
              {copy.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}