"use client";

import { useState, useCallback, useId, useRef, useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { palette } from "@/lib/palette";
import { RansomText } from "./primitives/ransom-text";
import { MobileFrame } from "@/components/mobile-frame";

const PAGE_YELLOW = "#ffffff";

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const { denim, navy, wall, cream } = palette;

const diaryEntries = [
  {
    date: "apr · 22 · 2026",
    weekday: "wednesday",
    mood: "☕",
    weather: "🌤",
    title: "a quiet morning",
    body: `slept in until eight which is late for me.\nmade coffee, burnt the toast, decided\nthat was a sign to go outside instead.\n\nwalked to the river. the light was doing\nthat thing where everything looks soft\nand a little gold. i forget how much\ni like april.\n\nstarted a new sketchbook. didn't\nknow what to draw so i drew the\ncoffee cup again. always the cup.`,
    photoLabel: "morning · 7:42am",
    photo: "/nymtuul-1.png",
    song: {
      title: "Horon sanaatai Nymtuul",
      artist: "beabadoobee",
      src: "/songs/song-1.mp3",
    },
  },
  {
    date: "apr · 28 · 2026",
    weekday: "tuesday",
    mood: "✨",
    weather: "☀",
    title: "studio day",
    body: `cleaned the desk, finally. found three\npens i thought i lost and a receipt\nfrom february (kept it).\n\nworked on the zine layout for hours.\nit's not where i want it yet but it's\ncloser. i think the cover wants to\nbe blue. or pink. or both.\n\nate dinner standing at the counter\nlike a feral creature. it was great.`,
    photoLabel: "desk after",
    photo: "/nymtuul-2.png",
    song: {
      title: "Sweet",
      artist: "Cigarettes After Sex",
      src: "/songs/song-2.mp3",
    },
  },
  {
    date: "may · 03 · 2026",
    weekday: "sunday",
    mood: "🌷",
    weather: "🌧",
    title: "rain & reading",
    body: `it rained all day. didn't fight it.\nmade a pot of tea, put on the\nslowest record i own, read.\n\nfinished the book i've been carrying\naround for weeks. cried a little at\nthe end which was embarrassing\nbut nobody saw.\n\nwrote a letter i won't send. it's\nin the drawer with the others.`,
    photoLabel: "window seat",
    photo: "/nymtuul.png",
    song: {
      title: "You're On Your Own, Kid",
      artist: "Taylor Swift",
      src: "/songs/song-3.mp3",
    },
  },
  {
    date: "may · 11 · 2026",
    weekday: "monday",
    mood: "🍓",
    weather: "🌤",
    title: "small things",
    body: `bought strawberries from the market.\nthe woman who sells them remembered\nme this time which felt like a gift.\n\nclass was long. came home, ate the\nstrawberries one by one over the sink.\nthought about how the small things\nare doing all the heavy lifting lately.\n\nmaking a list of small good things\nfor the next bad day. tucking it here.`,
    photoLabel: "strawberries",
    photo: "/nymtuul-map.png",
    song: {
      title: "Strawberry Blond",
      artist: "Mitski",
      src: "/songs/song-4.mp3",
    },
  },
];

type Song = (typeof diaryEntries)[number]["song"];

const PINK_DEEP = "#e77fae";
const PINK_MID = "#f4a8c2";
const PINK_LIGHT = "#fbd2e2";
const PINK_PALE = "#fde8f0";

/* ────────────────────────────────────────────────────────────
   Scrapbook decorations — all inline SVG so they're crisp & themed
   ──────────────────────────────────────────────────────────── */

function EyeletLace({
  height = 700,
  style,
}: {
  height?: number;
  style?: CSSProperties;
}) {
  // Vertical pink eyelet lace ribbon — sits down the binding side of the left page.
  const id = useId();
  const rows = Math.floor(height / 28);
  return (
    <svg viewBox={`0 0 70 ${height}`} width={70} height={height} style={style}>
      <defs>
        <pattern
          id={`${id}-weave`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect width="6" height="6" fill={PINK_LIGHT} />
          <path
            d="M0 3 L6 3 M3 0 L3 6"
            stroke="#fff"
            strokeOpacity="0.7"
            strokeWidth="0.4"
          />
        </pattern>
      </defs>
      {/* main fabric */}
      <path
        d={`M 0 0 L 58 0 L 62 ${height} L 0 ${height} Z`}
        fill={`url(#${id}-weave)`}
      />
      {/* scalloped right edge */}
      {Array.from({ length: rows }, (_, i) => (
        <g key={i}>
          <circle cx="58" cy={14 + i * 28} r="9" fill={PINK_LIGHT} />
          <circle cx="58" cy={14 + i * 28} r="4" fill="#fff" />
          <circle
            cx="58"
            cy={14 + i * 28}
            r="3.2"
            fill="none"
            stroke={PINK_MID}
            strokeWidth="0.6"
          />
        </g>
      ))}
      {/* eyelet holes along left strip */}
      {Array.from({ length: rows }, (_, i) => (
        <g key={`e${i}`}>
          <circle cx="14" cy={14 + i * 28} r="3" fill="#fff" />
          <circle
            cx="14"
            cy={14 + i * 28}
            r="3"
            fill="none"
            stroke={PINK_DEEP}
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        </g>
      ))}
      {/* delicate stitch line */}
      <path
        d={`M 28 8 L 30 ${height - 8}`}
        stroke={PINK_DEEP}
        strokeOpacity="0.35"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        fill="none"
      />
    </svg>
  );
}

function CluelessSticker({ style }: { style?: CSSProperties }) {
  // Pink oval sticker with the word "Clueless" — placed vertically on the lace strip.
  return (
    <svg viewBox="0 0 64 160" width={64} height={160} style={style}>
      <defs>
        <radialGradient id="clue-fill" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff9bc4" />
          <stop offset="100%" stopColor="#d35a8b" />
        </radialGradient>
      </defs>
      <ellipse
        cx="32"
        cy="80"
        rx="26"
        ry="74"
        fill="url(#clue-fill)"
        stroke="#fff"
        strokeWidth="3"
      />
      <ellipse
        cx="32"
        cy="80"
        rx="22"
        ry="70"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <text
        x="32"
        y="86"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#fff"
        transform="rotate(-90 32 80)"
        style={{ fontFamily: "var(--font-caveat), cursive", letterSpacing: 1 }}
      >
        Nymtuul
      </text>
      <ellipse cx="22" cy="40" rx="6" ry="14" fill="#fff" fillOpacity="0.35" />
    </svg>
  );
}

function MiniCassette({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 70 48" width={70} height={48} style={style}>
      <rect
        x="2"
        y="2"
        width="66"
        height="44"
        rx="4"
        fill={PINK_DEEP}
        stroke="#9c3f70"
        strokeWidth="1"
      />
      <rect x="8" y="10" width="54" height="20" rx="2" fill="#fff" />
      <circle cx="22" cy="20" r="5" fill={PINK_DEEP} />
      <circle cx="48" cy="20" r="5" fill={PINK_DEEP} />
      <circle cx="22" cy="20" r="2" fill="#fff" />
      <circle cx="48" cy="20" r="2" fill="#fff" />
      <rect
        x="10"
        y="35"
        width="50"
        height="3"
        rx="1"
        fill="#9c3f70"
        opacity="0.5"
      />
      <text
        x="35"
        y="44"
        textAnchor="middle"
        fontSize="6"
        fill="#fff"
        style={{ fontFamily: "var(--font-courier), monospace" }}
      >
        MIX 04
      </text>
    </svg>
  );
}

function DaisyFlower({
  size = 70,
  style,
}: {
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 70 70" width={size} height={size} style={style}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse
          key={a}
          cx="35"
          cy="14"
          rx="7"
          ry="14"
          fill={PINK_LIGHT}
          stroke={PINK_DEEP}
          strokeWidth="0.6"
          transform={`rotate(${a} 35 35)`}
        />
      ))}
      <circle
        cx="35"
        cy="35"
        r="9"
        fill="#ffd84a"
        stroke="#e6a615"
        strokeWidth="1"
      />
      <circle cx="32" cy="32" r="3" fill="#fff5a8" />
    </svg>
  );
}

function MusicNotes({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 80" width={100} height={80} style={style}>
      <g fill={PINK_DEEP} stroke="#9c3f70" strokeWidth="0.8">
        <ellipse cx="22" cy="58" rx="9" ry="7" transform="rotate(-18 22 58)" />
        <rect x="29" y="18" width="3" height="42" rx="1" />
        <path d="M 32 18 Q 50 22 50 38 Q 50 28 32 30 Z" />
      </g>
      <g fill={PINK_MID} stroke="#9c3f70" strokeWidth="0.8">
        <ellipse cx="64" cy="46" rx="8" ry="6" transform="rotate(-15 64 46)" />
        <rect x="70" y="14" width="3" height="34" rx="1" />
        <ellipse cx="86" cy="22" rx="8" ry="6" transform="rotate(-15 86 22)" />
        <rect x="92" y="2" width="3" height="22" rx="1" />
        <path d="M 73 14 L 95 4 L 95 12 L 73 22 Z" />
      </g>
    </svg>
  );
}

function CrumpledPaper({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 180 200" width={180} height={200} style={style}>
      <defs>
        <linearGradient id="crumple-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PINK_LIGHT} />
          <stop offset="50%" stopColor={PINK_PALE} />
          <stop offset="100%" stopColor={PINK_MID} />
        </linearGradient>
      </defs>
      <path
        d="M 8 14 Q 20 8 50 12 Q 90 6 130 16 Q 170 22 168 70 Q 178 120 162 170 Q 130 200 80 188 Q 30 198 12 158 Q 2 100 14 60 Q 4 30 8 14 Z"
        fill="url(#crumple-bg)"
        stroke={PINK_DEEP}
        strokeOpacity="0.3"
        strokeWidth="0.8"
      />
      {/* crumple creases */}
      <g stroke={PINK_DEEP} strokeOpacity="0.25" strokeWidth="0.7" fill="none">
        <path d="M 30 20 Q 50 60 40 110 Q 30 150 60 180" />
        <path d="M 70 12 Q 100 50 80 90 Q 70 130 90 170" />
        <path d="M 120 18 Q 110 70 140 100 Q 130 140 110 180" />
        <path d="M 14 80 Q 60 90 100 80 Q 140 70 168 90" />
        <path d="M 20 130 Q 70 120 110 130 Q 150 140 165 120" />
      </g>
      {/* highlight folds */}
      <g stroke="#fff" strokeOpacity="0.5" strokeWidth="0.6" fill="none">
        <path d="M 32 24 Q 52 64 42 114" />
        <path d="M 72 16 Q 102 54 82 94" />
        <path d="M 18 84 Q 64 94 104 84" />
      </g>
    </svg>
  );
}

function MusicPlayerCard({
  style,
  song,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: {
  style?: CSSProperties;
  song: Song;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [missing, setMissing] = useState(false);

  // Switch to the new song and autoplay it (browser may block until first user gesture)
  useEffect(() => {
    setCurrent(0);
    setMissing(false);
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    a.load();
    // Desktop and phone layouts both exist in the DOM; only the visible
    // player may autoplay, otherwise the song would play twice.
    if (!rootRef.current || rootRef.current.offsetParent === null) return;
    const playPromise = a.play();
    if (playPromise) {
      playPromise
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [song.src]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const a = audioRef.current;
      if (!a || missing) return;
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        a.play()
          .then(() => setPlaying(true))
          .catch(() => setMissing(true));
      }
    },
    [playing, missing],
  );

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const a = audioRef.current;
      if (!a || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      a.currentTime = Math.max(0, Math.min(duration, ratio * duration));
    },
    [duration],
  );

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div
      ref={rootRef}
      style={{
        width: 180,
        background: "#fff",
        border: `1.2px solid ${PINK_MID}`,
        borderRadius: 12,
        padding: "8px 10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        fontFamily: "var(--font-inter), sans-serif",
        ...style,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <audio
        ref={audioRef}
        src={song.src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onEnded={() => setPlaying(false)}
        onError={() => setMissing(true)}
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 6,
            background: PINK_LIGHT,
            border: `0.6px solid ${PINK_DEEP}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: PINK_DEEP,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#fff",
              }}
            />
          </div>
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 7, color: "#888" }}>
            {formatTime(current)}
          </div>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: "#333",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={song.title}
          >
            {song.title}
          </div>
          <div
            style={{
              fontSize: 7,
              color: "#999",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={song.artist}
          >
            {song.artist}
            {missing ? " · (no file)" : ""}
          </div>
        </div>
      </div>

      {/* progress */}
      <div
        onClick={seek}
        style={{
          marginTop: 6,
          height: 8,
          display: "flex",
          alignItems: "center",
          cursor: duration ? "pointer" : "default",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 3,
            borderRadius: 2,
            background: "#eee",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${progress}%`,
              background: PINK_DEEP,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${progress}%`,
              top: "50%",
              width: 7,
              height: 7,
              background: PINK_DEEP,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 6,
          color: "#aaa",
          marginTop: 2,
        }}
      >
        <span>{formatTime(current)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          marginTop: 4,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev?.();
          }}
          disabled={!canPrev}
          style={{
            background: "transparent",
            border: "none",
            cursor: canPrev ? "pointer" : "not-allowed",
            opacity: canPrev ? 1 : 0.35,
            color: "#444",
            fontSize: 12,
            lineHeight: 1,
            padding: 2,
          }}
          aria-label="previous song"
        >
          ⏮
        </button>
        <button
          onClick={toggle}
          disabled={missing}
          style={{
            background: "transparent",
            border: "none",
            cursor: missing ? "not-allowed" : "pointer",
            color: "#222",
            fontSize: 16,
            lineHeight: 1,
            padding: 2,
            opacity: missing ? 0.4 : 1,
          }}
          aria-label={playing ? "pause" : "play"}
        >
          {playing ? "⏸" : "▶"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
          }}
          disabled={!canNext}
          style={{
            background: "transparent",
            border: "none",
            cursor: canNext ? "pointer" : "not-allowed",
            opacity: canNext ? 1 : 0.35,
            color: "#444",
            fontSize: 12,
            lineHeight: 1,
            padding: 2,
          }}
          aria-label="next song"
        >
          ⏭
        </button>
      </div>
    </div>
  );
}

function GlitterSticker({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 80 30" width={80} height={30} style={style}>
      <defs>
        <linearGradient id="glit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff3a6e" />
          <stop offset="50%" stopColor="#ff7aa3" />
          <stop offset="100%" stopColor="#c81a4a" />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="6"
        width="80"
        height="18"
        rx="3"
        fill="url(#glit)"
        stroke="#fff"
        strokeWidth="1.5"
      />
      {/* glitter speckles */}
      {Array.from({ length: 22 }, (_, i) => (
        <circle
          key={i}
          cx={4 + ((i * 13) % 72)}
          cy={9 + (i % 4) * 4}
          r="0.7"
          fill="#fff"
          opacity={0.6 + ((i * 7) % 4) * 0.1}
        />
      ))}
      <text
        x="40"
        y="20"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-caveat), cursive" }}
        fontSize="14"
        fontWeight="700"
        fill="#fff"
      >
        love love
      </text>
    </svg>
  );
}

function PinkEnvelope({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 90 64" width={90} height={64} style={style}>
      <rect
        x="2"
        y="6"
        width="86"
        height="54"
        rx="3"
        fill="#fff"
        stroke={PINK_DEEP}
        strokeWidth="1.2"
      />
      <path
        d="M 2 6 L 45 38 L 88 6"
        stroke={PINK_DEEP}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M 2 60 L 36 32 M 88 60 L 54 32"
        stroke={PINK_DEEP}
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      {/* heart wax seal */}
      <path
        d="M 45 36 Q 36 28 36 22 Q 36 18 40 18 Q 43 18 45 22 Q 47 18 50 18 Q 54 18 54 22 Q 54 28 45 36 Z"
        fill={PINK_DEEP}
        stroke="#9c3f70"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function FrogPhotoCard({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 110 130" width={110} height={130} style={style}>
      <rect
        x="2"
        y="2"
        width="106"
        height="126"
        rx="4"
        fill="#fff"
        stroke={PINK_DEEP}
        strokeWidth="1.2"
      />
      <image
        href="/s-flower.png"
        x="8"
        y="8"
        width="94"
        height="114"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}

function BunnyPhotoCard({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 110 120" width={110} height={120} style={style}>
      <rect
        x="2"
        y="2"
        width="106"
        height="116"
        rx="4"
        fill={PINK_LIGHT}
        stroke={PINK_DEEP}
        strokeWidth="1.2"
      />
      <image
        href="/s-hamster.png"
        x="10"
        y="10"
        width="90"
        height="100"
        preserveAspectRatio="xMidYMid slice"
      />
      {/* tab corner */}
      <rect x="92" y="48" width="14" height="22" rx="2" fill={PINK_DEEP} />
    </svg>
  );
}

function PuffyHeart({
  size = 32,
  style,
}: {
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 36"
      width={size}
      height={size * (36 / 40)}
      style={style}
    >
      <defs>
        <radialGradient id={`ph-${size}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffd5e7" />
          <stop offset="60%" stopColor={PINK_DEEP} />
          <stop offset="100%" stopColor="#9c3f70" />
        </radialGradient>
      </defs>
      <path
        d="M 20 34 Q 2 22 2 12 Q 2 4 10 4 Q 16 4 20 10 Q 24 4 30 4 Q 38 4 38 12 Q 38 22 20 34 Z"
        fill={`url(#ph-${size})`}
        stroke="#9c3f70"
        strokeWidth="0.6"
      />
      <ellipse
        cx="13"
        cy="11"
        rx="4"
        ry="2.5"
        fill="#fff"
        fillOpacity="0.55"
        transform="rotate(-25 13 11)"
      />
    </svg>
  );
}

function PinkStar({
  size = 50,
  style,
}: {
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 50 50" width={size} height={size} style={style}>
      <defs>
        <linearGradient id={`pk-star-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffaad0" />
          <stop offset="100%" stopColor={PINK_DEEP} />
        </linearGradient>
      </defs>
      <path
        d="M 25 4 L 30 18 L 46 18 L 33 28 L 38 44 L 25 34 L 12 44 L 17 28 L 4 18 L 20 18 Z"
        fill={`url(#pk-star-${size})`}
        stroke="#9c3f70"
        strokeWidth="0.8"
      />
      <path
        d="M 22 14 L 28 22"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   Notebook page — white with VERTICAL pale-blue lines
   ──────────────────────────────────────────────────────────── */

function CoffeeStain({
  size = 100,
  top,
  left,
  opacity = 0.18,
  rotate = 0,
}: {
  size?: number;
  top: number;
  left: number;
  opacity?: number;
  rotate?: number;
}) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 140 140"
      width={size}
      height={size}
      style={{
        position: "absolute",
        top,
        left,
        opacity,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#b07a5a" stopOpacity="0" />
          <stop offset="82%" stopColor="#b07a5a" stopOpacity="0.55" />
          <stop offset="94%" stopColor="#7a4a2a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#b07a5a" stopOpacity="0.15" />
        </radialGradient>
      </defs>
      <path
        d="M 70 18 Q 110 22 118 60 Q 124 102 88 118 Q 50 128 28 100 Q 12 70 28 42 Q 44 18 70 18 Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

function PolaroidEntry({
  entry,
  rotate = -3,
}: {
  entry: (typeof diaryEntries)[0];
  rotate?: number;
}) {
  return (
    <div
      style={{
        width: 280,
        background: "#fffdf5",
        padding: "16px 16px 50px",
        transform: `rotate(${rotate}deg)`,
        boxShadow:
          "6px 10px 22px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)",
        position: "relative",
      }}
    >
      {/* washi tape on top */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          width: 110,
          height: 22,
          transform: "translateX(-50%) rotate(-3deg)",
          background: `repeating-linear-gradient(45deg, ${PINK_DEEP}cc, ${PINK_DEEP}cc 5px, ${PINK_PALE}cc 5px, ${PINK_PALE}cc 11px)`,
          clipPath: "polygon(3% 10%, 97% 0%, 100% 90%, 1% 100%)",
          boxShadow: "0 2px 5px rgba(0,0,0,0.18)",
        }}
      />
      <div
        style={{
          width: "100%",
          height: 260,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.photo}
          alt={entry.photoLabel}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: 'var(--font-caveat), cursive',
          fontSize: 22,
          color: navy,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {entry.weekday}
        <div style={{ fontSize: 15, opacity: 0.7 }}>{entry.date}</div>
      </div>
    </div>
  );
}

function DiarySpread({
  entry,
  side,
  index,
}: {
  entry: (typeof diaryEntries)[0];
  side: "left" | "right";
  index: number;
}) {
  const isLeft = side === "left";
  return (
    <div
      style={{
        width: 460,
        height: 600,
        // plain yellow pages — no lines, no paper texture
        background: `
        radial-gradient(ellipse at ${isLeft ? "100%" : "0%"} 50%, rgba(0,0,0,0.10) 0%, transparent 30%),
        ${PAGE_YELLOW}
      `,
        position: "relative",
        overflow: "hidden",
        boxShadow: isLeft
          ? "inset -10px 0 18px rgba(0,0,0,0.08)"
          : "inset 10px 0 18px rgba(0,0,0,0.08)",
        padding: "44px 40px",
      }}
    >
      {isLeft ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-courier), monospace',
              fontSize: 12,
              letterSpacing: 3,
              color: navy,
              textTransform: "uppercase",
              marginBottom: 26,
              textAlign: "center",
              opacity: 0.7,
            }}
          >
            ── {entry.date} · {entry.weather} {entry.mood} ──
          </div>

          <PolaroidEntry entry={entry} rotate={-4} />

          <CoffeeStain
            size={90}
            top={490}
            left={20}
            opacity={0.18}
            rotate={15}
          />
        </div>
      ) : (
        <div style={{ height: "100%", position: "relative", paddingLeft: 14 }}>
          <div
            style={{
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: 42,
              fontWeight: 700,
              color: navy,
              lineHeight: 1.1,
              marginBottom: 6,
            }}
          >
            {entry.title}
          </div>

          <div
            style={{
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: 20,
              color: denim,
              marginBottom: 20,
            }}
          >
            mood: {entry.mood} &nbsp;·&nbsp; weather: {entry.weather}
          </div>

          <div
            style={{
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: 20,
              color: navy,
              lineHeight: 1.55,
              whiteSpace: "pre-line",
              maxWidth: 380,
            }}
          >
            {entry.body}
          </div>

          {/* highlighter swipe */}
          <div
            style={{
              position: "absolute",
              top: 330,
              left: 40,
              width: 180,
              height: 20,
              background: `${PINK_DEEP}55`,
              transform: "rotate(-1deg) skewX(-4deg)",
              zIndex: -1,
              borderRadius: 2,
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 30,
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: 17,
              color: navy,
              opacity: 0.55,
            }}
          >
            ~ pg. {String(index * 2 + 4).padStart(2, "0")} ~
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Section
   ──────────────────────────────────────────────────────────── */

type FlipDir = "forward" | "backward";

function ScrapDeco({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        filter: "drop-shadow(2px 5px 6px rgba(0,0,0,0.18))",
        pointerEvents: "none",
        userSelect: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

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

  const jumpTo = useCallback(
    (i: number) => {
      if (flipping || i === page) return;
      setPendingPage(i);
      setFlipping(i > page ? "forward" : "backward");
    },
    [page, flipping],
  );

  const leftEntry =
    flipping === "backward" ? diaryEntries[pendingPage] : diaryEntries[page];
  const rightEntry =
    flipping === "forward" ? diaryEntries[pendingPage] : diaryEntries[page];
  const leftIndex = flipping === "backward" ? pendingPage : page;
  const rightIndex = flipping === "forward" ? pendingPage : page;

  const atStart = page === 0;
  const atEnd = page === diaryEntries.length - 1;

  return (
    <section
      style={{
        width: "100%",
        minHeight: 1200,
        position: "relative",
        padding: "120px 40px 120px",
        backgroundColor: wall,
      }}
    >
      {/* Section heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          position: "relative",
          zIndex: 3,
        }}
      >
        <div style={{ display: "inline-block" }}>
          <RansomText text="MEMEMEM" size={64} palette={palette} />
        </div>
      </div>

      {/* Notebook + scrapbook frame */}
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          position: "relative",
          perspective: "2000px",
        }}
      >
        {/* soft shadow under notebook */}
        <div
          style={{
            position: "absolute",
            inset: -30,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%)",
            filter: "blur(20px)",
            zIndex: 0,
          }}
        />

        {/* The flipping spread sits underneath the persistent scrapbook frame */}
        <div
          style={{
            display: "flex",
            position: "relative",
            zIndex: 1,
            borderRadius: 4,
            overflow: "visible",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            width: 920,
            margin: "0 auto",
          }}
        >
          {/* Spine shadow */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 30,
              transform: "translateX(-50%)",
              background:
                "linear-gradient(90deg, transparent, rgba(0,0,0,0.22) 50%, transparent)",
              zIndex: 5,
              pointerEvents: "none",
            }}
          />

          <DiarySpread entry={leftEntry} side="left" index={leftIndex} />
          <DiarySpread entry={rightEntry} side="right" index={rightIndex} />

          {/* Flip card overlay */}
          {flipping && (
            <div
              className={
                flipping === "forward"
                  ? "page-flip-forward"
                  : "page-flip-backward"
              }
              onAnimationEnd={handleFlipEnd}
              style={{
                position: "absolute",
                top: 0,
                left: flipping === "forward" ? 460 : 0,
                width: 460,
                height: 600,
                transformStyle: "preserve-3d",
                transformOrigin:
                  flipping === "forward" ? "left center" : "right center",
                zIndex: 10,
                willChange: "transform",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <DiarySpread
                  entry={diaryEntries[page]}
                  side={flipping === "forward" ? "right" : "left"}
                  index={page}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <DiarySpread
                  entry={diaryEntries[pendingPage]}
                  side={flipping === "forward" ? "left" : "right"}
                  index={pendingPage}
                />
              </div>
            </div>
          )}

          {/* ─────────── Persistent scrapbook frame: lace, bow, clip, stickers ─────────── */}
          {/* Eyelet lace down the LEFT edge of the left page */}
          <ScrapDeco style={{ top: -8, left: -28, zIndex: 20 }}>
            <EyeletLace height={616} />
          </ScrapDeco>

          {/* Mini cassette top-left */}
          <ScrapDeco
            style={{
              top: 18,
              left: 36,
              transform: "rotate(-14deg)",
              zIndex: 21,
            }}
          >
            <MiniCassette />
          </ScrapDeco>

          {/* Clueless oval on the lace */}
          <ScrapDeco style={{ top: 200, left: -52, zIndex: 22 }}>
            <CluelessSticker />
          </ScrapDeco>

          {/* Pink daisy near the clip */}
          <ScrapDeco
            style={{
              top: 240,
              right: 28,
              transform: "rotate(8deg)",
              zIndex: 21,
            }}
          >
            <DaisyFlower size={66} />
          </ScrapDeco>

          {/* Music notes — left page lower-middle */}
          <ScrapDeco
            style={{
              top: 360,
              left: 30,
              transform: "rotate(-8deg)",
              zIndex: 21,
            }}
          >
            <MusicNotes />
          </ScrapDeco>

          {/* Crumpled pink paper — bottom-left corner of the spread */}
          <ScrapDeco
            style={{
              bottom: -10,
              left: 36,
              transform: "rotate(-6deg)",
              zIndex: 18,
            }}
          >
            <CrumpledPaper />
          </ScrapDeco>

          {/* Music player card — overlapping crumpled paper */}
          <div
            style={{
              position: "absolute",
              bottom: 48,
              left: 8,
              transform: "rotate(-10deg)",
              zIndex: 21,
              filter: "drop-shadow(2px 5px 6px rgba(0,0,0,0.18))",
              pointerEvents: "auto",
            }}
          >
            <MusicPlayerCard
              song={diaryEntries[page].song}
              onPrev={handlePrev}
              onNext={handleNext}
              canPrev={!atStart && !flipping}
              canNext={!atEnd && !flipping}
            />
          </div>

          {/* Glitter sticker — below music player */}
          <ScrapDeco
            style={{
              bottom: 14,
              left: 78,
              transform: "rotate(-14deg)",
              zIndex: 22,
            }}
          >
            <GlitterSticker />
          </ScrapDeco>

          {/* Frog photo card — bottom-center */}
          <ScrapDeco
            style={{
              bottom: -16,
              left: "42%",
              transform: "translateX(-50%) rotate(6deg)",
              zIndex: 22,
            }}
          >
            <FrogPhotoCard />
          </ScrapDeco>

          {/* Pink envelope w/ heart seal — just left of frog */}
          <ScrapDeco
            style={{
              bottom: -8,
              left: "32%",
              transform: "rotate(-12deg)",
              zIndex: 21,
            }}
          >
            <PinkEnvelope />
          </ScrapDeco>

          {/* Bunny photo card — bottom-right */}
          <ScrapDeco
            style={{
              bottom: 30,
              right: 30,
              transform: "rotate(8deg)",
              zIndex: 22,
            }}
          >
            <BunnyPhotoCard />
          </ScrapDeco>

          {/* Pink star — between bunny and daisy */}
          <ScrapDeco
            style={{
              bottom: 160,
              right: 130,
              transform: "rotate(-12deg)",
              zIndex: 22,
            }}
          >
            <PinkStar size={48} />
          </ScrapDeco>

          {/* Puffy hearts — scattered on right side */}
          <ScrapDeco
            style={{
              top: 380,
              right: 90,
              transform: "rotate(15deg)",
              zIndex: 22,
            }}
          >
            <PuffyHeart size={30} />
          </ScrapDeco>
          <ScrapDeco
            style={{
              bottom: 140,
              right: 20,
              transform: "rotate(-20deg)",
              zIndex: 22,
            }}
          >
            <PuffyHeart size={26} />
          </ScrapDeco>

          {/* Kawaii kitty stickers — pasted across the diary spread */}
          {/* eslint-disable @next/next/no-img-element */}
          {/* Red rose bouquet — tucked at top-right of the spread */}
          <img
            src="/sticker-2.png"
            alt=""
            aria-hidden
            width={108}
            style={{
              position: "absolute",
              top: -32,
              right: 80,
              transform: "rotate(12deg)",
              zIndex: 23,
              filter: "drop-shadow(2px 5px 9px rgba(0,0,0,0.22))",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
          {/* Hello kitty + flower bouquet — over the right page */}
          <img
            src="/sticker-5.png"
            alt=""
            aria-hidden
            width={150}
            style={{
              position: "absolute",
              top: 60,
              right: -34,
              transform: "rotate(14deg)",
              zIndex: 23,
              filter: "drop-shadow(2px 6px 10px rgba(0,0,0,0.22))",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
          {/* Hello kitty on scooter — bottom-right corner */}
          <img
            src="/sticker-7.png"
            alt=""
            aria-hidden
            width={130}
            style={{
              position: "absolute",
              bottom: -28,
              right: -18,
              transform: "rotate(-8deg)",
              zIndex: 23,
              filter: "drop-shadow(2px 5px 9px rgba(0,0,0,0.22))",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
          {/* eslint-enable @next/next/no-img-element */}
        </div>

        {/* Nav arrows */}
        <button
          onClick={handlePrev}
          disabled={atStart || !!flipping}
          style={{
            position: "absolute",
            left: -10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: atStart ? "#e8e0d4" : "#fff",
            border: `2px solid ${navy}`,
            cursor: atStart || flipping ? "not-allowed" : "pointer",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 22,
            fontWeight: 600,
            color: navy,
            boxShadow: "2px 4px 10px rgba(0,0,0,0.18)",
            opacity: atStart ? 0.5 : 1,
            transition: "all 200ms ease",
            zIndex: 30,
          }}
        >
          ←
        </button>

        <button
          onClick={handleNext}
          disabled={atEnd || !!flipping}
          style={{
            position: "absolute",
            right: -10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: atEnd ? "#e8e0d4" : "#fff",
            border: `2px solid ${navy}`,
            cursor: atEnd || flipping ? "not-allowed" : "pointer",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 22,
            fontWeight: 600,
            color: navy,
            boxShadow: "2px 4px 10px rgba(0,0,0,0.18)",
            opacity: atEnd ? 0.5 : 1,
            transition: "all 200ms ease",
            zIndex: 30,
          }}
        >
          →
        </button>

        {/* Page indicator dots */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 60,
            position: "relative",
            zIndex: 5,
          }}
        >
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

        {/* Uni-life button — sits right under the dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 36,
            position: "relative",
            zIndex: 5,
          }}
        >
          <Link
            href="/uni"
            className="scrap-tilt"
            style={{
              background: cream,
              padding: "12px 26px",
              borderRadius: 999,
              border: `2px solid ${navy}`,
              transform: "rotate(-2deg)",
              boxShadow: "3px 5px 12px rgba(0,0,0,0.15)",
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: 24,
              fontWeight: 600,
              color: navy,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>uni life</span>
            <span style={{ fontSize: 20 }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   Phone layout — one tall page per entry, swipe or tap to turn
   ───────────────────────────────────────────────── */

export function DiarySectionMobile() {
  const [page, setPage] = useState(0);
  const touchX = useRef<number | null>(null);
  const entry = diaryEntries[page];
  const atStart = page === 0;
  const atEnd = page === diaryEntries.length - 1;

  const go = useCallback((i: number) => {
    setPage(Math.max(0, Math.min(diaryEntries.length - 1, i)));
  }, []);

  const arrowStyle = (disabled: boolean): CSSProperties => ({
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: disabled ? "#e8e0d4" : "#fff",
    border: `2px solid ${navy}`,
    fontSize: 20,
    fontWeight: 600,
    color: navy,
    boxShadow: "2px 4px 10px rgba(0,0,0,0.15)",
    opacity: disabled ? 0.5 : 1,
    flexShrink: 0,
  });

  return (
    <MobileFrame style={{ backgroundColor: wall }}>
      <section style={{ padding: "56px 0 70px", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <RansomText text="MEMEMEM" size={40} palette={palette} />
        </div>

        {/* the page */}
        <div
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (dx < -50) go(page + 1);
            else if (dx > 50) go(page - 1);
          }}
          style={{
            position: "relative",
            width: 340,
            margin: "0 auto 0 30px",
            background: PAGE_YELLOW,
            boxShadow: "0 16px 40px rgba(0,0,0,0.2), inset 10px 0 18px rgba(0,0,0,0.06)",
            borderRadius: 4,
            minHeight: 820,
          }}
        >
          <div style={{ position: "absolute", top: -8, bottom: -8, left: -36, width: 70, overflow: "hidden", zIndex: 20, pointerEvents: "none" }}>
            <EyeletLace height={1400} />
          </div>

          <div key={page} className="page-fade" style={{ padding: "34px 22px 40px 34px" }}>
            <div
              style={{
                fontFamily: "var(--font-courier), monospace",
                fontSize: 11,
                letterSpacing: 2,
                color: navy,
                textTransform: "uppercase",
                textAlign: "center",
                opacity: 0.7,
                marginBottom: 22,
              }}
            >
              ── {entry.date} · {entry.weather} {entry.mood} ──
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
              <PolaroidEntry entry={entry} rotate={-3} />
            </div>

            <div
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 38,
                fontWeight: 700,
                color: navy,
                lineHeight: 1.05,
                marginBottom: 4,
              }}
            >
              {entry.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 19,
                color: denim,
                marginBottom: 14,
              }}
            >
              mood: {entry.mood} &nbsp;·&nbsp; weather: {entry.weather}
            </div>
            <div
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 20,
                color: navy,
                lineHeight: 1.5,
                whiteSpace: "pre-line",
              }}
            >
              {entry.body.replace(/(?<!\n)\n(?!\n)/g, " ")}
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: 18,
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 16,
                color: navy,
                opacity: 0.55,
              }}
            >
              ~ pg. {String(page * 2 + 4).padStart(2, "0")} ~
            </div>
          </div>

          {/* stickers */}
          {/* eslint-disable @next/next/no-img-element */}
          <img src="/sticker-2.png" alt="" aria-hidden width={78}
            style={{ position: "absolute", top: -26, right: -8, transform: "rotate(12deg)", zIndex: 23, pointerEvents: "none", filter: "drop-shadow(2px 5px 8px rgba(0,0,0,0.2))" }} />
          <img src="/sticker-5.png" alt="" aria-hidden width={92}
            style={{ position: "absolute", top: 300, right: -22, transform: "rotate(14deg)", zIndex: 23, pointerEvents: "none", filter: "drop-shadow(2px 5px 8px rgba(0,0,0,0.2))" }} />
          <img src="/sticker-7.png" alt="" aria-hidden width={86}
            style={{ position: "absolute", bottom: -24, right: -12, transform: "rotate(-8deg)", zIndex: 23, pointerEvents: "none", filter: "drop-shadow(2px 5px 8px rgba(0,0,0,0.2))" }} />
          {/* eslint-enable @next/next/no-img-element */}
          <ScrapDeco style={{ top: 14, left: 18, transform: "rotate(-14deg) scale(0.7)", transformOrigin: "top left", zIndex: 21 }}>
            <MiniCassette />
          </ScrapDeco>
          <ScrapDeco style={{ top: 250, left: 10, transform: "rotate(8deg)", zIndex: 21 }}>
            <DaisyFlower size={44} />
          </ScrapDeco>
          <ScrapDeco style={{ bottom: 120, right: 16, transform: "rotate(15deg)", zIndex: 22 }}>
            <PuffyHeart size={24} />
          </ScrapDeco>
        </div>

        {/* player + navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            marginTop: 40,
          }}
        >
          <button onClick={() => go(page - 1)} disabled={atStart} style={arrowStyle(atStart)} aria-label="previous page">
            ←
          </button>
          <div style={{ transform: "rotate(-4deg)", filter: "drop-shadow(2px 5px 6px rgba(0,0,0,0.18))" }}>
            <MusicPlayerCard
              song={entry.song}
              onPrev={() => go(page - 1)}
              onNext={() => go(page + 1)}
              canPrev={!atStart}
              canNext={!atEnd}
            />
          </div>
          <button onClick={() => go(page + 1)} disabled={atEnd} style={arrowStyle(atEnd)} aria-label="next page">
            →
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 28 }}>
          {diaryEntries.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`page ${i + 1}`}
              style={{
                width: i === page ? 30 : 12,
                height: 12,
                borderRadius: 6,
                border: `1.5px solid ${navy}`,
                background: i === page ? navy : "transparent",
                padding: 0,
                transition: "all 250ms ease",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
          <Link
            href="/uni"
            style={{
              background: cream,
              padding: "12px 28px",
              borderRadius: 999,
              border: `2px solid ${navy}`,
              transform: "rotate(-2deg)",
              boxShadow: "3px 5px 12px rgba(0,0,0,0.15)",
              fontFamily: "var(--font-caveat), cursive",
              fontSize: 26,
              fontWeight: 600,
              color: navy,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>uni life</span>
            <span style={{ fontSize: 20 }}>→</span>
          </Link>
        </div>
      </section>
    </MobileFrame>
  );
}
