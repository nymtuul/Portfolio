"use client";

import { useEffect, useRef } from "react";
import { palette } from "@/lib/palette";

const MIN_DROP_INTERVAL_MS = 16;     // ~one drop per frame at 60Hz
const MIN_SEGMENT_DISTANCE_PX = 6;   // smaller = follows slow moves more closely
const MAX_SEGMENT_DISTANCE_PX = 80;  // cap: long jumps get split into chunks instead of one giant tape
const TAPE_HEIGHT_PX = 14;
const TAPE_LIFETIME_MS = 700;
const REMOVE_BUFFER_MS = 100;

const patterns: { background: string }[] = [
  {
    background: `repeating-linear-gradient(45deg, ${palette.accent}, ${palette.accent} 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)`,
  },
  { background: palette.cream },
  { background: palette.accent },
];

export function CursorTapeTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip on touch-only devices: there's no cursor and pointermove from touch
    // generates jittery, useless tape segments.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let lastDropAt = 0;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let patternIdx = 0;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const removeSegment = (segment: HTMLDivElement, timer: ReturnType<typeof setTimeout>) => {
      timers.delete(timer);
      clearTimeout(timer);
      segment.remove();
    };

    const dropSegment = (fromX: number, fromY: number, toX: number, toY: number) => {
      const dx = toX - fromX;
      const dy = toY - fromY;
      const distance = Math.hypot(dx, dy);
      if (distance < 1) return;

      const rotationDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
      const pattern = patterns[patternIdx % patterns.length];
      patternIdx += 1;

      const segment = document.createElement("div");
      segment.style.position = "absolute";
      segment.style.left = `${fromX}px`;
      segment.style.top = `${fromY}px`;
      segment.style.width = `${distance}px`;
      segment.style.height = `${TAPE_HEIGHT_PX}px`;
      segment.style.transform = `rotate(${rotationDeg}deg) translateY(-50%)`;
      segment.style.transformOrigin = "0 50%";
      segment.style.background = pattern.background;
      segment.style.boxShadow = "0 2px 6px rgba(0,0,0,0.18)";
      segment.style.clipPath = "polygon(2% 8%, 98% 0%, 100% 92%, 1% 100%)";
      segment.style.opacity = "0.85";
      segment.style.pointerEvents = "none";
      segment.style.willChange = "opacity";
      segment.style.transition = `opacity ${TAPE_LIFETIME_MS}ms ease-out`;

      container.appendChild(segment);

      requestAnimationFrame(() => {
        segment.style.opacity = "0";
      });

      const timer = setTimeout(
        () => removeSegment(segment, timer),
        TAPE_LIFETIME_MS + REMOVE_BUFFER_MS,
      );
      timers.add(timer);
    };

    const handleMove = (e: PointerEvent | MouseEvent) => {
      const now = performance.now();
      if (now - lastDropAt < MIN_DROP_INTERVAL_MS) return;

      const x = e.clientX;
      const y = e.clientY;

      if (lastX === null || lastY === null) {
        lastX = x;
        lastY = y;
        lastDropAt = now;
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.hypot(dx, dy);
      if (distance < MIN_SEGMENT_DISTANCE_PX) return;

      // Long jump: split into evenly-spaced chunks so the trail follows the
      // actual cursor path instead of drawing one huge straight tape.
      if (distance > MAX_SEGMENT_DISTANCE_PX) {
        const steps = Math.ceil(distance / MAX_SEGMENT_DISTANCE_PX);
        for (let i = 1; i <= steps; i++) {
          const t0 = (i - 1) / steps;
          const t1 = i / steps;
          dropSegment(
            lastX + dx * t0,
            lastY + dy * t0,
            lastX + dx * t1,
            lastY + dy * t1,
          );
        }
      } else {
        dropSegment(lastX, lastY, x, y);
      }

      lastX = x;
      lastY = y;
      lastDropAt = now;
    };

    // Reset the anchor when the cursor leaves the window or the tab unfocuses,
    // otherwise re-entry draws a long straight tape from the old position.
    const resetAnchor = () => {
      lastX = null;
      lastY = null;
    };

    // pointermove subsumes mousemove + supports pen/touch consistently.
    window.addEventListener("pointermove", handleMove);
    document.addEventListener("mouseleave", resetAnchor);
    window.addEventListener("blur", resetAnchor);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) resetAnchor();
    });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", resetAnchor);
      window.removeEventListener("blur", resetAnchor);
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
      container.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 60 }}
    />
  );
}
