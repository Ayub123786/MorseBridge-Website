import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ── Shared Auth Card Wrapper ── */
function AuthWrap({ children }) {
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
      {/* Soft Light Theme Glow */}
      <div className="hero-glow-light" />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460 }}>
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
            borderRadius: 20,
            padding: '36px 32px',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Login Page ── */
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Authentication failed');
    }
  };

  return (
    <AuthWrap>
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
        Welcome Back
      </h1>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: 28, fontSize: 14 }}>
        Enter your credentials to access your dashboard.
      </p>

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

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ textAlign: 'right', marginBottom: 24, marginTop: -10 }}>
          <Link
            to="/reset-password"
            style={{ fontSize: 13, color: 'var(--purple-primary)', textDecoration: 'none', fontWeight: 600 }}
          >
            Forgot password?
          </Link>
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
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: 14 }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--purple-primary)', fontWeight: 700, textDecoration: 'none' }}>
          Sign Up
        </Link>
      </p>
    </AuthWrap>
  );
}

/* ── Reset Password Page ── */
export function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <AuthWrap>
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
        Reset Password
      </h1>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: 28, fontSize: 14 }}>
        Enter your email to receive a reset link.
      </p>

      {sent ? (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            padding: '16px',
            borderRadius: 12,
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          ✓ If that email exists, a reset link has been sent. Check your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-purple"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}
          >
            Send Reset Link
          </button>
        </form>
      )}

      <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: 14 }}>
        <Link to="/login" style={{ color: 'var(--purple-primary)', fontWeight: 600, textDecoration: 'none' }}>
          ← Back to Sign In
        </Link>
      </p>
    </AuthWrap>
  );
}

/* ── Update Password Page ── */
export function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirm) setDone(true);
  };

  return (
    <AuthWrap>
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
        Set New Password
      </h1>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: 28, fontSize: 14 }}>
        Choose a secure password for your account.
      </p>

      {done ? (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            padding: '16px',
            borderRadius: 12,
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          ✓ Password updated successfully.{' '}
          <Link to="/login" style={{ color: 'var(--purple-primary)', fontWeight: 700 }}>
            Sign In now →
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-purple"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}
          >
            Update Password
          </button>
        </form>
      )}
    </AuthWrap>
  );
}
