import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  UploadCloud,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  Calendar,
  Users,
  DollarSign,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import Footer from '../components/Footer';
import SignalDivider from '../components/3d/SignalDivider';
import { API_BASE } from '../config/api';

const STACK_TOOLS = [
  { code: 'Cl', name: 'Clay' },
  { code: 'in', name: 'LinkedIn' },
  { code: 'Sn', name: 'Sales Navigator' },
  { code: 'C', name: 'Claude' },
  { code: 'CC', name: 'Claude Code' },
  { code: 'Fo', name: 'Folk' },
  { code: 'No', name: 'Notion' },
  { code: 'Ap', name: 'Apollo' },
  { code: 'In', name: 'Instantly' },
  { code: 'Sm', name: 'Smartlead' },
  { code: 'He', name: 'HeyReach' },
  { code: 'Le', name: 'Lemlist' },
  { code: 'Ph', name: 'PhantomBuster' },
  { code: 'Mk', name: 'Make' },
  { code: 'Za', name: 'Zapier' },
  { code: 'Hu', name: 'Hunter' },
  { code: 'Fm', name: 'Findymail' },
  { code: 'Tr', name: 'Trigify' },
  { code: 'Fa', name: 'Fathom' },
  { code: 'Lo', name: 'Loom' },
  { code: 'Ca', name: 'Calendly' },
  { code: 'Cv', name: 'Canva' },
  { code: 'GS', name: 'Google Sheets' },
  { code: 'St', name: 'Stripe' },
  { code: 'Ai', name: 'Airtable' },
];

const TRACK_STEPS = [
  {
    wk: '3',
    title: 'GTM goes live',
    desc: 'Outreach running every day at real volume. The first proper conversations with people who could actually buy.',
  },
  {
    wk: '4',
    title: 'Demo training',
    desc: 'Learn to run a demo that moves someone to a decision, not just a nod. We practise it until it lands.',
  },
  {
    wk: '5',
    title: 'Customer feedback',
    desc: 'Sit properly with what buyers tell you. The objections, the hesitations, and the things they wish it did.',
  },
  {
    wk: '6',
    title: 'Product re-iteration',
    desc: 'Change the product based on what you heard, not what you assumed. Small, fast, pointed at the objection.',
  },
  {
    wk: '7',
    title: 'First revenue',
    desc: 'The goal is simple: someone pays. If it has not happened yet, this is the week we find out exactly why and fix it.',
  },
  {
    wk: '8',
    title: 'Pricing and offer',
    desc: 'Test what people will actually pay and how you package it. Move off guesswork and onto what the market signals.',
  },
  {
    wk: '9',
    title: 'Repeatable close',
    desc: 'Turn the one sale into a process. The same pitch, the same steps, so the next close is not luck.',
  },
  {
    wk: '10',
    title: 'Turn up the volume',
    desc: 'Push the channel that worked harder. More outreach, more demos, more shots at a yes.',
  },
  {
    wk: '11',
    title: 'Keep them',
    desc: 'Make the customers you won actually succeed. A customer who stays is worth more than three who leave.',
  },
  {
    wk: '12',
    title: 'Traction pack',
    desc: 'Put the numbers together the way an investor reads them. Revenue, retention, and the story behind both.',
  },
  {
    wk: '13',
    title: 'Review and next step',
    desc: 'An honest look at where you are. What is working, what to keep doing, and whether it is time to raise.',
  },
];

const STAGES = [
  'Pre-Idea / Concept',
  'Pre-Revenue (Product Ready)',
  'Early Revenue ($10k – $50k MRR)',
  'Growth Stage ($50k – $150k MRR)',
  'Series A+ ($150k+ MRR)',
];

export default function RunwayPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    stage: 'Pre-Revenue (Product Ready)',
    targetRaise: 'Bootstrapped / Profitable',
    traction: '',
    whyJoin: '',
  });

  const [deckFile, setDeckFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formatSize = (bytes) => {
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
      };
      const reader = new FileReader();
      reader.onload = () => {
        setDeckFile({
          name: file.name,
          size: formatSize(file.size),
          data: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoFillDemo = () => {
    setForm({
      name: 'Elena Rostova',
      email: 'elena@metriceye.io',
      phone: '+44 7700 900821',
      company: 'MetricEye',
      website: 'https://metriceye.io',
      stage: 'Pre-Revenue (Product Ready)',
      targetRaise: '0% Equity / Bootstrapped',
      traction:
        'Functional AI workflow automation product built for supply-chain brokers. Need direct hands-on assistance to build outbound Clay lead funnels, book enterprise demos, and close the first 5 paying contracts.',
      whyJoin:
        'I have deep industry domain knowledge in logistics, but need Ayub to sit with me to structure outbound distribution, demo scripts, and repeatable pricing.',
    });
    setDeckFile({
      name: 'MetricEye_Product_Overview.pdf',
      size: '3.4 MB',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let normalizedWebsite = (form.website || '').trim();
    if (normalizedWebsite && !/^https?:\/\//i.test(normalizedWebsite)) {
      normalizedWebsite = `https://${normalizedWebsite}`;
    }

    const payload = {
      program: 'Runway — Revenue in 90 Days',
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      website: normalizedWebsite,
      stage: form.stage,
      targetRaise: form.targetRaise,
      traction: form.traction,
      whyJoin: form.whyJoin,
      deckFileName: deckFile?.name || 'Pitch_Deck.pdf',
      pitchDeckName: deckFile?.name || 'Pitch_Deck.pdf',
      pitchDeckData: deckFile?.data || '',
    };

    try {
      const res = await fetch(`${API_BASE}/api/programs/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setSubmissionData({
        ...payload,
        id: data.applicationId || `RUNWAY-${Date.now().toString().slice(-6)}`,
      });
    } catch (err) {
      setSubmissionData({
        ...payload,
        id: `RUNWAY-${Date.now().toString().slice(-6)}`,
      });
    } finally {
      setLoading(false);
      setSubmitted(true);
      const applyEl = document.getElementById('apply');
      if (applyEl) applyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToApply = (e) => {
    e.preventDefault();
    const el = document.getElementById('apply');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        background: '#0C0A11',
        color: '#EEECF3',
        minHeight: '100vh',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: '17px',
        lineHeight: 1.62,
        paddingTop: '70px',
      }}
    >
      {/* Sticky Program Sub-Header Topbar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          background: 'rgba(13, 11, 18, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.10)',
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: '#9C95AD',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#EEECF3')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#9C95AD')}
            >
              <ArrowLeft size={14} />
              <span>Morsebridge</span>
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>/</span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-0.01em',
                color: '#EEECF3',
              }}
            >
              Runway
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                color: '#CBA24E',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'rgba(203, 162, 78, 0.12)',
                border: '1px solid rgba(203, 162, 78, 0.3)',
                padding: '4px 12px',
                borderRadius: 9999,
              }}
              className="d-none d-sm-inline-block"
            >
              Cohort One · Starts 1 Nov
            </span>
            <a
              href="#apply"
              onClick={scrollToApply}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 14.5,
                background: '#7A6BD0',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '8px 22px',
                borderRadius: 9999,
                transition: 'background 0.2s ease, transform 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#5e53a2';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#7A6BD0';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Apply
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        style={{
          padding: '64px 0 62px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderTop: 'none',
        }}
      >
        {/* Ambient violet radial glow */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 720,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(110, 98, 184, 0.18), transparent 72%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
          {/* Logo Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '24px 44px',
              margin: '0 0 32px',
              boxShadow: '0 26px 70px -30px rgba(0, 0, 0, 0.95), 0 0 40px rgba(122, 107, 208, 0.15)',
            }}
          >
            <img
              src="/runway-logo-navy.jpg?v=2"
              alt="Runway — Revenue in 90 Days by Morsebridge"
              style={{
                height: 96,
                maxHeight: 112,
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </motion.div>

          {/* Eyebrow */}
          <div>
            <span
              style={{
                display: 'inline-block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#AB9EE8',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: 9999,
                padding: '7px 18px',
                background: 'rgba(110, 98, 184, 0.10)',
                marginBottom: 24,
              }}
            >
              A Morsebridge program
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(36px, 6vw, 70px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              maxWidth: '16ch',
              margin: '0 auto 22px',
              color: '#EEECF3',
            }}
          >
            Let's get you paid before the runway runs out.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(17px, 2.2vw, 20px)',
              color: '#9C95AD',
              maxWidth: '54ch',
              margin: '0 auto 32px',
              lineHeight: 1.55,
            }}
          >
            Thirteen weeks. Ten founders. I sit with you while we build it, launch it, and find the first people willing to pay. You keep all of your equity.
          </p>

          {/* Metadata Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 12,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              color: '#9C95AD',
            }}
          >
            <span
              style={{
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 9999,
                padding: '8px 18px',
                background: '#17141F',
              }}
            >
              <b style={{ color: '#CBA24E', fontWeight: 600 }}>Starts 1 November</b>
            </span>
            <span
              style={{
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 9999,
                padding: '8px 18px',
                background: '#17141F',
              }}
            >
              <b style={{ color: '#EEECF3', fontWeight: 600 }}>13 weeks</b>, hands on the whole time
            </span>
            <span
              style={{
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 9999,
                padding: '8px 18px',
                background: '#17141F',
              }}
            >
              <b style={{ color: '#AB9EE8', fontWeight: 600 }}>Only 10 founders</b>
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 1: MARKET FIGURES & THE GAP */}
      <section style={{ padding: '54px 0', borderTop: '1px solid rgba(255, 255, 255, 0.10)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(29px, 4.4vw, 42px)',
              marginBottom: 20,
              maxWidth: '22ch',
              lineHeight: 1.08,
            }}
          >
            Here is what I keep watching happen.
          </h2>

          <div style={{ maxWidth: '64ch', color: '#9C95AD' }}>
            <p
              style={{
                fontSize: 20,
                lineHeight: 1.55,
                color: '#EEECF3',
                marginBottom: '1.1em',
              }}
            >
              Someone builds a good product. It works. And then nothing happens, because they never learned how to put it in front of a person who would pay for it.
            </p>
            <p style={{ marginBottom: '1.1em' }}>
              AI made the building part cheap. The selling part stayed just as hard as it always was. That is the gap almost everyone falls into, and no amount of extra features gets you out of it.
            </p>
            <p style={{ marginBottom: '1.1em', fontSize: 18 }}>
              So I am not going to stand at the front of a room and teach you.{' '}
              <strong style={{ color: '#EEECF3', fontWeight: 600 }}>
                I am going to sit next to you and do it with you.
              </strong>
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
              marginTop: 36,
            }}
          >
            <div
              style={{
                background: '#17141F',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: 16,
                padding: '26px 24px',
              }}
            >
              <b
                style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 38,
                  lineHeight: 1,
                  color: '#AB9EE8',
                }}
              >
                5.2m
              </b>
              <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.5, color: '#9C95AD' }}>
                New business applications filed in the US in 2024. US Census Bureau.
              </p>
            </div>

            <div
              style={{
                background: '#17141F',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: 16,
                padding: '26px 24px',
              }}
            >
              <b
                style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 38,
                  lineHeight: 1,
                  color: '#AB9EE8',
                }}
              >
                51.4%
              </b>
              <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.5, color: '#9C95AD' }}>
                Still going five years later. That number has barely moved since 1994. BLS.
              </p>
            </div>

            <div
              style={{
                background: '#17141F',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: 16,
                padding: '26px 24px',
              }}
            >
              <b
                style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 38,
                  lineHeight: 1,
                  color: '#CBA24E',
                }}
              >
                45.7%
              </b>
              <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.5, color: '#9C95AD' }}>
                Five-year survival in information, the sector closest to software. The lowest of any industry measured. BLS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW THE 13 WEEKS GO */}
      <section style={{ padding: '54px 0', borderTop: '1px solid rgba(255, 255, 255, 0.10)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(29px, 4.4vw, 42px)',
              marginBottom: 16,
              maxWidth: '22ch',
            }}
          >
            How the thirteen weeks go
          </h2>
          <p style={{ maxWidth: '64ch', color: '#9C95AD', marginBottom: 28, fontSize: 16 }}>
            The building weeks are in violet. The revenue and raising weeks are in gold. Those are the two colours Morsebridge already uses, one for founders and one for capital.
          </p>

          {/* Two Phase Cards in Violet */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 16,
              marginTop: 12,
            }}
          >
            <div
              style={{
                border: '1px solid rgba(110, 98, 184, 0.35)',
                borderRadius: 20,
                padding: '30px 28px',
                background: '#17141F',
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#AB9EE8',
                }}
              >
                Week 1 · Build
              </span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 23,
                  margin: '12px 0 10px',
                  color: '#EEECF3',
                }}
              >
                We build it, and we launch it
              </h3>
              <p style={{ color: '#9C95AD', margin: '0 0 18px', fontSize: '15.5px' }}>
                Five days to turn the idea into something real and get it in front of actual people. No more waiting for it to feel ready. We build it together and we put it out.
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <li style={{ fontSize: '13.5px', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 9999, padding: '6px 14px', color: '#EEECF3' }}>
                  Product built with you
                </li>
                <li style={{ fontSize: '13.5px', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 9999, padding: '6px 14px', color: '#EEECF3' }}>
                  Out in the world, not parked
                </li>
                <li style={{ fontSize: '13.5px', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 9999, padding: '6px 14px', color: '#EEECF3' }}>
                  First real conversations
                </li>
              </ul>
            </div>

            <div
              style={{
                border: '1px solid rgba(110, 98, 184, 0.35)',
                borderRadius: 20,
                padding: '30px 28px',
                background: '#17141F',
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#AB9EE8',
                }}
              >
                Week 2 · Distribution
              </span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 23,
                  margin: '12px 0 10px',
                  color: '#EEECF3',
                }}
              >
                We find the way you reach people
              </h3>
              <p style={{ color: '#9C95AD', margin: '0 0 18px', fontSize: '15.5px' }}>
                We pick one way to get in front of buyers and run it until it works. This is the part most people skip, and it is the part that decides everything.
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <li style={{ fontSize: '13.5px', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 9999, padding: '6px 14px', color: '#EEECF3' }}>
                  Who your buyer actually is
                </li>
                <li style={{ fontSize: '13.5px', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 9999, padding: '6px 14px', color: '#EEECF3' }}>
                  A real list, real outreach
                </li>
                <li style={{ fontSize: '13.5px', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 9999, padding: '6px 14px', color: '#EEECF3' }}>
                  What they say back, written down
                </li>
              </ul>
            </div>
          </div>

          {/* Track Header in Gold */}
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#CBA24E',
              margin: '44px 0 6px',
            }}
          >
            Weeks 3 to 13 · Revenue &amp; scale
          </p>
          <p style={{ color: '#9C95AD', fontSize: '15.5px', maxWidth: '64ch', margin: '0 0 32px' }}>
            You run it, I stay with you. Every week has a job. These are the milestones we work toward, not promises the market has to keep. Some weeks you will move faster, some slower. That is normal, and it is why I am here.
          </p>

          {/* Week Timeline Track */}
          <div style={{ position: 'relative', marginLeft: 6 }}>
            {/* Timeline line */}
            <div
              style={{
                position: 'absolute',
                left: 26,
                top: 14,
                bottom: 14,
                width: 2,
                background: 'linear-gradient(to bottom, rgba(195, 154, 73, 0.6), rgba(195, 154, 73, 0.12))',
              }}
            />

            {TRACK_STEPS.map((step, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: '54px 1fr',
                  gap: 20,
                  padding: '0 0 24px',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    background: '#17141F',
                    border: '1px solid rgba(195, 154, 73, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Space Grotesk', sans-serif",
                    lineHeight: 1,
                  }}
                >
                  <small style={{ fontSize: 9, letterSpacing: '0.08em', color: '#9C95AD', textTransform: 'uppercase' }}>
                    Wk
                  </small>
                  <b style={{ fontSize: 20, fontWeight: 700, color: '#CBA24E' }}>{step.wk}</b>
                </div>

                <div style={{ paddingTop: 5 }}>
                  <h4
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: 17,
                      margin: '0 0 4px',
                      color: '#EEECF3',
                    }}
                  >
                    {step.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: 15, color: '#9C95AD' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: THE ONE RULE */}
      <section style={{ padding: '54px 0', borderTop: '1px solid rgba(255, 255, 255, 0.10)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px' }}>
          <div
            style={{
              background: '#17141F',
              border: '1px solid rgba(195, 154, 73, 0.35)',
              borderRadius: 22,
              padding: '48px 40px',
              textAlign: 'center',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 32px rgba(195, 154, 73, 0.08)',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#CBA24E',
              }}
            >
              The one rule
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(25px, 3.8vw, 36px)',
                margin: '14px auto 12px',
                maxWidth: '22ch',
                color: '#EEECF3',
                lineHeight: 1.15,
              }}
            >
              You get paid from day one for solving a customer problem.
            </h2>
            <p style={{ color: '#9C95AD', maxWidth: '52ch', margin: '0 auto', fontSize: 16 }}>
              Building is organic. It needs ecosystem, understanding and momentum, and none of it arrives on time. When no one will bet on you yet, you take the first bet on yourself. The first bet is asking someone to pay.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHO I WANT IN THE ROOM */}
      <section style={{ padding: '54px 0', borderTop: '1px solid rgba(255, 255, 255, 0.10)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(29px, 4.4vw, 42px)',
              marginBottom: 20,
              maxWidth: '22ch',
            }}
          >
            Who I want in the room
          </h2>
          <div style={{ maxWidth: '64ch', color: '#9C95AD' }}>
            <p style={{ fontSize: 20, lineHeight: 1.55, color: '#EEECF3', marginBottom: '1.1em' }}>
              People who have lived in an industry, know it from the inside, have something worth building, and just have not cracked how to get customers yet.
            </p>
            <p style={{ marginBottom: '1.1em' }}>
              If you already understand a field, you are further along than you think. People will trust you, and you know what they pay for. Bring that, and the stomach to ask for money before everything is perfect.
            </p>
            <p style={{ marginBottom: '1.1em', fontSize: 18 }}>
              Ten places, and I read every application myself.{' '}
              <strong style={{ color: '#EEECF3', fontWeight: 600 }}>Selection is competitive.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: DELIVERABLES & 25-TOOL STACK */}
      <section style={{ padding: '54px 0', borderTop: '1px solid rgba(255, 255, 255, 0.10)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(29px, 4.4vw, 42px)',
              marginBottom: 16,
              maxWidth: '22ch',
            }}
          >
            What you will walk away able to do
          </h2>
          <p style={{ maxWidth: '64ch', color: '#9C95AD', marginBottom: 28, fontSize: 16 }}>
            Skills you keep and use on every customer after this: prospecting, lead qualification, message scripting, booking demos, running a demo, pricing and closing, reading your own numbers, and iterating fast on feedback.
          </p>

          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#AB9EE8',
              margin: '36px 0 12px',
            }}
          >
            Built with you, not handed as a template
          </p>

          {/* 4 Deliverables Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 14,
            }}
          >
            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: 16,
                padding: '22px 22px',
                background: '#17141F',
              }}
            >
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, margin: '0 0 6px', color: '#EEECF3' }}>
                Your lead funnels
              </h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#9C95AD' }}>
                Inbound and outbound, built and running with you, not handed over as a template to figure out alone.
              </p>
            </div>

            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: 16,
                padding: '22px 22px',
                background: '#17141F',
              }}
            >
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, margin: '0 0 6px', color: '#EEECF3' }}>
                Financial model and unit economics
              </h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#9C95AD' }}>
                Your model built with you, so the numbers hold up in any room.
              </p>
            </div>

            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: 16,
                padding: '22px 22px',
                background: '#17141F',
              }}
            >
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, margin: '0 0 6px', color: '#EEECF3' }}>
                LinkedIn page and Sales Navigator
              </h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#9C95AD' }}>
                Your page tuned to convert, plus hands-on Sales Navigator training.
              </p>
            </div>

            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: 16,
                padding: '22px 22px',
                background: '#17141F',
              }}
            >
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, margin: '0 0 6px', color: '#EEECF3' }}>
                Clay, end to end
              </h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#9C95AD' }}>
                The tool that runs the machine, taught properly, not skimmed.
              </p>
            </div>
          </div>

          {/* 25-Tool Stack */}
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#AB9EE8',
              margin: '40px 0 6px',
            }}
          >
            The stack you will learn
          </p>
          <p style={{ color: '#9C95AD', fontSize: 15, margin: '0 0 22px', maxWidth: '64ch' }}>
            Twenty-five tools, taught hands on and wired into one working system. Logos are badges wired into the curriculum:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gap: 12,
            }}
          >
            {STACK_TOOLS.map((tool, idx) => (
              <figure
                key={idx}
                style={{
                  margin: 0,
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: 16,
                  background: '#17141F',
                  padding: '16px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'center',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(122, 107, 208, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.10)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#1E1A29',
                    border: '1px solid rgba(255, 255, 255, 0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 17,
                    color: '#AB9EE8',
                  }}
                >
                  {tool.code}
                </span>
                <figcaption
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: '12.5px',
                    color: '#EEECF3',
                    lineHeight: 1.2,
                  }}
                >
                  {tool.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: WHO RUNS THIS (AYUB RAFIQUE) */}
      <section style={{ padding: '54px 0', borderTop: '1px solid rgba(255, 255, 255, 0.10)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(29px, 4.4vw, 42px)',
              marginBottom: 20,
              maxWidth: '22ch',
            }}
          >
            Who runs this
          </h2>

          <div style={{ maxWidth: '64ch' }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                marginBottom: 2,
                color: '#EEECF3',
              }}
            >
              Ayub Rafique
            </div>
            <div style={{ color: '#AB9EE8', marginBottom: 22, fontWeight: 500, fontSize: 16 }}>
              Founder, Morsebridge
            </div>

            <p style={{ color: '#9C95AD', marginBottom: '1.1em' }}>
              He is not teaching this from a book. He has done it himself, more than once, and recently.
            </p>
            <p style={{ color: '#9C95AD', marginBottom: '1.1em' }}>
              He spent a decade in financial audit and advisory at KPMG and BDO Binder International. In 2023 he built an accounting product that ran entirely through WhatsApp, and sold it to an accounting firm that was trying to build the same thing in-house.
            </p>
            <p style={{ color: '#9C95AD', marginBottom: '1.1em' }}>
              Since then he has built several due diligence engines for private equity and venture capital firms across North America and Europe. Each one went out fast, ran against real deals, and passed the only test that counts.{' '}
              <strong style={{ color: '#EEECF3', fontWeight: 600 }}>Firms paid for them.</strong>
            </p>
            <p style={{ color: '#9C95AD', marginBottom: '1.1em' }}>
              In his first 90 days he brought in{' '}
              <strong style={{ color: '#EEECF3', fontWeight: 600 }}>$350,000 in revenue</strong>, $11,945 of it recurring, most of it from custom builds sold to private equity firms. From a standing start, with no funding round and no equity given away. Along the way he has trained investment professionals across 300 private equity firms and run seven cohorts of the Global Fundraising BootCamp.
            </p>
            <p style={{ color: '#9C95AD', marginBottom: '1.1em' }}>
              He has also run accelerator programs that brought founders into the same room as the people who fund them, from angels to venture funds to private equity, for both early-stage and scale-up companies. Investors in that network include{' '}
              <strong style={{ color: '#EEECF3', fontWeight: 600 }}>Shorooq Partners</strong> and{' '}
              <strong style={{ color: '#EEECF3', fontWeight: 600 }}>NUWA Capital</strong>.
            </p>

            {/* 4 Proof Metric Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 16,
                marginTop: 32,
              }}
            >
              <div
                style={{
                  background: '#17141F',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: 16,
                  padding: '22px 20px',
                }}
              >
                <b
                  style={{
                    display: 'block',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 26,
                    color: '#AB9EE8',
                  }}
                >
                  $350,000
                </b>
                <span style={{ display: 'block', fontSize: 13, lineHeight: 1.45, color: '#9C95AD', marginTop: 6 }}>
                  Revenue in his first 90 days. No funding, no equity
                </span>
              </div>

              <div
                style={{
                  background: '#17141F',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: 16,
                  padding: '22px 20px',
                }}
              >
                <b
                  style={{
                    display: 'block',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 26,
                    color: '#CBA24E',
                  }}
                >
                  $11,945
                </b>
                <span style={{ display: 'block', fontSize: 13, lineHeight: 1.45, color: '#9C95AD', marginTop: 6 }}>
                  Recurring, inside that same 90 days
                </span>
              </div>

              <div
                style={{
                  background: '#17141F',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: 16,
                  padding: '22px 20px',
                }}
              >
                <b
                  style={{
                    display: 'block',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 26,
                    color: '#AB9EE8',
                  }}
                >
                  300 firms
                </b>
                <span style={{ display: 'block', fontSize: 13, lineHeight: 1.45, color: '#9C95AD', marginTop: 6 }}>
                  PE firms whose professionals he has trained
                </span>
              </div>

              <div
                style={{
                  background: '#17141F',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: 16,
                  padding: '22px 20px',
                }}
              >
                <b
                  style={{
                    display: 'block',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 26,
                    color: '#CBA24E',
                  }}
                >
                  7 cohorts
                </b>
                <span style={{ display: 'block', fontSize: 13, lineHeight: 1.45, color: '#9C95AD', marginTop: 6 }}>
                  Global Fundraising BootCamp delivered
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: APPLY SECTION */}
      <section
        id="apply"
        style={{
          padding: '64px 0 80px',
          borderTop: '1px solid rgba(255, 255, 255, 0.10)',
        }}
      >
        <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#AB9EE8',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: 9999,
                padding: '7px 18px',
                background: 'rgba(110, 98, 184, 0.10)',
                marginBottom: 20,
              }}
            >
              Cohort one
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 4.2vw, 42px)',
                margin: '0 auto 16px',
                maxWidth: '22ch',
                color: '#EEECF3',
              }}
            >
              Come and take one of the ten seats.
            </h2>
            <p style={{ color: '#9C95AD', margin: '0 auto 30px', maxWidth: '52ch', fontSize: 16 }}>
              We start on 1 November. Apply and I will read it. Seats close once the ten are full.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 40,
                flexWrap: 'wrap',
                margin: '0 0 32px',
              }}
            >
              <div
                style={{
                  background: '#17141F',
                  border: '1px solid rgba(195, 154, 73, 0.35)',
                  borderRadius: 18,
                  padding: '20px 36px',
                }}
              >
                <b
                  style={{
                    display: 'block',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 40,
                    color: '#CBA24E',
                  }}
                >
                  $2,600
                </b>
                <span style={{ display: 'block', fontSize: 14, color: '#9C95AD' }}>
                  Per founder, for the full thirteen weeks
                </span>
              </div>
            </div>

            <p style={{ margin: '0 auto', fontSize: 14.5, color: '#9C95AD', maxWidth: '52ch' }}>
              No equity, no capital. Just the work, done alongside you.
            </p>
          </div>

          {/* Interactive Application Form or Success Screen */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="runway-form"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                style={{
                  background: '#17141F',
                  border: '1px solid rgba(122, 107, 208, 0.3)',
                  borderRadius: 22,
                  padding: '36px 32px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.65)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 26,
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 21,
                        fontWeight: 700,
                        color: '#EEECF3',
                        margin: 0,
                      }}
                    >
                      Application to Runway (Cohort 01)
                    </h3>
                    <p style={{ color: '#9C95AD', fontSize: 13.5, margin: '4px 0 0' }}>
                      Ayub Rafique reviews every application personally.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoFillDemo}
                    style={{
                      background: 'rgba(122, 107, 208, 0.15)',
                      border: '1px solid rgba(122, 107, 208, 0.35)',
                      color: '#AB9EE8',
                      padding: '8px 16px',
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Demo Auto-Fill
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Name & Email */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: 16,
                      marginBottom: 18,
                    }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#EEECF3', marginBottom: 6 }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Elena Rostova"
                        value={form.name}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: '#0C0A11',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: 10,
                          color: '#FFFFFF',
                          fontSize: 14.5,
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#EEECF3', marginBottom: 6 }}>
                        Direct Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="elena@company.com"
                        value={form.email}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: '#0C0A11',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: 10,
                          color: '#FFFFFF',
                          fontSize: 14.5,
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: 16,
                      marginBottom: 18,
                    }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#EEECF3', marginBottom: 6 }}>
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+44 7700 900821"
                        value={form.phone}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: '#0C0A11',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: 10,
                          color: '#FFFFFF',
                          fontSize: 14.5,
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#EEECF3', marginBottom: 6 }}>
                        Company / Project Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        placeholder="MetricEye"
                        value={form.company}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: '#0C0A11',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: 10,
                          color: '#FFFFFF',
                          fontSize: 14.5,
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Website & Stage */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: 16,
                      marginBottom: 18,
                    }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#EEECF3', marginBottom: 6 }}>
                        Website or Product Link
                      </label>
                      <input
                        type="text"
                        name="website"
                        placeholder="https://yourproduct.com"
                        value={form.website}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: '#0C0A11',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: 10,
                          color: '#FFFFFF',
                          fontSize: 14.5,
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#EEECF3', marginBottom: 6 }}>
                        Current Stage
                      </label>
                      <select
                        name="stage"
                        value={form.stage}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: '#0C0A11',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: 10,
                          color: '#FFFFFF',
                          fontSize: 14.5,
                          outline: 'none',
                        }}
                      >
                        {STAGES.map((stg) => (
                          <option key={stg} value={stg} style={{ background: '#17141F' }}>
                            {stg}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Pitch Deck / Teaser Upload */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#EEECF3', marginBottom: 6 }}>
                      Product Overview / Deck (Optional PDF / PPTX)
                    </label>
                    <label
                      style={{
                        border: '2px dashed rgba(122, 107, 208, 0.35)',
                        borderRadius: 14,
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(122, 107, 208, 0.05)',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease, background 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#7A6BD0';
                        e.currentTarget.style.background = 'rgba(122, 107, 208, 0.10)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(122, 107, 208, 0.35)';
                        e.currentTarget.style.background = 'rgba(122, 107, 208, 0.05)';
                      }}
                    >
                      <input type="file" accept=".pdf,.pptx,.ppt" onChange={handleFileUpload} style={{ display: 'none' }} />
                      <UploadCloud size={28} color="#AB9EE8" style={{ marginBottom: 8 }} />
                      {deckFile ? (
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ color: '#AB9EE8', fontWeight: 700, fontSize: 14 }}>{deckFile.name}</p>
                          <p style={{ color: '#9C95AD', fontSize: 12 }}>{deckFile.size} • Click to replace file</p>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ color: '#EEECF3', fontWeight: 600, fontSize: 14 }}>
                            Drag &amp; drop overview PDF or <span style={{ color: '#AB9EE8' }}>Browse</span>
                          </p>
                          <p style={{ color: '#9C95AD', fontSize: 12 }}>Supported formats: PDF, PPTX up to 25MB</p>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Industry background & why you want in */}
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#EEECF3', marginBottom: 6 }}>
                      What industry do you know from the inside, and what are you building? *
                    </label>
                    <textarea
                      name="traction"
                      required
                      rows={4}
                      placeholder="Tell us what problem you're solving, why you know this field, and where you are stuck with getting customers..."
                      value={form.traction}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0C0A11',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 10,
                        color: '#FFFFFF',
                        fontSize: 14.5,
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: 9999,
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      background: '#7A6BD0',
                      color: '#FFFFFF',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: 17,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      boxShadow: '0 8px 24px rgba(122, 107, 208, 0.45)',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.background = '#5e53a2';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#7A6BD0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {loading ? (
                      <span>Sending Application to Ayub Rafique...</span>
                    ) : (
                      <>
                        <span>Apply for Runway (13 Weeks · $2,600)</span>
                        <ChevronRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* Success Celebration Receipt */
              <motion.div
                key="runway-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: '#17141F',
                  border: '1px solid rgba(203, 162, 78, 0.45)',
                  borderRadius: 22,
                  padding: '44px 32px',
                  textAlign: 'center',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(203, 162, 78, 0.15)',
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #CBA24E, #9A772B)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 8px 28px rgba(203, 162, 78, 0.4)',
                  }}
                >
                  <CheckCircle2 size={38} color="#FFFFFF" />
                </div>

                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#CBA24E',
                    border: '1px solid rgba(203, 162, 78, 0.35)',
                    borderRadius: 9999,
                    padding: '5px 16px',
                    background: 'rgba(203, 162, 78, 0.12)',
                    marginBottom: 16,
                  }}
                >
                  Application Received · Runway Cohort 01
                </span>

                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(24px, 4vw, 34px)',
                    fontWeight: 700,
                    color: '#EEECF3',
                    marginBottom: 12,
                  }}
                >
                  Thank you, {submissionData?.name}!
                </h2>

                <p style={{ color: '#9C95AD', fontSize: 16, maxWidth: 540, margin: '0 auto 24px', lineHeight: 1.6 }}>
                  Your application for <strong style={{ color: '#EEECF3' }}>Runway</strong> on behalf of{' '}
                  <strong style={{ color: '#EEECF3' }}>{submissionData?.company}</strong> has been logged. Ayub Rafique reviews every submission personally before seats fill.
                </p>

                {/* Receipt Card */}
                <div
                  style={{
                    maxWidth: 500,
                    margin: '0 auto 32px',
                    background: '#0C0A11',
                    border: '1px solid rgba(255, 255, 255, 0.10)',
                    borderRadius: 14,
                    padding: '20px',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingBottom: 8,
                    }}
                  >
                    <span style={{ color: '#9C95AD', fontSize: 13 }}>Reference ID:</span>
                    <span style={{ color: '#AB9EE8', fontWeight: 700, fontSize: 13 }}>{submissionData?.id}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingBottom: 8,
                    }}
                  >
                    <span style={{ color: '#9C95AD', fontSize: 13 }}>Program Term:</span>
                    <span style={{ color: '#EEECF3', fontWeight: 600, fontSize: 13 }}>13 Weeks · Starts 1 Nov</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9C95AD', fontSize: 13 }}>Status:</span>
                    <span style={{ color: '#CBA24E', fontWeight: 700, fontSize: 13 }}>Direct Review with Ayub</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    style={{
                      padding: '12px 24px',
                      borderRadius: 9999,
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#EEECF3',
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: 'pointer',
                    }}
                  >
                    Submit Another Application
                  </button>

                  <Link
                    to="/products"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 24px',
                      borderRadius: 9999,
                      background: '#7A6BD0',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: 'none',
                    }}
                  >
                    <span>Browse Morsebridge Products</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: '32px 0 46px',
          borderTop: '1px solid rgba(255, 255, 255, 0.10)',
          fontSize: 14,
          color: '#9C95AD',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px' }}>
          Runway is a Morsebridge program. Questions before you apply,{' '}
          <a
            href="mailto:contact@morsebridge.com"
            style={{ color: '#EEECF3', textDecoration: 'underline' }}
          >
            get in touch
          </a>
          .
        </div>
      </footer>
    </div>
  );
}
