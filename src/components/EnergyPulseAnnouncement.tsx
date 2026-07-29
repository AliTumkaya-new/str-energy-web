"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const copyByLanguage = {
  tr: {
    label: "YENİ ÜRÜN",
    shortText: "EnergyPulse yayında.",
    text: "EnergyPulse ile enerji piyasası verileri tek ekranda.",
    action: "Keşfet",
  },
  en: {
    label: "NEW PRODUCT",
    shortText: "EnergyPulse is live.",
    text: "Explore energy market data in one place with EnergyPulse.",
    action: "Explore",
  },
  ru: {
    label: "НОВЫЙ ПРОДУКТ",
    shortText: "EnergyPulse уже доступен.",
    text: "Данные энергорынков в одном месте с EnergyPulse.",
    action: "Открыть",
  },
} as const;

export default function EnergyPulseAnnouncement() {
  const { language } = useLanguage();
  const withLocale = useLocaleHref();
  const copy = copyByLanguage[language] ?? copyByLanguage.tr;

  return (
    <aside
      className="fixed inset-x-0 top-0 z-[60] h-10 overflow-hidden border-b border-white/10 bg-zinc-950 text-white"
      aria-label={copy.label}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-120%,rgba(249,115,22,0.5),transparent_58%)]" />
      <div className="container relative flex h-full items-center justify-center gap-2.5 sm:gap-4">
        <span className="shrink-0 rounded border border-orange-400/30 bg-orange-400/10 px-1.5 py-0.5 text-[8px] font-bold tracking-[0.16em] text-orange-300 sm:px-2 sm:text-[9px]">
          <span className="sm:hidden">NEW</span>
          <span className="hidden sm:inline">{copy.label}</span>
        </span>
        <span className="min-w-0 truncate text-[11px] font-medium text-zinc-200 sm:text-xs">
          <span className="sm:hidden">{copy.shortText}</span>
          <span className="hidden sm:inline">{copy.text}</span>
        </span>
        <a
          href={withLocale("/products/energypulse")}
          className="group inline-flex shrink-0 items-center gap-1 text-[10px] font-bold text-orange-300 transition hover:text-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:text-xs"
        >
          {copy.action}
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </aside>
  );
}
