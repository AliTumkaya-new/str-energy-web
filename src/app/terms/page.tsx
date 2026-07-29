"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
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
            {language === "tr" ? "Kullanım Koşulları & Sözleşme" : language === "ru" ? "Условия использования" : "Terms & Conditions"}
          </span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl md:text-5xl font-bold mb-4 ${heading}`}>
            {t("nav.terms")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`text-base md:text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
            {language === "tr"
              ? "str-energy.com web sitesini ve STR Enerji yazılım platformlarını kullanırken tabi olduğunuz kural ve hükümler."
              : language === "ru"
              ? "Правила и условия использования веб-сайта str-energy.com и программных платформ STR Energy."
              : "Terms and conditions governing your use of the str-energy.com website and STR Energy software platforms."}
          </motion.p>
        </div>
      </section>

      <section className={`py-16 ${sectionAlt}`}>
        <div className="container max-w-4xl mx-auto px-4 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "1. Genel Kullanım Şartları" : language === "ru" ? "1. Общие условия" : "1. Terms of Website Use"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "Bu web sitesini (str-energy.com) ziyaret ederek ve kullanarak bu Kullanım Şartlarını kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen siteyi kullanmayınız. STR Enerji, bu şartları önceden haber vermeksizin güncelleme hakkını saklı tutar."
                : "By accessing and using str-energy.com, you accept and agree to be bound by these Terms of Service. If you do not agree, please discontinue using the site. STR Energy reserves the right to update these terms at any time."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "2. Fikri Mülkiyet Hakları" : language === "ru" ? "2. Интеллектуальная собственность" : "2. Intellectual Property Rights"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "Sitede yer alan tüm tasarım, kaynak kodları, veri görselleştirme bileşenleri, metinler, grafikler, logolar ve yazılımlar STR Enerji'nin mülkiyetindedir. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz."
                : "All content, visual features, design components, algorithms, code, graphics, and trademarks on str-energy.com belong to STR Energy and are protected by intellectual property laws."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "3. Enerji Verileri ve Hizmet Sorumluluğu" : language === "ru" ? "3. Ответственность" : "3. Energy Data & Service Disclaimer"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "Sitede sunulan PTF, YEKDEM, üretim ve piyasa analitiği verileri bilgilendirme ve analitik takip amacıyla sunulmaktadır. Verilerin doğruluğunu korumak için azami çaba gösterilmekle birlikte, kamuya açık sağlayıcılardan (EPİAŞ, ENTSO-E vb.) kaynaklanan kesintilerden veya gecikmelerden doğacak zararlardan STR Enerji sorumlu tutulamaz."
                : "Market data (PTF, YEKDEM, ENTSO-E, EIA) is provided for informational and analytical purposes only. While we strive for accuracy, STR Energy is not liable for external data feed delays, disruptions, or financial decisions made based on this information."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "4. İletişim" : language === "ru" ? "4. Контакты" : "4. Contact Us"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "Kullanım şartları ile ilgili her türlü soru için support@str-energy.com adresinden bizimle iletişime geçebilirsiniz."
                : "For questions about these Terms of Service, contact support@str-energy.com."}
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
