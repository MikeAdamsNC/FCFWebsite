import type { CSSProperties, ElementType } from "react";

type Props = {
  html: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

export function RichText({ html, as: Tag = "span", className, style }: Props) {
  return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}
