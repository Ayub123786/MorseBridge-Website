import React from 'react';
import {
  BarChart3,
  Sprout,
  TrendingUp,
  Globe,
  Users,
  Calendar,
  GraduationCap,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    title: 'Investor Readiness',
    icon: BarChart3,
    bullets: ['Pitch decks', 'Financial models', 'Data rooms'],
    link: '/i-am-a-startup',
  },
  {
    title: 'Fundraising Support',
    icon: Sprout,
    bullets: ['Fundraising strategy', 'Investor outreach', 'Investor communications'],
    link: '/apply?program=global-fundraising-bootcamp',
  },
  {
    title: 'GTM & Revenue',
    icon: TrendingUp,
    bullets: ['Go-to-market strategy', 'Sales systems', 'Revenue growth'],
    link: '/runway',
  },
  {
    title: 'Market Expansion',
    icon: Globe,
    bullets: ['UAE & MENA entry', 'Strategic partnerships', 'Business setup support'],
    link: 'https://cal.com/morsebridge/30-min-intro',
    isExternal: true,
  },
  {
    title: 'Investor Access',
    icon: Users,
    bullets: ['Investor introductions', 'Curated opportunities', 'Founder-investor matching'],
    link: '/i-am-an-investor',
  },
  {
    title: 'Events & Demo Days',
    icon: Calendar,
    bullets: ['Founder programs', 'Investor roundtables', 'Custom events'],
    link: '/events',
  },
  {
    title: 'Founder & Investor Programs',
    icon: GraduationCap,
    bullets: ['Workshops', 'Memberships', 'Community access'],
    link: '/membership-plans',
  },
  {
    title: 'Insights & Content',
    icon: FileText,
    bullets: ['Reports & guides', 'Podcast & stories', 'Resources & playbooks'],
    link: '/the-founder-knowledge-hub',
  },
];

export default function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      style={{
        background: 'transparent',
        color: '#FFFFFF',
        padding: '85px 0 80px',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, rgba(245, 180, 0, 0.05) 50%, transparent 75%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container container-wide" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 4.6vw, 3.5rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            What We Do
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
              fontWeight: 700,
              color: '#F5F5F7',
              letterSpacing: '-0.015em',
              marginBottom: 24,
            }}
          >
            every founder and investors need to raise, grow and connect
          </p>

          {/* Dark Pill with MENA Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(20, 20, 28, 0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 9999,
              padding: '8px 18px 8px 24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              maxWidth: '95%',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: '#F1F5F9',
                fontSize: 13.5,
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              Morse Bridge supports capital, growth, access and ecosystem building
            </span>
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(109, 40, 217, 0.45) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.55)',
                color: '#DDD6FE',
                padding: '4px 13px',
                borderRadius: 9999,
                fontSize: 11.5,
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              from MENA to the glob
            </span>
          </div>
        </div>

        {/* 8 Feature Cards Grid (4x2) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginBottom: 24,
          }}
        >
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            const CardWrapper = s.isExternal ? 'a' : Link;
            const linkProps = s.isExternal
              ? { href: s.link, target: '_blank', rel: 'noopener noreferrer' }
              : { to: s.link };

            return (
              <CardWrapper
                key={idx}
                {...linkProps}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#101017',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 16,
                  padding: '28px 24px 26px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.6), 0 0 24px rgba(139, 92, 246, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                {/* Icon Circle */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'rgba(245, 180, 0, 0.12)',
                    border: '1px solid rgba(245, 180, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 18,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color="#F5B400" strokeWidth={1.8} />
                </div>

                {/* Card Title */}
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: 14,
                    lineHeight: 1.25,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {s.title}
                </h3>

                {/* 3 Bullet Points */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 9,
                    marginTop: 'auto',
                  }}
                >
                  {s.bullets.map((bullet, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: '#F5B400',
                          flexShrink: 0,
                          boxShadow: '0 0 6px rgba(245, 180, 0, 0.4)',
                        }}
                      />
                      <span
                        style={{
                          color: '#A3A3B0',
                          fontSize: 13.5,
                          fontWeight: 500,
                          lineHeight: 1.4,
                        }}
                      >
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 28, 0.85) 0%, rgba(14, 14, 21, 0.95) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 14,
            padding: '18px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Left Text with Users Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Users size={24} color="#C4B5FD" strokeWidth={1.8} />
            <div
              style={{
                width: 1,
                height: 26,
                background: 'rgba(255, 255, 255, 0.14)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                color: '#FFFFFF',
                fontSize: 17.5,
                fontWeight: 800,
                letterSpacing: '-0.015em',
              }}
            >
              Built for founders, investors and ecosystem partners.
            </span>
          </div>

          {/* Right Action Button */}
          <a
            href="https://cal.com/morsebridge/30-min-intro"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#1A1609',
              border: '1px solid rgba(245, 180, 0, 0.45)',
              color: '#F5B400',
              padding: '11px 24px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 16px rgba(245, 180, 0, 0.12)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#28200B';
              e.currentTarget.style.borderColor = '#F5B400';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(245, 180, 0, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1A1609';
              e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.45)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(245, 180, 0, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Book a Call</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
