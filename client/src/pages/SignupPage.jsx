import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Sparkles, Building, Briefcase, Mail, User, Globe, DollarSign, Rocket, UploadCloud, FileText, X } from 'lucide-react';
import MorsebridgeLogo from '../components/MorsebridgeLogo';
import { API_BASE } from '../config/api';

const STAGE_OPTIONS = ['Pre-Seed / Ideation', 'Early Revenue ($10k–$50k MRR)', 'Growth Stage ($50k+ MRR)', 'Series A+'];
const TARGET_ROUNDS = ['Under $250K', '$250K – $500K', '$500K – $1M', '$1M – $3M', '$3M+'];

const INVESTOR_TYPES = ['Venture Capital Fund (GP/Partner)', 'Angel Syndicate / Lead Angel', 'Family Office / Multi-Family Office', 'Corporate Venture Capital (CVC)'];
const CHECK_SIZES = ['$25K – $100K', '$100K – $250K', '$250K – $1M', '$1M – $5M+'];

export default function SignupPage() {
  const [tab, setTab] = useState('startup'); // 'startup' | 'investor'
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    linkedin: '',
    stage: 'Early Revenue ($10k–$50k MRR)',
    targetRound: '$500K – $1M',
    investorType: 'Venture Capital Fund (GP/Partner)',
    checkSize: '$100K – $250K',
    notes: '',
  });

  const [deckFile, setDeckFile] = useState(null); // { name, size, data, type }
  const [fileError, setFileError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileUpload = (e) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      setFileError('File size exceeds 25MB. Please upload a smaller file or provide a DocSend/Drive link below.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const formatSize = (bytes) => {
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
      };

      setDeckFile({
        name: file.name,
        size: formatSize(file.size),
        data: reader.result,
        type: file.type || 'application/octet-stream',
      });
    };
    reader.onerror = () => {
      setFileError('Failed to read file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
        company: form.company,
        role: tab,
        website: form.website,
        linkedin: form.linkedin,
        stage: tab === 'startup' ? form.stage : '',
        targetRound: tab === 'startup' ? form.targetRound : '',
        investorType: tab === 'investor' ? form.investorType : '',
        checkSize: tab === 'investor' ? form.checkSize : '',
        notes: form.notes,
        pitchDeckName: deckFile?.name || '',
        pitchDeckData: deckFile?.data || '',
        pitchDeckSize: deckFile?.size || '',
        pitchDeckType: deckFile?.type || '',
      };

      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      // Do NOT navigate to dashboard; display clean confirmation screen
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: 'var(--bg-canvas)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px 80px',
        position: 'relative',
        overflow: 'hidden',
        color: '#F5F5F7',
      }}
    >
      <div className="ambient-mesh-glow" />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 580,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            <MorsebridgeLogo fontSize="26px" />
          </Link>
        </div>

        {/* Card Container */}
        <div
          style={{
            background: '#14141B',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            borderRadius: 24,
            padding: '40px 36px',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {submitted ? (
            /* ====================================================================
               CONFIRMATION SCREEN (NO DASHBOARD REDIRECT)
               ==================================================================== */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              style={{ textAlign: 'center', padding: '10px 0' }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: tab === 'startup' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(245, 180, 0, 0.15)',
                  border: `1.5px solid ${tab === 'startup' ? '#8B5CF6' : '#F5B400'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: `0 0 24px ${tab === 'startup' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(245, 180, 0, 0.4)'}`,
                }}
              >
                <CheckCircle2 size={36} color={tab === 'startup' ? '#8B5CF6' : '#F5B400'} />
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 12px',
                  borderRadius: 9999,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: 12,
                  fontWeight: 700,
                  color: tab === 'startup' ? '#C4B5FD' : '#F5B400',
                  marginBottom: 16,
                }}
              >
                <Sparkles size={13} />
                <span>APPLICATION RECORDED</span>
              </div>

              <h2
                style={{
                  fontSize: '1.9rem',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  color: '#FFFFFF',
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                Thank you, {form.name.split(' ')[0]}!
              </h2>

              <p style={{ color: '#A3A3B0', fontSize: 15, lineHeight: 1.65, marginBottom: 28 }}>
                Your registration has been securely saved as an{' '}
                <strong style={{ color: '#FFFFFF' }}>{tab === 'startup' ? 'Early-Stage Startup' : 'Institutional / Angel Investor'}</strong>.
                Our venture partnership team is reviewing your profile and will connect with you at{' '}
                <strong style={{ color: '#FFFFFF' }}>{form.email}</strong> within 48 hours.
              </p>

              {/* Summary Pill Box */}
              <div
                style={{
                  background: '#0A0A0F',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 16,
                  padding: '18px 20px',
                  textAlign: 'left',
                  marginBottom: 32,
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13.5 }}>
                  <div>
                    <span style={{ color: '#71717E', display: 'block', fontSize: 12 }}>Name &amp; Organization</span>
                    <span style={{ color: '#F5F5F7', fontWeight: 600 }}>{form.name} · {form.company}</span>
                  </div>
                  <div>
                    <span style={{ color: '#71717E', display: 'block', fontSize: 12 }}>Contact Email</span>
                    <span style={{ color: '#F5F5F7', fontWeight: 600 }}>{form.email}</span>
                  </div>
                  {tab === 'startup' ? (
                    <>
                      <div>
                        <span style={{ color: '#71717E', display: 'block', fontSize: 12 }}>Stage</span>
                        <span style={{ color: '#C4B5FD', fontWeight: 600 }}>{form.stage}</span>
                      </div>
                      <div>
                        <span style={{ color: '#71717E', display: 'block', fontSize: 12 }}>Target Round</span>
                        <span style={{ color: '#F5B400', fontWeight: 600 }}>{form.targetRound}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span style={{ color: '#71717E', display: 'block', fontSize: 12 }}>Investor Focus</span>
                        <span style={{ color: '#C4B5FD', fontWeight: 600 }}>{form.investorType}</span>
                      </div>
                      <div>
                        <span style={{ color: '#71717E', display: 'block', fontSize: 12 }}>Ticket Range</span>
                        <span style={{ color: '#F5B400', fontWeight: 600 }}>{form.checkSize}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link
                  to="/"
                  className="btn-magnetic-signal"
                  style={{
                    background: tab === 'startup' ? '#8B5CF6' : '#F5B400',
                    color: tab === 'startup' ? '#FFFFFF' : '#0A0A0F',
                    padding: '13px',
                    borderRadius: 12,
                    fontSize: 14.5,
                    fontWeight: 700,
                    justifyContent: 'center',
                  }}
                >
                  <span>Return to Home</span>
                  <div className="btn-light-sweep" />
                </Link>

                <a
                  href="https://morsebridge.substack.com/s/investor-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '12px',
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#F5F5F7',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <span>Explore Live Investor Data &amp; Playbooks ↗</span>
                </a>
              </div>
            </motion.div>
          ) : (
            /* ====================================================================
               SIGNUP / INTAKE FORM
               ==================================================================== */
            <div>
              <h1
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  color: '#F5F5F7',
                  textAlign: 'center',
                  marginBottom: 8,
                  letterSpacing: '-0.02em',
                }}
              >
                Join the MorseBridge Network
              </h1>
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: 24, fontSize: 14 }}>
                Submit your intake details to access targeted deal flow and investor matching.
              </p>

              {/* Role selector tabs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: 4,
                  borderRadius: 14,
                  marginBottom: 24,
                }}
              >
                <button
                  type="button"
                  onClick={() => setTab('startup')}
                  style={{
                    padding: '10px',
                    borderRadius: 10,
                    border: 'none',
                    background: tab === 'startup' ? '#8B5CF6' : 'transparent',
                    color: tab === 'startup' ? '#ffffff' : '#A3A3B0',
                    fontWeight: 700,
                    fontSize: 13.5,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: tab === 'startup' ? '0 0 16px rgba(139, 92, 246, 0.4)' : 'none',
                  }}
                >
                  🚀 I am a Startup
                </button>

                <button
                  type="button"
                  onClick={() => setTab('investor')}
                  style={{
                    padding: '10px',
                    borderRadius: 10,
                    border: 'none',
                    background: tab === 'investor' ? '#F5B400' : 'transparent',
                    color: tab === 'investor' ? '#0A0A0F' : '#A3A3B0',
                    fontWeight: 700,
                    fontSize: 13.5,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: tab === 'investor' ? '0 0 16px rgba(245, 180, 0, 0.4)' : 'none',
                  }}
                >
                  💼 I am an Investor
                </button>
              </div>

              {error && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#F87171',
                    padding: '12px 16px',
                    borderRadius: 10,
                    fontSize: 13.5,
                    marginBottom: 20,
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={submit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Alex Mercer"
                      value={form.name}
                      onChange={handle}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 10,
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="alex@company.com"
                      value={form.email}
                      onChange={handle}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 10,
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      {tab === 'startup' ? 'Startup / Company Name *' : 'Fund / Firm Name *'}
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder={tab === 'startup' ? 'Apex AI Systems' : 'Horizon Ventures'}
                      value={form.company}
                      onChange={handle}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 10,
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Website / LinkedIn URL
                    </label>
                    <input
                      type="text"
                      name="website"
                      placeholder={tab === 'startup' ? 'https://apexai.io' : 'https://linkedin.com/in/...'}
                      value={form.website}
                      onChange={handle}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 10,
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {tab === 'startup' ? (
                  /* Startup Specific Fields */
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                        Current Stage
                      </label>
                      <select
                        name="stage"
                        value={form.stage}
                        onChange={handle}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: '#0A0A0F',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F5F5F7',
                          fontSize: 13.5,
                          outline: 'none',
                        }}
                      >
                        {STAGE_OPTIONS.map((st) => (
                          <option key={st} value={st} style={{ background: '#14141B', color: '#F5F5F7' }}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                        Target Round Size
                      </label>
                      <select
                        name="targetRound"
                        value={form.targetRound}
                        onChange={handle}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: '#0A0A0F',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F5F5F7',
                          fontSize: 13.5,
                          outline: 'none',
                        }}
                      >
                        {TARGET_ROUNDS.map((tr) => (
                          <option key={tr} value={tr} style={{ background: '#14141B', color: '#F5F5F7' }}>
                            {tr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  /* Investor Specific Fields */
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                        Investor Entity Type
                      </label>
                      <select
                        name="investorType"
                        value={form.investorType}
                        onChange={handle}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: '#0A0A0F',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F5F5F7',
                          fontSize: 13.5,
                          outline: 'none',
                        }}
                      >
                        {INVESTOR_TYPES.map((it) => (
                          <option key={it} value={it} style={{ background: '#14141B', color: '#F5F5F7' }}>
                            {it}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                        Typical Check Size
                      </label>
                      <select
                        name="checkSize"
                        value={form.checkSize}
                        onChange={handle}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: '#0A0A0F',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F5F5F7',
                          fontSize: 13.5,
                          outline: 'none',
                        }}
                      >
                        {CHECK_SIZES.map((cs) => (
                          <option key={cs} value={cs} style={{ background: '#14141B', color: '#F5F5F7' }}>
                            {cs}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#E2E2E8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                    <span>{tab === 'startup' ? 'Insert Pitch Deck' : 'Sector Focus & Investment Criteria'}</span>
                    {tab === 'startup' && (
                      <span style={{ color: '#8B5CF6', fontSize: 11.5, fontWeight: 500 }}>
                        PDF, PPT, PPTX or Link
                      </span>
                    )}
                  </label>

                  {tab === 'startup' && (
                    <div style={{ marginBottom: 12 }}>
                      {!deckFile ? (
                        <label
                          htmlFor="pitch-deck-file-page"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            padding: '16px 14px',
                            borderRadius: 10,
                            border: '1.5px dashed rgba(139, 92, 246, 0.45)',
                            background: 'rgba(139, 92, 246, 0.05)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            textAlign: 'center',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#8B5CF6';
                            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.45)';
                            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <UploadCloud size={20} color="#A78BFA" />
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#F5F5F7' }}>
                              Click to attach Pitch Deck file
                            </span>
                          </div>
                          <span style={{ fontSize: 11.5, color: '#A3A3B0' }}>
                            Supported: PDF, PPT, PPTX, DOCX (Max 25MB)
                          </span>
                          <input
                            id="pitch-deck-file-page"
                            type="file"
                            accept=".pdf,.ppt,.pptx,.doc,.docx"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderRadius: 10,
                            background: 'rgba(139, 92, 246, 0.15)',
                            border: '1px solid rgba(139, 92, 246, 0.5)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                            <FileText size={20} color="#A78BFA" style={{ flexShrink: 0 }} />
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5F5F7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {deckFile.name}
                              </div>
                              <div style={{ fontSize: 11.5, color: '#C4B5FD' }}>{deckFile.size} • Attached</div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDeckFile(null)}
                            title="Remove attached file"
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#F87171',
                              cursor: 'pointer',
                              padding: 6,
                              borderRadius: 6,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <X size={15} />
                          </button>
                        </div>
                      )}

                      {fileError && (
                        <p style={{ color: '#F87171', fontSize: 12, marginTop: 6, marginBottom: 0 }}>
                          {fileError}
                        </p>
                      )}
                    </div>
                  )}

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handle}
                    rows="2"
                    placeholder={
                      tab === 'startup'
                        ? 'Or paste Pitch Deck link (Google Drive / DocSend / Loom) & elevator summary...'
                        : 'e.g. Seeking Pre-Seed to Seed AI & Fintech founders in MENA / Global...'
                    }
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: '#0A0A0F',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#F5F5F7',
                      fontSize: 13.5,
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-magnetic-signal"
                  style={{
                    width: '100%',
                    background: tab === 'startup' ? '#8B5CF6' : '#F5B400',
                    color: tab === 'startup' ? '#FFFFFF' : '#0A0A0F',
                    border: 'none',
                    borderRadius: 12,
                    padding: '14px',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    justifyContent: 'center',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <span>{loading ? 'Submitting...' : `Submit as ${tab === 'startup' ? 'Startup' : 'Investor'}`}</span>
                  <ArrowUpRight size={16} />
                  <div className="btn-light-sweep" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
