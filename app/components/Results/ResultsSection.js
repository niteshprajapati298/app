"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBackground from "../SectionBackground/SectionBackground";
import CtaButton from "../CtaButton/CtaButton";
import styles from "./ResultsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  {
    id: "growth",
    phrase: "Consistent brand growth.",
    support: "Stronger positioning, better visibility, and steady audience growth across platforms.",
    icon: "chart",
    accent: "green",
  },
  {
    id: "direction",
    phrase: "Clear brand direction.",
    support: "Your messaging, content, and marketing start working towards one clear goal.",
    icon: "target",
    accent: "purple",
  },
  {
    id: "leads",
    phrase: "Higher quality leads.",
    support: "Attract people who understand your value and are ready to buy.",
    icon: "data",
    accent: "html",
  },
  {
    id: "presence",
    phrase: "Strong digital presence.",
    support: "A brand that looks credible, searchable, and trusted online.",
    icon: "gears",
    accent: "css",
  },
  {
    id: "compound",
    phrase: "Marketing that compounds.",
    support: "Content and systems that keep generating results over time.",
    icon: "layers",
    accent: "js",
  },
];

const ICONS = {
  chart: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 36L14 26L24 30L40 14" />
      <path d="M40 14v8h-6" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="10" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  ),
  gears: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="8" />
      <path d="M24 4v4M24 40v4M4 24h4M40 24h4M8.7 8.7l2.8 2.8M36.5 36.5l2.8 2.8M8.7 39.3l2.8-2.8M36.5 11.5l2.8-2.8" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 36h8V20H8zM20 36h8V12h-8zM32 36h8V28h-8z" />
      <path d="M8 20l8-12 8 8 16-12" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 28l16 8 16-8M8 20l16 8 16-8M8 12l16 8 16-8" />
    </svg>
  ),
};

const DURATION = 0.6;
const STAGGER = 0.1;

export default function ResultsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { amount: 0.15, once: true });
  const reduced = Boolean(useReducedMotion());

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el.querySelector(`.${styles.cardInner}`) || el,
          {
            y: 50,
            opacity: 0,
            rotateX: -8,
            transformPerspective: 1000,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.75,
            delay: 0.2 + i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="results"
      aria-labelledby="results-heading"
    >
      {/* <SectionBackground variant="light" /> */}
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.glowOrb} aria-hidden="true" />

      <header ref={headerRef} className={styles.header}>
        <motion.p
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: reduced ? 0 : DURATION,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className={styles.labelTag}>//</span> What we optimize for
        </motion.p>
        <motion.h2
          id="results-heading"
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: reduced ? 0 : DURATION,
            delay: reduced ? 0 : STAGGER * 2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Results that mean{" "}
          <span className={styles.highlight}>something</span>
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduced ? 0 : DURATION,
            delay: reduced ? 0 : STAGGER * 4,
          }}
        >
          Principle-led outcomes, not vanity metrics.
        </motion.p>
      </header>

      <ul className={styles.grid}>
        {STATEMENTS.map((item, index) => (
          <motion.li
            key={item.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className={styles.card}
            data-accent={item.accent}
            initial={{ opacity: 0, y: 40 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{
              duration: reduced ? 0 : DURATION + 0.2,
              delay: reduced ? 0 : STAGGER * (index + 3),
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -12,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <div className={styles.cardInner}>
              <motion.div
                className={styles.iconWrap}
                data-accent={item.accent}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {ICONS[item.icon]}
              </motion.div>
              <p className={styles.phrase}>{item.phrase}</p>
              {item.support && (
                <p className={styles.support}>{item.support}</p>
              )}
              <div className={styles.cardBorder} />
            </div>
          </motion.li>
        ))}
      </ul>

      <div className={styles.ctaWrap}>
        <CtaButton variant="secondary">Get in touch</CtaButton>
      </div>
    </section>
  );
}
