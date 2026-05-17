import type { CSSProperties } from "react";

type StarStickerProps = {
  size?: number;
  color?: string;
  rotate?: number;
  style?: CSSProperties;
};

export function StarSticker({
  size = 44,
  color = "#2d3e5f",
  rotate = 0,
  style,
}: StarStickerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      style={{
        transform: `rotate(${rotate}deg)`,
        filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.25))",
        ...style,
      }}
    >
      <path
        d="M22 4 L26 18 L40 22 L26 26 L22 40 L18 26 L4 22 L18 18 Z"
        fill={color}
      />
    </svg>
  );
}
