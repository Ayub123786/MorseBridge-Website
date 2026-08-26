import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MorsebridgeLogo from '../components/MorsebridgeLogo';

export default function SignupPage() {
  const [tab, setTab] = useState('startup'); // 'startup' | 'investor'
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ ...form, role: tab });
      navigate('/dashboard');
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
        padding: '80px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="ambient-mesh-glow" />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 500,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            <MorsebridgeLogo fontSize="26px" />
          </Link>
        </div>

        {/* Dark Glass Card */}
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
          <h1
            style={{
              fontSize: '1.9rem',
              fontWeight: 900,
              fontStyle: 'italic',
              color: '#F5F5F7',
              textAlign: 'center',
              marginBottom: 8,
              letterSpacing: '-0.02em',
            }}
          >
            Create Your Account
          </h1>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: 28, fontSize: 14 }}>
            Join the leading founder &amp; investor matchmaking platform.
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
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
                Full Name
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
                  padding: '13px 16px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F5F5F7',
                  fontSize: 14.5,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
                Work Email
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
                  padding: '13px 16px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F5F5F7',
                  fontSize: 14.5,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
                {tab === 'startup' ? 'Startup / Company Name' : 'Fund / Firm Name'}
              </label>
              <input
                type="text"
                name="company"
                placeholder={tab === 'startup' ? 'Acme AI, Inc.' : 'Horizon Capital'}
                value={form.company}
                onChange={handle}
                required
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F5F5F7',
                  fontSize: 14.5,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 26 }}>
              <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handle}
                required
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F5F5F7',
                  fontSize: 14.5,
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
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
                boxShadow: tab === 'startup' ? '0 0 20px rgba(139, 92, 246, 0.4)' : '0 0 20px rgba(245, 180, 0, 0.4)',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? 'Creating account...' : `Sign Up as ${tab === 'startup' ? 'Startup' : 'Investor'}`}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: 14 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#A78BFA', fontWeight: 700, textDecoration: 'none' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
