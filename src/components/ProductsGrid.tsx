"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Cable,
  CircleDollarSign,
  Factory,
  FileCheck2,
  Gauge,
  ScanSearch,
  Sparkles,
  TrendingDown,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const copyByLanguage = {
  tr: {
    launch: "YENÄ° ÃœRÃœN Â· STR ENERGY INTELLIGENCE PLATFORM",
    title: "Enerjiyi Ã¶lÃ§en deÄŸil,",
    accent: "performansÄ± aÃ§Ä±klayan platform.",
    description:
      "RS485 / Modbus ve enerji analizÃ¶rlerinden gelen veriyi tek karar katmanÄ±nda birleÅŸtirir. Normalde ne kadar Ã¼retim ve tÃ¼ketim olmasÄ± gerektiÄŸini hesaplar; gerÃ§ekleÅŸen farkÄ±, kaynaÄŸÄ±nÄ± ve iÅŸletmeye etkisini aÃ§Ä±klar.",
    primary: "Platformu keÅŸfet",
    secondary: "Pilot gÃ¶rÃ¼ÅŸmesi planla",
    proof: "SAHADAN KARARA TEK VERÄ° ZÄ°NCÄ°RÄ°",
    steps: ["BAÄLAN", "Ä°ZLE", "TAHMÄ°N ET", "AÃ‡IKLA", "Ä°YÄ°LEÅTÄ°R"],
    screen: "TEMSÄ°LÄ° CANLI ANALÄ°Z",
    line: "Hat 02 Â· Son vardiya",
    expected: "Beklenen Ã¼retim",
    actual: "GerÃ§ekleÅŸen Ã¼retim",
    unit: "adet",
    gap: "Performans farkÄ±",
    intensity: "Ã–zgÃ¼l enerji sapmasÄ±",
    root: "Ã–ne Ã§Ä±kan olasÄ± neden",
    rootValue: "PlansÄ±z duruÅŸ ve yeniden baÅŸlatma",
    confidence: "AÃ§Ä±klanan fark",
    note: "Temsili deÄŸerlerdir; gerÃ§ek model tesis verisiyle kalibre edilir.",
    capability: "TEK ÃœRÃœN Â· UÃ‡TAN UCA YETENEK",
    features: [
      ["RS485 / Modbus entegrasyonu", "AnalizÃ¶r, sayaÃ§, PLC ve saha ekipmanÄ±"],
      ["GerÃ§ek zamanlÄ± izleme", "Tesis, hat, proses ve ekipman gÃ¶rÃ¼nÃ¼mÃ¼"],
      ["AI anomali tespiti", "Sapma, Ã¶nem derecesi ve kÃ¶k neden sinyali"],
      ["TÃ¼ketim ve Ã¼retim tahmini", "Beklenen deÄŸer ve gerÃ§ekleÅŸen performans farkÄ±"],
      ["Maliyet ve karbon etkisi", "Her sapmanÄ±n parasal ve emisyon karÅŸÄ±lÄ±ÄŸÄ±"],
      ["ISO 50001 raporlamasÄ±", "Baz Ã§izgi, EnPI ve denetlenebilir kanÄ±t akÄ±ÅŸÄ±"],
      ["Dijital ikiz analizi", "Ekipman davranÄ±ÅŸÄ±nÄ± proses baÄŸlamÄ±nda modelleme"],
    ],
  },
  en: {
    launch: "NEW PRODUCT Â· STR ENERGY INTELLIGENCE PLATFORM",
    title: "Not another energy meter â€”",
    accent: "a platform that explains performance.",
    description:
      "It unifies RS485 / Modbus and energy-analyzer data in one decision layer. It calculates expected production and consumption, then explains the actual gap, its likely source and business impact.",
    primary: "Explore the platform",
    secondary: "Plan a pilot conversation",
    proof: "ONE DATA CHAIN FROM FIELD TO DECISION",
    steps: ["CONNECT", "MONITOR", "FORECAST", "EXPLAIN", "IMPROVE"],
    screen: "ILLUSTRATIVE LIVE ANALYSIS",
    line: "Line 02 Â· Last shift",
    expected: "Expected production",
    actual: "Actual production",
    unit: "units",
    gap: "Performance gap",
    intensity: "Specific energy deviation",
    root: "Leading likely cause",
    rootValue: "Unplanned stop and restart",
    confidence: "Gap explained",
    note: "Illustrative values; production models are calibrated with facility data.",
    capability: "ONE PRODUCT Â· END-TO-END CAPABILITY",
    features: [
      ["RS485 / Modbus integration", "Analyzers, meters, PLCs and field equipment"],
      ["Real-time monitoring", "Facility, line, process and equipment visibility"],
      ["AI anomaly detection", "Deviation, severity and root-cause signals"],
      ["Consumption and production forecasts", "Expected values and actual performance gaps"],
      ["Cost and carbon impact", "Financial and emissions impact of every deviation"],
      ["ISO 50001 reporting", "Baselines, EnPIs and auditable evidence flows"],
      ["Digital twin analytics", "Equipment behavior modeled in process context"],
    ],
  },
  ru: {
    launch: "ĞĞĞ’Ğ«Ğ™ ĞŸĞ ĞĞ”Ğ£ĞšĞ¢ Â· STR ENERGY INTELLIGENCE PLATFORM",
    title: "ĞĞµ Ğ¿Ñ€Ğ¾ÑÑ‚Ğ¾ Ğ¸Ğ·Ğ¼ĞµÑ€ÑĞµÑ‚ ÑĞ½ĞµÑ€Ğ³Ğ¸Ñ â€”",
    accent: "Ğ¾Ğ±ÑŠÑÑĞ½ÑĞµÑ‚ ÑÑ„Ñ„ĞµĞºÑ‚Ğ¸Ğ²Ğ½Ğ¾ÑÑ‚ÑŒ.",
    description:
      "ĞŸĞ»Ğ°Ñ‚Ñ„Ğ¾Ñ€Ğ¼Ğ° Ğ¾Ğ±ÑŠĞµĞ´Ğ¸Ğ½ÑĞµÑ‚ RS485 / Modbus Ğ¸ Ğ°Ğ½Ğ°Ğ»Ğ¸Ğ·Ğ°Ñ‚Ğ¾Ñ€Ñ‹ ÑĞ½ĞµÑ€Ğ³Ğ¸Ğ¸ Ğ² ĞµĞ´Ğ¸Ğ½Ğ¾Ğ¼ ÑƒÑ€Ğ¾Ğ²Ğ½Ğµ Ñ€ĞµÑˆĞµĞ½Ğ¸Ğ¹. ĞĞ½Ğ° Ñ€Ğ°ÑÑÑ‡Ğ¸Ñ‚Ñ‹Ğ²Ğ°ĞµÑ‚ Ğ¾Ğ¶Ğ¸Ğ´Ğ°ĞµĞ¼Ğ¾Ğµ Ğ¿Ñ€Ğ¾Ğ¸Ğ·Ğ²Ğ¾Ğ´ÑÑ‚Ğ²Ğ¾ Ğ¸ Ğ¿Ğ¾Ñ‚Ñ€ĞµĞ±Ğ»ĞµĞ½Ğ¸Ğµ, Ğ° Ğ·Ğ°Ñ‚ĞµĞ¼ Ğ¾Ğ±ÑŠÑÑĞ½ÑĞµÑ‚ Ñ„Ğ°ĞºÑ‚Ğ¸Ñ‡ĞµÑĞºĞ¸Ğ¹ Ñ€Ğ°Ğ·Ñ€Ñ‹Ğ², ĞµĞ³Ğ¾ Ğ¸ÑÑ‚Ğ¾Ñ‡Ğ½Ğ¸Ğº Ğ¸ Ğ²Ğ»Ğ¸ÑĞ½Ğ¸Ğµ Ğ½Ğ° Ğ±Ğ¸Ğ·Ğ½ĞµÑ.",
    primary: "ĞŸĞ¾ÑĞ¼Ğ¾Ñ‚Ñ€ĞµÑ‚ÑŒ Ğ¿Ğ»Ğ°Ñ‚Ñ„Ğ¾Ñ€Ğ¼Ñƒ",
    secondary: "ĞĞ±ÑÑƒĞ´Ğ¸Ñ‚ÑŒ Ğ¿Ğ¸Ğ»Ğ¾Ñ‚",
    proof: "Ğ•Ğ”Ğ˜ĞĞĞ¯ Ğ¦Ğ•ĞŸĞĞ§ĞšĞ ĞĞ¢ ĞŸĞĞ›Ğ¯ Ğ”Ğ Ğ Ğ•Ğ¨Ğ•ĞĞ˜Ğ¯",
    steps: ["ĞŸĞĞ”ĞšĞ›Ğ®Ğ§Ğ˜Ğ¢Ğ¬", "ĞšĞĞĞ¢Ğ ĞĞ›Ğ˜Ğ ĞĞ’ĞĞ¢Ğ¬", "ĞŸĞ ĞĞ“ĞĞĞ—", "ĞĞ‘ĞªĞ¯Ğ¡ĞĞ˜Ğ¢Ğ¬", "Ğ£Ğ›Ğ£Ğ§Ğ¨Ğ˜Ğ¢Ğ¬"],
    screen: "ĞŸĞ Ğ˜ĞœĞ•Ğ  ĞĞĞĞ›Ğ˜Ğ—Ğ Ğ’ Ğ Ğ•ĞĞ›Ğ¬ĞĞĞœ Ğ’Ğ Ğ•ĞœĞ•ĞĞ˜",
    line: "Ğ›Ğ¸Ğ½Ğ¸Ñ 02 Â· ĞŸĞ¾ÑĞ»ĞµĞ´Ğ½ÑÑ ÑĞ¼ĞµĞ½Ğ°",
    expected: "ĞĞ¶Ğ¸Ğ´Ğ°ĞµĞ¼Ğ¾Ğµ Ğ¿Ñ€Ğ¾Ğ¸Ğ·Ğ²Ğ¾Ğ´ÑÑ‚Ğ²Ğ¾",
    actual: "Ğ¤Ğ°ĞºÑ‚Ğ¸Ñ‡ĞµÑĞºĞ¾Ğµ Ğ¿Ñ€Ğ¾Ğ¸Ğ·Ğ²Ğ¾Ğ´ÑÑ‚Ğ²Ğ¾",
    unit: "ĞµĞ´.",
    gap: "Ğ Ğ°Ğ·Ñ€Ñ‹Ğ² ÑÑ„Ñ„ĞµĞºÑ‚Ğ¸Ğ²Ğ½Ğ¾ÑÑ‚Ğ¸",
    intensity: "ĞÑ‚ĞºĞ»Ğ¾Ğ½ĞµĞ½Ğ¸Ğµ ÑƒĞ´ĞµĞ»ÑŒĞ½Ğ¾Ğ¹ ÑĞ½ĞµÑ€Ğ³Ğ¸Ğ¸",
    root: "ĞÑĞ½Ğ¾Ğ²Ğ½Ğ°Ñ Ğ²ĞµÑ€Ğ¾ÑÑ‚Ğ½Ğ°Ñ Ğ¿Ñ€Ğ¸Ñ‡Ğ¸Ğ½Ğ°",
    rootValue: "ĞĞµĞ·Ğ°Ğ¿Ğ»Ğ°Ğ½Ğ¸Ñ€Ğ¾Ğ²Ğ°Ğ½Ğ½Ñ‹Ğ¹ Ğ¾ÑÑ‚Ğ°Ğ½Ğ¾Ğ² Ğ¸ Ğ¿ĞµÑ€ĞµĞ·Ğ°Ğ¿ÑƒÑĞº",
    confidence: "ĞĞ±ÑŠÑÑĞ½ĞµĞ½Ğ½Ğ°Ñ Ğ´Ğ¾Ğ»Ñ Ñ€Ğ°Ğ·Ñ€Ñ‹Ğ²Ğ°",
    note: "Ğ—Ğ½Ğ°Ñ‡ĞµĞ½Ğ¸Ñ Ğ¿Ñ€Ğ¸Ğ²ĞµĞ´ĞµĞ½Ñ‹ Ğ´Ğ»Ñ Ğ¿Ñ€Ğ¸Ğ¼ĞµÑ€Ğ°; Ğ¼Ğ¾Ğ´ĞµĞ»ÑŒ ĞºĞ°Ğ»Ğ¸Ğ±Ñ€ÑƒĞµÑ‚ÑÑ Ğ´Ğ°Ğ½Ğ½Ñ‹Ğ¼Ğ¸ Ğ¿Ñ€ĞµĞ´Ğ¿Ñ€Ğ¸ÑÑ‚Ğ¸Ñ.",
    capability: "ĞĞ”Ğ˜Ğ ĞŸĞ ĞĞ”Ğ£ĞšĞ¢ Â· ĞŸĞĞ›ĞĞ«Ğ™ Ğ¦Ğ˜ĞšĞ›",
    features: [
      ["Ğ˜Ğ½Ñ‚ĞµĞ³Ñ€Ğ°Ñ†Ğ¸Ñ RS485 / Modbus", "ĞĞ½Ğ°Ğ»Ğ¸Ğ·Ğ°Ñ‚Ğ¾Ñ€Ñ‹, ÑÑ‡ĞµÑ‚Ñ‡Ğ¸ĞºĞ¸, PLC Ğ¸ Ğ¿Ğ¾Ğ»ĞµĞ²Ğ¾Ğµ Ğ¾Ğ±Ğ¾Ñ€ÑƒĞ´Ğ¾Ğ²Ğ°Ğ½Ğ¸Ğµ"],
      ["ĞœĞ¾Ğ½Ğ¸Ñ‚Ğ¾Ñ€Ğ¸Ğ½Ğ³ Ğ² Ñ€ĞµĞ°Ğ»ÑŒĞ½Ğ¾Ğ¼ Ğ²Ñ€ĞµĞ¼ĞµĞ½Ğ¸", "ĞĞ±ÑŠĞµĞºÑ‚, Ğ»Ğ¸Ğ½Ğ¸Ñ, Ğ¿Ñ€Ğ¾Ñ†ĞµÑÑ Ğ¸ Ğ¾Ğ±Ğ¾Ñ€ÑƒĞ´Ğ¾Ğ²Ğ°Ğ½Ğ¸Ğµ"],
      ["Ğ˜Ğ˜-Ğ¾Ğ±Ğ½Ğ°Ñ€ÑƒĞ¶ĞµĞ½Ğ¸Ğµ Ğ°Ğ½Ğ¾Ğ¼Ğ°Ğ»Ğ¸Ğ¹", "ĞÑ‚ĞºĞ»Ğ¾Ğ½ĞµĞ½Ğ¸Ğµ, Ğ¿Ñ€Ğ¸Ğ¾Ñ€Ğ¸Ñ‚ĞµÑ‚ Ğ¸ ÑĞ¸Ğ³Ğ½Ğ°Ğ»Ñ‹ Ğ¿Ñ€Ğ¸Ñ‡Ğ¸Ğ½"],
      ["ĞŸÑ€Ğ¾Ğ³Ğ½Ğ¾Ğ· Ğ¿Ğ¾Ñ‚Ñ€ĞµĞ±Ğ»ĞµĞ½Ğ¸Ñ Ğ¸ Ğ²Ñ‹Ğ¿ÑƒÑĞºĞ°", "ĞĞ¶Ğ¸Ğ´Ğ°ĞµĞ¼Ñ‹Ğµ Ğ·Ğ½Ğ°Ñ‡ĞµĞ½Ğ¸Ñ Ğ¸ Ñ„Ğ°ĞºÑ‚Ğ¸Ñ‡ĞµÑĞºĞ¸Ğ¹ Ñ€Ğ°Ğ·Ñ€Ñ‹Ğ²"],
      ["Ğ—Ğ°Ñ‚Ñ€Ğ°Ñ‚Ñ‹ Ğ¸ ÑƒĞ³Ğ»ĞµÑ€Ğ¾Ğ´", "Ğ¤Ğ¸Ğ½Ğ°Ğ½ÑĞ¾Ğ²Ğ¾Ğµ Ğ¸ ÑĞ¼Ğ¸ÑÑĞ¸Ğ¾Ğ½Ğ½Ğ¾Ğµ Ğ²Ğ»Ğ¸ÑĞ½Ğ¸Ğµ Ğ¾Ñ‚ĞºĞ»Ğ¾Ğ½ĞµĞ½Ğ¸Ğ¹"],
      ["ĞÑ‚Ñ‡ĞµÑ‚Ğ½Ğ¾ÑÑ‚ÑŒ ISO 50001", "Ğ‘Ğ°Ğ·Ğ¾Ğ²Ñ‹Ğµ Ğ»Ğ¸Ğ½Ğ¸Ğ¸, EnPI Ğ¸ Ğ¿Ñ€Ğ¾Ğ²ĞµÑ€ÑĞµĞ¼Ñ‹Ğµ Ğ´Ğ¾ĞºĞ°Ğ·Ğ°Ñ‚ĞµĞ»ÑŒÑÑ‚Ğ²Ğ°"],
      ["ĞĞ½Ğ°Ğ»Ğ¸Ñ‚Ğ¸ĞºĞ° Ñ†Ğ¸Ñ„Ñ€Ğ¾Ğ²Ğ¾Ğ³Ğ¾ Ğ´Ğ²Ğ¾Ğ¹Ğ½Ğ¸ĞºĞ°", "ĞœĞ¾Ğ´ĞµĞ»ÑŒ Ğ¾Ğ±Ğ¾Ñ€ÑƒĞ´Ğ¾Ğ²Ğ°Ğ½Ğ¸Ñ Ğ² ĞºĞ¾Ğ½Ñ‚ĞµĞºÑÑ‚Ğµ Ğ¿Ñ€Ğ¾Ñ†ĞµÑÑĞ°"],
    ],
  },
} as const;

const icons = [Cable, Activity, BrainCircuit, TrendingDown, CircleDollarSign, FileCheck2, Factory];

export default function ProductsGrid() {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const copy = copyByLanguage[language] ?? copyByLanguage.tr;
  const isDark = theme === "dark";

  return (
    <section id="products" className={`py-20 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className={`text-3xl font-bold md:text-5xl ${isDark ? "text-white" : "text-zinc-950"}`}>{t("products.title")}</h2>
          <p className={`mx-auto mt-5 max-w-3xl leading-7 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{t("products.subtitle")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 text-white shadow-2xl shadow-orange-950/20">
          <div className="pointer-events-none absolute -left-40 -top-44 h-[34rem] w-[34rem] rounded-full bg-orange-500/15 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.12),transparent_48%)]" />

          <div className="relative grid gap-10 p-7 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-14">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-orange-400"><Sparkles className="h-4 w-4" /> {copy.launch}</div>
              <h3 className="mt-7 max-w-2xl text-4xl font-bold leading-[1.08] md:text-6xl">{copy.title}<br /><span className="text-orange-500">{copy.accent}</span></h3>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">{copy.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={withLocale("/products/energy-intelligence-platform")} className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-orange-400">{copy.primary}<ArrowRight className="h-4 w-4" /></Link>
                <Link href={withLocale("/contacts")} className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5">{copy.secondary}</Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/70 p-5 shadow-2xl shadow-black/40 backdrop-blur md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div><div className="text-[10px] font-semibold tracking-[0.16em] text-orange-500">{copy.screen}</div><div className="mt-1 text-sm text-zinc-400">{copy.line}</div></div>
                <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"/>LIVE</div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Metric label={copy.expected} value="1.240" suffix={copy.unit} />
                <Metric label={copy.actual} value="1.108" suffix={copy.unit} warning />
                <Metric label={copy.gap} value="âˆ’10,6" suffix="%" warning />
                <Metric label={copy.intensity} value="+14,6" suffix="%" warning />
              </div>
              <div className="mt-3 rounded-2xl border border-orange-500/20 bg-orange-500/[0.07] p-4">
                <div className="flex items-start gap-3"><ScanSearch className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" /><div><div className="text-xs text-zinc-500">{copy.root}</div><div className="mt-1 text-sm font-semibold text-white">{copy.rootValue}</div></div></div>
                <div className="mt-4 flex items-center justify-between text-xs"><span className="text-zinc-500">{copy.confidence}</span><span className="font-semibold text-orange-400">%86</span></div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[86%] rounded-full bg-gradient-to-r from-orange-600 to-orange-400"/></div>
              </div>
              <p className="mt-4 text-[11px] leading-5 text-zinc-600">{copy.note}</p>
            </div>
          </div>

          <div className="relative border-y border-white/10 bg-white/[0.025] px-7 py-6 md:px-10 lg:px-14">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold tracking-[0.16em] text-zinc-500"><Gauge className="h-4 w-4 text-orange-500"/>{copy.proof}</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {copy.steps.map((step, index) => <div key={step} className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-orange-500/25 bg-orange-500/10 text-[10px] font-bold text-orange-400">0{index + 1}</span><span className="text-xs font-semibold tracking-wide text-zinc-300">{step}</span>{index < copy.steps.length - 1 && <ArrowRight className="ml-auto hidden h-3 w-3 text-zinc-700 sm:block"/>}</div>)}
            </div>
          </div>

          <div className="relative p-7 md:p-10 lg:p-14">
            <div className="mb-7 text-xs font-semibold tracking-[0.16em] text-orange-500">{copy.capability}</div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {copy.features.map(([title, description], index) => { const Icon = icons[index]; return <div key={title} className="bg-zinc-950 p-5 md:p-6"><Icon className="h-5 w-5 text-orange-500"/><h4 className="mt-4 text-sm font-semibold text-white">{title}</h4><p className="mt-2 text-xs leading-5 text-zinc-500">{description}</p></div>; })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Metric({ label, value, suffix, warning = false }: { label: string; value: string; suffix: string; warning?: boolean }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><div className="text-[11px] leading-4 text-zinc-500">{label}</div><div className={`mt-3 text-2xl font-semibold ${warning ? "text-orange-400" : "text-white"}`}>{value}<span className="ml-1 text-xs font-normal text-zinc-600">{suffix}</span></div></div>;
}

