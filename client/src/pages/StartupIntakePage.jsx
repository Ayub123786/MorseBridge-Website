import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, ArrowUpRight, CheckCircle2, Sparkles, Building, DollarSign, Target } from 'lucide-react';
import Footer from '../components/Footer';

const STAGES = ['Pre-Idea', 'Pre-Revenue', 'Early Revenue ($10k-$50k MRR)', 'Growth Stage ($50k+ MRR)', 'Series A+'];
const SECTORS = ['Fintech', 'AI & Agentic Systems', 'B2B SaaS', 'Healthtech', 'E-commerce', 'Climate & Energy', 'Proptech', 'Other'];
const RAISING = ['Under $250K', '$250K – $500K', '$500K – $1M', '$1M – $3M', '$3M – $5M', '$5M+'];

export default function StartupIntakePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', startup: '', website: '', stage: '', sector: '',
    raising: '', pitch: '', problem: '', traction: '',
  });

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const select = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const submit = (e) => { e.preventDefault(); setStep(4); };

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
            <Rocket size={14} color="#C4B5FD" />
            <span className="font-data" style={{ fontSize: 12.5, color: '#C4B5FD', letterSpacing: '0.06em' }}>
              CAPITAL ACCESS INTAKE
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: 16,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E2E8 70%, #A3A3B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Apply as a <span style={{ color: '#8B5CF6', WebkitTextFillColor: '#8B5CF6' }}>Startup</span>
          </h1>

          <p style={{ color: '#A3A3B0', fontSize: 16, maxWidth: 580, margin: '0 auto 28px', lineHeight: 1.6 }}>
            Tell us about your venture, unit economics, and target round. We will evaluate your deck and connect you with aligned venture capital funds.
          </p>

          {/* Progress Indicator */}
          {step < 4 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 24 }}>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  style={{
                    height: 5,
                    width: 70,
                    borderRadius: 999,
                    background: s <= step ? '#8B5CF6' : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: s <= step ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Form Area */}
      <section style={{ padding: '0 0 100px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: 660 }}>
          {step === 4 ? (
            <div
              style={{
                background: '#14141B',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                borderRadius: 24,
                padding: '54px 36px',
                textAlign: 'center',
                boxShadow: '0 16px 48px rgba(139, 92, 246, 0.2)',
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
              <h2 style={{ color: '#F5F5F7', fontWeight: 900, fontSize: 28, marginBottom: 12 }}>
                Application Submitted!
              </h2>
              <p style={{ color: '#A3A3B0', fontSize: 15.5, lineHeight: 1.7, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
                Thank you for applying. Our venture partners will audit your metrics and reach out within 48 hours for your matchmaking roadmap.
              </p>
              <button
                onClick={() => navigate('/')}
                className="btn-magnetic-signal"
                style={{
                  background: '#8B5CF6',
                  color: '#FFFFFF',
                  padding: '13px 34px',
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span>Back to Home</span>
                <div className="btn-light-sweep" />
              </button>
            </div>
          ) : (
            <div
              style={{
                background: '#14141B',
                border: '1px solid var(--border-subtle)',
                borderRadius: 24,
                padding: '40px 36px',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
              }}
            >
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: 21, fontWeight: 800, color: '#F5F5F7', marginBottom: 24 }}>
                    Step 1: Founder &amp; Startup Info
                  </h2>

                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Founder Full Name</label>
                    <input
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                      name="name"
                      value={form.name}
                      onChange={handle}
                      required
                      placeholder="e.g. Alex Morgan"
                    />
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Work Email</label>
                    <input
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handle}
                      required
                      placeholder="alex@company.com"
                    />
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Startup Name</label>
                    <input
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                      name="startup"
                      value={form.startup}
                      onChange={handle}
                      required
                      placeholder="e.g. Nexus AI"
                    />
                  </div>

                  <div style={{ marginBottom: 26 }}>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Website / Deck Link</label>
                    <input
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                      }}
                      name="website"
                      value={form.website}
                      onChange={handle}
                      placeholder="https://nexusai.io"
                    />
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="btn-magnetic-signal"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: 15,
                      fontWeight: 700,
                      background: '#8B5CF6',
                      color: '#FFFFFF',
                      borderRadius: 12,
                      border: 'none',
                      cursor: 'pointer',
                      justifyContent: 'center',
                    }}
                  >
                    <span>Continue to Step 2</span>
                    <ArrowUpRight size={16} />
                    <div className="btn-light-sweep" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: 21, fontWeight: 800, color: '#F5F5F7', marginBottom: 24 }}>
                    Step 2: Stage &amp; Sector
                  </h2>

                  <div style={{ marginBottom: 22 }}>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Current Stage</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {STAGES.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => select('stage', st)}
                          style={{
                            padding: '9px 16px',
                            borderRadius: 10,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            border: `1.5px solid ${form.stage === st ? '#8B5CF6' : 'rgba(255, 255, 255, 0.1)'}`,
                            background: form.stage === st ? 'rgba(139, 92, 246, 0.2)' : '#0A0A0F',
                            color: form.stage === st ? '#FFFFFF' : '#A3A3B0',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 26 }}>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Industry / Sector</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {SECTORS.map((sc) => (
                        <button
                          key={sc}
                          type="button"
                          onClick={() => select('sector', sc)}
                          style={{
                            padding: '9px 16px',
                            borderRadius: 10,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            border: `1.5px solid ${form.sector === sc ? '#8B5CF6' : 'rgba(255, 255, 255, 0.1)'}`,
                            background: form.sector === sc ? 'rgba(139, 92, 246, 0.2)' : '#0A0A0F',
                            color: form.sector === sc ? '#FFFFFF' : '#A3A3B0',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                    <button
                      onClick={() => setStep(1)}
                      style={{
                        flex: 1,
                        padding: '13px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F5F7',
                        borderRadius: 12,
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="btn-magnetic-signal"
                      style={{
                        flex: 2,
                        padding: '13px',
                        background: '#8B5CF6',
                        color: '#FFFFFF',
                        borderRadius: 12,
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: 14.5,
                        justifyContent: 'center',
                      }}
                    >
                      <span>Continue to Step 3</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: 21, fontWeight: 800, color: '#F5F5F7', marginBottom: 24 }}>
                    Step 3: Fundraising Target
                  </h2>

                  <div style={{ marginBottom: 22 }}>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Target Round Size</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {RAISING.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => select('raising', r)}
                          style={{
                            padding: '9px 16px',
                            borderRadius: 10,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            border: `1.5px solid ${form.raising === r ? '#8B5CF6' : 'rgba(255, 255, 255, 0.1)'}`,
                            background: form.raising === r ? 'rgba(139, 92, 246, 0.2)' : '#0A0A0F',
                            color: form.raising === r ? '#FFFFFF' : '#A3A3B0',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 26 }}>
                    <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>One-Line Elevator Pitch &amp; Traction</label>
                    <textarea
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0A0A0F',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        color: '#F5F5F7',
                        fontSize: 14,
                        outline: 'none',
                        resize: 'vertical',
                      }}
                      name="pitch"
                      value={form.pitch}
                      onChange={handle}
                      rows="3"
                      placeholder="Briefly describe what your venture does, current MRR/traction, and key milestones..."
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                    <button
                      onClick={() => setStep(2)}
                      style={{
                        flex: 1,
                        padding: '13px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F5F7',
                        borderRadius: 12,
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={submit}
                      className="btn-magnetic-signal"
                      style={{
                        flex: 2,
                        padding: '13px',
                        background: '#8B5CF6',
                        color: '#FFFFFF',
                        borderRadius: 12,
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: 14.5,
                        justifyContent: 'center',
                      }}
                    >
                      <span>Submit Application</span>
                      <ArrowUpRight size={16} />
                      <div className="btn-light-sweep" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
