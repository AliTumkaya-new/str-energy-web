import { NextResponse, type NextRequest } from "next/server";
import { fetchElectricityPrices } from "@/lib/eiaApi";
import { checkRateLimit, isAllowedOrigin } from "@/lib/apiSecurity";

export const runtime = "nodejs";

function extractParams(body: unknown): { startMonth: string; endMonth: string; sector: string } | null {
  if (!body || typeof body !== "object") return null;
  const rec = body as Record<string, unknown>;
  const rawStart = typeof rec.startMonth === "string" ? rec.startMonth : null;
  const rawEnd = typeof rec.endMonth === "string" ? rec.endMonth : null;
  if (!rawStart || !rawEnd) return null;
  // Accept YYYY-MM format
  const monthRe = /(\d{4}-\d{2})/;
  const s = rawStart.match(monthRe);
  const e = rawEnd.match(monthRe);
  if (!s || !e) return null;
  const sector = typeof rec.sector === "string" ? rec.sector.toUpperCase() : "ALL";
  return { startMonth: s[1], endMonth: e[1], sector };
}

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }
    const rateLimit = checkRateLimit(request, "eia", 30, 60_000);
    if (rateLimit.limited) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } });
    }

    const rawBody = await request.json();
    const params = extractParams(rawBody);
    if (!params) {
      return NextResponse.json({ error: "Invalid payload. Required: startMonth (YYYY-MM), endMonth (YYYY-MM)" }, { status: 400 });
    }

    const result = await fetchElectricityPrices(params.startMonth, params.endMonth, params.sector);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/eia/prices]", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
