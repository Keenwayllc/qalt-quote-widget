"use client";

import { useMemo, useState } from "react";
import { BriefcaseBusiness, Check, Plus, Save, Sparkles, Trash2 } from "lucide-react";

type ServiceOption = {
  name: string;
  description: string;
  fee: number;
};

type SaveState = "idle" | "saving" | "saved" | "error";

const PRESETS: ServiceOption[] = [
  { name: "Standard", description: "Economical same-day delivery", fee: 0 },
  { name: "Rush", description: "Priority same-day delivery", fee: 0 },
  { name: "Super Rush", description: "Fastest available delivery service", fee: 0 },
  { name: "Scheduled Route", description: "Pre-scheduled or recurring delivery", fee: 0 },
  { name: "Van / Truck", description: "Oversized shipment requiring a larger vehicle", fee: 0 },
  { name: "White Glove", description: "High-touch handling and delivery", fee: 0 },
  { name: "Legal / Court Filing", description: "Legal documents, filings, or service work", fee: 0 },
  { name: "Medical", description: "Medical supplies, devices, or healthcare delivery", fee: 0 },
  { name: "Floral", description: "Flowers and arrangements requiring careful handling", fee: 0 },
  { name: "Furniture / Oversized", description: "Furniture, art, fixtures, or bulky items", fee: 0 },
  { name: "Freight / LTL", description: "Crates, pallets, and less-than-truckload freight", fee: 0 },
  { name: "Production / Event", description: "Film, studio, event, and meeting logistics", fee: 0 },
];

function cleanInitial(value: unknown): ServiceOption[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((raw) => {
    if (!raw || typeof raw !== "object") return [];
    const item = raw as Record<string, unknown>;
    const name = String(item.name ?? "").trim();
    if (!name) return [];
    const fee = Number(item.fee);
    return [{
      name,
      description: String(item.description ?? ""),
      fee: Number.isFinite(fee) && fee >= 0 ? fee : 0,
    }];
  });
}

export default function ServiceCatalogEditor({
  initialOptions,
  formId,
}: {
  initialOptions?: unknown;
  formId?: string;
}) {
  const [options, setOptions] = useState<ServiceOption[]>(() => cleanInitial(initialOptions));
  const [status, setStatus] = useState<SaveState>("idle");

  const usedNames = useMemo(
    () => new Set(options.map((option) => option.name.trim().toLocaleLowerCase()).filter(Boolean)),
    [options]
  );

  const addBlank = () => {
    if (options.length >= 30) return;
    setOptions((current) => [...current, { name: "", description: "", fee: 0 }]);
  };

  const addPreset = (preset: ServiceOption) => {
    if (options.length >= 30 || usedNames.has(preset.name.toLocaleLowerCase())) return;
    setOptions((current) => [...current, { ...preset }]);
  };

  const updateOption = (index: number, field: keyof ServiceOption, value: string) => {
    setOptions((current) => current.map((option, i) => {
      if (i !== index) return option;
      if (field === "fee") return { ...option, fee: Math.max(0, Number(value) || 0) };
      return { ...option, [field]: value };
    }));
  };

  const removeOption = (index: number) => {
    setOptions((current) => current.filter((_, i) => i !== index));
  };

  const save = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/dashboard/pricing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: formId ?? null,
          serviceOptions: options
            .map((option) => ({
              name: option.name.trim(),
              description: option.description.trim(),
              fee: Math.max(0, Number(option.fee) || 0),
            }))
            .filter((option) => option.name),
        }),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
    window.setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="px-8 pb-8 max-w-4xl">
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-sm p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BriefcaseBusiness className="text-red-600" size={20} />
              Delivery Services
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 max-w-2xl">
              Add the service levels or specialized delivery types your company offers. Customers choose one before Qalt calculates their quote. Each service can add a flat charge on top of your normal pricing.
            </p>
          </div>
          <button
            type="button"
            onClick={save}
            disabled={status === "saving"}
            className={`shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all disabled:opacity-60 ${status === "saved" ? "bg-emerald-600 text-white" : status === "error" ? "bg-red-50 text-red-600 border border-red-300" : "bg-red-600 hover:bg-red-700 text-white"}`}
          >
            {status === "saving" ? "Saving…" : status === "saved" ? <><Check size={15} /> Saved</> : status === "error" ? "Failed. Retry" : <><Save size={15} /> Update</>}
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50/70 dark:bg-zinc-800/60 p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-3">
            <Sparkles size={14} /> Quick add common services
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => {
              const used = usedNames.has(preset.name.toLocaleLowerCase());
              return (
                <button
                  key={preset.name}
                  type="button"
                  disabled={used || options.length >= 30}
                  onClick={() => addPreset(preset)}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-xs font-bold text-slate-700 dark:text-zinc-200 hover:border-red-300 hover:text-red-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700 transition-colors"
                >
                  {used ? "✓ " : "+ "}{preset.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {options.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 px-5 py-8 text-center">
              <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">No delivery services configured yet.</p>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">Your widget will keep its existing behavior until you add and save services.</p>
            </div>
          )}

          {options.map((option, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_130px_40px] gap-3 items-end rounded-xl border border-slate-200 dark:border-zinc-700 p-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-zinc-400 mb-1.5">Service name</label>
                <input
                  type="text"
                  maxLength={80}
                  value={option.name}
                  onChange={(e) => updateOption(index, "name", e.target.value)}
                  placeholder="e.g. Rush"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-zinc-400 mb-1.5">Customer description</label>
                <input
                  type="text"
                  maxLength={180}
                  value={option.description}
                  onChange={(e) => updateOption(index, "description", e.target.value)}
                  placeholder="Short explanation shown in the quote form"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-zinc-400 mb-1.5">Service fee</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    max="100000"
                    step="0.01"
                    value={option.fee || ""}
                    onChange={(e) => updateOption(index, "fee", e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="h-[42px] flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                aria-label={`Remove ${option.name || "service"}`}
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 dark:border-zinc-700 pt-5">
          <p className="text-xs text-slate-400 dark:text-zinc-500">Up to 30 services. A $0 fee uses your normal mileage and other configured charges without an extra service surcharge.</p>
          <button
            type="button"
            onClick={addBlank}
            disabled={options.length >= 30}
            className="shrink-0 flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 disabled:opacity-40"
          >
            <Plus size={16} /> Add service
          </button>
        </div>
      </div>
    </section>
  );
}
