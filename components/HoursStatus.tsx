"use client";

import { useEffect, useState } from "react";
import { isOpenNow, nextOpening } from "@/lib/hours";

export function HoursStatus() {
  const [state, setState] = useState(() => ({ open: false, note: "" }));

  useEffect(() => {
    const update = () => setState({ open: isOpenNow(), note: nextOpening() });
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="hours-status">
        <span className={"dot " + (state.open ? "open" : "")} />
        <span>{state.open ? "Open now" : "Closed"}</span>
      </div>
      <div style={{ fontSize: 14, color: "var(--umber-soft)" }}>{state.note}</div>
    </>
  );
}
