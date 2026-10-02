export const VEHICLE_REQUEST_STATUSES = ["NEW", "IN_PROGRESS", "ADDED", "DECLINED"] as const;
export type VehicleRequestStatus = (typeof VEHICLE_REQUEST_STATUSES)[number];

export const VEHICLE_REQUEST_STATUS_LABELS: Record<VehicleRequestStatus, string> = {
  NEW: "Requested",
  IN_PROGRESS: "In progress",
  ADDED: "Added",
  DECLINED: "Not added",
};

export const VEHICLE_REQUEST_DAILY_LIMIT = 10;

export type VehicleRequestInput = { vehicleName: string; description: string; referenceUrl: string | null };

/** Validates a merchant's vehicle request. Returns the cleaned input or an error message. */
export function parseVehicleRequest(body: unknown): VehicleRequestInput | { error: string } {
  const raw = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const vehicleName = String(raw.vehicleName ?? "").trim().replace(/\s+/g, " ");
  const description = String(raw.description ?? "").trim();
  const url = String(raw.referenceUrl ?? "").trim();

  if (vehicleName.length < 2 || vehicleName.length > 80) return { error: "Enter a vehicle name between 2 and 80 characters." };
  if (description.length < 10) return { error: "Describe the vehicle in at least a sentence so we can get it right." };
  if (description.length > 2000) return { error: "Keep the description under 2,000 characters." };
  if (url) {
    let parsed: URL;
    try { parsed = new URL(url); } catch { return { error: "The reference link must be a full web address (https://...)." }; }
    if (!/^https?:$/.test(parsed.protocol) || url.length > 500) return { error: "The reference link must be a full web address (https://...)." };
  }
  return { vehicleName, description, referenceUrl: url || null };
}

/** Start of the rolling 24-hour window used for the daily request limit. */
export function vehicleRequestWindowStart(now = Date.now()): Date {
  return new Date(now - 24 * 60 * 60 * 1000);
}
