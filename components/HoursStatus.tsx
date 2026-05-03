"use client";

import { useEffect, useState } from "react";
import { isOpenNow, nextOpening } from "@/lib/hours";
import type { Hours } from "@/lib/content-types";

type Props = { hours: Hours };

export function HoursStatus({ hours }: Props) {
  const [state, setState] = useState(() => ({ open: false, note: "" }));

  useEffect(() => {
    const update = () => setState({ open: isOpenNow(hours), note: nextOpening(hours) });
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [hours]);

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
