"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, ImageField } from "@/components/admin/fields";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import type { SiteContent } from "@/lib/content";

type Props = {
  initialBrand: SiteContent["brand"];
  initialContact: SiteContent["contact"];
  initialSocial: SiteContent["social"];
  initialShopLinks: SiteContent["shopLinks"];
};

export function BrandEditor({
  initialBrand,
  initialContact,
  initialSocial,
  initialShopLinks,
}: Props) {
  const [brand, setBrand] = useState(initialBrand);
  const [contact, setContact] = useState(initialContact);
  const [social, setSocial] = useState(initialSocial);
  const [shopLinks, setShopLinks] = useState(initialShopLinks);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      await saveSection("brand", brand);
      await saveSection("contact", {
        ...contact,
        phoneHref: `tel:${contact.phone.replace(/[^\d]/g, "")}`,
      });
      await saveSection("social", social);
      await saveSection("shopLinks", shopLinks);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Brand &amp; contact</h1>

      <Section title="Brand">
        <Field label="Farm name">
          <TextInput value={brand.name} onChange={(v) => setBrand({ ...brand, name: v })} />
        </Field>
        <Field label="Footer tagline">
          <TextArea value={brand.tagline} onChange={(v) => setBrand({ ...brand, tagline: v })} />
        </Field>
        <Field label="Footer signoff" hint='Shown bottom-right in the footer, e.g. "Raised right. Sold right."'>
          <TextInput
            value={brand.shortTagline}
            onChange={(v) => setBrand({ ...brand, shortTagline: v })}
          />
        </Field>
        <Field label="Logo">
          <ImageField
            value={brand.logoUrl}
            onChange={(v) => setBrand({ ...brand, logoUrl: v })}
            slug="logo"
          />
        </Field>
        <Field label="Established year">
          <TextInput
            value={brand.established}
            onChange={(v) => setBrand({ ...brand, established: v })}
          />
        </Field>
      </Section>

      <Section title="Contact">
        <Field label="Phone" hint='Displayed on the site. A clickable tel: link is generated automatically.'>
          <TextInput value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
        </Field>
        <Field label="Email">
          <TextInput
            type="email"
            value={contact.email}
            onChange={(v) => setContact({ ...contact, email: v })}
          />
        </Field>
        <Field label="Street">
          <TextInput
            value={contact.address.street}
            onChange={(v) => setContact({ ...contact, address: { ...contact.address, street: v } })}
          />
        </Field>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>
          <Field label="City">
            <TextInput
              value={contact.address.city}
              onChange={(v) => setContact({ ...contact, address: { ...contact.address, city: v } })}
            />
          </Field>
          <Field label="State">
            <TextInput
              value={contact.address.state}
              onChange={(v) => setContact({ ...contact, address: { ...contact.address, state: v } })}
            />
          </Field>
          <Field label="ZIP">
            <TextInput
              value={contact.address.zip}
              onChange={(v) => setContact({ ...contact, address: { ...contact.address, zip: v } })}
            />
          </Field>
        </div>
      </Section>

      <Section title="Social">
        <Field label="Facebook URL">
          <TextInput
            value={social.facebook}
            onChange={(v) => setSocial({ ...social, facebook: v })}
          />
        </Field>
        <Field label="Instagram URL">
          <TextInput
            value={social.instagram}
            onChange={(v) => setSocial({ ...social, instagram: v })}
          />
        </Field>
      </Section>

      <Section title="Online shop link">
        <Field label="Barn2Door URL">
          <TextInput
            value={shopLinks.barn2door}
            onChange={(v) => setShopLinks({ ...shopLinks, barn2door: v })}
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
