import { NextResponse } from "next/server";

import {
  clearCbamOAuthStateCookie,
  readCbamOAuthState,
  readCbamUsage,
  setCbamSessionCookie,
  setCbamUsageCookie,
  type CbamProductSession,
} from "@/lib/cbamProductSession";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleProfile = {
  email?: string;
  email_verified?: boolean;
  name?: string;
};

function googleConfig(request: Request) {
  const origin = new URL(request.url).origin;
  return {
    clientId: process.env.CBAM_GOOGLE_CLIENT_ID ?? process.env.GOOGLE_CLIENT_ID ?? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.CBAM_GOOGLE_CLIENT_SECRET ?? process.env.GOOGLE_CLIENT_SECRET ?? "",
    redirectUri:
      process.env.CBAM_GOOGLE_REDIRECT_URI ??
      process.env.GOOGLE_REDIRECT_URI ??
      `${origin}/api/cbam/google/callback`,
  };
}

function safeReturnTo(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/platform/cbam";

  try {
    const url = new URL(value, "https://str.energy");
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/platform/cbam";
  }
}

function displayName(email: string) {
  const name = email.split("@")[0]?.replace(/[._-]+/g, " ").trim();
  return name ? name.replace(/\b\w/g, (letter) => letter.toLocaleUpperCase("tr-TR")) : "STR Kullanıcı";
}

function redirectBack(request: Request, returnTo: string, error?: string) {
  const target = new URL(safeReturnTo(returnTo), request.url);
  target.searchParams.delete("authError");
  if (error) target.searchParams.set("authError", error);

  const response = NextResponse.redirect(target);
  clearCbamOAuthStateCookie(response);
  return response;
}

async function exchangeCodeForToken(request: Request, code: string) {
  const config = googleConfig(request);
  if (!config.clientId || !config.clientSecret) throw new Error("google_config");

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUri,
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => ({}))) as GoogleTokenResponse;

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error || "google_token");
  }

  return payload.access_token;
}

async function fetchGoogleProfile(accessToken: string): Promise<GoogleProfile & { email: string }> {
  const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const profile = (await response.json().catch(() => ({}))) as GoogleProfile;

  if (!response.ok || !profile.email || profile.email_verified === false) {
    throw new Error("google_profile");
  }

  return { ...profile, email: profile.email };
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const oauthState = readCbamOAuthState(request);
  const returnTo = safeReturnTo(oauthState?.returnTo);

  if (requestUrl.searchParams.get("error")) {
    return redirectBack(request, returnTo, "google_cancelled");
  }

  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const stateAge = oauthState?.createdAt ? Date.now() - Date.parse(oauthState.createdAt) : Number.POSITIVE_INFINITY;

  if (!code || !state || !oauthState || oauthState.state !== state || stateAge > 10 * 60 * 1000) {
    return redirectBack(request, returnTo, "google_state");
  }

  try {
    const accessToken = await exchangeCodeForToken(request, code);
    const profile = await fetchGoogleProfile(accessToken);
    const email = profile.email.toLowerCase();
    const session: CbamProductSession = {
      email,
      name: profile.name?.trim() || displayName(email),
      provider: "google",
      createdAt: new Date().toISOString(),
    };
    const usage = readCbamUsage(request, email);
    const response = redirectBack(request, returnTo);

    setCbamSessionCookie(response, session, true);
    setCbamUsageCookie(response, usage);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "google_config") return redirectBack(request, returnTo, "google_config");
    if (message === "google_profile") return redirectBack(request, returnTo, "google_profile");
    return redirectBack(request, returnTo, "google_token");
  }
}
