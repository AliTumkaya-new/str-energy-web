"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";
import { Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactsPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();
  const cards = [
    { icon: Phone, titleKey: "contacts.card.phone", desc: t("contacts.value.phone") },
    { icon: MapPin, titleKey: "contacts.card.office", desc: t("contacts.value.office") },
  ];

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
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="dots" />

        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${heading}`}>
            {t("contacts.page.title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`text-lg md:text-xl ${desc}`}>
            {t("contacts.page.subtitle")}
          </motion.p>
        </div>
      </section>

      <section className={`py-16 ${sectionAlt}`}>
        <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((item) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-black/10"} border rounded-2xl p-6`}
            >
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className={`font-semibold text-lg mb-2 ${heading}`}>{t(item.titleKey)}</h3>
              <p className={`${desc} text-sm leading-relaxed`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
