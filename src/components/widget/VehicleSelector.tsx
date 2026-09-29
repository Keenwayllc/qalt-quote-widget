"use client";

import { Truck } from "lucide-react";
import VehicleArtwork from "./VehicleArtwork";
import type { VehicleArtworkKey } from "@/lib/form-vehicles";

export type VehicleOption = {
  name: string;
  fee: number;
  artwork?: VehicleArtworkKey;
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
        <div className="flex gap-3 overflow-x-auto pb-3 snap-x [scrollbar-width:thin]">
          {options.map((option) => {
            const selected = value === option.name;
            return (
              <button
                key={option.name}
                type="button"
                onClick={() => onChange(option.name)}
                className={`relative min-w-[150px] snap-start rounded-[22px] border px-3 py-4 text-center transition-all active:scale-[0.98] ${selected ? "bg-white shadow-[0_16px_35px_-22px_rgba(15,23,42,.45)]" : "bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300"}`}
                style={selected ? { borderColor: primaryColor, boxShadow: `0 8px 24px -16px ${primaryColor}` } : undefined}
                aria-pressed={selected}
              >
                {selected && <span className="absolute inset-0 rounded-2xl opacity-[0.07]" style={{ backgroundColor: primaryColor }} />}
                <span className="relative mx-auto flex h-[68px] w-full items-center justify-center">
                  <VehicleArtwork name={option.name} artwork={option.artwork} selected={selected} brandColor={primaryColor} />
                </span>
                <span className="relative mt-2 block text-[13px] font-black leading-tight text-slate-800">{option.name}</span>
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
