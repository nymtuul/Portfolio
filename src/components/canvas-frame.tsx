"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Frames the fixed 1440×1024 landing collage and scales it to fit the
 * viewport. Scale is computed in JS so it works in every browser.
 */
export function CanvasFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = document.documentElement.clientWidth;
      const h = window.innerHeight;
      const s = Math.min((w - 32) / 1440, (h - 32) / 1024, 1);
      el.style.setProperty("--canvas-scale", String(Math.max(s, 0.1)));
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return (
    <div ref={ref} className="canvas-frame">
      {children}
    </div>
  );
}
