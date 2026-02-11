"use client";

import Link from "next/link";
import styles from "./Header.module.css";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#why", label: "Why" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="#" className={styles.brand}>
          <span className={styles.logo}>
            <span className={styles.dot} />
            <span className={styles.dotGreen} />
          </span>
          <span className={styles.brandName}>LabScaleX</span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.navLink}>
              {label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:lab.scalex@gmail.com"
          className={styles.cta}
          aria-label="Email us"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
