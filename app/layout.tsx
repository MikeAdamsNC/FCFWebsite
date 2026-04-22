import type { Metadata } from "next";
import "@/styles/globals.css";
import { Announce } from "@/components/Announce";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: "Fuster Cluck Farm",
    template: "%s \u00b7 Fuster Cluck Farm",
  },
  description:
    "A small family farm in Kenly, NC, raising pasture chicken, pork, and lamb \u2014 sold direct to families who care where their food comes from.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { brand, contact, shopLinks } = getSite();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Public+Sans:wght@300;400;500;600;700&family=Caveat:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Announce />
        <Nav brand={brand} contact={contact} shopHref={shopLinks.barn2door} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
