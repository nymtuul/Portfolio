import type { CSSProperties } from "react";

export const textures = {
  gingham: (color = "#a8b8d8"): CSSProperties => ({
    backgroundColor: "#f4ead8",
    backgroundImage: `
      linear-gradient(${color}66 50%, transparent 50%),
      linear-gradient(90deg, ${color}66 50%, transparent 50%)
    `,
    backgroundSize: "32px 32px, 32px 32px",
  }),

  grid: (color = "#7a9ac8", size = 22): CSSProperties => ({
    backgroundColor: "#faf3e0",
    backgroundImage: `
      linear-gradient(${color}55 1px, transparent 1px),
      linear-gradient(90deg, ${color}55 1px, transparent 1px)
    `,
    backgroundSize: `${size}px ${size}px`,
  }),

  lined: (color = "#a8b8d8"): CSSProperties => ({
    backgroundColor: "#faf3e0",
    backgroundImage: `repeating-linear-gradient(
      transparent, transparent 27px,
      ${color}66 27px, ${color}66 28px
    )`,
  }),

  paper: {
    backgroundColor: "#f4ead8",
    backgroundImage: `
      radial-gradient(circle at 20% 30%, #00000008 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, #00000008 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, #ffffff20 0%, transparent 60%)
    `,
  } satisfies CSSProperties,

  wall: (hue = 215, chroma = 0.06, lightness = 0.55): CSSProperties => ({
    backgroundColor: `oklch(${lightness} ${chroma} ${hue})`,
    backgroundImage: `
      radial-gradient(circle at 15% 25%, oklch(${lightness + 0.07} ${chroma + 0.01} ${hue}) 0%, transparent 25%),
      radial-gradient(circle at 75% 65%, oklch(${lightness - 0.07} ${chroma} ${hue}) 0%, transparent 30%),
      radial-gradient(circle at 40% 80%, oklch(${lightness + 0.03} ${chroma + 0.01} ${hue}) 0%, transparent 25%),
      radial-gradient(circle at 90% 15%, oklch(${lightness - 0.03} ${chroma} ${hue}) 0%, transparent 25%)
    `,
  }),
};
