"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Files, PackageCheck, Share2 } from "lucide-react";

type CbamWorkspacePreviewProps = {
  locale: "tr" | "en";
  isDark: boolean;
};

const copy = {
  tr: {
    eyebrow: "STR CBAM Export",
    title: "CBAM verisini yönetilebilir hale getirir",
    description:
      "AB'ye ihracat yapan üreticilerin farklı ekiplerde ve dosyalarda kalan emisyon verilerini tek bir düzen içinde toplamasına yardımcı olur.",
    items: [
      {
        title: "Veriyi bir araya getirir",
        description: "Üretim, enerji ve tedarikçi verileri dağınık dosyalarda kalmaz.",
        icon: Files,
      },
      {
        title: "Ürünlerle ilişkilendirir",
        description: "Hangi verinin hangi ihraç ürüne ait olduğu açık biçimde takip edilir.",
        icon: PackageCheck,
      },
      {
        title: "Paylaşımı kolaylaştırır",
        description: "AB alıcısına iletilecek bilgiler düzenli ve anlaşılır bir yapıya dönüşür.",
        icon: Share2,
      },
    ],
    outcome: "Amaç: Alıcınız veri istediğinde hazırlıksız kalmamak.",
  },
  en: {
    eyebrow: "STR CBAM Export",
    title: "Makes CBAM data manageable",
    description:
      "It helps EU exporters bring emissions information scattered across teams and files into one organised workflow.",
    items: [
      {
        title: "Brings data together",
        description: "Production, energy, and supplier information no longer remains in disconnected files.",
        icon: Files,
      },
      {
        title: "Connects data to products",
        description: "Teams can clearly track which information belongs to each exported product.",
        icon: PackageCheck,
      },
      {
        title: "Makes sharing easier",
        description: "Information requested by EU buyers becomes structured and understandable.",
        icon: Share2,
      },
    ],
    outcome: "The goal: be ready when your buyer requests data.",
  },
} as const;

export default function CbamWorkspacePreview({ locale, isDark }: CbamWorkspacePreviewProps) {
  const text = copy[locale];
  const panel = isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white";
  const soft = isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-zinc-50";
  const heading = isDark ? "text-white" : "text-zinc-900";
  const muted = isDark ? "text-zinc-400" : "text-zinc-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
      className={`overflow-hidden rounded-lg border p-5 shadow-2xl shadow-black/10 md:p-7 ${panel}`}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-500">{text.eyebrow}</div>
      <h2 className={`mt-3 max-w-xl text-2xl font-bold leading-tight md:text-3xl ${heading}`}>{text.title}</h2>
      <p className={`mt-4 max-w-xl text-sm leading-relaxed md:text-base ${muted}`}>{text.description}</p>

      <div className="mt-6 divide-y divide-black/10 dark:divide-white/10">
        {text.items.map((item) => (
          <div key={item.title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border ${soft}`}>
              <item.icon className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h3 className={`text-sm font-semibold md:text-base ${heading}`}>{item.title}</h3>
              <p className={`mt-1 text-xs leading-relaxed md:text-sm ${muted}`}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
        <div className={`text-sm font-semibold ${heading}`}>{text.outcome}</div>
        <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-emerald-500" />
      </div>
    </motion.div>
  );
}
