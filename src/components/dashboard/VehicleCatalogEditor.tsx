"use client";

import { useMemo, useState } from "react";
import { Check, Plus, Save, Trash2, Truck } from "lucide-react";

type VehicleOption = {
  key: string;
  name: string;
  fee: string;
};

type VehiclePreset = Omit<VehicleOption, "key">;
type SaveState = "idle" | "saving" | "saved" | "error";

const PRESETS: VehiclePreset[] = [
  { name: "Bicycle", fee: "0" },
  { name: "Cargo Bike", fee: "0" },
  { name: "Electric Bicycle", fee: "0" },
  { name: "Scooter", fee: "0" },
  { name: "Electric Scooter", fee: "0" },
  { name: "Motorcycle", fee: "0" },
  { name: "Sedan", fee: "0" },
  { name: "Hatchback", fee: "0" },
  { name: "SUV", fee: "0" },
  { name: "Minivan", fee: "0" },
  { name: "Pickup Truck", fee: "0" },
  { name: "Cargo Van", fee: "0" },
  { name: "High-Roof Cargo Van", fee: "0" },
  { name: "Sprinter Van", fee: "0" },
  { name: "Straight Truck", fee: "0" },
  { name: "Box Truck - 16 ft", fee: "0" },
  { name: "Box Truck - 20 ft", fee: "0" },
  { name: "Box Truck - 24 ft", fee: "0" },
  { name: "Box Truck - 26 ft", fee: "0" },
  { name: "Flatbed / Stake Bed", fee: "0" },
  { name: "Refrigerated Van / Truck", fee: "0" },
  { name: "Tractor Trailer - 28 ft", fee: "0" },
  { name: "Tractor Trailer - 45 ft", fee: "0" },
  { name: "Tractor Trailer - 47 ft", fee: "0" },
  { name: "Tractor Trailer - 48 ft", fee: "0" },
  { name: "Tractor Trailer - 53 ft", fee: "0" },
  { name: "Doubles", fee: "0" },
  { name: "Triples", fee: "0" },
];

const makeKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `vehicle-${Date.now()}-${Math.random().toString(36).slice(2)}`;

function cleanInitial(value: unknown): VehicleOption[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((raw, index) => {
    if (!raw || typeof raw !== "object") return [];
    const item = raw as Record<string, unknown>;
    const name = String(item.name ?? "").trim();
    if (!name) return [];
    const fee = Number(item.fee);
    return [{
      key: `saved-${index}`,
      name,
      fee: Number.isFinite(fee) && fee >= 0 ? String(fee) : "0",
    }];
  });
}

function parseFee(value: string): number {
  const fee = Number(value);
  if (!Number.isFinite(fee) || fee < 0) return 0;
  return Math.min(fee, 100000);
}

export default function VehicleCatalogEditor({
  initialOptions,
  formId,
}: {
  initialOptions?: unknown;
  formId?: string;
}) {
  const [options, setOptions] = useState<VehicleOption[]>(() => cleanInitial(initialOptions));
  const [status, setStatus] = useState<SaveState>("idle");
  const [validationError, setValidationError] = useState("");

  const usedNames = useMemo(
    () => new Set(options.map((option) => option.name.trim().toLocaleLowerCase()).filter(Boolean)),
    [options]
  );

  const duplicateNames = useMemo(() => {
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    for (const option of options) {
      const normalized = option.name.trim().toLocaleLowerCase();
      if (!normalized) continue;
      if (seen.has(normalized)) duplicates.add(normalized);
      seen.add(normalized);
    }
    return duplicates;
  }, [options]);

  const updateOption = (key: string, field: "name" | "fee", value: string) => {
    if (field === "fee" && value !== "" && !/^\d{0,6}(?:\.\d{0,2})?$/.test(value)) return;
    setValidationError("");
    setOptions((current) =>
      current.map((option) => option.key === key ? { ...option, [field]: value } : option)
    );
  };

  const addPreset = (preset: VehiclePreset) => {
    if (options.length >= 40 || usedNames.has(preset.name.toLocaleLowerCase())) return;
    setOptions((current) => [...current, { key: makeKey(), ...preset }]);
  };

  const addBlank = () => {
    if (options.length >= 40) return;
    setOptions((current) => [...current, { key: makeKey(), name: "", fee: "" }]);
  };

  const removeOption = (key: string) => {
    setValidationError("");
    setOptions((current) => current.filter((option) => option.key !== key));
  };

  const save = async () => {
    if (options.some((option) => !option.name.trim())) {
      setValidationError("Every vehicle type needs a name before you can save.");
      return;
    }
    if (duplicateNames.size > 0) {
      setValidationError("Vehicle names must be unique.");
      return;
    }

    setStatus("saving");
    setValidationError("");
    try {
      const res = await fetch("/api/dashboard/widget", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: formId ?? undefined,
          vehicleOptions: options.map((option) => ({
            name: option.name.trim(),
            fee: parseFee(option.fee),
          })),
        }),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
    window.setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="mt-6 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50/60 dark:bg-zinc-800/40 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Truck size={17} className="text-red-600" />
            Vehicle Types
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400 max-w-2xl">
            Choose the vehicles your company operates. Each vehicle can have its own per-vehicle charge. A $0 vehicle uses the default Price Per Vehicle above.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={status === "saving"}
          className={`shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition disabled:opacity-60 ${status === "saved" ? "bg-emerald-600 text-white" : status === "error" ? "bg-red-50 text-red-600 border border-red-300" : "bg-red-600 hover:bg-red-700 text-white"}`}
        >
          {status === "saving" ? "Saving…" : status === "saved" ? <><Check size={14} /> Saved</> : status === "error" ? "Failed. Retry" : <><Save size={14} /> Save vehicles</>}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const used = usedNames.has(preset.name.toLocaleLowerCase());
          return (
            <button
              key={preset.name}
              type="button"
              disabled={used || options.length >= 40}
              onClick={() => addPreset(preset)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-[11px] font-bold text-slate-700 dark:text-zinc-200 hover:border-red-300 hover:text-red-600 disabled:opacity-40 transition-colors"
            >
              {used ? "✓ " : "+ "}{preset.name}
            </button>
          );
        })}
      </div>

      {validationError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
          {validationError}
        </div>
      )}

      <div className="mt-5 space-y-3">
        {options.map((option) => {
          const normalized = option.name.trim().toLocaleLowerCase();
          const duplicate = Boolean(normalized && duplicateNames.has(normalized));
          return (
            <div key={option.key} className="grid grid-cols-1 sm:grid-cols-[1fr_180px_40px] gap-3 items-end rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3">
              <div>
                <label htmlFor={`vehicle-name-${option.key}`} className="block text-[11px] font-bold text-slate-500 dark:text-zinc-400 mb-1.5">Vehicle type</label>
                <input
                  id={`vehicle-name-${option.key}`}
                  type="text"
                  maxLength={80}
                  value={option.name}
                  onChange={(e) => updateOption(option.key, "name", e.target.value)}
                  aria-invalid={duplicate}
                  placeholder="e.g. Cargo Van"
                  className={`w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-zinc-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${duplicate ? "border-red-400" : "border-slate-300 dark:border-zinc-600"}`}
                />
              </div>
              <div>
                <label htmlFor={`vehicle-fee-${option.key}`} className="block text-[11px] font-bold text-slate-500 dark:text-zinc-400 mb-1.5">Per-vehicle charge</label>
                <div className="flex w-full overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-red-500 dark:border-zinc-600 dark:bg-zinc-800">
                  <span className="flex shrink-0 items-center justify-center border-r border-slate-200 px-3 text-sm font-semibold text-slate-400 dark:border-zinc-600" aria-hidden="true">$</span>
                  <input
                    id={`vehicle-fee-${option.key}`}
                    type="text"
                    inputMode="decimal"
                    value={option.fee}
                    onChange={(e) => updateOption(option.key, "fee", e.target.value)}
                    placeholder="0.00"
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeOption(option.key)}
                className="h-[42px] flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                aria-label={`Remove ${option.name || "vehicle"}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 dark:border-zinc-700 pt-4">
        <p className="text-[11px] text-slate-400 dark:text-zinc-500">Up to 40 vehicle types. Customers choose one type and the number of vehicles they need.</p>
        <button
          type="button"
          onClick={addBlank}
          disabled={options.length >= 40}
          className="shrink-0 inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 disabled:opacity-40"
        >
          <Plus size={14} /> Add vehicle
        </button>
      </div>
    </div>
  );
}
