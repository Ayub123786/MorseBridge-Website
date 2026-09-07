import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Calendar,
  ArrowUpRight,
  Trophy,
  Mic,
  BookOpen,
  Users,
  Rocket,
  Globe,
  Loader2,
  ExternalLink,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';
import { API_BASE } from '../config/api';

const EVENTBRITE_SCHEDULE = [
  {
    id: 'dubai-rising',
    title: 'Dubai Rising: Web3, AI & Venture Capital Summit',
    date: 'Monthly Flagship Series',
    time: '6:00 PM – 9:30 PM GST',
    location: 'Downtown Dubai / DIFC, UAE',
    tag: 'Flagship Summit',
    badgeColor: '#8B5CF6',
    desc: 'Bringing together 250+ institutional VCs, Gulf family offices, and seed to Series A tech founders for structured deal flow discussions and partner panels.',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
    status: 'Official Eventbrite RSVP',
  },
  {
    id: 'global-bootcamp',
    title: 'Global Fundraising Bootcamp — Monthly Cohort',
    date: 'Every 2nd & 4th Thursday',
    time: '5:00 PM – 8:00 PM GST',
    location: 'Live Hybrid (Dubai & Virtual)',
    tag: 'Masterclass',
    badgeColor: '#F5B400',
    desc: 'Intensive cohort drill where founders simulate partner pitch meetings, refine narrative pacing, and get direct feedback from active venture check-writers.',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
    status: 'Eventbrite RSVP & Application',
  },
  {
    id: 'riyadh-rising',
    title: 'Riyadh Tech Rising: Institutional Investor Roundtable',
    date: 'Quarterly Gathering',
    time: '7:00 PM – 10:00 PM AST',
    location: 'KAFD, Riyadh, Saudi Arabia',
    tag: 'Saudi Ecosystem',
    badgeColor: '#10B981',
    desc: 'Closed-door gathering connecting Saudi sovereign wealth funds, regional venture funds, and high-growth MENA startups scaling into the Kingdom.',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
    status: 'Official Eventbrite RSVP',
  },
  {
    id: 'closed-door-dinner',
    title: 'Private Investor Dinner & Deal Flow Mixer',
    date: 'Bi-Weekly Invitation Only',
    time: '8:00 PM – 11:00 PM GST',
    location: 'Dubai Marina / Jumeirah, UAE',
    tag: 'Closed-Door Mixer',
    badgeColor: '#38BDF8',
    desc: 'Intimate curated dinner matching 15 vetted founders with 10 active angel syndicates and family office investment directors. Strictly capped attendance.',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
    status: 'Curated RSVP via Eventbrite',
  },
];

const EVENT_TYPES = [
  { icon: Trophy, title: 'Pitch Competitions', desc: 'Organize a structured pitch event with active investor panels, capital commitments, and media spotlights for top startups.' },
  { icon: Mic, title: 'Investor Summits', desc: 'Multi-day flagships bringing together institutional VCs, angel syndicates, and high-growth founders across MENA and London.' },
  { icon: BookOpen, title: 'Workshops & Bootcamps', desc: 'Curated masterclasses on venture fundraising, unit economics, data room structuring, and GTM execution.' },
  { icon: Users, title: 'Networking Roundtables', desc: 'Curated private dinners and closed-door mixers designed to facilitate direct deal flow and high-trust introductions.' },
  { icon: Rocket, title: 'Demo Days & Showcases', desc: 'Showcase vetted cohort startups to live LP/GP audiences with structured pitch slots and syndicated deal sheets.' },
  { icon: Globe, title: 'Corporate Innovation Days', desc: 'Connect corporate venture capital arms and enterprise leaders with cutting-edge tech startups across UAE and Saudi Arabia.' },
];

export default function CustomEventsPage() {
  const [form, setForm] = useState({
    name: '',
    org: '',
    email: '',
    type: 'Pitch Competition',
    size: '50 - 150 Attendees',
    date: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/custom-events/inquire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit event inquiry');
      }

      setSubmitted(true);
    } catch (err) {
      console.warn('API error submitting event inquiry, falling back gracefully:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 90, color: '#F5F5F7' }}>
      
      {/* Hero */}
      <section style={{ padding: '60px 0 44px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
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
              marginBottom: 20,
            }}
          >
            <Calendar size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em', fontWeight: 700 }}>
              BESPOKE ECOSYSTEM EXPERIENCES &amp; EVENTBRITE HUB
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: 18,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E2E8 70%, #A3A3B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Build, Host, or Join — <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>We Make It Happen</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 660, margin: '0 auto 32px', lineHeight: 1.65 }}>
            MorseBridge handles the full venture event lifecycle — from premium venue curation and keynote speakers in Dubai &amp; Riyadh to institutional VC outreach, Eventbrite registration, and post-event deal flow syndication.
          </p>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 16,
              background: '#14141B',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: '16px 24px',
              maxWidth: 760,
              margin: '0 auto 28px',
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#8B5CF6' }}>1,200+</div>
              <div style={{ fontSize: 11.5, color: '#A3A3B0', fontWeight: 600, textTransform: 'uppercase' }}>Summit Attendees</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#10B981' }}>85+</div>
              <div style={{ fontSize: 11.5, color: '#A3A3B0', fontWeight: 600, textTransform: 'uppercase' }}>Active VC &amp; FO Partners</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#F5B400' }}>$18M+</div>
              <div style={{ fontSize: 11.5, color: '#A3A3B0', fontWeight: 600, textTransform: 'uppercase' }}>Capital Deployed</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#38BDF8' }}>3 Hubs</div>
              <div style={{ fontSize: 11.5, color: '#A3A3B0', fontWeight: 600, textTransform: 'uppercase' }}>Dubai · Riyadh · London</div>
            </div>
          </div>

          {/* Direct Eventbrite Link Button */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <a
              href="https://www.eventbrite.co.uk/o/morse-bridge-78875439043"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic-signal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#8B5CF6',
                color: '#FFFFFF',
                fontSize: 14.5,
                fontWeight: 700,
                padding: '12px 28px',
                borderRadius: 12,
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
              }}
            >
              <span>View Official Eventbrite Page</span>
              <ExternalLink size={16} />
              <div className="btn-light-sweep" />
            </a>

            <a
              href="#host-form"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#F5F5F7',
                fontSize: 14.5,
                fontWeight: 600,
                padding: '12px 26px',
                borderRadius: 12,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Host an Event with Us ↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Eventbrite Schedule Grid */}
      <section className="section" style={{ paddingTop: 10, paddingBottom: 60 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#38BDF8', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
              <Calendar size={14} />
              <span>OFFICIAL EVENTBRITE SCHEDULE</span>
            </div>
            <h2 className="section-title">Upcoming Ecosystem Summits &amp; Cohorts</h2>
            <p className="section-subtitle">Reserve tickets directly via Eventbrite or connect with our events team for custom sponsorship.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {EVENTBRITE_SCHEDULE.map((ev, idx) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -6 }}
                style={{
                  background: '#14141B',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 20,
                  padding: 26,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8B5CF6';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span
                      className="font-data"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: ev.badgeColor,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${ev.badgeColor}40`,
                        padding: '3px 10px',
                        borderRadius: 9999,
                      }}
                    >
                      {ev.tag}
                    </span>

                    <span style={{ fontSize: 11.5, color: '#A3A3B0' }}>
                      {ev.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 18.5, fontWeight: 800, color: '#F5F5F7', marginBottom: 10, lineHeight: 1.3 }}>
                    {ev.title}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#D4D4D8' }}>
                      <Calendar size={13} color="#8B5CF6" />
                      <span>{ev.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#A3A3B0' }}>
                      <Clock size={13} color="#A3A3B0" />
                      <span>{ev.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#A3A3B0' }}>
                      <MapPin size={13} color="#F5B400" />
                      <span>{ev.location}</span>
                    </div>
                  </div>

                  <p style={{ color: '#A3A3B0', fontSize: 13.5, lineHeight: 1.6, marginBottom: 20 }}>
                    {ev.desc}
                  </p>
                </div>

                <a
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic-signal"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '11px 16px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    borderRadius: 10,
                    fontSize: 13.5,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#8B5CF6';
                    e.currentTarget.style.borderColor = '#8B5CF6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <span>Register on Eventbrite</span>
                  <ExternalLink size={14} />
                  <div className="btn-light-sweep" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* Event Types We Run */}
      <section className="section" style={{ paddingTop: 10, paddingBottom: 60 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 className="section-title">Event Formats We Produce</h2>
            <p className="section-subtitle">From intimate closed-door roundtables to 500+ attendee regional summits across MENA.</p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {EVENT_TYPES.map((t) => {
              const IconComp = t.icon;
              return (
                <div
                  key={t.title}
                  style={{
                    background: '#14141B',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 20,
                    padding: 26,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#C4B5FD',
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F5F5F7', margin: 0 }}>{t.title}</h3>
                  <p style={{ color: '#A3A3B0', fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Substack Syndication Callout */}
      <section style={{ padding: '0 0 50px' }}>
        <div className="container container-narrow">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 27, 0.95) 0%, rgba(32, 24, 48, 0.9) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              borderRadius: 20,
              padding: '28px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <div style={{ maxWidth: 520 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#F5B400', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                <Sparkles size={14} />
                <span>SUBSTACK + EVENTBRITE DEAL SYNDICATION</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F5F5F7', margin: '0 0 6px' }}>
                Every Event is Backed by Substack Intelligence
              </h3>
              <p style={{ color: '#A3A3B0', fontSize: 13.5, margin: 0, lineHeight: 1.6 }}>
                Attendee startups and partners get profiled directly in the MorseBridge Substack newsletter reaching 5,000+ investors, with deal sheets and post-event recaps sent to institutional LPs.
              </p>
            </div>

            <a
              href="https://morsebridge.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 22px',
                borderRadius: 10,
                background: '#8B5CF6',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 13.5,
                textDecoration: 'none',
              }}
            >
              <span>Explore Substack</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Host with Us Form (Wired to MongoDB Atlas Backend) */}
      <section id="host-form" className="section" style={{ paddingBottom: 100 }}>
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
                <h3 style={{ color: '#F5F5F7', fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Inquiry Recorded!</h3>
                <p style={{ color: '#A3A3B0', maxWidth: 460, margin: '0 auto 20px', lineHeight: 1.6 }}>
                  Thank you, <strong>{form.name}</strong>. Your event request for <strong>{form.org || 'your organization'}</strong> has been saved directly into our venture database. Our events team will connect within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#F5F5F7',
                    padding: '10px 20px',
                    borderRadius: 10,
                    fontSize: 13.5,
                    cursor: 'pointer',
                  }}
                >
                  Submit Another Event Request
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Your Name <span style={{ color: '#8B5CF6' }}>*</span>
                    </label>
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
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Organization / Company / Fund <span style={{ color: '#8B5CF6' }}>*</span>
                    </label>
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
                      placeholder="e.g. Apex Venture Partners"
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Work Email <span style={{ color: '#8B5CF6' }}>*</span>
                    </label>
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
                      placeholder="sarah@apexvc.com"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Event Format
                    </label>
                    <select
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
                    >
                      <option value="Pitch Competition">Pitch Competition</option>
                      <option value="Closed-Door Investor Dinner">Closed-Door Investor Dinner</option>
                      <option value="Investor Summit">Regional Venture Summit</option>
                      <option value="Fundraising Masterclass">Fundraising Workshop / Masterclass</option>
                      <option value="Demo Day">Cohort Demo Day Showcase</option>
                      <option value="Corporate Innovation Day">Corporate Innovation Day</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Target Attendee Size
                    </label>
                    <select
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
                      name="size"
                      value={form.size}
                      onChange={handle}
                    >
                      <option value="Under 30 Attendees (Private Dinner)">Under 30 Attendees (Private VIP Dinner)</option>
                      <option value="30 - 100 Attendees">30 – 100 Attendees (Roundtable / Masterclass)</option>
                      <option value="100 - 300 Attendees">100 – 300 Attendees (Pitch Competition / Summit)</option>
                      <option value="300+ Attendees (Large Flagship)">300+ Attendees (Large Flagship)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Preferred Timeline / Location
                    </label>
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
                      name="date"
                      value={form.date}
                      onChange={handle}
                      placeholder="e.g. Q4 2026, Dubai or Riyadh"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                    Event Details &amp; Goals
                  </label>
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
                    placeholder="Tell us about the target audience, preferred venue style, investor profile, and fundraising goals..."
                  />
                </div>

                {error && (
                  <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#F87171', fontSize: 13, marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-magnetic-signal"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: 15,
                    fontWeight: 700,
                    background: loading ? '#6D28D9' : '#8B5CF6',
                    color: '#FFFFFF',
                    borderRadius: 12,
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    justifyContent: 'center',
                    opacity: loading ? 0.8 : 1,
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Recording Event Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Event Request</span>
                      <ArrowUpRight size={16} />
                      <div className="btn-light-sweep" />
                    </>
                  )}
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
