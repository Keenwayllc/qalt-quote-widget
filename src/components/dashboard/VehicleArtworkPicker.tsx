import VehicleArtwork from "@/components/widget/VehicleArtwork";
import { VEHICLE_ARTWORK_CHOICES, resolveVehicleArtwork, type VehicleArtworkKey } from "@/lib/form-vehicles";

export default function VehicleArtworkPicker({ name, artwork, onChange }: {
  name: string;
  artwork?: VehicleArtworkKey;
  onChange: (artwork: VehicleArtworkKey) => void;
}) {
  return <label className="block min-w-0 text-xs font-bold text-slate-700 dark:text-slate-200">
    Vehicle illustration
    <span className="mt-1 flex items-center gap-2 rounded-lg border border-slate-300 bg-white p-1.5 dark:border-white/10 dark:bg-[#222]">
      <span className="h-[64px] w-[132px] shrink-0 sm:h-[80px] sm:w-[168px]" aria-hidden="true"><VehicleArtwork name={name} artwork={artwork} /></span>
      <select value={resolveVehicleArtwork(name, artwork)} onChange={(event) => onChange(event.target.value as VehicleArtworkKey)}
        className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs font-semibold text-slate-900 outline-none dark:text-white"
        aria-label={`Illustration for ${name || "custom vehicle"}`}>
        {VEHICLE_ARTWORK_CHOICES.map((choice) => <option key={choice.key} value={choice.key}>{choice.label}</option>)}
      </select>
    </span>
  </label>;
}
