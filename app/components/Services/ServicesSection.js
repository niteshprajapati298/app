"use client";

import SectionBackground from "../SectionBackground/SectionBackground";
import CtaButton from "../CtaButton/CtaButton";
import styles from "./ServicesSection.module.css";

const iconBrand = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <circle cx="24" cy="24" r="10" />
    <path d="M24 14v20M14 24h20" />
    <path d="M18 18l12 12M30 18L18 30" />
  </svg>
);

const iconContent = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <path d="M12 36l8-24 8 12 8-12 8 24" />
    <path d="M20 24h16" />
  </svg>
);

const iconSEO = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <circle cx="22" cy="22" r="10" />
    <path d="M32 32l8 8" />
  </svg>
);

const iconWebDev = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <rect x="6" y="12" width="36" height="24" rx="2" />
    <path d="M6 20h36M14 28h4M22 28h4" />
    <path d="M18 16l3-4 3 4" />
  </svg>
);

const iconCommunity = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <circle cx="18" cy="16" r="5" />
    <circle cx="30" cy="16" r="5" />
    <path d="M8 36c0-5 4-9 10-9s10 4 10 9" />
    <path d="M28 36c0-5 4-9 10-9" />
  </svg>
);

const iconEvents = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cardIcon}>
    <rect x="8" y="10" width="32" height="28" rx="2" />
    <path d="M8 20h32M16 6v8M32 6v8" />
    <circle cx="24" cy="28" r="4" />
  </svg>
);

// Columns: STRATEGY (blue), CONTENT (orange), VISIBILITY (green)
const COLUMNS = [
  {
    id: "strategy",
    header: "STRATEGY",
    variant: "blue",
    services: [
      {
        id: "brand-positioning",
        label: "STRATEGY",
        title: "Brand Positioning & Brand Strategy",
        description:
          "We help you determine your brand's current position and future direction. We establish your positioning and niche through brand audits and market clarity. Making your brand recognizable, consistent, and simple to recall is the aim.",
        icon: iconBrand,
      },
      {
        id: "web-design-dev",
        label: "DIGITAL",
        title: "Website Design & Development",
        description:
          "We design and build websites that look clean, work smoothly, and communicate clearly. Every website is created to improve user experience and support business growth.",
        icon: iconWebDev,
      },
    ],
  },
  {
    id: "content",
    header: "CONTENT",
    variant: "orange",
    services: [
      {
        id: "content-social",
        label: "CONTENT",
        title: "Content & Social Media",
        description:
          "We transform concepts into content that appeals to your target audience. Everything is designed to remain current and interesting, from original ideas to written and social media content. Not just reach, but content that fosters trust.",
        icon: iconContent,
      },
      {
        id: "community",
        label: "ENGAGEMENT",
        title: "Community Management & Engagement",
        description:
          "We help build and manage communities that keep your audience involved. Through consistent interaction and engagement, we turn followers into loyal supporters.",
        icon: iconCommunity,
      },
    ],
  },
  {
    id: "visibility",
    header: "VISIBILITY",
    variant: "green",
    services: [
      {
        id: "seo",
        label: "VISIBILITY",
        title: "Search Engine Optimization (SEO)",
        description:
          "We optimize your website so people can actually find you online. From technical improvements to content optimization, our focus is long-term visibility and steady organic growth.",
        icon: iconSEO,
      },
      {
        id: "offline-events",
        label: "EXPERIENCES",
        title: "Offline Marketing, Campaigns & Events",
        description:
          "We create offline campaigns and events that strengthen brand presence in the real world. Experiences designed to support your digital growth and build stronger connections.",
        icon: iconEvents,
      },
    ],
  },
];

function ServiceCard({ label, title, description, variant, icon }) {
  return (
    <article className={styles.cardContainer} data-variant={variant}>
      <div className={styles.contentContainer}>
        <div className={styles.contentTop}>
          <div className={styles.pill}>{label}</div>
          <div className={styles.iconWrapper}>{icon}</div>
          <h3 className={styles.title}>{title}</h3>
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
      {/* <SectionBackground /> */}
      <header className={styles.heading}>
        <p>Services</p>
        <h2 id="services-heading" className={styles.headingTitle}>
          What we <span className={styles.green}>offer</span>
        </h2>
      </header>

      <div className={styles.columns}>
        {COLUMNS.map((column) => (
          <div key={column.id} className={styles.column} data-variant={column.variant}>
            <h3 className={styles.columnHeader}>{column.header}</h3>
            <div className={styles.columnCards}>
              {column.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  variant={column.variant}
                  icon={service.icon}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <CtaButton variant="secondary">Start a conversation</CtaButton>
      </div>
    </section>
  );
}

