"use client";

import { useState } from "react";
import { Field, TextInput, Select } from "@/components/admin/fields";
import { ListEditor } from "@/components/admin/ListEditor";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import type { StockItem } from "@/lib/content";

const STATE_OPTIONS: { value: StockItem["state"]; label: string }[] = [
  { value: "in", label: "In stock (green)" },
  { value: "low", label: "Running low (amber)" },
  { value: "out", label: "Out / seasonal (red)" },
];

export function StockEditor({ initial }: { initial: StockItem[] }) {
  const [items, setItems] = useState<StockItem[]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      await saveSection("stock", items);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Cooler stock</h1>
      <ListEditor<StockItem>
        items={items}
        onChange={setItems}
        newItem={() => ({ name: "", state: "in", tag: "In Stock" })}
        addLabel="Add item"
        renderItem={(s, update) => (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>
            <Field label="Item name">
              <TextInput value={s.name} onChange={(v) => update({ ...s, name: v })} />
            </Field>
            <Field label="Status">
              <Select<StockItem["state"]>
                value={s.state}
                onChange={(v) => update({ ...s, state: v })}
                options={STATE_OPTIONS}
              />
            </Field>
            <Field label="Label" hint='"In Stock", "Running Low", "Fri Only"\u2026'>
              <TextInput value={s.tag} onChange={(v) => update({ ...s, tag: v })} />
            </Field>
          </div>
        )}
      />
      <SaveBar busy={status === "saving"} status={status} error={error} />
    </form>
  );
}
