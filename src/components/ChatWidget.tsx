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
  /* ───── STR Energy R&D ───── */
  {
    keywords: ["arge", "ar-ge", "r&d", "research", "yazılım", "software", "veri", "data", "enerji", "energy", "teknoloji", "technology"],
    answer: {
      tr: "STR Energy; enerji verisi, yazılım geliştirme ve uygulamalı Ar-Ge alanlarında çalışır. Gerçek ihtiyacı ve veri kapsamını birlikte tanımlar, ardından ölçülebilir ve geliştirilebilir çözümler üretiriz.",
      en: "STR Energy works across energy data, software development and applied R&D. We define the real need and data scope first, then build measurable and extensible solutions.",
      ru: "STR Energy работает с энергетическими данными, разработкой ПО и прикладными исследованиями. Сначала мы определяем реальную задачу и границы данных, затем создаем измеримые и развиваемые решения.",
    },
  },
  /* ───── STR Energy Company ───── */
  {
    keywords: ["str energy", "şirket", "company", "компания", "hakkında", "about", "kim", "who", "кто"],
    answer: {
      tr: "STR Energy, enerji ve teknoloji alanında üretmek isteyen genç girişimciler tarafından Türkiye’de kurulmuş bir enerji yazılım ve Ar-Ge girişimidir. Piyasa Veri Projesi, veri kaynaklarını ve yöntemini açıkça belgelediğimiz çalışmalarımızdan biridir.",
      en: "STR Energy is an energy software and R&D venture founded in Türkiye by young entrepreneurs working at the intersection of energy and technology. The Market Data Project is one of our openly documented research initiatives.",
      ru: "STR Energy — проект в области энергетического ПО и R&D, основанный в Турции молодыми предпринимателями. Проект рыночных данных — одна из наших открыто документированных исследовательских инициатив.",
    },
  },
  /* ───── Investment / partnerships ───── */
  {
    keywords: ["yatırım", "yatırımcı", "fon", "funding", "investor", "investment", "startup", "girişim", "seed", "partner", "ortaklık", "инвест", "стартап"],
    answer: {
      tr: "STR Energy; enerji, yazılım ve uygulamalı Ar-Ge alanlarında proje ortaklıklarına açıktır. Sanayi kuruluşları, teknoloji ekipleri ve stratejik ortaklar İletişim sayfasından doğrudan ekibimize ulaşabilir.",
      en: "STR Energy is open to project partnerships across energy, software and applied R&D. Industrial organizations, technology teams and strategic partners can contact our team directly.",
      ru: "STR Energy открыта к партнерствам в энергетике, разработке ПО и прикладных исследованиях. Промышленные организации и технологические команды могут связаться с нами напрямую.",
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
      tr: "Bir enerji yazılımı veya Ar-Ge çalışmasını görüşmek için İletişim sayfamızı ziyaret edebilir ya da +90 544 918 70 90 numarasını arayabilirsiniz.",
      en: "To discuss an energy software or R&D project, visit our Contact page or call +90 544 918 70 90.",
      ru: "Чтобы обсудить проект в области энергетического ПО или R&D, посетите страницу контактов или позвоните по номеру +90 544 918 70 90.",
    },
  },
  /* ───── Pricing ───── */
  {
    keywords: ["fiyat", "ücret", "pricing", "cost", "цена", "стоимость", "tarife"],
    answer: {
      tr: "Proje kapsamı; veri, yazılım geliştirme, analiz ve uygulama ihtiyacına göre birlikte belirlenir. Teklif almak için İletişim sayfamızdan bize ulaşabilirsiniz.",
      en: "Project scope is defined around data, software development, analysis and implementation needs. Contact us for a proposal.",
      ru: "Объем проекта определяется задачами по данным, разработке ПО, аналитике и внедрению. Свяжитесь с нами для предложения.",
    },
  },
  /* ───── Merhaba / Greetings ───── */
  {
    keywords: ["merhaba", "hello", "hi", "hey", "selam", "привет", "здравствуй"],
    answer: {
      tr: "Merhaba! 👋 STR Energy Asistanına hoş geldiniz. Piyasa verileri, enerji yazılımı veya Ar-Ge çalışmalarımız hakkında yardımcı olabilirim. Ne sormak istersiniz?",
      en: "Hello! 👋 Welcome to the STR Energy Assistant. I can help with market data, energy software or our R&D work. What would you like to know?",
      ru: "Привет! 👋 Я могу помочь с рыночными данными, энергетическим ПО или нашими R&D-проектами. Что хотите узнать?",
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
  tr: "Bu konuda şu an detaylı bilgi veremiyorum; ancak PTF/YEKDEM verileri, enerji yazılımı, Ar-Ge ve iletişim konularında yardımcı olabilirim.",
  en: "I don't have detailed information on that topic right now, but I can help with PTF/YEKDEM data, energy software, R&D and contact information.",
  ru: "Сейчас у меня нет подробной информации, но я могу помочь с PTF/YEKDEM, энергетическим ПО, R&D и контактами.",
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

export default function ChatWidget({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(initiallyOpen);
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

