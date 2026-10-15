"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Truck } from "lucide-react";
import VehicleRequestPanel from "@/components/dashboard/VehicleRequestPanel";
import type { VehicleArtAsset } from "@/lib/vehicle-artwork-assets";
import { COST_FIELDS, DEFAULT_FOLLOW_UP_HOURS, DEFAULT_TARGET_MARGIN, type CostFieldKey, type CostProfile } from "@/lib/merchant-intelligence";
import styles from "../intelligence.module.css";

type Draft = Record<CostFieldKey | "followUpAfterHours", string>;
const GROUPS: { title: string; fields: CostFieldKey[] }[] = [
  { title: "Fuel", fields: ["fuelPricePerGallon", "milesPerGallon"] },
  { title: "Time and labor", fields: ["driverHourlyCost", "averageSpeedMph", "handlingMinutes"] },
  { title: "Per-job costs", fields: ["deadheadMiles", "tollsPerJob", "otherCostPerJob"] },
  { title: "Goal", fields: ["targetMarginPercent"] },
];
const FIELD = Object.fromEntries(COST_FIELDS.map((f) => [f.key, f])) as Record<CostFieldKey, (typeof COST_FIELDS)[number]>;
const HELP: Partial<Record<CostFieldKey, string>> = {
  averageSpeedMph: "Used with route miles to estimate driving time.",
  handlingMinutes: "Loading, unloading and paperwork on a typical job.",
  deadheadMiles: "Empty miles driving to pickup or back to base.",
  targetMarginPercent: `Quotes under this are flagged. Default ${DEFAULT_TARGET_MARGIN}%.`,
};

function toDraft(p: CostProfile | undefined): Draft {
  const d = {} as Draft;
  for (const f of COST_FIELDS) d[f.key] = p?.[f.key] == null ? "" : String(p[f.key]);
  d.followUpAfterHours = p?.followUpAfterHours == null ? "" : String(p.followUpAfterHours);
  return d;
}

export type CostVehicle = { key: string; label: string; art: VehicleArtAsset | null; yours: boolean };

export default function CostSettings({ available, profiles, vehicles }: { available: boolean; profiles: CostProfile[]; vehicles: CostVehicle[] }) {
  const base = profiles.find((p) => p.vehicleKey === "");
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div>
          <Link href="/dashboard/intelligence" className={styles.buttonGhost} style={{ paddingLeft: 0 }}>
            <ArrowLeft size={14} aria-hidden /> Intelligence
          </Link>
          <h1>Cost settings</h1>
          <p>
            What a delivery costs you, so Qalt can estimate profit on each quote. Private to your account. These numbers never change a
            customer price or a checkout amount.
          </p>
        </div>
      </header>

      {!available ? (
        <div className={styles.notice} role="status">
          <div>
            <strong>Cost settings are being set up</strong>
            <p>This page will be ready shortly. Nothing else in your account is affected.</p>
          </div>
        </div>
      ) : (
        <>
          <section className={styles.panel} aria-labelledby="default-costs" style={{ marginBottom: 20 }}>
            <div className={styles.panelHead}>
              <div>
                <h2 id="default-costs">All vehicles</h2>
                <p>
                  Fields marked <span className={styles.required}>*</span> are needed for a profit estimate. Leave the rest blank to count
                  them as zero.
                </p>
              </div>
            </div>
            <ProfileForm vehicleKey="" label="All vehicles" initial={toDraft(base)} showFollowUp />
          </section>

          <VehicleCosts vehicles={vehicles} profiles={profiles} base={toDraft(base)} />
        </>
      )}
    </div>
  );
}

function overrideCount(profile?: CostProfile) {
  return profile ? COST_FIELDS.filter((f) => profile[f.key] !== null).length : 0;
}

function VehicleCosts({ vehicles, profiles, base }: { vehicles: CostVehicle[]; profiles: CostProfile[]; base: Draft }) {
  const [selected, setSelected] = useState<string | null>(null);
  const yours = vehicles.filter((v) => v.yours);
  const catalog = vehicles.filter((v) => !v.yours);
  const current = vehicles.find((v) => v.key === selected);
  const profile = current ? profiles.find((p) => p.vehicleKey === current.key) : undefined;
  const grid = (list: CostVehicle[]) => (
    <div className={styles.vehicleGrid}>
      {list.map((v) => {
        const count = overrideCount(profiles.find((p) => p.vehicleKey === v.key));
        return (
          <button
            key={v.key}
            type="button"
            className={styles.vehicleCard}
            aria-pressed={selected === v.key}
            onClick={() => setSelected((cur) => (cur === v.key ? null : v.key))}
          >
            <span className={styles.vehicleArt} aria-hidden>
              {v.art ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static transparent WebP, same as the widget */}
                  <img className={styles.artLight} src={v.art.light} alt="" loading="lazy" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={styles.artDark} src={v.art.dark} alt="" loading="lazy" />
                </>
              ) : (
                <Truck size={28} />
              )}
            </span>
            <span className={styles.vehicleName}>{v.label}</span>
            <span className={`${styles.badge} ${count ? styles.healthy : styles.neutral}`}>{count ? `${count} custom` : "Default costs"}</span>
          </button>
        );
      })}
    </div>
  );
  return (
    <section className={styles.panel} aria-labelledby="vehicle-costs">
      <div className={styles.panelHead}>
        <div>
          <h2 id="vehicle-costs">Vehicle costs</h2>
          <p>Pick a vehicle to set only what differs for it, such as fuel efficiency. Anything left blank uses your All vehicles numbers.</p>
        </div>
      </div>

      {current && (
        <div className={styles.vehicleEditor} aria-live="polite">
          <div className={styles.vehicleHead}>
            <h3>{current.label}</h3>
            <button type="button" className={styles.buttonGhost} onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
          <div className={styles.vehicleBody}>
            <ProfileForm key={current.key} vehicleKey={current.key} label={current.label} initial={toDraft(profile)} placeholders={base} removable={!!profile} />
          </div>
        </div>
      )}

      {yours.length > 0 && (
        <>
          <h3 className={styles.groupHeading}>Your vehicles</h3>
          {grid(yours)}
        </>
      )}
      <h3 className={styles.groupHeading}>All Qalt vehicles</h3>
      {grid(catalog)}

      <div className={styles.requestRow}>
        <div>
          <h3>Can&apos;t find your vehicle?</h3>
          <p>Tell us what you drive and we&apos;ll add it to the Qalt catalog.</p>
        </div>
        <VehicleRequestPanel />
      </div>
    </section>
  );
}

function ProfileForm({
  vehicleKey,
  label,
  initial,
  placeholders,
  showFollowUp,
  removable,
}: {
  vehicleKey: string;
  label: string;
  initial: Draft;
  placeholders?: Draft;
  showFollowUp?: boolean;
  removable?: boolean;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(initial);
  const [status, setStatus] = useState<{ busy: "save" | "remove" | null; message: string | null; error: boolean }>({ busy: null, message: null, error: false });
  const dirty = JSON.stringify(draft) !== JSON.stringify(initial);
  const id = (key: string) => `${vehicleKey || "default"}-${key}`;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ busy: "save", message: null, error: false });
    try {
      const res = await fetch("/api/dashboard/intelligence/cost-profiles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: { vehicleKey, label, ...draft } }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Could not save.");
      setStatus({ busy: null, message: "Saved. Estimates now use these numbers.", error: false });
      router.refresh();
    } catch (error) {
      setStatus({ busy: null, message: error instanceof Error ? error.message : "Could not save.", error: true });
    }
  };
  const remove = async () => {
    setStatus({ busy: "remove", message: null, error: false });
    try {
      const res = await fetch(`/api/dashboard/intelligence/cost-profiles?vehicleKey=${encodeURIComponent(vehicleKey)}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setDraft(toDraft(undefined));
      setStatus({ busy: null, message: "Removed. This vehicle uses All vehicles costs.", error: false });
      router.refresh();
    } catch {
      setStatus({ busy: null, message: "Could not remove. Try again.", error: true });
    }
  };

  return (
    <form className={styles.costForm} onSubmit={save} noValidate>
      {GROUPS.map((group) => (
        <div key={group.title} className={styles.fieldGroup}>
          <span className={styles.groupTitle}>{group.title}</span>
          {group.fields.map((key) => {
            const f = FIELD[key];
            const inherited = placeholders?.[key];
            return (
              <div key={key} className={styles.field}>
                <label htmlFor={id(key)}>
                  {f.label}
                  {f.critical && !placeholders && <span className={styles.required}> *</span>}
                </label>
                <div className={styles.unitInput}>
                  <input
                    id={id(key)}
                    className={styles.input}
                    inputMode="decimal"
                    value={draft[key]}
                    placeholder={inherited ? `Default ${inherited}` : placeholders ? "Default" : f.critical ? "Required" : key === "targetMarginPercent" ? String(DEFAULT_TARGET_MARGIN) : "Optional"}
                    onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                  />
                  <span>{f.unit}</span>
                </div>
                {HELP[key] && <small>{HELP[key]}</small>}
              </div>
            );
          })}
        </div>
      ))}
      {showFollowUp && (
        <div className={styles.fieldGroup}>
          <span className={styles.groupTitle}>Follow-up alerts</span>
          <div className={styles.field}>
            <label htmlFor={id("followUp")}>Flag pending quotes after</label>
            <div className={styles.unitInput}>
              <input
                id={id("followUp")}
                className={styles.input}
                inputMode="numeric"
                value={draft.followUpAfterHours}
                placeholder={String(DEFAULT_FOLLOW_UP_HOURS)}
                onChange={(e) => setDraft((d) => ({ ...d, followUpAfterHours: e.target.value }))}
              />
              <span>hours</span>
            </div>
            <small>Dashboard alert only. Qalt does not message the customer.</small>
          </div>
        </div>
      )}
      <div className={styles.saveBar}>
        <button type="submit" className={styles.buttonPrimary} disabled={!!status.busy || !dirty}>
          {status.busy === "save" ? "Saving…" : "Save"}
        </button>
        {removable && (
          <button type="button" className={styles.buttonGhost} disabled={!!status.busy} onClick={remove}>
            {status.busy === "remove" ? "Removing…" : "Remove override"}
          </button>
        )}
        {status.message && (
          <span className={status.error ? styles.err : styles.ok} role="status" style={{ fontSize: 12, fontWeight: 700 }}>
            {status.message}
          </span>
        )}
      </div>
    </form>
  );
}
