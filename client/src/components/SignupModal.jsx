import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Rocket, Briefcase, ArrowUpRight, UploadCloud, FileText } from 'lucide-react';
import MorsebridgeLogo from './MorsebridgeLogo';
import { API_BASE } from '../config/api';

const STAGE_OPTIONS = [
  'Pre-Seed / Ideation',
  'Early Revenue ($10k–$50k MRR)',
  'Growth Stage ($50k+ MRR)',
  'Series A+'
];

const TARGET_ROUNDS = [
  'Under $250K',
  '$250K – $500K',
  '$500K – $1M',
  '$1M – $3M',
  '$3M+'
];

const INVESTOR_TYPES = [
  'Venture Capital Fund (GP/Partner)',
  'Angel Syndicate / Lead Angel',
  'Family Office / Multi-Family Office',
  'Corporate Venture Capital (CVC)'
];

const CHECK_SIZES = [
  '$25K – $100K',
  '$100K – $250K',
  '$250K – $1M',
  '$1M – $5M+'
];

export default function SignupModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('startup'); // 'startup' | 'investor'
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
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

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'rgba(5, 5, 8, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 560,
            maxHeight: '92vh',
            overflowY: 'auto',
            background: '#14141B',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 24,
            padding: '36px 32px',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.85), 0 0 32px rgba(139, 92, 246, 0.15)',
            position: 'relative',
            color: '#F5F5F7',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#A3A3B0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#A3A3B0';
            }}
          >
            <X size={18} />
          </button>

          {submitted ? (
            /* Confirmation Screen */
            <div style={{ textAlign: 'center', padding: '16px 8px 8px' }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  background: tab === 'startup' ? 'rgba(139, 92, 246, 0.18)' : 'rgba(245, 180, 0, 0.18)',
                  border: `1.5px solid ${tab === 'startup' ? '#8B5CF6' : '#F5B400'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  boxShadow: `0 0 24px ${tab === 'startup' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(245, 180, 0, 0.4)'}`,
                }}
              >
                <CheckCircle2 size={34} color={tab === 'startup' ? '#8B5CF6' : '#F5B400'} />
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 12px',
                  borderRadius: 9999,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: 12,
                  fontWeight: 700,
                  color: tab === 'startup' ? '#C4B5FD' : '#F5B400',
                  marginBottom: 14,
                }}
              >
                <Sparkles size={13} />
                <span>APPLICATION RECEIVED</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, fontStyle: 'italic', color: '#FFFFFF', marginBottom: 10 }}>
                Welcome to MorseBridge, {form.name.split(' ')[0]}!
              </h2>

              <p style={{ color: '#A3A3B0', fontSize: 14.5, lineHeight: 1.6, marginBottom: 24 }}>
                Your intake has been securely saved in our venture database as an{' '}
                <strong style={{ color: '#FFFFFF' }}>{tab === 'startup' ? 'Early-Stage Startup' : 'Institutional / Angel Investor'}</strong>.
                Our team is reviewing your profile and will connect with you via email within 48 hours for targeted introductions.
              </p>

              {/* Summary info box */}
              <div
                style={{
                  background: '#0A0A0F',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 14,
                  padding: '16px 18px',
                  textAlign: 'left',
                  marginBottom: 26,
                  fontSize: 13,
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <span style={{ color: '#71717E', display: 'block', fontSize: 11.5 }}>Name &amp; Organization</span>
                    <span style={{ color: '#F5F5F7', fontWeight: 600 }}>{form.name} · {form.company}</span>
                  </div>
                  <div>
                    <span style={{ color: '#71717E', display: 'block', fontSize: 11.5 }}>Contact Email</span>
                    <span style={{ color: '#F5F5F7', fontWeight: 600 }}>{form.email}</span>
                  </div>
                  {tab === 'startup' ? (
                    <>
                      <div>
                        <span style={{ color: '#71717E', display: 'block', fontSize: 11.5 }}>Stage</span>
                        <span style={{ color: '#C4B5FD', fontWeight: 600 }}>{form.stage}</span>
                      </div>
                      <div>
                        <span style={{ color: '#71717E', display: 'block', fontSize: 11.5 }}>Target Round</span>
                        <span style={{ color: '#F5B400', fontWeight: 600 }}>{form.targetRound}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span style={{ color: '#71717E', display: 'block', fontSize: 11.5 }}>Investor Focus</span>
                        <span style={{ color: '#C4B5FD', fontWeight: 600 }}>{form.investorType}</span>
                      </div>
                      <div>
                        <span style={{ color: '#71717E', display: 'block', fontSize: 11.5 }}>Ticket Range</span>
                        <span style={{ color: '#F5B400', fontWeight: 600 }}>{form.checkSize}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  onClick={onClose}
                  className="btn-magnetic-signal"
                  style={{
                    width: '100%',
                    background: tab === 'startup' ? '#8B5CF6' : '#F5B400',
                    color: tab === 'startup' ? '#FFFFFF' : '#0A0A0F',
                    padding: '12px',
                    borderRadius: 12,
                    fontSize: 14.5,
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    justifyContent: 'center',
                  }}
                >
                  <span>Continue Browsing Website</span>
                  <div className="btn-light-sweep" />
                </button>

                <a
                  href="https://morsebridge.substack.com/s/investor-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '11px',
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#F5F5F7',
                    fontSize: 13.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <span>Explore Live Investor Data &amp; Playbooks ↗</span>
                </a>
              </div>
            </div>
          ) : (
            /* Signup Form */
            <div>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <MorsebridgeLogo fontSize="22px" />
                <h2
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    color: '#F5F5F7',
                    marginTop: 12,
                    marginBottom: 6,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Join the Venture Network
                </h2>
                <p style={{ color: '#A3A3B0', fontSize: 13.5, margin: 0 }}>
                  Enter your details to receive pre-screened deal flow &amp; institutional matching.
                </p>
              </div>

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
                  marginBottom: 20,
                }}
              >
                <button
                  type="button"
                  onClick={() => setTab('startup')}
                  style={{
                    padding: '9px',
                    borderRadius: 10,
                    border: 'none',
                    background: tab === 'startup' ? '#8B5CF6' : 'transparent',
                    color: tab === 'startup' ? '#ffffff' : '#A3A3B0',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: tab === 'startup' ? '0 0 14px rgba(139, 92, 246, 0.4)' : 'none',
                  }}
                >
                  🚀 I am a Startup
                </button>

                <button
                  type="button"
                  onClick={() => setTab('investor')}
                  style={{
                    padding: '9px',
                    borderRadius: 10,
                    border: 'none',
                    background: tab === 'investor' ? '#F5B400' : 'transparent',
                    color: tab === 'investor' ? '#0A0A0F' : '#A3A3B0',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: tab === 'investor' ? '0 0 14px rgba(245, 180, 0, 0.4)' : 'none',
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
                    padding: '10px 14px',
                    borderRadius: 10,
                    fontSize: 13,
                    marginBottom: 16,
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={submit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', color: '#E2E2E8', fontSize: 12.5, fontWeight: 600, marginBottom: 5 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Alex Mercer"
                      value={form.name}
                      onChange={handle}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F5F7',
                        fontSize: 13.5,
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#E2E2E8', fontSize: 12.5, fontWeight: 600, marginBottom: 5 }}>
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
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F5F7',
                        fontSize: 13.5,
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', color: '#E2E2E8', fontSize: 12.5, fontWeight: 600, marginBottom: 5 }}>
                      {tab === 'startup' ? 'Startup Name *' : 'Fund / Firm Name *'}
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder={tab === 'startup' ? 'Apex AI Systems' : 'Horizon Capital'}
                      value={form.company}
                      onChange={handle}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F5F7',
                        fontSize: 13.5,
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#E2E2E8', fontSize: 12.5, fontWeight: 600, marginBottom: 5 }}>
                      Website / LinkedIn
                    </label>
                    <input
                      type="text"
                      name="website"
                      placeholder={tab === 'startup' ? 'https://apexai.io' : 'https://linkedin.com/in/...'}
                      value={form.website}
                      onChange={handle}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F5F7',
                        fontSize: 13.5,
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {tab === 'startup' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: 'block', color: '#E2E2E8', fontSize: 12.5, fontWeight: 600, marginBottom: 5 }}>
                        Current Stage
                      </label>
                      <select
                        name="stage"
                        value={form.stage}
                        onChange={handle}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 10,
                          background: '#0A0A0F',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F5F5F7',
                          fontSize: 13,
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
                      <label style={{ display: 'block', color: '#E2E2E8', fontSize: 12.5, fontWeight: 600, marginBottom: 5 }}>
                        Target Round Size
                      </label>
                      <select
                        name="targetRound"
                        value={form.targetRound}
                        onChange={handle}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 10,
                          background: '#0A0A0F',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F5F5F7',
                          fontSize: 13,
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
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: 'block', color: '#E2E2E8', fontSize: 12.5, fontWeight: 600, marginBottom: 5 }}>
                        Entity Type
                      </label>
                      <select
                        name="investorType"
                        value={form.investorType}
                        onChange={handle}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 10,
                          background: '#0A0A0F',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F5F5F7',
                          fontSize: 13,
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
                      <label style={{ display: 'block', color: '#E2E2E8', fontSize: 12.5, fontWeight: 600, marginBottom: 5 }}>
                        Check Size
                      </label>
                      <select
                        name="checkSize"
                        value={form.checkSize}
                        onChange={handle}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 10,
                          background: '#0A0A0F',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F5F5F7',
                          fontSize: 13,
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

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#E2E2E8', fontSize: 12.5, fontWeight: 600, marginBottom: 6 }}>
                    <span>{tab === 'startup' ? 'Insert Pitch Deck' : 'Sector Focus & Investment Criteria'}</span>
                    {tab === 'startup' && (
                      <span style={{ color: '#8B5CF6', fontSize: 11, fontWeight: 500 }}>
                        PDF, PPT, PPTX or Link
                      </span>
                    )}
                  </label>

                  {tab === 'startup' && (
                    <div style={{ marginBottom: 10 }}>
                      {!deckFile ? (
                        <label
                          htmlFor="pitch-deck-file-modal"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            padding: '12px 14px',
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
                            <UploadCloud size={18} color="#A78BFA" />
                            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#F5F5F7' }}>
                              Click to attach Pitch Deck file
                            </span>
                          </div>
                          <span style={{ fontSize: 11, color: '#A3A3B0' }}>
                            Supported: PDF, PPT, PPTX, DOCX (Max 25MB)
                          </span>
                          <input
                            id="pitch-deck-file-modal"
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
                            padding: '10px 14px',
                            borderRadius: 10,
                            background: 'rgba(139, 92, 246, 0.15)',
                            border: '1px solid rgba(139, 92, 246, 0.5)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                            <FileText size={18} color="#A78BFA" style={{ flexShrink: 0 }} />
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F5F5F7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {deckFile.name}
                              </div>
                              <div style={{ fontSize: 11, color: '#C4B5FD' }}>{deckFile.size} • Attached</div>
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
                              padding: 5,
                              borderRadius: 6,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}

                      {fileError && (
                        <p style={{ color: '#F87171', fontSize: 11.5, marginTop: 5, marginBottom: 0 }}>
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
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: '#0A0A0F',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#F5F5F7',
                      fontSize: 13,
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
                    padding: '13px',
                    fontSize: 14.5,
                    fontWeight: 700,
                    cursor: 'pointer',
                    justifyContent: 'center',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <span>{loading ? 'Submitting Application...' : `Join as ${tab === 'startup' ? 'Startup' : 'Investor'}`}</span>
                  <ArrowUpRight size={16} />
                  <div className="btn-light-sweep" />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
