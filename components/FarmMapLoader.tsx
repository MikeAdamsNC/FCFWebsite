"use client";

import dynamic from "next/dynamic";

export const FarmMapLoader = dynamic(
  () => import("./FarmMap").then((m) => m.FarmMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="map-wrap"
        style={{ background: "var(--cream)", display: "grid", placeItems: "center" }}
      >
        <span style={{ color: "var(--umber-soft)", fontSize: 14 }}>Loading map&hellip;</span>
      </div>
    ),
  }
);
