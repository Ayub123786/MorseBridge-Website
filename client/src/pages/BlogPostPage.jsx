import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';
import { API_BASE } from '../config/api';
import Footer from '../components/Footer';

const BLOG_DATA = {
  'agentic-ai-roadmap-for-founders-and-builders': {
    title: 'Agentic AI Roadmap for Founders and Builders',
    category: 'AI & Technology',
    date: 'August 2026',
    readTime: '8 min read',
    author: 'Muhammad Ayub',
    intro: 'Agentic AI systems are rapidly moving from research labs to venture production environments. For founders and builders, understanding multi-agent workflows is now a competitive necessity.',
    sections: [
      { heading: 'What Is Agentic AI in Practice?', body: 'Unlike traditional single-turn LLMs, agentic systems operate in continuous loops — decomposing complex objectives into subtasks, tool execution, feedback parsing, and self-correction. For venture workflows, this means autonomous deal screening, SEC filing ingestion, and automated financial modeling.' },
      { heading: 'Why Architecture Matters More Than Models', body: 'Founders often obsess over the latest frontier model release. In reality, the competitive moat lies in system architecture — deterministic code wrappers around probabilistic LLM calls, structured JSON outputs, and persistent memory stores.' },
      { heading: 'The Practical 3-Phase Roadmap', body: 'Start by mapping high-friction knowledge workflows. Phase 1: Ingestion and structured extraction. Phase 2: Multi-agent verification and adversarial checking. Phase 3: Direct integration into deal flow pipelines.' },
      { heading: 'Managing Hallucinations in Financial Diligence', body: 'In venture finance, a 5% hallucination rate is fatal. Implement deterministic validation checks, strict schema constraints (Zod/Pydantic), and double-blind reasoning passes before any metric reaches an investment committee.' },
    ],
  },
  'does-your-pitch-deck-meet-yc-standards-mena': {
    title: 'Does Your Pitch Deck Meet YC Standards? (MENA Edition)',
    category: 'Fundraising',
    date: 'July 2026',
    readTime: '6 min read',
    author: 'MorseBridge Team',
    intro: "Y Combinator's pitch standards have become the global benchmark for early-stage decks. Here is how MENA founders can format their metrics to win global institutional capital.",
    sections: [
      { heading: 'The 10-Slide Standard', body: 'Problem, Solution, Why Now, Market Size (TAM/SAM/SOM), Product Demo, Traction & Unit Economics, Business Model, Team, Financial Model, and The Ask. Each slide gets one single, unforgettable takeaway.' },
      { heading: 'Where MENA Decks Often Fall Short', body: 'The most common mistakes are verbose macroeconomic descriptions, weak cohort retention curves, and ambiguous burn rates. Institutional investors scan decks in 90 seconds — clarity and brevity always win.' },
      { heading: 'Framing the GCC Growth Tailwinds', body: 'Highlight your regional moat — regulatory sandboxes, sovereign incentives, enterprise procurement speed — but speak the universal language of CAC/LTV, net revenue retention (NRR), and gross margin profile.' },
    ],
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (BLOG_DATA[slug]) {
      setPost(BLOG_DATA[slug]);
      return;
    }
    fetch(`${API_BASE}/api/blogs/${slug}`)
      .then((r) => r.json())
      .then((data) => setPost(data))
      .catch(() => setPost(null));
  }, [slug]);

  if (!post) {
    return (
      <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 90, color: '#F5F5F7' }}>
        <div style={{ textAlign: 'center', padding: '120px 24px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
          <h1 style={{ color: '#F5F5F7', fontWeight: 800, marginBottom: 12 }}>Article Not Found</h1>
          <p style={{ color: '#A3A3B0', marginBottom: 28 }}>This article may have been moved or updated.</p>
          <Link
            to="/blog"
            className="btn-magnetic-signal"
            style={{
              display: 'inline-flex',
              background: '#8B5CF6',
              color: '#FFFFFF',
              padding: '12px 28px',
              borderRadius: 12,
            }}
          >
            <span>Back to All Articles</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 90, color: '#F5F5F7' }}>
      
      {/* Article Header */}
      <section style={{ padding: '60px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div className="ambient-mesh-glow" />

        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            to="/blog"
            style={{
              color: '#C4B5FD',
              fontSize: 13.5,
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 24,
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to All Articles</span>
          </Link>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
            <span
              className="font-data"
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#C4B5FD',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                padding: '4px 12px',
                borderRadius: 9999,
              }}
            >
              {post.category}
            </span>
            <span style={{ color: '#A3A3B0', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Clock size={13} /> {post.readTime}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E2E8 70%, #A3A3B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {post.title}
          </h1>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: '#A3A3B0', fontSize: 14 }}>
            <span style={{ color: '#F5F5F7', fontWeight: 600 }}>By {post.author || 'Muhammad Ayub'}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section style={{ padding: '20px 0 100px' }}>
        <div className="container container-narrow">
          {post.intro && (
            <p
              style={{
                fontSize: 18.5,
                lineHeight: 1.75,
                color: '#E2E2E8',
                marginBottom: 44,
                fontStyle: 'italic',
                borderLeft: '3px solid #8B5CF6',
                paddingLeft: 22,
                background: 'rgba(139, 92, 246, 0.05)',
                borderRadius: '0 12px 12px 0',
                padding: '18px 24px',
              }}
            >
              {post.intro}
            </p>
          )}

          {post.sections &&
            post.sections.map((sec, i) => (
              <div key={i} style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5F5F7', marginBottom: 14 }}>
                  {sec.heading}
                </h2>
                <p style={{ color: '#A3A3B0', fontSize: 16, lineHeight: 1.8 }}>
                  {sec.body}
                </p>
              </div>
            ))}

          {/* Share & subscribe CTA */}
          <div
            style={{
              background: '#14141B',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              borderRadius: 24,
              padding: '44px 32px',
              textAlign: 'center',
              marginTop: 60,
              boxShadow: '0 16px 48px rgba(139, 92, 246, 0.15)',
            }}
          >
            <h3 style={{ color: '#F5F5F7', fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
              Enjoyed This Article?
            </h3>
            <p style={{ color: '#A3A3B0', fontSize: 14.5, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
              Subscribe to the MorseBridge Substack for weekly deep-dives on PE automations, agentic diligence, and venture capital playbooks.
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
                fontSize: 14.5,
                fontWeight: 700,
                borderRadius: 12,
              }}
            >
              <span>Subscribe on Substack</span>
              <ArrowUpRight size={16} />
              <div className="btn-light-sweep" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
