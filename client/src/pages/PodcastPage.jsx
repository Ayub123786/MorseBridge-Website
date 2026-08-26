import { motion } from 'framer-motion';
import { Play, Mic, Youtube, ArrowUpRight, Sparkles, Clock, Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const EPISODES = [
  {
    id: 1,
    title: 'How to Raise from MENA VCs in 2026',
    guest: 'Ahmed Al-Rashid, Partner at Gulf Ventures',
    duration: '52 min',
    date: 'Aug 2026',
    desc: 'A deep dive into what MENA venture capitalists look for, how to structure your outreach, and what common mistakes founders make when pitching to regional funds.',
    youtubeUrl: 'https://youtube.com/@FoundersTalkwithAyub',
  },
  {
    id: 2,
    title: 'Building a $10M ARR Startup in the UAE',
    guest: 'Sarah K., Co-founder of FinTech UAE',
    duration: '44 min',
    date: 'Jul 2026',
    desc: 'The journey from idea to $10M ARR — lessons learned, pivots made, and advice for founders targeting the UAE and Saudi market expansion.',
    youtubeUrl: 'https://youtube.com/@FoundersTalkwithAyub',
  },
  {
    id: 3,
    title: 'Family Office Capital: The Untapped Resource',
    guest: 'Omar Al-Farsi, Family Office Director',
    duration: '38 min',
    date: 'Jun 2026',
    desc: 'Why family offices are becoming the most important source of early-stage capital in MENA and how founders can build institutional credibility.',
    youtubeUrl: 'https://youtube.com/@FoundersTalkwithAyub',
  },
  {
    id: 4,
    title: 'From Idea to Launch in 90 Days',
    guest: 'Nora Hassan, Serial Entrepreneur',
    duration: '41 min',
    date: 'May 2026',
    desc: 'A framework for rapidly validating and launching a startup without burning through your runway — tested across 4 successful tech companies.',
    youtubeUrl: 'https://youtube.com/@FoundersTalkwithAyub',
  },
];

export default function PodcastPage() {
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
            <Mic size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              FOUNDERS TALK WITH AYUB
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
            The Founder <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>Podcast</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 640, margin: '0 auto 36px', lineHeight: 1.65 }}>
            Unfiltered conversations with the venture capitalists, unicorn founders, and ecosystem leaders shaping the future of global tech and venture capital.
          </p>

          <a
            href="https://youtube.com/@FoundersTalkwithAyub"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic-signal"
            style={{
              display: 'inline-flex',
              background: '#FF0000',
              color: '#FFFFFF',
              padding: '14px 34px',
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 12,
            }}
          >
            <Youtube size={18} />
            <span>Subscribe on YouTube</span>
            <ArrowUpRight size={16} />
            <div className="btn-light-sweep" />
          </a>
        </div>
      </section>

      {/* Episodes */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {EPISODES.map((ep, idx) => (
              <motion.a
                key={ep.id}
                href={ep.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  gap: 22,
                  alignItems: 'flex-start',
                  background: '#14141B',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 20,
                  padding: 26,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
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
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0,
                    boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
                  }}
                >
                  <Play size={20} fill="#FFFFFF" style={{ marginLeft: 2 }} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                    <span
                      className="font-data"
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: '#C4B5FD',
                        background: 'rgba(139, 92, 246, 0.15)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        padding: '3px 10px',
                        borderRadius: 9999,
                      }}
                    >
                      EPISODE {ep.id}
                    </span>
                    <span style={{ color: '#A3A3B0', fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={13} /> {ep.duration} · {ep.date}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 19, fontWeight: 800, color: '#F5F5F7', marginBottom: 4, lineHeight: 1.35 }}>
                    {ep.title}
                  </h3>

                  <div style={{ color: '#F5B400', fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>
                    {ep.guest}
                  </div>

                  <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                    {ep.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
