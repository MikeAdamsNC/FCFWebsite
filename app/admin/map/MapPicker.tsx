"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  lat: number;
  lng: number;
  zoom: number;
  label: string;
  onChange: (next: { lat: number; lng: number; zoom: number }) => void;
};

export function MapPicker({ lat, lng, zoom, label, onChange }: Props) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "fcf-pin",
        html: `
          <div class="fcf-pin-wrap">
            <div class="fcf-pin-label">${escapeHtml(label || "Drag me")}</div>
            <div class="fcf-pin-needle"></div>
          </div>
        `,
        iconSize: [180, 56],
        iconAnchor: [90, 56],
      }),
    [label]
  );

  return (
    <div className="map-pick-wrap">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        style={{ width: "100%", height: "100%" }}
        whenReady={() => {
          /* Leaflet initialized */
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[lat, lng]}
          draggable
          icon={icon}
          eventHandlers={{
            dragend: (e) => {
              const p = e.target.getLatLng() as L.LatLng;
              onChange({ lat: round(p.lat), lng: round(p.lng), zoom });
            },
          }}
        />
      </MapContainer>
    </div>
  );
}

function round(n: number): number {
  return Math.round(n * 1_000_000) / 1_000_000;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
