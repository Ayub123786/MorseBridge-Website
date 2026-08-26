import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BarChart3, Calendar, BookOpen, Compass, Trophy, ArrowUpRight, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const SERVICES = [
  {
    icon: Users,
    title: 'Startup–Investor Matching',
    desc: 'We intelligently match pre-screened startups with aligned institutional VCs, family offices, and angel syndicates based on sector, stage, and geography.',
  },
  {
    icon: BarChart3,
    title: 'Curated Deal Flow Engine',
    desc: 'Investors receive proprietary, thesis-aligned deal flow with automated memo generation, unit economics extraction, and data room screening.',
  },
  {
    icon: Calendar,
    title: 'Startup Events & Summits',
    desc: 'We curate and execute premium private summits across MENA — including Riyadh Rising, Dubai Rising, pitch showcases, and closed-door investor roundtables.',
  },
  {
    icon: BookOpen,
    title: 'Institutional Resource Vault',
    desc: 'Access our verified library of due diligence frameworks, Claude automation blueprints, 5-Minute CFO models, and YC-standard pitch deck templates.',
  },
  {
    icon: Compass,
    title: 'Advisory & Mentorship',
    desc: 'Connect with 100+ active venture partners and serial entrepreneurs who have built, scaled, and closed institutional funding rounds across MENA.',
  },
  {
    icon: Trophy,
    title: 'Spotlight Exposure',
    desc: 'Feature your company in front of our network of 2,500+ investors, sovereign accelerators, and family offices through the MorseBridge ecosystem spotlight.',
  },
];

export default function WhatWeDoPage() {
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
            <Sparkles size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              OUR PLATFORM &amp; ECOSYSTEM
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
            What We <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>Do</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 640, margin: '0 auto 36px', lineHeight: 1.65 }}>
            We bridge early-stage founders with institutional capital, automated diligence intelligence, and high-impact summits across the Middle East and worldwide.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 60 }}>
        <div className="container">
          <div className="grid-3" style={{ gap: 24 }}>
            {SERVICES.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <motion.div
                  key={s.title}
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
                  <h3 style={{ fontSize: 18.5, fontWeight: 700, color: '#F5F5F7', margin: 0 }}>{s.title}</h3>
                  <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* CTA Section */}
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
              Ready to Accelerate Your <span style={{ color: '#8B5CF6' }}>Growth</span>?
            </h2>
            <p style={{ color: '#A3A3B0', marginBottom: 32, fontSize: 15.5, maxWidth: 520, margin: '0 auto 30px', lineHeight: 1.6 }}>
              Whether you are an ambitious founder raising your next round or an institutional investor sourcing pre-screened deal flow, MorseBridge is your bridge to capital.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/i-am-a-startup"
                className="btn-magnetic-signal"
                style={{
                  background: '#8B5CF6',
                  color: '#FFFFFF',
                  padding: '13px 32px',
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: 12,
                }}
              >
                <span>Join as a Startup</span>
                <ArrowUpRight size={16} />
                <div className="btn-light-sweep" />
              </Link>
              <Link
                to="/i-am-an-investor"
                className="btn-magnetic-signal"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#F5F5F7',
                  border: '1px solid var(--border-subtle)',
                  padding: '13px 32px',
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: 12,
                }}
              >
                <span>Join as an Investor</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
