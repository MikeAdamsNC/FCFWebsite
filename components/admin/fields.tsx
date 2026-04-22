"use client";

import { useState } from "react";
import { uploadImage } from "./saveClient";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--umber)" }}>
        {label}
      </div>
      {children}
      {hint && (
        <div style={{ fontSize: 12, color: "var(--umber-soft)", marginTop: 4 }}>{hint}</div>
      )}
    </label>
  );
}

type TextProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

export function TextInput({ value, onChange, placeholder, type = "text", required }: TextProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      style={fieldStyle}
    />
  );
}

export function NumberInput({
  value,
  onChange,
  step = "any",
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  step?: string | number;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(value) ? value : ""}
      onChange={(e) => onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
      step={step}
      min={min}
      max={max}
      style={fieldStyle}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      style={{ ...fieldStyle, resize: "vertical", fontFamily: "var(--sans)" }}
    />
  );
}

export function Select<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      style={fieldStyle}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function ImageField({
  value,
  onChange,
  slug,
}: {
  value: string;
  onChange: (url: string) => void;
  slug?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const url = await uploadImage(file, slug);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {value ? (
          <div
            style={{
              width: 120,
              height: 90,
              borderRadius: 4,
              border: "1px solid var(--rule)",
              backgroundImage: `url(${value})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: 120,
              height: 90,
              borderRadius: 4,
              border: "1px dashed var(--rule)",
              display: "grid",
              placeItems: "center",
              color: "var(--umber-soft)",
              fontSize: 12,
              flexShrink: 0,
            }}
          >
            no image
          </div>
        )}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/... or /assets/..."
            style={fieldStyle}
          />
          <label
            className="btn btn-outline btn-sm"
            style={{ cursor: "pointer", alignSelf: "flex-start" }}
          >
            {busy ? "Uploading\u2026" : "Upload new image"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={onFile}
              style={{ display: "none" }}
              disabled={busy}
            />
          </label>
          {error && (
            <div style={{ color: "var(--clay)", fontSize: 12 }}>{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--sans)",
  fontSize: 14,
  padding: "10px 12px",
  border: "1px solid var(--rule)",
  borderRadius: 4,
  background: "var(--paper)",
  color: "var(--ink)",
};
