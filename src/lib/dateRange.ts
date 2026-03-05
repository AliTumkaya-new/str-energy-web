type DateBoundary = "start" | "end";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function pickString(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(value).toISOString();
  }
  return null;
}

function extractDateRangeFields(payload: Record<string, unknown>): { rawStartDate: string; rawEndDate: string } | null {
  const directStart =
    pickString(payload.startDate) ??
    pickString(payload.start) ??
    pickString(payload.from) ??
    pickString(payload.beginDate) ??
    pickString(payload.start_time);
  const directEnd =
    pickString(payload.endDate) ??
    pickString(payload.end) ??
    pickString(payload.to) ??
    pickString(payload.finishDate) ??
    pickString(payload.end_time);

  if (directStart && directEnd) {
    return { rawStartDate: directStart, rawEndDate: directEnd };
  }

  const nested = payload.range ?? payload.dateRange ?? payload.filters;
  if (isRecord(nested)) {
    const nestedStart =
      pickString(nested.startDate) ??
      pickString(nested.start) ??
      pickString(nested.from) ??
      pickString(nested.beginDate);
    const nestedEnd =
      pickString(nested.endDate) ??
      pickString(nested.end) ??
      pickString(nested.to) ??
      pickString(nested.finishDate);
    if (nestedStart && nestedEnd) {
      return { rawStartDate: nestedStart, rawEndDate: nestedEnd };
    }
  }

  return null;
}

function normalizeDateTimeInput(value: string, boundary: DateBoundary): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return boundary === "start"
      ? `${trimmed}T00:00:00+03:00`
      : `${trimmed}T23:59:59+03:00`;
  }

  let candidate = trimmed
    .replace(" ", "T")
    .replace(/([+\-]\d{2})(\d{2})$/, "$1:$2");

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(candidate)) {
    candidate = `${candidate}:00+03:00`;
  } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?$/.test(candidate)) {
    candidate = `${candidate}+03:00`;
  } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?:Z|[+\-]\d{2}:\d{2})$/.test(candidate)) {
    const timezone = candidate.slice(-1) === "Z" ? "Z" : candidate.slice(-6);
    candidate = `${candidate.slice(0, -timezone.length)}:00${timezone}`;
  }

  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+\-]\d{2}:\d{2})$/.test(candidate)) {
    const parsed = new Date(trimmed);
    if (Number.isNaN(parsed.getTime())) return null;

    const targetOffsetMinutes = 180;
    const shiftedMs = parsed.getTime() + targetOffsetMinutes * 60 * 1000;
    const shifted = new Date(shiftedMs);
    const year = shifted.getUTCFullYear();
    const month = String(shifted.getUTCMonth() + 1).padStart(2, "0");
    const day = String(shifted.getUTCDate()).padStart(2, "0");
    const hour = String(shifted.getUTCHours()).padStart(2, "0");
    const minute = String(shifted.getUTCMinutes()).padStart(2, "0");
    const second = String(shifted.getUTCSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}:${second}+03:00`;
  }

  return candidate;
}

export function parseDateRangePayload(
  payload: unknown,
  maxDays = 31
): { startDate: string; endDate: string } | null {
  if (!isRecord(payload)) return null;

  const fields = extractDateRangeFields(payload);
  if (!fields) return null;

  const startDate = normalizeDateTimeInput(fields.rawStartDate, "start");
  const endDate = normalizeDateTimeInput(fields.rawEndDate, "end");
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  if (end < start) return null;

  const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays > maxDays) return null;

  return { startDate, endDate };
}

