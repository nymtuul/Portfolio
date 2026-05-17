# Handoff: Timeline Section — vertical life timeline

## Overview
A vertical timeline section for the **Nymtuul** portfolio. A squiggly dashed line runs top-to-bottom through the middle of the section. Rows alternate left/right: each row has a tilted sticky-note **text card** and a **polaroid photo frame** with a drag-and-drop image slot. Confetti stickers scatter alongside the line. The section caps with a "NOW · 2026 ✨" pennant on a bullseye dot.

This section sits below the location/map page in the portfolio's scroll order. It uses the same baby-pink palette as the rest of the site.

## About the Design Files
The files in this bundle are **design references**, not production code. The task is to **recreate this in the target codebase** using its existing component patterns, styling system, and conventions. The polaroid `<image-slot>` element is a custom drag-and-drop web component used in the prototype — in production, swap it for whatever image-upload component the codebase already has (or just regular `<img>` if the photos are hard-coded by the user).

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and motion are locked. Recreate pixel-perfectly.

## Layout overview

```
                     ― chapter four · the years ―
                              MY YEARS
                  ~ drop in your own photos! ~

   [Card] [Photo] ●━━━━ 2002 ━━━━━
                  ┃
                  ╲
                   ●━━━━ 2008 ━━━━━ [Photo] [Card]
                   ┃
                   ╱
   [Card] [Photo] ●━━━━ 2014 ━━━━━
                  ┃
                  ╲
                   ●━━━━ 2020 ━━━━━ [Photo] [Card]
                   ┃
                   ╱
   [Card] [Photo] ●━━━━ 2022 ━━━━━
                  ┃
                ╔═●═╗
                ║ NOW · 2026 ✨ ║   (pennant)
                ╚════════════════╝
```

- Center column: a vertical squiggly SVG path with a soft pink glow halo behind it
- Left/right columns alternate: even-indexed rows have card+photo on the **left**, odd-indexed rows on the **right**
- The dot on the line is a small `accent`-filled circle with a `navy` 3.5px border
- Photo polaroid hugs the line; text card sits to the outside
- Confetti stickers in 8 fixed positions alongside the spine

## Section container
```css
.timeline-section {
  padding: 80px 40px 100px;
  background:
    radial-gradient(ellipse at 50% 0%, accent + 33% alpha 0%, transparent 50%),
    cream;
  position: relative;
  overflow: hidden;
}
```

## Section heading (top, centered)
```
Overline:  "― chapter four · the years ―"
           Courier Prime 13px, letter-spacing 6, uppercase, navy @ 0.6 opacity
Title:     "MY YEARS" rendered with <RansomText size={56}>
Subtitle:  "~ drop in your own photos! drag any image onto a polaroid ~"
           Caveat 22px, navy @ 0.85 opacity, 10px margin-top
```
30px bottom margin before the timeline starts.

## Timeline backbone

The squiggly line is a single SVG positioned absolutely in the center of the container:

```jsx
<svg preserveAspectRatio="none" viewBox="0 0 200 1000" style={{
  position: 'absolute',
  top: 0, left: '50%',
  width: 200, height: '100%',
  transform: 'translateX(-50%)',
  zIndex: 1,
  pointerEvents: 'none',
}}>
  {/* glow halo */}
  <path d="M 100 10 Q 70 120 100 240 T 100 480 T 100 720 T 100 960 T 100 990"
        fill="none" stroke={palette.accent} strokeWidth="14"
        strokeLinecap="round" opacity="0.4" />
  {/* main dashed line */}
  <path d="M 100 10 Q 70 120 100 240 T 100 480 T 100 720 T 100 960 T 100 990"
        fill="none" stroke={palette.navy} strokeWidth="3"
        strokeLinecap="round" strokeDasharray="6 4" opacity="0.7" />
</svg>
```

The path uses smooth quadratic curves (`T` continues the curve). The two stacked paths give it a halo-on-line effect — pink glow under a thin navy dashed stroke.

`preserveAspectRatio="none"` lets the SVG stretch with the container height regardless of how many entries there are.

## Row anatomy

Each `TimelineRow` is a 3-column CSS grid:
```css
display: grid;
grid-template-columns: 1fr 60px 1fr;
align-items: center;
padding: 14px 0;
```
- Center 60px column holds the dot
- Left/right 1fr columns hold either the row content or empty (depending on `side`)
- Row gap (between rows) is 10px via the parent flex column

### The dot (center column, every row)
- 20×20px circle
- Background: `palette.accent`
- 3.5px solid border in `palette.navy`
- `box-shadow: 0 2px 5px rgba(0,0,0,0.22)`

### The text card
Width 280px, padding `18px 22px`, background = `entry.cardColor` (varies per entry, see data), rotated ±2–4°, `box-shadow: 6px 8px 16px rgba(0,0,0,0.16)`, 1px subtle border.

Contents:
1. **Year** — Caveat 700, 52px, line-height 1, color navy, letter-spacing −1, 4px margin-bottom
2. **Mood + title line** — Caveat 22px, navy, 8px margin-bottom
   - Emoji at 20px + space + title text
3. **Body** — Caveat 17px, navy @ 0.85 opacity, line-height 1.4, `white-space: pre-line`

**Page-corner fold detail** (bottom-right of card):
```jsx
<div style={{
  position: 'absolute', bottom: 0, right: 0,
  width: 20, height: 20,
  background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.12) 50%)',
}} />
```

### The polaroid
Width 200px, padding `14px 14px 36px` (extra bottom for caption), white-cream background `#faf3e0`, rotated ±3–5°, `box-shadow: 5px 8px 16px rgba(0,0,0,0.25)`.

Contents:
1. **Photo well** — `aspect-ratio: 1 / 1`, full-width
   - Background placeholder = diagonal stripe gradient (135°, accent + cream alternating)
   - Contains the `<image-slot>` drag-drop element OR an `<img>` once a photo is supplied
2. **Caption** under the photo, 8px margin-top
   - Caveat 18px, navy, centered
   - Format: `{photoLabel} · {year}` — e.g. "baby · 2002"
3. **Washi tape strip** at top corner
   - 60×20px, positioned `top: -10px`
   - Left edge if row is on the left, right edge if row is on the right
   - Diagonal striped gradient: `repeating-linear-gradient(45deg, accent + 80% alpha 0 5px, cream + 65% alpha 5px 10px)`
   - `clip-path: polygon(3% 8%, 98% 0%, 100% 92%, 1% 100%)` for torn ends
   - Rotated −8° (left) or +8° (right)

### Image slot (`<image-slot>`)
This is a custom web component in the prototype that accepts drag-and-drop image files and persists them to localStorage. In production:

- **If users upload photos via the codebase's existing flow** — use that. Render the resulting URL as a normal `<img>` filling the photo well.
- **If photos are hard-coded in the codebase** — just use `<img src="…" alt="…">` in the photo well, no slot component.
- **If you want the same drag-drop behavior** — implement a small dropzone component (HTML5 DnD API). Persist with FileReader → base64 → localStorage, or upload to a backend.

The `id` attribute (`tl-2002`, `tl-2008`, etc.) is the persistence key — keep distinct ids per slot.

## Confetti stickers
Eight `<ConfettiSticker>` SVGs absolutely positioned along the spine. They sit at fixed `top` pixel positions and alternate between left ~42-44% and right ~56-58% of the section width.

Available shapes (in a 28×28 viewBox):
- `dot` — filled circle
- `star` — 5-point star
- `heart` — heart outline filled
- `sparkle` — 4-point sparkle
- `flower` — 5-circle daisy
- `squiggle` — wavy stroke
- `cross` — X mark

Colors mix: `accent`, `denim`, palette navy, plus yellow `#fcd86a` and green `#a8d68a` for variety. Each sticker has `drop-shadow(1px 2px 2px rgba(0,0,0,0.2))` and `pointer-events: none`.

Positions used (top px, left %, rotate deg, size px, color):
```
star    80   44%   +20   26  #fcd86a
sparkle 180  58%   -15   22  accent
heart   320  42%   -10   22  denim
dot     420  58%    0    14  #a8d68a
squiggle 530 42%   +10   28  denim
flower  680  58%   +15   24  accent
star    830  42%   -12   22  #fcd86a
heart   920  58%   +20   22  denim
```

## The "NOW · 2026 ✨" pennant
Sits below the last row with `margin-top: 36px`.
```css
background: accent;
padding: 16px 36px;
border-radius: 14px;
border: 2px solid navy;
font: 700 36px "Caveat", cursive;
color: navy;
white-space: nowrap;          /* critical — rotated text wraps badly without this */
transform: rotate(-2deg);
box-shadow: 4px 6px 14px rgba(0,0,0,0.18);
```

A **bullseye dot** sits 28px above it, centered horizontally:
- 26×26px circle, navy background, 4px accent border
- Outer glow: `box-shadow: 0 0 0 6px accent + 33% alpha, 0 3px 6px rgba(0,0,0,0.2)`

## Data shape
```js
const timelineEntries = [
  {
    year: '2002',           // displayed at 52px
    title: 'born',          // short verb phrase, lowercase
    body: `multi-line\nstring with explicit \\n breaks`,
    mood: '🍼',             // single emoji
    cardColor: '#fff8eb',   // sticky-note background — varies per entry
    rotate: -3,             // card rotation, ±2-4°
    photoRotate: 4,         // polaroid rotation, ±3-5° (different from card)
    photoLabel: 'baby',     // caption + drop-slot placeholder
    slotId: 'tl-2002',      // unique persistence id for the image slot
  },
  // ...
];
```

5 entries are used (2002, 2008, 2014, 2020, 2022). Card colors alternate across the set: cream `#fff8eb`, accent `#fcd4e1`, cream, soft blue `#d8e8f0`, accent. The blue is a nod to the original palette inspiration — feel free to swap for another desaturated tint.

## Design tokens
```js
const palette = {
  wallHue:    355,
  wallChroma: 0.04,
  wallLight:  0.91,
  accent:  '#fcd4e1',  // tape, halo, pennant, sticky-card pink
  denim:   '#f4a8c2',  // secondary confetti accent
  navy:    '#b87090',  // all text, dot borders, dashed line stroke
  cream:   '#fff8fb',  // section background
};
```

Card color variants used:
- `#fff8eb` — warm cream (default sticky)
- `#fcd4e1` — palette accent pink
- `#d8e8f0` — soft blue tint (one entry, for variety)

Confetti accent colors:
- `#fcd86a` — yellow stars/sparkles
- `#a8d68a` — green dots
- + palette accent/denim/navy

## Interactions

| Element | Behavior |
|---|---|
| Hover any card OR polaroid | `transform: rotate(0deg) translateY(-6px)` on the inner element; transition 300ms `cubic-bezier(.2,.9,.3,1.3)` — straightens the tilt and lifts |
| Drop image onto polaroid `<image-slot>` | Image fills the photo well; persists to localStorage by slot id |
| Click sticker / dot / pennant | No action (purely decorative) |
| Section in viewport | Static — no scroll-driven animation in v1. Future: paths could draw in with `stroke-dashoffset` keyframes as the section enters the viewport. |

### Accessibility notes
- Wrap each row in a `role="listitem"` and the entries container in `role="list"`
- Add `aria-label="Timeline entry: {year}, {title}"` on each row
- Image slots / polaroids should have accessible alt text once photos are loaded (use `entry.photoLabel + ' (' + entry.year + ')'` as alt)
- Caveat at 16-17px is borderline; consider bumping body to 18-19px if testing shows readability issues

## Production checklist (in order)

1. Build the `<TimelineSection>` shell with section heading and the squiggly SVG centered absolutely.
2. Build `<TimelineRow>` as a 3-column grid with the dot in the middle.
3. Build `<TimelineCard>` (the sticky-note text card) and `<TimelinePolaroid>` (the photo frame with washi tape).
4. Wire the alternating left/right by row index parity.
5. Drop in 8 `<ConfettiSticker>` at fixed positions.
6. Add the "NOW" pennant + bullseye dot below the last row.
7. Replace `<image-slot>` with the codebase's image input or simple `<img>` from props.
8. Verify on mobile: stack everything to one column (see notes below).

## Files in this bundle
- `Timeline Section.html` — standalone preview, runs in any browser
- `timeline-section.jsx` — the section component + TimelineRow, ConfettiSticker, and the timelineEntries data array
- `collage-primitives.jsx` — provides `<RansomText>` for the "MY YEARS" title
- `image-slot.js` — custom drag-and-drop image web component used by the polaroids (replace in production)

## How to view locally
Open `Timeline Section.html` in any browser. No build step — Babel compiles JSX in-browser. Drag any image from your desktop onto a polaroid to see the slot fill. Refresh to confirm persistence.

## Notes for the implementer
- **The single most important detail is the squiggly line** — a straight line reads as a Lego instruction sheet, the squiggle is what makes it feel hand-drawn. Don't simplify.
- **The pink halo behind the dashed line** matters too. It's a 14px-wide stroke at 40% opacity sitting under the 3px dashed stroke. Without it the line looks frail.
- **Don't pre-render the `\n` in body strings with `<br/>`** — leave the data as plain strings and use `white-space: pre-line` on the text container.
- **Mobile breakpoint**: at <768px, stack everything to one column. The squiggly line moves to the left edge (`left: 20px` instead of `50%`), dots align with it, and every card+polaroid pair sits to the right of the line. Confetti scales down by half or hides on the smallest sizes.
- **The card colors are intentionally not all the same.** Alternating cream / pink / cream / blue / pink gives the page rhythm. If you reduce to all-cream the section feels monochrome and tired.
