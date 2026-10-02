// Artwork choices live alongside vehicle normalization so the same presets are
// understood by the merchant editor, public widget, and Node-based tests.
export const VEHICLE_ARTWORK_CHOICES = [
  { key: "bicycle", label: "Bicycle" },
  { key: "cargo-bike", label: "Cargo bike" },
  { key: "e-bike", label: "Electric bicycle" },
  { key: "e-scooter", label: "Scooter (stand-up)" },
  { key: "moped", label: "Moped" },
  { key: "motorcycle", label: "Motorcycle" },
  { key: "sedan", label: "Sedan" },
  { key: "hatchback", label: "Hatchback" },
  { key: "suv", label: "SUV" },
  { key: "minivan", label: "Minivan" },
  { key: "pickup", label: "Pickup truck" },
  { key: "cargo-van", label: "Cargo van" },
  { key: "high-roof-van", label: "High-roof cargo van" },
  { key: "sprinter-van", label: "Sprinter van" },
  { key: "straight-truck", label: "Straight truck" },
  { key: "box-truck", label: "Box truck" },
  { key: "box-truck-16", label: "Box truck - 16 ft" },
  { key: "box-truck-20", label: "Box truck - 20 ft" },
  { key: "box-truck-24", label: "Box truck - 24 ft" },
  { key: "box-truck-26", label: "Box truck - 26 ft" },
  { key: "flatbed", label: "Flatbed / stake bed" },
  { key: "refrigerated", label: "Refrigerated truck" },
  { key: "dump-truck", label: "Dump truck" },
  { key: "tanker-truck", label: "Tanker truck" },
  { key: "roll-off-truck", label: "Roll-off truck" },
  { key: "tractor-trailer", label: "Tractor trailer" },
  { key: "tractor-trailer-28", label: "Tractor trailer - 28 ft" },
  { key: "tractor-trailer-40", label: "Tractor trailer - 40 ft" },
  { key: "tractor-trailer-47", label: "Tractor trailer - 47 ft" },
  { key: "tractor-trailer-48", label: "Tractor trailer - 48 ft" },
  { key: "tractor-trailer-53", label: "Tractor trailer - 53 ft" },
  { key: "flatbed-tractor-trailer", label: "Flatbed tractor trailer" },
  { key: "doubles", label: "Doubles" },
  { key: "triples", label: "Triples" },
] as const;

/** Artwork a vehicle card can actually show. */
export type VehicleArtKind = (typeof VEHICLE_ARTWORK_CHOICES)[number]["key"];

// Keys saved by older versions of the editor. "scooter" covered both mopeds
// and kick scooters, "multi-trailer" both doubles and triples, so they resolve
// through the vehicle name (see resolveVehicleArtwork).
const LEGACY_ARTWORK_KEYS = ["scooter", "multi-trailer"] as const;

/** Anything that may be stored on a saved vehicle. */
export type VehicleArtworkKey = VehicleArtKind | (typeof LEGACY_ARTWORK_KEYS)[number];

const artworkKeys = new Set<string>([...VEHICLE_ARTWORK_CHOICES.map((choice) => choice.key), ...LEGACY_ARTWORK_KEYS]);

export function parseVehicleArtworkKey(value: unknown): VehicleArtworkKey | undefined {
  return typeof value === "string" && artworkKeys.has(value) ? value as VehicleArtworkKey : undefined;
}

// A broad stored key gives way to a more specific match from the name, so a
// "Box Truck - 16 ft" saved as "box-truck" still shows the 16 ft artwork.
const REFINES: Partial<Record<VehicleArtworkKey, { fallback: VehicleArtKind; to: VehicleArtKind[] }>> = {
  scooter: { fallback: "moped", to: ["moped", "e-scooter"] },
  "multi-trailer": { fallback: "doubles", to: ["doubles", "triples"] },
  "box-truck": { fallback: "box-truck", to: ["box-truck-16", "box-truck-20", "box-truck-24", "box-truck-26", "straight-truck"] },
  "tractor-trailer": { fallback: "tractor-trailer", to: ["tractor-trailer-28", "tractor-trailer-40",
    "tractor-trailer-47", "tractor-trailer-48", "tractor-trailer-53", "flatbed-tractor-trailer"] },
  flatbed: { fallback: "flatbed", to: ["flatbed-tractor-trailer"] },
};

/** The artwork to draw for a saved vehicle: its stored choice, refined by name. */
export function resolveVehicleArtwork(name: string, artwork?: unknown): VehicleArtKind {
  const stored = parseVehicleArtworkKey(artwork);
  const inferred = inferVehicleArtwork(name);
  if (!stored) return inferred;
  const family = REFINES[stored];
  if (!family) return stored as VehicleArtKind;
  return family.to.includes(inferred) ? inferred : family.fallback;
}

const lengthIn = (name: string, sizes: number[]) => {
  const match = name.match(/\b(\d{2})\s*-?\s*(?:ft\b|foot\b|feet\b|')/);
  const size = match ? Number(match[1]) : NaN;
  return sizes.includes(size) ? size : null;
};

export function inferVehicleArtwork(name: string): VehicleArtKind {
  const normalized = name.trim().toLocaleLowerCase();
  if (/triple/.test(normalized)) return "triples";
  if (/double/.test(normalized)) return "doubles";
  const isSemi = /tractor|trailer|semi\b|18.?wheel/.test(normalized);
  if (isSemi && /flat.?bed|step.?deck/.test(normalized)) return "flatbed-tractor-trailer";
  if (isSemi) {
    const length = lengthIn(normalized, [28, 40, 47, 48, 53]);
    return length ? `tractor-trailer-${length}` as VehicleArtKind : "tractor-trailer";
  }
  if (/refrigerat|reefer/.test(normalized)) return "refrigerated";
  if (/roll.?off|dumpster/.test(normalized)) return "roll-off-truck";
  if (/dump/.test(normalized)) return "dump-truck";
  if (/tanker|tank truck/.test(normalized)) return "tanker-truck";
  if (/flat.?bed|stake bed|hot.?shot|tow truck/.test(normalized)) return "flatbed";
  if (/straight truck/.test(normalized)) return "straight-truck";
  if (/sprinter/.test(normalized)) return "sprinter-van";
  if (/high.roof/.test(normalized)) return "high-roof-van";
  if (/pick.?up/.test(normalized)) return "pickup";
  if (/minivan/.test(normalized)) return "minivan";
  if (/hatchback/.test(normalized)) return "hatchback";
  if (/suv/.test(normalized)) return "suv";
  if (/sedan|\bcar\b/.test(normalized)) return "sedan";
  if (/cargo bike|cargo bicycle/.test(normalized)) return "cargo-bike";
  if (/motorcycle|motorbike/.test(normalized)) return "motorcycle";
  if (/moped|vespa/.test(normalized)) return "moped";
  if (/scooter/.test(normalized)) return "e-scooter";
  if (/e-?bike|electric (bike|bicycle)|pedal assist/.test(normalized)) return "e-bike";
  if (/bicycle|bike/.test(normalized)) return "bicycle";
  // Generic trucks ("Truck", "26ft truck", "Liftgate", "Box van") are box trucks.
  if (/\bbox\b|truck|lorry|lift ?gate/.test(normalized)) {
    const length = lengthIn(normalized, [16, 20, 24, 26]);
    return length ? `box-truck-${length}` as VehicleArtKind : "box-truck";
  }
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
