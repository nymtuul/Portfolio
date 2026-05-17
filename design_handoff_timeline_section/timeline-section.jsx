// Vertical timeline — compact two-column layout with polaroid images per year
// Card on the outside, polaroid hugs the line, small dot on the line

const timelineEntries = [
  {
    year: '2002',
    title: 'born',
    body: `arrived on a tuesday,\nin a hurry. weighed less\nthan a bag of sugar.`,
    mood: '🍼',
    cardColor: '#fff8eb',
    rotate: -3,
    photoRotate: 4,
    photoLabel: 'baby',
    slotId: 'tl-2002',
  },
  {
    year: '2008',
    title: 'started school',
    body: `first day: cried for ten\nminutes, then made a friend\nover a broken crayon.`,
    mood: '🎒',
    cardColor: '#fcd4e1',
    rotate: 2,
    photoRotate: -5,
    photoLabel: 'first day',
    slotId: 'tl-2008',
  },
  {
    year: '2014',
    title: 'middle school',
    body: `discovered books that weren't\nassigned. spent allowance\non stationery.`,
    mood: '📚',
    cardColor: '#fff8eb',
    rotate: -4,
    photoRotate: 3,
    photoLabel: 'reading era',
    slotId: 'tl-2014',
  },
  {
    year: '2020',
    title: 'graduated',
    body: `commencement on a screen.\nstrange year to come of age.\nbut here we are.`,
    mood: '🎓',
    cardColor: '#d8e8f0',
    rotate: 3,
    photoRotate: -3,
    photoLabel: 'cap & gown',
    slotId: 'tl-2020',
  },
  {
    year: '2022',
    title: 'started uni',
    body: `moved to a new city. learned\nto cook one (1) meal.\nstudying what i love.`,
    mood: '✨',
    cardColor: '#fcd4e1',
    rotate: -2,
    photoRotate: 4,
    photoLabel: 'campus',
    slotId: 'tl-2022',
  },
];

function ConfettiSticker({ kind, top, left, rotate = 0, size = 28, color }) {
  const shapes = {
    dot:   <circle cx="14" cy="14" r="10" fill={color} />,
    star:  <path d="M 14 2 L 17 11 L 26 11 L 19 16 L 21 25 L 14 19 L 7 25 L 9 16 L 2 11 L 11 11 Z" fill={color} />,
    heart: <path d="M 14 24 Q 2 14 2 8 Q 2 3 6 3 Q 11 3 14 8 Q 17 3 22 3 Q 26 3 26 8 Q 26 14 14 24 Z" fill={color} />,
    sparkle: <path d="M 14 2 L 16 11 L 26 14 L 16 17 L 14 26 L 12 17 L 2 14 L 12 11 Z" fill={color} />,
    flower: <g><circle cx="14" cy="14" r="3" fill={color} /><circle cx="14" cy="7" r="3.5" fill={color} /><circle cx="14" cy="21" r="3.5" fill={color} /><circle cx="7" cy="14" r="3.5" fill={color} /><circle cx="21" cy="14" r="3.5" fill={color} /></g>,
    squiggle: <path d="M 4 14 Q 8 4 12 14 T 20 14" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />,
  };
  return (
    <svg viewBox="0 0 28 28" width={size} height={size} style={{
      position: 'absolute', top, left,
      transform: `rotate(${rotate}deg)`,
      filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.2))',
      pointerEvents: 'none',
      zIndex: 4,
    }}>{shapes[kind]}</svg>
  );
}

function TimelineRow({ entry, palette, side }) {
  const isLeft = side === 'left';

  const polaroid = (
    <div className="scrap-tilt" style={{
      width: 200,
      flexShrink: 0,
      position: 'relative',
    }}>
      <div style={{
        background: '#faf3e0',
        padding: '14px 14px 36px',
        transform: `rotate(${entry.photoRotate}deg)`,
        boxShadow: '5px 8px 16px rgba(0,0,0,0.25)',
        position: 'relative',
      }}>
        <div style={{
          width: '100%',
          aspectRatio: '1 / 1',
          background: `repeating-linear-gradient(135deg, ${palette.accent}55, ${palette.accent}55 6px, ${palette.cream} 6px, ${palette.cream} 14px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <image-slot
            id={entry.slotId}
            placeholder={entry.photoLabel}
            shape="rect"
            style={{ width: '100%', height: '100%', display: 'block' }}
          ></image-slot>
        </div>
        <div style={{
          marginTop: 8,
          fontFamily: '"Caveat", cursive',
          fontSize: 18,
          color: palette.navy,
          textAlign: 'center',
        }}>{entry.photoLabel} · {entry.year}</div>
        <div style={{
          position: 'absolute',
          top: -10,
          [isLeft ? 'left' : 'right']: 14,
          width: 60, height: 20,
          background: `repeating-linear-gradient(45deg, ${palette.accent}cc, ${palette.accent}cc 5px, ${palette.cream}aa 5px, ${palette.cream}aa 10px)`,
          clipPath: 'polygon(3% 8%, 98% 0%, 100% 92%, 1% 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
          transform: `rotate(${isLeft ? -8 : 8}deg)`,
        }} />
      </div>
    </div>
  );

  const card = (
    <div className="scrap-tilt" style={{
      width: 280,
      flexShrink: 0,
      position: 'relative',
    }}>
      <div style={{
        background: entry.cardColor,
        padding: '18px 22px',
        transform: `rotate(${entry.rotate}deg)`,
        boxShadow: '6px 8px 16px rgba(0,0,0,0.16)',
        border: '1px solid rgba(0,0,0,0.05)',
        position: 'relative',
      }}>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1,
          color: palette.navy,
          letterSpacing: -1,
          marginBottom: 4,
        }}>{entry.year}</div>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 22,
          color: palette.navy,
          marginBottom: 8,
        }}>
          <span style={{ fontSize: 20 }}>{entry.mood}</span> {entry.title}
        </div>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 17,
          color: palette.navy,
          lineHeight: 1.4,
          whiteSpace: 'pre-line',
          opacity: 0.85,
        }}>{entry.body}</div>
        <div style={{
          position: 'absolute',
          bottom: 0, right: 0,
          width: 20, height: 20,
          background: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.12) 50%)`,
        }} />
      </div>
    </div>
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 60px 1fr',
      alignItems: 'center',
      position: 'relative',
      padding: '20px 0',
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 18, paddingRight: 20 }}>
        {isLeft && (
          <>
            {card}
            {polaroid}
          </>
        )}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 3,
      }}>
        <div style={{
          width: 20, height: 20,
          borderRadius: '50%',
          background: palette.accent,
          border: `3.5px solid ${palette.navy}`,
          boxShadow: '0 2px 5px rgba(0,0,0,0.22)',
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 18, paddingLeft: 20 }}>
        {!isLeft && (
          <>
            {polaroid}
            {card}
          </>
        )}
      </div>
    </div>
  );
}

function TimelineSection({ palette }) {
  return (
    <section style={{
      padding: '80px 40px 100px',
      background: `
        radial-gradient(ellipse at 50% 0%, ${palette.accent}55 0%, transparent 50%),
        ${palette.cream}
      `,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <div style={{
          fontFamily: '"Courier Prime", monospace',
          fontSize: 13,
          letterSpacing: 6,
          color: palette.navy,
          opacity: 0.6,
          textTransform: 'uppercase',
          marginBottom: 10,
        }}>― chapter four · the years ―</div>
        <div style={{ display: 'inline-block' }}>
          <RansomText text="MY YEARS" size={56} palette={palette} />
        </div>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 22,
          color: palette.navy,
          marginTop: 10,
          opacity: 0.85,
        }}>
          ~ drop in your own photos! drag any image onto a polaroid ~
        </div>
      </div>

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        position: 'relative',
      }}>
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 200 1000"
          style={{
            position: 'absolute',
            top: 0, left: '50%',
            width: 200, height: '100%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <path
            d="M 100 10 Q 70 120 100 240 T 100 480 T 100 720 T 100 960 T 100 990"
            fill="none"
            stroke={palette.accent}
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M 100 10 Q 70 120 100 240 T 100 480 T 100 720 T 100 960 T 100 990"
            fill="none"
            stroke={palette.navy}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 4"
            opacity="0.7"
          />
        </svg>

        <ConfettiSticker kind="star" top={80} left="44%" rotate={20} size={26} color="#fcd86a" />
        <ConfettiSticker kind="sparkle" top={180} left="58%" rotate={-15} size={22} color={palette.accent} />
        <ConfettiSticker kind="heart" top={320} left="42%" rotate={-10} size={22} color={palette.denim} />
        <ConfettiSticker kind="dot" top={420} left="58%" rotate={0} size={14} color="#a8d68a" />
        <ConfettiSticker kind="squiggle" top={530} left="42%" rotate={10} size={28} color={palette.denim} />
        <ConfettiSticker kind="flower" top={680} left="58%" rotate={15} size={24} color={palette.accent} />
        <ConfettiSticker kind="star" top={830} left="42%" rotate={-12} size={22} color="#fcd86a" />
        <ConfettiSticker kind="heart" top={920} left="58%" rotate={20} size={22} color={palette.denim} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {timelineEntries.map((entry, i) => (
            <TimelineRow
              key={entry.year}
              entry={entry}
              palette={palette}
              side={i % 2 === 0 ? 'left' : 'right'}
            />
          ))}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36, position: 'relative', zIndex: 3 }}>
            <div className="scrap-tilt" style={{ position: 'relative' }}>
              <div style={{
                background: palette.accent,
                padding: '16px 36px',
                borderRadius: 14,
                fontFamily: '"Caveat", cursive',
                fontWeight: 700,
                fontSize: 36,
                color: palette.navy,
                boxShadow: '4px 6px 14px rgba(0,0,0,0.18)',
                transform: 'rotate(-2deg)',
                border: `2px solid ${palette.navy}`,
                whiteSpace: 'nowrap',
                position: 'relative',
                zIndex: 3,
              }}>
                NOW · 2026 ✨
              </div>
              <div style={{
                position: 'absolute',
                top: -28,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 26, height: 26,
                borderRadius: '50%',
                background: palette.navy,
                border: `4px solid ${palette.accent}`,
                boxShadow: '0 0 0 6px ' + palette.accent + '55, 0 3px 6px rgba(0,0,0,0.2)',
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.TimelineSection = TimelineSection;
