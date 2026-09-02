"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const LiveEnergyDashboard = dynamic(() => import("@/components/LiveEnergyDashboard"), {
  ssr: false,
});

const loadingCopy = {
  tr: "Canlı enerji verileri sayfaya yaklaştığınızda yüklenir.",
  en: "Live energy data loads as you approach this section.",
  ru: "Энергетические данные загружаются при приближении к этому разделу.",
} as const;

export default function DeferredLiveEnergyDashboard() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const { language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const host = hostRef.current;
    if (!host || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={hostRef}>
      {shouldLoad ? (
        <LiveEnergyDashboard />
      ) : (
        <section
          className={`grid min-h-72 place-items-center border-y px-6 text-center ${
            theme === "dark" ? "border-white/10 bg-zinc-950 text-zinc-500" : "border-black/10 bg-zinc-50 text-zinc-500"
          }`}
          aria-label={loadingCopy[language]}
        >
          <p className="max-w-md text-sm leading-6">{loadingCopy[language]}</p>
        </section>
      )}
    </div>
  );
}
