import styles from "./intelligence.module.css";

const block = (height: number, extra: React.CSSProperties = {}) => (
  <div style={{ height, borderRadius: 14, background: "var(--soft)", border: "1px solid var(--line)", ...extra }} />
);

export default function Loading() {
  return (
    <div className={styles.root} role="status" aria-label="Loading intelligence">
      {block(92, { marginBottom: 24, maxWidth: 620 })}
      {block(96, { marginBottom: 20 })}
      <div className={styles.grid}>
        {block(320)}
        {block(320)}
      </div>
      {block(420)}
      <span className={styles.srOnly}>Loading your quotes and estimates</span>
    </div>
  );
}
