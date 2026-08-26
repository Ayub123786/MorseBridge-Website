import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const BENEFITS = [
  { icon: '🎯', title: 'Investor Matching', desc: 'Get introduced to pre-vetted investors aligned to your sector, stage, and geography.' },
  { icon: '📊', title: 'CFO Financial Model', desc: 'Access the 5-Minute CFO Model — the exact template used to raise institutional rounds.' },
  { icon: '📄', title: 'Pitch Deck Review', desc: 'Get feedback on your deck from experienced investors and advisors before you pitch.' },
  { icon: '🎪', title: 'Events & Summits', desc: 'Attend our exclusive startup summits, demo days, and networking events across MENA.' },
  { icon: '🧭', title: 'Mentorship Access', desc: 'Connect with 100+ mentors who have built and funded companies across the region.' },
  { icon: '✨', title: 'Get Featured', desc: 'Have your startup spotlighted to our entire investor and partner network.' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Apply as a Startup', desc: 'Fill out our startup intake form with your company details, stage, and fundraising goals.' },
  { step: '02', title: 'Profile Review', desc: 'Our team reviews your profile within 48 hours and schedules an onboarding call.' },
  { step: '03', title: 'Get Matched', desc: 'We match you with aligned investors from our curated network and make warm introductions.' },
  { step: '04', title: 'Connect & Close', desc: 'Meet your investors, iterate on your pitch, and close your fundraising round.' },
];

export default function StartupPage() {
  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 20, display: 'inline-flex' }}>
            🚀 For Founders &amp; Startups
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 900, fontStyle: 'italic',
            color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 20,
          }}>
            Your Path to <span style={{ color: 'var(--purple-primary)' }}>Funding Starts Here</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7, marginBottom: 36 }}>
            Join 700+ startups already leveraging MorseBridge to access investors, resources,
            and the MENA ecosystem.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/startup-intake" className="btn-purple" style={{ padding: '14px 36px', fontSize: 16 }}>
              Apply as a Startup ↗
            </Link>
            <Link to="/membership-plans" className="btn-purple-outline" style={{ padding: '14px 36px', fontSize: 16 }}>
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 0 60px' }}>
        <div className="container">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20, background: '#ffffff',
            border: '1px solid var(--border-slate)', borderRadius: 20, padding: '32px 24px',
            textAlign: 'center', boxShadow: 'var(--shadow-md)',
          }}>
            {[
              { val: '700+', label: 'Startups Supported' },
              { val: '$45M+', label: 'Capital Facilitated' },
              { val: '100+', label: 'Active Investors' },
              { val: '48h', label: 'Response Time' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--purple-primary)', marginBottom: 4 }}>
                  {s.val}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13.5, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-slate)', borderBottom: '1px solid var(--border-slate)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">What You Get as a Member</h2>
            <p className="section-subtitle">Everything you need to accelerate your fundraising journey.</p>
          </div>
          <div className="grid-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="service-card">
                <div style={{ fontSize: 32, marginBottom: 16 }}>{b.icon}</div>
                <h3 className="service-title">{b.title}</h3>
                <p className="service-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">A straightforward 4-step path to investor introductions.</p>
          </div>
          <div className="grid-4">
            {PROCESS_STEPS.map((s) => (
              <div key={s.step} className="mb-card" style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem', fontWeight: 900, fontStyle: 'italic',
                  color: 'var(--gold)', marginBottom: 12,
                }}>
                  {s.step}
                </div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6 }}>{s.desc}</p>
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
              Ready to Accelerate Your <span style={{ color: 'var(--purple-primary)' }}>Fundraise</span>?
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15.5 }}>
              Complete the startup intake form to get reviewed and matched with investors.
            </p>
            <Link to="/startup-intake" className="btn-purple" style={{ padding: '14px 40px', fontSize: 16 }}>
              Apply as a Startup ↗
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
