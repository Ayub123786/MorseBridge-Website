import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search, ShieldCheck, Globe, Mic, BarChart2, Users } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const INVESTOR_BENEFITS = [
  { icon: Search, title: 'Curated Deal Flow', desc: 'Receive pre-screened startup deal flow with audited unit economics and metrics aligned to your fund thesis.' },
  { icon: ShieldCheck, title: 'Diligence Vault', desc: 'Access comprehensive due diligence data rooms including the 5-Minute CFO model, verified traction, and SAFE terms.' },
  { icon: Globe, title: 'MENA & Global Network', desc: 'Co-invest alongside leading sovereign funds, family offices, and verified angel syndicates across the GCC.' },
  { icon: Mic, title: 'Summits & Showcases', desc: 'Receive VIP private investor dinner invitations and speaking slots at flagship summits in Dubai and Riyadh.' },
  { icon: BarChart2, title: 'Portfolio Support', desc: 'Leverage our institutional GTM bootcamps, financial audit frameworks, and advisory for your portfolio companies.' },
  { icon: Users, title: 'Syndicate Co-Investment', desc: 'Form syndicates and collaborate with fellow general partners for oversubscribed seed and Series A rounds.' },
];

const INVESTOR_TYPES = [
  { type: 'Angel Investors', desc: 'Individual high-net-worth investors and syndicates backing early-stage tech ventures with high conviction.' },
  { type: 'Family Offices', desc: 'Private wealth managers seeking direct, audited equity investments and strategic coinvestment opportunities.' },
  { type: 'Venture Capital', desc: 'Institutional micro-funds and Tier-1 VCs seeking filtered, institutional-ready seed and Series A deal flow.' },
  { type: 'Corporate Venture', desc: 'Strategic corporate venture arms looking for ecosystem innovation, commercial pilot partners, or M&A pipeline.' },
];

export default function InvestorPage() {
  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 90, color: '#F5F5F7' }}>
      
      {/* ====================================================================
          HERO SECTION
          ==================================================================== */}
      <section style={{ padding: '60px 0 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="ambient-mesh-glow" />

        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 18px',
              borderRadius: 9999,
              background: 'rgba(245, 180, 0, 0.15)',
              border: '1px solid rgba(245, 180, 0, 0.35)',
              marginBottom: 24,
            }}
          >
            <span className="pulse-dot-red" style={{ background: '#F5B400', boxShadow: '0 0 8px rgba(245, 180, 0, 0.8)' }} />
            <span className="font-data" style={{ fontSize: 12.5, color: '#FDE1A0', letterSpacing: '0.06em' }}>
              FOR INVESTORS &amp; CAPITAL ALLOCATORS
            </span>
          </div>

          {/* Headline */}
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
            Access High-Quality <span style={{ color: '#F5B400', WebkitTextFillColor: '#F5B400' }}>MENA Deal Flow</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 640, margin: '0 auto 38px', lineHeight: 1.65 }}>
            Join 100+ active institutional funds, family offices, and verified angel syndicates discovering, evaluating, and backing high-potential startups across MENA and global tech ecosystems.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/signup"
              className="btn-magnetic-signal"
              style={{
                background: '#F5B400',
                color: '#0A0A0F',
                padding: '14px 34px',
                fontSize: 15.5,
                fontWeight: 700,
              }}
            >
              <span>Join Investor Syndicate</span>
              <ArrowUpRight size={17} />
              <div className="btn-light-sweep" />
            </Link>

            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic-signal"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#F5F5F7',
                border: '1px solid var(--border-subtle)',
                padding: '14px 32px',
                fontSize: 15.5,
              }}
            >
              <span>Book Allocation Call</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          INVESTOR PROFILES
          ==================================================================== */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 0 50px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">Who We Partner With</h2>
            <p className="section-subtitle">Tailored deal flow and private syndicate access for active capital allocators.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 22,
            }}
          >
            {INVESTOR_TYPES.map((t, idx) => (
              <motion.div
                key={t.type}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: '#14141B',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 18,
                  padding: 26,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
              >
                <h3
                  style={{
                    color: '#F5B400',
                    fontSize: 18,
                    fontWeight: 800,
                    marginBottom: 10,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t.type}
                </h3>
                <p style={{ color: '#A3A3B0', fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* ====================================================================
          BENEFITS GRID
          ==================================================================== */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Why Partner with MorseBridge</h2>
            <p className="section-subtitle">Institutional-grade curation, standardized financial models, and warm introductions.</p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {INVESTOR_BENEFITS.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: '#14141B',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 18,
                    padding: 28,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'rgba(245, 180, 0, 0.15)',
                      border: '1px solid rgba(245, 180, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F5B400',
                      marginBottom: 4,
                    }}
                  >
                    <IconComp size={24} />
                  </div>
                  <h3 style={{ fontSize: 18.5, fontWeight: 700, color: '#F5F5F7', margin: 0 }}>{b.title}</h3>
                  <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINAL CTA
          ==================================================================== */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div
            style={{
              background: '#14141B',
              border: '1px solid rgba(245, 180, 0, 0.3)',
              borderRadius: 24,
              padding: '54px 36px',
              boxShadow: '0 16px 48px rgba(245, 180, 0, 0.12)',
            }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: '#F5F5F7', marginBottom: 14 }}>
              Ready to Join the Syndicate?
            </h2>
            <p style={{ color: '#A3A3B0', fontSize: 15.5, maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.6 }}>
              Receive filtered, high-conviction deal flow directly to your inbox with zero spam.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/signup"
                className="btn-magnetic-signal"
                style={{
                  background: '#F5B400',
                  color: '#0A0A0F',
                  padding: '13px 32px',
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                <span>Join Investor Network</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
