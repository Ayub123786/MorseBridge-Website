import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MorsebridgeLogo from './MorsebridgeLogo';

const NAV_LINKS = [
  { label: 'Home', href: '/', isExternal: false },
  { label: 'What We Do', href: '/#what-we-do', isExternal: false },
  { label: 'Products', href: '/products', isExternal: false },
  { label: 'Events', href: '/custom-events', isExternal: false },
  { label: 'Blog', href: 'https://morsebridge.substack.com/?utm_campaign=profile_chips', isExternal: true },
  { label: 'Podcast', href: 'https://youtube.com/@FoundersTalkwithAyub', isExternal: true },
  { label: "FAQ's", href: '/#faqs', isExternal: false },
];

export default function Navbar() {
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
    return location.pathname.startsWith(link.href);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* EXACT BRAND LOGO */}
            <Link to="/" className="logo-wrap">
              <MorsebridgeLogo />
            </Link>

            {/* Desktop Nav Links */}
            <ul className="nav-menu">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link"
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => handleNavClick(link.href, link.isExternal)}
                      className={`nav-link${isActive(link) ? ' active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Desktop Actions (Sign Up / Sign In) */}
            <div className="nav-actions">
              {user ? (
                <>
                  <Link to="/dashboard" className="btn-sign-up">
                    Dashboard
                  </Link>
                  <button
                    className="btn-sign-in"
                    onClick={() => { logout(); navigate('/'); }}
                    style={{ background: '#000000' }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="btn-sign-up">
                    sign up
                  </Link>
                  <Link to="/login" className="btn-sign-in">
                    sign In
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer${mobileOpen ? ' open' : ''}`}>
        {NAV_LINKS.map((link) =>
          link.isExternal ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              {link.label} ↗
            </a>
          ) : (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => handleNavClick(link.href, link.isExternal)}
              className={`nav-link${isActive(link) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          )
        )}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          {user ? (
            <>
              <Link to="/dashboard" className="btn-sign-up" style={{ flex: 1, textAlign: 'center' }}>
                Dashboard
              </Link>
              <button className="btn-sign-in" onClick={() => { logout(); navigate('/'); }} style={{ flex: 1 }}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn-sign-up" style={{ flex: 1, textAlign: 'center' }}>
                sign up
              </Link>
              <Link to="/login" className="btn-sign-in" style={{ flex: 1, textAlign: 'center' }}>
                sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
