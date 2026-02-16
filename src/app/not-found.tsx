"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Zap } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const copy = {
  title: { tr: "Sayfa Bulunamadı", en: "Page Not Found", ru: "Страница не найдена" },
  code: "404",
  desc: {
    tr: "Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.",
    en: "The page you're looking for may have been moved, deleted, or never existed.",
    ru: "Страница, которую вы ищете, могла быть перемещена, удалена или никогда не существовала.",
  },
  home: { tr: "Ana Sayfa", en: "Home", ru: "Главная" },
  back: { tr: "Geri Dön", en: "Go Back", ru: "Назад" },
};

export default function NotFound() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const lang = language === "en" || language === "ru" ? language : "tr";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 ${
        isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"
      }`}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* 404 Number */}
        <div className="relative mb-6">
          <span
            className="text-[10rem] sm:text-[12rem] font-black leading-none tracking-tighter select-none"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #9a3412 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {copy.code}
          </span>
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 right-4 sm:right-8"
          >
            <Zap className="w-8 h-8 text-orange-500 opacity-60" />
          </motion.div>
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {copy.title[lang]}
        </h1>

        {/* Description */}
        <p className={`text-base mb-10 leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
          {copy.desc[lang]}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm hover:bg-orange-400 transition shadow-lg shadow-orange-500/25"
          >
            <Home className="w-4 h-4" />
            {copy.home[lang]}
          </Link>
          <button
            onClick={() => window.history.back()}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition ${
              isDark
                ? "border-white/15 text-zinc-300 hover:border-orange-500/40 hover:text-white"
                : "border-zinc-300 text-zinc-600 hover:border-orange-500/40 hover:text-zinc-900"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {copy.back[lang]}
          </button>
        </div>

        {/* Brand */}
        <p className={`mt-16 text-xs ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
          STR Energy — www.str.energy
        </p>
      </motion.div>
    </div>
  );
}
