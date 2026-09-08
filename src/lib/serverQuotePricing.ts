import "server-only";
import prisma from "@/lib/prisma";
import {
  estimatePriceDetailed,
  type EstimateExtras,
  type EstimateRules,
  type PriceLineItem,
} from "@/lib/calculator";
import { calculateDrivingDistance } from "@/lib/google-maps";

// Server-authoritative quote pricing. This is the SINGLE source of truth for
// distance, price, vehicle fee, and pricing-profile selection, shared by the
// public estimate (preview) and submit (persisted) routes so both produce the
// exact same legitimate price for the same inputs. Browser-provided price and
// distance are never trusted for the persisted quote.

export type QuoteBreakdown = {
  total: number;
  lineItems: PriceLineItem[];
  distanceMiles: number;
  freeMiles: number;
  billableMiles: number;
  minimumApplied: boolean;
};

export type AuthoritativeQuote = {
  total: number;
  distance: number;
  durationMinutes: number | null;
  breakdown: QuoteBreakdown;
};

export type QuoteComputationResult =
  | { ok: true; quote: AuthoritativeQuote }
  | { ok: false; status: number; error: string };

type ComputeInput = {
  companyId: string;
  formId?: string | null;
  startLocation: string;
  endLocation: string;
  extras: EstimateExtras;
  vehicleCount?: number;
  // Preview-only escape hatch: the estimate route may fall back to a
  // client-supplied distance when the routing service is unavailable. The
  // final submit MUST pass null here so server distance stays authoritative.
  clientDistanceFallback?: number | null;
};

export async function computeAuthoritativeQuote(
  input: ComputeInput
): Promise<QuoteComputationResult> {
  const { companyId, formId, startLocation, endLocation, extras, vehicleCount, clientDistanceFallback } = input;

  if (!startLocation || !endLocation) {
    return { ok: false, status: 400, error: "Missing location data" };
  }

  // Ownership: a supplied formId MUST belong to this company. A foreign or
  // nonexistent form returns 404 and never reveals cross-tenant existence.
  let ownedWidgetSettings:
    | { id: string; showVehicles: boolean; pricePerVehicle: number }
    | null = null;
  if (formId) {
    const form = await prisma.widgetSettings.findUnique({
      where: { id: formId },
      select: { id: true, companyId: true, showVehicles: true, pricePerVehicle: true },
    });
    if (!form || form.companyId !== companyId) {
      return { ok: false, status: 404, error: "Form not found" };
    }
    ownedWidgetSettings = {
      id: form.id,
      showVehicles: form.showVehicles,
      pricePerVehicle: form.pricePerVehicle,
    };
  }

  // Pricing: prefer the owned form's dedicated profile, else the company
  // default. Never another company's profile.
  let pricingProfile: EstimateRules | null = null;
  if (formId) {
    const formProfile = await prisma.pricingProfile.findUnique({
      where: { widgetSettingsId: formId },
    });
    if (formProfile) pricingProfile = formProfile as unknown as EstimateRules;
  }
  if (!pricingProfile) {
    const defaultProfile = await prisma.pricingProfile.findFirst({
      where: { companyId, widgetSettingsId: null },
    });
    if (defaultProfile) pricingProfile = defaultProfile as unknown as EstimateRules;
  }
  if (!pricingProfile) {
    return { ok: false, status: 404, error: "Pricing not configured" };
  }

  // Distance: server routing is authoritative. The client fallback is only
  // consulted when explicitly allowed (preview), never for the saved quote.
  const distanceResult = await calculateDrivingDistance(startLocation, endLocation);
  let distance: number;
  let durationMinutes: number | null = null;
  if (distanceResult !== null) {
    distance = distanceResult.distanceMiles;
    durationMinutes = distanceResult.durationMinutes;
  } else if (typeof clientDistanceFallback === "number" && clientDistanceFallback > 0) {
    distance = clientDistanceFallback;
  } else {
    return {
      ok: false,
      status: 400,
      error: "Could not calculate distance. Please check your addresses.",
    };
  }

  const detailed = estimatePriceDetailed(distance, pricingProfile, extras);
  let total = detailed.total;
  const lineItems: PriceLineItem[] = [...detailed.lineItems];

  // Vehicle fee — uses ONLY the same company/form widget settings, never a
  // browser-provided vehicle price. Mirrors the estimate route's resolution.
  if (vehicleCount && vehicleCount > 0) {
    let widgetSettings = ownedWidgetSettings;
    if (!widgetSettings) {
      const fallback = await prisma.widgetSettings.findFirst({
        where: { companyId },
        select: { id: true, showVehicles: true, pricePerVehicle: true },
      });
      if (fallback) widgetSettings = fallback;
    }
    if (widgetSettings?.showVehicles && widgetSettings.pricePerVehicle > 0) {
      const vehicleAmount = widgetSettings.pricePerVehicle * vehicleCount;
      total += vehicleAmount;
      lineItems.push({
        key: "vehicles",
        label: `Vehicles, ${vehicleCount}`,
        amount: vehicleAmount,
        detail: `${vehicleCount} × $${widgetSettings.pricePerVehicle.toFixed(2)}`,
      });
    }
  }

  return {
    ok: true,
    quote: {
      total,
      distance,
      durationMinutes,
      breakdown: {
        total,
        lineItems,
        distanceMiles: detailed.distanceMiles,
        freeMiles: detailed.freeMiles,
        billableMiles: detailed.billableMiles,
        minimumApplied: detailed.minimumApplied,
      },
    },
  };
}
