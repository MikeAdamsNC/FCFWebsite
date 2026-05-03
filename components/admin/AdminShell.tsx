"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";

const SECTIONS: [string, [string, string][]][] = [
  ["Site", [
    ["/admin", "Dashboard"],
    ["/admin/general", "General"],
    ["/admin/announce", "Announce bar"],
    ["/admin/hours", "Hours"],
  ]],
  ["Home page", [
    ["/admin/hero", "Hero"],
    ["/admin/home-story", "Story / quote / CTA"],
  ]],
  ["Lists", [
    ["/admin/products", "Products"],
    ["/admin/animals", "Animals"],
    ["/admin/classes", "Classes"],
    ["/admin/gallery", "Gallery"],
    ["/admin/stock", "Stock status"],
  ]],
  ["Other pages", [
    ["/admin/page/about", "About page"],
    ["/admin/page/animals", "Animals page"],
    ["/admin/page/classes", "Classes page"],
    ["/admin/page/farm-store", "Farm Store page"],
    ["/admin/page/gallery", "Gallery page"],
    ["/admin/page/contact", "Contact page"],
  ]],
];

type Props = {
  brand: { name: string; logoUrl: string };
  children: React.ReactNode;
};

export function AdminShell({ brand, children }: Props) {
  const pathname = usePathname() || "/admin";
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="admin-body">
      <aside className="admin-sidebar">
        <div className="brand">
          <img src={brand.logoUrl} alt="" />
          <span>Admin</span>
        </div>
        {SECTIONS.map(([heading, links]) => (
          <div key={heading}>
            <h4>{heading}</h4>
            {links.map(([href, label]) => (
              <Link key={href} href={href} className={isActive(href) ? "active" : ""}>
                {label}
              </Link>
            ))}
          </div>
        ))}
        <form action={logoutAction}>
          <button className="logout" type="submit">
            Sign out
          </button>
        </form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
