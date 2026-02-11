"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import styles from "./ResultsSection.module.css";

// Principle-style statements: outcomes and system maturity, not vanity metrics.
// Each: key phrase (large) + optional supporting line (max 6 words).
const STATEMENTS = [
  {
    id: "predictable",
    phrase: "Predictable growth beats explosive spikes.",
    support: "Consistency over hype.",
  },
  {
    id: "clarity",
    phrase: "Clarity is a result.",
    support: "We measure what matters.",
  },
  {
    id: "systems",
    phrase: "Systems that work without supervision.",
    support: "Built to run without you.",
  },
  {
    id: "evidence",
    phrase: "Evidence over opinion.",
    support: "Data shapes the next move.",
  },
  {
    id: "compound",
    phrase: "What compounds stays.",
    support: "One experiment feeds the next.",
  },
];

const DURATION = 0.7;
const STAGGER = 0.14;

export default function ResultsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const reduced = Boolean(useReducedMotion());

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="results"
      aria-labelledby="results-heading"
    >
      <header className={styles.header}>
        <motion.p
          className={styles.label}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: reduced ? 0 : DURATION,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          What we optimize for
        </motion.p>
        <motion.h2
          id="results-heading"
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: reduced ? 0 : DURATION,
            delay: reduced ? 0 : STAGGER,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          Results that mean something
        </motion.h2>
      </header>

      <ul className={styles.list}>
        {STATEMENTS.map((item, index) => (
          <motion.li
            key={item.id}
            className={styles.item}
            initial={{ opacity: 0, y: 24 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            transition={{
              duration: reduced ? 0 : DURATION,
              delay: reduced ? 0 : STAGGER * (index + 2),
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <p className={styles.phrase}>{item.phrase}</p>
            {item.support && (
              <p className={styles.support}>{item.support}</p>
            )}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
