"use client";

import { useState } from "react";
import { Field, TextInput, Select, ImageField } from "@/components/admin/fields";
import { ListEditor } from "@/components/admin/ListEditor";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import type { Animal } from "@/lib/content";

const CLS_OPTIONS: { value: Animal["cls"]; label: string }[] = [
  { value: "a1", label: "a1 (large top-left)" },
  { value: "a2", label: "a2 (medium)" },
  { value: "a3", label: "a3 (medium)" },
  { value: "a4", label: "a4 (small)" },
  { value: "a5", label: "a5 (medium)" },
  { value: "a6", label: "a6 (large bottom-right)" },
];

export function AnimalsEditor({ initial }: { initial: Animal[] }) {
  const [animals, setAnimals] = useState<Animal[]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      await saveSection("animals", animals);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Animals</h1>
      <ListEditor<Animal>
        items={animals}
        onChange={setAnimals}
        newItem={() => ({
          id: `animal-${Date.now()}`,
          name: "",
          count: "",
          cls: "a2",
          image: "",
        })}
        addLabel="Add animal"
        renderItem={(a, update) => (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="ID">
                <TextInput value={a.id} onChange={(v) => update({ ...a, id: v })} />
              </Field>
              <Field label="Name">
                <TextInput value={a.name} onChange={(v) => update({ ...a, name: v })} />
              </Field>
            </div>
            <Field label="Caption" hint='e.g. "200+ laying hens"'>
              <TextInput value={a.count} onChange={(v) => update({ ...a, count: v })} />
            </Field>
            <Field label="Grid slot">
              <Select<Animal["cls"]>
                value={a.cls}
                onChange={(v) => update({ ...a, cls: v })}
                options={CLS_OPTIONS}
              />
            </Field>
            <Field label="Image">
              <ImageField value={a.image} onChange={(v) => update({ ...a, image: v })} slug={a.id} />
            </Field>
          </div>
        )}
      />
      <SaveBar busy={status === "saving"} status={status} error={error} />
    </form>
  );
}
