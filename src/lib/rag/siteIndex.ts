import fs from "fs";
import path from "path";

export type RagChunk = {
  id: string;
  text: string;
  source: string;
};

type CachedIndex = {
  at: number;
  chunks: RagChunk[];
};

const CACHE_TTL_MS = 5 * 60 * 1000;
const SOURCE_DIRS = ["src/app", "src/components", "src/context"];
const SOURCE_EXT = new Set([".tsx", ".ts"]);
let cachedIndex: CachedIndex | null = null;

function listSourceFiles(root: string, dir: string, acc: string[]) {
  const absDir = path.join(root, dir);
  if (!fs.existsSync(absDir)) return;

  const entries = fs.readdirSync(absDir, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      listSourceFiles(root, path.join(dir, entry.name), acc);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (SOURCE_EXT.has(ext)) {
        acc.push(entryPath);
      }
    }
  }
}

function extractCandidateStrings(source: string): string[] {
  const results: string[] = [];
  const regex = /(["'`])((?:\\.|(?!\1).)*)\1/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(source)) !== null) {
    const raw = match[2];
    if (!raw) continue;
    if (raw.includes("${")) continue;

    const cleaned = raw.replace(/\s+/g, " ").trim();
    if (cleaned.length < 30) continue;
    if (!/\p{L}/u.test(cleaned)) continue;
    if (!cleaned.includes(" ")) continue;

    const looksLikeClass = /(^|\s)(bg-|text-|px-|py-|mx-|my-|grid-|flex-|rounded-|border-)/.test(cleaned);
    if (looksLikeClass && cleaned.length < 80) continue;

    results.push(cleaned);
  }

  return Array.from(new Set(results));
}

function chunkText(text: string, size = 560, overlap = 80): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(text.length, start + size);
    chunks.push(text.slice(start, end).trim());
    start = end - overlap;
    if (start < 0) start = 0;
    if (end === text.length) break;
  }
  return chunks.filter(Boolean);
}

function buildIndex(): RagChunk[] {
  const projectRoot = process.cwd();
  const files: string[] = [];
  for (const dir of SOURCE_DIRS) {
    listSourceFiles(projectRoot, dir, files);
  }

  const chunks: RagChunk[] = [];
  for (const filePath of files) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const strings = extractCandidateStrings(fileContent);
    if (strings.length === 0) continue;

    const joined = strings.join("\n");
    const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, "/");
    const fileChunks = chunkText(joined);

    fileChunks.forEach((chunk, index) => {
      chunks.push({
        id: `${relativePath}::${index}`,
        source: relativePath,
        text: chunk,
      });
    });
  }

  return chunks;
}

export function getSiteIndex(): RagChunk[] {
  const now = Date.now();
  if (cachedIndex && now - cachedIndex.at < CACHE_TTL_MS) {
    return cachedIndex.chunks;
  }

  const chunks = buildIndex();
  cachedIndex = { at: now, chunks };
  return chunks;
}

const stopWords = new Set([
  "ve",
  "ile",
  "icin",
  "için",
  "veya",
  "bir",
  "bu",
  "that",
  "the",
  "and",
  "or",
  "for",
  "with",
  "from",
  "are",
  "is",
  "to",
  "of",
  "in",
  "на",
  "и",
  "что",
  "для",
  "это",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/gu)
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

export function getRelevantChunks(query: string, limit = 6): RagChunk[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const tokenSet = new Set(tokens);
  const chunks = getSiteIndex();

  const scored = chunks
    .map((chunk) => {
      const textTokens = tokenize(chunk.text);
      let score = 0;
      for (const token of textTokens) {
        if (tokenSet.has(token)) score += 1;
      }
      return { chunk, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.chunk);

  return scored;
}

export function formatContext(chunks: RagChunk[]): string {
  if (chunks.length === 0) return "";
  return chunks
    .map((chunk) => `Source: ${chunk.source}\n${chunk.text}`)
    .join("\n\n");
}
