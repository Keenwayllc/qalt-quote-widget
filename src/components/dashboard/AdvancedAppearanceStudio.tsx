"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, Check, Lock, Monitor, Moon, RotateCcw, Smartphone, Sun } from "lucide-react";
import {
  BUTTON_SHAPES, BUTTON_STYLES, CARD_BORDERS, DENSITIES, FONTS, FONT_IDS, PALETTE_KEYS, PRESETS, PRESET_IDS,
  RADIUS_MAX, RADIUS_MIN, SHADOWS, TOKEN_LABELS, TYPE_SCALES, WIDTH_MAX, WIDTH_MIN,
  appearanceFromPreset, auditContrast,
  type AdvancedAppearance, type FontId, type PaletteKey, type PaletteName, type PresetId,
} from "@/lib/advanced-appearance";
import { PREVIEW_MESSAGE, PREVIEW_READY } from "@/components/widget/WidgetAppearanceShell";
import styles from "./AdvancedAppearanceStudio.module.css";

const TOKEN_HELP: Record<PaletteKey, string> = {
  accent: "Quoted price, totals, success",
  background: "Behind the form",
  surface: "Form card and fields",
  text: "Headings, values, labels",
  muted: "Hints and placeholders",
  border: "Field and card edges",
  focus: "Keyboard focus ring",
  error: "Error messages",
};

type SaveState = { kind: "idle" | "saving" | "saved" | "error"; message?: string };

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

export default function AdvancedAppearanceStudio({
  formId,
  entitled,
  initialAppearance,
  basicPrimary,
}: {
  formId: string;
  entitled: boolean;
  /** Saved tokens (kept even when the plan no longer renders them). */
  initialAppearance: AdvancedAppearance | null;
  basicPrimary: string;
}) {
  const [saved, setSaved] = useState<AdvancedAppearance | null>(initialAppearance);
  const [draft, setDraft] = useState<AdvancedAppearance | null>(initialAppearance);
  const [palette, setPalette] = useState<PaletteName>(initialAppearance?.scheme === "dark" ? "dark" : "light");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [save, setSave] = useState<SaveState>({ kind: "idle" });
  const [confirmReset, setConfirmReset] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  const dirty = !same(draft, saved);
  const issues = useMemo(() => (draft ? auditContrast(draft) : []), [draft]);
  const blocking = issues.filter((issue) => issue.level === "error");
  const warnings = issues.filter((issue) => issue.level === "warning");

  // Stream the draft into the preview iframe, which renders it through the
  // same resolver the live form uses.
  const post = useCallback(() => {
    frame.current?.contentWindow?.postMessage(
      { type: PREVIEW_MESSAGE, appearance: draft, palette },
      window.location.origin,
    );
  }, [draft, palette]);

  useEffect(() => { post(); }, [post]);
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if ((event.data as { type?: string })?.type === PREVIEW_READY) post();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [post]);

  const update = (change: (current: AdvancedAppearance) => AdvancedAppearance) => {
    setDraft((current) => (current ? { ...change(current), presetId: null } : current));
    setSave({ kind: "idle" });
  };

  const choosePreset = (presetId: PresetId) => {
    setDraft(appearanceFromPreset(presetId, draft?.primary ?? basicPrimary));
    setPalette("light");
    setSave({ kind: "idle" });
  };

  const persist = async () => {
    if (!draft || !entitled || blocking.length) return;
    setSave({ kind: "saving" });
    try {
      const res = await fetch("/api/dashboard/widget-appearance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, appearance: draft }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save the appearance.");
      setSaved(data.appearance);
      setDraft(data.appearance);
      setSave({ kind: "saved", message: "Saved. Live on every embed of this form." });
    } catch (error) {
      setSave({ kind: "error", message: error instanceof Error ? error.message : "Could not save the appearance." });
    }
  };

  const resetToBasic = async () => {
    setSave({ kind: "saving" });
    try {
      const res = await fetch("/api/dashboard/widget-appearance", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Could not reset the appearance.");
      setSaved(null);
      setDraft(null);
      setConfirmReset(false);
      setSave({ kind: "saved", message: "Reset. This form uses your basic branding again." });
    } catch (error) {
      setSave({ kind: "error", message: error instanceof Error ? error.message : "Could not reset the appearance." });
    }
  };

  const locked = !entitled;
  const statusText = locked
    ? saved ? "Saved settings are kept but not shown while you're off Enterprise." : "Preview only. Saving requires Enterprise."
    : save.kind === "saving" ? "Saving…"
    : save.kind === "error" ? save.message
    : dirty ? "Unsaved changes. Customers still see the saved version."
    : save.kind === "saved" ? save.message
    : saved ? "Saved and live." : "Using basic branding.";

  return (
    <section className={`${styles.studio} mx-4 sm:mx-8 mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#181818] dark:shadow-none`} aria-labelledby="advanced-appearance-title">
      <header className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-white/10 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Advanced appearance
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[9px] tracking-[0.14em] text-white dark:bg-white dark:text-slate-900">Enterprise</span>
          </p>
          <h2 id="advanced-appearance-title" className="mt-1 text-lg font-black text-slate-900 dark:text-white">Match the form to your website</h2>
          <p className="mt-1 max-w-xl text-sm text-slate-500 dark:text-slate-400">
            Colors, type, shape and spacing for this form. Your logo, favicon and header text still come from Branding below.
          </p>
        </div>
        {locked && (
          <Link href="/dashboard/billing" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-bold text-white hover:bg-red-500">
            <Lock size={15} aria-hidden="true" /> Upgrade to Enterprise
          </Link>
        )}
      </header>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
        {/* Preview first on small screens so it is never far away. */}
        <div className="order-first lg:order-last">
          <div className="lg:sticky lg:top-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <Segmented
                label="Preview width"
                value={device}
                onChange={setDevice}
                options={[
                  { value: "desktop", label: "Desktop", icon: <Monitor size={14} aria-hidden="true" /> },
                  { value: "mobile", label: "Mobile", icon: <Smartphone size={14} aria-hidden="true" /> },
                ]}
              />
              <Segmented
                label="Preview palette"
                value={palette}
                onChange={setPalette}
                options={[
                  { value: "light", label: "Light", icon: <Sun size={14} aria-hidden="true" /> },
                  { value: "dark", label: "Dark", icon: <Moon size={14} aria-hidden="true" /> },
                ]}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-black/30">
              {dirty && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-900">
                  Unsaved preview
                </span>
              )}
              <div className="mx-auto transition-[max-width] duration-300 motion-reduce:transition-none" style={{ maxWidth: device === "mobile" ? 375 : "100%" }}>
                <iframe
                  ref={frame}
                  src={`/widget/form/${encodeURIComponent(formId)}?preview=appearance`}
                  title="Live preview of this quote form"
                  className="block h-[560px] w-full border-0 lg:h-[720px]"
                  onLoad={post}
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Interactive preview. Quotes you run here are real requests, so use a test address.
            </p>
          </div>
        </div>

        <div className="min-w-0 space-y-6">
          <Group title="Presets" description="Start from a look, then adjust anything.">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PRESET_IDS.map((id) => {
                const preset = PRESETS[id];
                const active = draft?.presetId === id;
                const p = preset.tokens.light;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => choosePreset(id)}
                    aria-pressed={active}
                    className={`rounded-xl border p-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${active ? "border-slate-900 dark:border-white" : "border-slate-200 hover:border-slate-400 dark:border-white/10 dark:hover:border-white/30"}`}
                  >
                    <span className="flex h-10 overflow-hidden rounded-lg border border-black/5" aria-hidden="true">
                      <span className="flex-1" style={{ background: p.background }} />
                      <span className="flex-1" style={{ background: p.surface }} />
                      <span className="flex-1" style={{ background: draft?.primary ?? basicPrimary }} />
                      <span className="flex-1" style={{ background: p.accent }} />
                    </span>
                    <span className="mt-2 flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white" style={{ fontFamily: FONTS[preset.tokens.typography.heading].stack }}>
                      {preset.label} {active && <Check size={14} className="text-emerald-600" aria-hidden="true" />}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-4 text-slate-500 dark:text-slate-400">{preset.description}</span>
                  </button>
                );
              })}
            </div>
            {!draft && (
              <p className="text-sm text-slate-500 dark:text-slate-400">This form uses basic branding. Pick a preset to start.</p>
            )}
          </Group>

          {draft && (
            <fieldset disabled={locked} className="min-w-0 space-y-6 disabled:opacity-70">
              <Group title="Color mode" description="Dark and Match device use the dark palette below.">
                <Segmented
                  label="Customers see"
                  value={draft.scheme}
                  onChange={(scheme) => { update((a) => ({ ...a, scheme })); if (scheme !== "auto") setPalette(scheme); }}
                  options={[
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                    { value: "auto", label: "Match visitor's device" },
                  ]}
                />
              </Group>

              <Group title="Colors" description="Primary fills buttons and the form header in both palettes.">
                <ColorField label="Primary" help="Buttons and header" value={draft.primary} onChange={(primary) => update((a) => ({ ...a, primary }))} />
                <Segmented
                  label="Palette to edit"
                  value={palette}
                  onChange={setPalette}
                  options={[{ value: "light", label: "Light palette" }, { value: "dark", label: "Dark palette" }]}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {PALETTE_KEYS.map((key) => (
                    <ColorField
                      key={`${palette}-${key}`}
                      label={TOKEN_LABELS[key]}
                      help={TOKEN_HELP[key]}
                      value={draft[palette][key]}
                      flagged={issues.some((issue) => issue.palette === palette && issue.token === key)}
                      onChange={(color) => update((a) => ({ ...a, [palette]: { ...a[palette], [key]: color } }))}
                    />
                  ))}
                </div>
                {(blocking.length > 0 || warnings.length > 0) && (
                  <ul className="space-y-1.5" aria-live="polite">
                    {[...blocking, ...warnings].map((issue) => (
                      <li key={issue.message} className={`flex items-start gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${issue.level === "error" ? "bg-rose-50 text-rose-800 dark:bg-rose-500/10 dark:text-rose-300" : "bg-amber-50 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200"}`}>
                        <AlertTriangle size={14} className="mt-px shrink-0" aria-hidden="true" />
                        <span>{issue.level === "error" ? "Fix before saving: " : ""}{issue.message}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Group>

              <Group title="Typography" description="Built-in font stacks. Nothing loads from outside your form.">
                <div className="grid gap-3 sm:grid-cols-2">
                  <FontSelect label="Headings" value={draft.typography.heading} onChange={(heading) => update((a) => ({ ...a, typography: { ...a.typography, heading } }))} />
                  <FontSelect label="Body" value={draft.typography.body} onChange={(body) => update((a) => ({ ...a, typography: { ...a.typography, body } }))} />
                </div>
                <Segmented
                  label="Text size"
                  value={draft.typography.scale}
                  onChange={(scale) => update((a) => ({ ...a, typography: { ...a.typography, scale } }))}
                  options={TYPE_SCALES.map((scale) => ({ value: scale, label: `${scale}%` }))}
                />
              </Group>

              <Group title="Layout" description="Bounded so fields, prices and buttons stay usable on phones.">
                <Range
                  label="Corner radius"
                  value={draft.layout.radius}
                  min={RADIUS_MIN}
                  max={RADIUS_MAX}
                  step={1}
                  unit="px"
                  onChange={(radius) => update((a) => ({ ...a, layout: { ...a.layout, radius } }))}
                />
                <Segmented
                  label="Spacing"
                  value={draft.layout.density}
                  onChange={(density) => update((a) => ({ ...a, layout: { ...a.layout, density } }))}
                  options={DENSITIES.map((value) => ({ value, label: capitalize(value) }))}
                />
                <Segmented
                  label="Content width"
                  value={draft.layout.contentWidth === "auto" ? "auto" : "fixed"}
                  onChange={(mode) => update((a) => ({ ...a, layout: { ...a.layout, contentWidth: mode === "auto" ? "auto" : 560 } }))}
                  options={[{ value: "auto", label: "Form default" }, { value: "fixed", label: "Custom" }]}
                />
                {draft.layout.contentWidth !== "auto" && (
                  <Range
                    label="Maximum width"
                    value={draft.layout.contentWidth}
                    min={WIDTH_MIN}
                    max={WIDTH_MAX}
                    step={8}
                    unit="px"
                    onChange={(contentWidth) => update((a) => ({ ...a, layout: { ...a.layout, contentWidth } }))}
                  />
                )}
              </Group>

              <Group title="Surfaces & buttons">
                <Segmented label="Card border" value={draft.surfaces.border} onChange={(border) => update((a) => ({ ...a, surfaces: { ...a.surfaces, border } }))} options={CARD_BORDERS.map((value) => ({ value, label: capitalize(value) }))} />
                <Segmented label="Shadow" value={draft.surfaces.shadow} onChange={(shadow) => update((a) => ({ ...a, surfaces: { ...a.surfaces, shadow } }))} options={SHADOWS.map((value) => ({ value, label: capitalize(value) }))} />
                <Segmented label="Button style" value={draft.surfaces.buttonStyle} onChange={(buttonStyle) => update((a) => ({ ...a, surfaces: { ...a.surfaces, buttonStyle } }))} options={BUTTON_STYLES.map((value) => ({ value, label: capitalize(value) }))} />
                <Segmented label="Button shape" value={draft.surfaces.buttonShape} onChange={(buttonShape) => update((a) => ({ ...a, surfaces: { ...a.surfaces, buttonShape } }))} options={BUTTON_SHAPES.map((value) => ({ value, label: value === "match" ? "Match corners" : "Pill" }))} />
              </Group>
            </fieldset>
          )}
        </div>
      </div>

      <footer className="flex flex-col gap-3 border-t border-slate-200 p-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className={`text-sm font-semibold ${save.kind === "error" ? "text-rose-700 dark:text-rose-300" : "text-slate-600 dark:text-slate-300"}`} role="status" aria-live="polite">
          {statusText}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {confirmReset ? (
            <>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Remove advanced styling from this form?</span>
              <button type="button" onClick={resetToBasic} className="min-h-11 rounded-xl bg-rose-700 px-4 text-sm font-bold text-white hover:bg-rose-600">Reset to basic</button>
              <button type="button" onClick={() => setConfirmReset(false)} className="min-h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200">Cancel</button>
            </>
          ) : (
            <>
              {saved && (
                <button type="button" onClick={() => setConfirmReset(true)} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                  <RotateCcw size={15} aria-hidden="true" /> Reset to basic
                </button>
              )}
              {dirty && (
                <button type="button" onClick={() => { setDraft(saved); setSave({ kind: "idle" }); }} className="min-h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5">
                  Discard changes
                </button>
              )}
              {!locked && draft && (
                <button
                  type="button"
                  onClick={persist}
                  disabled={!dirty || blocking.length > 0 || save.kind === "saving"}
                  className="min-h-11 rounded-xl bg-red-600 px-5 text-sm font-bold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {save.kind === "saving" ? "Saving…" : "Save appearance"}
                </button>
              )}
            </>
          )}
        </div>
      </footer>
    </section>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Group({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-black text-slate-900 dark:text-white">{title}</h3>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Segmented<T extends string | number>({
  label, value, onChange, options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; icon?: ReactNode }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</span>
      <div role="group" aria-label={label} className="inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-black/20">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={String(option.value)}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${active ? "bg-white text-slate-900 shadow-sm dark:bg-[#2a2a2a] dark:text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
            >
              {option.icon}{option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ColorField({ label, help, value, onChange, flagged = false }: {
  label: string; help: string; value: string; onChange: (value: string) => void; flagged?: boolean;
}) {
  const id = useId();
  const [text, setText] = useState(value);
  const [prev, setPrev] = useState(value);
  if (value !== prev) { setPrev(value); setText(value); }
  const invalid = !/^#[0-9a-fA-F]{6}$/.test(text);

  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        aria-label={`${label} color picker`}
        value={value}
        onChange={(event) => onChange(event.target.value.toUpperCase())}
        className={styles.swatch}
      />
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
          {label}
          {flagged && <AlertTriangle size={12} className="text-amber-600" aria-label="Contrast issue" />}
        </label>
        <input
          id={id}
          value={text}
          spellCheck={false}
          aria-invalid={invalid}
          aria-describedby={`${id}-help`}
          onChange={(event) => {
            const next = event.target.value.trim();
            setText(next);
            if (/^#[0-9a-fA-F]{6}$/.test(next)) onChange(next.toUpperCase());
          }}
          className={`${styles.hex} mt-1 w-full border px-2.5 font-mono text-xs uppercase text-slate-900 dark:text-white ${invalid ? "border-rose-400" : "border-slate-200 dark:border-white/10"}`}
        />
        <p id={`${id}-help`} className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{invalid ? "Use a 6-digit hex like #1E40AF" : help}</p>
      </div>
    </div>
  );
}

function FontSelect({ label, value, onChange }: { label: string; value: FontId; onChange: (value: FontId) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as FontId)}
        className="mt-1 w-full border border-slate-200 px-3 text-sm text-slate-900 dark:border-white/10 dark:text-white"
        style={{ fontFamily: FONTS[value].stack }}
      >
        {FONT_IDS.map((font) => (
          <option key={font} value={font} style={{ fontFamily: FONTS[font].stack }}>{FONTS[font].label}</option>
        ))}
      </select>
    </div>
  );
}

function Range({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</label>
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{value}{unit}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={`${value}${unit}`}
        onChange={(event) => onChange(Number(event.target.value))}
        className={styles.range}
      />
    </div>
  );
}
