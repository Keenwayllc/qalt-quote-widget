export const MAX_INTERMEDIATE_STOPS = 10;

export interface IntermediateStop {
  address: string;
  zip: string;
}

export function normalizeIntermediateStops(value: unknown): IntermediateStop[] {
  if (!Array.isArray(value)) return [];

  return value.slice(0, MAX_INTERMEDIATE_STOPS).flatMap((raw) => {
    if (!raw || typeof raw !== "object") return [];
    const item = raw as Record<string, unknown>;
    const address = typeof item.address === "string" ? item.address.trim().slice(0, 500) : "";
    const zip = typeof item.zip === "string" ? item.zip.trim().slice(0, 20) : "";
    return address ? [{ address, zip }] : [];
  });
}

export function routeLocations(
  pickup: string,
  stops: ReadonlyArray<Pick<IntermediateStop, "address">>,
  dropoff: string
): string[] {
  return [pickup, ...stops.map((stop) => stop.address), dropoff]
    .map((location) => location.trim())
    .filter(Boolean);
}

export function hasDuplicateConsecutiveLocations(locations: readonly string[]): boolean {
  return locations.some(
    (location, index) =>
      index > 0 && location.trim().toLocaleLowerCase() === locations[index - 1].trim().toLocaleLowerCase()
  );
}
