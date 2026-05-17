"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

type Props = {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
};

const DEFAULT_STYLE: CSSProperties = {
  height: "min(70vh, 720px)",
  width: "auto",
  filter: "drop-shadow(0 24px 32px rgba(0,0,0,0.35))",
  animation: "bob 4s ease-in-out infinite alternate",
};

export function FloatingSticker({
  src,
  fallbackSrc,
  alt,
  className = "pointer-events-auto select-none",
  style,
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    // Plain <img> on purpose: the source can swap at runtime (placeholder ↔ real PNG)
    // and `drop-shadow` applies cleanly to the alpha channel without next/image's wrapper.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
      draggable={false}
      className={className}
      style={{ ...DEFAULT_STYLE, ...style }}
    />
  );
}
