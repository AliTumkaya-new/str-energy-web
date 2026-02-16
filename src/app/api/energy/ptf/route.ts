import { NextResponse, type NextRequest } from "next/server";
import { getTgt } from "@/lib/epiasAuth";

export const runtime = "nodejs";

const DEFAULT_ENDPOINT = "https://seffaflik.epias.com.tr/electricity-service/v1/markets/dam/data/mcp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tgt = await getTgt();
    const endpoint = process.env.EPIAS_PTF_URL || DEFAULT_ENDPOINT;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        TGT: tgt,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText || "EPIAS request failed" }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json({ items: data?.items ?? [] });
  } catch {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
