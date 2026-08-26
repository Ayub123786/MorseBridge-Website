import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const EVENTS_LIST = [
  {
    id: 1,
    title: 'Dubai Rising 2026',
    sub: 'Coming This November!',
    date: 'November 2026 · Dubai, UAE',
    desc: 'The ultimate startup & investor summit in Dubai. Network with 100+ investors and 200+ founders across MENA.',
    tag: 'Flagship Summit',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
  },
  {
    id: 2,
    title: 'Riyadh Rising 2026',
    sub: 'The Ultimate Startups & Investor Summit',
    date: '21–22 Jan 2026 · Riyadh, KSA',
    desc: 'Join us to get funded, network and scale your startup in Saudi Arabia. 100+ investors, 50+ curated workshops.',
    tag: 'GCC Focus',
    link: 'https://riyadhrising.net/',
  },
  {
    id: 3,
    title: 'Global Fundraising Boot Camp',
    sub: '5 workshops, 10 Startups, 25 Angels, VCs & Accelerators',
    date: '22 Oct 2025 · Online Masterclass',
    desc: 'Build a $1M–$5M GTM & capital strategy. Learn to pitch and connect directly with institutional lead partners.',
    tag: 'Cohort',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
  },
  {
    id: 4,
    title: 'Startup Spotlight Demo Day',
    sub: 'Prepare a Winning Pitch Deck',
    date: 'Recurring · Online',
    desc: 'Monthly demo day giving startups a live stage to pitch to active investor syndicates.',
    tag: 'Recurring Demo Day',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
  },
];

export default function EventsPage() {
  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 18, display: 'inline-flex' }}>
            🎟️ Global Ecosystem
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 18,
            }}
          >
            Startup &amp; Investor <span style={{ color: 'var(--purple-primary)' }}>Events</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7 }}>
            Summits, pitch competitions, bootcamps, and networking mixers across MENA and online.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="section" style={{ paddingTop: 20, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {EVENTS_LIST.map((ev) => (
              <div
                key={ev.id}
                className="service-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#ffffff',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span className="mb-badge">{ev.tag}</span>
                    <span style={{ color: 'var(--text-subtle)', fontSize: 12.5, fontWeight: 600 }}>{ev.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 8 }}>
                    {ev.title}
                  </h3>
                  <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 13.5, marginBottom: 12 }}>{ev.sub}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>{ev.desc}</p>
                </div>
                <a
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-purple"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 14 }}
                >
                  View Details &amp; Register ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom event banner */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div
            style={{
              background: '#ffffff',
              border: '1px solid var(--border-slate)',
              borderRadius: 24,
              padding: '48px 36px',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 12 }}>
              Want to Host a <span style={{ color: 'var(--purple-primary)' }}>Custom Event</span>?
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: 15 }}>
              We partner with organizations, VC funds, and tech brands to design and deliver high-impact startup events.
            </p>
            <Link to="/custom-events" className="btn-purple" style={{ padding: '14px 36px', fontSize: 15 }}>
              Host with Us →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
