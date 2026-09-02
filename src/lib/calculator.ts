import zipcodes from "zipcodes";

export interface LargeItemCategory {
  name: string;
  price: number;
}

/**
 * Calculates the Haversine distance between two ZIP codes in miles.
 * If one or both ZIPs are invalid, returns null.
 */
export function calculateDistance(zip1: string, zip2: string): number | null {
  const loc1 = zipcodes.lookup(zip1);
  const loc2 = zipcodes.lookup(zip2);

  if (!loc1 || !loc2) return null;

  const lat1 = loc1.latitude;
  const lon1 = loc1.longitude;
  const lat2 = loc2.latitude;
  const lon2 = loc2.longitude;

  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Returns true if the given ISO datetime string falls outside business hours.
 * businessDays is a comma-separated list of day numbers (0=Sun, 6=Sat).
 */
export function isPickupAfterHours(
  pickupDateTimeISO: string,
  businessHoursStart: string,
  businessHoursEnd: string,
  businessDays: string
): boolean {
  const dt = new Date(pickupDateTimeISO);
  if (isNaN(dt.getTime())) return false;

  const dayOfWeek = dt.getDay();
  const timeMinutes = dt.getHours() * 60 + dt.getMinutes();

  const [startH, startM] = businessHoursStart.split(":").map(Number);
  const [endH, endM] = businessHoursEnd.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  const allowedDays = businessDays.split(",").map(Number);
  if (!allowedDays.includes(dayOfWeek)) return true;
  if (timeMinutes < startMinutes || timeMinutes >= endMinutes) return true;
  return false;
}

export interface EstimateRules {
  baseRatePerMile: number;
  minimumCharge: number;
  useMinimumCharge: boolean;
  minMilesThreshold: number;
  weightFee: number;
  itemCountFee: number;
  stairsFee: number;
  insideDeliveryFee: number;
  addon3Fee: number;
  afterHoursFee: number;
  businessHoursStart?: string;
  businessHoursEnd?: string;
  businessDays?: string;
  largeItemFee: number;
  largeItemsEnabled?: boolean;
  largeItemCategories?: LargeItemCategory[];
}

export interface EstimateExtras {
  hasStairs: boolean;
  needsInsideDelivery: boolean;
  needsAddon3: boolean;
  isAfterHours?: boolean;
  pickupDateTime?: string;
  isLargeItem?: boolean;
  selectedLargeItems?: string[];
  packageWeight?: number;
  itemCount?: number;
  stairsFlights?: number;
}

/**
 * One transparent charge that contributed to the quote. `key` is stable so
 * callers can relabel (e.g. merchant's Inside Delivery label) or look up the
 * amount for a specific selection. `detail` is an optional unit-pricing string.
 */
export interface PriceLineItem {
  key: string;
  label: string;
  amount: number;
  detail?: string;
}

export interface PriceBreakdown {
  total: number;
  lineItems: PriceLineItem[];
  distanceMiles: number;
  freeMiles: number;
  billableMiles: number;
  minimumApplied: boolean;
}

/**
 * Estimates the price AND records every charge that contributed to it.
 * The additions happen in exactly the same order and with the same guards as
 * the historical single-number calculation, so `total` is identical to what
 * estimatePrice() has always returned, and the line items always sum to it.
 * Vehicle pricing is applied by the estimate route (it lives in widget
 * settings, not the pricing profile) and appended there.
 */
export function estimatePriceDetailed(
  distance: number,
  rules: EstimateRules,
  extras: EstimateExtras
): PriceBreakdown {
  const lineItems: PriceLineItem[] = [];

  const freeMiles = rules.minMilesThreshold || 0;
  const billableMiles = Math.max(0, distance - freeMiles);
  const mileageSubtotal = billableMiles * rules.baseRatePerMile;

  let total = mileageSubtotal;
  let minimumApplied = false;
  if (rules.useMinimumCharge && total < rules.minimumCharge) {
    total = rules.minimumCharge;
    minimumApplied = true;
  }

  // Base / mileage anchors the quote — always shown.
  lineItems.push({
    key: "mileage",
    label: "Base / mileage",
    amount: mileageSubtotal,
    detail:
      rules.baseRatePerMile > 0
        ? `${billableMiles.toFixed(1)} billable mi × $${rules.baseRatePerMile.toFixed(2)}`
        : undefined,
  });
  if (minimumApplied) {
    // Transparent: the minimum lifts the mileage subtotal up to the floor.
    lineItems.push({
      key: "minimumAdjustment",
      label: "Minimum job adjustment",
      amount: rules.minimumCharge - mileageSubtotal,
    });
  }

  if (extras.packageWeight && extras.packageWeight > 0 && rules.weightFee > 0) {
    const amount = extras.packageWeight * rules.weightFee;
    total += amount;
    lineItems.push({
      key: "weight",
      label: `Weight, ${extras.packageWeight} lbs`,
      amount,
      detail: `${extras.packageWeight} lbs × $${rules.weightFee.toFixed(2)}`,
    });
  }

  if (extras.itemCount && extras.itemCount > 0 && rules.itemCountFee > 0) {
    const amount = extras.itemCount * rules.itemCountFee;
    total += amount;
    lineItems.push({
      key: "items",
      label: `Items, ${extras.itemCount}`,
      amount,
      detail: `${extras.itemCount} × $${rules.itemCountFee.toFixed(2)}`,
    });
  }

  if (extras.hasStairs) {
    // stairsFee is charged per flight of stairs; default to 1 flight when unspecified
    const flights =
      extras.stairsFlights && extras.stairsFlights > 0 ? extras.stairsFlights : 1;
    const amount = rules.stairsFee * flights;
    total += amount;
    if (amount > 0) {
      lineItems.push({
        key: "stairs",
        label: `Stairs ×${flights}`,
        amount,
        detail: `${flights} flights × $${rules.stairsFee.toFixed(2)}`,
      });
    }
  }

  if (extras.needsInsideDelivery) {
    total += rules.insideDeliveryFee;
    if (rules.insideDeliveryFee > 0) {
      lineItems.push({ key: "insideDelivery", label: "Inside delivery", amount: rules.insideDeliveryFee });
    }
  }

  if (extras.needsAddon3) {
    total += rules.addon3Fee;
    if (rules.addon3Fee > 0) {
      lineItems.push({ key: "addon3", label: "Add-on", amount: rules.addon3Fee });
    }
  }

  // After-hours: auto-detect via pickup datetime if provided, else use manual flag
  let isAfterHours = false;
  if (
    extras.pickupDateTime &&
    rules.businessHoursStart &&
    rules.businessHoursEnd &&
    rules.businessDays
  ) {
    isAfterHours = isPickupAfterHours(
      extras.pickupDateTime,
      rules.businessHoursStart,
      rules.businessHoursEnd,
      rules.businessDays
    );
  } else if (extras.isAfterHours) {
    isAfterHours = true;
  }
  if (isAfterHours) {
    total += rules.afterHoursFee;
    if (rules.afterHoursFee > 0) {
      lineItems.push({ key: "afterHours", label: "After-hours delivery", amount: rules.afterHoursFee });
    }
  }

  // Large items: sum category prices if enabled, else fall back to single fee.
  // Total accumulates in the original sequential order; rows are grouped for display.
  if (
    extras.selectedLargeItems &&
    extras.selectedLargeItems.length > 0 &&
    rules.largeItemsEnabled &&
    rules.largeItemCategories
  ) {
    const counts = new Map<string, number>();
    for (const itemName of extras.selectedLargeItems) {
      const cat = rules.largeItemCategories.find((c) => c.name === itemName);
      if (cat) {
        total += cat.price;
        counts.set(itemName, (counts.get(itemName) || 0) + 1);
      }
    }
    for (const [name, count] of counts) {
      const cat = rules.largeItemCategories.find((c) => c.name === name);
      if (!cat) continue;
      const amount = cat.price * count;
      if (amount !== 0) {
        lineItems.push({
          key: `large:${name}`,
          label: count > 1 ? `${name} ×${count}` : name,
          amount,
          detail: count > 1 ? `${count} × $${cat.price.toFixed(2)}` : undefined,
        });
      }
    }
  } else if (extras.isLargeItem) {
    total += rules.largeItemFee;
    if (rules.largeItemFee > 0) {
      lineItems.push({ key: "largeItem", label: "Large item", amount: rules.largeItemFee });
    }
  }

  return { total, lineItems, distanceMiles: distance, freeMiles, billableMiles, minimumApplied };
}

/**
 * Estimates the price based on distance and company pricing rules.
 * Single source of truth for the charged total; delegates to the detailed
 * calculation so the number can never drift from the breakdown.
 */
export function estimatePrice(
  distance: number,
  rules: EstimateRules,
  extras: EstimateExtras
): number {
  return estimatePriceDetailed(distance, rules, extras).total;
}
