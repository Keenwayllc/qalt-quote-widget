import type { Prisma } from "../generated/prisma/client";

// Strict allow-lists for anything the PUBLIC widget / demo renders. Public
// pages must select ONLY these fields — never the whole Company row, which
// carries private data (passwordHash, email, Stripe customer/subscription/
// connect IDs, email-verification + password-reset tokens, admin flags, and
// internal contact/address fields). Those must never reach a client component.

export const publicCompanySelect = {
  id: true,
  name: true,
  logoUrl: true,
  subscriptionPlan: true,
} satisfies Prisma.CompanySelect;

export const publicWidgetSettingsSelect = {
  id: true,
  primaryColor: true,
  headerText: true,
  buttonText: true,
  showWeight: true,
  showItemCount: true,
  showExtras: true,
  insideDeliveryLabel: true,
  addon3Label: true,
  disclaimerText: true,
  backgroundImageUrl: true,
  logoUrl: true,
  companyNameText: true,
  companyNameFont: true,
  mapLayout: true,
  websiteUrl: true,
  paymentsEnabled: true,
  showVehicles: true,
  pricePerVehicle: true,
  showAwb: true,
  geoFencingEnabled: true,
  serviceZips: true,
} satisfies Prisma.WidgetSettingsSelect;

export const publicPricingProfileSelect = {
  id: true,
  widgetSettingsId: true,
  baseRatePerMile: true,
  minimumCharge: true,
  useMinimumCharge: true,
  minMilesThreshold: true,
  weightFee: true,
  itemCountFee: true,
  stairsFee: true,
  insideDeliveryFee: true,
  addon3Fee: true,
  afterHoursFee: true,
  businessHoursStart: true,
  businessHoursEnd: true,
  businessDays: true,
  largeItemFee: true,
  largeItemsEnabled: true,
  largeItemCategories: true,
} satisfies Prisma.PricingProfileSelect;
