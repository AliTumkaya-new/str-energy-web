import type { Metadata } from "next";
import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ChatWidget from "@/components/ChatWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { organizationJsonLd, SITE_URL } from "@/lib/seo";

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
    default: "STR Energy | Enerji Yazılım Ar-Ge",
    template: "%s | STR Energy",
  },
  description:
    "Şebeke, tesis ve sayaç verilerini tek platformda birleştiren; gerçek zamanlı izleme, analitik ve otomasyon sunan enerji yazılım çözümleri.",
  keywords: [
    "energy software",
    "enerji yazılım",
    "PTF",
    "YEKDEM",
    "EnergyOS",
    "EnergyCloud",
    "PowerForecast",
    "GridAnalytics",
    "SecureGrid",
    "SmartMeter",
    "EPİAŞ",
    "enerji verisi",
    "energy data",
    "STR Energy",
  ],
  authors: [{ name: "STR Energy", url: SITE_URL }],
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
    title: "STR Energy | Enerji Yazılım Ar-Ge",
    description:
      "Şebeke, tesis ve sayaç verilerini tek platformda birleştiren; gerçek zamanlı izleme, analitik ve otomasyon sunan enerji yazılım çözümleri.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "STR Energy — Enerji Yazılım Çözümleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STR Energy | Enerji Yazılım Ar-Ge",
    description:
      "Enerji verisi yönetimi, tahminleme, güvenlik ve analiz çözümleri.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="light" suppressHydrationWarning>
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
