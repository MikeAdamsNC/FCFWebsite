"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Field, TextInput, NumberInput } from "@/components/admin/fields";
import { SaveBar } from "@/components/admin/SaveBar";
import { saveSection } from "@/components/admin/saveClient";
import type { SiteContent } from "@/lib/content";

const MapPicker = dynamic(() => import("./MapPicker").then((m) => m.MapPicker), {
  ssr: false,
  loading: () => (
    <div
      className="map-pick-wrap"
      style={{ background: "var(--cream)", display: "grid", placeItems: "center" }}
    >
      Loading map&hellip;
    </div>
  ),
});

export function MapEditor({ initial }: { initial: SiteContent["map"] }) {
  const [map, setMap] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    try {
      await saveSection("map", map);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Map pin</h1>
      <p style={{ color: "var(--umber-soft)", marginBottom: 20 }}>
        Drag the pin to move the farm location, or fine-tune the coordinates below.
      </p>

      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--rule)",
          padding: 20,
          borderRadius: 6,
          marginBottom: 32,
        }}
      >
        <MapPicker
          lat={map.lat}
          lng={map.lng}
          zoom={map.zoom}
          label={map.pinLabel}
          onChange={(next) => setMap({ ...map, lat: next.lat, lng: next.lng, zoom: next.zoom })}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20 }}>
          <Field label="Latitude">
            <NumberInput value={map.lat} onChange={(v) => setMap({ ...map, lat: v })} step="0.0001" />
          </Field>
          <Field label="Longitude">
            <NumberInput value={map.lng} onChange={(v) => setMap({ ...map, lng: v })} step="0.0001" />
          </Field>
          <Field label="Default zoom">
            <NumberInput
              value={map.zoom}
              onChange={(v) => setMap({ ...map, zoom: Math.round(v) })}
              step={1}
              min={1}
              max={19}
            />
          </Field>
        </div>

        <Field label="Pin label">
          <TextInput
            value={map.pinLabel}
            onChange={(v) => setMap({ ...map, pinLabel: v })}
          />
        </Field>

        <Field
          label="Directions URL"
          hint='The "Directions" button deep-links here. Typically a maps.google.com/?q=... URL to your address.'
        >
          <TextInput
            value={map.directionsUrl}
            onChange={(v) => setMap({ ...map, directionsUrl: v })}
          />
        </Field>
      </div>

      <SaveBar busy={status === "saving"} status={status} error={error} />
    </form>
  );
}
