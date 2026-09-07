import { motion } from 'framer-motion';
import { Play, Mic, Youtube, ArrowUpRight, Sparkles, Clock, Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const EPISODES = [
  {
    id: 1,
    title: 'Principal Plug and Play: Investors are Not ATM Machines!',
    guest: 'ft. Andrea Azzolari · Principal, Plug and Play Tech Center MENA',
    duration: '1 hr 7 min',
    date: 'Full Episode',
    videoId: 'O1hPe9GncBQ',
    desc: 'Andrea Azzolari, Principal at Plug and Play Tech Center MENA, breaks down VC evaluation criteria, why investors are not ATM machines, and what truly makes founders fundable.',
    youtubeUrl: 'https://www.youtube.com/watch?v=O1hPe9GncBQ',
  },
  {
    id: 2,
    title: 'How Startup Fundraising Works | Startup School',
    guest: 'Founders Talk with Ayub · Full Masterclass',
    duration: '1 hr 13 min',
    date: 'Full Episode',
    videoId: 'rjflnyDqN2M',
    desc: 'A comprehensive masterclass on how startup fundraising actually works: valuation mechanics, pitch deck narratives, SAFEs, and negotiating with lead investors.',
    youtubeUrl: 'https://www.youtube.com/watch?v=rjflnyDqN2M',
  },
  {
    id: 3,
    title: 'Family Offices From Scratch',
    guest: 'Private Wealth & Family Offices Blueprint',
    duration: '1 hr 5 min',
    date: 'Full Episode',
    videoId: 'SrJu7zkwsYs',
    desc: 'Everything founders and fund managers need to know about Family Offices: structure, investment mandates, direct startup deals, and securing long-term institutional backing.',
    youtubeUrl: 'https://www.youtube.com/watch?v=SrJu7zkwsYs',
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
                {ep.videoId ? (
                  <div
                    style={{
                      width: 220,
                      aspectRatio: '16/9',
                      borderRadius: 14,
                      overflow: 'hidden',
                      position: 'relative',
                      flexShrink: 0,
                      background: '#1C1C24',
                    }}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${ep.videoId}/hqdefault.jpg`}
                      alt={ep.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          boxShadow: '0 4px 16px rgba(139, 92, 246, 0.6)',
                        }}
                      >
                        <Play size={18} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: 2 }} />
                      </div>
                    </div>
                  </div>
                ) : (
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
                )}

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
