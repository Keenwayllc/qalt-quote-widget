import zipcodes from "zipcodes";

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
  const distance = R * c;

  return distance;
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
    largeItemFee: number;
  },
  extras: {
    hasStairs: boolean;
    needsInsideDelivery: boolean;
    isAfterHours: boolean;
    isLargeItem: boolean;
    packageWeight?: number;
    itemCount?: number;
  }
): number {
  // Subtract threshold from distance
  const distanceToCharge = Math.max(0, distance - rules.minMilesThreshold);
  let total = distanceToCharge * rules.baseRatePerMile;

  // Apply minimum charge if toggled on and distance-based price is lower
  if (rules.useMinimumCharge && total < rules.minimumCharge) {
    total = rules.minimumCharge;
  }

  // Add weight-based fee (per lb)
  if (extras.packageWeight && extras.packageWeight > 0 && rules.weightFee > 0) {
    total += extras.packageWeight * rules.weightFee;
  }

  // Add item count fee (per item)
  if (extras.itemCount && extras.itemCount > 0 && rules.itemCountFee > 0) {
    total += extras.itemCount * rules.itemCountFee;
  }

  // Add flat extras
  if (extras.hasStairs) total += rules.stairsFee;
  if (extras.needsInsideDelivery) total += rules.insideDeliveryFee;
  if (extras.isAfterHours) total += rules.afterHoursFee;
  if (extras.isLargeItem) total += rules.largeItemFee;

  return total;
}
