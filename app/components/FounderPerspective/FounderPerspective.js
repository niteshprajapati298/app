"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBackground from "../SectionBackground/SectionBackground";
import styles from "./FounderPerspective.module.css";

gsap.registerPlugin(ScrollTrigger);

const FOUNDER_IMAGE =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop";

const LINES = [
  "Most founders chase tactics.",
  "We build systems that compound.",
];

export default function FounderPerspective() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  useEffect(() => {
    const ctx = gsap.context(() => {
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2 + i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
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
      {/* <SectionBackground variant="light" /> */}
      {/* Gradient orbs */}
      <div className={styles.gradientOrb} data-position="top-right" />
      <div className={styles.gradientOrb} data-position="bottom-left" />

      <div className={styles.layout}>
        {/* Left: Founder image with creative frame */}
        <div className={styles.imageColumn}>
          <motion.div
            ref={imageRef}
            className={styles.imageFrame}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.imageInner}>
              <Image
                src={FOUNDER_IMAGE}
                alt="Founder"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className={styles.founderImage}
                priority={false}
              />
              <div className={styles.imageOverlay} />
            </div>
            <div className={styles.frameGlow} />
            <div className={styles.frameBorder} />
          </motion.div>
        </div>

        {/* Right: Quote content */}
        <div className={styles.contentColumn}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Founder&apos;s perspective
          </motion.span>

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
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            We don&apos;t optimize for the next quarter. We build growth engines
            that run without us—systems that survive people, tools, and trends.
          </motion.p>

          <motion.div
            className={styles.signature}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.signatureLine} />
            <span className={styles.signatureText}>LabScaleX</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
