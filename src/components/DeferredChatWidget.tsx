"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
});

export default function DeferredChatWidget() {
  const [requested, setRequested] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();

  if (requested) return <ChatWidget initiallyOpen />;

  return (
    <button
      type="button"
      onClick={() => setRequested(true)}
      className={`fixed bottom-4 right-4 z-50 grid h-14 w-14 place-items-center rounded-2xl border shadow-lg transition hover:-translate-y-0.5 ${
        theme === "dark" ? "border-white/10 bg-zinc-950 text-white" : "border-black/10 bg-white text-zinc-900"
      }`}
      aria-label={t("chat.open")}
    >
      <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-orange-500" />
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
