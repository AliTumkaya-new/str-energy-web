"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface AdSenseUnitProps {
  client?: string;
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
  variant?: "in-article" | "banner" | "sidebar";
  showLabel?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export default function AdSenseUnit({
  client = "ca-pub-4762071706286282",
  slot,
  format = "auto",
  responsive = true,
  className = "",
  variant = "banner",
  showLabel = true,
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && adRef.current && !isPushed.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      }
    } catch (err) {
      // Ignore adsbygoogle duplicate push errors during fast re-renders
      console.debug("AdSense status:", err);
    }
  }, []);

  const labelText =
    language === "tr"
      ? "Sponsorlu Alan / Reklam"
      : language === "ru"
      ? "Реклама"
      : "Advertisement";

  const containerStyles = {
    "in-article": `my-8 p-4 rounded-2xl border text-center transition-all ${
      isDark
        ? "bg-zinc-950/60 border-white/5"
        : "bg-zinc-50 border-black/5"
    }`,
    banner: `my-6 p-3 rounded-2xl border text-center transition-all ${
      isDark
        ? "bg-zinc-950/40 border-white/5"
        : "bg-zinc-50/80 border-black/5"
    }`,
    sidebar: `my-4 p-3 rounded-xl border text-center transition-all ${
      isDark
        ? "bg-zinc-950 border-white/10"
        : "bg-zinc-50 border-black/10"
    }`,
  }[variant];

  return (
    <aside
      aria-label={labelText}
      className={`${containerStyles} ${className} overflow-hidden`}
    >
      {showLabel && (
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          {labelText}
        </div>
      )}
      <div className="min-h-[90px] w-full flex items-center justify-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", minWidth: "250px" }}
          data-ad-client={client}
          {...(slot ? { "data-ad-slot": slot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </aside>
  );
}

