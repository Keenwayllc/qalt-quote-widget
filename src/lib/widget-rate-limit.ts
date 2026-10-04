import { createHash } from "node:crypto";

type Bucket = { count: number; expires: number };
/** Bounded, per-process backstop. Edge/WAF limits should supplement it in production. */
export function createWidgetRateLimiter(maxBuckets = 10000) {
  const buckets = new Map<string, Bucket>();
  return (key: string, limit: number, now = Date.now()): boolean => {
    const existing = buckets.get(key);
    if (existing && existing.expires > now) {
      if (existing.count >= limit) return false;
      existing.count++;
      return true;
    }
    if (buckets.size >= maxBuckets) {
      for (const [id, bucket] of buckets) if (bucket.expires <= now) buckets.delete(id);
      if (!buckets.has(key) && buckets.size >= maxBuckets) return false;
    }
    buckets.set(key, { count: 1, expires: now + 60000 });
    return true;
  };
}
const allow = createWidgetRateLimiter();
export function widgetRequestAllowed(request: Request, scope: string, limit: number): boolean {
  // Vercel supplies the client forwarding header. Never retain raw visitor IPs.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!ip) return true;
  const key = createHash("sha256").update(`${scope}:${ip}`).digest("hex");
  return allow(key, limit);
}
