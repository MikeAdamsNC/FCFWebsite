"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import type { ClassEvent } from "@/lib/content";

type Props = { classes: ClassEvent[] };

type MonthState = { y: number; m: number };

export function ClassesCalendar({ classes }: Props) {
  const initial = useMemo<MonthState>(() => {
    const first = classes[0];
    if (first) {
      const [y, m] = first.date.split("-").map(Number);
      return { y, m: (m ?? 1) - 1 };
    }
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  }, [classes]);

  const [month, setMonth] = useState<MonthState>(initial);
  const [selected, setSelected] = useState<number | null>(null);

  const monthName = new Date(month.y, month.m, 1).toLocaleString("en-US", { month: "long" });
  const firstDow = new Date(month.y, month.m, 1).getDay();
  const daysInMonth = new Date(month.y, month.m + 1, 0).getDate();
  const prevMonthDays = new Date(month.y, month.m, 0).getDate();

  const eventDays = useMemo(() => {
    const map: Record<number, ClassEvent> = {};
    classes.forEach((c) => {
      const [y, m, d] = c.date.split("-").map(Number);
      if (y === month.y && (m ?? 0) - 1 === month.m) {
        map[d ?? 0] = c;
      }
    });
    return map;
  }, [classes, month]);

  const cells: { muted?: boolean; n: number; event?: ClassEvent }[] = [];
  for (let i = 0; i < firstDow; i++)
    cells.push({ muted: true, n: prevMonthDays - firstDow + i + 1 });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ n: d, event: eventDays[d] });
  while (cells.length % 7 !== 0)
    cells.push({ muted: true, n: cells.length - firstDow - daysInMonth + 1 });

  const nav = (dir: 1 | -1) => {
    setMonth((prev) => {
      const m = prev.m + dir;
      if (m < 0) return { y: prev.y - 1, m: 11 };
      if (m > 11) return { y: prev.y + 1, m: 0 };
      return { y: prev.y, m };
    });
    setSelected(null);
  };

  const filtered = selected
    ? classes.filter((c) => {
        const [y, m, d] = c.date.split("-").map(Number);
        return y === month.y && (m ?? 0) - 1 === month.m && d === selected;
      })
    : classes;

  return (
    <div className="classes-wrap">
      <div>
        <div className="cal">
          <div className="cal-head">
            <h3>
              {monthName} {month.y}
            </h3>
            <div className="cal-nav">
              <button onClick={() => nav(-1)} aria-label="Previous month">
                <Icon name="chev_l" size={14} />
              </button>
              <button onClick={() => nav(1)} aria-label="Next month">
                <Icon name="chev_r" size={14} />
              </button>
            </div>
          </div>
          <div className="cal-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="cal-dow">
                {d}
              </div>
            ))}
            {cells.map((c, i) => (
              <div
                key={i}
                className={
                  "cal-day " +
                  (c.muted ? "muted " : "") +
                  (c.event ? "has-event " : "") +
                  (selected === c.n ? "selected" : "")
                }
                onClick={() => c.event && setSelected(selected === c.n ? null : c.n)}
              >
                {c.n}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid var(--rule-soft)",
              fontSize: 12,
              color: "var(--umber-soft)",
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--clay)",
                display: "inline-block",
              }}
            />
            <span>Click a highlighted day to filter</span>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 20,
          }}
        >
          <h2 style={{ fontSize: 28 }}>
            {selected ? `${monthName} ${selected}` : "Upcoming"}
          </h2>
          {selected && (
            <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>
              Clear <Icon name="x" size={12} />
            </button>
          )}
        </div>
        <div className="class-list">
          {filtered.length === 0 && (
            <div
              style={{
                padding: 40,
                textAlign: "center",
                color: "var(--umber-soft)",
                border: "1px dashed var(--rule)",
                borderRadius: 4,
              }}
            >
              Nothing booked for that day &mdash; try another.
            </div>
          )}
          {filtered.map((c) => (
            <div key={c.id} className="class-item">
              <div className="class-date">
                <div className="m">{c.month}</div>
                <div className="d">{c.day}</div>
              </div>
              <div className="class-meta">
                <h4>{c.name}</h4>
                <p style={{ fontSize: 14, color: "var(--umber-soft)", margin: "2px 0 6px" }}>
                  {c.desc}
                </p>
                <div className="row">
                  <span>
                    <Icon name="clock_sm" size={13} /> {c.time}
                  </span>
                  <span>
                    <Icon name="users" size={13} /> {c.seats}
                  </span>
                  <span>
                    <strong style={{ color: "var(--ink)" }}>${c.price}</strong>
                  </span>
                </div>
              </div>
              <button className="btn btn-clay btn-sm">Reserve</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
