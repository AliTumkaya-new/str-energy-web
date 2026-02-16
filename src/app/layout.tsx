import type { Metadata } from "next";
import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ChatWidget from "@/components/ChatWidget";

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
  metadataBase: new URL("https://str.energy"),
  title: {
    default: "STR Energy | Enerji Yazılım Ar-Ge",
    template: "%s | STR Energy",
  },
  description:
    "Şebeke, tesis ve sayaç verilerini tek platformda birleştiren; gerçek zamanlı izleme, analitik ve otomasyon sunan enerji yazılım çözümleri.",
  keywords: [
    "enerji yazılım",
    "energy software",
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
  authors: [{ name: "STR Energy", url: "https://str.energy" }],
  creator: "STR Energy",
  publisher: "STR Energy",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US", "ru_RU"],
    url: "https://str.energy",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} antialiased`}
      >
        <LanguageProvider>
          <ThemeProvider>
            {children}
            <ChatWidget />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
