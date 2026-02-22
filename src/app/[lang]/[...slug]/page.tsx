import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import AboutPage from "../../about/page";

import PrivacyPage from "../../privacy/page";
import HelpPage from "../../help/page";
import ContactsPage from "../../contacts/page";
import ProductsIndexPage from "../../products/page";
import EnergyOSPage from "../../products/energyos/page";
import GridAnalyticsPage from "../../products/gridanalytics/page";
import PowerForecastPage from "../../products/powerforecast/page";
import SecureGridPage from "../../products/securegrid/page";
import SmartMeterPage from "../../products/smartmeter/page";
import EnergyCloudPage from "../../products/energycloud/page";
import PortalPage from "../../portal/page";
import NewsPage from "../../news/page";

const routeMap: Record<string, () => ReactNode> = {
  "about": () => <AboutPage />,

  "privacy": () => <PrivacyPage />,
  "help": () => <HelpPage />,
  "contacts": () => <ContactsPage />,
  "products": () => <ProductsIndexPage />,
  "products/energyos": () => <EnergyOSPage />,
  "products/gridanalytics": () => <GridAnalyticsPage />,
  "products/powerforecast": () => <PowerForecastPage />,
  "products/securegrid": () => <SecureGridPage />,
  "products/smartmeter": () => <SmartMeterPage />,
  "products/energycloud": () => <EnergyCloudPage />,
  "portal": () => <PortalPage />,
  "news": () => <NewsPage />,
};

export default async function LocaleCatchAllPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const slugPath = slug.join("/") || "";
  const renderer = routeMap[slugPath];
  if (!renderer) return notFound();
  return renderer();
}
