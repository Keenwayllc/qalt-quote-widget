"use client";

import { useState } from "react";
import { Check, Moon, Sun } from "lucide-react";
import type { WidgetThemeMode } from "@/lib/widget-theme";

export default function WidgetThemeSelector({
  formId,
  initialTheme,
}: {
  formId: string;
  initialTheme: WidgetThemeMode;
}) {
  const [theme, setTheme] = useState<WidgetThemeMode>(initialTheme);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const applyPreviewTheme = (next: WidgetThemeMode) => {
    const studio = document.querySelector<HTMLElement>(".qalt-widget-studio");
    studio?.setAttribute("data-widget-preview-theme", next);
  };

  const chooseTheme = async (next: WidgetThemeMode) => {
    if (next === theme || saving) return;

    const previous = theme;
    setTheme(next);
    setError("");
    applyPreviewTheme(next);
    setSaving(true);

    try {
      const res = await fetch("/api/dashboard/widget-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, themeMode: next }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save the widget theme.");
      }
    } catch (err) {
      setTheme(previous);
      applyPreviewTheme(previous);
      setError(err instanceof Error ? err.message : "Could not save the widget theme.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-4 sm:mx-8 mb-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#181818] p-5 sm:p-6 shadow-sm dark:shadow-none">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Customer form theme
          </p>
          <h2 className="mt-1 text-lg font-black text-slate-900 dark:text-white">
            Choose how the embedded Qalt form looks
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            The selected theme stays consistent through Route, Details, Quote, and Pay &amp; Book before Stripe opens.
          </p>
        </div>

        <div className="inline-flex rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 p-1" role="group" aria-label="Widget theme">
          {([
            { value: "light" as const, label: "Light Form", icon: Sun },
            { value: "dark" as const, label: "Dark Form", icon: Moon },
          ]).map((option) => {
            const active = theme === option.value;
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => chooseTheme(option.value)}
                disabled={saving}
                aria-pressed={active}
                className={`flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#181818] ${
                  active
                    ? "bg-white dark:bg-[#2a2a2a] text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                } disabled:cursor-wait disabled:opacity-70`}
              >
                <Icon size={16} aria-hidden="true" />
                {option.label}
                {active && <Check size={15} className="text-emerald-500" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400" aria-live="polite">
        <span className={`h-2 w-2 rounded-full ${theme === "dark" ? "bg-slate-800 dark:bg-white" : "bg-white border border-slate-300"}`} />
        {saving ? "Saving theme…" : `${theme === "dark" ? "Dark" : "Light"} form is active`}
      </div>

      {error && (
        <p className="mt-3 text-sm font-semibold text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
