import styles from "./analytics.module.css";
export default function Loading() {
  return (
    <div className={styles.root} role="status" aria-label="Loading analytics">
      <div
        className={styles.skeleton}
        style={{ height: 100, marginBottom: 24 }}
      />
      <div className={styles.metrics}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.skeleton} style={{ height: 190 }} />
        ))}
      </div>
      <div className={styles.skeleton} style={{ height: 360 }} />
      <span className={styles.srOnly}>Loading analytics report…</span>
    </div>
  );
}
