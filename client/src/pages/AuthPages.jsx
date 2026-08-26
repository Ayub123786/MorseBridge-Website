import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MorsebridgeLogo from '../components/MorsebridgeLogo';

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
        overflow: 'hidden',
      }}
    >
      {/* Ambient Mesh Glow */}
      <div className="ambient-mesh-glow" />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460 }}>
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
            borderRadius: 22,
            padding: '38px 34px',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
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
          color: '#F5F5F7',
          textAlign: 'center',
          marginBottom: 8,
          letterSpacing: '-0.02em',
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

      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
            Email Address
          </label>
          <input
            className="form-input"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="form-group" style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
            Password
          </label>
          <input
            className="form-input"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <div style={{ textAlign: 'right', marginBottom: 24, marginTop: 4 }}>
          <Link
            to="/reset-password"
            style={{ fontSize: 13, color: '#A78BFA', textDecoration: 'none', fontWeight: 600 }}
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: '#8B5CF6',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 12,
            padding: '14px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
            opacity: loading ? 0.7 : 1,
            transition: 'transform 0.2s ease, opacity 0.2s ease',
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: 14 }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: '#A78BFA', fontWeight: 700, textDecoration: 'none' }}>
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
          color: '#F5F5F7',
          textAlign: 'center',
          marginBottom: 8,
          letterSpacing: '-0.02em',
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
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#4ADE80',
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
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
              Email Address
            </label>
            <input
              className="form-input"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            style={{
              width: '100%',
              background: '#8B5CF6',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 12,
              padding: '14px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
            }}
          >
            Send Reset Link
          </button>
        </form>
      )}

      <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: 14 }}>
        <Link to="/login" style={{ color: '#A78BFA', fontWeight: 600, textDecoration: 'none' }}>
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
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setDone(true);
  };

  return (
    <AuthWrap>
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
        Set New Password
      </h1>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: 28, fontSize: 14 }}>
        Choose a secure password for your account.
      </p>

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

      {done ? (
        <div
          style={{
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#4ADE80',
            padding: '16px',
            borderRadius: 12,
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          ✓ Password updated successfully!
          <div style={{ marginTop: 12 }}>
            <Link to="/login" style={{ color: '#8B5CF6', fontWeight: 700 }}>
              Sign in with your new password →
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
              New Password
            </label>
            <input
              className="form-input"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="form-group" style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#E2E2E8', fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
              Confirm New Password
            </label>
            <input
              className="form-input"
              type="password"
              placeholder="Repeat password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            style={{
              width: '100%',
              background: '#8B5CF6',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 12,
              padding: '14px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
            }}
          >
            Update Password
          </button>
        </form>
      )}

      <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: 14 }}>
        <Link to="/login" style={{ color: '#A78BFA', fontWeight: 600, textDecoration: 'none' }}>
          ← Back to Sign In
        </Link>
      </p>
    </AuthWrap>
  );
}
