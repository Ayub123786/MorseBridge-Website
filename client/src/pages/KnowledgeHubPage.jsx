import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Play,
  X,
  MoreVertical,
  Sparkles,
} from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';
import featuredGuestsLogo from '../assets/podcast_featured_guests.png';

/* ── 1. Blog Articles Data (From Screenshots 1 & 2) ── */
const BLOG_ARTICLES = [
  {
    id: 1,
    title: 'The State of MENA Startups in 2025',
    subheading: 'From momentum to global relevance.',
    date: 'Mar 10, 2025',
    readTime: '7 min read',
    desc: "A deep dive into the trends, capital flows and founder momentum shaping MENA's next chapter.",
    image: '/assets/insights/blog_state_of_mena.jpg',
    slug: 'state-of-mena-startups-2025',
    link: 'https://morsebridge.substack.com/p/the-state-of-mena-startups',
    isExternal: true,
  },
  {
    id: 2,
    title: 'How to Build a Investor-Ready Deck',
    subheading: 'Clarity. Conviction. Capital.',
    date: 'Feb 28, 2025',
    readTime: '6 min read',
    desc: 'Key elements, best practices and real examples to help you craft a compelling investor deck.',
    image: '/assets/insights/blog_investor_deck.jpg',
    slug: 'how-to-build-investor-ready-deck',
    link: '/the-5-minute-cfo-model',
    isExternal: false,
  },
  {
    id: 3,
    title: 'S1 E3: Scaling for Early-Stage Startups',
    subheading: 'Morse Bridge Podcast',
    date: 'Feb 15, 2025',
    readTime: '42 min read',
    desc: 'In this episode, we sit down with regional founders to discuss what it really takes to scale in MENA.',
    image: '/assets/insights/blog_podcast_mic.jpg',
    slug: 'scaling-for-early-stage-startups',
    link: 'https://www.youtube.com/watch?v=rjflnyDqN2M',
    isExternal: true,
  },
  {
    id: 4,
    title: 'The Rise of Female Founders in MENA',
    subheading: 'A more inclusive ecosystem.',
    date: 'Feb 2, 2025',
    readTime: '5 min read',
    desc: 'Meet the founders breaking barriers and building category-defining companies across the region.',
    image: '/assets/insights/blog_female_founders.jpg',
    slug: 'rise-of-female-founders-mena',
    link: 'https://morsebridge.substack.com',
    isExternal: true,
  },
  {
    id: 5,
    title: "MENA's Growing Role in Global Innovation",
    subheading: 'From local hub to global player.',
    date: 'Jan 20, 2025',
    readTime: '8 min read',
    desc: 'How the region is attracting global capital, talent and strategic partnerships.',
    image: '/assets/insights/blog_mena_global_network.jpg',
    slug: 'mena-growing-role-global-innovation',
    link: 'https://morsebridge.substack.com',
    isExternal: true,
  },
  {
    id: 6,
    title: 'Lessons from 100+ Founder Conversations',
    subheading: "Patterns. Insights. What's next.",
    date: 'Jan 8, 2025',
    readTime: '6 min read',
    desc: "Key themes, challenges and opportunities we've observed across our founder network.",
    image: '/assets/insights/blog_founder_conversations.jpg',
    slug: 'lessons-from-100-founder-conversations',
    link: 'https://morsebridge.substack.com',
    isExternal: true,
  },
];

/* ── 2. Real Podcast Episodes from @FoundersTalkwithAyub (Plug and Play on top) ── */
const PODCAST_EPISODES = [
  {
    id: 1,
    title: 'Principal Plug and Play: Investors are Not ATM Machines!',
    views: '1.3k views · 5 months ago',
    duration: '1:07:20',
    videoId: 'O1hPe9GncBQ',
    guest: 'ft. Andrea Azzolari · Principal, Plug and Play MENA',
    category: 'vc',
    categoryLabel: 'Venture Capital',
    desc: 'Andrea Azzolari, Principal at Plug and Play Tech Center MENA, breaks down VC evaluation criteria, why investors are not ATM machines, and what truly makes founders fundable in the region.',
    thumbnail: 'https://i.ytimg.com/vi/O1hPe9GncBQ/hq720.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=O1hPe9GncBQ',
  },
  {
    id: 2,
    title: 'Why Most Startups FAIL to Raise Funding | VC Secrets ft. Andrea Azzolari',
    views: '115 views · 6 months ago',
    duration: '1:21',
    videoId: 'TcFcFcInvEI',
    guest: 'ft. Andrea Azzolari · Principal, Plug and Play MENA',
    category: 'fundraising',
    categoryLabel: 'Fundraising',
    desc: 'Inside the pitch room: the critical mistakes founders make during fundraising and the telltale signs that immediately cause investors to pass on a deal.',
    thumbnail: 'https://i.ytimg.com/vi/TcFcFcInvEI/hq720.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=TcFcFcInvEI',
  },
  {
    id: 3,
    title: 'How Wealth Destroys Families: The Shocking Truth About Money & Power!',
    views: '136 views · 7 months ago',
    duration: '8:24',
    videoId: 'd6pu_iluZYU',
    guest: 'Founders Talk with Ayub',
    category: 'wealth',
    categoryLabel: 'Family Offices & Wealth',
    desc: 'The shocking reality behind wealth preservation, generational conflict, and how regional dynasties manage and protect family office capital.',
    thumbnail: 'https://i.ytimg.com/vi/d6pu_iluZYU/hq720.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=d6pu_iluZYU',
  },
  {
    id: 4,
    title: 'The VC Effect: Turning Bold Ideas Into Billion Dollar Empires',
    views: '134 views · 1 year ago',
    duration: '1:10:57',
    videoId: 'ivIKIhgTqaM',
    guest: 'Founders Talk with Ayub',
    category: 'vc',
    categoryLabel: 'Venture Capital',
    desc: 'Unpacking the venture capital flywheel in the Middle East and how high-conviction founders scale from seed stage to regional decacorns.',
    thumbnail: 'https://i.ytimg.com/vi/ivIKIhgTqaM/hq720.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=ivIKIhgTqaM',
  },
  {
    id: 5,
    title: 'MENA Startup Strategies: How to Navigate VC Culture & Embrace Failure',
    views: '220 views · 1 year ago',
    duration: '47:38',
    videoId: 'cRRVPKch9gc',
    guest: 'Founders Talk with Ayub',
    category: 'vc',
    categoryLabel: 'Startup Strategy',
    desc: 'A raw discussion on founder resilience, pivoting through economic cycles, and building a high-velocity startup in the Gulf.',
    thumbnail: 'https://i.ytimg.com/vi/cRRVPKch9gc/hq720.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=cRRVPKch9gc',
  },
  {
    id: 6,
    title: 'Dubai vs EU Startups: Is Gulf the Smart Move Right Now?',
    views: '197 views · 1 year ago',
    duration: '53:34',
    videoId: 'DpkrALvguT8',
    guest: 'Founders Talk with Ayub',
    category: 'dubai',
    categoryLabel: 'Dubai & Ecosystem',
    desc: '0% tax, rapid regulatory support, and deep sovereign capital: comparing the UAE startup ecosystem against established European hubs.',
    thumbnail: 'https://i.ytimg.com/vi/DpkrALvguT8/hq720.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=DpkrALvguT8',
  },
  {
    id: 7,
    title: 'How to Save & Invest Money in Dubai (UAE)',
    views: '1.5k views · 11 months ago',
    duration: '15:05',
    videoId: 'SAOsGRA4x6Q',
    guest: 'Founders Talk with Ayub',
    category: 'wealth',
    categoryLabel: 'Wealth & Investing',
    desc: 'A practical roadmap for founders and executives to optimize cash flow, tax-efficient structures, and offshore wealth in Dubai.',
    thumbnail: 'https://i.ytimg.com/vi/SAOsGRA4x6Q/hq720.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=SAOsGRA4x6Q',
  },
  {
    id: 8,
    title: 'How Startup Fundraising Works | Startup School',
    views: '1k views · 9 months ago',
    duration: '1:13:40',
    videoId: 'rjflnyDqN2M',
    guest: 'ft. Ivo Detelinov · Investor who funded 26 startups',
    category: 'fundraising',
    categoryLabel: 'Fundraising Masterclass',
    desc: 'A comprehensive masterclass on how startup fundraising actually works: valuation mechanics, pitch deck narratives, SAFEs, and negotiating with lead investors.',
    thumbnail: 'https://i.ytimg.com/vi/rjflnyDqN2M/hq720.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=rjflnyDqN2M',
  },
  {
    id: 9,
    title: 'Family Offices From Scratch',
    views: '1.1k views · 10 months ago',
    duration: '1:05:01',
    videoId: 'SrJu7zkwsYs',
    guest: 'Advisor to the region\'s wealthiest families',
    category: 'wealth',
    categoryLabel: 'Family Offices',
    desc: 'Everything founders and fund managers need to know about Family Offices: structure, investment mandates, direct startup deals, and securing long-term institutional backing.',
    thumbnail: 'https://i.ytimg.com/vi/SrJu7zkwsYs/hq720.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=SrJu7zkwsYs',
  },
];

export default function KnowledgeHubPage({ defaultTab = 'blog' }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Tab state: 'blog' or 'podcast'
  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname === '/podcast' || location.search.includes('tab=podcast')) {
      return 'podcast';
    }
    return defaultTab;
  });

  // Active playing video modal
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (location.pathname === '/podcast') {
      setActiveTab('podcast');
    }
  }, [location.pathname]);

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
              minHeight: 400,
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
                  'linear-gradient(90deg, rgba(10, 10, 15, 0.96) 0%, rgba(10, 10, 15, 0.88) 45%, rgba(10, 10, 15, 0.25) 100%)',
                zIndex: 1,
              }}
            />

            {/* Hero Content */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '56px 48px',
                maxWidth: 620,
              }}
            >
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
                INSIGHTS
              </span>

              {/* Title */}
              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  marginBottom: 14,
                  fontFamily: "'Proxima Nova', sans-serif",
                }}
              >
                Ideas. Stories.<br />Opportunities.
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1.45,
                  marginBottom: 18,
                }}
              >
                Perspectives on startups, investment and innovation in MENA.
              </p>

              {/* Accent Divider Line */}
              <div
                style={{
                  width: 52,
                  height: 2,
                  background: '#F5B400',
                  marginBottom: 18,
                  borderRadius: 2,
                }}
              />

              {/* Body */}
              <p
                style={{
                  color: '#C5C5D2',
                  fontSize: 15,
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: 480,
                }}
              >
                Original thinking, expert voices, and real stories from across the region's innovation ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. TAB SWITCHER (BLOG / PODCAST)
          ==================================================================== */}
      <section style={{ padding: '36px 0 24px' }}>
        <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#101017',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 9999,
              padding: '6px 8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Blog Tab Button */}
            <button
              type="button"
              onClick={() => setActiveTab('blog')}
              style={{
                background: activeTab === 'blog' ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                border: activeTab === 'blog' ? '2px solid #10B981' : '2px solid transparent',
                borderRadius: 9999,
                color: activeTab === 'blog' ? '#FFFFFF' : '#A3A3B0',
                fontSize: 14.5,
                fontWeight: activeTab === 'blog' ? 700 : 500,
                padding: '6px 22px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'blog' ? '0 0 14px rgba(16, 185, 129, 0.25)' : 'none',
              }}
            >
              Blog
            </button>

            {/* Podcast Tab Button */}
            <button
              type="button"
              onClick={() => setActiveTab('podcast')}
              style={{
                background: activeTab === 'podcast' ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                border: activeTab === 'podcast' ? '2px solid #10B981' : '2px solid transparent',
                borderRadius: 9999,
                color: activeTab === 'podcast' ? '#FFFFFF' : '#A3A3B0',
                fontSize: 14.5,
                fontWeight: activeTab === 'podcast' ? 700 : 500,
                padding: '6px 22px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'podcast' ? '0 0 14px rgba(16, 185, 129, 0.25)' : 'none',
              }}
            >
              Podcast
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. MAIN CONTENT: BLOG LIST OR PODCAST GRID
          ==================================================================== */}
      <AnimatePresence mode="wait">
        {activeTab === 'blog' ? (
          /* ── BLOG TAB VIEW (Screenshots 1 & 2) ── */
          <motion.section
            key="blog-tab"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            style={{ padding: '10px 0 80px' }}
          >
            <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
              {/* Vertical Stack of 6 Blog Post Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {BLOG_ARTICLES.map((article) => {
                  const CardWrapper = article.isExternal ? 'a' : Link;
                  const wrapperProps = article.isExternal
                    ? { href: article.link, target: '_blank', rel: 'noopener noreferrer' }
                    : { to: article.link };

                  return (
                    <motion.div
                      key={article.id}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CardWrapper
                        {...wrapperProps}
                        style={{
                          background: '#101017',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: 20,
                          padding: '24px 28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 28,
                          flexWrap: 'wrap',
                          textDecoration: 'none',
                          color: 'inherit',
                          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.35)',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.45)';
                          e.currentTarget.style.boxShadow =
                            '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.35)';
                        }}
                      >
                        {/* Left: Thumbnail & Details */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 26,
                            flex: 1,
                            minWidth: 280,
                            flexWrap: 'wrap',
                          }}
                        >
                          {/* Image */}
                          <div
                            style={{
                              width: 220,
                              height: 135,
                              borderRadius: 14,
                              overflow: 'hidden',
                              background: '#161622',
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={article.image}
                              alt={article.title}
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

                          {/* Text Body */}
                          <div style={{ flex: 1, minWidth: 260 }}>
                            <h2
                              style={{
                                fontSize: 'clamp(1.25rem, 2vw, 1.45rem)',
                                fontWeight: 800,
                                color: '#FFFFFF',
                                marginBottom: 4,
                                letterSpacing: '-0.015em',
                                lineHeight: 1.25,
                                fontFamily: "'Proxima Nova', sans-serif",
                              }}
                            >
                              {article.title}
                            </h2>

                            <div
                              style={{
                                color: '#C5C5D2',
                                fontSize: 14.5,
                                fontWeight: 600,
                                marginBottom: 12,
                              }}
                            >
                              {article.subheading}
                            </div>

                            {/* Meta Tags */}
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 20,
                                color: '#A3A3B0',
                                fontSize: 13,
                                marginBottom: 10,
                                flexWrap: 'wrap',
                              }}
                            >
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                <Calendar size={14} color="#C4B5FD" />
                                <span>{article.date}</span>
                              </span>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                <Clock size={14} color="#F5B400" />
                                <span>{article.readTime}</span>
                              </span>
                            </div>

                            <p
                              style={{
                                color: '#8E8E9B',
                                fontSize: 13.5,
                                lineHeight: 1.55,
                                margin: 0,
                              }}
                            >
                              {article.desc}
                            </p>
                          </div>
                        </div>

                        {/* Right: Subtle Arrow */}
                        <div
                          style={{
                            color: '#A3A3B0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                          }}
                        >
                          <ArrowRight size={20} />
                        </div>
                      </CardWrapper>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom CTA Button: Access Substack Database */}
              <div style={{ textAlign: 'center', marginTop: 44 }}>
                <a
                  href="https://morsebridge.substack.com/s/investor-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic-signal"
                  style={{
                    background: '#101017',
                    border: '1px solid #F5B400',
                    color: '#F5B400',
                    padding: '11px 26px',
                    borderRadius: 8,
                    fontSize: 13.5,
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F5B400';
                    e.currentTarget.style.color = '#0A0A0F';
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(245, 180, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#101017';
                    e.currentTarget.style.color = '#F5B400';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.5)';
                  }}
                >
                  <span>Access Substack Database</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.section>
        ) : (
          /* ── PODCAST TAB VIEW (Screenshots 3 & 4) ── */
          <motion.section
            key="podcast-tab"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            style={{ padding: '0 0 80px' }}
          >
            {/* Featured Guests Logo Bar (Full Width Container matching Screenshot 3) */}
            <div
              style={{
                background: '#14141E',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '24px 0 28px',
                marginBottom: 44,
              }}
            >
              <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 18 }}>
                  <span
                    style={{
                      color: '#F5B400',
                      fontSize: 13.5,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Featured Guests
                  </span>
                </div>

                {/* Featured Guests Logo Strip */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 0',
                  }}
                >
                  <img
                    src={featuredGuestsLogo}
                    alt="Featured Guests"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/Logo.png';
                    }}
                    style={{
                      maxWidth: '100%',
                      width: 'auto',
                      maxHeight: 52,
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.4))',
                    }}
                  />
                </div>
              </div>
            </div>



            {/* Podcast Video Cards Grid (9 Episodes) */}
            <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                  gap: 24,
                }}
              >
                {PODCAST_EPISODES.map((ep) => (
                  <motion.div
                    key={ep.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: '#101017',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 18,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                      transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    onClick={() => setSelectedVideo(ep)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.5)';
                      e.currentTarget.style.boxShadow =
                        '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 180, 0, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
                    }}
                  >
                    {/* Thumbnail with duration badge and play button */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16/9',
                        background: '#181824',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                        onError={(e) => {
                          e.currentTarget.src = `https://i.ytimg.com/vi/${ep.videoId}/hqdefault.jpg`;
                        }}
                      />

                      {/* Play overlay hover indicator */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 0, 0, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background 0.2s ease',
                        }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            background: 'rgba(245, 180, 0, 0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.6)',
                          }}
                        >
                          <Play size={20} color="#0A0A0F" fill="#0A0A0F" style={{ marginLeft: 3 }} />
                        </div>
                      </div>

                      {/* Top Left: Category Badge */}
                      {ep.categoryLabel && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            background: 'rgba(16, 16, 23, 0.85)',
                            backdropFilter: 'blur(8px)',
                            color: '#C4B5FD',
                            fontSize: 10.5,
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 4,
                            letterSpacing: '0.02em',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          {ep.categoryLabel}
                        </div>
                      )}

                      {/* Duration Badge in Bottom Right */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          background: 'rgba(0, 0, 0, 0.85)',
                          color: '#FFFFFF',
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: 4,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {ep.duration}
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div
                      style={{
                        padding: '16px 18px 20px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 12,
                        flex: 1,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontSize: 14.5,
                            fontWeight: 700,
                            color: '#FFFFFF',
                            lineHeight: 1.35,
                            marginBottom: 8,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {ep.title}
                        </h3>

                        <div style={{ color: '#8E8E9B', fontSize: 12, fontWeight: 500 }}>
                          {ep.views}
                        </div>
                      </div>

                      <button
                        type="button"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#8E8E9B',
                          cursor: 'pointer',
                          padding: 4,
                        }}
                        aria-label="Options"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(ep.youtubeUrl, '_blank');
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA Button: View Full Podcast Library */}
              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <a
                  href="https://www.youtube.com/@FoundersTalkwithAyub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic-signal"
                  style={{
                    background: '#14141B',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: '#FFFFFF',
                    padding: '12px 28px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.background = '#1E1E28';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                    e.currentTarget.style.background = '#14141B';
                  }}
                >
                  <span>View Full Podcast Library</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ====================================================================
          4. VIDEO MODAL FOR INSTANT PODCAST PLAYBACK
          ==================================================================== */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                width: '100%',
                maxWidth: 880,
                background: '#101017',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 22px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    maxWidth: '85%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {selectedVideo.title}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* Footer */}
      <Footer />
    </div>
  );
}
