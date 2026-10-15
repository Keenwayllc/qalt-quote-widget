import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { normalizeVehicles } from "@/lib/form-vehicles";
import { vehicleKey } from "@/lib/merchant-intelligence";
import { loadCostProfiles } from "@/lib/merchant-intelligence-data";
import CostSettings from "./CostSettings";

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
  // Vehicles the merchant offers on any form, plus any seen on real quotes.
  const names = new Map<string, string>();
  for (const form of company.widgetSettings) {
    for (const v of normalizeVehicles(form.vehicleOptions)) names.set(vehicleKey(v.name), v.name);
  }
  for (const q of quoted) if (q.vehicleType) names.set(vehicleKey(q.vehicleType), names.get(vehicleKey(q.vehicleType)) ?? q.vehicleType);
  for (const p of profiles) if (p.vehicleKey && !names.has(p.vehicleKey)) names.set(p.vehicleKey, p.label);
  names.delete("");

  return (
    <CostSettings
      available={available}
      profiles={profiles}
      vehicles={[...names.entries()].map(([key, label]) => ({ key, label })).sort((a, b) => a.label.localeCompare(b.label))}
    />
  );
}
