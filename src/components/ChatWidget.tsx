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
      tr: "PTF (Piyasa Takas Fiyatı), Türkiye'nin saatlik toptan elektrik fiyatıdır ve EPİAŞ gün öncesi piyasasında belirlenir. Güncel PTF verilerini bağımsız Piyasa Veri Projesi sayfasından görüntüleyebilirsiniz; bu çalışma endüstriyel platform ürününden ayrıdır.",
      en: "PTF (Market Clearing Price) is Turkey's hourly wholesale electricity price, determined by EPİAŞ in the day-ahead market. You can view current PTF data in the independent Market Data Project, which is separate from the industrial platform product.",
      ru: "PTF — часовая оптовая цена электроэнергии в Турции. Данные доступны в независимом проекте рыночных данных, отдельном от промышленной платформы.",
    },
  },
  /* ───── YEKDEM ───── */
  {
    keywords: ["yekdem", "yenilenebilir", "renewable", "возобновляем", "üretim", "generation", "генерация"],
    answer: {
      tr: "YEKDEM (Yenilenebilir Enerji Kaynaklarını Destekleme Mekanizması) Türkiye'nin yenilenebilir enerji üreticilerine sağladığı teşvik sistemidir. YEKDEM birim maliyet verileri bağımsız Piyasa Veri Projesi kapsamında takip edilebilir.",
      en: "YEKDEM is Turkey's Renewable Energy Support Mechanism. YEKDEM unit cost data can be explored within the independent Market Data Project.",
      ru: "YEKDEM — это Механизм поддержки возобновляемых источников энергии Турции, включающий солнечную, ветровую, гидро- и геотермальную энергию. Данные о стоимости YEKDEM доступны на нашей панели.",
    },
  },
  /* ───── STR Energy Intelligence Platform ───── */
  {
    keywords: ["intelligence", "platform", "energyos", "energycloud", "powerforecast", "gridanalytics", "securegrid", "smartmeter", "modbus", "rs485", "anomali", "anomaly", "tahmin", "forecast", "dijital ikiz", "digital twin", "iso 50001", "üretim fark", "production gap", "kök neden", "root cause"],
    answer: {
      tr: "STR Energy Intelligence Platform; RS485 / Modbus üzerinden enerji analizörleri ve saha ekipmanlarına bağlanan tek ürünümüzdür. Gerçek zamanlı izleme, AI anomali tespiti, tüketim ve üretim tahmini, beklenen–gerçekleşen performans farkı, kök neden açıklaması, maliyet ve karbon etkisi, ISO 50001 raporlaması ve ekipman bazlı dijital ikiz analizi sunar.",
      en: "STR Energy Intelligence Platform is our single product, connecting to energy analyzers and field equipment over RS485 / Modbus. It provides real-time monitoring, AI anomaly detection, consumption and production forecasts, expected-versus-actual performance gaps, root-cause explanations, cost and carbon impact, ISO 50001 reporting and equipment-level digital twin analytics.",
      ru: "STR Energy Intelligence Platform — наш единый продукт, подключающийся к анализаторам энергии и полевому оборудованию по RS485 / Modbus. Он включает мониторинг, ИИ-аномалии, прогнозы, сравнение ожидаемого и фактического, объяснение причин, затраты, углерод, ISO 50001 и цифровые двойники.",
    },
  },
  /* ───── STR Energy Company ───── */
  {
    keywords: ["str energy", "şirket", "company", "компания", "hakkında", "about", "kim", "who", "кто"],
    answer: {
      tr: "STR, Smart Technologies for Renewables'ın kısaltmasıdır. STR Energy; ürün geliştirme ve pilot doğrulama aşamasındaki erken aşama bir enerji teknolojileri girişimidir. Tek ticari ürünü saha ekipmanlarına bağlanan STR Energy Intelligence Platform'dur; Piyasa Veri Projesi ise bağımsız bir Ar-Ge çalışmasıdır.",
      en: "STR stands for Smart Technologies for Renewables. STR Energy is an early-stage energy technology startup in product development and pilot validation. Its single commercial product is STR Energy Intelligence Platform; the Market Data Project is a separate R&D initiative.",
      ru: "STR означает Smart Technologies for Renewables. STR Energy — энергетический стартап ранней стадии на этапе разработки продукта и пилотной проверки. Его единственный коммерческий продукт — STR Energy Intelligence Platform; проект рыночных данных является отдельной R&D-инициативой.",
    },
  },
  /* ───── Investment / partnerships ───── */
  {
    keywords: ["yatırım", "yatırımcı", "fon", "funding", "investor", "investment", "startup", "girişim", "seed", "partner", "ortaklık", "инвест", "стартап"],
    answer: {
      tr: "Evet. STR Energy ürün geliştirme ve pilot doğrulama aşamasındaki erken aşama bir enerji girişimidir. Erken aşama yatırımcılar, pilot tesis sağlayabilecek sanayi kuruluşları ve stratejik teknoloji ortaklarıyla görüşmeye açığız. Ayrıntılar için Yatırımcılar sayfasını inceleyebilir veya İletişim sayfasından doğrudan ulaşabilirsiniz.",
      en: "Yes. STR Energy is an early-stage energy startup in product development and pilot validation. We are open to conversations with early-stage investors, industrial organizations able to host pilots and strategic technology partners. See the Investors page or contact us directly.",
      ru: "Да. STR Energy — энергетический стартап ранней стадии на этапе разработки продукта и пилотной проверки. Мы открыты к диалогу с ранними инвесторами, промышленными пилотными площадками и стратегическими технологическими партнерами.",
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
      tr: "Canlı piyasa verilerine ayrı Piyasa Veri Projesi sayfasından ulaşabilirsiniz. PTF, YEKDEM birim maliyet, gerçek zamanlı üretim, yük tahmin planı ve GİP ağırlıklı ortalama verileri EPİAŞ API üzerinden sorgulanır. Bu proje STR Energy Intelligence Platform'un modülü değildir.",
      en: "Access live market data on the separate Market Data Project page. PTF, YEKDEM unit cost, real-time generation, load estimation and weighted average price data are queried through the EPİAŞ API. This project is not a module of STR Energy Intelligence Platform.",
      ru: "Данные доступны на отдельной странице проекта рыночных данных. Этот проект не является модулем STR Energy Intelligence Platform.",
    },
  },
  /* ───── Demo ───── */
  {
    keywords: ["demo", "deneme", "trial", "демо"],
    answer: {
      tr: "STR Energy Intelligence Platform demosunu talep etmek için İletişim sayfamızı ziyaret edebilir veya +90 544 918 70 90 numarasını arayabilirsiniz.",
      en: "To request a demo of STR Energy Intelligence Platform, visit our Contact page or call +90 544 918 70 90.",
      ru: "Для бесплатной демо-версии посетите страницу Контакты или позвоните по номеру +90 544 918 70 90.",
    },
  },
  /* ───── Pricing ───── */
  {
    keywords: ["fiyat", "ücret", "pricing", "cost", "цена", "стоимость", "tarife"],
    answer: {
      tr: "Platform fiyatlandırması; bağlanacak cihaz, veri noktası, tesis ve devreye alma kapsamına göre belirlenir. Teklif almak için İletişim sayfamızdan bize ulaşabilirsiniz.",
      en: "Platform pricing depends on connected devices, data points, facilities and commissioning scope. Contact us for a proposal.",
      ru: "Цена платформы зависит от количества устройств, точек данных, объектов и объема внедрения. Свяжитесь с нами для предложения.",
    },
  },
  /* ───── Merhaba / Greetings ───── */
  {
    keywords: ["merhaba", "hello", "hi", "hey", "selam", "привет", "здравствуй"],
    answer: {
      tr: "Merhaba! 👋 STR Energy Asistanına hoş geldiniz. Piyasa verileri veya STR Energy Intelligence Platform hakkında yardımcı olabilirim. Ne sormak istersiniz?",
      en: "Hello! 👋 Welcome to the STR Energy Assistant. I can help with market data or STR Energy Intelligence Platform. What would you like to know?",
      ru: "Привет! 👋 Я могу помочь с рыночными данными или STR Energy Intelligence Platform. Что хотите узнать?",
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
  tr: "Bu konuda şu an detaylı bilgi veremiyorum; ancak PTF/YEKDEM verileri, STR Energy Intelligence Platform, demo ve iletişim konularında yardımcı olabilirim.",
  en: "I don't have detailed information on that topic right now, but I can help with PTF/YEKDEM data, STR Energy Intelligence Platform, demos and contact information.",
  ru: "Сейчас у меня нет подробной информации, но я могу помочь с PTF/YEKDEM, STR Energy Intelligence Platform, демо и контактами.",
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

