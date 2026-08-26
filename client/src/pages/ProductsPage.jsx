import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const PRODUCTS_LIST = [
  {
    id: 1,
    title: 'The 5-Minute CFO Model',
    tag: 'Finance & Diligence',
    desc: 'Most financial models are complex, consultant-driven, and impossible to update. This one is founder-friendly.',
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
    desc: 'Your complete UAE investor directory — verified VCs, angels, and family offices with clear theses and investment criteria.',
    features: [
      '100+ active MENA & global institutional investors',
      'Direct investment thesis & ticket size ranges',
      'Verified partner contact channels',
      'Quarterly portfolio & deal flow updates',
    ],
    path: 'https://cal.com/morsebridge/30-min-intro',
    isExternal: true,
    cta: 'Access Directory ↗',
    featured: false,
  },
  {
    id: 4,
    title: 'Investor-Ready Pitch Deck Templates',
    tag: 'Narrative & Decks',
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
    <div style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 66 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 50px', textAlign: 'center' }}>
        <div className="container container-narrow">
          <span className="mb-badge" style={{ marginBottom: 18, display: 'inline-flex' }}>
            Products &amp; Resources
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 800,
              color: '#000000',
              lineHeight: 1.1,
              marginBottom: 18,
            }}
          >
            Tools &amp; Frameworks for Momentum
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7 }}>
            Tools, frameworks, and experiences designed to help founders grow, raise, and build credibility faster.
          </p>
        </div>
      </section>

      {/* 5 Products Grid */}
      <section className="section" style={{ paddingTop: 10, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {PRODUCTS_LIST.map((prod) => (
              <div
                key={prod.id}
                className="service-card hover-float"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: prod.featured ? '1.5px solid #000000' : '1px solid var(--border-medium)',
                  background: '#ffffff',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span className="mb-badge" style={{ fontSize: 11.5 }}>
                      {prod.tag}
                    </span>
                    {prod.featured && (
                      <span
                        style={{
                          background: '#000000',
                          color: '#ffffff',
                          fontSize: 10.5,
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: 999,
                        }}
                      >
                        FEATURED
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#000000', marginBottom: 10 }}>
                    {prod.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>
                    {prod.desc}
                  </p>

                  {/* Bullet features */}
                  <ul style={{ listStyle: 'none', marginBottom: 28 }}>
                    {prod.features.map((feat, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8,
                          fontSize: 13.5,
                          color: 'var(--text-body)',
                          marginBottom: 8,
                          lineHeight: 1.45,
                        }}
                      >
                        <span style={{ color: '#000000', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {prod.isExternal ? (
                    <a
                      href={prod.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={prod.featured ? 'btn-primary-black' : 'btn-secondary-white'}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        fontSize: 14,
                        padding: '12px',
                      }}
                    >
                      {prod.cta}
                    </a>
                  ) : (
                    <Link
                      to={prod.path}
                      className={prod.featured ? 'btn-primary-black' : 'btn-secondary-white'}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        fontSize: 14,
                        padding: '12px',
                      }}
                    >
                      {prod.cta}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div
            style={{
              background: '#000000',
              borderRadius: 20,
              padding: '48px 32px',
              color: '#ffffff',
            }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: 10 }}>
              Have Questions About Our Products?
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: 28, fontSize: 15 }}>
              Schedule a 30-minute intro call to discuss your startup's needs with our team.
            </p>
            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-white"
              style={{ padding: '12px 32px', fontSize: 14 }}
            >
              Book a 30-Min Intro Call ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
