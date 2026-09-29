// Artwork choices live alongside vehicle normalization so the same presets are
// understood by the merchant editor, public widget, and Node-based tests.
export const VEHICLE_ARTWORK_CHOICES = [
  { key: "bicycle", label: "Bicycle" },
  { key: "e-bike", label: "Electric bike" },
  { key: "cargo-bike", label: "Cargo bike" },
  { key: "scooter", label: "Scooter / moped" },
  { key: "e-scooter", label: "Electric kick scooter" },
  { key: "motorcycle", label: "Motorcycle" },
  { key: "sedan", label: "Sedan" },
  { key: "hatchback", label: "Hatchback" },
  { key: "suv", label: "SUV" },
  { key: "minivan", label: "Minivan" },
  { key: "pickup", label: "Pickup truck" },
  { key: "cargo-van", label: "Cargo van" },
  { key: "high-roof-van", label: "High-roof van" },
  { key: "sprinter-van", label: "Sprinter van" },
  { key: "box-truck", label: "Box truck" },
  { key: "flatbed", label: "Flatbed truck" },
  { key: "refrigerated", label: "Refrigerated truck" },
  { key: "tractor-trailer", label: "Tractor trailer" },
  { key: "multi-trailer", label: "Doubles / triples" },
] as const;

export type VehicleArtworkKey = (typeof VEHICLE_ARTWORK_CHOICES)[number]["key"];

const artworkKeys = new Set<string>(VEHICLE_ARTWORK_CHOICES.map((choice) => choice.key));

export function parseVehicleArtworkKey(value: unknown): VehicleArtworkKey | undefined {
  return typeof value === "string" && artworkKeys.has(value) ? value as VehicleArtworkKey : undefined;
}

export function inferVehicleArtwork(name: string): VehicleArtworkKey {
  const normalized = name.trim().toLocaleLowerCase();
  if (/double|triple/.test(normalized)) return "multi-trailer";
  if (/tractor|trailer|semi|18.?wheel/.test(normalized)) return "tractor-trailer";
  if (/refrigerat|reefer/.test(normalized)) return "refrigerated";
  if (/flat.?bed|stake bed|hot.?shot|tow truck/.test(normalized)) return "flatbed";
  if (/box truck|straight truck/.test(normalized)) return "box-truck";
  if (/sprinter/.test(normalized)) return "sprinter-van";
  if (/high.roof/.test(normalized)) return "high-roof-van";
  if (/pick.?up/.test(normalized)) return "pickup";
  if (/minivan/.test(normalized)) return "minivan";
  if (/hatchback/.test(normalized)) return "hatchback";
  if (/suv/.test(normalized)) return "suv";
  if (/sedan|\bcar\b/.test(normalized)) return "sedan";
  if (/cargo bike|cargo bicycle/.test(normalized)) return "cargo-bike";
  if (/motorcycle|motorbike/.test(normalized)) return "motorcycle";
  if (/e-?scooter|electric scooter|kick scooter|stand.?up scooter/.test(normalized)) return "e-scooter";
  if (/scooter|moped|vespa/.test(normalized)) return "scooter";
  if (/e-?bike|electric (bike|bicycle)|pedal assist/.test(normalized)) return "e-bike";
  if (/bicycle|bike/.test(normalized)) return "bicycle";
  // Generic trucks ("Truck", "26ft truck", "Liftgate", "Box van") are box trucks.
  if (/\bbox\b|truck|lorry|lift ?gate/.test(normalized)) return "box-truck";
  if (/van/.test(normalized)) return "cargo-van";
  return "cargo-van";
}

export type FormVehicle = { name: string; fee: number; artwork?: VehicleArtworkKey };

export function validateVehicleDefinitions(value: unknown): string | null {
  if (!Array.isArray(value) || value.length < 1 || value.length > 40) return "Choose between 1 and 40 vehicles.";
  if (normalizeVehicles(value).length !== value.length) return "Every vehicle needs a unique name.";
  if (value.some((raw) => {
    const item = raw as Record<string, unknown>;
    return typeof item.name !== "string" || !item.name.trim() || item.name.length > 80 ||
      !Number.isFinite(Number(item.fee)) || Number(item.fee) < 0 || Number(item.fee) > 100000;
  })) return "Vehicle charges must be between $0 and $100,000.";
  return null;
}

export function normalizeVehicles(value: unknown): FormVehicle[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.flatMap((raw: unknown) => {
    if (!raw || typeof raw !== "object") return [];
    const item = raw as Record<string, unknown>;
    const name = String(item.name ?? "").trim().slice(0, 80);
    const key = name.toLocaleLowerCase();
    if (!name || seen.has(key)) return [];
    seen.add(key);
    const fee = Number(item.fee);
    const artwork = parseVehicleArtworkKey(item.artwork);
    return [{ name, fee: Number.isFinite(fee) ? Math.min(Math.max(fee, 0), 100000) : 0,
      ...(artwork ? { artwork } : {}) }];
  }).slice(0, 40);
}
