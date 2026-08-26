import React from 'react';
import { motion } from 'framer-motion';

export default function LogoMarquee({ partners = [] }) {
  if (!partners || partners.length === 0) return null;

  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <div className="logo-marquee-wrapper">
      <div className="logo-marquee-track">
        {marqueeItems.map((p, idx) => (
          <div
            key={`${p.id}-${idx}`}
            className="logo-marquee-item-clean"
          >
            {p.logo ? (
              <img
                src={p.logo}
                alt={p.name}
                className="logo-marquee-img-clean"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.innerHTML = `<span class="logo-fallback-text font-data">${p.name}</span>`;
                }}
              />
            ) : (
              <span className="logo-fallback-text font-data">{p.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
