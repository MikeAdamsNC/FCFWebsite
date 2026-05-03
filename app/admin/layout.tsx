import "@/styles/admin.css";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getSite } from "@/lib/content";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) {
    return <>{children}</>;
  }
  const { brand } = await getSite();
  return <AdminShell brand={brand}>{children}</AdminShell>;
}
