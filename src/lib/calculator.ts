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

/**
 * Estimates the price based on distance and company pricing rules.
 */
export function estimatePrice(
  distance: number,
  rules: {
    baseRatePerMile: number;
    minimumCharge: number;
    useMinimumCharge: boolean;
    minMilesThreshold: number;
    weightFee: number;
    itemCountFee: number;
    stairsFee: number;
    insideDeliveryFee: number;
    afterHoursFee: number;
    businessHoursStart?: string;
    businessHoursEnd?: string;
    businessDays?: string;
    largeItemFee: number;
    largeItemsEnabled?: boolean;
    largeItemCategories?: LargeItemCategory[];
  },
  extras: {
    hasStairs: boolean;
    needsInsideDelivery: boolean;
    isAfterHours?: boolean;
    pickupDateTime?: string;
    isLargeItem?: boolean;
    selectedLargeItems?: string[];
    packageWeight?: number;
    itemCount?: number;
  }
): number {
  const distanceToCharge = Math.max(0, distance - rules.minMilesThreshold);
  let total = distanceToCharge * rules.baseRatePerMile;

  if (rules.useMinimumCharge && total < rules.minimumCharge) {
    total = rules.minimumCharge;
  }

  if (extras.packageWeight && extras.packageWeight > 0 && rules.weightFee > 0) {
    total += extras.packageWeight * rules.weightFee;
  }

  if (extras.itemCount && extras.itemCount > 0 && rules.itemCountFee > 0) {
    total += extras.itemCount * rules.itemCountFee;
  }

  if (extras.hasStairs) total += rules.stairsFee;
  if (extras.needsInsideDelivery) total += rules.insideDeliveryFee;

  // After-hours: auto-detect via pickup datetime if provided, else use manual flag
  if (
    extras.pickupDateTime &&
    rules.businessHoursStart &&
    rules.businessHoursEnd &&
    rules.businessDays
  ) {
    if (
      isPickupAfterHours(
        extras.pickupDateTime,
        rules.businessHoursStart,
        rules.businessHoursEnd,
        rules.businessDays
      )
    ) {
      total += rules.afterHoursFee;
    }
  } else if (extras.isAfterHours) {
    total += rules.afterHoursFee;
  }

  // Large items: sum category prices if enabled, else fall back to single fee
  if (
    extras.selectedLargeItems &&
    extras.selectedLargeItems.length > 0 &&
    rules.largeItemsEnabled &&
    rules.largeItemCategories
  ) {
    for (const itemName of extras.selectedLargeItems) {
      const cat = rules.largeItemCategories.find((c) => c.name === itemName);
      if (cat) total += cat.price;
    }
  } else if (extras.isLargeItem) {
    total += rules.largeItemFee;
  }

  return total;
}
