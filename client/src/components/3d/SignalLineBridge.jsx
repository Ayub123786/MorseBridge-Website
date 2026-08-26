import React from 'react';
import { motion } from 'framer-motion';

/**
 * SignalLineBridge
 * -------------------------------------------------------------
 * Absolutely-positioned SVG layer BEHIND the Hero persona cards.
 * Spans the gap between their fixed container positions.
 * Renders an animated glowing Morse code dot-dash pulse
 * symbolizing the live match/bridge between Startup and Investor.
 */
export default function SignalLineBridge({ isHovered = false }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'visible',
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <defs>
          {/* Signal Gradient: Violet (Startup) to Gold (Investor) */}
          <linearGradient id="signalBridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#C084FC" stopOpacity="1" />
            <stop offset="100%" stopColor="#F5B400" stopOpacity="0.85" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="signalGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={isHovered ? 7 : 4} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial Ambient Glow */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity={isHovered ? '0.22' : '0.10'} />
            <stop offset="60%" stopColor="#F5B400" stopOpacity={isHovered ? '0.12' : '0.04'} />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Center Glow */}
        <circle cx="500" cy="200" r="220" fill="url(#centerGlow)" />

        {/* Base Bridge Guide Path */}
        <path
          d="M 220 200 C 360 200, 420 140, 500 140 C 580 140, 640 200, 780 200"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />

        {/* Living Morse Code Pulse Transmission Line (• — • —) */}
        <motion.path
          d="M 220 200 C 360 200, 420 140, 500 140 C 580 140, 640 200, 780 200"
          fill="none"
          stroke="url(#signalBridgeGrad)"
          strokeWidth={isHovered ? '3.5' : '2'}
          strokeDasharray="3 10 24 10 3 10 24 10" // Morse rhythm: dot (3), space (10), dash (24)
          filter="url(#signalGlow)"
          animate={{
            strokeDashoffset: isHovered ? [-200, 0] : [-100, 0],
            opacity: isHovered ? [0.75, 1, 0.75] : [0.4, 0.7, 0.4],
          }}
          transition={{
            strokeDashoffset: {
              duration: isHovered ? 1.8 : 3.2,
              repeat: Infinity,
              ease: 'linear',
            },
            opacity: {
              duration: isHovered ? 1.2 : 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />

        {/* Left Pulse Origin Node (Startup violet) */}
        <circle cx="220" cy="200" r={isHovered ? 5 : 3.5} fill="#8B5CF6" filter="url(#signalGlow)" />

        {/* Right Pulse Destination Node (Investor gold) */}
        <circle cx="780" cy="200" r={isHovered ? 5 : 3.5} fill="#F5B400" filter="url(#signalGlow)" />

        {/* Center Match Node (Sparkles) */}
        <motion.circle
          cx="500"
          cy="140"
          r={isHovered ? 6 : 4}
          fill="#FFFFFF"
          filter="url(#signalGlow)"
          animate={{
            scale: isHovered ? [1, 1.4, 1] : [1, 1.15, 1],
            opacity: isHovered ? [0.8, 1, 0.8] : [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
