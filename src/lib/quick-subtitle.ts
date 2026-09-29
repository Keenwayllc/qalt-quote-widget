export const DEFAULT_QUICK_SUBTITLE = "Enter the route, choose a vehicle, and see your price.";

export function normalizeQuickSubtitle(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 200) : "";
}
