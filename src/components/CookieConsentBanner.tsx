"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const cookieCopy = {
  tr: {
    title: "Çerez ve Gizlilik Tercihleriniz",
    desc: "STR Energy web sitemizde, ziyaretçi deneyimini iyileştirmek, site performansını analiz etmek ve Google AdSense reklam hizmetlerini mevzuata uygun şekilde sunabilmek amacıyla zorunlu ve analitik çerezler kullanmaktayız.",
    acceptAll: "Tümünü Kabul Et",
    essentialOnly: "Yalnızca Zorunlu",
    cookiePolicy: "Çerez Politikası",
    privacyPolicy: "Gizlilik Bildirimi",
  },
  en: {
    title: "Cookie & Privacy Preferences",
    desc: "STR Energy uses essential and analytics cookies to optimize user experience, analyze site performance, and serve compliant Google AdSense advertising services under privacy regulations.",
    acceptAll: "Accept All",
    essentialOnly: "Essential Only",
    cookiePolicy: "Cookie Policy",
    privacyPolicy: "Privacy Policy",
  },
  ru: {
    title: "Настройки файлов cookie и конфиденциальности",
    desc: "STR Energy использует обязательные и аналитические файлы cookie для оптимизации работы сайта и показа рекламы Google AdSense в соответствии с правилами конфиденциальности.",
    acceptAll: "Принять все",
    essentialOnly: "Только обязательные",
    cookiePolicy: "Политика cookie",
    privacyPolicy: "Политика конфиденциальности",
  },
} as const;

export default function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const isDark = theme === "dark";

  const text = cookieCopy[language as keyof typeof cookieCopy] || cookieCopy.en;

  useEffect(() => {
    try {
      const consent = localStorage.getItem("str_cookie_consent");
      if (!consent) {
        // Show banner after short delay for smooth entrance
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is disabled, isOpen remains false
    }
  }, []);

  const handleConsent = (level: "all" | "essential") => {
    try {
      localStorage.setItem(
        "str_cookie_consent",
        JSON.stringify({
          level,
          timestamp: new Date().toISOString(),
          version: "1.0",
        })
      );
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.aside
        aria-label={text.title}
        role="region"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-xl z-50 pointer-events-auto"
      >
        <div
          className={`rounded-2xl border p-5 md:p-6 shadow-2xl backdrop-blur-2xl transition-colors ${
            isDark
              ? "bg-zinc-950/95 border-white/10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              : "bg-white/95 border-black/10 text-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center border border-orange-500/25">
              <Cookie className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-sm md:text-base flex items-center gap-1.5">
                  {text.title}
                  <ShieldCheck className="h-4 w-4 text-emerald-500 inline" />
                </h3>
                <button
                  type="button"
                  onClick={() => handleConsent("essential")}
                  aria-label="Kapat"
                  className={`rounded-lg p-1 transition ${
                    isDark ? "text-zinc-500 hover:text-white hover:bg-white/10" : "text-zinc-400 hover:text-zinc-900 hover:bg-black/5"
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className={`mt-2 text-xs md:text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                {text.desc}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleConsent("all")}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-orange-500 hover:bg-orange-400 text-white transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/40"
                >
                  {text.acceptAll}
                </button>
                <button
                  type="button"
                  onClick={() => handleConsent("essential")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    isDark
                      ? "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-black/10"
                  }`}
                >
                  {text.essentialOnly}
                </button>

                <div className="flex items-center gap-3 text-xs ml-auto font-medium">
                  <Link
                    href={withLocale("/cookie-policy")}
                    className="text-orange-500 hover:underline"
                  >
                    {text.cookiePolicy}
                  </Link>
                  <span className={isDark ? "text-zinc-700" : "text-zinc-300"}>•</span>
                  <Link
                    href={withLocale("/privacy")}
                    className="text-orange-500 hover:underline"
                  >
                    {text.privacyPolicy}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
