"use client";

import { useState } from "react";
import type { CustomQuestion } from "@/lib/form-questions";
import FormOptionsEditor, { type FormFields, type FormTemplate, type VehicleDraft, validateEditorOptions } from "./FormOptionsEditor";
import { parseVehicleArtworkKey } from "@/lib/form-vehicles";

export type ConfigurableForm = {
  id: string;
  name: string;
  formStyle: FormTemplate;
  showWeight: boolean;
  showItemCount: boolean;
  showExtras: boolean;
  showAwb: boolean;
  vehicleOptions: unknown;
  customQuestions: unknown;
};

function savedVehicles(value: unknown): VehicleDraft[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => item && typeof item === "object" && typeof item.name === "string"
    ? [{ name: item.name, fee: String(item.fee ?? 0), artwork: parseVehicleArtworkKey(item.artwork) }]
    : []);
}

export default function FormSettingsPanel({ form, canUseAwb, onSaved }: {
  form: ConfigurableForm;
  canUseAwb: boolean;
  onSaved: (form: ConfigurableForm) => void;
}) {
  const [template, setTemplate] = useState<FormTemplate>(form.formStyle);
  const [fields, setFields] = useState<FormFields>({
    showWeight: form.showWeight,
    showItemCount: form.showItemCount,
    showExtras: form.showExtras,
    showAwb: form.showAwb,
  });
  const [questions, setQuestions] = useState<CustomQuestion[]>(Array.isArray(form.customQuestions) ? form.customQuestions as CustomQuestion[] : []);
  const [vehicles, setVehicles] = useState<VehicleDraft[]>(() => savedVehicles(form.vehicleOptions));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const save = async () => {
    const error = validateEditorOptions(template, questions, vehicles);
    if (error) { setMessage(error); return; }
    setSaving(true);
    setMessage("");
    try {
      const payload = template === "quick"
        ? { formStyle: template, vehicleOptions: vehicles.map((vehicle) => ({ name: vehicle.name.trim(), fee: Number(vehicle.fee) || 0,
          ...(vehicle.artwork ? { artwork: vehicle.artwork } : {}) })) }
        : { formStyle: template, fields, ...(template === "extended" ? { customQuestions: questions } : {}) };
      const res = await fetch(`/api/dashboard/forms/${form.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setMessage(data.error || "Could not save selections."); return; }
      onSaved(data.form);
      setMessage("Selections saved. Your live form is updated.");
    } catch {
      setMessage("Could not save selections. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 border-t border-slate-200 pt-5 dark:border-white/10">
      <fieldset>
        <legend className="mb-2 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Choose this form&apos;s template</legend>
        <div className="flex flex-wrap gap-2">
          {(["standard", "extended", "quick"] as const).map((choice) => (
            <button key={choice} type="button" aria-pressed={template === choice} onClick={() => { setTemplate(choice); setMessage(""); }}
              className={`rounded-lg border px-4 py-2 text-xs font-black ${template === choice
                ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                : "border-slate-200 text-slate-700 dark:border-white/10 dark:text-slate-300"}`}>
              {choice === "quick" ? "Vehicle Options" : choice === "extended" ? "Extended" : "Standard"}
            </button>
          ))}
        </div>
        {template !== form.formStyle && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Switching templates keeps this form&apos;s embed code, appearance, and pricing.</p>}
      </fieldset>
      <FormOptionsEditor template={template} fields={fields} onFieldsChange={setFields}
        questions={questions} onQuestionsChange={setQuestions} vehicles={vehicles} onVehiclesChange={setVehicles} canUseAwb={canUseAwb} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-xs font-semibold text-slate-600 dark:text-slate-300">{message}</p>
        <button type="button" onClick={save} disabled={saving}
          className="rounded-lg bg-red-600 px-5 py-2.5 text-xs font-black text-white hover:bg-red-500 disabled:opacity-50">
          {saving ? "Saving…" : "Save selections"}
        </button>
      </div>
    </div>
  );
}
