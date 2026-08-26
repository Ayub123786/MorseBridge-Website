import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, CheckCircle2, Box } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const PRODUCTS_LIST = [
  {
    id: 1,
    title: 'The 5-Minute CFO Model',
    tag: 'Finance & Diligence',
    badgeColor: '#F5B400',
    desc: 'Most financial models are complex, consultant-driven, and impossible to update. This one is founder-friendly, institutional-grade, and linked automatically.',
    features: [
      'P&L, Cash Flow & Balance Sheet automatically linked',
      'Real-time cash burn & runway alert calculator',
      'Unit economics, CAC/LTV & margin models',
      'Excel & Google Sheets ready to customize in minutes',
    ],
    path: '/the-5-minute-cfo-model',
    isExternal: false,
    cta: 'More Info & Download →',
    featured: true,
  },
  {
    id: 2,
    title: 'Startup Look Book',
    tag: 'Launch & Influence',
    badgeColor: '#8B5CF6',
    desc: 'We help startups and companies launch with purpose and influence — through curated events, thought-leadership dialogues, and community gatherings that drive visibility, trust, and investment.',
    features: [
      'Product Launch & Demo Showcases',
      'Curated founder-investor roundtables',
      'Media, newsletter & podcast spotlight exposure',
      'Community alignment across UAE & KSA',
    ],
    path: 'https://cal.com/morsebridge/30-min-intro',
    isExternal: true,
    cta: 'Explore Launch Support ↗',
    featured: false,
  },
  {
    id: 3,
    title: 'Investor Data Suite',
    tag: 'Capital Access',
    badgeColor: '#10B981',
    desc: 'Curated investor data to help founders identify and target the right VCs, angels, and family offices based on stage, fit, and real portfolio alignment.',
    features: [
      '100+ active MENA & global institutional investors',
      'Direct investment thesis & ticket size ranges',
      'Verified partner contact channels & syndicate lists',
      'Regular portfolio & deal flow intelligence updates',
    ],
    path: 'https://morsebridge.substack.com/s/investor-data',
    isExternal: true,
    cta: 'Explore Investor Data ↗',
    featured: false,
  },
  {
    id: 4,
    title: 'Investor-Ready Pitch Deck Templates',
    tag: 'Narrative & Decks',
    badgeColor: '#38BDF8',
    desc: 'Ready-made, high-converting pitch deck templates designed with investor expectations in mind. Tell your story clearly, confidently, and raise faster.',
    features: [
      'YC & Global VC standard 10-slide framework',
      'Pre-built market sizing & unit economics slides',
      'Figma, PowerPoint & Keynote formats',
      'Clear founder narrative pacing guidelines',
    ],
    path: 'https://cal.com/morsebridge/30-min-intro',
    isExternal: true,
    cta: 'Get Templates ↗',
    featured: false,
  },
  {
    id: 5,
    title: 'Fundraising Playbook',
    tag: 'Strategy & Execution',
    badgeColor: '#A855F7',
    desc: 'Actionable strategies, deal frameworks, investor data rooms, outreach scripts, and due diligence roadmaps tailored for pre-seed and seed founders.',
    features: [
      'Step-by-step cold & warm investor outreach scripts',
      'Due diligence data room checklist',
      'Term sheet negotiation & SAFEs guide',
      'Follow-up cadence & investor CRM setup',
    ],
    path: 'https://cal.com/morsebridge/30-min-intro',
    isExternal: true,
    cta: 'Get the Playbook ↗',
    featured: false,
  },
];

export default function ProductsPage() {
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
            <Box size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              PRODUCTS &amp; RESOURCES
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
            Tools &amp; Frameworks for <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>Momentum</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 640, margin: '0 auto 36px', lineHeight: 1.65 }}>
            Institutional-grade models, investor data suites, and tactical playbooks built to help founders raise faster and scale with credibility.
          </p>
        </div>
      </section>

      {/* 5 Products Grid */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 26 }}>
            {PRODUCTS_LIST.map((prod, idx) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#14141B',
                  border: prod.featured ? '1.5px solid rgba(245, 180, 0, 0.6)' : '1px solid var(--border-subtle)',
                  borderRadius: 22,
                  padding: 30,
                  boxShadow: prod.featured
                    ? '0 12px 36px rgba(245, 180, 0, 0.15)'
                    : '0 8px 24px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = prod.featured ? '#F5B400' : 'rgba(139, 92, 246, 0.6)';
                  e.currentTarget.style.boxShadow = '0 14px 36px rgba(139, 92, 246, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = prod.featured ? 'rgba(245, 180, 0, 0.6)' : 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = prod.featured
                    ? '0 12px 36px rgba(245, 180, 0, 0.15)'
                    : '0 8px 24px rgba(0, 0, 0, 0.4)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span
                      className="font-data"
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: prod.badgeColor || '#C4B5FD',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${prod.badgeColor ? `${prod.badgeColor}40` : 'rgba(139, 92, 246, 0.3)'}`,
                        padding: '4px 12px',
                        borderRadius: 9999,
                      }}
                    >
                      {prod.tag}
                    </span>

                    {prod.featured && (
                      <span
                        style={{
                          background: 'rgba(245, 180, 0, 0.15)',
                          color: '#F5B400',
                          border: '1px solid rgba(245, 180, 0, 0.4)',
                          fontSize: 11,
                          fontWeight: 800,
                          padding: '4px 12px',
                          borderRadius: 9999,
                          letterSpacing: '0.04em',
                        }}
                      >
                        FEATURED
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F5F5F7', marginBottom: 12, lineHeight: 1.3 }}>
                    {prod.title}
                  </h3>
                  <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>
                    {prod.desc}
                  </p>

                  {/* Bullet features */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                    {prod.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                          fontSize: 13.5,
                          color: '#D1D1DB',
                          marginBottom: 10,
                          lineHeight: 1.5,
                        }}
                      >
                        <CheckCircle2 size={16} color={prod.featured ? '#F5B400' : '#8B5CF6'} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  {prod.isExternal ? (
                    <a
                      href={prod.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-magnetic-signal"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        fontSize: 14,
                        padding: '13px',
                        borderRadius: 12,
                        background: prod.featured ? '#F5B400' : 'rgba(255, 255, 255, 0.08)',
                        color: prod.featured ? '#0A0A0F' : '#F5F5F7',
                        border: prod.featured ? 'none' : '1px solid var(--border-subtle)',
                        fontWeight: 700,
                      }}
                    >
                      <span>{prod.cta}</span>
                      <div className="btn-light-sweep" />
                    </a>
                  ) : (
                    <Link
                      to={prod.path}
                      className="btn-magnetic-signal"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        fontSize: 14,
                        padding: '13px',
                        borderRadius: 12,
                        background: prod.featured ? '#F5B400' : 'rgba(255, 255, 255, 0.08)',
                        color: prod.featured ? '#0A0A0F' : '#F5F5F7',
                        border: prod.featured ? 'none' : '1px solid var(--border-subtle)',
                        fontWeight: 700,
                      }}
                    >
                      <span>{prod.cta}</span>
                      <div className="btn-light-sweep" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* Closing CTA */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 27, 0.95) 0%, rgba(38, 28, 60, 0.9) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              borderRadius: 24,
              padding: '50px 36px',
              boxShadow: '0 16px 48px rgba(139, 92, 246, 0.15)',
            }}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#F5F5F7', marginBottom: 12 }}>
              Have Questions About Our Products?
            </h2>
            <p style={{ color: '#A3A3B0', marginBottom: 30, fontSize: 15.5, maxWidth: 520, margin: '0 auto 30px', lineHeight: 1.6 }}>
              Schedule a 30-minute intro call to discuss your startup's needs and capital roadmap with our venture team.
            </p>
            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic-signal"
              style={{
                background: '#8B5CF6',
                color: '#FFFFFF',
                padding: '13px 32px',
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 12,
              }}
            >
              <span>Book a 30-Min Intro Call</span>
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
