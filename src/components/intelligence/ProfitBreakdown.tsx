import Link from "next/link";
import type { MarginTone, ProfitEstimate } from "@/lib/merchant-intelligence";
import styles from "./profit-breakdown.module.css";

const usd = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const pct = (value: number) => `${Math.round(value * 10) / 10}%`;

export const TONE_LABEL: Record<MarginTone, string> = {
  healthy: "On target",
  below: "Below target",
  loss: "Estimated loss",
};

/** Merchant-only profit breakdown. Customers never see this. */
export default function ProfitBreakdown({ estimate }: { estimate: ProfitEstimate }) {
  if (estimate.status !== "ok") {
    return (
      <div className={styles.wrap}>
        <div className={styles.head}>
          <strong>Profit estimate unavailable</strong>
        </div>
        <p className={styles.note} style={{ marginTop: 0 }}>
          {estimate.reason}
        </p>
        {estimate.missing.length > 0 && (
          <ul className={styles.missing}>
            {estimate.missing.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}
        <p className={styles.note}>
          <Link href="/dashboard/intelligence/costs">Add cost settings</Link>
        </p>
      </div>
    );
  }
  const { costs, assumptions: a } = estimate;
  const lines = [
    ["Fuel", costs.fuel, `${a.loadedMiles} loaded mi`],
    ["Driver labor", costs.driver, "driving and handling"],
    ["Deadhead (empty) miles", costs.deadhead, `${a.deadheadMiles} mi, fuel and driver time`],
    ["Tolls", costs.tolls, ""],
    ["Other operating costs", costs.other, ""],
  ] as const;
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span className={`${styles.badge} ${styles[estimate.tone]}`}>
          {TONE_LABEL[estimate.tone]} · {pct(estimate.marginPercent)} margin
        </span>
        <p>Target {pct(estimate.targetMarginPercent)}</p>
      </div>
      <dl className={styles.lines}>
        <div>
          <dt>Customer quote</dt>
          <dd>{usd(estimate.revenue)}</dd>
        </div>
        {lines
          .filter(([, value]) => value > 0)
          .map(([label, value, hint]) => (
            <div key={label}>
              <dt>
                {label}
                {hint ? ` (${hint})` : ""}
              </dt>
              <dd>−{usd(value)}</dd>
            </div>
          ))}
        <div>
          <dt>Total estimated cost</dt>
          <dd>{usd(estimate.totalCost)}</dd>
        </div>
        <div className={styles.total}>
          <dt>Estimated profit</dt>
          <dd>{usd(estimate.profit)}</dd>
        </div>
      </dl>
      <p className={styles.note}>
        Assumes {a.estimatedHours} hours on the job with your {a.vehicleSpecific ? `${a.profileLabel} ` : ""}cost settings. A planning estimate only: customers never see it, and it
        never changes the quote or the checkout amount.
        {a.unsetOptional?.length ? ` Not set, counted as $0: ${a.unsetOptional.join(", ").toLowerCase()}.` : ""} <Link href="/dashboard/intelligence/costs">Edit assumptions</Link>
      </p>
    </div>
  );
}
