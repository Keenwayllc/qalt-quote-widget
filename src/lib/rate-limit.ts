type Window = { count: number; resetAt: number };
const store = new Map<string, Window>();

/**
 * Simple in-memory sliding-window rate limiter.
 * Returns true if the request is allowed, false if the limit is exceeded.
 *
 * Note: state is per-process. For multi-instance deployments, replace this
 * with an Upstash Redis / Vercel KV backed implementation.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}

export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
