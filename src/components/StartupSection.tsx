"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Factory, FlaskConical, Handshake, Rocket } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const copyByLanguage = {
  tr: {
    badge: "ERKEN AÅAMA ENERJÄ° TEKNOLOJÄ°LERÄ° GÄ°RÄ°ÅÄ°MÄ°",
    title: "TÃ¼rkiyeâ€™den doÄŸan enerji zekÃ¢sÄ±nÄ± kÃ¼resel Ã¶lÃ§ekte bÃ¼yÃ¼tÃ¼yoruz.",
    description:
      "STR â€” Smart Technologies for Renewables, endÃ¼striyel tesislerin enerji ve Ã¼retim performansÄ±nÄ± aÃ§Ä±klanabilir yapay zekÃ¢ ile iyileÅŸtiren bir teknoloji giriÅŸimidir. ÃœrÃ¼n geliÅŸtirme ve pilot doÄŸrulama aÅŸamasÄ±ndayÄ±z; erken aÅŸama yatÄ±rÄ±mcÄ±lar ve stratejik sanayi ortaklarÄ±yla gÃ¶rÃ¼ÅŸmeye aÃ§Ä±ÄŸÄ±z.",
    primary: "YatÄ±rÄ±mcÄ± sayfasÄ±nÄ± incele",
    secondary: "TanÄ±ÅŸma gÃ¶rÃ¼ÅŸmesi planla",
    status: "Åu an neredeyiz?",
    stages: [
      ["ÃœrÃ¼n Ar-Ge", "Tek platform mimarisi ve karar zekÃ¢sÄ±"],
      ["Saha pilotlarÄ±", "GerÃ§ek tesis verisiyle doÄŸrulama"],
      ["AI + dijital ikiz", "Beklenenâ€“gerÃ§ekleÅŸen farkÄ±nÄ± aÃ§Ä±klama"],
      ["Stratejik ortaklÄ±k", "Sanayi, teknoloji ve pazara eriÅŸim"],
    ],
  },
  en: {
    badge: "EARLY-STAGE ENERGY TECHNOLOGY STARTUP",
    title: "Building energy intelligence in TÃ¼rkiye for global industry.",
    description:
      "STR â€” Smart Technologies for Renewables is an energy technology startup improving industrial energy and production performance with explainable AI. We are in product development and pilot validation, and open to conversations with early-stage investors and strategic industrial partners.",
    primary: "Explore the investor page",
    secondary: "Schedule an introduction",
    status: "Where we are now",
    stages: [
      ["Product R&D", "Unified platform architecture and decision intelligence"],
      ["Field pilots", "Validation with real facility data"],
      ["AI + digital twin", "Explaining expected-versus-actual gaps"],
      ["Strategic partnerships", "Industry, technology and market access"],
    ],
  },
  ru: {
    badge: "Ğ­ĞĞ•Ğ Ğ“Ğ•Ğ¢Ğ˜Ğ§Ğ•Ğ¡ĞšĞ˜Ğ™ Ğ¡Ğ¢ĞĞ Ğ¢ĞĞŸ Ğ ĞĞĞĞ•Ğ™ Ğ¡Ğ¢ĞĞ”Ğ˜Ğ˜",
    title: "Ğ¡Ğ¾Ğ·Ğ´Ğ°ĞµĞ¼ Ğ² Ğ¢ÑƒÑ€Ñ†Ğ¸Ğ¸ ÑĞ½ĞµÑ€Ğ³ĞµÑ‚Ğ¸Ñ‡ĞµÑĞºÑƒÑ Ğ°Ğ½Ğ°Ğ»Ğ¸Ñ‚Ğ¸ĞºÑƒ Ğ´Ğ»Ñ Ğ¼Ğ¸Ñ€Ğ¾Ğ²Ğ¾Ğ¹ Ğ¿Ñ€Ğ¾Ğ¼Ñ‹ÑˆĞ»ĞµĞ½Ğ½Ğ¾ÑÑ‚Ğ¸.",
    description:
      "STR â€” Smart Technologies for Renewables â€” Ñ‚ĞµÑ…Ğ½Ğ¾Ğ»Ğ¾Ğ³Ğ¸Ñ‡ĞµÑĞºĞ¸Ğ¹ ÑÑ‚Ğ°Ñ€Ñ‚Ğ°Ğ¿, ĞºĞ¾Ñ‚Ğ¾Ñ€Ñ‹Ğ¹ ÑƒĞ»ÑƒÑ‡ÑˆĞ°ĞµÑ‚ ÑĞ½ĞµÑ€Ğ³ĞµÑ‚Ğ¸Ñ‡ĞµÑĞºÑƒÑ Ğ¸ Ğ¿Ñ€Ğ¾Ğ¸Ğ·Ğ²Ğ¾Ğ´ÑÑ‚Ğ²ĞµĞ½Ğ½ÑƒÑ ÑÑ„Ñ„ĞµĞºÑ‚Ğ¸Ğ²Ğ½Ğ¾ÑÑ‚ÑŒ Ğ¿Ñ€ĞµĞ´Ğ¿Ñ€Ğ¸ÑÑ‚Ğ¸Ğ¹ Ñ Ğ¿Ğ¾Ğ¼Ğ¾Ñ‰ÑŒÑ Ğ¾Ğ±ÑŠÑÑĞ½Ğ¸Ğ¼Ğ¾Ğ³Ğ¾ Ğ˜Ğ˜. ĞœÑ‹ Ğ½Ğ°Ñ…Ğ¾Ğ´Ğ¸Ğ¼ÑÑ Ğ½Ğ° ÑÑ‚Ğ°Ğ¿Ğµ Ñ€Ğ°Ğ·Ñ€Ğ°Ğ±Ğ¾Ñ‚ĞºĞ¸ Ğ¿Ñ€Ğ¾Ğ´ÑƒĞºÑ‚Ğ° Ğ¸ Ğ¿Ğ¸Ğ»Ğ¾Ñ‚Ğ½Ğ¾Ğ¹ Ğ¿Ñ€Ğ¾Ğ²ĞµÑ€ĞºĞ¸ Ğ¸ Ğ¾Ñ‚ĞºÑ€Ñ‹Ñ‚Ñ‹ Ğº Ğ´Ğ¸Ğ°Ğ»Ğ¾Ğ³Ñƒ Ñ Ñ€Ğ°Ğ½Ğ½Ğ¸Ğ¼Ğ¸ Ğ¸Ğ½Ğ²ĞµÑÑ‚Ğ¾Ñ€Ğ°Ğ¼Ğ¸ Ğ¸ ÑÑ‚Ñ€Ğ°Ñ‚ĞµĞ³Ğ¸Ñ‡ĞµÑĞºĞ¸Ğ¼Ğ¸ Ğ¿Ñ€Ğ¾Ğ¼Ñ‹ÑˆĞ»ĞµĞ½Ğ½Ñ‹Ğ¼Ğ¸ Ğ¿Ğ°Ñ€Ñ‚Ğ½ĞµÑ€Ğ°Ğ¼Ğ¸.",
    primary: "Ğ¡Ñ‚Ñ€Ğ°Ğ½Ğ¸Ñ†Ğ° Ğ´Ğ»Ñ Ğ¸Ğ½Ğ²ĞµÑÑ‚Ğ¾Ñ€Ğ¾Ğ²",
    secondary: "ĞĞ°Ğ·Ğ½Ğ°Ñ‡Ğ¸Ñ‚ÑŒ Ğ²ÑÑ‚Ñ€ĞµÑ‡Ñƒ",
    status: "Ğ¢ĞµĞºÑƒÑ‰Ğ¸Ğ¹ ÑÑ‚Ğ°Ğ¿",
    stages: [
      ["Ğ Ğ°Ğ·Ñ€Ğ°Ğ±Ğ¾Ñ‚ĞºĞ° Ğ¿Ñ€Ğ¾Ğ´ÑƒĞºÑ‚Ğ°", "Ğ•Ğ´Ğ¸Ğ½Ğ°Ñ Ğ°Ñ€Ñ…Ğ¸Ñ‚ĞµĞºÑ‚ÑƒÑ€Ğ° Ğ¸ Ğ°Ğ½Ğ°Ğ»Ğ¸Ñ‚Ğ¸ĞºĞ° Ñ€ĞµÑˆĞµĞ½Ğ¸Ğ¹"],
      ["ĞŸĞ¾Ğ»ĞµĞ²Ñ‹Ğµ Ğ¿Ğ¸Ğ»Ğ¾Ñ‚Ñ‹", "ĞŸÑ€Ğ¾Ğ²ĞµÑ€ĞºĞ° Ğ½Ğ° Ñ€ĞµĞ°Ğ»ÑŒĞ½Ñ‹Ñ… Ğ´Ğ°Ğ½Ğ½Ñ‹Ñ… Ğ¿Ñ€ĞµĞ´Ğ¿Ñ€Ğ¸ÑÑ‚Ğ¸Ñ"],
      ["Ğ˜Ğ˜ + Ñ†Ğ¸Ñ„Ñ€Ğ¾Ğ²Ğ¾Ğ¹ Ğ´Ğ²Ğ¾Ğ¹Ğ½Ğ¸Ğº", "ĞĞ±ÑŠÑÑĞ½ĞµĞ½Ğ¸Ğµ Ñ€Ğ°Ğ·Ñ€Ñ‹Ğ²Ğ° Ğ¼ĞµĞ¶Ğ´Ñƒ Ğ¿Ğ»Ğ°Ğ½Ğ¾Ğ¼ Ğ¸ Ñ„Ğ°ĞºÑ‚Ğ¾Ğ¼"],
      ["Ğ¡Ñ‚Ñ€Ğ°Ñ‚ĞµĞ³Ğ¸Ñ‡ĞµÑĞºĞ¸Ğµ Ğ¿Ğ°Ñ€Ñ‚Ğ½ĞµÑ€ÑÑ‚Ğ²Ğ°", "ĞŸÑ€Ğ¾Ğ¼Ñ‹ÑˆĞ»ĞµĞ½Ğ½Ğ¾ÑÑ‚ÑŒ, Ñ‚ĞµÑ…Ğ½Ğ¾Ğ»Ğ¾Ğ³Ğ¸Ğ¸ Ğ¸ Ğ²Ñ‹Ñ…Ğ¾Ğ´ Ğ½Ğ° Ñ€Ñ‹Ğ½Ğ¾Ğº"],
    ],
  },
} as const;

const icons = [FlaskConical, Factory, BrainCircuit, Handshake];

export default function StartupSection() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const copy = copyByLanguage[language] ?? copyByLanguage.tr;
  const isDark = theme === "dark";

  return (
    <section id="startup" className={`py-20 ${isDark ? "bg-zinc-950" : "bg-zinc-50"}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className={`relative overflow-hidden rounded-[2rem] border p-7 md:p-10 lg:p-14 ${
            isDark ? "border-white/10 bg-black" : "border-black/10 bg-white"
          }`}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-80 rounded-full bg-amber-300/5 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-orange-500">
                <Rocket className="h-4 w-4" />
                {copy.badge}
              </div>
              <h2 className={`mt-6 max-w-3xl text-3xl font-bold leading-tight md:text-5xl ${isDark ? "text-white" : "text-zinc-950"}`}>
                {copy.title}
              </h2>
              <p className={`mt-6 max-w-2xl text-base leading-8 md:text-lg ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                {copy.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={withLocale("/energy-startup")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-orange-400"
                >
                  {copy.primary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={withLocale("/contacts")}
                  className={`inline-flex items-center justify-center rounded-full border px-6 py-3.5 text-sm font-semibold transition ${
                    isDark ? "border-white/15 text-white hover:bg-white/5" : "border-black/15 text-zinc-900 hover:bg-black/5"
                  }`}
                >
                  {copy.secondary}
                </Link>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-orange-500">
                <span className="h-px w-8 bg-orange-500" />
                {copy.status}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {copy.stages.map(([title, description], index) => {
                  const Icon = icons[index];
                  return (
                    <div
                      key={title}
                      className={`rounded-2xl border p-5 ${
                        isDark ? "border-white/10 bg-white/[0.035]" : "border-black/10 bg-zinc-50"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-orange-500" />
                      <h3 className={`mt-4 font-semibold ${isDark ? "text-white" : "text-zinc-950"}`}>{title}</h3>
                      <p className={`mt-2 text-sm leading-6 ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

