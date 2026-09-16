import type { ReactNode } from "react";
import type { WidgetThemeMode } from "@/lib/widget-theme";
import styles from "./WidgetThemeShell.module.css";

export default function WidgetThemeShell({
  theme,
  children,
}: {
  theme: WidgetThemeMode;
  children: ReactNode;
}) {
  return (
    <div
      className={`${styles.shell} ${theme === "dark" ? styles.dark : styles.light}`}
      data-qalt-widget-theme={theme}
    >
      {children}
    </div>
  );
}
