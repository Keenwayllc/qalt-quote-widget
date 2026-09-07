// Small, dependency-free color helpers for the merchant brand color.
// Shared by Widget Appearance validation and the widget brand runtime so the
// default and the readable-foreground logic have a single source of truth.

/** Canonical brand-color default. Matches the Prisma schema default so every
 *  fallback / Reset path agrees. */
export const DEFAULT_BRAND = "#1E40AF";

/**
 * Validate + normalize a hex color. Accepts strict #RRGGBB only (# optional,
 * case-insensitive). Returns a normalized #RRGGBB (uppercase) string, or null
 * when the value is not a valid 6-digit hex color. Shorthand #RGB is rejected.
 */
export function sanitizeHex(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const v = input.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(v)) return null;
  return "#" + v.toUpperCase();
}

export function isValidHex(input: unknown): boolean {
  return sanitizeHex(input) !== null;
}

// WCAG relative luminance (sRGB).
function relativeLuminance(hex: string): number {
  const h = sanitizeHex(hex) ?? DEFAULT_BRAND;
  const r = parseInt(h.slice(1, 3), 16) / 255;
  const g = parseInt(h.slice(3, 5), 16) / 255;
  const b = parseInt(h.slice(5, 7), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(l1: number, l2: number): number {
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

const INK_DARK = "#111827"; // slate-900
const INK_LIGHT = "#FFFFFF";

/**
 * Pick the foreground (text/icon) color that reads best on top of `bg`.
 * Compares WCAG contrast of dark vs light ink and returns the stronger one, so
 * light accents (e.g. yellow) get dark text and dark accents get white text.
 */
export function readableForeground(bg: unknown): string {
  const bgLum = relativeLuminance(typeof bg === "string" ? bg : DEFAULT_BRAND);
  const darkContrast = contrastRatio(bgLum, relativeLuminance(INK_DARK));
  const lightContrast = contrastRatio(bgLum, relativeLuminance(INK_LIGHT));
  return darkContrast >= lightContrast ? INK_DARK : INK_LIGHT;
}
