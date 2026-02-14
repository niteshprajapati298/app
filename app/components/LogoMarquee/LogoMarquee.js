"use client";

import SectionBackground from "../SectionBackground/SectionBackground";
import styles from "./LogoMarquee.module.css";

/* Replace with real logos: add logoUrl and render <img src={logo.logoUrl} alt={logo.name} /> */
const LOGOS = [
  { id: "1", name: "Edunext Technologies", color: "var(--green)" },
  { id: "2", name: "Markntel Advisors", color: "var(--purple)" },
  { id: "3", name: "JR Compliance", color: "var(--green)" },
  { id: "4", name: "Verify Vista", color: "var(--purple)" },
  { id: "5", name: "Nirantara", color: "var(--green)" },
  { id: "6", name: "Applore", color: "var(--purple)" },
  { id: "7", name: "SquadXp", color: "var(--green)" },
  { id: "8", name: "Samsung India", color: "var(--purple)" },
  { id: "9", name: "Hasslebae", color: "var(--green)" },
  { id: "10", name: "India by the Bay", color: "var(--purple)" },
  { id: "11", name: "Pertinax Solutions", color: "var(--green)" },
  { id: "12", name: "Ophraah FX", color: "var(--purple)" },
  { id: "13", name: "Zerodha", color: "var(--green)" },
  { id: "14", name: "House of X", color: "var(--purple)" },
  { id: "15", name: "Growth School", color: "var(--green)" },
  { id: "16", name: "Olive Kitchen", color: "var(--purple)" },
  { id: "17", name: "Appinventive", color: "var(--green)" },
  { id: "18", name: "CSL Finance", color: "var(--purple)" },
];

function LogoItem({ logo }) {
  return (
    <span className={styles.logo} style={{ color: logo.color }}>
      {logo.name}
    </span>
  );
}

export default function LogoMarquee() {
  const row = LOGOS.map((logo) => <LogoItem key={logo.id} logo={logo} />);

  return (
    <section className={styles.section} aria-label="Trusted by">
      {/* <SectionBackground variant="light" /> */}
      <div className={styles.mask}>
        <div className={styles.track}>
          {row}
          {row}
        </div>
      </div>
    </section>
  );
}
