"use client";

import { useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import styles from "./PhilosophySection.module.css";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const Scene3D = dynamic(
  () => import("./Scene3D").then((mod) => mod.default),
  { ssr: false }
);

const iconSystems = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="6" />
    <path d="M24 4v4M24 40v4M4 24h4M40 24h4M10.3 10.3l2.8 2.8M34.9 34.9l2.8 2.8M10.3 37.7l2.8-2.8M34.9 13.1l2.8-2.8" />
  </svg>
);

const iconGrowth = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 36l14-24 8 12 18-24" />
    <path d="M8 36h32" />
  </svg>
);

const iconClarity = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="22" r="10" />
    <path d="M24 8v4M24 34v4M14 22h-4M38 22h-4M12.3 12.3l2.8 2.8M32.9 32.9l2.8 2.8M12.3 31.7l2.8-2.8M32.9 11.1l2.8-2.8" />
  </svg>
);

const iconCompound = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 32l16 8 16-8M8 24l16 8 16-8M8 16l16 8 16-8" />
  </svg>
);

const QUOTES = [
  {
    id: "tactics",
    line1: "Most teams chase tactics.",
    line2: "We build systems.",
    accent: "green",
    icon: iconSystems,
  },
  {
    id: "growth",
    line1: "Growth should survive",
    line2: "people, tools, and trends.",
    accent: "purple",
    icon: iconGrowth,
  },
  {
    id: "clarity",
    line1: "Clarity before scale.",
    line2: "Evidence before opinion.",
    accent: "green",
    icon: iconClarity,
  },
  {
    id: "compound",
    line1: "What compounds outlasts",
    line2: "what spikes.",
    accent: "purple",
    icon: iconCompound,
  },
];

function PhilosophyContent() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="philosophy"
      aria-labelledby="philosophy-heading"
    >
      <div className={styles.canvasWrapper}>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            className={styles.canvas}
            gl={{ alpha: true, antialias: true }}
          >
            <Scene3D />
          </Canvas>
        </Suspense>
      </div>

      <div className={styles.content}>
        <motion.h2
          id="philosophy-heading"
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          How we think
        </motion.h2>

        <div className={styles.cards}>
          {QUOTES.map((quote, index) => (
            <motion.article
              key={quote.id}
              className={styles.card}
              data-accent={quote.accent}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <div className={styles.cardInner}>
                <motion.div
                  className={styles.iconWrap}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {quote.icon}
                </motion.div>
                <p className={styles.quoteLine}>{quote.line1}</p>
                <p className={`${styles.quoteLine} ${styles.quoteLineAccent}`}>
                  {quote.line2}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PhilosophySection() {
  return <PhilosophyContent />;
}
