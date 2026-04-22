import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { commitFile, toBase64 } from "@/lib/github";
import siteData from "@/content/site.json";

export const runtime = "edge";

const CONTENT_PATH = "content/site.json";

export async function POST(req: Request) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return NextResponse.json({ error: "Not configured." }, { status: 500 });
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token, secret))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { section?: string; data?: unknown; full?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  let next: Record<string, unknown>;
  let message: string;

  if (body.full && typeof body.full === "object") {
    next = body.full as Record<string, unknown>;
    message = "admin: update site content";
  } else if (typeof body.section === "string" && body.data !== undefined) {
    const allowed = new Set([
      "brand",
      "contact",
      "social",
      "shopLinks",
      "hours",
      "announce",
      "map",
      "hero",
      "homeStory",
      "homeQuote",
      "homeCta",
      "products",
      "animals",
      "classes",
      "stock",
      "gallery",
      "pages",
    ]);
    if (!allowed.has(body.section)) {
      return NextResponse.json({ error: "Unknown section." }, { status: 400 });
    }
    next = { ...(siteData as Record<string, unknown>), [body.section]: body.data };
    message = `admin: update ${body.section}`;
  } else {
    return NextResponse.json({ error: "Missing section + data." }, { status: 400 });
  }

  const serialized = JSON.stringify(next, null, 2) + "\n";
  try {
    await commitFile({
      path: CONTENT_PATH,
      contentBase64: toBase64(serialized),
      message,
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: detail }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
