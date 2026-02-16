"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const testimonials = [
  {
    quote: {
      tr: "STR Enerji entegrasyonu, müşterilerimizle süreçleri otomatikleştirmemizi sağladı. Artık hiçbir talep kaybolmuyor ve analizler planlamaya yardımcı oluyor.",
      en: "STR Energy integration helped us automate key workflows. Now no request is lost, and analytics supports planning.",
      ru: "Интеграция STR Energy помогла автоматизировать ключевые процессы. Теперь ни один запрос не теряется, а аналитика помогает планировать."
    },
    name: "Azamat Kasymov",
    role: { tr: "Kurucu, Nomads Coffee", en: "Founder, Nomads Coffee", ru: "Основатель, Nomads Coffee" },
    rating: 5
  },
  {
    quote: {
      tr: "STR Enerji, çalışan devamsızlığını takip etmek için büyük kolaylık sağladı. Bildirimler ekip için çok uygun ve tek tıkla doğru raporlar alıyoruz.",
      en: "STR Energy made it much easier to track employee attendance. Notifications are convenient for the team, and we get accurate reports in one click.",
      ru: "STR Energy значительно упростил учет посещаемости сотрудников. Уведомления удобны, а отчеты получаем в один клик."
    },
    name: "Ainutay Toktoguloва",
    role: { tr: "İK Direktörü, Altyn Group", en: "HR Director, Altyn Group", ru: "HR директор, Altyn Group" },
    rating: 5
  },
  {
    quote: {
      tr: "STR Enerji, projelerde düzen getirmemize yardımcı oldu. Görev takibi ve görselleştirme, iş süreçlerini önemli ölçüde hızlandırdı.",
      en: "STR Energy helped us bring order to projects. Task tracking and visualization significantly accelerated our workflows.",
      ru: "STR Energy помог навести порядок в проектах. Учет задач и визуализация заметно ускорили рабочие процессы."
    },
    name: "Nurbek Oemonov",
    role: { tr: "Proje Müdürü, SQQR-1", en: "Project Manager, SQQR-1", ru: "Менеджер проекта, SQQR-1" },
    rating: 5
  }
];

export default function TestimonialsSection() {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="testimonials" className={`py-20 ${isDark ? "bg-zinc-950" : "bg-zinc-50"}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-zinc-900"}`}>
            {t("testimonials.title")}
          </h2>
          <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} max-w-2xl mx-auto`}>
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border rounded-2xl p-6 ${
                isDark ? "bg-zinc-900/50 border-white/5" : "bg-white border-black/10"
              }`}
            >
              <Quote className="w-8 h-8 text-orange-500/50 mb-4" />
              
              <p className={`${isDark ? "text-gray-300" : "text-zinc-700"} mb-6 leading-relaxed`}>
                &ldquo;{testimonial.quote[language]}&rdquo;
              </p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className={`${isDark ? "text-white" : "text-zinc-900"} font-medium`}>{testimonial.name}</div>
                  <div className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{testimonial.role[language]}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
