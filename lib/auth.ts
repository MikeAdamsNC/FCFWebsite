import "server-only";
import { cookies } from "next/headers";
import { getIronSession, type IronSession, type SessionOptions } from "iron-session";
import bcrypt from "bcryptjs";

type SessionData = { username?: string };

function options(): SessionOptions {
  const password = process.env.SESSION_SECRET;
  if (!password) throw new Error("SESSION_SECRET not set");
  return {
    password,
    cookieName: "fcf_admin",
    cookieOptions: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    },
  };
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const store = await cookies();
  return getIronSession<SessionData>(store, options());
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session.username);
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const adminUser = process.env.ADMIN_USERNAME;
  const adminHash = process.env.ADMIN_PASS_HASH;
  if (!adminUser || !adminHash) return false;
  if (username !== adminUser) return false;
  return bcrypt.compare(password, adminHash);
}
