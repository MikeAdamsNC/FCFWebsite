"use client";

export function ListEditor<T>({
  items,
  onChange,
  renderItem,
  newItem,
  addLabel = "Add item",
}: {
  items: T[];
  onChange: (next: T[]) => void;
  renderItem: (item: T, update: (next: T) => void, index: number) => React.ReactNode;
  newItem: () => T;
  addLabel?: string;
}) {
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = items.slice();
    const [spliced] = next.splice(from, 1);
    next.splice(to, 0, spliced!);
    onChange(next);
  };
  const remove = (i: number) => {
    const next = items.slice();
    next.splice(i, 1);
    onChange(next);
  };
  const update = (i: number, v: T) => {
    const next = items.slice();
    next[i] = v;
    onChange(next);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid var(--rule)",
            borderRadius: 6,
            padding: 20,
            background: "var(--paper)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "var(--umber-soft)" }}>#{i + 1}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => move(i, i - 1)}
                disabled={i === 0}
              >
                &uarr;
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => move(i, i + 1)}
                disabled={i === items.length - 1}
              >
                &darr;
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => remove(i)}
                style={{ color: "var(--clay)" }}
              >
                Remove
              </button>
            </div>
          </div>
          {renderItem(item, (v) => update(i, v), i)}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => onChange([...items, newItem()])}
      >
        + {addLabel}
      </button>
    </div>
  );
}
