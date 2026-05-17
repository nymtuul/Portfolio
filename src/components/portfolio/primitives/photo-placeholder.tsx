import type { CSSProperties } from "react";

type PhotoPlaceholderProps = {
  label?: string;
  stripe?: string;
  bg?: string;
  style?: CSSProperties;
};

export function PhotoPlaceholder({
  label = "image",
  stripe = "#a8b8d8",
  bg = "#e8e0cc",
  style,
}: PhotoPlaceholderProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `repeating-linear-gradient(135deg, ${stripe}33, ${stripe}33 6px, ${bg} 6px, ${bg} 16px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        color: "#2d3e5f",
        letterSpacing: 1,
        textTransform: "uppercase",
        ...style,
      }}
    >
      <span
        style={{
          background: "#f4ead8",
          padding: "4px 8px",
          border: "1px dashed #2d3e5f55",
        }}
      >
        {label}
      </span>
    </div>
  );
}
