"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, BarChart3, TrendingUp, Shield, Gauge, Cloud } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, prefixHrefWithLocale, type SupportedLocale } from "@/lib/locale";

const products = [
  { key: "energyos", icon: Zap, href: "/products/energyos" },
  { key: "gridanalytics", icon: BarChart3, href: "/products/gridanalytics" },
  { key: "powerforecast", icon: TrendingUp, href: "/products/powerforecast" },
  { key: "securegrid", icon: Shield, href: "/products/securegrid" },
  { key: "smartmeter", icon: Gauge, href: "/products/smartmeter" },
  { key: "energycloud", icon: Cloud, href: "/products/energycloud" },
];

export default function ProductsGrid() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();
  const currentLocale = (getLocaleFromPathname(pathname) || "tr") as SupportedLocale;
  const withLocale = (href: string) => prefixHrefWithLocale(href, currentLocale);

  return (
    <section id="products" className={`py-20 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-zinc-900"}`}>
            {t("products.title")}
          </h2>
          <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} max-w-2xl mx-auto`}>
            {t("products.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Link key={product.key} href={withLocale(product.href)} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group border rounded-2xl p-6 hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/5 pointer-events-auto ${
                    isDark ? "bg-zinc-900/50 border-white/5" : "bg-zinc-50 border-black/10"
                  }`}
                >
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3
                    className={`text-lg font-semibold mb-2 group-hover:text-orange-500 transition-colors ${
                      isDark ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {t(`product.${product.key}`)}
                  </h3>
                  <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm leading-relaxed`}>
                    {t(`product.${product.key}.desc`)}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
