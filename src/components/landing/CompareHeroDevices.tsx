"use client";

import { memo } from "react";
import styles from "./CompareHeroDevices.module.css";

// CSS windows preserve the user's original device frames and Qalt screens.
const CompareHeroDevices = memo(function CompareHeroDevices() {
  return (
    <div className={styles.scene} aria-hidden="true" data-qalt-devices>
      <div className={`${styles.device} ${styles.phone}`} data-device="phone">
        <div className={styles.float}><div className={styles.artwork} /></div>
      </div>
      <div className={`${styles.device} ${styles.tablet}`} data-device="tablet">
        <div className={styles.float}><div className={styles.artwork} /></div>
      </div>
      <div className={`${styles.device} ${styles.desktop}`} data-device="desktop">
        <div className={styles.float}><div className={styles.artwork} /></div>
      </div>
    </div>
  );
});

export default CompareHeroDevices;
