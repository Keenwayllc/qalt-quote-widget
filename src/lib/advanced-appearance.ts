import { contrastBetween, isDarkColor, readableForeground, sanitizeHex } from "@/lib/color";
import { getEntitlements } from "@/lib/plans";

/**
 * Enterprise "Advanced appearance": semantic design tokens that let a
 * merchant's quote form blend into their website.
 *
 * Stored per form in WidgetSettings.advancedAppearance as a versioned object.
 * null means the form uses the basic theme (brand color + Light/Dark form).
 *
 * Every value is an enum, a bounded integer, or a strict #RRGGBB hex, and
 * fonts are allowlisted stacks, so nothing a merchant types is ever written
 * into CSS as free text. The same resolver (resolveAppearance) feeds the
 * editor preview and every live form, so they cannot drift apart.
 *
 * Plan policy: the tokens render only while the account's plan includes
 * isAdvancedAppearanceEnabled. A downgraded account keeps its saved tokens but
 * renders the basic theme; upgrading again restores them unchanged.
 */

export const ADVANCED_APPEARANCE_VERSION = 1;

export const PALETTE_KEYS = ["accent", "background", "surface", "text", "muted", "border", "focus", "error"] as const;
export type PaletteKey = (typeof PALETTE_KEYS)[number];
export type Palette = Record<PaletteKey, string>;

export const SCHEMES = ["light", "dark", "auto"] as const;
export type AppearanceScheme = (typeof SCHEMES)[number];
export type PaletteName = "light" | "dark";

export const FONTS = {
  inter: { label: "Inter", stack: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif" },
  system: { label: "System UI", stack: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" },
  humanist: { label: "Humanist sans", stack: "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif" },
  geometric: { label: "Geometric sans", stack: "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif" },
  rounded: { label: "Rounded sans", stack: "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif" },
  industrial: { label: "Industrial", stack: "Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif" },
  transitional: { label: "Classic serif", stack: "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif" },
  oldstyle: { label: "Book serif", stack: "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif" },
} as const;
export type FontId = keyof typeof FONTS;
export const FONT_IDS = Object.keys(FONTS) as FontId[];

export const TYPE_SCALES = [90, 95, 100, 105, 110] as const;
export const DENSITIES = ["compact", "comfortable", "spacious"] as const;
export const CARD_BORDERS = ["none", "hairline", "defined"] as const;
export const SHADOWS = ["none", "soft", "lifted"] as const;
export const BUTTON_STYLES = ["solid", "outline"] as const;
export const BUTTON_SHAPES = ["match", "pill"] as const;

export const RADIUS_MIN = 0;
export const RADIUS_MAX = 24;
export const WIDTH_MIN = 360;
export const WIDTH_MAX = 960;

export type AdvancedAppearance = {
  version: 1;
  presetId: PresetId | null;
  scheme: AppearanceScheme;
  /** One brand color for both palettes: it also fills the form header. */
  primary: string;
  light: Palette;
  dark: Palette;
  typography: { body: FontId; heading: FontId; scale: (typeof TYPE_SCALES)[number] };
  /** contentWidth "auto" keeps each form style's own width. */
  layout: { radius: number; density: (typeof DENSITIES)[number]; contentWidth: "auto" | number };
  surfaces: {
    border: (typeof CARD_BORDERS)[number];
    shadow: (typeof SHADOWS)[number];
    buttonStyle: (typeof BUTTON_STYLES)[number];
    buttonShape: (typeof BUTTON_SHAPES)[number];
  };
};

type PresetTokens = Omit<AdvancedAppearance, "version" | "presetId" | "primary">;

export const PRESETS = {
  clean: {
    label: "Clean",
    description: "Neutral and crisp. Fits most sites.",
    tokens: {
      scheme: "light",
      light: { accent: "#047857", background: "#F4F5F7", surface: "#FFFFFF", text: "#111827", muted: "#4B5563", border: "#DCE0E6", focus: "#2563EB", error: "#B42318" },
      dark: { accent: "#34D399", background: "#0B0D10", surface: "#15181D", text: "#F3F4F6", muted: "#A9B1BD", border: "#2B3038", focus: "#60A5FA", error: "#FB7D73" },
      typography: { body: "inter", heading: "inter", scale: 100 },
      layout: { radius: 14, density: "comfortable", contentWidth: "auto" },
      surfaces: { border: "hairline", shadow: "soft", buttonStyle: "solid", buttonShape: "match" },
    },
  },
  editorial: {
    label: "Editorial",
    description: "Warm paper tones with a book serif.",
    tokens: {
      scheme: "light",
      light: { accent: "#166534", background: "#F6F3EE", surface: "#FFFDF9", text: "#1C1917", muted: "#57504A", border: "#E2DBD0", focus: "#9A3412", error: "#B42318" },
      dark: { accent: "#86EFAC", background: "#141210", surface: "#1E1B18", text: "#F5F0E8", muted: "#B9B0A4", border: "#3A342E", focus: "#FDBA74", error: "#FB7D73" },
      typography: { body: "humanist", heading: "oldstyle", scale: 105 },
      layout: { radius: 6, density: "spacious", contentWidth: "auto" },
      surfaces: { border: "defined", shadow: "none", buttonStyle: "solid", buttonShape: "match" },
    },
  },
  soft: {
    label: "Soft",
    description: "Rounded shapes and gentle depth.",
    tokens: {
      scheme: "light",
      light: { accent: "#0F766E", background: "#F3F5FA", surface: "#FFFFFF", text: "#1E293B", muted: "#51607A", border: "#E1E6EF", focus: "#7C3AED", error: "#BE123C" },
      dark: { accent: "#5EEAD4", background: "#0F1220", surface: "#181C2E", text: "#EEF0F8", muted: "#ABB2C8", border: "#2E3352", focus: "#A78BFA", error: "#FB7185" },
      typography: { body: "rounded", heading: "rounded", scale: 100 },
      layout: { radius: 22, density: "comfortable", contentWidth: "auto" },
      surfaces: { border: "none", shadow: "lifted", buttonStyle: "solid", buttonShape: "pill" },
    },
  },
  utility: {
    label: "Utility",
    description: "Dense, square, operator-grade.",
    tokens: {
      scheme: "light",
      light: { accent: "#166534", background: "#ECEEF1", surface: "#FFFFFF", text: "#0F172A", muted: "#475263", border: "#C7CDD6", focus: "#C2410C", error: "#B91C1C" },
      dark: { accent: "#4ADE80", background: "#0A0A0A", surface: "#141414", text: "#F5F5F5", muted: "#A8A8A8", border: "#363636", focus: "#FBBF24", error: "#F87171" },
      typography: { body: "system", heading: "industrial", scale: 95 },
      layout: { radius: 2, density: "compact", contentWidth: "auto" },
      surfaces: { border: "defined", shadow: "none", buttonStyle: "solid", buttonShape: "match" },
    },
  },
} satisfies Record<string, { label: string; description: string; tokens: PresetTokens }>;
export type PresetId = keyof typeof PRESETS;
export const PRESET_IDS = Object.keys(PRESETS) as PresetId[];

/** A complete appearance from a preset, keeping the merchant's brand color. */
export function appearanceFromPreset(presetId: PresetId, primary: string): AdvancedAppearance {
  const tokens = PRESETS[presetId].tokens as PresetTokens;
  return {
    version: 1,
    presetId,
    primary: sanitizeHex(primary) ?? "#1E40AF",
    ...structuredClone(tokens),
  };
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export type ContrastIssue = {
  level: "error" | "warning";
  palette: PaletteName;
  /** The token the merchant should change. */
  token: PaletteKey | "primary";
  message: string;
  ratio: number;
};

export type ParseResult =
  | { ok: true; value: AdvancedAppearance; issues: ContrastIssue[] }
  | { ok: false; errors: string[] };

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function checkKeys(obj: Record<string, unknown>, allowed: readonly string[], path: string, errors: string[]) {
  for (const key of Object.keys(obj)) {
    if (!allowed.includes(key)) errors.push(`${path}${key} is not a supported setting.`);
  }
  for (const key of allowed) {
    if (!(key in obj)) errors.push(`${path}${key} is required.`);
  }
}

function oneOf<T extends string | number>(value: unknown, options: readonly T[], label: string, errors: string[]): T {
  if (!(options as readonly unknown[]).includes(value)) errors.push(`${label} must be one of: ${options.join(", ")}.`);
  return value as T;
}

function hex(value: unknown, label: string, errors: string[]): string {
  if (typeof value !== "string" || !/^#[0-9a-fA-F]{6}$/.test(value)) {
    errors.push(`${label} must be a 6-digit hex color like #1E40AF.`);
    return "#000000";
  }
  return value.toUpperCase();
}

export const TOKEN_LABELS: Record<PaletteKey | "primary", string> = {
  primary: "Primary",
  accent: "Accent",
  background: "Page background",
  surface: "Form surface",
  text: "Text",
  muted: "Muted text",
  border: "Borders",
  focus: "Focus ring",
  error: "Error",
};

/**
 * Strict validation for writes and preview drafts. Rejects unknown keys,
 * wrong types, out-of-range numbers, malformed colors, and (unless
 * enforceContrast is false) palettes whose essential states are unreadable.
 */
export function parseAdvancedAppearance(input: unknown, { enforceContrast = true } = {}): ParseResult {
  const errors: string[] = [];
  if (!isRecord(input)) return { ok: false, errors: ["Appearance must be an object."] };

  checkKeys(input, ["version", "presetId", "scheme", "primary", "light", "dark", "typography", "layout", "surfaces"], "", errors);
  if (input.version !== ADVANCED_APPEARANCE_VERSION) errors.push(`version must be ${ADVANCED_APPEARANCE_VERSION}.`);
  const presetId = input.presetId === null ? null : oneOf(input.presetId, PRESET_IDS, "presetId", errors);
  const scheme = oneOf(input.scheme, SCHEMES, "scheme", errors);
  const primary = hex(input.primary, "Primary", errors);

  const palette = (raw: unknown, name: PaletteName): Palette => {
    const out = {} as Palette;
    if (!isRecord(raw)) {
      errors.push(`${name} palette must be an object.`);
      return out;
    }
    checkKeys(raw, PALETTE_KEYS, `${name}.`, errors);
    for (const key of PALETTE_KEYS) out[key] = hex(raw[key], `${name === "light" ? "Light" : "Dark"} ${TOKEN_LABELS[key].toLowerCase()}`, errors);
    return out;
  };
  const light = palette(input.light, "light");
  const dark = palette(input.dark, "dark");

  const section = (raw: unknown, name: string, keys: readonly string[]): Record<string, unknown> => {
    if (!isRecord(raw)) {
      errors.push(`${name} must be an object.`);
      return {};
    }
    checkKeys(raw, keys, `${name}.`, errors);
    return raw;
  };
  const typography = section(input.typography, "typography", ["body", "heading", "scale"]);
  const layout = section(input.layout, "layout", ["radius", "density", "contentWidth"]);
  const surfaces = section(input.surfaces, "surfaces", ["border", "shadow", "buttonStyle", "buttonShape"]);

  const radius = layout.radius;
  if (!Number.isInteger(radius) || (radius as number) < RADIUS_MIN || (radius as number) > RADIUS_MAX) {
    errors.push(`Corner radius must be a whole number from ${RADIUS_MIN} to ${RADIUS_MAX}.`);
  }
  const width = layout.contentWidth;
  if (width !== "auto" && (!Number.isInteger(width) || (width as number) < WIDTH_MIN || (width as number) > WIDTH_MAX)) {
    errors.push(`Content width must be "auto" or a whole number from ${WIDTH_MIN} to ${WIDTH_MAX}.`);
  }

  const value: AdvancedAppearance = {
    version: 1,
    presetId,
    scheme,
    primary,
    light,
    dark,
    typography: {
      body: oneOf(typography.body, FONT_IDS, "Body font", errors),
      heading: oneOf(typography.heading, FONT_IDS, "Heading font", errors),
      scale: oneOf(typography.scale, TYPE_SCALES, "Type scale", errors),
    },
    layout: {
      radius: radius as number,
      density: oneOf(layout.density, DENSITIES, "Spacing density", errors),
      contentWidth: width as "auto" | number,
    },
    surfaces: {
      border: oneOf(surfaces.border, CARD_BORDERS, "Card border", errors),
      shadow: oneOf(surfaces.shadow, SHADOWS, "Shadow", errors),
      buttonStyle: oneOf(surfaces.buttonStyle, BUTTON_STYLES, "Button style", errors),
      buttonShape: oneOf(surfaces.buttonShape, BUTTON_SHAPES, "Button shape", errors),
    },
  };

  if (errors.length) return { ok: false, errors };
  const issues = auditContrast(value);
  if (enforceContrast) {
    const blocking = issues.filter((issue) => issue.level === "error");
    if (blocking.length) return { ok: false, errors: blocking.map((issue) => issue.message) };
  }
  return { ok: true, value, issues };
}

/**
 * Lenient read of a stored value. Anything that is not a valid current
 * version (legacy rows, hand-edited JSON, a future version) renders the basic
 * theme instead of a half-applied one.
 */
export function readStoredAppearance(raw: unknown): AdvancedAppearance | null {
  if (raw == null) return null;
  const parsed = parseAdvancedAppearance(raw, { enforceContrast: false });
  return parsed.ok ? parsed.value : null;
}

/** The appearance a form actually renders with, given the account's plan. */
export function effectiveAppearance(raw: unknown, plan: string | null | undefined): AdvancedAppearance | null {
  if (!getEntitlements(plan).isAdvancedAppearanceEnabled) return null;
  return readStoredAppearance(raw);
}

/** Palettes that can be shown to a customer under this scheme. */
export function visiblePalettes(scheme: AppearanceScheme): PaletteName[] {
  return scheme === "auto" ? ["light", "dark"] : [scheme];
}

/**
 * Contrast of the essential states: body and label text, errors, button
 * labels, prices, and the focus ring. "error" blocks saving; "warning" is
 * shown in the editor only.
 */
export function auditContrast(appearance: AdvancedAppearance): ContrastIssue[] {
  const issues: ContrastIssue[] = [];
  const round = (ratio: number) => Math.round(ratio * 100) / 100;
  const add = (palette: PaletteName, token: ContrastIssue["token"], ratio: number, min: number, warnBelow: number, what: string) => {
    const name = palette === "light" ? "Light" : "Dark";
    if (ratio < min) issues.push({ level: "error", palette, token, ratio: round(ratio), message: `${name} palette: ${what} is ${round(ratio)}:1. It needs at least ${min}:1 to stay readable.` });
    else if (ratio < warnBelow) issues.push({ level: "warning", palette, token, ratio: round(ratio), message: `${name} palette: ${what} is ${round(ratio)}:1. ${warnBelow}:1 or more reads better.` });
  };

  for (const name of visiblePalettes(appearance.scheme)) {
    const p = appearance[name];
    const derived = derivePalette(appearance.primary, p);
    add(name, "text", contrastBetween(p.text, p.surface), 4.5, 7, "text on the form surface");
    add(name, "muted", contrastBetween(p.muted, p.surface), 4.5, 4.5, "muted text on the form surface");
    add(name, "muted", contrastBetween(p.muted, derived.field), 4.5, 4.5, "placeholder text in fields");
    add(name, "muted", contrastBetween(p.muted, derived.subtle), 4.5, 4.5, "the disclaimer and breakdown text on tinted panels");
    add(name, "error", contrastBetween(p.error, derived.errorSoft), 4.5, 4.5, "error messages");
    add(name, "accent", contrastBetween(p.accent, derived.accentSoft), 4.5, 4.5, "the quoted price on its accent panel");
    add(name, "focus", contrastBetween(p.focus, p.surface), 3, 3, "the focus ring against the form surface");
    if (appearance.surfaces.buttonStyle === "outline") {
      add(name, "primary", contrastBetween(appearance.primary, p.surface), 4.5, 4.5, "outline button text");
    } else {
      add(name, "primary", contrastBetween(appearance.primary, p.surface), 1, 3, "the button edge against the form surface");
    }
  }
  if (appearance.surfaces.buttonStyle === "solid") {
    const ratio = contrastBetween(readableForeground(appearance.primary), appearance.primary);
    const level = ratio < 3 ? "error" : ratio < 4.5 ? "warning" : null;
    if (level) {
      issues.push({
        level, palette: "light", token: "primary", ratio: round(ratio),
        message: `Button labels on the primary color are ${round(ratio)}:1. ${level === "error" ? "They need at least 3:1." : "Aim for 4.5:1 or more."}`,
      });
    }
  }
  return issues;
}

// ---------------------------------------------------------------------------
// Resolver: tokens -> CSS custom properties
// ---------------------------------------------------------------------------

function channels(color: string): [number, number, number] {
  const h = sanitizeHex(color) ?? "#000000";
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
}

/** `weight` of `top` blended over `base`, as #RRGGBB. */
export function mixHex(top: string, base: string, weight: number): string {
  const a = channels(top);
  const b = channels(base);
  return "#" + a.map((c, i) => Math.round(c * weight + b[i] * (1 - weight)).toString(16).padStart(2, "0")).join("").toUpperCase();
}

function alpha(color: string, value: number): string {
  const [r, g, b] = channels(color);
  return `rgba(${r}, ${g}, ${b}, ${value})`;
}

/** Colors derived from a palette so merchants set 8 tokens, not 20. */
export function derivePalette(primary: string, p: Palette) {
  const dark = isDarkColor(p.surface);
  return {
    tone: dark ? ("dark" as const) : ("light" as const),
    field: mixHex(p.text, p.surface, dark ? 0.06 : 0.02),
    subtle: mixHex(p.text, p.surface, dark ? 0.05 : 0.03),
    subtleStrong: mixHex(p.text, p.surface, dark ? 0.1 : 0.07),
    borderStrong: mixHex(p.text, p.border, 0.2),
    accentSoft: mixHex(p.accent, p.surface, 0.12),
    accentBorder: mixHex(p.accent, p.surface, 0.35),
    errorSoft: mixHex(p.error, p.surface, 0.1),
    errorBorder: mixHex(p.error, p.surface, 0.3),
    focusRing: alpha(p.focus, 0.45),
    primarySoft: alpha(primary, 0.1),
    shadowColor: dark ? "rgba(0, 0, 0, 0.55)" : "rgba(15, 23, 42, 0.30)",
  };
}

const DENSITY_VARS = {
  compact: { field: "0.625rem", body: "20px", gap: "14px" },
  comfortable: { field: "0.8125rem", body: "26px", gap: "18px" },
  spacious: { field: "1rem", body: "32px", gap: "24px" },
} as const;

const SHADOW_SHAPES = {
  none: null,
  soft: "0 18px 50px -32px",
  lifted: "0 32px 80px -30px",
} as const;

export type ResolvedAppearance = {
  /** CSS custom properties for the shell element. */
  vars: Record<string, string>;
  /** Data attributes the theme stylesheet keys on. */
  attrs: Record<string, string>;
  /** Root font size in px (type scale). */
  rootFontPx: number;
  primary: string;
  /** Surface tone per palette, from the surface color's luminance. */
  tone: Record<PaletteName, "light" | "dark">;
};

/**
 * The single path from tokens to rendering. Preview and live forms both call
 * this, so identical tokens always produce identical output.
 */
export function resolveAppearance(appearance: AdvancedAppearance): ResolvedAppearance {
  const vars: Record<string, string> = {};
  const tone = {} as ResolvedAppearance["tone"];
  for (const name of ["light", "dark"] as const) {
    const p = appearance[name];
    const d = derivePalette(appearance.primary, p);
    const prefix = name === "light" ? "--qa-l-" : "--qa-d-";
    for (const key of PALETTE_KEYS) vars[`${prefix}${key}`] = p[key];
    vars[`${prefix}field`] = d.field;
    vars[`${prefix}subtle`] = d.subtle;
    vars[`${prefix}subtle-strong`] = d.subtleStrong;
    vars[`${prefix}border-strong`] = d.borderStrong;
    vars[`${prefix}accent-soft`] = d.accentSoft;
    vars[`${prefix}accent-border`] = d.accentBorder;
    vars[`${prefix}error-soft`] = d.errorSoft;
    vars[`${prefix}error-border`] = d.errorBorder;
    vars[`${prefix}focus-ring`] = d.focusRing;
    vars[`${prefix}primary-soft`] = d.primarySoft;
    const shape = SHADOW_SHAPES[appearance.surfaces.shadow];
    vars[`${prefix}shadow`] = shape ? `${shape} ${d.shadowColor}` : "none";
    vars[`${prefix}card-border`] = appearance.surfaces.border === "defined" ? d.borderStrong : p.border;
    tone[name] = d.tone;
  }

  const { radius, density, contentWidth } = appearance.layout;
  const spacing = DENSITY_VARS[density];
  vars["--qa-primary"] = appearance.primary;
  vars["--qa-primary-ink"] = readableForeground(appearance.primary);
  vars["--qa-radius"] = `${radius}px`;
  vars["--qa-radius-card"] = `${Math.min(Math.round(radius * 1.5), 32)}px`;
  vars["--qa-radius-button"] = appearance.surfaces.buttonShape === "pill" ? "999px" : `${radius}px`;
  vars["--qa-field-py"] = spacing.field;
  vars["--qa-body-pad"] = spacing.body;
  vars["--qa-gap"] = spacing.gap;
  vars["--qa-card-border-width"] = appearance.surfaces.border === "none" ? "0px" : "1px";
  vars["--qa-max-width"] = contentWidth === "auto" ? "none" : `${contentWidth}px`;
  vars["--qa-font-body"] = FONTS[appearance.typography.body].stack;
  vars["--qa-font-heading"] = FONTS[appearance.typography.heading].stack;

  return {
    vars,
    attrs: {
      "data-qa-scheme": appearance.scheme,
      "data-qa-button": appearance.surfaces.buttonStyle,
      "data-qa-width": contentWidth === "auto" ? "auto" : "fixed",
    },
    rootFontPx: (16 * appearance.typography.scale) / 100,
    primary: appearance.primary,
    tone,
  };
}
