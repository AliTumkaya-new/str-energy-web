"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin, Mail, Instagram, Linkedin, Send, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, prefixHrefWithLocale, type SupportedLocale } from "@/lib/locale";

const navigation = [
  { key: "footer.main", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "footer.faq", href: "/#faq" },
  { key: "footer.contacts", href: "/contacts" },
];

const products = [
  { key: "product.intelligence", href: "/about" },
];

const company = [
  { key: "nav.investors", href: "/about" },
  { key: "nav.marketData", href: "/projects/market-data" },
  { key: "nav.methodology", href: "/methodology/market-data" },
  { key: "nav.insights", href: "/insights" },
  { key: "nav.about", href: "/about" },
  { key: "nav.editorialPolicy", href: "/editorial-policy" },
  { key: "nav.editorialTeam", href: "/authors/str-energy-editorial-team" },
  { key: "nav.privacy", href: "/privacy" },
  { key: "nav.terms", href: "/terms" },
  { key: "nav.cookiePolicy", href: "/cookie-policy" },
  { key: "nav.disclaimer", href: "/disclaimer" },
];

export default function Footer({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();
  const currentLocale = (getLocaleFromPathname(pathname) || "tr") as SupportedLocale;
  const withLocale = (href: string) => prefixHrefWithLocale(href, currentLocale);

  const phoneDisplay = t("contacts.value.phone");
  const phoneHref = t("contacts.value.phone.href");
  const office = t("contacts.value.office");

  return (
    <footer id="contacts" className={`border-t ${isDark ? "bg-black border-white/5" : "bg-white border-black/10"}`}>
      {/* CTA Section */}
      {!compact && (
        <div
          className={`relative py-16 border-b overflow-hidden ${
            isDark ? "border-white/5" : "border-black/10"
          }`}
        >
          <div className={`pointer-events-none absolute inset-0 ${isDark ? "bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.12),transparent_55%)]" : "bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.08),transparent_55%)]"}`} />
          <div className="container relative">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 md:p-12 text-center border ${
                isDark ? "bg-black/60 border-white/10" : "bg-white/80 border-black/10"
              }`}
            >
              <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-zinc-900"}`}>
                {t("footer.cta.title")}
              </h2>
              <motion.a
                href={withLocale("/contacts")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-orange-500/25"
              >
                {t("footer.cta.button")}
              </motion.a>
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <a href={withLocale("/")} className="flex items-center gap-2 mb-4" aria-label={t("brand.name")}>
                <Image
                  src="/logo.png"
                  alt={t("brand.name")}
                  width={360}
                  height={96}
                  className="h-14 md:h-16 w-auto"
                />
              </a>
              <p className="text-gray-500 mb-6 max-w-sm">
                {t("footer.description")}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={withLocale("/contacts")}
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:text-orange-500 transition-colors ${
                    isDark
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-black/5 text-zinc-600 hover:bg-black/10"
                  }`}
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/str-enerji"
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:text-orange-500 transition-colors ${
                    isDark
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-black/5 text-zinc-600 hover:bg-black/10"
                  }`}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={withLocale("/contacts")}
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:text-orange-500 transition-colors ${
                    isDark
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-black/5 text-zinc-600 hover:bg-black/10"
                  }`}
                  aria-label="Contact"
                >
                  <Send className="w-5 h-5" />
                </a>
                <a
                  href={withLocale("/contacts")}
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:text-orange-500 transition-colors ${
                    isDark
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-black/5 text-zinc-600 hover:bg-black/10"
                  }`}
                  aria-label="Contact chat"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className={`${isDark ? "text-white" : "text-zinc-900"} font-semibold mb-4`}>{t("footer.navigation")}</h4>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.key}>
                    <a
                      href={withLocale(item.href)}
                      className={`${isDark ? "text-gray-500" : "text-zinc-600"} hover:text-orange-500 transition-colors`}
                    >
                      {t(item.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className={`${isDark ? "text-white" : "text-zinc-900"} font-semibold mb-4`}>{t("nav.products")}</h4>
              <ul className="space-y-3">
                {products.map((item) => (
                  <li key={item.key}>
                    <a
                      href={withLocale(item.href)}
                      className={`${isDark ? "text-gray-500" : "text-zinc-600"} hover:text-orange-500 transition-colors`}
                    >
                      {t(item.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className={`${isDark ? "text-white" : "text-zinc-900"} font-semibold mb-4`}>{t("footer.company")}</h4>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.key}>
                    <a
                      href={withLocale(item.href)}
                      className={`${isDark ? "text-gray-500" : "text-zinc-600"} hover:text-orange-500 transition-colors`}
                    >
                      {t(item.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className={`${isDark ? "text-white" : "text-zinc-900"} font-semibold mb-4`}>{t("footer.contacts")}</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`https://wa.me/${phoneHref.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 hover:text-orange-500 transition-colors ${
                      isDark ? "text-gray-500" : "text-zinc-600"
                    }`}
                  >
                    <Phone className="w-4 h-4 text-orange-500" />
                    {phoneDisplay}
                  </a>
                </li>
                <li>
                  <span
                    className={`flex items-center gap-3 ${
                      isDark ? "text-gray-500" : "text-zinc-600"
                    }`}
                  >
                    <Mail className="w-4 h-4 text-orange-500" />
                    support@str-energy.com
                  </span>
                </li>
                <li>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-start gap-3 hover:text-orange-500 transition-colors ${
                      isDark ? "text-gray-500" : "text-zinc-600"
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                    {office}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`py-6 border-t ${isDark ? "border-white/5" : "border-black/10"}`}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`${isDark ? "text-gray-600" : "text-zinc-600"} text-sm`}>
              © 2026 {t("brand.name")} — {t("footer.rights")}
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm">
              <a href={withLocale("/privacy")} className={`${isDark ? "text-gray-500" : "text-zinc-600"} hover:text-orange-500 transition-colors`}>
                {t("nav.privacy")}
              </a>
              <a href={withLocale("/terms")} className={`${isDark ? "text-gray-500" : "text-zinc-600"} hover:text-orange-500 transition-colors`}>
                {t("nav.terms")}
              </a>
              <a href={withLocale("/cookie-policy")} className={`${isDark ? "text-gray-500" : "text-zinc-600"} hover:text-orange-500 transition-colors`}>
                {t("nav.cookiePolicy")}
              </a>
              <a href={withLocale("/disclaimer")} className={`${isDark ? "text-gray-500" : "text-zinc-600"} hover:text-orange-500 transition-colors`}>
                {t("nav.disclaimer")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
