export type Side = "top" | "right" | "bottom" | "left";

export function tornPath(
  w: number,
  h: number,
  sides: Side[] = ["top", "right", "bottom", "left"],
  roughness = 8,
): string {
  const seedRand = (i: number) => {
    const x = Math.sin(i * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };
  const points: [number, number][] = [];
  const step = 14;
  let i = 0;

  if (sides.includes("top")) {
    for (let x = 0; x <= w; x += step) {
      const jitter = (seedRand(i++) - 0.5) * roughness * 2;
      points.push([x, jitter]);
    }
  } else {
    points.push([0, 0]);
    points.push([w, 0]);
  }

  if (sides.includes("right")) {
    for (let y = step; y <= h; y += step) {
      const jitter = (seedRand(i++) - 0.5) * roughness * 2;
      points.push([w + jitter, y]);
    }
  } else {
    points.push([w, h]);
  }

  if (sides.includes("bottom")) {
    for (let x = w - step; x >= 0; x -= step) {
      const jitter = (seedRand(i++) - 0.5) * roughness * 2;
      points.push([x, h + jitter]);
    }
  } else {
    points.push([0, h]);
  }

  if (sides.includes("left")) {
    for (let y = h - step; y >= step; y -= step) {
      const jitter = (seedRand(i++) - 0.5) * roughness * 2;
      points.push([jitter, y]);
    }
  }

  return "M " + points.map((p) => p.join(",")).join(" L ") + " Z";
}
