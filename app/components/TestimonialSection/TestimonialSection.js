"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./TestimonialSection.module.css";

const TESTIMONIALS = [
  {
    id: "1",
    quote: "They don't chase tactics—they built a system that actually compounds. Our pipeline and clarity both improved.",
    name: "Sarah Chen",
    role: "Head of Growth, B2B SaaS",
    accent: "green",
  },
  {
    id: "2",
    quote: "Evidence over opinion, clarity before scale. That mindset changed how we run experiments and read results.",
    name: "Marcus Webb",
    role: "VP Marketing",
    accent: "purple",
  },
  {
    id: "3",
    quote: "Growth that survives people and tools, not just spikes. We finally have something we can run without constant firefighting.",
    name: "Elena Rodriguez",
    role: "Founder, Fintech",
    accent: "green",
  },
];

export default function TestimonialSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.label}>Testimonials</p>
          <h2 id="testimonials-heading" className={styles.title}>
            What clients say
          </h2>
        </header>

        <ul className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <motion.li
              key={t.id}
              className={styles.card}
              data-accent={t.accent}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <blockquote className={styles.quote}>
                <p className={styles.quoteText}>"{t.quote}"</p>
                <footer className={styles.footer}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.role}</span>
                </footer>
              </blockquote>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
