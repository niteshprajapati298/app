"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactFormEmbed({ onSuccess }) {
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
      if (onSuccess) {
        setTimeout(onSuccess, 1400);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.embedForm}>
      <div className={styles.field}>
        <label htmlFor="modal-name" className={styles.fieldLabel}>Name</label>
        <input
          type="text"
          id="modal-name"
          name="name"
          required
          className={styles.input}
          placeholder="Your name"
          disabled={status === "sending"}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="modal-email" className={styles.fieldLabel}>Email</label>
        <input
          type="email"
          id="modal-email"
          name="email"
          required
          className={styles.input}
          placeholder="you@example.com"
          disabled={status === "sending"}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="modal-phone" className={styles.fieldLabel}>Phone</label>
        <input
          type="tel"
          id="modal-phone"
          name="phone"
          className={styles.input}
          placeholder="+91 98765 43210"
          disabled={status === "sending"}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="modal-message" className={styles.fieldLabel}>Message</label>
        <textarea
          id="modal-message"
          name="message"
          required
          rows={3}
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
    </form>
  );
}
