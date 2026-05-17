"use client";

import { useState, useCallback, useId } from "react";
import type { CSSProperties } from "react";
import { palette } from "@/lib/palette";
import { RansomText } from "./primitives/ransom-text";

const { accent, denim, navy, wall } = palette;

const diaryEntries = [
  {
    date: "apr · 22 · 2026",
    weekday: "wednesday",
    mood: "☕",
    weather: "🌤",
    title: "a quiet morning",
    body: `slept in until eight which is late for me.\nmade coffee, burnt the toast, decided\nthat was a sign to go outside instead.\n\nwalked to the river. the light was doing\nthat thing where everything looks soft\nand a little gold. i forget how much\ni like april.\n\nstarted a new sketchbook. didn't\nknow what to draw so i drew the\ncoffee cup again. always the cup.`,
    photoLabel: "morning · 7:42am",
    doodles: ["cup", "sun"] as const,
  },
  {
    date: "apr · 28 · 2026",
    weekday: "tuesday",
    mood: "✨",
    weather: "☀",
    title: "studio day",
    body: `cleaned the desk, finally. found three\npens i thought i lost and a receipt\nfrom february (kept it).\n\nworked on the zine layout for hours.\nit's not where i want it yet but it's\ncloser. i think the cover wants to\nbe blue. or pink. or both.\n\nate dinner standing at the counter\nlike a feral creature. it was great.`,
    photoLabel: "desk after",
    doodles: ["pen", "star"] as const,
  },
  {
    date: "may · 03 · 2026",
    weekday: "sunday",
    mood: "🌷",
    weather: "🌧",
    title: "rain & reading",
    body: `it rained all day. didn't fight it.\nmade a pot of tea, put on the\nslowest record i own, read.\n\nfinished the book i've been carrying\naround for weeks. cried a little at\nthe end which was embarrassing\nbut nobody saw.\n\nwrote a letter i won't send. it's\nin the drawer with the others.`,
    photoLabel: "window seat",
    doodles: ["flower", "cloud"] as const,
  },
  {
    date: "may · 11 · 2026",
    weekday: "monday",
    mood: "🍓",
    weather: "🌤",
    title: "small things",
    body: `bought strawberries from the market.\nthe woman who sells them remembered\nme this time which felt like a gift.\n\nclass was long. came home, ate the\nstrawberries one by one over the sink.\nthought about how the small things\nare doing all the heavy lifting lately.\n\nmaking a list of small good things\nfor the next bad day. tucking it here.`,
    photoLabel: "strawberries",
    doodles: ["strawberry", "heart"] as const,
  },
];

type DoodleKind = "cup" | "sun" | "pen" | "star" | "flower" | "cloud" | "strawberry" | "heart";

const doodlePaths: Record<DoodleKind, React.ReactNode> = {
  cup: (
    <g>
      <path d="M 8 12 L 26 12 L 24 28 Q 24 30 22 30 L 12 30 Q 10 30 10 28 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 26 16 Q 32 16 32 22 Q 32 26 26 26" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 14 6 Q 14 10 16 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 18 6 Q 18 10 20 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  sun: (
    <g>
      <circle cx="18" cy="18" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 18 4 L 18 8 M 18 28 L 18 32 M 4 18 L 8 18 M 28 18 L 32 18 M 8 8 L 11 11 M 25 25 L 28 28 M 8 28 L 11 25 M 25 11 L 28 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  pen: (
    <g>
      <path d="M 6 30 L 24 12 L 28 16 L 10 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" transform="translate(0,-2)" />
      <path d="M 24 10 L 30 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  star: <path d="M 18 4 L 21 14 L 32 14 L 23 20 L 26 31 L 18 24 L 10 31 L 13 20 L 4 14 L 15 14 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  flower: (
    <g>
      <circle cx="18" cy="18" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="18" cy="9" rx="4" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="18" cy="27" rx="4" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="9" cy="18" rx="6" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="27" cy="18" rx="6" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </g>
  ),
  cloud: <path d="M 8 22 Q 6 22 6 18 Q 6 14 10 14 Q 11 9 16 9 Q 21 9 22 13 Q 28 13 28 18 Q 28 22 24 22 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  strawberry: (
    <g>
      <path d="M 12 12 Q 18 8 24 12 Q 28 18 18 30 Q 8 18 12 12 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="14" cy="18" r="0.8" fill="currentColor" />
      <circle cx="18" cy="20" r="0.8" fill="currentColor" />
      <circle cx="22" cy="18" r="0.8" fill="currentColor" />
      <circle cx="16" cy="23" r="0.8" fill="currentColor" />
      <circle cx="20" cy="24" r="0.8" fill="currentColor" />
      <path d="M 14 10 L 18 6 L 22 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  ),
  heart: <path d="M 18 30 Q 4 20 4 12 Q 4 6 10 6 Q 14 6 18 11 Q 22 6 26 6 Q 32 6 32 12 Q 32 20 18 30 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
};

function Doodle({ kind, size = 36, color = navy, style = {} }: { kind: DoodleKind; size?: number; color?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 36 36" width={size} height={size} style={{ color, ...style }}>
      {doodlePaths[kind] ?? doodlePaths.star}
    </svg>
  );
}

function CoffeeStain({ size = 140, top, left, opacity = 0.18, rotate = 0 }: {
  size?: number; top: number; left: number; opacity?: number; rotate?: number;
}) {
  const id = useId();
  return (
    <svg viewBox="0 0 140 140" width={size} height={size} style={{
      position: "absolute", top, left, opacity, transform: `rotate(${rotate}deg)`,
    }}>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#8a5a3a" stopOpacity="0" />
          <stop offset="80%" stopColor="#8a5a3a" stopOpacity="0.6" />
          <stop offset="92%" stopColor="#5a3a1a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8a5a3a" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <path
        d="M 70 18 Q 110 22 118 60 Q 124 102 88 118 Q 50 128 28 100 Q 12 70 28 42 Q 44 18 70 18 Z"
        fill={`url(#${id})`}
      />
      <path
        d="M 70 26 Q 102 30 110 60 Q 114 96 84 108 Q 54 116 36 92 Q 24 68 38 46 Q 50 28 70 26 Z"
        fill="none" stroke="#5a3a1a" strokeWidth="0.8" strokeOpacity="0.4"
      />
    </svg>
  );
}

function PolaroidEntry({ entry, rotate = -3 }: { entry: typeof diaryEntries[0]; rotate?: number }) {
  return (
    <div style={{
      width: 320,
      background: "#faf3e0",
      padding: "20px 20px 60px",
      transform: `rotate(${rotate}deg)`,
      boxShadow: "6px 10px 22px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(0,0,0,0.05)",
      position: "relative",
    }}>
      <div style={{
        width: "100%",
        height: 320,
        background: `repeating-linear-gradient(135deg, ${accent}55, ${accent}55 6px, #fff8fb 6px, #fff8fb 16px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        color: navy,
      }}>
        <span style={{ background: "#fff", padding: "4px 8px", border: `1px dashed ${navy}55` }}>{entry.photoLabel}</span>
      </div>
      <div style={{
        marginTop: 18,
        fontFamily: '"Caveat", cursive',
        fontSize: 22,
        color: navy,
        textAlign: "center",
        lineHeight: 1.2,
      }}>
        {entry.weekday}
        <div style={{ fontSize: 16, opacity: 0.7 }}>{entry.date}</div>
      </div>
    </div>
  );
}

function DiarySpread({ entry, side, index }: { entry: typeof diaryEntries[0]; side: "left" | "right"; index: number }) {
  const isLeft = side === "left";
  return (
    <div style={{
      width: 540,
      height: 700,
      background: `
        radial-gradient(ellipse at ${isLeft ? "100%" : "0%"} 50%, rgba(0,0,0,0.12) 0%, transparent 30%),
        repeating-linear-gradient(transparent, transparent 31px, ${accent}55 31px, ${accent}55 32px),
        #fff8eb
      `,
      position: "relative",
      overflow: "hidden",
      boxShadow: isLeft
        ? "inset -10px 0 18px rgba(0,0,0,0.10)"
        : "inset 10px 0 18px rgba(0,0,0,0.10)",
      padding: 50,
    }}>
      {!isLeft && (
        <>
          <div style={{ position: "absolute", left: 16, top: 90, width: 14, height: 14, borderRadius: "50%", background: "#e8e0d4", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)" }} />
          <div style={{ position: "absolute", left: 16, top: 350, width: 14, height: 14, borderRadius: "50%", background: "#e8e0d4", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)" }} />
          <div style={{ position: "absolute", left: 16, top: 610, width: 14, height: 14, borderRadius: "50%", background: "#e8e0d4", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)" }} />
        </>
      )}

      {isLeft ? (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{
            fontFamily: '"Courier Prime", monospace',
            fontSize: 13,
            letterSpacing: 3,
            color: navy,
            textTransform: "uppercase",
            marginBottom: 28,
            textAlign: "center",
            opacity: 0.7,
          }}>
            ── {entry.date} · {entry.weather} {entry.mood} ──
          </div>

          <PolaroidEntry entry={entry} rotate={-4} />

          <div style={{
            position: "absolute", top: 90, left: "50%",
            width: 130, height: 28,
            transform: "translateX(-50%) rotate(-6deg)",
            background: `repeating-linear-gradient(45deg, ${accent}cc, ${accent}cc 6px, #fff8fbaa 6px, #fff8fbaa 12px)`,
            clipPath: "polygon(2% 8%, 98% 0%, 100% 92%, 1% 100%)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
          }} />

          <div style={{ position: "absolute", bottom: 30, right: 40 }}>
            <Doodle kind={entry.doodles[0]} size={48} color={navy} style={{ opacity: 0.7 }} />
          </div>

          <CoffeeStain size={120} top={580} left={20} opacity={0.22} rotate={15} />
        </div>
      ) : (
        <div style={{ height: "100%", position: "relative", paddingLeft: 30 }}>
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 48,
            fontWeight: 700,
            color: navy,
            lineHeight: 1.1,
            marginBottom: 8,
          }}>
            {entry.title}
          </div>

          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 22,
            color: denim,
            marginBottom: 24,
          }}>
            mood: {entry.mood} &nbsp;·&nbsp; weather: {entry.weather}
          </div>

          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 22,
            color: navy,
            lineHeight: 1.55,
            whiteSpace: "pre-line",
            maxWidth: 420,
          }}>
            {entry.body}
          </div>

          <div style={{
            position: "absolute",
            top: 380, left: 60,
            width: 200, height: 22,
            background: `${accent}66`,
            transform: "rotate(-1deg) skewX(-4deg)",
            zIndex: -1,
            borderRadius: 2,
          }} />

          <div style={{ position: "absolute", top: 40, right: 40 }}>
            <Doodle kind={entry.doodles[1]} size={56} color={denim} style={{ opacity: 0.65 }} />
          </div>

          <div style={{ position: "absolute", bottom: 80, right: 50 }}>
            <Doodle kind="star" size={32} color={navy} style={{ opacity: 0.5 }} />
          </div>

          <div style={{
            position: "absolute", bottom: 24, right: 50,
            fontFamily: '"Caveat", cursive',
            fontSize: 18,
            color: navy,
            opacity: 0.5,
          }}>
            ~ pg. {String(index * 2 + 4).padStart(2, "0")} ~
          </div>

          <CoffeeStain size={100} top={20} left={350} opacity={0.18} rotate={-30} />
        </div>
      )}
    </div>
  );
}

type FlipDir = "forward" | "backward";

export function DiarySection() {
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState<FlipDir | null>(null);
  const [pendingPage, setPendingPage] = useState(0);

  const handleNext = useCallback(() => {
    if (!flipping && page < diaryEntries.length - 1) {
      setPendingPage(page + 1);
      setFlipping("forward");
    }
  }, [page, flipping]);

  const handlePrev = useCallback(() => {
    if (!flipping && page > 0) {
      setPendingPage(page - 1);
      setFlipping("backward");
    }
  }, [page, flipping]);

  const handleFlipEnd = useCallback(() => {
    setPage(pendingPage);
    setFlipping(null);
  }, [pendingPage]);

  const jumpTo = useCallback((i: number) => {
    if (flipping || i === page) return;
    setPendingPage(i);
    setFlipping(i > page ? "forward" : "backward");
  }, [page, flipping]);

  // Static pages revealed behind the flip card while animating
  const leftEntry  = flipping === "backward" ? diaryEntries[pendingPage] : diaryEntries[page];
  const rightEntry = flipping === "forward"  ? diaryEntries[pendingPage] : diaryEntries[page];
  const leftIndex  = flipping === "backward" ? pendingPage : page;
  const rightIndex = flipping === "forward"  ? pendingPage : page;

  const atStart = page === 0;
  const atEnd   = page === diaryEntries.length - 1;

  return (
    <section style={{
      width: "100%",
      minHeight: 1100,
      position: "relative",
      padding: "120px 40px 100px",
      background: `
        radial-gradient(ellipse at 50% 0%, ${accent}88 0%, transparent 50%),
        ${wall}
      `,
    }}>
      {/* ── Scattered stickers ── */}
      {/* Princess hamster — top-right, above the book */}
      <img src="/s-hamster.png" alt="" aria-hidden width={110} style={{
        position: "absolute", top: 30, right: 40, zIndex: 2,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Pink lily flower — top-left */}
      <img src="/s-flower.png" alt="" aria-hidden width={88} style={{
        position: "absolute", top: 40, left: 40, zIndex: 2,
        filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.15))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Star wand — right margin mid-page */}
      <img src="/s-wand.png" alt="" aria-hidden width={90} style={{
        position: "absolute", top: 480, right: 30, zIndex: 2,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Pixel cursor — left margin, pointing at book */}
      <img src="/s-cursor.png" alt="" aria-hidden width={68} style={{
        position: "absolute", top: 540, left: 30, zIndex: 2,
        filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Calculator — bottom-left */}
      <img src="/s-calcu.png" alt="" aria-hidden width={95} style={{
        position: "absolute", bottom: 80, left: 45, zIndex: 2,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Pink camera — bottom-right */}
      <img src="/s-camera.png" alt="" aria-hidden width={105} style={{
        position: "absolute", bottom: 70, right: 45, zIndex: 2,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
        pointerEvents: "none", userSelect: "none",
      }} />

      {/* Section heading */}
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div style={{
          fontFamily: '"Courier Prime", monospace',
          fontSize: 13,
          letterSpacing: 6,
          color: navy,
          opacity: 0.6,
          textTransform: "uppercase",
          marginBottom: 8,
        }}>
          ― chapter two ―
        </div>
        <div style={{ display: "inline-block" }}>
          <RansomText text="DIARY" size={64} palette={palette} />
        </div>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 24,
          color: navy,
          marginTop: 12,
          opacity: 0.85,
        }}>
          ~ pages from a small notebook ~
        </div>
      </div>

      {/* Open book spread */}
      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", perspective: "2000px" }}>
        {/* Book shadow */}
        <div style={{
          position: "absolute",
          inset: -30,
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%)",
          filter: "blur(20px)",
          zIndex: 0,
        }} />

        {/* The spread */}
        <div style={{
          display: "flex",
          position: "relative",
          zIndex: 1,
          borderRadius: 4,
          overflow: "visible",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}>
          {/* Spine shadow */}
          <div style={{
            position: "absolute",
            left: "50%", top: 0, bottom: 0,
            width: 30,
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.25) 50%, transparent)",
            zIndex: 5,
            pointerEvents: "none",
          }} />

          <DiarySpread entry={leftEntry}  side="left"  index={leftIndex} />
          <DiarySpread entry={rightEntry} side="right" index={rightIndex} />

          {/* Flip card overlay — only rendered while animating */}
          {flipping && (
            <div
              className={flipping === "forward" ? "page-flip-forward" : "page-flip-backward"}
              onAnimationEnd={handleFlipEnd}
              style={{
                position: "absolute",
                top: 0,
                left: flipping === "forward" ? 540 : 0,
                width: 540,
                height: 700,
                transformStyle: "preserve-3d",
                transformOrigin: flipping === "forward" ? "left center" : "right center",
                zIndex: 10,
                willChange: "transform",
              }}
            >
              {/* Front face — the page that's currently visible and being lifted */}
              <div style={{
                position: "absolute", inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}>
                <DiarySpread
                  entry={diaryEntries[page]}
                  side={flipping === "forward" ? "right" : "left"}
                  index={page}
                />
              </div>
              {/* Back face — the page revealed as the card lands on the other side */}
              <div style={{
                position: "absolute", inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}>
                <DiarySpread
                  entry={diaryEntries[pendingPage]}
                  side={flipping === "forward" ? "left" : "right"}
                  index={pendingPage}
                />
              </div>
            </div>
          )}
        </div>

        {/* Nav arrows */}
        <button onClick={handlePrev} disabled={atStart || !!flipping} style={{
          position: "absolute",
          left: -70, top: "50%",
          transform: "translateY(-50%)",
          width: 56, height: 56,
          borderRadius: "50%",
          background: atStart ? "#e8e0d4" : accent,
          border: `2px solid ${navy}`,
          cursor: atStart || flipping ? "not-allowed" : "pointer",
          fontFamily: "Inter, sans-serif",
          fontSize: 22,
          fontWeight: 600,
          color: navy,
          boxShadow: "2px 4px 10px rgba(0,0,0,0.18)",
          opacity: atStart ? 0.5 : 1,
          transition: "all 200ms ease",
          zIndex: 10,
        }}>←</button>

        <button onClick={handleNext} disabled={atEnd || !!flipping} style={{
          position: "absolute",
          right: -70, top: "50%",
          transform: "translateY(-50%)",
          width: 56, height: 56,
          borderRadius: "50%",
          background: atEnd ? "#e8e0d4" : accent,
          border: `2px solid ${navy}`,
          cursor: atEnd || flipping ? "not-allowed" : "pointer",
          fontFamily: "Inter, sans-serif",
          fontSize: 22,
          fontWeight: 600,
          color: navy,
          boxShadow: "2px 4px 10px rgba(0,0,0,0.18)",
          opacity: atEnd ? 0.5 : 1,
          transition: "all 200ms ease",
          zIndex: 10,
        }}>→</button>

        {/* Page indicator dots */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 40 }}>
          {diaryEntries.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              style={{
                width: i === page ? 32 : 12,
                height: 12,
                borderRadius: 6,
                border: `1.5px solid ${navy}`,
                background: i === page ? navy : "transparent",
                cursor: flipping ? "not-allowed" : "pointer",
                padding: 0,
                transition: "all 250ms ease",
              }}
              aria-label={`page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
