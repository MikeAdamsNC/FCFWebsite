"use client";

import { useState } from "react";
import { Field, TextInput, NumberInput, ImageField } from "@/components/admin/fields";
import { ListEditor } from "@/components/admin/ListEditor";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import type { Product } from "@/lib/content";

export function ProductsEditor({ initial }: { initial: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      await saveSection("products", products);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Products</h1>
      <ListEditor<Product>
        items={products}
        onChange={setProducts}
        newItem={() => ({
          id: `product-${Date.now()}`,
          name: "",
          cut: "",
          price: 0,
          unit: "lb",
          tag: null,
          image: "",
        })}
        addLabel="Add product"
        renderItem={(p, update) => (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="ID (used internally)">
                <TextInput value={p.id} onChange={(v) => update({ ...p, id: v })} />
              </Field>
              <Field label="Name">
                <TextInput value={p.name} onChange={(v) => update({ ...p, name: v })} />
              </Field>
            </div>
            <Field label="Cut / description" hint='e.g. "Pasture Raised \u00b7 Pork"'>
              <TextInput value={p.cut} onChange={(v) => update({ ...p, cut: v })} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <Field label="Price">
                <NumberInput
                  value={p.price}
                  onChange={(v) => update({ ...p, price: v })}
                  step={0.5}
                  min={0}
                />
              </Field>
              <Field label="Unit" hint='"lb", "dozen", "loaf", etc.'>
                <TextInput value={p.unit} onChange={(v) => update({ ...p, unit: v })} />
              </Field>
              <Field label="Badge" hint='Optional, e.g. "Best Seller"'>
                <TextInput
                  value={p.tag || ""}
                  onChange={(v) => update({ ...p, tag: v || null })}
                />
              </Field>
            </div>
            <Field label="Image">
              <ImageField
                value={p.image}
                onChange={(v) => update({ ...p, image: v })}
                slug={p.id}
              />
            </Field>
          </div>
        )}
      />
      <SaveBar busy={status === "saving"} status={status} error={error} />
    </form>
  );
}
