import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";

type SessionData = { username?: string };

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const password = process.env.SESSION_SECRET;
  if (!password) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, {
    password,
    cookieName: "fcf_admin",
  });

  if (!session.username) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
