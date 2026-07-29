import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import AboutPage from "../../about/page";
import TestimonialsPage from "../../testimonials/page";
import PrivacyPage from "../../privacy/page";
import HelpPage from "../../help/page";
import ContactsPage from "../../contacts/page";
import ProductsIndexPage from "../../products/page";
import ClimateOSPage from "../../products/climateos/page";
import EnergyOSPage from "../../products/energyos/page";
import GridAnalyticsPage from "../../products/gridanalytics/page";
import PowerForecastPage from "../../products/powerforecast/page";
import SecureGridPage from "../../products/securegrid/page";
import SmartMeterPage from "../../products/smartmeter/page";
import EnergyCloudPage from "../../products/energycloud/page";
import PortalPage from "../../portal/page";
import ClimatePortalPage from "../../portal/climateos/page";
import NewsPage from "../../news/page";
import EnergyPulsePage from "../../products/energypulse/page";
import InsightsIndex from "@/components/InsightsIndex";
import InsightArticle from "@/components/InsightArticle";
import { insightSlugs } from "@/lib/insights";
import { buildMetadata } from "@/lib/seo";
import { supportedLocales, type SupportedLocale } from "@/lib/locale";

const routeMap: Record<string, () => ReactNode> = {
  "about": () => <AboutPage />,
  "testimonials": () => <TestimonialsPage />,
  "privacy": () => <PrivacyPage />,
  "help": () => <HelpPage />,
  "contacts": () => <ContactsPage />,
  "products": () => <ProductsIndexPage />,
  "products/climateos": () => <ClimateOSPage />,
  "products/energyos": () => <EnergyOSPage />,
  "products/gridanalytics": () => <GridAnalyticsPage />,
  "products/powerforecast": () => <PowerForecastPage />,
  "products/securegrid": () => <SecureGridPage />,
  "products/smartmeter": () => <SmartMeterPage />,
  "products/energycloud": () => <EnergyCloudPage />,
  "products/energypulse": () => <EnergyPulsePage />,
  "portal": () => <PortalPage />,
  "portal/climateos": () => <ClimatePortalPage />,
  "news": () => <NewsPage />,
  "insights": () => <InsightsIndex />,
};

export async function generateMetadata({ params }: { params: Promise<{ lang?: string; slug?: string[] }> }): Promise<Metadata> {
  const { lang = "tr", slug = [] } = await params;
  const locale = supportedLocales.includes(lang as SupportedLocale) ? (lang as SupportedLocale) : "tr";
  return buildMetadata(locale, slug.join("/"));
}

export default async function LocaleCatchAllPage({ params }: { params: Promise<{ lang?: string; slug?: string[] }> }) {
  const { lang = "tr", slug = [] } = await params;
  const slugPath = slug.join("/") || "";
  if (slugPath.startsWith("insights/") && insightSlugs.includes(slugPath.slice("insights/".length))) {
    if (lang === "ru") redirect(`/en/${slugPath}`);
    return <InsightArticle slug={slugPath.slice("insights/".length)} />;
  }
  if (slugPath === "insights" && lang === "ru") redirect("/en/insights");
  if (["products/proofmesh", "products/cbam", "products/mini-audit", "platform/proofmesh", "platform/cbam", "platform/cbam/login"].includes(slugPath)) {
    redirect(`/${lang}/products`);
  }
  const renderer = routeMap[slugPath];
  if (!renderer) return notFound();
  return renderer();
}
