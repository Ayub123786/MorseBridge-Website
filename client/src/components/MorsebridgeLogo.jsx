import React from 'react';

/**
 * MorsebridgeLogo
 * -------------------------------------------------------------
 * Official Brand Logo from /assets/website/Primary Logo 2 .png
 * and Submark from /assets/website/Submark 1.png
 */
export default function MorsebridgeLogo({ fontSize = '22px', height, className = '', submarkOnly = false }) {
  const imgHeight = height || (fontSize === '26px' ? 42 : fontSize === '20px' ? 30 : 34);

  if (submarkOnly) {
    return (
      <img
        src="/assets/website/Submark 1.png"
        alt="Morse Bridge"
        className={className}
        style={{
          height: `${imgHeight}px`,
          width: `${imgHeight}px`,
          objectFit: 'contain',
          display: 'block',
        }}
      />
    );
  }

  return (
    <div
      className={`morsebridge-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        userSelect: 'none',
        textDecoration: 'none',
      }}
    >
      <img
        src="/assets/website/Primary Logo 2 .png"
        alt="Morse Bridge"
        style={{
          height: `${imgHeight}px`,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
        onError={(e) => {
          e.currentTarget.src = '/assets/website/morsebridge-primary-logo.png';
        }}
      />
    </div>
  );
}

export function MorsebridgeSubmark({ size = 32, className = '' }) {
  return (
    <img
      src="/assets/website/Submark 1.png"
      alt="Morse Bridge"
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );
}
