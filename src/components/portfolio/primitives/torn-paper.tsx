import type { CSSProperties, ReactNode } from "react";
import { useId } from "react";
import { tornPath, type Side } from "@/lib/torn-path";

type TornPaperProps = {
  width?: number;
  height?: number;
  children?: ReactNode;
  background?: CSSProperties;
  sides?: Side[];
  roughness?: number;
  rotate?: number;
  shadow?: boolean;
  className?: string;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  hoverable?: boolean;
  zIndex?: number;
};

export function TornPaper({
  width = 300,
  height = 200,
  children,
  background,
  sides = ["top", "right", "bottom", "left"],
  roughness = 6,
  rotate = 0,
  shadow = true,
  className = "",
  style,
  innerStyle,
  hoverable = true,
  zIndex = 1,
}: TornPaperProps) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const path = tornPath(width, height, sides, roughness);
  const pad = roughness + 4;

  return (
    <div
      className={`collage-piece ${hoverable ? "collage-hoverable" : ""} ${className}`}
      style={
        {
          position: "absolute",
          width: width + pad * 2,
          height: height + pad * 2,
          transformOrigin: "center",
          zIndex,
          cursor: hoverable ? "pointer" : "default",
          "--collage-rot": `${rotate}deg`,
          transform: `rotate(var(--collage-rot))`,
          ...style,
        } as CSSProperties
      }
    >
      <svg
        width={width + pad * 2}
        height={height + pad * 2}
        viewBox={`${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}`}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <defs>
          <clipPath id={`clip-${id}`}>
            <path d={path} />
          </clipPath>
        </defs>
        {shadow && (
          <path
            d={path}
            fill="rgba(0,0,0,0.18)"
            transform="translate(3, 5)"
            style={{ filter: "blur(3px)" }}
          />
        )}
        <foreignObject
          x="0"
          y="0"
          width={width}
          height={height}
          clipPath={`url(#clip-${id})`}
        >
          {/* xmlns attr required for HTML inside SVG foreignObject across browsers; not in React's DOM types */}
          <div
            {...({ xmlns: "http://www.w3.org/1999/xhtml" } as { xmlns: string })}
            style={{
              width: "100%",
              height: "100%",
              ...background,
              ...innerStyle,
            }}
          >
            {children}
          </div>
        </foreignObject>
        <path
          d={path}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
