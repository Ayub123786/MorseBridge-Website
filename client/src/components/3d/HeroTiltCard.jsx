import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion, useIsMobile } from '../../hooks/useMediaQuery';

const ACCENTS = {
  violet: {
    ring: 'rgba(139, 92, 246, 0.45)',
    glow: 'rgba(139, 92, 246, 0.30)',
    grad: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    badgeBorder: 'rgba(139, 92, 246, 0.4)',
    badgeText: '#C4B5FD',
    btnBg: '#8B5CF6',
    btnText: '#FFFFFF',
    btnHover: '#7C3AED',
  },
  gold: {
    ring: 'rgba(245, 180, 0, 0.45)',
    glow: 'rgba(245, 180, 0, 0.28)',
    grad: 'linear-gradient(135deg, #F5B400 0%, #D97706 100%)',
    badgeBg: 'rgba(245, 180, 0, 0.15)',
    badgeBorder: 'rgba(245, 180, 0, 0.4)',
    badgeText: '#FDE1A0',
    btnBg: '#F5B400',
    btnText: '#0A0A0F',
    btnHover: '#EAB308',
  },
};

export default function HeroTiltCard({
  icon: Icon,
  badge = 'FOR FOUNDERS',
  title = 'I am a Startup',
  description = 'Master high-conversion pitch decks, models, and gain warm introductions to active Tier-1 investors.',
  items = [],
  ctaText = 'Apply for Capital Support',
  accent = 'violet',
  href = '/signup?role=startup',
  onHoverChange,
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const palette = ACCENTS[accent] ?? ACCENTS.violet;
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // Normalized mouse position -0.5..0.5
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mvY, [-0.5, 0.5], [prefersReducedMotion || isMobile ? 0 : 10, prefersReducedMotion || isMobile ? 0 : -10]),
    { stiffness: 220, damping: 20, mass: 0.6 }
  );
  const rotateY = useSpring(
    useTransform(mvX, [-0.5, 0.5], [prefersReducedMotion || isMobile ? 0 : -10, prefersReducedMotion || isMobile ? 0 : 10]),
    { stiffness: 220, damping: 20, mass: 0.6 }
  );
  const scale = useSpring(hovered && !prefersReducedMotion && !isMobile ? 1.03 : 1, {
    stiffness: 260,
    damping: 22,
  });

  const glowX = useTransform(mvX, [-0.5, 0.5], ['10%', '90%']);
  const glowY = useTransform(mvY, [-0.5, 0.5], ['10%', '90%']);

  function handleMouseMove(e) {
    if (prefersReducedMotion || isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mvX.set(x);
    mvY.set(y);
  }

  function handleEnter() {
    setHovered(true);
    if (onHoverChange) onHoverChange(true);
  }

  function handleLeave() {
    mvX.set(0);
    mvY.set(0);
    setHovered(false);
    if (onHoverChange) onHoverChange(false);
  }

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        perspective: 1000,
        display: 'block',
        textDecoration: 'none',
        outline: 'none',
        height: '100%',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="hero-tilt-card-wrapper"
      >
        {/* Glowing border ring */}
        <motion.div
          className="hero-tilt-glow"
          animate={{ opacity: hovered ? 0.9 : 0.25 }}
          transition={{ duration: 0.35 }}
          style={{ background: palette.grad }}
        />

        {/* Card Glass Body */}
        <div className="hero-tilt-card-body">
          {/* Moving Specular Light */}
          {!prefersReducedMotion && !isMobile && (
            <motion.div
              className="hero-tilt-specular"
              style={{
                left: glowX,
                top: glowY,
                background: `radial-gradient(circle, ${palette.glow} 0%, transparent 65%)`,
              }}
            />
          )}

          {/* Top Row */}
          <div style={{ transform: 'translateZ(35px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <span
              style={{
                background: palette.badgeBg,
                border: `1px solid ${palette.badgeBorder}`,
                color: palette.badgeText,
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: 9999,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </span>

            <motion.div
              animate={{ x: hovered ? 4 : 0, rotate: hovered ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpRight size={17} color={palette.badgeText} />
            </motion.div>
          </div>

          {/* Title & Description */}
          <div style={{ transform: 'translateZ(25px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              {Icon && (
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: palette.grad,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: `0 4px 16px ${palette.glow}`,
                  }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </div>
              )}
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#F5F5F7', margin: 0, letterSpacing: '-0.02em' }}>
                {title}
              </h3>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              {description}
            </p>
          </div>

          {/* Feature Bullets */}
          {items.length > 0 && (
            <ul style={{ transform: 'translateZ(15px)', listStyle: 'none', padding: 0, margin: '0 0 26px 0', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {items.map((it, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, color: 'var(--text-body)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: palette.badgeText, flexShrink: 0 }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Magnetic CTA Button with Light Sweep */}
          <div style={{ transform: 'translateZ(25px)', marginTop: 'auto' }}>
            <div
              className="btn-magnetic-signal"
              style={{
                background: palette.btnBg,
                color: palette.btnText,
              }}
            >
              <span>{ctaText}</span>
              <ArrowUpRight size={16} />
              {/* Light sweep beam */}
              <div className="btn-light-sweep" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}
