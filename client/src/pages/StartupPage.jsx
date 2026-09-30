import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  Share2,
  FileText,
  BarChart2,
  Globe,
  Target,
  Crown,
  ArrowRight,
  Calendar,
  MapPin,
} from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';
import LogoMarquee from '../components/3d/LogoMarquee';
import VideoCard3D from '../components/3d/VideoCard3D';
import CommentsCarousel3D from '../components/CommentsCarousel3D';
import { usePartners } from '../hooks/usePartners';
import { useTestimonials } from '../hooks/useTestimonials';

/* ── 1. How We Help Founders (3 Pillars) ── */
const HOW_WE_HELP_FOUNDERS = [
  {
    icon: Users,
    title: 'Raise Capital',
    desc: 'Investor readiness, fundraising strategy, and investor access.',
  },
  {
    icon: TrendingUp,
    title: 'Build and Scale',
    desc: 'Go-to-market strategy, operational guidance and growth support.',
  },
  {
    icon: Share2,
    title: 'Access the Right Network',
    desc: 'Connect with investors, customers and ecosystem opportunities across MENA.',
  },
];

/* ── 2. More Support For Your Journey (6 Support Items) ── */
const MORE_SUPPORT = [
  {
    icon: FileText,
    title: 'Pitch Deck Development',
    desc: 'Compelling storytelling that wins attention.',
  },
  {
    icon: BarChart2,
    title: 'Financial Models',
    desc: 'Robust models for better decisions.',
  },
  {
    icon: Globe,
    title: 'Market Entry Support',
    desc: 'Navigate and expand across MENA markets.',
  },
  {
    icon: Target,
    title: 'GTM Strategy',
    desc: 'Turn your product into predictable growth.',
  },
  {
    icon: Users,
    title: 'Investor Introductions',
    desc: 'Warm connections to the right investors.',
  },
  {
    icon: Crown,
    title: 'Founder Membership',
    desc: 'Ongoing support, exclusive events and a trusted founder community.',
  },
];

/* ── 3. Explore Founder Resources (3 Cards) ── */
const FOUNDER_RESOURCES = [
  {
    id: 'guides',
    title: 'Guides',
    desc: 'Practical playbooks for every stage of your journey.',
    image: '/assets/founder/guides_playbook.jpg',
    ctaText: 'View Guides',
    link: '/the-founder-knowledge-hub',
    isExternal: false,
  },
  {
    id: 'templates',
    title: 'Templates',
    desc: 'Investor-ready templates to save you time.',
    image: '/assets/founder/financial_templates.jpg',
    ctaText: 'View Templates',
    link: '/the-5-minute-cfo-model',
    isExternal: false,
  },
  {
    id: 'membership',
    title: 'Founder Membership',
    desc: 'Join a growing community of ambitious founders.',
    image: '/assets/founder/founder_membership.jpg',
    ctaText: 'Learn More',
    link: '/membership-plans',
    isExternal: false,
  },
];

/* ── 4. Upcoming Founder Opportunities (3 Events) ── */
const UPCOMING_FOUNDER_EVENTS = [
  {
    id: 1,
    title: 'MENA Startup Demo Day',
    date: 'Jul 14, 2025',
    location: 'Dubai, UAE',
    image: '/assets/founder/event_demo_day.jpg',
    link: 'https://myrisingtime.com',
    isExternal: true,
  },
  {
    id: 2,
    title: 'Investor Roundtable',
    date: 'Aug 21, 2025',
    location: 'Riyadh, KSA',
    image: '/assets/founder/event_roundtable.jpg',
    link: 'https://cal.com/morsebridge/30-min-intro',
    isExternal: true,
  },
  {
    id: 3,
    title: 'Climate Tech Showcase',
    date: 'Nov 6, 2025',
    location: 'Virtual',
    image: '/assets/founder/event_climate_tech.jpg',
    link: 'https://cal.com/morsebridge/30-min-intro',
    isExternal: true,
  },
];

export default function StartupPage() {
  const { partners } = usePartners();
  const { testimonials } = useTestimonials();

  // Top 4 video shorts for comments section
  const founderVideos = testimonials.slice(0, 4);

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
          1. HERO SECTION (2-COLUMN: AMBITION + CLOUD & HILLS GRAPHIC)
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
            background:
              'radial-gradient(ellipse, rgba(139, 92, 246, 0.12) 0%, rgba(245, 180, 0, 0.08) 50%, transparent 75%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          className="container container-wide"
          style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}
        >
          {/* Unified FOR FOUNDERS Hero Card + Embedded YouTube Short */}
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
            {/* Subtle background photo overlay (Confined to left side only) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '52%',
                maxWidth: 640,
                backgroundImage: "url('/assets/founder/ayub-founder-full.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center 18%',
                backgroundRepeat: 'no-repeat',
                opacity: 0.1,
                filter: 'grayscale(100%) contrast(1.2)',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0) 100%)',
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

            {/* Content & Video 2-column layout */}
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
              {/* Left Column: Text & CTA */}
              <div>
                {/* Eyebrow Label */}
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#F5B400',
                    marginBottom: 16,
                    textTransform: 'uppercase',
                  }}
                >
                  FOR FOUNDERS
                </span>

                {/* Main Heading */}
                <h1
                  style={{
                    fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                    marginBottom: 20,
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  Turn your ambition into measurable growth.
                </h1>

                {/* Subtitle Paragraph */}
                <p
                  style={{
                    color: '#C5C5D2',
                    fontSize: 15.5,
                    lineHeight: 1.65,
                    marginBottom: 32,
                    maxWidth: 520,
                  }}
                >
                  Get investor-ready, build your GTM engine and connect with the right investors, customers and opportunities across MENA.
                </p>

                {/* Book a Call Button */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
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

              {/* Right Column: YouTube Short Frame */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: 320,
                    aspectRatio: '9/16',
                    borderRadius: 20,
                    overflow: 'hidden',
                    background: '#0B0B12',
                    border: '2px solid #8B5CF6',
                    boxShadow: '0 0 32px rgba(139, 92, 246, 0.35), 0 20px 48px rgba(0, 0, 0, 0.7)',
                    position: 'relative',
                  }}
                >
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/7gjQPHrBeG0?autoplay=1&mute=1&loop=1&playlist=7gjQPHrBeG0&controls=1&modestbranding=1&rel=0"
                    title="The Investors Roundtable + Demo Day"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      display: 'block',
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
          2. HOW WE HELP FOUNDERS (3 PILLARS)
          ==================================================================== */}
      <section className="section" style={{ padding: '70px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                marginBottom: 12,
                fontFamily: "'Proxima Nova', sans-serif",
              }}
            >
              How we help founders
            </h2>
            <p
              style={{
                color: '#A3A3B0',
                fontSize: 16,
                maxWidth: 600,
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Practical support. Strategic connections. Real outcomes.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {HOW_WE_HELP_FOUNDERS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: '#101017',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 20,
                    padding: '42px 30px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(139, 92, 246, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  {/* Icon Circle */}
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: '50%',
                      background: 'rgba(245, 180, 0, 0.12)',
                      border: '1px solid rgba(245, 180, 0, 0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 22,
                    }}
                  >
                    <Icon size={24} color="#F5B400" strokeWidth={1.8} />
                  </div>

                  <h3
                    style={{
                      fontSize: 21,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: 12,
                      letterSpacing: '-0.01em',
                      fontFamily: "'Proxima Nova', sans-serif",
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
          3. MORE SUPPORT FOR YOUR JOURNEY (6 CARDS)
          ==================================================================== */}
      <section className="section" style={{ padding: '70px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                marginBottom: 12,
                fontFamily: "'Proxima Nova', sans-serif",
              }}
            >
              More support for your journey
            </h2>
            <p
              style={{
                color: '#A3A3B0',
                fontSize: 16,
                maxWidth: 600,
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              End-to-end support tailored to where you are.
            </p>
          </div>

          {/* 6 Cards (3x2 Grid) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {MORE_SUPPORT.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: '#101017',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 20,
                    padding: '38px 28px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.4)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(245, 180, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  {/* Icon Circle */}
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: '50%',
                      background: 'rgba(245, 180, 0, 0.12)',
                      border: '1px solid rgba(245, 180, 0, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                    }}
                  >
                    <Icon size={22} color="#F5B400" strokeWidth={1.8} />
                  </div>

                  <h3
                    style={{
                      fontSize: 19.5,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: 10,
                      letterSpacing: '-0.01em',
                      fontFamily: "'Proxima Nova', sans-serif",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      color: '#A3A3B0',
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {card.desc}
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
          4. OVER 100+ FOUNDERS AND INVESTORS WHO TRUST US (LOGO MARQUEE)
          ==================================================================== */}
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
            }}
          >
            Over 100+ Founders and<br />Investors who trust us
          </h2>
        </div>

        {/* 3D Infinite Logo Marquee */}
        <LogoMarquee partners={partners} />
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          5. COMMENTS BY FOUNDERS & INVESTORS (3D ANIMATED CAROUSEL)
          ==================================================================== */}
      <CommentsCarousel3D />

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          6. EXPLORE FOUNDER RESOURCES (3 CARDS)
          ==================================================================== */}
      <section className="section" style={{ padding: '70px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                marginBottom: 12,
                fontFamily: "'Proxima Nova', sans-serif",
              }}
            >
              Explore founder resources
            </h2>
            <p style={{ color: '#A3A3B0', fontSize: 16 }}>
              Guides, templates and insights to help you build, fund and scale.
            </p>
          </div>

          {/* 3 Resource Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 26,
            }}
          >
            {FOUNDER_RESOURCES.map((res) => (
              <motion.div
                key={res.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: '#101017',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 20,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.45)';
                  e.currentTarget.style.boxShadow =
                    '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(139, 92, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4)';
                }}
              >
                {/* Thumbnail Image */}
                <div
                  style={{
                    width: '100%',
                    height: 180,
                    borderRadius: 14,
                    overflow: 'hidden',
                    background: '#161622',
                    marginBottom: 20,
                  }}
                >
                  <img
                    src={res.image}
                    alt={res.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: 8,
                      letterSpacing: '-0.01em',
                      fontFamily: "'Proxima Nova', sans-serif",
                    }}
                  >
                    {res.title}
                  </h3>

                  <p
                    style={{
                      color: '#A3A3B0',
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      marginBottom: 22,
                      flex: 1,
                    }}
                  >
                    {res.desc}
                  </p>

                  <Link
                    to={res.link}
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.gap = '10px';
                      e.currentTarget.style.color = '#F5B400';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.gap = '6px';
                      e.currentTarget.style.color = '#F5B400';
                    }}
                  >
                    <span>{res.ctaText}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          7. UPCOMING FOUNDER OPPORTUNITIES (3 STACKED CARDS)
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
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                margin: 0,
                fontFamily: "'Proxima Nova', sans-serif",
              }}
            >
              Upcoming{' '}
              <span
                style={{
                  background: '#F5D90A',
                  color: '#0A0A0F',
                  padding: '2px 14px',
                  borderRadius: 8,
                  display: 'inline-block',
                  fontWeight: 900,
                }}
              >
                founder
              </span>{' '}
              opportunities
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
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = '10px';
                e.currentTarget.style.color = '#F5B400';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = '6px';
                e.currentTarget.style.color = '#F5B400';
              }}
            >
              <span>View All Opportunities</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Vertical Stack of Events */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {UPCOMING_FOUNDER_EVENTS.map((opp) => (
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
                  e.currentTarget.style.boxShadow =
                    '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.12)';
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
                        fontFamily: "'Proxima Nova', sans-serif",
                      }}
                    >
                      {opp.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 18,
                        color: '#A3A3B0',
                        fontSize: 13,
                        flexWrap: 'wrap',
                      }}
                    >
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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#C4B5FD',
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
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
          8. READY TO TAKE THE NEXT STEP? (DUBAI SKYLINE PANORAMIC BANNER)
          ==================================================================== */}
      <section className="section" style={{ padding: '70px 0 100px' }}>
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
            {/* Background Panorama Image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: "url('/assets/founder/dubai_skyline_night.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                zIndex: 0,
              }}
            />

            {/* Gradient Overlays for High Legibility & Dark Luxury Vibe */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(10, 10, 15, 0.94) 0%, rgba(10, 10, 15, 0.85) 45%, rgba(10, 10, 15, 0.4) 100%)',
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
              {/* Left Column: Title + Subtitle + CTA */}
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
                  Ready to take the next step?
                </h2>

                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: 16,
                    lineHeight: 1.6,
                    marginBottom: 28,
                  }}
                >
                  Book a call with our team and let's build your pathway to growth together.
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
                    <span>Book a Call</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
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
