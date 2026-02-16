import type { Metadata } from "next";
import type { ReactNode } from "react";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const brandName = lang === "tr" ? "STR Enerji" : "STR Energy";
  return {
    title: `${brandName} | Software R&D`,
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  await params;
  return children;
}
