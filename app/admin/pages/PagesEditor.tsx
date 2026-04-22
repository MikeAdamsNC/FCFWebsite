"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, ImageField } from "@/components/admin/fields";
import { ListEditor } from "@/components/admin/ListEditor";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import type { SiteContent } from "@/lib/content";

export function PagesEditor({ initial }: { initial: SiteContent["pages"] }) {
  const [pages, setPages] = useState<SiteContent["pages"]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      await saveSection("pages", pages);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  const italicHint = "Wrap words in <em>...</em> for italic emphasis.";

  const update = <K extends keyof SiteContent["pages"]>(
    key: K,
    value: SiteContent["pages"][K]
  ) => setPages({ ...pages, [key]: value });

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Page copy</h1>

      <Section title="Animals page">
        <Field label="Title (HTML allowed)" hint={italicHint}>
          <TextInput
            value={pages.animals.title}
            onChange={(v) => update("animals", { ...pages.animals, title: v })}
          />
        </Field>
        <Field label="Lede">
          <TextArea
            value={pages.animals.lede}
            onChange={(v) => update("animals", { ...pages.animals, lede: v })}
            rows={3}
          />
        </Field>
        <Field label="How-we-raise-them columns">
          <ListEditor
            items={pages.animals.sections}
            onChange={(next) => update("animals", { ...pages.animals, sections: next })}
            newItem={() => ({ eyebrow: "", heading: "", body: "" })}
            addLabel="Add column"
            renderItem={(s, updateItem) => (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
                  <Field label="Eyebrow">
                    <TextInput
                      value={s.eyebrow}
                      onChange={(v) => updateItem({ ...s, eyebrow: v })}
                    />
                  </Field>
                  <Field label="Heading (HTML)" hint={italicHint}>
                    <TextInput
                      value={s.heading}
                      onChange={(v) => updateItem({ ...s, heading: v })}
                    />
                  </Field>
                </div>
                <Field label="Body">
                  <TextArea value={s.body} onChange={(v) => updateItem({ ...s, body: v })} />
                </Field>
              </div>
            )}
          />
        </Field>
      </Section>

      <Section title="About page">
        <Field label="Title (HTML)" hint={italicHint}>
          <TextInput
            value={pages.about.title}
            onChange={(v) => update("about", { ...pages.about, title: v })}
          />
        </Field>
        <Field label="Lede">
          <TextArea
            value={pages.about.lede}
            onChange={(v) => update("about", { ...pages.about, lede: v })}
            rows={3}
          />
        </Field>
        <Field label="Eyebrow">
          <TextInput
            value={pages.about.eyebrow}
            onChange={(v) => update("about", { ...pages.about, eyebrow: v })}
          />
        </Field>
        <Field label="Heading (HTML)" hint={italicHint}>
          <TextInput
            value={pages.about.heading}
            onChange={(v) => update("about", { ...pages.about, heading: v })}
          />
        </Field>
        {pages.about.body.map((p, i) => (
          <Field key={i} label={`Paragraph ${i + 1}`}>
            <TextArea
              value={p}
              onChange={(v) => {
                const body = pages.about.body.slice();
                body[i] = v;
                update("about", { ...pages.about, body });
              }}
            />
          </Field>
        ))}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() =>
              update("about", { ...pages.about, body: [...pages.about.body, ""] })
            }
          >
            + Add paragraph
          </button>
          {pages.about.body.length > 1 && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() =>
                update("about", { ...pages.about, body: pages.about.body.slice(0, -1) })
              }
              style={{ color: "var(--clay)" }}
            >
              Remove last
            </button>
          )}
        </div>
        <Field label="Portrait image">
          <ImageField
            value={pages.about.portrait}
            onChange={(v) => update("about", { ...pages.about, portrait: v })}
            slug="about-portrait"
          />
        </Field>
        <Field label="Belief columns">
          <ListEditor
            items={pages.about.beliefs}
            onChange={(next) => update("about", { ...pages.about, beliefs: next })}
            newItem={() => ({ heading: "", body: "" })}
            addLabel="Add belief"
            renderItem={(b, updateItem) => (
              <div>
                <Field label="Heading (HTML)" hint={italicHint}>
                  <TextInput
                    value={b.heading}
                    onChange={(v) => updateItem({ ...b, heading: v })}
                  />
                </Field>
                <Field label="Body">
                  <TextArea value={b.body} onChange={(v) => updateItem({ ...b, body: v })} />
                </Field>
              </div>
            )}
          />
        </Field>
      </Section>

      <Section title="Classes page">
        <Field label="Title (HTML)" hint={italicHint}>
          <TextInput
            value={pages.classes.title}
            onChange={(v) => update("classes", { ...pages.classes, title: v })}
          />
        </Field>
        <Field label="Lede">
          <TextArea
            value={pages.classes.lede}
            onChange={(v) => update("classes", { ...pages.classes, lede: v })}
            rows={3}
          />
        </Field>
      </Section>

      <Section title="Farm Store page">
        <Field label="Title (HTML)" hint={italicHint}>
          <TextInput
            value={pages.farmStore.title}
            onChange={(v) => update("farmStore", { ...pages.farmStore, title: v })}
          />
        </Field>
        <Field label="Lede">
          <TextArea
            value={pages.farmStore.lede}
            onChange={(v) => update("farmStore", { ...pages.farmStore, lede: v })}
            rows={3}
          />
        </Field>
        <Field label='Cooler heading (HTML)'>
          <TextInput
            value={pages.farmStore.coolerHeading}
            onChange={(v) => update("farmStore", { ...pages.farmStore, coolerHeading: v })}
          />
        </Field>
        <Field label='Cooler sub-copy'>
          <TextArea
            value={pages.farmStore.coolerSub}
            onChange={(v) => update("farmStore", { ...pages.farmStore, coolerSub: v })}
            rows={3}
          />
        </Field>
        <Field label="Farm Store hero image">
          <ImageField
            value={pages.farmStore.heroImage}
            onChange={(v) => update("farmStore", { ...pages.farmStore, heroImage: v })}
            slug="farmstore-hero"
          />
        </Field>
        <Field label='Map heading (HTML)'>
          <TextInput
            value={pages.farmStore.mapHeading}
            onChange={(v) => update("farmStore", { ...pages.farmStore, mapHeading: v })}
          />
        </Field>
        <Field label="Map section eyebrow">
          <TextInput
            value={pages.farmStore.mapSectionNum}
            onChange={(v) => update("farmStore", { ...pages.farmStore, mapSectionNum: v })}
          />
        </Field>
      </Section>

      <Section title="Contact page">
        <Field label="Title (HTML)" hint={italicHint}>
          <TextInput
            value={pages.contact.title}
            onChange={(v) => update("contact", { ...pages.contact, title: v })}
          />
        </Field>
        <Field label="Lede">
          <TextArea
            value={pages.contact.lede}
            onChange={(v) => update("contact", { ...pages.contact, lede: v })}
            rows={3}
          />
        </Field>
      </Section>

      <Section title="Gallery page">
        <Field label="Title (HTML)" hint={italicHint}>
          <TextInput
            value={pages.gallery.title}
            onChange={(v) => update("gallery", { ...pages.gallery, title: v })}
          />
        </Field>
        <Field label="Lede">
          <TextArea
            value={pages.gallery.lede}
            onChange={(v) => update("gallery", { ...pages.gallery, lede: v })}
            rows={3}
          />
        </Field>
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
