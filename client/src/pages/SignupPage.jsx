import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
      }}
    >
      <div className="hero-glow-light" />

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
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: "'Montserrat', Arial, sans-serif",
                fontSize: 22,
                fontWeight: 400,
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
              }}
            >
              MORSE<span style={{ fontWeight: 900 }}>BRIDGE</span>
              <span style={{ color: 'var(--gold)', fontWeight: 900 }}>.</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--border-slate)',
            borderRadius: 24,
            padding: '40px 36px',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <h1
            style={{
              fontSize: '1.9rem',
              fontWeight: 900,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              textAlign: 'center',
              marginBottom: 8,
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
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-slate)',
              borderRadius: 12,
              padding: 4,
              marginBottom: 24,
            }}
          >
            <button
              type="button"
              onClick={() => setTab('startup')}
              style={{
                padding: '10px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: tab === 'startup' ? '#ffffff' : 'transparent',
                color: tab === 'startup' ? 'var(--purple-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: 14,
                boxShadow: tab === 'startup' ? 'var(--shadow-xs)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              🚀 I am a Startup
            </button>
            <button
              type="button"
              onClick={() => setTab('investor')}
              style={{
                padding: '10px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: tab === 'investor' ? '#ffffff' : 'transparent',
                color: tab === 'investor' ? 'var(--gold)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: 14,
                boxShadow: tab === 'investor' ? 'var(--shadow-xs)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              💰 I am an Investor
            </button>
          </div>

          {error && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
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
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                name="name"
                value={form.name}
                onChange={handle}
                required
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Work Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handle}
                required
                placeholder="you@company.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">{tab === 'startup' ? 'Startup Name' : 'Firm / Angel Name'}</label>
              <input
                className="form-input"
                name="company"
                value={form.company}
                onChange={handle}
                required
                placeholder={tab === 'startup' ? 'e.g. Acme Health' : 'e.g. Atlas Ventures'}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                value={form.password}
                onChange={handle}
                required
                placeholder="Min. 8 characters"
              />
            </div>

            <button
              type="submit"
              className="btn-purple"
              disabled={loading}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px',
                fontSize: 15,
                opacity: loading ? 0.7 : 1,
                marginTop: 8,
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account ↗'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: 14 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--purple-primary)', fontWeight: 700, textDecoration: 'none' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
