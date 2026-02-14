"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SectionBackground from "../SectionBackground/SectionBackground";
import styles from "./WhySection.module.css";

const PARAGRAPHS = [
  "LabScaleX was founded on the straightforward tenet that most startups struggle because their story and positioning are unclear rather than because they have poor ideas. Brands require direction and consistency, but marketing nowadays is frequently reduced to posting content or following trends.",
  "In addition to being a service provider, we designed LabScaleX to be a growth partner for tech startups. We approach each brand we work with as a long-term process in which community, strategy, and execution all develop together.",
  "Assisting innovative concepts to develop into powerful, scalable brands has always been the aim.",
];

const DURATION = 0.6;
const STAGGER = 0.15;

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
          {/* <SectionBackground variant="light" /> */}
      <h2 id="why-heading" className={styles.heading}>
        Why LabScaleX
      </h2>

      <div className={styles.block}>
        {PARAGRAPHS.map((text, index) => (
          <motion.p
            key={index}
            className={styles.paragraph}
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
            {text}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
