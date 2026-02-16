"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const newsByLang = {
  tr: {
    badge: "Basın Odası",
    title: "Haberler",
    subtitle: "Şirket duyuruları, ürün sürümleri ve proje güncellemeleri.",
    latestTitle: "Son Haberler",
    latestDesc: "Enerji operasyonlarında teslimatlar, partnerlikler ve ürün gelişmeleri.",
    ctaTitle: "Medya ve partnerlik",
    ctaDesc: "Basın, etkinlik veya proje ortaklığı için ekibimizle iletişime geçin.",
    ctaButton: "İletişime geç",
    items: [
      {
        featured: true,
        date: "05 Şub 2026",
        category: "Partnerlik",
        tag: "Avrupa",
        readTime: "3 dk",
        title: "Avrupa projelerinde teknoloji partnerliği",
        desc: "Enerji yönetimi ve analitik alanında Avrupa projelerinde teknoloji partneri olarak yer alıyoruz.",
      },
      {
        date: "24 Oca 2026",
        category: "Proje",
        tag: "Türkiye",
        readTime: "4 dk",
        title: "Türkiye'de saha entegrasyonları tamamlandı",
        desc: "SCADA ve AMI entegrasyonlarının ilk fazı tamamlandı, gerçek zamanlı izleme devrede.",
      },
      {
        date: "10 Oca 2026",
        category: "Ürün",
        tag: "Sürüm",
        readTime: "2 dk",
        title: "GridAnalytics yeni sürüm",
        desc: "Kayıp analizi ve anomali tespiti modülleri iyileştirildi, panel performansı artırıldı.",
      },
      {
        date: "18 Ara 2025",
        category: "Operasyon",
        tag: "Saha",
        readTime: "3 dk",
        title: "EnergyOS alarm yönetimi iyileştirmeleri",
        desc: "Olay eskalasyon akışları ve kritik alarm yönetimi ile saha ekiplerinin tepki süresi kısaldı.",
      },
    ],
  },
  en: {
    badge: "Newsroom",
    title: "News",
    subtitle: "Company announcements, releases, and project updates.",
    latestTitle: "Latest updates",
    latestDesc: "Deliveries, partnerships, and product progress across energy operations.",
    ctaTitle: "Media and partnerships",
    ctaDesc: "Contact our team for press, events, or project partnership requests.",
    ctaButton: "Contact us",
    items: [
      {
        featured: true,
        date: "Feb 05, 2026",
        category: "Partnership",
        tag: "Europe",
        readTime: "3 min",
        title: "Technology partner for European projects",
        desc: "We contribute as a technology partner to European energy management and analytics projects.",
      },
      {
        date: "Jan 24, 2026",
        category: "Project",
        tag: "Turkey",
        readTime: "4 min",
        title: "Field integrations completed in Turkey",
        desc: "Phase 1 of SCADA and AMI integrations is complete with live monitoring enabled.",
      },
      {
        date: "Jan 10, 2026",
        category: "Product",
        tag: "Release",
        readTime: "2 min",
        title: "GridAnalytics release",
        desc: "Loss analysis and anomaly detection modules are enhanced with faster dashboards.",
      },
      {
        date: "Dec 18, 2025",
        category: "Operations",
        tag: "Field",
        readTime: "3 min",
        title: "EnergyOS incident workflow upgrades",
        desc: "Escalation flows and critical alarm handling reduce response time for field teams.",
      },
    ],
  },
  ru: {
    badge: "Пресс-центр",
    title: "Новости",
    subtitle: "Объявления компании, релизы и обновления проектов.",
    latestTitle: "Последние новости",
    latestDesc: "Поставки, партнерства и развитие продуктов в энергетике.",
    ctaTitle: "Медиа и партнерство",
    ctaDesc: "Свяжитесь с нами по вопросам прессы, мероприятий или партнерских проектов.",
    ctaButton: "Связаться",
    items: [
      {
        featured: true,
        date: "05 фев 2026",
        category: "Партнерство",
        tag: "Европа",
        readTime: "3 мин",
        title: "Технологический партнер в проектах Европы",
        desc: "Мы участвуем в европейских проектах по управлению энергией и аналитике как технологический партнер.",
      },
      {
        date: "24 янв 2026",
        category: "Проект",
        tag: "Турция",
        readTime: "4 мин",
        title: "Завершены интеграции в Турции",
        desc: "Завершен первый этап интеграции SCADA и AMI, включен мониторинг в реальном времени.",
      },
      {
        date: "10 янв 2026",
        category: "Продукт",
        tag: "Релиз",
        readTime: "2 мин",
        title: "Новый релиз GridAnalytics",
        desc: "Улучшены модули анализа потерь и обнаружения аномалий, ускорены панели.",
      },
      {
        date: "18 дек 2025",
        category: "Операции",
        tag: "Полевые",
        readTime: "3 мин",
        title: "Улучшения инцидентного контура EnergyOS",
        desc: "Сценарии эскалации и обработка критических аварий сокращают время реакции команды.",
      },
    ],
  },
} as const;

export default function NewsPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const isDark = theme === "dark";
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();

  const copy = newsByLang[language] ?? newsByLang.tr;
  const pageBg = isDark ? "bg-black text-white" : "bg-white text-zinc-900";
  const sectionAlt = isDark ? "bg-zinc-950" : "bg-zinc-50";
  const heading = isDark ? "text-white" : "text-zinc-900";
  const desc = isDark ? "text-gray-400" : "text-zinc-600";
  const featured = copy.items.find((item) => "featured" in item && item.featured) ?? copy.items[0];
  const rest = copy.items.filter((item) => item !== featured);

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Header variant="floating" />

      <section
        ref={heroRef}
        onPointerEnter={onHeroPointerEnter}
        onPointerLeave={onHeroPointerLeave}
        onPointerMove={onHeroPointerMove}
        className="relative min-h-[55vh] flex items-center justify-center pt-20 overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%]"
      >
        <div className="absolute inset-0 opacity-20 bg-linear-to-br from-orange-500/20 to-amber-500/10" />
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="grid" />

        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-[0.35em] ${
            isDark ? "bg-white/10 text-gray-200" : "bg-white/80 text-zinc-700"
          }`}>
            {copy.badge}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${heading}`}
          >
            {copy.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`text-lg md:text-xl ${desc}`}
          >
            {copy.subtitle}
          </motion.p>
        </div>
      </section>

      <section className={`py-16 ${sectionAlt}`}>
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>{copy.latestTitle}</h2>
              <p className={`mt-3 ${desc}`}>{copy.latestDesc}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${isDark ? "bg-zinc-900/70 border-zinc-800" : "bg-white border-black/10"} border rounded-3xl p-7 lg:col-span-2 relative overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-10 bg-linear-to-br from-orange-500/30 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest">
                  <span className={`${isDark ? "text-orange-300" : "text-orange-600"}`}>{featured.category}</span>
                  <span className={`${desc}`}>•</span>
                  <span className={`${desc}`}>{featured.tag}</span>
                </div>
                <h3 className={`mt-4 text-2xl md:text-3xl font-semibold ${heading}`}>{featured.title}</h3>
                <p className={`mt-4 text-base leading-relaxed ${desc}`}>{featured.desc}</p>
                <div className={`mt-6 text-sm ${desc}`}>
                  {featured.date} • {featured.readTime}
                </div>
              </div>
            </motion.article>

            <div className="flex flex-col gap-5">
              {rest.map((item) => (
                <motion.article
                  key={`${item.date}-${item.title}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`${isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-black/10"} border rounded-2xl p-5`}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest">
                    <span className={`${isDark ? "text-orange-300" : "text-orange-600"}`}>{item.category}</span>
                    <span className={`${desc}`}>{item.readTime}</span>
                  </div>
                  <h3 className={`mt-3 text-lg font-semibold ${heading}`}>{item.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${desc}`}>{item.desc}</p>
                  <div className={`mt-4 text-xs ${desc}`}>{item.date} • {item.tag}</div>
                </motion.article>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-12 border rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 ${
              isDark ? "bg-zinc-900/60 border-white/10" : "bg-white border-black/10"
            }`}
          >
            <div>
              <h3 className={`text-xl font-semibold ${heading}`}>{copy.ctaTitle}</h3>
              <p className={`mt-2 ${desc}`}>{copy.ctaDesc}</p>
            </div>
            <a
              href={withLocale("/contacts")}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors"
            >
              {copy.ctaButton}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}