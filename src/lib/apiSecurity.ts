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

function normalizeDateTimeInput(value: string, boundary: "start" | "end"): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return boundary === "start"
      ? `${trimmed}T00:00:00+03:00`
      : `${trimmed}T23:59:59+03:00`;
  }

  let candidate = trimmed
    .replace(" ", "T")
    .replace(/([+\-]\d{2})(\d{2})$/, "$1:$2");

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(candidate)) {
    candidate = `${candidate}:00+03:00`;
  } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?$/.test(candidate)) {
    candidate = `${candidate}+03:00`;
  } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?:Z|[+\-]\d{2}:\d{2})$/.test(candidate)) {
    const timezone = candidate.slice(-1) === "Z" ? "Z" : candidate.slice(-6);
    candidate = `${candidate.slice(0, -timezone.length)}:00${timezone}`;
  }

  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+\-]\d{2}:\d{2})$/.test(candidate)) {
    const parsed = new Date(trimmed);
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }

    const targetOffsetMinutes = 180;
    const shiftedMs = parsed.getTime() + targetOffsetMinutes * 60 * 1000;
    const shifted = new Date(shiftedMs);
    const year = shifted.getUTCFullYear();
    const month = String(shifted.getUTCMonth() + 1).padStart(2, "0");
    const day = String(shifted.getUTCDate()).padStart(2, "0");
    const hour = String(shifted.getUTCHours()).padStart(2, "0");
    const minute = String(shifted.getUTCMinutes()).padStart(2, "0");
    const second = String(shifted.getUTCSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}:${second}+03:00`;
  }

  return candidate;
}

export function parseDateRangePayload(
  payload: unknown,
  maxDays = 31
): { startDate: string; endDate: string } | null {
  if (!isRecord(payload)) {
    console.error("[parseDateRangePayload] Not a record:", typeof payload);
    return null;
  }
  const rawStartDate = payload.startDate;
  const rawEndDate = payload.endDate;
  if (typeof rawStartDate !== "string" || typeof rawEndDate !== "string") {
    console.error("[parseDateRangePayload] Fields not strings:", { startDate: typeof rawStartDate, endDate: typeof rawEndDate });
    return null;
  }

  const startDate = normalizeDateTimeInput(rawStartDate, "start");
  const endDate = normalizeDateTimeInput(rawEndDate, "end");
  if (!startDate || !endDate) {
    console.error("[parseDateRangePayload] Date normalization failed:", {
      startDate: rawStartDate,
      endDate: rawEndDate,
    });
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
