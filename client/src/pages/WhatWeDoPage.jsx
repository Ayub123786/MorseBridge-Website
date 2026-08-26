import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    icon: '🤝',
    title: 'Startup–Investor Matching',
    desc: 'We intelligently match pre-screened startups with aligned investors based on sector, stage, and geography — cutting through the noise so the right conversations happen faster.',
  },
  {
    icon: '📊',
    title: 'Investor Deal Flow',
    desc: 'Investors on MorseBridge receive curated deal flow tailored to their thesis. No cold pitches — just warm, relevant introductions to vetted startups.',
  },
  {
    icon: '🎯',
    title: 'Startup Events & Summits',
    desc: 'We run and host premium events across the MENA region, including pitch competitions, VC panels, and investor summits that create real connections.',
  },
  {
    icon: '📚',
    title: 'Founder Resources',
    desc: 'Access our library of templates, guides, and tools — from pitch decks to CFO models — built specifically for MENA founders navigating fundraising.',
  },
  {
    icon: '🧭',
    title: 'Advisory & Mentorship',
    desc: 'Get paired with experienced mentors and advisors who have built and funded companies in the MENA ecosystem.',
  },
  {
    icon: '🏆',
    title: 'Featured Exposure',
    desc: "Get your startup featured in front of our network of investors, funds, and accelerators through our 'Get Featured' spotlight program.",
  },
];

export default function WhatWeDoPage() {
  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section
        style={{
          padding: '80px 0 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 20, display: 'inline-flex' }}>
            ⚡ Our Platform
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            What We <span style={{ color: 'var(--purple-primary)' }}>Do</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7 }}>
            We're on a mission to make startup fundraising and investor matching seamless,
            transparent, and efficient across the MENA region and globally.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="grid-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="service-card">
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div
            style={{
              background: '#ffffff',
              border: '1px solid var(--border-slate)',
              borderRadius: 24,
              padding: '52px 36px',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h2
              style={{
                fontSize: '2.2rem',
                fontWeight: 900,
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                marginBottom: 12,
              }}
            >
              Ready to Get <span style={{ color: 'var(--purple-primary)' }}>Started</span>?
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15.5 }}>
              Whether you're raising capital or looking to invest, MorseBridge is your bridge to the ecosystem.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/startup-intake" className="btn-purple" style={{ padding: '14px 32px' }}>
                Join as a Startup ↗
              </Link>
              <Link to="/signup" className="btn-purple-outline" style={{ padding: '14px 32px' }}>
                Join as an Investor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
