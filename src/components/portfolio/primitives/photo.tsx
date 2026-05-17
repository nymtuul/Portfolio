"use client";

import { useState } from "react";
import { PhotoPlaceholder } from "./photo-placeholder";

type Props = {
  src: string;
  alt: string;
  /** Object-fit for the image. Default: cover. */
  fit?: "cover" | "contain";
  /** Placeholder shown if src fails to load. Mirrors PhotoPlaceholder props. */
  placeholderLabel?: string;
  placeholderStripe?: string;
  placeholderBg?: string;
};

export function Photo({
  src,
  alt,
  fit = "cover",
  placeholderLabel = "image",
  placeholderStripe,
  placeholderBg,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <PhotoPlaceholder
        label={placeholderLabel}
        stripe={placeholderStripe}
        bg={placeholderBg}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      draggable={false}
      style={{
        width: "100%",
        height: "100%",
        objectFit: fit,
        display: "block",
        userSelect: "none",
      }}
    />
  );
}
