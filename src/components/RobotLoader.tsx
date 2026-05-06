"use client";

import React from "react";
import styles from "./RobotLoader.module.css";

interface RobotLoaderProps {
  size?: "sm" | "md" | "lg";
  speed?: number; // duration in ms
}

export default function RobotLoader({ size = "md", speed = 2400 }: RobotLoaderProps) {
  const eyeStyle = {
    animationDuration: `${speed}ms`,
  };

  return (
    <div
      className={`${styles.face} ${styles[size]}`}
      role="status"
      aria-label="Loading"
    >
      <div className={styles.eyeTrack}>
        <div className={styles.eye} style={eyeStyle} />
      </div>
      <div className={styles.eyeTrack}>
        <div className={styles.eye} style={eyeStyle} />
      </div>
    </div>
  );
}




