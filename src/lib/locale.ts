export const supportedLocales = ["tr", "en", "ru"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export function getLocaleFromPathname(pathname: string | null | undefined): SupportedLocale | null {
  if (!pathname) return null;
  const segment = pathname.split("/")[1];
  if (segment === "tr" || segment === "en" || segment === "ru") return segment;
  return null;
}

export function prefixHrefWithLocale(href: string, locale: SupportedLocale): string {
  if (!href) return href;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith(`/${locale}`)) return href;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return href;
}

export function replaceLocaleInPath(pathname: string, locale: SupportedLocale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && supportedLocales.includes(segments[0] as SupportedLocale)) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return `/${segments.join("/")}`;
}
