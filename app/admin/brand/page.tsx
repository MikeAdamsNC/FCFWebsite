import { getSite } from "@/lib/content";
import { BrandEditor } from "./BrandEditor";

export const metadata = { title: "Brand & contact" };

export default function BrandPage() {
  const site = getSite();
  return (
    <BrandEditor
      initialBrand={site.brand}
      initialContact={site.contact}
      initialSocial={site.social}
      initialShopLinks={site.shopLinks}
    />
  );
}
