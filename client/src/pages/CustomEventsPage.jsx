import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowUpRight, Trophy, Mic, BookOpen, Users, Rocket, Globe } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

export default function CustomEventsPage() {
  const [form, setForm] = useState({ name: '', org: '', email: '', type: '', size: '', date: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  const EVENT_TYPES = [
    { icon: Trophy, title: 'Pitch Competitions', desc: 'Organize a structured pitch event with active investor panels and capital commitments for top startups.' },
    { icon: Mic, title: 'Investor Summits', desc: 'Multi-day flagships bringing together institutional VCs, angel syndicates, and high-growth founders.' },
    { icon: BookOpen, title: 'Workshops & Bootcamps', desc: 'Curated masterclasses on venture fundraising, unit economics, data room structuring, and GTM.' },
    { icon: Users, title: 'Networking Roundtables', desc: 'Curated private dinners and closed-door mixers designed to facilitate direct deal flow.' },
    { icon: Rocket, title: 'Demo Days', desc: 'Showcase vetted cohort startups to live LP/GP audiences with structured pitch slots.' },
    { icon: Globe, title: 'Corporate Innovation Days', desc: 'Connect corporate venture arms with cutting-edge tech startups across UAE and Saudi Arabia.' },
  ];

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
            <Calendar size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              BESPOKE ECOSYSTEM EXPERIENCES
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
            Build, Host, or Join — <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>We Make It Happen</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 640, margin: '0 auto 36px', lineHeight: 1.65 }}>
            MorseBridge handles the full lifecycle — from venue curation and keynote speakers to institutional investor outreach and post-event deal flow tracking.
          </p>
        </div>
      </section>

      {/* Event Types */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 60 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Event Types We Run</h2>
            <p className="section-subtitle">From intimate closed-door roundtables to 500+ attendee regional summits across MENA.</p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {EVENT_TYPES.map((t, idx) => {
              const IconComp = t.icon;
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -6 }}
                  style={{
                    background: '#14141B',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 20,
                    padding: 28,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#C4B5FD',
                      marginBottom: 4,
                    }}
                  >
                    <IconComp size={24} />
                  </div>
                  <h3 style={{ fontSize: 18.5, fontWeight: 700, color: '#F5F5F7', margin: 0 }}>{t.title}</h3>
                  <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* Host with Us Form */}
      <section className="section" style={{ paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">Host an Event with Us</h2>
            <p className="section-subtitle">Tell us about your event vision and our venture events team will connect within 24 hours.</p>
          </div>

          <div
            style={{
              background: '#14141B',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 24,
              padding: '40px',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h3 style={{ color: '#F5F5F7', fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Inquiry Received!</h3>
                <p style={{ color: '#A3A3B0' }}>Thank you for reaching out. We will review your event requirements and be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Your Name</label>
                    <input
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                      name="name"
                      value={form.name}
                      onChange={handle}
                      required
                      placeholder="e.g. Sarah Al-Hashimi"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Organization / Company</label>
                    <input
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                      name="org"
                      value={form.org}
                      onChange={handle}
                      required
                      placeholder="Company / Fund Name"
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Work Email</label>
                    <input
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handle}
                      required
                      placeholder="sarah@company.com"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Event Type</label>
                    <input
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                      name="type"
                      value={form.type}
                      onChange={handle}
                      placeholder="e.g. Pitch Competition, Summit"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Event Details &amp; Goals</label>
                  <textarea
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: '#0A0A0F',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 10,
                      color: '#F5F5F7',
                      fontSize: 14,
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    name="details"
                    value={form.details}
                    onChange={handle}
                    rows="4"
                    placeholder="Tell us about the target audience, timeline, and fundraising goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-magnetic-signal"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: 15,
                    fontWeight: 700,
                    background: '#8B5CF6',
                    color: '#FFFFFF',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    justifyContent: 'center',
                  }}
                >
                  <span>Submit Event Request</span>
                  <ArrowUpRight size={16} />
                  <div className="btn-light-sweep" />
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
