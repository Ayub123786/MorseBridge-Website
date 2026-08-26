import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const STAGES = ['Pre-Idea', 'Pre-Revenue', 'Early Revenue', 'Growth Stage', 'Series A+'];
const SECTORS = ['Fintech', 'Healthtech', 'Edtech', 'SaaS', 'E-commerce', 'AI/ML', 'Logistics', 'Proptech', 'Other'];
const RAISING = ['Under $100K', '$100K – $500K', '$500K – $1M', '$1M – $3M', '$3M – $5M', '$5M+'];

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
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '64px 0 40px', textAlign: 'center', position: 'relative' }}>
        <div className="hero-glow-light" />
        <div className="container container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 12 }}>
            Apply as a <span style={{ color: 'var(--purple-primary)' }}>Startup</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            Tell us about your startup and we'll match you with aligned investors.
          </p>

          {/* Progress */}
          {step < 4 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
              {[1, 2, 3].map((s) => (
                <div key={s} style={{
                  height: 4, width: 60, borderRadius: 2,
                  background: s <= step ? 'var(--purple-primary)' : 'var(--border-slate)',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: '0 0 80px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: 640 }}>
          {step === 4 ? (
            <div style={{
              background: '#ffffff', border: '1px solid #bbf7d0',
              borderRadius: 24, padding: '48px 36px', textAlign: 'center', boxShadow: 'var(--shadow-lg)',
            }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
              <h2 style={{ color: 'var(--purple-primary)', fontWeight: 900, fontStyle: 'italic', fontSize: 28, marginBottom: 12 }}>
                Application Submitted!
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
                Thank you for applying. Our team will review your profile and match you with relevant investors within 48 hours.
              </p>
              <button onClick={() => navigate('/')} className="btn-purple" style={{ padding: '12px 32px' }}>
                Back to Home
              </button>
            </div>
          ) : (
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-slate)',
              borderRadius: 24, padding: '40px 36px',
              boxShadow: 'var(--shadow-md)',
            }}>
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>Step 1: Founder &amp; Startup Info</h2>
                  <div className="form-group">
                    <label className="form-label">Founder Name</label>
                    <input className="form-input" name="name" value={form.name} onChange={handle} required placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Work Email</label>
                    <input className="form-input" type="email" name="email" value={form.email} onChange={handle} required placeholder="you@company.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Startup Name</label>
                    <input className="form-input" name="startup" value={form.startup} onChange={handle} required placeholder="e.g. Acme AI" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Website URL</label>
                    <input className="form-input" name="website" value={form.website} onChange={handle} placeholder="https://acme.ai" />
                  </div>
                  <button onClick={() => setStep(2)} className="btn-purple" style={{ width: '100%', padding: '14px', marginTop: 12 }}>
                    Continue to Step 2 →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>Step 2: Stage &amp; Sector</h2>
                  <div className="form-group">
                    <label className="form-label">Current Stage</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {STAGES.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => select('stage', st)}
                          style={{
                            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                            border: `1.5px solid ${form.stage === st ? 'var(--purple-primary)' : 'var(--border-slate)'}`,
                            background: form.stage === st ? 'rgba(124,58,237,0.1)' : '#ffffff',
                            color: form.stage === st ? 'var(--purple-primary)' : 'var(--text-secondary)',
                          }}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: 20 }}>
                    <label className="form-label">Sector</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {SECTORS.map((sc) => (
                        <button
                          key={sc}
                          type="button"
                          onClick={() => select('sector', sc)}
                          style={{
                            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                            border: `1.5px solid ${form.sector === sc ? 'var(--purple-primary)' : 'var(--border-slate)'}`,
                            background: form.sector === sc ? 'rgba(124,58,237,0.1)' : '#ffffff',
                            color: form.sector === sc ? 'var(--purple-primary)' : 'var(--text-secondary)',
                          }}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                    <button onClick={() => setStep(1)} className="btn-purple-outline" style={{ flex: 1, padding: '14px' }}>
                      ← Back
                    </button>
                    <button onClick={() => setStep(3)} className="btn-purple" style={{ flex: 1, padding: '14px' }}>
                      Continue to Step 3 →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>Step 3: Fundraising Goals</h2>
                  <div className="form-group">
                    <label className="form-label">Target Round Size</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {RAISING.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => select('raising', r)}
                          style={{
                            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                            border: `1.5px solid ${form.raising === r ? 'var(--purple-primary)' : 'var(--border-slate)'}`,
                            background: form.raising === r ? 'rgba(124,58,237,0.1)' : '#ffffff',
                            color: form.raising === r ? 'var(--purple-primary)' : 'var(--text-secondary)',
                          }}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: 20 }}>
                    <label className="form-label">One-Line Elevator Pitch</label>
                    <textarea className="form-textarea" name="pitch" value={form.pitch} onChange={handle} rows="3" placeholder="Briefly describe what your startup does..." />
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                    <button onClick={() => setStep(2)} className="btn-purple-outline" style={{ flex: 1, padding: '14px' }}>
                      ← Back
                    </button>
                    <button onClick={submit} className="btn-purple" style={{ flex: 1, padding: '14px' }}>
                      Submit Application ↗
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
