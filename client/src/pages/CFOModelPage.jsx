import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, TrendingUp, Flame, Scale, BarChart3, Landmark, ClipboardList, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const FEATURES = [
  { icon: TrendingUp, title: 'Revenue Modeling', desc: 'Build multi-stream revenue projections with customizable growth rates, retention curves, and pricing tiers.' },
  { icon: Flame, title: 'Burn & Runway Radar', desc: 'Real-time cash burn calculator with dynamic runway alerts and institutional fundraising trigger points.' },
  { icon: Scale, title: 'Unit Economics & Margins', desc: 'LTV/CAC ratio, payback period, gross margin expansion, and cohort-based profitability models built in.' },
  { icon: BarChart3, title: '3-Statement Financials', desc: 'P&L, Cash Flow, and Balance Sheet pre-built and dynamically linked — zero manual formula errors.' },
  { icon: Landmark, title: 'Cap Table Dilution', desc: 'Model equity dilution across pre-seed, seed, and Series A rounds with SAFE and convertible note structures.' },
  { icon: ClipboardList, title: 'Investor-Ready Output', desc: 'Formatted financial summaries and KPI snapshot charts ready to paste directly into your data room.' },
];

const TABS = ['Excel (.xlsx)', 'Google Sheets'];

export default function CFOModelPage() {
  const [activeTab, setActiveTab] = useState(0);

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
              background: 'rgba(245, 180, 0, 0.15)',
              border: '1px solid rgba(245, 180, 0, 0.4)',
              marginBottom: 24,
            }}
          >
            <Sparkles size={14} color="#F5B400" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#F5B400', letterSpacing: '0.06em' }}>
              MOST REQUESTED FOUNDER TOOL
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
            The 5-Minute <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>CFO Model</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 640, margin: '0 auto 36px', lineHeight: 1.65 }}>
            An institutional-grade 3-statement model built for pre-seed to Series A founders who want to walk into venture capital meetings with complete clarity.
          </p>

          {/* Format tabs */}
          <div
            style={{
              display: 'inline-flex',
              background: '#14141B',
              border: '1px solid var(--border-subtle)',
              borderRadius: 12,
              padding: 4,
              marginBottom: 32,
              gap: 4,
            }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '9px 24px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === i ? '#8B5CF6' : 'transparent',
                  color: activeTab === i ? '#ffffff' : '#A3A3B0',
                  fontSize: 13.5,
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic-signal"
              style={{
                display: 'inline-flex',
                background: '#8B5CF6',
                color: '#FFFFFF',
                fontSize: 15,
                padding: '14px 36px',
                fontWeight: 700,
                borderRadius: 12,
              }}
            >
              <span>Download The CFO Model</span>
              <ArrowUpRight size={16} />
              <div className="btn-light-sweep" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 60 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">What's Inside</h2>
            <p className="section-subtitle">Everything you need to answer tough investor questions on financials with certainty.</p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {FEATURES.map((f, idx) => {
              const IconComp = f.icon;
              return (
                <motion.div
                  key={f.title}
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
                  <h3 style={{ fontSize: 18.5, fontWeight: 700, color: '#F5F5F7', margin: 0 }}>{f.title}</h3>
                  <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SignalDivider />

      {/* Walk Into Your Next Meeting with Confidence */}
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
              Walk Into Your Next Meeting with <span style={{ color: '#8B5CF6' }}>Confidence</span>
            </h2>
            <p style={{ color: '#A3A3B0', marginBottom: 30, fontSize: 15.5, maxWidth: 520, margin: '0 auto 30px', lineHeight: 1.6 }}>
              Download the 5-Minute CFO Model template and get your data room financial statements investor-ready today.
            </p>
            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic-signal"
              style={{
                background: '#8B5CF6',
                color: '#FFFFFF',
                padding: '14px 38px',
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 12,
              }}
            >
              <span>Get The 5-Minute CFO Model</span>
              <ArrowUpRight size={16} />
              <div className="btn-light-sweep" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
