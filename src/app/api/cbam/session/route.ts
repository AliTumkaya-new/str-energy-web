import { NextResponse } from "next/server";

import {
  clearCbamProductCookies,
  publicEntitlement,
  readCbamSession,
  readCbamUsage,
  setCbamSessionCookie,
  setCbamUsageCookie,
  type CbamProductSession,
} from "@/lib/cbamProductSession";

function displayName(email: string) {
  const name = email.split("@")[0]?.replace(/[._-]+/g, " ").trim();
  return name ? name.replace(/\b\w/g, (letter) => letter.toLocaleUpperCase("tr-TR")) : "STR Kullanıcı";
}

function normalizeEmail(email: unknown) {
  return String(email ?? "").trim().toLowerCase();
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(request: Request) {
  const session = readCbamSession(request);
  if (!session) return NextResponse.json({ authenticated: false, entitlement: null });

  const usage = readCbamUsage(request, session.email);
  return NextResponse.json({
    authenticated: true,
    user: {
      name: session.name,
      email: session.email,
      provider: session.provider,
      organisation: "STR CBAM Export",
    },
    entitlement: publicEntitlement(usage),
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; provider?: "email" | "google"; remember?: boolean; name?: string }
    | null;

  if (body?.provider === "google") {
    return NextResponse.json({ error: "Google girişi OAuth yönlendirmesi üzerinden başlatılmalıdır." }, { status: 400 });
  }

  const provider = "email";
  const email = normalizeEmail(body?.email);

  if (!validEmail(email)) {
    return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 });
  }

  const session: CbamProductSession = {
    email,
    name: body?.name?.trim() || displayName(email),
    provider,
    createdAt: new Date().toISOString(),
  };
  const usage = readCbamUsage(request, email);
  const response = NextResponse.json({
    authenticated: true,
    user: {
      name: session.name,
      email: session.email,
      provider: session.provider,
      organisation: "STR CBAM Export",
    },
    entitlement: publicEntitlement(usage),
  });

  setCbamSessionCookie(response, session, body?.remember ?? true);
  setCbamUsageCookie(response, usage);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  clearCbamProductCookies(response);
  return response;
}
