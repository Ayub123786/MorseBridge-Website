import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const FEATURES = [
  { icon: '📈', title: 'Revenue Modeling', desc: 'Build multi-stream revenue projections with customizable growth assumptions.' },
  { icon: '🔥', title: 'Burn & Runway', desc: 'Real-time cash burn calculator with runway alerts and fundraising trigger points.' },
  { icon: '⚖️', title: 'Unit Economics', desc: 'LTV/CAC ratio, payback period, and cohort-based margin analysis built in.' },
  { icon: '📊', title: 'P&L, Cash Flow & Balance Sheet', desc: 'Full 3-statement model pre-built and automatically linked — zero setup needed.' },
  { icon: '🏦', title: 'Cap Table', desc: 'Model dilution across seed, Series A, and beyond with SAFE and convertible note support.' },
  { icon: '📋', title: 'Investor-Ready Output', desc: 'Formatted output slides ready to embed directly into your pitch deck.' },
];

const TABS = ['Excel', 'Google Sheets'];

export default function CFOModelPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 20, display: 'inline-flex' }}>
            ⭐ Most Popular Product
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 900, fontStyle: 'italic',
            color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 20,
          }}>
            The 5-Minute <span style={{ color: 'var(--purple-primary)' }}>CFO Model</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7, marginBottom: 36 }}>
            An institutional-grade financial model that takes 5 minutes to set up — built for
            pre-seed to Series A founders who want to walk into investor meetings with confidence.
          </p>

          {/* Format tabs */}
          <div style={{
            display: 'inline-flex', background: '#ffffff',
            border: '1.5px solid var(--border-slate)', borderRadius: 12, padding: 4,
            marginBottom: 28, gap: 4, boxShadow: 'var(--shadow-xs)',
          }}>
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '9px 26px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: activeTab === i ? 'var(--purple-primary)' : 'transparent',
                  color: activeTab === i ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: 14, fontWeight: 700, transition: 'all 0.2s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-purple"
              style={{ fontSize: 15, padding: '14px 36px' }}
            >
              Get The Model Now ↗
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-slate)', borderBottom: '1px solid var(--border-slate)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">What's Inside</h2>
            <p className="section-subtitle">Everything you need to answer tough investor questions on financials.</p>
          </div>

          <div className="grid-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="service-card">
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 className="service-title">{f.title}</h3>
                <p className="service-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Walk Into Your Next Meeting with Confidence */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-slate)',
            borderRadius: 24, padding: '52px 36px',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 12 }}>
              Walk Into Your Next Meeting with <span style={{ color: 'var(--purple-primary)' }}>Confidence</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15.5 }}>
              Download the 5-Minute CFO model and get investor-ready today.
            </p>
            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-purple"
              style={{ padding: '14px 40px', fontSize: 15, fontWeight: 700 }}
            >
              Get The 5-Minute CFO Model ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
