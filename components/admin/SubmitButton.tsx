"use client";

import { useFormStatus } from "react-dom";

type Props = { children?: React.ReactNode; pendingLabel?: string; className?: string };

export function SubmitButton({ children = "Save", pendingLabel = "Saving…", className = "admin-btn primary" }: Props) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}
