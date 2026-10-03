import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Database,
  Users,
  CreditCard,
  Cloud,
  Cpu,
  HeartPulse,
  Leaf,
  ShoppingCart,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Play,
} from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

/* ── How We Help Investors Data ── */
const HOW_WE_HELP = [
  {
    icon: Compass,
    title: 'Discover Startups',
    desc: "Access curated startup opportunities across MENA's most promising sectors.",
  },
  {
    icon: Database,
    title: 'Support Portfolio',
    desc: 'Get LP-like access to portfolio companies, insights, and value-creation support.',
  },
  {
    icon: Users,
    title: 'Connect and Engage',
    desc: 'Exclusive events, founder-investor roundtables and a collaborative investor network.',
  },
];

/* ── Investment Focus Sectors ── */
const INVESTMENT_SECTORS = [
  { title: 'Fintech', icon: CreditCard },
  { title: 'SaaS', icon: Cloud },
  { title: 'AI & Deep Tech', icon: Cpu },
  { title: 'Healthtech', icon: HeartPulse },
  { title: 'Climate Tech', icon: Leaf },
  { title: 'Consumer & More', icon: ShoppingCart },
];

/* ── Upcoming Opportunities ── */
const UPCOMING_OPPORTUNITIES = [
  {
    id: 1,
    title: 'MENA Startup Demo Day',
    date: 'Jul 14, 2025',
    location: 'Dubai, UAE',
    image: '/assets/events/dubai_rising.jpg',
    link: 'https://myrisingtime.com',
    isExternal: true,
  },
  {
    id: 2,
    title: 'Investor Roundtable',
    date: 'Aug 21, 2025',
    location: 'Riyadh, KSA',
    image: '/assets/events/riyadh_rising.jpg',
    link: 'https://cal.com/morsebridge/30-min-intro',
    isExternal: true,
  },
  {
    id: 3,
    title: 'Climate Tech Showcase',
    date: 'Nov 6, 2025',
    location: 'Virtual',
    image: '/assets/events/bootcamp.png',
    link: 'https://cal.com/morsebridge/30-min-intro',
    isExternal: true,
  },
];

export default function InvestorPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 80, color: '#F5F5F7' }}>
      {/* ====================================================================
          1. HERO SECTION (2-COLUMN: ACCESS FOUNDERS + INVESTOR CIRCLE)
          ==================================================================== */}
      <section style={{ padding: '60px 0 50px', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 800,
            height: 380,
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.12) 0%, rgba(245, 180, 0, 0.08) 50%, transparent 75%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="container container-wide" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          {/* Unified Merged Hero Card (FOR INVESTORS + OUR INVESTOR CIRCLE) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(16, 16, 24, 0.94) 0%, rgba(10, 10, 16, 0.98) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 24,
              padding: '48px 44px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(139, 92, 246, 0.15)',
              overflow: 'hidden',
            }}
          >
            {/* Faint subtle background photo overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: "url('/assets/events/investors_events_ayub.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%',
                opacity: 0.025,
                filter: 'grayscale(100%) brightness(0.4) contrast(1.1)',
                pointerEvents: 'none',
              }}
            />

            {/* Ambient radial glow inside card */}
            <div
              style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '60%',
                height: '80%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-20%',
                right: '10%',
                width: '50%',
                height: '70%',
                background: 'radial-gradient(circle, rgba(245, 180, 0, 0.08) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
              }}
            />

            {/* Content & Investor Circle 2-column layout */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 40,
                alignItems: 'center',
              }}
            >
              {/* Left Column: FOR INVESTORS Text & CTA */}
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 12.5,
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    color: '#C4B5FD',
                    textTransform: 'uppercase',
                    marginBottom: 16,
                  }}
                >
                  FOR INVESTORS
                </span>

                <h1
                  style={{
                    fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                    marginBottom: 18,
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  Access exceptional founders and opportunities.
                </h1>

                <p
                  style={{
                    color: '#D1D5DB',
                    fontSize: 16,
                    lineHeight: 1.65,
                    marginBottom: 32,
                    maxWidth: 520,
                  }}
                >
                  Discover high-potential startups, support portfolio companies and be part of the MENA innovation ecosystem.
                </p>

                <div>
                  <a
                    href="https://cal.com/morsebridge/30-min-intro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-magnetic-signal"
                    style={{
                      background: '#F5B400',
                      color: '#0A0A0F',
                      padding: '13px 30px',
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 800,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 4px 20px rgba(245, 180, 0, 0.35)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 26px rgba(245, 180, 0, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(245, 180, 0, 0.35)';
                    }}
                  >
                    <span>Book a Call</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Right Column: Our investor circle */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    marginBottom: 14,
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  Our investor circle
                </h2>

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px',
                  }}
                >
                  <img
                    src="/investorcircle.png"
                    alt="Our Investor Circle - Leading Institutional Funds & VCs"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: 410,
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'drop-shadow(0 12px 28px rgba(0, 0, 0, 0.7))',
                      transform: 'scale(1.04)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          2. HOW WE HELP INVESTORS (3 PILLARS)
          ==================================================================== */}
      <section className="section" style={{ padding: '70px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              How we help investors
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {HOW_WE_HELP.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: '#101017',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 18,
                    padding: '38px 28px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                    e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(139, 92, 246, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  {/* Icon Circle */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'rgba(245, 180, 0, 0.12)',
                      border: '1px solid rgba(245, 180, 0, 0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                    }}
                  >
                    <Icon size={24} color="#F5B400" strokeWidth={1.8} />
                  </div>

                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: 12,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color: '#A3A3B0',
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          3. INVESTMENT FOCUS (6 SECTOR TILES)
          ==================================================================== */}
      <section className="section" style={{ padding: '70px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              Investment focus
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {INVESTMENT_SECTORS.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#101017',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    padding: '36px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 16px rgba(245, 180, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.35)';
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} color="#F5B400" strokeWidth={1.8} />
                  </div>

                  <h3
                    style={{
                      fontSize: 17.5,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {sec.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          4. INVESTOR ROUND TABLE VIDEO SHOWCASE
          ==================================================================== */}
      <section className="section" style={{ padding: '70px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          {/* Investor Round Table Video Section */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h3
              style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: 8,
              }}
            >
              Investor Round Table
            </h3>
            <p style={{ color: '#A3A3B0', fontSize: 15, margin: 0 }}>
              Watch closed-door discussions on institutional check-writing, startup valuation, and MENA capital deployment.
            </p>
          </div>

          {/* Featured Video Frame (YouTube Short 9:16 portrait style) */}
          <div
            style={{
              maxWidth: 380,
              margin: '0 auto',
              border: '2px solid #8B5CF6',
              borderRadius: 22,
              overflow: 'hidden',
              background: '#0B0B12',
              boxShadow: '0 0 36px rgba(139, 92, 246, 0.35), 0 20px 48px rgba(0, 0, 0, 0.7)',
              position: 'relative',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', background: '#000000' }}>
              {isVideoPlaying ? (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/kTNOAtNIJr0?autoplay=1&rel=0&modestbranding=1"
                  title="Inside the Investors Roundtable + Demo Day"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              ) : (
                <div
                  onClick={() => setIsVideoPlaying(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://i.ytimg.com/vi/kTNOAtNIJr0/maxresdefault.jpg"
                    alt="Inside the Investors Roundtable + Demo Day"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://i.ytimg.com/vi/kTNOAtNIJr0/hqdefault.jpg';
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
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
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.7) 100%)',
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
                      bottom: 20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(10, 10, 15, 0.92)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      padding: '10px 18px',
                      borderRadius: 9999,
                      color: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: 800,
                      textAlign: 'center',
                      maxWidth: '90%',
                      whiteSpace: 'normal',
                      lineHeight: 1.3,
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    Inside the Investors Roundtable + Demo Day
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          5. UPCOMING INVESTOR OPPORTUNITIES (3 STACKED CARDS)
          ==================================================================== */}
      <section className="section" style={{ padding: '70px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 36,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              Upcoming investor opportunities
            </h2>

            <Link
              to="/custom-events"
              style={{
                color: '#F5B400',
                fontSize: 14.5,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'gap 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.gap = '10px'; }}
              onMouseLeave={(e) => { e.currentTarget.style.gap = '6px'; }}
            >
              <span>View All Opportunities</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Vertical Stack of Opportunities */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {UPCOMING_OPPORTUNITIES.map((opp) => (
              <a
                key={opp.id}
                href={opp.link}
                target={opp.isExternal ? '_blank' : '_self'}
                rel={opp.isExternal ? 'noopener noreferrer' : ''}
                style={{
                  background: '#101017',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 18,
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 20,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.45)';
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                }}
              >
                {/* Left: Thumbnail + Title & Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div
                    style={{
                      width: 140,
                      height: 84,
                      borderRadius: 12,
                      overflow: 'hidden',
                      background: '#161622',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={opp.image}
                      alt={opp.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/events/my_rising_time.png';
                      }}
                    />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: 18.5,
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginBottom: 8,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {opp.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: '#A3A3B0', fontSize: 13, flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={14} color="#C4B5FD" />
                        <span>{opp.date}</span>
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={14} color="#F5B400" />
                        <span>{opp.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: View Details CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#C4B5FD', fontSize: 14, fontWeight: 700 }}>
                  <span>View Details</span>
                  <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          6. JOIN OUR INVESTOR NETWORK (FINAL ACTION BANNER)
          ==================================================================== */}
      <section className="section" style={{ padding: '70px 0 100px' }}>
        <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 32, 0.95) 0%, rgba(12, 12, 18, 0.98) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 24,
              padding: '64px 36px',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(245, 180, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient Radial Accent */}
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 600,
                height: 300,
                background: 'radial-gradient(ellipse, rgba(245, 180, 0, 0.12) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
              }}
            />

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.2,
                letterSpacing: '-0.025em',
                marginBottom: 12,
                position: 'relative',
                zIndex: 1,
              }}
            >
              Join our investor network
            </h2>

            <p
              style={{
                color: '#A3A3B0',
                fontSize: 16.5,
                maxWidth: 520,
                margin: '0 auto 32px',
                lineHeight: 1.6,
                position: 'relative',
                zIndex: 1,
              }}
            >
              Be the first to access new opportunities.
            </p>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <a
                href="https://cal.com/morsebridge/30-min-intro"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic-signal"
                style={{
                  background: '#F5B400',
                  color: '#0A0A0F',
                  padding: '14px 38px',
                  borderRadius: 8,
                  fontSize: 15.5,
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 6px 24px rgba(245, 180, 0, 0.35)',
                }}
              >
                <span>Apply to Join</span>
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
