import { getSite } from "@/lib/content";

export function Announce() {
  const { announce } = getSite();
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
