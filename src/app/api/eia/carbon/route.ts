import { NextResponse, type NextRequest } from "next/server";
import { fetchCarbonIntensity } from "@/lib/eiaApi";
import { checkRateLimit, isAllowedOrigin } from "@/lib/apiSecurity";
import { parseCountryYearParams } from "@/lib/eiaValidation";

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
    const params = parseCountryYearParams(rawBody);
    if (!params) {
      return NextResponse.json(
        { error: "Invalid payload. Required: country (ISO-3), startYear (YYYY), endYear (YYYY)" },
        { status: 400 }
      );
    }

    const result = await fetchCarbonIntensity(params.country, params.startYear, params.endYear);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/eia/carbon]", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
