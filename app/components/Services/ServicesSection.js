 "use client";

import styles from "./ServicesSection.module.css";

const services = [
  {
    id: "growth-strategy",
    variant: "featured",
    label: "Strategy",
    title: "Growth Strategy",
    description:
      "Design an experiment-led roadmap so every campaign ladders up to revenue, not vanity metrics.",
  },
  {
    id: "performance-marketing",
    variant: "orange",
    label: "Acquisition",
    title: "Performance Marketing",
    description:
      "Turn ad spend into a measurable acquisition engine with clear CAC, payback, and ROI targets.",
  },
  {
    id: "web-design-dev",
    variant: "blue",
    label: "Product Surface",
    title: "Website Design & Development",
    description:
      "Ship a fast, conversion-focused site that explains your offer, qualifies visitors, and captures demand.",
  },
  {
    id: "seo",
    variant: "green",
    label: "Compounding",
    title: "SEO",
    description:
      "Build search visibility around real intent—pages that compound traffic and pipeline over time.",
  },
];

function TurbulentFilter({ id }) {
  return (
    <filter
      id={id}
      colorInterpolationFilters="sRGB"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
    >
      <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
      <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
        <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
      </feOffset>
      <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
      <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
        <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
      </feOffset>
      <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="2" />
      <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
        <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
      </feOffset>
      <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="2" />
      <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
        <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
      </feOffset>
      <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
      <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
      <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
      <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
    </filter>
  );
}

function ServiceCard({ label, title, description, variant }) {
  return (
    <article className={styles.cardContainer} data-variant={variant}>
      <div className={styles.innerContainer}>
        <div className={styles.borderOuter}>
          <div className={styles.mainCard} />
        </div>

        <div className={styles.glowLayer1} />
        <div className={styles.glowLayer2} />
      </div>

      <div className={styles.overlay1} />
      <div className={styles.overlay2} />
      <div className={styles.backgroundGlow} />

      <div className={styles.contentContainer}>
        <div className={styles.contentTop}>
          <div className={styles.pill}>{label}</div>
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
      <svg aria-hidden="true" className={styles.svgFilter} viewBox="0 0 500 700">
        <defs>
          <TurbulentFilter id="filter-electric-orange" />
          <TurbulentFilter id="filter-electric-blue" />
          <TurbulentFilter id="filter-electric-featured" />
          <TurbulentFilter id="filter-electric-green" />
        </defs>
      </svg>

      <header className={styles.heading}>
        <p>Services</p>
        <h2 id="services-heading" className={styles.headingTitle}>
          Experiments that move <span className={styles.green}>metrics</span>
        </h2>
      </header>

      <div className={styles.grid}>
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} variant={service.variant} />
        ))}
      </div>
    </section>
  );
}

