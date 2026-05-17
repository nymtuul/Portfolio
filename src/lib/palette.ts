export const palette = {
  wall: "#f3d2e2",
  accent: "#f3d2e2",
  denim: "#f4a8c2",
  navy: "#b87090",
  cream: "#fff8fb",
} as const;

export type Palette = typeof palette;

// Mixed-pastel ransom swatches so the cut-out letters feel like
// real magazine clippings instead of a single-color stack.
export function buildRansomPalette(p: Palette) {
  return {
    bgs: [
      p.accent,    // baby pink
      "#ffffff",   // white
      "#fff3b0",   // soft butter yellow
      p.navy,      // mauve (dark anchor)
      "#c7d8f0",   // soft periwinkle
      p.cream,     // cream
      "#d8c7e8",   // lavender
      "#c3e0c8",   // soft sage
      p.denim,     // hot pink
      "#ffe0a8",   // peach
    ],
    fgs: [
      p.navy,      // pink bg → mauve text
      p.navy,      // white bg → mauve text
      p.navy,      // yellow bg → mauve text
      p.cream,     // mauve bg → cream text
      "#2d3e5f",   // periwinkle bg → deep navy text
      p.navy,      // cream bg → mauve text
      "#4a3a5e",   // lavender bg → plum text
      "#2f4a35",   // sage bg → forest text
      p.cream,     // hot pink bg → cream text
      "#6b3a1a",   // peach bg → cocoa text
    ],
  };
}
