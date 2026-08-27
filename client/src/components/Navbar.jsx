import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import MorsebridgeLogo from './MorsebridgeLogo';

const NAV_LINKS = [
  { label: 'Home', href: '/', isExternal: false },
  { label: 'What We Do', href: '/#what-we-do', isExternal: false },
  { label: 'Products', href: '/products', isExternal: false },
  { label: 'Events', href: '/custom-events', isExternal: false },
  { label: 'Substack', href: '/#substack', isExternal: false },
  { label: 'Blog', href: '/blog', isExternal: false },
  { label: 'Podcast', href: 'https://youtube.com/@FoundersTalkwithAyub', isExternal: true },
  { label: "FAQ's", href: '/#faqs', isExternal: false },
];

export default function Navbar({ onOpenSignup }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80);
      }
    }
  }, [location.pathname, location.hash]);

  const handleNavClick = (href, isExternal) => {
    if (isExternal) return;
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      if (location.pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = (link) => {
    if (link.isExternal) return false;
    if (link.href === '/') return location.pathname === '/' && !location.hash;
    if (link.href.startsWith('/#')) return location.hash === link.href.replace('/', '');
    return location.pathname === link.href || location.pathname.startsWith(`${link.href}/`);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(10, 10, 15, 0.88)' : 'rgba(10, 10, 15, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '12px 0' : '16px 0',
        }}
      >
        <div style={{ maxWidth: 1380, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            {/* Logo on Left */}
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <MorsebridgeLogo fontSize="22px" />
            </Link>

            {/* Desktop Navigation Links */}
            <div
              className="desktop-nav-menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                return (
                  <div key={link.label} style={{ position: 'relative', whiteSpace: 'nowrap' }}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#A3A3B0',
                          fontSize: 14.5,
                          fontWeight: 500,
                          padding: '6px 10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#A3A3B0')}
                      >
                        <span>{link.label}</span>
                        <span style={{ fontSize: 11, opacity: 0.7 }}>↗</span>
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => handleNavClick(link.href, link.isExternal)}
                        style={{
                          color: active ? '#FFFFFF' : '#A3A3B0',
                          fontSize: 14.5,
                          fontWeight: active ? 600 : 500,
                          padding: active ? '7px 18px' : '6px 12px',
                          borderRadius: 9999,
                          background: active ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                          border: active ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid transparent',
                          display: 'inline-block',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => {
                          if (!active) e.currentTarget.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                          if (!active) e.currentTarget.style.color = '#A3A3B0';
                        }}
                      >
                        {link.label}
                      </Link>
                    )}

                    {/* Glowing Active Morse Underline */}
                    {active && (
                      <motion.div
                        layoutId="navActiveSignal"
                        style={{
                          position: 'absolute',
                          bottom: -4,
                          left: 12,
                          right: 12,
                          height: 2,
                          background: 'linear-gradient(90deg, #8B5CF6 0%, #F5B400 100%)',
                          borderRadius: 2,
                          boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Action Buttons */}
            <div
              className="desktop-nav-actions"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                flexShrink: 0,
              }}
            >
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    style={{
                      background: '#8B5CF6',
                      color: '#FFFFFF',
                      padding: '8px 20px',
                      borderRadius: 9999,
                      fontSize: 13.5,
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)',
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#F5F5F7',
                      padding: '8px 18px',
                      borderRadius: 9999,
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <button
                      onClick={() => (onOpenSignup ? onOpenSignup() : navigate('/signup'))}
                      style={{
                        background: '#8B5CF6',
                        color: '#FFFFFF',
                        padding: '9px 24px',
                        borderRadius: 9999,
                        fontSize: 14,
                        fontWeight: 700,
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      Sign Up
                    </button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to="/login"
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        color: '#F5F5F7',
                        padding: '9px 22px',
                        borderRadius: 9999,
                        fontSize: 14,
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
                    >
                      Sign In
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="mobile-nav-toggle-btn"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle Navigation Menu"
              style={{
                display: 'none',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#F5F5F7',
                borderRadius: 8,
                padding: '7px 12px',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '100vh',
              maxHeight: '100dvh',
              background: 'rgba(10, 10, 15, 0.98)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 20px 32px',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Header with Logo & Close Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 14,
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: 10,
                flexShrink: 0,
              }}
            >
              <Link to="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none' }}>
                <MorsebridgeLogo fontSize="20px" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close Navigation"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F5F5F7',
                  borderRadius: 10,
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Links List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minHeight: 0 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => {
                    handleNavClick(link.href, link.isExternal);
                    setMobileOpen(false);
                  }}
                  style={{
                    fontSize: 16.5,
                    fontWeight: isActive(link) ? 700 : 600,
                    color: isActive(link) ? '#8B5CF6' : '#F5F5F7',
                    textDecoration: 'none',
                    padding: '11px 12px',
                    borderRadius: 10,
                    background: isActive(link) ? 'rgba(139, 92, 246, 0.12)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{link.label}</span>
                  {link.isExternal && <span style={{ fontSize: 12, opacity: 0.6 }}>↗</span>}
                </Link>
              ))}
            </div>

            {/* Action Buttons at Bottom */}
            <div
              style={{
                marginTop: 18,
                paddingTop: 16,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => {
                  setMobileOpen(false);
                  if (onOpenSignup) onOpenSignup();
                  else navigate('/signup');
                }}
                className="btn-magnetic-signal"
                style={{
                  background: '#8B5CF6',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  padding: '13px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  border: 'none',
                  cursor: 'pointer',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                }}
              >
                <span>Sign Up</span>
                <div className="btn-light-sweep" />
              </button>

              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F5F5F7',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 14.5,
                  textDecoration: 'none',
                }}
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
