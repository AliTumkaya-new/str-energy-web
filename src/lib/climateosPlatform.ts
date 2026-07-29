export type PlatformLocale = "tr" | "en";
export type ClimatePlatformSectionId = "dashboard" | "carbon" | "gri" | "city" | "evidence" | "reports";
export type ClimatePlatformIcon = "dashboard" | "carbon" | "gri" | "city" | "evidence" | "reports";

type LocalizedText = {
  tr: string;
  en: string;
};

export type ClimatePlatformSection = {
  id: ClimatePlatformSectionId;
  href: string;
  icon: ClimatePlatformIcon;
  label: LocalizedText;
  description: LocalizedText;
};

export const climatePlatformSections: ClimatePlatformSection[] = [
  {
    id: "dashboard",
    href: "/platform/climateos",
    icon: "dashboard",
    label: { tr: "Genel Bakış", en: "Overview" },
    description: { tr: "Operasyon merkezi ve çapraz görünüm", en: "Operations hub and cross-module view" },
  },
  {
    id: "carbon",
    href: "/platform/climateos/carbon",
    icon: "carbon",
    label: { tr: "Kurumsal Karbon", en: "Corporate Carbon" },
    description: { tr: "Scope, kategori ve azaltım akışları", en: "Scope, category, and reduction flows" },
  },
  {
    id: "gri",
    href: "/platform/climateos/gri",
    icon: "gri",
    label: { tr: "GRI Studio", en: "GRI Studio" },
    description: { tr: "Gösterge, materyalite ve içerik akışı", en: "Indicators, materiality, and content flows" },
  },
  {
    id: "city",
    href: "/platform/climateos/city",
    icon: "city",
    label: { tr: "Şehir Emisyonları", en: "City Emissions" },
    description: { tr: "Sektörel envanter ve karar desteği", en: "Sector inventory and decision support" },
  },
  {
    id: "evidence",
    href: "/platform/climateos/evidence",
    icon: "evidence",
    label: { tr: "Kanıt Kasası", en: "Evidence Vault" },
    description: { tr: "Belge, kaynak ve sürüm yönetimi", en: "Document, source, and version management" },
  },
  {
    id: "reports",
    href: "/platform/climateos/reports",
    icon: "reports",
    label: { tr: "Rapor Merkezi", en: "Reports Center" },
    description: { tr: "Yayın ve dışa aktarım akışları", en: "Publication and export workflows" },
  },
];

export const climatePlatformShellCopy = {
  tr: {
    workspace: "ClimateOS Platform",
    tenant: "Gaziantep Büyükşehir Belediyesi / Pilot Tenant",
    status: "Gerçek platform omurgası",
    backToSite: "Siteye dön",
    actions: {
      evidence: "Kanıt kuyruğu",
      reports: "Raporlar",
    },
  },
  en: {
    workspace: "ClimateOS Platform",
    tenant: "Gaziantep Metropolitan Municipality / Pilot Tenant",
    status: "Real platform backbone",
    backToSite: "Back to site",
    actions: {
      evidence: "Evidence queue",
      reports: "Reports",
    },
  },
} as const;

export function getClimatePlatformLocale(language: string): PlatformLocale {
  return language === "en" ? "en" : "tr";
}
