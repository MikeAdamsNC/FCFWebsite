"use client";

import { useState } from "react";
import { Icon } from "./Icon";

type Props = { email: string };

export function ContactForm({ email }: Props) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("network");
      setSent(true);
    } catch {
      setError("We couldn\u2019t send that. Please call or text us instead.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--moss)",
            color: "var(--paper)",
            display: "grid",
            placeItems: "center",
            margin: "0 auto 20px",
          }}
        >
          <Icon name="check" size={24} />
        </div>
        <div className="serif" style={{ fontSize: 22, marginBottom: 8 }}>
          Got it. Thanks.
        </div>
        <div style={{ color: "var(--umber-soft)", fontSize: 14 }}>
          We&rsquo;ll write back soon.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="_subject" value="New message from fustercluckfarm.com" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div className="form-field">
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" name="name" type="text" required placeholder="Jim Smith" />
      </div>
      <div className="form-field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="form-field">
        <label htmlFor="cf-topic">What&rsquo;s it about?</label>
        <select id="cf-topic" name="topic" defaultValue="">
          <option value="" disabled>
            Pick one
          </option>
          <option>Ordering / pickup</option>
          <option>Farm store visit</option>
          <option>Classes & workshops</option>
          <option>Wholesale / chefs</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="cf-msg">Message</label>
        <textarea
          id="cf-msg"
          name="message"
          required
          placeholder="Tell us what you&rsquo;re thinking about..."
        />
      </div>
      {error && (
        <div style={{ color: "var(--clay)", fontSize: 14, marginBottom: 12 }}>{error}</div>
      )}
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
        disabled={submitting}
      >
        {submitting ? "Sending\u2026" : "Send it"} <Icon name="arrow" size={15} />
      </button>
    </form>
  );
}
