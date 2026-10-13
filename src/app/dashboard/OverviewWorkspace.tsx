"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { OverviewData } from "@/lib/overview-data";
import WhatsNewHighlight from "@/components/dashboard/WhatsNewHighlight";
import a from "./analytics/analytics.module.css";
import s from "./overview.module.css";

const money = (value: number | null) =>
  value === null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value);
const count = (value: number | null) =>
  value === null ? "—" : value.toLocaleString("en-US");
const date = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
const jobNames: Record<string, string> = {
  PENDING: "Pending",
  READY: "Ready",
  IN_PROGRESS: "In progress",
  ISSUE: "Needs attention",
};
const quoteName = (status: string, payment: string | null) =>
  payment === "PAID" || status === "PAID"
    ? "Paid"
    : ((
        {
          PENDING: "Pending",
          CONFIRMED: "Confirmed",
          WON: "Won",
          LOST: "Lost",
          CANCELLED: "Cancelled",
        } as Record<string, string>
      )[status] ?? status);

export default function OverviewWorkspace({ data }: { data: OverviewData }) {
  const router = useRouter();
  const [refreshing, startTransition] = useTransition();
  const [setupOpen, setSetupOpen] = useState(
    data.setup.some((task) => task.done !== true),
  );
  const [tableOpen, setTableOpen] = useState(false);
  const report = data.report;
  const issues =
    data.jobStatuses?.find((item) => item.status === "ISSUE")?.count ?? null;
  const completed = data.setup.filter((task) => task.done === true).length;
  const nextTask = data.setup.find((task) => task.done === false);
  const attention =
    issues && issues > 0
      ? {
          title: "Resolve delivery issues",
          body: `${issues} active job${issues === 1 ? " needs" : "s need"} attention. Review the job details and readiness checks.`,
          href: "/dashboard/ops/jobs",
          cta: "Review jobs",
        }
      : data.pendingCount && data.pendingCount > 0
        ? {
            title: "Follow up on pending quotes",
            body: `${data.pendingCount} request${data.pendingCount === 1 ? " is" : "s are"} awaiting a decision. Review the details and contact customers when needed.`,
            href: "/dashboard/quotes",
            cta: "Open quote inbox",
          }
        : nextTask
          ? {
              title: `Next: ${nextTask.label.toLowerCase()}`,
              body: nextTask.description,
              href: nextTask.href,
              cta: "Continue setup",
            }
          : {
              title: "Review your business performance",
              body: "Compare quote demand, booking outcomes and service activity to plan your next move.",
              href: "/dashboard/analytics",
              cta: "Explore analytics",
            };
  const metrics = [
    {
      label: "Requests · last 7 days",
      value: count(report?.summary.count ?? null),
      help: report
        ? report.quoteChange === null
          ? "No previous activity to compare"
          : `${report.quoteChange > 0 ? "+" : ""}${report.quoteChange.toFixed(1)}% vs previous 7 days`
        : "Quote activity unavailable",
      href: "/dashboard/analytics?days=7",
      cta: "View analytics",
    },
    {
      label: "Pending decisions",
      value: count(data.pendingCount),
      help: "All pending requests, excluding paid quotes",
      href: "/dashboard/quotes",
      cta: "Review quotes",
    },
    {
      label: "Open quote value",
      value: money(data.openValue),
      help: "Pending estimates · not collected revenue",
      href: "/dashboard/quotes",
      cta: "Open pipeline",
    },
    {
      label: "Active jobs",
      value: count(data.activeCount),
      help: "Pending, ready, in progress and issue statuses",
      href: "/dashboard/ops/jobs",
      cta: "Open dispatch",
    },
  ];
  return (
    <div
      className={`${a.root} ${s.root}`}
      aria-busy={refreshing}
      data-qalt-overview
    >
      <header className={s.header}>
        <div>
          <span className={a.eyebrow}>
            <span aria-hidden="true" /> Workspace overview
          </span>
          <h1>Business, in view.</h1>
          <p>
            Welcome back, <strong>{data.companyName}</strong>. Your quotes,
            customer experience and delivery operations in one workspace.
          </p>
        </div>
        <div className={s.headerActions}>
          <button
            disabled={refreshing}
            onClick={() => startTransition(() => router.refresh())}
          >
            {refreshing ? "Refreshing…" : "Refresh overview"}
          </button>
          <Link href="/dashboard/quotes">
            Open quotes <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>
      <div className={s.context}>
        <span>
          <strong>
            {data.plan.charAt(0) + data.plan.slice(1).toLowerCase()} workspace
          </strong>{" "}
          · Company-specific data
        </span>
        <span>
          Snapshot{" "}
          {new Date(data.updatedAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "UTC",
          })}{" "}
          UTC
        </span>
      </div>
      {data.unavailable && (
        <div role="status" className={s.warning}>
          Some account data could not load. Unavailable metrics show a dash;
          refresh to try again.
        </div>
      )}
      <div className={a.metrics}>
        {metrics.map((metric, i) => (
          <section className={`${a.metric} ${s.metric}`} key={metric.label}>
            <div className={a.metricLabel}>
              <span>{metric.label}</span>
              <span className={a.metricIndex}>0{i + 1}</span>
            </div>
            <strong>{metric.value}</strong>
            <p>{metric.help}</p>
            <Link href={metric.href}>
              {metric.cta} <span aria-hidden="true">↗</span>
            </Link>
          </section>
        ))}
      </div>
      <div className={s.workspaceGrid}>
        <div className={s.content}>
          <section className={a.panel}>
            <div className={a.sectionHeading}>
              <div>
                <h2>Quote momentum</h2>
                <p>Last 7 UTC calendar days. Today is still in progress.</p>
              </div>
              <Link className={s.inlineLink} href="/dashboard/analytics?days=7">
                Full analytics ↗
              </Link>
            </div>
            <div className={s.trendSummary}>
              <strong>{count(report?.summary.count ?? null)}</strong>
              <span>requests</span>
              <div>
                <span>{money(report?.summary.quotedValue ?? null)}</span>
                <small>quoted value · estimates</small>
              </div>
            </div>
            {report && (report.summary.count > 0 || report.prior.count > 0) ? (
              <>
                <div className={a.legend}>
                  <span>
                    <i />
                    This week
                  </span>
                  <span>
                    <i className={a.previousDot} />
                    Previous 7 days, aligned by day
                  </span>
                </div>
                <div
                  className={a.chart}
                  role="img"
                  aria-label={`Quote requests over seven days. ${report.summary.count} this period and ${report.prior.count} in the previous period. Daily data table available below.`}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={report.daily}
                      margin={{ top: 12, right: 10, left: -15, bottom: 6 }}
                      accessibilityLayer
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="var(--chart-grid)"
                      />
                      <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--muted)", fontSize: 11 }}
                      />
                      <YAxis
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--muted)", fontSize: 11 }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 10,
                          background: "var(--surface)",
                          border: "1px solid var(--line)",
                          color: "var(--ink)",
                        }}
                      />
                      <Bar
                        name="This period"
                        dataKey="quotes"
                        fill="#b92e3b"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={35}
                        isAnimationActive={false}
                      />
                      <Line
                        name="Previous period"
                        dataKey="previous"
                        stroke="#94a3b8"
                        strokeDasharray="4 4"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className={s.chartEmpty}>
                <div className={s.emptyMark} aria-hidden="true">
                  ↗
                </div>
                <strong>
                  {report
                    ? "Your next request starts the story"
                    : "Quote activity could not load"}
                </strong>
                <p>
                  {report
                    ? "Share your quote form or install the widget. Your measured activity will appear here."
                    : "Refresh the Overview to retrieve the latest activity."}
                </p>
                {report && (
                  <Link href="/dashboard/embed">Check embed setup ↗</Link>
                )}
              </div>
            )}
            {report && (
              <>
                <button
                  className={a.textButton}
                  aria-expanded={tableOpen}
                  aria-controls="overview-daily-table"
                  onClick={() => setTableOpen(!tableOpen)}
                >
                  {tableOpen ? "Hide" : "View"} daily data
                </button>
                {tableOpen && (
                  <div id="overview-daily-table" className={a.tableScroll}>
                    <table>
                      <caption>
                        Daily requests, UTC. Previous days are aligned by
                        position.
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Requests</th>
                          <th scope="col">Previous period</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.daily.map((day) => (
                          <tr key={day.date}>
                            <th scope="row">{day.date}</th>
                            <td>{day.quotes}</td>
                            <td>{day.previous}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </section>
          <section className={a.panel}>
            <div className={a.sectionHeading}>
              <div>
                <h2>Quote inbox</h2>
                <p>Your latest five non-deleted requests, across all dates.</p>
              </div>
              <Link className={s.inlineLink} href="/dashboard/quotes">
                View all ↗
              </Link>
            </div>
            {data.recent === null ? (
              <div className={a.smallEmpty}>
                Recent requests are unavailable. Refresh to retry.
              </div>
            ) : data.recent.length === 0 ? (
              <div className={s.inboxEmpty}>
                <strong>Your quote inbox is ready</strong>
                <p>
                  New customer requests appear here when they submit your form.
                </p>
                <Link href="/dashboard/embed">Get embed code ↗</Link>
              </div>
            ) : (
              <div className={s.inbox}>
                {data.recent.map((q) => (
                  <Link
                    key={q.id}
                    href={`/dashboard/quotes?quoteId=${encodeURIComponent(q.id)}`}
                    className={s.request}
                  >
                    <span className={s.avatar} aria-hidden="true">
                      {q.customerName.trim().charAt(0).toUpperCase() || "Q"}
                    </span>
                    <div className={s.requestIdentity}>
                      <strong>{q.customerName || "Customer request"}</strong>
                      <span>
                        {q.pickupZip} → {q.dropoffZip} ·{" "}
                        {Number.isFinite(q.distanceMiles)
                          ? `${q.distanceMiles.toFixed(1)} mi`
                          : "Distance unavailable"}
                      </span>
                    </div>
                    <span className={s.quoteStatus}>
                      {quoteName(q.status, q.paymentStatus)}
                    </span>
                    <div className={s.requestValue}>
                      <strong>{money(q.estimatedPrice)}</strong>
                      <span>{date(q.createdAt)} UTC</span>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            )}
          </section>
          <section className={a.panel}>
            <div className={a.sectionHeading}>
              <div>
                <h2>Dispatch workspace</h2>
                <p>
                  Open jobs ordered by scheduled date, including past-due work.
                </p>
              </div>
              <Link className={s.inlineLink} href="/dashboard/ops/jobs">
                All jobs ↗
              </Link>
            </div>
            <div className={s.jobSummary}>
              {["READY", "IN_PROGRESS", "ISSUE"].map((status) => (
                <div key={status}>
                  <span>{jobNames[status]}</span>
                  <strong>
                    {count(
                      data.jobStatuses?.find((item) => item.status === status)
                        ?.count ?? null,
                    )}
                  </strong>
                </div>
              ))}
            </div>
            {data.jobs === null ? (
              <div className={a.smallEmpty}>
                Dispatch data is unavailable. Refresh to retry.
              </div>
            ) : data.jobs.length === 0 ? (
              <div className={a.smallEmpty}>
                No active jobs. Open dispatch to schedule and manage delivery
                work.
              </div>
            ) : (
              <div className={s.jobs}>
                {data.jobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/dashboard/ops/jobs/${job.id}`}
                    className={s.job}
                  >
                    <div>
                      <span
                        className={
                          job.status === "ISSUE" ? s.issueTag : s.jobTag
                        }
                      >
                        {jobNames[job.status] ?? job.status}
                      </span>
                      <span className={s.jobDate}>{date(job.date)} UTC</span>
                    </div>
                    <strong>{job.route}</strong>
                    <span className={s.jobId}>
                      #{job.id.slice(-6).toUpperCase()}{" "}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
        <aside className={s.sidebar} aria-label="Workspace status and actions">
          <section className={`${a.panel} ${s.attention}`}>
            <span className={a.eyebrow}>Recommended next step</span>
            <h2>{attention.title}</h2>
            <p>{attention.body}</p>
            <Link href={attention.href}>
              {attention.cta} <span aria-hidden="true">↗</span>
            </Link>
          </section>
          <section className={a.panel}>
            <div className={a.sectionHeading}>
              <div>
                <h2>Customer experience</h2>
                <p>Measured setup signals, refreshed on demand.</p>
              </div>
            </div>
            <div className={s.signal}>
              <span className={s.signalDot} aria-hidden="true" />
              <div>
                <strong>{data.embedStatus}</strong>
                <p>
                  {data.quotaReached
                    ? "Quote allowance resets on the first at 00:00 UTC, or upgrade your plan."
                    : data.lastEmbedAt
                      ? `Last external embed load ${date(data.lastEmbedAt)} UTC. Detection does not verify website uptime.`
                      : "No external embed load has been recorded. A hosted form may still be available."}
                </p>
              </div>
            </div>
            <dl className={s.configuration}>
              <div>
                <dt>Default base rate</dt>
                <dd>
                  {data.baseRate === null
                    ? "Not configured"
                    : `$${data.baseRate.toFixed(2)} / mi`}
                </dd>
              </div>
              <div>
                <dt>All-time requests</dt>
                <dd>{count(data.total)}</dd>
              </div>
            </dl>
            <Link className={s.inlineLink} href="/dashboard/widget">
              Review customer form ↗
            </Link>
          </section>
          <section className={a.panel}>
            <button
              className={s.setupToggle}
              onClick={() => setSetupOpen(!setupOpen)}
              aria-expanded={setupOpen}
              aria-controls="overview-setup"
            >
              <div>
                <h2>Workspace setup</h2>
                <p>
                  {completed} of {data.setup.length} signals ready
                </p>
              </div>
              <span aria-hidden="true">{setupOpen ? "−" : "+"}</span>
            </button>
            <div
              className={s.setupProgress}
              role="progressbar"
              aria-label="Workspace setup readiness"
              aria-valuenow={completed}
              aria-valuemin={0}
              aria-valuemax={data.setup.length}
            >
              <span
                style={{ width: `${(completed / data.setup.length) * 100}%` }}
              />
            </div>
            {setupOpen && (
              <ul id="overview-setup" className={s.setupList}>
                {data.setup.map((task) => (
                  <li key={task.id}>
                    <span
                      className={task.done === true ? s.complete : s.incomplete}
                      aria-hidden="true"
                    >
                      {task.done === true
                        ? "✓"
                        : task.done === null
                          ? "?"
                          : "·"}
                    </span>
                    <div>
                      <Link href={task.href}>{task.label} ↗</Link>
                      <p>
                        {task.done === null
                          ? "Status unavailable. Refresh to retry."
                          : task.done
                            ? "Ready to review"
                            : task.description}
                      </p>
                    </div>
                    <span className={s.setupState}>
                      {task.done === true
                        ? "Ready"
                        : task.done === null
                          ? "Unknown"
                          : "Review"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className={a.panel}>
            <div className={a.sectionHeading}>
              <div>
                <h2>Monthly capacity</h2>
                <p>
                  {data.plan.charAt(0) + data.plan.slice(1).toLowerCase()} plan
                  · UTC calendar month
                </p>
              </div>
            </div>
            <div className={s.capacity}>
              <strong>{count(data.monthly)}</strong>
              <span>
                {data.quotaLimit === "unlimited"
                  ? "requests · unlimited allowance"
                  : `of ${data.quotaLimit} requests used`}
              </span>
            </div>
            {data.quotaLimit !== "unlimited" && data.monthly !== null && (
              <>
                <div
                  className={s.setupProgress}
                  role="progressbar"
                  aria-label="Monthly quote allowance used"
                  aria-valuenow={Math.min(data.monthly, data.quotaLimit)}
                  aria-valuemin={0}
                  aria-valuemax={data.quotaLimit}
                >
                  <span
                    style={{
                      width: `${Math.min(100, (data.monthly / data.quotaLimit) * 100)}%`,
                    }}
                  />
                </div>
                <p className={s.capacityNote}>
                  {Math.max(0, data.quotaLimit - data.monthly)} remaining ·
                  Resets on the first at 00:00 UTC.
                </p>
              </>
            )}
            <p className={s.capacityNote}>
              Usage includes deleted requests. Deleting a quote does not return
              allowance.
            </p>
            <Link className={s.inlineLink} href="/dashboard/billing">
              Manage subscription ↗
            </Link>
          </section>
        </aside>
      </div>
      <nav className={s.quickActions} aria-label="Quick workspace actions">
        {[
          {
            label: "Quote forms",
            text: "Manage what customers submit",
            href: "/dashboard/forms",
          },
          {
            label: "Pricing rules",
            text: "Review rates and service extras",
            href: "/dashboard/pricing",
          },
          {
            label: "Customer contact",
            text: "Choose who customers reach",
            href: "/dashboard/settings/customer-contact",
          },
          {
            label: "Full analytics",
            text: "Explore demand and quote outcomes",
            href: "/dashboard/analytics",
          },
        ].map((link) => (
          <Link href={link.href} key={link.label}>
            <div>
              <strong>{link.label}</strong>
              <span>{link.text}</span>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </nav>
      <div className={s.updates}>
        <WhatsNewHighlight />
      </div>
    </div>
  );
}
