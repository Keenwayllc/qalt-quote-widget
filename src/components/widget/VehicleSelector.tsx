"use client";

import { Truck } from "lucide-react";

export type VehicleOption = {
  name: string;
  fee: number;
};

export default function VehicleSelector({
  options,
  value,
  onChange,
  primaryColor,
  variant = "standard",
}: {
  options: VehicleOption[];
  value: string;
  onChange: (value: string) => void;
  primaryColor: string;
  variant?: "standard" | "quick";
}) {
  if (options.length === 0) return null;

  if (variant === "quick") {
    return (
      <div>
        <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-2 ml-0.5">
          <Truck size={12} className="text-slate-400" /> Choose a vehicle
        </p>
        <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x">
          {options.map((option) => {
            const selected = value === option.name;
            return (
              <button
                key={option.name}
                type="button"
                onClick={() => onChange(option.name)}
                className={`relative min-w-[132px] snap-start rounded-2xl border px-3 py-4 text-center transition-all ${selected ? "bg-white shadow-md" : "bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300"}`}
                style={selected ? { borderColor: primaryColor, boxShadow: `0 8px 24px -16px ${primaryColor}` } : undefined}
              >
                {selected && <span className="absolute inset-0 rounded-2xl opacity-[0.07]" style={{ backgroundColor: primaryColor }} />}
                <span className="relative mx-auto grid h-10 w-10 place-items-center rounded-xl bg-white border border-slate-200 shadow-sm">
                  <Truck size={20} style={{ color: selected ? primaryColor : "#64748b" }} />
                </span>
                <span className="relative mt-2 block text-[12px] font-black leading-tight text-slate-800">{option.name}</span>
                <span className="relative mt-1 block text-[10px] font-bold text-slate-400">
                  {option.fee > 0 ? `+$${option.fee.toFixed(2)}` : "Included"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-2 ml-0.5">
        <Truck size={12} className="text-slate-400" /> Vehicle type
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {options.map((option) => {
          const selected = value === option.name;
          return (
            <button
              key={option.name}
              type="button"
              onClick={() => onChange(option.name)}
              className={`relative flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${selected ? "shadow-md" : "bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300"}`}
              style={selected ? { borderColor: primaryColor } : undefined}
            >
              {selected && (
                <span className="absolute inset-0 rounded-2xl opacity-[0.08]" style={{ backgroundColor: primaryColor }} />
              )}
              <span className={`relative text-[13px] font-bold ${selected ? "text-slate-900" : "text-slate-600"}`}>
                {option.name}
              </span>
              {option.fee > 0 && (
                <span className="relative shrink-0 text-[11px] font-bold text-slate-400">
                  +{`$${option.fee.toFixed(2)}`}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
