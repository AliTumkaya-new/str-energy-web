"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="about"
      className={`relative py-20 overflow-hidden ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.08),transparent_34%),linear-gradient(to_right,rgba(113,113,122,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(113,113,122,0.05)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Title */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 str-hero-line str-hero-line--plain ${isDark ? "text-white" : "text-zinc-900"}`}>
              {t("about.home.title")}
            </h2>
            <p className={`text-xl ${isDark ? "text-gray-400" : "text-zinc-700"}`}>
              {t("about.subtitle")}
            </p>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className={`${isDark ? "text-gray-400" : "text-zinc-700"} mb-8 leading-relaxed`}>
              {t("about.description")}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-orange-500" />
                </div>
                <span className={isDark ? "text-gray-300" : "text-zinc-800"}>{t("about.feature1")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-orange-500" />
                </div>
                <span className={isDark ? "text-gray-300" : "text-zinc-800"}>{t("about.feature2")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
