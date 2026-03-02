"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const testimonials = [
  {
    quote: {
      tr: "STR Enerji ile geliştirdiğimiz donanım çözümleri, üretim kalitemizi ve verimliliğimizi artırdı. Elektronik üretim ve tedarik zincirinde mükemmel bir entegrasyon sağladık.",
      en: "The hardware solutions we developed with STR Energy have enhanced our production quality and efficiency. We achieved seamless integration in electronic manufacturing and supply chain.",
      ru: "Аппаратные решения, разработанные совместно с STR Energy, повысили качество и эффективность нашего производства. Мы добились идеальной интеграции в цепочке поставок электроники."
    },
    name: "Henry Dai",
    role: { tr: "Üretim ve Operasyon Yöneticisi, PCBA Meline", en: "Manufacturing & Operations Manager, PCBA Meline", ru: "Менеджер по производству и операциям, PCBA Meline" },
    rating: 5
  },
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

  // Double the array for seamless infinite looping
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className={`pt-8 pb-12 mt-8 md:mt-16 overflow-hidden ${isDark ? "bg-zinc-950" : "bg-zinc-50"}`}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="container relative z-[15] w-full mb-32 md:mb-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-zinc-900"}`}>
            {t("testimonials.title")}
          </h2>
          <p className={`text-lg md:text-xl ${isDark ? "text-gray-400" : "text-zinc-500"} max-w-2xl mx-auto`}>
            {t("testimonials.subtitle")}
          </p>
        </motion.div>
      </div>

      <div className="relative flex w-full overflow-hidden pb-12 mt-6 md:mt-10">
        {/* Fading Edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r ${isDark ? "from-zinc-950 to-transparent" : "from-zinc-50 to-transparent"}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l ${isDark ? "from-zinc-950 to-transparent" : "from-zinc-50 to-transparent"}`} />

        <div className="flex gap-6 w-max animate-marquee disable-hover-on-scroll px-6">
          {loopedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className={`w-[320px] md:w-[400px] shrink-0 border rounded-2xl p-6 transition-colors ${
                isDark ? "bg-zinc-900/50 border-white/5 hover:bg-zinc-800/80" : "bg-white border-black/10 hover:shadow-xl hover:border-black/20"
              }`}
            >
              <Quote className="w-8 h-8 text-orange-500/50 mb-4" />
              
              <p className={`${isDark ? "text-gray-300" : "text-zinc-700"} mb-6 leading-relaxed whitespace-normal`}>
                &ldquo;{testimonial.quote[language]}&rdquo;
              </p>

              <div className="flex flex-col mt-auto">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-orange-500 font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <div className={`${isDark ? "text-white" : "text-zinc-900"} font-medium truncate`}>{testimonial.name}</div>
                    <div className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm truncate`}>{testimonial.role[language]}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
