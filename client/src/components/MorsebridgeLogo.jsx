export default function MorsebridgeLogo({ isDark = false, fontSize = '21px' }) {
  const textColor = isDark ? '#ffffff' : '#000000';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        userSelect: 'none',
      }}
    >
      {/* Brand Text: MORSE (italic medium) + BRIDGE (italic black/bold) */}
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
          fontSize,
          fontStyle: 'italic',
          color: textColor,
          letterSpacing: '-0.025em',
          lineHeight: 1,
          display: 'inline-flex',
          alignItems: 'baseline',
        }}
      >
        <span style={{ fontWeight: 400, marginRight: 1 }}>MORSE</span>
        <span style={{ fontWeight: 900 }}>BRIDGE</span>
      </span>

      {/* Trailing Gold Morse Dots & Purple Origami Paper Airplane */}
      <svg
        width="34"
        height="22"
        viewBox="0 0 38 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', flexShrink: 0, marginLeft: -1 }}
      >
        <defs>
          <linearGradient id="mbPlaneTopWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D8B4FE" />
            <stop offset="60%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
          <linearGradient id="mbPlaneBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>
          <linearGradient id="mbPlaneBottomWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7E22CE" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
        </defs>

        {/* 3 Golden Morse Dots Trailing Behind the Airplane */}
        <circle cx="4" cy="18" r="2.2" fill="#FACC15" />
        <circle cx="10" cy="20" r="1.8" fill="#FACC15" />
        <circle cx="14" cy="15" r="1.4" fill="#EAB308" />

        {/* Origami Paper Airplane (Tilted up-right flight vector) */}
        <g transform="translate(8, 0)">
          {/* Upper Wing */}
          <polygon points="26,1 2,12 12,14" fill="url(#mbPlaneTopWing)" />
          {/* Main Fuselage / Fold */}
          <polygon points="26,1 12,14 15,20" fill="url(#mbPlaneBody)" />
          {/* Lower Wing */}
          <polygon points="26,1 15,20 19,15" fill="url(#mbPlaneBottomWing)" />
          {/* Crease Dark Accent */}
          <polygon points="12,14 15,20 16,14" fill="#3B0764" />
        </g>
      </svg>
    </div>
  );
}
