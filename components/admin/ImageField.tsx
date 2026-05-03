"use client";

import { useRef, useState } from "react";

type Props = { label: string; name: string; defaultValue?: string; help?: string; full?: boolean };

export function ImageField({ label, name, defaultValue = "", help, full }: Props) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/admin/api/upload", { method: "POST", body: form });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Upload failed (${res.status})`);
      }
      const data = (await res.json()) as { url: string };
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={"admin-field image-field" + (full ? " full" : "")}>
      <label htmlFor={`${name}-url`}>{label}</label>
      <div
        className="preview"
        style={url ? { backgroundImage: `url(${url})`, borderStyle: "solid" } : undefined}
      >
        {!url && "No image yet"}
      </div>
      <div className="controls">
        <input
          id={`${name}-url`}
          name={name}
          type="text"
          value={url}
          placeholder="/assets/photos/... or full URL"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="button"
          className="admin-btn subtle"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
        >
          {busy ? "Uploading…" : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.currentTarget.value = "";
          }}
        />
      </div>
      {help && <span className="help">{help}</span>}
      {error && <span className="help" style={{ color: "#a52929" }}>{error}</span>}
    </div>
  );
}
