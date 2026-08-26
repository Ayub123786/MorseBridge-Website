import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function CustomEventsPage() {
  const [form, setForm] = useState({ name: '', org: '', email: '', type: '', size: '', date: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  const EVENT_TYPES = [
    { icon: '🏆', title: 'Pitch Competitions', desc: 'Organize a structured pitch event with investor panels and prizes for top startups.' },
    { icon: '🎙️', title: 'Investor Summits', desc: 'Multi-day events bringing together investors, founders, and ecosystem players.' },
    { icon: '📚', title: 'Workshops & Bootcamps', desc: 'Educational sessions on fundraising, product, growth, and more.' },
    { icon: '🤝', title: 'Networking Events', desc: 'Curated mixers and roundtables designed to create meaningful connections.' },
    { icon: '🚀', title: 'Demo Days', desc: 'Showcase startups to live investor audiences with structured pitch slots.' },
    { icon: '🌍', title: 'Corporate Innovation Days', desc: 'Help your organization engage with the startup ecosystem through a branded event.' },
  ];

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mb-badge mb-badge-gold" style={{ marginBottom: 20, display: 'inline-flex' }}>
            🎪 Custom Events
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 900, fontStyle: 'italic',
            color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 20,
          }}>
            Build, Host, or Join —{' '}
            <span style={{ color: 'var(--purple-primary)' }}>We Make It Happen</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16.5, lineHeight: 1.7 }}>
            MorseBridge handles everything — from planning and speakers to investor outreach and
            post-event follow-up. You focus on your audience.
          </p>
        </div>
      </section>

      {/* Event Types */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Event Types We Run</h2>
            <p className="section-subtitle">From intimate roundtables to 500-person summits across MENA.</p>
          </div>
          <div className="grid-3">
            {EVENT_TYPES.map((t) => (
              <div key={t.title} className="service-card">
                <div style={{ fontSize: 32, marginBottom: 16 }}>{t.icon}</div>
                <h3 className="service-title">{t.title}</h3>
                <p className="service-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Host with Us Form */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-slate)', borderBottom: '1px solid var(--border-slate)' }}>
        <div className="container container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">Host an Event with Us</h2>
            <p className="section-subtitle">Tell us about your event idea and our team will get in touch within 24 hours.</p>
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-slate)',
            borderRadius: 24, padding: '40px',
            boxShadow: 'var(--shadow-md)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h3 style={{ color: 'var(--purple-primary)', fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Inquiry Received!</h3>
                <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. We will review your details and be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input className="form-input" name="name" value={form.name} onChange={handle} required placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Organization / Company</label>
                    <input className="form-input" name="org" value={form.org} onChange={handle} required placeholder="Company Inc" />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Work Email</label>
                    <input className="form-input" type="email" name="email" value={form.email} onChange={handle} required placeholder="john@company.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Event Type</label>
                    <input className="form-input" name="type" value={form.type} onChange={handle} placeholder="e.g. Pitch Competition" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Event Details &amp; Goals</label>
                  <textarea className="form-textarea" name="details" value={form.details} onChange={handle} rows="4" placeholder="Tell us about the target audience, timeline, and goals..." />
                </div>
                <button type="submit" className="btn-purple" style={{ width: '100%', padding: '14px', fontSize: 16 }}>
                  Submit Event Request ↗
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
