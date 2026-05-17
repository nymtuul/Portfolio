import type { CSSProperties } from "react";

export function NewsHeadline({
  text = "GAZETTE",
  style,
}: {
  text?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: '"Playfair Display", "Times New Roman", serif',
        fontWeight: 900,
        fontSize: 22,
        letterSpacing: 1,
        color: "#1a2540",
        borderBottom: "2px solid #1a2540",
        borderTop: "4px double #1a2540",
        padding: "4px 0",
        textAlign: "center",
        textTransform: "uppercase",
        ...style,
      }}
    >
      {text}
    </div>
  );
}
