const MAX_REPORTS_PER_PAGE = 10;
let reported = 0;
const seen = new Set<string>();

/** Sends a browser error to /api/errors once per distinct error per page load. */
export function reportClientError(error: unknown) {
  if (typeof window === "undefined" || reported >= MAX_REPORTS_PER_PAGE) return;
  const err = error instanceof Error ? error : null;
  const message = err?.message || (typeof error === "string" ? error : "") || String(error);
  const stack = err?.stack ?? null;
  const key = `${message}|${stack?.slice(0, 300)}`;
  if (!message || seen.has(key)) return;
  seen.add(key);
  reported++;

  const payload = JSON.stringify({ message: message.slice(0, 2000), stack: stack?.slice(0, 8000), path: window.location.pathname });
  try {
    const sent = navigator.sendBeacon?.("/api/errors", new Blob([payload], { type: "application/json" }));
    if (!sent) void fetch("/api/errors", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
  } catch {}
}
