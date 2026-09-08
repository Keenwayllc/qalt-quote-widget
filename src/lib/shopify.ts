// Strict Shopify shop-domain validator. A shop must be exactly a
// `<store>.myshopify.com` hostname — lowercase alphanumeric + hyphens only.
// This rejects protocol strings, paths, ports, userinfo (`@`), and unrelated
// domains, so a caller-supplied `shop` can be safely interpolated into
// `https://${shop}/admin/...` Admin API URLs without host injection.
const SHOP_DOMAIN_RE = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i;

export function isValidShopDomain(shop: unknown): shop is string {
  return typeof shop === "string" && SHOP_DOMAIN_RE.test(shop);
}
