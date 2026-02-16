let cachedTgt: { value: string; expiresAt: number } | null = null;

const DEFAULT_CAS_URL = "https://giris.epias.com.tr/cas/v1/tickets";
const TGT_TTL_MS = 110 * 60 * 1000;

async function requestTgt(): Promise<string> {
  const username = process.env.EPIAS_USERNAME;
  const password = process.env.EPIAS_PASSWORD;
  if (!username || !password) {
    throw new Error("Missing EPIAS credentials");
  }

  const casUrl = process.env.EPIAS_CAS_URL || DEFAULT_CAS_URL;
  const payload = new URLSearchParams();
  payload.append("username", username);
  payload.append("password", password);

  const response = await fetch(casUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/plain",
    },
    body: payload.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to obtain TGT");
  }

  const tgt = (await response.text()).trim();
  if (!tgt) {
    throw new Error("Empty TGT response");
  }

  return tgt;
}

export async function getTgt(): Promise<string> {
  const now = Date.now();
  if (cachedTgt && cachedTgt.expiresAt > now) {
    return cachedTgt.value;
  }

  const value = await requestTgt();
  cachedTgt = { value, expiresAt: now + TGT_TTL_MS };
  return value;
}
