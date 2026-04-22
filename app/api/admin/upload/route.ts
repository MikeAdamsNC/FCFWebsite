import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { commitFile, toBase64, slugify } from "@/lib/github";

export const runtime = "edge";

const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(req: Request) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return NextResponse.json({ error: "Not configured." }, { status: 500 });
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token, secret))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Expected multipart form." }, { status: 400 });

  const file = form.get("file");
  const slugRaw = typeof form.get("slug") === "string" ? String(form.get("slug")) : "";
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Unsupported file type. Use JPEG, PNG, or WebP." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (6 MB max)." }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const base = slugify(slugRaw || file.name.replace(/\.[^.]+$/, "") || "upload");
  const stamp = Date.now();
  const name = `${base}-${stamp}.${ext}`;
  const path = `public/uploads/${name}`;

  try {
    await commitFile({
      path,
      contentBase64: toBase64(bytes),
      message: `admin: upload ${name}`,
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: detail }, { status: 500 });
  }

  return NextResponse.json({ ok: true, path: `/uploads/${name}` });
}
