"use client";

import { motion } from "framer-motion";
import { Zap, Settings, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const features = [
  {
    title: "devices.card1.title",
    desc: "devices.card1.desc",
    icon: Zap,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "devices.card2.title",
    desc: "devices.card2.desc",
    icon: Settings,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "devices.card3.title",
    desc: "devices.card3.desc",
    icon: TrendingUp,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

export default function DeviceSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section
      className={`relative py-24 overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(249,115,22,0.10),transparent_30%),linear-gradient(135deg,rgba(113,113,122,0.055)_1px,transparent_1px)] bg-[size:auto,36px_36px]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-left mb-12"
        >
          <span
            className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest ${
              theme === "dark" ? "bg-orange-500/20 text-orange-200" : "bg-orange-50 text-orange-700"
            }`}
          >
            {t("devices.section.badge")}
          </span>
          <h2
            className={`mt-4 text-3xl md:text-4xl font-bold ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            {t("devices.section.title")}
          </h2>
          <p className={`max-w-2xl mt-3 ${theme === "dark" ? "text-zinc-300" : "text-zinc-600"}`}>
            {t("devices.section.subtitle")}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden border rounded-3xl p-6 text-left transition-all bg-white border-black/10 shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
              >
                <div className={`absolute -top-12 right-0 h-32 w-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity ${feature.bg}`} />
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl border border-black/10 bg-zinc-50 p-3">
                  <div className={`w-11 h-11 ${feature.bg} rounded-2xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">
                  {t(feature.title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {t(feature.desc)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
