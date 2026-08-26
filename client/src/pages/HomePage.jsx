import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

/* ── Custom Hook for Scroll-Triggered Animations (Both scrolling down and up) ── */
function useScrollReveal() {
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          entry.target.classList.remove('is-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ── 1. Unique Interactive Morse Telegraph Signal Canvas ── */
function MorsePatternCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Grid of precision telegraph nodes and morse symbols
    const spacing = 72;
    const cols = Math.ceil(canvas.width / spacing) + 1;
    const rows = Math.ceil(canvas.height / spacing) + 1;
    const symbols = ['•', '—', '+', '•'];

    const nodes = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const symIdx = (r * 7 + c * 13) % symbols.length;
        nodes.push({
          x: c * spacing,
          y: r * spacing,
          sym: symbols[symIdx],
          baseAlpha: 0.1,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    // Traveling signal packets
    const packets = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 1.5 + 0.8,
      horizontal: Math.random() > 0.5,
      length: Math.random() * 24 + 16,
      alpha: Math.random() * 0.4 + 0.2,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.02;

      // Draw traveling signal packets along grid lines (purple tint)
      ctx.lineWidth = 1.2;
      packets.forEach((p) => {
        ctx.beginPath();
        if (p.horizontal) {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.length, p.y);
          p.x += p.speed;
          if (p.x > canvas.width + 50) p.x = -50;
        } else {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + p.length);
          p.y += p.speed;
          if (p.y > canvas.height + 50) p.y = -50;
        }
        ctx.strokeStyle = `rgba(139, 92, 246, ${p.alpha * 0.55})`;
        ctx.stroke();
      });

      // Draw precision symbols (dots, dashes, crosshairs)
      ctx.font = '10px "Fragment Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      nodes.forEach((n) => {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let alpha = n.baseAlpha + Math.sin(t + n.pulseOffset) * 0.03;
        let scale = 1;
        let isNear = false;

        // Proximity magnetic beacon (subtle purple aura on hover)
        if (dist < 160) {
          const factor = 1 - dist / 160;
          alpha += factor * 0.5;
          scale += factor * 0.4;
          isNear = true;
        }

        ctx.fillStyle = isNear
          ? `rgba(124, 58, 237, ${Math.min(0.7, Math.max(0.1, alpha))})`
          : `rgba(0, 0, 0, ${Math.min(0.5, Math.max(0.04, alpha))})`;
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.scale(scale, scale);
        ctx.fillText(n.sym, 0, 0);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="morse-canvas-layer" />;
}

/* ── Upcoming Events ── */
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Global Fundraising Boot Camp Launch',
    image: '/assets/events/bootcamp.jpg',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
  },
  {
    id: 2,
    title: 'Riyadh Rising 2026',
    image: '/assets/events/riyadh_rising.jpg',
    link: 'https://riyadhrising.net/',
  },
  {
    id: 3,
    title: 'Dubai Rising 2026',
    image: '/assets/events/dubai_rising.jpg',
    link: 'https://www.eventbrite.co.uk/o/morse-bridge-78875439043',
  },
];

/* ── 100+ Investors & Mentors Dataset ── */
const INVESTORS_ROW_1 = [
  { id: 1, name: 'H.R.H. Prince Fahad', role: 'Lahint · CCO', img: 1 },
  { id: 2, name: 'Dr. Faisal Al-Otaibi', role: 'Misk · Founder & CEO', img: 2 },
  { id: 3, name: 'Tarek Mansour', role: 'Oryx Funds · General Partner', img: 3 },
  { id: 4, name: 'Lina Al-Husseini', role: 'Merak Capital · Investment Associate', img: 4 },
  { id: 5, name: 'Khalid Al-Ghamdi', role: 'SHARE Investment · CEO', img: 5 },
  { id: 6, name: 'Elena Rostova', role: 'Vensionaire Capital · Partner', img: 6 },
  { id: 7, name: 'Alexandre Meyer', role: 'ARENA Capital · Founder', img: 7 },
  { id: 8, name: 'Marcus Lindqvist', role: 'Nordic Angels · Partner', img: 8 },
  { id: 9, name: 'Sultan Al-Shammari', role: 'GCC VC Syndicate · Partner', img: 9 },
  { id: 10, name: 'Raza Farhan', role: 'Frontier Ventures · Partner', img: 10 },
  { id: 11, name: 'Ahmed El-Sayed', role: 'Growth Stage VC · Managing Director', img: 11 },
];

const INVESTORS_ROW_2 = [
  { id: 12, name: 'Yousef Hamza', role: 'Family Office · Managing Partner', img: 12 },
  { id: 13, name: 'Saad Al-Qarni', role: 'Bridging To Saudi · Founder', img: 13 },
  { id: 14, name: 'Dr. Mazen Al-Darrab', role: 'Core Vision · CEO', img: 14 },
  { id: 15, name: 'Faris Al-Rashed', role: 'HALA Ventures · Founding Partner', img: 15 },
  { id: 16, name: 'Reem Al-Ghamdi', role: 'Pinnacle Capital · Investment Assoc.', img: 16 },
  { id: 17, name: 'Nouf Al-Saleh', role: 'BECO Capital · Senior Associate', img: 17 },
  { id: 18, name: 'Dr. Hisham Abdel-Latif', role: 'Science Labs · Co-Founder', img: 18 },
  { id: 19, name: 'Ziyad Othman', role: 'Angel Investor & Advisor', img: 19 },
  { id: 20, name: 'Kareem Barakat', role: 'Early Stage Fund · Partner', img: 20 },
  { id: 21, name: 'Fatima Al-Nuaimi', role: 'FinTech Syndicate · Principal', img: 21 },
  { id: 22, name: 'Omar Al-Majed', role: 'Global Tech Angels · Venture Partner', img: 22 },
];

/* ── What We Do Capabilities ── */
const WHAT_WE_DO_DATA = [
  {
    title: 'Fundraising Enablement',
    image: '/assets/what-we-do/fundraising_enablement.png',
    link: 'https://cal.com/morsebridge/30-min-intro',
    points: [
      'Strategic introductions to vetted institutional investors',
      'Access to exclusive summits & live pitch opportunities',
      'Guidance on positioning and high-conversion fundraising narratives',
    ],
  },
  {
    title: 'Revenue Strategy & Systems',
    image: '/assets/what-we-do/revenue_strategy.png',
    link: 'https://cal.com/morsebridge/30-min-intro',
    points: [
      'Advising on revenue models and pricing',
      'Helping build scalable revenue-generating systems (e.g. sales processes, monetization strategy, go-to-market)',
      'Supporting growth planning aligned with investor expectations',
    ],
  },
  {
    title: 'Fundraising Playbook',
    image: '/assets/what-we-do/fundraising_playbook.jpg',
    link: 'https://morsebridge.substack.com/s/fundraising-playbook',
    points: [
      'Investor-ready data room structuring & diligence prep',
      'High-converting outreach sequences & warm intro templates',
      'Due diligence checklist & term sheet negotiation roadmap',
    ],
  },
];

/* ── Stat Cards ("How Are We Making a Difference?") ── */
const DIFFERENCE_CARDS = [
  {
    stat: '450+',
    label: 'Founders Supported',
    desc: 'Guiding visionary founders from pre-seed ideation to institutional rounds with hands-on support.',
  },
  {
    stat: '500+',
    label: 'VCs & Family Offices',
    desc: 'Direct pipeline to active institutional capital across the GCC, Europe, and Silicon Valley.',
  },
  {
    stat: '110+',
    label: 'Matchmaking Events Hosted',
    desc: 'Curated pitch competitions, private investor dinners, and regional startup summits.',
  },
  {
    stat: '100%',
    label: 'Investor-Ready Data Rooms',
    desc: 'Structured models, institutional pitch decks, and due diligence vaults prepared in days.',
  },
  {
    stat: '$1M+',
    label: 'GTM First ARR Roadmap',
    desc: 'Actionable sales funnels, monetization frameworks, and scalable customer acquisition playbooks.',
  },
  {
    stat: '24/7',
    label: 'Ecosystem & Advisory Access',
    desc: 'High-impact visual narratives, pitch decks, and demo day presentation support.',
  },
];

/* ── Helper: Extract YouTube Embed URL from any link (Shorts, Watch, youtu.be, or ID) ── */
function getYouTubeEmbedUrl(input) {
  if (!input || !input.trim()) return '';
  const str = input.trim();
  
  if (str.includes('/shorts/')) {
    const id = str.split('/shorts/')[1]?.split('?')[0]?.split('&')[0];
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : '';
  }
  if (str.includes('youtu.be/')) {
    const id = str.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : '';
  }
  if (str.includes('watch?v=')) {
    const id = str.split('watch?v=')[1]?.split('&')[0];
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : '';
  }
  if (str.includes('embed/')) {
    return str;
  }
  return `https://www.youtube-nocookie.com/embed/${str}?rel=0&modestbranding=1`;
}

/* ── PAST EVENTS YOUTUBE VIDEOS & SHORTS (10 SLOTS — 2x5 GRID) ──
   Paste your YouTube Shorts or Video link directly into 'youtubeUrl'.
   Example formats:
   - "https://www.youtube.com/shorts/YOUR_ID"
   - "https://youtu.be/YOUR_ID"
   - "https://www.youtube.com/watch?v=YOUR_ID"
   - "YOUR_ID"
───────────────────────────────────────────────────────────────── */
const PAST_EVENT_VIDEOS = [
  {
    id: 1,
    title: 'What Investors Really Think About Startups Outside the US',
    youtubeUrl: 'https://www.youtube.com/shorts/z1UMcbF7i9A',
    category: 'Startup Fundraising',
  },
  {
    id: 2,
    title: "Top VC Firms Don't Win by Seeing More Deals",
    youtubeUrl: 'https://www.youtube.com/shorts/lPuPA9M2zsQ',
    category: 'Startup Fundraising',
  },
  {
    id: 3,
    title: 'Startup Innovation Meetup | Founder & Investor Connect',
    youtubeUrl: 'https://www.youtube.com/shorts/6F1UNtMalJ4',
    category: 'Community',
  },
  {
    id: 4,
    title: 'Global Fundraising Bootcamp Cohort 3 — Master Pitch Decks & GTM',
    youtubeUrl: 'https://www.youtube.com/shorts/FbnIgzwafD4',
    category: 'Workshops',
  },
  {
    id: 5,
    title: 'Expand North Star 2025: Investors Roundtable & Demo Day',
    youtubeUrl: 'https://www.youtube.com/shorts/2l7s12IIu7s',
    category: 'Community',
  },
  {
    id: 6,
    title: 'AI Meets Blockchain: Erik Mendelson at Frontier Capital Roundtable',
    youtubeUrl: 'https://www.youtube.com/shorts/PM383MoSQPM',
    category: 'Workshops',
  },
  {
    id: 7,
    title: 'The Investors Roundtable + Demo Day',
    youtubeUrl: 'https://www.youtube.com/shorts/7gjQPHrBeG0',
    category: 'Startup Fundraising',
  },
  {
    id: 8,
    title: 'Inside the Investors Roundtable + Demo Day',
    youtubeUrl: 'https://www.youtube.com/shorts/kTNOAtNIJr0',
    category: 'Community',
  },
  {
    id: 9,
    title: 'Investors Roundtable + Demo Day + After Party',
    youtubeUrl: 'https://www.youtube.com/shorts/ncTZX7T8Etc',
    category: 'Community',
  },
  {
    id: 10,
    title: 'Inside the Global Fundraising Bootcamp | Founders Journey',
    youtubeUrl: 'https://www.youtube.com/shorts/gIw3kw30wgc',
    category: 'Workshops',
  },
];

/* ── Comments / Testimonials by Founders & Investors (YouTube Shorts) ── */
const FOUNDER_COMMENT_SHORTS = [
  {
    id: 1,
    title: 'Startup Voices from MorseBridge | Real Reactions',
    youtubeUrl: 'https://www.youtube.com/shorts/Cgl0gJpd268',
  },
  {
    id: 2,
    title: 'Mo Khaldi on Why Every Founder Should Join the Bootcamp',
    youtubeUrl: 'https://www.youtube.com/shorts/TAGRO208seA',
  },
  {
    id: 3,
    title: 'Inside the Global Fundraising Bootcamp | Founder Journey',
    youtubeUrl: 'https://www.youtube.com/shorts/gIw3kw30wgc',
  },
  {
    id: 4,
    title: 'MyGatePass Founder on Scaling in UAE & Bootcamp Experience',
    youtubeUrl: 'https://www.youtube.com/shorts/dLgAo8CekmE',
  },
  {
    id: 5,
    title: 'Pitch Fast, Negotiate Smart | Startup Demo Day Reactions',
    youtubeUrl: 'https://www.youtube.com/shorts/PNKRx4EwrBk',
  },
  {
    id: 6,
    title: 'How Startups Can Fix Pitch Decks, Numbers & GTM',
    youtubeUrl: 'https://www.youtube.com/shorts/2200y9BUmac',
  },
  {
    id: 7,
    title: 'Fundraise Ready: Legal Masterclass with Top GCC Counsel',
    youtubeUrl: 'https://www.youtube.com/shorts/OXquRPVm_7E',
  },
  {
    id: 8,
    title: 'Inside the B2B SaaS Sales Workshop & GTM Strategy',
    youtubeUrl: 'https://www.youtube.com/shorts/ZzAFGdNmXsI',
  },
];

/* ── Podcast Episodes ── */
const PODCAST_EPISODES = [
  {
    id: 1,
    title: 'How to Raise from MENA VCs in 2025',
    guest: 'With Active GCC Venture Partners',
    duration: '42 min',
  },
  {
    id: 2,
    title: 'Building a $1M+ ARR SaaS in UAE & KSA',
    guest: 'Serial Tech Founders Journey',
    duration: '38 min',
  },
  {
    id: 3,
    title: 'Family Office Capital: What Angels Look For',
    guest: 'GCC Private Wealth Insights',
    duration: '45 min',
  },
];

/* ── FAQs from Google Doc ── */
const FAQS_DATA = [
  {
    q: "I'm a VC — can you help train our portfolio companies on GTM?",
    a: "Yes, we deliver GTM bootcamps, audits, and hands-on support for VC portfolios.",
  },
  {
    q: "Do you offer GTM funnel audits for VC portfolio companies?",
    a: "Yes, we do.",
  },
  {
    q: "I'm at idea stage, can you help with Data Room (Pitch Deck, Financial Model, GTM)?",
    a: "Yes, we build complete investor-ready data rooms for idea-stage founders.",
  },
  {
    q: "Do you offer 1:1 matchmaking services?",
    a: "Yes, across all stages — submit your data room to ayub@morsebridge.com.",
  },
  {
    q: "Do you invest directly in startups?",
    a: "We don't lead rounds but connect you with active investors in our network.",
  },
  {
    q: "I'm a B2B SaaS founder — can you help build GTM motion or train our team?",
    a: "Yes, we help design GTM playbooks and run founder/team training sessions.",
  },
  {
    q: "I'm from Europe/US — can you help me expand into UAE or KSA?",
    a: "Yes, through our partner Lahint support smooth market entry and business registration in both KSA and UAE.",
  },
  {
    q: "Can you help with audio-visuals or product branding?",
    a: "Yes, our in-house creative team supports pitch videos, explainer assets, and brand identity tailored to startup needs.",
  },
];

/* ── Accordion FAQ Item Component ── */
function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid var(--border-medium)',
        borderRadius: 12,
        marginBottom: 12,
        boxShadow: open ? 'var(--shadow-sm)' : 'none',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#000000',
            lineHeight: 1.4,
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: open ? '#000000' : 'var(--bg-tertiary)',
            color: open ? '#ffffff' : '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 600,
            transform: open ? 'rotate(45deg)' : 'rotate(0)',
            transition: 'transform 0.25s ease, background 0.2s ease',
            flexShrink: 0,
            marginLeft: 16,
          }}
        >
          +
        </span>
      </div>
      {open && (
        <div
          style={{
            padding: '0 24px 22px',
            color: 'var(--text-body)',
            fontSize: 15,
            lineHeight: 1.7,
            borderTop: '1px solid var(--border-light)',
            paddingTop: 16,
          }}
        >
          {item.a}
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   HOMEPAGE MAIN COMPONENT (WITH UNIQUE MORSE PATTERN & SYSTEM)
   ========================================================================== */
export default function HomePage() {
  useScrollReveal();

  const [eventOffset, setEventOffset] = useState(0);
  const [activePastCategory, setActivePastCategory] = useState('All');
  const visibleEvents = 3;

  // Auto-play event cards subtle slide preview
  useEffect(() => {
    const timer = setInterval(() => {
      setEventOffset((prev) => (prev >= UPCOMING_EVENTS.length - visibleEvents ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Unique Morse Background Pattern & Interactive Signal Canvas */}
      <div className="morse-pattern-bg" />
      <MorsePatternCanvas />

      {/* ====================================================================
          3.1 — HERO SECTION
          ==================================================================== */}
      <section className="hero-section">
        <div className="container container-narrow reveal-on-scroll">
          {/* Main Headline */}
          <h1 className="hero-headline" style={{ marginBottom: 20 }}>
            Matching Startups<br />
            with Investors.
          </h1>

          {/* Subheadline */}
          <p className="hero-subheadline" style={{ marginBottom: 36, maxWidth: 620, margin: '0 auto 36px' }}>
            Over 700+ startups supported, from pre-seed to scale across MENA and global tech hubs.
          </p>

          {/* Persona Selection Cards */}
          <div className="hero-persona-cards reveal-on-scroll reveal-delay-1">
            <Link to="/i-am-a-startup" className="persona-card hover-float with-corner-brackets">
              <div style={{ textAlign: 'left' }}>
                <div className="persona-card-type">I am a Startup</div>
              </div>
              <div className="persona-card-icon">↗</div>
            </Link>

            <Link to="/i-am-an-investor" className="persona-card hover-float with-corner-brackets">
              <div style={{ textAlign: 'left' }}>
                <div className="persona-card-type">I am an Investor</div>
              </div>
              <div className="persona-card-icon">↗</div>
            </Link>
          </div>

          {/* Supporting text */}
          <p style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500 }}>
            Register now to connect, collaborate, and scale your venture.
          </p>

          {/* Founder Quote */}
          <div className="reveal-on-scroll reveal-delay-2" style={{ marginTop: 56, textAlign: 'center' }}>
            <div className="founder-avatar-wrap">
              <img
                src="/assets/investors/1.png"
                alt="Muhammad Ayub"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <p style={{ fontWeight: 700, color: '#000000', fontSize: 16, marginBottom: 4 }}>
              Muhammad Ayub — CEO &amp; Founder
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 14.5, fontStyle: 'italic' }}>
              "Every founder starts with a spark — we help it fly."
            </p>
          </div>
        </div>
      </section>

      {/* Unique Telegraph Section Divider */}
      <div className="container">
        <div className="telegraph-line" />
      </div>

      {/* ====================================================================
          3.2 — UPCOMING EVENTS (CAROUSEL OF GRAPHICAL EVENT BANNERS)
          ==================================================================== */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-medium)', borderBottom: '1px solid var(--border-medium)' }}>
        <div className="container">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3rem)',
                fontWeight: 900,
                fontStyle: 'italic',
                color: '#EAB308',
                letterSpacing: '-0.02em',
                marginBottom: 8,
              }}
            >
              Upcoming Event
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, fontWeight: 500 }}>
              Click on the event to view the details
            </p>
          </div>

          {/* Carousel with Graphical Event Cards */}
          <div className="reveal-on-scroll reveal-delay-1" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              className="carousel-btn"
              onClick={() => setEventOffset((o) => Math.max(0, o - 1))}
              disabled={eventOffset === 0}
              aria-label="Previous event"
            >
              ‹
            </button>

            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div
                style={{
                  display: 'flex',
                  gap: 20,
                  transform: `translateX(calc(-${eventOffset * (100 / visibleEvents)}% - ${eventOffset * 20 / visibleEvents}px))`,
                  transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {UPCOMING_EVENTS.map((ev) => (
                  <a
                    key={ev.id}
                    href={ev.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-float with-corner-brackets"
                    style={{
                      flex: `0 0 calc(${100 / visibleEvents}% - ${20 * (visibleEvents - 1) / visibleEvents}px)`,
                      borderRadius: 14,
                      overflow: 'hidden',
                      border: '1px solid var(--border-medium)',
                      background: '#000000',
                      display: 'block',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <img
                      src={ev.image}
                      alt={ev.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        aspectRatio: '16/9',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </a>
                ))}
              </div>
            </div>

            <button
              className="carousel-btn"
              onClick={() => setEventOffset((o) => Math.min(UPCOMING_EVENTS.length - visibleEvents, o + 1))}
              disabled={eventOffset >= UPCOMING_EVENTS.length - visibleEvents}
              aria-label="Next event"
            >
              ›
            </button>
          </div>

          {/* Closing Line */}
          <div className="reveal-on-scroll reveal-delay-2" style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#000000', marginBottom: 24 }}>
              Build, Host, or Join — We Make Startup Events Happen.
            </p>

            {/* Two CTAs */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://www.eventbrite.co.uk/o/morse-bridge-78875439043"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-black"
                style={{ padding: '12px 28px' }}
              >
                Explore Events ↗
              </a>
              <a
                href="https://cal.com/morsebridge/30-min-intro"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-white"
                style={{ padding: '12px 28px' }}
              >
                Product Launch ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3.3 — TRUST BAR (CLIENT LOGOS MARQUEE)
          ==================================================================== */}
      <section className="section" style={{ padding: '64px 0 64px', background: '#ffffff' }}>
        <div className="container reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Over 100+ Founders and<br />Investors who trust us
          </h2>
        </div>

        {/* Continuous Client Logos Marquee */}
        <div className="marquee-container" style={{ padding: '8px 0' }}>
          <div className="marquee-track">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num, i) => (
              <div key={i} className="client-logo-item">
                <img
                  src={`/assets/logos/${num}.png`}
                  alt={`Client partner logo ${num}`}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3.4 — 100+ INVESTORS & MENTORS (DUAL MARQUEE WITH CATEGORY SIDEBAR)
          ==================================================================== */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-medium)', borderBottom: '1px solid var(--border-medium)' }}>
        <div className="container reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 className="section-title">100+ Investors &amp; Mentors</h2>
          <p className="section-subtitle">
            A trusted global network of active venture capitalists, angel investors, and seasoned mentors backing high-potential startups.
          </p>
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          {/* Integrated Marquee Frame with Left Category Sidebar */}
          <div className="investor-marquee-layout">
            
            {/* Left Vertical Category Bar */}
            <div className="investor-category-sidebar">
              {/* Row 1 — INVESTOR Tab */}
              <div className="investor-category-tab">
                <div className="category-badge-circle">I</div>
                <span className="category-vertical-label">INVESTOR</span>
              </div>

              {/* Row 2 — MENTOR Tab */}
              <div className="investor-category-tab">
                <div className="category-badge-circle">M</div>
                <span className="category-vertical-label">MENTOR</span>
              </div>
            </div>

            {/* Dual Scrolling Marquee Columns */}
            <div className="investor-marquee-tracks-col">
              
              {/* Row 1 — Investors */}
              <div className="marquee-container">
                <div className="marquee-track" style={{ animationDuration: '44s' }}>
                  {[...INVESTORS_ROW_1, ...INVESTORS_ROW_1].map((inv, idx) => (
                    <div key={idx} className="investor-card-img-wrap hover-float with-corner-brackets">
                      <img
                        src={`/assets/investors/${inv.img}.png`}
                        alt={`${inv.name} - ${inv.role}`}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="investor-card-caption">
                        <div className="investor-name">{inv.name}</div>
                        <div className="investor-role">{inv.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 — Mentors */}
              <div className="marquee-container">
                <div className="marquee-track-reverse" style={{ animationDuration: '44s' }}>
                  {[...INVESTORS_ROW_2, ...INVESTORS_ROW_2].map((inv, idx) => (
                    <div key={idx} className="investor-card-img-wrap hover-float with-corner-brackets">
                      <img
                        src={`/assets/investors/${inv.img}.png`}
                        alt={`${inv.name} - ${inv.role}`}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="investor-card-caption">
                        <div className="investor-name">{inv.name}</div>
                        <div className="investor-role">{inv.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3.5 — "WHAT WE DO" (3 EDITORIAL CARDS)
          ==================================================================== */}
      <section id="what-we-do" className="section">
        <div className="container">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">
              Empowering founders with clarity, credibility, and connections that drive real momentum.
            </p>
          </div>

          <div className="grid-3">
            {WHAT_WE_DO_DATA.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`what-we-do-card hover-float reveal-on-scroll reveal-delay-${idx + 1}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
              >
                {item.image && (
                  <div className="what-we-do-img-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="what-we-do-img"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                    />
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <h3 className="what-we-do-title" style={{ margin: '18px 0 14px' }}>{item.title}</h3>
                  <span style={{ fontSize: 16, color: '#7C3AED', fontWeight: 800 }}>↗</span>
                </div>
                <ul className="what-we-do-list" style={{ flex: 1 }}>
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3.6 — "HOW ARE WE MAKING A DIFFERENCE?" (6 STAT CARDS)
          ==================================================================== */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-medium)', borderBottom: '1px solid var(--border-medium)' }}>
        <div className="container">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">How Are We Making a Difference?</h2>
            <p className="section-subtitle">
              Measured impact across startups, capital deployment, and ecosystem growth.
            </p>
          </div>

          <div className="grid-3">
            {DIFFERENCE_CARDS.map((card, i) => (
              <div
                key={i}
                className={`mb-card hover-float reveal-on-scroll reveal-delay-${(i % 3) + 1} with-corner-brackets`}
                style={{
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: '#000000',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {card.stat}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#000000', marginBottom: 4 }}>
                  {card.label}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {card.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3.7 — "OUR PAST EVENTS" (VERTICAL YOUTUBE SHORTS & VIDEOS GRID)
          ==================================================================== */}
      <section className="section">
        <div className="container container-wide">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 className="section-title">Our Past Events</h2>
            <p className="section-subtitle">
              Watch summit highlights, live pitch sessions, and masterclasses from across MENA.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="reveal-on-scroll reveal-delay-1" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
            {['All', 'Workshops', 'Startup Fundraising', 'Community'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePastCategory(cat)}
                style={{
                  padding: '8px 22px',
                  borderRadius: 9999,
                  border: `1px solid ${activePastCategory === cat ? '#000000' : 'var(--border-medium)'}`,
                  background: activePastCategory === cat ? '#000000' : '#ffffff',
                  color: activePastCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activePastCategory === cat ? 'var(--shadow-xs)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 10 Vertical YouTube Shorts / Videos Grid (2 rows x 5 columns) */}
          <div className="past-events-grid">
            {(activePastCategory === 'All'
              ? PAST_EVENT_VIDEOS
              : PAST_EVENT_VIDEOS.filter((v) => v.category === activePastCategory)
            ).map((item, idx) => {
              const embedUrl = getYouTubeEmbedUrl(item.youtubeUrl);
              return (
                <div
                  key={item.id}
                  className={`past-event-video-card reveal-on-scroll reveal-delay-${(idx % 5) + 1}`}
                >
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="past-event-iframe"
                    />
                  ) : (
                    <div className="past-event-placeholder">
                      <div className="past-event-yt-icon">▶</div>
                      <div className="past-event-placeholder-title">{item.title}</div>
                      <div className="past-event-placeholder-hint">
                        + Paste link in <code>PAST_EVENT_VIDEOS</code>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* YouTube Link */}
          <div className="reveal-on-scroll reveal-delay-2" style={{ textAlign: 'center', marginTop: 40 }}>
            <a
              href="https://www.youtube.com/@foundermeetinvestor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-white"
            >
              Watch More on YouTube (@foundermeetinvestor) ↗
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3.8 — "COMMENTS BY FOUNDERS & INVESTORS" (YOUTUBE SHORTS GRID)
          ==================================================================== */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-medium)', borderBottom: '1px solid var(--border-medium)' }}>
        <div className="container container-wide">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">Comments By Founders &amp; Investors</h2>
            <p className="section-subtitle">
              What those who've built and backed say about us.
            </p>
          </div>

          {/* 8 Vertical YouTube Shorts Grid (2 rows x 4 columns) */}
          <div className="comments-shorts-grid">
            {FOUNDER_COMMENT_SHORTS.map((item, idx) => {
              const embedUrl = getYouTubeEmbedUrl(item.youtubeUrl);
              return (
                <div
                  key={item.id}
                  className={`past-event-video-card reveal-on-scroll reveal-delay-${(idx % 4) + 1}`}
                >
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="past-event-iframe"
                    />
                  ) : (
                    <div className="past-event-placeholder">
                      <div className="past-event-yt-icon">▶</div>
                      <div className="past-event-placeholder-title">{item.title}</div>
                      <div className="past-event-placeholder-hint">
                        + Paste link in <code>FOUNDER_COMMENT_SHORTS</code>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3.9 — PODCAST
          ==================================================================== */}
      <section id="podcast" className="section">
        <div className="container">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">Founders Talk with Ayub</h2>
            <p className="section-subtitle">
              Honest conversations with builders shaping what's next in MENA and global technology.
            </p>
          </div>

          <div
            className="reveal-on-scroll reveal-delay-1 with-corner-brackets"
            style={{
              background: '#ffffff',
              border: '1px solid var(--border-medium)',
              borderRadius: 16,
              padding: '36px',
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: 36,
              alignItems: 'center',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            {/* Podcast Banner */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  aspectRatio: '1/1',
                  maxWidth: 220,
                  margin: '0 auto 20px',
                  borderRadius: 14,
                  background: '#000000',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                }}
              >
                <span style={{ fontSize: 36 }}>🎙️</span>
                <span style={{ fontWeight: 800, fontSize: 17, marginTop: 12 }}>
                  Founders Talk
                </span>
                <span style={{ color: '#9ca3af', fontSize: 13, fontWeight: 500 }}>with Ayub</span>
              </div>
              <a
                href="https://youtube.com/@FoundersTalkwithAyub"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-black"
                style={{ fontSize: 13.5, padding: '10px 24px' }}
              >
                Watch on YouTube ↗
              </a>
            </div>

            {/* Episodes List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PODCAST_EPISODES.map((ep) => (
                <a
                  key={ep.id}
                  href="https://youtube.com/@FoundersTalkwithAyub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-float with-corner-brackets"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 10,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                  }}
                >
                  <div>
                    <div style={{ color: '#000000', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                      {ep.title}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{ep.guest}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: 12.5, fontWeight: 600, fontFamily: 'monospace' }}>{ep.duration}</span>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: '#000000',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                      }}
                    >
                      ▶
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3.10 — FAQ ACCORDION
          ==================================================================== */}
      <section id="faqs" className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-medium)', borderBottom: '1px solid var(--border-medium)' }}>
        <div className="container container-narrow">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Quick answers to common questions about our platform and services.
            </p>
          </div>

          <div className="reveal-on-scroll reveal-delay-1">
            {FAQS_DATA.map((faq, i) => (
              <FaqItem key={i} item={faq} />
            ))}
          </div>

          <div className="reveal-on-scroll reveal-delay-2" style={{ textAlign: 'center', marginTop: 36 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 14.5 }}>
              Have more questions?{' '}
              <a
                href="https://cal.com/morsebridge/30-min-intro"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#000000', fontWeight: 700, textDecoration: 'underline' }}
              >
                Schedule an Intro Call ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3.11 — CLOSING CTA BANNER
          ==================================================================== */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 110 }}>
        <div className="container container-narrow reveal-on-scroll">
          <div
            className="with-corner-brackets cta-banner"
            style={{
              background: '#F3E8FF',
              borderRadius: 20,
              padding: '64px 36px',
              color: '#000000',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                fontWeight: 800,
                color: '#000000',
                marginBottom: 16,
                letterSpacing: '-0.03em',
              }}
            >
              Ready to Grow? Let's Go!
            </h2>
            <p style={{ color: '#4b5563', fontSize: 16.5, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
              Book an intro call today and launch your next move with institutional backing.
            </p>
            <a
              href="https://cal.com/morsebridge/30-min-intro"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#000000',
                color: '#ffffff',
                padding: '14px 36px',
                borderRadius: 9999,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Book a 30-Min Intro Call ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
