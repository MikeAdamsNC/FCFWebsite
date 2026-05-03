"use client";

import { useActionState, useEffect, useState } from "react";
import type { StockItem } from "@/lib/content-types";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { saveStockAction } from "./actions";

type Result = { ok: true; message?: string } | { ok: false; error: string };

const STATES: StockItem["state"][] = ["in", "low", "out"];

export function StockEditor({ initial }: { initial: StockItem[] }) {
  const [items, setItems] = useState<StockItem[]>(initial);
  const [state, formAction] = useActionState(saveStockAction, undefined as Result | undefined);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (!state) return;
    setToast(state.ok ? { kind: "ok", text: state.message || "Saved" } : { kind: "err", text: state.error });
    const id = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(id);
  }, [state]);

  function update(i: number, patch: Partial<StockItem>) {
    setItems((arr) => arr.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  }
  function remove(i: number) {
    setItems((arr) => arr.filter((_, idx) => idx !== i));
  }
  function add() {
    setItems((arr) => [...arr, { name: "", state: "in", tag: "In Stock" }]);
  }
  function move(i: number, dir: -1 | 1) {
    const t = i + dir;
    if (t < 0 || t >= items.length) return;
    setItems((arr) => {
      const copy = [...arr];
      [copy[i], copy[t]] = [copy[t], copy[i]];
      return copy;
    });
  }

  return (
    <form action={formAction} className="admin-form">
      <input type="hidden" name="payload" value={JSON.stringify(items)} />
      <div className="admin-section">
        <h2>Cooler stock</h2>
        <p className="section-help">Update the &quot;What&apos;s in the cooler&quot; status shown on the farm-store page.</p>

        {items.map((it, i) => (
          <div key={i} className="admin-list-row" style={{ borderTop: i === 0 ? "1px solid var(--rule)" : undefined, gridTemplateColumns: "1fr 140px 1fr auto" }}>
            <div className="admin-field" style={{ gap: 4 }}>
              <input
                value={it.name}
                onChange={(e) => update(i, { name: e.target.value })}
                placeholder="Item name"
              />
            </div>
            <div className="admin-field" style={{ gap: 4 }}>
              <select value={it.state} onChange={(e) => update(i, { state: e.target.value as StockItem["state"] })}>
                {STATES.map((s) => (
                  <option key={s} value={s}>{s.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div className="admin-field" style={{ gap: 4 }}>
              <input
                value={it.tag}
                onChange={(e) => update(i, { tag: e.target.value })}
                placeholder="Tag (e.g. In Stock)"
              />
            </div>
            <div className="row-actions">
              <button type="button" className="icon-btn" disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
              <button type="button" className="icon-btn" disabled={i === items.length - 1} onClick={() => move(i, 1)}>↓</button>
              <button type="button" className="icon-btn" onClick={() => remove(i)}>✕</button>
            </div>
          </div>
        ))}

        <button type="button" className="admin-btn subtle" onClick={add} style={{ marginTop: 16 }}>
          + Add stock item
        </button>
      </div>

      <div className="admin-actions">
        <SubmitButton>Save stock</SubmitButton>
      </div>

      {toast && (
        <div className={"admin-toast" + (toast.kind === "err" ? " error" : "")}>{toast.text}</div>
      )}
    </form>
  );
}
