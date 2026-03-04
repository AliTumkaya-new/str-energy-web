import { NextResponse, type NextRequest } from "next/server";
import { getTgt } from "@/lib/epiasAuth";
import { checkRateLimit, isAllowedOrigin } from "@/lib/apiSecurity";

export const runtime = "nodejs";

const DEFAULT_ENDPOINT = "https://seffaflik.epias.com.tr/electricity-service/v1/consumption/data/load-estimation-plan";

function extractDates(body: unknown): { startDate: string; endDate: string } | null {
  if (!body || typeof body !== "object") return null;
  const rec = body as Record<string, unknown>;
  const rawStart = typeof rec.startDate === "string" ? rec.startDate : typeof rec.start === "string" ? rec.start : null;
  const rawEnd = typeof rec.endDate === "string" ? rec.endDate : typeof rec.end === "string" ? rec.end : null;
  if (!rawStart || !rawEnd) return null;
  const dateRe = /(\d{4}-\d{2}-\d{2})/;
  const s = rawStart.match(dateRe);
  const e = rawEnd.match(dateRe);
  if (!s || !e) return null;
  return { startDate: `${s[1]}T00:00:00+03:00`, endDate: `${e[1]}T00:00:00+03:00` };
}

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
    const payload = extractDates(rawBody);
    if (!payload) {
      return NextResponse.json({ error: "Invalid date range payload", _received: rawBody }, { status: 400 });
    }

    const tgt = await getTgt();
    const endpoint = process.env.EPIAS_LOAD_ESTIMATION_PLAN_URL || DEFAULT_ENDPOINT;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { TGT: tgt, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error("[api/energy/load-estimation-plan] EPIAS upstream failed", { status: response.status, body: errorBody.slice(0, 500) });
      if (response.status === 400 && /mevcut de\u011fil|not available|SEF1124/i.test(errorBody)) {
        return NextResponse.json({ items: [], notice: "Y\u00fck tahmin plan\u0131 verileri hen\u00fcz yay\u0131nlanmad\u0131." });
      }
      return NextResponse.json({ error: "Upstream service error" }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json({ items: data?.items ?? [] });
  } catch (error) {
    console.error("[api/energy/load-estimation-plan] Unexpected server error", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
