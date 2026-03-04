import { NextResponse, type NextRequest } from "next/server";
import { fetchDayAheadPrices } from "@/lib/entsoeApi";
import { checkRateLimit, isAllowedOrigin } from "@/lib/apiSecurity";

export const runtime = "nodejs";

function extractParams(body: unknown): { country: string; startDate: string; endDate: string } | null {
  if (!body || typeof body !== "object") return null;
  const rec = body as Record<string, unknown>;
  const country = typeof rec.country === "string" ? rec.country.toUpperCase() : null;
  const rawStart = typeof rec.startDate === "string" ? rec.startDate : null;
  const rawEnd = typeof rec.endDate === "string" ? rec.endDate : null;
  if (!country || !rawStart || !rawEnd) return null;
  const dateRe = /(\d{4}-\d{2}-\d{2})/;
  const s = rawStart.match(dateRe);
  const e = rawEnd.match(dateRe);
  if (!s || !e) return null;
  return { country, startDate: s[1], endDate: e[1] };
}

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }
    const rateLimit = checkRateLimit(request, "entsoe", 30, 60_000);
    if (rateLimit.limited) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } });
    }

    const rawBody = await request.json();
    const params = extractParams(rawBody);
    if (!params) {
      return NextResponse.json({ error: "Invalid payload. Required: country, startDate, endDate" }, { status: 400 });
    }

    const result = await fetchDayAheadPrices(params.country, params.startDate, params.endDate);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/entsoe/day-ahead-prices]", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
