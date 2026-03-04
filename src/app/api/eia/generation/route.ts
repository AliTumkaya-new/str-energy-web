import { NextResponse, type NextRequest } from "next/server";
import { fetchElectricityGeneration } from "@/lib/eiaApi";
import { checkRateLimit, isAllowedOrigin } from "@/lib/apiSecurity";

export const runtime = "nodejs";

function extractParams(body: unknown): { country: string; startYear: string; endYear: string } | null {
  if (!body || typeof body !== "object") return null;
  const rec = body as Record<string, unknown>;
  const country = typeof rec.country === "string" ? rec.country.toUpperCase() : null;
  const rawStart = typeof rec.startYear === "string" ? rec.startYear : null;
  const rawEnd = typeof rec.endYear === "string" ? rec.endYear : null;
  if (!country || !rawStart || !rawEnd) return null;
  const yearRe = /(\d{4})/;
  const s = rawStart.match(yearRe);
  const e = rawEnd.match(yearRe);
  if (!s || !e) return null;
  return { country, startYear: s[1], endYear: e[1] };
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
      return NextResponse.json({ error: "Invalid payload. Required: country, startYear, endYear" }, { status: 400 });
    }

    const result = await fetchElectricityGeneration(params.country, params.startYear, params.endYear);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/eia/generation]", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
