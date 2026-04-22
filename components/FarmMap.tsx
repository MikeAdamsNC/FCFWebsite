"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getSite } from "@/lib/content";

const pinIcon = L.divIcon({
  className: "fcf-pin",
  html: `
    <div class="fcf-pin-wrap">
      <div class="fcf-pin-label">Fuster Cluck Farm</div>
      <div class="fcf-pin-needle"></div>
    </div>
  `,
  iconSize: [180, 56],
  iconAnchor: [90, 56],
  popupAnchor: [0, -56],
});

export function FarmMap() {
  const { map, contact } = getSite();
  const position: [number, number] = [map.lat, map.lng];
  return (
    <div className="map-wrap">
      <MapContainer
        center={position}
        zoom={map.zoom}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={pinIcon}>
          <Popup>
            <strong>{map.pinLabel}</strong>
            <br />
            {contact.address.street}
            <br />
            {contact.address.city}, {contact.address.state} {contact.address.zip}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
