"use client";

import { useState } from "react";
import styles from "./FaqSection.module.css";

const FAQS = [
  {
    q: "What makes these sections feel different from typical landing pages?",
    a: "We lean on motion and depth instead of flat blocks—Three.js scenes, Framer Motion micro-interactions, and GSAP timing to make every section feel alive without overwhelming the content.",
  },
  {
    q: "How did you decide on the card layouts for Services and Results?",
    a: "Services stay flexible in a wrapped row to showcase breadth, while Results use a 3+2 grid so the bottom two cards visually balance the three above.",
  },
  {
    q: "Why remove the electric effect from the service cards?",
    a: "The electric filter fought the content. We simplified to clean gradients and glows so the copy, icons, and hover states read clearly on all screens.",
  },
  {
    q: "What's happening in the Three.js hero background?",
    a: "A lightweight React-Three-Fiber scene renders floating wireframe shapes and a subtle grid behind the hero, giving a systems-and-experiments feel that matches the brand.",
  },
  {
    q: "Will all these animations hurt performance?",
    a: "We use modern libraries with sensible defaults, keep 3D geometry light, and gate most motion behind intersection observers so animations only run when elements are on screen.",
  },
  {
    q: "Can this design be extended with more sections later?",
    a: "Yes—colors, typography, and layout primitives are shared, so new sections can reuse the same card patterns, grids, and motion tokens.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-heading">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.label}>FAQ</p>
          <h2 id="faq-heading" className={styles.title}>
            Common questions
          </h2>
        </header>

        <ul className={styles.list}>
          {FAQS.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <li key={index} className={styles.item} data-active={isOpen}>
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.question}>{item.q}</span>
                  <span className={styles.chevron} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={styles.answerWrap}
                  data-open={isOpen}
                  hidden={!isOpen}
                >
                  <p className={styles.answer}>{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
