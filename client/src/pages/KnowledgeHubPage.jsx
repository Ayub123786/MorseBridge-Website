import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const BLOG_POSTS = [
  { slug: 'agentic-ai-roadmap-for-founders-and-builders', title: 'Agentic AI Roadmap for Founders', category: 'AI & Technology', date: 'Aug 2026', readTime: '8 min' },
  { slug: 'does-your-pitch-deck-meet-yc-standards-mena', title: 'Does Your Pitch Deck Meet YC Standards?', category: 'Fundraising', date: 'Jul 2026', readTime: '6 min' },
  { slug: 'family-office-fundraising-guide-for-founders', title: 'Family Office Fundraising Guide', category: 'Fundraising', date: 'Jul 2026', readTime: '7 min' },
  { slug: 'fundraising-in-mena-how-vcs-think-about-deal-flow', title: 'How VCs Think About Deal Flow in MENA', category: 'Investor Insights', date: 'Jun 2026', readTime: '9 min' },
  { slug: 'how-founders-should-split-equity', title: 'How Founders Should Split Equity', category: 'Startup Ops', date: 'Jun 2026', readTime: '5 min' },
  { slug: 'unlocking-startup-funding-opportunities-in-the-uae', title: 'Unlocking Startup Funding in the UAE', category: 'MENA Ecosystem', date: 'Apr 2026', readTime: '10 min' },
];

const RESOURCES = [
  { title: 'Curated Investor Data Suite ↗', desc: 'Pre-vetted VCs, angels, and family offices based on stage, fit, and allocation', type: '📁 Database', path: 'https://morsebridge.substack.com/s/investor-data', isExternal: true },
  { title: '5-Minute CFO Model', desc: 'Excel & Google Sheets template for pre-seed to Series A', type: '📊 Template', path: '/the-5-minute-cfo-model' },
  { title: 'YC-Standard Pitch Deck', desc: 'A pitch deck template aligned to Y Combinator standards', type: '📄 Template', path: '/products' },
  { title: 'Cap Table Template', desc: 'Track your equity ownership and dilution over time', type: '📈 Tool', path: '/products' },
  { title: 'Investor Outreach Templates', desc: 'Cold email scripts and follow-up sequences', type: '✉️ Template', path: '/products' },
];

export default function KnowledgeHubPage() {
  const [search, setSearch] = useState('');

  const filtered = BLOG_POSTS.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '60px 0 32px', textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)' }}>
        <div className="container container-narrow">
          <div className="badge-purple" style={{ marginBottom: 16 }}>Knowledge Hub</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Guides, Frameworks &amp; Templates
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 16, maxWidth: 520, margin: '0 auto 28px' }}>
            Actionable resources built from real fundraising experiences in the MENA region.
          </p>

          {/* Search */}
          <div style={{ maxWidth: 440, margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Search guides, templates, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-input"
              style={{ textAlign: 'center' }}
            />
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 24 }}>
            Latest Articles
          </h2>
          <div className="grid-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="mb-card"
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', background: 'rgba(124,58,237,0.15)', padding: '2px 8px', borderRadius: 4 }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 13, color: '#a78bfa', fontWeight: 600 }}>Read Guide →</span>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{post.date}</div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
              No articles found for "{search}"
            </div>
          )}
        </div>
      </section>

      {/* Resources / Templates */}
      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 24 }}>
            Templates, Databases &amp; Tools
          </h2>
          <div className="grid-2">
            {RESOURCES.map((r) => {
              const ResourceWrapper = r.isExternal ? 'a' : Link;
              const wrapperProps = r.isExternal
                ? { href: r.path, target: '_blank', rel: 'noopener noreferrer' }
                : { to: r.path };

              return (
                <ResourceWrapper
                  key={r.title}
                  {...wrapperProps}
                  className="mb-card"
                  style={{ textDecoration: 'none', display: 'flex', gap: 16, alignItems: 'flex-start' }}
                >
                  <div style={{
                    background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
                    borderRadius: 10, padding: '10px 14px', flexShrink: 0,
                    fontSize: 11, fontWeight: 700, color: '#a78bfa',
                  }}>
                    {r.type}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 6 }}>{r.title}</div>
                    <div style={{ fontSize: 13.5, color: '#9ca3af', lineHeight: 1.5 }}>{r.desc}</div>
                  </div>
                </ResourceWrapper>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
