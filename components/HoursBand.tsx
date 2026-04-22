"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import type { SiteContent } from "@/lib/content";
import { isOpenNow, nextOpening } from "@/lib/hours";

type Props = {
  hours: SiteContent["hours"];
  contactAddress: SiteContent["contact"]["address"];
};

export function HoursBand({ hours, contactAddress }: Props) {
  const [state, setState] = useState(() => ({ open: false, note: "" }));

  useEffect(() => {
    const update = () => setState({ open: isOpenNow(), note: nextOpening() });
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hours-band">
      <div className="wrap">
        <div className="hours-card">
          <div className="hours-status">
            <span className={"dot " + (state.open ? "open" : "")} />
            <span>{state.open ? "Open now" : "Closed"}</span>
            <span
              style={{
                color: "var(--umber-soft)",
                fontFamily: "var(--sans)",
                fontSize: 14,
                marginLeft: 8,
              }}
            >
              &middot; {state.note}
            </span>
          </div>
          <div className="hours-sched">
            {hours.display.map((row) => (
              <div key={row.label}>
                <b>{row.label}</b>
                {row.value}
              </div>
            ))}
            <div>
              <b>ADDRESS</b>
              {contactAddress.street}, {contactAddress.city} {contactAddress.state}
            </div>
          </div>
          <Link href="/farm-store" className="btn btn-outline btn-sm">
            Farm store details <Icon name="arrow" size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
