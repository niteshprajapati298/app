"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import styles from "./CtaSection.module.css";

const DURATION = 0.8;

export default function CtaSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const reduced = Boolean(useReducedMotion());

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="cta"
      aria-labelledby="cta-heading"
    >
      <div className={styles.wrap}>
        <motion.h2
          id="cta-heading"
          className={styles.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: reduced ? 0 : DURATION,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          Let’s Build Your Growth System
        </motion.h2>

        <motion.p
          className={styles.support}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: reduced ? 0 : DURATION,
            delay: reduced ? 0 : 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          One conversation. No pitch deck.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: reduced ? 0 : DURATION,
            delay: reduced ? 0 : 0.25,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Link
            href="mailto:lab.scalex@gmail.com"
            className={styles.cta}
            aria-label="Email LabScaleX to start a conversation"
          >
            Start a conversation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
