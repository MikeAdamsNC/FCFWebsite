import { Photo } from "./Photo";

export type TitleVariant =
  | "ought"
  | "honest"
  | "direct"
  | "pasture"
  | "cluck"
  | "ought_1l";

export type HeroVariant = "stack" | "full" | "triptych" | "polaroid";

export const TITLE_VARIANTS: Record<TitleVariant, { label: string; render: () => React.ReactNode }> = {
  ought: {
    label: "Food raised the way it ought",
    render: () => (
      <>
        Food raised
        <br />
        the way it <em>ought</em>
        <br />
        to be raised.
      </>
    ),
  },
  honest: {
    label: "Honest food, from a small family farm",
    render: () => (
      <>
        Honest food,
        <br />
        from a <em>small</em>
        <br />
        family farm.
      </>
    ),
  },
  direct: {
    label: "Real food, raised right",
    render: () => (
      <>
        Real food,
        <br />
        <em>raised</em> right,
        <br />
        sold direct.
      </>
    ),
  },
  pasture: {
    label: "Pasture raised. Farm direct.",
    render: () => (
      <>
        <em>Pasture</em> raised.
        <br />
        Farm direct.
        <br />
        Kenly, NC.
      </>
    ),
  },
  cluck: {
    label: "Give a cluck about what you eat",
    render: () => (
      <>
        Give a
        <br />
        <em>cluck</em> about
        <br />
        what you eat.
      </>
    ),
  },
  ought_1l: {
    label: "Food raised \u2014 2 lines",
    render: () => (
      <>
        Food raised the way
        <br />
        it <em>ought to be</em> raised.
      </>
    ),
  },
};

type HeroVisualProps = { variant: HeroVariant };

export function HeroVisual({ variant }: HeroVisualProps) {
  if (variant === "full") {
    return (
      <div className="hero-img-full">
        <Photo src="/assets/photos/chickens-flock.jpg" pos="center 45%" />
        <div className="caption">The flock, out on pasture</div>
      </div>
    );
  }
  if (variant === "triptych") {
    return (
      <div className="hero-triptych">
        <div>
          <Photo src="/assets/photos/chickens.jpg" pos="60% 40%" />
        </div>
        <div>
          <Photo src="/assets/photos/piglets.jpg" />
        </div>
        <div>
          <Photo src="/assets/photos/meat-compare.jpg" />
        </div>
      </div>
    );
  }
  if (variant === "polaroid") {
    return (
      <div className="hero-polaroid-stack">
        <div className="hero-polaroid hero-polaroid-1">
          <div className="ph-inner">
            <Photo src="/assets/photos/chickens.jpg" pos="60% 40%" />
          </div>
          <div className="cap">the flock</div>
        </div>
        <div className="hero-polaroid hero-polaroid-2">
          <div className="ph-inner">
            <Photo src="/assets/photos/piglets.jpg" />
          </div>
          <div className="cap">piglets, spring &rsquo;26</div>
        </div>
        <div className="hero-polaroid hero-polaroid-3">
          <div className="ph-inner">
            <Photo src="/assets/photos/meat-compare.jpg" />
          </div>
          <div className="cap">today&rsquo;s eggs</div>
        </div>
      </div>
    );
  }
  return (
    <div className="hero-img-stack">
      <div className="hero-badge">
        Farm
        <br />
        Direct
        <br />
        &nbsp;&middot; since 2010 &middot;
      </div>
      <div className="hero-img hero-img-main">
        <Photo src="/assets/photos/chickens.jpg" pos="60% 40%" />
      </div>
      <div className="hero-img hero-img-sm">
        <Photo src="/assets/photos/piglets.jpg" />
      </div>
    </div>
  );
}
