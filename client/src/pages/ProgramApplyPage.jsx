import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Target,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  UploadCloud,
  FileText,
  Building,
  DollarSign,
  Briefcase,
  Users,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';
import { API_BASE } from '../config/api';

const PROGRAMS = {
  accelerator: {
    id: 'accelerator',
    title: 'Runway — Revenue in 90 Days',
    badge: '13-WEEK SPRINT · 10 FOUNDERS',
    subtitle: "Let's get you paid before the runway runs out. Thirteen weeks. Ten founders. Ayub Rafique sits with you while we build it, launch it, and find the first people willing to pay. You keep all of your equity.",
    accentColor: '#7A6BD0',
    gradient: 'linear-gradient(135deg, #7A6BD0 0%, #5E53A2 100%)',
    icon: Rocket,
    highlights: [
      '13 weeks hands-on sprint with Ayub Rafique (Phase 1: Build, Phase 2: Revenue)',
      'Starts 1 November · Strictly limited to 10 founders',
      '$2,600 per founder · 0% Equity (Keep 100% of your company)',
      'Master 25 battle-tested tools (Clay, Claude, Sales Navigator, Apollo, Smartlead)',
    ],
    stats: [
      { val: '13 Wks', lbl: 'Hands-On Sprint' },
      { val: '10 Seats', lbl: 'Only 10 Founders' },
      { val: '$2,600', lbl: '0% Equity' },
    ],
  },
  bootcamp: {
    id: 'bootcamp',
    title: 'Global Fundraising Bootcamp',
    badge: 'EVERY MONTH · MONTHLY COHORTS',
    subtitle: 'Held every month: A high-conviction fundraising sprint designed to turn early-stage traction into closed seed & Series A term sheets.',
    accentColor: '#F5B400',
    gradient: 'linear-gradient(135deg, #F5B400 0%, #D97706 100%)',
    icon: Target,
    highlights: [
      'Master the 5-Minute CFO model & high-conversion pitch decks',
      'Exclusive 2:1 founder-to-investor closed-door networking dinners',
      'Diligence checklist & SAFE/Convertible term sheet negotiation',
      'Warm intro sequences that generate partner-level responses',
    ],
    stats: [
      { val: '21 Days', lbl: 'Avg. Term Sheet Velocity' },
      { val: '82%', lbl: 'Conversion to Diligence' },
      { val: '180+', lbl: 'Alumni Founders' },
    ],
  },
};

const STAGES = [
  'Pre-Idea / Concept',
  'Pre-Revenue (Product Ready)',
  'Early Revenue ($10k – $50k MRR)',
  'Growth Stage ($50k – $150k MRR)',
  'Series A+ ($150k+ MRR)',
];

const TARGET_RAISES = [
  'Under $250K',
  '$250K – $500K',
  '$500K – $1M',
  '$1M – $3M',
  '$3M – $5M+',
];

export default function ProgramApplyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const programParam = searchParams.get('program') || '';
  const initialProgram = programParam.includes('bootcamp') ? 'bootcamp' : 'accelerator';

  const [activeProgram, setActiveProgram] = useState(initialProgram);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    stage: 'Early Revenue ($10k – $50k MRR)',
    targetRaise: '$500K – $1M',
    traction: '',
    whyJoin: '',
  });

  const [deckFile, setDeckFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

  useEffect(() => {
    if (programParam.includes('bootcamp')) {
      setActiveProgram('bootcamp');
    } else if (programParam.includes('runway') || programParam.includes('accelerator')) {
      setActiveProgram('accelerator');
    }
  }, [programParam]);

  const handleProgramSwitch = (key) => {
    setActiveProgram(key);
    setSearchParams({ program: key === 'bootcamp' ? 'global-fundraising-bootcamp' : 'runway' });
  };

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formatSize = (bytes) => {
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
      };
      const reader = new FileReader();
      reader.onload = () => {
        setDeckFile({
          name: file.name,
          size: formatSize(file.size),
          data: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick Demo Auto-Fill
  const handleAutoFillDemo = () => {
    if (activeProgram === 'accelerator') {
      setForm({
        name: 'Elena Rostova',
        email: 'elena@metriceye.io',
        phone: '+44 7700 900821',
        company: 'MetricEye',
        website: 'https://metriceye.io',
        stage: 'Pre-Revenue (Product Ready)',
        targetRaise: '0% Equity / Bootstrapped',
        traction:
          'Functional AI workflow automation product built for supply-chain brokers. Need direct hands-on assistance to build outbound Clay lead funnels, book enterprise demos, and close the first 5 paying contracts.',
        whyJoin:
          'I have deep industry domain knowledge in logistics, but need Ayub to sit with me to structure outbound distribution, demo scripts, and repeatable pricing.',
      });
      setDeckFile({
        name: 'MetricEye_Product_Overview.pdf',
        size: '3.4 MB',
      });
    } else {
      setForm({
        name: 'Kareem Mansour',
        email: 'kareem@solarpulse.io',
        phone: '+971 52 441 9087',
        company: 'SolarPulse Energy',
        website: 'https://solarpulse.io',
        stage: 'Pre-Revenue (Product Ready)',
        targetRaise: '$500K – $1M',
        traction: 'LOIs signed with 3 commercial real estate developers in UAE. Clean-tech energy analytics platform with 3-year hardware pilot completed.',
        whyJoin: 'Build an institutional-grade data room, craft a high-conversion institutional deck, and pitch to active family offices at the next closed-door summit.',
      });
      setDeckFile({
        name: 'SolarPulse_Fundraising_Deck_v3.pdf',
        size: '6.2 MB',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let normalizedWebsite = (form.website || '').trim();
    if (normalizedWebsite && !/^https?:\/\//i.test(normalizedWebsite)) {
      normalizedWebsite = `https://${normalizedWebsite}`;
    }

    const payload = {
      program: PROGRAMS[activeProgram].title,
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      website: normalizedWebsite,
      stage: form.stage,
      targetRaise: form.targetRaise,
      traction: form.traction,
      whyJoin: form.whyJoin,
      deckFileName: deckFile?.name || 'Pitch_Deck.pdf',
      pitchDeckName: deckFile?.name || 'Pitch_Deck.pdf',
      pitchDeckData: deckFile?.data || '',
    };

    try {
      // POST to backend if available
      const res = await fetch(`${API_BASE}/api/programs/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setSubmissionData({
        ...payload,
        id: data.applicationId || `MB-APP-${Date.now().toString().slice(-6)}`,
      });
    } catch (err) {
      // Fallback to local demo response
      setSubmissionData({
        ...payload,
        id: `MB-APP-${Date.now().toString().slice(-6)}`,
      });
    } finally {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const activeProg = PROGRAMS[activeProgram];

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 100, color: '#F5F5F7' }}>
      <div className="container" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px 80px' }}>
        
        {/* Back Link */}
        <div style={{ marginBottom: 28 }}>
          <Link
            to="/#what-we-do"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#A3A3B0',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#A3A3B0')}
          >
            <ArrowLeft size={16} />
            <span>Back to What We Do</span>
          </Link>
        </div>

        {/* Header Hero */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 18px',
              borderRadius: 9999,
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              marginBottom: 18,
            }}
          >
            <Sparkles size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              MORSEBRIDGE VENTURE PROGRAMS
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 16,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E2E8 70%, #A3A3B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Cohort Application Portal
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Submit your venture details for priority screening. Our investment partners evaluate applications on a rolling 48-hour basis.
          </p>
        </div>

        {/* Program Selector Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            background: '#14141B',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            padding: 8,
            marginBottom: 36,
          }}
        >
          <button
            type="button"
            onClick={() => handleProgramSwitch('accelerator')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '14px 20px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 14.5,
              transition: 'all 0.25s ease',
              background: activeProgram === 'accelerator' ? 'linear-gradient(135deg, #7A6BD0, #5E53A2)' : 'transparent',
              color: activeProgram === 'accelerator' ? '#FFFFFF' : '#A3A3B0',
              boxShadow: activeProgram === 'accelerator' ? '0 4px 20px rgba(122, 107, 208, 0.4)' : 'none',
            }}
          >
            <Rocket size={18} />
            <span>Runway (Revenue in 90 Days)</span>
          </button>

          <button
            type="button"
            onClick={() => handleProgramSwitch('bootcamp')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '14px 20px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 14.5,
              transition: 'all 0.25s ease',
              background: activeProgram === 'bootcamp' ? 'linear-gradient(135deg, #F5B400, #D97706)' : 'transparent',
              color: activeProgram === 'bootcamp' ? '#0A0A0F' : '#A3A3B0',
              boxShadow: activeProgram === 'bootcamp' ? '0 4px 20px rgba(245, 180, 0, 0.3)' : 'none',
            }}
          >
            <Target size={18} />
            <span>Global Fundraising Bootcamp</span>
          </button>
        </div>

        {/* Selected Program Overview Banner */}
        <div
          style={{
            background: 'linear-gradient(170deg, #181824 0%, #12121A 60%, #0D0D14 100%)',
            border: `1px solid ${activeProg.accentColor}55`,
            borderRadius: 18,
            padding: '24px 28px',
            marginBottom: 24,
            boxShadow: `0 12px 36px rgba(0, 0, 0, 0.45), 0 0 24px ${activeProg.accentColor}22`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span
                style={{
                  display: 'inline-block',
                  background: `${activeProg.accentColor}22`,
                  border: `1px solid ${activeProg.accentColor}55`,
                  color: activeProg.accentColor === '#F5B400' ? '#F5B400' : '#AB9EE8',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '4px 12px',
                  borderRadius: 9999,
                  marginBottom: 10,
                }}
              >
                {activeProg.badge}
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#F5F5F7', marginBottom: 6 }}>
                {activeProg.title}
              </h2>
              <p style={{ color: '#A3A3B0', fontSize: 14.5, maxWidth: 620, lineHeight: 1.5 }}>
                {activeProg.subtitle}
              </p>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'flex', gap: 20 }}>
              {activeProg.stats.map((st, i) => (
                <div key={i} style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: activeProg.accentColor }}>{st.val}</div>
                  <div style={{ fontSize: 11, color: '#A3A3B0', fontWeight: 600, textTransform: 'uppercase' }}>{st.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {activeProgram === 'accelerator' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(122, 107, 208, 0.12)',
              border: '1px solid rgba(122, 107, 208, 0.35)',
              borderRadius: 14,
              padding: '16px 22px',
              marginBottom: 32,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <span style={{ color: '#AB9EE8', fontWeight: 700, fontSize: 14 }}>
                Looking for the full 13-week syllabus, market stats &amp; 25-tool stack?
              </span>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9C95AD' }}>
                See the week-by-week track, Ayub Rafique's track record, and the one rule.
              </p>
            </div>
            <Link
              to="/runway"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#7A6BD0',
                color: '#FFFFFF',
                padding: '8px 18px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <span>View Dedicated Runway Page</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        )}

        {/* Application Form or Success Screen */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              style={{
                background: '#14141B',
                border: '1px solid var(--border-subtle)',
                borderRadius: 20,
                padding: '36px 32px',
                boxShadow: '0 16px 44px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F5F5F7', marginBottom: 4 }}>
                    Application Form
                  </h3>
                  <p style={{ color: '#A3A3B0', fontSize: 13.5 }}>
                    Enter your startup metrics below or use demo auto-fill to test the flow.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAutoFillDemo}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#C4B5FD',
                    padding: '8px 16px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.borderColor = '#8B5CF6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <Sparkles size={15} color="#C4B5FD" />
                  <span>⚡ Auto-Fill Demo Data</span>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 20 }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#D4D4D8', marginBottom: 6 }}>
                      Founder Full Name <span style={{ color: '#8B5CF6' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Sarah Al-Khatib"
                      value={form.name}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0D0D12',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 10,
                        color: '#FFFFFF',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#D4D4D8', marginBottom: 6 }}>
                      Founder Work Email <span style={{ color: '#8B5CF6' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="founder@startup.com"
                      value={form.email}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0D0D12',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 10,
                        color: '#FFFFFF',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 20 }}>
                  {/* Phone / WhatsApp */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#D4D4D8', marginBottom: 6 }}>
                      Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+966 50 123 4567"
                      value={form.phone}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0D0D12',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 10,
                        color: '#FFFFFF',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#D4D4D8', marginBottom: 6 }}>
                      Startup / Company Name <span style={{ color: '#8B5CF6' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      placeholder="e.g. NeuralFlow AI"
                      value={form.company}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0D0D12',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 10,
                        color: '#FFFFFF',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 20 }}>
                  {/* Website */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#D4D4D8', marginBottom: 6 }}>
                      Company Website / URL
                    </label>
                    <input
                      type="text"
                      inputMode="url"
                      name="website"
                      placeholder="e.g. morsebridge.com or https://..."
                      value={form.website}
                      onChange={handleInputChange}
                      onBlur={(e) => {
                        const val = e.target.value.trim();
                        if (val && !/^https?:\/\//i.test(val)) {
                          setForm((prev) => ({ ...prev, website: `https://${val}` }));
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0D0D12',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 10,
                        color: '#FFFFFF',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Stage */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#D4D4D8', marginBottom: 6 }}>
                      Current Traction Stage
                    </label>
                    <select
                      name="stage"
                      value={form.stage}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0D0D12',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 10,
                        color: '#FFFFFF',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s} style={{ background: '#14141B' }}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#D4D4D8', marginBottom: 6 }}>
                    Target Fundraising Round Size
                  </label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {TARGET_RAISES.map((tr) => (
                      <button
                        key={tr}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, targetRaise: tr }))}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 8,
                          border: form.targetRaise === tr ? `1px solid ${activeProg.accentColor}` : '1px solid rgba(255, 255, 255, 0.08)',
                          background: form.targetRaise === tr ? `${activeProg.accentColor}22` : 'rgba(255, 255, 255, 0.03)',
                          color: form.targetRaise === tr ? '#FFFFFF' : '#A3A3B0',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {tr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pitch Deck Upload Dropzone (Dummy Simulation) */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#D4D4D8', marginBottom: 6 }}>
                    Upload Pitch Deck (PDF / PPTX)
                  </label>
                  <label
                    style={{
                      border: '2px dashed rgba(139, 92, 246, 0.35)',
                      borderRadius: 12,
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(139, 92, 246, 0.04)',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s ease, background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#8B5CF6';
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.35)';
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.04)';
                    }}
                  >
                    <input type="file" accept=".pdf,.pptx,.ppt" onChange={handleFileUpload} style={{ display: 'none' }} />
                    <UploadCloud size={28} color="#8B5CF6" style={{ marginBottom: 8 }} />
                    {deckFile ? (
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ color: '#C4B5FD', fontWeight: 700, fontSize: 14 }}>{deckFile.name}</p>
                        <p style={{ color: '#A3A3B0', fontSize: 12 }}>{deckFile.size} • Click to replace file</p>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ color: '#F5F5F7', fontWeight: 600, fontSize: 14 }}>
                          Drag &amp; drop pitch deck or <span style={{ color: '#8B5CF6' }}>Browse</span>
                        </p>
                        <p style={{ color: '#A3A3B0', fontSize: 12 }}>Supported formats: PDF, PPTX up to 25MB</p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Traction & Problem */}
                <div style={{ marginBottom: 26 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#D4D4D8', marginBottom: 6 }}>
                    Product, Traction &amp; Why You Want to Join
                  </label>
                  <textarea
                    name="traction"
                    rows={4}
                    placeholder="Briefly describe your product, current revenue or pilots, and what you hope to achieve in this cohort..."
                    value={form.traction}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: '#0D0D12',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 10,
                      color: '#FFFFFF',
                      fontSize: 14,
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    background: activeProgram === 'accelerator' ? 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' : 'linear-gradient(135deg, #F5B400 0%, #D97706 100%)',
                    color: activeProgram === 'accelerator' ? '#FFFFFF' : '#0A0A0F',
                    fontWeight: 800,
                    fontSize: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    boxShadow: activeProgram === 'accelerator' ? '0 8px 24px rgba(139, 92, 246, 0.45)' : '0 8px 24px rgba(245, 180, 0, 0.35)',
                    transition: 'transform 0.2s ease, filter 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {loading ? (
                    <span>Submitting Application to Committee...</span>
                  ) : (
                    <>
                      <span>Submit Application for {activeProg.title}</span>
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            /* Celebration Success Screen */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'linear-gradient(170deg, #181824 0%, #12121A 60%, #0D0D14 100%)',
                border: '1px solid rgba(139, 92, 246, 0.45)',
                borderRadius: 20,
                padding: '44px 32px',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.2)',
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 28px rgba(16, 185, 129, 0.35)',
                }}
              >
                <CheckCircle2 size={40} color="#FFFFFF" />
              </div>

              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#34D399',
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '4px 14px',
                  borderRadius: 9999,
                  marginBottom: 14,
                }}
              >
                APPLICATION RECORDED (DEMO SUBMISSION)
              </span>

              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: '#F5F5F7', marginBottom: 12 }}>
                Thank You, {submissionData?.name}!
              </h2>

              <p style={{ color: '#A3A3B0', fontSize: 16, maxWidth: 580, margin: '0 auto 24px', lineHeight: 1.6 }}>
                Your application for <strong style={{ color: '#FFFFFF' }}>{submissionData?.program}</strong> on behalf of <strong style={{ color: '#FFFFFF' }}>{submissionData?.company}</strong> has been successfully received.
              </p>

              {/* Application Details Receipt Card */}
              <div
                style={{
                  maxWidth: 520,
                  margin: '0 auto 32px',
                  background: '#14141B',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 14,
                  padding: '20px',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: 8 }}>
                  <span style={{ color: '#A3A3B0', fontSize: 13 }}>Reference ID:</span>
                  <span style={{ color: '#C4B5FD', fontWeight: 800, fontSize: 13 }}>{submissionData?.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: 8 }}>
                  <span style={{ color: '#A3A3B0', fontSize: 13 }}>Stage / Raise Target:</span>
                  <span style={{ color: '#F5F5F7', fontWeight: 700, fontSize: 13 }}>{submissionData?.stage} • {submissionData?.targetRaise}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#A3A3B0', fontSize: 13 }}>Status:</span>
                  <span style={{ color: '#F5B400', fontWeight: 800, fontSize: 13 }}>Under Rolling Committee Review</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border-subtle)',
                    color: '#F5F5F7',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Submit Another Application
                </button>

                <Link
                  to="/events"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 24px',
                    borderRadius: 10,
                    background: '#8B5CF6',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)',
                  }}
                >
                  <span>Explore Upcoming Summits</span>
                  <ExternalLink size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SignalDivider />
      <Footer />
    </div>
  );
}
