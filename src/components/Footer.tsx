"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Linkedin, Send, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, prefixHrefWithLocale, type SupportedLocale } from "@/lib/locale";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import WaveMeshPattern from "@/components/WaveMeshPattern";

const navigation = [
  { key: "footer.main", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "footer.faq", href: "/#faq" },
  { key: "footer.contacts", href: "/contacts" },
];

const products = [
  { key: "product.energyos", href: "/products/energyos" },
  { key: "product.gridanalytics", href: "/products/gridanalytics" },
  { key: "product.powerforecast", href: "/products/powerforecast" },
  { key: "product.securegrid", href: "/products/securegrid" },
  { key: "product.smartmeter", href: "/products/smartmeter" },
  { key: "product.energycloud", href: "/products/energycloud" },
];

const company = [
  { key: "nav.about", href: "/about" },
  { key: "nav.testimonials", href: "/testimonials" },
  { key: "nav.news", href: "/news" },
  { key: "nav.privacy", href: "/privacy" },
];

export default function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();
  const pathname = usePathname();
  const currentLocale = (getLocaleFromPathname(pathname) || "tr") as SupportedLocale;
  const withLocale = (href: string) => prefixHrefWithLocale(href, currentLocale);
  const email = t("contacts.value.email");
  const phoneDisplay = t("contacts.value.phone");
  const phoneHref = t("contacts.value.phone.href");
  const office = t("contacts.value.office");

  return (
    <footer id="contacts" className={`border-t ${isDark ? "bg-black border-white/5" : "bg-white border-black/10"}`}>
      {/* CTA Section */}
      <div
        ref={heroRef}
        onPointerEnter={onHeroPointerEnter}
        onPointerLeave={onHeroPointerLeave}
        onPointerMove={onHeroPointerMove}
        className={`relative py-16 border-b overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%] ${
          isDark ? "border-white/5" : "border-black/10"
        }`}
      >
        <div className={`absolute inset-0 ${isDark ? "bg-black" : "bg-white"}`}>
          <WaveMeshPattern
            className="w-full h-full"
            stroke={isDark ? "rgba(249,115,22,0.22)" : "rgba(0,0,0,0.08)"}
            strokeWidth={0.75}
            spacing={80}
            amplitude={14}
            frequency={0.011}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-200 ${patternHot ? "opacity-100" : "opacity-0"}`}
            style={{
              WebkitMaskImage:
                "radial-gradient(160px circle at var(--str-hex-x) var(--str-hex-y), #000 0 65%, transparent 100%)",
              maskImage:
                "radial-gradient(160px circle at var(--str-hex-x) var(--str-hex-y), #000 0 65%, transparent 100%)",
            }}
          >
            <WaveMeshPattern
              className="w-full h-full"
              stroke={isDark ? "rgba(255,168,75,0.95)" : "rgba(249,115,22,0.85)"}
              strokeWidth={1.15}
              spacing={80}
              amplitude={14}
              frequency={0.011}
            />
          </div>
        </div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
              href={`mailto:${email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-orange-500/25"
            >
              {t("footer.cta.button")}
            </motion.a>
          </motion.div>
        </div>
      </div>

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
                  href="#"
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:text-orange-500 transition-colors ${
                    isDark
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-black/5 text-zinc-600 hover:bg-black/10"
                  }`}
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
                  href="#"
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:text-orange-500 transition-colors ${
                    isDark
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-black/5 text-zinc-600 hover:bg-black/10"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:text-orange-500 transition-colors ${
                    isDark
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-black/5 text-zinc-600 hover:bg-black/10"
                  }`}
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
                    href={`mailto:${email}`}
                    className={`flex items-center gap-3 hover:text-orange-500 transition-colors ${
                      isDark ? "text-gray-500" : "text-zinc-600"
                    }`}
                  >
                    <Mail className="w-4 h-4 text-orange-500" />
                    {email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${phoneHref}`}
                    className={`flex items-center gap-3 hover:text-orange-500 transition-colors ${
                      isDark ? "text-gray-500" : "text-zinc-600"
                    }`}
                  >
                    <Phone className="w-4 h-4 text-orange-500" />
                    {phoneDisplay}
                  </a>
                </li>
                <li className={`flex items-start gap-3 ${isDark ? "text-gray-500" : "text-zinc-600"}`}>
                  <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                  {office}
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
            <div className="flex items-center gap-6 text-sm">
              <a href={withLocale("/privacy")} className={`${isDark ? "text-gray-500" : "text-zinc-600"} hover:text-orange-500 transition-colors`}>
                {t("nav.privacy")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
