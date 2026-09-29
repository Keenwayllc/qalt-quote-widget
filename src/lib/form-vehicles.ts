export type FormVehicle = { name: string; fee: number };

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
    return [{ name, fee: Number.isFinite(fee) ? Math.min(Math.max(fee, 0), 100000) : 0 }];
  }).slice(0, 40);
}
