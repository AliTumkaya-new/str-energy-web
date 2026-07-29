"use client"; // Archived when STR ProofMesh replaced the public CBAM product.

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  ExternalLink,
  Files,
  PackageCheck,
  Share2,
  ShieldCheck,
  TableProperties,
  Workflow,
} from "lucide-react";

import CbamWorkspacePreview from "@/components/CbamWorkspacePreview";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const copyByLang = {
  tr: {
    badge: "CBAM kesin dönemi 1 Ocak 2026'da başladı",
    title: "AB ihracatında verisiz dönem sona eriyor",
    accent: "Emisyon verinizi düzenli ve paylaşılabilir hale getirin",
    desc:
      "STR CBAM Export, AB'ye ihracat yapan üreticilerin emisyon verilerini tek yerde toplamasına, ürünlerle ilişkilendirmesine ve alıcı taleplerine hazırlıklı olmasına yardımcı olan bir veri yönetim ürünüdür.",
    primary: "Ürüne git",
    secondary: "Ne işe yaradığını gör",
    riskEyebrow: "Neden gerekli?",
    riskTitle: "Dağınık veri, ihracat sürecinde belirsizlik yaratır",
    riskDesc:
      "Bilgiler farklı ekiplerde, Excel dosyalarında ve e-postalarda kaldığında doğru veriye zamanında ulaşmak zorlaşır. Alıcıdan talep geldiğinde başlayan son dakika çalışması hem ekibi hem ticari ilişkiyi zorlar.",
    risks: [
      {
        title: "Veri dağınıklığı",
        desc: "Üretim, enerji ve tedarikçi bilgileri farklı kişilerde kaldığı için ortak görünüm oluşmaz.",
      },
      {
        title: "Son dakika hazırlığı",
        desc: "Alıcı veri istediğinde hangi bilginin güncel ve doğru olduğu yeniden araştırılır.",
      },
      {
        title: "Güven kaybı",
        desc: "Geciken veya tutarsız cevaplar alıcı tarafında süreç yönetimine ilişkin soru işareti yaratabilir.",
      },
    ],
    whatEyebrow: "STR CBAM Export nedir?",
    whatTitle: "CBAM verisini ekiplerin birlikte yönetebileceği bir ürüne dönüştürür",
    whatDesc:
      "Amaç yalnızca bir hesaplama yapmak değildir. Amaç, ihracatla ilgili emisyon bilgisinin düzenli, izlenebilir ve tekrar kullanılabilir bir iş sürecine dönüşmesidir.",
    capabilities: [
      {
        icon: Files,
        title: "Bilgiyi tek yerde toplar",
        desc: "Farklı ekiplerde ve dosyalarda bulunan bilgiler ortak bir çalışma alanında düzenlenir.",
      },
      {
        icon: PackageCheck,
        title: "Ürünlerle ilişkilendirir",
        desc: "Toplanan bilginin hangi ihraç ürünle ilişkili olduğu açık biçimde görülebilir.",
      },
      {
        icon: Workflow,
        title: "Süreci görünür kılar",
        desc: "Eksik bilgi, bekleyen iş ve sorumluluklar ekipler arasında takip edilebilir.",
      },
      {
        icon: Share2,
        title: "Paylaşımı kolaylaştırır",
        desc: "AB alıcısına iletilecek bilgi düzenli ve anlaşılır bir çıktıya dönüşür.",
      },
    ],
    flowEyebrow: "Nasıl çalışır?",
    flowTitle: "Karmaşık veriyi basit bir iş akışına çevirir",
    flow: [
      {
        number: "1",
        title: "Mevcut yapınızı tanır",
        desc: "Ürünleriniz, tesisleriniz, ekipleriniz ve mevcut veri kaynaklarınız birlikte haritalanır.",
      },
      {
        number: "2",
        title: "Veriyi düzenler",
        desc: "İlgili bilgiler ürünler etrafında toplanır ve ekiplerin birlikte çalışabileceği hale getirilir.",
      },
      {
        number: "3",
        title: "Hazır tutar",
        desc: "Alıcı talebi geldiğinde yeniden başlamak yerine güncel ve düzenli bilgi kullanılır.",
      },
    ],
    audienceEyebrow: "Kimler için?",
    audienceTitle: "AB'ye ihracat yapan üretim şirketleri için",
    audienceDesc:
      "Ürün; sürdürülebilirlik, enerji, üretim, kalite, finans ve ihracat ekiplerinin aynı veri üzerinde birlikte çalışmasını sağlar.",
    audiences: [
      "AB'ye doğrudan ihracat yapan üreticiler",
      "AB tedarik zincirine ara ürün sağlayan firmalar",
      "Birden fazla tesis veya ürün yöneten gruplar",
      "Alıcılarından emisyon verisi talebi alan şirketler",
    ],
    boundaryTitle: "Yazılım ve süreç yönetimi ürünü",
    boundaryDesc:
      "STR CBAM Export veriyi düzenler, ekip çalışmasını kolaylaştırır ve hazırlık sürecini yönetir. Akredite doğrulayıcının veya hukuki danışmanın yerine geçmez.",
    sourceTitle: "Güncel mevzuat çerçevesi",
    sourceDesc:
      "Ürün yaklaşımı AB CBAM Tüzüğü ve Avrupa Komisyonu tarafından yayımlanan güncel rehberler dikkate alınarak geliştirilir.",
    ctaTitle: "AB alıcınız veri istediğinde hazırlıksız kalmayın",
    ctaDesc:
      "İlk görüşmede mevcut veri yapınızı, ekiplerinizi ve ihracat sürecinizi birlikte değerlendirip doğru ürün kapsamını çıkaralım.",
    ctaPrimary: "Ürüne git",
    ctaSecondary: "İletişime geç",
  },
  en: {
    badge: "The CBAM definitive period started on 1 January 2026",
    title: "The data-free era in EU exports is ending",
    accent: "Make emissions data organised and shareable",
    desc:
      "STR CBAM Export is a data-management product that helps EU exporters collect emissions information in one place, connect it to products, and remain ready for buyer requests.",
    primary: "Open product",
    secondary: "See what it does",
    riskEyebrow: "Why is it needed?",
    riskTitle: "Fragmented data creates uncertainty in export operations",
    riskDesc:
      "When information remains across teams, spreadsheets, and emails, finding the right data on time becomes difficult. Last-minute work after a buyer request strains both the team and the commercial relationship.",
    risks: [
      {
        title: "Fragmented data",
        desc: "Production, energy, and supplier information remains with different teams without a shared view.",
      },
      {
        title: "Last-minute preparation",
        desc: "When a buyer requests data, teams must investigate which information is current and reliable.",
      },
      {
        title: "Loss of confidence",
        desc: "Late or inconsistent answers may raise concerns about process management.",
      },
    ],
    whatEyebrow: "What is STR CBAM Export?",
    whatTitle: "It turns CBAM data into a product teams can manage together",
    whatDesc:
      "The goal is not merely to perform a calculation. It is to turn export-related emissions information into an organised, traceable, and reusable business process.",
    capabilities: [
      {
        icon: Files,
        title: "Brings information together",
        desc: "Information spread across teams and files is organised in one shared workspace.",
      },
      {
        icon: PackageCheck,
        title: "Connects it to products",
        desc: "Teams can clearly see which information relates to each exported product.",
      },
      {
        icon: Workflow,
        title: "Makes the process visible",
        desc: "Missing information, pending work, and responsibilities can be tracked across teams.",
      },
      {
        icon: Share2,
        title: "Makes sharing easier",
        desc: "Information requested by EU buyers becomes a clear and organised output.",
      },
    ],
    flowEyebrow: "How does it work?",
    flowTitle: "It turns complex data into a simple workflow",
    flow: [
      {
        number: "1",
        title: "Understands your current setup",
        desc: "Your products, facilities, teams, and existing data sources are mapped together.",
      },
      {
        number: "2",
        title: "Organises the data",
        desc: "Relevant information is grouped around products in a shared team workflow.",
      },
      {
        number: "3",
        title: "Keeps it ready",
        desc: "When buyers request data, teams use current information instead of starting again.",
      },
    ],
    audienceEyebrow: "Who is it for?",
    audienceTitle: "For manufacturing companies exporting to the EU",
    audienceDesc:
      "The product enables sustainability, energy, production, quality, finance, and export teams to work from the same information.",
    audiences: [
      "Manufacturers exporting directly to the EU",
      "Companies supplying intermediate goods into EU value chains",
      "Groups managing multiple facilities or products",
      "Businesses receiving emissions-data requests from buyers",
    ],
    boundaryTitle: "A software and process-management product",
    boundaryDesc:
      "STR CBAM Export organises data, improves collaboration, and manages readiness. It does not replace an accredited verifier or legal adviser.",
    sourceTitle: "Current regulatory framework",
    sourceDesc:
      "The product approach is developed with reference to the EU CBAM Regulation and current European Commission guidance.",
    ctaTitle: "Be ready when your EU buyer requests data",
    ctaDesc:
      "In the first meeting, we assess your data structure, teams, and export process to define the right product scope.",
    ctaPrimary: "Open product",
    ctaSecondary: "Contact us",
  },
} as const;

export default function CbamProductPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const locale = language === "en" ? "en" : "tr";
  const copy = copyByLang[locale];
  const isDark = theme === "dark";

  const page = isDark ? "bg-black text-white" : "bg-white text-zinc-900";
  const alt = isDark ? "bg-zinc-950" : "bg-zinc-50";
  const border = isDark ? "border-white/10" : "border-black/10";
  const card = isDark ? "border-white/10 bg-zinc-900/55" : "border-black/10 bg-white";
  const soft = isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-zinc-50";
  const heading = isDark ? "text-white" : "text-zinc-900";
  const desc = isDark ? "text-zinc-400" : "text-zinc-600";

  return (
    <div className={`min-h-screen ${page}`}>
      <Header variant="floating" />

      <section className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-36">
        <div className={`absolute inset-0 ${isDark ? "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]" : "bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)]"} bg-[size:44px_44px]`} />
        <div className="container relative">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-14">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 ${soft}`}>
                <BadgeCheck className="h-4 w-4 text-orange-500" />
                <span className={`text-sm font-medium ${desc}`}>{copy.badge}</span>
              </div>

              <h1 className={`mt-6 max-w-3xl text-4xl font-bold leading-[1.04] md:text-5xl xl:text-[56px] ${heading}`}>
                {copy.title}
                <span className="mt-3 block text-[0.68em] leading-tight text-orange-500">{copy.accent}</span>
              </h1>

              <p className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${desc}`}>{copy.desc}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={withLocale("/platform/cbam")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 font-semibold text-black hover:bg-orange-400"
                >
                  {copy.primary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#what-it-does"
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 font-semibold ${border} ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`}
                >
                  {copy.secondary}
                </a>
              </div>
            </motion.div>

            <CbamWorkspacePreview locale={locale} isDark={isDark} />
          </div>
        </div>
      </section>

      <section className={`border-y py-16 ${border} ${alt}`}>
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">{copy.riskEyebrow}</div>
              <h2 className={`mt-3 text-3xl font-bold md:text-4xl ${heading}`}>{copy.riskTitle}</h2>
              <p className={`mt-4 leading-relaxed ${desc}`}>{copy.riskDesc}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {copy.risks.map((risk) => (
                <div key={risk.title} className={`rounded-lg border p-5 ${card}`}>
                  <CircleAlert className="h-5 w-5 text-orange-500" />
                  <h3 className={`mt-4 font-semibold ${heading}`}>{risk.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${desc}`}>{risk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="what-it-does" className="scroll-mt-24 py-18 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">{copy.whatEyebrow}</div>
            <h2 className={`mt-3 text-3xl font-bold md:text-4xl ${heading}`}>{copy.whatTitle}</h2>
            <p className={`mt-4 text-lg leading-relaxed ${desc}`}>{copy.whatDesc}</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.capabilities.map((item) => (
              <div key={item.title} className={`rounded-lg border p-5 ${card}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-orange-500/20 bg-orange-500/10">
                  <item.icon className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className={`mt-4 font-semibold ${heading}`}>{item.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${desc}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-18 md:py-24 ${alt}`}>
        <div className="container">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">{copy.flowEyebrow}</div>
            <h2 className={`mx-auto mt-3 max-w-3xl text-3xl font-bold md:text-4xl ${heading}`}>{copy.flowTitle}</h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {copy.flow.map((item, index) => (
              <div key={item.number} className={`relative rounded-lg border p-6 ${card}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-500 font-bold text-black">
                  {item.number}
                </div>
                <h3 className={`mt-5 text-xl font-bold ${heading}`}>{item.title}</h3>
                <p className={`mt-3 leading-relaxed ${desc}`}>{item.desc}</p>
                {index < 2 && (
                  <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-orange-500 p-1 text-black lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">{copy.audienceEyebrow}</div>
              <h2 className={`mt-3 text-3xl font-bold md:text-4xl ${heading}`}>{copy.audienceTitle}</h2>
              <p className={`mt-4 leading-relaxed ${desc}`}>{copy.audienceDesc}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.audiences.map((item) => (
                <div key={item} className={`flex items-start gap-3 rounded-lg border p-5 ${soft}`}>
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className={`text-sm font-medium leading-relaxed ${heading}`}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`border-y py-16 ${border} ${alt}`}>
        <div className="container">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className={`rounded-lg border p-6 ${card}`}>
              <ShieldCheck className="h-6 w-6 text-orange-500" />
              <h2 className={`mt-4 text-2xl font-bold ${heading}`}>{copy.boundaryTitle}</h2>
              <p className={`mt-3 leading-relaxed ${desc}`}>{copy.boundaryDesc}</p>
            </div>
            <div className={`rounded-lg border p-6 ${card}`}>
              <TableProperties className="h-6 w-6 text-orange-500" />
              <h2 className={`mt-4 text-2xl font-bold ${heading}`}>{copy.sourceTitle}</h2>
              <p className={`mt-3 leading-relaxed ${desc}`}>{copy.sourceDesc}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-400"
                >
                  European Commission
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://eur-lex.europa.eu/eli/reg/2023/956/oj/eng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-400"
                >
                  EU Regulation 2023/956
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="container">
          <div className="rounded-lg border border-orange-500/25 bg-orange-500/10 p-7 text-center md:p-10">
            <ClipboardCheck className="mx-auto h-10 w-10 text-orange-500" />
            <h2 className={`mx-auto mt-5 max-w-3xl text-3xl font-bold md:text-4xl ${heading}`}>{copy.ctaTitle}</h2>
            <p className={`mx-auto mt-4 max-w-2xl leading-relaxed ${desc}`}>{copy.ctaDesc}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={withLocale("/platform/cbam")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 font-semibold text-black hover:bg-orange-400"
              >
                {copy.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={withLocale("/contacts")}
                className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 font-semibold ${border} ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`}
              >
                {copy.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
