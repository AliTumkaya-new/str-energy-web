"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon, Phone, Zap, BarChart3, TrendingUp, Shield, Gauge, Cloud, Users, Lock, HelpCircle, Mail, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { getLocaleFromPathname, prefixHrefWithLocale, replaceLocaleInPath, supportedLocales, type SupportedLocale } from "@/lib/locale";

const products = [
  { key: "energyos", icon: Zap },
  { key: "gridanalytics", icon: BarChart3 },
  { key: "powerforecast", icon: TrendingUp },
  { key: "securegrid", icon: Shield },
  { key: "smartmeter", icon: Gauge },
  { key: "energycloud", icon: Cloud },
];

const companyLinks = [
  { key: "nav.about", icon: Users, href: "/about" },
  { key: "nav.news", icon: Sparkles, href: "/news" },
  { key: "nav.privacy", icon: Lock, href: "/privacy" },
  { key: "nav.help", icon: HelpCircle, href: "/help" },
  { key: "nav.contacts", icon: Mail, href: "/contacts" },
];

type HeaderProps = {
  variant?: "default" | "floating";
};

export default function Header({ variant = "default" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [queryString] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.location.search.replace(/^\?/, "");
  });
  const router = useRouter();
  const isDark = theme === "dark";
  const isFloating = variant === "floating";
  const currentLocale = (getLocaleFromPathname(pathname) || language || "tr") as SupportedLocale;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages = [
    { code: "tr" as const, label: "TR" },
    { code: "en" as const, label: "EN" },
    { code: "ru" as const, label: "RU" },
  ];

  const withLocale = (href: string) => prefixHrefWithLocale(href, currentLocale);
  const onLanguageSelect = (lang: SupportedLocale) => {
    if (!supportedLocales.includes(lang)) return;
    const nextPath = replaceLocaleInPath(pathname || "/", lang);
    const nextUrl = queryString ? `${nextPath}?${queryString}` : nextPath;
    setLanguage(lang);
    router.push(nextUrl);
  };

  const handleDropdownClick = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isFloating ? "py-2 md:py-3" : ""
      } ${
        !isFloating && isScrolled
          ? isDark
            ? "bg-black/90 backdrop-blur-xl border-b border-white/5"
            : "bg-white/80 backdrop-blur-xl border-b border-black/10"
          : !isFloating
            ? "bg-transparent"
            : "bg-transparent"
      }`}
    >
      <div className={isFloating ? "px-3 sm:px-6" : "container"}>
        <div
          className={
            isFloating
              ? `mx-auto max-w-6xl transition-all duration-300 ${
                  isScrolled
                    ? isDark
                      ? "bg-zinc-950/75 backdrop-blur-xl border border-white/10 shadow-[0_14px_40px_-18px_rgba(0,0,0,0.65)]"
                      : "bg-white/85 backdrop-blur-xl border border-black/10 shadow-[0_14px_40px_-18px_rgba(0,0,0,0.35)]"
                    : "bg-transparent border border-transparent"
                } transform-gpu ${isScrolled ? "translate-y-2" : "translate-y-0"} rounded-2xl`
              : ""
          }
        >
          <nav className={`flex items-center ${isFloating ? "px-3 sm:px-5" : ""} h-16 md:h-20`}>
          {/* Logo */}
          <Link href={withLocale("/")} className="flex items-center gap-2" aria-label={t("brand.name")}>
            <Image
              src="/logo.png"
              alt={t("brand.name")}
              width={360}
              height={96}
              className="h-14 md:h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 md:ml-6">
            {/* Products Dropdown */}
            <div className="relative" data-dropdown>
              <button 
                onClick={() => handleDropdownClick("products")}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  activeDropdown === "products" 
                    ? "text-orange-500 bg-orange-500/10" 
                    : isDark
                      ? "text-gray-300 hover:text-orange-500 hover:bg-orange-500/5"
                      : "text-zinc-700 hover:text-orange-600 hover:bg-orange-500/10"
                }`}
              >
                {t("nav.products")}
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "products" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === "products" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full left-0 mt-2 w-125 backdrop-blur-xl rounded-2xl border shadow-2xl overflow-hidden ${
                      isDark
                        ? "bg-zinc-900/95 border-white/10"
                        : "bg-white/92 border-black/10"
                    }`}
                  >
                    {/* 2-Column Grid */}
                    <div className="grid grid-cols-2 gap-1 p-3">
                      {products.map((product) => {
                        const Icon = product.icon;
                        return (
                          <Link
                            key={product.key}
                            href={withLocale(`/products/${product.key}`)}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-orange-500/10 transition-colors group"
                          >
                            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-orange-500/30 transition-colors">
                              <Icon className="w-4 h-4 text-orange-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`${
                                isDark
                                  ? "text-white"
                                  : "text-zinc-900"
                              } font-medium text-sm group-hover:text-orange-500 transition-colors`}>
                                {t(`product.${product.key}`)}
                              </div>
                              <div className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-xs mt-0.5 line-clamp-2`}>
                                {t(`product.${product.key}.desc`)}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    {/* Footer section */}
                    <div className={`border-t px-4 py-3 ${
                      isDark
                        ? "border-white/5 bg-zinc-800/50"
                        : "border-black/10 bg-zinc-100/70"
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`${isDark ? "text-gray-400" : "text-zinc-600"} text-sm`}>{t("nav.products.cta")}</span>
                        <Link 
                          href={withLocale("/contacts")} 
                          onClick={() => setActiveDropdown(null)}
                          className="text-orange-500 text-sm font-medium hover:underline"
                        >
                          {t("nav.products.cta.link")}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company Dropdown */}
            <div className="relative" data-dropdown>
              <button 
                onClick={() => handleDropdownClick("company")}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  activeDropdown === "company" 
                    ? "text-orange-500 bg-orange-500/10" 
                    : isDark
                      ? "text-gray-300 hover:text-orange-500 hover:bg-orange-500/5"
                      : "text-zinc-700 hover:text-orange-600 hover:bg-orange-500/10"
                }`}
              >
                {t("nav.company")}
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "company" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === "company" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full left-0 mt-2 w-[320px] backdrop-blur-xl rounded-2xl border shadow-2xl overflow-hidden ${
                      isDark
                        ? "bg-zinc-900/95 border-white/10"
                        : "bg-white/92 border-black/10"
                    }`}
                  >
                    {/* 2-Column Grid Company dropdown */}
                    <div className="grid grid-cols-2 gap-1 p-3">
                      {companyLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.key}
                            href={withLocale(link.href)}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-orange-500/10 transition-colors group"
                          >
                            <Icon className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className={`${
                                isDark
                                  ? "text-white"
                                  : "text-zinc-900"
                              } font-medium text-sm group-hover:text-orange-500 transition-colors`}>
                                {t(link.key)}
                              </div>
                              <div className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-xs mt-0.5 line-clamp-2`}>
                                {t(`${link.key}.desc`)}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href={withLocale("/contacts")} 
              className={`px-4 py-2 rounded-lg transition-all ${
                isDark
                  ? "text-gray-300 hover:text-orange-500 hover:bg-orange-500/5"
                  : "text-zinc-700 hover:text-orange-600 hover:bg-orange-500/10"
              }`}
            >
              {t("nav.contacts")}
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              role="switch"
              aria-checked={theme === "dark"}
              aria-label="Tema değiştir"
              className={`relative inline-flex h-9 w-16 items-center rounded-full border shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
                theme === "dark"
                  ? "bg-zinc-900/60 border-white/10 hover:border-white/20"
                  : "bg-zinc-200/70 border-black/10 hover:border-black/20"
              }`}
            >
              <Sun
                aria-hidden="true"
                className={`pointer-events-none absolute left-2 z-0 h-4 w-4 transition-colors ${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-900"
                }`}
              />
              <Moon
                aria-hidden="true"
                className={`pointer-events-none absolute right-2 z-0 h-4 w-4 transition-colors ${
                  theme === "dark" ? "text-zinc-300" : "text-zinc-500"
                }`}
              />
              <motion.span
                className={`absolute left-1 top-1 z-0 h-7 w-7 rounded-full shadow-md ring-1 transition-colors ${
                  theme === "dark"
                    ? "bg-white ring-white/20"
                    : "bg-white ring-black/10"
                }`}
                animate={{ x: theme === "dark" ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              >
                <span className="pointer-events-none absolute inset-0 grid place-items-center">
                  {theme === "dark" ? (
                    <Moon aria-hidden="true" className="h-4 w-4 text-zinc-900" />
                  ) : (
                    <Sun aria-hidden="true" className="h-4 w-4 text-zinc-900" />
                  )}
                </span>
                <span className="sr-only">{theme === "dark" ? "Koyu" : "Açık"}</span>
              </motion.span>
            </button>

            {/* Language Switcher */}
            <div className={`flex items-center gap-0.5 text-sm rounded-lg p-1 ${
              isDark ? "bg-zinc-800/50" : "bg-zinc-200/70"
            }`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageSelect(lang.code)}
                  className={`px-2.5 py-1.5 rounded-md transition-all ${
                    language === lang.code
                      ? "text-black bg-orange-500 font-medium"
                      : isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Phone */}
            <a
              href="https://wa.me/905449187090"
              target="_blank"
              rel="noopener noreferrer"
              title={"+90 544 918 70 90"}
              aria-label="WhatsApp"
              className="flex items-center gap-2 px-3 py-2 text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ml-auto ${
              isDark ? "text-gray-400 hover:text-white" : "text-zinc-700 hover:text-black"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
              data-dropdown
            >
              <div className={`py-4 border-t ${isDark ? "border-white/10" : "border-black/10"} ${isDark ? "bg-black/80" : "bg-white/90"}`}>
                <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
                  {/* Products */}
                  <div>
                    <button 
                      onClick={() => handleDropdownClick("mobile-products")}
                      className={`flex items-center justify-between w-full p-3 rounded-lg ${
                        isDark ? "text-gray-300 hover:bg-white/5" : "text-zinc-700 hover:bg-black/5"
                      }`}
                    >
                      {t("nav.products")}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "mobile-products" ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === "mobile-products" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 py-2 space-y-1">
                            {products.map((product) => {
                              const Icon = product.icon;
                              return (
                                <Link
                                  key={product.key}
                                  href={withLocale(`/products/${product.key}`)}
                                  className={`flex items-center gap-3 p-2 rounded-lg ${
                                    isDark ? "text-gray-400 hover:text-orange-500" : "text-zinc-600 hover:text-orange-600"
                                  }`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <Icon className="w-4 h-4 text-orange-500" />
                                  {t(`product.${product.key}`)}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Company */}
                  <div>
                    <button 
                      onClick={() => handleDropdownClick("mobile-company")}
                      className={`flex items-center justify-between w-full p-3 rounded-lg ${
                        isDark ? "text-gray-300 hover:bg-white/5" : "text-zinc-700 hover:bg-black/5"
                      }`}
                    >
                      {t("nav.company")}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "mobile-company" ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === "mobile-company" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 py-2 space-y-1">
                            {companyLinks.map((link) => {
                              const Icon = link.icon;
                              return (
                                <Link 
                                  key={link.key}
                                  href={withLocale(link.href)} 
                                  className={`flex items-center gap-3 p-2 rounded-lg ${
                                    isDark ? "text-gray-400 hover:text-orange-500" : "text-zinc-600 hover:text-orange-600"
                                  }`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <Icon className="w-4 h-4 text-orange-500" />
                                  {t(link.key)}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link 
                    href={withLocale("/contacts")} 
                    className={`p-3 rounded-lg ${
                      isDark ? "text-gray-300 hover:text-orange-500 hover:bg-white/5" : "text-zinc-700 hover:text-orange-600 hover:bg-black/5"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.contacts")}
                  </Link>
                  
                  <div className={`flex items-center gap-4 pt-4 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
                    <button
                      onClick={toggleTheme}
                      role="switch"
                      aria-checked={theme === "dark"}
                      aria-label="Tema değiştir"
                      className={`relative inline-flex h-8 w-14 items-center rounded-full border shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
                        theme === "dark"
                          ? "bg-zinc-900/60 border-white/10"
                          : "bg-zinc-200/70 border-black/10"
                      }`}
                    >
                      <Sun
                        aria-hidden="true"
                        className={`pointer-events-none absolute left-2 z-0 h-3.5 w-3.5 transition-colors ${
                          theme === "dark" ? "text-zinc-500" : "text-zinc-900"
                        }`}
                      />
                      <Moon
                        aria-hidden="true"
                        className={`pointer-events-none absolute right-2 z-0 h-3.5 w-3.5 transition-colors ${
                          theme === "dark" ? "text-zinc-300" : "text-zinc-500"
                        }`}
                      />
                      <motion.span
                        className={`absolute left-1 top-1 z-0 h-6 w-6 rounded-full shadow-md ring-1 transition-colors ${
                          theme === "dark"
                            ? "bg-white ring-white/20"
                            : "bg-white ring-black/10"
                        }`}
                        animate={{ x: theme === "dark" ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      >
                        <span className="pointer-events-none absolute inset-0 grid place-items-center">
                          {theme === "dark" ? (
                            <Moon aria-hidden="true" className="h-3.5 w-3.5 text-zinc-900" />
                          ) : (
                            <Sun aria-hidden="true" className="h-3.5 w-3.5 text-zinc-900" />
                          )}
                        </span>
                        <span className="sr-only">{theme === "dark" ? "Koyu" : "Açık"}</span>
                      </motion.span>
                    </button>
                    <div className={`flex items-center gap-1 rounded-lg p-1 ${isDark ? "bg-zinc-800/50" : "bg-zinc-200/70"}`}>
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => onLanguageSelect(lang.code)}
                          className={`px-2 py-1 text-sm rounded ${
                            language === lang.code
                              ? "text-black bg-orange-500"
                              : isDark
                                ? "text-gray-500"
                                : "text-zinc-600"
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>

                    <a
                      href="https://wa.me/905449187090"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto p-2 text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all"
                      aria-label="WhatsApp"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
