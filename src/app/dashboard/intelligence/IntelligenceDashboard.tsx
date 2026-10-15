"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useRef, useState, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type {
  InsightPeriod,
  MerchantAlert,
  PeriodInsights,
  ProfitEstimate,
  QuoteFilter,
  QuoteStage,
  Recommendation,
} from "@/lib/merchant-intelligence";
import type { AssistantAnswer } from "@/lib/merchant-assistant";
import ProfitBreakdown, { TONE_LABEL } from "@/components/intelligence/ProfitBreakdown";
import styles from "./intelligence.module.css";

type Row = {
  id: string;
  customerName: string;
  createdAt: string;
  route: string;
  vehicle: string;
  serviceType: string;
  price: number;
  distanceMiles: number;
  stage: QuoteStage;
  status: string;
  paymentStatus: string | null;
  estimate: ProfitEstimate;
  attention: boolean;
};

export type IntelligenceView = {
  period: InsightPeriod;
  filter: QuoteFilter;
  search: string;
  updatedAt: string;
  costTableReady: boolean;
  costsConfigured: boolean;
  truncated: boolean;
  pipeline: {
    newQuotes: number;
    followUp: number;
    booked30d: number;
    scheduled: number;
    inProgress: number;
    issue: number;
    completed30d: number;
  };
  insights: PeriodInsights;
  alerts: MerchantAlert[];
  alertCount: number;
  recommendations: Recommendation[];
  filterCounts: Record<QuoteFilter, number>;
  table: { page: number; pages: number; total: number; rows: Row[] };
  suggestedQuestions: string[];
};

const usd = (value: number, digits = 0) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
const pct = (value: number) => `${Math.round(value * 10) / 10}%`;
const shortDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const PERIODS: { id: InsightPeriod; label: string }[] = [
  { id: "day", label: "Today" },
  { id: "week", label: "7 days" },
  { id: "month", label: "30 days" },
];
const FILTER_LABEL: Record<QuoteFilter, string> = {
  all: "All",
  attention: "Needs attention",
  follow_up: "Follow-up",
  low_margin: "Low margin",
  new: "New",
  booked: "Booked",
};
const STAGE_LABEL: Record<QuoteStage, string> = {
  new: "New",
  follow_up: "Follow-up",
  booked: "Booked",
  closed: "Closed",
  other: "Other",
};

/** URL-driven navigation with instant feedback while the server re-renders. */
function useQueryNav() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, start] = useTransition();
  const go = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") next.delete(k);
      else next.set(k, v);
    }
    start(() => router.push(`/dashboard/intelligence${next.size ? `?${next}` : ""}`, { scroll: false }));
  };
  return { go, pending, refresh: () => start(() => router.refresh()) };
}

export default function IntelligenceDashboard({ view }: { view: IntelligenceView }) {
  const nav = useQueryNav();
  const tableRef = useRef<HTMLElement>(null);
  const showFilter = (filter: QuoteFilter) => {
    nav.go({ filter: filter === "all" ? null : filter, page: null });
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const p = view.pipeline;

  return (
    <div className={styles.root}>
      {nav.pending && <div className={styles.progress} role="progressbar" aria-label="Updating" />}

      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>
            <span />
            Merchant intelligence
          </span>
          <h1>What needs you today</h1>
          <p>
            Follow-ups, margins and pricing signals from your own quotes. Profit figures are estimates from your cost settings and are
            never shown to customers.
          </p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.switcher} role="group" aria-label="Insights period">
            {PERIODS.map((period) => (
              <button
                key={period.id}
                type="button"
                aria-pressed={view.period === period.id}
                onClick={() => nav.go({ period: period.id === "week" ? null : period.id })}
              >
                {period.label}
              </button>
            ))}
          </div>
          <Link href="/dashboard/intelligence/costs" className={styles.button}>
            <SlidersHorizontal size={14} aria-hidden />
            Cost settings
          </Link>
        </div>
      </header>

      <SetupNotice view={view} />

      <nav className={styles.pipeline} aria-label="Pipeline">
        <Stage label="New quotes" value={p.newQuotes} hint="Within follow-up time" current={view.filter === "new"} onClick={() => showFilter("new")} />
        <Stage label="Needs follow-up" value={p.followUp} hint="Pending past your time" current={view.filter === "follow_up"} onClick={() => showFilter("follow_up")} />
        <Stage label="Booked" value={p.booked30d} hint="Last 30 days" current={view.filter === "booked"} onClick={() => showFilter("booked")} />
        <Stage label="Scheduled jobs" value={p.scheduled} hint="Pending or ready" href="/dashboard/ops/jobs" />
        <Stage
          label="In progress"
          value={p.inProgress}
          hint={p.issue ? `${p.issue} with an issue` : "Out for delivery"}
          alert={p.issue > 0}
          href="/dashboard/ops/jobs"
        />
        <Stage label="Completed" value={p.completed30d} hint="Jobs, last 30 days" href="/dashboard/ops/jobs" />
      </nav>

      <div className={styles.grid}>
        <AlertsPanel alerts={view.alerts} total={view.alertCount} onShowAll={() => showFilter("attention")} onChanged={nav.refresh} />
        <InsightsPanel insights={view.insights} costsConfigured={view.costsConfigured} />
      </div>

      <div className={styles.grid}>
        <RecommendationsPanel recommendations={view.recommendations} costsConfigured={view.costsConfigured} onApplied={nav.refresh} />
        <AssistantPanel suggestions={view.suggestedQuestions} />
      </div>

      <QuoteTable view={view} nav={nav} sectionRef={tableRef} />
    </div>
  );
}

function SetupNotice({ view }: { view: IntelligenceView }) {
  if (!view.costTableReady) {
    return (
      <div className={styles.notice} role="status">
        <div>
          <strong>Profit estimates are being set up</strong>
          <p>Cost settings will be available shortly. Follow-ups and quote insights below already use your live data.</p>
        </div>
      </div>
    );
  }
  if (view.costsConfigured) return null;
  return (
    <div className={styles.notice}>
      <div>
        <strong>Add four numbers to see profit on every quote</strong>
        <p>Fuel price, fuel efficiency, driver cost and average speed. Everything else is optional, and Qalt works the same without them.</p>
      </div>
      <Link href="/dashboard/intelligence/costs" className={styles.buttonPrimary}>
        Set up costs
      </Link>
    </div>
  );
}

function Stage(props: { label: string; value: number; hint: string; current?: boolean; alert?: boolean; onClick?: () => void; href?: string }) {
  const body = (
    <>
      <span className={styles.stageLabel}>{props.label}</span>
      <strong>{props.value.toLocaleString("en-US")}</strong>
      <span className={`${styles.stageHint} ${props.alert ? styles.stageAlert : ""}`}>{props.hint}</span>
    </>
  );
  return props.href ? (
    <Link href={props.href} className={styles.stage}>
      {body}
    </Link>
  ) : (
    <button type="button" className={styles.stage} aria-current={props.current ? "true" : undefined} onClick={props.onClick}>
      {body}
    </button>
  );
}

function AlertsPanel({ alerts, total, onShowAll, onChanged }: { alerts: MerchantAlert[]; total: number; onShowAll: () => void; onChanged: () => void }) {
  return (
    <section className={styles.panel} aria-labelledby="alerts-title">
      <div className={styles.panelHead}>
        <div>
          <h2 id="alerts-title">Needs attention</h2>
          <p>One line per quote, most urgent first. Nothing here contacts your customers.</p>
        </div>
        <span className={styles.count}>{total}</span>
      </div>
      {alerts.length === 0 ? (
        <div className={styles.empty}>
          <strong>You&apos;re all caught up</strong>
          <p>Stale quotes, unfinished checkouts, job issues and low-margin quotes from the last 30 days show up here.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {alerts.map((alert) => (
            <AlertRow key={alert.key} alert={alert} onChanged={onChanged} />
          ))}
        </ul>
      )}
      {total > alerts.length && (
        <button type="button" className={styles.buttonGhost} style={{ marginTop: 8 }} onClick={onShowAll}>
          Show all {total} in the quote list
        </button>
      )}
    </section>
  );
}

function AlertRow({ alert, onChanged }: { alert: MerchantAlert; onChanged: () => void }) {
  const [state, setState] = useState<{ busy: string | null; message: string | null; error: boolean }>({ busy: null, message: null, error: false });
  const setStatus = async (status: "WON" | "LOST") => {
    if (!alert.quoteId) return;
    setState({ busy: status, message: null, error: false });
    try {
      const res = await fetch(`/api/dashboard/quotes/${alert.quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setState({ busy: null, message: status === "WON" ? "Marked won" : "Marked lost", error: false });
      onChanged();
    } catch {
      setState({ busy: null, message: "Could not update. Try again.", error: true });
    }
  };
  const canClose = alert.kind === "stale_quote";
  return (
    <li className={styles.alert}>
      <span className={`${styles.dot} ${alert.severity === "high" ? styles.dotHigh : ""}`} aria-hidden />
      <div>
        <h3>{alert.title}</h3>
        <p>{alert.detail}</p>
        <div className={styles.reasons}>
          {alert.reasons.map((r) => (
            <span key={r} className={styles.reason}>
              {r}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.alertActions}>
        {alert.quoteId && (
          <Link className={styles.buttonGhost} href={`/dashboard/quotes?quoteId=${encodeURIComponent(alert.quoteId)}`}>
            Open quote
          </Link>
        )}
        {alert.jobId && !alert.quoteId && (
          <Link className={styles.buttonGhost} href="/dashboard/ops/jobs">
            Open jobs
          </Link>
        )}
        {canClose && alert.quoteId && (
          <>
            <button type="button" className={styles.buttonGhost} disabled={!!state.busy} onClick={() => setStatus("WON")}>
              {state.busy === "WON" ? "Saving…" : "Mark won"}
            </button>
            <button type="button" className={styles.buttonGhost} disabled={!!state.busy} onClick={() => setStatus("LOST")}>
              {state.busy === "LOST" ? "Saving…" : "Mark lost"}
            </button>
          </>
        )}
      </div>
      {state.message && (
        <span className={`${styles.inlineStatus} ${state.error ? styles.err : styles.ok}`} role="status">
          {state.message}
        </span>
      )}
    </li>
  );
}

function InsightsPanel({ insights: s, costsConfigured }: { insights: PeriodInsights; costsConfigured: boolean }) {
  const items: [string, string][] = [
    ["Quotes", s.totalQuotes.toLocaleString("en-US")],
    ["Booking rate", s.conversionRate === null ? "No quotes" : pct(s.conversionRate)],
    ["Booked value", usd(s.bookedValue)],
    ["Quoted value", usd(s.quotedValue)],
    ["Estimated profit", s.estimatedProfit === null ? (costsConfigured ? "No booked estimates" : "Add costs") : usd(s.estimatedProfit)],
    ["Avg. estimated margin", s.averageMargin === null ? "None yet" : pct(s.averageMargin)],
    ["Outstanding", `${s.outstandingCount} · ${usd(s.outstandingValue)}`],
    ["Low margin", s.lowMarginCount.toLocaleString("en-US")],
  ];
  return (
    <section className={styles.panel} aria-labelledby="insights-title">
      <div className={styles.panelHead}>
        <div>
          <h2 id="insights-title">Quote insights</h2>
          <p>Quotes created in the {s.label}.</p>
        </div>
      </div>
      <div className={styles.collected}>
        <span>Collected online</span>
        <strong>{usd(s.paidRevenue, 2)}</strong>
        <p>
          {s.paidCount} paid quote{s.paidCount === 1 ? "" : "s"} through Qalt checkout. Offline payments are not included.
        </p>
      </div>
      <dl className={styles.defs}>
        {items.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.footnote}>
        Booked, quoted and profit figures are estimates.
        {s.profitCoverage.booked > 0 && ` Profit covers ${s.profitCoverage.estimated} of ${s.profitCoverage.booked} booked quotes.`}
        {s.followUpCount > 0 && ` ${s.followUpCount} still need a follow-up.`}
      </p>
    </section>
  );
}

function RecommendationsPanel({ recommendations, costsConfigured, onApplied }: { recommendations: Recommendation[]; costsConfigured: boolean; onApplied: () => void }) {
  return (
    <section className={styles.panel} aria-labelledby="recs-title">
      <div className={styles.panelHead}>
        <div>
          <h2 id="recs-title">Pricing recommendations</h2>
          <p>From the last 90 days. Nothing changes unless you confirm it.</p>
        </div>
      </div>
      {recommendations.length === 0 ? (
        <div className={styles.empty}>
          <strong>No recommendations yet</strong>
          <p>
            {costsConfigured
              ? "Recommendations appear once a vehicle, route or pricing rule has at least 5 estimated quotes, so a few unusual jobs never drive a price change."
              : "Add your cost settings first. Recommendations compare your prices with what each delivery costs you."}
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {recommendations.map((rec) => (
            <RecommendationRow key={rec.id} rec={rec} onApplied={onApplied} />
          ))}
        </ul>
      )}
    </section>
  );
}

function RecommendationRow({ rec, onApplied }: { rec: Recommendation; onApplied: () => void }) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<{ busy: boolean; message: string | null; error: boolean }>({ busy: false, message: null, error: false });
  const proposal = rec.proposal;
  const format = (value: number) => (proposal?.field === "baseRatePerMile" ? `${usd(value, 2)}/mi` : usd(value, 2));
  const apply = async () => {
    if (!proposal) return;
    setStatus({ busy: true, message: null, error: false });
    try {
      const res = await fetch("/api/dashboard/intelligence/recommendations/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendationId: rec.id, proposed: proposal.proposed, confirm: true }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Could not save the change.");
      setStatus({ busy: false, message: `Saved. New quotes now use ${format(proposal.proposed)}.`, error: false });
      setConfirming(false);
      onApplied();
    } catch (error) {
      setStatus({ busy: false, message: error instanceof Error ? error.message : "Could not save the change.", error: true });
    }
  };
  const severity = rec.severity === "high" ? styles.loss : rec.severity === "medium" ? styles.below : styles.neutral;
  return (
    <li className={styles.rec}>
      <div className={styles.recHead}>
        <h3>{rec.title}</h3>
        <span className={`${styles.badge} ${severity}`}>{rec.severity === "info" ? "Insight" : rec.severity === "high" ? "Losing money" : "Below target"}</span>
      </div>
      <p>{rec.reasoning}</p>
      <div className={styles.reviewActions}>
        <button type="button" className={styles.button} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? "Hide review" : "Review recommendation"}
        </button>
        <span className={styles.count}>Based on {rec.sampleSize} quotes</span>
      </div>
      {open && (
        <div className={styles.review}>
          {proposal ? (
            <>
              <span className={styles.count}>{proposal.field === "minimumCharge" ? "Minimum charge" : "Rate per mile"}</span>
              <div className={styles.change}>
                <s>{format(proposal.current)}</s>
                <span aria-hidden>→</span>
                <span>{format(proposal.proposed)}</span>
              </div>
              <p>{proposal.explanation}</p>
              <div className={styles.reviewActions}>
                {confirming ? (
                  <>
                    <button type="button" className={styles.buttonPrimary} disabled={status.busy} onClick={apply}>
                      {status.busy ? "Saving…" : `Confirm ${format(proposal.proposed)}`}
                    </button>
                    <button type="button" className={styles.buttonGhost} disabled={status.busy} onClick={() => setConfirming(false)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className={styles.buttonPrimary} onClick={() => setConfirming(true)}>
                      Apply this change
                    </button>
                    <Link className={styles.buttonGhost} href={rec.reviewHref}>
                      Edit pricing myself
                    </Link>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <p style={{ marginTop: 0 }}>
                This needs your judgment, so Qalt won&apos;t suggest an automatic change. Compare it with your pricing and decide.
              </p>
              <div className={styles.reviewActions}>
                <Link className={styles.button} href={rec.reviewHref}>
                  Open settings
                </Link>
              </div>
            </>
          )}
          {status.message && (
            <p className={status.error ? styles.err : styles.ok} role="status" style={{ marginTop: 10, fontWeight: 700 }}>
              {status.message}
            </p>
          )}
        </div>
      )}
    </li>
  );
}

type Turn = { id: number; question: string; answer?: AssistantAnswer; error?: string };

function AssistantPanel({ suggestions }: { suggestions: string[] }) {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [turns]);
  const ask = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const id = Date.now();
    setTurns((t) => [...t, { id, question: q }].slice(-8));
    setQuestion("");
    setBusy(true);
    try {
      const res = await fetch("/api/dashboard/intelligence/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "The assistant is unavailable right now.");
      setTurns((t) => t.map((turn) => (turn.id === id ? { ...turn, answer: body.answer } : turn)));
    } catch (error) {
      setTurns((t) => t.map((turn) => (turn.id === id ? { ...turn, error: error instanceof Error ? error.message : "Something went wrong." } : turn)));
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className={`${styles.panel} ${styles.assistant}`} aria-labelledby="assistant-title">
      <div className={styles.panelHead}>
        <div>
          <h2 id="assistant-title">Ask Qalt</h2>
          <p>Answers come from your quotes and cost settings. It can&apos;t change prices, bookings or message customers.</p>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(question);
        }}
      >
        <label htmlFor="assistant-question" className={styles.srOnly}>
          Your question
        </label>
        <input
          id="assistant-question"
          className={styles.input}
          value={question}
          maxLength={300}
          placeholder="Which deliveries have low margins?"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit" className={styles.buttonPrimary} disabled={busy || !question.trim()}>
          {busy ? "Checking…" : "Ask"}
        </button>
      </form>
      {turns.length === 0 && (
        <div className={styles.chips}>
          {suggestions.map((s) => (
            <button key={s} type="button" className={styles.chip} onClick={() => ask(s)} disabled={busy}>
              {s}
            </button>
          ))}
        </div>
      )}
      {turns.length > 0 && (
        <div className={styles.thread} ref={threadRef} aria-live="polite">
          {turns.map((turn) => (
            <Fragment key={turn.id}>
              <div className={styles.question}>{turn.question}</div>
              <div className={styles.answer}>
                {turn.error ? (
                  <span className={styles.err}>{turn.error}</span>
                ) : !turn.answer ? (
                  <span className={styles.count}>Checking your numbers…</span>
                ) : (
                  <>
                    {turn.answer.answer}
                    {turn.answer.facts.length > 0 && (
                      <dl className={styles.facts}>
                        {turn.answer.facts.map((f) => (
                          <div key={f.label}>
                            <dt>{f.label}</dt>
                            <dd>{f.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {turn.answer.quoteIds.length > 0 && (
                      <div className={styles.links}>
                        {turn.answer.quoteIds.slice(0, 5).map((id, i) => (
                          <Link key={id} href={`/dashboard/quotes?quoteId=${encodeURIComponent(id)}`}>
                            Open quote {turn.answer!.quoteIds.length > 1 ? i + 1 : ""}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </Fragment>
          ))}
        </div>
      )}
      {turns.length > 0 && (
        <div className={styles.chips}>
          {suggestions.slice(0, 4).map((s) => (
            <button key={s} type="button" className={styles.chip} onClick={() => ask(s)} disabled={busy}>
              {s}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function QuoteTable({ view, nav, sectionRef }: { view: IntelligenceView; nav: ReturnType<typeof useQueryNav>; sectionRef: React.RefObject<HTMLElement | null> }) {
  const [term, setTerm] = useState(view.search);
  const [open, setOpen] = useState<string | null>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => {
      if (term.trim() !== view.search) nav.go({ q: term.trim() || null, page: null });
    }, 300);
    return () => clearTimeout(t);
    // nav.go is stable enough for a debounce; re-running on its identity would loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);
  const { table } = view;
  return (
    <section className={styles.panel} aria-labelledby="quotes-title" ref={sectionRef}>
      <div className={styles.panelHead}>
        <div>
          <h2 id="quotes-title">Quotes and estimated profit</h2>
          <p>
            Last 90 days{view.truncated ? ", latest 2,000 quotes" : ""}. Select a customer to see the cost breakdown.
          </p>
        </div>
        <span className={styles.count}>{table.total}</span>
      </div>
      <div className={styles.tableTools}>
        <div className={styles.search}>
          <Search size={14} aria-hidden />
          <label htmlFor="quote-search" className={styles.srOnly}>
            Search quotes
          </label>
          <input
            id="quote-search"
            className={styles.input}
            type="search"
            value={term}
            placeholder="Customer, ZIP, vehicle or service"
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div className={styles.filters} role="group" aria-label="Filter quotes">
          {(Object.keys(FILTER_LABEL) as QuoteFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              className={styles.filter}
              aria-pressed={view.filter === f}
              onClick={() => nav.go({ filter: f === "all" ? null : f, page: null })}
            >
              {FILTER_LABEL[f]}
              <span>{view.filterCounts[f]}</span>
            </button>
          ))}
        </div>
      </div>
      {table.rows.length === 0 ? (
        <div className={styles.empty}>
          <strong>{view.search || view.filter !== "all" ? "No quotes match" : "No quotes in the last 90 days"}</strong>
          <p>
            {view.search || view.filter !== "all"
              ? "Try another search or filter."
              : "New quote requests from your widget appear here with their estimated profit."}
          </p>
        </div>
      ) : (
        <div className={nav.pending ? styles.dimmed : undefined} aria-busy={nav.pending}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Route</th>
                <th>Vehicle</th>
                <th className={styles.right}>Quote</th>
                <th className={styles.right}>Est. profit</th>
                <th>Margin</th>
                <th>Stage</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <QuoteRow key={row.id} row={row} open={open === row.id} onToggle={() => setOpen((cur) => (cur === row.id ? null : row.id))} />
              ))}
            </tbody>
          </table>
          {table.pages > 1 && (
            <div className={styles.pager}>
              <span>
                Page {table.page} of {table.pages}
              </span>
              <div>
                <button type="button" className={styles.button} disabled={table.page <= 1 || nav.pending} onClick={() => nav.go({ page: String(table.page - 1) })}>
                  Previous
                </button>
                <button type="button" className={styles.button} disabled={table.page >= table.pages || nav.pending} onClick={() => nav.go({ page: String(table.page + 1) })}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function QuoteRow({ row, open, onToggle }: { row: Row; open: boolean; onToggle: () => void }) {
  const e = row.estimate;
  return (
    <>
      <tr data-open={open}>
        <td>
          <button type="button" className={styles.rowButton} aria-expanded={open} onClick={onToggle}>
            {row.attention && <span className={styles.attention} aria-label="Needs attention" />}
            {row.customerName || "Unnamed customer"}
          </button>
          <span className={styles.sub}>
            {shortDate(row.createdAt)} · {row.serviceType}
          </span>
        </td>
        <td data-label="Route">
          <span className={styles.num}>{row.route}</span>
          <span className={styles.sub}>{Math.round(row.distanceMiles * 10) / 10} mi</span>
        </td>
        <td data-label="Vehicle">{row.vehicle}</td>
        <td data-label="Quote" className={`${styles.right} ${styles.num}`}>
          {usd(row.price, 2)}
        </td>
        <td data-label="Est. profit" className={`${styles.right} ${styles.num}`}>
          {e.status === "ok" ? usd(e.profit, 2) : "N/A"}
        </td>
        <td data-label="Margin">
          {e.status === "ok" ? (
            <span className={`${styles.badge} ${styles[e.tone]}`} title={TONE_LABEL[e.tone]}>
              {pct(e.marginPercent)}
            </span>
          ) : (
            <span className={`${styles.badge} ${styles.neutral}`}>No estimate</span>
          )}
        </td>
        <td data-label="Stage">
          {STAGE_LABEL[row.stage]}
          {row.paymentStatus === "PAID" && <span className={styles.sub}>Paid online</span>}
        </td>
      </tr>
      {open && (
        <tr>
          <td colSpan={7} className={styles.detailCell}>
            <ProfitBreakdown estimate={e} />
            <p style={{ marginTop: 10 }}>
              <Link href={`/dashboard/quotes?quoteId=${encodeURIComponent(row.id)}`} style={{ color: "var(--accent)", fontWeight: 700, fontSize: 12 }}>
                Open full quote
              </Link>
            </p>
          </td>
        </tr>
      )}
    </>
  );
}
