"use client";

import { useState } from "react";
import { Field, TextInput, Select, ImageField } from "@/components/admin/fields";
import { ListEditor } from "@/components/admin/ListEditor";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import type { GalleryItem } from "@/lib/content";

const SHAPE_OPTIONS: { value: GalleryItem["cls"]; label: string }[] = [
  { value: "tall", label: "Tall" },
  { value: "sq", label: "Square" },
  { value: "wide", label: "Wide" },
];

export function GalleryEditor({ initial }: { initial: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      await saveSection("gallery", items);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Gallery</h1>
      <ListEditor<GalleryItem>
        items={items}
        onChange={setItems}
        newItem={() => ({ image: "", cls: "sq", label: "" })}
        addLabel="Add photo"
        renderItem={(g, update, i) => (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Caption (alt text)">
                <TextInput value={g.label} onChange={(v) => update({ ...g, label: v })} />
              </Field>
              <Field label="Shape">
                <Select<GalleryItem["cls"]>
                  value={g.cls}
                  onChange={(v) => update({ ...g, cls: v })}
                  options={SHAPE_OPTIONS}
                />
              </Field>
            </div>
            <Field label="Photo">
              <ImageField
                value={g.image}
                onChange={(v) => update({ ...g, image: v })}
                slug={`gallery-${i + 1}`}
              />
            </Field>
          </div>
        )}
      />
      <SaveBar busy={status === "saving"} status={status} error={error} />
    </form>
  );
}
