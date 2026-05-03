import type { CSSProperties } from "react";

type Props = {
  src: string;
  pos?: string;
  ratio?: string;
  style?: CSSProperties;
};

export function Photo({ src, pos = "center", ratio, style }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: ratio,
        backgroundColor: "var(--bone)",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: pos,
        backgroundRepeat: "no-repeat",
        ...style,
      }}
      role="img"
    />
  );
}
