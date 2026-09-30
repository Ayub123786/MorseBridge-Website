import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const TABS = [
  { id: 'events', label: 'Events & Cohorts' },
  { id: 'podcasts', label: 'Top Podcasts' },
  { id: 'directories', label: 'Investor Data Directories' },
  { id: 'solutions', label: 'Solutions' },
];

const EVENTS_COHORTS_DATA = [
  {
    id: 'my-rising-time',
    title: 'My Rising Time - A Global Summit Where Founders Rise',
    badgeTopLeft: 'COMING THIS NOVEMBER!',
    badgeTopLeftColor: '#7A6BD0',
    badgeTopRight: 'In-Person',
    image: '/assets/events/my_rising_time.png',
    isImageCard: true,
    isHighlighted: true,
    link: 'https://myrisingtime.com',
    isExternal: true,
  },
  {
    id: 'runway-revenue',
    title: 'Runway — Revenue in 90 Days',
    subtitle: '13-Week Hands-On Revenue Sprint with Ayub Rafique',
    badgeTopLeft: 'Cohort 01 Open',
    badgeTopLeftColor: '#7A6BD0',
    badgeTopRight: 'Hybrid Cohort',
    tagLeft: '$2,600 · 0% Equity',
    tagRight: 'Starts 1 November · Only 10 Founders',
    image: '/runway-logo-navy.jpg?v=2',
    desc: "Let's get you paid before the runway runs out. Thirteen weeks. Ten founders. Ayub Rafique sits with you while we build it, launch it, and find the first people willing to pay. You keep 100% of your equity.",
    link: '/runway',
    isExternal: false,
  },
  {
    id: 'fundraising-bootcamp',
    title: 'Global Fundraising Boot Camp',
    subtitle: '5 Workshops, 10 Startups, 25 Angels, VCs & Accelerators',
    badgeTopLeft: 'Every Month',
    badgeTopLeftColor: '#F5B400',
    badgeTopRight: 'Every Month',
    tagLeft: 'Apply with Form',
    tagRight: 'Every Month (Monthly Cohorts)',
    image: '/assets/events/bootcamp.png',
    desc: 'Held every month: 10 early-stage startups master pitch decks, the 5-Minute CFO model, SAFEs, and term sheet negotiations with 25 active angels, VCs, and accelerators.',
    link: '/apply?program=global-fundraising-bootcamp',
    isExternal: false,
  },
];

const INVESTOR_DIRECTORIES_DATA = [
  {
    id: 'inv-1',
    title: 'The 3000 VCs Actually Writing Checks for B2B SaaS',
    badge: '★ 3000 SaaS VCs',
    readTime: '9 min read',
    url: 'https://morsebridge.substack.com/p/the-3000-vcs-actually-writing-checks',
    image: '/assets/substack/investor_3000_vcs.jpeg',
    desc: "(And Why You'll Waste 6 Months If You Pitch Wrong) — Comprehensive database of active B2B SaaS institutional leads and check writers.",
  },
  {
    id: 'inv-2',
    title: '90 Top VCs/Angel Investors Funding Artificial Intelligence Startups in 2026',
    badge: '★ Top 90 AI VCs',
    readTime: '12 min read',
    url: 'https://morsebridge.substack.com/p/90-top-vcsangel-investors-funding',
    image: '/assets/substack/investor_90_ai.jpeg',
    desc: 'This guide profiles leading venture capital investors actively funding AI startups across all stages—from pre-seed to Series B with check sizes & focus.',
  },
  {
    id: 'inv-3',
    title: 'Investor Data 3k',
    badge: '★ 3k Database',
    readTime: '8 min read',
    url: 'https://morsebridge.substack.com/p/investor-data-3k',
    image: '/assets/substack/investor_data_3k.png',
    desc: 'One time 3k prequalified investor database featuring active venture funds, syndicates, and family offices currently deploying capital.',
  },
];

export default function WhatsHotSection() {
  const [activeTab, setActiveTab] = useState('events');
  const [podcastPlaying, setPodcastPlaying] = useState(false);

  return (
    <section id="whats-hot" className="section" style={{ position: 'relative', overflow: 'hidden', paddingTop: 60, paddingBottom: 70 }}>
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 380,
          background: 'radial-gradient(ellipse, rgba(16, 185, 129, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 75%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 4.4vw, 3.4rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              marginBottom: 14,
              lineHeight: 1.15,
            }}
          >
            Whats Hot
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 16,
              maxWidth: 760,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Flagship venture accelerators, monthly fundraising bootcamps, masterclass podcasts, and proprietary investor databases.
          </p>

          {/* Interactive Filter Pills */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              marginTop: 28,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== 'podcasts') setPodcastPlaying(false);
                  }}
                  style={{
                    padding: '10px 24px',
                    borderRadius: 9999,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    border: isActive
                      ? '2.5px solid #10B981'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    background: isActive
                      ? '#14141B'
                      : 'rgba(20, 20, 27, 0.65)',
                    color: isActive ? '#FFFFFF' : '#D1D5DB',
                    boxShadow: isActive
                      ? '0 0 16px rgba(16, 185, 129, 0.25)'
                      : 'none',
                    outline: 'none',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Tab Content Area */}
        <AnimatePresence mode="wait">
          {/* TAB 1: Events & Cohorts */}
          {activeTab === 'events' && (
            <motion.div
              key="events-tab"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 26,
                  alignItems: 'stretch',
                }}
              >
                {EVENTS_COHORTS_DATA.map((card) => {
                  const isHighlighted = card.isHighlighted;
                  const CardWrapper = card.isExternal ? 'a' : Link;
                  const linkProps = card.isExternal
                    ? { href: card.link, target: '_blank', rel: 'noopener noreferrer' }
                    : { to: card.link };

                  return (
                    <CardWrapper
                      key={card.id}
                      {...linkProps}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        textDecoration: 'none',
                        color: 'inherit',
                        borderRadius: 18,
                        overflow: 'hidden',
                        background: '#101017',
                        border: isHighlighted
                          ? '2px solid #8B5CF6'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isHighlighted
                          ? '0 0 24px rgba(139, 92, 246, 0.25), 0 12px 36px rgba(0, 0, 0, 0.5)'
                          : '0 8px 30px rgba(0, 0, 0, 0.4)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Image / Header Container */}
                      <div
                        style={{
                          height: card.isImageCard ? 240 : 190,
                          position: 'relative',
                          overflow: 'hidden',
                          background: card.isImageCard ? '#0A0A0F' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: card.isImageCard ? 'cover' : 'contain',
                            display: 'block',
                            padding: card.isImageCard ? 0 : '14px',
                          }}
                        />

                        {/* Top Left Badge */}
                        {card.badgeTopLeft && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 14,
                              left: 14,
                              background: card.badgeTopLeftColor || '#7A6BD0',
                              color: card.badgeTopLeftColor === '#F5B400' ? '#0A0A0F' : '#FFFFFF',
                              padding: '5px 13px',
                              borderRadius: 9999,
                              fontSize: 11,
                              fontWeight: 800,
                              letterSpacing: '0.04em',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                            }}
                          >
                            {card.badgeTopLeft}
                          </div>
                        )}

                        {/* Top Right Badge */}
                        {card.badgeTopRight && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 14,
                              right: 14,
                              background: 'rgba(10, 10, 15, 0.85)',
                              backdropFilter: 'blur(8px)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              color: '#FFFFFF',
                              padding: '5px 13px',
                              borderRadius: 9999,
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            {card.badgeTopRight}
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div
                        style={{
                          padding: '22px 22px 24px',
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                        }}
                      >
                        {card.tagLeft && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              marginBottom: 12,
                              flexWrap: 'wrap',
                            }}
                          >
                            <span
                              style={{
                                background: 'rgba(16, 185, 129, 0.16)',
                                border: '1px solid rgba(16, 185, 129, 0.4)',
                                color: '#10B981',
                                fontSize: 11.5,
                                fontWeight: 700,
                                padding: '3px 10px',
                                borderRadius: 6,
                              }}
                            >
                              {card.tagLeft}
                            </span>
                            <span style={{ fontSize: 12, color: '#A3A3B0', fontWeight: 500 }}>
                              {card.tagRight}
                            </span>
                          </div>
                        )}

                        <h3
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            lineHeight: 1.3,
                            marginBottom: card.subtitle ? 5 : 0,
                          }}
                        >
                          {card.title}
                        </h3>

                        {card.subtitle && (
                          <div
                            style={{
                              fontSize: 12.5,
                              fontWeight: 700,
                              color: '#F5B400',
                              marginBottom: 10,
                            }}
                          >
                            {card.subtitle}
                          </div>
                        )}

                        {card.desc && (
                          <p
                            style={{
                              color: 'var(--text-muted)',
                              fontSize: 13,
                              lineHeight: 1.55,
                              marginTop: 4,
                              marginBottom: 0,
                            }}
                          >
                            {card.desc}
                          </p>
                        )}
                      </div>
                    </CardWrapper>
                  );
                })}
              </div>

              {/* Bottom CTA Button for Events */}
              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <Link
                  to="/custom-events"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#0D2818',
                    color: '#10B981',
                    border: '1px solid rgba(16, 185, 129, 0.45)',
                    padding: '12px 30px',
                    borderRadius: 9999,
                    fontSize: 14.5,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#113520';
                    e.currentTarget.style.borderColor = '#10B981';
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(16, 185, 129, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0D2818';
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.45)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.15)';
                  }}
                >
                  <span>View All Events &amp; Summits</span>
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Top Podcasts (Screenshot 1: Featured Podcast with Purple Border & Play Button) */}
          {activeTab === 'podcasts' && (
            <motion.div
              key="podcasts-tab"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {/* Outer Purple Bordered Frame */}
              <div
                style={{
                  maxWidth: 820,
                  margin: '0 auto',
                  border: '2px solid #8B5CF6',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#0B0B12',
                  boxShadow: '0 0 32px rgba(139, 92, 246, 0.3), 0 16px 40px rgba(0, 0, 0, 0.6)',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000000' }}>
                  {podcastPlaying ? (
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/O1hPe9GncBQ?autoplay=1&rel=0&modestbranding=1"
                      title="Principal Plug and Play: Investors are Not ATM Machines!"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    />
                  ) : (
                    <div
                      onClick={() => setPodcastPlaying(true)}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        cursor: 'pointer',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src="https://i.ytimg.com/vi/O1hPe9GncBQ/maxresdefault.jpg"
                        alt="Principal Plug and Play: Investors are Not ATM Machines!"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.4s ease',
                        }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://i.ytimg.com/vi/O1hPe9GncBQ/hqdefault.jpg';
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />

                      {/* Scrim Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.65) 100%)',
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Central Glowing Purple Play Button */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 68,
                          height: 68,
                          borderRadius: '50%',
                          background: '#8B5CF6',
                          boxShadow: '0 0 32px rgba(139, 92, 246, 0.85), 0 4px 16px rgba(0,0,0,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.12)';
                          e.currentTarget.style.boxShadow = '0 0 42px rgba(139, 92, 246, 1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                          e.currentTarget.style.boxShadow = '0 0 32px rgba(139, 92, 246, 0.85), 0 4px 16px rgba(0,0,0,0.5)';
                        }}
                      >
                        <Play size={28} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: 3 }} />
                      </div>

                      {/* Bottom Banner Title Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 18,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'rgba(10, 10, 15, 0.9)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.14)',
                          padding: '10px 24px',
                          borderRadius: 9999,
                          color: '#FFFFFF',
                          fontSize: 15,
                          fontWeight: 800,
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          maxWidth: '92%',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        Principal Plug and Play: Investors are Not ATM Machines!
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Subtitle Caption below video frame (Exact text from screenshot) */}
              <div style={{ textAlign: 'center', marginTop: 22 }}>
                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16.5,
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Ayub sat with andrea
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Investor Data Directories (Screenshot 2: 3 Cards + Access Substack Database Button) */}
          {activeTab === 'directories' && (
            <motion.div
              key="directories-tab"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 24,
                  maxWidth: 1180,
                  margin: '0 auto',
                }}
              >
                {INVESTOR_DIRECTORIES_DATA.map((dir) => (
                  <a
                    key={dir.id}
                    href={dir.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      color: 'inherit',
                      borderRadius: 16,
                      overflow: 'hidden',
                      background: '#101017',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                      transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.4)';
                      e.currentTarget.style.boxShadow = '0 12px 36px rgba(245, 180, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4)';
                    }}
                  >
                    {/* Thumbnail Image Container */}
                    <div style={{ height: 180, position: 'relative', overflow: 'hidden', background: '#161622' }}>
                      <img
                        src={dir.image}
                        alt={dir.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: dir.title.includes('3000 VCs') ? 'top center' : 'center',
                          display: 'block',
                        }}
                      />

                      {/* Top Left Badge (Gold Star & Pill) */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          left: 10,
                          background: 'rgba(10, 10, 15, 0.9)',
                          backdropFilter: 'blur(8px)',
                          color: '#F5B400',
                          border: '1px solid rgba(245, 180, 0, 0.4)',
                          padding: '4px 10px',
                          borderRadius: 9999,
                          fontSize: 11,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        {dir.badge}
                      </div>

                      {/* Top Right Read Time Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          background: 'rgba(10, 10, 15, 0.88)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          padding: '4px 10px',
                          borderRadius: 9999,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {dir.readTime}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          marginBottom: 8,
                          lineHeight: 1.35,
                        }}
                      >
                        {dir.title}
                      </h3>
                      <p
                        style={{
                          color: '#9CA3AF',
                          fontSize: 12.8,
                          lineHeight: 1.55,
                          margin: 0,
                          flex: 1,
                        }}
                      >
                        {dir.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Bottom Button (Exact style from screenshot) */}
              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <a
                  href="https://morsebridge.substack.com/s/investor-data?sort=top"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#161309',
                    border: '1px solid rgba(245, 180, 0, 0.45)',
                    color: '#F5B400',
                    padding: '11px 26px',
                    borderRadius: 8,
                    fontSize: 14.5,
                    fontWeight: 800,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 16px rgba(245, 180, 0, 0.12)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#221B0A';
                    e.currentTarget.style.borderColor = '#F5B400';
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(245, 180, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#161309';
                    e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.45)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(245, 180, 0, 0.12)';
                  }}
                >
                  <span>Access Substack Database</span>
                  <span style={{ fontSize: 16 }}>↗</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Solutions (Screenshot 3: Purple Border Container with The 5-Minute CFO Model + Curated Investor Data Suite) */}
          {activeTab === 'solutions' && (
            <motion.div
              key="solutions-tab"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {/* Outer Purple Border Container */}
              <div
                style={{
                  maxWidth: 1040,
                  margin: '0 auto',
                  border: '2px solid #8B5CF6',
                  borderRadius: 14,
                  background: '#0E0E18',
                  boxShadow: '0 0 32px rgba(139, 92, 246, 0.22), 0 16px 40px rgba(0, 0, 0, 0.5)',
                  padding: '36px 36px',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 40,
                  }}
                >
                  {/* Left Column: The 5-Minute CFO Model */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <span
                        style={{
                          background: 'rgba(245, 180, 0, 0.12)',
                          border: '1px solid rgba(245, 180, 0, 0.35)',
                          color: '#F5B400',
                          padding: '4px 12px',
                          borderRadius: 9999,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        Financial Modeling
                      </span>
                      <span style={{ color: '#9CA3AF', fontSize: 12.5, fontWeight: 500 }}>
                        Interactive Tool &amp; Download
                      </span>
                    </div>

                    {/* Title */}
                    <Link
                      to="/the-5-minute-cfo-model"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 22,
                          fontWeight: 800,
                          color: '#FFFFFF',
                          lineHeight: 1.25,
                          marginBottom: 12,
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#F5B400'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                      >
                        The 5-Minute CFO Model
                      </h3>
                    </Link>

                    {/* Description */}
                    <p
                      style={{
                        color: '#9CA3AF',
                        fontSize: 13.5,
                        lineHeight: 1.6,
                        marginBottom: 22,
                      }}
                    >
                      An institutional-grade 3-statement financial engine built for Pre-Seed to Series A founders. Features automated P&amp;L, 18-month cash runway radar, and live CAC/LTV unit economics.
                    </p>

                    {/* 4 Checklist Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
                      {[
                        'Live in-browser Runway & Burn simulator',
                        'Instant download in Excel (.xlsx) and CSV formats',
                        'Pre-wired 3-statement linking (P&L, Balance Sheet, Cash Flow)',
                        'Data room KPI charts ready to paste into Notion/DocSend',
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              border: '1.5px solid #8B5CF6',
                              color: '#8B5CF6',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              fontSize: 11,
                              fontWeight: 800,
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ color: '#E5E7EB', fontSize: 13.5, lineHeight: 1.45 }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Curated Investor Data Suite */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <span
                        style={{
                          background: 'rgba(16, 185, 129, 0.14)',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          color: '#10B981',
                          padding: '4px 12px',
                          borderRadius: 9999,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        Substack Exclusive
                      </span>
                      <span style={{ color: '#9CA3AF', fontSize: 12.5, fontWeight: 500 }}>
                        3,000+ Check Writers
                      </span>
                    </div>

                    {/* Title */}
                    <a
                      href="https://morsebridge.substack.com/s/investor-data"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 22,
                          fontWeight: 800,
                          color: '#FFFFFF',
                          lineHeight: 1.25,
                          marginBottom: 12,
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#10B981'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                      >
                        Curated Investor Data Suite
                      </h3>
                    </a>

                    {/* Description */}
                    <p
                      style={{
                        color: '#9CA3AF',
                        fontSize: 13.5,
                        lineHeight: 1.6,
                        marginBottom: 22,
                      }}
                    >
                      The definitive institutional investor databases curated on the MorseBridge Substack. Unlocks direct check-writers, verified check sizes ($250k–$5M), stage fit, and partner contact channels.
                    </p>

                    {/* 4 Checklist Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
                      {[
                        '3,000+ VCs actively writing checks for B2B SaaS',
                        '90 Top VCs & Angel Investors funding AI startups in 2026',
                        '100+ Middle East Family Offices (UAE & Saudi Arabia)',
                        '120 Curated high-execution early-stage syndicates',
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              border: '1.5px solid #8B5CF6',
                              color: '#8B5CF6',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              fontSize: 11,
                              fontWeight: 800,
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ color: '#E5E7EB', fontSize: 13.5, lineHeight: 1.45 }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Button (Exact style from screenshot: Solutions Database ↗ in gold) */}
              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <Link
                  to="/solutions"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#F5B400',
                    fontSize: 15,
                    fontWeight: 800,
                    textDecoration: 'none',
                    padding: '10px 22px',
                    background: '#161309',
                    border: '1px solid rgba(245, 180, 0, 0.45)',
                    borderRadius: 8,
                    boxShadow: '0 4px 16px rgba(245, 180, 0, 0.12)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#221B0A';
                    e.currentTarget.style.borderColor = '#F5B400';
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(245, 180, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#161309';
                    e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.45)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(245, 180, 0, 0.12)';
                  }}
                >
                  <span>Solutions Database</span>
                  <span style={{ fontSize: 16 }}>↗</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
