import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Sparkles, Send } from 'lucide-react';

const SUBSTACK_FEATURED_POSTS = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
  {
    id: 4,
    title: 'Off-Market Deal Sourcing — the Engine',
    subtitle: 'How to build custom deal signals and outbound sourcing automation that nobody else in your sector runs.',
    category: 'AI & Tech',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 22, 2026',
    readTime: '9 min read',
    url: 'https://morsebridge.substack.com/p/off-market-deal-sourcing-the-engine',
    image: '/assets/substack/deal_flow.png',
    badge: 'Deal Sourcing',
    badgeColor: '#8B5CF6',
  },
  {
    id: 5,
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
  {
    id: 6,
    title: '100 Middle East Family Offices',
    subtitle: 'Direct allocation directory and coinvestment guide for institutional founders and PE general partners.',
    category: 'VC-PE Resources',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 15, 2026',
    readTime: '8 min read',
    url: 'https://morsebridge.substack.com/p/100-middle-east-family-offices',
    image: '/assets/substack/family_offices.png',
    badge: 'Investor Directory',
    badgeColor: '#A855F7',
  }
];

const CATEGORIES = ['All', 'Claude Corner', 'VC-PE Resources', 'AI & Tech'];

export default function SubstackSection() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = selectedCat === 'All'
    ? SUBSTACK_FEATURED_POSTS
    : SUBSTACK_FEATURED_POSTS.filter(p => p.category === selectedCat);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      window.open(`https://morsebridge.substack.com/subscribe?email=${encodeURIComponent(email)}`, '_blank');
    }
  };

  return (
    <section id="substack" className="section" style={{ position: 'relative', padding: '70px 0 80px', scrollMarginTop: 100 }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 9999,
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              marginBottom: 18,
            }}
          >
            <BookOpen size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              VENTURE INTELLIGENCE &amp; PLAYBOOKS
            </span>
          </div>

          <h2 className="section-title-gold" style={{ marginBottom: 14 }}>
            Substack Insights &amp; PE Automations
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 640, margin: '0 auto 20px' }}>
            In-depth breakdowns of AI-native deal flow, automated commercial due diligence, and Claude agent systems written by Muhammad Ayub.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
            <a
              href="https://morsebridge.substack.com/s/investor-data"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 16px',
                borderRadius: 9999,
                background: 'rgba(245, 180, 0, 0.12)',
                border: '1px solid rgba(245, 180, 0, 0.35)',
                color: '#F5B400',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(245, 180, 0, 0.2)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(245, 180, 0, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Sparkles size={13} />
              <span>Explore Curated Investor Data ↗</span>
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
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

        {/* 3D Posts Grid with 100% Unique Cover Photos */}
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
              transition={{ duration: 0.45, delay: idx * 0.08 }}
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
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.2)';
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
                      fontSize: 11.5,
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
                    fontSize: 17.5,
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
                    fontSize: 13.5,
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
                      style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F5F5F7' }}>{post.author}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>{post.date}</div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      color: '#8B5CF6',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    <span>Read Post</span>
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Substack Newsletter Banner */}
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

          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, color: '#F5F5F7', marginBottom: 12 }}>
            Never Miss a Deal Flow or Diligence Blueprint
          </h3>
          <p style={{ color: '#A3A3B0', fontSize: 15, maxWidth: 580, margin: '0 auto 28px', lineHeight: 1.6 }}>
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
