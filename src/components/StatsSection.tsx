"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import WaveMeshPattern from "@/components/WaveMeshPattern";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";

const stats = [
  { value: "25+", key: "stats.companies" },
  { value: "3", key: "stats.systems" },
  { value: "99.9%", key: "stats.uptime" },
  { value: "24/7", key: "stats.support" },
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
      className={`relative py-16 border-y overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%] ${
        isDark ? "bg-black border-white/10" : "bg-white border-black/10"
      }`}
    >
      <div className="absolute inset-0">
        <WaveMeshPattern
          className="w-full h-full"
          stroke={isDark ? "rgba(249,115,22,0.22)" : "rgba(0,0,0,0.08)"}
          strokeWidth={0.75}
          spacing={80}
          amplitude={14}
          frequency={0.011}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${patternHot ? "opacity-100" : "opacity-0"}`}
          style={{
            WebkitMaskImage:
              "radial-gradient(160px circle at var(--str-hex-x) var(--str-hex-y), #000 0 65%, transparent 100%)",
            maskImage:
              "radial-gradient(160px circle at var(--str-hex-x) var(--str-hex-y), #000 0 65%, transparent 100%)",
          }}
        >
          <WaveMeshPattern
            className="w-full h-full"
            stroke={isDark ? "rgba(255,168,75,0.95)" : "rgba(249,115,22,0.85)"}
            strokeWidth={1.15}
            spacing={80}
            amplitude={14}
            frequency={0.011}
          />
        </div>
      </div>
      <div className="container relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? "text-orange-400" : "text-orange-600"}`}>
                {stat.value}
              </div>
              <div
                className={`${isDark ? "text-white/70" : "text-zinc-600"} text-sm uppercase tracking-wider`}
              >
                {t(stat.key)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
