import crypto from "node:crypto";
import type { NextResponse } from "next/server";

export const CBAM_SESSION_COOKIE = "str_cbam_product_session";
export const CBAM_USAGE_COOKIE = "str_cbam_product_usage";
export const CBAM_OAUTH_STATE_COOKIE = "str_cbam_google_oauth_state";
export const CBAM_FREE_ANALYSIS_LIMIT = 3;

export type CbamProductSession = {
  email: string;
  name: string;
  provider: "email" | "google";
  createdAt: string;
};

export type CbamUsageState = {
  email: string;
  used: number;
  limit: number;
};

export type CbamOAuthState = {
  state: string;
  returnTo: string;
  createdAt: string;
};

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

function secret() {
  return process.env.CBAM_SESSION_SECRET ?? "str-cbam-local-product-secret";
}

function base64url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function unbase64url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

function encodeSigned(data: unknown) {
  const payload = base64url(JSON.stringify(data));
  return `${payload}.${sign(payload)}`;
}

function decodeSigned<T>(value: string | undefined): T | null {
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature || sign(payload) !== signature) return null;

  try {
    return JSON.parse(unbase64url(payload)) as T;
  } catch {
    return null;
  }
}

function cookieValue(request: Request, name: string) {
  const cookie = request.headers.get("cookie") ?? "";
  return cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export function readCbamSession(request: Request) {
  const session = decodeSigned<CbamProductSession>(cookieValue(request, CBAM_SESSION_COOKIE));
  if (!session?.email) return null;
  return session;
}

export function readCbamUsage(request: Request, email: string): CbamUsageState {
  const usage = decodeSigned<CbamUsageState>(cookieValue(request, CBAM_USAGE_COOKIE));
  if (!usage || usage.email !== email) return { email, used: 0, limit: CBAM_FREE_ANALYSIS_LIMIT };
  return {
    email,
    used: Math.max(0, usage.used),
    limit: Math.max(1, usage.limit || CBAM_FREE_ANALYSIS_LIMIT),
  };
}

export function readCbamOAuthState(request: Request) {
  return decodeSigned<CbamOAuthState>(cookieValue(request, CBAM_OAUTH_STATE_COOKIE));
}

export function publicEntitlement(usage: CbamUsageState) {
  const remaining = Math.max(0, usage.limit - usage.used);
  return {
    plan: "free" as const,
    limit: usage.limit,
    used: usage.used,
    remaining,
    upgradeRequired: remaining <= 0,
  };
}

export function setCbamSessionCookie(response: NextResponse, session: CbamProductSession, remember: boolean) {
  response.cookies.set(CBAM_SESSION_COOKIE, encodeSigned(session), cookieOptions(remember ? 60 * 60 * 24 * 30 : 60 * 60 * 8));
}

export function setCbamUsageCookie(response: NextResponse, usage: CbamUsageState) {
  response.cookies.set(CBAM_USAGE_COOKIE, encodeSigned(usage), cookieOptions(60 * 60 * 24 * 365));
}

export function setCbamOAuthStateCookie(response: NextResponse, state: CbamOAuthState) {
  response.cookies.set(CBAM_OAUTH_STATE_COOKIE, encodeSigned(state), cookieOptions(60 * 10));
}

export function clearCbamOAuthStateCookie(response: NextResponse) {
  response.cookies.set(CBAM_OAUTH_STATE_COOKIE, "", cookieOptions(0));
}

export function clearCbamProductCookies(response: NextResponse) {
  response.cookies.set(CBAM_SESSION_COOKIE, "", cookieOptions(0));
  response.cookies.set(CBAM_USAGE_COOKIE, "", cookieOptions(0));
  response.cookies.set(CBAM_OAUTH_STATE_COOKIE, "", cookieOptions(0));
  response.cookies.set("str_cbam_session", "", cookieOptions(0));
}
