import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const BLOG_POSTS = [
  {
    slug: 'commercial-due-diligence-automated',
    title: 'Commercial Due Diligence, Automated',
    excerpt: 'Full System for Your Fund: Drive Sync, Drive Analysis, Inbox Monitor inside Claude Cowork.',
    category: 'Claude Corner',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Jun 2026',
    readTime: '8 min read',
    image: '/assets/substack/commercial_dd.jpeg',
    isExternal: true,
    externalUrl: 'https://morsebridge.substack.com/p/40-due-diligence-agents-for-pe-firms',
  },
  {
    slug: 'your-deal-flow-automated-end-to-end',
    title: 'Your Deal Flow. Automated. End to End.',
    excerpt: 'How we built a full PE pipeline inside Claude Cowork — from inbound CIM to instant draft memo.',
    category: 'Claude Corner',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Jun 2026',
    readTime: '7 min read',
    image: '/assets/substack/deal_flow.png',
    isExternal: true,
    externalUrl: 'https://morsebridge.substack.com/p/off-market-deal-sourcing-the-engine',
  },
  {
    slug: 'buyer-surfacing-engine',
    title: "Buyer Surfacing Engine",
    excerpt: 'The twenty agents and Root Files that pinpoint the highest-conviction strategic and sponsor buyers.',
    category: 'VC-PE Resources',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 2026',
    readTime: '10 min read',
    image: '/assets/substack/buyer_surfacing.png',
    isExternal: true,
    externalUrl: 'https://morsebridge.substack.com/p/buyer-surfacing-engine',
  },
  {
    slug: 'credit-underwriting-the-twenty-agent',
    title: 'Credit Underwriting — the 20-Agent Engine',
    excerpt: 'Automate $150M unitranche underwriting, covenant-lite structures, and IC memo generation in 4 days.',
    category: 'VC-PE Resources',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 2026',
    readTime: '12 min read',
    image: '/assets/substack/credit_underwriting.png',
    isExternal: true,
    externalUrl: 'https://morsebridge.substack.com/p/credit-underwriting-the-twenty-agent',
  },
  {
    slug: 'thirty-agents-for-private-equity-deal-flow',
    title: 'Thirty Agents for Private Equity Deal Flow',
    excerpt: 'How multi-agent AI systems automate initial thesis screening, data room extraction, and valuation comparisons.',
    category: 'AI & Technology',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 2026',
    readTime: '12 min read',
    image: '/assets/substack/thirty_agents.png',
    isExternal: true,
    externalUrl: 'https://morsebridge.substack.com/p/thirty-agents-for-private-equity',
  },
  {
    slug: '100-middle-east-family-offices',
    title: '100 Middle East Family Offices',
    excerpt: 'Direct allocation directory and coinvestment guide for institutional founders and PE general partners.',
    category: 'VC-PE Resources',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 2026',
    readTime: '8 min read',
    image: '/assets/substack/family_offices.png',
    isExternal: true,
    externalUrl: 'https://morsebridge.substack.com/p/100-middle-east-family-offices',
  },
  {
    slug: 'agentic-ai-roadmap-for-founders-and-builders',
    title: 'Agentic AI Roadmap for Founders and Builders',
    excerpt: 'A practical guide to understanding and leveraging agentic AI systems to build smarter, more autonomous products in 2026.',
    category: 'AI & Technology',
    author: 'MorseBridge Research',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 2026',
    readTime: '8 min read',
    image: '/assets/substack/dd_agents.png',
  },
  {
    slug: 'does-your-pitch-deck-meet-yc-standards-mena',
    title: 'Does Your Pitch Deck Meet YC Standards? (MENA Edition)',
    excerpt: 'Breaking down what Y Combinator looks for in a pitch deck and how MENA founders can align their decks to global standards.',
    category: 'Fundraising',
    author: 'MorseBridge Advisory',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Jul 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'family-office-fundraising-guide-for-founders',
    title: 'Family Office Fundraising Guide for Founders',
    excerpt: 'How to approach, pitch, and close deals with family offices — one of the most underutilized sources of startup capital.',
    category: 'Fundraising',
    author: 'MorseBridge Advisory',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Jul 2026',
    readTime: '7 min read',
    image: '/assets/substack/family_offices.png',
  },
  {
    slug: 'fundraising-in-mena-how-vcs-think-about-deal-flow',
    title: 'Fundraising in MENA: How VCs Think About Deal Flow',
    excerpt: 'An insider perspective on how MENA venture capitalists evaluate startups, structure deals, and manage their portfolios.',
    category: 'Investor Insights',
    author: 'MorseBridge Advisory',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Jun 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'how-founders-should-split-equity',
    title: 'How Founders Should Split Equity',
    excerpt: 'The definitive guide to co-founder equity splits — including dynamic frameworks, vesting schedules, and common mistakes.',
    category: 'Startup Ops',
    author: 'MorseBridge Advisory',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Jun 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'speed-is-the-new-validation-for-ai-founders',
    title: 'Speed Is the New Validation for AI Founders',
    excerpt: 'Why ship-and-iterate beats customer interviews in the AI era and how top AI founders are validating ideas in days, not months.',
    category: 'AI & Technology',
    author: 'MorseBridge Advisory',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Mar 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
];

const CATEGORIES = ['All', 'Claude Corner', 'Fundraising', 'VC-PE Resources', 'AI & Technology', 'Investor Insights', 'Startup Ops'];

export default function BlogListPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const filtered = selectedCat === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === selectedCat);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 90, color: '#F5F5F7' }}>
      
      {/* Hero */}
      <section style={{ padding: '60px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
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
            <BookOpen size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              VENTURE INTELLIGENCE &amp; PLAYBOOKS
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.12,
              marginBottom: 18,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E2E8 70%, #A3A3B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The MorseBridge <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>Insights &amp; Substack</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, lineHeight: 1.65, maxWidth: 640, margin: '0 auto 32px' }}>
            Actionable diligence frameworks, AI automation systems inside Claude Cowork, and venture playbooks by Muhammad Ayub and the MorseBridge advisory team.
          </p>

          <a
            href="https://morsebridge.substack.com/?utm_campaign=profile_chips"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic-signal"
            style={{
              display: 'inline-flex',
              background: '#8B5CF6',
              color: '#FFFFFF',
              padding: '13px 32px',
              fontSize: 15,
            }}
          >
            <span>Subscribe on Substack</span>
            <ArrowUpRight size={16} />
            <div className="btn-light-sweep" />
          </a>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '0 0 40px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 9999,
                  border: selectedCat === cat ? '1px solid #8B5CF6' : '1px solid var(--border-subtle)',
                  background: selectedCat === cat ? 'rgba(139, 92, 246, 0.2)' : '#14141B',
                  color: selectedCat === cat ? '#FFFFFF' : '#A3A3B0',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedCat === cat ? '0 0 16px rgba(139, 92, 246, 0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid with High-Res Image Banners */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 100 }}>
        <div className="container">
          <div className="grid-3" style={{ gap: 26 }}>
            {filtered.map((post, idx) => {
              const CardWrapper = post.isExternal ? motion.a : motion.div;
              const cardProps = post.isExternal
                ? { href: post.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
                : {};

              return (
                <CardWrapper
                  key={post.slug}
                  {...cardProps}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#14141B',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 20,
                    padding: 16,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  {/* Photo Header */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 180,
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
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />

                    {/* Category & Read Time Badges */}
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
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: '#FFFFFF',
                          background: 'rgba(10, 10, 15, 0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 10px',
                          borderRadius: 9999,
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        {post.category}
                      </span>
                      <span
                        style={{
                          color: '#F5F5F7',
                          fontSize: 11.5,
                          fontWeight: 600,
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

                  {/* Body Content */}
                  <div style={{ padding: '0 8px 8px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3
                      style={{
                        fontSize: 17.5,
                        fontWeight: 800,
                        color: '#F5F5F7',
                        marginBottom: 10,
                        lineHeight: 1.35,
                      }}
                    >
                      {post.title}
                    </h3>

                    <p style={{ color: '#A3A3B0', fontSize: 13.5, lineHeight: 1.6, flex: 1, marginBottom: 18 }}>
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: 12,
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        {post.authorAvatar && (
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }}
                          />
                        )}
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: '#F5F5F7' }}>{post.author}</div>
                          <div style={{ color: 'var(--text-subtle)', fontSize: 11 }}>{post.date}</div>
                        </div>
                      </div>

                      {post.isExternal ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            color: '#8B5CF6',
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          Substack <ArrowUpRight size={14} />
                        </span>
                      ) : (
                        <Link
                          to={`/blog/${post.slug}`}
                          style={{
                            color: '#8B5CF6',
                            fontWeight: 700,
                            fontSize: 13,
                            textDecoration: 'none',
                          }}
                        >
                          Read Article →
                        </Link>
                      )}
                    </div>
                  </div>
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
