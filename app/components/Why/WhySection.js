"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import styles from "./WhySection.module.css";

// Manifesto fragment: declarative statements only. No "we help/offer/provide".
const LINES = [
  "Most teams chase tactics. We build systems.",
  "Growth should survive people, tools, and trends.",
  "Clarity before scale. Evidence before opinion.",
  "What compounds outlasts what spikes.",
];

// Single accent line (green) so the section stays minimal
const ACCENT_INDEX = 2;

const DURATION = 0.6;
const STAGGER = 0.12;

export default function WhySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: true });
  const reduced = Boolean(useReducedMotion());

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="why"
      aria-labelledby="why-heading"
    >
      <h2 id="why-heading" className={styles.visuallyHidden}>
        Why LabScaleX
      </h2>

      <div className={styles.block}>
        {LINES.map((line, index) => (
          <motion.p
            key={index}
            className={
              index === ACCENT_INDEX ? styles.lineAccent : styles.line
            }
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              duration: reduced ? 0 : DURATION,
              delay: reduced ? 0 : STAGGER * index,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
