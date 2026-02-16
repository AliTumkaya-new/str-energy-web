import { NextResponse, type NextRequest } from "next/server";
import { formatContext, getRelevantChunks } from "@/lib/rag/siteIndex";
import { getLiveEnergyData } from "@/lib/rag/epias";

export const runtime = "nodejs";

const LANGUAGE_LABELS: Record<string, string> = {
  tr: "Turkish",
  en: "English",
  ru: "Russian",
};

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

function getSystemPrompt(locale: string, context: string, liveData: unknown) {
  const language = LANGUAGE_LABELS[locale] || "Turkish";
  const contextBlock = context
    ? `SITE_CONTEXT:\n${context}`
    : "SITE_CONTEXT: (empty)";
  const liveBlock = liveData ? `LIVE_DATA:\n${JSON.stringify(liveData)}` : "LIVE_DATA: (empty)";

  return [
    "You are STR Energy's web assistant.",
    `Respond in ${language}.`,
    "Use SITE_CONTEXT for product and company questions.",
    "Use LIVE_DATA for PTF/YEKDEM questions when present.",
    "If the answer is not in the context or live data, say you don't have that data and suggest how to obtain it.",
    "Keep answers concise, structured, and professional.",
    contextBlock,
    liveBlock,
  ].join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const { messages, locale } = await request.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY is missing" }, { status: 500 });
    }

    const lastUserMessage = [...messages].reverse().find((msg) => msg?.role === "user") as ChatMessage | undefined;
    const question = lastUserMessage?.content || "";

    const chunks = getRelevantChunks(question, 6);
    const context = formatContext(chunks);
    const liveData = await getLiveEnergyData(question);

    const systemPrompt = getSystemPrompt(locale || "tr", context, liveData);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText || "OpenAI request failed" }, { status: 502 });
    }

    const data = await response.json();
    const reply = data?.output_text
      || data?.output?.[0]?.content?.[0]?.text
      || "";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
