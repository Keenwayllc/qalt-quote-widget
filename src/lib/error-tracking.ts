import { createHash } from "node:crypto";

/**
 * Pure helpers for grouping errors. Two reports are the same bug when their
 * source, normalized message, top stack function and route pattern match, so
 * ids, numbers and per-deploy chunk hashes don't split one bug into many rows.
 */

export type AppErrorSource = "client" | "server";

export type AppErrorInput = {
  source: AppErrorSource;
  message: string;
  stack?: string | null;
  path?: string | null;
  userAgent?: string | null;
  companyId?: string | null;
};

export const APP_ERROR_STATUSES = ["NEW", "INVESTIGATING", "FIXED", "IGNORED"] as const;

const NOISE = [
  /ResizeObserver loop/i,
  /^Script error\.?$/i,
  /Non-Error promise rejection captured/i,
  /chrome-extension:\/\/|moz-extension:\/\/|safari-(web-)?extension:\/\//i,
  /^(TypeError: )?(Failed to fetch|Load failed|NetworkError when attempting to fetch resource\.?)$/i,
  /AbortError|The user aborted a request|signal is aborted/i,
  /NEXT_REDIRECT|NEXT_NOT_FOUND|NEXT_HTTP_ERROR_FALLBACK/,
];

/** Browser noise (extensions, offline blips, aborted requests, framework redirects). */
export function isNoiseError(message: string, stack?: string | null): boolean {
  return NOISE.some((re) => re.test(message) || (stack ? re.test(stack) : false));
}

export function clamp(value: unknown, max: number): string | null {
  if (value == null) return null;
  const text = String(value).trim();
  return text ? text.slice(0, max) : null;
}

export function normalizeErrorMessage(message: string): string {
  return message
    .replace(/https?:\/\/\S+/g, "<url>")
    .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, "<uuid>")
    .replace(/\bc[a-z0-9]{20,}\b/g, "<id>")
    .replace(/\b[0-9a-f]{16,}\b/gi, "<hex>")
    .replace(/(["'`]).*?\1/g, "<str>")
    .replace(/\d+(\.\d+)?/g, "<n>")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);
}

/** Function name of the first application frame, without file names or line numbers. */
export function topStackFunction(stack?: string | null): string {
  if (!stack) return "";
  // No slice(1): Firefox/Safari stacks have no "Error: message" header line.
  for (const line of stack.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || /node_modules|node:internal|<anonymous>/.test(trimmed)) continue;
    const chrome = trimmed.match(/^at\s+(?:async\s+)?([^\s(]+)\s*\(/);
    if (chrome) return chrome[1];
    const firefox = trimmed.match(/^([^@\s]+)@/);
    if (firefox) return firefox[1];
  }
  return "";
}

/** Route pattern: dynamic-looking path segments become ":id". */
export function normalizeErrorPath(path?: string | null): string {
  if (!path) return "";
  const pathname = path.split(/[?#]/)[0];
  return pathname
    .split("/")
    .map((segment) => (/\d/.test(segment) || segment.length > 24 ? ":id" : segment))
    .join("/")
    .slice(0, 200);
}

export function errorFingerprint(input: Pick<AppErrorInput, "source" | "message" | "stack" | "path">): string {
  const key = [input.source, normalizeErrorMessage(input.message), topStackFunction(input.stack), normalizeErrorPath(input.path)].join("|");
  return createHash("sha256").update(key).digest("hex").slice(0, 32);
}
