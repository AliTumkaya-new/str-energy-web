"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPathname, prefixHrefWithLocale, type SupportedLocale } from "@/lib/locale";

export function useLocaleHref() {
  const pathname = usePathname();
  const locale = (getLocaleFromPathname(pathname) || "tr") as SupportedLocale;
  return (href: string) => prefixHrefWithLocale(href, locale);
}
