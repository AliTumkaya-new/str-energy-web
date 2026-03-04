import type { NextRequest } from "next/server";

type RateBucket = {
  count: number;
  resetAt: number;
};

type ChatRole = "user" | "assistant" | "system";

export type SanitizedChatPayload = {
  messages: Array<{ role: ChatRole; content: string }>;
  locale: "tr" | "en" | "ru";
};

const rateBuckets = new Map<string, RateBucket>();
const DEFAULT_ALLOWED_ORIGINS = [
  "https://str.energy",
  "https://www.str.energy",
  "https://str-energy.com",
  "https://www.str-energy.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function getAllowedOrigins(): Set<string> {
  const raw = process.env.ALLOWED_ORIGINS;
  const fromEnv = raw
    ? raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
    : [];

  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...fromEnv]);
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

export function isAllowedOrigin(request: NextRequest): boolean {
  const originHeader = request.headers.get("origin");
  if (!originHeader) return true;

  try {
    const origin = new URL(originHeader).origin;
    const requestOrigin = request.nextUrl.origin;
    if (origin === requestOrigin) return true;
    return getAllowedOrigins().has(origin);
  } catch {
    return false;
  }
}

export function checkRateLimit(
  request: NextRequest,
  scope: string,
  limit: number,
  windowMs = 60_000
): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const key = `${scope}:${getClientIp(request)}`;
  const existing = rateBuckets.get(key);

  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    const retryAfterMs = Math.max(existing.resetAt - now, 0);
    return { limited: true, retryAfter: Math.ceil(retryAfterMs / 1000) };
  }

  existing.count += 1;
  rateBuckets.set(key, existing);
  return { limited: false, retryAfter: 0 };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isIsoDateTime(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+\-]\d{2}:\d{2})$/.test(value);
}

export function parseDateRangePayload(
  payload: unknown,
  maxDays = 31
): { startDate: string; endDate: string } | null {
  if (!isRecord(payload)) {
    console.error("[parseDateRangePayload] Not a record:", typeof payload);
    return null;
  }
  const startDate = payload.startDate;
  const endDate = payload.endDate;
  if (typeof startDate !== "string" || typeof endDate !== "string") {
    console.error("[parseDateRangePayload] Fields not strings:", { startDate: typeof startDate, endDate: typeof endDate });
    return null;
  }
  if (!isIsoDateTime(startDate) || !isIsoDateTime(endDate)) {
    console.error("[parseDateRangePayload] ISO check failed:", { startDate, endDate, startOk: isIsoDateTime(startDate), endOk: isIsoDateTime(endDate) });
    return null;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    console.error("[parseDateRangePayload] Invalid Date objects");
    return null;
  }
  if (end < start) {
    console.error("[parseDateRangePayload] end < start");
    return null;
  }

  const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays > maxDays) {
    console.error("[parseDateRangePayload] diffDays exceeds maxDays:", { diffDays, maxDays });
    return null;
  }

  return { startDate, endDate };
}

function isChatRole(value: unknown): value is ChatRole {
  return value === "user" || value === "assistant" || value === "system";
}

export function parseChatPayload(payload: unknown): SanitizedChatPayload | null {
  if (!isRecord(payload)) return null;
  if (!Array.isArray(payload.messages)) return null;
  if (payload.messages.length === 0 || payload.messages.length > 20) return null;

  const sanitizedMessages: Array<{ role: ChatRole; content: string }> = [];
  for (const message of payload.messages) {
    if (!isRecord(message)) return null;
    if (!isChatRole(message.role)) return null;
    if (typeof message.content !== "string") return null;

    const content = message.content.trim();
    if (!content || content.length > 2000) return null;
    sanitizedMessages.push({ role: message.role, content });
  }

  const locale = payload.locale;
  const safeLocale = locale === "en" || locale === "ru" || locale === "tr" ? locale : "tr";

  return { messages: sanitizedMessages, locale: safeLocale };
}
