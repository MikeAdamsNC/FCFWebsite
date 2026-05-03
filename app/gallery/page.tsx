import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { RichText } from "@/components/RichText";
import { getSite } from "@/lib/content";

export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const { gallery, pages } = await getSite();
  const p = pages.gallery;
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> <Icon name="chev_r" size={12} /> <span>Gallery</span>
          </div>
          <RichText as="h1" html={p.title} />
          <p className="lede">{p.lede}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="gallery">
            {gallery.map((g, i) => (
              <div key={i} className={"g " + g.cls}>
                <Photo src={g.image} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
