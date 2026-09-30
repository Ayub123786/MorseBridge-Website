import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  LineChart,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Radio,
  Compass,
  Cpu,
  FileSearch,
  Presentation,
  Activity,
  FileText,
  Target,
  FolderLock,
  Calculator,
  Handshake,
  Calendar,
} from 'lucide-react';
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
import CountUpNumber from '../components/common/CountUpNumber';
import ShimmerSkeleton from '../components/common/ShimmerSkeleton';
import WhatWeDoSection from '../components/WhatWeDoSection';
import WhatsHotSection from '../components/WhatsHotSection';
import PastEventsCarousel3D from '../components/PastEventsCarousel3D';
import CommentsCarousel3D from '../components/CommentsCarousel3D';

// Dynamic API Hooks
import { useEvents } from '../hooks/useEvents';
import { usePodcasts } from '../hooks/usePodcasts';
import { usePartners } from '../hooks/usePartners';
import { useTestimonials } from '../hooks/useTestimonials';

/* ── Investors Marquee Data (All 22 Investors from PDF & /assets/investors/) ── */
const INVESTORS_LIST = [
  { id: 1, name: 'Ziyad Alsulais', role: 'Lahint · Chief Commercial Officer', img: 1 },
  { id: 2, name: 'Fawaz Fahad Alakeel', role: 'MISK 2030 Leaders · Founder & CEO', img: 2 },
  { id: 3, name: 'Ivo Detelinov', role: 'Oryx Fund · General Partner', img: 3 },
  { id: 4, name: 'Reem Alhamdan', role: 'Merak Capital · Investment Associate', img: 4 },
  { id: 5, name: 'Abdulaziz Alobaid', role: 'SHARE Investment · CEO', img: 5 },
  { id: 6, name: 'Aleksandra A.-Hesselroth', role: 'Venionaire Capital · Partner', img: 6 },
  { id: 7, name: 'Dariush Soudi', role: 'ARENA Capital · Founder', img: 7 },
  { id: 8, name: 'Henrik Peter Bærentsen', role: 'Fusion42 · Co-Founder', img: 8 },
  { id: 9, name: 'Abdullah Alessa', role: 'Vision Ventures · Investment Associate', img: 9 },
  { id: 10, name: 'Rishikesh Trivedi', role: 'MarketMate · Founder & Specialist', img: 10 },
  { id: 11, name: 'Mitesh Nandlaskar', role: 'IONIC Wealth · PE Fund Manager', img: 11 },
  { id: 12, name: 'Yusaf', role: 'Angel Investor · Venture Partner', img: 12 },
  { id: 13, name: 'Hasan Jabarti', role: 'BRIDGING TO SAUDI · Founder', img: 13 },
  { id: 14, name: 'Faisal Al-Abdulsalam', role: 'Core Vision · Business Owner & CEO', img: 14 },
  { id: 15, name: 'Hussain Almarhoon', role: 'HALA Ventures · Founding Managing Partner', img: 15 },
  { id: 16, name: 'Alanoud AlSaif', role: 'Pinnacle Capital · Investment Associate', img: 16 },
  { id: 17, name: 'Saja Alidriss', role: 'BECO Capital · Senior Associate', img: 17 },
  { id: 18, name: 'Bassem Kadry', role: 'ScienceWerx · Co-Founder & CIO', img: 18 },
  { id: 19, name: 'Dr. Khalid Saqr', role: 'KNOWDYN · Founder', img: 19 },
  { id: 20, name: 'Iskander Haouam', role: 'Namal Impact · Venture Builder Manager', img: 20 },
  { id: 21, name: 'Khaled Shebly', role: 'Watheeq Capital · Alternative Investments Director', img: 21 },
  { id: 22, name: 'Walied Al Basheer', role: 'Intuitio Ventures · Founder & Managing Partner', img: 22 },
];

/* ── Mentors Marquee Data (All 13 Mentors from PDF & /assets/mentors/) ── */
const MENTORS_LIST = [
  { id: 1, name: 'Mahmoud Al Khatib', role: 'Venture Partner · Mentor', img: 1 },
  { id: 2, name: 'Alesia Ahmetaj', role: 'AMVS Capital · Junior Investment Analyst', img: 2 },
  { id: 3, name: 'Amjad Abbas', role: 'Maisonette · CEO & CTO', img: 3 },
  { id: 4, name: 'Dagmar Turkova', role: 'Inova Global Solutions · CEO', img: 4 },
  { id: 5, name: 'Hany Sayed', role: 'Gemtrust · CIO & MENA Partner', img: 5 },
  { id: 6, name: 'Mohamad Badr', role: 'Obsession · Founder & CEO', img: 6 },
  { id: 7, name: 'Lewa Abukhait', role: 'Ewan Ventures · Managing Partner & CEO', img: 7 },
  { id: 8, name: 'Viktoriia Savitska', role: 'Epicentr · Chief of Sustainability & Strategy', img: 8 },
  { id: 9, name: 'River Jangda', role: 'Birch View · Partner', img: 9 },
  { id: 10, name: 'Abe Seksek', role: 'Shorages · Board Member', img: 10 },
  { id: 11, name: 'Salman Butt', role: 'InPro Studio · Co-Founder', img: 11 },
  { id: 12, name: 'Drew Newton', role: 'Cubed · Growth Partner', img: 12 },
  { id: 13, name: 'Sofia Kostiunina', role: '100VP Capital Network · Founder & MD', img: 13 },
];



/* ── Stat Cards ("How Are We Making a Difference?") ── */
const DIFFERENCE_CARDS = [
  {
    stat: '450',
    suffix: '+',
    label: 'Founders Supported',
    featured: true,
  },
  {
    stat: '500',
    suffix: '+',
    label: 'VCs & Family Offices',
    featured: false,
  },
  {
    stat: '85',
    suffix: '+',
    label: 'Pitch Competitions & Summits',
    featured: false,
  },
  {
    stat: '98',
    suffix: '%',
    label: 'Founder Satisfaction Rate',
    featured: false,
  },
  {
    stat: '10',
    suffix: '+',
    label: 'Flagship Bootcamps',
    featured: false,
    topPurple: true,
  },
  {
    stat: '100',
    suffix: '+',
    label: 'Knowledge Hub Guides',
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
        background: open ? 'rgba(20, 20, 32, 0.95)' : '#14141B',
        border: open ? '1px solid rgba(139, 92, 246, 0.65)' : '1px solid var(--border-subtle)',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
        boxShadow: open
          ? '0 0 28px rgba(139, 92, 246, 0.22), 0 10px 30px rgba(0, 0, 0, 0.5)'
          : 'var(--shadow-xs)',
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
        <span
          style={{
            fontSize: 16.5,
            fontWeight: 700,
            color: open ? '#FFFFFF' : '#F5F5F7',
            lineHeight: 1.4,
            transition: 'color 0.2s ease',
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: open ? '#8B5CF6' : 'rgba(255, 255, 255, 0.08)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 700,
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease',
            flexShrink: 0,
            marginLeft: 16,
          }}
        >
          +
        </span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 26px 24px',
                color: '#C5C5D2',
                fontSize: 15,
                lineHeight: 1.7,
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                paddingTop: 18,
              }}
            >
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Hero Dual Cards Data (Image 2) ── */
const INVESTMENT_FIRMS_FEATURES = [
  { icon: Compass, title: 'Deal Sourcing', desc: 'Identify high-potential opportunities' },
  { icon: Cpu, title: 'AI Screening', desc: 'Filter and prioritize with AI' },
  { icon: FileSearch, title: 'Due Diligence', desc: 'Commercial, financial, legal, management' },
  { icon: Presentation, title: 'Investment Committee', desc: 'Auto-generate IC memos and decks' },
  { icon: Activity, title: 'Portfolio Monitoring', desc: 'Track performance and risks in real time' },
  { icon: FileText, title: 'LP Reporting', desc: 'Automate updates and insights' },
];

const FOUNDERS_FEATURES = [
  { icon: Target, title: 'Fundraising Strategy', desc: 'Refine your story and positioning' },
  { icon: FolderLock, title: 'Data Rooms', desc: 'Investor-ready, secure and structured' },
  { icon: Calculator, title: 'Financial Models', desc: 'Robust, VC/PE grade models' },
  { icon: Rocket, title: 'Go-To-Market', desc: 'Validate and accelerate traction' },
  { icon: Handshake, title: 'Investor Access', desc: 'Warm introductions to our network' },
  { icon: Calendar, title: 'Demo Days & Events', desc: 'Showcase to global investors' },
];

/* ==========================================================================
   HOMEPAGE MAIN COMPONENT (DARK SIGNAL TRANSMISSION THEME)
   ========================================================================== */
export default function HomePage() {
  const { events, loading: eventsLoading } = useEvents();
  const { podcasts, loading: podcastsLoading } = usePodcasts();
  const { partners, loading: partnersLoading } = usePartners();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();
  const [heroHovered, setHeroHovered] = useState(false);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Scroll Signal Progress Bar */}
      <ScrollSignalProgress />

      {/* 3D Animated Grid & Ambient Signal Node Canvas */}
      <AnimatedGridBackground />

      {/* ====================================================================
          3.1 — HERO SECTION (IMAGE 1: LEFT-ALIGNED HERO + EVENT COLLAGE SHOWCASE)
          ==================================================================== */}
      <section className="hero-section" style={{ position: 'relative', zIndex: 1, paddingTop: 130, paddingBottom: 60, textAlign: 'left' }}>
        <div className="container container-wide" style={{ maxWidth: 1320 }}>
          <div
            className="hero-grid-showcase"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'clamp(24px, 3.5vw, 44px)',
              alignItems: 'start',
              marginBottom: 64,
            }}
          >
            {/* Left Column: Eyebrow, Headline, Paragraph, Buttons, Proof Stats (Left-Aligned) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'left' }}
            >
              {/* Eyebrow / Kicker */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#8B5CF6',
                    boxShadow: '0 0 10px #8B5CF6',
                  }}
                />
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    color: '#C4B5FD',
                    textTransform: 'uppercase',
                  }}
                >
                  AI Native Investing
                </span>
              </div>

              {/* Main Headline (Left Aligned) */}
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 4.8vw, 4rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: 20,
                  color: '#FFFFFF',
                  textAlign: 'left',
                }}
              >
                Build the investment firm that works with AI agents.
              </h1>

              {/* Subheadline / Paragraph (Left Aligned) */}
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: 16.5,
                  maxWidth: 580,
                  lineHeight: 1.65,
                  marginBottom: 32,
                  textAlign: 'left',
                }}
              >
                Morse Bridge helps Private Equity, Venture Capital and Family Office teams automate deal sourcing, due diligence, investment committee preparation, portfolio monitoring and reporting.
              </p>

              {/* Action Buttons Row (Left Aligned) */}
              <div
                style={{
                  display: 'flex',
                  gap: 14,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Link
                  to="/i-am-an-investor"
                  className="btn-magnetic-signal"
                  style={{
                    background: '#14141B',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    color: '#FFFFFF',
                    padding: '13px 26px',
                    borderRadius: 9999,
                    fontSize: 14.5,
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>Explore Investor Systems</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/i-am-a-startup"
                  className="btn-magnetic-signal"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: '#F5F5F7',
                    padding: '13px 26px',
                    borderRadius: 9999,
                    fontSize: 14.5,
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>For Founders</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Proof / Stats Strip (3 horizontal columns with dividers, Left-Aligned) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 26,
                  marginTop: 40,
                  paddingTop: 32,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.2rem)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    <CountUpNumber end={2700} duration={1600} />+
                  </div>
                  <div style={{ fontSize: 12.5, color: '#A3A3B0', marginTop: 4, lineHeight: 1.35, maxWidth: 140 }}>
                    Investment Professionals Trained
                  </div>
                </div>

                <div style={{ width: 1, height: 46, background: 'rgba(255, 255, 255, 0.12)', flexShrink: 0 }} />

                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.2rem)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    $<CountUpNumber end={246} duration={1500} />B+
                  </div>
                  <div style={{ fontSize: 12.5, color: '#A3A3B0', marginTop: 4, lineHeight: 1.35, maxWidth: 155 }}>
                    AUM Represented by Firms We've Trained
                  </div>
                </div>

                <div style={{ width: 1, height: 46, background: 'rgba(255, 255, 255, 0.12)', flexShrink: 0 }} />

                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.2rem)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    <CountUpNumber end={700} duration={1400} />+
                  </div>
                  <div style={{ fontSize: 12.5, color: '#A3A3B0', marginTop: 4, lineHeight: 1.35, maxWidth: 130 }}>
                    Founders Supported
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Visual Showcase Event Collage Image (Image 1) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                width: '100%',
                paddingTop: 2,
              }}
            >
              {/* Subtle ambient backlight behind collage */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-8%',
                  background: 'radial-gradient(circle at 60% 45%, rgba(255, 255, 255, 0.05) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 70%)',
                  filter: 'blur(50px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              <img
                src="/Mb-website-hero.png"
                alt="MorseBridge Investor Summits, Founders & Team"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  maxWidth: 740,
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 42px rgba(0, 0, 0, 0.65))',
                }}
              />
            </motion.div>
          </div>

          {/* ====================================================================
              3.2 — DUAL PERSONA CARDS (IMAGE 2: AI NATIVE DEAL FLOW & INVESTOR READINESS)
              ==================================================================== */}
          <div style={{ position: 'relative', maxWidth: 1060, margin: '0 auto 36px' }}>
            {/* Living Signal Line Bridge Layer (Behind cards) */}
            <SignalLineBridge isHovered={heroHovered} />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 28,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <HeroTiltCard
                badge="01  FOR INVESTMENT FIRMS"
                title="AI Native Deal Flow"
                description="From sourcing to exit, powered by AI agents."
                features={INVESTMENT_FIRMS_FEATURES}
                ctaText="Explore Investor Systems"
                accent="gold"
                href="/i-am-an-investor"
                onHoverChange={setHeroHovered}
              />

              <HeroTiltCard
                badge="02  FOR FOUNDERS"
                title="Investor Readiness"
                description="Everything you need to raise and scale."
                features={FOUNDERS_FEATURES}
                ctaText="For Founders"
                accent="violet"
                href="/i-am-a-startup"
                onHoverChange={setHeroHovered}
              />
            </div>
          </div>

          {/* Supporting Text */}
          <p style={{ color: 'var(--text-subtle)', fontSize: 14, fontWeight: 500, textAlign: 'center' }}>
            Register now to connect, collaborate, and scale your venture.
          </p>

          {/* Founder Avatar & Signal Quote */}
          <div style={{ marginTop: 56, textAlign: 'center' }}>
            <img
              src="/assets/founder/ayub-founder.png"
              alt="Muhammad Ayub"
              style={{
                width: 116,
                height: 116,
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
                margin: '0 auto 16px',
                border: '2px solid rgba(255, 255, 255, 0.22)',
                boxShadow: '0 0 28px rgba(139, 92, 246, 0.35), 0 8px 24px rgba(0, 0, 0, 0.5)',
              }}
              onError={(e) => { e.currentTarget.src = '/assets/founder/ayub-founder.png'; }}
            />
            <p style={{ fontWeight: 800, color: '#F5F5F7', fontSize: 18, marginBottom: 5, letterSpacing: '-0.01em' }}>
              Muhammad Ayub — CEO &amp; Founder
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, fontStyle: 'italic', maxWidth: 480, margin: '0 auto' }}>
              "Every founder starts with a spark — we help it fly."
            </p>
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
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
            <div className="investor-category-sidebar">
              <div className="investor-category-tab">
                <div className="category-badge-circle">I</div>
                <span className="category-vertical-label font-data">INVESTOR</span>
              </div>
              <div className="investor-category-tab">
                <div className="category-badge-circle">M</div>
                <span className="category-vertical-label font-data">MENTOR</span>
              </div>
            </div>

            {/* Dual Scrolling Marquee Columns */}
            <div className="investor-marquee-tracks-col">
              {/* Top Row: INVESTORS (All 22 from /assets/investors/) */}
              <div className="marquee-container">
                <div className="marquee-track" style={{ animationDuration: '60s' }}>
                  {[...INVESTORS_LIST, ...INVESTORS_LIST].map((inv, idx) => (
                    <div key={idx} className="investor-card-img-wrap hover-float">
                      <img
                        src={`/assets/investors/${inv.img}.png`}
                        alt={`${inv.name} - ${inv.role}`}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="investor-card-caption">
                        <div className="investor-name">{inv.name}</div>
                        <div className="investor-role">{inv.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row: MENTORS (All 13 from /assets/mentors/) */}
              <div className="marquee-container">
                <div className="marquee-track-reverse" style={{ animationDuration: '48s' }}>
                  {[...MENTORS_LIST, ...MENTORS_LIST].map((men, idx) => (
                    <div key={idx} className="investor-card-img-wrap hover-float">
                      <img
                        src={`/assets/mentors/${men.img}.png`}
                        alt={`${men.name} - ${men.role}`}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="investor-card-caption">
                        <div className="investor-name">{men.name}</div>
                        <div className="investor-role" style={{ color: '#F5B400' }}>{men.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.12 — WHATS HOT SECTION (INTERACTIVE TABS & FLAGSHIP EXPERIENCES)
          ==================================================================== */}
      <WhatsHotSection />

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.7 — "OUR PAST EVENTS" (3D ANIMATED CAROUSEL DECK MATCHING IMAGE 2)
          ==================================================================== */}
      <PastEventsCarousel3D />

      {/* Signal Transmission Section Divider */}
      <SignalDivider />



      {/* ====================================================================
          3.5 — "WHAT WE DO" (8 CAPABILITY CARDS & ECOSYSTEM BANNER)
          ==================================================================== */}
      <WhatWeDoSection />

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.6 — "HOW ARE WE MAKING A DIFFERENCE?" (6 IMPACT STAT CARDS)
          ==================================================================== */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container container-wide">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 className="section-title">How Are We Making a Difference?</h2>
            <p className="section-subtitle">
              Measured impact across startups, capital deployment, and ecosystem growth.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: 16,
              maxWidth: 1240,
              margin: '0 auto',
            }}
          >
            {DIFFERENCE_CARDS.map((card, i) => (
              <div
                key={i}
                style={{
                  background: '#101017',
                  border: card.featured || card.topPurple
                    ? '1px solid rgba(139, 92, 246, 0.35)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: card.featured || card.topPurple
                    ? '2.5px solid #8B5CF6'
                    : '2.5px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 12,
                  padding: '24px 20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'left',
                  boxShadow: card.featured
                    ? '0 8px 24px rgba(139, 92, 246, 0.12), 0 4px 12px rgba(0, 0, 0, 0.4)'
                    : '0 4px 16px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(2.1rem, 3.2vw, 2.6rem)',
                    fontWeight: 900,
                    color: card.featured ? '#C4B5FD' : '#FFFFFF',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    marginBottom: 10,
                  }}
                >
                  <CountUpNumber value={card.stat} suffix={card.suffix} />
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.35,
                  }}
                >
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          3.8 — "COMMENTS BY FOUNDERS & INVESTORS" (3D ANIMATED CAROUSEL)
          ==================================================================== */}
      <CommentsCarousel3D />

      {/* Signal Transmission Section Divider */}
      <SignalDivider />


      {/* ====================================================================
          3.10 — FAQS SECTION
          ==================================================================== */}
      <section id="faqs" className="section" style={{ position: 'relative', scrollMarginTop: 90 }}>
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
