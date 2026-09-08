import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Box,
  TrendingUp,
  Database,
  BookOpen,
  Rocket,
  Target,
  Calendar,
  Layers,
  Search,
  ExternalLink,
  Download,
  Filter,
} from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const PRODUCTS = [
  {
    id: 'cfo-model',
    title: 'The 5-Minute CFO Model',
    category: 'financial-tools',
    tag: 'Financial Modeling',
    badgeText: 'Interactive Tool & Download',
    badgeColor: '#F5B400',
    featured: true,
    desc: 'An institutional-grade 3-statement financial engine built for Pre-Seed to Series A founders. Features automated P&L, 18-month cash runway radar, and live CAC/LTV unit economics.',
    highlights: [
      'Live in-browser Runway & Burn simulator',
      'Instant download in Excel (.xlsx) and CSV formats',
      'Pre-wired 3-statement linking (P&L, Balance Sheet, Cash Flow)',
      'Data room KPI charts ready to paste into Notion/DocSend',
    ],
    path: '/the-5-minute-cfo-model',
    isExternal: false,
    cta: 'Open CFO Model & Download →',
    source: 'MorseBridge Proprietary Tool',
  },
  {
    id: 'investor-data-suite',
    title: 'Curated Investor Data Suite',
    category: 'substack-intelligence',
    tag: 'Substack Exclusive',
    badgeText: '3,000+ Check Writers',
    badgeColor: '#10B981',
    featured: true,
    desc: 'The definitive institutional investor databases curated on the MorseBridge Substack. Unlocks direct check-writers, verified check sizes ($250k–$5M), stage fit, and partner contact channels.',
    highlights: [
      '3,000+ VCs actively writing checks for B2B SaaS',
      '90 Top VCs & Angel Investors funding AI startups in 2026',
      '100+ Middle East Family Offices (UAE & Saudi Arabia)',
      '120 Curated high-execution early-stage syndicates',
    ],
    path: 'https://morsebridge.substack.com/s/investor-data',
    isExternal: true,
    cta: 'Explore Database on Substack ↗',
    source: 'Substack Verified (Muhammad Ayub)',
  },
  {
    id: 'fundraising-playbook',
    title: 'Venture Fundraising Playbook',
    category: 'substack-intelligence',
    tag: 'Substack Blueprint',
    badgeText: 'Tactical Execution',
    badgeColor: '#8B5CF6',
    featured: false,
    desc: 'Comprehensive step-by-step venture fundraising strategy written by Muhammad Ayub. Cold/warm outreach scripts with 42% reply rates, term sheet economics, and SAFE note cap table models.',
    highlights: [
      'Cold email & WhatsApp outreach cadences for angels & VCs',
      'Institutional due diligence data room checklist',
      'Term sheet dilution math & SAFE valuation cap guide',
      'Partner meeting objection handling & closing tactics',
    ],
    path: 'https://morsebridge.substack.com/s/fundraising-playbook',
    isExternal: true,
    cta: 'Read Playbook on Substack ↗',
    source: 'Substack Verified',
  },
  {
    id: 'runway',
    title: 'Runway — Revenue in 90 Days',
    category: 'cohort-programs',
    tag: '13-Week Sprint · 10 Founders',
    badgeText: 'Starts 1 Nov · $2,600 · 0% Equity',
    badgeColor: '#7A6BD0',
    featured: true,
    desc: "Let's get you paid before the runway runs out. Thirteen weeks. Ten founders. Ayub Rafique sits with you while we build it, launch it, and find the first people willing to pay. You keep all of your equity.",
    highlights: [
      '13 weeks hands-on sprint with Ayub Rafique (Phase 1: Build, Phase 2: Revenue)',
      'Starts 1 November · Strictly limited to 10 founders',
      '$2,600 per founder · 0% Equity (Keep 100% of your company)',
      'Master 25 battle-tested tools (Clay, Claude, Sales Navigator, Apollo, Smartlead)',
    ],
    path: '/runway',
    isExternal: false,
    cta: 'Explore Runway Program →',
    source: 'Morsebridge Program',
  },
  {
    id: 'fundraising-bootcamp',
    title: 'Global Fundraising Bootcamp',
    category: 'cohort-programs',
    tag: 'Monthly Cohort',
    badgeText: 'Live Investor Pitch Drills',
    badgeColor: '#F5B400',
    featured: false,
    desc: 'Monthly intensive cohort that transforms product-ready founders into compelling institutional presenters. Live partner drills, deck teardowns, and investor syndicate matchmaking.',
    highlights: [
      '4 weeks of structured fundraising execution',
      'Live simulated partner pitches with real VC feedback',
      'Data room structure audit and narrative pacing review',
      'Monthly cohorts scheduled via Eventbrite & direct portal',
    ],
    path: '/apply?program=global-fundraising-bootcamp',
    isExternal: false,
    cta: 'Apply for Next Cohort →',
    source: 'MorseBridge Cohort',
  },
  {
    id: 'eventbrite-summits',
    title: 'Official MorseBridge Global Summits',
    category: 'eventbrite-summits',
    tag: 'Live Ecosystem',
    badgeText: 'Official Eventbrite Schedule',
    badgeColor: '#38BDF8',
    featured: true,
    desc: 'Closed-door venture gatherings, flagship regional summits, and curated investor mixers across Dubai, Riyadh, and London hosted via our official Eventbrite organizer hub.',
    highlights: [
      'Runway — Revenue in 90 Days (Flagship Sprint)',
      'My Rising Time - A Global Summit Where Founders Rise',
      'Private Closed-Door Deal Mixers (15 Founders x 10 VCs)',
      'Direct Eventbrite ticket reservation & VIP badge access',
    ],
    path: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
    isExternal: true,
    cta: 'View Eventbrite Schedule ↗',
    source: 'Eventbrite Verified Organizer',
  },
  {
    id: 'pe-ai-agents',
    title: 'PE Diligence & Multi-Agent Blueprints',
    category: 'substack-intelligence',
    tag: 'Deep-Dive Blueprint',
    badgeText: 'PE Automation',
    badgeColor: '#06B6D4',
    featured: false,
    desc: 'Weekly engineering & diligence breakdowns on automating commercial due diligence, credit underwriting, and deal sourcing pipelines using multi-agent Claude and LLM architectures.',
    highlights: [
      '40 Due Diligence Agents for Private Equity firms',
      'Automated commercial diligence pipeline setups',
      'Credit underwriting multi-agent architectures',
      'Off-market deal sourcing engine in Claude Cowork',
    ],
    path: 'https://morsebridge.substack.com',
    isExternal: true,
    cta: 'Read Agent Blueprints ↗',
    source: 'Substack Verified',
  },
  {
    id: 'custom-events',
    title: 'Bespoke Event Hosting & Ecosystem Curation',
    category: 'eventbrite-summits',
    tag: 'Venture Production',
    badgeText: 'Host with Us',
    badgeColor: '#A78BFA',
    featured: false,
    desc: 'Let MorseBridge produce your next institutional pitch competition, private venture dinner, or corporate demo day across UAE and Saudi Arabia with full investor guestlist curation.',
    highlights: [
      'Complete venue sourcing, keynote curation & production',
      'Curated LP, GP, and family office guestlist invitations',
      'Post-event Substack writeup & deal flow distribution',
      'Direct integration with Eventbrite ticketing & outreach',
    ],
    path: '/custom-events',
    isExternal: false,
    cta: 'Host an Event with Us →',
    source: 'MorseBridge Events Division',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Products & Resources' },
  { id: 'substack-intelligence', label: 'Substack Intelligence' },
  { id: 'financial-tools', label: 'Financial & CFO Tools' },
  { id: 'cohort-programs', label: 'Cohort Programs' },
  { id: 'eventbrite-summits', label: 'Eventbrite Summits' },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()) ||
        p.tag.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 90, color: '#F5F5F7' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '60px 0 44px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="ambient-mesh-glow" />

        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 18px',
              borderRadius: 9999,
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              marginBottom: 20,
            }}
          >
            <Box size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em', fontWeight: 700 }}>
              VENTURE ACCELERATION PRODUCTS
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: 18,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E2E8 70%, #A3A3B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Tools, Data &amp; Programs for <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>Momentum</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 660, margin: '0 auto 36px', lineHeight: 1.65 }}>
            From our proprietary 5-Minute CFO Model and Substack investor databases to official Eventbrite global summits and venture cohorts — everything founders need to raise capital with authority.
          </p>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 16,
              background: '#14141B',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: '16px 24px',
              maxWidth: 780,
              margin: '0 auto',
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#10B981' }}>3,000+</div>
              <div style={{ fontSize: 11.5, color: '#A3A3B0', fontWeight: 600, textTransform: 'uppercase' }}>VC Check Writers</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#8B5CF6' }}>18-Mo</div>
              <div style={{ fontSize: 11.5, color: '#A3A3B0', fontWeight: 600, textTransform: 'uppercase' }}>CFO Runway Model</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#F5B400' }}>1,200+</div>
              <div style={{ fontSize: 11.5, color: '#A3A3B0', fontWeight: 600, textTransform: 'uppercase' }}>Summit Attendees</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#38BDF8' }}>48 Hours</div>
              <div style={{ fontSize: 11.5, color: '#A3A3B0', fontWeight: 600, textTransform: 'uppercase' }}>Cohort Screening</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ padding: '10px 0 36px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 9999,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: activeCategory === cat.id ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: activeCategory === cat.id ? 'rgba(139, 92, 246, 0.2)' : 'rgba(20, 20, 27, 0.6)',
                    color: activeCategory === cat.id ? '#FFFFFF' : '#A3A3B0',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: 260 }}>
              <Search size={15} color="#A3A3B0" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search products, models, databases..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px 10px 38px',
                  background: '#14141B',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 12,
                  color: '#F5F5F7',
                  fontSize: 13.5,
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 26 }}>
            {filteredProducts.map((prod, idx) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#14141B',
                  border: prod.featured ? '1.5px solid rgba(139, 92, 246, 0.55)' : '1px solid var(--border-subtle)',
                  borderRadius: 22,
                  padding: 28,
                  boxShadow: prod.featured
                    ? '0 12px 36px rgba(139, 92, 246, 0.15)'
                    : '0 8px 24px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8B5CF6';
                  e.currentTarget.style.boxShadow = '0 14px 36px rgba(139, 92, 246, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = prod.featured ? 'rgba(139, 92, 246, 0.55)' : 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = prod.featured
                    ? '0 12px 36px rgba(139, 92, 246, 0.15)'
                    : '0 8px 24px rgba(0, 0, 0, 0.4)';
                }}
              >
                <div>
                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                    <span
                      className="font-data"
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: prod.badgeColor || '#C4B5FD',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${prod.badgeColor ? `${prod.badgeColor}40` : 'rgba(139, 92, 246, 0.3)'}`,
                        padding: '4px 12px',
                        borderRadius: 9999,
                      }}
                    >
                      {prod.tag}
                    </span>

                    <span style={{ fontSize: 11, color: '#A3A3B0', fontWeight: 600 }}>
                      {prod.badgeText}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F5F5F7', marginBottom: 10, lineHeight: 1.3 }}>
                    {prod.title}
                  </h3>
                  
                  <p style={{ color: '#A3A3B0', fontSize: 13.5, lineHeight: 1.65, marginBottom: 20 }}>
                    {prod.desc}
                  </p>

                  {/* Feature Highlights */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }}>
                    {prod.highlights.map((h, hIdx) => (
                      <li
                        key={hIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 9,
                          fontSize: 13,
                          color: '#D1D1DB',
                          marginBottom: 8,
                          lineHeight: 1.5,
                        }}
                      >
                        <CheckCircle2 size={15} color="#8B5CF6" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action & Source Footer */}
                <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 11, color: '#71717E', fontWeight: 500 }}>
                      {prod.source}
                    </span>
                  </div>

                  {prod.isExternal ? (
                    <a
                      href={prod.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-magnetic-signal"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        width: '100%',
                        padding: '12px 18px',
                        background: prod.featured ? '#8B5CF6' : 'rgba(255, 255, 255, 0.06)',
                        border: prod.featured ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF',
                        borderRadius: 12,
                        fontSize: 14,
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      <span>{prod.cta}</span>
                      <div className="btn-light-sweep" />
                    </a>
                  ) : (
                    <Link
                      to={prod.path}
                      className="btn-magnetic-signal"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        width: '100%',
                        padding: '12px 18px',
                        background: '#8B5CF6',
                        color: '#FFFFFF',
                        borderRadius: 12,
                        fontSize: 14,
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 0 16px rgba(139, 92, 246, 0.3)',
                      }}
                    >
                      <span>{prod.cta}</span>
                      <div className="btn-light-sweep" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* Substack & Eventbrite Hub Callout */}
      <section className="section" style={{ paddingBottom: 100 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {/* Substack Hub Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 27, 0.95) 0%, rgba(30, 24, 45, 0.9) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                borderRadius: 22,
                padding: '36px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#A78BFA', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
                <BookOpen size={14} />
                <span>Substack Publication</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#F5F5F7', marginBottom: 12 }}>
                MorseBridge Venture Dispatch
              </h3>
              <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                Join 5,000+ founders and investors reading weekly intelligence by Muhammad Ayub. Includes proprietary investor drops, diligence agent blueprints, and venture market breakdowns.
              </p>
              <a
                href="https://morsebridge.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  borderRadius: 10,
                  background: '#8B5CF6',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                <span>Subscribe on Substack</span>
                <ExternalLink size={15} />
              </a>
            </div>

            {/* Eventbrite Hub Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 27, 0.95) 0%, rgba(20, 32, 45, 0.9) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                borderRadius: 22,
                padding: '36px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#38BDF8', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
                <Calendar size={14} />
                <span>Official Eventbrite Hub</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#F5F5F7', marginBottom: 12 }}>
                Global Venture Summits &amp; Mixers
              </h3>
              <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                Explore scheduled live and virtual events on Eventbrite. Connect with institutional venture capitalists, family offices, and innovative founders across Dubai, Riyadh, and London.
              </p>
              <a
                href="https://www.eventbrite.co.uk/o/morse-bridge-78875439043"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  borderRadius: 10,
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid #38BDF8',
                  color: '#38BDF8',
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                <span>View Eventbrite Schedule</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
