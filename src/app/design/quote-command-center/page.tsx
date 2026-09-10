import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  Route,
  Send,
  Truck,
  User,
} from "lucide-react";
import styles from "./quote-command-center.module.css";

const lineItems = [
  ["Base service", "$60.00"],
  ["Mileage · 34.8 mi × $2.75", "$95.70"],
  ["Inside delivery", "$18.00"],
  ["After-hours service", "$10.80"],
];

const stages = [
  ["Quote created", "Sep 5 · 9:42 PM", "done"],
  ["Quote sent", "Sep 5 · 9:44 PM", "done"],
  ["Customer viewed", "Sep 5 · 9:51 PM", "done"],
  ["Booked", "Sep 5 · 10:02 PM", "done"],
  ["Paid", "Sep 5 · 10:04 PM", "done"],
  ["Invoice issued", "Sep 5 · 10:04 PM", "current"],
] as const;

export default function QuoteCommandCenterDesignPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.topbar}>
          <div>
            <span className={styles.kicker}>Qalt product design preview</span>
            <h1>Quote Command Center + customer documents</h1>
            <p>
              A visual prototype for how one customer quote can flow from inquiry to payment, invoice,
              and operations without leaving the merchant console.
            </p>
          </div>
          <Link href="/dashboard/quotes" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Quotes
          </Link>
        </div>

        <section className={styles.commandCenter}>
          <div className={styles.commandHeader}>
            <div>
              <div className={styles.eyebrowRow}>
                <span className={styles.quoteNumber}>Q-2026-00124</span>
                <span className={styles.paidBadge}><CheckCircle2 size={13} /> Paid</span>
              </div>
              <h2>Maria Rodriguez</h2>
              <div className={styles.contactRow}>
                <span><Mail size={14} /> maria@example.com</span>
                <span><Phone size={14} /> (619) 555-0184</span>
              </div>
            </div>
            <div className={styles.totalBlock}>
              <span>Quote total</span>
              <strong>$184.50</strong>
              <small>Paid Sep 5, 2026</small>
            </div>
          </div>

          <div className={styles.tabs}>
            {['Customer', 'Route', 'Pricing', 'Payment', 'Documents', 'Job'].map((tab) => (
              <span key={tab} className={tab === 'Documents' ? styles.activeTab : undefined}>{tab}</span>
            ))}
          </div>

          <div className={styles.commandGrid}>
            <div className={styles.leftColumn}>
              <article className={styles.panel}>
                <div className={styles.panelHeading}>
                  <div>
                    <span className={styles.iconBox}><Route size={17} /></span>
                    <div>
                      <p className={styles.label}>Delivery route</p>
                      <h3>San Diego → La Jolla</h3>
                    </div>
                  </div>
                  <span className={styles.distance}>34.8 miles</span>
                </div>
                <div className={styles.routeLine}>
                  <div><span className={styles.routeDot} /><div><small>Pickup</small><strong>1250 Harbor Dr, San Diego, CA 92101</strong></div></div>
                  <div><span className={styles.routeDotOutline} /><div><small>Dropoff</small><strong>7835 Ivanhoe Ave, La Jolla, CA 92037</strong></div></div>
                </div>
              </article>

              <article className={styles.panel}>
                <div className={styles.sectionTitle}>
                  <div><span className={styles.iconBox}><Package size={17} /></span><div><p className={styles.label}>Shipment</p><h3>Delivery details</h3></div></div>
                </div>
                <div className={styles.detailGrid}>
                  <div><small>Service</small><strong>Same-day</strong></div>
                  <div><small>Vehicle</small><strong>1 cargo van</strong></div>
                  <div><small>Weight</small><strong>420 lb</strong></div>
                  <div><small>Items</small><strong>4 pieces</strong></div>
                </div>
                <div className={styles.chips}>
                  <span>Inside delivery</span><span>After-hours</span><span>Signature required</span>
                </div>
              </article>

              <article className={styles.panel}>
                <div className={styles.sectionTitle}>
                  <div><span className={styles.iconBox}><CreditCard size={17} /></span><div><p className={styles.label}>Pricing</p><h3>Transparent breakdown</h3></div></div>
                </div>
                <div className={styles.breakdown}>
                  {lineItems.map(([name, amount]) => <div key={name}><span>{name}</span><strong>{amount}</strong></div>)}
                  <div className={styles.breakdownTotal}><span>Total</span><strong>$184.50</strong></div>
                </div>
              </article>
            </div>

            <div className={styles.rightColumn}>
              <article className={`${styles.panel} ${styles.documentsPanel}`}>
                <div className={styles.sectionTitle}>
                  <div><span className={styles.iconBox}><FileText size={17} /></span><div><p className={styles.label}>Documents</p><h3>Customer-ready files</h3></div></div>
                </div>

                <div className={styles.documentCard}>
                  <div className={styles.docIcon}><FileText size={20} /></div>
                  <div className={styles.docBody}>
                    <div className={styles.docTitleRow}><strong>Quote Q-2026-00124</strong><span className={styles.sentBadge}>Sent</span></div>
                    <p>Issued Sep 5, 2026 · Viewed 9:51 PM</p>
                    <div className={styles.docActions}>
                      <button><ExternalLink size={14} /> View</button>
                      <button><Download size={14} /> Download</button>
                      <button><Send size={14} /> Resend</button>
                    </div>
                  </div>
                </div>

                <div className={`${styles.documentCard} ${styles.invoiceCard}`}>
                  <div className={styles.docIcon}><CreditCard size={20} /></div>
                  <div className={styles.docBody}>
                    <div className={styles.docTitleRow}><strong>Invoice INV-2026-00081</strong><span className={styles.paidMini}>Paid</span></div>
                    <p>Issued Sep 5, 2026 · Payment received</p>
                    <div className={styles.docActions}>
                      <button><ExternalLink size={14} /> View</button>
                      <button><Download size={14} /> Download</button>
                      <button><Mail size={14} /> Email</button>
                    </div>
                  </div>
                </div>
              </article>

              <article className={`${styles.panel} ${styles.timelinePanel}`}>
                <p className={styles.label}>Activity timeline</p>
                <h3>Quote → payment → invoice</h3>
                <div className={styles.timeline}>
                  {stages.map(([name, time, state]) => (
                    <div key={name}>
                      <span className={state === 'current' ? styles.timelineCurrent : styles.timelineDone}><CheckCircle2 size={12} /></span>
                      <div><strong>{name}</strong><small>{time}</small></div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.pdfSection}>
          <div className={styles.pdfIntro}>
            <span className={styles.kicker}>Customer-facing document</span>
            <h2>Branded PDF that looks like the merchant, not Qalt</h2>
            <p>
              The document is generated from an immutable snapshot, so an old quote or paid invoice never changes when the merchant updates pricing later.
            </p>
            <div className={styles.pdfNotes}>
              <span><CheckCircle2 size={15} /> Merchant logo + brand color</span>
              <span><CheckCircle2 size={15} /> Full route + shipment details</span>
              <span><CheckCircle2 size={15} /> Exact line-item pricing</span>
              <span><CheckCircle2 size={15} /> Professional document number</span>
              <span><CheckCircle2 size={15} /> Paid status + safe payment reference</span>
            </div>
          </div>

          <div className={styles.pdfWrap}>
            <article className={styles.pdfSheet}>
              <div className={styles.pdfBrandBar} />
              <header className={styles.pdfHeader}>
                <div>
                  <div className={styles.merchantMark}>N</div>
                  <div><strong>Northline Delivery Co.</strong><span>Fast, local delivery</span></div>
                </div>
                <div className={styles.documentHeading}><span>QUOTE</span><strong>Q-2026-00124</strong><small>Issued Sep 5, 2026</small></div>
              </header>

              <div className={styles.pdfMeta}>
                <div><small>Prepared for</small><strong>Maria Rodriguez</strong><span>maria@example.com</span><span>(619) 555-0184</span></div>
                <div><small>Status</small><span className={styles.pdfPaid}>PAID</span></div>
              </div>

              <div className={styles.pdfRoute}>
                <div><MapPin size={15} /><span><small>Pickup</small><strong>1250 Harbor Dr, San Diego, CA 92101</strong></span></div>
                <div className={styles.pdfRouteLine} />
                <div><MapPin size={15} /><span><small>Dropoff</small><strong>7835 Ivanhoe Ave, La Jolla, CA 92037</strong></span></div>
              </div>

              <div className={styles.pdfStats}>
                <div><Route size={14} /><span><small>Distance</small><strong>34.8 mi</strong></span></div>
                <div><Truck size={14} /><span><small>Service</small><strong>Same-day</strong></span></div>
                <div><Package size={14} /><span><small>Shipment</small><strong>4 pieces · 420 lb</strong></span></div>
              </div>

              <div className={styles.pdfTable}>
                <div className={styles.pdfTableHead}><span>Description</span><span>Amount</span></div>
                {lineItems.map(([name, amount]) => <div key={name}><span>{name}</span><strong>{amount}</strong></div>)}
                <div className={styles.pdfTotal}><span>Total</span><strong>$184.50</strong></div>
              </div>

              <div className={styles.pdfFooter}>
                <p>Thank you for choosing Northline Delivery Co.</p>
                <span>Estimate reflects the services shown above. Final service is subject to the merchant's terms and booking confirmation.</span>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.guardrails}>
          <h2>Implementation guardrails for the real feature</h2>
          <div>
            <article><User size={18} /><strong>Tenant isolated</strong><p>Every quote, invoice, document, email action, and download must be scoped to the authenticated company.</p></article>
            <article><FileText size={18} /><strong>Immutable snapshots</strong><p>Issued documents render from saved historical data, never today's pricing configuration.</p></article>
            <article><CreditCard size={18} /><strong>Payment-safe</strong><p>Invoices come from trusted server-side Stripe payment confirmation and must be idempotent.</p></article>
          </div>
        </section>
      </div>
    </main>
  );
}
