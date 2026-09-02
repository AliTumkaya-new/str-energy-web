import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import AboutPage from "../../about/page";
import PrivacyPage from "../../privacy/page";
import ContactsPage from "../../contacts/page";
import TermsPage from "../../terms/page";
import CookiePolicyPage from "../../cookie-policy/page";
import DisclaimerPage from "../../disclaimer/page";
import EditorialPolicyPage from "../../editorial-policy/page";
import EditorialTeamPage from "../../authors/str-energy-editorial-team/page";
import MarketDataMethodologyPage from "../../methodology/market-data/page";
import MarketDataProjectPage from "../../projects/market-data/page";
import PortalPage from "../../portal/page";
import ClimatePortalPage from "../../portal/climateos/page";
import InsightsIndex from "@/components/InsightsIndex";
import InsightArticle from "@/components/InsightArticle";
import { insightSlugs } from "@/lib/insights";
import { buildMetadata } from "@/lib/seo";
import { supportedLocales, type SupportedLocale } from "@/lib/locale";

const routeMap: Record<string, () => ReactNode> = {
  "about": () => <AboutPage />,
  "privacy": () => <PrivacyPage />,
  "contacts": () => <ContactsPage />,
  "terms": () => <TermsPage />,
  "cookie-policy": () => <CookiePolicyPage />,
  "disclaimer": () => <DisclaimerPage />,
  "editorial-policy": () => <EditorialPolicyPage />,
  "authors/str-energy-editorial-team": () => <EditorialTeamPage />,
  "methodology/market-data": () => <MarketDataMethodologyPage />,
  "projects/market-data": () => <MarketDataProjectPage />,
  "portal": () => <PortalPage />,
  "portal/climateos": () => <ClimatePortalPage />,
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
  if (slugPath === "products/energypulse") {
    redirect(`/${lang}/projects/market-data`);
  }
  if (["products/cbam", "products/climateos", "products/energyos", "products/gridanalytics", "products/mini-audit", "products/powerforecast", "products/proofmesh", "products/securegrid", "products/smartmeter", "products/energycloud"].includes(slugPath)) {
    redirect(`/${lang}/about`);
  }
  if (["platform/proofmesh", "platform/cbam", "platform/cbam/login"].includes(slugPath)) {
    redirect(`/${lang}/about`);
  }
  const renderer = routeMap[slugPath];
  if (!renderer) return notFound();
  return renderer();
}
