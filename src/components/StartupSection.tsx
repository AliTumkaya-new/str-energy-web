"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Factory, FlaskConical, Handshake, Rocket } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const copyByLanguage = {
  tr: {
    badge: "ERKEN AŞAMA ENERJİ TEKNOLOJİLERİ GİRİŞİMİ",
    title: "Türkiye’den doğan enerji zekâsını küresel ölçekte büyütüyoruz.",
    description:
      "STR — Smart Technologies for Renewables, endüstriyel tesislerin enerji ve üretim performansını açıklanabilir yapay zekâ ile iyileştiren bir teknoloji girişimidir. Ürün geliştirme ve pilot doğrulama aşamasındayız; erken aşama yatırımcılar ve stratejik sanayi ortaklarıyla görüşmeye açığız.",
    primary: "Yatırımcı sayfasını incele",
    secondary: "Tanışma görüşmesi planla",
    status: "Şu an neredeyiz?",
    stages: [
      ["Ürün Ar-Ge", "Tek platform mimarisi ve karar zekâsı"],
      ["Saha pilotları", "Gerçek tesis verisiyle doğrulama"],
      ["AI + dijital ikiz", "Beklenen–gerçekleşen farkını açıklama"],
      ["Stratejik ortaklık", "Sanayi, teknoloji ve pazara erişim"],
    ],
  },
  en: {
    badge: "EARLY-STAGE ENERGY TECHNOLOGY STARTUP",
    title: "Building energy intelligence in Türkiye for global industry.",
    description:
      "STR — Smart Technologies for Renewables is an energy technology startup improving industrial energy and production performance with explainable AI. We are in product development and pilot validation, and open to conversations with early-stage investors and strategic industrial partners.",
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
    badge: "ЭНЕРГЕТИЧЕСКИЙ СТАРТАП РАННЕЙ СТАДИИ",
    title: "Создаем в Турции энергетическую аналитику для мировой промышленности.",
    description:
      "STR — Smart Technologies for Renewables — технологический стартап, который улучшает энергетическую и производственную эффективность предприятий с помощью объяснимого ИИ. Мы находимся на этапе разработки продукта и пилотной проверки и открыты к диалогу с ранними инвесторами и стратегическими промышленными партнерами.",
    primary: "Страница для инвесторов",
    secondary: "Назначить встречу",
    status: "Текущий этап",
    stages: [
      ["Разработка продукта", "Единая архитектура и аналитика решений"],
      ["Полевые пилоты", "Проверка на реальных данных предприятия"],
      ["ИИ + цифровой двойник", "Объяснение разрыва между планом и фактом"],
      ["Стратегические партнерства", "Промышленность, технологии и выход на рынок"],
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
