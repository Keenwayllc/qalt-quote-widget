/**
 * How a merchant logo reads against a plain background. Used to decide
 * whether to show the logo on a contrast plate. The artwork itself is never
 * modified; only its container changes.
 *
 *   light     mostly white/pale ink: hard to see on light surfaces
 *   dark      mostly black/dark ink: hard to see on dark surfaces
 *   balanced  enough mid or mixed tones to read on either
 *   opaque    no transparency, so it carries its own background
 *   unknown   could not be analyzed; render as-is
 */
export type LogoTone = "light" | "dark" | "balanced" | "opaque" | "unknown";

export const LOGO_TONES: readonly LogoTone[] = ["light", "dark", "balanced", "opaque", "unknown"];

/**
 * Merchant override from Widget Appearance. "light" means the logo is made
 * for light backgrounds (dark ink), "dark" means it is made for dark
 * backgrounds (light ink). "auto" uses the detected tone.
 */
export type LogoBackdrop = "auto" | "light" | "dark";

export function normalizeLogoBackdrop(value: unknown): LogoBackdrop {
  return value === "light" || value === "dark" ? value : "auto";
}

/** Tone implied by a forced backdrop, or null to use detection. */
export function toneForBackdrop(backdrop: LogoBackdrop | null | undefined): LogoTone | null {
  if (backdrop === "light") return "dark";
  if (backdrop === "dark") return "light";
  return null;
}

/** Plate needed to keep a logo of this tone readable on the given surface. */
export function logoPlateFor(tone: LogoTone, surface: "light" | "dark"): "dark" | "light" | null {
  if (surface === "light" && tone === "light") return "dark";
  if (surface === "dark" && tone === "dark") return "light";
  return null;
}
