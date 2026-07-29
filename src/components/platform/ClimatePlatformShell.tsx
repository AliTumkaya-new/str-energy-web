"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  Database,
  FileText,
  Leaf,
  Map,
  ScrollText,
  Sparkles,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";
import {
  climatePlatformSections,
  climatePlatformShellCopy,
  getClimatePlatformLocale,
  type ClimatePlatformIcon,
} from "@/lib/climateosPlatform";

const iconMap: Record<ClimatePlatformIcon, typeof BarChart3> = {
  dashboard: BarChart3,
  carbon: Leaf,
  gri: FileText,
  city: Map,
  evidence: Database,
  reports: ScrollText,
};

function normalizePath(pathname: string | null) {
  if (!pathname) return "";
  return pathname.replace(/^\/(tr|en|ru)(?=\/|$)/, "");
}

export default function ClimatePlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();

  const locale = getClimatePlatformLocale(language);
  const shellCopy = climatePlatformShellCopy[locale];
  const normalizedPath = normalizePath(pathname);
  const currentSection =
    climatePlatformSections.find((section) => section.href === normalizedPath) ?? climatePlatformSections[0];
  const isDark = theme === "dark";

  const pageBg = isDark ? "bg-black text-white" : "bg-[#f5f5ef] text-zinc-900";
  const shellBg = isDark ? "bg-zinc-950/80 border-white/10" : "bg-white/85 border-black/10";
  const cardBg = isDark ? "bg-zinc-900/60 border-white/10" : "bg-[#faf8f2] border-black/10";
  const desc = isDark ? "text-gray-400" : "text-zinc-600";
  const heading = isDark ? "text-white" : "text-zinc-900";

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <div className="grid min-h-screen lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className={`hidden lg:flex flex-col border-r p-6 ${shellBg}`}>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-sm font-medium text-orange-500">
              <Sparkles className="h-4 w-4" />
              {shellCopy.workspace}
            </div>
            <div className={`mt-4 text-sm ${desc}`}>{shellCopy.tenant}</div>
            <div className={`mt-1 text-xl font-semibold ${heading}`}>{shellCopy.status}</div>
          </div>

          <nav className="mt-8 space-y-2">
            {climatePlatformSections.map((section) => {
              const Icon = iconMap[section.icon];
              const active = currentSection.id === section.id;
              return (
                <Link
                  key={section.id}
                  href={withLocale(section.href)}
                  className={`block rounded-2xl border p-4 transition-colors ${
                    active
                      ? "border-orange-500/30 bg-orange-500/10"
                      : `${cardBg} ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <div className={`font-semibold ${heading}`}>{section.label[locale]}</div>
                      <div className={`mt-1 text-sm ${desc}`}>{section.description[locale]}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6">
            <Link
              href={withLocale("/products/climateos")}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${cardBg}`}
            >
              <ArrowLeft className="h-4 w-4" />
              {shellCopy.backToSite}
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          <header className={`sticky top-0 z-20 border-b backdrop-blur-xl ${shellBg}`}>
            <div className="px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className={`text-sm ${desc}`}>{shellCopy.workspace}</div>
                  <h1 className={`mt-1 text-2xl md:text-3xl font-bold ${heading}`}>{currentSection.label[locale]}</h1>
                  <p className={`mt-2 max-w-2xl ${desc}`}>{currentSection.description[locale]}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={withLocale("/platform/climateos/evidence")} className={`rounded-full border px-4 py-2 text-sm font-medium ${cardBg}`}>
                    {shellCopy.actions.evidence}
                  </Link>
                  <Link href={withLocale("/platform/climateos/reports")} className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-black hover:bg-orange-400">
                    {shellCopy.actions.reports}
                  </Link>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
                {climatePlatformSections.map((section) => {
                  const Icon = iconMap[section.icon];
                  const active = currentSection.id === section.id;
                  return (
                    <Link
                      key={section.id}
                      href={withLocale(section.href)}
                      className={`flex items-center gap-2 rounded-2xl border px-3 py-3 text-sm font-medium ${
                        active
                          ? "border-orange-500/30 bg-orange-500/10"
                          : `${cardBg} ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`
                      }`}
                    >
                      <Icon className="h-4 w-4 text-orange-500" />
                      <span className="truncate">{section.label[locale]}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
