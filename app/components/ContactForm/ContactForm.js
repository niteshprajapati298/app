"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionBackground from "../SectionBackground/SectionBackground";
import styles from "./ContactForm.module.css";

const CONTACT = [
  { type: "phone", value: "+91 8700448074", href: "tel:+918700448074", icon: "phone" },
  { type: "email", value: "labs.scalex@gmail.com", href: "mailto:labs.scalex@gmail.com", icon: "mail" },
  { type: "website", value: "labscalex.com", href: "https://www.labscalex.com", icon: "globe", external: true },
];

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <SectionBackground />
      <div className={styles.wrap}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Get in touch</span>
          <h2 id="contact-heading" className={styles.headline}>
            Let&apos;s Build Your <span className={styles.accent}>Growth System</span>
          </h2>
          <p className={styles.support}>
            One conversation. No pitch deck.
          </p>
        </motion.div>

        <div className={styles.layout}>
          <motion.form
            className={styles.formCard}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.formGlow} />
            <div className={styles.formInner}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.fieldLabel}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={styles.input}
                    placeholder="Your name"
                    disabled={status === "sending"}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.fieldLabel}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={styles.input}
                    placeholder="you@example.com"
                    disabled={status === "sending"}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="phone" className={styles.fieldLabel}>Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles.input}
                  placeholder="+91 98765 43210"
                  disabled={status === "sending"}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="message" className={styles.fieldLabel}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className={styles.textarea}
                  placeholder="Tell us about your project..."
                  disabled={status === "sending"}
                />
              </div>
              {status === "error" && (
                <p className={styles.error} role="alert">{errorMsg}</p>
              )}
              {status === "success" && (
                <p className={styles.success} role="status">
                  Thanks! We&apos;ll get back to you soon.
                </p>
              )}
              <button
                type="submit"
                className={styles.submit}
                disabled={status === "sending"}
              >
                <span>{status === "sending" ? "Sending..." : "Send message"}</span>
                <span className={styles.submitArrow}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </motion.form>

          <motion.div
            className={styles.contactCard}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className={styles.contactCardInner}>
              <h3 className={styles.contactTitle}>Contact us</h3>
              <div className={styles.contactList}>
                {CONTACT.map((item) => (
                  <a
                    key={item.type}
                    href={item.href}
                    className={styles.contactItem}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    <span className={styles.contactIcon}>
                      {item.icon === "phone" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      )}
                      {item.icon === "mail" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      )}
                      {item.icon === "globe" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      )}
                    </span>
                    <span className={styles.contactValue}>{item.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
