"use client";

import {
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

/** Phone layouts are drawn on a 390px-wide board, then zoomed to the real width. */
export const MOBILE_DESIGN_WIDTH = 390;

const subscribe = (cb: () => void) => {
  window.addEventListener("resize", cb);
  window.addEventListener("orientationchange", cb);
  return () => {
    window.removeEventListener("resize", cb);
    window.removeEventListener("orientationchange", cb);
  };
};
const getWidth = () => document.documentElement.clientWidth;
const getServerWidth = () => MOBILE_DESIGN_WIDTH;

/**
 * Wrapper for phone-only layouts. Uses CSS `zoom` (which also shrinks the
 * layout box) so a 390px design fills any phone from ~320px to ~767px.
 */
export function MobileFrame({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  const vw = useSyncExternalStore(subscribe, getWidth, getServerWidth);
  // Cap growth so large phones / small tablets don't look cartoonishly big.
  const zoom = Math.min(Math.max(vw / MOBILE_DESIGN_WIDTH, 0.75), 1.35);
  const extra = vw / zoom - MOBILE_DESIGN_WIDTH; // leftover width at this zoom

  return (
    <div
      style={{
        width: MOBILE_DESIGN_WIDTH + Math.max(0, extra),
        zoom,
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          width: MOBILE_DESIGN_WIDTH,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}
