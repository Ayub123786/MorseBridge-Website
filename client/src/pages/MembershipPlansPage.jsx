import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, XCircle, CreditCard, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    badge: null,
    featured: false,
    features: [
      'Access to blog & diligence playbooks',
      'Weekly Substack newsletter analysis',
      '1 community event registration / month',
      'Basic pitch deck benchmark guide',
    ],
    notIncluded: [
      'Institutional VC matching',
      '5-Minute CFO Model download',
      'Private advisory sessions',
      'Spotlight deal room feature',
    ],
  },
  {
    name: 'Founder Pro',
    price: '$49',
    period: '/month',
    badge: '⭐ MOST POPULAR',
    featured: true,
    features: [
      'Everything in Starter',
      'The 5-Minute CFO Model (Excel + Sheets)',
      '3 targeted VC / Angel introductions / month',
      'Full due diligence resource vault',
      'Priority VIP event registrations',
      '1 strategic advisory session / month',
    ],
    notIncluded: [
      'Quarterly ecosystem spotlight',
      'Unlimited warm introductions',
    ],
  },
  {
    name: 'Scale',
    price: '$149',
    period: '/month',
    badge: '🚀 HIGH GROWTH',
    featured: false,
    features: [
      'Everything in Founder Pro',
      'Unlimited institutional VC introductions',
      'Quarterly founder spotlight exposure',
      '3 dedicated advisory sessions / month',
      'Private investor deal room listing',
      'Dedicated partner account manager',
      'VIP passes to all summits and demo days',
    ],
    notIncluded: [],
  },
];

export default function MembershipPlansPage() {
  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 90, color: '#F5F5F7' }}>
      
      {/* Hero */}
      <section style={{ padding: '60px 0 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
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
              marginBottom: 24,
            }}
          >
            <CreditCard size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              MEMBERSHIP TIERS
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E2E8 70%, #A3A3B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Simple, Transparent <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>Pricing</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 640, margin: '0 auto 36px', lineHeight: 1.65 }}>
            Choose the tier that fits your fundraising velocity. Scale, pause, or upgrade anytime with zero lock-in contracts.
          </p>
        </div>
      </section>

      {/* Plans grid */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 100 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            {PLANS.map((p, idx) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#14141B',
                  border: p.featured ? '1.5px solid #8B5CF6' : '1px solid var(--border-subtle)',
                  borderRadius: 22,
                  padding: 32,
                  boxShadow: p.featured
                    ? '0 16px 48px rgba(139, 92, 246, 0.25)'
                    : '0 8px 24px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8B5CF6';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(139, 92, 246, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = p.featured ? '#8B5CF6' : 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = p.featured
                    ? '0 16px 48px rgba(139, 92, 246, 0.25)'
                    : '0 8px 24px rgba(0, 0, 0, 0.4)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: '#F5F5F7', margin: 0 }}>
                      {p.name}
                    </h3>
                    {p.badge && (
                      <span
                        style={{
                          background: p.featured ? 'rgba(139, 92, 246, 0.2)' : 'rgba(245, 180, 0, 0.15)',
                          color: p.featured ? '#C4B5FD' : '#F5B400',
                          border: `1px solid ${p.featured ? 'rgba(139, 92, 246, 0.4)' : 'rgba(245, 180, 0, 0.3)'}`,
                          fontSize: 11,
                          fontWeight: 800,
                          padding: '4px 12px',
                          borderRadius: 9999,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 28 }}>
                    <span
                      className="font-data"
                      style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: p.featured ? '#C4B5FD' : '#FFFFFF',
                      }}
                    >
                      {p.price}
                    </span>
                    <span style={{ color: '#A3A3B0', fontSize: 14 }}>{p.period}</span>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#D1D1DB', marginBottom: 12, lineHeight: 1.45 }}>
                        <CheckCircle2 size={16} color="#8B5CF6" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{f}</span>
                      </li>
                    ))}
                    {p.notIncluded.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--text-subtle)', marginBottom: 12, opacity: 0.5 }}>
                        <XCircle size={16} color="var(--text-subtle)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ textDecoration: 'line-through' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <Link
                    to="/signup"
                    className="btn-magnetic-signal"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      fontSize: 14.5,
                      padding: '13px',
                      borderRadius: 12,
                      background: p.featured ? '#8B5CF6' : 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      border: p.featured ? 'none' : '1px solid var(--border-subtle)',
                      fontWeight: 700,
                    }}
                  >
                    <span>Get Started</span>
                    <ArrowUpRight size={16} />
                    <div className="btn-light-sweep" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
