"use client";

import { Plus, Trash2, Truck } from "lucide-react";
import type { CustomQuestion } from "@/lib/form-questions";
import { MAX_CUSTOM_QUESTIONS, MAX_QUESTION_OPTIONS } from "@/lib/form-questions";
import { inferVehicleArtwork, type VehicleArtworkKey } from "@/lib/form-vehicles";
import VehicleArtworkPicker from "./VehicleArtworkPicker";

export type FormTemplate = "standard" | "extended" | "quick";
export type FormFields = {
  showWeight: boolean;
  showItemCount: boolean;
  showExtras: boolean;
  showAwb: boolean;
};
export type VehicleDraft = { name: string; fee: string; artwork?: VehicleArtworkKey };

const VEHICLES = [
  "Bicycle", "Cargo Bike", "Electric Bicycle", "Scooter", "Electric Scooter", "Moped", "Motorcycle",
  "Sedan", "Hatchback", "SUV", "Minivan", "Pickup Truck", "Cargo Van", "High-Roof Cargo Van",
  "Sprinter Van", "Straight Truck", "Box Truck - 16 ft", "Box Truck - 20 ft", "Box Truck - 24 ft",
  "Box Truck - 26 ft", "Flatbed / Stake Bed", "Refrigerated Van / Truck", "Dump Truck", "Tanker Truck",
  "Roll-Off Truck", "Tractor Trailer - 28 ft", "Tractor Trailer - 40 ft", "Tractor Trailer - 47 ft",
  "Tractor Trailer - 48 ft", "Tractor Trailer - 53 ft", "Flatbed Tractor Trailer", "Doubles", "Triples",
];

const FIELD_CHOICES: { key: keyof FormFields; label: string; detail: string; enterprise?: boolean }[] = [
  { key: "showItemCount", label: "Item count", detail: "Ask how many items are being delivered." },
  { key: "showWeight", label: "Package weight", detail: "Ask for shipment weight in pounds." },
  { key: "showExtras", label: "Delivery add-ons", detail: "Let customers choose stairs and inside delivery." },
  { key: "showAwb", label: "AWB number", detail: "Ask for an air waybill number on airport pickups.", enterprise: true },
];

function makeQuestion(): CustomQuestion {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `question-${Date.now()}`,
    label: "",
    type: "text",
    required: false,
    options: [],
  };
}

export function validateEditorOptions(template: FormTemplate, questions: CustomQuestion[], vehicles: VehicleDraft[]): string | null {
  if (template === "quick") {
    if (vehicles.length === 0) return "Choose at least one vehicle.";
    if (vehicles.some((vehicle) => !vehicle.name.trim())) return "Every vehicle needs a name.";
    const names = vehicles.map((vehicle) => vehicle.name.trim().toLocaleLowerCase());
    if (new Set(names).size !== names.length) return "Vehicle names must be unique.";
    if (vehicles.some((vehicle) => !Number.isFinite(Number(vehicle.fee)) || Number(vehicle.fee) < 0 || Number(vehicle.fee) > 100000)) {
      return "Vehicle charges must be between $0 and $100,000.";
    }
    return null;
  }
  if (template === "extended") {
    if (questions.some((question) => !question.label.trim())) return "Give every custom question a title.";
    if (questions.some((question) => question.type !== "text" &&
      (question.options.filter((option) => option.trim()).length < 2 || question.options.some((option) => !option.trim())))) {
      return "Choice questions need at least two named answers.";
    }
    if (questions.some((question) => question.type !== "text" &&
      new Set(question.options.map((option) => option.trim().toLocaleLowerCase())).size !== question.options.length)) {
      return "Answer choices must be unique within each question.";
    }
  }
  return null;
}

export default function FormOptionsEditor({
  template, fields, onFieldsChange, questions, onQuestionsChange, vehicles, onVehiclesChange, canUseAwb,
}: {
  template: FormTemplate;
  fields: FormFields;
  onFieldsChange: (fields: FormFields) => void;
  questions: CustomQuestion[];
  onQuestionsChange: (questions: CustomQuestion[]) => void;
  vehicles: VehicleDraft[];
  onVehiclesChange: (vehicles: VehicleDraft[]) => void;
  canUseAwb: boolean;
}) {
  const updateQuestion = (id: string, change: Partial<CustomQuestion>) =>
    onQuestionsChange(questions.map((question) => question.id === id ? { ...question, ...change } : question));

  if (template === "quick") {
    return (
      <section className="space-y-4 rounded-xl border border-slate-200 p-4 dark:border-white/10" aria-label="Vehicle choices">
        <div className="flex items-start gap-3">
          <Truck className="mt-0.5 shrink-0 text-red-600" size={18} />
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">Choose the vehicles customers can select</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Add at least one vehicle. Set $0 when it has no extra charge. Choose the matching illustration for renamed or custom vehicles.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {VEHICLES.map((name) => {
            const selected = vehicles.some((vehicle) => vehicle.name === name);
            return (
              <button key={name} type="button" onClick={() => onVehiclesChange(selected
                ? vehicles.filter((vehicle) => vehicle.name !== name)
                : [...vehicles, { name, fee: "0", artwork: inferVehicleArtwork(name) }])}
                className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${selected
                  ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                  : "border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"}`}>
                {selected ? "✓ " : "+ "}{name}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="grid grid-cols-1 items-end gap-3 rounded-lg border border-slate-200 p-3 dark:border-white/10 sm:grid-cols-[minmax(0,1fr)_120px_32px]">
              <label className="min-w-0 text-xs font-bold text-slate-700 dark:text-slate-200">
                Vehicle name
                <input type="text" maxLength={80} value={vehicle.name} onChange={(event) => onVehiclesChange(vehicles.map((item, i) => i === index ? { ...item, name: event.target.value } : item))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-white/10 dark:bg-[#222] dark:text-white" />
              </label>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Extra charge
                <input type="number" min="0" step="0.01" value={vehicle.fee} onChange={(event) => onVehiclesChange(vehicles.map((item, i) => i === index ? { ...item, fee: event.target.value } : item))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-white/10 dark:bg-[#222] dark:text-white" />
              </label>
              <button type="button" aria-label={`Remove ${vehicle.name}`} onClick={() => onVehiclesChange(vehicles.filter((_, i) => i !== index))} className="mb-2 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
              <div className="sm:col-span-2">
                <VehicleArtworkPicker name={vehicle.name} artwork={vehicle.artwork}
                  onChange={(artwork) => onVehiclesChange(vehicles.map((item, i) => i === index ? { ...item, artwork } : item))} />
              </div>
            </div>
          ))}
        </div>
        <button type="button" disabled={vehicles.length >= 40} onClick={() => onVehiclesChange([...vehicles, { name: "", fee: "0" }])}
          className="inline-flex items-center gap-2 text-xs font-bold text-red-600 disabled:opacity-40 dark:text-red-400"><Plus size={14} /> Add your own vehicle</button>
      </section>
    );
  }

  return (
    <div className="space-y-5">
      <fieldset className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
        <legend className="px-1 text-sm font-black text-slate-900 dark:text-white">Choose the built-in fields</legend>
        <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">Pickup, dropoff, date/time, price, and contact details are always included.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {FIELD_CHOICES.map((choice) => (
            <label key={choice.key} className={`flex gap-3 rounded-lg border border-slate-200 p-3 dark:border-white/10 ${choice.enterprise && !canUseAwb ? "opacity-55" : "cursor-pointer"}`}>
              <input type="checkbox" checked={fields[choice.key]} disabled={choice.enterprise && !canUseAwb}
                onChange={(event) => onFieldsChange({ ...fields, [choice.key]: event.target.checked })}
                className="mt-0.5 h-4 w-4 accent-red-600" />
              <span><span className="block text-xs font-bold text-slate-800 dark:text-white">{choice.label}{choice.enterprise && !canUseAwb ? " · Enterprise" : ""}</span>
                <span className="mt-0.5 block text-[11px] text-slate-500 dark:text-slate-400">{choice.detail}</span></span>
            </label>
          ))}
        </div>
      </fieldset>

      {template === "extended" && (
        <section className="rounded-xl border border-slate-200 p-4 dark:border-white/10" aria-label="Custom questions">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Add your own questions</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Ask for a short answer, one choice, or multiple choices. Answers appear with each quote. They do not change its price.</p>
            </div>
            <button type="button" disabled={questions.length >= MAX_CUSTOM_QUESTIONS} onClick={() => onQuestionsChange([...questions, makeQuestion()])}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-black text-white disabled:opacity-40"><Plus size={13} /> Add question</button>
          </div>
          <div className="mt-4 space-y-3">
            {questions.map((question, index) => (
              <div key={question.id} className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-start gap-2">
                  <label className="min-w-0 flex-1 text-xs font-bold text-slate-700 dark:text-slate-200">Question {index + 1}
                    <input type="text" maxLength={120} value={question.label} placeholder="e.g. Is a loading dock available?"
                      onChange={(event) => updateQuestion(question.id, { label: event.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-white/10 dark:bg-[#222] dark:text-white" />
                  </label>
                  <button type="button" aria-label={`Remove question ${index + 1}`} onClick={() => onQuestionsChange(questions.filter((item) => item.id !== question.id))} className="mt-6 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200">Answer type
                    <select value={question.type} onChange={(event) => {
                      const type = event.target.value as CustomQuestion["type"];
                      updateQuestion(question.id, { type, options: type === "text" ? [] : question.options.length >= 2 ? question.options : ["", ""] });
                    }} className="ml-2 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs dark:border-white/10 dark:bg-[#222] dark:text-white">
                      <option value="text">Short answer</option><option value="single">Choose one</option><option value="multiple">Choose multiple</option>
                    </select>
                  </label>
                  <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                    <input type="checkbox" checked={question.required} onChange={(event) => updateQuestion(question.id, { required: event.target.checked })} className="h-4 w-4 accent-red-600" /> Required
                  </label>
                </div>
                {question.type !== "text" && (
                  <div className="mt-3 space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <input type="text" maxLength={80} value={option} placeholder={`Choice ${optionIndex + 1}`}
                          onChange={(event) => updateQuestion(question.id, { options: question.options.map((item, i) => i === optionIndex ? event.target.value : item) })}
                          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 dark:border-white/10 dark:bg-[#222] dark:text-white" />
                        <button type="button" disabled={question.options.length <= 2} aria-label={`Remove choice ${optionIndex + 1}`}
                          onClick={() => updateQuestion(question.id, { options: question.options.filter((_, i) => i !== optionIndex) })}
                          className="text-slate-400 hover:text-red-600 disabled:opacity-30"><Trash2 size={14} /></button>
                      </div>
                    ))}
                    <button type="button" disabled={question.options.length >= MAX_QUESTION_OPTIONS} onClick={() => updateQuestion(question.id, { options: [...question.options, ""] })}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 disabled:opacity-40 dark:text-red-400"><Plus size={13} /> Add answer choice</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
