"use client";
import styles from "./intelligence.module.css";

export default function IntelligenceError({ reset }: { reset: () => void }) {
  return (
    <div className={styles.root}>
      <section className={styles.panel} role="alert">
        <h1 style={{ fontSize: 28 }}>Intelligence could not load</h1>
        <p style={{ marginTop: 12 }}>Your quotes and settings are unaffected. Try again to reload the numbers.</p>
        <div className={styles.reviewActions}>
          <button type="button" className={styles.buttonPrimary} onClick={reset}>
            Try again
          </button>
        </div>
      </section>
    </div>
  );
}
