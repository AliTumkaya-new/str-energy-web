import type { NextRequest } from "next/server";
import { parseDateRangePayload } from "@/lib/dateRange";

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
const TRUST_PROXY_HEADERS =
  process.env.TRUST_PROXY_HEADERS === "true" ||
  (process.env.TRUST_PROXY_HEADERS !== "false" &&
    (process.env.VERCEL === "1" || process.env.NODE_ENV === "production"));
const RATE_LIMIT_CLEANUP_INTERVAL = 200;
let rateLimitCallCount = 0;

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

function normalizeIp(raw: string | null): string | null {
  if (!raw) return null;
  const first = raw.split(",")[0]?.trim();
  if (!first) return null;
  return first.toLowerCase();
}

function getClientIp(request: NextRequest): string {
  if (TRUST_PROXY_HEADERS) {
    const vercelIp = normalizeIp(request.headers.get("x-vercel-forwarded-for"));
    if (vercelIp) return vercelIp;

    const cfIp = normalizeIp(request.headers.get("cf-connecting-ip"));
    if (cfIp) return cfIp;

    const realIp = normalizeIp(request.headers.get("x-real-ip"));
    if (realIp) return realIp;

    const forwarded = normalizeIp(request.headers.get("x-forwarded-for"));
    if (forwarded) return forwarded;
  }

  return "direct-client";
}

function cleanupExpiredRateBuckets(now: number): void {
  for (const [key, bucket] of rateBuckets.entries()) {
    if (bucket.resetAt <= now) rateBuckets.delete(key);
  }
}

export function isAllowedOrigin(request: NextRequest): boolean {
  const originHeader = request.headers.get("origin");
  if (!originHeader) {
    const secFetchSite = request.headers.get("sec-fetch-site");
    if (!secFetchSite) return true;
    return secFetchSite === "same-origin" || secFetchSite === "none";
  }

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
  rateLimitCallCount += 1;
  if (rateLimitCallCount % RATE_LIMIT_CLEANUP_INTERVAL === 0) {
    cleanupExpiredRateBuckets(now);
  }

  const clientIp = getClientIp(request);
  const key = `${scope}:${clientIp}`;
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

export { parseDateRangePayload };
