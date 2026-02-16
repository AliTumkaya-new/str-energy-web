import React, { useId } from "react";

export type HeroPatternVariant = "hatch" | "grid" | "dots" | "waves" | "circuit" | "diagonal" | "ticks";

type HeroPatternLayerProps = {
  isDark: boolean;
  patternHot: boolean;
  topClassName?: string;
  accentColor?: string;
  variant?: HeroPatternVariant;
};

export default function HeroPatternLayer({
  isDark,
  patternHot,
  topClassName = "top-16 md:top-20",
  accentColor = "#f97316",
  variant = "hatch",
}: HeroPatternLayerProps) {
  const reactId = useId();
  const safeId = reactId.replace(/[^a-zA-Z0-9_-]/g, "");
  const basePatternId = `strPatternBase_${safeId}`;
  const hotPatternId = `strPatternHot_${safeId}`;

  // Slightly stronger than before to meet “more visible” ask,
  // but still subtle enough not to compete with hero content.
  const neutralStrong = isDark ? "rgba(244,244,245,0.26)" : "rgba(24,24,27,0.16)";
  const neutralMid = isDark ? "rgba(244,244,245,0.18)" : "rgba(24,24,27,0.11)";
  const neutralSoft = isDark ? "rgba(244,244,245,0.10)" : "rgba(24,24,27,0.07)";

  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 ${topClassName}`}>
      {/* Base pattern (neutral) */}
      <div className="absolute inset-0" style={{ opacity: isDark ? 0.44 : 0.38 }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {variant === "hatch" && (
              <pattern id={basePatternId} x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M -12 48 L 48 -12" stroke={neutralStrong} strokeWidth="0.9" strokeLinecap="round" />
                <path d="M 0 60 L 60 0" stroke={neutralMid} strokeWidth="0.9" strokeLinecap="round" />
                <path d="M 24 0 L 24 48" stroke={neutralSoft} strokeWidth="0.7" strokeLinecap="round" />
              </pattern>
            )}

            {variant === "grid" && (
              <pattern id={basePatternId} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 H 0 V 40"
                  fill="none"
                  stroke={neutralMid}
                  strokeWidth="0.85"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2 3"
                />
                <path d="M 20 0 V 40" fill="none" stroke={neutralSoft} strokeWidth="0.75" strokeLinecap="round" strokeDasharray="1 4" />
                <path d="M 0 20 H 40" fill="none" stroke={neutralSoft} strokeWidth="0.75" strokeLinecap="round" strokeDasharray="1 4" />
                <circle cx="20" cy="20" r="1.3" fill={neutralSoft} />
              </pattern>
            )}

            {variant === "dots" && (
              <pattern id={basePatternId} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="1.25" fill={neutralStrong} />
                <circle cx="20" cy="14" r="1.0" fill={neutralMid} />
                <circle cx="14" cy="22" r="0.9" fill={neutralSoft} />
                <path d="M 6 20 H 10" stroke={neutralSoft} strokeWidth="0.8" strokeLinecap="round" />
                <path d="M 8 18 V 22" stroke={neutralSoft} strokeWidth="0.8" strokeLinecap="round" />
              </pattern>
            )}

            {variant === "waves" && (
              <pattern id={basePatternId} x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path
                  d="M -10 16 C 2 6, 18 26, 32 16 S 54 6, 72 16"
                  fill="none"
                  stroke={neutralStrong}
                  strokeWidth="1.0"
                  strokeLinecap="round"
                />
                <path
                  d="M -10 36 C 2 26, 18 46, 32 36 S 54 26, 72 36"
                  fill="none"
                  stroke={neutralMid}
                  strokeWidth="1.0"
                  strokeLinecap="round"
                />
                <path d="M 0 8 H 56" stroke={neutralSoft} strokeWidth="0.6" strokeLinecap="round" strokeDasharray="1 6" />
              </pattern>
            )}

            {variant === "circuit" && (
              <pattern id={basePatternId} x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
                <path
                  d="M 8 20 H 28 V 8 H 52"
                  fill="none"
                  stroke={neutralMid}
                  strokeWidth="1.0"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M 12 52 H 40 V 40 H 56"
                  fill="none"
                  stroke={neutralStrong}
                  strokeWidth="1.0"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <circle cx="28" cy="20" r="1.6" fill={neutralSoft} />
                <circle cx="40" cy="52" r="1.6" fill={neutralSoft} />
                <circle cx="28" cy="8" r="1.4" fill={neutralMid} />
                <circle cx="56" cy="40" r="1.4" fill={neutralMid} />
              </pattern>
            )}

            {variant === "diagonal" && (
              <pattern id={basePatternId} x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
                <path d="M -10 44 L 44 -10" stroke={neutralStrong} strokeWidth="1.0" strokeLinecap="round" strokeDasharray="6 6" />
                <path d="M 0 54 L 54 0" stroke={neutralMid} strokeWidth="0.9" strokeLinecap="round" strokeDasharray="10 8" />
                <path d="M 18 44 L 44 18" stroke={neutralSoft} strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 10" />
              </pattern>
            )}

            {variant === "ticks" && (
              <pattern id={basePatternId} x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
                <path d="M 10 6 V 46" stroke={neutralStrong} strokeWidth="1.0" strokeLinecap="round" />
                <path d="M 26 10 V 42" stroke={neutralMid} strokeWidth="1.0" strokeLinecap="round" />
                <path d="M 42 6 V 46" stroke={neutralSoft} strokeWidth="1.0" strokeLinecap="round" />
                <path d="M 6 26 H 46" stroke={neutralSoft} strokeWidth="0.7" strokeLinecap="round" strokeDasharray="1 7" />
                <circle cx="26" cy="26" r="1.35" fill={neutralSoft} />
              </pattern>
            )}
          </defs>
          <rect width="100%" height="100%" fill={`url(#${basePatternId})`} />
        </svg>
      </div>

      {/* Hover overlay (accent color, spotlight) */}
      <div
        className={`absolute inset-0 transition-opacity duration-200 ${patternHot ? "opacity-100" : "opacity-0"}`}
        style={{
          WebkitMaskImage:
            "radial-gradient(240px circle at var(--str-hex-x) var(--str-hex-y), #000 0%, rgba(0,0,0,0.35) 35%, transparent 70%)",
          maskImage:
            "radial-gradient(240px circle at var(--str-hex-x) var(--str-hex-y), #000 0%, rgba(0,0,0,0.35) 35%, transparent 70%)",
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {variant === "hatch" && (
              <pattern id={hotPatternId} x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M -12 48 L 48 -12" stroke={accentColor} strokeOpacity={0.62} strokeWidth="1.0" strokeLinecap="round" />
                <path d="M 0 60 L 60 0" stroke={accentColor} strokeOpacity={0.42} strokeWidth="1.0" strokeLinecap="round" />
                <path d="M 24 0 L 24 48" stroke={accentColor} strokeOpacity={0.22} strokeWidth="0.8" strokeLinecap="round" />
              </pattern>
            )}

            {variant === "grid" && (
              <pattern id={hotPatternId} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 H 0 V 40"
                  fill="none"
                  stroke={accentColor}
                  strokeOpacity={0.42}
                  strokeWidth="1.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2 3"
                />
                <path
                  d="M 20 0 V 40"
                  fill="none"
                  stroke={accentColor}
                  strokeOpacity={0.26}
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeDasharray="1 4"
                />
                <path
                  d="M 0 20 H 40"
                  fill="none"
                  stroke={accentColor}
                  strokeOpacity={0.26}
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeDasharray="1 4"
                />
                <circle cx="20" cy="20" r="1.6" fill={accentColor} fillOpacity={0.24} />
              </pattern>
            )}

            {variant === "dots" && (
              <pattern id={hotPatternId} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="1.35" fill={accentColor} fillOpacity={0.40} />
                <circle cx="20" cy="14" r="1.15" fill={accentColor} fillOpacity={0.26} />
                <circle cx="14" cy="22" r="1.0" fill={accentColor} fillOpacity={0.18} />
                <path d="M 6 20 H 10" stroke={accentColor} strokeOpacity={0.22} strokeWidth="0.9" strokeLinecap="round" />
                <path d="M 8 18 V 22" stroke={accentColor} strokeOpacity={0.22} strokeWidth="0.9" strokeLinecap="round" />
              </pattern>
            )}

            {variant === "waves" && (
              <pattern id={hotPatternId} x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path
                  d="M -10 16 C 2 6, 18 26, 32 16 S 54 6, 72 16"
                  fill="none"
                  stroke={accentColor}
                  strokeOpacity={0.46}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <path
                  d="M -10 36 C 2 26, 18 46, 32 36 S 54 26, 72 36"
                  fill="none"
                  stroke={accentColor}
                  strokeOpacity={0.30}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <path d="M 0 8 H 56" stroke={accentColor} strokeOpacity={0.16} strokeWidth="0.75" strokeLinecap="round" strokeDasharray="1 6" />
              </pattern>
            )}

            {variant === "circuit" && (
              <pattern id={hotPatternId} x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
                <path
                  d="M 8 20 H 28 V 8 H 52"
                  fill="none"
                  stroke={accentColor}
                  strokeOpacity={0.34}
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M 12 52 H 40 V 40 H 56"
                  fill="none"
                  stroke={accentColor}
                  strokeOpacity={0.52}
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <circle cx="28" cy="20" r="1.9" fill={accentColor} fillOpacity={0.18} />
                <circle cx="40" cy="52" r="1.9" fill={accentColor} fillOpacity={0.18} />
                <circle cx="28" cy="8" r="1.7" fill={accentColor} fillOpacity={0.26} />
                <circle cx="56" cy="40" r="1.7" fill={accentColor} fillOpacity={0.26} />
              </pattern>
            )}

            {variant === "diagonal" && (
              <pattern id={hotPatternId} x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
                <path d="M -10 44 L 44 -10" stroke={accentColor} strokeOpacity={0.52} strokeWidth="1.1" strokeLinecap="round" strokeDasharray="6 6" />
                <path d="M 0 54 L 54 0" stroke={accentColor} strokeOpacity={0.32} strokeWidth="1.0" strokeLinecap="round" strokeDasharray="10 8" />
                <path d="M 18 44 L 44 18" stroke={accentColor} strokeOpacity={0.16} strokeWidth="0.9" strokeLinecap="round" strokeDasharray="2 10" />
              </pattern>
            )}

            {variant === "ticks" && (
              <pattern id={hotPatternId} x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
                <path d="M 10 6 V 46" stroke={accentColor} strokeOpacity={0.50} strokeWidth="1.15" strokeLinecap="round" />
                <path d="M 26 10 V 42" stroke={accentColor} strokeOpacity={0.32} strokeWidth="1.15" strokeLinecap="round" />
                <path d="M 42 6 V 46" stroke={accentColor} strokeOpacity={0.20} strokeWidth="1.15" strokeLinecap="round" />
                <path d="M 6 26 H 46" stroke={accentColor} strokeOpacity={0.18} strokeWidth="0.85" strokeLinecap="round" strokeDasharray="1 7" />
                <circle cx="26" cy="26" r="1.6" fill={accentColor} fillOpacity={0.22} />
              </pattern>
            )}
          </defs>
          <rect width="100%" height="100%" fill={`url(#${hotPatternId})`} />
        </svg>
      </div>
    </div>
  );
}
