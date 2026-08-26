import React from 'react';

/**
 * MorsebridgeLogo
 * -------------------------------------------------------------
 * Official Brand Wordmark & Origami Airplane Symbol
 * - MORSE: crisp white text (italic)
 * - BRIDGE: bold white text (italic)
 * - Origami airplane: electric violet upper wing + signal gold under-facet
 * - Trailing gold Morse code dots
 */
export default function MorsebridgeLogo({ fontSize = '22px' }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        userSelect: 'none',
        textDecoration: 'none',
      }}
    >
      {/* Brand Text: MORSE (italic medium white) + BRIDGE (italic bold white) */}
      <span
        style={{
          fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize,
          fontStyle: 'italic',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          display: 'inline-flex',
          alignItems: 'baseline',
        }}
      >
        <span style={{ fontWeight: 400, color: '#FFFFFF', marginRight: 3 }}>MORSE</span>
        <span style={{ fontWeight: 900, color: '#FFFFFF' }}>BRIDGE</span>
      </span>

      {/* Trailing Gold Morse Dots & Origami Paper Airplane */}
      <svg
        width="34"
        height="22"
        viewBox="0 0 38 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', flexShrink: 0, marginLeft: 1 }}
      >
        <defs>
          <linearGradient id="mbPlaneTopWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="60%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id="mbPlaneBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
          <linearGradient id="mbPlaneGoldFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="60%" stopColor="#F5B400" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* 3 Golden Morse Dots Trailing Behind the Airplane */}
        <circle cx="4" cy="18" r="2.2" fill="#F5B400" />
        <circle cx="10" cy="20" r="1.8" fill="#F5B400" />
        <circle cx="14" cy="15" r="1.4" fill="#EAB308" />

        {/* Origami Paper Airplane */}
        <g transform="translate(8, 0)">
          {/* Upper Main Wing (Electric Violet) */}
          <polygon points="26,1 2,12 12,14" fill="url(#mbPlaneTopWing)" />
          {/* Main Fuselage / Fold */}
          <polygon points="26,1 12,14 15,20" fill="url(#mbPlaneBody)" />
          {/* Lower Triangle Underbelly (Signal Gold) */}
          <polygon points="26,1 15,20 19,15" fill="url(#mbPlaneGoldFacet)" />
          {/* Crease Dark Accent */}
          <polygon points="12,14 15,20 16,14" fill="#2E1065" />
        </g>
      </svg>
    </div>
  );
}
