"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { motion, useInView, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import SectionBackground from "../SectionBackground/SectionBackground";
import CtaButton from "../CtaButton/CtaButton";
import styles from "./ProcessSection.module.css";

// Animation: scroll-triggered spine draw + staggered node reveal; hover reveals description and subtle glow.
// Reduced motion: path draws instantly, no breathing loop, minimal transition duration.

const STEPS = [
  {
    id: "discover",
    title: "Discover",
    description: "We understand your brand, audience, goals, and market before planning anything.",
  },
  {
    id: "analyse",
    title: "Analyse",
    description: "We find gaps in branding, marketing, content, and growth opportunities.",
  },
  {
    id: "strategise",
    title: "Strategise",
    description: "We build clear marketing, content, and positioning strategies for growth.",
  },
  {
    id: "execute",
    title: "Execute",
    description: "We launch, manage, and optimise campaigns based on real performance.",
  },
  {
    id: "scale",
    title: "Scale",
    description: "We grow what works to build consistent traffic, engagement, and results.",
  },
];

// Node positions along the curved spine (percentage of container)
// Path sits slightly left of center so labels align to the right
const NODE_POSITIONS = [
  { x: 38, y: 8 },
  { x: 52, y: 26 },
  { x: 38, y: 48 },
  { x: 24, y: 70 },
  { x: 38, y: 90 },
];

// SVG path for the growth spine (viewBox 0 0 100 100)
// Curved so pointer can follow; same path used for getPointAtLength
const SPINE_PATH =
  "M 38 5 C 50 18, 55 35, 38 48 C 22 62, 24 78, 38 92";

const DURATION_SLOW = 1.8;
const DURATION_FAST = 0.4;

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);
  const [pointer, setPointer] = useState({ x: 38, y: 5 });

  const reduced = Boolean(prefersReducedMotion);

  // Scroll progress through this section: 0 = section entering, 1 = section left
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Move pointer along path based on scroll (getPointAtLength in path coords)
  useMotionValueEvent(scrollYProgress, "change", (t) => {
    const pathEl = pathRef.current;
    if (!pathEl || reduced) return;
    const len = pathEl.getTotalLength();
    const pt = pathEl.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
    setPointer({ x: pt.x, y: pt.y });
  });

  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl) return;
    const len = pathEl.getTotalLength();
    const pt = pathEl.getPointAtLength(0);
    setPointer({ x: pt.x, y: pt.y });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="process"
      aria-labelledby="process-heading"
    >
      {/* <SectionBackground variant="light" /> */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <header className={styles.heading}>
        <div className={styles.headingLabelWrap}>
          <span className={styles.headingLine} aria-hidden="true" />
          <motion.p
            className={styles.headingLabel}
            initial={{ opacity: 0, y: 8 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{
              duration: reduced ? 0 : 0.5,
            }}
          >
            Process
          </motion.p>
          <span className={styles.headingLine} aria-hidden="true" />
        </div>
        <motion.h2
          id="process-heading"
          className={styles.headingTitle}
          initial={{ opacity: 0, y: 8 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: 0.08,
          }}
        >
          How we work
        </motion.h2>
      </header>

      <div className={styles.spineWrapper}>
        {/* Curved spine: draws on scroll via pathLength */}
        <svg
          className={styles.spineSvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="spine-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--purple)" />
              <stop offset="100%" stopColor="var(--green)" />
            </linearGradient>
          </defs>
          <motion.path
            className={styles.spineTrack}
            d={SPINE_PATH}
            fill="none"
            stroke="var(--mid-grey)"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
          {/* Spine draws on scroll: pathLength 0 → 1 over 2s when section enters view */}
          <motion.path
            ref={pathRef}
            className={styles.spineLine}
            d={SPINE_PATH}
            fill="none"
            stroke="url(#spine-gradient)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={
              isInView && !reduced
                ? { pathLength: 1 }
                : reduced
                  ? { pathLength: 1 }
                  : { pathLength: 0 }
            }
            transition={{
              pathLength: {
                duration: reduced ? 0 : 2,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }}
          />
          {/* Scroll-driven pointer: moves along path as user scrolls through section */}
          {!reduced && (
            <motion.g
              className={styles.pathPointer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <circle
                className={styles.pathPointerGlow}
                cx={pointer.x}
                cy={pointer.y}
                r="5"
              />
              <circle
                className={styles.pathPointerDot}
                cx={pointer.x}
                cy={pointer.y}
                r="2.5"
              />
            </motion.g>
          )}
        </svg>

        {/* Floating nodes with hover and scroll reveal */}
        {STEPS.map((step, index) => {
          const pos = NODE_POSITIONS[index];
          const isHovered = hoveredId === step.id;

          return (
            <motion.div
              key={step.id}
              className={styles.node}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.6 }
              }
              transition={{
                duration: reduced ? 0 : DURATION_FAST,
                delay: reduced ? 0 : 0.15 * index + 0.3,
              }}
              onMouseEnter={() => setHoveredId(step.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Outer glow: subtle pulse when hovered */}
              <motion.span
                className={styles.nodeGlow}
                animate={{
                  opacity: isHovered ? 0.5 : 0.2,
                  scale: isHovered ? 1.4 : 1.1,
                }}
                transition={{
                  duration: reduced ? 0 : 0.35,
                }}
              />

              {/* Breathing ring: slow scale/opacity loop; off when reduced motion or hover */}
              <motion.span
                className={styles.nodeRing}
                animate={
                  !reduced && !isHovered
                    ? {
                        scale: [1, 1.08, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }
                    : { scale: 1, opacity: 0.5 }
                }
                transition={{
                  duration: DURATION_SLOW * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Core dot */}
              <motion.span
                className={styles.nodeCore}
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  boxShadow: isHovered
                    ? "0 0 24px rgba(124, 255, 58, 0.4)"
                    : "0 0 12px rgba(123, 92, 255, 0.25)",
                }}
                transition={{
                  duration: reduced ? 0 : 0.3,
                }}
              />

              {/* Label and description */}
              <div className={styles.nodeContent}>
                <span className={styles.nodeTitle}>{step.title}</span>
                <motion.span
                  className={styles.nodeDescription}
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 4,
                  }}
                  transition={{
                    duration: reduced ? 0 : 0.25,
                  }}
                >
                  {step.description}
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className={styles.ctaWrap}>
        <CtaButton variant="secondary">Let&apos;s talk</CtaButton>
      </div>
    </section>
  );
}
