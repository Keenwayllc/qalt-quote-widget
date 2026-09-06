import styles from "./demo-polish.module.css";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.demo}>{children}</div>;
}
