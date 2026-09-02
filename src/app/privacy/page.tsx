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
                    Web sitemizde (<strong>str-energy.com</strong>) Google AdSense entegrasyon kodu bulunmaktadır. Reklam sunumu etkin olduğunda Google ve reklam teknolojisi ortakları, kullanıcı tercihi ve geçerli izinlere bağlı olarak reklam sunma, ölçme, güvenlik ve kötüye kullanımı önleme amaçlarıyla çerez veya benzer teknolojiler kullanabilir.
                  </>
                ) : language === "ru" ? (
                  <>
                    На сайте (<strong>str-energy.com</strong>) установлен интеграционный код Google AdSense. Когда показ рекламы включен, Google и партнеры могут использовать cookie или аналогичные технологии для показа и измерения рекламы, безопасности и предотвращения злоупотреблений с учетом выбора пользователя и применимых разрешений.
                  </>
                ) : (
                  <>
                    The website (<strong>str-energy.com</strong>) includes Google AdSense integration code. When ad serving is enabled, Google and advertising technology partners may use cookies or similar technologies to deliver and measure ads, provide security and prevent abuse, subject to user choices and applicable permissions.
                  </>
                )}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  {language === "tr"
                    ? "Google ve uygun reklam teknolojisi sağlayıcıları, reklam sunma ve ölçme amaçlarıyla veri işleyebilir. Kullanılan sağlayıcılar ve amaçlar, geçerli onay arayüzünde ve Google açıklamalarında gösterilir."
                    : language === "ru"
                    ? "Google и соответствующие рекламные технологические партнеры могут обрабатывать данные для показа и измерения рекламы. Поставщики и цели указываются в применимом интерфейсе согласия и уведомлениях Google."
                    : "Google and eligible advertising technology providers may process data to deliver and measure ads. The providers and purposes are identified in the applicable consent interface and Google's disclosures."}
                </li>
                <li>
                  {language === "tr"
                    ? "Kişiselleştirilmiş reklam, kişiselleştirilmemiş reklam veya sınırlı reklam davranışı; bölge, kullanıcı tercihi, hesap ayarı ve geçerli mevzuata göre farklılık gösterebilir."
                    : language === "ru"
                    ? "Персонализированная, неперсонализированная или ограниченная реклама может различаться в зависимости от региона, выбора пользователя, настроек аккаунта и применимых требований."
                    : "Personalized, non-personalized or limited ad behavior may vary by region, user choice, account setting and applicable legal requirements."}
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
                  ) : language === "ru" ? (
                    <>
                      Пользователи могут управлять персонализацией в{" "}
                      <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline hover:text-orange-400">Google Ads Settings</a>
                      . Дополнительная информация доступна в{" "}
                      <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline hover:text-orange-400">уведомлении Google для сайтов партнеров</a>.
                    </>
                  ) : (
                    <>
                      Users may opt out of personalized advertising by visiting{" "}
                      <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline hover:text-orange-400">
                        Google Ads Settings
                      </a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
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
                  : language === "ru"
                  ? "Стандартные журналы сервера могут содержать IP-адрес, тип браузера, дату и время, запрошенную страницу и технические сведения об ошибке. Эти данные используются для безопасности, диагностики, агрегированной статистики и улучшения сервиса и хранятся только в объеме, необходимом для этих целей."
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
                  : language === "ru"
                  ? "В соответствии с применимым законодательством о защите данных пользователи могут иметь следующие права:"
                  : "Under applicable data protection legislation (KVKK / GDPR), users hold the following rights regarding their personal data:"}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>{language === "tr" ? "Tarafımızca işlenen kişisel verilerinize erişim talep etme," : language === "ru" ? "запросить доступ к обрабатываемым персональным данным;" : "Right to access processed personal data,"}</li>
                <li>{language === "tr" ? "Eksik veya yanlış işlenen verilerinizin düzeltilmesini isteme," : language === "ru" ? "потребовать исправления неточных или неполных данных;" : "Right to rectification of incorrect or incomplete data,"}</li>
                <li>{language === "tr" ? "Verilerinizin silinmesini veya anonim hale getirilmesini talep etme," : language === "ru" ? "при наличии оснований запросить удаление или обезличивание данных;" : "Right to request erasure or anonymisation where applicable,"}</li>
                <li>{language === "tr" ? "Kişisel verilerinizin işlenmesine itiraz etme ve kısıtlama talep etme." : language === "ru" ? "возразить против обработки или потребовать ее ограничения в предусмотренных случаях." : "Right to object to or restrict processing where applicable."}</li>
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
                : language === "ru"
                ? "По вопросам политики конфиденциальности или персональных данных напишите на support@str-energy.com. Политика проверена 2 сентября 2026 г."
                : "For questions regarding our Privacy Policy or personal data practices, please contact us at support@str-energy.com."}
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
