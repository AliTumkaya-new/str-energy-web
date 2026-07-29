"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Database,
  FileText,
  Leaf,
  Map,
  Shield,
  Sparkles,
  Workflow,
} from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const copyByLang = {
  tr: {
    badge: "Yeni nesil iklim yazılımı",
    title: "Kurumsal karbon, GRI ve şehir emisyonlarını",
    accent: "tek platformda yönetin",
    desc:
      "ClimateOS; veri toplama, kanıt yönetimi, emisyon hesaplama ve rapor üretim akışlarını aynı yazılım omurgasında birleştirir.",
    primary: "Portal demosunu aç",
    secondary: "İletişime geç",
    modulesTitle: "3 ana ürün, tek veri katmanı",
    modulesDesc: "Aynı veri tekrar girilmez. Tek kanıt zinciri, farklı raporlama ve karar katmanlarında yeniden kullanılır.",
    stackTitle: "Yazılım çekirdeği",
    stackDesc: "Platformun merkezi; organizasyon modeli, kanıt kasası, kontrol akışları ve çıktı motorudur.",
    ctaTitle: "ClimateOS artık siteye entegre bir ürün",
    ctaDesc: "Detay sayfasının yanında genel yazılımı gösteren portal demosu da eklendi.",
    demo: "Demo ekranına git",
    contact: "Satış ekibiyle konuş",
  },
  en: {
    badge: "Next-generation climate software",
    title: "Manage corporate carbon, GRI, and city emissions",
    accent: "in one platform",
    desc:
      "ClimateOS unifies data intake, evidence management, emissions calculation, and reporting flows on a single software backbone.",
    primary: "Open portal demo",
    secondary: "Contact us",
    modulesTitle: "3 core products, one shared data layer",
    modulesDesc: "Data is entered once, then reused across reporting and decision workflows.",
    stackTitle: "Software core",
    stackDesc: "The backbone combines organization modeling, evidence control, workflow management, and export-ready outputs.",
    ctaTitle: "ClimateOS is now integrated into the site",
    ctaDesc: "Alongside the product page, a dedicated portal demo now represents the full software.",
    demo: "Open demo view",
    contact: "Talk to sales",
  },
} as const;

const content = {
  tr: {
    modules: [
      { icon: Leaf, title: "Corporate Carbon", desc: "Kapsam, kategori, baz yıl ve azaltım senaryosu yönetimi." },
      { icon: FileText, title: "GRI Studio", desc: "Materyalite, gösterge veri akışı ve Content Index hazırlığı." },
      { icon: Map, title: "City Emissions", desc: "Şehir ölçeğinde sektör bazlı emisyon hesaplama ve çıktı üretimi." },
    ],
    stack: [
      { icon: Building2, title: "Organization Graph", desc: "Şirket, tesis, bina, sayaç ve şehir sektörlerini tek modelde toplar." },
      { icon: Database, title: "Evidence Vault", desc: "Belge, veri sözlüğü, kaynak eşleme ve sürüm geçmişini yönetir." },
      { icon: Workflow, title: "Control Flows", desc: "Görev, onay, eksik veri ve kalite kontrol istasyonları sağlar." },
      { icon: Shield, title: "Audit Backbone", desc: "İzlenebilirlik, dışa aktarım ve yönetilebilir güvenlik katmanı sunar." },
    ],
  },
  en: {
    modules: [
      { icon: Leaf, title: "Corporate Carbon", desc: "Scope, category, base-year, and reduction scenario management." },
      { icon: FileText, title: "GRI Studio", desc: "Materiality, indicator workflows, and Content Index preparation." },
      { icon: Map, title: "City Emissions", desc: "City-scale sector emissions accounting and export-ready outputs." },
    ],
    stack: [
      { icon: Building2, title: "Organization Graph", desc: "Models companies, facilities, buildings, meters, and city sectors." },
      { icon: Database, title: "Evidence Vault", desc: "Controls documents, data dictionaries, source mapping, and version history." },
      { icon: Workflow, title: "Control Flows", desc: "Provides tasks, approvals, missing-data queues, and quality checkpoints." },
      { icon: Shield, title: "Audit Backbone", desc: "Supports traceability, exports, and managed security controls." },
    ],
  },
} as const;

export default function ClimateOSPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const isDark = theme === "dark";
  const locale = language === "en" ? "en" : "tr";
  const copy = copyByLang[locale];
  const data = content[locale];

  const pageBg = isDark ? "bg-black text-white" : "bg-white text-zinc-900";
  const sectionAlt = isDark ? "bg-zinc-950" : "bg-zinc-50";
  const border = isDark ? "border-white/10" : "border-black/10";
  const card = isDark ? "bg-zinc-900/50 border-white/10" : "bg-white border-black/10";
  const softCard = isDark ? "bg-zinc-900/35 border-white/10" : "bg-zinc-50 border-black/10";
  const heading = isDark ? "text-white" : "text-zinc-900";
  const desc = isDark ? "text-gray-400" : "text-zinc-600";

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Header variant="floating" />

      <section className="relative overflow-hidden pt-28 md:pt-32 pb-18">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.2),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(16,185,129,0.14),transparent_28%)]" />
        <div className="container relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-5xl">
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${border} ${softCard}`}>
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className={`text-sm ${desc}`}>{copy.badge}</span>
            </div>

            <h1 className={`mt-6 max-w-4xl text-4xl md:text-6xl font-bold tracking-tight ${heading}`}>
              {copy.title}
              <span className="block text-orange-500">{copy.accent}</span>
            </h1>

            <p className={`mt-5 max-w-3xl text-lg md:text-xl leading-relaxed ${desc}`}>{copy.desc}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href={withLocale("/portal/climateos")} className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 font-semibold text-black hover:bg-orange-400">
                {copy.primary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={withLocale("/contacts")} className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 font-semibold ${border} ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`}>
                {copy.secondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`py-20 ${sectionAlt}`}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>{copy.modulesTitle}</h2>
            <p className={`mt-4 ${desc}`}>{copy.modulesDesc}</p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {data.modules.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className={`rounded-3xl border p-7 ${card}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20">
                  <item.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className={`mt-6 text-xl font-semibold ${heading}`}>{item.title}</h3>
                <p className={`mt-3 leading-relaxed ${desc}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={`text-3xl md:text-4xl font-bold ${heading}`}>{copy.stackTitle}</h2>
            <p className={`mt-4 ${desc}`}>{copy.stackDesc}</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.stack.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className={`rounded-2xl border p-5 ${softCard} ${border}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <item.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className={`mt-4 font-semibold ${heading}`}>{item.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${desc}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-18 border-t ${border}`}>
        <div className="container">
          <div className={`rounded-[2rem] border p-8 md:p-10 ${card}`}>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div>
                <h2 className={`text-2xl md:text-3xl font-bold ${heading}`}>{copy.ctaTitle}</h2>
                <p className={`mt-4 max-w-2xl ${desc}`}>{copy.ctaDesc}</p>
              </div>
              <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
                <Link href={withLocale("/portal/climateos")} className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 font-semibold text-black hover:bg-orange-400">
                  {copy.demo}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={withLocale("/contacts")} className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 font-semibold ${border} ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`}>
                  {copy.contact}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
