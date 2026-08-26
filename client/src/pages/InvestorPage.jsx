import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const INVESTOR_BENEFITS = [
  { icon: '🔍', title: 'Curated Deal Flow', desc: 'Receive pre-screened startup deal flow aligned to your investment thesis — no cold pitches.' },
  { icon: '📋', title: 'Diligence Support', desc: 'Access our due diligence vault with financial models, pitch decks, and data rooms.' },
  { icon: '🌍', title: 'MENA Network', desc: 'Tap into our exclusive network of co-investors, family offices, and strategic partners across MENA.' },
  { icon: '🎤', title: 'Speaking Opportunities', desc: 'Feature on panels at our summits and events to grow your visibility as a thought leader.' },
  { icon: '📊', title: 'Portfolio Support', desc: "Get access to resources and advisors to help your portfolio companies grow post-investment." },
  { icon: '🤝', title: 'Co-Investment', desc: 'Collaborate with other investors in our network for syndicate deals and larger rounds.' },
];

const INVESTOR_TYPES = [
  { type: 'Angel Investors', desc: 'Individual high-net-worth investors making early-stage bets in MENA startups.' },
  { type: 'Family Offices', desc: 'Private wealth managers looking for direct startup investment opportunities with high returns.' },
  { type: 'Venture Capital', desc: 'Institutional VC funds seeking curated deal flow and co-investment opportunities.' },
  { type: 'Corporate Investors', desc: 'Strategic corporate investors looking for innovation, acqui-hire, or partnership opportunities.' },
];

export default function InvestorPage() {
  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 20, display: 'inline-flex' }}>
            💰 For Investors &amp; VCs
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 900, fontStyle: 'italic',
            color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 20,
          }}>
            Access High-Quality <span style={{ color: 'var(--purple-primary)' }}>MENA Deal Flow</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7, marginBottom: 36 }}>
            Join 100+ active investors already using MorseBridge to discover, evaluate, and back
            high-potential startups across MENA.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" className="btn-purple" style={{ padding: '14px 36px', fontSize: 16 }}>
              Join as Investor ↗
            </Link>
            <Link to="/what-we-do" className="btn-purple-outline" style={{ padding: '14px 36px', fontSize: 16 }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Investor Types */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 0 60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">Who We Work With</h2>
            <p className="section-subtitle">Tailored deal flow and community for all investor profiles.</p>
          </div>
          <div className="grid-4">
            {INVESTOR_TYPES.map((t) => (
              <div key={t.type} className="mb-card">
                <h3 style={{ color: 'var(--purple-primary)', fontSize: 18, fontWeight: 900, fontStyle: 'italic', marginBottom: 8 }}>
                  {t.type}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-slate)', borderBottom: '1px solid var(--border-slate)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Why Partner with MorseBridge</h2>
            <p className="section-subtitle">A curated platform for institutional and angel investors.</p>
          </div>
          <div className="grid-3">
            {INVESTOR_BENEFITS.map((b) => (
              <div key={b.title} className="service-card">
                <div style={{ fontSize: 32, marginBottom: 16 }}>{b.icon}</div>
                <h3 className="service-title">{b.title}</h3>
                <p className="service-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-slate)',
            borderRadius: 24, padding: '52px 36px',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 12 }}>
              Ready to Expand Your <span style={{ color: 'var(--purple-primary)' }}>Portfolio</span>?
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15.5 }}>
              Register your investment thesis to start receiving screened deal flow.
            </p>
            <Link to="/signup" className="btn-purple" style={{ padding: '14px 40px', fontSize: 16 }}>
              Join Our Investor Network ↗
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
