"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpenCheck, Database, ShieldCheck, Rocket, Users } from "lucide-react";
import Link from "next/link";
import { useLocaleHref } from "@/lib/useLocaleHref";

const values = [
  { icon: Rocket, titleKey: "about.page.value1.title", descKey: "about.page.value1.desc" },
  { icon: ShieldCheck, titleKey: "about.page.value2.title", descKey: "about.page.value2.desc" },
  { icon: Users, titleKey: "about.page.value3.title", descKey: "about.page.value3.desc" },
];

export default function AboutPage() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const isDark = theme === "dark";
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();

  const pageBg = isDark ? "bg-black text-white" : "bg-white text-zinc-900";
  const sectionBase = isDark ? "bg-black" : "bg-white";
  const sectionAlt = isDark ? "bg-zinc-950" : "bg-zinc-50";
  const heading = isDark ? "text-white" : "text-zinc-900";
  const desc = isDark ? "text-gray-400" : "text-zinc-600";
  const transparency = {
    tr: {
      eyebrow: "YAYIN VE VERİ ŞEFFAFLIĞI",
      title: "İddiaları, kaynakları ve sınırları görünür tutuyoruz.",
      text: "STR Energy, genç girişimciler tarafından Türkiye’de kurulan bir enerji yazılım ve Ar-Ge girişimidir. Teknik rehberlerimiz kurumsal editoryal ekip imzasıyla, birincil kaynaklar ve görünür güncelleme tarihleri kullanılarak yayımlanır. Piyasa Veri Projesi’nde kullanılan EPİAŞ, ENTSO-E ve EIA kaynakları ile dönüşüm ve hata davranışları ayrı metodoloji sayfasında belgelenir.",
      editorial: "Editoryal ilkeler",
      methodology: "Veri metodolojisi",
    },
    en: {
      eyebrow: "PUBLISHING AND DATA TRANSPARENCY",
      title: "We keep claims, sources and limitations visible.",
      text: "STR Energy is an energy software and R&D venture founded in Türkiye by young entrepreneurs. Our technical guides use an institutional editorial byline, primary sources and visible review dates. The EPİAŞ, ENTSO-E and EIA sources, transformations and failure behaviour used by the Market Data Project are documented on a separate methodology page.",
      editorial: "Editorial standards",
      methodology: "Data methodology",
    },
    ru: {
      eyebrow: "ПРОЗРАЧНОСТЬ ПУБЛИКАЦИЙ И ДАННЫХ",
      title: "Мы открыто указываем заявления, источники и ограничения.",
      text: "STR Energy — проект в области энергетического ПО и R&D, основанный в Турции молодыми предпринимателями. Технические материалы публикуются от имени редакционной команды, содержат первичные источники и даты проверки. Источники EPİAŞ, ENTSO-E и EIA, преобразования и обработка ошибок описаны в методологии проекта данных.",
      editorial: "Редакционные стандарты",
      methodology: "Методология данных",
    },
  }[language];

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Header variant="floating" />

      <section
        ref={heroRef}
        onPointerEnter={onHeroPointerEnter}
        onPointerLeave={onHeroPointerLeave}
        onPointerMove={onHeroPointerMove}
        className="relative min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%]"
      >
        <div className="absolute inset-0 opacity-20 bg-linear-to-br from-orange-500/20 to-amber-500/10" />
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="hatch" />

        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${heading}`}>
            {t("about.page.title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`text-lg md:text-xl ${desc}`}>
            {t("about.page.subtitle")}
          </motion.p>
        </div>
      </section>

      <section className={`py-16 ${sectionAlt}`}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${heading}`}>{t("about.page.mission.title")}</h2>
              <p className={`${desc} leading-relaxed`}>{t("about.page.mission.desc")}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${heading}`}>{t("about.page.vision.title")}</h2>
              <p className={`${desc} leading-relaxed`}>{t("about.page.vision.desc")}</p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-10 rounded-2xl border p-6 ${isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-black/10"}`}
          >
            <h3 className={`text-2xl font-bold mb-3 ${heading}`}>{t("about.page.partner.title")}</h3>
            <p className={`${desc} leading-relaxed`}>{t("about.page.partner.desc")}</p>
          </motion.div>
        </div>
      </section>

      <section className={`py-16 ${sectionBase}`}>
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((item) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-black/10"} border rounded-2xl p-6`}
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${heading}`}>{t(item.titleKey)}</h3>
                <p className={`${desc} text-sm leading-relaxed`}>{t(item.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`border-y py-16 ${sectionAlt} ${isDark ? "border-white/10" : "border-black/10"}`}>
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-[0.18em] text-orange-500">{transparency.eyebrow}</p>
              <h2 className={`mt-4 text-3xl font-bold md:text-4xl ${heading}`}>{transparency.title}</h2>
              <p className={`mt-5 leading-8 ${desc}`}>{transparency.text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href={withLocale("/editorial-policy")} className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white">
                <BookOpenCheck className="h-4 w-4" />{transparency.editorial}
              </Link>
              <Link href={withLocale("/methodology/market-data")} className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-bold ${isDark ? "border-white/15 bg-white/5" : "border-black/10 bg-white"}`}>
                <Database className="h-4 w-4 text-orange-500" />{transparency.methodology}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
