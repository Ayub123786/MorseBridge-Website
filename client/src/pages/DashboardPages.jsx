import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SIDEBAR_ITEMS = [
  { label: 'Overview', icon: '🏠', path: '/dashboard' },
  { label: 'Resources', icon: '📚', path: '/dashboard/resources' },
  { label: 'Get Featured', icon: '✨', path: '/dashboard/get-featured' },
  { label: 'Advisory', icon: '🧭', path: '/dashboard/advisory' },
  { label: 'Events', icon: '🎤', path: '/dashboard/events' },
];

function DashboardSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="db-sidebar">
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', marginBottom: 24, display: 'block' }}>
        <span style={{
          fontFamily: "'Montserrat', Arial, sans-serif",
          fontSize: 17, fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '0.04em',
        }}>
          MORSE<span style={{ fontWeight: 900 }}>BRIDGE</span>
          <span style={{ color: 'var(--gold)', fontWeight: 900 }}>.</span>
        </span>
      </Link>

      {/* User info */}
      <div style={{
        background: 'rgba(124,58,237,0.06)',
        border: '1px solid var(--border-purple)',
        borderRadius: 12, padding: '14px 16px', marginBottom: 20,
      }}>
        <div style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--text-primary)' }}>{user?.name || 'Founder'}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{user?.email}</div>
        <div style={{ marginTop: 8 }}>
          <span className="mb-badge mb-badge-gold" style={{ fontSize: 10, padding: '2px 8px' }}>
            {user?.plan || 'Founder Pro'}
          </span>
        </div>
      </div>

      {/* Nav items */}
      {SIDEBAR_ITEMS.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`db-sidebar-item${location.pathname === item.path ? ' active' : ''}`}
        >
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          {item.label}
        </Link>
      ))}

      {/* Sign out */}
      <button
        onClick={() => { logout(); navigate('/'); }}
        className="db-sidebar-item"
        style={{
          marginTop: 'auto', marginBottom: 0, paddingTop: 32,
          color: '#ef4444', background: 'none', border: 'none',
          cursor: 'pointer', width: '100%', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 16 }}>🚪</span> Sign Out
      </button>
    </div>
  );
}

export function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <main className="db-main">{children}</main>
    </div>
  );
}

/* Stat card */
function StatCard({ label, value, sub, color }) {
  return (
    <div className="mb-card" style={{ padding: '22px 24px' }}>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: color || 'var(--purple-primary)', fontStyle: 'italic' }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

/* ── Dashboard Overview ── */
export function DashboardOverview() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 8 }}>
          Welcome back, {user?.name?.split(' ')[0] || 'Founder'} 👋
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
          Your member portal for investor matching, resources, and advisory sessions.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Membership Plan" value={user?.plan || 'Founder Pro'} sub="✅ Full Access" color="var(--purple-primary)" />
        <StatCard label="Resources Available" value="12+" sub="Templates & Guides" color="var(--gold)" />
        <StatCard label="Upcoming Events" value="3" sub="MENA Region" color="#059669" />
      </div>

      {/* Quick Links */}
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Quick Actions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { icon: '📊', title: 'Download CFO Model', desc: 'Access the 5-Minute CFO Model template', path: '/dashboard/resources' },
          { icon: '✨', title: 'Get Featured', desc: 'Apply to be spotlighted to investors', path: '/dashboard/get-featured' },
          { icon: '🧭', title: 'Book Advisory', desc: 'Schedule a 1-on-1 session with an advisor', path: '/dashboard/advisory' },
          { icon: '🎤', title: 'Register for Events', desc: 'View and register for upcoming summits', path: '/dashboard/events' },
        ].map((action) => (
          <Link
            key={action.title}
            to={action.path}
            className="mb-card"
            style={{ textDecoration: 'none', display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px 22px' }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: 'rgba(124,58,237,0.08)', border: '1px solid var(--border-purple)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>
              {action.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, fontSize: 15 }}>{action.title}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{action.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}

/* ── Dashboard Resources ── */
export function DashboardResources() {
  const RESOURCES = [
    { name: '5-Minute CFO Model (Excel)', type: 'Excel', size: '2.4 MB', icon: '📊', color: '#10b981' },
    { name: '5-Minute CFO Model (Google Sheets)', type: 'Sheets', size: 'Online', icon: '📋', color: '#3b82f6' },
    { name: 'YC-Standard Pitch Deck Template', type: 'PPT', size: '4.1 MB', icon: '📄', color: '#f59e0b' },
    { name: 'Investor Outreach Email Templates', type: 'PDF', size: '0.8 MB', icon: '✉️', color: '#8b5cf6' },
    { name: 'Due Diligence Checklist', type: 'PDF', size: '1.2 MB', icon: '✅', color: '#ec4899' },
    { name: 'Cap Table Template', type: 'Excel', size: '1.8 MB', icon: '📈', color: '#f5c518' },
    { name: 'Term Sheet Guide (MENA Edition)', type: 'PDF', size: '2.0 MB', icon: '📝', color: '#14b8a6' },
    { name: 'Startup Legal Docs Bundle', type: 'ZIP', size: '8.3 MB', icon: '⚖️', color: '#6366f1' },
  ];

  return (
    <DashboardLayout>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 8 }}>Resources</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Download templates, guides, and tools for your fundraising journey.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {RESOURCES.map((r) => (
          <div key={r.name} className="mb-card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: 'var(--bg-tertiary)', border: '1px solid var(--border-slate)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>
              {r.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 15 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{r.type} · {r.size}</div>
            </div>
            <button className="btn-purple" style={{ fontSize: 13, padding: '8px 18px', flexShrink: 0 }}>
              Download
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

/* ── Dashboard Get Featured ── */
export function DashboardGetFeatured() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ startup: '', website: '', pitch: '', ask: '' });

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <DashboardLayout>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 8 }}>Get Featured</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
        Submit your startup to be spotlighted across our investor newsletter and demo events.
      </p>

      <div style={{ background: '#14141B', border: '1px solid var(--border-subtle)', borderRadius: 20, padding: 32, maxWidth: 640, boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
            <h3 style={{ color: '#F5F5F7', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Submission Received!</h3>
            <p style={{ color: '#A3A3B0', fontSize: 14 }}>Our team will review your profile and contact you within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Startup Name</label>
              <input style={{ width: '100%', padding: '12px 16px', background: '#0A0A0F', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 10, color: '#F5F5F7', outline: 'none' }} name="startup" value={form.startup} onChange={handle} required placeholder="Acme Health" />
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Website URL</label>
              <input style={{ width: '100%', padding: '12px 16px', background: '#0A0A0F', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 10, color: '#F5F5F7', outline: 'none' }} name="website" value={form.website} onChange={handle} required placeholder="https://acmehealth.com" />
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>One-Line Pitch</label>
              <input style={{ width: '100%', padding: '12px 16px', background: '#0A0A0F', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 10, color: '#F5F5F7', outline: 'none' }} name="pitch" value={form.pitch} onChange={handle} required placeholder="What problem does your startup solve in 1 sentence?" />
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', color: '#F5F5F7', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Current Ask / Round Size</label>
              <input style={{ width: '100%', padding: '12px 16px', background: '#0A0A0F', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 10, color: '#F5F5F7', outline: 'none' }} name="ask" value={form.ask} onChange={handle} placeholder="e.g. Raising $750k Seed on SAFE" />
            </div>
            <button type="submit" className="btn-magnetic-signal" style={{ width: '100%', padding: '13px', fontSize: 14.5, background: '#8B5CF6', color: '#FFFFFF', borderRadius: 12, border: 'none', cursor: 'pointer', justifyContent: 'center' }}>
              <span>Submit for Feature</span>
            </button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ── Dashboard Advisory ── */
export function DashboardAdvisory() {
  return (
    <DashboardLayout>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, fontStyle: 'italic', color: '#F5F5F7', marginBottom: 8 }}>Advisory Sessions</h1>
      <p style={{ color: '#A3A3B0', marginBottom: 32 }}>Book 1-on-1 strategic advisory sessions with ecosystem mentors.</p>

      <div style={{ background: '#14141B', border: '1px solid var(--border-subtle)', borderRadius: 20, padding: 36, maxWidth: 640, boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)' }}>
        <h3 style={{ color: '#F5F5F7', fontSize: 18, fontWeight: 800, marginBottom: 12 }}>Schedule a Call with Muhammad Ayub</h3>
        <p style={{ color: '#A3A3B0', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          Cover pitch narrative refinement, data room audit, investor targeting strategy, and market expansion into UAE and KSA.
        </p>
        <a
          href="https://cal.com/morsebridge/30-min-intro"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-magnetic-signal"
          style={{ display: 'inline-flex', padding: '12px 28px', fontSize: 14, background: '#8B5CF6', color: '#FFFFFF', borderRadius: 12 }}
        >
          <span>Book 30-Min Session on Cal.com ↗</span>
        </a>
      </div>
    </DashboardLayout>
  );
}

/* ── Dashboard Events ── */
export function DashboardEvents() {
  const EVENTS = [
    { title: 'Dubai Rising 2026', date: 'November 2026', type: 'Flagship Summit', status: 'Registered' },
    { title: 'Global Fundraising Boot Camp', date: 'Monthly', type: 'Workshop Cohort', status: 'Available' },
    { title: 'Riyadh Rising 2026', date: 'Late 2026', type: 'Summit', status: 'Available' },
  ];

  return (
    <DashboardLayout>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 8 }}>Events</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Access exclusive events and manage your registrations.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {EVENTS.map((e) => (
          <div key={e.title} className="mb-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 16 }}>{e.title}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 3 }}>{e.type} · {e.date}</div>
            </div>
            <a
              href="https://www.eventbrite.co.uk/o/morse-bridge-78875439043"
              target="_blank"
              rel="noopener noreferrer"
              className={e.status === 'Registered' ? 'btn-purple-outline' : 'btn-purple'}
              style={{ fontSize: 13, padding: '8px 20px' }}
            >
              {e.status === 'Registered' ? 'View Ticket ↗' : 'Register ↗'}
            </a>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
