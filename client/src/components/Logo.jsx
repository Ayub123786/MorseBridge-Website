import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'md', className = '' }) => {
  const isLarge = size === 'lg';
  return (
    <Link to="/" className={`nav-brand ${className}`}>
      <svg
        width={isLarge ? '32' : '26'}
        height={isLarge ? '32' : '26'}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="8" fill="url(#brandGrad)" />
        {/* Morsebridge stylized soundwave/bridge bars */}
        <rect x="7" y="14" width="3" height="4" rx="1.5" fill="#ffffff" />
        <rect x="12" y="10" width="3" height="12" rx="1.5" fill="#ffffff" />
        <rect x="17" y="7" width="3" height="18" rx="1.5" fill="#93c5fd" />
        <rect x="22" y="12" width="3" height="8" rx="1.5" fill="#ffffff" />
        <defs>
          <linearGradient id="brandGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: isLarge ? '22px' : '18px' }}>
        Morsebridge
      </span>
    </Link>
  );
};
