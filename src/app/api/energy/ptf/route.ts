import { NextResponse, type NextRequest } from "next/server";
import { getTgt } from "@/lib/epiasAuth";
import { checkRateLimit, isAllowedOrigin, parseDateRangePayload } from "@/lib/apiSecurity";

export const runtime = "nodejs";

const DEFAULT_ENDPOINT =
  "https://seffaflik.epias.com.tr/electricity-service/v1/markets/dam/data/mcp";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * EPİAŞ DAM/PTF servisi tarihleri T00:00:00+03:00 formatında bekler.
 * Frontend T23:59:59 gönderebilir — bunu normalize ediyoruz.
 */
function toEpiasDayStart(isoDate: string): string {
  const datePart = isoDate.slice(0, 10); // "YYYY-MM-DD"
  return `${datePart}T00:00:00+03:00`;
}

/** Fire a single MCP request and return the raw Response. */
async function fetchMcp(
  endpoint: string,
  tgt: string,
  payload: { startDate: string; endDate: string },
): Promise<Response> {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      TGT: tgt,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
}

/* ------------------------------------------------------------------ */
/*  Route handler                                                      */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const rateLimit = checkRateLimit(request, "energy", 60, 60_000);
    if (rateLimit.limited) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } },
      );
    }

    const rawBody = await request.json();
    const parsed = parseDateRangePayload(rawBody);
    if (!parsed) {
      return NextResponse.json({ error: "Invalid date range payload" }, { status: 400 });
    }

    /* EPİAŞ PTF servisi her iki tarihi de gün başı olarak bekler */
    const payload = {
      startDate: toEpiasDayStart(parsed.startDate),
      endDate: toEpiasDayStart(parsed.endDate),
    };

    const tgt = await getTgt();
    const endpoint = process.env.EPIAS_PTF_URL || DEFAULT_ENDPOINT;

    const response = await fetchMcp(endpoint, tgt, payload);

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ items: data?.items ?? [] });
    }

    const errorBody = await response.text().catch(() => "");
    console.error("[api/energy/ptf] EPIAS upstream failed", {
      status: response.status,
      body: errorBody.slice(0, 500),
    });

    /* EPİAŞ "veri henüz mevcut değil" — boş items + açıklama dön */
    if (response.status === 400 && /mevcut değil|not available|SEF1124/i.test(errorBody)) {
      return NextResponse.json({
        items: [],
        notice:
          "PTF verileri henüz yayınlanmadı. Gün öncesi piyasa verileri saat 14:00'te açıklanır.",
      });
    }

    return NextResponse.json({ error: "Upstream service error" }, { status: 502 });
  } catch (error) {
    console.error("[api/energy/ptf] Unexpected server error", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
