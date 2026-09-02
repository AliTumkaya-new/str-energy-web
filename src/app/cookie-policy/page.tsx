"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CookiePolicyPage() {
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
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="diagonal" />

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20">
            {language === "tr" ? "Çerez Yönetimi & Aydınlatma" : language === "ru" ? "Политика файлов cookie" : "Cookie Management"}
          </span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl md:text-5xl font-bold mb-4 ${heading}`}>
            {t("nav.cookiePolicy")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`text-base md:text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
            {language === "tr"
              ? "Sitemizde kullanılan çerez türleri, Google AdSense ve analitik çerezlerinin kullanımı ve çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgilendirme."
              : language === "ru"
              ? "Информация о типах файлов cookie, используемых на str-energy.com, включая рекламные и аналитические cookie."
              : "Learn about the types of cookies used on str-energy.com, including advertising (Google AdSense) and analytics cookies."}
          </motion.p>
        </div>
      </section>

      <section className={`py-16 ${sectionAlt}`}>
        <div className="container max-w-4xl mx-auto px-4 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "1. Çerez (Cookie) Nedir?" : language === "ru" ? "1. Что такое cookie?" : "1. What is a Cookie?"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır. Çerezler sitenin daha verimli çalışmasını, tercihlerinizi hatırlamasını ve size uygun içerik/reklam sunmasını sağlar."
                : language === "ru"
                ? "Cookie — это небольшие текстовые файлы, которые браузер сохраняет на устройстве при посещении сайта. Они могут обеспечивать основные функции, запоминать настройки и, при наличии согласия, поддерживать аналитику или рекламу."
                : "Cookies are small text files stored on your device by your web browser when visiting websites. They help remember preferences, ensure smooth site functionality, and deliver relevant advertising."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "2. Kullandığımız Çerez Türleri" : language === "ru" ? "2. Типы cookie" : "2. Types of Cookies We Use"}
            </h2>
            <div className={`space-y-4 text-sm leading-relaxed ${desc}`}>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>{language === "tr" ? "Zorunlu Çerezler:" : language === "ru" ? "Обязательные cookie:" : "Essential Cookies:"}</strong>{" "}
                  {language === "tr" ? "Web sitesinin temel işlevlerini (dil seçimi, tema tercihi ve güvenlik) gerçekleştirmek için gereklidir." : language === "ru" ? "Необходимы для навигации, настроек языка и темы, а также безопасности." : "Required for basic navigation, theme and language preferences, and security."}
                </li>
                <li>
                  <strong>{language === "tr" ? "Performans ve Analitik Çerezleri:" : language === "ru" ? "Аналитические cookie:" : "Analytics Cookies:"}</strong>{" "}
                  {language === "tr" ? "Ziyaretçilerin siteyi nasıl kullandığını anlamamıza, sayfa trafiğini ölçmemize ve performansı artırmamıza yardımcı olabilir (örn. Vercel Analytics)." : language === "ru" ? "Могут помогать измерять использование страниц и улучшать производительность сайта, например через Vercel Analytics." : "May help measure page usage and improve site performance, for example through Vercel Analytics."}
                </li>
                <li>
                  <strong>{language === "tr" ? "Reklam Çerezleri (Google AdSense):" : language === "ru" ? "Рекламные cookie (Google AdSense):" : "Advertising Cookies (Google AdSense):"}</strong>{" "}
                  {language === "tr" ? "Reklam sunumu etkin olduğunda Google ve iş ortakları, kullanıcının seçimi ve geçerli izinlere bağlı olarak reklam sunma, ölçme ve kötüye kullanımı önleme amaçlarıyla çerez veya benzer teknolojiler kullanabilir." : language === "ru" ? "Когда показ рекламы включен, Google и партнеры могут использовать cookie или аналогичные технологии для показа и измерения рекламы и предотвращения злоупотреблений с учетом выбора пользователя и применимых разрешений." : "When ad serving is enabled, Google and its partners may use cookies or similar technologies to deliver and measure ads and prevent abuse, subject to user choices and applicable permissions."}
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "3. Çerezleri Nasıl Kontrol Edebilirsiniz?" : language === "ru" ? "3. Управление cookie" : "3. Managing & Disabling Cookies"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "Tarayıcı ayarlarınızı değiştirerek çerezleri engelleyebilir veya silebilirsiniz. Zorunlu depolamayı engellemek bazı özellikleri etkileyebilir. Google tarafından kullanılan reklam verilerini Google Reklam Ayarları üzerinden yönetebilirsiniz. Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre'de reklam sunumu etkin olduğunda izin tercihleri Google sertifikalı onay arayüzü üzerinden sunulmalıdır."
                : language === "ru"
                ? "Вы можете блокировать или удалять cookie в настройках браузера. Блокировка обязательного хранения может повлиять на функции сайта. Настройки рекламных данных Google доступны в Google Ads Settings. При показе рекламы пользователям ЕЭЗ, Великобритании и Швейцарии выбор согласия должен предоставляться через сертифицированный Google интерфейс управления согласием."
                : "You can control or delete cookies at any time through your browser settings. To manage advertising cookies, visit Google Ads Settings (adssettings.google.com)."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "4. Üçüncü Taraflar ve Güncelleme" : language === "ru" ? "4. Третьи стороны и обновления" : "4. Third Parties and Updates"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "Google'ın verileri nasıl kullandığı ve reklam teknolojisi sağlayıcıları zaman içinde değişebilir. Güncel ayrıntılar için Google'ın iş ortağı sitelerindeki veri kullanımı açıklamasını inceleyin. Bu politika en son 2 Eylül 2026 tarihinde gözden geçirilmiştir; sorularınızı support@str-energy.com adresine iletebilirsiniz."
                : language === "ru"
                ? "Способы использования данных Google и список рекламных технологических партнеров могут меняться. Актуальные сведения доступны в уведомлении Google об использовании данных на сайтах партнеров. Политика проверена 2 сентября 2026 г.; вопросы можно направлять на support@str-energy.com."
                : "Google's data practices and advertising technology providers may change. Review Google's explanation of data use on partner sites for current details. This policy was last reviewed on 2 September 2026; questions can be sent to support@str-energy.com."}
            </p>
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-bold text-orange-500 hover:underline">
              {language === "tr" ? "Google iş ortağı sitelerinde veri kullanımı" : language === "ru" ? "Использование данных Google на сайтах партнеров" : "How Google uses data on partner sites"}
            </a>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
