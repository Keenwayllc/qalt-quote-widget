"use client";

import { Check, Zap } from "lucide-react";

export type ServiceOption = {
  name: string;
  description?: string;
  fee: number;
};

export default function ServiceSelector({
  options,
  value,
  onChange,
  primaryColor,
}: {
  options: ServiceOption[];
  value: string;
  onChange: (name: string) => void;
  primaryColor: string;
}) {
  if (options.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 ml-0.5">
        <Zap size={12} className="text-slate-400" /> Delivery service
      </p>
      <div className="grid grid-cols-1 gap-2.5">
        {options.map((option) => {
          const selected = value === option.name;
          return (
            <button
              key={option.name}
              type="button"
              onClick={() => onChange(option.name)}
              aria-pressed={selected}
              className={`relative w-full overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 ${
                selected
                  ? "border-transparent shadow-md"
                  : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white"
              }`}
              style={selected ? { borderColor: primaryColor } : undefined}
            >
              {selected && (
                <span
                  className="absolute inset-0 opacity-[0.08]"
                  style={{ backgroundColor: primaryColor }}
                />
              )}
              <span className="relative flex items-start gap-3">
                <span className="min-w-0 flex-1">
                  <span className={`block text-[13px] font-extrabold ${selected ? "text-slate-900" : "text-slate-700"}`}>
                    {option.name}
                  </span>
                  {option.description && (
                    <span className="mt-0.5 block text-[11px] font-medium leading-relaxed text-slate-400">
                      {option.description}
                    </span>
                  )}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  {option.fee > 0 && (
                    <span className={`text-[11px] font-bold ${selected ? "text-slate-700" : "text-slate-400"}`}>
                      +${option.fee.toFixed(2)}
                    </span>
                  )}
                  {selected && (
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
