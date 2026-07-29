import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { supportedLocales, type SupportedLocale } from "@/lib/locale";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  if (!supportedLocales.includes(lang as SupportedLocale)) return {};
  return buildMetadata(lang as SupportedLocale);
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = await params;
  if (!supportedLocales.includes(lang as SupportedLocale)) notFound();
  return children;
}
