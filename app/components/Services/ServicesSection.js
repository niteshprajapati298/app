"use client";

import styles from "./ServicesSection.module.css";

const iconGrowth = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <path d="M8 36L16 28L24 32L40 16" />
    <path d="M40 16V24H32" />
  </svg>
);

const iconPerformance = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <path d="M24 8v32M12 20v20M36 14v26" />
    <circle cx="24" cy="24" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" />
  </svg>
);

const iconWebDev = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <rect x="6" y="12" width="36" height="24" rx="2" />
    <path d="M6 20h36M14 28h4M22 28h4" />
    <path d="M18 16l3-4 3 4" />
  </svg>
);

const iconSEO = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <circle cx="22" cy="22" r="10" />
    <path d="M32 32l8 8" />
  </svg>
);

const iconAnalytics = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <path d="M8 36h8V24h-8zM20 36h8V16h-8zM32 36h8V8h-8z" />
  </svg>
);

const iconContent = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <path d="M12 36l8-24 8 12 8-12 8 24" />
    <path d="M20 24h16" />
  </svg>
);

const services = [
  {
    id: "growth-strategy",
    variant: "featured",
    label: "Strategy",
    title: "Growth Strategy",
    description:
      "Design an experiment-led roadmap so every campaign ladders up to revenue, not vanity metrics.",
    icon: iconGrowth,
  },
  {
    id: "performance-marketing",
    variant: "orange",
    label: "Acquisition",
    title: "Performance Marketing",
    description:
      "Turn ad spend into a measurable acquisition engine with clear CAC, payback, and ROI targets.",
    icon: iconPerformance,
  },
  {
    id: "web-design-dev",
    variant: "blue",
    label: "Product Surface",
    title: "Website Design & Development",
    description:
      "Ship a fast, conversion-focused site that explains your offer, qualifies visitors, and captures demand.",
    icon: iconWebDev,
  },
  {
    id: "seo",
    variant: "green",
    label: "Compounding",
    title: "SEO",
    description:
      "Build search visibility around real intent—pages that compound traffic and pipeline over time.",
    icon: iconSEO,
  },
  {
    id: "analytics-attribution",
    variant: "orange",
    label: "Measurement",
    title: "Analytics & Attribution",
    description:
      "Connect campaigns to revenue with clean data, attribution modeling, and dashboards that tell the real story.",
    icon: iconAnalytics,
  },
  {
    id: "content-brand",
    variant: "blue",
    label: "Brand",
    title: "Content & Brand",
    description:
      "Create messaging and creative that resonates—from landing pages to ad creative that drives conversions.",
    icon: iconContent,
  },
];

function ServiceCard({ label, title, description, variant, icon }) {
  return (
    <article className={styles.cardContainer} data-variant={variant}>
      <div className={styles.innerContainer}>
        <div className={styles.borderOuter}>
          <div className={styles.mainCard} />
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.contentTop}>
          <div className={styles.pill}>{label}</div>
          <div className={styles.iconWrapper}>{icon}</div>
          <p className={styles.title}>{title}</p>
        </div>

        <hr className={styles.divider} />

        <div className={styles.contentBottom}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="services-heading"
      id="services"
    >
      <header className={styles.heading}>
        <p>Services</p>
        <h2 id="services-heading" className={styles.headingTitle}>
          Experiments that move <span className={styles.green}>metrics</span>
        </h2>
      </header>

      <div className={styles.grid}>
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} variant={service.variant} icon={service.icon} />
        ))}
      </div>
    </section>
  );
}

