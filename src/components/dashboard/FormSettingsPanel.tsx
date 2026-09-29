"use client";

import { useState } from "react";
import type { CustomQuestion } from "@/lib/form-questions";
import FormOptionsEditor, { type FormFields, type FormTemplate, type VehicleDraft, validateEditorOptions } from "./FormOptionsEditor";

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
    ? [{ name: item.name, fee: String(item.fee ?? 0) }]
    : []);
}

export default function FormSettingsPanel({ form, canUseAwb, onSaved }: {
  form: ConfigurableForm;
  canUseAwb: boolean;
  onSaved: (form: ConfigurableForm) => void;
}) {
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
    const error = validateEditorOptions(form.formStyle, questions, vehicles);
    if (error) { setMessage(error); return; }
    setSaving(true);
    setMessage("");
    try {
      const payload = form.formStyle === "quick"
        ? { vehicleOptions: vehicles.map((vehicle) => ({ name: vehicle.name.trim(), fee: Number(vehicle.fee) || 0 })) }
        : { fields, ...(form.formStyle === "extended" ? { customQuestions: questions } : {}) };
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
      <FormOptionsEditor template={form.formStyle} fields={fields} onFieldsChange={setFields}
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
