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

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com/company/morsebridge-ventures', label: 'LinkedIn' },
                { name: 'Instagram', url: 'https://instagram.com/morsebridgeventures', label: 'Instagram' },
                { name: 'Pinterest', url: 'https://pinterest.com/ayubayubi', label: 'Pinterest' },
                { name: 'YouTube', url: 'https://youtube.com/@FoundersTalkwithAyub', label: 'YouTube' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 999,
                    background: '#ffffff',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-secondary)',
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#000000';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                  }}
                >
                  {s.label} ↗
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
                { label: 'Investor Data Suite', to: '/products' },
                { label: 'Pitch Deck Templates', to: '/products' },
                { label: 'Fundraising Playbook', to: '/products' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="footer-link">
                    {l.label}
                  </Link>
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
