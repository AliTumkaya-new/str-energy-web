"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import VoronoiPattern from "@/components/VoronoiPattern";

export default function AboutSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();

  return (
    <section
      id="about"
      ref={heroRef}
      onPointerEnter={onHeroPointerEnter}
      onPointerLeave={onHeroPointerLeave}
      onPointerMove={onHeroPointerMove}
      className={`relative py-20 overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%] ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <VoronoiPattern
          className="w-full h-full"
          stroke={isDark ? "rgba(255,255,255,0.28)" : "rgba(214,214,220,0.7)"}
          strokeWidth={0.85}
          background={isDark ? "transparent" : "#ffffff"}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${patternHot ? "opacity-100" : "opacity-0"}`}
          style={{
            WebkitMaskImage:
              "radial-gradient(180px circle at var(--str-hex-x) var(--str-hex-y), #000 0 70%, transparent 100%)",
            maskImage:
              "radial-gradient(180px circle at var(--str-hex-x) var(--str-hex-y), #000 0 70%, transparent 100%)",
          }}
        >
          <VoronoiPattern
            className="w-full h-full"
            stroke="rgba(249,115,22,0.5)"
            strokeWidth={1}
            background="transparent"
            hoverFill="transparent"
          />
        </div>
      </div>
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 str-hero-line str-hero-line--plain ${isDark ? "text-white" : "text-zinc-900"}`}>
              About{" "}
              <span className="inline-flex items-center align-middle ml-3 md:ml-4">
                <Image
                  src="/str-logo0.png"
                  alt="STR"
                  width={260}
                  height={70}
                  className="h-10 md:h-12 w-auto"
                  priority={false}
                />
              </span>
            </h2>
            <p className={`text-xl ${isDark ? "text-gray-400" : "text-zinc-700"}`}>
              {t("about.subtitle")}
            </p>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
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
