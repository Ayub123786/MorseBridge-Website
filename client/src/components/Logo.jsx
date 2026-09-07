import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'md', className = '' }) => {
  const isLarge = size === 'lg';
  return (
    <Link to="/" className={`nav-brand ${className}`} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
      <img
        src="/assets/website/Primary Logo 2 .png"
        alt="Morse Bridge"
        style={{
          height: isLarge ? '42px' : '34px',
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
        onError={(e) => {
          e.currentTarget.src = '/assets/website/morsebridge-primary-logo.png';
        }}
      />
    </Link>
  );
};
