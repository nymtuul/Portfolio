import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { palette } from "@/lib/palette";
import { RansomText } from "@/components/portfolio/primitives/ransom-text";

const { accent, denim, navy, cream, wall } = palette;

type Entry = {
  year: string;
  title: string;
  body: string;
  mood: string;
  cardImage: string;
  rotate: number;
  photoRotate: number;
  photoLabel: string;
  photo?: string;
  /** Vertical nudge for the card text in px (negative = up). Lets each paper
   * texture have its writable area align with the text. */
  textOffsetY?: number;
  /** Horizontal nudge for the card text in px (negative = left). */
  textOffsetX?: number;
  /** Override the default 440px card width for papers that need more room. */
  cardWidth?: number;
};

const timelineEntries: Entry[] = [
  {
    year: "2002",
    title: "born",
    body: `arrived on a tuesday,\nin a hurry. weighed less\nthan a bag of sugar.`,
    mood: "🍼",
    cardImage: "/paper1.png",
    cardWidth: 360,
    rotate: -3,
    photoRotate: 4,
    photoLabel: "baby",
    photo: "/nymtuul.png",
    textOffsetY: -40,
  },
  {
    year: "2008",
    title: "started school",
    body: `first day: cried for ten\nminutes, then made a friend\nover a broken crayon.`,
    mood: "🎒",
    cardImage: "/paper2.png",
    rotate: 2,
    photoRotate: -5,
    photoLabel: "first day",
    photo: "/nymtuul-1.png",
    textOffsetX: -40,
    textOffsetY: -30,
  },
  {
    year: "2014",
    title: "middle school",
    body: `discovered books that weren't\nassigned. spent allowance\non stationery.`,
    mood: "📚",
    cardImage: "/paper3.png",
    rotate: -4,
    photoRotate: 3,
    photoLabel: "reading era",
    photo: "/nymtuul-2.png",
  },
  {
    year: "2020",
    title: "graduated",
    body: `commencement on a screen.\nstrange year to come of age.\nbut here we are.`,
    mood: "🎓",
    cardImage: "/paper4.png",
    rotate: 3,
    photoRotate: -3,
    photoLabel: "cap & gown",
    photo: "/nymtuul-map.png",
    textOffsetX: -30,
    textOffsetY: 30,
  },
  {
    year: "2022",
    title: "started uni",
    body: `moved to a new city. learned\nto cook one (1) meal.\nstudying what i love.`,
    mood: "✨",
    cardImage: "/paper1.png",
    cardWidth: 360,
    rotate: -2,
    photoRotate: 4,
    photoLabel: "campus",
    photo: "/nymtuul-1.png",
    textOffsetY: -40,
  },
];

type ConfettiKind =
  | "dot"
  | "star"
  | "heart"
  | "sparkle"
  | "flower"
  | "squiggle";

function ConfettiSticker({
  kind,
  top,
  left,
  rotate = 0,
  size = 28,
  color,
}: {
  kind: ConfettiKind;
  top: number;
  left: string;
  rotate?: number;
  size?: number;
  color: string;
}) {
  const shapes: Record<ConfettiKind, ReactNode> = {
    dot: <circle cx="14" cy="14" r="10" fill={color} />,
    star: (
      <path
        d="M 14 2 L 17 11 L 26 11 L 19 16 L 21 25 L 14 19 L 7 25 L 9 16 L 2 11 L 11 11 Z"
        fill={color}
      />
    ),
    heart: (
      <path
        d="M 14 24 Q 2 14 2 8 Q 2 3 6 3 Q 11 3 14 8 Q 17 3 22 3 Q 26 3 26 8 Q 26 14 14 24 Z"
        fill={color}
      />
    ),
    sparkle: (
      <path
        d="M 14 2 L 16 11 L 26 14 L 16 17 L 14 26 L 12 17 L 2 14 L 12 11 Z"
        fill={color}
      />
    ),
    flower: (
      <g>
        <circle cx="14" cy="14" r="3" fill={color} />
        <circle cx="14" cy="7" r="3.5" fill={color} />
        <circle cx="14" cy="21" r="3.5" fill={color} />
        <circle cx="7" cy="14" r="3.5" fill={color} />
        <circle cx="21" cy="14" r="3.5" fill={color} />
      </g>
    ),
    squiggle: (
      <path
        d="M 4 14 Q 8 4 12 14 T 20 14"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    ),
  };
  return (
    <svg
      viewBox="0 0 28 28"
      width={size}
      height={size}
      style={{
        position: "absolute",
        top,
        left,
        transform: `rotate(${rotate}deg)`,
        filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.2))",
        pointerEvents: "none",
        zIndex: 4,
      }}
    >
      {shapes[kind]}
    </svg>
  );
}

function TimelineRow({
  entry,
  side,
}: {
  entry: Entry;
  side: "left" | "right";
}) {
  const isLeft = side === "left";

  const polaroid = (
    <div
      className="scrap-tilt"
      style={{ width: 200, flexShrink: 0, position: "relative" }}
    >
      <div
        style={{
          background: "#faf3e0",
          padding: "14px 14px 36px",
          transform: `rotate(${entry.photoRotate}deg)`,
          boxShadow: "5px 8px 16px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            background: `repeating-linear-gradient(135deg, ${accent}55, ${accent}55 6px, ${cream} 6px, ${cream} 14px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {entry.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.photo}
              alt={`${entry.photoLabel} (${entry.year})`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                fontFamily: '"Caveat", cursive',
                fontSize: 20,
                color: navy,
                opacity: 0.55,
                textAlign: "center",
                padding: "0 8px",
              }}
            >
              {entry.photoLabel}
            </div>
          )}
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: '"Caveat", cursive',
            fontSize: 18,
            color: navy,
            textAlign: "center",
          }}
        >
          {entry.photoLabel} · {entry.year}
        </div>
        <div
          style={{
            position: "absolute",
            top: -10,
            [isLeft ? "right" : "left"]: 14,
            width: 60,
            height: 20,
            background: `repeating-linear-gradient(45deg, ${accent}cc, ${accent}cc 5px, ${cream}aa 5px, ${cream}aa 10px)`,
            clipPath: "polygon(3% 8%, 98% 0%, 100% 92%, 1% 100%)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
            transform: `rotate(${isLeft ? 8 : -8}deg)`,
          }}
        />
      </div>
    </div>
  );

  const card = (
    <div
      className="scrap-tilt"
      style={{
        width: entry.cardWidth ?? 440,
        flexShrink: 0,
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundImage: `url("${entry.cardImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "60px 70px",
          transform: `rotate(${entry.rotate}deg)`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            transform:
              entry.textOffsetX || entry.textOffsetY
                ? `translate(${entry.textOffsetX ?? 0}px, ${entry.textOffsetY ?? 0}px)`
                : undefined,
          }}
        >
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontWeight: 700,
              fontSize: 52,
              lineHeight: 1,
              color: navy,
              letterSpacing: -1,
              marginBottom: 4,
            }}
          >
            {entry.year}
          </div>
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: 22,
              color: navy,
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>{entry.mood}</span> {entry.title}
          </div>
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: 17,
              color: navy,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              opacity: 0.85,
            }}
          >
            {entry.body}
          </div>
        </div>
      </div>
    </div>
  );

  const rowStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 60px 1fr",
    alignItems: "center",
    position: "relative",
    padding: "20px 0",
  };

  return (
    <div
      role="listitem"
      aria-label={`Timeline entry: ${entry.year}, ${entry.title}`}
      style={rowStyle}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 40,
        }}
      >
        {isLeft ? card : polaroid}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: accent,
            border: `3.5px solid ${navy}`,
            boxShadow: "0 2px 5px rgba(0,0,0,0.22)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: 40,
        }}
      >
        {isLeft ? polaroid : card}
      </div>
    </div>
  );
}

export function TimelineSection() {
  return (
    <section
      style={{
        padding: "80px 60px 100px",
        backgroundColor: wall,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Image stickers scattered along the edges ── */}
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="/s-wand.png"
        alt=""
        aria-hidden
        width={176}
        style={{
          position: "absolute",
          top: 90,
          right: 70,
          zIndex: 5,
          transform: "rotate(14deg)",
          filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      <img
        src="/s-hamster.png"
        alt=""
        aria-hidden
        width={156}
        style={{
          position: "absolute",
          top: 380,
          left: 40,
          zIndex: 5,
          transform: "rotate(-6deg)",
          filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      <img
        src="/s-spiral.png"
        alt=""
        aria-hidden
        width={138}
        style={{
          position: "absolute",
          top: 600,
          right: 50,
          zIndex: 5,
          filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      <img
        src="/s-calcu.png"
        alt=""
        aria-hidden
        width={160}
        style={{
          position: "absolute",
          top: 860,
          left: 40,
          zIndex: 5,
          transform: "rotate(8deg)",
          filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      <img
        src="/s-sparkle.png"
        alt=""
        aria-hidden
        width={120}
        style={{
          position: "absolute",
          top: 1080,
          right: 80,
          zIndex: 5,
          transform: "rotate(-10deg)",
          filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      <img
        src="/s-pin.png"
        alt=""
        aria-hidden
        width={108}
        style={{
          position: "absolute",
          bottom: 80,
          left: 70,
          zIndex: 5,
          transform: "rotate(-14deg)",
          filter: "drop-shadow(1px 3px 5px rgba(0,0,0,0.2))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      <img
        src="/s-star-pink.png"
        alt=""
        aria-hidden
        width={112}
        style={{
          position: "absolute",
          bottom: 120,
          right: 110,
          zIndex: 5,
          filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Heart button — row 1 right gap (next to 2002 row) */}
      <img
        src="/s-button-heart.png"
        alt=""
        aria-hidden
        width={108}
        style={{
          position: "absolute",
          top: 280,
          right: 220,
          zIndex: 5,
          transform: "rotate(-14deg)",
          filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Flower — row 2 left gap (next to 2008 row) */}
      <img
        src="/s-flower.png"
        alt=""
        aria-hidden
        width={132}
        style={{
          position: "absolute",
          top: 480,
          left: 240,
          zIndex: 5,
          transform: "rotate(10deg)",
          filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.15))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Glass heart — row 3 right gap (next to 2014 row) */}
      <img
        src="/s-heart.png"
        alt=""
        aria-hidden
        width={120}
        style={{
          position: "absolute",
          top: 720,
          right: 240,
          zIndex: 5,
          transform: "rotate(-8deg)",
          filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Cursor — row 4 left gap (next to 2020 row) */}
      <img
        src="/s-cursor.png"
        alt=""
        aria-hidden
        width={104}
        style={{
          position: "absolute",
          top: 940,
          left: 260,
          zIndex: 5,
          transform: "rotate(-12deg)",
          filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* 3D iridescent star — row 5 right gap (next to 2022 row) */}
      <img
        src="/s-star3d.png"
        alt=""
        aria-hidden
        width={138}
        style={{
          position: "absolute",
          top: 1180,
          right: 240,
          zIndex: 5,
          transform: "rotate(16deg)",
          filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Card sticker — heading right gap */}
      <img
        src="/s-card.png"
        alt=""
        aria-hidden
        width={130}
        style={{
          position: "absolute",
          top: 30,
          left: 80,
          zIndex: 5,
          transform: "rotate(-18deg)",
          filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* ── Kawaii kitty stickers, one near each life-moment row ── */}
      {/* Pink tulips — alongside the "started school · 2008" row */}
      <img
        src="/sticker-1.png"
        alt=""
        aria-hidden
        width={142}
        style={{
          position: "absolute",
          top: 540,
          right: 170,
          zIndex: 6,
          transform: "rotate(10deg)",
          filter: "drop-shadow(2px 5px 9px rgba(0,0,0,0.2))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Kitty on scooter — alongside the "middle school · 2014" row */}
      <img
        src="/sticker-7.png"
        alt=""
        aria-hidden
        width={172}
        style={{
          position: "absolute",
          top: 770,
          left: 200,
          zIndex: 6,
          transform: "rotate(-6deg)",
          filter: "drop-shadow(2px 6px 10px rgba(0,0,0,0.22))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Kitty + flower bouquet — alongside the "graduated · 2020" row */}
      <img
        src="/sticker-5.png"
        alt=""
        aria-hidden
        width={168}
        style={{
          position: "absolute",
          top: 1000,
          right: 190,
          zIndex: 6,
          transform: "rotate(8deg)",
          filter: "drop-shadow(2px 6px 10px rgba(0,0,0,0.22))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Kitty in car — alongside the "started uni · 2022" row */}
      <img
        src="/sticker-6.png"
        alt=""
        aria-hidden
        width={170}
        style={{
          position: "absolute",
          top: 1240,
          left: 190,
          zIndex: 6,
          transform: "rotate(-10deg)",
          filter: "drop-shadow(2px 6px 10px rgba(0,0,0,0.22))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Red rose bouquet — celebrating the NOW pennant */}
      <img
        src="/sticker-2.png"
        alt=""
        aria-hidden
        width={118}
        style={{
          position: "absolute",
          bottom: 70,
          right: 360,
          zIndex: 6,
          transform: "rotate(14deg)",
          filter: "drop-shadow(2px 5px 9px rgba(0,0,0,0.2))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Single sakura flower — small accent up near the heading */}
      <img
        src="/sticker-4.png"
        alt=""
        aria-hidden
        width={82}
        style={{
          position: "absolute",
          top: 60,
          right: 260,
          zIndex: 6,
          transform: "rotate(-22deg)",
          filter: "drop-shadow(1px 3px 6px rgba(0,0,0,0.15))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* eslint-enable @next/next/no-img-element */}

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div
          style={{
            fontFamily: '"Courier Prime", monospace',
            fontSize: 13,
            letterSpacing: 6,
            color: navy,
            opacity: 0.6,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          ― chapter four · the years ―
        </div>
        <div style={{ display: "inline-block" }}>
          <RansomText text="MY YEARS" size={56} palette={palette} />
        </div>
        <div
          style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 22,
            color: navy,
            marginTop: 10,
            opacity: 0.85,
          }}
        >
          ~ a little life, plotted out ~
        </div>
      </div>

      <div style={{ maxWidth: 1500, margin: "0 auto", position: "relative" }}>
        {/* Squiggly backbone */}
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 200 1000"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 200,
            height: "100%",
            transform: "translateX(-50%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <path
            d="M 100 10 Q 70 120 100 240 T 100 480 T 100 720 T 100 960 T 100 990"
            fill="none"
            stroke={accent}
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M 100 10 Q 70 120 100 240 T 100 480 T 100 720 T 100 960 T 100 990"
            fill="none"
            stroke={navy}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 4"
            opacity="0.7"
          />
        </svg>

        {/* Confetti */}
        <ConfettiSticker
          kind="star"
          top={80}
          left="44%"
          rotate={20}
          size={26}
          color="#fcd86a"
        />
        <ConfettiSticker
          kind="sparkle"
          top={180}
          left="58%"
          rotate={-15}
          size={22}
          color={accent}
        />
        <ConfettiSticker
          kind="heart"
          top={320}
          left="42%"
          rotate={-10}
          size={22}
          color={denim}
        />
        <ConfettiSticker
          kind="dot"
          top={420}
          left="58%"
          rotate={0}
          size={14}
          color="#a8d68a"
        />
        <ConfettiSticker
          kind="squiggle"
          top={530}
          left="42%"
          rotate={10}
          size={28}
          color={denim}
        />
        <ConfettiSticker
          kind="flower"
          top={680}
          left="58%"
          rotate={15}
          size={24}
          color={accent}
        />
        <ConfettiSticker
          kind="star"
          top={830}
          left="42%"
          rotate={-12}
          size={22}
          color="#fcd86a"
        />
        <ConfettiSticker
          kind="heart"
          top={920}
          left="58%"
          rotate={20}
          size={22}
          color={denim}
        />

        <div
          role="list"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {timelineEntries.map((entry, i) => (
            <TimelineRow
              key={entry.year}
              entry={entry}
              side={i % 2 === 0 ? "left" : "right"}
            />
          ))}

          {/* Back-home button — caps off the timeline */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 36,
              position: "relative",
              zIndex: 3,
            }}
          >
            <Link
              href="/"
              className="scrap-tilt"
              style={{
                background: cream,
                padding: "16px 36px",
                borderRadius: 999,
                border: `2px solid ${navy}`,
                transform: "rotate(-2deg)",
                boxShadow: "4px 6px 14px rgba(0,0,0,0.18)",
                fontFamily: '"Caveat", cursive',
                fontWeight: 700,
                fontSize: 30,
                color: navy,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 26 }}>←</span>
              <span>back home</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
