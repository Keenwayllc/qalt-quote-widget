"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Palette } from "lucide-react";

const BRAND_PRESETS = [
  { name: "Crimson", value: "#DF1731" },
  { name: "Cobalt", value: "#3159CA" },
  { name: "Evergreen", value: "#087C68" },
  { name: "Violet", value: "#7950BF" },
] as const;

function setReactInputValue(input: HTMLInputElement, value: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;

  if (valueSetter) valueSetter.call(input, value);
  else input.value = value;

  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

export default function BrandColorPresets() {
  const [portalHost, setPortalHost] = useState<HTMLDivElement | null>(null);
  const [selectedColor, setSelectedColor] = useState("");

  const presetValues = useMemo(
    () => new Set(BRAND_PRESETS.map((preset) => preset.value.toLowerCase())),
    []
  );

  useEffect(() => {
    const colorInput = document.querySelector<HTMLInputElement>(
      'input#primaryColor[name="primaryColor"]'
    );
    if (!colorInput) return;

    const fieldRow = colorInput.parentElement;
    const fieldSection = fieldRow?.parentElement;
    if (!fieldRow || !fieldSection) return;

    const host = document.createElement("div");
    host.dataset.qaltBrandPresets = "true";
    fieldSection.insertBefore(host, fieldRow);
    setPortalHost(host);

    const syncSelectedColor = () => {
      setSelectedColor(colorInput.value.trim().toLowerCase());
    };

    syncSelectedColor();
    colorInput.addEventListener("input", syncSelectedColor);
    colorInput.addEventListener("change", syncSelectedColor);

    return () => {
      colorInput.removeEventListener("input", syncSelectedColor);
      colorInput.removeEventListener("change", syncSelectedColor);
      host.remove();
    };
  }, []);

  if (!portalHost) return null;

  const applyPreset = (value: string) => {
    const colorInput = document.querySelector<HTMLInputElement>(
      'input#primaryColor[name="primaryColor"]'
    );
    if (!colorInput) return;

    setReactInputValue(colorInput, value);
    colorInput.focus({ preventScroll: true });
  };

  return createPortal(
    <div className="mb-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3.5 dark:border-white/[0.07] dark:bg-white/[0.025]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Palette size={15} className="text-slate-400" />
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Try a brand color
          </span>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          Or use the custom picker below
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {BRAND_PRESETS.map((preset) => {
          const isSelected = selectedColor === preset.value.toLowerCase();

          return (
            <button
              key={preset.value}
              type="button"
              onClick={() => applyPreset(preset.value)}
              aria-pressed={isSelected}
              aria-label={`Use ${preset.name} brand color ${preset.value}`}
              className={`group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 ${
                isSelected
                  ? "border-slate-900 bg-white shadow-sm dark:border-white/40 dark:bg-white/[0.08]"
                  : "border-slate-200 bg-white/70 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-sm dark:border-white/[0.07] dark:bg-white/[0.025] dark:hover:border-white/[0.14] dark:hover:bg-white/[0.05]"
              }`}
            >
              <span
                className={`h-6 w-6 shrink-0 rounded-full border-2 border-white shadow-sm ring-1 ring-black/10 transition-transform group-hover:scale-105 ${
                  isSelected ? "scale-105 ring-2 ring-slate-900/20" : ""
                }`}
                style={{ backgroundColor: preset.value }}
              />
              <span className="min-w-0">
                <span className="block truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {preset.name}
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {preset.value}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {!presetValues.has(selectedColor) && selectedColor && (
        <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span
            className="h-3.5 w-3.5 rounded-full border border-black/10"
            style={{ backgroundColor: selectedColor }}
          />
          Custom color selected: <span className="font-semibold uppercase">{selectedColor}</span>
        </div>
      )}
    </div>,
    portalHost
  );
}
