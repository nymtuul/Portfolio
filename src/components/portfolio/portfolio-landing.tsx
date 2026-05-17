import type { CSSProperties, ReactNode } from "react";
import { palette } from "@/lib/palette";
import { textures } from "@/lib/textures";
import { content } from "./content";
import { FloatingSticker } from "@/components/location/floating-sticker";
import { CursorTapeTrail } from "./cursor-tape-trail";
import { DoodleArrow } from "./primitives/doodle-arrow";
import { HandNote } from "./primitives/hand-note";
import { Photo } from "./primitives/photo";
import { RansomText } from "./primitives/ransom-text";
import { StarSticker } from "./primitives/star-sticker";
import { Tape } from "./primitives/tape";
import { TornPaper } from "./primitives/torn-paper";

function Flutter({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <div className="flutter" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function PortfolioLanding() {
  const { accent, denim, navy, cream, wall } = palette;

  return (
    <div className="canvas-frame">
      <div
        className="art-root"
        style={{
          width: 1440,
          height: 1024,
          position: "relative",
          overflow: "hidden",
          backgroundColor: wall,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Subtle paper-noise overlay (kept for tactile feel, low opacity so the wall reads as one color) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.6'/></svg>")`,
            opacity: 0.08,
            pointerEvents: "none",
          }}
        />

        {/* Big gingham base */}
        <Flutter delay={0}>
          <TornPaper
            width={920}
            height={820}
            background={textures.gingham(accent)}
            rotate={2}
            roughness={12}
            style={{ left: 260, top: 100 }}
            zIndex={2}
            hoverable={false}
          />
        </Flutter>

        {/* Center grid-paper page */}
        <Flutter delay={160}>
          <TornPaper
            width={780}
            height={680}
            background={textures.grid(denim, 26)}
            rotate={-2}
            roughness={10}
            style={{ left: 330, top: 180 }}
            zIndex={5}
            innerStyle={{ padding: "60px 70px", position: "relative" }}
            hoverable={false}
          >
            <div
              style={{
                fontFamily: '"Courier Prime", monospace',
                fontSize: 12,
                letterSpacing: 4,
                color: navy,
                textTransform: "uppercase",
                marginBottom: 24,
                opacity: 0.7,
              }}
            >
              {content.pageLabel}
            </div>

            <div style={{ marginBottom: 28 }}>
              <RansomText
                text={content.ransomLine1}
                size={68}
                palette={palette}
              />
              <div style={{ height: 12 }} />
              <RansomText
                text={content.ransomLine2}
                size={68}
                palette={palette}
              />
            </div>

            {/* Sticker tucked under the UUL letters of "I'M NYMTUUL". Position is
                relative to the grid-paper inner padding box, right side, just
                below the headline. Drop /public/nymtuul.png to replace placeholder. */}
            <FloatingSticker
              src="/nymtuul.png"
              fallbackSrc="/nymtuul-placeholder.svg"
              alt="Nymtuul"
              className="select-none"
              style={{
                position: "absolute",
                top: 220,
                right: 0,
                height: 460,
                width: "auto",
                pointerEvents: "none",
                zIndex: 3,
              }}
            />

            <HandNote
              size={32}
              rotate={-1.5}
              style={{ color: navy, marginBottom: 30 }}
            >
              {content.subtitle}
            </HandNote>

            <div
              style={{
                fontFamily: '"Caveat", cursive',
                fontSize: 24,
                color: navy,
                lineHeight: 1.55,
                maxWidth: 560,
                marginBottom: 32,
              }}
            >
              {content.body.line1}
              <br />
              <span style={{ background: "#a8b8d855", padding: "0 4px" }}>
                {content.body.highlight}
              </span>{" "}
              {content.body.line2}
              <br />
              {content.body.line3}
            </div>

            <DoodleArrow
              rotate={-15}
              style={{ position: "absolute", top: 60, right: 80 }}
              color={navy}
            />
            <HandNote
              size={18}
              rotate={8}
              style={{ position: "absolute", top: 50, right: 120, color: navy }}
            >
              {content.hereNote}
            </HandNote>
          </TornPaper>
        </Flutter>

        {/* Tapes on grid page */}
        <Tape
          top={170}
          left={620}
          width={150}
          height={32}
          rotate={-5}
          pattern="striped"
          color="rgba(168,184,216,0.85)"
          zIndex={20}
        />
        <Tape
          top={170}
          left={910}
          width={150}
          height={32}
          rotate={4}
          pattern="dotted"
          color="rgba(168,184,216,0.85)"
          zIndex={20}
        />

        {/* Polaroid top-left */}
        <Flutter delay={320}>
          <div
            className="collage-piece collage-hoverable"
            style={
              {
                position: "absolute",
                left: 70,
                top: 120,
                width: 220,
                height: 260,
                background: "#faf3e0",
                padding: "15px 15px 50px",
                "--collage-rot": "-9deg",
                transform: "rotate(var(--collage-rot))",
                boxShadow: "5px 8px 16px rgba(0,0,0,0.32)",
                zIndex: 6,
                cursor: "pointer",
              } as CSSProperties
            }
          >
            <div style={{ width: "100%", height: 175 }}>
              <Photo
                src={content.polaroids[0].src}
                alt={content.polaroids[0].label}
                placeholderLabel={content.polaroids[0].label}
                placeholderStripe={accent}
              />
            </div>
            <HandNote
              size={20}
              rotate={-1}
              style={{ marginTop: 8, color: navy, textAlign: "center" }}
            >
              {content.polaroids[0].caption}
            </HandNote>
          </div>
        </Flutter>
        <Tape
          top={100}
          left={130}
          width={110}
          height={26}
          rotate={-15}
          pattern="plain"
          color="rgba(244,234,216,0.9)"
          zIndex={25}
        />

        {/* Polaroid bottom-left */}
        <Flutter delay={440}>
          <div
            className="collage-piece collage-hoverable"
            style={
              {
                position: "absolute",
                left: 90,
                top: 540,
                width: 200,
                height: 240,
                background: "#faf3e0",
                padding: "14px 14px 44px",
                "--collage-rot": "7deg",
                transform: "rotate(var(--collage-rot))",
                boxShadow: "5px 8px 16px rgba(0,0,0,0.32)",
                zIndex: 6,
                cursor: "pointer",
              } as CSSProperties
            }
          >
            <div style={{ width: "100%", height: 158 }}>
              <Photo
                src={content.polaroids[1].src}
                alt={content.polaroids[1].label}
                placeholderLabel={content.polaroids[1].label}
                placeholderStripe={accent}
                placeholderBg="#dde4f0"
              />
            </div>
            <HandNote
              size={18}
              rotate={2}
              style={{ marginTop: 8, color: navy, textAlign: "center" }}
            >
              {content.polaroids[1].caption}
            </HandNote>
          </div>
        </Flutter>

        {/* Pressed-flower paper note top-right (replaces old newspaper scrap) */}
        <Flutter delay={560}>
          <div
            style={{
              position: "absolute",
              left: 1010,
              top: 30,
              width: 430,
              transform: "rotate(6deg)",
              filter: "drop-shadow(5px 10px 16px rgba(0,0,0,0.2))",
              zIndex: 6,
            }}
          >
            <img
              src="/image.png"
              alt=""
              aria-hidden
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                padding: "65px 120px 95px 80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                transform: "rotate(-2deg)",
              }}
            >
              <div
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: 22,
                  color: navy,
                  lineHeight: 1.35,
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {content.pressed.body}
              </div>
            </div>
          </div>
        </Flutter>

        {/* Lined notecard bottom-right */}
        <Flutter delay={700}>
          <TornPaper
            width={300}
            height={220}
            background={textures.lined(accent)}
            rotate={-5}
            roughness={8}
            style={{ left: 1110, top: 600 }}
            zIndex={7}
            innerStyle={{ padding: "32px 22px 22px" }}
          >
            <HandNote
              size={26}
              rotate={-1}
              style={{ color: navy, marginBottom: 8 }}
            >
              {content.contact.title}
            </HandNote>
            <div
              style={{
                fontFamily: '"Caveat", cursive',
                fontSize: 19,
                color: navy,
                lineHeight: 1.6,
              }}
            >
              ✉ &nbsp; {content.contact.email}
              <br />✶ &nbsp; {content.contact.instagram}
              <br />✦ &nbsp; {content.contact.resume}
            </div>
          </TornPaper>
        </Flutter>
        <Tape
          top={585}
          left={1180}
          width={120}
          height={26}
          rotate={-8}
          pattern="dotted"
          color="rgba(168,184,216,0.85)"
          zIndex={25}
        />

        {/* Stickers */}
        <StarSticker
          size={124}
          color={cream}
          rotate={18}
          style={{ position: "absolute", top: 480, left: 1080, zIndex: 25 }}
        />
        <StarSticker
          size={94}
          color={navy}
          rotate={-22}
          style={{ position: "absolute", top: 410, left: 290, zIndex: 25 }}
        />

        {/* Image stickers — mix-blend-mode:multiply drops white bg on the pink wall */}
        {/* 7-point sparkle star — top-left corner */}
        <img
          src="/s-sparkle.png"
          alt=""
          aria-hidden
          width={140}
          style={{
            position: "absolute",
            top: 18,
            left: 12,
            zIndex: 26,
            filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        {/* Animated pink star — floats above the main torn-paper block */}
        <img
          src="/s-star-pink.png"
          alt=""
          aria-hidden
          width={127}
          style={{
            position: "absolute",
            top: 148,
            left: 488,
            zIndex: 26,
            filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.15))",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        {/* Pink spiral — gap between the two left polaroids */}
        <img
          src="/s-spiral.png"
          alt=""
          aria-hidden
          width={159}
          style={{
            position: "absolute",
            top: 395,
            left: 18,
            zIndex: 26,
            filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.12))",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        {/* 3D iridescent star — top-right corner */}
        <img
          src="/s-star3d.png"
          alt=""
          aria-hidden
          width={176}
          style={{
            position: "absolute",
            top: 22,
            left: 1348,
            zIndex: 26,
            transform: "rotate(-8deg)",
            filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        {/* Glass heart — bottom left, below polaroids */}
        <img
          src="/s-heart.png"
          alt=""
          aria-hidden
          width={181}
          style={{
            position: "absolute",
            top: 862,
            left: 165,
            zIndex: 26,
            filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.18))",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        {/* 3D push-pin — bottom center */}
        <img
          src="/s-pin.png"
          alt=""
          aria-hidden
          width={114}
          style={{
            position: "absolute",
            top: 908,
            left: 590,
            zIndex: 26,
            filter: "drop-shadow(1px 3px 5px rgba(0,0,0,0.2))",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Page number */}
        <HandNote
          size={20}
          style={{
            position: "absolute",
            bottom: 30,
            left: 50,
            color: cream,
            zIndex: 30,
            opacity: 0.85,
          }}
        >
          {content.pageNumber}
        </HandNote>
      </div>
      <CursorTapeTrail />
    </div>
  );
}
