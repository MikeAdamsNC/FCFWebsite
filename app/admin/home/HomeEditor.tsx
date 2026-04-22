"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, ImageField } from "@/components/admin/fields";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import type { SiteContent } from "@/lib/content";

type Props = {
  initialStory: SiteContent["homeStory"];
  initialQuote: SiteContent["homeQuote"];
  initialCta: SiteContent["homeCta"];
};

export function HomeEditor({ initialStory, initialQuote, initialCta }: Props) {
  const [story, setStory] = useState(initialStory);
  const [quote, setQuote] = useState(initialQuote);
  const [cta, setCta] = useState(initialCta);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      await saveSection("homeStory", story);
      await saveSection("homeQuote", quote);
      await saveSection("homeCta", cta);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  const italicHint = "You can wrap words in <em>...</em> for italic emphasis.";

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Home story, quote &amp; CTA</h1>

      <Section title="Story section">
        <Field label="Eyebrow">
          <TextInput value={story.eyebrow} onChange={(v) => setStory({ ...story, eyebrow: v })} />
        </Field>
        <Field label="Heading (HTML allowed)" hint={italicHint}>
          <TextInput value={story.heading} onChange={(v) => setStory({ ...story, heading: v })} />
        </Field>
        {story.body.map((p, i) => (
          <Field key={i} label={`Paragraph ${i + 1}`}>
            <TextArea
              value={p}
              onChange={(v) => {
                const body = story.body.slice();
                body[i] = v;
                setStory({ ...story, body });
              }}
            />
          </Field>
        ))}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setStory({ ...story, body: [...story.body, ""] })}
          >
            + Add paragraph
          </button>
          {story.body.length > 1 && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setStory({ ...story, body: story.body.slice(0, -1) })}
              style={{ color: "var(--clay)" }}
            >
              Remove last
            </button>
          )}
        </div>
        <Field label="Signature line">
          <TextInput
            value={story.signature}
            onChange={(v) => setStory({ ...story, signature: v })}
          />
        </Field>
        <Field label="Portrait image">
          <ImageField
            value={story.image}
            onChange={(v) => setStory({ ...story, image: v })}
            slug="home-story"
          />
        </Field>
      </Section>

      <Section title="Customer quote">
        <Field label="Quote text">
          <TextArea value={quote.text} onChange={(v) => setQuote({ ...quote, text: v })} rows={3} />
        </Field>
        <Field label="Citation">
          <TextInput value={quote.cite} onChange={(v) => setQuote({ ...quote, cite: v })} />
        </Field>
      </Section>

      <Section title='Classes call-to-action strip'>
        <Field label="Eyebrow">
          <TextInput value={cta.eyebrow} onChange={(v) => setCta({ ...cta, eyebrow: v })} />
        </Field>
        <Field label="Heading (HTML allowed)" hint={italicHint}>
          <TextInput value={cta.heading} onChange={(v) => setCta({ ...cta, heading: v })} />
        </Field>
        <Field label="Body">
          <TextArea value={cta.body} onChange={(v) => setCta({ ...cta, body: v })} rows={3} />
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
