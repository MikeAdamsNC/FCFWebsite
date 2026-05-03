import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RichText } from "@/components/RichText";
import { ClassesCalendar } from "@/components/ClassesCalendar";
import { getSite, type ClassEvent } from "@/lib/content";

export const metadata = { title: "Classes" };

export default async function ClassesPage() {
  const { classes, pages } = await getSite();
  const p = pages.classes;
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> <Icon name="chev_r" size={12} /> <span>Classes</span>
          </div>
          <RichText as="h1" html={p.title} />
          <p className="lede">{p.lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ClassesCalendar classes={classes as ClassEvent[]} />
        </div>
      </section>
    </>
  );
}
