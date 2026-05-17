type BookSpineProps = {
  title?: string;
  color?: string;
  height?: number;
  width?: number;
  rotate?: number;
  top?: number;
  left?: number;
  zIndex?: number;
};

export function BookSpine({
  title = "POETRY",
  color = "#5a7aa8",
  height = 180,
  width = 38,
  rotate = 0,
  top = 0,
  left = 0,
  zIndex = 1,
}: BookSpineProps) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        height,
        background: `linear-gradient(90deg, ${color}cc 0%, ${color} 30%, ${color} 70%, ${color}aa 100%)`,
        borderTop: `3px solid ${color}`,
        borderBottom: `3px solid ${color}88`,
        borderRadius: "2px 2px 0 0",
        transform: `rotate(${rotate}deg)`,
        transformOrigin: "bottom left",
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,0.15), 2px 4px 8px rgba(0,0,0,0.25)",
        zIndex,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: 2,
          color: "#f4ead8",
          textTransform: "uppercase",
          textShadow: "0 1px 0 rgba(0,0,0,0.4)",
        }}
      >
        {title}
      </span>
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          height: 2,
          background: "#c9a961",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: 0,
          right: 0,
          height: 2,
          background: "#c9a961",
        }}
      />
    </div>
  );
}
