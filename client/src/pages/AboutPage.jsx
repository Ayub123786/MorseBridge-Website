import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

/* ── Key Impact Metrics Data ── */
const METRICS = [
  { val: '700+', label: 'Startups Supported' },
  { val: '100+', label: 'Investors & Networks' },
  { val: '100+', label: 'Programs & Initiatives' },
  { val: 'MENA', label: 'Regional Focus' },
];

export default function AboutPage() {
  const scrollToMission = () => {
    const el = document.getElementById('mission-vision');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        background: 'var(--bg-canvas, #0A0A0F)',
        minHeight: '100vh',
        paddingTop: 84,
        color: '#F5F5F7',
        fontFamily: "'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ====================================================================
          1. HERO SECTION (PANORAMIC DUBAI SUNSET SKYLINE)
          ==================================================================== */}
      <section style={{ padding: '36px 0 20px', position: 'relative' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 22,
              overflow: 'hidden',
              minHeight: 440,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Background Panorama Image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: "url('/assets/insights/insights_hero_sunset.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'right 30%',
                zIndex: 0,
              }}
            />

            {/* Gradient Dark Overlay on Left for Flawless Readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(10, 10, 15, 0.96) 0%, rgba(10, 10, 15, 0.88) 45%, rgba(10, 10, 15, 0.3) 100%)',
                zIndex: 1,
              }}
            />

            {/* Hero Content Container */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '60px 48px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 40,
              }}
            >
              {/* Left Column: Heading & CTA */}
              <div style={{ maxWidth: 640 }}>
                {/* Eyebrow */}
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#F5B400',
                    marginBottom: 16,
                    textTransform: 'uppercase',
                  }}
                >
                  ABOUT
                </span>

                {/* Title */}
                <h1
                  style={{
                    fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                    marginBottom: 16,
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  Building a stronger<br />MENA innovation<br />ecosystem.
                </h1>

                {/* Subtitle */}
                <p
                  style={{
                    color: '#C5C5D2',
                    fontSize: 16,
                    lineHeight: 1.6,
                    marginBottom: 32,
                    maxWidth: 500,
                  }}
                >
                  We bring together founders, capital and growth to create opportunity across the region.
                </p>

                {/* CTA Button */}
                <div>
                  <button
                    type="button"
                    onClick={scrollToMission}
                    className="btn-magnetic-signal"
                    style={{
                      background: '#F5B400',
                      color: '#0A0A0F',
                      padding: '13px 30px',
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
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
                    <span>Our mission in action</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Right Column: Editorial Tracked Pillars (from Screenshot 1) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  textAlign: 'left',
                }}
              >
                {['PEOPLE', 'CAPITAL', 'IDEAS', 'OPPORTUNITY', 'A STRONGER', 'TOMORROW'].map((word, idx) => (
                  <span
                    key={idx}
                    style={{
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontSize: 'clamp(13px, 1.6vw, 15px)',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      lineHeight: 1.3,
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          2. MISSION, VISION & STORY + FOUNDER PORTRAIT (2-COLUMN)
          ==================================================================== */}
      <section id="mission-vision" className="section" style={{ padding: '70px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 48,
              alignItems: 'center',
            }}
          >
            {/* Left Column: Mission, Vision, Story */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              {/* Block 1: Our Mission */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#F5B400',
                      textTransform: 'uppercase',
                    }}
                  >
                    OUR MISSION
                  </span>
                  <div style={{ width: 36, height: 1.5, background: '#F5B400', borderRadius: 1 }} />
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(1.7rem, 2.6vw, 2.3rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                    marginBottom: 14,
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  To connect founders and investors through access, expertise and meaningful connections.
                </h2>

                <p style={{ color: '#A3A3B0', fontSize: 15.5, lineHeight: 1.65, margin: 0 }}>
                  We open doors, cultivate relationships and provide the support needed to turn bold ideas into enduring businesses.
                </p>
              </motion.div>

              {/* Block 2: Our Vision */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#F5B400',
                      textTransform: 'uppercase',
                    }}
                  >
                    OUR VISION
                  </span>
                  <div style={{ width: 36, height: 1.5, background: '#F5B400', borderRadius: 1 }} />
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(1.7rem, 2.6vw, 2.3rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                    marginBottom: 14,
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  A more connected, innovative and prosperous MENA region.
                </h2>

                <p style={{ color: '#A3A3B0', fontSize: 15.5, lineHeight: 1.65, margin: 0 }}>
                  We envision a thriving ecosystem where ambitious founders, forward-looking investors and diverse communities come together to shape a more resilient and inclusive future.
                </p>
              </motion.div>

              {/* Block 3: Our Story */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#F5B400',
                      textTransform: 'uppercase',
                    }}
                  >
                    OUR STORY
                  </span>
                  <div style={{ width: 36, height: 1.5, background: '#F5B400', borderRadius: 1 }} />
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(1.7rem, 2.6vw, 2.3rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                    marginBottom: 14,
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  Built on bridges. Driven by impact.
                </h2>

                <p style={{ color: '#A3A3B0', fontSize: 15.5, lineHeight: 1.65, marginBottom: 14 }}>
                  Morse Bridge was founded to bridge the gap between ambitious founders and the capital, networks and expertise they need to succeed.
                </p>
                <p style={{ color: '#A3A3B0', fontSize: 15.5, lineHeight: 1.65, margin: 0 }}>
                  Today, we are a trusted partner to a growing community across the MENA region, working every day to turn potential into progress.
                </p>
              </motion.div>
            </div>

            {/* Right Column: Founder Portrait & Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Outer Card with dark luxury frame */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 480,
                  background: '#101017',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.12)',
                }}
              >
                {/* Ayub Portrait Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 520,
                    background: 'radial-gradient(ellipse at center 40%, rgba(255, 255, 255, 0.04) 0%, #101017 100%)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="/assets/founder/ayub-founder.png"
                    alt="Muhammad Ayub — CEO & Founder"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'bottom center',
                      display: 'block',
                      filter: 'contrast(1.05)',
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/assets/founder/ayub-ceo.png';
                    }}
                  />
                </div>

                {/* Dark Caption Box at Bottom (matching Screenshot 1 & 2) */}
                <div
                  style={{
                    background: '#0D0D14',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '20px 24px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                      marginBottom: 5,
                    }}
                  >
                    Muhammad Ayub — CEO &amp; Founder
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontStyle: 'italic',
                      color: '#A3A3B0',
                      lineHeight: 1.4,
                    }}
                  >
                    "Every founder starts with a spark — we help it fly."
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          3. IMPACT METRICS BAR (4 COLUMNS)
          ==================================================================== */}
      <section style={{ padding: '20px 0 50px' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 24,
              background: '#101017',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 22,
              padding: '38px 32px',
              textAlign: 'center',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
            }}
          >
            {METRICS.map((m, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 16px',
                  borderRight: idx < METRICS.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    marginBottom: 8,
                    letterSpacing: '-0.02em',
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  {m.val}
                </div>
                <div
                  style={{
                    color: '#A3A3B0',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          4. INNOVATION ECOSYSTEM CTA BANNER (SCREENSHOT 3)
          ==================================================================== */}
      <section className="section" style={{ padding: '50px 0 100px' }}>
        <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {/* Background Image: Meeting with Grayscale Tone */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: "url('/assets/founder/guides_playbook.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                filter: 'grayscale(100%) contrast(1.15) brightness(0.65)',
                zIndex: 0,
              }}
            />

            {/* Dark Gradient Overlay for Readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.85) 50%, rgba(10, 10, 15, 0.45) 100%)',
                zIndex: 1,
              }}
            />

            {/* Content Container */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '60px 48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 36,
              }}
            >
              {/* Left Column: Heading + Subtitle + CTA */}
              <div style={{ maxWidth: 540 }}>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.6vw, 2.75rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    marginBottom: 14,
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  A stronger innovation<br />ecosystem together.
                </h2>

                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: 16,
                    lineHeight: 1.6,
                    marginBottom: 28,
                  }}
                >
                  Different perspectives. Bigger opportunities.<br />A more connected MENA.
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
                      padding: '13px 32px',
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 800,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 26px rgba(245, 180, 0, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                    }}
                  >
                    <span>Partner with us</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Right Column: Tracked Pillars */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  textAlign: 'left',
                }}
              >
                <div style={{ width: 44, height: 2, background: '#F5B400', marginBottom: 8 }} />
                {['PEOPLE', 'PARTNERSHIPS', 'PROGRESS'].map((word, i) => (
                  <span
                    key={i}
                    style={{
                      color: 'rgba(255, 255, 255, 0.72)',
                      fontSize: 'clamp(14px, 1.8vw, 17px)',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      lineHeight: 1.25,
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
