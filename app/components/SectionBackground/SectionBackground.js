"use client";

import { useId } from "react";
import styles from "./SectionBackground.module.css";

export default function SectionBackground({ variant = "default" }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={styles.wrap} data-variant={variant} aria-hidden="true">
      {/* SVG Waves */}
      <svg className={styles.waveTop} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`waveGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0.08" />
            <stop offset="50%" stopColor="var(--purple)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,60 1440,60 L1440,0 L0,0 Z"
          fill={`url(#waveGrad-${id})`}
        />
        <path
          d="M0,80 C240,20 480,100 720,60 C960,20 1200,80 1440,40 L1440,0 L0,0 Z"
          fill={`url(#waveGrad-${id})`}
          opacity="0.6"
        />
      </svg>
      <svg className={styles.waveBottom} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`waveGradBot-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0.08" />
            <stop offset="50%" stopColor="var(--purple)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
          fill={`url(#waveGradBot-${id})`}
        />
        <path
          d="M0,40 C240,100 480,20 720,60 C960,100 1200,40 1440,80 L1440,120 L0,120 Z"
          fill={`url(#waveGradBot-${id})`}
          opacity="0.6"
        />
      </svg>

      {/* Blurred layer shapes */}
      <div className={styles.blurBlob} data-pos="top-right" />
      <div className={styles.blurBlob} data-pos="bottom-left" />
      <div className={styles.blurBlob} data-pos="center" />

      {/* Vector shapes - circles, curves */}
      <div className={styles.vectorShapes}>
        <svg className={styles.shapeCircle} data-pos="1" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="var(--green)" strokeOpacity="0.08" strokeWidth="1" />
        </svg>
        <svg className={styles.shapeCircle} data-pos="2" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="60" fill="none" stroke="var(--purple)" strokeOpacity="0.06" strokeWidth="1" />
        </svg>
        <svg className={styles.shapeBlob} viewBox="0 0 400 200">
          <path
            d="M50,100 Q100,20 200,100 T350,100 Q380,120 400,100 L400,200 L0,200 Z"
            fill="none"
            stroke="var(--green)"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
        </svg>
        <svg className={styles.shapeCurve} viewBox="0 0 500 100">
          <path
            d="M0,50 Q125,10 250,50 T500,50"
            fill="none"
            stroke="var(--purple)"
            strokeOpacity="0.06"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}
