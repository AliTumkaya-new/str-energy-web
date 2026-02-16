"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Zap, BarChart3, TrendingUp, Shield, Gauge, Cloud, ArrowRight } from "lucide-react";

const products = [
  { key: "energyos", icon: Zap, href: "/products/energyos" },
  { key: "gridanalytics", icon: BarChart3, href: "/products/gridanalytics" },
  { key: "powerforecast", icon: TrendingUp, href: "/products/powerforecast" },
  { key: "securegrid", icon: Shield, href: "/products/securegrid" },
  { key: "smartmeter", icon: Gauge, href: "/products/smartmeter" },
  { key: "energycloud", icon: Cloud, href: "/products/energycloud" },
];

export default function ProductsPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-zinc-900"}`}>
      <Header />

      <section className="pt-28 md:pt-32 pb-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
              isDark
                ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                : "bg-orange-500/10 border-orange-500/20 text-orange-700"
            }`}>
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              {t("nav.products")}
            </div>
            <h1 className={`mt-6 text-4xl md:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
              Ürünler
            </h1>
            <p className={`mt-4 text-lg ${isDark ? "text-gray-400" : "text-zinc-600"}`}>
              Enerji yazılım ürünlerimizin her biri ayrı bir probleme odaklanır: izleme, analiz, tahmin, güvenlik ve veri yönetimi.
            </p>
          </motion.div>
        </div>
      </section>

      <section className={`pb-20 ${isDark ? "bg-black" : "bg-white"}`}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.key}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className={`group border rounded-2xl p-6 transition-all ${
                    isDark
                      ? "bg-zinc-900/50 border-white/5 hover:border-orange-500/30 hover:shadow-orange-500/5"
                      : "bg-zinc-50 border-black/10 hover:border-orange-500/30 hover:shadow-orange-500/10"
                  } hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                        <Icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <h3 className={`text-lg font-semibold group-hover:text-orange-500 transition-colors ${
                        isDark ? "text-white" : "text-zinc-900"
                      }`}>
                        {t(`product.${product.key}`)}
                      </h3>
                      <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-gray-500" : "text-zinc-600"}`}>
                        {t(`product.${product.key}.desc`)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={product.href}
                      className={`inline-flex items-center gap-2 text-sm font-semibold ${
                        isDark ? "text-orange-400 hover:text-orange-300" : "text-orange-700 hover:text-orange-600"
                      }`}
                    >
                      Detaylar
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
