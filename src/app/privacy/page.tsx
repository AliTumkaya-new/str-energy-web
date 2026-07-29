"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
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
            {language === "tr" ? "Yasal Bildirim & Veri Güvenliği" : language === "ru" ? "Правовое уведомление" : "Legal Notice & Data Privacy"}
          </span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl md:text-5xl font-bold mb-4 ${heading}`}>
            {t("nav.privacy")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`text-base md:text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
            {language === "tr"
              ? "STR Enerji web sitemizi ziyaret ettiğinizde verilerinizin nasıl toplandığı, işlendiği, korunduğu ve Google AdSense dahil üçüncü taraf hizmet ortaklıklarımız hakkında bilgilendirme."
              : language === "ru"
              ? "Информация о том, как собираются, обрабатываются и защищаются ваши данные при посещении сайта STR Energy."
              : "Information on how your data is collected, processed, protected, and our third-party vendor partnerships including Google AdSense."}
          </motion.p>
        </div>
      </section>

      <section className={`py-16 ${sectionAlt}`}>
        <div className="container max-w-4xl mx-auto px-4 space-y-8">
          
          {/* AdSense & Third Party Vendors Mandatory Clause */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "1. Google AdSense ve Reklam Çerezleri Bildirimi" : language === "ru" ? "1. Уведомление Google AdSense" : "1. Google AdSense & Advertising Cookies Disclosure"}
            </h2>
            <div className={`space-y-4 text-sm leading-relaxed ${desc}`}>
              <p>
                {language === "tr" ? (
                  <>
                    Web sitemizde (<strong>str-energy.com</strong>) reklam hizmeti sunmak amacıyla Google AdSense ve diğer üçüncü taraf reklam tedarikçileri kullanılmaktadır. Google, sitemize ve internetteki diğer sitelere yapılan geçmiş ziyaretlerinize dayanarak reklam sunmak için çerezlerden (DART çerezi dahil) faydalanır.
                  </>
                ) : (
                  <>
                    We use Google AdSense and third-party advertising vendors to serve advertisements on our website (<strong>str-energy.com</strong>). Google uses cookies (including the DART cookie) to serve ads based on your visit to our website and other sites on the Internet.
                  </>
                )}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  {language === "tr"
                    ? "Üçüncü taraf satıcılar (Google dahil), sitemize ve internetteki diğer web sitelerine yapılan önceki ziyaretlere dayalı olarak reklam yayınlamak amacıyla çerezleri kullanır."
                    : "Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites."}
                </li>
                <li>
                  {language === "tr"
                    ? "Google'ın reklam çerezlerini kullanması, kendisinin ve ortaklarının kullanıcılara sitemize ve/veya internetteki diğer sitelere yaptıkları ziyaretlere dayalı olarak kişiselleştirilmiş reklamlar sunmasına olanak tanır."
                    : "Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet."}
                </li>
                <li>
                  {language === "tr" ? (
                    <>
                      Kullanıcılar, kişiselleştirilmiş reklamcılığı devre dışı bırakmak için{" "}
                      <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline hover:text-orange-400">
                        Google Reklam Ayarları
                      </a>{" "}
                      sayfasını ziyaret edebilirler. Ayrıca üçüncü taraf sağlayıcıların kişiselleştirilmiş reklamcılık çerezlerini devre dışı bırakmak için{" "}
                      <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline hover:text-orange-400">
                        www.aboutads.info
                      </a>{" "}
                      adresini kullanabilirsiniz.
                    </>
                  ) : (
                    <>
                      Users may opt out of personalized advertising by visiting{" "}
                      <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline hover:text-orange-400">
                        Google Ads Settings
                      </a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{" "}
                      <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline hover:text-orange-400">
                        www.aboutads.info
                      </a>.
                    </>
                  )}
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Data Collection & Log Files */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "2. Sunucu Günlükleri ve Otomatik Toplanan Veriler" : language === "ru" ? "2. Лог-файлы и данные" : "2. Log Files & Automated Data Collection"}
            </h2>
            <div className={`space-y-4 text-sm leading-relaxed ${desc}`}>
              <p>
                {language === "tr"
                  ? "STR Enerji, standart web sunucusu günlük dosyalarını (log files) kullanır. Bu dosyalar ziyaretçilerin IP adreslerini, tarayıcı türünü, İnternet Servis Sağlayıcısını (ISP), tarih/saat damgasını, yönlendiren/çıkış sayfalarını ve tıklama sayılarını kaydeder. Bu bilgiler kişiyi doğrudan teşhis eden verilerle ilişkilendirilmez; yalnızca site trendlerini analiz etmek, yönetmek ve kullanıcı deneyimini iyileştirmek amacıyla işlenir."
                  : "STR Enerji follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes IP addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and click count for trend analysis and site administration."}
              </p>
            </div>
          </motion.div>

          {/* KVKK / GDPR Rights */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "3. KVKK ve GDPR Kapsamındaki Haklarınız" : language === "ru" ? "3. Ваши права" : "3. Your Privacy & Data Subject Rights"}
            </h2>
            <div className={`space-y-4 text-sm leading-relaxed ${desc}`}>
              <p>
                {language === "tr"
                  ? "6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Genel Veri Koruma Tüzüğü (GDPR) kapsamında tüm kullanıcılarımız aşağıdaki haklara sahiptir:"
                  : "Under applicable data protection legislation (KVKK / GDPR), users hold the following rights regarding their personal data:"}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>{language === "tr" ? "Tarafımızca işlenen kişisel verilerinize erişim talep etme," : "Right to access processed personal data,"}</li>
                <li>{language === "tr" ? "Eksik veya yanlış işlenen verilerinizin düzeltilmesini isteme," : "Right to rectification of incorrect or incomplete data,"}</li>
                <li>{language === "tr" ? "Verilerinizin silinmesini (unutulma hakkı) veya anonim hale getirilmesini talep etme," : "Right to erasure / right to be forgotten,"}</li>
                <li>{language === "tr" ? "Kişisel verilerinizin işlenmesine itiraz etme ve kısıtlama talep etme." : "Right to object to or restrict processing."}</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${cardBg} border rounded-2xl p-6 md:p-8`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${heading}`}>
              {language === "tr" ? "4. İletişim ve Veri Sorumlusu" : language === "ru" ? "4. Контакты" : "4. Contact Information & Data Controller"}
            </h2>
            <p className={`text-sm leading-relaxed ${desc}`}>
              {language === "tr"
                ? "Gizlilik politikamız veya kişisel verilerinizle ilgili sorularınız için bizimle support@str-energy.com e-posta adresi üzerinden iletişime geçebilirsiniz."
                : "For questions regarding our Privacy Policy or personal data practices, please contact us at support@str-energy.com."}
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
