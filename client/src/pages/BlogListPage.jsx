import { useState } from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    slug: 'agentic-ai-roadmap-for-founders-and-builders',
    title: 'Agentic AI Roadmap for Founders and Builders',
    excerpt: 'A practical guide to understanding and leveraging agentic AI systems to build smarter, more autonomous products in 2025.',
    category: 'AI & Technology',
    date: 'Aug 2025',
    readTime: '8 min read',
  },
  {
    slug: 'does-your-pitch-deck-meet-yc-standards-mena',
    title: 'Does Your Pitch Deck Meet YC Standards? (MENA Edition)',
    excerpt: 'Breaking down what Y Combinator looks for in a pitch deck and how MENA founders can align their decks to global standards.',
    category: 'Fundraising',
    date: 'Jul 2025',
    readTime: '6 min read',
  },
  {
    slug: 'family-office-fundraising-guide-for-founders',
    title: 'Family Office Fundraising Guide for Founders',
    excerpt: 'How to approach, pitch, and close deals with family offices — one of the most underutilized sources of startup capital.',
    category: 'Fundraising',
    date: 'Jul 2025',
    readTime: '7 min read',
  },
  {
    slug: 'fundraising-in-mena-how-vcs-think-about-deal-flow',
    title: 'Fundraising in MENA: How VCs Think About Deal Flow',
    excerpt: 'An insider perspective on how MENA venture capitalists evaluate startups, structure deals, and manage their portfolios.',
    category: 'Investor Insights',
    date: 'Jun 2025',
    readTime: '9 min read',
  },
  {
    slug: 'how-founders-should-split-equity',
    title: 'How Founders Should Split Equity',
    excerpt: 'The definitive guide to co-founder equity splits — including dynamic frameworks, vesting schedules, and common mistakes.',
    category: 'Startup Ops',
    date: 'Jun 2025',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-think-about-startup-ideas-the-yc-way',
    title: 'How to Think About Startup Ideas — The YC Way',
    excerpt: "Paul Graham's approach to idea generation, adapted for MENA founders building in emerging markets.",
    category: 'Strategy',
    date: 'May 2025',
    readTime: '6 min read',
  },
  {
    slug: 'founders-winning-in-2025-beyond-ai-tools',
    title: 'Founders Winning in 2025 Beyond AI Tools',
    excerpt: 'The real competitive advantages founders are building in 2025 — and why execution speed matters more than the tools you use.',
    category: 'AI & Technology',
    date: 'May 2025',
    readTime: '5 min read',
  },
  {
    slug: 'vc-fund-performance-q3-2025-simple-summary',
    title: 'VC Fund Performance Q3 2025: A Simple Summary',
    excerpt: 'A clear breakdown of venture capital returns, dry powder, and deployment trends across emerging markets.',
    category: 'Market Reports',
    date: 'Apr 2025',
    readTime: '6 min read',
  },
  {
    slug: 'founder-cofounder-communication-startup-survival',
    title: 'Founder–Cofounder Communication: Startup Survival',
    excerpt: 'Why 65% of startups fail due to co-founder conflict and practical communication protocols to keep your founding team aligned.',
    category: 'Startup Ops',
    date: 'Apr 2025',
    readTime: '7 min read',
  },
  {
    slug: 'speed-is-the-new-validation-for-ai-founders',
    title: 'Speed Is the New Validation for AI Founders',
    excerpt: 'Why ship-and-iterate beats customer interviews in the AI era and how top AI founders are validating ideas in days, not months.',
    category: 'AI & Technology',
    date: 'Mar 2025',
    readTime: '5 min read',
  },
  {
    slug: 'unlocking-startup-funding-opportunities-in-the-uae',
    title: 'Unlocking Startup Funding Opportunities in the UAE',
    excerpt: 'A comprehensive map of government grants, accelerators, angels, and VC funds investing in UAE startups in 2025.',
    category: 'MENA Focus',
    date: 'Mar 2025',
    readTime: '8 min read',
  },
];

const CATEGORIES = ['All', 'Fundraising', 'Investor Insights', 'AI & Technology', 'Strategy', 'Startup Ops', 'MENA Focus', 'Market Reports'];

export default function BlogListPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const filtered = selectedCat === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === selectedCat);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 18, display: 'inline-flex' }}>
            Insights &amp; Playbooks
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 18,
            }}
          >
            The MorseBridge <span style={{ color: 'var(--purple-primary)' }}>Blog</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7, marginBottom: 28 }}>
            Actionable playbooks, fundraising guides, and insights from MENA founders and venture investors.
          </p>
          <a
            href="https://morsebridge.substack.com/?utm_campaign=profile_chips"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-purple"
            style={{ padding: '12px 28px', fontSize: 14 }}
          >
            Subscribe on Substack ↗
          </a>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '0 0 40px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  padding: '7px 18px',
                  borderRadius: 9999,
                  border: `1.5px solid ${selectedCat === cat ? 'var(--purple-primary)' : 'var(--border-slate)'}`,
                  background: selectedCat === cat ? 'var(--purple-primary)' : '#ffffff',
                  color: selectedCat === cat ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: selectedCat === cat ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 100 }}>
        <div className="container">
          <div className="grid-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="service-card"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#ffffff',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span className="mb-badge" style={{ fontSize: 11 }}>{post.category}</span>
                    <span style={{ color: 'var(--text-subtle)', fontSize: 12 }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.35 }}>
                    {post.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6 }}>{post.excerpt}</p>
                </div>
                <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--border-slate)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-subtle)', fontSize: 12 }}>{post.date}</span>
                  <span style={{ color: 'var(--purple-primary)', fontWeight: 700, fontSize: 13 }}>Read Article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
