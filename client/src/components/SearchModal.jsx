import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ArrowRight,
  Globe,
  Video,
  FileText,
  Calendar,
  Sparkles,
  ExternalLink,
  Command,
} from 'lucide-react';

/* ── Comprehensive Search Catalog across all Morse Bridge resources ── */
const SEARCH_DATABASE = [
  // ── Pages & Navigation
  {
    id: 'page-home',
    title: 'Home',
    description: 'Morse Bridge — Helping Ideas Take Flight & Thrive. AI-native venture platform, investor circle, founder runway.',
    category: 'Pages',
    badge: 'Page',
    icon: Globe,
    path: '/',
    tags: ['home', 'morse', 'bridge', 'platform', 'ai', 'venture', 'main', 'landing'],
  },
  {
    id: 'page-investors',
    title: 'For Investors',
    description: 'Direct access to high-conviction deal-flow, LP co-investment networks, and AI-assisted due diligence.',
    category: 'Pages',
    badge: 'Investors',
    icon: Globe,
    path: '/i-am-an-investor',
    tags: ['investor', 'investors', 'capital', 'lp', 'gp', 'vc', 'deals', 'due diligence', 'syndicate'],
  },
  {
    id: 'page-founders',
    title: 'For Founders',
    description: 'Full-stack acceleration: fundraising strategy, investor pitch readiness, mentor network, and capital matchmaking.',
    category: 'Pages',
    badge: 'Founders',
    icon: Globe,
    path: '/i-am-a-startup',
    tags: ['founder', 'founders', 'startup', 'startups', 'fundraising', 'pitch', 'deck', 'mentorship'],
  },
  {
    id: 'page-runway',
    title: 'Runway — Revenue-First AI Accelerator',
    description: '90-day sprint turning bold AI ideas into scalable, revenue-generating enterprises with guaranteed pilots.',
    category: 'Programs',
    badge: 'Accelerator',
    icon: Sparkles,
    path: '/runway',
    tags: ['runway', 'accelerator', 'revenue', '90 days', 'cohort', 'ai', 'incubation', 'scale'],
  },
  {
    id: 'page-solutions',
    title: 'Solutions & Products',
    description: 'Venture tools, Deal Room infrastructure, 5-Minute CFO model, and founder-investor matching platforms.',
    category: 'Pages',
    badge: 'Solutions',
    icon: Globe,
    path: '/solutions',
    tags: ['solutions', 'products', 'cfo', 'deal room', 'platform', 'tools', 'software'],
  },
  {
    id: 'page-cfo-model',
    title: 'The 5-Minute CFO Model',
    description: 'Instant investor-grade financial models, revenue forecasting, unit economics, and burn rate simulations.',
    category: 'Solutions',
    badge: 'Tool',
    icon: FileText,
    path: '/the-5-minute-cfo-model',
    tags: ['cfo', 'model', 'financial', 'finance', 'valuation', 'forecast', 'cash flow', 'burn rate'],
  },
  {
    id: 'page-events',
    title: 'Custom Events & Roundtables',
    description: 'Private venture roundtables, investor demo days, hackathons, and curated regional gatherings.',
    category: 'Events',
    badge: 'Events',
    icon: Calendar,
    path: '/custom-events',
    tags: ['events', 'custom events', 'roundtable', 'pitch day', 'hackathon', 'networking', 'summit'],
  },
  {
    id: 'page-past-events',
    title: 'Past Custom Events Video',
    description: 'Recap video and live showcase from Morse Bridge past custom events and developer innovation hackathons.',
    category: 'Events',
    badge: 'Video',
    icon: Video,
    path: '/custom-events',
    tags: ['past events', 'past custom events', 'hacking event', 'video', 'watch', 'recap'],
  },
  {
    id: 'page-insights',
    title: 'Insights & Founder Knowledge Hub',
    description: 'Original research, market deep-dives, MENA startup trends, and actionable fundraising playbooks.',
    category: 'Insights',
    badge: 'Knowledge Hub',
    icon: FileText,
    path: '/the-founder-knowledge-hub',
    tags: ['insights', 'knowledge hub', 'blog', 'articles', 'mena', 'research', 'playbook'],
  },
  {
    id: 'page-podcast',
    title: 'Podcast & Masterclasses',
    description: 'Founders Talk with Ayub: masterclasses with top VCs, Plug and Play leaders, and family office advisors.',
    category: 'Podcast',
    badge: 'Podcast',
    icon: Video,
    path: '/podcast',
    tags: ['podcast', 'ayub', 'founders talk', 'episodes', 'masterclass', 'youtube', 'interviews'],
  },
  {
    id: 'page-about',
    title: 'About Morse Bridge',
    description: 'Our mission to bridge founders, capital, and global opportunities with radical transparency and speed.',
    category: 'Pages',
    badge: 'About',
    icon: Globe,
    path: '/about',
    tags: ['about', 'team', 'mission', 'story', 'vision', 'who we are', 'partners'],
  },
  {
    id: 'page-faqs',
    title: "FAQ's",
    description: 'Answers to common questions about Morse Bridge programs, membership criteria, fees, and timelines.',
    category: 'Pages',
    badge: 'Help',
    icon: Globe,
    path: '/#faqs',
    tags: ['faq', 'faqs', 'questions', 'answers', 'pricing', 'support', 'terms'],
  },
  {
    id: 'page-demo',
    title: 'Book a Demo / Intro Call',
    description: 'Schedule a 30-minute direct conversation with the Morse Bridge leadership team.',
    category: 'Contact',
    badge: 'Action',
    icon: ExternalLink,
    externalUrl: 'https://cal.com/morsebridge/30-min-intro',
    tags: ['demo', 'book', 'call', 'meeting', 'cal', 'schedule', 'contact', 'intro'],
  },

  // ── Upcoming Events & Cohorts
  {
    id: 'event-runway-cohort',
    title: 'Runway — Revenue in 90 Days',
    description: 'Accelerated cohort focusing on customer validation, go-to-market speed, and closing initial enterprise revenue.',
    category: 'Events',
    badge: 'Upcoming Cohort',
    icon: Calendar,
    path: '/custom-events',
    tags: ['runway', 'revenue in 90 days', 'cohort', '90 days', 'application', 'accelerator'],
  },
  {
    id: 'event-bootcamp',
    title: 'Global Fundraising Bootcamp — Monthly Cohort',
    description: 'Interactive monthly bootcamp preparing startups for investor diligence, data room setup, and term sheet closing.',
    category: 'Events',
    badge: 'Bootcamp',
    icon: Calendar,
    path: '/custom-events',
    tags: ['bootcamp', 'fundraising bootcamp', 'monthly cohort', 'pitching', 'term sheet', 'investor ready'],
  },
  {
    id: 'event-summit',
    title: 'My Rising Time — A Global Summit Where Founders Rise Too',
    description: 'Flagship international summit uniting top tech founders, angel investors, family offices, and sovereign venture leaders.',
    category: 'Events',
    badge: 'Summit',
    icon: Calendar,
    path: '/custom-events',
    tags: ['my rising time', 'summit', 'global summit', 'conference', 'speakers', 'dubai'],
  },

  // ── Podcast Masterclasses (Founders Talk with Ayub)
  {
    id: 'pod-plug-play',
    title: 'Principal Plug and Play: Investors are Not ATM Machines!',
    description: 'ft. Andrea Azzolari · Principal, Plug and Play MENA. VC evaluation criteria, funding mindset, investor expectations.',
    category: 'Podcast',
    badge: '1:07:20',
    icon: Video,
    path: '/podcast',
    tags: ['plug', 'play', 'plug and play', 'andrea', 'azzolari', 'atm', 'investors are not atm machines', 'vc', 'mena'],
  },
  {
    id: 'pod-fail-funding',
    title: 'Why Most Startups FAIL to Raise Funding | VC Secrets',
    description: 'ft. Andrea Azzolari · Inside the pitch room: fatal mistakes founders make, red flags, and pitching with clarity.',
    category: 'Podcast',
    badge: '1:21',
    icon: Video,
    path: '/podcast',
    tags: ['fail', 'failure', 'funding', 'vc secrets', 'pitch room', 'mistakes', 'andrea azzolari'],
  },
  {
    id: 'pod-wealth-families',
    title: 'How Wealth Destroys Families: The Shocking Truth About Money & Power!',
    description: 'Inside family office dynamics: wealth preservation, succession disputes, and how regional family capital is governed.',
    category: 'Podcast',
    badge: '8:24',
    icon: Video,
    path: '/podcast',
    tags: ['wealth', 'destroys', 'families', 'money', 'power', 'family office', 'succession', 'assets'],
  },
  {
    id: 'pod-vc-effect',
    title: 'The VC Effect: Turning Bold Ideas Into Billion Dollar Empires',
    description: 'Capital multiplication, strategic venture backing, scaling operations, and transforming early MVPs into tech giants.',
    category: 'Podcast',
    badge: '1:10:57',
    icon: Video,
    path: '/podcast',
    tags: ['vc effect', 'billion', 'dollar', 'empires', 'unicorn', 'growth', 'scaling', 'venture capital'],
  },
  {
    id: 'pod-mena-strategies',
    title: 'MENA Startup Strategies: How to Navigate VC Culture & Embrace Failure',
    description: 'Navigating Middle East venture dynamics, regulatory compliance across GCC, and building resilience as a founder.',
    category: 'Podcast',
    badge: '47:38',
    icon: Video,
    path: '/podcast',
    tags: ['mena', 'startup strategies', 'vc culture', 'failure', 'middle east', 'gcc', 'uae', 'saudi'],
  },
  {
    id: 'pod-dubai-eu',
    title: 'Dubai vs EU Startups: Is Gulf the Smart Move Right Now?',
    description: 'Comparing Dubai ecosystem advantages vs European tech hubs: zero tax, business setup speed, government support, and capital access.',
    category: 'Podcast',
    badge: '53:34',
    icon: Video,
    path: '/podcast',
    tags: ['dubai', 'eu', 'europe', 'gulf', 'tax', 'relocation', 'move', 'startups in dubai'],
  },
  {
    id: 'pod-save-invest-dubai',
    title: 'How to Save & Invest Money in Dubai (UAE)',
    description: 'Practical guide for tech founders and expats: banking, corporate accounts, personal investments, and golden visa wealth rules.',
    category: 'Podcast',
    badge: '15:05',
    icon: Video,
    path: '/podcast',
    tags: ['save', 'invest', 'dubai', 'uae', 'money', 'banking', 'expat', 'golden visa', 'tax free'],
  },
  {
    id: 'pod-fundraising-works',
    title: 'How Startup Fundraising Works | Startup School',
    description: 'From SAFE notes and convertible debt to priced series rounds: how founders negotiate term sheets and protect dilution.',
    category: 'Podcast',
    badge: '1:13:40',
    icon: Video,
    path: '/podcast',
    tags: ['fundraising works', 'startup school', 'safe', 'dilution', 'equity', 'term sheet', 'valuation'],
  },
  {
    id: 'pod-family-offices',
    title: 'Family Offices From Scratch',
    description: 'How regional family offices originate deals, write checks, allocate direct venture investments, and partner with syndicates.',
    category: 'Podcast',
    badge: '1:05:01',
    icon: Video,
    path: '/podcast',
    tags: ['family offices', 'from scratch', 'allocators', 'direct deals', 'wealth', 'syndicate', 'investing'],
  },

  // ── Blog Articles & Guides
  {
    id: 'article-state-mena',
    title: 'The State of MENA Startups in 2025',
    description: 'Comprehensive analysis of venture momentum, funding volume, fintech dominance, and regional scaling milestones.',
    category: 'Articles',
    badge: 'Article',
    icon: FileText,
    path: '/the-founder-knowledge-hub',
    tags: ['state of mena', '2025', 'ecosystem', 'venture', 'trends', 'report'],
  },
  {
    id: 'article-investor-deck',
    title: 'How to Build an Investor-Ready Deck',
    description: 'Structure, narrative storytelling, essential slide benchmarks, and avoidable mistakes when pitching venture capitalists.',
    category: 'Articles',
    badge: 'Guide',
    icon: FileText,
    path: '/the-5-minute-cfo-model',
    tags: ['investor ready deck', 'pitch deck', 'slides', 'storytelling', 'deck template'],
  },
  {
    id: 'article-female-founders',
    title: 'The Rise of Female Founders in MENA',
    description: 'Highlighting female tech entrepreneurship in the Middle East and initiatives bridging the gender venture gap.',
    category: 'Articles',
    badge: 'Article',
    icon: FileText,
    path: '/the-founder-knowledge-hub',
    tags: ['female founders', 'women', 'diversity', 'entrepreneurship', 'mena tech'],
  },
];

/* ── Suggested Quick Searches ── */
const QUICK_SEARCH_PILLS = [
  'Plug & Play',
  'Runway AI',
  'For Investors',
  'Bootcamp',
  'CFO Model',
  'Events',
  'Dubai',
  'Fundraising',
];

/**
 * Highlights matches of query within text
 */
function HighlightText({ text, query }) {
  if (!query || !query.trim()) return <>{text}</>;

  const trimmed = query.trim();
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            style={{
              background: 'rgba(245, 180, 0, 0.28)',
              color: '#F5B400',
              fontWeight: 800,
              borderRadius: 3,
              padding: '0 3px',
            }}
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 80);
    } else {
      setQuery('');
      setActiveCategory('All');
    }
  }, [isOpen]);

  // Global Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter items matching query
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return SEARCH_DATABASE.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchBadge = item.badge?.toLowerCase().includes(q);
      const matchTags = item.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesQuery = matchTitle || matchDesc || matchCat || matchBadge || matchTags;
      if (!matchesQuery) return false;

      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }

      return true;
    });
  }, [query, activeCategory]);

  // Categories present in the filtered set
  const availableCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ['All'];

    const allMatching = SEARCH_DATABASE.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchBadge = item.badge?.toLowerCase().includes(q);
      const matchTags = item.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCat || matchBadge || matchTags;
    });

    const set = new Set(allMatching.map((item) => item.category));
    return ['All', ...Array.from(set)];
  }, [query]);

  const handleSelectResult = (item) => {
    onClose();
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (item.path.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = item.path.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }
    navigate(item.path);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: 'rgba(5, 5, 10, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '60px 16px 24px',
          overflowY: 'auto',
        }}
      >
        <motion.div
          initial={{ scale: 0.95, y: -20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: -20, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 680,
            background: '#0F0F17',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 22,
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(139, 92, 246, 0.15)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Search Input Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '18px 22px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)',
              gap: 14,
            }}
          >
            <Search size={22} color="#F5B400" style={{ flexShrink: 0 }} />

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything (e.g. 'investors', 'plug and play', 'cfo', 'dubai')..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 500,
                fontFamily: 'inherit',
              }}
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#A3A3B0',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#A3A3B0'; }}
              >
                <X size={14} />
              </button>
            )}

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 6,
                padding: '3px 8px',
                fontSize: 11,
                fontWeight: 700,
                color: '#8E8E9B',
                letterSpacing: '0.04em',
                flexShrink: 0,
              }}
            >
              ESC
            </div>
          </div>

          {/* Category Filter Pills (When query exists and multiple categories match) */}
          {query.trim() && availableCategories.length > 2 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 22px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                overflowX: 'auto',
              }}
            >
              {availableCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: isActive ? 'rgba(245, 180, 0, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                      border: isActive ? '1px solid #F5B400' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#F5B400' : '#A3A3B0',
                      fontSize: 12,
                      fontWeight: isActive ? 700 : 500,
                      padding: '4px 12px',
                      borderRadius: 9999,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* Results Area */}
          <div
            style={{
              maxHeight: '62vh',
              overflowY: 'auto',
              padding: '16px 20px',
            }}
          >
            {/* When user hasn't typed anything yet */}
            {!query.trim() ? (
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#8E8E9B',
                    marginBottom: 12,
                  }}
                >
                  Quick Searches
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {QUICK_SEARCH_PILLS.map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setQuery(pill)}
                      style={{
                        background: '#161622',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#E2E2EA',
                        fontSize: 13,
                        fontWeight: 600,
                        padding: '7px 14px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.5)';
                        e.currentTarget.style.color = '#F5B400';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.color = '#E2E2EA';
                      }}
                    >
                      <Sparkles size={13} color="#F5B400" />
                      <span>{pill}</span>
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#8E8E9B',
                    marginBottom: 12,
                  }}
                >
                  Popular Pages
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {SEARCH_DATABASE.slice(0, 5).map((item) => {
                    const IconComp = item.icon || Globe;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectResult(item)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: 12,
                          background: 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 12,
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: '#1A1A26',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#A3A3B0',
                              flexShrink: 0,
                            }}
                          >
                            <IconComp size={16} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 600 }}>{item.title}</div>
                            <div
                              style={{
                                color: '#8E8E9B',
                                fontSize: 12,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {item.description}
                            </div>
                          </div>
                        </div>

                        <span
                          style={{
                            fontSize: 11,
                            color: '#C4B5FD',
                            background: 'rgba(139, 92, 246, 0.12)',
                            padding: '3px 8px',
                            borderRadius: 6,
                            flexShrink: 0,
                          }}
                        >
                          {item.badge}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : filteredResults.length > 0 ? (
              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: '#8E8E9B',
                    fontWeight: 600,
                    marginBottom: 10,
                    padding: '0 4px',
                  }}
                >
                  Found {filteredResults.length} result{filteredResults.length > 1 ? 's' : ''} for "{query}"
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {filteredResults.map((item) => {
                    const IconComp = item.icon || Globe;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectResult(item)}
                        style={{
                          padding: '13px 16px',
                          borderRadius: 14,
                          background: '#14141E',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 14,
                          transition: 'all 0.18s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.4)';
                          e.currentTarget.style.background = '#1A1A28';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.background = '#14141E';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 10,
                              background: '#1D1D2C',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#F5B400',
                              flexShrink: 0,
                              marginTop: 2,
                            }}
                          >
                            <IconComp size={18} />
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                              <span style={{ color: '#FFFFFF', fontSize: 14.5, fontWeight: 700 }}>
                                <HighlightText text={item.title} query={query} />
                              </span>
                              <span
                                style={{
                                  fontSize: 10.5,
                                  fontWeight: 700,
                                  color: '#C4B5FD',
                                  background: 'rgba(139, 92, 246, 0.16)',
                                  padding: '2px 7px',
                                  borderRadius: 4,
                                }}
                              >
                                {item.badge}
                              </span>
                            </div>

                            <p
                              style={{
                                color: '#A3A3B0',
                                fontSize: 12.5,
                                margin: 0,
                                lineHeight: 1.45,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              <HighlightText text={item.description} query={query} />
                            </p>
                          </div>
                        </div>

                        <div style={{ color: '#8E8E9B', flexShrink: 0 }}>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 20px 36px' }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#8E8E9B',
                  }}
                >
                  <Search size={22} />
                </div>
                <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                  No results found for "{query}"
                </div>
                <p style={{ color: '#8E8E9B', fontSize: 13, maxWidth: 360, margin: '0 auto 20px' }}>
                  Try searching for keywords like "investors", "plug and play", "runway", "podcast", or "cfo".
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                  {['Runway', 'Plug & Play', 'Investors', 'Events'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#E2E2EA',
                        fontSize: 12,
                        padding: '4px 10px',
                        borderRadius: 6,
                        cursor: 'pointer',
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div
            style={{
              padding: '12px 22px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(255, 255, 255, 0.015)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 12,
              color: '#8E8E9B',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>Click any result to navigate instantly</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>Press</span>
              <kbd
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                ESC
              </kbd>
              <span>to close</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
