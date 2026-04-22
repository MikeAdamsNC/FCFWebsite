"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Select } from "@/components/admin/fields";
import { ListEditor } from "@/components/admin/ListEditor";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import { TITLE_VARIANTS, type TitleVariant, type HeroVariant } from "@/components/Hero";
import type { SiteContent } from "@/lib/content";

const HERO_VARIANTS: { value: HeroVariant; label: string }[] = [
  { value: "stack", label: "Stacked photos + badge" },
  { value: "full", label: "Single full photo" },
  { value: "triptych", label: "Triptych grid" },
  { value: "polaroid", label: "Polaroid scatter" },
];

const TITLE_OPTIONS = (Object.entries(TITLE_VARIANTS) as [TitleVariant, { label: string }][]).map(
  ([value, meta]) => ({ value, label: meta.label })
);

export function HeroEditor({ initial }: { initial: SiteContent["hero"] }) {
  const [hero, setHero] = useState<SiteContent["hero"]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      await saveSection("hero", hero);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Home hero</h1>
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--rule)",
          padding: 20,
          borderRadius: 6,
        }}
      >
        <Field label="Headline variant">
          <Select
            value={hero.titleVariant as TitleVariant}
            onChange={(v) => setHero({ ...hero, titleVariant: v })}
            options={TITLE_OPTIONS}
          />
        </Field>
        <Field label="Hero visual layout">
          <Select
            value={hero.heroVariant as HeroVariant}
            onChange={(v) => setHero({ ...hero, heroVariant: v })}
            options={HERO_VARIANTS}
          />
        </Field>
        <Field label="Eyebrow (above headline)">
          <TextInput value={hero.eyebrow} onChange={(v) => setHero({ ...hero, eyebrow: v })} />
        </Field>
        <Field label="Subcopy (paragraph below headline)">
          <TextArea
            value={hero.subcopy}
            onChange={(v) => setHero({ ...hero, subcopy: v })}
            rows={4}
          />
        </Field>
        <Field label="Meta badges">
          <ListEditor
            items={hero.meta}
            onChange={(next) => setHero({ ...hero, meta: next })}
            newItem={() => ({ label: "", value: "" })}
            addLabel="Add badge"
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
      </div>
      <SaveBar busy={status === "saving"} status={status} error={error} />
    </form>
  );
}
