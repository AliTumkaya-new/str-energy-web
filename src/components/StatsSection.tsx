"use client";

import { motion } from "framer-motion";
import { Rocket, Cable, BrainCircuit, Handshake } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import WaveMeshPattern from "@/components/WaveMeshPattern";
import CircuitBoardPattern from "@/components/CircuitBoardPattern";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";

type StatItem = {
  icon: typeof Rocket;
  titleKey: string;
  tagKey: string;
  descKey: string;
  pillColor: string;
};

const statItems: StatItem[] = [
  {
    icon: Rocket,
    titleKey: "stats.stage.title",
    tagKey: "stats.stage.tag",
    descKey: "stats.stage.desc",
    pillColor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Cable,
    titleKey: "stats.field.title",
    tagKey: "stats.field.tag",
    descKey: "stats.field.desc",
    pillColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: BrainCircuit,
    titleKey: "stats.intelligence.title",
    tagKey: "stats.intelligence.tag",
    descKey: "stats.intelligence.desc",
    pillColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Handshake,
    titleKey: "stats.pilot.title",
    tagKey: "stats.pilot.tag",
    descKey: "stats.pilot.desc",
    pillColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
];

export default function StatsSection() {
  const { t } = useLanguage();
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      ref={heroRef}
      onPointerEnter={onHeroPointerEnter}
      onPointerLeave={onHeroPointerLeave}
      onPointerMove={onHeroPointerMove}
      className={`relative py-16 sm:py-20 border-y overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%] ${
        isDark ? "bg-black border-white/10" : "bg-zinc-50/70 border-black/10"
      }`}
    >
      {/* Subtle Circuit Board & Wave Mesh Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <CircuitBoardPattern
          className="w-full h-full"
          stroke={isDark ? "rgba(249,115,22,0.12)" : "rgba(0,0,0,0.05)"}
          strokeWidth={0.6}
          nodeFill={isDark ? "rgba(249,115,22,0.22)" : "rgba(0,0,0,0.08)"}
          id="stats_circuit_clean"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <WaveMeshPattern
          className="w-full h-full"
          stroke={isDark ? "rgba(249,115,22,0.15)" : "rgba(0,0,0,0.05)"}
          strokeWidth={0.75}
          spacing={80}
          amplitude={14}
          frequency={0.011}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${patternHot ? "opacity-100" : "opacity-0"}`}
          style={{
            WebkitMaskImage:
              "radial-gradient(220px circle at var(--str-hex-x) var(--str-hex-y), #000 0 65%, transparent 100%)",
            maskImage:
              "radial-gradient(220px circle at var(--str-hex-x) var(--str-hex-y), #000 0 65%, transparent 100%)",
          }}
        >
          <WaveMeshPattern
            className="w-full h-full"
            stroke={isDark ? "rgba(255,168,75,0.9)" : "rgba(249,115,22,0.75)"}
            strokeWidth={1.1}
            spacing={80}
            amplitude={14}
            frequency={0.011}
          />
        </div>
      </div>

      <div className="container relative z-10">
        {/* Section Heading: Clean, authoritative, no cluttered badge */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
            {t("stats.header.title")}
          </h2>
        </div>

        {/* 4 Professional, Minimalist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isDark
                    ? "bg-zinc-950/80 border-white/10 hover:border-orange-500/40 hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]"
                    : "bg-white border-zinc-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:border-orange-500/40 hover:shadow-[0_12px_30px_rgba(249,115,22,0.08)]"
                }`}
              >
                <div>
                  {/* Top: Minimal Icon and Tag */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isDark
                          ? "bg-white/[0.06] text-orange-400 group-hover:bg-orange-500/15"
                          : "bg-zinc-100 text-zinc-800 group-hover:bg-orange-500/10 group-hover:text-orange-600"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-tight ${item.pillColor}`}
                    >
                      {t(item.tagKey)}
                    </span>
                  </div>

                  {/* Single Clean Title */}
                  <h3
                    className={`text-lg sm:text-xl font-bold tracking-tight mb-2.5 transition-colors ${
                      isDark ? "text-white group-hover:text-orange-400" : "text-zinc-900 group-hover:text-orange-600"
                    }`}
                  >
                    {t(item.titleKey)}
                  </h3>

                  {/* Clean Technical Description */}
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {t(item.descKey)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
