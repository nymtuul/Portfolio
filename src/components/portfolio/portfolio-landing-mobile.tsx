import type { CSSProperties, ReactNode } from "react";
import { palette } from "@/lib/palette";
import { textures } from "@/lib/textures";
import { content } from "./content";
import { FloatingSticker } from "@/components/location/floating-sticker";
import { MobileFrame } from "@/components/mobile-frame";
import { DoodleArrow } from "./primitives/doodle-arrow";
import { HandNote } from "./primitives/hand-note";
import { Photo } from "./primitives/photo";
import { RansomText } from "./primitives/ransom-text";
import { StarSticker } from "./primitives/star-sticker";
import { Tape } from "./primitives/tape";
import { TornPaper } from "./primitives/torn-paper";

/* eslint-disable @next/next/no-img-element */

function Flutter({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <div className="flutter" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const stickerStyle: CSSProperties = {
  position: "absolute",
  filter: "drop-shadow(1px 3px 5px rgba(0,0,0,0.18))",
  pointerEvents: "none",
  userSelect: "none",
};

/** Ransom-note words that never break in the middle. */
function RansomWords({ text, size }: { text: string; size: number }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: size * 0.35 }}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ whiteSpace: "nowrap" }}>
          <RansomText text={w} size={size} palette={palette} />
        </span>
      ))}
    </div>
  );
}

function Polaroid({
  index,
  rotate,
  style,
}: {
  index: 0 | 1;
  rotate: number;
  style: CSSProperties;
}) {
  const p = content.polaroids[index];
  return (
    <div
      style={{
        position: "absolute",
        width: 158,
        background: "#faf3e0",
        padding: "11px 11px 10px",
        transform: `rotate(${rotate}deg)`,
        boxShadow: "4px 7px 14px rgba(0,0,0,0.28)",
        ...style,
      }}
    >
      <div style={{ width: "100%", height: 150 }}>
        <Photo
          src={p.src}
          alt={p.label}
          placeholderLabel={p.label}
          placeholderStripe={palette.accent}
        />
      </div>
      <HandNote
        size={18}
        style={{ marginTop: 6, color: palette.navy, textAlign: "center" }}
      >
        {p.caption}
      </HandNote>
    </div>
  );
}

export function PortfolioLandingMobile() {
  const { accent, denim, navy, cream, wall } = palette;

  return (
    <MobileFrame style={{ backgroundColor: wall }}>
      <div style={{ position: "relative", height: 1400 }}>
        {/* corner sparkle */}
        <img src="/s-sparkle.png" alt="" aria-hidden width={74}
          style={{ ...stickerStyle, top: 14, left: 6, zIndex: 26 }} />

        {/* pressed-flower note */}
        <Flutter delay={80}>
          <div
            style={{
              position: "absolute",
              right: -18,
              top: 18,
              width: 250,
              transform: "rotate(5deg)",
              filter: "drop-shadow(4px 8px 12px rgba(0,0,0,0.18))",
              zIndex: 6,
            }}
          >
            <img src="/image.png" alt="" aria-hidden
              style={{ width: "100%", height: "auto", display: "block", pointerEvents: "none" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                padding: "34px 70px 54px 46px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                transform: "rotate(-2deg)",
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 15,
                lineHeight: 1.3,
                color: navy,
                whiteSpace: "pre-line",
              }}
            >
              {content.pressed.body}
            </div>
          </div>
        </Flutter>

        <div
          style={{
            position: "absolute",
            top: 92,
            left: 20,
            fontFamily: "var(--font-courier), monospace",
            fontSize: 10,
            letterSpacing: 2,
            color: navy,
            opacity: 0.7,
            textTransform: "uppercase",
            width: 130,
            lineHeight: 1.5,
            zIndex: 7,
          }}
        >
          page no. 1 / portfolio · 2026
        </div>

        {/* gingham base */}
        <Flutter delay={0}>
          <TornPaper
            width={356}
            height={760}
            background={textures.gingham(accent)}
            rotate={1.5}
            roughness={10}
            style={{ left: 3, top: 172 }}
            zIndex={2}
            hoverable={false}
          />
        </Flutter>

        {/* main grid page */}
        <Flutter delay={160}>
          <TornPaper
            width={322}
            height={712}
            background={textures.grid(denim, 22)}
            rotate={-1.5}
            roughness={8}
            style={{ left: 20, top: 196 }}
            zIndex={5}
            innerStyle={{ padding: "40px 26px 24px", position: "relative" }}
            hoverable={false}
          >
            <div style={{ marginBottom: 14 }}>
              <RansomWords text={content.ransomLine1} size={46} />
              <div style={{ height: 6 }} />
              <RansomWords text={content.ransomLine2} size={36} />
            </div>

            <HandNote size={24} rotate={-1.5} style={{ color: navy, marginBottom: 16 }}>
              {content.subtitle}
            </HandNote>

            <div
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 20,
                color: navy,
                lineHeight: 1.45,
                position: "relative",
                zIndex: 4,
              }}
            >
              {content.body.line1}{" "}
              <span style={{ background: "#a8b8d855", padding: "0 4px" }}>
                {content.body.highlight}
              </span>{" "}
              {content.body.line2} {content.body.line3}
            </div>

            <FloatingSticker
              src="/nymtuul.png"
              fallbackSrc="/nymtuul-placeholder.svg"
              alt="Nymtuul"
              className="select-none"
              style={{
                position: "absolute",
                bottom: 4,
                right: -6,
                height: 280,
                width: "auto",
                pointerEvents: "none",
                zIndex: 3,
              }}
            />
            <HandNote
              size={22}
              rotate={-6}
              style={{ position: "absolute", left: 34, bottom: 92, color: navy, zIndex: 4 }}
            >
              that&apos;s me ~
            </HandNote>
            <DoodleArrow
              rotate={-40}
              color={navy}
              style={{ position: "absolute", left: 92, bottom: 44, zIndex: 4 }}
            />
          </TornPaper>
        </Flutter>

        <Tape top={186} left={70} width={110} height={26} rotate={-5}
          pattern="striped" color="rgba(168,184,216,0.85)" zIndex={20} />
        <Tape top={190} left={240} width={100} height={26} rotate={4}
          pattern="dotted" color="rgba(168,184,216,0.85)" zIndex={20} />

        <img src="/s-star-pink.png" alt="" aria-hidden width={70}
          style={{ ...stickerStyle, top: 148, left: 170, zIndex: 26 }} />
        <StarSticker size={64} color={navy} rotate={-22}
          style={{ position: "absolute", top: 780, left: -6, zIndex: 25 }} />
        <img src="/s-spiral.png" alt="" aria-hidden width={70}
          style={{ ...stickerStyle, top: 700, left: 2, zIndex: 25, mixBlendMode: "multiply" }} />

        {/* polaroids */}
        <Flutter delay={320}>
          <Polaroid index={0} rotate={-7} style={{ top: 930, left: 18, zIndex: 8 }} />
        </Flutter>
        <Flutter delay={440}>
          <Polaroid index={1} rotate={6} style={{ top: 958, left: 206, zIndex: 8 }} />
        </Flutter>
        <Tape top={922} left={60} width={80} height={22} rotate={-14}
          pattern="plain" color="rgba(244,234,216,0.9)" zIndex={25} />
        <Tape top={950} left={252} width={80} height={22} rotate={10}
          pattern="plain" color="rgba(244,234,216,0.9)" zIndex={25} />

        <img src="/s-heart.png" alt="" aria-hidden width={92}
          style={{ ...stickerStyle, top: 1140, left: 150, zIndex: 26 }} />

        {/* contact card */}
        <Flutter delay={600}>
          <TornPaper
            width={286}
            height={160}
            background={textures.lined(accent)}
            rotate={-3}
            roughness={7}
            style={{ left: 40, top: 1196 }}
            zIndex={7}
            hoverable={false}
            innerStyle={{ padding: "22px 22px 16px" }}
          >
            <HandNote size={24} style={{ color: navy, marginBottom: 4 }}>
              {content.contact.title}
            </HandNote>
            <div
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 19,
                color: navy,
                lineHeight: 1.55,
              }}
            >
              ✉ &nbsp; {content.contact.email}
              <br />✶ &nbsp; {content.contact.instagram}
              <br />✦ &nbsp; {content.contact.resume}
            </div>
          </TornPaper>
        </Flutter>
        <Tape top={1186} left={150} width={90} height={22} rotate={-6}
          pattern="dotted" color="rgba(168,184,216,0.85)" zIndex={25} />
        <StarSticker size={56} color={cream} rotate={18}
          style={{ position: "absolute", top: 1170, left: 318, zIndex: 25 }} />

        <HandNote size={18}
          style={{ position: "absolute", bottom: 6, left: 0, right: 0, textAlign: "center", color: navy, opacity: 0.7 }}>
          {content.pageNumber}
        </HandNote>
      </div>
    </MobileFrame>
  );
}
