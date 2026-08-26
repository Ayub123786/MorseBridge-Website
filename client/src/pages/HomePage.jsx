import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, LineChart, ArrowUpRight, Sparkles, Radio } from 'lucide-react';
import Footer from '../components/Footer';

// 3D & Signal Modular Components
import AnimatedGridBackground from '../components/3d/AnimatedGridBackground';
import SignalLineBridge from '../components/3d/SignalLineBridge';
import SignalDivider from '../components/3d/SignalDivider';
import ScrollSignalProgress from '../components/3d/ScrollSignalProgress';
import HeroTiltCard from '../components/3d/HeroTiltCard';
import EventCard3D from '../components/3d/EventCard3D';
import VideoCard3D from '../components/3d/VideoCard3D';
import LogoMarquee from '../components/3d/LogoMarquee';
import PodcastStack from '../components/3d/PodcastStack';
import SubstackSection from '../components/3d/SubstackSection';
import CountUpNumber from '../components/common/CountUpNumber';
import ShimmerSkeleton from '../components/common/ShimmerSkeleton';

// Dynamic API Hooks
import { useEvents } from '../hooks/useEvents';
import { usePodcasts } from '../hooks/usePodcasts';
import { usePartners } from '../hooks/usePartners';
import { usePastEvents } from '../hooks/usePastEvents';
import { useTestimonials } from '../hooks/useTestimonials';

/* ── Investors Marquee Static Data ── */
const INVESTORS_ROW_1 = [
  { id: 1, name: 'Sultan Al-Husseini', role: 'MENA Seed Fund · Partner', img: 1 },
  { id: 2, name: 'Rashid Al-Nuaimi', role: 'Gulf Tech Ventures · Principal', img: 2 },
  { id: 3, name: 'Zaid Al-Bawardi', role: 'Oasis Capital · Managing Director', img: 3 },
  { id: 4, name: 'Khalid Al-Qurashi', role: 'Desert Angels · Lead Investor', img: 4 },
  { id: 5, name: 'Hussain Al-Harbi', role: 'Venture Capitalist · Investor', img: 5 },
  { id: 6, name: 'Bader Al-Mutairi', role: 'Global Tech Angels · Syndicate Lead', img: 6 },
  { id: 7, name: 'Yousef Al-Shammari', role: 'FinTech Syndicate · GP', img: 7 },
  { id: 8, name: 'Hamad Al-Ghamdi', role: 'NextGen VC · Partner', img: 8 },
  { id: 9, name: 'Nasser Al-Dossari', role: 'Early Stage Fund · Investment Director', img: 9 },
  { id: 10, name: 'Majed Al-Khaldi', role: 'Falcon Capital · Partner', img: 10 },
  { id: 11, name: 'Rami Haddad', role: 'Horizon Fund · GP', img: 11 },
];

const INVESTORS_ROW_2 = [
  { id: 12, name: 'Tarek Mansour', role: 'Venture Partner · Angel Investor', img: 12 },
  { id: 13, name: 'Sami Jarrah', role: 'ScaleUp MENA · General Partner', img: 13 },
  { id: 14, name: 'Bilal Kassem', role: 'Seed Bridge · Managing Partner', img: 14 },
  { id: 15, name: 'Marwan Fakhoury', role: 'Cedar Capital · Principal', img: 15 },
  { id: 16, name: 'Nabil Touma', role: 'GCC Angels · Founding Member', img: 16 },
  { id: 17, name: 'Fadi Chaaban', role: 'Venture Partner · Tech Mentor', img: 17 },
  { id: 18, name: 'Waleed Samaha', role: 'Oasis Capital · Principal', img: 18 },
  { id: 19, name: 'Ziad Boulos', role: 'MENA Seed Fund · Associate GP', img: 19 },
  { id: 20, name: 'Kareem Barakat', role: 'Early Stage Fund · Partner', img: 20 },
  { id: 21, name: 'Fatima Al-Nuaimi', role: 'FinTech Syndicate · Principal', img: 21 },
  { id: 22, name: 'Omar Al-Majed', role: 'Global Tech Angels · Venture Partner', img: 22 },
];

/* ── What We Do Capabilities ── */
const WHAT_WE_DO_DATA = [
  {
    title: 'Fundraising Enablement',
    image: '/assets/what-we-do/fundraising_enablement.png',
    link: 'https://cal.com/morsebridge/30-min-intro',
    points: [
      'Strategic introductions to vetted institutional investors',
      'Access to exclusive summits & live pitch opportunities',
      'Guidance on positioning and high-conversion fundraising narratives',
    ],
  },
  {
    title: 'Revenue Strategy & Systems',
    image: '/assets/what-we-do/revenue_strategy.png',
    link: 'https://cal.com/morsebridge/30-min-intro',
    points: [
      'Advising on revenue models and pricing tiering',
      'Building scalable revenue systems (sales loops, monetization, GTM)',
      'Growth planning aligned with top-tier venture expectations',
    ],
  },
  {
    title: 'Fundraising Playbook',
    image: '/assets/what-we-do/fundraising_playbook.jpg',
    link: 'https://morsebridge.substack.com/s/fundraising-playbook',
    points: [
      'Investor-ready data room structuring & diligence prep',
      'High-converting outreach sequences & warm intro templates',
      'Due diligence checklist & term sheet negotiation roadmap',
    ],
  },
];

/* ── Stat Cards ("How Are We Making a Difference?") ── */
const DIFFERENCE_CARDS = [
  {
    stat: '450',
    suffix: '+',
    label: 'Founders Supported',
    desc: 'Guiding visionary founders from pre-seed ideation to institutional rounds with hands-on support.',
    featured: true,
  },
  {
    stat: '500',
    suffix: '+',
    label: 'VCs & Family Offices',
    desc: 'Active network of institutional funds, family offices, and verified angel syndicates.',
    featured: false,
  },
  {
    stat: '85',
    suffix: '+',
    label: 'Pitch Competitions & Summits',
    desc: 'High-impact investor roundtables, summits, and demo days across Dubai, Riyadh, and London.',
    featured: false,
  },
  {
    stat: '98',
    suffix: '%',
    label: 'Founder Satisfaction Rate',
    desc: 'Rated 4.9/5 across hundreds of founder advisory sessions and fundraising masterclasses.',
    featured: false,
  },
  {
    stat: '10',
    suffix: '+',
    label: 'Flagship Bootcamps',
    desc: 'Intensive cohort-based bootcamps turning early-stage ideas into investor-ready ventures.',
    featured: false,
  },
  {
    stat: '100',
    suffix: '+',
    label: 'Knowledge Hub Guides',
    desc: 'Institutional-grade models, cap table calculators, SAFE notes, and due diligence frameworks.',
    featured: false,
  },
];

/* ── FAQs ── */
const FAQS_DATA = [
  {
    q: "I'm a VC — can you help train our portfolio companies on GTM?",
    a: "Yes, we deliver custom GTM bootcamps, revenue model audits, and hands-on positioning sprints for VC and accelerator portfolios across MENA and globally.",
  },
  {
    q: 'Do you offer GTM funnel audits for VC portfolio companies?',
    a: 'Absolutely. We conduct deep-dive revenue funnel audits analyzing pricing tiering, unit economics, conversion friction, and customer acquisition efficiency.',
  },
  {
    q: 'What is MorseBridge and how does it help founders?',
    a: 'MorseBridge is a premier venture enablement platform. We prepare founders for institutional capital through financial modeling products, pitch deck audits, and warm introductions to active investors.',
  },
  {
    q: 'How does The 5-Minute CFO Model work?',
    a: 'The 5-Minute CFO Model is an institutional-grade financial modeling framework designed for high-growth startups. It automates revenue builds, headcount plans, and runway scenarios in minutes.',
  },
  {
    q: 'How can I get invited to private investor dinners and summits?',
    a: 'Apply through our platform or register for an upcoming bootcamp cohort. We maintain a strict 2:1 founder-to-investor ratio at all private dinners to ensure high-conviction conversations.',
  },
];

function FaqAccordionItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: '#14141B',
        border: '1px solid var(--border-subtle)',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: open ? '0 0 24px rgba(139, 92, 246, 0.15)' : 'var(--shadow-xs)',
        borderColor: open ? 'rgba(139, 92, 246, 0.6)' : 'var(--border-subtle)',
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: '22px 26px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: 16.5, fontWeight: 700, color: '#F5F5F7', lineHeight: 1.4 }}>
          {item.q}
        </span>
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: open ? '#8B5CF6' : 'rgba(255, 255, 255, 0.08)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 700,
            transform: open ? 'rotate(45deg)' : 'rotate(0)',
            transition: 'transform 0.25s ease, background 0.2s ease',
            flexShrink: 0,
            marginLeft: 16,
          }}
        >
          +
        </span>
      </div>
      {open && (
        <div
          style={{
            padding: '0 26px 24px',
            color: 'var(--text-body)',
            fontSize: 14.5,
            lineHeight: 1.7,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: 18,
          }}
        >
          {item.a}
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   HOMEPAGE MAIN COMPONENT (DARK SIGNAL TRANSMISSION THEME)
   ========================================================================== */
export default function HomePage() {
  const { events, loading: eventsLoading } = useEvents();
  const { podcasts, loading: podcastsLoading } = usePodcasts();
  const { partners, loading: partnersLoading } = usePartners();
  const { pastEvents, loading: pastEventsLoading } = usePastEvents();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();

  const [activePastCategory, setActivePastCategory] = useState('All');
  const [heroHovered, setHeroHovered] = useState(false);

  const filteredPastVideos = activePastCategory === 'All'
    ? pastEvents
    : pastEvents.filter((v) => v.category === activePastCategory);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Scroll Signal Progress Bar */}
      <ScrollSignalProgress />

      {/* 3D Animated Grid & Ambient Signal Node Canvas */}
      <AnimatedGridBackground />

      {/* ====================================================================
          3.1 — HERO SECTION
          ==================================================================== */}
      <section className="hero-section" style={{ position: 'relative', zIndex: 1, paddingTop: 130, paddingBottom: 60 }}>
        <div className="container container-narrow" style={{ textAlign: 'center' }}>
          {/* Main Headline with 3D Depth */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hero-headline"
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              marginBottom: 20,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E2E8 70%, #A3A3B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Matching Startups<br />
            with Investors.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="hero-subheadline"
            style={{
              color: 'var(--text-muted)',
              fontSize: 16.5,
              maxWidth: 620,
              margin: '0 auto 48px',
              lineHeight: 1.65,
            }}
          >
            Over 700+ startups supported, from pre-seed to scale across MENA and global tech hubs.
          </motion.p>

          {/* Dual Persona Cards Connected by Living Signal Line */}
          <div style={{ position: 'relative', maxWidth: 940, margin: '0 auto 36px' }}>
            {/* Living Signal Line Bridge Layer (Behind cards) */}
            <SignalLineBridge isHovered={heroHovered} />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 28,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <HeroTiltCard
                icon={Rocket}
                badge="FOR FOUNDERS"
                title="I am a Startup"
                description="Master high-conversion pitch decks, financial models, and gain warm introductions to active Tier-1 investors."
                items={[
                  'Direct access to 100+ vetted institutional VCs',
                  'Curated pitch days & flagship demo day slots',
                  'Institutional 5-Minute CFO financial models',
                ]}
                ctaText="Apply for Capital Support"
                accent="violet"
                href="/i-am-a-startup"
                onHoverChange={setHeroHovered}
              />

              <HeroTiltCard
                icon={LineChart}
                badge="FOR INVESTORS"
                title="I am an Investor"
                description="Receive vetted, institutional-grade deal flow with audited unit economics, growth metrics, and founder traction."
                items={[
                  'Pre-vetted seed & Series A tech deal flow',
                  'Private roundtable & demo day invitations',
                  'Standardized data rooms with audit metrics',
                ]}
                ctaText="Join Investor Syndicate"
                accent="gold"
                href="/i-am-an-investor"
                onHoverChange={setHeroHovered}
              />
            </div>
          </div>

          {/* Supporting Text */}
          <p style={{ color: 'var(--text-subtle)', fontSize: 14, fontWeight: 500 }}>
            Register now to connect, collaborate, and scale your venture.
          </p>

          {/* Founder Avatar & Signal Quote */}
          <div style={{ marginTop: 52, textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src="/assets/investors/1.png"
                alt="Muhammad Ayub"
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0 auto 12px',
                  border: '2px solid #8B5CF6',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <p style={{ fontWeight: 700, color: '#F5F5F7', fontSize: 16, marginBottom: 4 }}>
              Muhammad Ayub — CEO &amp; Founder
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 14.5, fontStyle: 'italic' }}>
              "Every founder starts with a spark — we help it fly."
            </p>
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.2 — UPCOMING EVENTS (3D GLASS CARDS)
          ==================================================================== */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 className="section-title-gold">
              Upcoming Event
            </h2>
            <p className="section-subtitle">
              Click on the event to view the details
            </p>
          </div>

          {/* 3D Events Grid */}
          <div className="grid-3" style={{ gap: 24, marginBottom: 36 }}>
            {eventsLoading ? (
              <ShimmerSkeleton count={3} height={420} />
            ) : (
              events.slice(0, 3).map((ev, idx) => (
                <EventCard3D key={ev.id || idx} event={ev} index={idx} />
              ))
            )}
          </div>

          {/* Closing Actions */}
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#F5F5F7', marginBottom: 20 }}>
              Build, Host, or Join — We Make Startup Events Happen.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://www.eventbrite.co.uk/o/morse-bridge-78875439043"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic-signal"
                style={{
                  background: '#8B5CF6',
                  color: '#FFFFFF',
                  padding: '12px 28px',
                  fontSize: 14.5,
                }}
              >
                <span>Explore Events</span>
                <ArrowUpRight size={16} />
                <div className="btn-light-sweep" />
              </a>
              <Link
                to="/custom-events"
                className="btn-magnetic-signal"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#F5F5F7',
                  border: '1px solid var(--border-subtle)',
                  padding: '12px 28px',
                  fontSize: 14.5,
                }}
              >
                <span>Product Launch</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signal Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.3 — TRUST BAR (CLIENT LOGOS MARQUEE)
          ==================================================================== */}
      <section className="section" style={{ padding: '48px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#F5F5F7', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Over 100+ Founders and<br />Investors who trust us
          </h2>
        </div>

        {/* 3D Infinite Logo Marquee */}
        {partnersLoading ? (
          <div style={{ padding: '0 20px' }}><ShimmerSkeleton count={1} height={58} borderRadius={9999} /></div>
        ) : (
          <LogoMarquee partners={partners} />
        )}
      </section>

      {/* ====================================================================
          3.4 — 100+ INVESTORS & MENTORS (DUAL MARQUEE)
          ==================================================================== */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 className="section-title">100+ Investors &amp; Mentors</h2>
          <p className="section-subtitle">
            A trusted global network of active venture capitalists, angel investors, and seasoned mentors backing high-potential startups.
          </p>
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div className="investor-marquee-layout">
            {/* Left Category Sidebar */}
            <div className="investor-category-sidebar" style={{ background: '#14141B', borderColor: 'var(--border-subtle)' }}>
              <div className="investor-category-tab">
                <div className="category-badge-circle" style={{ background: '#8B5CF6', color: '#FFFFFF' }}>I</div>
                <span className="category-vertical-label font-data">INVESTOR</span>
              </div>
              <div className="investor-category-tab">
                <div className="category-badge-circle" style={{ background: '#F5B400', color: '#0A0A0F' }}>M</div>
                <span className="category-vertical-label font-data">MENTOR</span>
              </div>
            </div>

            {/* Dual Scrolling Marquee Columns */}
            <div className="investor-marquee-tracks-col">
              <div className="marquee-container">
                <div className="marquee-track" style={{ animationDuration: '44s' }}>
                  {[...INVESTORS_ROW_1, ...INVESTORS_ROW_1].map((inv, idx) => (
                    <div key={idx} className="investor-card-img-wrap hover-float" style={{ background: '#14141B', borderColor: 'var(--border-subtle)' }}>
                      <img
                        src={`/assets/investors/${inv.img}.png`}
                        alt={`${inv.name} - ${inv.role}`}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="investor-card-caption" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(10, 10, 15, 0.95) 100%)' }}>
                        <div className="investor-name" style={{ color: '#F5F5F7' }}>{inv.name}</div>
                        <div className="investor-role" style={{ color: '#A3A3B0' }}>{inv.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="marquee-container">
                <div className="marquee-track-reverse" style={{ animationDuration: '44s' }}>
                  {[...INVESTORS_ROW_2, ...INVESTORS_ROW_2].map((inv, idx) => (
                    <div key={idx} className="investor-card-img-wrap hover-float" style={{ background: '#14141B', borderColor: 'var(--border-subtle)' }}>
                      <img
                        src={`/assets/investors/${inv.img}.png`}
                        alt={`${inv.name} - ${inv.role}`}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="investor-card-caption" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(10, 10, 15, 0.95) 100%)' }}>
                        <div className="investor-name" style={{ color: '#F5F5F7' }}>{inv.name}</div>
                        <div className="investor-role" style={{ color: '#A3A3B0' }}>{inv.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signal Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.5 — "WHAT WE DO" (3 DARK GLASS CARDS)
          ==================================================================== */}
      <section id="what-we-do" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">
              Empowering founders with clarity, credibility, and connections that drive real momentum.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {WHAT_WE_DO_DATA.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="what-we-do-card"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#14141B',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 18,
                  overflow: 'hidden',
                  padding: 24,
                  boxShadow: '0 8px 28px rgba(0, 0, 0, 0.4)',
                }}
              >
                {item.image && (
                  <div className="what-we-do-img-wrap" style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="what-we-do-img"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                    />
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <h3 className="what-we-do-title" style={{ margin: '14px 0 12px', color: '#F5F5F7', fontSize: 20 }}>{item.title}</h3>
                  <span style={{ fontSize: 18, color: '#8B5CF6', fontWeight: 800 }}>↗</span>
                </div>
                <ul className="what-we-do-list" style={{ flex: 1, color: 'var(--text-body)' }}>
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} style={{ fontSize: 13.5, lineHeight: 1.6 }}>{pt}</li>
                  ))}
                </ul>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.6 — "HOW ARE WE MAKING A DIFFERENCE?" (IMPACT STATS WITH COUNT-UP)
          ==================================================================== */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">How Are We Making a Difference?</h2>
            <p className="section-subtitle">
              Measured impact across startups, capital deployment, and ecosystem growth.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {DIFFERENCE_CARDS.map((card, i) => (
              <div
                key={i}
                className={`impact-stat-card ${card.featured ? 'featured-stat' : ''}`}
              >
                {/* Top Border Traveling Signal Line */}
                <div className="stat-top-scanline" />

                <div
                  style={{
                    fontSize: '3rem',
                    fontWeight: 900,
                    color: card.featured ? '#C4B5FD' : '#F5F5F7',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  <CountUpNumber value={card.stat} suffix={card.suffix} />
                </div>
                <div style={{ fontSize: 16.5, fontWeight: 700, color: '#F5F5F7', marginBottom: 4 }}>
                  {card.label}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {card.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.7 — "OUR PAST EVENTS" (10 YOUTUBE SHORTS GRID)
          ==================================================================== */}
      <section className="section">
        <div className="container container-wide">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 className="section-title">Our Past Events</h2>
            <p className="section-subtitle">
              Watch summit highlights, live pitch sessions, and masterclasses from across MENA.
            </p>
          </div>

          {/* Category Tabs with Animated Pill */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
            <div className="category-tab-container">
              {['All', 'Workshops', 'Startup Fundraising', 'Community'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivePastCategory(cat)}
                  className={`category-tab-btn ${activePastCategory === cat ? 'active' : ''}`}
                >
                  {activePastCategory === cat && (
                    <motion.div
                      layoutId="pastEventActiveTab"
                      className="category-tab-active-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 10 Vertical Video Cards (2 rows x 5 columns) */}
          <div className="past-events-grid">
            {pastEventsLoading ? (
              <ShimmerSkeleton count={10} aspectRatio="9/16" />
            ) : (
              filteredPastVideos.map((item, idx) => (
                <VideoCard3D
                  key={item.id || idx}
                  video={item}
                  aspectRatio="9/16"
                  index={idx}
                  accent={idx % 2 === 0 ? 'violet' : 'gold'}
                />
              ))
            )}
          </div>

          {/* Channel Link */}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a
              href="https://www.youtube.com/@foundermeetinvestor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic-signal"
              style={{
                display: 'inline-flex',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#F5F5F7',
                border: '1px solid var(--border-subtle)',
                padding: '12px 28px',
                fontSize: 14.5,
              }}
            >
              <span>Watch More on YouTube (@foundermeetinvestor)</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Signal Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.8 — "COMMENTS BY FOUNDERS & INVESTORS" (YOUTUBE SHORTS GRID)
          ==================================================================== */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container container-wide">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">Comments By Founders &amp; Investors</h2>
            <p className="section-subtitle">
              What those who've built and backed say about us.
            </p>
          </div>

          {/* 8 Vertical YouTube Shorts Grid (2 rows x 4 columns) */}
          <div className="comments-shorts-grid">
            {testimonialsLoading ? (
              <ShimmerSkeleton count={8} aspectRatio="9/16" />
            ) : (
              testimonials.map((item, idx) => (
                <VideoCard3D
                  key={item.id || idx}
                  video={item}
                  aspectRatio="9/16"
                  index={idx}
                  accent={idx % 2 === 0 ? 'violet' : 'gold'}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Signal Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.9 — "PODCAST: FOUNDERS TALK WITH AYUB"
          ==================================================================== */}
      <PodcastStack podcasts={podcasts} loading={podcastsLoading} />

      {/* Signal Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.10 — SUBSTACK INSIGHTS & PE AUTOMATIONS
          ==================================================================== */}
      <SubstackSection />

      {/* Signal Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.10 — FAQS SECTION
          ==================================================================== */}
      <section id="faqs" className="section" style={{ position: 'relative' }}>
        <div className="container container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about partnering, bootcamps, and capital enablement.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FAQS_DATA.map((faq, idx) => (
              <FaqAccordionItem key={idx} item={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3.11 — FINAL CALL TO ACTION
          ==================================================================== */}
      <section className="section" style={{ textAlign: 'center', padding: '100px 0', position: 'relative' }}>
        <div className="container container-narrow">
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: '#F5F5F7',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: 18,
            }}
          >
            Ready to Accelerate Your<br />Fundraising Journey?
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 16.5,
              maxWidth: 540,
              margin: '0 auto 38px',
              lineHeight: 1.6,
            }}
          >
            Join over 700+ founders and 500+ investors scaling high-impact ventures across MENA and global hubs.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/signup"
              className="btn-magnetic-signal"
              style={{
                background: '#8B5CF6',
                color: '#FFFFFF',
                padding: '14px 36px',
                fontSize: 15.5,
              }}
            >
              <span>Get Started Now</span>
              <ArrowUpRight size={17} />
              <div className="btn-light-sweep" />
            </Link>
            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic-signal"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#F5F5F7',
                border: '1px solid var(--border-subtle)',
                padding: '14px 36px',
                fontSize: 15.5,
              }}
            >
              <span>Book 30-Min Intro</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
