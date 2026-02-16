"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  { qKey: "help.faq1.q", aKey: "help.faq1.a" },
  { qKey: "help.faq2.q", aKey: "help.faq2.a" },
  { qKey: "help.faq3.q", aKey: "help.faq3.a" },
];

export default function HelpPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();

  const pageBg = isDark ? "bg-black text-white" : "bg-white text-zinc-900";
  const sectionAlt = isDark ? "bg-zinc-950" : "bg-zinc-50";
  const heading = isDark ? "text-white" : "text-zinc-900";
  const desc = isDark ? "text-gray-400" : "text-zinc-600";

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Header variant="floating" />

      <section
        ref={heroRef}
        onPointerEnter={onHeroPointerEnter}
        onPointerLeave={onHeroPointerLeave}
        onPointerMove={onHeroPointerMove}
        className="relative min-h-[55vh] flex items-center justify-center pt-20 overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%]"
      >
        <div className="absolute inset-0 opacity-20 bg-linear-to-br from-orange-500/20 to-amber-500/10" />
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="waves" />

        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${heading}`}>
            {t("help.page.title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`text-lg md:text-xl ${desc}`}>
            {t("help.page.subtitle")}
          </motion.p>
        </div>
      </section>

      <section className={`py-16 ${sectionAlt}`}>
        <div className="container max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={faq.qKey}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between gap-4 p-5 rounded-xl text-left border ${
                    openFaq === i
                      ? `${isDark ? "bg-zinc-900" : "bg-white"} border-orange-500/30`
                      : `${isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-50 border-black/10"}`
                  }`}
                >
                  <span className={`font-medium ${heading}`}>{t(faq.qKey)}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      openFaq === i ? "bg-orange-500" : isDark ? "bg-zinc-800" : "bg-zinc-200"
                    }`}
                  >
                    {openFaq === i ? (
                      <Minus className="w-3 h-3 text-white" />
                    ) : (
                      <Plus className={`w-3 h-3 ${isDark ? "text-gray-400" : "text-zinc-700"}`} />
                    )}
                  </div>
                </button>
                {openFaq === i && <div className={`p-5 pt-0 text-sm ${desc}`}>{t(faq.aKey)}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
