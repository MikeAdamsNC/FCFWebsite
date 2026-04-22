"use client";

import { useState } from "react";
import { Field, TextInput, NumberInput } from "@/components/admin/fields";
import { ListEditor } from "@/components/admin/ListEditor";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import type { SiteContent } from "@/lib/content";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function HoursEditor({
  initialHours,
  initialAnnounce,
}: {
  initialHours: SiteContent["hours"];
  initialAnnounce: SiteContent["announce"];
}) {
  const [hours, setHours] = useState(initialHours);
  const [announce, setAnnounce] = useState(initialAnnounce);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const toggleDay = (d: number) => {
    const has = hours.days.includes(d);
    setHours({
      ...hours,
      days: has ? hours.days.filter((x) => x !== d) : [...hours.days, d].sort(),
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      await saveSection("hours", hours);
      await saveSection("announce", announce);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Hours &amp; announce</h1>

      <Section title="Farm store hours">
        <Field label="Open days" hint="Used for the open/closed dot in the header and hours card.">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {DAY_NAMES.map((n, i) => (
              <label
                key={n}
                style={{
                  padding: "6px 12px",
                  border: "1px solid var(--rule)",
                  borderRadius: 4,
                  background: hours.days.includes(i) ? "var(--clay)" : "var(--paper)",
                  color: hours.days.includes(i) ? "var(--paper)" : "var(--ink)",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                <input
                  type="checkbox"
                  checked={hours.days.includes(i)}
                  onChange={() => toggleDay(i)}
                  style={{ display: "none" }}
                />
                {n}
              </label>
            ))}
          </div>
        </Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Opens at (24-hour)" hint="e.g. 10 for 10 AM">
            <NumberInput
              value={hours.open}
              onChange={(v) => setHours({ ...hours, open: v })}
              step={0.25}
              min={0}
              max={23.75}
            />
          </Field>
          <Field label="Closes at (24-hour)" hint="e.g. 14 for 2 PM">
            <NumberInput
              value={hours.close}
              onChange={(v) => setHours({ ...hours, close: v })}
              step={0.25}
              min={0}
              max={23.75}
            />
          </Field>
        </div>
        <Field label="Display schedule" hint="Rows shown on Home and Farm Store pages.">
          <ListEditor
            items={hours.display}
            onChange={(next) => setHours({ ...hours, display: next })}
            newItem={() => ({ label: "", value: "" })}
            addLabel="Add row"
            renderItem={(row, update) => (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
                <Field label="Label">
                  <TextInput value={row.label} onChange={(v) => update({ ...row, label: v })} />
                </Field>
                <Field label="Value">
                  <TextInput value={row.value} onChange={(v) => update({ ...row, value: v })} />
                </Field>
              </div>
            )}
          />
        </Field>
      </Section>

      <Section title="Top-bar announcement">
        <Field label="Message">
          <TextInput
            value={announce.message}
            onChange={(v) => setAnnounce({ ...announce, message: v })}
          />
        </Field>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
          <Field label="Link URL">
            <TextInput
              value={announce.link}
              onChange={(v) => setAnnounce({ ...announce, link: v })}
            />
          </Field>
          <Field label="Link label">
            <TextInput
              value={announce.linkLabel}
              onChange={(v) => setAnnounce({ ...announce, linkLabel: v })}
            />
          </Field>
        </div>
      </Section>

      <SaveBar busy={status === "saving"} status={status} error={error} />
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 22, marginBottom: 16 }}>{title}</h2>
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--rule)",
          padding: 20,
          borderRadius: 6,
        }}
      >
        {children}
      </div>
    </section>
  );
}
