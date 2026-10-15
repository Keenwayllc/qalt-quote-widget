import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { VEHICLE_ARTWORK_CHOICES, normalizeVehicles, resolveVehicleArtwork, type VehicleArtKind } from "@/lib/form-vehicles";
import { VEHICLE_ARTWORK_ASSETS } from "@/lib/vehicle-artwork-assets";
import { vehicleKey } from "@/lib/merchant-intelligence";
import { loadCostProfiles } from "@/lib/merchant-intelligence-data";
import CostSettings, { type CostVehicle } from "./CostSettings";

export const dynamic = "force-dynamic";

export default async function CostSettingsPage() {
  const company = await getCurrentCompany();
  const [{ profiles, available }, quoted] = await Promise.all([
    loadCostProfiles(company.id),
    prisma.quoteRequest.findMany({
      where: { companyId: company.id, deletedAt: null, vehicleType: { not: null } },
      distinct: ["vehicleType"],
      select: { vehicleType: true },
      take: 50,
    }),
  ]);

  const vehicles = new Map<string, CostVehicle>();
  const add = (label: string, kind: VehicleArtKind, yours: boolean) => {
    const key = vehicleKey(label);
    if (!key || vehicles.has(key)) return;
    vehicles.set(key, { key, label, art: VEHICLE_ARTWORK_ASSETS[kind] ?? null, yours });
  };
  // The merchant's own vehicles first: on any form, seen on quotes, or already customised.
  for (const form of company.widgetSettings) {
    for (const v of normalizeVehicles(form.vehicleOptions)) add(v.name, resolveVehicleArtwork(v.name, v.artwork), true);
  }
  for (const q of quoted) if (q.vehicleType) add(q.vehicleType, resolveVehicleArtwork(q.vehicleType), true);
  for (const p of profiles) if (p.vehicleKey) add(p.label, resolveVehicleArtwork(p.label), !VEHICLE_ARTWORK_CHOICES.some((c) => vehicleKey(c.label) === p.vehicleKey));
  // Then every vehicle in the Qalt catalog, so costs can be set before a form uses it.
  for (const choice of VEHICLE_ARTWORK_CHOICES) add(choice.label, choice.key, false);

  return <CostSettings available={available} profiles={profiles} vehicles={[...vehicles.values()]} />;
}
