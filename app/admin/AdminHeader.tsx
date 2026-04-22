"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const onLogin = pathname === "/admin/login";

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div
      style={{
        background: "var(--paper)",
        borderBottom: "1px solid var(--rule)",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        href="/admin"
        style={{ fontFamily: "var(--serif)", fontSize: 20, fontStyle: "italic" }}
      >
        Fuster Cluck <span style={{ color: "var(--clay)" }}>admin</span>
      </Link>
      <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 14 }}>
        <Link href="/" style={{ color: "var(--umber-soft)" }}>
          View site &rarr;
        </Link>
        {!onLogin && (
          <button className="btn btn-outline btn-sm" onClick={logout}>
            Sign out
          </button>
        )}
      </div>
    </div>
  );
}
