"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleDashed,
  Database,
  Download,
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

type WorkspaceKey = "carbon" | "gri" | "city";

const workspaceByLang = {
  tr: {
    carbon: {
      label: "Kurumsal Karbon",
      headline: "Kurumsal karbon envanteri komuta merkezi",
      summary: "Lokasyon, kategori, emisyon faktörü ve kanıt akışı aynı operasyon panelinde toplanır.",
      stats: [
        { label: "Toplam emisyon", value: "24.860 tCO2e", detail: "-8.4% yıllık" },
        { label: "Veri kapsamı", value: "91%", detail: "6 lokasyon beklemede" },
        { label: "Kanıt durumu", value: "472 dosya", detail: "18 eksik kayıt" },
      ],
      pipeline: [
        { stage: "Envanter sınırı", progress: 100 },
        { stage: "Faaliyet veri girişi", progress: 82 },
        { stage: "Belirsizlik kontrolü", progress: 64 },
        { stage: "Beyan formu", progress: 46 },
      ],
      signals: [
        { label: "Scope 1", width: "38%" },
        { label: "Scope 2", width: "24%" },
        { label: "Scope 3", width: "38%" },
      ],
      exports: ["Kurumsal karbon raporu", "Baz yıl trend paketi", "Beyan formu", "Yönetici özeti"],
    },
    gri: {
      label: "GRI Studio",
      headline: "GRI 2021 raporlama çalışma alanı",
      summary: "Materyalite, gösterge veri akışı ve içerik eşlemesi tek ekip panelinde birleşir.",
      stats: [
        { label: "Açıklama hazırlığı", value: "74%", detail: "12 gösterge revizyonda" },
        { label: "Kanıt eşleme", value: "211 bağlantı", detail: "9 boş gösterge" },
        { label: "Yayın paketi", value: "V0.8", detail: "Editoryal son kontrol" },
      ],
      pipeline: [
        { stage: "Paydaş haritalama", progress: 100 },
        { stage: "Materyalite matrisi", progress: 100 },
        { stage: "Gösterge veri girişi", progress: 73 },
        { stage: "Content Index", progress: 58 },
      ],
      signals: [
        { label: "Genel açıklamalar", width: "86%" },
        { label: "Yönetim yaklaşımı", width: "68%" },
        { label: "Topic standards", width: "72%" },
      ],
      exports: ["GRI Content Index", "Yayın taslağı", "Gösterge kitapçığı", "Kanıt özeti"],
    },
    city: {
      label: "Şehir Emisyonları",
      headline: "Şehir ölçeğinde emisyon görünürlüğü",
      summary: "Enerji, ulaşım, atık ve sanayi süreçleri tek envanter omurgasında yönetilir.",
      stats: [
        { label: "Şehir toplamı", value: "6.42 MtCO2e", detail: "BASIC+ güncel" },
        { label: "Sektör kapsamı", value: "5 ana başlık", detail: "AFOLU opsiyonel" },
        { label: "Veri tamamlılığı", value: "78%", detail: "4 kurumdan veri bekleniyor" },
      ],
      pipeline: [
        { stage: "Sınır ve metodoloji", progress: 100 },
        { stage: "Sektör veri toplama", progress: 76 },
        { stage: "Notation key ve QA/QC", progress: 52 },
        { stage: "BASIC / BASIC+ tabloları", progress: 41 },
      ],
      signals: [
        { label: "Energy", width: "44%" },
        { label: "Transport", width: "27%" },
        { label: "Waste", width: "14%" },
        { label: "IPPU + AFOLU", width: "15%" },
      ],
      exports: ["GPC envanter raporu", "BASIC / BASIC+ tabloları", "Metodoloji eki", "Yönetici sunumu"],
    },
  },
  en: {
    carbon: {
      label: "Corporate Carbon",
      headline: "Corporate carbon inventory command center",
      summary: "Locations, categories, emissions factors, and evidence flows are managed in one workspace.",
      stats: [
        { label: "Total emissions", value: "24,860 tCO2e", detail: "-8.4% YoY" },
        { label: "Data coverage", value: "91%", detail: "6 sites pending" },
        { label: "Evidence status", value: "472 files", detail: "18 missing records" },
      ],
      pipeline: [
        { stage: "Inventory boundary", progress: 100 },
        { stage: "Activity data intake", progress: 82 },
        { stage: "Uncertainty review", progress: 64 },
        { stage: "Declaration form", progress: 46 },
      ],
      signals: [
        { label: "Scope 1", width: "38%" },
        { label: "Scope 2", width: "24%" },
        { label: "Scope 3", width: "38%" },
      ],
      exports: ["Corporate carbon report", "Base-year trend pack", "Declaration form", "Executive summary"],
    },
    gri: {
      label: "GRI Studio",
      headline: "GRI 2021 reporting workspace",
      summary: "Materiality, indicator workflows, and content mapping are aligned in one operator view.",
      stats: [
        { label: "Disclosure readiness", value: "74%", detail: "12 indicators in revision" },
        { label: "Evidence mapping", value: "211 links", detail: "9 unresolved indicators" },
        { label: "Release package", value: "V0.8", detail: "Final editorial review" },
      ],
      pipeline: [
        { stage: "Stakeholder mapping", progress: 100 },
        { stage: "Materiality matrix", progress: 100 },
        { stage: "Indicator data intake", progress: 73 },
        { stage: "Content Index", progress: 58 },
      ],
      signals: [
        { label: "General disclosures", width: "86%" },
        { label: "Management approach", width: "68%" },
        { label: "Topic standards", width: "72%" },
      ],
      exports: ["GRI Content Index", "Publication draft", "Indicator handbook", "Evidence summary"],
    },
    city: {
      label: "City Emissions",
      headline: "City-scale emissions visibility",
      summary: "Energy, transport, waste, and industrial processes operate on one inventory backbone.",
      stats: [
        { label: "City total", value: "6.42 MtCO2e", detail: "BASIC+ current" },
        { label: "Sector coverage", value: "5 sectors", detail: "AFOLU optional" },
        { label: "Data completeness", value: "78%", detail: "4 agencies pending" },
      ],
      pipeline: [
        { stage: "Boundary and methodology", progress: 100 },
        { stage: "Sector data intake", progress: 76 },
        { stage: "Notation key and QA/QC", progress: 52 },
        { stage: "BASIC / BASIC+ tables", progress: 41 },
      ],
      signals: [
        { label: "Energy", width: "44%" },
        { label: "Transport", width: "27%" },
        { label: "Waste", width: "14%" },
        { label: "IPPU + AFOLU", width: "15%" },
      ],
      exports: ["GPC inventory report", "BASIC / BASIC+ tables", "Methodology appendix", "Executive presentation"],
    },
  },
} as const;

const workspaceIcons = {
  carbon: Leaf,
  gri: FileText,
  city: Map,
} satisfies Record<WorkspaceKey, typeof Leaf>;

export default function ClimateOSPortalPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const [workspace, setWorkspace] = useState<WorkspaceKey>("carbon");

  const locale = language === "en" ? "en" : "tr";
  const copy = workspaceByLang[locale][workspace];
  const isDark = theme === "dark";

  const palette = useMemo(
    () => ({
      page: isDark ? "bg-black text-white" : "bg-[#f6f6f1] text-zinc-900",
      panel: isDark ? "bg-zinc-950/70 border-white/10" : "bg-white/90 border-black/10",
      soft: isDark ? "bg-zinc-900/60 border-white/10" : "bg-[#faf8f2] border-black/10",
      border: isDark ? "border-white/10" : "border-black/10",
      heading: isDark ? "text-white" : "text-zinc-900",
      desc: isDark ? "text-gray-400" : "text-zinc-600",
    }),
    [isDark],
  );

  return (
    <div className={`min-h-screen ${palette.page}`}>
      <Header variant="floating" />

      <section className="relative overflow-hidden pt-28 md:pt-32 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(249,115,22,0.18),transparent_30%),radial-gradient(circle_at_85%_16%,rgba(16,185,129,0.12),transparent_26%)]" />
        <div className="container relative">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-end">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${palette.border} ${palette.soft}`}>
                <Sparkles className="h-4 w-4 text-orange-500" />
                <span className={`text-sm ${palette.desc}`}>{locale === "tr" ? "ClimateOS yazılım demosu" : "ClimateOS software demo"}</span>
              </div>
              <h1 className={`mt-6 text-4xl md:text-6xl font-bold tracking-tight ${palette.heading}`}>{copy.headline}</h1>
              <p className={`mt-5 max-w-3xl text-lg ${palette.desc}`}>{copy.summary}</p>
            </div>

            <div className={`rounded-[2rem] border p-5 ${palette.panel}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className={`text-sm ${palette.desc}`}>ClimateOS</div>
                  <div className={`text-xl font-semibold ${palette.heading}`}>{locale === "tr" ? "Genel yazılım omurgası" : "Full software backbone"}</div>
                </div>
                <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-orange-400">
                  {locale === "tr" ? "Demo planla" : "Plan demo"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { icon: Database, label: locale === "tr" ? "Veri girişi" : "Data intake" },
                  { icon: Shield, label: locale === "tr" ? "Kanıt yönetimi" : "Evidence management" },
                  { icon: Workflow, label: locale === "tr" ? "Kontrol akışı" : "Control workflow" },
                  { icon: Download, label: locale === "tr" ? "Dışa aktarım" : "Exports" },
                ].map((item) => (
                  <div key={item.label} className={`rounded-2xl border p-4 ${palette.soft}`}>
                    <item.icon className="h-5 w-5 text-orange-500" />
                    <div className={`mt-3 text-sm font-medium ${palette.heading}`}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-18">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {(["carbon", "gri", "city"] as WorkspaceKey[]).map((key) => {
              const Icon = workspaceIcons[key];
              const isActive = workspace === key;
              return (
                <button
                  key={key}
                  onClick={() => setWorkspace(key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-orange-500/40 bg-orange-500 text-black"
                      : `${palette.border} ${isDark ? "bg-zinc-900/50 text-gray-300 hover:bg-white/5" : "bg-white text-zinc-700 hover:bg-black/5"}`
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {workspaceByLang[locale][key].label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.stats.map((stat) => (
              <div key={stat.label} className={`rounded-3xl border p-5 ${palette.panel}`}>
                <div className={`text-sm ${palette.desc}`}>{stat.label}</div>
                <div className={`mt-2 text-2xl font-bold ${palette.heading}`}>{stat.value}</div>
                <div className="mt-2 text-sm text-emerald-400">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className={`rounded-[2rem] border p-6 ${palette.panel}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className={`text-sm ${palette.desc}`}>{locale === "tr" ? "İş akışı panosu" : "Execution board"}</div>
                  <div className={`mt-1 text-2xl font-semibold ${palette.heading}`}>{locale === "tr" ? "Durum ve ilerleme istasyonları" : "Status and progress stations"}</div>
                </div>
                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${palette.border} ${palette.soft}`}>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className={palette.desc}>{locale === "tr" ? "Denetim izi aktif" : "Audit trail active"}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {copy.pipeline.map((item) => (
                  <div key={item.stage} className={`rounded-2xl border p-4 ${palette.soft}`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className={`font-semibold ${palette.heading}`}>{item.stage}</div>
                      <div className={`text-sm ${palette.desc}`}>{item.progress}%</div>
                    </div>
                    <div className={`mt-4 h-2 rounded-full ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}>
                      <div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-emerald-400" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className={`rounded-[2rem] border p-6 ${palette.panel}`}>
                <div className={`text-sm ${palette.desc}`}>{locale === "tr" ? "Sinyal dağılımı" : "Signal distribution"}</div>
                <div className={`mt-1 text-2xl font-semibold ${palette.heading}`}>{locale === "tr" ? "Ana gösterge bileşimleri" : "Primary composition signals"}</div>
                <div className="mt-6 space-y-4">
                  {copy.signals.map((signal) => (
                    <div key={signal.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className={palette.heading}>{signal.label}</span>
                        <span className={palette.desc}>{signal.width}</span>
                      </div>
                      <div className={`mt-2 h-2 rounded-full ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}>
                        <div className="h-2 rounded-full bg-orange-500" style={{ width: signal.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-[2rem] border p-6 ${palette.panel}`}>
                <div className="flex items-center gap-3">
                  <CircleDashed className="h-5 w-5 text-orange-500" />
                  <div className={`text-xl font-semibold ${palette.heading}`}>{locale === "tr" ? "Çıktı merkezi" : "Export center"}</div>
                </div>
                <div className="mt-6 grid gap-3">
                  {copy.exports.map((item) => (
                    <div key={item} className={`rounded-2xl border px-4 py-3 ${palette.soft}`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className={`text-sm ${palette.heading}`}>{item}</span>
                        <BarChart3 className="h-4 w-4 text-emerald-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`border-t py-16 ${palette.border}`}>
        <div className="container">
          <div className={`rounded-[2rem] border p-8 md:p-10 ${palette.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] items-center">
              <div>
                <h2 className={`text-2xl md:text-3xl font-bold ${palette.heading}`}>{locale === "tr" ? "ClimateOS artık sitenin içinde yaşayan bir ürün" : "ClimateOS now lives inside the site as a product"}</h2>
                <p className={`mt-4 max-w-2xl ${palette.desc}`}>{locale === "tr" ? "Bu demo sayfası genel yazılım omurgasını görünür kılar. Sonraki adım API, veri modeli ve kimlik doğrulama katmanıyla gerçek uygulamaya geçmektir." : "This demo page makes the software backbone visible. The next step is turning it into a real application with APIs, data models, and authentication."}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <Link href={withLocale("/products/climateos")} className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-semibold ${palette.border} ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`}>
                  {locale === "tr" ? "Ürün sayfası" : "Product page"}
                </Link>
                <Link href={withLocale("/contacts")} className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-400">
                  {locale === "tr" ? "Pilot proje planla" : "Plan pilot project"}
                  <ArrowRight className="h-4 w-4" />
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
