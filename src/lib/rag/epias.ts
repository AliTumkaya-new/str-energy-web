type LiveDataResult = {
  ptf?: unknown;
  yekdem?: unknown;
  errors: string[];
};

function resolveTemplateUrl(template: string, now = new Date()) {
  const isoDate = now.toISOString().slice(0, 10);
  const hour = String(now.getHours()).padStart(2, "0");
  return template
    .replaceAll("{{date}}", isoDate)
    .replaceAll("{{startDate}}", isoDate)
    .replaceAll("{{endDate}}", isoDate)
    .replaceAll("{{hour}}", hour);
}

function buildHeaders(): HeadersInit {
  const headerName = process.env.EPIAS_API_KEY_HEADER;
  const headerValue = process.env.EPIAS_API_KEY;
  if (headerName && headerValue) {
    return { [headerName]: headerValue };
  }
  return {};
}

async function fetchJson(url: string) {
  const response = await fetch(url, { headers: buildHeaders() });
  if (!response.ok) {
    throw new Error(`EPIAS request failed: ${response.status}`);
  }
  return response.json();
}

export async function getLiveEnergyData(query: string): Promise<LiveDataResult> {
  const wantsPtf = /\bptf\b|mcp/i.test(query);
  const wantsYekdem = /yekdem/i.test(query);
  const result: LiveDataResult = { errors: [] };

  const ptfTemplate = process.env.EPIAS_PTF_URL;
  const yekdemTemplate = process.env.EPIAS_YEKDEM_URL;

  if (wantsPtf) {
    if (!ptfTemplate) {
      result.errors.push("PTF endpoint is not configured.");
    } else {
      const url = resolveTemplateUrl(ptfTemplate);
      try {
        result.ptf = await fetchJson(url);
      } catch {
        result.errors.push("PTF data could not be retrieved.");
      }
    }
  }

  if (wantsYekdem) {
    if (!yekdemTemplate) {
      result.errors.push("YEKDEM endpoint is not configured.");
    } else {
      const url = resolveTemplateUrl(yekdemTemplate);
      try {
        result.yekdem = await fetchJson(url);
      } catch {
        result.errors.push("YEKDEM data could not be retrieved.");
      }
    }
  }

  return result;
}
