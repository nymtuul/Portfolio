import type { CSSProperties } from "react";

type DoodleArrowProps = {
  width?: number;
  height?: number;
  rotate?: number;
  style?: CSSProperties;
  color?: string;
};

export function DoodleArrow({
  width = 80,
  height = 60,
  rotate = 0,
  style,
  color = "#2d3e5f",
}: DoodleArrowProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 60"
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      <path
        d="M 5 15 Q 25 5, 50 25 T 70 50"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 60 42 L 70 50 L 62 58"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
