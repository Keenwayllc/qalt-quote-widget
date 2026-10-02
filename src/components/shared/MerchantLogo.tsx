"use client";

/* eslint-disable @next/next/no-img-element -- merchant logos are remote uploads rendered as-is */
import { useEffect, useLayoutEffect, useState } from "react";
import { LOGO_TONES, pickLogoTone, type LogoBackdrop, type LogoTone } from "@/lib/logo-plate";

/**
 * Renders a merchant logo so it stays visible on the surface behind it.
 * The uploaded artwork is never recolored; a light logo on a light surface
 * (or a dark logo on a dark one) sits on a small contrast plate instead.
 *
 * Tone comes from /api/logo-tone (server-side, because the upload bucket
 * doesn't allow cross-origin canvas reads) and is cached per browser.
 *
 * surface:
 *   "light" | "dark"  fixed surface, e.g. the white quote form header
 *   "theme"           follows the dashboard's .dark class
 *   "widget"          follows the quote form's Light/Dark theme
 *                     (data-qalt-widget-theme on WidgetThemeShell)
 */
export type LogoSurface = "light" | "dark" | "theme" | "widget";

const memory = new Map<string, LogoTone>();
const STORAGE_PREFIX = "qalt-logo-tone:";

function readCached(src: string): LogoTone | null {
  const hit = memory.get(src);
  if (hit) return hit;
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + src) as LogoTone | null;
    if (stored && LOGO_TONES.includes(stored)) {
      memory.set(src, stored);
      return stored;
    }
  } catch {}
  return null;
}

// Reading the cached tone before paint keeps the plate from flashing in.
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useLogoTone(src: string | null | undefined, backdrop?: LogoBackdrop | null): LogoTone | null {
  const [tone, setTone] = useState<LogoTone | null>(null);

  useBeforePaint(() => {
    if (!src) return;
    const cached = readCached(src);
    if (cached) {
      setTone(cached);
      return;
    }
    let active = true;
    fetch(`/api/logo-tone?src=${encodeURIComponent(src)}`)
      .then((res) => (res.ok ? res.json() : { tone: "unknown" }))
      .then(({ tone: next }: { tone: LogoTone }) => {
        const value = LOGO_TONES.includes(next) ? next : "unknown";
        memory.set(src, value);
        if (value !== "unknown") {
          try { localStorage.setItem(STORAGE_PREFIX + src, value); } catch {}
        }
        if (active) setTone(value);
      })
      .catch(() => { if (active) setTone("unknown"); });
    return () => { active = false; };
  }, [src]);

  if (!src || !tone) return null;
  return pickLogoTone(tone, backdrop);
}

const PLATE_DARK = "bg-slate-900 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]";
const PLATE_LIGHT = "bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]";

/**
 * Background for a whole container (e.g. the dashboard sidebar header) that
 * holds a logo on the dashboard's themed surface. Same rule as the plate,
 * without the padding and rounding.
 */
export function logoSurfaceClasses(tone: LogoTone | null): string {
  if (tone === "light") return "bg-slate-900 dark:bg-transparent";
  if (tone === "dark") return "dark:bg-white";
  return "";
}

/** Class names for the plate around a logo of this tone on this surface. */
export function logoPlateClasses(tone: LogoTone | null, surface: LogoSurface, padded = true): string {
  const pad = padded ? "px-2.5 py-1.5" : "";
  const darkPad = padded ? "dark:px-2.5 dark:py-1.5" : "";
  if (surface === "light") return tone === "light" ? `rounded-lg ${pad} ${PLATE_DARK}` : "";
  if (surface === "dark") return tone === "dark" ? `rounded-lg ${pad} ${PLATE_LIGHT}` : "";
  if (surface === "widget") {
    if (tone === "light") return `rounded-lg ${pad} ${PLATE_DARK} [[data-qalt-widget-theme=dark]_&]:bg-transparent [[data-qalt-widget-theme=dark]_&]:shadow-none [[data-qalt-widget-theme=dark]_&]:p-0`;
    if (tone === "dark") return `rounded-lg ${padded ? "[[data-qalt-widget-theme=dark]_&]:px-2.5 [[data-qalt-widget-theme=dark]_&]:py-1.5" : ""} [[data-qalt-widget-theme=dark]_&]:bg-white [[data-qalt-widget-theme=dark]_&]:shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]`;
    return "";
  }
  // theme: light surface by default, dark surface under .dark
  if (tone === "light") return `rounded-lg ${pad} ${PLATE_DARK} dark:bg-transparent dark:shadow-none dark:p-0`;
  if (tone === "dark") return `rounded-lg ${darkPad} dark:bg-white dark:shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]`;
  return "";
}

export default function MerchantLogo({
  src,
  alt,
  surface = "theme",
  className = "",
  frameClassName = "",
  padded = true,
  backdrop,
}: {
  src: string;
  /** Merchant override from Widget Appearance; "auto" uses detection. */
  backdrop?: LogoBackdrop | null;
  alt: string;
  surface?: LogoSurface;
  /** Classes for the <img> (size, object-fit). */
  className?: string;
  /** Extra classes for the wrapper (layout). */
  frameClassName?: string;
  /** Pad the plate. Turn off for fixed-size avatars. */
  padded?: boolean;
}) {
  const tone = useLogoTone(src, backdrop);
  return (
    <span
      data-logo-tone={tone ?? "pending"}
      className={`inline-flex max-w-full items-center transition-[background-color,padding] duration-200 ${logoPlateClasses(tone, surface, padded)} ${frameClassName}`}
    >
      <img src={src} alt={alt} className={className} />
    </span>
  );
}
