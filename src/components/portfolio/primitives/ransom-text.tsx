import type { CSSProperties } from "react";
import { buildRansomPalette, type Palette } from "@/lib/palette";

const ransomFonts = [
  { family: '"Playfair Display", serif', weight: 900, style: "normal" as const },
  { family: '"DM Serif Display", serif', weight: 400, style: "normal" as const },
  { family: '"Bebas Neue", sans-serif', weight: 400, style: "normal" as const },
  { family: '"Courier Prime", monospace', weight: 700, style: "normal" as const },
  { family: '"Anton", sans-serif', weight: 400, style: "normal" as const },
  { family: '"Abril Fatface", serif', weight: 400, style: "normal" as const },
  { family: '"Oswald", sans-serif', weight: 700, style: "normal" as const },
  { family: '"Playfair Display", serif', weight: 700, style: "italic" as const },
];

export function RansomChar({
  char,
  idx,
  size,
  palette,
}: {
  char: string;
  idx: number;
  size: number;
  palette: Palette;
}) {
  const { bgs, fgs } = buildRansomPalette(palette);
  const seed = char.charCodeAt(0) + idx * 7;
  const fontIdx = seed % ransomFonts.length;
  const bgIdx = (seed * 3) % bgs.length;
  const f = ransomFonts[fontIdx];
  const bg = bgs[bgIdx];
  const fg = fgs[bgIdx];
  const rotate = ((seed * 13) % 17) - 8;
  const padX = 0.18;
  const padY = 0.06;

  if (char === " ") {
    return (
      <span style={{ display: "inline-block", width: size * 0.35 }}>&nbsp;</span>
    );
  }

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: f.family,
        fontWeight: f.weight,
        fontStyle: f.style,
        fontSize: size,
        lineHeight: 1,
        color: fg,
        background: bg,
        padding: `${size * padY}px ${size * padX}px`,
        margin: "0 1px",
        transform: `rotate(${rotate}deg)`,
        boxShadow:
          "0 2px 5px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(0,0,0,0.04)",
        clipPath: `polygon(${1 + (seed % 4)}% ${2 + (seed % 5)}%, ${
          97 - (seed % 4)
        }% 0%, 100% ${95 - (seed % 5)}%, ${2 + (seed % 4)}% 100%)`,
        position: "relative",
        verticalAlign: "middle",
      }}
    >
      {char}
    </span>
  );
}

export function RansomText({
  text,
  size = 56,
  style,
  palette,
}: {
  text: string;
  size?: number;
  style?: CSSProperties;
  palette: Palette;
}) {
  return (
    <span style={{ display: "inline-block", lineHeight: 1.4, ...style }}>
      {text.split("").map((c, i) => (
        <RansomChar key={i} char={c} idx={i} size={size} palette={palette} />
      ))}
    </span>
  );
}
