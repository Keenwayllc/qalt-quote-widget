"use client";
import styles from "./analytics.module.css";
export default function AnalyticsError({ reset }: { reset: () => void }) {
  return (
    <div className={styles.root}>
      <section className={styles.panel} role="alert">
        <h1>Analytics could not load</h1>
        <p style={{ marginTop: 16 }}>
          We could not retrieve this company’s report. Try again to refresh the
          data.
        </p>
        <div className={styles.actions} style={{ marginTop: 20 }}>
          <button onClick={reset}>Try again</button>
        </div>
      </section>
    </div>
  );
}
