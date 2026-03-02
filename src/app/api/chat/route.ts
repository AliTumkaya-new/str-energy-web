import { NextResponse, type NextRequest } from "next/server";
import { formatContext, getRelevantChunks } from "@/lib/rag/siteIndex";
import { getLiveEnergyData } from "@/lib/rag/epias";
import { checkRateLimit, isAllowedOrigin, parseChatPayload } from "@/lib/apiSecurity";

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
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const rateLimit = checkRateLimit(request, "chat", 30, 60_000);
    if (rateLimit.limited) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
      );
    }

    const payload = parseChatPayload(await request.json());
    if (!payload) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const { messages, locale } = payload;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("[api/chat] OPENAI_API_KEY is missing");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const lastUserMessage = [...messages].reverse().find((msg) => msg?.role === "user") as ChatMessage | undefined;
    const question = lastUserMessage?.content || "";

    const chunks = getRelevantChunks(question, 6);
    const context = formatContext(chunks);
    const liveData = await getLiveEnergyData(question);

    const systemPrompt = getSystemPrompt(locale || "tr", context, liveData);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);

    let response: Response;
    try {
      response = await fetch("https://api.openai.com/v1/responses", {
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
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      console.error("[api/chat] OpenAI upstream failed", { status: response.status });
      return NextResponse.json({ error: "Upstream service error" }, { status: 502 });
    }

    const data = await response.json();
    const reply = data?.output_text
      || data?.output?.[0]?.content?.[0]?.text
      || "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[api/chat] Unexpected server error", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
