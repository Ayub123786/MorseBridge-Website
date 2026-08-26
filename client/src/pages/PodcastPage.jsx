import Footer from '../components/Footer';

const EPISODES = [
  {
    id: 1,
    title: 'How to Raise from MENA VCs in 2025',
    guest: 'Ahmed Al-Rashid, Partner at Gulf Ventures',
    duration: '52 min',
    date: 'Aug 2025',
    desc: 'A deep dive into what MENA venture capitalists look for, how to structure your outreach, and what common mistakes founders make when pitching to regional funds.',
  },
  {
    id: 2,
    title: 'Building a $10M ARR Startup in the UAE',
    guest: 'Sarah K., Co-founder of FinTech UAE',
    duration: '44 min',
    date: 'Jul 2025',
    desc: 'The journey from idea to $10M ARR — lessons learned, pivots made, and advice for founders targeting the UAE market.',
  },
  {
    id: 3,
    title: 'Family Office Capital: The Untapped Resource',
    guest: 'Omar Al-Farsi, Family Office Director',
    duration: '38 min',
    date: 'Jun 2025',
    desc: 'Why family offices are becoming the most important source of early-stage capital in MENA and how founders can access them.',
  },
  {
    id: 4,
    title: 'From Idea to Launch in 90 Days',
    guest: 'Nora Hassan, Serial Entrepreneur',
    duration: '41 min',
    date: 'May 2025',
    desc: 'A framework for rapidly validating and launching a startup without burning through your runway — tested across 4 successful companies.',
  },
];

export default function PodcastPage() {
  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              width: 80, height: 80,
              borderRadius: '50%',
              background: 'rgba(124, 58, 237, 0.1)',
              border: '1.5px solid var(--border-purple)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, margin: '0 auto 20px',
            }}
          >
            🎙️
          </div>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 18, display: 'inline-flex' }}>
            Founders Talk with Ayub
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
            The Founder <span style={{ color: 'var(--purple-primary)' }}>Podcast</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7, marginBottom: 28 }}>
            Unfiltered conversations with the founders, investors, and ecosystem leaders shaping the future of MENA tech.
          </p>
          <a
            href="https://youtube.com/@FoundersTalkwithAyub"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-purple"
            style={{ padding: '14px 36px', fontSize: 15 }}
          >
            Subscribe on YouTube ↗
          </a>
        </div>
      </section>

      {/* Episodes */}
      <section className="section" style={{ paddingTop: 20, paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {EPISODES.map((ep) => (
              <div
                key={ep.id}
                className="service-card"
                style={{
                  display: 'flex',
                  gap: 24,
                  alignItems: 'flex-start',
                  background: '#ffffff',
                }}
              >
                <div
                  style={{
                    width: 56, height: 56,
                    borderRadius: '50%',
                    background: 'var(--purple-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ffffff', fontSize: 20,
                    flexShrink: 0,
                    boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
                  }}
                >
                  ▶
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                    <span className="mb-badge" style={{ fontSize: 11 }}>Episode {ep.id}</span>
                    <span style={{ color: 'var(--text-subtle)', fontSize: 13 }}>{ep.date} · {ep.duration}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{ep.title}</h3>
                  <div style={{ color: 'var(--gold)', fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>{ep.guest}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{ep.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
