# Handoff: Location Page — maximalist collage upgrade

## Overview
Improvement spec for the **Nymtuul** portfolio's `/location` page. The current implementation has a real Google Maps iframe with a photo cutout in front, sitting alone on a pink background. The page reads as plain because there's no surrounding scenography.

This handoff adds a maximalist collage layer **around** the map: title scrap, washi-tape polaroid frame, scattered cartoon icons, cycling speech bubbles, pin callout labels, three detail cards below, and a closing handwritten line. The Google Maps iframe itself remains the centerpiece — everything else is decoration that wraps and anchors it.

## About the design files
The files in this bundle are **design references**, not production code. The map area in `Location v2.html` is a fake SVG placeholder (because I can't load a live Google Maps embed in the preview). In production, **swap that placeholder for the existing `<iframe src="…google.com/maps/embed?…">`** — the polaroid frame, tape, and pin labels wrap around it unchanged.

## Fidelity
**High-fidelity.** Final colors, typography, layout, and motion are locked. Recreate pixel-perfectly using the codebase's existing patterns (Tailwind / styled-components / CSS modules — whatever's in use).

---

## ⚠ The Google Maps integration — read this first

The map in the prototype is a fake SVG. The real page should use the existing Google Maps embed. Two integration modes:

### Option A — Existing `<iframe>` embed (recommended, no API key)
```jsx
<div className="map-frame">                {/* polaroid border */}
  <div className="map-window">             {/* aspect-ratio:2/1 container */}
    <iframe
      src="https://www.google.com/maps/embed?pb=…YOUR_EMBED_URL…"
      width="100%"
      height="100%"
      style={{ border: 0, display: 'block' }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
    {/* PHOTO CUTOUT — must be positioned ON TOP of the iframe */}
    <img src="/path/to/cutout.png" className="photo-overlay" />
    {/* PIN CALLOUT LABELS — also on top of the iframe */}
    <div className="pin-label" style={{ top:'15%', right:'10%' }}>📚 my faculty</div>
    <div className="pin-label" style={{ bottom:'12%', left:'8%' }}>☕ favorite café</div>
  </div>
  <div className="map-caption">National University of Mongolia · est. 1942</div>
</div>
```

**Critical iframe layering rules:**
- The `.map-window` is `position: relative` and `overflow: hidden`.
- The iframe gets `position: absolute; inset: 0; width:100%; height:100%`.
- Photo cutout and pin labels are siblings of the iframe with `position: absolute` and **higher `z-index`**. Set `pointer-events: none` on them so the user can still drag/zoom the underlying map. (If you want them to be clickable, leave pointer-events on but accept the user can't pan in those zones.)

### Option B — Google Maps JS API (only if you need custom interactions)
If you want hover-highlighting on the photo cutout to bounce the pin, or want to drive the map's center from React state, switch to the JS SDK with `@react-google-maps/api`. Requires an API key. Out of scope for v1.

### What stays the same in both options
The **polaroid frame, washi tape, photo overlay, pin labels, surrounding icons, title scrap, detail cards, speech bubbles, closing line** — none of these care which map renderer is used. Build them once around the map container.

---

## Layout overview

The page is a single column on a pink background with subtle radial gradients. Elements are absolute-positioned on a soft-min-height stage so the collage can overlap freely.

```
[pink background with radial gradients]

  ┌─ title scrap (top-left, rotated −3°) ──┐
  │ ― chapter three · location ―           │
  │ HERE (ransom-note 48px)                │
  │ ~ subtitle in caveat ~                 │
  └──── + washi tape strip on the corner ──┘

  …scattered icons (plane, sparkle, heart, star, coffee, book, cart, pin, etc.)
   in 12 positions around the page edges and corners…

       ┌──── polaroid frame (rotated −1°) ────┐
       │ [washi tape strips top]              │
       │ ┌──────────────────────────────────┐ │
       │ │  GOOGLE MAPS IFRAME              │ │
       │ │   + photo cutout (right side)    │ │
       │ │   + pin label "📚 my faculty"    │ │
       │ │   + pin label "☕ café"          │ │
       │ └──────────────────────────────────┘ │
       │ "National University of Mongolia"    │
       │   (caveat caption beneath)           │
       └──────────────────────────────────────┘

   [cycling speech bubble on the left, near the photo]
   [static "established 2022" pin bubble on the right]

  ┌───── 3-column grid below the map ────────────────────────┐
  │  address      │  ticket stub      │  nearby (highlighted)│
  │  notepad      │  dashed border    │  pink card + ★ badge │
  │  rotated −1.5°│  rotated +1.5°    │  rotated −2°         │
  └──────────────────────────────────────────────────────────┘

         ~ if you visit, bring snacks ~ 🍓
                (centered, caveat 30px)
```

## Anatomy by element

### Page background
```css
background: #fce9ef;
background-image:
  radial-gradient(circle at 15% 20%, #fcd4e155 0%, transparent 40%),
  radial-gradient(circle at 85% 80%, #fcd4e188 0%, transparent 40%);
min-height: 100vh;
padding: 60px 40px 100px;
overflow-x: hidden;
```

### Title scrap (top-left)
- Position: `top: 80px, left: 60px`, rotated −3°
- Background: `palette.cream` (`#fff8fb`), padding `24px 32px`
- Max-width 320px, subtle 1px hairline border, box-shadow `4px 6px 14px rgba(0,0,0,0.12)`
- Three lines:
  1. **Overline:** Courier Prime 11px, letter-spacing 4, uppercase, opacity 0.6 — "― chapter three · location ―"
  2. **Ransom title:** "HERE" at 48px (use the `<RansomText>` component, see ransom-note rules in main portfolio handoff)
  3. **Subtitle:** Caveat 22px, line-height 1.3 — "~ the place where i'm pretending to be a serious student ~"
- One washi tape strip (140×28px) crosses its top-right corner at −12°

### Scattered icons
Twelve absolutely-positioned cartoon SVG icons, varying rotations (−20° to +20°) and sizes (28–56px). All wear a `drop-shadow(2px 4px 4px rgba(0,0,0,0.15))`. Kinds + positions in the mock — feel free to rearrange but keep ~12 total spread around the page edges so they don't cluster.

Build as a single `<FloatingIcon kind={...} top={...} left={...} rotate={...} size={...} />` component with an inline SVG dictionary for: `plane, sparkle, heart, star, cart, book, coffee, pin`.

### Map polaroid frame
The most important upgrade.

```css
.map-frame {
  background: #fff8fb;             /* cream */
  padding: 24px 24px 80px;         /* room for caption beneath */
  box-shadow: 8px 14px 32px rgba(0,0,0,0.2),
              inset 0 0 0 1px rgba(0,0,0,0.05);
  transform: rotate(-1deg);
  max-width: 1100px;
  margin: 180px auto 0;            /* leaves room for title scrap above */
  position: relative;
}
.map-window {
  width: 100%;
  aspect-ratio: 2 / 1;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.05);
}
.map-window iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.photo-overlay {
  position: absolute;
  right: 18%;
  bottom: 0;
  width: 24%;
  height: 90%;
  filter: drop-shadow(-6px 8px 14px rgba(0,0,0,0.3));
  pointer-events: none;
}
.pin-label {
  position: absolute;
  background: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font: 600 11px Inter, sans-serif;
  color: #b87090;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.map-caption {
  position: absolute;
  bottom: 22px;
  left: 0; right: 0;
  text-align: center;
  font: 28px "Caveat", cursive;
  color: #b87090;
}
```

Two washi tape strips across the polaroid top:
- One at `top: -14px, left: 40%`, 160×32px, rotated −6°, **striped** pattern (accent + cream alternating)
- One at `top: -8px, right: 80px`, 130×28px, rotated +8°, **solid denim** color

### Speech bubbles
Standalone `<Bubble>` component:
```css
position: absolute;
background: white;
border-radius: 999px;
padding: 14px 26px;             /* big */ or 10px 20px /* small */
font: 600 24px "Caveat", cursive;
color: #b87090;
box-shadow: 0 4px 14px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(0,0,0,0.04);
display: inline-flex;
align-items: center;
gap: 8px;
white-space: nowrap;
```

Two kinds in this page:
1. **Cycling bubble** — `top: 280px, left: 80px`, swaps every 3.5s through three lines:
   - 🌸 "this is where it all started"
   - 🥹 "pls help me find my classroom!"
   - ✨ "home for 4 years already"
   - Each line has its own rotation (`−4°, +2°, −3°`); transition: `opacity 500ms, transform 500ms`
2. **Static "📍 established 2022" pin bubble** — `top: 360px, left: 1080px`, rotated +6°

### Detail cards (below map)
A 3-column CSS grid (`gridTemplateColumns: '1.2fr 1fr 1fr', gap: 28px, max-width 1100px, margin: 80px auto 0`).

**Card 1 — Address (notepad)**
- Background `#fff8eb` + lined-paper gradient (`repeating-linear-gradient(transparent 0 27px, #fcd4e166 27px 28px)`)
- Padding `28px 30px`, rotated −1.5°, shadow `4px 8px 18px rgba(0,0,0,0.15)`
- Header: Caveat 32px "📮 the address"
- Body: Caveat 22px, line-height 1.5 — full address with country flag

**Card 2 — Ticket stub**
- Background `#fff8fb`, **2px dashed border in `#b87090`**, padding `28px 30px`, rotated +1.5°
- Overline: Courier Prime 12px, letter-spacing 3, opacity 0.6 — "★ ticket stub ★"
- Title: Caveat 30px — "nymtuul · 2022—now"
- Body: Caveat 20px — student fact + 4.5★ rating line

**Card 3 — Nearby (pink highlight)**
- Background `palette.accent` (`#fcd4e1`, the brand pink — visually loud on purpose)
- Padding `28px 30px`, rotated −2°
- Header: Caveat 30px — "nearby ↘"
- List: 5 items, Caveat 20px, emoji + name (☕ Karaoke, 🏛 Chinggis Khaan museum, etc.)
- **Floating "★ FAVES" badge** absolutely positioned at `top: -16px, right: 18px`, navy background + cream text, Courier Prime 11px, rotated +8°

### Closing line
Centered, `margin-top: 80px`, Caveat 30px, color navy, opacity 0.85.
> "~ if you visit, bring snacks ~ 🍓"

## Design tokens
```js
const palette = {
  accent: '#fcd4e1',  // washi tape, highlight card, pin
  denim:  '#f4a8c2',  // secondary tape, heart on photo
  navy:   '#b87090',  // all text, borders, navy badge
  cream:  '#fff8fb',  // card backgrounds, polaroid border
};

const fonts = {
  body:    'Inter, system-ui, sans-serif',
  hand:    '"Caveat", cursive',
  mono:    '"Courier Prime", monospace',
  ransom:  /* 8-font mix, see main portfolio handoff */
};
```

## Interactions

| Element | Behavior |
|---|---|
| Any scrap (title, cards, icons, bubbles) | `transform-origin: center`; on hover `transform: rotate(0deg) translateY(-4px)` with `transition: transform 300ms cubic-bezier(.2,.9,.3,1.3)` — straightens the tilt and lifts |
| Cycling bubble | `setInterval(3500)` advances index; CSS handles opacity + transform fade |
| Map iframe | Native Google Maps drag/zoom — leave alone |
| Pin labels | Static decorations; `pointer-events: none` so they don't block the map |
| Photo overlay | Static decoration; `pointer-events: none` |

## Production checklist (in order)

1. Wrap the existing Google Maps iframe in a `.map-window` container with `aspect-ratio: 2/1`. Don't change the iframe itself.
2. Wrap that in a `.map-frame` polaroid (cream bg, 24px padding, rotated −1°, big shadow). Add the caption beneath.
3. Position the existing photo cutout `<img>` as `.photo-overlay` over the iframe with `pointer-events: none`.
4. Add 2 washi tape strips across the polaroid top.
5. Add 2 pin label pills inside the map window.
6. Add the title scrap top-left.
7. Add 12 floating icons around the page.
8. Build the `<Bubble>` component; add the cycling one near the photo + static one to the right.
9. Build the 3 detail cards in a grid below.
10. Add the closing handwritten line.
11. Verify the iframe still drags/zooms — pin labels and photo overlay must have `pointer-events: none`.

## Files in this bundle
- `Location v2.html` — full visual reference, runs standalone in any browser. The map area is a fake SVG; everything else around it is the real spec.
- `collage-primitives.jsx` — provides `<RansomText>` for the "HERE" title in the title scrap. Other primitives in there (TornPaper, Tape) aren't strictly needed for this page but available.
- `README.md` — this file.

## How to view locally
Open `Location v2.html` in any browser. No build step needed — Babel compiles JSX inline. Hover any scrap to see the tilt-straighten animation; wait 3.5s to see the speech bubble cycle.

## Notes for the implementer
- **The single biggest visual win is the polaroid frame around the map.** Even with nothing else added, wrapping the iframe in a tilted cream-padded card with washi tape transforms the page.
- **Pin labels feel busy in the mock — that's intentional.** The reference image is maximalist; restraint here will read as "still plain".
- **Don't try to make the pin labels track real map coordinates** in v1. They're decorative captions, not data-bound markers. v2 with the JS SDK could do that.
- The lined-paper card uses a CSS gradient, not a real ruled-paper texture. Keep it as a gradient — texture images are overkill.
- The cycling bubble timing (3500ms) is the same as the about-map page in the portfolio. Stay consistent.
- **Mobile:** the 3-card grid should stack vertically below ~768px. The polaroid frame's rotation can stay (it's only 1°). The icons can become fewer (6 instead of 12) to reduce clutter.
