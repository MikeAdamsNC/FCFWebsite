import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { uploadImage } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return new NextResponse("Missing file", { status: 400 });
  }
  if (file.size > 12 * 1024 * 1024) {
    return new NextResponse("File too large (12 MB max)", { status: 413 });
  }
  if (!file.type.startsWith("image/")) {
    return new NextResponse("Only image uploads are allowed", { status: 415 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadImage(buffer, file.name || "image", file.type);
  return NextResponse.json(result);
}
