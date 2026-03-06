import { NextResponse, type NextRequest } from "next/server";
import { getTgt } from "@/lib/epiasAuth";
import { checkRateLimit, isAllowedOrigin, parseDateRangePayload } from "@/lib/apiSecurity";
import { fetchWithRetry } from "@/lib/fetchWithRetry";

export const runtime = "nodejs";

const DEFAULT_ENDPOINT = "https://seffaflik.epias.com.tr/electricity-service/v1/consumption/data/load-estimation-plan";

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const rateLimit = checkRateLimit(request, "energy", 60, 60_000);
    if (rateLimit.limited) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
      );
    }

    const rawBody = await request.json();
    const payload = parseDateRangePayload(rawBody, 31);
    if (!payload) {
      return NextResponse.json({ error: "Invalid date range payload", _received: rawBody }, { status: 400 });
    }

    const tgt = await getTgt();
    const endpoint = process.env.EPIAS_LOAD_ESTIMATION_PLAN_URL || DEFAULT_ENDPOINT;

    const response = await fetchWithRetry(
      endpoint,
      {
        method: "POST",
        headers: { TGT: tgt, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      },
      { timeoutMs: 12_000, attempts: 2, retryDelayMs: 350 }
    );

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error("[api/energy/load-estimation-plan] EPIAS upstream failed", { status: response.status, body: errorBody.slice(0, 500) });
      if (response.status === 400 && /mevcut de\u011fil|not available|SEF1124/i.test(errorBody)) {
        return NextResponse.json({ items: [], notice: "Y\u00fck tahmin plan\u0131 verileri hen\u00fcz yay\u0131nlanmad\u0131." });
      }
      return NextResponse.json({ error: "Upstream service error" }, { status: 502 });
    }

    const data = await response.json();
    const items = Array.isArray(data?.items) ? data.items : [];
    return NextResponse.json({
      items,
      notice: items.length === 0 ? "Seçilen tarih aralığında yük tahmin planı verisi bulunamadı." : undefined,
    });
  } catch (error) {
    console.error("[api/energy/load-estimation-plan] Unexpected server error", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
