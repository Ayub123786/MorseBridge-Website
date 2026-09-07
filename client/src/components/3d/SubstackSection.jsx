import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';

const SUBSTACK_FEATURED_POSTS = [
  // ── EXACT INVESTOR DATA POSTS FROM SUBSTACK (MAIN ATTRACTION) ──
  {
    id: 'inv-1',
    title: 'The 3000 VCs Actually Writing Checks for B2B SaaS',
    subtitle: "(And Why You'll Waste 6 Months If You Pitch Wrong) — Comprehensive database of active B2B SaaS institutional leads and check writers.",
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Feb 3, 2026',
    readTime: '9 min read',
    url: 'https://morsebridge.substack.com/p/the-3000-vcs-actually-writing-checks',
    image: '/assets/substack/investor_3000_vcs.jpeg',
    badge: '⭐ 3000 SaaS VCs',
    badgeColor: '#F5B400',
  },
  {
    id: 'inv-2',
    title: '90 Top VCs/Angel Investors Funding Artificial Intelligence Startups in 2026',
    subtitle: 'This guide profiles leading venture capital investors actively funding AI startups across all stages—from pre-seed to Series B with check sizes & focus.',
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Feb 15, 2026',
    readTime: '12 min read',
    url: 'https://morsebridge.substack.com/p/90-top-vcsangel-investors-funding',
    image: '/assets/substack/investor_90_ai.jpeg',
    badge: '⭐ Top 90 AI VCs',
    badgeColor: '#F5B400',
  },
  {
    id: 'inv-3',
    title: 'Investor Data 3k',
    subtitle: 'One time 3k prequalified investor database featuring active venture funds, syndicates, and family offices currently deploying capital.',
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Feb 5, 2026',
    readTime: '8 min read',
    url: 'https://morsebridge.substack.com/p/investor-data-3k',
    image: '/assets/substack/investor_data_3k.png',
    badge: '⭐ 3k Database',
    badgeColor: '#F5B400',
  },
  {
    id: 'inv-4',
    title: '120 Investors, Curated for Execution (20 Per Category)',
    subtitle: "Most founders don’t lose fundraising rounds because capital doesn't exist. They lose because they pitch misaligned investors. Curated across Fintech, AI, SaaS, Consumer, and Deep Tech.",
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Mar 3, 2026',
    readTime: '10 min read',
    url: 'https://morsebridge.substack.com/p/120-investors-curated-for-execution',
    image: '/assets/substack/investor_120_curated.jpeg',
    badge: '⭐ 120 Curated VCs',
    badgeColor: '#F5B400',
  },
  {
    id: 'inv-5',
    title: '100 Middle East Family Offices',
    subtitle: 'One hundred Middle East family offices: named contact, role, direct email, LinkedIn profile, website. Three years of verified allocation data.',
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 15, 2026',
    readTime: '8 min read',
    url: 'https://morsebridge.substack.com/p/100-middle-east-family-offices',
    image: '/assets/substack/investor_100_family_offices.png',
    badge: '⭐ Family Offices',
    badgeColor: '#F5B400',
  },
  {
    id: 'inv-6',
    title: "We Compiled 2,000+ Investors So You Don't Have To — Pre-Seed & Series A",
    subtitle: 'Founding a startup? Save 100+ hours of outreach with 2,000+ verified investor leads categorized by check size, geography, and signal profiles.',
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Apr 15, 2026',
    readTime: '9 min read',
    url: 'https://morsebridge.substack.com/p/we-compiled-2000-investors-so-you',
    image: '/assets/substack/investor_2000_drop.jpeg',
    badge: '⭐ 2,000+ Drop',
    badgeColor: '#F5B400',
  },

  // ── VC-PE RESOURCES ──
  {
    id: 'vcpe-1',
    title: 'The Venture Capital Firm’s Guide to Due Diligence',
    subtitle: 'End-to-end framework: commercial, legal, and operational audit checklists, data room architecture, and IC review loops.',
    category: 'VC-PE Resources',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 28, 2026',
    readTime: '13 min read',
    url: 'https://morsebridge.substack.com/p/40-due-diligence-agents-for-pe-firms',
    image: '/assets/substack/dd_agents.png',
    badge: 'VC Diligence Guide',
    badgeColor: '#8B5CF6',
  },
  {
    id: 'vcpe-2',
    title: 'How to Automate VC Portfolio Construction with Claude Cowork — Stage by Stage',
    subtitle: 'Step-by-step multi-agent architecture for LP reserve modeling, portfolio pacing, follow-on simulation, and risk hedging.',
    category: 'VC-PE Resources',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 27, 2026',
    readTime: '15 min read',
    url: 'https://morsebridge.substack.com/p/thirty-agents-for-private-equity',
    image: '/assets/substack/thirty_agents.png',
    badge: 'Portfolio Automation',
    badgeColor: '#10B981',
  },
  {
    id: 'vcpe-3',
    title: 'Buyer Surfacing Engine',
    subtitle: 'The twenty agents and Root Files that pinpoint the highest-conviction strategic and sponsor buyers.',
    category: 'VC-PE Resources',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 22, 2026',
    readTime: '10 min read',
    url: 'https://morsebridge.substack.com/p/buyer-surfacing-engine',
    image: '/assets/substack/buyer_surfacing.png',
    badge: 'Deal Engine',
    badgeColor: '#10B981',
  },
  {
    id: 'vcpe-4',
    title: 'Credit Underwriting — the 20-Agent Engine',
    subtitle: 'Automate $150M unitranche underwriting, covenant-lite structures, and IC memo generation in 4 days.',
    category: 'VC-PE Resources',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 24, 2026',
    readTime: '12 min read',
    url: 'https://morsebridge.substack.com/p/credit-underwriting-the-twenty-agent',
    image: '/assets/substack/credit_underwriting.png',
    badge: 'Underwriting',
    badgeColor: '#38BDF8',
  },

  // ── CLAUDE CORNER ──
  {
    id: 'claude-1',
    title: 'Commercial Due Diligence, Automated',
    subtitle: 'Full System for Your Fund: Drive Sync, Drive Analysis, Inbox Monitor inside Claude Cowork.',
    category: 'Claude Corner',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 25, 2026',
    readTime: '14 min read',
    url: 'https://morsebridge.substack.com/p/40-due-diligence-agents-for-pe-firms',
    image: '/assets/substack/commercial_dd.jpeg',
    badge: 'Featured Blueprint',
    badgeColor: '#F5B400',
  },
  {
    id: 'claude-2',
    title: 'Thirty Agents for Private Equity Deal Flow',
    subtitle: 'How multi-agent AI systems automate thesis screening, data room extraction, and valuation comparisons.',
    category: 'Claude Corner',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 17, 2026',
    readTime: '11 min read',
    url: 'https://morsebridge.substack.com/p/thirty-agents-for-private-equity',
    image: '/assets/substack/thirty_agents.png',
    badge: 'Agent Architecture',
    badgeColor: '#F43F5E',
  },

  // ── AI TECH ──
  {
    id: 'ai-1',
    title: 'Off-Market Deal Sourcing — the Engine',
    subtitle: 'How to build custom deal signals and outbound sourcing automation that nobody else in your sector runs.',
    category: 'AI Tech',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 22, 2026',
    readTime: '9 min read',
    url: 'https://morsebridge.substack.com/p/off-market-deal-sourcing-the-engine',
    image: '/assets/substack/deal_flow.png',
    badge: 'Deal Sourcing',
    badgeColor: '#8B5CF6',
  },

  // ── FUNDRAISING PLAYBOOK ──
  {
    id: 'playbook-1',
    title: 'Fundraising Playbook: Investor-Ready Data Rooms & Diligence',
    subtitle: 'The battle-tested venture fundraising architecture: diligence vaults, warm intro templates, and cap table models.',
    category: 'Fundraising Playbook',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 20, 2026',
    readTime: '14 min read',
    url: 'https://morsebridge.substack.com/s/fundraising-playbook',
    image: '/assets/what-we-do/fundraising_playbook.jpg',
    badge: 'Venture Playbook',
    badgeColor: '#F5B400',
  },
];

const CATEGORIES = [
  'All',
  'Investor Data',
  'VC-PE Resources',
  'Claude Corner',
  'AI Tech',
  'Fundraising Playbook',
];

export default function SubstackSection() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts =
    selectedCat === 'All'
      ? SUBSTACK_FEATURED_POSTS
      : SUBSTACK_FEATURED_POSTS.filter((p) => p.category === selectedCat);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      window.open(
        `https://morsebridge.substack.com/subscribe?email=${encodeURIComponent(email)}`,
        '_blank'
      );
    }
  };

  return (
    <section
      id="substack"
      className="section"
      style={{ position: 'relative', padding: '70px 0 80px', scrollMarginTop: 100 }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>

          <h2 className="section-title-gold" style={{ marginBottom: 14 }}>
            Substack Insights &amp; PE Automations
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 680, margin: '0 auto' }}>
            In-depth breakdowns of AI-native deal flow, automated commercial due diligence, and Claude agent systems written by Muhammad Ayub.
          </p>
        </div>
        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 36,
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                padding: '9px 20px',
                borderRadius: 9999,
                border:
                  selectedCat === cat
                    ? cat === 'Investor Data'
                      ? '1px solid #F5B400'
                      : '1px solid #8B5CF6'
                    : '1px solid var(--border-subtle)',
                background:
                  selectedCat === cat
                    ? cat === 'Investor Data'
                      ? 'rgba(245, 180, 0, 0.2)'
                      : 'rgba(139, 92, 246, 0.2)'
                    : '#14141B',
                color:
                  selectedCat === cat
                    ? cat === 'Investor Data'
                      ? '#F5B400'
                      : '#FFFFFF'
                    : '#A3A3B0',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow:
                  selectedCat === cat
                    ? cat === 'Investor Data'
                      ? '0 0 16px rgba(245, 180, 0, 0.35)'
                      : '0 0 16px rgba(139, 92, 246, 0.3)'
                    : 'none',
              }}
            >
              {cat === 'Investor Data' ? '⭐ Investor Data' : cat}
            </button>
          ))}
        </div>

        {/* 3D Posts Grid */}
        <div className="grid-3" style={{ gap: 24, marginBottom: 50 }}>
          {filteredPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              style={{
                textDecoration: 'none',
                background: '#14141B',
                border: '1px solid var(--border-subtle)',
                borderRadius: 20,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  post.category === 'Investor Data'
                    ? 'rgba(245, 180, 0, 0.6)'
                    : 'rgba(139, 92, 246, 0.6)';
                e.currentTarget.style.boxShadow =
                  post.category === 'Investor Data'
                    ? '0 12px 32px rgba(245, 180, 0, 0.2)'
                    : '0 12px 32px rgba(139, 92, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
              }}
            >
              {/* Photo Banner */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 185,
                  borderRadius: 14,
                  overflow: 'hidden',
                  marginBottom: 16,
                  background: '#1C1C24',
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit:
                      post.category === 'Fundraising Playbook'
                        ? 'contain'
                        : 'cover',
                    objectPosition: post.title.includes('3000 VCs') ? 'top center' : 'center',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Badges on Banner */}
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    right: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    className="font-data"
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: post.badgeColor || '#FFFFFF',
                      background: 'rgba(10, 10, 15, 0.88)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: 9999,
                      border: `1px solid ${post.badgeColor || 'rgba(255, 255, 255, 0.2)'}`,
                    }}
                  >
                    {post.badge || post.category}
                  </span>

                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#F5F5F7',
                      background: 'rgba(10, 10, 15, 0.85)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: 9999,
                    }}
                  >
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '0 8px 8px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Title */}
                <h3
                  style={{
                    fontSize: 16.5,
                    fontWeight: 800,
                    color: '#F5F5F7',
                    lineHeight: 1.35,
                    marginBottom: 8,
                  }}
                >
                  {post.title}
                </h3>

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: 13,
                    color: '#A3A3B0',
                    lineHeight: 1.6,
                    marginBottom: 18,
                    flex: 1,
                  }}
                >
                  {post.subtitle}
                </p>

                {/* Footer info: Author & CTA */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 12,
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#F5F5F7' }}>{post.author}</div>
                      <div style={{ fontSize: 10.5, color: 'var(--text-subtle)' }}>{post.date}</div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      color: post.category === 'Investor Data' ? '#F5B400' : '#8B5CF6',
                      fontSize: 12.5,
                      fontWeight: 700,
                    }}
                  >
                    <span>Read Directory</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Substack Newsletter Subscription Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 27, 0.95) 0%, rgba(30, 25, 45, 0.9) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            borderRadius: 24,
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: '0 16px 48px rgba(139, 92, 246, 0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245, 180, 0, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <h3
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              fontWeight: 900,
              color: '#F5F5F7',
              marginBottom: 12,
            }}
          >
            Never Miss a Deal Flow or Diligence Blueprint
          </h3>
          <p
            style={{
              color: '#A3A3B0',
              fontSize: 15,
              maxWidth: 580,
              margin: '0 auto 28px',
              lineHeight: 1.6,
            }}
          >
            Join 2,500+ venture capitalists, private equity partners, and founders reading the MorseBridge Substack weekly.
          </p>

          <form
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              gap: 12,
              maxWidth: 480,
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: '1 1 260px',
                padding: '13px 18px',
                borderRadius: 12,
                background: '#0A0A0F',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#F5F5F7',
                fontSize: 14,
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-magnetic-signal"
              style={{
                background: '#8B5CF6',
                color: '#FFFFFF',
                padding: '13px 26px',
                fontSize: 14.5,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                borderRadius: 12,
              }}
            >
              <span>{subscribed ? 'Subscribing...' : 'Subscribe on Substack'}</span>
              <ArrowUpRight size={16} />
              <div className="btn-light-sweep" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
