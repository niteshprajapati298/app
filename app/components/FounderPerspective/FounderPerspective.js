"use client";

import { useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FounderPerspective.module.css";

gsap.registerPlugin(ScrollTrigger);

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const FounderScene3D = dynamic(
  () => import("./FounderScene3D").then((mod) => mod.default),
  { ssr: false }
);

const LINES = [
  "Most founders chase tactics.",
  "We build systems that compound.",
];

export default function FounderPerspective() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const lineRefs = useRef([]);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  useEffect(() => {
    const ctx = gsap.context(() => {
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.3 + i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="founder"
      aria-labelledby="founder-heading"
    >
      <div className={styles.canvasWrap}>
        <Suspense fallback={null}>
          <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          className={styles.canvas}
          gl={{ alpha: true, antialias: true }}
        >
            <FounderScene3D />
          </Canvas>
        </Suspense>
      </div>

      <div ref={contentRef} className={styles.content}>
        <motion.p
          className={styles.label}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Founder&apos;s perspective
        </motion.p>

        <div className={styles.quote}>
          {LINES.map((line, i) => (
            <p
              key={i}
              ref={(el) => { lineRefs.current[i] = el; }}
              className={i === 1 ? styles.lineAccent : styles.line}
            >
              {line}
            </p>
          ))}
        </div>

        <motion.p
          className={styles.support}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          We don&apos;t optimize for the next quarter. We build growth engines
          that run without us—systems that survive people, tools, and trends.
        </motion.p>
      </div>
    </section>
  );
}
