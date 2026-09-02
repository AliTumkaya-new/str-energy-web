import type { Metadata } from "next";
import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ChatWidget from "@/components/ChatWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { organizationJsonLd, SITE_URL } from "@/lib/seo";
import { headers } from "next/headers";
import { supportedLocales, type SupportedLocale } from "@/lib/locale";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = Oxanium({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "STR Energy | Energy Technology Startup & Intelligence Platform",
    template: "%s | STR Energy",
  },
  description:
    "STR — Smart Technologies for Renewables, saha ekipmanlarına bağlanan AI destekli endüstriyel enerji zekâsı platformunu geliştiren erken aşama enerji teknolojileri girişimidir.",
  keywords: [
    "energy software",
    "enerji yazılım",
    "enerji girişimi",
    "enerji teknolojileri girişimi",
    "energy startup",
    "climate tech startup",
    "Smart Technologies for Renewables",
    "PTF",
    "YEKDEM",
    "STR Energy Intelligence Platform",
    "RS485",
    "Modbus",
    "enerji analizörü",
    "ISO 50001",
    "AI anomaly detection",
    "digital twin",
    "EPİAŞ",
    "enerji verisi",
    "energy data",
    "STR Energy",
  ],
  authors: [{ name: "STR Energy Editorial Team", url: `${SITE_URL}/en/authors/str-energy-editorial-team` }],
  creator: "STR Energy",
  publisher: "STR Energy",
  verification: {
    google: "myfLV4uK_PH-ii6P6nzCLnc-qXBAvQUGja3fhR5YjaQ",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US", "ru_RU"],
    url: SITE_URL,
    siteName: "STR Energy",
    title: "STR Energy | Energy Technology Startup & Intelligence Platform",
    description:
      "Smart Technologies for Renewables: erken aşama enerji girişimi ve AI destekli endüstriyel enerji zekâsı platformu.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "STR Energy Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STR Energy | Energy Technology Startup & Intelligence Platform",
    description:
      "Smart Technologies for Renewables: an early-stage startup building industrial energy intelligence from field equipment to measurable action.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/str-logo0.png", type: "image/png", sizes: "32x32" },
      { url: "/str-logo0.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/str-logo0.png",
    apple: "/str-logo0.png",
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-str-locale");
  const documentLocale = supportedLocales.includes(requestedLocale as SupportedLocale)
    ? (requestedLocale as SupportedLocale)
    : "tr";

  return (
    <html lang={documentLocale} className="light" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4762071706286282"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} antialiased`}
      >
        <SmoothScroll />
        <LanguageProvider>
          <ThemeProvider>
            {children}
            <ChatWidget />
            <Analytics />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
