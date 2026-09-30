import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MapPin,
  Linkedin,
  Youtube,
  Instagram,
  Users,
  BarChart2,
  Share2,
  ChevronDown,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';

/* ── 8 Core FAQs ── */
const FAQS_DATA = [
  {
    q: 'What is MorseBridge?',
    a: 'MorseBridge is a premier venture infrastructure and deal flow bridge that connects early-stage founders with institutional venture capital funds, angel syndicates, and family offices across MENA and globally.',
  },
  {
    q: 'How does the startup–investor matching work?',
    a: 'After you submit your startup intake, our venture team conducts a 48-hour diligence audit on your unit economics, deck, and cap table. We then initiate warm, targeted introductions directly with partner-level decision makers whose investment thesis matches your stage and sector.',
  },
  {
    q: 'What is the Substack and AI diligence blueprints?',
    a: 'Our founder Muhammad Ayub writes weekly in-depth breakdowns on automating commercial due diligence, building multi-agent deal sourcing pipelines inside Claude Cowork, and institutional underwriting models.',
  },
  {
    q: 'Where do I access curated investor data?',
    a: 'Our live curated investor database covers 100+ active MENA and global funds, complete with partner contact channels, check size brackets, and verified investment criteria.',
  },
  {
    q: 'Who are the investors on MorseBridge?',
    a: 'Our network includes 100+ vetted institutional venture capitalists, sovereign fund accelerators, multi-family offices, and regional angel syndicates actively deploying capital across Dubai, Riyadh, Abu Dhabi, London, and San Francisco.',
  },
  {
    q: 'What types of startups does MorseBridge work with?',
    a: 'We focus on pre-seed, seed, and Series A technology companies across Fintech, AI & Agentic Systems, B2B SaaS, Healthtech, Climate, and Marketplace sectors.',
  },
  {
    q: 'Can I host a bespoke event through MorseBridge?',
    a: 'Yes. We provide complete end-to-end event execution — from venue selection in DIFC / Riyadh Front to keynote curation and investor attendee management. Visit our Custom Events page to submit an inquiry.',
  },
  {
    q: 'How do I get started?',
    a: "Click 'Book a Demo' or 'Sign In' in the navigation bar, select whether you are a Startup or Investor, and complete your profile. Our team reviews all submissions within 48 hours.",
  },
];

/* ── 3 Audience Pillars ── */
const AUDIENCE_PILLARS = [
  {
    icon: Users,
    title: 'For Founders',
    desc: 'Share your vision and explore how we can support your journey.',
    link: '/i-am-a-startup',
  },
  {
    icon: BarChart2,
    title: 'For Investors',
    desc: 'Discuss opportunities and get access to our deal flow.',
    link: '/i-am-an-investor',
  },
  {
    icon: Share2,
    title: 'For Partners',
    desc: 'Explore collaborations to strengthen the MENA ecosystem.',
    link: 'https://cal.com/morsebridge/30-min-intro',
    isExternal: true,
  },
];

export default function FaqsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 5000);
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div
      style={{
        background: 'var(--bg-canvas, #0A0A0F)',
        minHeight: '100vh',
        paddingTop: 84,
        color: '#F5F5F7',
        fontFamily: "'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ====================================================================
          1. HERO SECTION (PANORAMIC DUBAI NIGHT SKYLINE BANNER)
          ==================================================================== */}
      <section style={{ padding: '36px 0 20px', position: 'relative' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 22,
              overflow: 'hidden',
              minHeight: 420,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Background Panorama Image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: "url('/assets/founder/dubai_skyline_night.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                zIndex: 0,
              }}
            />

            {/* Gradient Dark Overlay on Left for Flawless Readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(10, 10, 15, 0.96) 0%, rgba(10, 10, 15, 0.88) 45%, rgba(10, 10, 15, 0.3) 100%)',
                zIndex: 1,
              }}
            />

            {/* Hero Content */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '60px 48px',
                maxWidth: 640,
              }}
            >
              {/* Eyebrow */}
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#F5B400',
                  marginBottom: 16,
                  textTransform: 'uppercase',
                }}
              >
                CONTACT
              </span>

              {/* Title */}
              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  marginBottom: 16,
                  fontFamily: "'Proxima Nova', sans-serif",
                }}
              >
                Let's build<br />the future together.
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  color: '#C5C5D2',
                  fontSize: 16.5,
                  lineHeight: 1.6,
                  marginBottom: 20,
                  maxWidth: 520,
                }}
              >
                Whether you're a founder, investor or partner, we'd love to hear from you.
              </p>

              {/* Accent Divider Line */}
              <div
                style={{
                  width: 48,
                  height: 2,
                  background: '#F5B400',
                  marginBottom: 16,
                  borderRadius: 2,
                }}
              />

              {/* Tagline */}
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                PEOPLE. IDEAS. A STRONGER MENA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          2. GET IN TOUCH & OUR DETAILS (2-COLUMN CONTACT SECTION)
          ==================================================================== */}
      <section className="section" style={{ padding: '60px 0 50px' }}>
        <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48,
              alignItems: 'flex-start',
            }}
          >
            {/* Left Column: Get In Touch Form */}
            <div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: 8,
                  fontFamily: "'Proxima Nova', sans-serif",
                }}
              >
                Get in touch
              </h2>
              <p
                style={{
                  color: '#A3A3B0',
                  fontSize: 15,
                  lineHeight: 1.6,
                  marginBottom: 28,
                }}
              >
                Share a few details and our team will get back to you shortly. We look forward to connecting.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#101017',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 10,
                      padding: '14px 18px',
                      color: '#FFFFFF',
                      fontSize: 15,
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#F5B400')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#101017',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 10,
                      padding: '14px 18px',
                      color: '#FFFFFF',
                      fontSize: 15,
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#F5B400')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#101017',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 10,
                      padding: '14px 18px',
                      color: '#FFFFFF',
                      fontSize: 15,
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: 120,
                      transition: 'border-color 0.2s ease',
                      fontFamily: 'inherit',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#F5B400')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                {isSubmitted && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#10B981',
                      fontSize: 14,
                      fontWeight: 600,
                      padding: '10px 14px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      borderRadius: 8,
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                    }}
                  >
                    <CheckCircle size={16} />
                    <span>Thank you! Your message has been received. Our team will respond shortly.</span>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="btn-magnetic-signal"
                    style={{
                      background: '#F5B400',
                      color: '#0A0A0F',
                      padding: '13px 34px',
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 4px 20px rgba(245, 180, 0, 0.35)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 26px rgba(245, 180, 0, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(245, 180, 0, 0.35)';
                    }}
                  >
                    <span>Send Message</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Our Details & Follow Us */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36, paddingLeft: 10 }}>
              {/* Our Details */}
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: 20,
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  Our details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Email */}
                  <a
                    href="mailto:hello@morsebridge.com"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'rgba(245, 180, 0, 0.12)',
                        border: '1px solid rgba(245, 180, 0, 0.28)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F5B400',
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={20} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>
                      hello@morsebridge.com
                    </span>
                  </a>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'rgba(245, 180, 0, 0.12)',
                        border: '1px solid rgba(245, 180, 0, 0.28)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F5B400',
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={20} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>
                      Dubai, UAE
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: '100%', height: 1, background: 'rgba(255, 255, 255, 0.08)' }} />

              {/* Follow Us */}
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: 18,
                    fontFamily: "'Proxima Nova', sans-serif",
                  }}
                >
                  Follow us
                </h3>

                {/* Social Circle Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  {[
                    {
                      icon: Linkedin,
                      href: 'https://linkedin.com/company/morsebridge',
                      label: 'LinkedIn',
                    },
                    {
                      icon: () => (
                        <span style={{ fontSize: 16, fontWeight: 900, fontFamily: 'sans-serif' }}>𝕏</span>
                      ),
                      href: 'https://x.com/morsebridge',
                      label: 'X',
                    },
                    {
                      icon: Youtube,
                      href: 'https://youtube.com/@FoundersTalkwithAyub',
                      label: 'YouTube',
                    },
                    {
                      icon: Instagram,
                      href: 'https://instagram.com/morsebridge',
                      label: 'Instagram',
                    },
                  ].map((soc, idx) => {
                    const IconComp = soc.icon;
                    return (
                      <a
                        key={idx}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={soc.label}
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: '50%',
                          background: '#14141E',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#F5B400';
                          e.currentTarget.style.color = '#F5B400';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                          e.currentTarget.style.color = '#FFFFFF';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <IconComp size={18} />
                      </a>
                    );
                  })}
                </div>

                <p style={{ color: '#8E8E9B', fontSize: 13.5, margin: 0 }}>
                  We typically respond within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          3. AUDIENCE PILLARS (FOR FOUNDERS, INVESTORS, PARTNERS)
          ==================================================================== */}
      <section style={{ padding: '60px 0 50px' }}>
        <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {AUDIENCE_PILLARS.map((card, idx) => {
              const Icon = card.icon;
              const CardWrapper = card.isExternal ? 'a' : Link;
              const wrapperProps = card.isExternal
                ? { href: card.link, target: '_blank', rel: 'noopener noreferrer' }
                : { to: card.link };

              return (
                <CardWrapper
                  key={idx}
                  {...wrapperProps}
                  style={{
                    background: '#101017',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 20,
                    padding: '38px 26px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 180, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  {/* Icon Circle */}
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: '50%',
                      background: 'rgba(245, 180, 0, 0.12)',
                      border: '1px solid rgba(245, 180, 0, 0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                      color: '#F5B400',
                    }}
                  >
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: 10,
                      letterSpacing: '-0.01em',
                      fontFamily: "'Proxima Nova', sans-serif",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      color: '#A3A3B0',
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          4. MEANINGFUL CONVERSATIONS BANNER (SCREENSHOT 2 & 3)
          ==================================================================== */}
      <section style={{ padding: '50px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              minHeight: 380,
            }}
          >
            {/* Left Half: Boardroom Meeting with Burj Khalifa View */}
            <div
              style={{
                position: 'relative',
                minHeight: 280,
                backgroundImage: "url('/assets/founder/event_roundtable.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.25)',
                }}
              />
            </div>

            {/* Right Half: Editorial Text Block */}
            <div
              style={{
                background: '#101017',
                padding: '48px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: 44, height: 2, background: '#F5B400', marginBottom: 22 }} />

              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  marginBottom: 26,
                  fontFamily: "'Proxima Nova', sans-serif",
                }}
              >
                Meaningful conversations create extraordinary outcomes.
              </h2>

              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  color: '#A3A3B0',
                  textTransform: 'uppercase',
                }}
              >
                MORSE BRIDGE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          5. FREQUENTLY ASKED QUESTIONS (ACCORDION SECTION)
          ==================================================================== */}
      <section id="faqs" style={{ padding: '60px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 2.8rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                marginBottom: 12,
                fontFamily: "'Proxima Nova', sans-serif",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ color: '#A3A3B0', fontSize: 16 }}>
              Everything you need to know about partnering, bootcamps, and capital enablement.
            </p>
          </div>

          {/* Accordion Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#101017',
                    border: isOpen ? '1px solid #F5B400' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: isOpen
                      ? '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(245, 180, 0, 0.12)'
                      : '0 4px 18px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div
                    onClick={() => toggleFaq(idx)}
                    style={{
                      padding: '22px 26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16.5,
                        fontWeight: 700,
                        color: isOpen ? '#FFFFFF' : '#E2E2E8',
                        fontFamily: "'Proxima Nova', sans-serif",
                      }}
                    >
                      {faq.q}
                    </span>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: isOpen ? 'rgba(245, 180, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${isOpen ? 'rgba(245, 180, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isOpen ? '#F5B400' : '#A3A3B0',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease, background 0.2s ease',
                        flexShrink: 0,
                        marginLeft: 16,
                      }}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          style={{
                            padding: '0 26px 22px',
                            color: '#A3A3B0',
                            fontSize: 14.5,
                            lineHeight: 1.65,
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                            paddingTop: 16,
                          }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signal Transmission Section Divider */}
      <SignalDivider />

      {/* ====================================================================
          6. FINAL CALL TO ACTION (SCREENSHOT 3)
          ==================================================================== */}
      <section style={{ padding: '60px 0 100px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 840, margin: '0 auto', padding: '0 24px' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.14em',
              color: '#F5B400',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            READY TO CONNECT?
          </span>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.85rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: 32,
              fontFamily: "'Proxima Nova', sans-serif",
            }}
          >
            A stronger innovation<br />ecosystem starts with a conversation.
          </h2>

          <div>
            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic-signal"
              style={{
                background: '#F5B400',
                color: '#0A0A0F',
                padding: '13px 34px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 20px rgba(245, 180, 0, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 26px rgba(245, 180, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(245, 180, 0, 0.35)';
              }}
            >
              <span>Book a Call</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
