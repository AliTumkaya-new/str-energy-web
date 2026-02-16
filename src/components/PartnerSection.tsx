"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const partnerCards = [
  {
    key: "partners.eu",
    logo: "/project-logos/eu-flag.jpg",
    logoAlt: "European Union flag",
  },
  {
    key: "partners.tr",
    logo: "/project-logos/turkey-flag.svg",
    logoAlt: "Turkey flag",
  },
  {
    key: "partners.rnd",
    logo: "/project-logos/rnd-programs.svg",
    logoAlt: "R&D programs",
  },
  {
    key: "partners.industry",
    logo: "/project-logos/industry-integration.svg",
    logoAlt: "Industry integration",
  },
] as const;

export default function PartnerSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const isDark = theme === "dark";

  return (
    <section className={`py-16 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="container">
        <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.3em] ${
              isDark ? "bg-white/10 text-gray-200" : "bg-zinc-100 text-zinc-600"
            }`}>
              {t("partners.badge")}
            </span>
            <h2 className={`mt-4 text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>
              {t("partners.title")}
            </h2>
            <p className={`mt-4 text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
              {t("partners.subtitle")}
            </p>
            <p className={`mt-4 text-base ${isDark ? "text-gray-300" : "text-zinc-700"}`}>
              {t("partners.note")}
            </p>
            <a
              href={withLocale("/contacts")}
              className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors"
            >
              {t("partners.cta")}
            </a>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
            {partnerCards.map((card) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-3xl border px-5 py-3 flex items-center gap-4 transition-all ${
                  isDark ? "border-white/10 bg-zinc-900/60" : "border-black/10 bg-white"
                }`}
              >
                <div className={`absolute -right-16 -top-12 h-28 w-28 rounded-full blur-3xl opacity-0 group-hover:opacity-100 ${
                  isDark ? "bg-orange-500/10" : "bg-orange-500/15"
                }`} />
                <div className={`relative rounded-2xl border px-3 py-2 shrink-0 ${isDark ? "bg-white/5 border-white/10" : "bg-zinc-50 border-black/10"}`}>
                  <Image
                    src={card.logo}
                    alt={card.logoAlt}
                    width={160}
                    height={60}
                    className="h-11 w-32 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-base font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>
                    {t(`${card.key}.title`)}
                  </div>
                  <div className={`text-sm mt-1.5 leading-snug ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
                    {t(`${card.key}.desc`)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
