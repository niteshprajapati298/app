"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "./Hero.module.css";

// Opening: four "doors" that slide away to reveal hero. Staggered for a classy reveal.
const DOOR_DURATION = 0.9;
const DOOR_EASE = [0.4, 0, 0.2, 1];
const CONTENT_DELAY = 0.5; // start content after doors begin opening
const STAGGER = 0.1;

export default function Hero() {
  const sectionRef = useRef(null);
  const reduced = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.25]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="contact"
      aria-labelledby="hero-heading"
    >
      {/* Creative background: concentric circles + radial lines from center */}
      <motion.div
        className={styles.bgWrap}
        style={{ opacity: bgOpacity }}
        aria-hidden="true"
      >
        <svg
          className={styles.bgSvg}
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="hero-radial-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--purple)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--green)" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          {/* Concentric circles */}
          {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((r, i) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
            />
          ))}
          {/* Radial lines (every 15°) with subtle purple/green on a few */}
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x = 200 + 200 * Math.cos(angle);
            const y = 200 + 200 * Math.sin(angle);
            const isAccent = i % 6 === 0;
            return (
              <line
                key={i}
                x1="200"
                y1="200"
                x2={x}
                y2={y}
                stroke={isAccent ? "url(#hero-radial-accent)" : "rgba(255,255,255,0.05)"}
                strokeWidth={isAccent ? 0.4 : 0.25}
              />
            );
          })}
        </svg>
      </motion.div>

      <div className={styles.veil} aria-hidden="true" />

      {/* Four panels: "doors" that slide away on load */}
      {!reduced && (
        <>
          <motion.div
            className={`${styles.door} ${styles.doorTl}`}
            initial={{ x: 0, y: 0 }}
            animate={{ x: "-100%", y: "-100%" }}
            transition={{ duration: DOOR_DURATION, ease: DOOR_EASE, delay: 0.1 }}
          />
          <motion.div
            className={`${styles.door} ${styles.doorTr}`}
            initial={{ x: 0, y: 0 }}
            animate={{ x: "100%", y: "-100%" }}
            transition={{ duration: DOOR_DURATION, ease: DOOR_EASE, delay: 0.18 }}
          />
          <motion.div
            className={`${styles.door} ${styles.doorBl}`}
            initial={{ x: 0, y: 0 }}
            animate={{ x: "-100%", y: "100%" }}
            transition={{ duration: DOOR_DURATION, ease: DOOR_EASE, delay: 0.26 }}
          />
          <motion.div
            className={`${styles.door} ${styles.doorBr}`}
            initial={{ x: 0, y: 0 }}
            animate={{ x: "100%", y: "100%" }}
            transition={{ duration: DOOR_DURATION, ease: DOOR_EASE, delay: 0.34 }}
          />
        </>
      )}

      {/* Content: asymmetrical — headline left, subtext + CTAs right */}
      <div className={styles.layout}>
        <div className={styles.left}>
          <motion.h1
            id="hero-heading"
            className={styles.headline}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.8,
              delay: reduced ? 0 : CONTENT_DELAY + STAGGER * 0,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Growth is a system,<br />
            <span className={styles.accent}>not a stunt.</span>
          </motion.h1>
        </div>

        <div className={styles.right}>
          <motion.p
            className={styles.subtext}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : CONTENT_DELAY + STAGGER * 1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            We observe, design experiments, and compound what works—without the noise.
          </motion.p>

          <motion.div
            className={styles.ctaBlock}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : CONTENT_DELAY + STAGGER * 2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <Link href="mailto:lab.scalex@gmail.com" className={styles.ctaPrimary}>
              Start a conversation
            </Link>
            <Link href="#process" className={styles.ctaSecondary}>
              See how we work
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: reduced ? 0 : CONTENT_DELAY + STAGGER * 3,
        }}
      >
        <span className={styles.status}>Lab active</span>
        <a href="mailto:lab.scalex@gmail.com" className={styles.email}>
          lab.scalex@gmail.com
        </a>
      </motion.footer>
    </section>
  );
}
