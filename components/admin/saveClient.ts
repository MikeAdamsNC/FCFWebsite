export async function saveSection(section: string, data: unknown): Promise<void> {
  const res = await fetch("/api/admin/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section, data }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || `Save failed (${res.status}).`);
  }
}

export async function uploadImage(file: File, slug?: string): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  if (slug) fd.append("slug", slug);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || `Upload failed (${res.status}).`);
  }
  const body = (await res.json()) as { path: string };
  return body.path;
}
