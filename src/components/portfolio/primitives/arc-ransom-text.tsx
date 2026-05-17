import type { CSSProperties } from "react";
import { type Palette } from "@/lib/palette";
import { RansomChar } from "./ransom-text";

type Props = {
  text: string;
  size?: number;
  radius?: number;
  arcDeg?: number;
  // Extra angular space added to every per-character step. Lets you widen the
  // spacing between letters without flattening the overall arc.
  letterGapDeg?: number;
  palette: Palette;
  style?: CSSProperties;
};

export function ArcRansomText({
  text,
  size = 44,
  radius = 200,
  arcDeg = 130,
  letterGapDeg = 0,
  palette,
  style,
}: Props) {
  const chars = text.split("");
  const n = chars.length;
  const baseStep = arcDeg / Math.max(1, n - 1);
  const stepDeg = baseStep + letterGapDeg;
  const totalSpreadDeg = stepDeg * (n - 1);
  const halfArcRad = ((totalSpreadDeg / 2) * Math.PI) / 180;

  // Container sized to fit the arc + a chip's worth of padding for the rotated chars.
  const pad = size * 1.4;
  const width = Math.ceil(2 * radius * Math.sin(halfArcRad) + pad * 2);
  // Bottom buffer is tight (0.5*pad) so the arc sits right above whatever
  // follows it in flow. Use marginBottom on the wrapper to overlap further.
  const height = Math.ceil(radius * (1 - Math.cos(halfArcRad)) + pad * 0.5);

  const pivotY = radius + pad / 2;

  return (
    <div style={{ position: "relative", width, height, ...style }}>
      {chars.map((c, i) => {
        const angleDeg = -totalSpreadDeg / 2 + i * stepDeg;
        const angleRad = (angleDeg * Math.PI) / 180;
        const cx = width / 2 + radius * Math.sin(angleRad);
        const cy = pivotY - radius * Math.cos(angleRad);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx,
              top: cy,
              transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
            }}
          >
            <RansomChar char={c} idx={i} size={size} palette={palette} />
          </div>
        );
      })}
    </div>
  );
}
