// Shared collage primitives: torn paper, tape, gingham, grid, newsprint, ransom-note text

// ---------- TEXTURES (CSS-based) ----------

const textures = {
  // Gingham check pattern
  gingham: (color = '#a8b8d8') => ({
    backgroundColor: '#f4ead8',
    backgroundImage: `
      linear-gradient(${color}66 50%, transparent 50%),
      linear-gradient(90deg, ${color}66 50%, transparent 50%)
    `,
    backgroundSize: '32px 32px, 32px 32px',
  }),
  // Grid / graph paper
  grid: (color = '#7a9ac8', size = 22) => ({
    backgroundColor: '#faf3e0',
    backgroundImage: `
      linear-gradient(${color}55 1px, transparent 1px),
      linear-gradient(90deg, ${color}55 1px, transparent 1px)
    `,
    backgroundSize: `${size}px ${size}px`,
  }),
  // Lined notebook paper
  lined: (color = '#a8b8d8') => ({
    backgroundColor: '#faf3e0',
    backgroundImage: `repeating-linear-gradient(
      transparent, transparent 27px,
      ${color}66 27px, ${color}66 28px
    )`,
  }),
  // Cream paper with subtle noise
  paper: {
    backgroundColor: '#f4ead8',
    backgroundImage: `
      radial-gradient(circle at 20% 30%, #00000008 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, #00000008 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, #ffffff20 0%, transparent 60%)
    `,
  },
  // Textured wall (like the blue wall in inspo)
  wall: (hue = 215, chroma = 0.06, lightness = 0.55) => ({
    backgroundColor: `oklch(${lightness} ${chroma} ${hue})`,
    backgroundImage: `
      radial-gradient(circle at 15% 25%, oklch(${lightness + 0.07} ${chroma + 0.01} ${hue}) 0%, transparent 25%),
      radial-gradient(circle at 75% 65%, oklch(${lightness - 0.07} ${chroma} ${hue}) 0%, transparent 30%),
      radial-gradient(circle at 40% 80%, oklch(${lightness + 0.03} ${chroma + 0.01} ${hue}) 0%, transparent 25%),
      radial-gradient(circle at 90% 15%, oklch(${lightness - 0.03} ${chroma} ${hue}) 0%, transparent 25%)
    `,
  }),
};

// ---------- TORN PAPER (SVG mask with jagged edge) ----------

function tornPath(w, h, sides = ['top','right','bottom','left'], roughness = 8) {
  // Generates an SVG path with jagged edges on specified sides
  const seedRand = (i) => {
    const x = Math.sin(i * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };
  const points = [];
  const step = 14;
  let i = 0;

  // Top edge
  if (sides.includes('top')) {
    for (let x = 0; x <= w; x += step) {
      const jitter = (seedRand(i++) - 0.5) * roughness * 2;
      points.push([x, jitter]);
    }
  } else {
    points.push([0, 0]); points.push([w, 0]);
  }
  // Right edge
  if (sides.includes('right')) {
    for (let y = step; y <= h; y += step) {
      const jitter = (seedRand(i++) - 0.5) * roughness * 2;
      points.push([w + jitter, y]);
    }
  } else {
    points.push([w, h]);
  }
  // Bottom edge
  if (sides.includes('bottom')) {
    for (let x = w - step; x >= 0; x -= step) {
      const jitter = (seedRand(i++) - 0.5) * roughness * 2;
      points.push([x, h + jitter]);
    }
  } else {
    points.push([0, h]);
  }
  // Left edge
  if (sides.includes('left')) {
    for (let y = h - step; y >= step; y -= step) {
      const jitter = (seedRand(i++) - 0.5) * roughness * 2;
      points.push([jitter, y]);
    }
  }
  return 'M ' + points.map(p => p.join(',')).join(' L ') + ' Z';
}

function TornPaper({
  width = 300,
  height = 200,
  children,
  background,
  sides = ['top','right','bottom','left'],
  roughness = 6,
  rotate = 0,
  shadow = true,
  className = '',
  style = {},
  innerStyle = {},
  hoverable = true,
  onClick,
  zIndex = 1,
}) {
  const id = React.useId().replace(/:/g, '');
  const path = tornPath(width, height, sides, roughness);
  const pad = roughness + 4;

  return (
    <div
      className={`collage-piece ${hoverable ? 'collage-hoverable' : ''} ${className}`}
      onClick={onClick}
      style={{
        position: 'absolute',
        width: width + pad * 2,
        height: height + pad * 2,
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center',
        zIndex,
        cursor: hoverable ? 'pointer' : 'default',
        ...style,
      }}
    >
      <svg
        width={width + pad * 2}
        height={height + pad * 2}
        viewBox={`${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}`}
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
      >
        <defs>
          <clipPath id={`clip-${id}`}>
            <path d={path} />
          </clipPath>
          <filter id={`shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.35" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {shadow && (
          <path
            d={path}
            fill="rgba(0,0,0,0.18)"
            transform="translate(3, 5)"
            filter="blur(3px)"
            style={{ filter: 'blur(3px)' }}
          />
        )}
        <foreignObject
          x="0" y="0" width={width} height={height}
          clipPath={`url(#clip-${id})`}
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: '100%',
              height: '100%',
              ...background,
              ...innerStyle,
            }}
          >
            {children}
          </div>
        </foreignObject>
        {/* Subtle deckled inner shadow on torn edges */}
        <path
          d={path}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

// ---------- WASHI TAPE / MASKING TAPE ----------

function Tape({
  width = 110,
  height = 28,
  rotate = -8,
  top = 0,
  left = 0,
  color = 'rgba(168, 184, 216, 0.75)',
  pattern = 'plain', // plain | striped | dotted
  zIndex = 10,
}) {
  let bg = color;
  if (pattern === 'striped') {
    bg = `repeating-linear-gradient(45deg, ${color}, ${color} 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)`;
  } else if (pattern === 'dotted') {
    bg = `radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 2px) 0 0/8px 8px, ${color}`;
  }
  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        top,
        left,
        background: bg,
        backgroundColor: color,
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
        // jagged-ish ends
        clipPath: 'polygon(2% 8%, 98% 0%, 100% 92%, 1% 100%)',
        zIndex,
        pointerEvents: 'none',
      }}
    />
  );
}

// ---------- RANSOM NOTE TEXT ----------

const ransomFonts = [
  { family: '"Playfair Display", serif', weight: 900, style: 'normal' },
  { family: '"DM Serif Display", serif', weight: 400, style: 'normal' },
  { family: '"Bebas Neue", sans-serif', weight: 400, style: 'normal' },
  { family: '"Courier Prime", monospace', weight: 700, style: 'normal' },
  { family: '"Anton", sans-serif', weight: 400, style: 'normal' },
  { family: '"Abril Fatface", serif', weight: 400, style: 'normal' },
  { family: '"Oswald", sans-serif', weight: 700, style: 'normal' },
  { family: '"Playfair Display", serif', weight: 700, style: 'italic' },
];

// Default (blue) ransom palette
const defaultRansomBgs = ['#f4ead8','#e8dfc8','#a8b8d8','#5a7aa8','#faf3e0','#2d3e5f','#d4dce8','#f4ead8'];
const defaultRansomFgs = ['#2d3e5f','#1a2540','#5a7aa8','#f4ead8','#2d3e5f','#f4ead8','#2d3e5f','#2d3e5f'];

// Palette-aware ransom backgrounds. Builds 8 swatches from a palette.
function buildRansomPalette(p) {
  if (!p) return { bgs: defaultRansomBgs, fgs: defaultRansomFgs };
  const cream = p.cream;
  const accent = p.accent;
  const denim = p.denim;
  const navy = p.navy;
  const bgs = [cream, '#ffffff', accent, denim, cream, navy, accent, cream];
  const fgs = [navy, navy, navy, cream, navy, cream, navy, navy];
  return { bgs, fgs };
}

function RansomChar({ char, idx, size = 56, palette }) {
  const { bgs, fgs } = buildRansomPalette(palette);
  // Deterministic but varied
  const seed = char.charCodeAt(0) + idx * 7;
  const fontIdx = seed % ransomFonts.length;
  const bgIdx = (seed * 3) % bgs.length;
  const f = ransomFonts[fontIdx];
  const bg = bgs[bgIdx];
  const fg = fgs[bgIdx];
  const rotate = ((seed * 13) % 17) - 8; // -8..8 deg
  const padX = 0.18;
  const padY = 0.06;

  if (char === ' ') return <span style={{ display: 'inline-block', width: size * 0.35 }}>&nbsp;</span>;

  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: f.family,
        fontWeight: f.weight,
        fontStyle: f.style,
        fontSize: size,
        lineHeight: 1,
        color: fg,
        background: bg,
        padding: `${size * padY}px ${size * padX}px`,
        margin: '0 1px',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 2px 5px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(0,0,0,0.04)',
        // slight irregular cut
        clipPath: `polygon(${1 + (seed % 4)}% ${2 + (seed % 5)}%, ${97 - (seed % 4)}% 0%, 100% ${95 - (seed % 5)}%, ${2 + (seed % 4)}% 100%)`,
        position: 'relative',
        verticalAlign: 'middle',
      }}
    >
      {char}
    </span>
  );
}

function RansomText({ text, size = 56, style = {}, palette }) {
  return (
    <span style={{ display: 'inline-block', lineHeight: 1.4, ...style }}>
      {text.split('').map((c, i) => (
        <RansomChar key={i} char={c} idx={i} size={size} palette={palette} />
      ))}
    </span>
  );
}

// ---------- POLAROID-STYLE PHOTO PLACEHOLDER ----------

function PhotoPlaceholder({ label = 'image', stripe = '#a8b8d8', bg = '#e8e0cc', style = {} }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: `repeating-linear-gradient(135deg, ${stripe}33, ${stripe}33 6px, ${bg} 6px, ${bg} 16px)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: '#2d3e5f',
      letterSpacing: 1,
      textTransform: 'uppercase',
      ...style,
    }}>
      <span style={{ background: '#f4ead8', padding: '4px 8px', border: '1px dashed #2d3e5f55' }}>{label}</span>
    </div>
  );
}

// ---------- NEWSPRINT COLUMN (fake newspaper text) ----------

const newsprintWords = ('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa officia deserunt mollit anim est laborum').split(' ');

function fakeParagraph(seed, len = 30) {
  let r = seed;
  const out = [];
  for (let i = 0; i < len; i++) {
    r = (r * 9301 + 49297) % 233280;
    out.push(newsprintWords[r % newsprintWords.length]);
  }
  return out.join(' ');
}

function Newsprint({ paragraphs = 4, seed = 1, style = {} }) {
  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      fontSize: 9.5,
      lineHeight: 1.35,
      color: '#2d3e5f',
      columnCount: 1,
      textAlign: 'justify',
      ...style,
    }}>
      {Array.from({ length: paragraphs }).map((_, i) => (
        <p key={i} style={{ margin: '0 0 7px', textIndent: 10 }}>
          {fakeParagraph(seed + i * 13, 35 + (i * 4) % 18)}.
        </p>
      ))}
    </div>
  );
}

// Newspaper headline strip (for scrap pieces with a big word visible)
function NewsHeadline({ text = 'GAZETTE', style = {} }) {
  return (
    <div style={{
      fontFamily: '"Playfair Display", "Times New Roman", serif',
      fontWeight: 900,
      fontSize: 22,
      letterSpacing: 1,
      color: '#1a2540',
      borderBottom: '2px solid #1a2540',
      borderTop: '4px double #1a2540',
      padding: '4px 0',
      textAlign: 'center',
      textTransform: 'uppercase',
      ...style,
    }}>{text}</div>
  );
}

// ---------- VINTAGE BOOK SPINE (for stack) ----------

function BookSpine({ title = 'POETRY', color = '#5a7aa8', height = 180, width = 38, rotate = 0, top = 0, left = 0, zIndex = 1 }) {
  return (
    <div style={{
      position: 'absolute',
      top, left,
      width, height,
      background: `linear-gradient(90deg, ${color}cc 0%, ${color} 30%, ${color} 70%, ${color}aa 100%)`,
      borderTop: `3px solid ${color}`,
      borderBottom: `3px solid ${color}88`,
      borderRadius: '2px 2px 0 0',
      transform: `rotate(${rotate}deg)`,
      transformOrigin: 'bottom left',
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15), 2px 4px 8px rgba(0,0,0,0.25)',
      zIndex,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        fontFamily: '"Playfair Display", serif',
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: 2,
        color: '#f4ead8',
        textTransform: 'uppercase',
        textShadow: '0 1px 0 rgba(0,0,0,0.4)',
      }}>{title}</span>
      {/* gold band detail */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: 0, right: 0,
        height: 2,
        background: '#c9a961',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: 0, right: 0,
        height: 2,
        background: '#c9a961',
      }} />
    </div>
  );
}

// ---------- HANDWRITTEN MARGIN NOTE ----------

function HandNote({ children, style = {}, color = '#2d3e5f', size = 18, rotate = 0 }) {
  return (
    <div style={{
      fontFamily: '"Caveat", "Kalam", cursive',
      fontSize: size,
      color,
      transform: `rotate(${rotate}deg)`,
      lineHeight: 1.2,
      ...style,
    }}>{children}</div>
  );
}

// ---------- DOODLE ARROW (hand-drawn) ----------

function DoodleArrow({ width = 80, height = 60, rotate = 0, style = {}, color = '#2d3e5f' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 80 60" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <path
        d="M 5 15 Q 25 5, 50 25 T 70 50"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        style={{ filter: 'url(#rough)' }}
      />
      <path d="M 60 42 L 70 50 L 62 58" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---------- STAR / FLOWER STICKER ----------

function StarSticker({ size = 44, color = '#2d3e5f', rotate = 0, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" style={{ transform: `rotate(${rotate}deg)`, filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.25))', ...style }}>
      <path d="M22 4 L26 18 L40 22 L26 26 L22 40 L18 26 L4 22 L18 18 Z" fill={color} />
    </svg>
  );
}

Object.assign(window, {
  textures, tornPath,
  TornPaper, Tape, RansomText, RansomChar,
  PhotoPlaceholder, Newsprint, NewsHeadline,
  BookSpine, HandNote, DoodleArrow, StarSticker,
});
