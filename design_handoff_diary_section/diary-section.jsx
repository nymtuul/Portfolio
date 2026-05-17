// Diary section — open-book spread, 4 entries, paginated.
// Polaroid photo on left page, journal text + mood + coffee stain on right page.

const diaryEntries = [
  {
    date: 'apr · 22 · 2026',
    weekday: 'wednesday',
    mood: '☕',
    weather: '🌤',
    title: 'a quiet morning',
    body: `slept in until eight which is late for me.\nmade coffee, burnt the toast, decided\nthat was a sign to go outside instead.\n\nwalked to the river. the light was doing\nthat thing where everything looks soft\nand a little gold. i forget how much\ni like april.\n\nstarted a new sketchbook. didn't\nknow what to draw so i drew the\ncoffee cup again. always the cup.`,
    photoLabel: 'morning · 7:42am',
    doodles: ['cup', 'sun'],
  },
  {
    date: 'apr · 28 · 2026',
    weekday: 'tuesday',
    mood: '✨',
    weather: '☀',
    title: 'studio day',
    body: `cleaned the desk, finally. found three\npens i thought i lost and a receipt\nfrom february (kept it).\n\nworked on the zine layout for hours.\nit's not where i want it yet but it's\ncloser. i think the cover wants to\nbe blue. or pink. or both.\n\nate dinner standing at the counter\nlike a feral creature. it was great.`,
    photoLabel: 'desk after',
    doodles: ['pen', 'star'],
  },
  {
    date: 'may · 03 · 2026',
    weekday: 'sunday',
    mood: '🌷',
    weather: '🌧',
    title: 'rain & reading',
    body: `it rained all day. didn't fight it.\nmade a pot of tea, put on the\nslowest record i own, read.\n\nfinished the book i've been carrying\naround for weeks. cried a little at\nthe end which was embarrassing\nbut nobody saw.\n\nwrote a letter i won't send. it's\nin the drawer with the others.`,
    photoLabel: 'window seat',
    doodles: ['flower', 'cloud'],
  },
  {
    date: 'may · 11 · 2026',
    weekday: 'monday',
    mood: '🍓',
    weather: '🌤',
    title: 'small things',
    body: `bought strawberries from the market.\nthe woman who sells them remembered\nme this time which felt like a gift.\n\nclass was long. came home, ate the\nstrawberries one by one over the sink.\nthought about how the small things\nare doing all the heavy lifting lately.\n\nmaking a list of small good things\nfor the next bad day. tucking it here.`,
    photoLabel: 'strawberries',
    doodles: ['strawberry', 'heart'],
  },
];

// Tiny doodle SVG sprites
const Doodle = ({ kind, size = 36, color = '#b87090', style = {} }) => {
  const paths = {
    cup: <g><path d="M 8 12 L 26 12 L 24 28 Q 24 30 22 30 L 12 30 Q 10 30 10 28 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" /><path d="M 26 16 Q 32 16 32 22 Q 32 26 26 26" fill="none" stroke={color} strokeWidth="2" /><path d="M 14 6 Q 14 10 16 10" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" /><path d="M 18 6 Q 18 10 20 10" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" /></g>,
    sun: <g><circle cx="18" cy="18" r="6" fill="none" stroke={color} strokeWidth="2" /><path d="M 18 4 L 18 8 M 18 28 L 18 32 M 4 18 L 8 18 M 28 18 L 32 18 M 8 8 L 11 11 M 25 25 L 28 28 M 8 28 L 11 25 M 25 11 L 28 8" stroke={color} strokeWidth="2" strokeLinecap="round" /></g>,
    pen: <g><path d="M 6 30 L 24 12 L 28 16 L 10 34" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" transform="translate(0,-2)" /><path d="M 24 10 L 30 16" stroke={color} strokeWidth="2" strokeLinecap="round" /></g>,
    star: <path d="M 18 4 L 21 14 L 32 14 L 23 20 L 26 31 L 18 24 L 10 31 L 13 20 L 4 14 L 15 14 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />,
    flower: <g><circle cx="18" cy="18" r="4" fill="none" stroke={color} strokeWidth="1.5" /><ellipse cx="18" cy="9" rx="4" ry="6" fill="none" stroke={color} strokeWidth="1.5" /><ellipse cx="18" cy="27" rx="4" ry="6" fill="none" stroke={color} strokeWidth="1.5" /><ellipse cx="9" cy="18" rx="6" ry="4" fill="none" stroke={color} strokeWidth="1.5" /><ellipse cx="27" cy="18" rx="6" ry="4" fill="none" stroke={color} strokeWidth="1.5" /></g>,
    cloud: <path d="M 8 22 Q 6 22 6 18 Q 6 14 10 14 Q 11 9 16 9 Q 21 9 22 13 Q 28 13 28 18 Q 28 22 24 22 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />,
    strawberry: <g><path d="M 12 12 Q 18 8 24 12 Q 28 18 18 30 Q 8 18 12 12 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" /><circle cx="14" cy="18" r="0.8" fill={color} /><circle cx="18" cy="20" r="0.8" fill={color} /><circle cx="22" cy="18" r="0.8" fill={color} /><circle cx="16" cy="23" r="0.8" fill={color} /><circle cx="20" cy="24" r="0.8" fill={color} /><path d="M 14 10 L 18 6 L 22 10" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></g>,
    heart: <path d="M 18 30 Q 4 20 4 12 Q 4 6 10 6 Q 14 6 18 11 Q 22 6 26 6 Q 32 6 32 12 Q 32 20 18 30 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />,
  };
  return (
    <svg viewBox="0 0 36 36" width={size} height={size} style={style}>{paths[kind] || paths.star}</svg>
  );
};

// Coffee stain — irregular ring
const CoffeeStain = ({ size = 140, top, left, opacity = 0.18, rotate = 0 }) => (
  <svg viewBox="0 0 140 140" width={size} height={size} style={{
    position: 'absolute', top, left, opacity, transform: `rotate(${rotate}deg)`,
    pointerEvents: 'none', mixBlendMode: 'multiply',
  }}>
    <defs>
      <radialGradient id="stain" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stopColor="#8a5a3a" stopOpacity="0" />
        <stop offset="80%" stopColor="#8a5a3a" stopOpacity="0.6" />
        <stop offset="92%" stopColor="#5a3a1a" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#8a5a3a" stopOpacity="0.2" />
      </radialGradient>
    </defs>
    <path
      d="M 70 18 Q 110 22 118 60 Q 124 102 88 118 Q 50 128 28 100 Q 12 70 28 42 Q 44 18 70 18 Z"
      fill="url(#stain)"
    />
    <path
      d="M 70 26 Q 102 30 110 60 Q 114 96 84 108 Q 54 116 36 92 Q 24 68 38 46 Q 50 28 70 26 Z"
      fill="none" stroke="#5a3a1a" strokeWidth="0.8" strokeOpacity="0.4"
    />
  </svg>
);

function PolaroidEntry({ entry, palette, rotate = -3 }) {
  return (
    <div style={{
      width: 320,
      background: '#faf3e0',
      padding: '20px 20px 60px',
      transform: `rotate(${rotate}deg)`,
      boxShadow: '6px 10px 22px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(0,0,0,0.05)',
      position: 'relative',
    }}>
      <div style={{
        width: '100%',
        height: 320,
        background: `repeating-linear-gradient(135deg, ${palette.accent}55, ${palette.accent}55 6px, ${palette.cream} 6px, ${palette.cream} 16px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        color: palette.navy,
      }}>
        <span style={{ background: '#fff', padding: '4px 8px', border: `1px dashed ${palette.navy}55` }}>{entry.photoLabel}</span>
      </div>
      <div style={{
        marginTop: 18,
        fontFamily: '"Caveat", cursive',
        fontSize: 22,
        color: palette.navy,
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        {entry.weekday}
        <div style={{ fontSize: 16, opacity: 0.7 }}>{entry.date}</div>
      </div>
    </div>
  );
}

function DiarySpread({ entry, palette, side }) {
  // side: 'left' or 'right'
  const isLeft = side === 'left';
  return (
    <div style={{
      width: 540,
      height: 700,
      background: `
        radial-gradient(ellipse at ${isLeft ? '100%' : '0%'} 50%, rgba(0,0,0,0.12) 0%, transparent 30%),
        repeating-linear-gradient(transparent, transparent 31px, ${palette.accent}55 31px, ${palette.accent}55 32px),
        #fff8eb
      `,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: isLeft
        ? 'inset -10px 0 18px rgba(0,0,0,0.10)'
        : 'inset 10px 0 18px rgba(0,0,0,0.10)',
      padding: 50,
    }}>
      {/* Hole-punch holes if right page */}
      {!isLeft && (
        <>
          <div style={{ position: 'absolute', left: 16, top: 90, width: 14, height: 14, borderRadius: '50%', background: '#e8e0d4', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }} />
          <div style={{ position: 'absolute', left: 16, top: 350, width: 14, height: 14, borderRadius: '50%', background: '#e8e0d4', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }} />
          <div style={{ position: 'absolute', left: 16, top: 610, width: 14, height: 14, borderRadius: '50%', background: '#e8e0d4', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }} />
        </>
      )}

      {isLeft ? (
        // LEFT PAGE — polaroid + date header
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {/* date header */}
          <div style={{
            fontFamily: '"Courier Prime", monospace',
            fontSize: 13,
            letterSpacing: 3,
            color: palette.navy,
            textTransform: 'uppercase',
            marginBottom: 28,
            textAlign: 'center',
            opacity: 0.7,
          }}>
            ── {entry.date} · {entry.weather} {entry.mood} ──
          </div>

          <PolaroidEntry entry={entry} palette={palette} rotate={-4} />

          {/* tape on polaroid */}
          <div style={{
            position: 'absolute', top: 90, left: '50%',
            width: 130, height: 28,
            transform: 'translateX(-50%) rotate(-6deg)',
            background: `repeating-linear-gradient(45deg, ${palette.accent}cc, ${palette.accent}cc 6px, ${palette.cream}aa 6px, ${palette.cream}aa 12px)`,
            clipPath: 'polygon(2% 8%, 98% 0%, 100% 92%, 1% 100%)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
          }} />

          {/* doodle bottom corner */}
          <div style={{ position: 'absolute', bottom: 30, right: 40 }}>
            <Doodle kind={entry.doodles[0]} size={48} color={palette.navy} style={{ opacity: 0.7 }} />
          </div>

          {/* coffee stain */}
          <CoffeeStain size={120} top={580} left={20} opacity={0.22} rotate={15} />
        </div>
      ) : (
        // RIGHT PAGE — handwritten entry
        <div style={{ height: '100%', position: 'relative', paddingLeft: 30 }}>
          {/* Title in big handwriting */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 48,
            fontWeight: 700,
            color: palette.navy,
            lineHeight: 1.1,
            marginBottom: 8,
          }}>
            {entry.title}
          </div>

          {/* Mood line */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 22,
            color: palette.denim,
            marginBottom: 24,
          }}>
            mood: {entry.mood} &nbsp;·&nbsp; weather: {entry.weather}
          </div>

          {/* Body */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 22,
            color: palette.navy,
            lineHeight: 1.55,
            whiteSpace: 'pre-line',
            maxWidth: 420,
          }}>
            {entry.body}
          </div>

          {/* Highlighter on a phrase — pseudo */}
          <div style={{
            position: 'absolute',
            top: 380, left: 60,
            width: 200, height: 22,
            background: `${palette.accent}66`,
            transform: 'rotate(-1deg) skewX(-4deg)',
            zIndex: -1,
            borderRadius: 2,
          }} />

          {/* Doodle in margin */}
          <div style={{ position: 'absolute', top: 40, right: 40 }}>
            <Doodle kind={entry.doodles[1]} size={56} color={palette.denim} style={{ opacity: 0.65 }} />
          </div>

          {/* Star sticker */}
          <div style={{ position: 'absolute', bottom: 80, right: 50 }}>
            <Doodle kind="star" size={32} color={palette.navy} style={{ opacity: 0.5 }} />
          </div>

          {/* Page number */}
          <div style={{
            position: 'absolute', bottom: 24, right: 50,
            fontFamily: '"Caveat", cursive',
            fontSize: 18,
            color: palette.navy,
            opacity: 0.5,
          }}>~ pg. {String(diaryEntries.indexOf(entry) * 2 + 4).padStart(2,'0')} ~</div>

          {/* Coffee stain */}
          <CoffeeStain size={100} top={20} left={350} opacity={0.18} rotate={-30} />
        </div>
      )}
    </div>
  );
}

function DiarySection({ palette }) {
  const [page, setPage] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const goNext = () => {
    if (page < diaryEntries.length - 1) {
      setDirection(1);
      setPage(p => p + 1);
    }
  };
  const goPrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage(p => p - 1);
    }
  };

  const entry = diaryEntries[page];

  return (
    <section style={{
      width: '100%',
      minHeight: 1100,
      position: 'relative',
      padding: '120px 40px 100px',
      background: `
        radial-gradient(ellipse at 50% 0%, ${palette.accent}55 0%, transparent 50%),
        ${palette.cream}
      `,
    }}>
      {/* Section heading */}
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <div style={{
          fontFamily: '"Courier Prime", monospace',
          fontSize: 13,
          letterSpacing: 6,
          color: palette.navy,
          opacity: 0.6,
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>― chapter two ―</div>
        <div style={{ display: 'inline-block' }}>
          <RansomText text="DIARY" size={64} palette={palette} />
        </div>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 24,
          color: palette.navy,
          marginTop: 12,
          opacity: 0.85,
        }}>
          ~ pages from a small notebook ~
        </div>
      </div>

      {/* Open book spread */}
      <div style={{
        maxWidth: 1140,
        margin: '0 auto',
        position: 'relative',
        perspective: 2400,
      }}>
        {/* Book shadow */}
        <div style={{
          position: 'absolute',
          inset: -30,
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%)`,
          filter: 'blur(20px)',
          zIndex: 0,
        }} />

        {/* The spread */}
        <div key={page} style={{
          display: 'flex',
          position: 'relative',
          zIndex: 1,
          borderRadius: 4,
          overflow: 'visible',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}>
          {/* Spine shadow */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: 30,
            transform: 'translateX(-50%)',
            background: `linear-gradient(90deg, transparent, rgba(0,0,0,0.25) 50%, transparent)`,
            zIndex: 5,
            pointerEvents: 'none',
          }} />

          <DiarySpread entry={entry} palette={palette} side="left" />
          <DiarySpread entry={entry} palette={palette} side="right" />
        </div>

        {/* Nav arrows */}
        <button onClick={goPrev} disabled={page === 0} className="diary-nav" style={{
          position: 'absolute',
          left: -70, top: '50%',
          transform: 'translateY(-50%)',
          width: 56, height: 56,
          borderRadius: '50%',
          background: page === 0 ? '#e8e0d4' : palette.accent,
          border: `2px solid ${palette.navy}`,
          cursor: page === 0 ? 'not-allowed' : 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontSize: 22,
          fontWeight: 600,
          color: palette.navy,
          boxShadow: '2px 4px 10px rgba(0,0,0,0.18)',
          opacity: page === 0 ? 0.5 : 1,
          transition: 'all 200ms ease',
          zIndex: 10,
        }}>←</button>

        <button onClick={goNext} disabled={page === diaryEntries.length - 1} className="diary-nav" style={{
          position: 'absolute',
          right: -70, top: '50%',
          transform: 'translateY(-50%)',
          width: 56, height: 56,
          borderRadius: '50%',
          background: page === diaryEntries.length - 1 ? '#e8e0d4' : palette.accent,
          border: `2px solid ${palette.navy}`,
          cursor: page === diaryEntries.length - 1 ? 'not-allowed' : 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontSize: 22,
          fontWeight: 600,
          color: palette.navy,
          boxShadow: '2px 4px 10px rgba(0,0,0,0.18)',
          opacity: page === diaryEntries.length - 1 ? 0.5 : 1,
          transition: 'all 200ms ease',
          zIndex: 10,
        }}>→</button>

        {/* Page indicator dots */}
        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          marginTop: 40,
        }}>
          {diaryEntries.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }} style={{
              width: i === page ? 32 : 12,
              height: 12,
              borderRadius: 6,
              border: `1.5px solid ${palette.navy}`,
              background: i === page ? palette.navy : 'transparent',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 250ms ease',
            }} aria-label={`page ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

window.DiarySection = DiarySection;
