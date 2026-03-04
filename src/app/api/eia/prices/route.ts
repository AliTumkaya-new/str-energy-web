import { NextResponse, type NextRequest } from "next/server";
import { fetchElectricityPrices } from "@/lib/eiaApi";
import { checkRateLimit, isAllowedOrigin } from "@/lib/apiSecurity";
import { parsePriceParams } from "@/lib/eiaValidation";

export const runtime = "nodejs";

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
    const params = parsePriceParams(rawBody);
    if (!params) {
      return NextResponse.json(
        { error: "Invalid payload. Required: startMonth (YYYY-MM), endMonth (YYYY-MM), sector (ALL|RES|COM|IND)" },
        { status: 400 }
      );
    }

    const result = await fetchElectricityPrices(params.startMonth, params.endMonth, params.sector);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/eia/prices]", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
