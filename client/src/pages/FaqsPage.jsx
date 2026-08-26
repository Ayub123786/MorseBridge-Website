import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles, ArrowUpRight, Search } from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

const FAQS = [
  {
    q: 'What is MorseBridge?',
    a: 'MorseBridge is a premier venture infrastructure and deal flow bridge that connects early-stage founders with institutional venture capital funds, angel syndicates, and family offices across MENA and globally.',
  },
  {
    q: 'How does the startup–investor matching work?',
    a: 'After you submit your startup intake, our venture team conducts a 48-hour diligence audit on your unit economics, deck, and cap table. We then initiate warm, targeted introductions directly with partner-level decision makers whose investment thesis matches your stage and sector.',
  },
  {
    q: 'What is the Substack and AI diligence blueprints?',
    a: 'Our founder Muhammad Ayub writes weekly in-depth breakdowns on automating commercial due diligence, building multi-agent deal sourcing pipelines inside Claude Cowork, and institutional underwriting models. You can read these on the Substack.',
  },
  {
    q: 'Where do I access curated investor data?',
    a: 'Our live curated investor database covers 100+ active MENA and global funds, complete with partner contact channels, check size brackets, and verified investment criteria.',
  },
  {
    q: 'Who are the investors on MorseBridge?',
    a: 'Our network includes 100+ vetted institutional venture capitalists, sovereign fund accelerators, multi-family offices, and regional angel syndicates actively deploying capital across Dubai, Riyadh, Abu Dhabi, London, and San Francisco.',
  },
  {
    q: 'What types of startups does MorseBridge work with?',
    a: 'We focus on pre-seed, seed, and Series A technology companies across Fintech, AI & Agentic Systems, B2B SaaS, Healthtech, Climate, and Marketplace sectors.',
  },
  {
    q: 'Can I host a bespoke event through MorseBridge?',
    a: 'Yes. We provide complete end-to-end event execution — from venue selection in DIFC / Riyadh Front to keynote curation and investor attendee management. Visit our Custom Events page to submit an inquiry.',
  },
  {
    q: 'How do I get started?',
    a: "Click 'Sign Up' in the navigation bar, select whether you are a Startup or Investor, and complete your profile. Our team reviews all submissions within 48 hours.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: '#14141B',
        border: isOpen ? '1px solid #8B5CF6' : '1px solid var(--border-subtle)',
        borderRadius: 18,
        marginBottom: 14,
        boxShadow: isOpen ? '0 8px 28px rgba(139, 92, 246, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.25s ease',
        overflow: 'hidden',
      }}
    >
      <div
        onClick={onToggle}
        style={{
          padding: '22px 26px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: 16.5,
            fontWeight: 700,
            color: isOpen ? '#C4B5FD' : '#F5F5F7',
            transition: 'color 0.2s ease',
          }}
        >
          {item.q}
        </span>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: isOpen ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${isOpen ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isOpen ? '#C4B5FD' : '#A3A3B0',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s ease, background 0.2s ease',
            flexShrink: 0,
            marginLeft: 16,
          }}
        >
          <ChevronDown size={17} />
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 26px 24px',
                color: '#A3A3B0',
                fontSize: 15,
                lineHeight: 1.7,
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                paddingTop: 16,
              }}
            >
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqsPage() {
  const [search, setSearch] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const filtered = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 90, color: '#F5F5F7' }}>
      
      {/* Hero */}
      <section style={{ padding: '60px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
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
            <HelpCircle size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              HELP &amp; FREQUENTLY ASKED QUESTIONS
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
            Frequently Asked <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>Questions</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16.5, maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.65 }}>
            Everything you need to know about our fundraising matchmaking, diligence models, Substack insights, and global investor summits.
          </p>

          {/* Search Box */}
          <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
            <Search size={18} color="#A3A3B0" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 18px 13px 44px',
                background: '#14141B',
                border: '1px solid var(--border-subtle)',
                borderRadius: 12,
                color: '#F5F5F7',
                fontSize: 14.5,
                outline: 'none',
              }}
            />
          </div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="section" style={{ paddingTop: 10, paddingBottom: 80 }}>
        <div className="container container-narrow">
          {filtered.map((item, idx) => (
            <FaqItem
              key={item.q}
              item={item}
              isOpen={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
            />
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#A3A3B0' }}>
              No matching questions found for "{search}"
            </div>
          )}
        </div>
      </section>

      <SignalDivider />

      {/* Still have questions? */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 27, 0.95) 0%, rgba(38, 28, 60, 0.9) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              borderRadius: 24,
              padding: '48px 36px',
              boxShadow: '0 16px 48px rgba(139, 92, 246, 0.15)',
            }}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#F5F5F7', marginBottom: 12 }}>
              Still Have Questions?
            </h2>
            <p style={{ color: '#A3A3B0', marginBottom: 30, fontSize: 15.5, maxWidth: 520, margin: '0 auto 30px', lineHeight: 1.6 }}>
              Our advisory partners are happy to walk you through our fundraising platform and investor network.
            </p>
            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
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
              <span>Schedule a 30-Min Intro</span>
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
