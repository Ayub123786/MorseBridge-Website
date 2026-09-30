import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
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
  features = [],
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
          <div style={{ transform: 'translateZ(25px)', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              {Icon && (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: palette.grad,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: `0 4px 16px ${palette.glow}`,
                  }}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </div>
              )}
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)', fontWeight: 800, color: '#F5F5F7', margin: 0, letterSpacing: '-0.025em', lineHeight: 1.25 }}>
                {title}
              </h3>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
              {description}
            </p>
          </div>

          {/* Feature Rows (Rich icon + title + description) */}
          {features && features.length > 0 ? (
            <div
              style={{
                transform: 'translateZ(15px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                margin: '0 0 26px 0',
              }}
            >
              {features.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '9px 12px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.025)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {FeatIcon && (
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.09)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: palette.badgeText,
                          flexShrink: 0,
                        }}
                      >
                        <FeatIcon size={16} strokeWidth={2} />
                      </div>
                    )}
                    <div style={{ textAlign: 'left', flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#F5F5F7', lineHeight: 1.25 }}>
                        {feat.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.35, marginTop: 2 }}>
                        {feat.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : items.length > 0 ? (
            <ul style={{ transform: 'translateZ(15px)', listStyle: 'none', padding: 0, margin: '0 0 26px 0', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {items.map((it, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, color: 'var(--text-body)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: palette.badgeText, flexShrink: 0 }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Magnetic CTA Button with Light Sweep */}
          <div style={{ transform: 'translateZ(25px)', marginTop: 'auto' }}>
            <div
              className="btn-magnetic-signal"
              style={{
                background: palette.btnBg,
                color: palette.btnText,
                justifyContent: 'center',
                padding: '12px 20px',
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>{ctaText}</span>
              <ArrowRight size={16} />
              {/* Light sweep beam */}
              <div className="btn-light-sweep" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}
