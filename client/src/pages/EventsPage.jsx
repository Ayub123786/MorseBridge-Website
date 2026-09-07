import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight, Sparkles, MapPin, Clock } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const EVENTS_LIST = [
  {
    id: 'acc-1',
    title: 'Revenue First AI Accelerator',
    sub: '12-Week Intensive Cohort for AI & SaaS Ventures',
    date: 'Cohort 04 Enrolling Now · In5 Tech Dubai & Remote',
    desc: 'Scale enterprise AI revenue, institutionalize outbound GTM loops, stress-test 5-Minute CFO financial models, and pitch directly to Tier-1 institutional venture funds.',
    tag: 'Cohort 04 Open',
    tagColor: '#8B5CF6',
    price: 'Apply with Form',
    image: '/assets/events/revenue_first_accelerator.png',
    applyLink: '/apply?program=revenue-first-ai-accelerator',
    isForm: true,
    buttonText: 'Apply with Form',
  },
  {
    id: 'boot-1',
    title: 'Global Fundraising Boot Camp',
    sub: '5 Workshops, 10 Startups, 25 Angels, VCs & Accelerators',
    date: 'Every Month (Monthly Cohorts) · In5 Tech Dubai & Online',
    desc: 'Held every month: 10 early-stage startups master pitch decks, the 5-Minute CFO model, SAFEs, and term sheet negotiations with 25 active angels, VCs, and accelerators.',
    tag: 'Every Month',
    tagColor: '#10B981',
    price: 'Apply with Form',
    image: '/assets/events/bootcamp.png',
    applyLink: '/apply?program=global-fundraising-bootcamp',
    isForm: true,
    buttonText: 'Apply with Form',
  },
  {
    id: 3,
    title: 'Dubai Rising 2026 — The Ultimate Startups & Investor Summit',
    sub: 'The Premier Startup & Investor Summit in Dubai',
    date: 'Coming This November (Nov 2026) · DIFC, Dubai, UAE',
    desc: 'Network with 100+ institutional VCs and 200+ founders across MENA. Secure your spot at the forefront of innovation.',
    tag: 'Coming This November!',
    tagColor: '#F5B400',
    price: 'Pre-Register',
    image: '/assets/events/riyadh-rising.png',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
    buttonText: 'Register on Eventbrite',
  },
];

const PAST_SUMMITS_LIST = [
  {
    id: 'p1',
    title: 'Family Offices & VCs Investment Summit (Dubai)',
    location: 'DIFC, Dubai, UAE',
    date: 'February 13, 2026',
    desc: 'Closed-door roundtable and curated pitch day connecting 40+ active GCC family offices with high-growth tech ventures.',
    badge: 'Flagship Summit',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
  },
  {
    id: 'p2',
    title: 'Start Up Spotlight Demo Day',
    location: 'In5 Tech Dubai / Livestream',
    date: 'August 25, 2026',
    desc: '12 curated seed-stage ventures pitched live to verified regional angel syndicates and Tier-1 MENA venture capital funds.',
    badge: 'Demo Day',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
  },
  {
    id: 'p3',
    title: 'Analog to Automation: AI Workflows with Claude',
    location: 'Virtual Masterclass',
    date: 'August 22, 2026',
    desc: 'Hands-on executive sprint on building autonomous agentic workflows, financial model automations, and CRM integrations.',
    badge: 'AI Masterclass',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
  },
];

export default function EventsPage() {
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
              GLOBAL SUMMITS &amp; DEMO DAYS
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
            Startup &amp; Investor <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>Events</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 640, margin: '0 auto 36px', lineHeight: 1.65 }}>
            Flagship summits, pitch competitions, masterclass bootcamps, and networking mixers across MENA and online.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 26 }}>
            {EVENTS_LIST.map((ev, idx) => (
              <motion.div
                key={ev.id}
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
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 22,
                  padding: 30,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
                }}
              >
                <div>
                  {ev.image && (
                    <div
                      style={{
                        height: 200,
                        borderRadius: 14,
                        overflow: 'hidden',
                        marginBottom: 18,
                        background: ev.image?.includes('bootcamp') ? '#FFFFFF' : '#1C1C24',
                        padding: ev.image?.includes('bootcamp') ? '4px' : 0,
                      }}
                    >
                      <img
                        src={ev.image}
                        alt={ev.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: ev.image?.includes('bootcamp') ? 'contain' : 'cover',
                          objectPosition: 'center',
                        }}
                        onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span
                      className="font-data"
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: ev.tagColor || '#C4B5FD',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${ev.tagColor ? `${ev.tagColor}40` : 'rgba(139, 92, 246, 0.3)'}`,
                        padding: '4px 12px',
                        borderRadius: 9999,
                      }}
                    >
                      {ev.tag}
                    </span>
                    <span style={{ color: '#A3A3B0', fontSize: 12.5, fontWeight: 600 }}>{ev.date}</span>
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F5F5F7', marginBottom: 8, lineHeight: 1.3 }}>
                    {ev.title}
                  </h3>

                  <p style={{ color: '#F5B400', fontWeight: 700, fontSize: 13.5, marginBottom: 10 }}>{ev.sub}</p>
                  
                  {ev.price && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                      <span
                        className="font-data"
                        style={{
                          fontSize: 12.5,
                          fontWeight: 800,
                          color: '#10B981',
                          background: 'rgba(16, 185, 129, 0.12)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          padding: '2px 8px',
                          borderRadius: 6,
                        }}
                      >
                        {ev.price}
                      </span>
                    </div>
                  )}

                  <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>{ev.desc}</p>
                </div>

                {ev.isForm || ev.applyLink ? (
                  <Link
                    to={ev.applyLink || '/apply'}
                    className="btn-magnetic-signal"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '13px',
                      fontSize: 14,
                      fontWeight: 800,
                      borderRadius: 12,
                      background: ev.title?.toLowerCase().includes('bootcamp') || ev.title?.toLowerCase().includes('boot camp')
                        ? 'linear-gradient(135deg, #F5B400 0%, #D97706 100%)'
                        : 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                      color: ev.title?.toLowerCase().includes('bootcamp') || ev.title?.toLowerCase().includes('boot camp')
                        ? '#0A0A0F'
                        : '#FFFFFF',
                      textDecoration: 'none',
                      boxShadow: ev.title?.toLowerCase().includes('bootcamp') || ev.title?.toLowerCase().includes('boot camp')
                        ? '0 6px 20px rgba(245, 180, 0, 0.3)'
                        : '0 6px 20px rgba(139, 92, 246, 0.35)',
                    }}
                  >
                    <span>{ev.buttonText || 'Apply with Form'}</span>
                    <ArrowUpRight size={16} />
                    <div className="btn-light-sweep" />
                  </Link>
                ) : (
                  <a
                    href={ev.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-magnetic-signal"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '13px',
                      fontSize: 14,
                      fontWeight: 700,
                      borderRadius: 12,
                      background: '#8B5CF6',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                    }}
                  >
                    <span>{ev.buttonText || 'Register on Eventbrite'}</span>
                    <ArrowUpRight size={16} />
                    <div className="btn-light-sweep" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* Past Summits & Events Showcase */}
      <section className="section" style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 9999,
                background: 'rgba(245, 180, 0, 0.12)',
                border: '1px solid rgba(245, 180, 0, 0.35)',
                marginBottom: 16,
              }}
            >
              <Sparkles size={14} color="#F5B400" />
              <span className="font-data" style={{ fontSize: 12, color: '#F5B400', letterSpacing: '0.06em' }}>
                PAST SUMMITS &amp; GLOBAL IMPACT
              </span>
            </div>

            <h2 className="section-title">Our Past Summits &amp; Events</h2>
            <p className="section-subtitle">
              Milestone summits where visionary founders, sovereign funds, and tier-1 investors connect.
            </p>
          </div>

          {/* Past Summits Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {PAST_SUMMITS_LIST.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                style={{
                  background: '#14141B',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 18,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span
                      className="font-data"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#F5B400',
                        background: 'rgba(245, 180, 0, 0.1)',
                        border: '1px solid rgba(245, 180, 0, 0.25)',
                        padding: '3px 10px',
                        borderRadius: 9999,
                      }}
                    >
                      {item.badge}
                    </span>
                    <span style={{ color: 'var(--text-subtle)', fontSize: 12 }}>{item.date}</span>
                  </div>

                  <h4 style={{ fontSize: 17, fontWeight: 700, color: '#F5F5F7', marginBottom: 8, lineHeight: 1.35 }}>
                    {item.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <MapPin size={13} color="#8B5CF6" />
                    <span>{item.location}</span>
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6, marginBottom: 20 }}>
                    {item.desc}
                  </p>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic-signal"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '11px',
                    fontSize: 13,
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#F5F5F7',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 10,
                  }}
                >
                  <span>Event Recap on Eventbrite</span>
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* Custom event banner */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 27, 0.95) 0%, rgba(38, 28, 60, 0.9) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              borderRadius: 24,
              padding: '52px 36px',
              boxShadow: '0 16px 48px rgba(139, 92, 246, 0.15)',
            }}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#F5F5F7', marginBottom: 12 }}>
              Want to Host a <span style={{ color: '#8B5CF6' }}>Custom Event</span>?
            </h2>
            <p style={{ color: '#A3A3B0', marginBottom: 30, fontSize: 15.5, maxWidth: 520, margin: '0 auto 30px', lineHeight: 1.6 }}>
              We partner with tech brands, sovereign funds, and venture firms to design and deliver high-impact ecosystem summits.
            </p>
            <Link
              to="/custom-events"
              className="btn-magnetic-signal"
              style={{
                display: 'inline-flex',
                padding: '13px 36px',
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 12,
                background: '#8B5CF6',
                color: '#FFFFFF',
              }}
            >
              <span>Host with Us</span>
              <ArrowUpRight size={16} />
              <div className="btn-light-sweep" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
