import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle, Sparkles, Shield, Rocket, Target, FileText, Users } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const BENEFITS = [
  { icon: Target, title: 'Investor Matching', desc: 'Get introduced to pre-vetted institutional VCs and angel syndicates aligned to your sector, stage, and geography.' },
  { icon: FileText, title: 'CFO Financial Model', desc: 'Access the 5-Minute CFO Model — the institutional 3-statement template used to raise institutional rounds.' },
  { icon: Sparkles, title: 'Pitch Deck Review', desc: 'Receive structured narrative audits and deck feedback from experienced venture partners before live pitching.' },
  { icon: Rocket, title: 'Events & Summits', desc: 'Secured pitch showcase slots at our exclusive startup summits, roundtables, and demo days across MENA.' },
  { icon: Users, title: 'Mentorship Access', desc: 'Connect with 100+ active mentors who have built, scaled, and funded high-growth tech ventures.' },
  { icon: Shield, title: 'Data Room Structuring', desc: 'Build investor-ready due diligence data rooms with standardized cap tables and legal SAFE note templates.' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Apply as a Startup', desc: 'Submit your startup intake details, stage, sector, metrics, and target round size.' },
  { step: '02', title: 'Profile & Narrative Audit', desc: 'Our advisory team reviews your metrics within 48 hours and conducts a positioning session.' },
  { step: '03', title: 'Targeted Investor Matching', desc: 'We match your deck with active fund theses in our verified network and initiate warm introductions.' },
  { step: '04', title: 'Pitch, Negotiate & Close', desc: 'Meet aligned investors at private roundtables and close your institutional fundraising round.' },
];

export default function StartupPage() {
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
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              marginBottom: 24,
            }}
          >
            <span className="pulse-dot-red" style={{ background: '#8B5CF6', boxShadow: '0 0 8px rgba(139, 92, 246, 0.8)' }} />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              FOR FOUNDERS &amp; STARTUPS
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
            Your Path to <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>Funding Starts Here</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 640, margin: '0 auto 38px', lineHeight: 1.65 }}>
            Join over 700+ startups leveraging MorseBridge to access institutional capital, CFO-grade financial models, and warm investor introductions across MENA and global tech hubs.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/signup"
              className="btn-magnetic-signal"
              style={{
                background: '#8B5CF6',
                color: '#FFFFFF',
                padding: '14px 34px',
                fontSize: 15.5,
              }}
            >
              <span>Apply for Capital Support</span>
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
              <span>Schedule 30-Min Intro</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          STATS BAR
          ==================================================================== */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 0 50px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
              background: '#14141B',
              border: '1px solid var(--border-subtle)',
              borderRadius: 20,
              padding: '32px 28px',
              textAlign: 'center',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {[
              { val: '700+', label: 'Startups Supported' },
              { val: '$45M+', label: 'Capital Facilitated' },
              { val: '100+', label: 'Active Institutional VCs' },
              { val: '48h', label: 'Fast Track Response Time' },
            ].map((s, idx) => (
              <div key={idx} style={{ padding: '8px 12px' }}>
                <div
                  className="font-data"
                  style={{
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    color: '#C4B5FD',
                    marginBottom: 6,
                    lineHeight: 1.1,
                  }}
                >
                  {s.val}
                </div>
                <div style={{ color: '#A3A3B0', fontSize: 13.5, fontWeight: 600 }}>{s.label}</div>
              </div>
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
            <h2 className="section-title">What You Get as a Member</h2>
            <p className="section-subtitle">Everything you need to accelerate your fundraising journey with clarity and speed.</p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {BENEFITS.map((b, idx) => {
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
                  <h3 style={{ fontSize: 18.5, fontWeight: 700, color: '#F5F5F7', margin: 0 }}>{b.title}</h3>
                  <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* ====================================================================
          PROCESS STEPS
          ==================================================================== */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">A streamlined 4-step execution framework from application to closed round.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 22,
            }}
          >
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: '#14141B',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 18,
                  padding: 26,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="font-data"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: '#8B5CF6',
                    opacity: 0.8,
                    marginBottom: 12,
                  }}
                >
                  {step.step}
                </div>
                <h3 style={{ fontSize: 17.5, fontWeight: 700, color: '#F5F5F7', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: '#A3A3B0', fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
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
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 24,
              padding: '54px 36px',
              boxShadow: '0 16px 48px rgba(139, 92, 246, 0.15)',
            }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: '#F5F5F7', marginBottom: 14 }}>
              Ready to Accelerate Your Round?
            </h2>
            <p style={{ color: '#A3A3B0', fontSize: 15.5, maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.6 }}>
              Get vetted, audited, and matched with active venture funds ready to back exceptional builders.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/signup"
                className="btn-magnetic-signal"
                style={{
                  background: '#8B5CF6',
                  color: '#FFFFFF',
                  padding: '13px 32px',
                  fontSize: 15,
                }}
              >
                <span>Get Started as a Founder</span>
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
