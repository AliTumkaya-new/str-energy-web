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
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  Server,
  Network,
  FileSearch,
  ShieldCheck,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";

export default function SecureGridPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { language } = useLanguage();
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();
  const withLocale = useLocaleHref();

  const copyByLang = {
    tr: {
      badge: "OT/IT Siber Güvenlik",
      title: "Enerji altyapınızı",
      accent: "koruyun",
      desc: "SecureGrid ile kritik enerji altyapınızı siber saldırılara karşı koruyun. OT güvenliği, 7/24 izleme ve incident response.",
      cta: "Güvenlik Danışmanlığı",
      howTitle: "SecureGrid'i ",
      howAccent: "5 adımda",
      howSuffix: " başlatın",
      featuresTitle: "Güvenlik ",
      featuresAccent: "özellikleri",
      faqTitle: "SSS",
      ctaBottomTitle: "Altyapınızı ",
      ctaBottomAccent: "bugün",
      ctaBottomPrimary: "İletişime Geçin",
      ctaBottomSecondary: "Ana Sayfa",
      steps: [
        { num: 1, title: "Güvenlik Auditi", desc: "Mevcut durumu analiz ederiz" },
        { num: 2, title: "Risk Değerlendirme", desc: "Tehditleri belirleriz" },
        { num: 3, title: "Çözüm Tasarımı", desc: "Güvenlik mimarisini tasarlarız" },
        { num: 4, title: "Uygulama", desc: "Koruma katmanlarını kurarız" },
        { num: 5, title: "7/24 İzleme", desc: "Sürekli güvenlik monitörü" },
      ],
      integrations: [
        { icon: Server, title: "OT Security", desc: "SCADA ve endüstriyel sistem koruması." },
        { icon: Network, title: "Network Security", desc: "Ağ güvenliği ve segmentasyon." },
        { icon: Eye, title: "SIEM", desc: "Güvenlik olayları izleme ve korelasyon." },
        { icon: FileSearch, title: "Compliance", desc: "NERC CIP, IEC 62351 uyumluluğu." },
      ],
      features: [
        { icon: Shield, title: "Firewall Yönetimi", desc: "OT/IT firewall konfigürasyonu" },
        { icon: Lock, title: "Erişim Kontrolü", desc: "Rol tabanlı yetkilendirme" },
        { icon: Eye, title: "Anomali Tespiti", desc: "AI destekli tehdit algılama" },
        { icon: AlertTriangle, title: "Incident Response", desc: "Olay müdahale planları" },
        { icon: ShieldCheck, title: "Vulnerability Scan", desc: "Zafiyet tarama ve raporlama" },
        { icon: Network, title: "Segmentasyon", desc: "Ağ izolasyonu ve DMZ" },
      ],
      faqs: [
        { q: "Hangi standartlara uyumlusunuz?", a: "NERC CIP, IEC 62351, ISO 27001, NIST CSF standartlarına tam uyumluluk sağlıyoruz." },
        { q: "Mevcut güvenlik sistemlerimizle entegre olabilir mi?", a: "Evet, tüm major SIEM, firewall ve endpoint çözümleriyle entegrasyon sağlıyoruz." },
        { q: "Incident response süresi nedir?", a: "Kritik olaylarda 15 dakika içinde müdahale başlatıyoruz." },
      ],
    },
    en: {
      badge: "OT/IT Cybersecurity",
      title: "Protect your energy infrastructure",
      accent: "today",
      desc: "SecureGrid protects critical energy infrastructure against cyber threats. OT security, 24/7 monitoring, and incident response.",
      cta: "Security Consulting",
      howTitle: "Launch SecureGrid in ",
      howAccent: "5 steps",
      howSuffix: "",
      featuresTitle: "Security ",
      featuresAccent: "capabilities",
      faqTitle: "FAQ",
      ctaBottomTitle: "Protect your infrastructure ",
      ctaBottomAccent: "today",
      ctaBottomPrimary: "Contact Us",
      ctaBottomSecondary: "Home",
      steps: [
        { num: 1, title: "Security Audit", desc: "We assess your current posture" },
        { num: 2, title: "Risk Assessment", desc: "We identify threats" },
        { num: 3, title: "Solution Design", desc: "We design the security architecture" },
        { num: 4, title: "Implementation", desc: "We deploy protection layers" },
        { num: 5, title: "24/7 Monitoring", desc: "Continuous security monitoring" },
      ],
      integrations: [
        { icon: Server, title: "OT Security", desc: "SCADA and industrial system protection." },
        { icon: Network, title: "Network Security", desc: "Network security and segmentation." },
        { icon: Eye, title: "SIEM", desc: "Security event monitoring and correlation." },
        { icon: FileSearch, title: "Compliance", desc: "NERC CIP, IEC 62351 compliance." },
      ],
      features: [
        { icon: Shield, title: "Firewall Management", desc: "OT/IT firewall configuration" },
        { icon: Lock, title: "Access Control", desc: "Role‑based authorization" },
        { icon: Eye, title: "Anomaly Detection", desc: "AI‑assisted threat detection" },
        { icon: AlertTriangle, title: "Incident Response", desc: "Response playbooks" },
        { icon: ShieldCheck, title: "Vulnerability Scanning", desc: "Scanning and reporting" },
        { icon: Network, title: "Segmentation", desc: "Network isolation and DMZ" },
      ],
      faqs: [
        { q: "Which standards do you comply with?", a: "We comply with NERC CIP, IEC 62351, ISO 27001, and NIST CSF." },
        { q: "Can you integrate with existing security tools?", a: "Yes, we integrate with major SIEM, firewall, and endpoint solutions." },
        { q: "What is your incident response time?", a: "For critical events, we initiate response within 15 minutes." },
      ],
    },
    ru: {
      badge: "OT/IT Кибербезопасность",
      title: "Защитите энергетическую инфраструктуру",
      accent: "сегодня",
      desc: "SecureGrid защищает критическую инфраструктуру от киберугроз. OT‑безопасность, 24/7 мониторинг и реагирование.",
      cta: "Консультация по безопасности",
      howTitle: "Запустите SecureGrid за ",
      howAccent: "5 шагов",
      howSuffix: "",
      featuresTitle: "Возможности ",
      featuresAccent: "безопасности",
      faqTitle: "FAQ",
      ctaBottomTitle: "Защитите инфраструктуру ",
      ctaBottomAccent: "сегодня",
      ctaBottomPrimary: "Связаться",
      ctaBottomSecondary: "Главная",
      steps: [
        { num: 1, title: "Аудит безопасности", desc: "Оцениваем текущую ситуацию" },
        { num: 2, title: "Оценка рисков", desc: "Выявляем угрозы" },
        { num: 3, title: "Проектирование решения", desc: "Проектируем архитектуру безопасности" },
        { num: 4, title: "Внедрение", desc: "Настраиваем уровни защиты" },
        { num: 5, title: "24/7 Мониторинг", desc: "Непрерывный мониторинг" },
      ],
      integrations: [
        { icon: Server, title: "OT Security", desc: "Защита SCADA и промышленных систем." },
        { icon: Network, title: "Network Security", desc: "Сетевая безопасность и сегментация." },
        { icon: Eye, title: "SIEM", desc: "Мониторинг и корреляция событий безопасности." },
        { icon: FileSearch, title: "Compliance", desc: "Соответствие NERC CIP, IEC 62351." },
      ],
      features: [
        { icon: Shield, title: "Управление firewall", desc: "Конфигурация OT/IT firewall" },
        { icon: Lock, title: "Контроль доступа", desc: "Ролевые права доступа" },
        { icon: Eye, title: "Выявление аномалий", desc: "ИИ‑обнаружение угроз" },
        { icon: AlertTriangle, title: "Incident Response", desc: "Планы реагирования" },
        { icon: ShieldCheck, title: "Сканирование уязвимостей", desc: "Сканирование и отчеты" },
        { icon: Network, title: "Сегментация", desc: "Изоляция сети и DMZ" },
      ],
      faqs: [
        { q: "Каким стандартам вы соответствуете?", a: "Мы соответствуем NERC CIP, IEC 62351, ISO 27001 и NIST CSF." },
        { q: "Интеграция с текущими системами возможна?", a: "Да, интегрируемся с основными SIEM, firewall и endpoint решениями." },
        { q: "Время реагирования на инцидент?", a: "Для критических инцидентов начинаем реагирование в течение 15 минут." },
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
          <div className="absolute inset-0 bg-linear-to-br from-red-500/20 via-transparent to-orange-500/10" />
        </div>
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="circuit" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              {copy.badge}
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${heading}`}>
              {copy.title}
              <br /><span className="text-red-400">{copy.accent}</span>
            </h1>
            <p className={`text-lg mb-10 max-w-2xl mx-auto ${desc}`}>
              {copy.desc}
            </p>
            <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-full">{copy.cta}</Link>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className={`py-20 ${sectionAlt}`}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>{copy.howTitle}<span className="text-red-400">{copy.howAccent}</span>{copy.howSuffix}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{step.num}</div>
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
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`${cardAlt} border rounded-xl p-6 hover:border-red-500/30`}>
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4"><item.icon className="w-5 h-5 text-red-400" /></div>
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
            <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>{copy.featuresTitle}<span className="text-red-400">{copy.featuresAccent}</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`${card} border rounded-xl p-5 hover:border-red-500/30`}>
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3"><f.icon className="w-5 h-5 text-red-400" /></div>
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
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className={`w-full flex items-center justify-between gap-4 p-5 rounded-xl text-left border ${openFaq === i ? `${isDark ? "bg-zinc-900" : "bg-white"} border-red-500/30` : `${isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-50 border-black/10"}`}`}>
                  <span className={`font-medium ${heading}`}>{faq.q}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${openFaq === i ? "bg-red-500" : isDark ? "bg-zinc-800" : "bg-zinc-200"}`}>{openFaq === i ? <Minus className="w-3 h-3 text-white" /> : <Plus className={`w-3 h-3 ${isDark ? "text-gray-400" : "text-zinc-700"}`} />}</div>
                </button>
                {openFaq === i && <div className={`p-5 pt-0 text-sm ${isDark ? "text-gray-400" : "text-zinc-700"}`}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-16 border-t ${sectionBase} ${isDark ? "border-zinc-800" : "border-black/10"}`}>
        <div className="container text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${heading}`}>{copy.ctaBottomTitle}<span className="text-red-400">{copy.ctaBottomAccent}</span></h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-full">{copy.ctaBottomPrimary} <ArrowRight className="w-4 h-4" /></Link>
            <Link href={withLocale("/")} className={`px-8 py-4 border font-semibold rounded-full ${isDark ? "border-zinc-700 text-white hover:bg-zinc-900" : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"}`}>{copy.ctaBottomSecondary}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
