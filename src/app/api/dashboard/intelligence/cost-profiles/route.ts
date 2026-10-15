import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { parseCostProfile, vehicleKey } from "@/lib/merchant-intelligence";
import { loadCostProfiles } from "@/lib/merchant-intelligence-data";

const PRIVATE = { "Cache-Control": "private, no-store" };
const NOT_READY = { error: "Cost settings are not available yet. Please try again later." };
const MAX_VEHICLE_PROFILES = 25;

export async function GET() {
  try {
    const company = await getCurrentCompany();
    const { profiles, available } = await loadCostProfiles(company.id);
    return NextResponse.json({ profiles, available }, { headers: PRIVATE });
  } catch (error) {
    console.error("[intelligence] load cost profiles failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Could not load cost settings" }, { status: 500, headers: PRIVATE });
  }
}

/** Upserts one cost row for the signed-in company (company id from the session only). */
export async function PUT(request: Request) {
  try {
    const company = await getCurrentCompany();
    const body = await request.json().catch(() => null);
    const parsed = parseCostProfile(body?.profile);
    if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400, headers: PRIVATE });
    const { available, profiles } = await loadCostProfiles(company.id);
    if (!available) return NextResponse.json(NOT_READY, { status: 503, headers: PRIVATE });
    const key = parsed.profile.vehicleKey;
    if (key && !profiles.some((p) => p.vehicleKey === key) && profiles.filter((p) => p.vehicleKey).length >= MAX_VEHICLE_PROFILES) {
      return NextResponse.json({ error: `You can save up to ${MAX_VEHICLE_PROFILES} vehicle cost profiles` }, { status: 400, headers: PRIVATE });
    }
    const { vehicleKey: _key, ...data } = parsed.profile;
    const saved = await prisma.merchantCostProfile.upsert({
      where: { companyId_vehicleKey: { companyId: company.id, vehicleKey: key } },
      create: { companyId: company.id, vehicleKey: key, ...data },
      update: data,
    });
    return NextResponse.json({ ok: true, updatedAt: saved.updatedAt }, { headers: PRIVATE });
  } catch (error) {
    console.error("[intelligence] save cost profile failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Could not save cost settings" }, { status: 500, headers: PRIVATE });
  }
}

/** Removes a per-vehicle override. The company default row cannot be deleted. */
export async function DELETE(request: Request) {
  try {
    const company = await getCurrentCompany();
    const key = vehicleKey(new URL(request.url).searchParams.get("vehicleKey"));
    if (!key) return NextResponse.json({ error: "Choose a vehicle profile to remove" }, { status: 400, headers: PRIVATE });
    const { available } = await loadCostProfiles(company.id);
    if (!available) return NextResponse.json(NOT_READY, { status: 503, headers: PRIVATE });
    await prisma.merchantCostProfile.deleteMany({ where: { companyId: company.id, vehicleKey: key } });
    return NextResponse.json({ ok: true }, { headers: PRIVATE });
  } catch (error) {
    console.error("[intelligence] delete cost profile failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Could not remove cost profile" }, { status: 500, headers: PRIVATE });
  }
}
