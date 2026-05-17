"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { FloatingSticker } from "./floating-sticker";
import { RansomText } from "@/components/portfolio/primitives/ransom-text";
import { Tape } from "@/components/portfolio/primitives/tape";
import { palette } from "@/lib/palette";

const { accent, denim, navy, cream } = palette;

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
      fontFamily: '"Caveat", cursive',
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
      background: `
        radial-gradient(circle at 15% 20%, ${accent}55 0%, transparent 40%),
        radial-gradient(circle at 85% 80%, ${accent}88 0%, transparent 40%),
        #fce9ef
      `,
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
          fontFamily: '"Courier Prime", monospace',
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
          fontFamily: '"Caveat", cursive',
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
      <img src="/s-globe.png" alt="" aria-hidden width={110} style={{
        position: "absolute", top: 550, left: 50, zIndex: 6,
        filter: "drop-shadow(2px 6px 10px rgba(0,0,0,0.2))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Retro pink phone — left side below map */}
      <img src="/s-phone.png" alt="" aria-hidden width={115} style={{
        position: "absolute", top: 840, left: 45, zIndex: 6,
        filter: "drop-shadow(2px 6px 10px rgba(0,0,0,0.2))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Star wand with wings — top right */}
      <img src="/s-wand-mic.png" alt="" aria-hidden width={90} style={{
        position: "absolute", top: 130, left: 1250, zIndex: 6,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Pink credit card — right side mid */}
      <img src="/s-card.png" alt="" aria-hidden width={105} style={{
        position: "absolute", top: 460, left: 1270, zIndex: 6,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Pink star (hand drawn) — upper center */}
      <img src="/s-star-pink.png" alt="" aria-hidden width={55} style={{
        position: "absolute", top: 200, left: 1130, zIndex: 6,
        filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* 3D glass heart — right of cycling bubbles */}
      <img src="/s-heart.png" alt="" aria-hidden width={80} style={{
        position: "absolute", top: 175, left: 830, zIndex: 6,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* 3D iridescent star — right side lower */}
      <img src="/s-star3d.png" alt="" aria-hidden width={85} style={{
        position: "absolute", top: 730, left: 1310, zIndex: 6,
        transform: "rotate(20deg)",
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Heart button — near bottom cards */}
      <img src="/s-button-heart.png" alt="" aria-hidden width={65} style={{
        position: "absolute", top: 1050, left: 310, zIndex: 6,
        filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
        pointerEvents: "none", userSelect: "none",
      }} />
      {/* Pink lily flower — bottom right area */}
      <img src="/s-flower.png" alt="" aria-hidden width={90} style={{
        position: "absolute", top: 1060, left: 1240, zIndex: 6,
        filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.15))",
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
              fontFamily: "Inter, system-ui, sans-serif",
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
              fontFamily: "Inter, system-ui, sans-serif",
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
            fontFamily: '"Caveat", cursive',
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
            fontFamily: '"Caveat", cursive',
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

      {/* ── Detail cards ── */}
      <div style={{
        maxWidth: 1100,
        margin: "80px auto 0",
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr 1fr",
        gap: 28,
        position: "relative",
        zIndex: 6,
      }}>
        {/* Card 1: address */}
        <div className="scrap-tilt" style={{
          background: "#fff8eb",
          padding: "28px 30px",
          transform: "rotate(-1.5deg)",
          boxShadow: "4px 8px 18px rgba(0,0,0,0.15)",
          backgroundImage: `repeating-linear-gradient(transparent 0 27px, ${accent}66 27px 28px)`,
          position: "relative",
        }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 32, color: navy, marginBottom: 10 }}>
            📮 the address
          </div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: navy, lineHeight: 1.5 }}>
            WWF9+6H6, SBD<br />
            6 khoroo,<br />
            Ulaanbaatar 14200<br />
            Mongolia 🇲🇳
          </div>
        </div>

        {/* Card 2: ticket stub */}
        <div className="scrap-tilt" style={{
          background: cream,
          padding: "28px 30px",
          transform: "rotate(1.5deg)",
          boxShadow: "4px 8px 18px rgba(0,0,0,0.15)",
          border: `2px dashed ${navy}`,
        }}>
          <div style={{
            fontFamily: '"Courier Prime", monospace',
            fontSize: 12, letterSpacing: 3,
            color: navy, opacity: 0.6,
            textTransform: "uppercase", marginBottom: 12,
          }}>★ ticket stub ★</div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 30, color: navy, marginBottom: 6 }}>
            nymtuul · 2022—now
          </div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 20, color: navy, lineHeight: 1.4 }}>
            🎓 student of [discipline]<br />
            ⭐ rating: 4.5 (272 reviews)
          </div>
        </div>

        {/* Card 3: nearby */}
        <div className="scrap-tilt" style={{
          background: accent,
          padding: "28px 30px",
          transform: "rotate(-2deg)",
          boxShadow: "4px 8px 18px rgba(0,0,0,0.15)",
          position: "relative",
        }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 30, color: navy, marginBottom: 10 }}>
            nearby ↘
          </div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 20, color: navy, lineHeight: 1.5 }}>
            ☕ Karaoke spot<br />
            🏛 Chinggis Khaan museum<br />
            🌳 Gov Outdoor Park<br />
            🏨 UB Grand Hotel<br />
            🎵 Music College
          </div>
          <div style={{
            position: "absolute", top: -16, right: 18,
            background: navy, color: cream,
            padding: "4px 12px", borderRadius: 999,
            fontFamily: '"Courier Prime", monospace',
            fontSize: 11, fontWeight: 700,
            letterSpacing: 1, transform: "rotate(8deg)",
          }}>★ FAVES</div>
        </div>
      </div>

      {/* ── Bottom note ── */}
      <div style={{
        textAlign: "center",
        marginTop: 80,
        fontFamily: '"Caveat", cursive',
        fontSize: 30,
        color: navy,
        opacity: 0.85,
      }}>
        ~ if you visit, bring snacks ~ 🍓
      </div>
      </div>{/* end inner canvas */}
    </main>
  );
}
