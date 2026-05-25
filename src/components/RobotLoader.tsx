"use client";

import React, { useEffect, useState } from "react";
import styles from "./RobotLoader.module.css";

interface RobotLoaderProps {
  size?: "sm" | "md" | "lg";
  speed?: number; // duration in ms
}

export default function RobotLoader({ size = "md", speed = 1800 }: RobotLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    const tick = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      setProgress(Math.min(Math.round((elapsed / speed) * 100), 100));
    }, 32);

    return () => window.clearInterval(tick);
  }, [speed]);

  return (
    <div
      className={`${styles.loader} ${styles[size]}`}
      role="status"
      aria-label="Loading"
      style={{ "--progress": `${progress}%` } as React.CSSProperties}
    >
      <div className={styles.frame}>
        <div className={styles.scanline} />
        <div className={styles.header}>
          <span className={styles.kicker}>Autonomous robotics OS</span>
          <span className={styles.status}>Booting</span>
        </div>

        <div className={styles.brandBlock}>
          <span className={styles.brandEyebrow}>Robotics-as-a-Service</span>
          <span className={styles.brandName} data-text="Corelyn Robotics">
            Corelyn Robotics
          </span>
        </div>

        <div className={styles.readout}>
          <span className={styles.loadingText} data-text="System Load">
            System Load
          </span>
          <span className={styles.percent}>{progress.toString().padStart(3, "0")}%</span>
        </div>

        <div className={styles.bar} aria-hidden="true">
          <div className={styles.fill} />
          <div className={styles.segments}>
            {Array.from({ length: 18 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <span>Calibrating SLAM, payload control, fleet telemetry</span>
          <span>C100/C500/C1000</span>
        </div>
      </div>
    </div>
  );
}




