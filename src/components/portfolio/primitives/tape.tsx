type TapePattern = "plain" | "striped" | "dotted";

type TapeProps = {
  width?: number;
  height?: number;
  rotate?: number;
  top?: number;
  left?: number;
  color?: string;
  pattern?: TapePattern;
  zIndex?: number;
};

export function Tape({
  width = 110,
  height = 28,
  rotate = -8,
  top = 0,
  left = 0,
  color = "rgba(168, 184, 216, 0.75)",
  pattern = "plain",
  zIndex = 10,
}: TapeProps) {
  let bg: string = color;
  if (pattern === "striped") {
    bg = `repeating-linear-gradient(45deg, ${color}, ${color} 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)`;
  } else if (pattern === "dotted") {
    bg = `radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 2px) 0 0/8px 8px, ${color}`;
  }
  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        top,
        left,
        background: bg,
        backgroundColor: color,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
        clipPath: "polygon(2% 8%, 98% 0%, 100% 92%, 1% 100%)",
        zIndex,
        pointerEvents: "none",
      }}
    />
  );
}
