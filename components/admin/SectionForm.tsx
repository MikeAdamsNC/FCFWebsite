"use client";

import { useActionState, useEffect, useState, type ReactNode } from "react";
import { SubmitButton } from "./SubmitButton";

type Result = { ok: true; message?: string } | { ok: false; error: string };

type Props = {
  action: (prev: Result | undefined, form: FormData) => Promise<Result>;
  children: ReactNode;
  submitLabel?: string;
};

export function SectionForm({ action, children, submitLabel = "Save" }: Props) {
  const [state, formAction] = useActionState(action, undefined);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (!state) return;
    if (state.ok) setToast({ kind: "ok", text: state.message || "Saved" });
    else setToast({ kind: "err", text: state.error });
    const id = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(id);
  }, [state]);

  return (
    <form action={formAction} className="admin-form">
      {children}
      <div className="admin-actions">
        <SubmitButton>{submitLabel}</SubmitButton>
      </div>
      {toast && (
        <div className={"admin-toast" + (toast.kind === "err" ? " error" : "")}>{toast.text}</div>
      )}
    </form>
  );
}
