"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Lang = "tr" | "en" | "ru";

/* ─────────── LOCAL KNOWLEDGE BASE ─────────── */
type KBEntry = {
  keywords: string[];
  answer: { tr: string; en: string; ru: string };
};

const knowledgeBase: KBEntry[] = [
  /* ───── PTF ───── */
  {
    keywords: ["ptf", "piyasa takas", "market clearing", "fiyat", "price"],
    answer: {
      tr: "PTF (Piyasa Takas Fiyatı), Türkiye'nin saatlik toptan elektrik fiyatıdır. EPİAŞ tarafından gün öncesi piyasasında belirlenir. Güncel PTF verilerini EnergyPulse ürünümüzden 'PTF' veri setini seçerek görüntüleyebilirsiniz.",
      en: "PTF (Market Clearing Price) is Turkey's hourly wholesale electricity price, determined by EPİAŞ in the day-ahead market. You can view current PTF data in EnergyPulse by selecting the 'PTF' dataset.",
      ru: "PTF — это часовая оптовая цена электроэнергии в Турции, определяемая EPİAŞ на рынке на сутки вперёд. Вы можете просмотреть текущие данные PTF, выбрав набор данных 'PTF' в нашей панели.",
    },
  },
  /* ───── YEKDEM ───── */
  {
    keywords: ["yekdem", "yenilenebilir", "renewable", "возобновляем", "üretim", "generation", "генерация"],
    answer: {
      tr: "YEKDEM (Yenilenebilir Enerji Kaynaklarını Destekleme Mekanizması) Türkiye'nin yenilenebilir enerji üreticilerine sağladığı teşvik sistemidir. Güneş, rüzgâr, hidroelektrik, jeotermal ve biyokütle kaynaklarını kapsar. YEKDEM birim maliyet verilerini panelimizden takip edebilirsiniz.",
      en: "YEKDEM is Turkey's Renewable Energy Support Mechanism, providing incentives for renewable energy producers covering solar, wind, hydro, geothermal and biomass. You can track YEKDEM unit cost data from our dashboard panel.",
      ru: "YEKDEM — это Механизм поддержки возобновляемых источников энергии Турции, включающий солнечную, ветровую, гидро- и геотермальную энергию. Данные о стоимости YEKDEM доступны на нашей панели.",
    },
  },
  /* ───── EnergyOS ───── */
  {
    keywords: ["energyos", "energy os", "işletim", "operating", "операционная"],
    answer: {
      tr: "EnergyOS, STR Energy'nin enerji verisi işletim sistemidir. Tüm enerji verilerinizi tek platformda toplar, gerçek zamanlı analiz yapar ve akıllı kararlar almanızı sağlar. PTF tahminleme, portföy yönetimi, otomatik raporlama ve API entegrasyonu gibi özellikler sunar.",
      en: "EnergyOS is STR Energy's energy data operating system. It centralizes all your energy data, provides real-time analytics, and enables smart decision-making. Features include PTF forecasting, portfolio management, automated reporting, and API integration.",
      ru: "EnergyOS — это операционная система энергетических данных от STR Energy. Она собирает все данные, обеспечивает аналитику в реальном времени и помогает принимать умные решения. PTF-прогнозирование, управление портфелем и API-интеграция.",
    },
  },
  /* ───── EnergyCloud ───── */
  {
    keywords: ["energycloud", "cloud", "bulut", "облак", "depolama", "storage", "хранилище"],
    answer: {
      tr: "EnergyCloud, petabayt ölçeğinde enerji verisi depolama ve işleme platformumuzdur. AWS, Azure ve GCP entegrasyonu, KVKK/GDPR uyumlu güvenlik, end-to-end şifreleme ve global CDN dağıtımı sunar. Ücretsiz migration servisi ile verilerinizi kesintisiz taşıyoruz.",
      en: "EnergyCloud is our petabyte-scale energy data storage and processing platform. It offers AWS, Azure & GCP integration, KVKK/GDPR compliant security, end-to-end encryption, and global CDN. We provide free migration services for seamless data transfer.",
      ru: "EnergyCloud — наша платформа хранения и обработки данных петабайтного масштаба. AWS, Azure, GCP интеграция, соответствие GDPR, сквозное шифрование и глобальный CDN.",
    },
  },
  /* ───── PowerForecast ───── */
  {
    keywords: ["powerforecast", "forecast", "tahmin", "прогноз", "prediction", "öngörü"],
    answer: {
      tr: "PowerForecast, yapay zekâ destekli enerji üretim ve tüketim tahminleme platformumuzdur. %97'ye varan doğruluk oranıyla güneş, rüzgâr ve hidroelektrik üretimi tahmin eder. Meteorolojik veri entegrasyonu ve otomatik model güncelleme sunar.",
      en: "PowerForecast is our AI-powered energy generation and consumption forecasting platform. It predicts solar, wind, and hydro generation with up to 97% accuracy, featuring meteorological data integration and automatic model updates.",
      ru: "PowerForecast — наша AI-платформа прогнозирования генерации и потребления энергии с точностью до 97%. Интеграция метеоданных и автоматическое обновление моделей.",
    },
  },
  /* ───── GridAnalytics ───── */
  {
    keywords: ["gridanalytics", "analytics", "analiz", "grid", "şebeke", "аналитика", "сеть"],
    answer: {
      tr: "GridAnalytics, elektrik şebekesi analiz platformumuzdur. Gerçek zamanlı şebeke izleme, kayıp-kaçak tespiti, yük dengeleme ve altyapı optimizasyonu sunar. IoT sensör entegrasyonu ile akıllı şebeke yönetimi sağlar.",
      en: "GridAnalytics is our power grid analytics platform offering real-time grid monitoring, loss detection, load balancing, and infrastructure optimization with IoT sensor integration for smart grid management.",
      ru: "GridAnalytics — платформа аналитики электросети: мониторинг в реальном времени, обнаружение потерь, балансировка нагрузки и интеграция IoT-датчиков.",
    },
  },
  /* ───── SecureGrid ───── */
  {
    keywords: ["securegrid", "secure", "güvenlik", "security", "безопасност", "siber", "cyber"],
    answer: {
      tr: "SecureGrid, enerji altyapısı siber güvenlik platformumuzdur. SCADA/ICS koruma, tehdit tespit ve müdahale, güvenlik denetimi ve uyumluluk yönetimi sunar. ISO 27001 ve IEC 62351 sertifikalıdır.",
      en: "SecureGrid is our energy infrastructure cybersecurity platform providing SCADA/ICS protection, threat detection & response, security auditing, and compliance management. ISO 27001 and IEC 62351 certified.",
      ru: "SecureGrid — платформа кибербезопасности энергетической инфраструктуры: защита SCADA/ICS, обнаружение угроз, аудит безопасности. Сертификаты ISO 27001, IEC 62351.",
    },
  },
  /* ───── SmartMeter ───── */
  {
    keywords: ["smartmeter", "smart meter", "sayaç", "meter", "счётчик", "ölçüm", "metering"],
    answer: {
      tr: "SmartMeter, akıllı sayaç yönetim platformumuzdur. Uzaktan okuma, gerçek zamanlı tüketim analizi, kaçak tespit ve otomatik faturalama sunar. AMR/AMI altyapılarıyla tam uyumludur.",
      en: "SmartMeter is our smart metering management platform offering remote reading, real-time consumption analytics, fraud detection, and automated billing. Fully compatible with AMR/AMI infrastructure.",
      ru: "SmartMeter — наша платформа управления умными счётчиками: удалённое считывание, анализ потребления, обнаружение хищений и автоматический биллинг.",
    },
  },
  /* ───── STR Energy Company ───── */
  {
    keywords: ["str energy", "şirket", "company", "компания", "hakkında", "about", "kim", "who", "кто"],
    answer: {
      tr: "STR Energy, enerji sektörüne yönelik yazılım çözümleri geliştiren bir teknoloji şirketidir. EnergyOS, EnergyCloud, PowerForecast, GridAnalytics, SecureGrid ve SmartMeter ürünleriyle enerji verisi yönetimi, tahminleme, güvenlik ve analiz hizmetleri sunar.",
      en: "STR Energy is a technology company developing software solutions for the energy sector. With products like EnergyOS, EnergyCloud, PowerForecast, GridAnalytics, SecureGrid, and SmartMeter, we provide energy data management, forecasting, security, and analytics.",
      ru: "STR Energy — технологическая компания, разрабатывающая решения для энергетического сектора: EnergyOS, EnergyCloud, PowerForecast, GridAnalytics, SecureGrid и SmartMeter.",
    },
  },
  /* ───── Contact ───── */
  {
    keywords: ["iletişim", "contact", "связь", "email", "mail", "telefon", "phone"],
    answer: {
      tr: "STR Energy ile iletişime geçmek için web sitemizin İletişim sayfasını ziyaret edebilir veya +90 544 918 70 90 numarasını arayabilirsiniz. Demo talebi için de aynı numarayı kullanabilirsiniz.",
      en: "To contact STR Energy, visit the Contact page on our website or call +90 544 918 70 90. You can also use the same number for demo requests.",
      ru: "Для связи с STR Energy посетите страницу Контакты на нашем сайте или позвоните по номеру +90 544 918 70 90.",
    },
  },
  /* ───── EPİAŞ / Live Data ───── */
  {
    keywords: ["epiaş", "epias", "canlı", "live", "veri", "data", "данные"],
    answer: {
      tr: "Canlı enerji verilerine ana sayfamızdaki EnergyPulse ürününden ulaşabilirsiniz. PTF, YEKDEM birim maliyet, gerçek zamanlı üretim, yük tahmin planı ve GİP ağırlıklı ortalama verilerini EPİAŞ API üzerinden çekiyoruz. Tarih aralığı seçip 'Sorgula' butonuna tıklayın.",
      en: "Access live energy data through EnergyPulse on our homepage. We pull PTF, YEKDEM unit cost, real-time generation, load estimation, and weighted average price data via the EPİAŞ API. Select a date range and click 'Query'.",
      ru: "Доступ к данным в реальном времени — на главной странице в панели Энергоданных. PTF, YEKDEM, генерация и средневзвешенная цена через API EPİAŞ.",
    },
  },
  /* ───── Demo ───── */
  {
    keywords: ["demo", "deneme", "trial", "демо"],
    answer: {
      tr: "Ürünlerimizin ücretsiz demosunu talep etmek için İletişim sayfamızı ziyaret edebilir veya +90 544 918 70 90 numarasını arayabilirsiniz. Ekibimiz en kısa sürede size dönecektir.",
      en: "To request a free demo of our products, visit our Contact page or call +90 544 918 70 90. Our team will get back to you shortly.",
      ru: "Для бесплатной демо-версии посетите страницу Контакты или позвоните по номеру +90 544 918 70 90.",
    },
  },
  /* ───── Pricing ───── */
  {
    keywords: ["fiyat", "ücret", "pricing", "cost", "цена", "стоимость", "tarife"],
    answer: {
      tr: "Ürünlerimizin fiyatlandırması ihtiyaçlarınıza göre özelleştirilmektedir. Detaylı fiyat bilgisi ve teklif almak için İletişim sayfamızdan bizimle iletişime geçebilirsiniz.",
      en: "Our product pricing is customized to your needs. For detailed pricing and quotes, please contact us through our Contact page.",
      ru: "Цены на наши продукты формируются индивидуально. Для получения предложения свяжитесь с нами через страницу Контакты.",
    },
  },
  /* ───── Merhaba / Greetings ───── */
  {
    keywords: ["merhaba", "hello", "hi", "hey", "selam", "привет", "здравствуй"],
    answer: {
      tr: "Merhaba! 👋 STR Energy Asistanına hoş geldiniz. Size PTF, YEKDEM verileri veya ürünlerimiz hakkında yardımcı olabilirim. Ne sormak istersiniz?",
      en: "Hello! 👋 Welcome to the STR Energy Assistant. I can help you with PTF, YEKDEM data, or information about our products. What would you like to know?",
      ru: "Привет! 👋 Добро пожаловать в STR Energy ассистент. Могу помочь с PTF, YEKDEM или информацией о наших продуктах. Что хотите узнать?",
    },
  },
  /* ───── Thanks ───── */
  {
    keywords: ["teşekkür", "sağol", "thanks", "thank", "спасибо"],
    answer: {
      tr: "Rica ederim! 😊 Başka bir sorunuz olursa sormaktan çekinmeyin.",
      en: "You're welcome! 😊 Feel free to ask if you have any other questions.",
      ru: "Пожалуйста! 😊 Не стесняйтесь задавать другие вопросы.",
    },
  },
];

const defaultAnswer: { tr: string; en: string; ru: string } = {
  tr: "Bu konuda şu an detaylı bilgi veremiyorum, ancak PTF ve YEKDEM verileri, STR Energy ürünleri, demo talebi ve iletişim konularında yardımcı olabilirim. Lütfen bu konulardan birini sorun veya +90 544 918 70 90 numarasını arayın.",
  en: "I don't have detailed information on that topic right now, but I can help with PTF and YEKDEM data, STR Energy products, demo requests, and contact information. Please ask about one of these topics or call +90 544 918 70 90.",
  ru: "Сейчас у меня нет подробной информации по этой теме, но я могу помочь с PTF, YEKDEM, продуктами STR Energy, демонстрациями и контактами. Задайте вопрос по одной из тем или звоните +90 544 918 70 90.",
};

function findAnswer(question: string, lang: Lang): string {
  const q = question.toLowerCase();
  /* Try to find a matching entry — pick the one with the most keyword matches */
  let bestMatch: KBEntry | null = null;
  let bestScore = 0;
  for (const entry of knowledgeBase) {
    const score = entry.keywords.reduce((s, kw) => s + (q.includes(kw.toLowerCase()) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }
  if (bestMatch && bestScore > 0) {
    return bestMatch.answer[lang] || bestMatch.answer.tr;
  }
  return defaultAnswer[lang] || defaultAnswer.tr;
}

/* ─────────── COMPONENT ─────────── */
const panelMotion = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 18, scale: 0.98 },
  transition: { duration: 0.18, ease: "easeOut" },
};

export default function ChatWidget() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lang = (language === "en" || language === "ru" ? language : "tr") as Lang;

  const suggestions = useMemo(
    () => [
      t("chat.suggestion.ptf"),
      t("chat.suggestion.yekdem"),
      t("chat.suggestion.product"),
    ],
    [t]
  );

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  if (pathname?.match(/\/platform(?:\/|$)/)) return null;

  const sendMessage = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    /* Simulate typing delay for natural feel */
    setTimeout(() => {
      const answer = findAnswer(trimmed, lang);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "w-90 max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border shadow-[0_24px_80px_-40px_rgba(0,0,0,0.8)]",
              isDark
                ? "border-white/10 bg-zinc-950/95"
                : "border-black/10 bg-white/95"
            )}
          >
            <div
              className={cn(
                "relative px-5 pb-4 pt-5",
                isDark
                  ? "bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_55%)]"
                  : "bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.2),transparent_55%)]"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div>
                    <div
                      className={cn(
                        "text-lg font-semibold",
                        isDark ? "text-white" : "text-zinc-900"
                      )}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t("chat.title")}
                    </div>
                    <p className={cn("text-xs", isDark ? "text-zinc-400" : "text-zinc-500")}>
                      {t("chat.subtitle")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-full transition",
                    isDark
                      ? "text-zinc-400 hover:text-white hover:bg-white/10"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-black/5"
                  )}
                  aria-label={t("chat.minimize")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition",
                      isDark
                        ? "border-white/10 text-zinc-300 hover:border-orange-500/40 hover:text-white"
                        : "border-black/10 text-zinc-600 hover:border-orange-500/40 hover:text-zinc-900"
                    )}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={scrollRef}
              className={cn(
                "max-h-85 space-y-3 overflow-y-auto px-5 py-4",
                isDark ? "bg-black" : "bg-white"
              )}
            >
              {messages.length === 0 && (
                <div
                  className={cn(
                    "rounded-2xl border border-dashed px-4 py-3 text-xs",
                    isDark ? "border-white/10 text-zinc-500" : "border-black/10 text-zinc-500"
                  )}
                >
                  {t("chat.empty")}
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-line",
                      message.role === "user"
                        ? isDark
                          ? "bg-orange-500 text-black"
                          : "bg-orange-500 text-white"
                        : isDark
                          ? "bg-white/5 text-zinc-200"
                          : "bg-zinc-100 text-zinc-700"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("chat.loading")}
                </div>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
              className={cn(
                "flex items-center gap-2 border-t px-4 py-3",
                isDark ? "border-white/10" : "border-black/10"
              )}
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t("chat.placeholder")}
                className={cn(
                  "flex-1 rounded-full border px-4 py-2 text-sm outline-none transition",
                  isDark
                    ? "border-white/10 bg-black text-white placeholder:text-zinc-600 focus:border-orange-500/60"
                    : "border-black/10 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-orange-500/60"
                )}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full transition",
                  isDark
                    ? "bg-orange-500 text-black hover:bg-orange-400"
                    : "bg-orange-500 text-white hover:bg-orange-400",
                  isLoading && "opacity-60"
                )}
                aria-label={t("chat.send")}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group flex h-14 w-14 items-center justify-center rounded-2xl border shadow-lg transition",
          isDark
            ? "border-white/10 bg-zinc-950/90 text-white hover:border-orange-500/40"
            : "border-black/10 bg-white text-zinc-900 hover:border-orange-500/40"
        )}
        aria-label={t("chat.open")}
      >
        <div className="relative">
          <span
            className={cn(
              "absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full",
              "bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]"
            )}
          />
          <MessageCircle className="h-6 w-6 transition group-hover:scale-110" />
        </div>
      </button>
    </div>
  );
}

