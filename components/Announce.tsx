import { getSite } from "@/lib/content";

export async function Announce() {
  const { announce } = await getSite();
  return (
    <div className="announce">
      <div className="inner">
        <span className="marquee">{announce.message}</span>
        <a href={announce.link} target="_blank" rel="noopener">
          {announce.linkLabel}
        </a>
      </div>
    </div>
  );
}
