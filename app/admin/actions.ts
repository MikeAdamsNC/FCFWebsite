"use server";

import { redirect } from "next/navigation";
import { getSession, verifyCredentials } from "@/lib/auth";

type Result = { ok: true; message?: string } | { ok: false; error: string };

export async function loginAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const username = String(form.get("username") || "");
  const password = String(form.get("password") || "");
  const ok = await verifyCredentials(username, password);
  if (!ok) return { ok: false, error: "Invalid username or password" };
  const session = await getSession();
  session.username = username;
  await session.save();
  const from = String(form.get("from") || "/admin");
  redirect(from.startsWith("/admin") && from !== "/admin/login" ? from : "/admin");
}

export async function logoutAction(): Promise<void> {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}
