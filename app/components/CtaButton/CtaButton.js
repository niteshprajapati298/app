"use client";

import { useContactModal } from "../../context/ContactModalContext";
import styles from "./CtaButton.module.css";

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function CtaButton({ children = "Start a conversation", variant = "primary", className }) {
  const { open } = useContactModal();

  const variantClass = variant === "hero" ? `${styles.primary} ${styles.hero}` : (styles[variant] || "");
  return (
    <button
      type="button"
      onClick={open}
      className={`${styles.cta} ${variantClass} ${className || ""}`.trim()}
      aria-label="Open contact form"
    >
      {children}
      {variant === "hero" && (
        <span className={styles.ctaArrow}>
          <ArrowIcon />
        </span>
      )}
    </button>
  );
}
