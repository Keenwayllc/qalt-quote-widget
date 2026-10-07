"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import WidgetThemeShell from "./WidgetThemeShell";
import type { WidgetThemeMode } from "@/lib/widget-theme";
import { parseAdvancedAppearance, resolveAppearance, type AdvancedAppearance, type PaletteName } from "@/lib/advanced-appearance";
import styles from "./AdvancedAppearance.module.css";

/** Messages between the Advanced appearance editor and its preview iframe. */
export const PREVIEW_MESSAGE = "qalt:appearance-preview";
export const PREVIEW_READY = "qalt:appearance-ready";

const AppearanceContext = createContext<{ primary: string } | null>(null);

/** The advanced primary color when Advanced appearance is rendering. */
export function useWidgetAppearance() {
  return useContext(AppearanceContext);
}

const darkQuery = "(prefers-color-scheme: dark)";
function subscribe(onChange: () => void) {
  const media = window.matchMedia(darkQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** Which palette "auto" resolves to inside this document. */
function useSystemPalette(): PaletteName {
  return useSyncExternalStore(
    subscribe,
    () => (window.matchMedia(darkQuery).matches ? "dark" : "light"),
    () => "light",
  );
}

/**
 * Theme boundary for every hosted quote form. Renders the basic Light/Dark
 * theme unless an effective Advanced appearance is passed (the page has
 * already applied the plan check), in which case the shared resolver's tokens
 * drive AdvancedAppearance.module.css.
 *
 * With allowPreview, the Qalt dashboard (same origin, direct parent window
 * only) can stream unsaved drafts into this iframe. Drafts go through the
 * same parser and resolver as saved settings and are never persisted here.
 */
export default function WidgetAppearanceShell({
  theme,
  appearance,
  allowPreview = false,
  children,
}: {
  theme: WidgetThemeMode;
  appearance: AdvancedAppearance | null;
  allowPreview?: boolean;
  children: ReactNode;
}) {
  // undefined: no draft received, show the saved state.
  const [draft, setDraft] = useState<AdvancedAppearance | null | undefined>(undefined);
  const [previewPalette, setPreviewPalette] = useState<PaletteName | null>(null);
  const systemPalette = useSystemPalette();

  useEffect(() => {
    if (!allowPreview || window.parent === window) return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== window.parent) return;
      const data = event.data as { type?: unknown; appearance?: unknown; palette?: unknown } | null;
      if (!data || data.type !== PREVIEW_MESSAGE) return;
      if (data.appearance === null) {
        setDraft(null);
      } else {
        const parsed = parseAdvancedAppearance(data.appearance, { enforceContrast: false });
        if (parsed.ok) setDraft(parsed.value);
      }
      setPreviewPalette(data.palette === "light" || data.palette === "dark" ? data.palette : null);
    };
    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: PREVIEW_READY }, window.location.origin);
    return () => window.removeEventListener("message", onMessage);
  }, [allowPreview]);

  const active = draft === undefined ? appearance : draft;
  if (!active) {
    const basicTheme = previewPalette ?? theme;
    return <WidgetThemeShell theme={basicTheme}>{children}</WidgetThemeShell>;
  }

  const resolved = resolveAppearance(active);
  const scheme = previewPalette ?? active.scheme;
  const palette: PaletteName = scheme === "auto" ? systemPalette : scheme;

  return (
    <AppearanceContext.Provider value={{ primary: resolved.primary }}>
      <div
        className={styles.shell}
        data-qalt-advanced=""
        data-qalt-widget-theme={resolved.tone[palette]}
        {...resolved.attrs}
        data-qa-scheme={scheme}
        style={resolved.vars as CSSProperties}
      >
        {/* Type scale: the form is sized in rem inside its own document. */}
        <style>{`html{font-size:${resolved.rootFontPx}px}`}</style>
        {children}
      </div>
    </AppearanceContext.Provider>
  );
}
