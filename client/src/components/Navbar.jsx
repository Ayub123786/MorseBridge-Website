import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import MorsebridgeLogo from './MorsebridgeLogo';
import SearchModal from './SearchModal';

import { Search, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/', isExternal: false },
  { label: 'For Investors', href: '/i-am-an-investor', isExternal: false },
  { label: 'For Founders', href: '/i-am-a-startup', isExternal: false },
  { label: 'Solutions', href: '/solutions', isExternal: false },
  { label: 'Events', href: '/custom-events', isExternal: false },
  { label: 'Insights', href: '/the-founder-knowledge-hub', isExternal: false },
  { label: 'About', href: '/about', isExternal: false },
  { label: "FAQ's", href: '/#faqs', isExternal: false },
];

export default function Navbar({ onOpenSignup }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    if (location.hash) {
      const sectionId = location.hash.slice(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  const handleNavClick = (href, isExternal) => {
    if (isExternal) return;
    if (href.startsWith('/#') || href === '/faqs') {
      const sectionId = href.startsWith('/#') ? href.replace('/#', '') : 'faqs';
      if (location.pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${sectionId}`);
      }
    }
  };

  const isActive = (link) => {
    if (link.isExternal) return false;
    if (link.href === '/') return location.pathname === '/' && !location.hash;
    if (link.href === '/#faqs' || link.href === '/faqs') {
      return location.hash === '#faqs';
    }
    if (link.href.startsWith('/#')) return location.hash === link.href.replace('/', '');
    if (link.href === '/solutions') {
      return location.pathname === '/solutions' || location.pathname === '/products' || location.pathname.startsWith('/solutions/') || location.pathname.startsWith('/products/');
    }
    if (link.href === '/i-am-an-investor') {
      return location.pathname === '/i-am-an-investor' || location.pathname === '/investor';
    }
    if (link.href === '/i-am-a-startup') {
      return location.pathname === '/i-am-a-startup' || location.pathname === '/startup';
    }
    if (link.href === '/custom-events') {
      return location.pathname === '/custom-events' || location.pathname === '/events';
    }
    if (link.href === '/the-founder-knowledge-hub') {
      return (
        location.pathname === '/the-founder-knowledge-hub' ||
        location.pathname === '/insights' ||
        location.pathname === '/blog' ||
        location.pathname === '/podcast' ||
        location.pathname.startsWith('/blog/')
      );
    }
    if (link.href === '/about') {
      return location.pathname === '/about' || location.pathname === '/what-we-do';
    }
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
          background: scrolled ? 'rgba(10, 10, 15, 0.92)' : 'rgba(10, 10, 15, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '10px 0' : '14px 0',
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
                gap: 16,
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
                          fontSize: 14,
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
                          fontSize: 14,
                          fontWeight: active ? 700 : 500,
                          padding: active ? '6px 16px' : '6px 10px',
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

                    {/* Glowing Active Morse Underline (for all active items, exactly like Home) */}
                    {active && (
                      <motion.div
                        layoutId="navActiveSignal"
                        style={{
                          position: 'absolute',
                          bottom: -4,
                          left: 10,
                          right: 10,
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
                gap: 14,
                flexShrink: 0,
              }}
            >
              {/* Search Icon */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                title="Search platform (Ctrl+K)"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#A3A3B0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#A3A3B0'; }}
              >
                <Search size={18} />
              </button>

              {/* Book a Demo Button (Matches Image 2) */}
              <a
                href="https://cal.com/morsebridge/30-min-intro"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#14141B',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  color: '#FFFFFF',
                  padding: '8px 18px',
                  borderRadius: 9999,
                  fontSize: 13.5,
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.45)';
                  e.currentTarget.style.background = '#1E1E28';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                  e.currentTarget.style.background = '#14141B';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Book a Demo</span>
                <ArrowRight size={14} />
              </a>

              {user && (
                <>
                  <Link
                    to="/dashboard"
                    style={{
                      background: '#8B5CF6',
                      color: '#FFFFFF',
                      padding: '7px 16px',
                      borderRadius: 9999,
                      fontSize: 13,
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
                      padding: '7px 14px',
                      borderRadius: 9999,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Sign Out
                  </button>
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

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setIsSearchOpen(true);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F5F5F7',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 14.5,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <Search size={16} color="#F5B400" />
                <span>Search Platform (Ctrl+K)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Interactive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
