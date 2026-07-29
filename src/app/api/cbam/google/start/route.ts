import crypto from "node:crypto";
import { NextResponse } from "next/server";

import { clearCbamOAuthStateCookie, setCbamOAuthStateCookie } from "@/lib/cbamProductSession";

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

function safeReturnTo(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/platform/cbam";

  try {
    const url = new URL(value, "https://str.energy");
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/platform/cbam";
  }
}

function redirectBack(request: Request, returnTo: string, error: string) {
  const target = new URL(returnTo, request.url);
  target.searchParams.set("authError", error);
  const response = NextResponse.redirect(target);
  clearCbamOAuthStateCookie(response);
  return response;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const returnTo = safeReturnTo(requestUrl.searchParams.get("returnTo"));
  const config = googleConfig(request);

  if (!config.clientId || !config.clientSecret) {
    return redirectBack(request, returnTo, "google_config");
  }

  const state = crypto.randomBytes(24).toString("base64url");
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", config.clientId);
  authUrl.searchParams.set("redirect_uri", config.redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("prompt", "select_account");
  authUrl.searchParams.set("include_granted_scopes", "true");

  const response = NextResponse.redirect(authUrl);
  setCbamOAuthStateCookie(response, {
    state,
    returnTo,
    createdAt: new Date().toISOString(),
  });
  return response;
}
