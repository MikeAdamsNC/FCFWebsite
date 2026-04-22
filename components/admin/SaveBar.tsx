"use client";

import Link from "next/link";

type Props = {
  busy: boolean;
  status: "idle" | "saving" | "saved" | "error";
  error?: string | null;
  backHref?: string;
};

export function SaveBar({ busy, status, error, backHref = "/admin" }: Props) {
  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        marginTop: 32,
        padding: "16px 20px",
        background: "var(--paper)",
        borderTop: "1px solid var(--rule)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.04)",
        borderRadius: 6,
      }}
    >
      <Link
        href={backHref}
        style={{ fontSize: 14, color: "var(--umber-soft)" }}
      >
        &larr; Back to dashboard
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {status === "saved" && (
          <span style={{ color: "var(--moss)", fontSize: 13 }}>
            Saved &mdash; live in ~1 minute.
          </span>
        )}
        {status === "error" && error && (
          <span style={{ color: "var(--clay)", fontSize: 13 }}>{error}</span>
        )}
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving\u2026" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
