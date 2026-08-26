import { useState } from 'react';
import Footer from '../components/Footer';

const FAQS = [
  {
    q: 'What is MorseBridge?',
    a: 'MorseBridge is a platform that connects startups with investors across the MENA region. We provide curated matching, events, resources, and advisory support to help founders raise and grow.',
  },
  {
    q: 'How does the startup–investor matching work?',
    a: 'After you create your profile as a startup or investor, our team reviews your information and manually matches you with relevant counterparts based on sector, stage, geography, and investment thesis. Introductions are made via email and through our platform.',
  },
  {
    q: 'Is MorseBridge free to use?',
    a: 'MorseBridge offers a free tier with basic access. Premium membership plans unlock full access to investor introductions, deal flow, resources, and events. See our Membership Plans page for full details.',
  },
  {
    q: 'Who are the investors on MorseBridge?',
    a: 'Our network includes 100+ active investors — including angel investors, family offices, VC funds, and accelerators — all active in the MENA region and beyond. Each investor is vetted before joining the platform.',
  },
  {
    q: 'How do I get featured in front of investors?',
    a: 'Members can apply to the "Get Featured" program through their dashboard. Selected startups are spotlighted in our investor newsletter, social channels, and at upcoming events.',
  },
  {
    q: 'What types of startups does MorseBridge work with?',
    a: 'We work with startups at pre-seed, seed, and Series A stages across all sectors — fintech, healthtech, edtech, SaaS, e-commerce, and more. We specialize in MENA-based or MENA-targeting startups.',
  },
  {
    q: 'Can I host an event through MorseBridge?',
    a: 'Yes! We offer custom event services for corporates, accelerators, and organizations that want to run startup-focused events. Visit our "Host With Us" page for more details.',
  },
  {
    q: 'How do I sign up?',
    a: "Click 'sign up' in the top navigation, select whether you're a startup or investor, and complete your profile. Our team will review your application within 48 hours.",
  },
  {
    q: 'Is my data secure on MorseBridge?',
    a: 'Yes. We take data privacy seriously. All user data is encrypted and we never share your information with third parties without your consent.',
  },
  {
    q: 'How can I contact MorseBridge?',
    a: 'You can reach us through the contact form on our website, via LinkedIn, or by emailing our team directly. We typically respond within 24 hours.',
  },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid var(--border-slate)',
        borderRadius: 14,
        marginBottom: 12,
        boxShadow: open ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: open ? 'var(--purple-primary)' : 'var(--text-primary)',
            transition: 'color 0.2s ease',
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: open ? 'rgba(124, 58, 237, 0.1)' : 'var(--bg-tertiary)',
            border: `1.5px solid ${open ? 'var(--purple-primary)' : 'var(--border-slate)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: open ? 'var(--purple-primary)' : 'var(--text-muted)',
            fontSize: 18,
            fontWeight: 700,
            transform: open ? 'rotate(45deg)' : 'rotate(0)',
            transition: 'transform 0.3s ease, background 0.2s ease',
            flexShrink: 0,
            marginLeft: 16,
          }}
        >
          +
        </span>
      </div>
      {open && (
        <div
          style={{
            padding: '0 24px 22px',
            color: 'var(--text-body)',
            fontSize: 15,
            lineHeight: 1.7,
            borderTop: '1px solid var(--border-slate)',
            paddingTop: 16,
          }}
        >
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function FaqsPage() {
  const [search, setSearch] = useState('');
  const filtered = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 18, display: 'inline-flex' }}>
            Help &amp; Answers
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
            Frequently Asked <span style={{ color: 'var(--purple-primary)' }}>Questions</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7, marginBottom: 32 }}>
            Everything you need to know about the MorseBridge platform, matching, and membership.
          </p>

          {/* Search bar */}
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{
                borderRadius: 9999,
                padding: '14px 24px',
                fontSize: 15,
                boxShadow: 'var(--shadow-sm)',
              }}
            />
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="section" style={{ paddingTop: 20, paddingBottom: 100 }}>
        <div className="container container-narrow">
          {filtered.length > 0 ? (
            filtered.map((item, i) => <FaqItem key={i} item={item} />)
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
              No questions matched your search.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
