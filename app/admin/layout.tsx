import Link from "next/link";
import { AdminHeader } from "./AdminHeader";

export const metadata = { title: "Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <AdminHeader />
      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px" }}>{children}</main>
    </div>
  );
}
