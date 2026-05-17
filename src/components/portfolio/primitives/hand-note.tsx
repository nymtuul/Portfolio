import type { CSSProperties, ReactNode } from "react";

type HandNoteProps = {
  children?: ReactNode;
  style?: CSSProperties;
  color?: string;
  size?: number;
  rotate?: number;
};

export function HandNote({
  children,
  style,
  color = "#2d3e5f",
  size = 18,
  rotate = 0,
}: HandNoteProps) {
  return (
    <div
      style={{
        fontFamily: '"Caveat", "Kalam", cursive',
        fontSize: size,
        color,
        transform: `rotate(${rotate}deg)`,
        lineHeight: 1.2,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
