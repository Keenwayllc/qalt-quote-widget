/**
 * Qalt merchant-only profit estimates. Never use these estimates to calculate
 * or mutate the customer's quoted price or a Stripe charge.
 */
export type QuoteCostSettings = {
  fuelPricePerGallon: number;
  vehicleMilesPerGallon: number;
  driverHourlyCost: number;
  estimatedHours: number;
  deadheadMiles?: number;
  tolls?: number;
  otherCosts?: number;
  minimumTargetMarginPercent?: number;
};

export type QuoteProfitResult = {
  revenue: number;
  costBreakdown: {
    fuel: number;
    driver: number;
    tolls: number;
    other: number;
  };
  estimatedCost: number;
  estimatedProfit: number;
  marginPercent: number;
  revenuePerLoadedMile: number | null;
  isBelowTargetMargin: boolean;
  assumptions: { loadedMiles: number; totalMiles: number; estimatedHours: number };
};

const cents = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const valid = (value: number, label: string) => {
  if (!Number.isFinite(value) || value < 0) throw new RangeError(`${label} must be finite and non-negative`);
  return value;
};

export function estimateQuoteProfit(
  quoteRevenue: number,
  loadedMiles: number,
  settings: QuoteCostSettings
): QuoteProfitResult {
  const revenue = valid(quoteRevenue, "quoteRevenue");
  const miles = valid(loadedMiles, "loadedMiles");
  const deadhead = valid(settings.deadheadMiles ?? 0, "deadheadMiles");
  const totalMiles = miles + deadhead;
  const gallonPrice = valid(settings.fuelPricePerGallon, "fuelPricePerGallon");
  const mpg = settings.vehicleMilesPerGallon;
  if (!Number.isFinite(mpg) || mpg <= 0) throw new RangeError("vehicleMilesPerGallon must be positive");
  const hourly = valid(settings.driverHourlyCost, "driverHourlyCost");
  const hours = valid(settings.estimatedHours, "estimatedHours");
  const tolls = valid(settings.tolls ?? 0, "tolls");
  const other = valid(settings.otherCosts ?? 0, "otherCosts");
  const target = valid(settings.minimumTargetMarginPercent ?? 20, "minimumTargetMarginPercent");
  if (target > 100) throw new RangeError("minimumTargetMarginPercent cannot exceed 100");
  const fuel = cents((totalMiles / mpg) * gallonPrice);
  const driver = cents(hours * hourly);
  const costs = { fuel, driver, tolls: cents(tolls), other: cents(other) };
  const estimatedCost = cents(Object.values(costs).reduce((a, b) => a + b, 0));
  const estimatedProfit = cents(revenue - estimatedCost);
  const marginPercent = revenue > 0 ? cents((estimatedProfit / revenue) * 100) : 0;
  return {
    revenue: cents(revenue),
    costBreakdown: costs,
    estimatedCost,
    estimatedProfit,
    marginPercent,
    revenuePerLoadedMile: miles > 0 ? cents(revenue / miles) : null,
    isBelowTargetMargin: revenue === 0 || marginPercent < target,
    assumptions: { loadedMiles: miles, totalMiles, estimatedHours: hours },
  };
}
