"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { FloatingSticker } from "./floating-sticker";
import { RansomText } from "@/components/portfolio/primitives/ransom-text";
import { Tape } from "@/components/portfolio/primitives/tape";
import { TimelineSection, TimelineSectionMobile } from "./timeline-section";
import { MobileFrame } from "@/components/mobile-frame";
import { palette } from "@/lib/palette";

const { accent, denim, navy, cream, wall } = palette;

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=National+University+of+Mongolia,Ulaanbaatar&z=17&output=embed";

// ─── Floating cartoon icons ───────────────────────────────────────────────────

type IconKind = "plane" | "sparkle" | "heart" | "star" | "cart" | "book" | "coffee" | "pin";

const iconSvgs: Record<IconKind, React.ReactNode> = {
  plane: (
    <svg viewBox="0 0 32 32">
      <path d="M 16 4 L 19 14 L 30 16 L 19 18 L 17 28 L 14 18 L 2 16 L 14 14 Z" fill="#7ab8e0" stroke="#fff" strokeWidth="1.5" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24">
      <path d="M 12 2 L 14 10 L 22 12 L 14 14 L 12 22 L 10 14 L 2 12 L 10 10 Z" fill="#fcd86a" stroke="#fff" strokeWidth="1.2" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24">
      <path d="M 12 21 C 4 14 2 9 5 6 C 8 3 11 6 12 8 C 13 6 16 3 19 6 C 22 9 20 14 12 21 Z" fill="#ff8aa8" stroke="#fff" strokeWidth="1.5" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24">
      <path d="M 12 2 L 15 9 L 22 9 L 16 14 L 18 22 L 12 17 L 6 22 L 8 14 L 2 9 L 9 9 Z" fill="#fcd86a" stroke="#fff" strokeWidth="1.5" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="14" fill="#7ab8e0" />
      <path d="M 8 10 L 22 10 L 20 18 L 11 18 Z" fill="#fff" />
      <circle cx="12" cy="22" r="2" fill="#fff" />
      <circle cx="19" cy="22" r="2" fill="#fff" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 30 30">
      <rect x="4" y="6" width="22" height="20" fill="#a8d68a" stroke="#fff" strokeWidth="1.5" rx="1" />
      <line x1="15" y1="6" x2="15" y2="26" stroke="#fff" strokeWidth="1.5" />
    </svg>
  ),
  coffee: (
    <svg viewBox="0 0 30 30">
      <path d="M 6 10 L 22 10 L 20 24 Q 20 26 18 26 L 10 26 Q 8 26 8 24 Z" fill="#8a5a3a" stroke="#fff" strokeWidth="1.5" />
      <path d="M 22 14 Q 28 14 28 20 Q 28 24 22 24" fill="none" stroke="#8a5a3a" strokeWidth="2" />
      <line x1="11" y1="4" x2="11" y2="8" stroke="#8a5a3a" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="4" x2="15" y2="8" stroke="#8a5a3a" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="4" x2="19" y2="8" stroke="#8a5a3a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 32">
      <path d="M 12 2 C 6 2 3 6 3 12 C 3 20 12 30 12 30 C 12 30 21 20 21 12 C 21 6 18 2 12 2 Z" fill="#ff5a8a" stroke="#fff" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" fill="#fff" />
    </svg>
  ),
};

function FloatingIcon({ kind, top, left, rotate = 0, size = 44, zIndex = 5 }: {
  kind: IconKind; top: number; left: number; rotate?: number; size?: number; zIndex?: number;
}) {
  return (
    <div className="scrap-tilt" style={{
      position: "absolute",
      top, left,
      width: size, height: size,
      transform: `rotate(${rotate}deg)`,
      filter: "drop-shadow(2px 4px 4px rgba(0,0,0,0.15))",
      zIndex,
    }}>
      {iconSvgs[kind]}
    </div>
  );
}

// ─── Speech bubble ────────────────────────────────────────────────────────────

function Bubble({ children, top, left, rotate = 0, emoji, big = false, color = "#fff" }: {
  children: React.ReactNode;
  top: number; left: number;
  rotate?: number;
  emoji?: string;
  big?: boolean;
  color?: string;
}) {
  return (
    <div className="scrap-tilt" style={{
      position: "absolute",
      top, left,
      background: color,
      borderRadius: 999,
      padding: big ? "14px 26px" : "10px 20px",
      fontFamily: 'var(--font-caveat), cursive',
      fontSize: big ? 24 : 18,
      fontWeight: 600,
      color: navy,
      boxShadow: "0 4px 14px rgba(0,0,0,0.12), 0 1px 0 rgba(0,0,0,0.04) inset",
      transform: `rotate(${rotate}deg)`,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      whiteSpace: "nowrap",
      zIndex: 10,
    }}>
      {emoji && <span style={{ fontSize: big ? 22 : 18 }}>{emoji}</span>}
      <span>{children}</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const cyclingBubbles = [
  { text: "this is where it all started", emoji: "🌸", rotate: -4 },
  { text: "pls help me find my classroom!", emoji: "🥹", rotate: 2 },
  { text: "home for 4 years already", emoji: "✨", rotate: -3 },
];

export function LocationPage() {
  const [activeBubble, setActiveBubble] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveBubble((b) => (b + 1) % cyclingBubbles.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{
      backgroundColor: wall,
      overflowX: "hidden",
    }}>
      {/* Fixed-width canvas so absolute positions are bounded */}
      <div style={{
        position: "relative",
        maxWidth: 1440,
        margin: "0 auto",
        minHeight: "100vh",
        padding: "60px 40px 100px",
      }}>

      {/* ── Back to home button (top-right) ── */}
      <Link
        href="/"
        className="scrap-tilt"
        style={{
          position: "absolute",
          top: 60,
          right: 60,
          background: cream,
          padding: "12px 22px",
          borderRadius: 999,
          border: `2px solid ${navy}`,
          transform: "rotate(2deg)",
          boxShadow: "3px 5px 12px rgba(0,0,0,0.15)",
          fontFamily: 'var(--font-caveat), cursive',
          fontSize: 22,
          fontWeight: 600,
          color: navy,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          zIndex: 30,
        }}
      >
        <span style={{ fontSize: 20 }}>←</span>
        <span>back home</span>
      </Link>

      {/* ── Title scrap (top-left) ── */}
      <div className="scrap-tilt" style={{
        position: "absolute",
        top: 80, left: 60,
        background: cream,
        padding: "24px 32px",
        transform: "rotate(-3deg)",
        boxShadow: "4px 6px 14px rgba(0,0,0,0.12)",
        maxWidth: 320,
        border: "1px solid rgba(0,0,0,0.05)",
        zIndex: 8,
      }}>
        <div style={{
          fontFamily: 'var(--font-courier), monospace',
          fontSize: 11,
          letterSpacing: 4,
          color: navy,
          textTransform: "uppercase",
          opacity: 0.6,
          marginBottom: 8,
        }}>― chapter three · location ―</div>
        <div style={{ marginBottom: 8 }}>
          <RansomText text="HERE" size={48} palette={palette} />
        </div>
        <div style={{
          fontFamily: 'var(--font-caveat), cursive',
          fontSize: 22,
          color: navy,
          lineHeight: 1.3,
        }}>
          ~ the place where i&apos;m pretending to be a serious student ~
        </div>
      </div>
      <Tape top={68} left={180} width={140} height={28} rotate={-12} pattern="striped" color={`${accent}cc`} zIndex={9} />

      {/* ── SVG floating icons (kept for light fill) ── */}
      <FloatingIcon kind="plane"   top={140} left={580}  rotate={-20} size={56} />
      <FloatingIcon kind="sparkle" top={240} left={720}  rotate={15}  size={36} />
      <FloatingIcon kind="sparkle" top={920} left={180}  rotate={-15} size={28} />
      <FloatingIcon kind="star"    top={1100} left={900} rotate={-10} size={36} />

      {/* ── Real image stickers scattered around ── */}
      {/* Pink globe — left side near map */}
      <img src="/s-globe.png" alt="" aria-hidden width={242} style={{
        position: "absolute", top: 550, left: 50, zIndex: 6,
        filter: "drop-shadow(2px 6px 10px rgba(0,0,0,0.2))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Retro pink phone — left side below map */}
      <img src="/s-phone.png" alt="" aria-hidden width={254} style={{
        position: "absolute", top: 840, left: 45, zIndex: 6,
        filter: "drop-shadow(2px 6px 10px rgba(0,0,0,0.2))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Star wand with wings — top right */}
      <img src="/s-wand-mic.png" alt="" aria-hidden width={198} style={{
        position: "absolute", top: 130, left: 1250, zIndex: 6,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Pink credit card — right side mid */}
      <img src="/s-card.png" alt="" aria-hidden width={231} style={{
        position: "absolute", top: 460, left: 1270, zIndex: 6,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Pink star (hand drawn) — upper center */}
      <img src="/s-star-pink.png" alt="" aria-hidden width={122} style={{
        position: "absolute", top: 200, left: 1130, zIndex: 6,
        filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* 3D glass heart — right of cycling bubbles */}
      <img src="/s-heart.png" alt="" aria-hidden width={176} style={{
        position: "absolute", top: 60, left: 830, zIndex: 6,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* 3D iridescent star — right side lower */}
      <img src="/s-star3d.png" alt="" aria-hidden width={187} style={{
        position: "absolute", top: 730, left: 1310, zIndex: 6,
        transform: "rotate(20deg)",
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Heart button — bottom-left near snack note */}
      <img src="/s-button-heart.png" alt="" aria-hidden width={111} style={{
        position: "absolute", top: 880, left: 380, zIndex: 6,
        transform: "rotate(-8deg)",
        filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Pink lily flower — bottom-right */}
      <img src="/s-flower.png" alt="" aria-hidden width={152} style={{
        position: "absolute", top: 870, left: 1050, zIndex: 6,
        transform: "rotate(12deg)",
        filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.15))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Sparkle — between map and bottom */}
      <img src="/s-sparkle.png" alt="" aria-hidden width={94} style={{
        position: "absolute", top: 740, left: 720, zIndex: 6,
        transform: "rotate(15deg)",
        filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
        pointerEvents: "none", userSelect: "none",
      }} />

      {/* ── Map polaroid frame ── */}
      <div style={{ position: "relative", margin: "180px auto 0", maxWidth: 1100, zIndex: 5 }}>
        <div className="scrap-tilt" style={{
          background: cream,
          padding: "24px 24px 80px",
          boxShadow: "8px 14px 32px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(0,0,0,0.05)",
          transform: "rotate(-1deg)",
          position: "relative",
        }}>
          {/* Map area */}
          <div style={{
            width: "100%",
            aspectRatio: "2 / 1",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.05)",
          }}>
            {/* Google Maps iframe */}
            <iframe
              title="Map"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />

            {/* Nymtuul sticker overlaid on the map */}
            <div style={{
              position: "absolute",
              right: "18%",
              bottom: 0,
              width: "22%",
              height: "90%",
              pointerEvents: "none",
              zIndex: 2,
            }}>
              <FloatingSticker
                src="/nymtuul-map.png"
                fallbackSrc="/nymtuul-placeholder.svg"
                alt="Nymtuul map"
                className="select-none"
                style={{
                  height: "100%",
                  width: "auto",
                  filter: "drop-shadow(-6px 8px 14px rgba(0,0,0,0.3))",
                  animation: "bob 4s ease-in-out infinite alternate",
                }}
              />
            </div>

            {/* Pin callout labels */}
            <div style={{
              position: "absolute",
              top: "15%", right: "10%",
              background: "#fff",
              padding: "6px 12px",
              borderRadius: 999,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: navy,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              transform: "rotate(3deg)",
              zIndex: 3,
            }}>📚 my faculty</div>

            <div style={{
              position: "absolute",
              bottom: "12%", left: "8%",
              background: "#fff",
              padding: "6px 12px",
              borderRadius: 999,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: navy,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              transform: "rotate(-4deg)",
              zIndex: 3,
            }}>☕ favorite café</div>
          </div>

          {/* Polaroid caption */}
          <div style={{
            position: "absolute",
            bottom: 22,
            left: 0, right: 0,
            textAlign: "center",
            fontFamily: 'var(--font-caveat), cursive',
            fontSize: 28,
            color: navy,
          }}>
            National University of Mongolia · est. 1942
            <span style={{ fontSize: 16, opacity: 0.6, marginLeft: 12 }}>↗ open in maps</span>
          </div>
        </div>

        {/* Tape decorations on the polaroid */}
        <div style={{
          position: "absolute", top: -14, left: "40%",
          width: 160, height: 32,
          transform: "rotate(-6deg)",
          background: `repeating-linear-gradient(45deg, ${accent}cc 0 6px, ${cream}aa 6px 12px)`,
          clipPath: "polygon(2% 8%, 98% 0%, 100% 92%, 1% 100%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
          zIndex: 20,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: -8, right: 80,
          width: 130, height: 28,
          transform: "rotate(8deg)",
          background: `${denim}cc`,
          clipPath: "polygon(2% 8%, 98% 0%, 100% 92%, 1% 100%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
          zIndex: 20,
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Cycling speech bubbles ── */}
      {cyclingBubbles.map((b, i) => (
        <div
          key={i}
          className="bubble-cycle"
          style={{
            position: "absolute",
            top: 175, left: 430,
            opacity: i === activeBubble ? 1 : 0,
            transform: `translateY(${i === activeBubble ? 0 : -8}px) scale(${i === activeBubble ? 1 : 0.92}) rotate(${b.rotate}deg)`,
            zIndex: 15,
          } as CSSProperties}
        >
          <div style={{
            background: "#fff",
            borderRadius: 999,
            padding: "14px 26px",
            fontFamily: 'var(--font-caveat), cursive',
            fontSize: 24,
            fontWeight: 600,
            color: navy,
            boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
          }}>
            <span style={{ fontSize: 22 }}>{b.emoji}</span>
            <span>{b.text}</span>
          </div>
        </div>
      ))}

      {/* Static "established 2022" bubble */}
      <Bubble top={110} left={1080} rotate={6} emoji="📍">established 2022</Bubble>

      {/* ── Bottom note ── */}
      <div style={{
        textAlign: "center",
        marginTop: 160,
        fontFamily: 'var(--font-caveat), cursive',
        fontSize: 30,
        color: navy,
        opacity: 0.85,
        position: "relative",
        zIndex: 7,
      }}>
        ~ if you visit, bring snacks ~ 🍓
      </div>
      </div>{/* end inner canvas */}

      {/* ── Chapter four: vertical life timeline ── */}
      <TimelineSection />
    </main>
  );
}

// ─── Phone layout ────────────────────────────────────────────────────────────

export function LocationPageMobile() {
  const [activeBubble, setActiveBubble] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveBubble((b) => (b + 1) % cyclingBubbles.length), 3500);
    return () => clearInterval(id);
  }, []);

  const sticker: CSSProperties = {
    position: "absolute",
    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <MobileFrame style={{ backgroundColor: wall }}>
      <main style={{ position: "relative", padding: "20px 0 10px" }}>
        {/* top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", position: "relative", zIndex: 30 }}>
          <Link
            href="/"
            style={{
              background: cream,
              padding: "8px 16px",
              borderRadius: 999,
              border: `2px solid ${navy}`,
              transform: "rotate(-2deg)",
              boxShadow: "3px 5px 12px rgba(0,0,0,0.15)",
              fontFamily: "var(--font-caveat), cursive",
              fontSize: 20,
              fontWeight: 600,
              color: navy,
              textDecoration: "none",
              display: "inline-flex",
              gap: 6,
            }}
          >
            <span>←</span>
            <span>back home</span>
          </Link>
          <div style={{
            background: "#fff",
            borderRadius: 999,
            padding: "7px 14px",
            fontFamily: "var(--font-caveat), cursive",
            fontSize: 17,
            fontWeight: 600,
            color: navy,
            boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
            transform: "rotate(4deg)",
          }}>📍 established 2022</div>
        </div>

        {/* title scrap */}
        <div style={{ position: "relative", height: 250 }}>
          {/* eslint-disable @next/next/no-img-element */}
          <img src="/s-heart.png" alt="" aria-hidden width={86} style={{ ...sticker, top: 20, right: 30, zIndex: 6 }} />
          <img src="/s-wand-mic.png" alt="" aria-hidden width={92} style={{ ...sticker, top: 120, right: 0, zIndex: 6 }} />
          {/* eslint-enable @next/next/no-img-element */}
          <div style={{
            position: "absolute",
            top: 36, left: 18,
            width: 250,
            background: cream,
            padding: "20px 22px",
            transform: "rotate(-3deg)",
            boxShadow: "4px 6px 14px rgba(0,0,0,0.12)",
            zIndex: 8,
          }}>
            <div style={{
              fontFamily: "var(--font-courier), monospace",
              fontSize: 10,
              letterSpacing: 3,
              color: navy,
              textTransform: "uppercase",
              opacity: 0.6,
              marginBottom: 6,
            }}>― chapter three · location ―</div>
            <RansomText text="HERE" size={42} palette={palette} />
            <div style={{
              fontFamily: "var(--font-caveat), cursive",
              fontSize: 20,
              color: navy,
              lineHeight: 1.25,
              marginTop: 6,
            }}>
              ~ the place where i&apos;m pretending to be a serious student ~
            </div>
          </div>
          <Tape top={26} left={120} width={110} height={24} rotate={-12} pattern="striped" color={`${accent}cc`} zIndex={9} />
        </div>

        {/* cycling bubble */}
        <div style={{ position: "relative", height: 54, display: "flex", justifyContent: "center", zIndex: 15 }}>
          {cyclingBubbles.map((b, i) => (
            <div
              key={i}
              className="bubble-cycle"
              style={{
                position: "absolute",
                opacity: i === activeBubble ? 1 : 0,
                transform: `translateY(${i === activeBubble ? 0 : -8}px) rotate(${b.rotate}deg)`,
              }}
            >
              <div style={{
                background: "#fff",
                borderRadius: 999,
                padding: "10px 20px",
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 21,
                fontWeight: 600,
                color: navy,
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                whiteSpace: "nowrap",
                display: "inline-flex",
                gap: 6,
              }}>
                <span>{b.emoji}</span>
                <span>{b.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* map polaroid */}
        <div style={{ position: "relative", margin: "18px 14px 0", zIndex: 5 }}>
          <div style={{
            background: cream,
            padding: "12px 12px 52px",
            boxShadow: "6px 10px 24px rgba(0,0,0,0.2)",
            transform: "rotate(-1deg)",
            position: "relative",
          }}>
            <div style={{ width: "100%", aspectRatio: "4 / 3", position: "relative", overflow: "hidden" }}>
              <iframe
                title="Map"
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
              <div style={{ position: "absolute", right: "6%", bottom: 0, height: "88%", pointerEvents: "none", zIndex: 2 }}>
                <FloatingSticker
                  src="/nymtuul-map.png"
                  fallbackSrc="/nymtuul-placeholder.svg"
                  alt="Nymtuul map"
                  className="select-none"
                  style={{
                    height: "100%",
                    width: "auto",
                    filter: "drop-shadow(-4px 6px 10px rgba(0,0,0,0.3))",
                    animation: "bob 4s ease-in-out infinite alternate",
                  }}
                />
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=National+University+of+Mongolia,Ulaanbaatar"
              target="_blank"
              rel="noreferrer"
              style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                right: 0,
                textAlign: "center",
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 20,
                color: navy,
                textDecoration: "none",
                lineHeight: 1.1,
              }}
            >
              National University of Mongolia · est. 1942
              <div style={{ fontSize: 15, opacity: 0.6 }}>↗ open in maps</div>
            </a>
          </div>
          <div style={{
            position: "absolute", top: -10, left: "34%",
            width: 110, height: 24,
            transform: "rotate(-6deg)",
            background: `repeating-linear-gradient(45deg, ${accent}cc 0 6px, ${cream}aa 6px 12px)`,
            clipPath: "polygon(2% 8%, 98% 0%, 100% 92%, 1% 100%)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
            zIndex: 20,
          }} />
        </div>

        <div style={{ position: "relative", height: 120 }}>
          {/* eslint-disable @next/next/no-img-element */}
          <img src="/s-phone.png" alt="" aria-hidden width={96} style={{ ...sticker, top: 6, left: 8 }} />
          <img src="/s-flower.png" alt="" aria-hidden width={74} style={{ ...sticker, top: 20, right: 14, transform: "rotate(12deg)" }} />
          {/* eslint-enable @next/next/no-img-element */}
          <div style={{
            position: "absolute",
            top: 48, left: 0, right: 0,
            textAlign: "center",
            fontFamily: "var(--font-caveat), cursive",
            fontSize: 24,
            color: navy,
          }}>
            ~ if you visit, bring snacks ~ 🍓
          </div>
        </div>

        <TimelineSectionMobile />
      </main>
    </MobileFrame>
  );
}
