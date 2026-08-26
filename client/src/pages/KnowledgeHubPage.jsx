import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const BLOG_POSTS = [
  { slug: 'agentic-ai-roadmap-for-founders-and-builders', title: 'Agentic AI Roadmap for Founders', category: 'AI & Technology', date: 'Aug 2025', readTime: '8 min' },
  { slug: 'does-your-pitch-deck-meet-yc-standards-mena', title: 'Does Your Pitch Deck Meet YC Standards?', category: 'Fundraising', date: 'Jul 2025', readTime: '6 min' },
  { slug: 'family-office-fundraising-guide-for-founders', title: 'Family Office Fundraising Guide', category: 'Fundraising', date: 'Jul 2025', readTime: '7 min' },
  { slug: 'fundraising-in-mena-how-vcs-think-about-deal-flow', title: 'How VCs Think About Deal Flow in MENA', category: 'Investor Insights', date: 'Jun 2025', readTime: '9 min' },
  { slug: 'how-founders-should-split-equity', title: 'How Founders Should Split Equity', category: 'Startup Ops', date: 'Jun 2025', readTime: '5 min' },
  { slug: 'unlocking-startup-funding-opportunities-in-the-uae', title: 'Unlocking Startup Funding in the UAE', category: 'MENA Ecosystem', date: 'Apr 2025', readTime: '10 min' },
];

const RESOURCES = [
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
    <div style={{ background: '#000', minHeight: '100vh', paddingTop: 64 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 380,
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.38) 0%, transparent 70%)',
          filter: 'blur(26px)', pointerEvents: 'none',
        }} />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 20, display: 'inline-flex' }}>
            📚 Knowledge Hub
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, fontStyle: 'italic', color: '#fff', lineHeight: 1.1, marginBottom: 16,
          }}>
            The Founder <span style={{ color: '#f5c518' }}>Knowledge Hub</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            Guides, articles, templates, and tools to help you fundraise, build, and grow in the MENA ecosystem.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 440, margin: '0 auto' }}>
            <input
              className="form-input"
              placeholder="Search articles, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 44 }}
            />
            <span style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              color: '#6b7280', fontSize: 16,
            }}>🔍</span>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 24 }}>
            Latest Articles
          </h2>
          <div className="grid-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="blog-card"
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  height: 140,
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(0,0,0,0.8) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 20,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 800, fontStyle: 'italic', color: '#e5e7eb', textAlign: 'center', lineHeight: 1.4 }}>
                    {post.title}
                  </div>
                </div>
                <div className="blog-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 11, color: '#a78bfa', fontWeight: 700 }}>{post.category}</span>
                    <span style={{ fontSize: 11, color: '#6b7280' }}>{post.readTime} read</span>
                  </div>
                  <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 700, lineHeight: 1.4, marginBottom: 10 }}>{post.title}</h3>
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

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/blog" className="btn-purple-outline" style={{ textDecoration: 'none', padding: '12px 28px' }}>
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Resources / Templates */}
      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 24 }}>
            Templates & Tools
          </h2>
          <div className="grid-2">
            {RESOURCES.map((r) => (
              <Link key={r.title} to={r.path} className="mb-card" style={{ textDecoration: 'none', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
