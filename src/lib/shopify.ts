import crypto from "crypto";

// Strict Shopify shop-domain validator. A shop must be exactly a
// `<store>.myshopify.com` hostname — lowercase alphanumeric + hyphens only.
// This rejects protocol strings, paths, ports, userinfo (`@`), and unrelated
// domains, so a caller-supplied `shop` can be safely interpolated into
// `https://${shop}/admin/...` Admin API URLs without host injection.
const SHOP_DOMAIN_RE = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i;

export function isValidShopDomain(shop: unknown): shop is string {
  return typeof shop === "string" && SHOP_DOMAIN_RE.test(shop);
}

// Constant-time equality for HMAC/signature comparison. `crypto.timingSafeEqual`
// THROWS when the two buffers differ in length, so malformed attacker input
// could otherwise crash the handler (500) instead of failing authentication.
// This guards the length first and only compares equal-length, non-empty
// buffers — malformed input returns false, never throws. Strings are compared
// by their raw bytes; callers should decode hex/base64 to bytes for the
// strongest comparison.
export function safeTimingEqual(expected: string | Buffer, actual: string | Buffer): boolean {
  const a = typeof expected === "string" ? Buffer.from(expected, "utf8") : expected;
  const b = typeof actual === "string" ? Buffer.from(actual, "utf8") : actual;
  if (a.length === 0 || a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
