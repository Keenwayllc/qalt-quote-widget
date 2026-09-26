import { Check, Mail, MessageSquare, Phone, Voicemail } from "lucide-react";

/**
 * Visuals for each stop of the homepage intro journey. Every element that
 * animates carries `--t` (its delay after the stop becomes active); intro.css
 * only runs those animations inside `.qj-scene[data-active]`, so arriving at a
 * stop (or coming back to it) replays its demo.
 *
 * Demo names and numbers are fictional. Avoid strings that
 * MarketingDemoDiversity rewrites (e.g. "Jordan Lee", "$127", "20.8 mi").
 */

type Vars = Record<string, string | number>;
export const vars = (v: Vars) => v as React.CSSProperties;
const at = (t: number) => vars({ "--t": `${t}s` });

/* ── Shared pieces ─────────────────────────────────────────────────────── */

function Field({ label, value, t, typed = true }: { label: string; value: string; t: number; typed?: boolean }) {
  return (
    <div className="qj-field" style={at(t)}>
      <span className="qj-field__label">{label}</span>
      <span className={typed ? "qj-field__value qj-type" : "qj-field__value qj-in"}>{value}</span>
    </div>
  );
}

function WidgetCard({ children, badge = true }: { children: React.ReactNode; badge?: boolean }) {
  return (
    <div className="qj-card">
      <div className="qj-card__head">
        <span className="qj-card__logo">SC</span>
        <span className="qj-card__name">
          <b>Summit Courier Co.</b>
          <small>Local delivery, made simple</small>
        </span>
        {badge && <em>Powered by Qalt</em>}
      </div>
      <div className="qj-card__body">{children}</div>
    </div>
  );
}

const PRICE_DIGITS = [8, 4, 5, 0];
const DIGIT_STRIP = Array.from({ length: 30 }, (_, i) => i % 10);

function Odometer({ t }: { t: number }) {
  return (
    <div className="qj-price" style={at(t)}>
      <span className="qj-price__cur">$</span>
      {PRICE_DIGITS.map((digit, i) => (
        <span key={i} className="qj-price__col">
          {i === 2 && <span className="qj-price__dot">.</span>}
          <span className="qj-price__digit">
            <span className="qj-price__strip" style={vars({ "--to": 20 + digit, "--i": i })}>
              {DIGIT_STRIP.map((n, k) => (
                <span key={k}>{n}</span>
              ))}
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}

/* ── Stop 0: the problem ───────────────────────────────────────────────── */

const INBOX = [
  { Icon: Phone, title: "Missed call", meta: "(626) 555-0192 · 8:02 AM" },
  { Icon: MessageSquare, title: "“How much to move a couch to Pasadena?”", meta: "Text · 8:05 AM" },
  { Icon: Mail, title: "Quote request: 2 pallets, Vernon to Ontario", meta: "Email · 8:11 AM" },
  { Icon: Voicemail, title: "Voicemail · 0:42", meta: "(818) 555-0117 · 8:19 AM" },
  { Icon: MessageSquare, title: "“Still waiting on that price…”", meta: "Text · 9:40 AM" },
];

export function InboxVisual() {
  return (
    <div className="qj-inbox">
      <div className="qj-inbox__head">
        <span>Quote requests today</span>
        <b className="qj-in" style={at(1.1)}>12 waiting</b>
      </div>
      {INBOX.map(({ Icon, title, meta }, i) => (
        <div key={i} className="qj-msg qj-in" style={at(0.15 + i * 0.16)}>
          <span className="qj-msg__icon">
            <Icon size={15} strokeWidth={2.2} />
          </span>
          <span className="qj-msg__text">
            <b>{title}</b>
            <small>{meta}</small>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Stop 1: embed on your site ────────────────────────────────────────── */

export function EmbedVisual() {
  return (
    <div className="qj-embed">
      <div className="qj-browser">
        <div className="qj-browser__bar">
          <i />
          <i />
          <i />
          <span>summitcourier.com</span>
        </div>
        <div className="qj-site">
          <div className="qj-site__nav">
            <b>Summit Courier</b>
            <span>Services</span>
            <span>Areas</span>
            <span>Contact</span>
          </div>
          <div className="qj-site__body">
            <div className="qj-site__copy">
              <h4>Same-day delivery across LA</h4>
              <p>Furniture, appliances, and palletized freight.</p>
              <i />
              <i />
              <i />
            </div>
            <div className="qj-site__slot">
              <div className="qj-mini qj-drop" style={at(1.15)}>
                <b>Get an instant quote</b>
                <span />
                <span />
                <span className="is-short" />
                <em>Get my price</em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="qj-code">
        <span className="qj-code__label">Paste once</span>
        <code className="qj-type qj-type--slow" style={at(0.25)}>
          {'<iframe src="https://www.qalt.site/widget/form/…" />'}
        </code>
      </div>
      <div className="qj-platforms qj-in" style={at(1.5)}>
        <span>WordPress</span>
        <span>Shopify</span>
        <span>Webflow</span>
        <span>Any site</span>
      </div>
    </div>
  );
}

/* ── Stop 2: delivery details ──────────────────────────────────────────── */

export function DetailsVisual() {
  return (
    <WidgetCard>
      <p className="qj-eyebrow">Delivery request</p>
      <h3 className="qj-card__title">Where are we going?</h3>
      <Field label="Pickup" value="1420 S Alameda St, Los Angeles" t={0.3} />
      <Field label="Delivery" value="8800 Sunset Blvd, West Hollywood" t={0.95} />
      <div className="qj-row">
        <Field label="Shipment" value="Sofa · 2 flights" t={1.55} typed={false} />
        <Field label="Date" value="Fri, Oct 3 · 9 AM" t={1.7} typed={false} />
      </div>
      <div className="qj-chips">
        <span className="qj-chip qj-on" style={at(1.9)}>Inside delivery</span>
        <span className="qj-chip qj-on" style={at(2.05)}>Stairs</span>
        <span className="qj-chip">Assembly</span>
      </div>
      <div className="qj-btn qj-press" style={at(2.35)}>
        Get instant quote <span aria-hidden>→</span>
      </div>
    </WidgetCard>
  );
}

/* ── Stop 3: pricing rules (operator side, dashboard styling) ──────────── */

const RULES = [
  { label: "Rate per mile", value: "$2.50", fill: 0.62 },
  { label: "Stairs, per flight", value: "$10.00", fill: 0.3 },
  { label: "Inside delivery", value: "$18.50", fill: 0.46 },
];

export function RulesVisual() {
  return (
    <div className="qj-panel">
      <div className="qj-panel__head">
        <span>Pricing rules</span>
        <em className="qj-in" style={at(1.9)}>
          <Check size={12} strokeWidth={3} /> Saved
        </em>
      </div>
      {RULES.map((r, i) => (
        <div key={r.label} className="qj-rule qj-in" style={at(0.15 + i * 0.12)}>
          <div className="qj-rule__row">
            <span>{r.label}</span>
            <b>{r.value}</b>
          </div>
          <div className="qj-slider">
            <i className="qj-grow" style={vars({ "--t": `${0.35 + i * 0.15}s`, "--fill": r.fill })} />
          </div>
        </div>
      ))}
      <div className="qj-toggle-row qj-in" style={at(0.75)}>
        <span>
          Minimum charge <b>$45.00</b>
        </span>
        <span className="qj-toggle qj-toggle--on" style={at(1.2)} />
      </div>
      <div className="qj-toggle-row qj-in" style={at(0.87)}>
        <span>
          After-hours fee <b>$25.00</b>
        </span>
        <span className="qj-toggle" />
      </div>
      <div className="qj-zips qj-in" style={at(1.0)}>
        <span className="qj-zips__label">Service ZIPs</span>
        {["90012", "90021", "90069", "91101", "+38"].map((z, i) => (
          <span key={z} className="qj-zip qj-pop" style={at(1.1 + i * 0.08)}>
            {z}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Stop 4: instant quote ─────────────────────────────────────────────── */

const ROUTE = "M18 62 H96 V34 H190 V70 H270 V24 H342";

export function QuoteVisual() {
  return (
    <WidgetCard>
      <p className="qj-eyebrow">Instant quote</p>
      <h3 className="qj-card__title">Your delivery estimate</h3>
      <div className="qj-map">
        <svg viewBox="0 0 360 90" fill="none">
          <path d={ROUTE} className="qj-map__ghost" />
          <path d={ROUTE} pathLength={1} className="qj-map__route" style={at(0.2)} />
          <rect x="13" y="57" width="10" height="10" className="qj-map__pin qj-pop" style={at(0.1)} />
          <rect x="337" y="19" width="10" height="10" className="qj-map__pin qj-pop" style={at(0.85)} />
        </svg>
        <span className="qj-map__miles qj-in" style={at(0.85)}>
          18.4 mi
        </span>
      </div>
      <div className="qj-line qj-in" style={at(0.45)}>
        <span>Distance · 18.4 mi × $2.50</span>
        <b>$46.00</b>
      </div>
      <div className="qj-line qj-in" style={at(0.6)}>
        <span>Stairs · 2 flights × $10.00</span>
        <b>$20.00</b>
      </div>
      <div className="qj-line qj-in" style={at(0.75)}>
        <span>Inside delivery</span>
        <b>$18.50</b>
      </div>
      <div className="qj-total qj-in" style={at(0.9)}>
        <span>Total</span>
        <Odometer t={1.0} />
      </div>
    </WidgetCard>
  );
}

/* ── Stop 5: pay & book ────────────────────────────────────────────────── */

export function BookVisual() {
  return (
    <WidgetCard>
      <p className="qj-eyebrow">Pay & book</p>
      <h3 className="qj-card__title">Confirm your delivery</h3>
      <div className="qj-row">
        <Field label="Name" value="Dana Ruiz" t={0.3} />
        <Field label="Phone" value="(213) 555-0148" t={0.65} />
      </div>
      <div className="qj-summary qj-in" style={at(0.15)}>
        <b>Alameda St → Sunset Blvd</b>
        <span>18.4 mi · Fri, Oct 3 · Sofa, 2 flights</span>
      </div>
      <Field label="Card" value="•••• 4242   12/28" t={1.0} />
      <div className="qj-btn qj-press" style={at(1.55)}>
        Pay & Book · $84.50
        <span className="qj-btn__booked" style={at(1.8)}>
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M5 10.5l3.2 3.2L15 7" pathLength={1} />
          </svg>
          Booked · Confirmation sent
        </span>
      </div>
    </WidgetCard>
  );
}

/* ── Stop 6: your brand ────────────────────────────────────────────────── */

const BRANDS = [
  { initials: "SC", name: "Summit Courier Co." },
  { initials: "BB", name: "Bluebird Couriers" },
  { initials: "ER", name: "Evergreen Rx Delivery" },
  { initials: "CM", name: "Copper Moving Co." },
];

export function BrandVisual() {
  return (
    <div className="qj-brand">
      <div className="qj-card qj-card--brand">
        <div className="qj-card__head">
          <span className="qj-card__logo qj-cycle-wrap">
            {BRANDS.map((b, i) => (
              <span key={b.initials} className="qj-cycle" style={vars({ "--k": i })}>
                {b.initials}
              </span>
            ))}
          </span>
          <span className="qj-card__name qj-cycle-wrap">
            {BRANDS.map((b, i) => (
              <span key={b.name} className="qj-cycle" style={vars({ "--k": i })}>
                <b>{b.name}</b>
                <small>Instant delivery quotes</small>
              </span>
            ))}
          </span>
          <em className="qj-unbrand">Powered by Qalt</em>
        </div>
        <div className="qj-card__body">
          <p className="qj-eyebrow">Delivery request</p>
          <h3 className="qj-card__title">Where are we going?</h3>
          <div className="qj-field">
            <span className="qj-field__label">Pickup</span>
            <span className="qj-field__value">1420 S Alameda St, Los Angeles</span>
          </div>
          <div className="qj-field">
            <span className="qj-field__label">Delivery</span>
            <span className="qj-field__value">8800 Sunset Blvd, West Hollywood</span>
          </div>
          <div className="qj-btn">Get instant quote →</div>
        </div>
      </div>
      <div className="qj-swatches">
        <span className="qj-swatches__label">Brand color</span>
        {BRANDS.map((b, i) => (
          <span key={b.initials} className="qj-swatch" style={vars({ "--k": i })} />
        ))}
      </div>
    </div>
  );
}

/* ── Stop 7: ops console ───────────────────────────────────────────────── */

const JOBS = [
  { who: "M. Okafor", route: "Burbank → Glendale", price: "$62.00", status: "Scheduled", tone: "amber" },
  { who: "Lakeside Florals", route: "3 stops · Echo Park", price: "$118.00", status: "In transit", tone: "amber" },
  { who: "R. Patel", route: "Torrance → Carson", price: "$74.25", status: "Delivered", tone: "emerald" },
];
const BARS = [0.35, 0.5, 0.42, 0.66, 0.58, 0.8, 0.94];

export function OpsVisual() {
  return (
    <div className="qj-panel qj-ops">
      <div className="qj-panel__head">
        <span>Ops Console · Jobs</span>
        <em className="qj-live">Live</em>
      </div>
      <div className="qj-job qj-job--new qj-drop" style={at(0.35)}>
        <span className="qj-job__who">
          <b>Dana Ruiz</b>
          <small>Alameda St → Sunset Blvd</small>
        </span>
        <b>$84.50</b>
        <span className="qj-status qj-status--red">Paid · New</span>
      </div>
      {JOBS.map((j, i) => (
        <div key={j.who} className="qj-job qj-in" style={at(0.1 + i * 0.08)}>
          <span className="qj-job__who">
            <b>{j.who}</b>
            <small>{j.route}</small>
          </span>
          <b>{j.price}</b>
          <span className={`qj-status qj-status--${j.tone}`}>{j.status}</span>
        </div>
      ))}
      <div className="qj-chart qj-in" style={at(0.6)}>
        <div className="qj-chart__head">
          <span>Quote volume · this week</span>
          <span>Where leads drop off →</span>
        </div>
        <div className="qj-chart__bars">
          {BARS.map((h, i) => (
            <i key={i} className="qj-bar" style={vars({ "--h": h, "--t": `${0.75 + i * 0.07}s` })} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Stop 8: arrived ───────────────────────────────────────────────────── */

const TIMELINE = [
  { time: "8:02 AM", text: "Customer opens your quote form" },
  { time: "8:03 AM", text: "Price shown · $84.50" },
  { time: "8:04 AM", text: "Booked and paid" },
  { time: "8:04 AM", text: "Job lands in your Ops Console" },
];

export function ArrivalVisual() {
  return (
    <div className="qj-receipt">
      <div className="qj-receipt__head">
        <span>Job #1042</span>
        <em className="qj-stamp qj-pop" style={at(1.1)}>
          Delivered
        </em>
      </div>
      {TIMELINE.map((row, i) => (
        <div key={i} className="qj-receipt__row qj-in" style={at(0.15 + i * 0.15)}>
          <span>{row.time}</span>
          <b>{row.text}</b>
        </div>
      ))}
      <div className="qj-receipt__foot qj-in" style={at(0.85)}>
        <span>Phone calls needed</span>
        <b>0</b>
      </div>
    </div>
  );
}
