"use client";

import { useMemo, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

type BeamDirection = "forward" | "reverse";

type Beam = {
  id: number;
  path: string;
  duration: number;
  delay: number;
  repeatDelay: number;
  strokeWidth: number;
  opacity: number;
  direction: BeamDirection;
  peak: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function createBeams(
  basePaths: string[],
  startId: number,
  rand: () => number,
  options: {
    count: number;
    durationMin: number;
    durationMax: number;
    delayMax: number;
    widthMin: number;
    widthMax: number;
    opacityMin: number;
    opacityMax: number;
    peakMin: number;
    peakMax: number;
    reverseChance: number;
  }
): Beam[] {
  const beams: Beam[] = [];
  for (let i = 0; i < options.count; i++) {
    const path = basePaths[Math.floor(rand() * basePaths.length)] || basePaths[0];
    const duration = options.durationMin + rand() * (options.durationMax - options.durationMin);
    const delay = rand() * options.delayMax;
    const repeatDelay = rand() * 2.5;
    const strokeWidth = options.widthMin + rand() * (options.widthMax - options.widthMin);
    const opacity = options.opacityMin + rand() * (options.opacityMax - options.opacityMin);
    const peak = options.peakMin + rand() * (options.peakMax - options.peakMin);
    const direction: BeamDirection = rand() < options.reverseChance ? "reverse" : "forward";

    beams.push({
      id: startId + i,
      path,
      duration: clamp(duration, 2, 20),
      delay: clamp(delay, 0, 20),
      repeatDelay: clamp(repeatDelay, 0, 6),
      strokeWidth: clamp(strokeWidth, 0.8, 4),
      opacity: clamp(opacity, 0.05, 1),
      direction,
      peak: clamp(peak, 0.15, 0.85),
    });
  }
  return beams;
}

function generateBeamSets(seed: number) {
  const rand = mulberry32(seed);

  const beams = createBeams(orangePaths, 0, rand, {
    count: 14,
    durationMin: 4.8,
    durationMax: 11.5,
    delayMax: 7.5,
    widthMin: 1.2,
    widthMax: 3.0,
    opacityMin: 0.35,
    opacityMax: 0.85,
    peakMin: 0.25,
    peakMax: 0.7,
    reverseChance: 0.35,
  });

  const blueBeams = createBeams(bluePaths, 100, rand, {
    count: 7,
    durationMin: 6.5,
    durationMax: 14,
    delayMax: 9,
    widthMin: 0.9,
    widthMax: 1.8,
    opacityMin: 0.22,
    opacityMax: 0.55,
    peakMin: 0.18,
    peakMax: 0.5,
    reverseChance: 0.8,
  });

  return { beams, blueBeams };
}

const orangePaths = [
  "M-100,610 Q110,420 320,360 T720,210 T1120,120 T1520,-40",
  "M-60,660 Q160,470 360,390 T760,230 T1160,130 T1560,-20",
  "M0,705 Q210,510 420,430 T820,270 T1220,170 T1620,25",
  "M-150,560 Q70,360 270,290 T670,130 T1070,30 T1470,-90",
  "M-90,630 Q130,430 330,370 T730,210 T1130,110 T1530,-30",
  "M-120,590 Q90,390 290,330 T690,170 T1090,70 T1490,-70",
  "M-40,685 Q180,490 380,410 T780,250 T1180,150 T1580,5",
  "M-180,530 Q30,330 230,270 T630,110 T1030,10 T1430,-110",
  "M-70,645 Q150,445 350,385 T750,225 T1150,125 T1550,-15",
  "M-140,570 Q70,370 270,310 T670,150 T1070,50 T1470,-90",
  "M-110,610 Q120,420 320,355 T720,205 T1120,105 T1520,-45",
  "M-30,700 Q190,500 390,420 T790,260 T1190,160 T1590,15",
  "M-160,545 Q55,350 255,285 T655,125 T1055,25 T1455,-95",
  "M-85,625 Q135,430 335,365 T735,215 T1135,115 T1535,-35",
];

const bluePaths = [
  "M1620,90 Q1410,200 1210,285 T810,410 T410,520 T10,640",
  "M1560,140 Q1360,245 1160,325 T760,445 T360,550 T-40,670",
  "M1510,55 Q1310,155 1110,230 T710,345 T310,455 T-90,575",
  "M1660,120 Q1450,230 1250,310 T850,435 T450,545 T50,660",
];

export default function HeroSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const withLocale = useLocaleHref();
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(heroRef, { amount: 0.2, margin: "-20% 0px", once: true });
  const enableMotion = isInView && !prefersReducedMotion;

  const beamSets = useMemo(() => generateBeamSets(1337), []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center pt-20 overflow-hidden ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className={`absolute inset-0 w-full h-full hero-beams ${
            enableMotion ? "hero-beams--active" : ""
          } ${isDark ? "opacity-100" : "opacity-60"}`}
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="beamGradientOrange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
              <stop offset="20%" stopColor="#F97316" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
              <stop offset="80%" stopColor="#F97316" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="beamGradientBlue" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
              <stop offset="28%" stopColor="#3B82F6" stopOpacity="0.75" />
              <stop offset="62%" stopColor="#60A5FA" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>

          </defs>

          {beamSets.beams.map((beam) => (
            <path
              key={beam.id}
              d={beam.path}
              fill="none"
              stroke="url(#beamGradientOrange)"
              strokeWidth={beam.strokeWidth}
              strokeLinecap="round"
              pathLength={1}
              className="hero-beam"
              style={
                {
                  "--beam-dur": `${beam.duration}s`,
                  "--beam-delay": `${beam.delay}s`,
                  "--beam-opacity": beam.opacity.toFixed(2),
                  "--beam-from": beam.direction === "reverse" ? "-1" : "1",
                  "--beam-to": beam.direction === "reverse" ? "1" : "-1",
                } as React.CSSProperties
              }
            />
          ))}

          {beamSets.blueBeams.map((beam) => (
            <path
              key={beam.id}
              d={beam.path}
              fill="none"
              stroke="url(#beamGradientBlue)"
              strokeWidth={beam.strokeWidth}
              strokeLinecap="round"
              pathLength={1}
              className="hero-beam"
              style={
                {
                  "--beam-dur": `${beam.duration}s`,
                  "--beam-delay": `${beam.delay}s`,
                  "--beam-opacity": beam.opacity.toFixed(2),
                  "--beam-from": beam.direction === "reverse" ? "-1" : "1",
                  "--beam-to": beam.direction === "reverse" ? "1" : "-1",
                } as React.CSSProperties
              }
            />
          ))}
        </svg>

        <div className="absolute inset-0">
          {[
            { left: 15, top: 20, duration: 3.5, delay: 0.2 },
            { left: 85, top: 35, duration: 4.2, delay: 0.8 },
            { left: 45, top: 60, duration: 3.8, delay: 1.5 },
            { left: 70, top: 15, duration: 4.5, delay: 0.4 },
            { left: 25, top: 80, duration: 3.2, delay: 1.2 },
            { left: 55, top: 45, duration: 4.0, delay: 2.0 },
            { left: 10, top: 55, duration: 3.6, delay: 0.6 },
            { left: 90, top: 70, duration: 4.8, delay: 1.8 },
            { left: 35, top: 25, duration: 3.4, delay: 1.0 },
            { left: 60, top: 85, duration: 4.3, delay: 0.3 },
          ].map((particle, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-orange-500 rounded-full ${enableMotion ? "hero-particle" : ""}`}
              style={
                {
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  "--p-dur": `${particle.duration}s`,
                  "--p-delay": `${particle.delay}s`,
                  ...(enableMotion ? {} : { opacity: 0 }),
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 hero-static">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            <span className="str-hero-line str-hero-line--primary" data-text={t("hero.title1")}>
              {t("hero.title1")}
            </span>
            <br />
            <span className="str-hero-line str-hero-line--accent" data-text={t("hero.title2")}>
              {t("hero.title2")}
            </span>
          </h1>

          <p
            className={`text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-gray-400" : "text-zinc-600"
            }`}
          >
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={withLocale("#contacts")}
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105"
            >
              {t("hero.cta")}
            </a>

            <a
              href={withLocale("#products")}
              className={`group inline-flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 border hover:border-orange-500/50 text-orange-500 font-semibold rounded-full transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-black/5 border-black/10 hover:bg-black/10"
              }`}
            >
              {t("hero.cta2")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
