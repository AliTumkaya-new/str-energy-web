import type { NextConfig } from "next";
import path from "path";

const projectRoot = path.resolve(__dirname);
const legacyInsightRedirects: Record<string, string> = {
  "yekdem-cost": "ptf-market-clearing-price",
  "gip-intraday-market-clearing": "ptf-market-clearing-price",
  "balancing-power-market-turkiye": "ptf-market-clearing-price",
  "electricity-imbalance-cost-management": "ptf-market-clearing-price",
  "electricity-bill-components": "ptf-market-clearing-price",
  "electricity-procurement-supplier-selection": "ptf-market-clearing-price",
  "electricity-generation-vs-capacity": "entsoe-day-ahead-prices",
  "reactive-power-compensation": "industrial-energy-management",
  "industrial-demand-response": "industrial-energy-management",
  "energy-data-quality-meter-validation": "industrial-energy-management",
  "power-quality-harmonics": "industrial-energy-management",
  "transformer-losses-efficiency": "industrial-energy-management",
  "renewable-generation-forecasting": "energy-demand-forecasting",
  "scope-1-2-3-emissions": "cbam-carbon-border-adjustment",
  "emission-factor-selection": "cbam-carbon-border-adjustment",
  "eu-ets-carbon-market": "cbam-carbon-border-adjustment",
  "scada-ems-dms-differences": "smart-metering-ami-infrastructure",
  "ot-cybersecurity-iec-62443": "smart-metering-ami-infrastructure",
  "solar-pv-self-consumption-grid-integration": "battery-energy-storage-bess",
  "battery-storage-sizing": "battery-energy-storage-bess",
  "renewable-energy-ppa": "battery-energy-storage-bess",
  "yek-g-renewable-energy-certificates": "battery-energy-storage-bess",
};

const retiredContentRoutes: Record<string, string> = {
  news: "about",
  testimonials: "about",
  help: "contacts",
};

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      {
        source: "/products/energypulse",
        destination: "/projects/market-data",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ru)/products/energypulse",
        destination: "/:lang/projects/market-data",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/products/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ru)/products",
        destination: "/:lang/about",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ru)/products/:path*",
        destination: "/:lang/about",
        permanent: true,
      },
      {
        source: "/energy-startup",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ru)/energy-startup",
        destination: "/:lang/about",
        permanent: true,
      },
      ...Object.entries(legacyInsightRedirects).map(([source, destination]) => ({
        source: `/insights/${source}`,
        destination: `/insights/${destination}`,
        permanent: true,
      })),
      ...Object.entries(legacyInsightRedirects).map(([source, destination]) => ({
        source: `/:lang(tr|en|ru)/insights/${source}`,
        destination: `/:lang/insights/${destination}`,
        permanent: true,
      })),
      ...Object.entries(retiredContentRoutes).map(([source, destination]) => ({
        source: `/${source}`,
        destination: `/${destination}`,
        permanent: true,
      })),
      ...Object.entries(retiredContentRoutes).map(([source, destination]) => ({
        source: `/:lang(tr|en|ru)/${source}`,
        destination: `/:lang/${destination}`,
        permanent: true,
      })),
      {
        source: "/video-presentation/:path*",
        destination: "/about",
        permanent: true,
      },
    ];
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.openai.com https://seffaflik.epias.com.tr https://giris.epias.com.tr https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://fundingchoicesmessages.google.com",
      "frame-src 'self' https://*.googlesyndication.com https://*.doubleclick.net https://fundingchoicesmessages.google.com https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
