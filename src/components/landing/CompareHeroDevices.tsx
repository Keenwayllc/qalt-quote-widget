"use client";

import { memo } from "react";
import styles from "./CompareHeroDevices.module.css";

// Decorative, illustrative screens based on Qalt's existing quote and console UI.
// No live customer data, analytics claims, or interactive controls are displayed.
function QuoteScreen() {
  return (
    <div className={styles.quote}>
      <div className={styles.quoteHeader}><b>YOUR DELIVERY COMPANY</b><strong>Get a delivery quote</strong></div>
      <div className={styles.quoteBody}>
        <div className={styles.steps}>Route <span>Details</span><span>Quote</span></div>
        <label>Pickup address</label><div className={styles.field}>Enter pickup address</div>
        <label>Dropoff address</label><div className={styles.field}>Enter dropoff address</div>
        <div className={styles.quoteButton}>Get Instant Quote</div>
        <small>Powered by Qalt · Demo preview</small>
      </div>
    </div>
  );
}

function ConsoleScreen({ quotes = false }: { quotes?: boolean }) {
  return (
    <div className={styles.console}>
      <aside className={styles.sidebar}>
        <b>QALT<span>MERCHANT CONSOLE</span></b>
        {['Overview', 'Quotes', 'My Forms', 'Appearance', 'Field Operations'].map((item) => (
          <div key={item} className={item === (quotes ? 'Quotes' : 'Overview') ? styles.selected : undefined}>{item}</div>
        ))}
      </aside>
      <div className={styles.workspace}>
        <header>Merchant Console <span>DEMO PREVIEW</span></header>
        <h3>{quotes ? 'Quote requests' : 'Your delivery business'}</h3>
        <p>Manage your quotes and customer experience.</p>
        <div className={styles.tiles}><div>Delivery pricing<strong>Your rates</strong></div><div>Customer forms<strong>Your brand</strong></div></div>
        <div className={styles.table}>
          <div className={styles.tableTitle}>Recent quotes <span>View quotes</span></div>
          <div className={styles.tableHead}><span>ROUTE</span><span>SERVICE</span><span>STATUS</span></div>
          {['San Jose to San Francisco', 'Oakland to Berkeley', 'Fremont to San Jose'].map((route, index) => (
            <div className={styles.row} key={route}><span>{route}</span><span>Delivery</span><em>{index === 1 ? 'Booked' : 'Quoted'}</em></div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CompareHeroDevices = memo(function CompareHeroDevices() {
  return (
    <div className={styles.scene} aria-hidden="true" data-qalt-devices>
      <div className={`${styles.device} ${styles.desktop}`}>
        <div className={styles.float}><div className={styles.monitor}><div className={styles.screen}><ConsoleScreen /></div><div className={styles.chin}>QALT</div></div><div className={styles.stand} /><div className={styles.foot} /></div>
      </div>
      <div className={`${styles.device} ${styles.laptop}`}>
        <div className={styles.float}><div className={styles.lid}><div className={styles.screen}><ConsoleScreen quotes /></div></div><div className={styles.keyboard} /></div>
      </div>
      <div className={`${styles.device} ${styles.tablet}`}>
        <div className={styles.float}><div className={styles.touchFrame}><div className={styles.screen}><QuoteScreen /></div></div></div>
      </div>
      <div className={`${styles.device} ${styles.phone}`}>
        <div className={styles.float}><div className={styles.touchFrame}><div className={styles.screen}><QuoteScreen /></div><div className={styles.camera} /></div></div>
      </div>
    </div>
  );
});

export default CompareHeroDevices;
