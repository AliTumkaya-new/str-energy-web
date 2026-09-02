"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function DisclaimerPage() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();

  const pageBg = isDark ? "bg-black text-white" : "bg-white text-zinc-900";
  const cardBg = isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-black/10";
  const heading = isDark ? "text-white" : "text-zinc-900";
  const desc = isDark ? "text-gray-300" : "text-zinc-700";
  const sectionAlt = isDark ? "bg-zinc-950" : "bg-zinc-50";

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Header variant="floating" />

      <section
        ref={heroRef}
        onPointerEnter={onHeroPointerEnter}
        onPointerLeave={onHeroPointerLeave}
        onPointerMove={onHeroPointerMove}
        className="relative min-h-[45vh] flex items-center justify-center pt-24 pb-12 overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%]"
      >
        <div className="absolute inset-0 opacity-20 bg-linear-to-br from-orange-500/20 to-amber-500/10" />
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="grid" />

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20">
            {language === "tr" ? "Yasal Sorumluluk Sınırı" : language === "ru" ? "Отказ от ответственности" : "Legal Disclaimer"}
          </span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl md:text-5xl font-bold mb-4 ${heading}`}>
            {t("nav.disclaimer")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`text-base md:text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
            {language === "tr"
              ? "STR Enerji web sitesindeki içerik, piyasa verileri (PTF, YEKDEM, ENTSO-E) ve finansal/teknik analizlere ilişkin sorumluluk sınırı bilgilendirmesi."
              : language === "ru"
              ? "Уведомление об ограничении ответственности в отношении данных о рынках электроэнергии и аналитики."
              : "Legal disclaimer regarding energy market data (PTF, YEKDEM, ENTSO-E), analytical charts, and content published on str-energy.com."}
          </motion.p>
        </div>
      </section>

      <section className={`py-16 ${sectionAlt}`}>
        <div className="container max-w-4xl mx-auto px-4 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "1. Genel Bilgilendirme Niteliği" : language === "ru" ? "1. Информационный характер" : "1. Informational Purpose Only"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "str-energy.com sitesinde yer alan tüm bilgiler, veriler, makaleler ve hesaplamalar yalnızca genel bilgilendirme ve teknik rehberlik amacıyla sunulmaktadır. Sitede yer alan hiçbir veri doğrudan yatırım, finans veya bağlayıcı ticaret tavsiyesi teşkil etmez."
                : language === "ru"
                ? "Все сведения, данные, статьи и расчеты на str-energy.com предоставляются в образовательных и информационных целях. Они не являются инвестиционной, финансовой, юридической или обязательной инженерной рекомендацией."
                : "All articles, market data, charts, and forecasts published on str-energy.com are provided strictly for general informational and educational purposes. Nothing on this site constitutes binding financial or investment advice."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "2. Harici Veri Kaynakları ve Doğruluk" : language === "ru" ? "2. Внешние источники данных" : "2. Third-Party Data Sources & Accuracy"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "Elektrik piyasası verileri EPİAŞ, ENTSO-E, EIA ve diğer resmi platformlardan çekilmektedir. Verilerin güncelliği ve doğruluğu için özen gösterilmekle birlikte, resmi kurumların veri sistemlerinde yaşanabilecek gecikme veya düzeltmelerden STR Enerji sorumlu değildir."
                : language === "ru"
                ? "Данные энергорынков поступают из EPİAŞ, ENTSO-E, EIA и других официальных платформ. Источники могут задерживать, исправлять или пересматривать сведения. Время запроса и методология должны учитываться при интерпретации результата."
                : "Market data streams are integrated from official sources including EPİAŞ, ENTSO-E, and EIA. While we strive to maintain accurate feeds, STR Energy does not guarantee uninterrupted third-party data availability."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "3. Dış Bağlantılar (External Links)" : language === "ru" ? "3. Внешние ссылки" : "3. External Links Disclaimer"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "Sitemiz harici web sitelerine bağlantılar içerebilir. Bu dış sitelerin içeriği, gizlilik politikaları veya uygulamalarından STR Enerji sorumlu değildir."
                : language === "ru"
                ? "Сайт может содержать ссылки на сторонние ресурсы. STR Energy не контролирует их содержание, доступность, политику конфиденциальности или последующие изменения. Политика проверена 2 сентября 2026 г."
                : "Our site may contain links to external third-party websites. STR Energy is not responsible for the privacy practices or content of third-party external links."}
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
