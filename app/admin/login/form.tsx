"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

export function LoginForm({ from }: { from?: string }) {
  const [state, formAction] = useActionState(loginAction, undefined);
  return (
    <form action={formAction} className="admin-form">
      {from && <input type="hidden" name="from" value={from} />}
      <div className="admin-field">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" autoComplete="username" required />
      </div>
      <div className="admin-field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <SubmitButton pendingLabel="Signing in…">Sign in</SubmitButton>
      {state && state.ok === false && <div className="err">{state.error}</div>}
    </form>
  );
}
