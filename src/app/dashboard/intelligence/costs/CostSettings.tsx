"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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

export default function CostSettings({ available, profiles, vehicles }: { available: boolean; profiles: CostProfile[]; vehicles: { key: string; label: string }[] }) {
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

          <section className={styles.panel} aria-labelledby="vehicle-costs">
            <div className={styles.panelHead}>
              <div>
                <h2 id="vehicle-costs">Vehicle overrides</h2>
                <p>Set only what differs for a vehicle, such as fuel efficiency. Blank fields use your All vehicles numbers.</p>
              </div>
            </div>
            {vehicles.length === 0 ? (
              <div className={styles.empty}>
                <strong>No vehicles yet</strong>
                <p>
                  Vehicles you offer on a form appear here. <Link href="/dashboard/forms">Manage forms</Link>
                </p>
              </div>
            ) : (
              <ul className={styles.list}>
                {vehicles.map((v) => (
                  <VehicleRow key={v.key} vehicle={v} profile={profiles.find((p) => p.vehicleKey === v.key)} base={toDraft(base)} />
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function VehicleRow({ vehicle, profile, base }: { vehicle: { key: string; label: string }; profile?: CostProfile; base: Draft }) {
  const [open, setOpen] = useState(false);
  const overrides = profile ? COST_FIELDS.filter((f) => profile[f.key] !== null).length : 0;
  return (
    <li className={styles.vehicleRow}>
      <div className={styles.vehicleHead}>
        <div>
          <h3>{vehicle.label}</h3>
          <span className={styles.sub}>{overrides ? `${overrides} custom value${overrides === 1 ? "" : "s"}` : "Uses All vehicles costs"}</span>
        </div>
        <button type="button" className={styles.button} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : overrides ? "Edit" : "Customize"}
        </button>
      </div>
      {open && (
        <div className={styles.vehicleBody}>
          <ProfileForm vehicleKey={vehicle.key} label={vehicle.label} initial={toDraft(profile)} placeholders={base} removable={!!profile} />
        </div>
      )}
    </li>
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
                    placeholder={inherited ? inherited : f.critical ? "Required" : "0"}
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
