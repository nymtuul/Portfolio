# Handoff: Diary Section

## Overview
A scrolling section for the **Nymtuul** portfolio that presents personal journal entries as a paginated open-book diary. Each "spread" shows one entry across two pages — a left page with a polaroid photo and date, a right page with the handwritten body text plus marginalia. Users navigate between entries with ← / → arrows or the dot pager below the book.

This section sits below the hero on the landing page and is part of the same baby-pink scrapbook design system from the larger portfolio handoff.

## About the Design Files
The files in this bundle are **design references**, not production code. They're React-via-Babel prototypes built to demonstrate the intended look and interactions. The dev task is to recreate this in the target codebase using its existing component patterns, styling system, and conventions.

The diary spread should be re-implemented as a proper reusable component (`<DiarySection>`) in the target framework. If using SSR, the polaroid + handwritten entries should be server-rendered; only the page-flipping pagination needs client interactivity.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and motion are locked. Exact values are below — recreate pixel-perfectly.

## Section anatomy

### Section container
- Full-width, ~1100px min height
- Padding: `120px 40px 100px`
- Background:
  ```css
  background:
    radial-gradient(ellipse at 50% 0%, accent + 33% alpha 0%, transparent 50%),
    cream;
  ```

### Section heading (top, centered)
1. Small overline label, uppercase, letterspaced
   - "― chapter two ―"
   - Courier Prime, 13px, letter-spacing 6, opacity 0.6, color = `navy`
2. **Ransom-note title:** "DIARY" at 64px (see ransom-note rules in the main portfolio handoff)
3. Italic subtitle in handwriting
   - "~ pages from a small notebook ~"
   - Caveat, 24px, color = `navy`, opacity 0.85

### The open-book spread
- Max-width 1140px, centered, `perspective: 2400px` on wrapper
- Underneath: a soft radial shadow blur (inset −30px, blur 20px) gives the book floating-on-table feel
- The spread itself is `display: flex` of two `<DiarySpread>` halves, each 540×700px
- Outer shadow on the spread: `0 20px 60px rgba(0,0,0,0.25)`
- Spine: an absolutely-positioned 30px-wide column down the center with a black-to-transparent linear gradient creating the page-curl shadow

### Left page (`<DiarySpread side="left">`)
- Background: paper texture
  ```css
  background:
    radial-gradient(ellipse at 100% 50%, rgba(0,0,0,0.12), transparent 30%),
    repeating-linear-gradient(transparent 0 31px, accent+55alpha 31px 32px),
    #fff8eb;
  inset-shadow: inset -10px 0 18px rgba(0,0,0,0.10);
  padding: 50px;
  ```
- Contents (vertical stack, centered):
  1. **Date header strip** (top)
     - Courier Prime 13px, letter-spacing 3, uppercase, opacity 0.7, color = navy
     - Format: `── {date} · {weather emoji} {mood emoji} ──`
  2. **Polaroid card** (`<PolaroidEntry>`)
     - 320px wide, padding `20px 20px 60px`, bg `#faf3e0`
     - Rotated −4°
     - Box-shadow: `6px 10px 22px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(0,0,0,0.05)`
     - Photo well: full-width × 320px tall, diagonal-stripe placeholder (135° gradient, accent + cream)
     - Caption beneath: weekday in Caveat 22, date in Caveat 16 opacity 0.7
  3. **Washi tape across the polaroid** (absolutely positioned, centered horizontally at top:90px)
     - 130×28px, rotated −6°
     - Diagonal repeating-linear-gradient stripes in accent + cream
     - Clip-path polygon for torn ends
  4. **Doodle in bottom-right corner** (one of the entry's two doodles)
     - 48px, color = navy, opacity 0.7
  5. **Coffee stain** (bottom-left, see CoffeeStain spec)

### Right page (`<DiarySpread side="right">`)
- Same paper texture/lines, mirrored shadow (`inset 10px 0 18px`)
- Three small punch-hole circles down the left edge (binder rings)
  - 14×14px, `#e8e0d4`, inset shadow, at top 90 / 350 / 610
- Padding-left bumped to 30px to clear binder holes
- Contents:
  1. **Entry title** — Caveat 48px bold, color = navy, line-height 1.1
  2. **Mood/weather line** — Caveat 22px, color = denim
     - Format: `mood: {emoji}  ·  weather: {emoji}`
     - 24px bottom margin
  3. **Body** — Caveat 22px, color = navy, line-height 1.55, max-width 420px, `white-space: pre-line` so newlines preserved
  4. **Highlighter swipe** behind a phrase
     - Absolutely positioned, 200×22px
     - Background: `accent + 66% alpha`
     - Transform: `rotate(-1deg) skewX(-4deg)`
     - `z-index: -1`
  5. **Doodle in top-right margin** — 56px, color = denim, opacity 0.65
  6. **Star sticker** (bottom-right area) — 32px, navy, opacity 0.5
  7. **Page number** (bottom-right corner)
     - Caveat 18px, opacity 0.5
     - Format: `~ pg. NN ~` (zero-padded, derived from entry index × 2 + 4)
  8. **Coffee stain** in top-right

### Navigation
- **Two circular arrow buttons** flanking the spread (absolutely positioned, vertical-centered, 70px outside the book)
  - 56×56px, border-radius 50%
  - Background: `accent` when enabled / `#e8e0d4` when disabled
  - 2px border in `navy`
  - Glyph: ← / →, Inter 22px, weight 600, color navy
  - Box-shadow: `2px 4px 10px rgba(0,0,0,0.18)`
  - Disabled at first / last entry, opacity 0.5
- **Dot pager** below the book (margin-top 40px)
  - Flex row, gap 12px, justified center
  - Each dot: 12px square, border-radius 6, border `1.5px solid navy`
  - Active dot: width 32px, filled with navy
  - Transition: `all 250ms ease`

## Doodle sprites
Inline SVGs in a 36×36 viewBox, drawn in single-stroke style (no fill, stroke-width 2, `strokeLinejoin: round`). Available kinds (referenced by the entries):
- `cup` — coffee mug with steam
- `sun` — circle with rays
- `pen` — diagonal pen body
- `star` — 5-point star outline
- `flower` — 4-petal flower
- `cloud` — outline cloud
- `strawberry` — heart-shaped strawberry with seed dots
- `heart` — outline heart

Each entry's `doodles[0]` goes on the left page, `doodles[1]` on the right.

## Coffee stain (`<CoffeeStain>`)
Critical for the lived-in feel.
```jsx
<svg viewBox="0 0 140 140" width={size} height={size} style={{
  position: 'absolute', top, left, opacity,
  transform: `rotate(${rotate}deg)`,
  mixBlendMode: 'multiply',
}}>
  <defs>
    <radialGradient id="stain" cx="50%" cy="50%" r="50%">
      <stop offset="60%"  stopColor="#8a5a3a" stopOpacity="0" />
      <stop offset="80%"  stopColor="#8a5a3a" stopOpacity="0.6" />
      <stop offset="92%"  stopColor="#5a3a1a" stopOpacity="0.85" />
      <stop offset="100%" stopColor="#8a5a3a" stopOpacity="0.2" />
    </radialGradient>
  </defs>
  <path d="…irregular blob path…" fill="url(#stain)" />
  <path d="…inner concentric blob…" fill="none" stroke="#5a3a1a" strokeWidth="0.8" strokeOpacity="0.4" />
</svg>
```
The defining trick is the **gradient stop at 60% transparent → 80% partial → 92% dark → 100% slightly transparent again**, which makes the dark ring with a translucent center that real coffee leaves on paper.

Apply with `mix-blend-mode: multiply` to integrate into the page.

## Data shape
```js
const diaryEntries = [
  {
    date: 'apr · 22 · 2026',
    weekday: 'wednesday',
    mood: '☕',         // single emoji
    weather: '🌤',     // single emoji
    title: 'a quiet morning',
    body: `multi-line string with \\n for line breaks`,
    photoLabel: 'morning · 7:42am',  // placeholder caption until real photo lands
    doodles: ['cup', 'sun'],         // sprite keys for left + right page
  },
  // 3 more entries...
];
```

4 entries are included in the prototype; the layout supports any count ≥ 1.

## Design tokens
Uses the same baby-pink palette as the rest of the portfolio:
```js
const palette = {
  wallHue:    355,
  wallChroma: 0.04,
  wallLight:  0.91,
  accent:  '#fcd4e1',  // washi tape, highlighter, pager active
  denim:   '#f4a8c2',  // mood line, secondary doodles
  navy:    '#b87090',  // primary text, headers, page numbers
  cream:   '#fff8fb',  // section background
};
```

## Interactions & behavior

| Trigger | Behavior |
|---|---|
| ← / → arrow click | `setPage(p ± 1)`; book swap is instant (entrance animation was removed — was unreliable in this mock; in production a `rotateY` page-flip would be nice but verify it doesn't trap focus or break paint) |
| Dot pager click | Jumps to that index |
| Hover any nav arrow | `transform: scale(1.10)`, 200ms transition |
| Disabled state | Opacity 0.5, `cursor: not-allowed`, background drops to neutral gray |
| First-page / last-page | Corresponding arrow disabled |

### Accessibility notes (please implement in production)
- Add `aria-label="Previous entry" / "Next entry"` on arrows
- Add `aria-current="true"` on the active dot
- Wrap each page in a labelled region (`role="region"` with `aria-label={`Diary entry: ${entry.title}`}`)
- Ensure keyboard nav: arrow keys advance pages when the section is focused
- The handwriting font (Caveat) at 22px on cream is borderline for contrast — verify against WCAG AA; if it fails, consider bumping size to 24px or using `navy` text on a slightly cooler background

## Components needed in production
1. `<DiarySection palette>` — top-level wrapper with section heading + paginated spreads + dot pager
2. `<DiarySpread entry, palette, side>` — one half of the open book (left/right)
3. `<PolaroidEntry entry, palette, rotate>` — the polaroid card on the left page
4. `<Doodle kind, size, color>` — single-stroke SVG sprite, 8 kinds
5. `<CoffeeStain size, top, left, rotate, opacity>` — radial-gradient stain SVG

Plus the `<RansomText>` component from the main portfolio handoff for the section's "DIARY" title.

## Files in this bundle
- `Diary Section.html` — standalone preview, loads the section in isolation
- `diary-section.jsx` — the section component + DiarySpread, PolaroidEntry, Doodle, CoffeeStain, and the diaryEntries data array
- `collage-primitives.jsx` — provides `<RansomText>`, `<TornPaper>`, textures helper (only RansomText is strictly needed for this section, but the file is included for the section heading)

## How to view locally
Open `Diary Section.html` in any browser. No build step — Babel transpiles JSX in-browser. You'll see the section in isolation against a soft pink background, fully paginated.

## Notes for the implementer
- The polaroid photo currently uses a diagonal-stripe placeholder. Real photos go in the **`photoLabel`-positioned `<div>`**; swap it for an `<img>` and the rest works as-is.
- Don't skip the coffee stains. They're the cheapest, highest-impact "lived-in" detail in the whole section.
- The page-flip animation was removed because the in-browser Babel + React 18 keyframe restart was unreliable. In a real codebase with proper bundling, a 350ms `rotateY(-15deg) → 0deg` animation on `key={page}` should work — verify carefully.
- Body text uses `white-space: pre-line` so newlines in the data string are preserved. Don't pre-wrap with `<br/>` tags; keep the data as plain strings.
- All copy is **placeholder**. Replace before launch.
