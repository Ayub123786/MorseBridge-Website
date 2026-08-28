import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight, Sparkles, MapPin, Clock } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const EVENTS_LIST = [
  {
    id: 1,
    title: 'Dubai Rising 2026',
    sub: 'The Ultimate Startups & Investor Summit',
    date: 'Coming This November (Nov 2026) · Dubai, UAE',
    desc: 'The premier startup & investor summit in Dubai. Network with 100+ institutional VCs and 200+ founders across MENA.',
    tag: 'Coming This November!',
    tagColor: '#F5B400',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
  },
  {
    id: 2,
    title: 'Riyadh Rising 2026',
    sub: 'The Ultimate Startups & Investor Summit',
    date: 'Jan 21–22, 2026 · Riyadh, KSA',
    desc: 'Join us to get funded, network, and scale your startup in Saudi Arabia. 100+ investors, 20+ workshops, desert night meet.',
    tag: 'GCC Focus',
    tagColor: '#8B5CF6',
    link: 'https://riyadhrising.net/',
  },
  {
    id: 3,
    title: 'Global Fundraising Boot Camp Launch',
    sub: '5 workshops, 10 Startups, 25 Angels, VCs & Accelerators',
    date: 'Oct 22, 2026 · Online Masterclass & in5 Dubai',
    desc: 'Build a $1M–$5M GTM & capital strategy. Master term sheet negotiation and data room structuring directly with lead partners.',
    tag: 'Cohort 3',
    tagColor: '#10B981',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
  },
  {
    id: 4,
    title: 'Startup Spotlight Demo Day',
    sub: 'Live Pitching to Active Angel Syndicates',
    date: 'Dec 05, 2026 · Hybrid',
    desc: 'Monthly demo day giving vetted startups a live stage to pitch to active investor syndicates and regional funds.',
    tag: 'Recurring Demo Day',
    tagColor: '#38BDF8',
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
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

                  <h3 style={{ fontSize: 21, fontWeight: 800, color: '#F5F5F7', marginBottom: 8, lineHeight: 1.3 }}>
                    {ev.title}
                  </h3>

                  <p style={{ color: '#F5B400', fontWeight: 700, fontSize: 13.5, marginBottom: 14 }}>{ev.sub}</p>
                  <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>{ev.desc}</p>
                </div>

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
                  }}
                >
                  <span>View Event Website</span>
                  <ArrowUpRight size={16} />
                  <div className="btn-light-sweep" />
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
