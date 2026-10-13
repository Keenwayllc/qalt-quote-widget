"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AnalyticsReport } from "@/lib/analytics-report";
import styles from "./analytics.module.css";

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
const count = (value: number) => value.toLocaleString("en-US");
function change(value: number | null, previous: number) {
  return value === null
    ? previous === 0
      ? "No previous activity to compare"
      : "No comparison available"
    : `${value > 0 ? "+" : ""}${value.toFixed(1)}% vs previous period`;
}
function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}
function exportSummary(report: AnalyticsReport) {
  const rows: (string | number)[][] = [
    ["Qalt analytics summary"],
    ["Window (UTC)", report.start, report.updatedAt],
    ["Metric", "Value"],
    ["Quote requests", report.summary.count],
    ["Quoted value (USD)", report.summary.quotedValue],
    ["Open quote value (USD)", report.summary.openValue],
    ["Booked incl. paid", report.summary.booked],
    ["Paid quotes", report.summary.paid],
    ["Estimated value of paid quotes (USD)", report.summary.paidValue],
    ["Booking rate (%)", report.summary.bookingRate ?? "No data"],
    ["Average quote (USD)", report.summary.average ?? "No data"],
    [],
    ["Date (UTC)", "Quote requests", "Previous period aligned by day"],
    ...report.daily.map((d) => [d.date, d.quotes, d.previous]),
    [],
    ["Service", "Requests", "Quoted value (USD)"],
    ...report.services.map((s) => [s.label, s.count, s.value]),
    [],
    ["Pickup ZIP area", "Requests", "Quoted value (USD)"],
    ...report.regions.map((s) => [s.label, s.count, s.value]),
  ];
  // Prefix formula-like values so spreadsheet apps treat merchant-controlled labels as text.
  const content = rows
    .map((row) =>
      row
        .map((v) =>
          csvCell(
            typeof v === "string" && /^[=+@\-\t\r]/.test(v) ? `'${v}` : v,
          ),
        )
        .join(","),
    )
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/csv;charset=utf-8;" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `qalt-analytics-${report.days}d-${report.updatedAt.slice(0, 10)}.csv`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function Breakdown({
  title,
  description,
  rows,
  total,
}: {
  title: string;
  description: string;
  rows: AnalyticsReport["services"];
  total: number;
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.sectionHeading}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className={styles.tag}>{rows.length} groups</span>
      </div>
      {rows.length ? (
        <ol className={styles.breakdown}>
          {rows.slice(0, 5).map((row) => (
            <li key={row.label}>
              <div className={styles.rowLabel}>
                <strong>{row.label}</strong>
                <span>
                  {count(row.count)} · {((row.count / total) * 100).toFixed(0)}%
                </span>
              </div>
              <div className={styles.track} aria-hidden="true">
                <div style={{ width: `${(row.count / total) * 100}%` }} />
              </div>
              <p>{money(row.value)} quoted value</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className={styles.smallEmpty}>
          No requests in this period. Your top groups appear as quotes arrive.
        </div>
      )}
      {rows.length > 5 && (
        <p className={styles.note}>
          {rows.length - 5} additional groups are included in the summary
          export.
        </p>
      )}
    </section>
  );
}
export default function AnalyticsDashboard({
  report,
}: {
  report: AnalyticsReport;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [compare, setCompare] = useState(true);
  const [tableOpen, setTableOpen] = useState(false);
  const [sort, setSort] = useState("newest");
  const [exported, setExported] = useState(false);
  const s = report.summary;
  const hasData = s.count > 0;
  const recent = [...report.recent].sort((a, b) =>
    sort === "value"
      ? b.value - a.value
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const periodStart = new Date(report.start).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const updated = new Date(report.updatedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
  const metricCards = [
    {
      label: "Quote requests",
      value: count(s.count),
      help: "Requests received in this period",
      comparison: change(report.quoteChange, report.prior.count),
    },
    {
      label: "Quoted value",
      value: money(s.quotedValue),
      help: "All estimates; this is not revenue",
      comparison: change(report.valueChange, report.prior.quotedValue),
    },
    {
      label: "Booking rate",
      value: s.bookingRate === null ? "—" : `${s.bookingRate.toFixed(1)}%`,
      help: "Won, confirmed or paid ÷ all requests",
      comparison: `${count(s.booked)} booked, including ${count(s.paid)} paid`,
    },
    {
      label: "Average quote",
      value: s.average === null ? "—" : money(s.average),
      help: "Estimated value per request",
      comparison:
        report.prior.average === null
          ? "No previous average to compare"
          : `${money(report.prior.average)} in previous period`,
    },
  ];
  return (
    <div className={styles.root} aria-busy={pending}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>
            <span aria-hidden="true" /> Performance overview
          </span>
          <h1>Analytics</h1>
          <p>
            Understand your quote demand, see what gets booked, and find your
            next opportunity.
          </p>
        </div>
        <div className={styles.actions}>
          <button
            disabled={pending}
            onClick={() => startTransition(() => router.refresh())}
          >
            {pending ? "Refreshing…" : "Refresh data"}
          </button>
          <button
            className={styles.primary}
            onClick={() => {
              exportSummary(report);
              setExported(true);
            }}
          >
            Export summary
          </button>
        </div>
      </header>
      <div className={styles.toolbar}>
        <nav aria-label="Reporting window" className={styles.switcher}>
          {[7, 30, 90].map((days) => (
            <Link
              key={days}
              href={`/dashboard/analytics?days=${days}`}
              aria-current={report.days === days ? "page" : undefined}
              onClick={() => setExported(false)}
            >
              {days} days
            </Link>
          ))}
        </nav>
        <div className={styles.reporting}>
          <strong>
            {periodStart} –{" "}
            {new Date(report.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            })}
          </strong>
          <span>UTC · Updated {updated} · Refresh for latest</span>
        </div>
      </div>
      {exported && (
        <p role="status" className={styles.exportStatus}>
          Summary downloaded. The export contains aggregate metrics and no
          customer contact details.
        </p>
      )}
      <div className={styles.metrics}>
        {metricCards.map((metric, i) => (
          <section key={metric.label} className={styles.metric}>
            <div className={styles.metricLabel}>
              <span>{metric.label}</span>
              <span aria-hidden="true" className={styles.metricIndex}>
                0{i + 1}
              </span>
            </div>
            <strong>{metric.value}</strong>
            <p>{metric.help}</p>
            <div className={styles.comparison}>{metric.comparison}</div>
          </section>
        ))}
      </div>
      {!hasData && (
        <section className={styles.onboarding}>
          <div>
            <span className={styles.eyebrow}>
              Ready when your customers are
            </span>
            <h2>No quote requests in this period</h2>
            <p>
              {report.prior.count
                ? "There was activity in the previous period. Try a wider reporting window to see more history."
                : "Once customers submit quotes, this page will show demand, outcomes and estimated value. No sample numbers are mixed into your analytics."}
            </p>
          </div>
          <Link href="/dashboard/embed">
            Check your embed setup <span aria-hidden="true">↗</span>
          </Link>
        </section>
      )}
      <div className={styles.mainGrid}>
        <section className={styles.panel}>
          <div className={styles.sectionHeading}>
            <div>
              <h2>Quote activity</h2>
              <p>
                Daily requests over {report.days} days. Today is still in
                progress.
              </p>
            </div>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={compare}
                onChange={(e) => setCompare(e.target.checked)}
              />{" "}
              Compare previous period
            </label>
          </div>
          <div className={styles.legend}>
            <span>
              <i /> Selected period
            </span>
            {compare && (
              <span>
                <i className={styles.previousDot} /> Previous period, aligned by
                day
              </span>
            )}
          </div>
          {hasData || report.prior.count ? (
            <div
              className={styles.chart}
              role="img"
              aria-label={`Daily quote requests. ${s.count} in selected period and ${report.prior.count} in previous period. A data table follows.`}
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={report.daily}
                  margin={{ top: 12, right: 12, left: -12, bottom: 8 }}
                  accessibilityLayer
                >
                  <defs>
                    <linearGradient
                      id="analyticsFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#b92e3b" stopOpacity={0.2} />
                      <stop
                        offset="100%"
                        stopColor="#b92e3b"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
                  <XAxis
                    dataKey="label"
                    minTickGap={35}
                    tick={{ fill: "var(--muted)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: "var(--muted)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      borderRadius: 10,
                      color: "var(--ink)",
                    }}
                    labelFormatter={(_, payload) =>
                      payload?.[0]?.payload?.date ?? ""
                    }
                  />
                  <Area
                    name="Selected period"
                    dataKey="quotes"
                    type="linear"
                    stroke="#b92e3b"
                    fill="url(#analyticsFill)"
                    strokeWidth={2.5}
                    isAnimationActive={false}
                  />
                  {compare && (
                    <Line
                      name="Previous period"
                      dataKey="previous"
                      stroke="#94a3b8"
                      strokeDasharray="5 5"
                      dot={false}
                      strokeWidth={1.5}
                      isAnimationActive={false}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className={styles.emptyChart}>
              <div className={styles.emptyBars} aria-hidden="true">
                {[25, 45, 32, 65, 50, 80, 60, 95, 75, 110, 90, 125].map(
                  (height, i) => (
                    <span key={i} style={{ height }} />
                  ),
                )}
              </div>
              <strong>Your activity trend will appear here</strong>
              <p>Collect quote requests to start tracking daily demand.</p>
            </div>
          )}
          <button
            className={styles.textButton}
            aria-expanded={tableOpen}
            aria-controls="analytics-daily-table"
            onClick={() => setTableOpen(!tableOpen)}
          >
            {tableOpen ? "Hide" : "View"} daily data table
          </button>
          {tableOpen && (
            <div id="analytics-daily-table" className={styles.tableScroll}>
              <table>
                <caption>
                  Daily quote requests. Previous period uses the same day
                  position.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Date (UTC)</th>
                    <th scope="col">Requests</th>
                    {compare && <th scope="col">Previous period</th>}
                  </tr>
                </thead>
                <tbody>
                  {report.daily.map((day) => (
                    <tr key={day.date}>
                      <th scope="row">{day.date}</th>
                      <td>{day.quotes}</td>
                      {compare && <td>{day.previous}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
        <section className={`${styles.panel} ${styles.outcomes}`}>
          <div className={styles.sectionHeading}>
            <div>
              <h2>Quote outcomes</h2>
              <p>Current status of requests created in this window.</p>
            </div>
          </div>
          <div className={styles.outcomeTotal}>
            <strong>{count(s.count)}</strong>
            <span>total requests</span>
          </div>
          <div className={styles.outcomeStack} aria-hidden="true">
            {report.outcomes.map((o, i) => (
              <span
                key={o.label}
                className={styles[`status${i}`]}
                style={{ width: `${s.count ? (o.count / s.count) * 100 : 0}%` }}
              />
            ))}
          </div>
          <ul className={styles.outcomeList}>
            {report.outcomes
              .filter((o) => o.label !== "Other" || o.count)
              .map((o, i) => (
                <li key={o.label}>
                  <span>
                    <i className={styles[`status${i}`]} />
                    {o.label}
                  </span>
                  <strong>
                    {o.count}
                    <small>
                      {s.count
                        ? `${((o.count / s.count) * 100).toFixed(0)}%`
                        : "—"}
                    </small>
                  </strong>
                </li>
              ))}
          </ul>
          <p className={styles.note}>
            Booked excludes paid here to avoid double counting. The booking rate
            above includes both.
          </p>
          <Link className={styles.textButton} href="/dashboard/quotes">
            Review quote decisions →
          </Link>
        </section>
      </div>
      <div className={styles.detailGrid}>
        <Breakdown
          title="Service demand"
          description="Top services by request volume."
          rows={report.services}
          total={s.count}
        />
        <Breakdown
          title="Pickup areas"
          description="Grouped by the first 3 digits of the pickup ZIP."
          rows={report.regions}
          total={s.count}
        />
        <section className={styles.panel}>
          <div className={styles.sectionHeading}>
            <div>
              <h2>Operational snapshot</h2>
              <p>Signals to help plan your next move.</p>
            </div>
          </div>
          <dl className={styles.snapshot}>
            <div>
              <dt>Open quote value</dt>
              <dd>{money(s.openValue)}</dd>
              <p>Pending requests awaiting a decision.</p>
            </div>
            <div>
              <dt>Paid quote value</dt>
              <dd>{money(s.paidValue)}</dd>
              <p>Estimates on paid quotes, not settled revenue.</p>
            </div>
            <div>
              <dt>Average route distance</dt>
              <dd>
                {report.averageDistance === null
                  ? "—"
                  : `${report.averageDistance.toFixed(1)} mi`}
              </dd>
              <p>Requests with a recorded distance above zero.</p>
            </div>
            <div>
              <dt>Most active hour</dt>
              <dd>{report.peakHour ?? "—"}</dd>
              <p>
                {report.peakHour
                  ? "Most requests in this hour; ties use the earliest hour."
                  : "Available when requests arrive."}
              </p>
            </div>
          </dl>
        </section>
      </div>
      <section className={styles.nextSteps}>
        <div>
          <span className={styles.eyebrow}>Suggested next step</span>
          <h2>
            {!hasData ? "Start collecting demand" : "Keep your pipeline moving"}
          </h2>
          <p>
            {!hasData
              ? "Publish your quote form and submit a test request to verify the customer journey."
              : s.count < 10
                ? "This is a small sample. Collect more requests before drawing conclusions about pricing or conversion."
                : s.count > s.booked
                  ? `${s.count - s.booked} requests are not currently booked. Review pending decisions and closed quotes to understand the reasons.`
                  : "Your requests are booked or paid. Compare service demand and pickup areas to plan capacity."}
          </p>
        </div>
        <div>
          <Link href={hasData ? "/dashboard/quotes" : "/dashboard/embed"}>
            {hasData ? "Open quotes" : "Get embed code"} ↗
          </Link>
          <Link href="/dashboard/analytics/funnel">
            Explore the quote funnel ↗
          </Link>
        </div>
      </section>
      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <div>
            <h2>Recent quote activity</h2>
            <p>Your six latest requests from this reporting window.</p>
          </div>
          <label className={styles.sort}>
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest first</option>
              <option value="value">Highest value</option>
            </select>
          </label>
        </div>
        {recent.length ? (
          <div className={styles.tableScroll}>
            <table>
              <caption className={styles.srOnly}>Recent quote requests</caption>
              <thead>
                <tr>
                  <th scope="col">Quote</th>
                  <th scope="col">Route</th>
                  <th scope="col">Outcome</th>
                  <th scope="col">Estimate</th>
                  <th scope="col">Received (UTC)</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((q) => (
                  <tr key={q.id}>
                    <th scope="row">
                      <Link
                        href={`/dashboard/quotes?quoteId=${encodeURIComponent(q.id)}`}
                      >
                        …{q.id.slice(-7)}
                      </Link>
                    </th>
                    <td>{q.route}</td>
                    <td>
                      <span className={styles.tag}>{q.status}</span>
                    </td>
                    <td>{money(q.value)}</td>
                    <td>
                      {new Date(q.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.smallEmpty}>
            No recent requests to show. Choose a wider window or check your form
            setup.
          </div>
        )}
        <Link className={styles.textButton} href="/dashboard/quotes">
          View all quotes →
        </Link>
      </section>
      <details className={styles.definitions}>
        <summary>How to read these numbers</summary>
        <div>
          <p>
            <strong>Reporting window:</strong> UTC calendar days including
            today. The previous period is the same number of days immediately
            before this window; today is partial.
          </p>
          <p>
            <strong>Quoted value:</strong> The sum of estimated prices on
            requests created in the window, including closed requests. Open
            quote value includes pending requests only. Neither is collected
            revenue.
          </p>
          <p>
            <strong>Booking rate:</strong> Requests currently marked Won,
            Confirmed or Paid, or with a Paid payment status, divided by all
            requests in this window. It describes this quote cohort, not
            payments received during the window.
          </p>
          <p>
            <strong>Data scope:</strong> Only this company’s non-deleted quote
            requests. Archived/deleted requests are excluded. No activity means
            no measured rate or average. Refresh updates the snapshot.
          </p>
        </div>
      </details>
    </div>
  );
}
