"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, NumberInput } from "@/components/admin/fields";
import { ListEditor } from "@/components/admin/ListEditor";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import type { ClassEvent } from "@/lib/content";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function deriveMonthDay(dateStr: string): { month: string; day: number } {
  const [, m, d] = dateStr.split("-").map(Number);
  return {
    month: MONTH_LABELS[(m ?? 1) - 1] ?? "",
    day: d ?? 1,
  };
}

export function ClassesEditor({ initial }: { initial: ClassEvent[] }) {
  const [items, setItems] = useState<ClassEvent[]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      const normalized = items.map((c) => {
        const { month, day } = deriveMonthDay(c.date);
        return { ...c, month, day };
      });
      await saveSection("classes", normalized);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Classes</h1>
      <ListEditor<ClassEvent>
        items={items}
        onChange={setItems}
        newItem={() => ({
          id: `class-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          month: "",
          day: 1,
          name: "",
          time: "",
          seats: "Open",
          price: 0,
          desc: "",
        })}
        addLabel="Add class"
        renderItem={(c, update) => (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="ID">
                <TextInput value={c.id} onChange={(v) => update({ ...c, id: v })} />
              </Field>
              <Field label="Date">
                <TextInput
                  type="date"
                  value={c.date}
                  onChange={(v) => {
                    const { month, day } = deriveMonthDay(v);
                    update({ ...c, date: v, month, day });
                  }}
                />
              </Field>
            </div>
            <Field label="Name">
              <TextInput value={c.name} onChange={(v) => update({ ...c, name: v })} />
            </Field>
            <Field label="Description">
              <TextArea value={c.desc} onChange={(v) => update({ ...c, desc: v })} rows={2} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>
              <Field label="Time" hint='e.g. "10:00 AM \u2013 1:00 PM"'>
                <TextInput value={c.time} onChange={(v) => update({ ...c, time: v })} />
              </Field>
              <Field label="Seats note">
                <TextInput value={c.seats} onChange={(v) => update({ ...c, seats: v })} />
              </Field>
              <Field label="Price ($)">
                <NumberInput
                  value={c.price}
                  onChange={(v) => update({ ...c, price: v })}
                  step={1}
                />
              </Field>
            </div>
          </div>
        )}
      />
      <SaveBar busy={status === "saving"} status={status} error={error} />
    </form>
  );
}
