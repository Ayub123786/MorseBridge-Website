import { Link } from 'react-router-dom';
import MorsebridgeLogo from './MorsebridgeLogo';

export default function Footer() {
  return (
    <footer className="mb-footer">
      <div className="container">
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand col */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <MorsebridgeLogo />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.65, maxWidth: 320 }}>
              Empowering founders with clarity, credibility, and connections that drive real momentum across MENA and globally.
            </p>

            {/* Social Links with Official Brand Colors */}
            <div style={{ display: 'flex', gap: 10, marginTop: 22, alignItems: 'center' }}>
              <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
                <defs>
                  <radialGradient id="mbInstaGrad" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497" />
                    <stop offset="10%" stopColor="#fdf497" />
                    <stop offset="45%" stopColor="#fd5949" />
                    <stop offset="65%" stopColor="#d6249f" />
                    <stop offset="90%" stopColor="#285AEB" />
                  </radialGradient>
                </defs>
              </svg>

              {[
                {
                  name: 'LinkedIn',
                  url: 'https://linkedin.com/company/morsebridge-ventures',
                  color: '#0A66C2',
                  icon: (
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="#0A66C2">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  ),
                },
                {
                  name: 'Instagram',
                  url: 'https://instagram.com/morsebridgeventures',
                  color: '#E4405F',
                  icon: (
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="url(#mbInstaGrad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5"/>
                    </svg>
                  ),
                },
                {
                  name: 'Pinterest',
                  url: 'https://pinterest.com/ayubayubi',
                  color: '#E60023',
                  icon: (
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="#E60023">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  ),
                },
                {
                  name: 'YouTube',
                  url: 'https://youtube.com/@foundermeetinvestor',
                  color: '#FF0000',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                },
                {
                  name: 'Substack',
                  url: 'https://morsebridge.substack.com',
                  color: '#FF6719',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="#FF6719">
                      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '1px solid var(--border-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = s.color;
                    e.currentTarget.style.boxShadow = `0 6px 16px ${s.color}33`;
                    e.currentTarget.style.background = '#fafafa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                    e.currentTarget.style.background = '#ffffff';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links">
              {[
                { label: 'Home', to: '/' },
                { label: 'What We Do', to: '/#what-we-do' },
                { label: 'Products', to: '/products' },
                { label: 'Custom Events', to: '/custom-events' },
                { label: 'Podcast', to: 'https://youtube.com/@FoundersTalkwithAyub', external: true },
                { label: "FAQ's", to: '/#faqs' },
              ].map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.to} target="_blank" rel="noopener noreferrer" className="footer-link">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className="footer-link">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Products & Resources */}
          <div>
            <div className="footer-col-title">Products</div>
            <ul className="footer-links">
              {[
                { label: '5-Minute CFO Model', to: '/the-5-minute-cFO-model' },
                { label: 'Startup Look Book', to: '/products' },
                { label: 'Investor Data Suite ↗', to: 'https://morsebridge.substack.com/s/investor-data', external: true },
                { label: 'Pitch Deck Templates', to: '/products' },
                { label: 'Fundraising Playbook ↗', to: 'https://morsebridge.substack.com/s/fundraising-playbook', external: true },
              ].map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.to} target="_blank" rel="noopener noreferrer" className="footer-link">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className="footer-link">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* External & Connect */}
          <div>
            <div className="footer-col-title">Get In Touch</div>
            <ul className="footer-links">
              <li>
                <a
                  href="https://cal.com/morsebridge/30-min-intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ color: '#000000', fontWeight: 600 }}
                >
                  Schedule a Call ↗
                </a>
              </li>
              <li>
                <a
                  href="https://morsebridge.substack.com/s/investor-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ color: '#FF6719', fontWeight: 600 }}
                >
                  Investor Data Hub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://morsebridge.substack.com/?utm_campaign=profile_chips"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Substack Newsletter ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.eventbrite.co.uk/o/morse-bridge-78875439043"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Eventbrite Events ↗
                </a>
              </li>
              <li>
                <Link to="/i-am-a-startup" className="footer-link">
                  I am a Startup
                </Link>
              </li>
              <li>
                <Link to="/i-am-an-investor" className="footer-link">
                  I am an Investor
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MorseBridge. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <span>Muhammad Ayub — CEO &amp; Founder</span>
            <a href="https://cal.com/morsebridge/30-min-intro" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 13 }}>
              Schedule Intro
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
