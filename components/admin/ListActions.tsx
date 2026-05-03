"use client";

import { useTransition } from "react";

type Props = {
  index: number;
  total: number;
  onMove: (index: number, dir: -1 | 1) => Promise<unknown>;
  onDelete: (index: number) => Promise<unknown>;
  deleteConfirm?: string;
};

export function ListActions({ index, total, onMove, onDelete, deleteConfirm = "Delete this item?" }: Props) {
  const [pending, start] = useTransition();
  return (
    <div className="row-actions">
      <button
        type="button"
        className="icon-btn"
        title="Move up"
        disabled={pending || index === 0}
        onClick={() => start(() => onMove(index, -1).then(() => undefined))}
      >
        ↑
      </button>
      <button
        type="button"
        className="icon-btn"
        title="Move down"
        disabled={pending || index === total - 1}
        onClick={() => start(() => onMove(index, 1).then(() => undefined))}
      >
        ↓
      </button>
      <button
        type="button"
        className="icon-btn"
        title="Delete"
        disabled={pending}
        onClick={() => {
          if (!confirm(deleteConfirm)) return;
          start(() => onDelete(index).then(() => undefined));
        }}
      >
        ✕
      </button>
    </div>
  );
}
