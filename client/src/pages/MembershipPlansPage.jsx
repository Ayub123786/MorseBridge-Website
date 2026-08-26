import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    badge: null,
    btnClass: 'btn-purple-outline',
    featured: false,
    features: [
      'Access to blog & articles',
      'Community newsletter',
      '1 event registration/month',
      'Basic pitch deck tips',
    ],
    notIncluded: ['Investor matching', 'CFO Model download', 'Advisory sessions', 'Get Featured'],
  },
  {
    name: 'Founder Pro',
    price: '$49',
    period: '/month',
    badge: '⭐ Most Popular',
    btnClass: 'btn-purple',
    featured: true,
    features: [
      'Everything in Starter',
      '5-Minute CFO Model (Excel + Sheets)',
      '3 investor introductions/month',
      'Full resource & template vault',
      'Priority event registration',
      '1 advisory session/month',
    ],
    notIncluded: ['Get Featured spotlight', 'Unlimited introductions'],
  },
  {
    name: 'Scale',
    price: '$149',
    period: '/month',
    badge: '🚀 High Growth',
    btnClass: 'btn-purple',
    featured: false,
    features: [
      'Everything in Founder Pro',
      'Unlimited investor introductions',
      'Get Featured spotlight (quarterly)',
      '3 advisory sessions/month',
      'Private investor deal room listing',
      'Dedicated account manager',
      'Custom event discounts',
    ],
    notIncluded: [],
  },
];

export default function MembershipPlansPage() {
  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 20, display: 'inline-flex' }}>
            💳 Membership
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 900, fontStyle: 'italic',
            color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 20,
          }}>
            Simple, Transparent <span style={{ color: 'var(--purple-primary)' }}>Pricing</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7 }}>
            Choose the plan that fits your fundraising stage. Upgrade or cancel anytime.
          </p>
        </div>
      </section>

      {/* Plans grid */}
      <section className="section" style={{ paddingTop: 10, paddingBottom: 100 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {PLANS.map((p) => (
              <div
                key={p.name}
                className="service-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: p.featured ? '2px solid var(--purple-primary)' : '1px solid var(--border-slate)',
                  background: '#ffffff',
                  boxShadow: p.featured ? 'var(--shadow-glow-purple)' : 'var(--shadow-sm)',
                  position: 'relative',
                }}
              >
                <div>
                  {p.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 18,
                        right: 20,
                        background: 'linear-gradient(90deg, #7c3aed, #6366f1)',
                        color: '#ffffff',
                        fontSize: 11,
                        fontWeight: 900,
                        padding: '4px 12px',
                        borderRadius: 999,
                      }}
                    >
                      {p.badge}
                    </span>
                  )}

                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 8 }}>
                    {p.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                    <span style={{ fontSize: '2.8rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--purple-primary)' }}>
                      {p.price}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{p.period}</span>
                  </div>

                  <ul style={{ listStyle: 'none', marginBottom: 32 }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'var(--text-body)', marginBottom: 10 }}>
                        <span style={{ color: 'var(--purple-primary)', fontWeight: 800 }}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                    {p.notIncluded.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'var(--text-subtle)', marginBottom: 10, opacity: 0.6 }}>
                        <span>✕</span>
                        <span style={{ textDecoration: 'line-through' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/signup" className={p.btnClass} style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 14 }}>
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
