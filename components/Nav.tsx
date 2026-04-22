"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { withBase } from "@/lib/base";
import type { SiteContent } from "@/lib/content";

const LINKS: [string, string][] = [
  ["/", "Home"],
  ["/animals", "Animals"],
  ["/classes", "Classes"],
  ["/farm-store", "Farm Store"],
  ["/about", "About"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
];

type Props = {
  brand: SiteContent["brand"];
  contact: SiteContent["contact"];
  shopHref: string;
};

export function Nav({ brand, contact, shopHref }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="nav">
      <div className="nav-row">
        <div className="nav-links">
          {LINKS.slice(0, 3).map(([href, label]) => (
            <Link key={href} href={href} className={isActive(href) ? "active" : ""}>
              {label}
            </Link>
          ))}
        </div>
        <Link href="/" className="brand">
          <img src={withBase(brand.logoUrl)} alt={brand.name} className="brand-logo" />
          <span className="brand-name">{brand.name}</span>
        </Link>
        <div className="nav-cta">
          {LINKS.slice(3).map(([href, label]) => (
            <Link
              key={href}
              href={href}
              style={{ fontSize: 13.5, fontWeight: 500, marginRight: 18 }}
              className={isActive(href) ? "active" : ""}
            >
              {label}
            </Link>
          ))}
          <a
            href={shopHref}
            target="_blank"
            rel="noopener"
            className="btn btn-primary btn-sm shop-btn-desktop"
          >
            Shop
          </a>
          <button className="nav-burger" onClick={() => setOpen(true)} aria-label="Open menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu-head">
            <Link href="/" className="brand" onClick={() => setOpen(false)}>
              <img src={withBase(brand.logoUrl)} alt="" className="brand-logo" />
              <span className="brand-name">{brand.name}</span>
            </Link>
            <button className="nav-close" onClick={() => setOpen(false)} aria-label="Close">
              <Icon name="x" size={22} />
            </button>
          </div>
          <div className="mobile-menu-links">
            {LINKS.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={isActive(href) ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {label}
                <Icon name="chev_r" size={16} />
              </Link>
            ))}
          </div>
          <div className="mobile-menu-foot">
            <a href={shopHref} target="_blank" rel="noopener" className="btn btn-primary">
              Shop Online <Icon name="arrow" size={15} />
            </a>
            <div style={{ marginTop: 20, fontSize: 13, color: "var(--umber-soft)", lineHeight: 1.7 }}>
              {contact.address.street}, {contact.address.city} {contact.address.state}
              <br />
              <a href={contact.phoneHref} style={{ color: "var(--umber)", textDecoration: "underline" }}>
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
