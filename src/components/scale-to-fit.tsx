"use client";

import {
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

type Props = {
  /** Natural design width in px. Below this viewport width, content scales down to fit. */
  designWidth: number;
  /** Optional class on the wrapper. */
  className?: string;
  /** Optional inline style on the wrapper. */
  style?: CSSProperties;
  children: ReactNode;
};

const subscribeViewport = (cb: () => void) => {
  window.addEventListener("resize", cb);
  window.addEventListener("orientationchange", cb);
  return () => {
    window.removeEventListener("resize", cb);
    window.removeEventListener("orientationchange", cb);
  };
};

const getViewportWidth = () => document.documentElement.clientWidth;
const getServerViewportWidth = () => null;

/**
 * Wraps a fixed-width design and shrinks it to fit narrow viewports.
 *
 * Uses CSS `zoom` so the wrapper's layout box also shrinks — variable-height
 * content reserves the right vertical space without needing to measure.
 * Above `designWidth` the wrapper is left at native size and stretched 100%.
 */
export function ScaleToFit({ designWidth, className, style, children }: Props) {
  const viewportWidth = useSyncExternalStore(
    subscribeViewport,
    getViewportWidth,
    getServerViewportWidth,
  );

  // SSR / first paint: render at full width. Body's overflow-x:hidden clips
  // any horizontal overflow for the brief moment before hydration.
  const zoom =
    viewportWidth === null ? 1 : Math.min(1, viewportWidth / designWidth);

  const wrapperStyle: CSSProperties =
    zoom < 1
      ? { width: designWidth, zoom, ...style }
      : { width: "100%", ...style };

  return (
    <div className={className} style={wrapperStyle}>
      {children}
    </div>
  );
}
