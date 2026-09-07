import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Mic, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoCard3D from './3d/VideoCard3D';

const FEATURED_PODCASTS = [
  {
    id: 'pod-plug-and-play',
    title: 'Principal Plug and Play: Investors are Not ATM Machines!',
    guest: 'ft. Andrea Azzolari · Principal, Plug and Play Tech Center MENA',
    duration: '1 hr 7 min',
    category: 'Venture Capital',
    videoId: 'O1hPe9GncBQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=O1hPe9GncBQ',
    desc: 'Andrea Azzolari, Principal at Plug and Play Tech Center MENA, breaks down VC evaluation criteria, why investors are not ATM machines, and what truly makes founders fundable.',
    badge: 'EPISODE 01 · VENTURE CAPITAL',
  },
  {
    id: 'pod-fundraising-works',
    title: 'How Startup Fundraising Works | Startup School',
    guest: 'Founders Talk with Ayub · Full Masterclass',
    duration: '1 hr 13 min',
    category: 'Fundraising Masterclass',
    videoId: 'rjflnyDqN2M',
    youtubeUrl: 'https://www.youtube.com/watch?v=rjflnyDqN2M',
    desc: 'A comprehensive masterclass on how startup fundraising actually works: valuation mechanics, pitch deck narratives, SAFEs, and negotiating with lead investors.',
    badge: 'EPISODE 02 · MASTERCLASS',
  },
];

const FEATURED_INVESTOR_DATA = [
  {
    id: 'inv-1',
    title: 'The 3000 VCs Actually Writing Checks for B2B SaaS',
    subtitle: "(And Why You'll Waste 6 Months If You Pitch Wrong) — Comprehensive database of active B2B SaaS institutional leads and check writers.",
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Feb 3, 2026',
    readTime: '9 min read',
    url: 'https://morsebridge.substack.com/p/the-3000-vcs-actually-writing-checks',
    image: '/assets/substack/investor_3000_vcs.jpeg',
    badge: '⭐ 3000 SaaS VCs',
    badgeColor: '#F5B400',
  },
  {
    id: 'inv-2',
    title: '90 Top VCs/Angel Investors Funding Artificial Intelligence Startups in 2026',
    subtitle: 'This guide profiles leading venture capital investors actively funding AI startups across all stages—from pre-seed to Series B with check sizes & focus.',
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Feb 15, 2026',
    readTime: '12 min read',
    url: 'https://morsebridge.substack.com/p/90-top-vcsangel-investors-funding',
    image: '/assets/substack/investor_90_ai.jpeg',
    badge: '⭐ Top 90 AI VCs',
    badgeColor: '#F5B400',
  },
  {
    id: 'inv-3',
    title: 'Investor Data 3k',
    subtitle: 'One time 3k prequalified investor database featuring active venture funds, syndicates, and family offices currently deploying capital.',
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Feb 5, 2026',
    readTime: '8 min read',
    url: 'https://morsebridge.substack.com/p/investor-data-3k',
    image: '/assets/substack/investor_data_3k.png',
    badge: '⭐ 3k Database',
    badgeColor: '#F5B400',
  },
  {
    id: 'inv-4',
    title: '120 Investors, Curated for Execution (20 Per Category)',
    subtitle: "Most founders don’t lose fundraising rounds because capital doesn't exist. They lose because they pitch misaligned investors. Curated across Fintech, AI, SaaS, Consumer, and Deep Tech.",
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Mar 3, 2026',
    readTime: '10 min read',
    url: 'https://morsebridge.substack.com/p/120-investors-curated-for-execution',
    image: '/assets/substack/investor_120_curated.jpeg',
    badge: '⭐ 120 Curated VCs',
    badgeColor: '#F5B400',
  },
  {
    id: 'inv-5',
    title: '100 Middle East Family Offices',
    subtitle: 'One hundred Middle East family offices: named contact, role, direct email, LinkedIn profile, website. Three years of verified allocation data.',
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Aug 15, 2026',
    readTime: '8 min read',
    url: 'https://morsebridge.substack.com/p/100-middle-east-family-offices',
    image: '/assets/substack/investor_100_family_offices.png',
    badge: '⭐ Family Offices',
    badgeColor: '#F5B400',
  },
  {
    id: 'inv-6',
    title: "We Compiled 2,000+ Investors So You Don't Have To — Pre-Seed & Series A",
    subtitle: 'Founding a startup? Save 100+ hours of outreach with 2,000+ verified investor leads categorized by check size, geography, and signal profiles.',
    category: 'Investor Data',
    author: 'Muhammad Ayub',
    authorAvatar: 'https://substack-post-media.s3.amazonaws.com/public/images/46793528-60c0-4e65-aa3b-ec43331fdf1c_1080x1080.png',
    date: 'Apr 15, 2026',
    readTime: '9 min read',
    url: 'https://morsebridge.substack.com/p/we-compiled-2000-investors-so-you',
    image: '/assets/substack/investor_2000_drop.jpeg',
    badge: '⭐ 2,000+ Drop',
    badgeColor: '#F5B400',
  },
];

const FEATURED_PROGRAMS = [
  {
    id: 'acc-1',
    badge: 'Cohort 04 Open',
    badgeColor: '#8B5CF6',
    title: 'Revenue First AI Accelerator',
    sub: '12-Week Intensive Enterprise AI GTM & Capital Sprint',
    image: '/assets/events/revenue_first_accelerator.png',
    date: 'Cohort 04 Enrolling Now',
    location: 'In5 Tech Dubai / Riyadh & Remote',
    price: 'Apply with Form',
    type: 'Hybrid Cohort',
    desc: 'Scale enterprise AI revenue, institutionalize outbound GTM loops, stress-test 5-Minute CFO financial models, and pitch directly to Tier-1 institutional venture funds.',
    applyLink: '/apply?program=revenue-first-ai-accelerator',
    isForm: true,
    buttonText: 'Apply with Form',
  },
  {
    id: 'boot-1',
    badge: 'Every Month',
    badgeColor: '#F5B400',
    title: 'Global Fundraising Boot Camp',
    sub: '5 Workshops, 10 Startups, 25 Angels, VCs & Accelerators',
    image: '/assets/events/bootcamp.png',
    date: 'Every Month (Monthly Cohorts)',
    location: 'In5 Tech Dubai / Global Online Livestream',
    price: 'Apply with Form',
    type: 'Every Month',
    desc: 'Held every month: 10 early-stage startups master pitch decks, the 5-Minute CFO model, SAFEs, and term sheet negotiations with 25 active angels, VCs, and accelerators.',
    applyLink: '/apply?program=global-fundraising-bootcamp',
    isForm: true,
    buttonText: 'Apply with Form',
  },
];

export default function FeaturedSection({ podcasts = [] }) {
  const [activeTab, setActiveTab] = useState('all');

  const displayPodcasts = (podcasts && podcasts.length >= 2) 
    ? podcasts.slice(0, 2) 
    : FEATURED_PODCASTS;

  return (
    <section id="featured" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 350,
          background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.12) 0%, rgba(245, 180, 0, 0.08) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>

          <h2 className="section-title" style={{ marginBottom: 12 }}>
            Featured Spotlight
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 680, margin: '0 auto' }}>
            Flagship venture accelerators, monthly fundraising bootcamps, masterclass podcasts, and proprietary investor databases.
          </p>

          {/* Interactive Category Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 20px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: activeTab === 'all' ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeTab === 'all' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(20, 20, 27, 0.6)',
                color: activeTab === 'all' ? '#FFFFFF' : '#A3A3B0',
              }}
            >
              All Featured (10)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('programs')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 20px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: activeTab === 'programs' ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeTab === 'programs' ? 'rgba(16, 185, 129, 0.22)' : 'rgba(20, 20, 27, 0.6)',
                color: activeTab === 'programs' ? '#10B981' : '#A3A3B0',
              }}
            >
              <Sparkles size={14} />
              <span>Featured Events &amp; Cohorts (2)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('podcasts')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 20px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: activeTab === 'podcasts' ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeTab === 'podcasts' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(20, 20, 27, 0.6)',
                color: activeTab === 'podcasts' ? '#C4B5FD' : '#A3A3B0',
              }}
            >
              <Mic size={14} />
              <span>Top Podcasts (2)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('investor-data')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 20px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: activeTab === 'investor-data' ? '1px solid #F5B400' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeTab === 'investor-data' ? 'rgba(245, 180, 0, 0.22)' : 'rgba(20, 20, 27, 0.6)',
                color: activeTab === 'investor-data' ? '#F5B400' : '#A3A3B0',
              }}
            >
              <Database size={14} />
              <span>Investor Data Directories (6)</span>
            </button>
          </div>
        </div>

        {/* ====================================================================
            FEATURED EVENTS & FLAGSHIP COHORTS (ACCELERATOR & BOOTCAMP)
            ==================================================================== */}
        {(activeTab === 'all' || activeTab === 'programs') && (
          <div style={{ marginBottom: activeTab === 'all' ? 56 : 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.18)', padding: '6px 10px', borderRadius: 8, color: '#10B981' }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Featured Events &amp; Cohorts
                  </h3>
                  <span style={{ fontSize: 12.5, color: '#A3A3B0' }}>
                    Revenue First AI Accelerator &amp; Global Fundraising Boot Camp (Every Month)
                  </span>
                </div>
              </div>

              <Link
                to="/events"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#10B981',
                  textDecoration: 'none',
                }}
              >
                <span>View All Events &amp; Summits</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* 2-Column Responsive Programs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 24,
              }}
            >
              {FEATURED_PROGRAMS.map((prog) => (
                <div
                  key={prog.id}
                  style={{
                    background: '#14141B',
                    borderRadius: 20,
                    border: prog.id === 'acc-1'
                      ? '1px solid rgba(139, 92, 246, 0.35)'
                      : '1px solid rgba(245, 180, 0, 0.35)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                >
                  {/* Fixed Aspect Banner */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 185,
                      borderRadius: 14,
                      overflow: 'hidden',
                      marginBottom: 16,
                      background: prog.image.includes('bootcamp') ? '#FFFFFF' : '#1C1C24',
                      padding: prog.image.includes('bootcamp') ? '4px' : 0,
                    }}
                  >
                    <img
                      src={prog.image}
                      alt={prog.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: prog.image.includes('bootcamp') ? 'contain' : 'cover',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        right: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pointerEvents: 'none',
                      }}
                    >
                      <span
                        className="font-data"
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: prog.id === 'boot-1' ? '#0A0A0F' : '#FFFFFF',
                          background: prog.id === 'boot-1' ? '#F5B400' : '#8B5CF6',
                          padding: '4px 10px',
                          borderRadius: 9999,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        {prog.badge}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#F5F5F7',
                          background: 'rgba(10, 10, 15, 0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 10px',
                          borderRadius: 9999,
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        {prog.type}
                      </span>
                    </div>
                  </div>

                  {/* Program Meta & Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span
                        className="font-data"
                        style={{
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: '#10B981',
                          background: 'rgba(16, 185, 129, 0.12)',
                          padding: '3px 8px',
                          borderRadius: 6,
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                        }}
                      >
                        {prog.price}
                      </span>
                      <span style={{ fontSize: 12, color: '#A3A3B0', fontWeight: 600 }}>
                        {prog.date}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#F5F5F7',
                        lineHeight: 1.3,
                        marginBottom: 6,
                      }}
                    >
                      {prog.title}
                    </h4>

                    <p style={{ fontSize: 12.5, color: prog.id === 'acc-1' ? '#C4B5FD' : '#F5B400', fontWeight: 600, marginBottom: 10 }}>
                      {prog.sub}
                    </p>

                    <p style={{ fontSize: 13, color: '#A3A3B0', lineHeight: 1.55, marginBottom: 18, flex: 1 }}>
                      {prog.desc}
                    </p>

                    {/* Direct Form Button */}
                    <div style={{ paddingTop: 12, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <Link
                        to={prog.applyLink}
                        className="btn-magnetic-signal"
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          padding: '12px 18px',
                          fontSize: 14,
                          fontWeight: 800,
                          borderRadius: 12,
                          background: prog.id === 'boot-1'
                            ? 'linear-gradient(135deg, #F5B400 0%, #D97706 100%)'
                            : 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                          color: prog.id === 'boot-1' ? '#0A0A0F' : '#FFFFFF',
                          textDecoration: 'none',
                          boxShadow: prog.id === 'boot-1'
                            ? '0 6px 20px rgba(245, 180, 0, 0.3)'
                            : '0 6px 20px rgba(139, 92, 246, 0.35)',
                        }}
                      >
                        <span>{prog.buttonText}</span>
                        <ArrowUpRight size={16} />
                        <div className="btn-light-sweep" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            FEATURED PODCASTS BLOCK (FIRST 2 EPISODES)
            ==================================================================== */}
        {(activeTab === 'all' || activeTab === 'podcasts') && (
          <div style={{ marginBottom: activeTab === 'all' ? 56 : 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.18)', padding: '6px 10px', borderRadius: 8, color: '#C4B5FD' }}>
                  <Mic size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Featured Podcast Masterclasses
                  </h3>
                  <span style={{ fontSize: 12.5, color: '#A3A3B0' }}>
                    Top episodes from Founders Talk with Ayub
                  </span>
                </div>
              </div>

              <Link
                to="/podcast"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#C4B5FD',
                  textDecoration: 'none',
                }}
              >
                <span>View Full Podcast Library</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* 2-Column Responsive Podcasts Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 24,
              }}
            >
              {displayPodcasts.map((ep, idx) => (
                <div
                  key={ep.id || idx}
                  style={{
                    background: '#14141B',
                    borderRadius: 20,
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                >
                  {/* Interactive Video Player */}
                  <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
                    <VideoCard3D
                      video={ep}
                      aspectRatio="16/9"
                      index={idx}
                      accent="violet"
                    />
                  </div>

                  {/* Meta & Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                      <span
                        className="font-data"
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#C4B5FD',
                          background: 'rgba(139, 92, 246, 0.15)',
                          padding: '3px 10px',
                          borderRadius: 9999,
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                        }}
                      >
                        {ep.badge || `EPISODE 0${idx + 1}`}
                      </span>

                      <span style={{ fontSize: 11.5, color: '#A3A3B0', fontWeight: 600 }}>
                        {ep.duration}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontSize: 17,
                        fontWeight: 800,
                        color: '#F5F5F7',
                        lineHeight: 1.35,
                        marginBottom: 6,
                      }}
                    >
                      {ep.title}
                    </h4>

                    <p style={{ fontSize: 12.5, color: '#F5B400', fontWeight: 600, marginBottom: 10 }}>
                      {ep.guest}
                    </p>

                    <p style={{ fontSize: 13, color: '#A3A3B0', lineHeight: 1.55, marginBottom: 16, flex: 1 }}>
                      {ep.desc}
                    </p>

                    <div
                      style={{
                        paddingTop: 12,
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: 11.5, color: 'var(--text-subtle)' }}>
                        Founders Talk with Ayub
                      </span>
                      <a
                        href={ep.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: '#8B5CF6',
                          textDecoration: 'none',
                        }}
                      >
                        <span>Watch on YouTube</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            FEATURED INVESTOR DATA DIRECTORIES BLOCK (6 DIRECTORIES)
            ==================================================================== */}
        {(activeTab === 'all' || activeTab === 'investor-data') && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ background: 'rgba(245, 180, 0, 0.18)', padding: '6px 10px', borderRadius: 8, color: '#F5B400' }}>
                  <Database size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Proprietary Investor Data Directories
                  </h3>
                  <span style={{ fontSize: 12.5, color: '#A3A3B0' }}>
                    6 pre-vetted allocation lists with check writers, check sizes &amp; email contacts
                  </span>
                </div>
              </div>

              <a
                href="https://morsebridge.substack.com/s/investor-data?sort=top"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#F5B400',
                  textDecoration: 'none',
                }}
              >
                <span>Access Substack Database</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* 6 Investor Data Cards (3-Column Grid) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 24,
              }}
            >
              {FEATURED_INVESTOR_DATA.map((post, idx) => (
                <a
                  key={post.id || idx}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#14141B',
                    borderRadius: 18,
                    border: '1px solid rgba(245, 180, 0, 0.25)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
                    padding: 14,
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = '#F5B400';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(245, 180, 0, 0.22)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(245, 180, 0, 0.25)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.45)';
                  }}
                >
                  {/* Fixed 16:9 Image Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 175,
                      borderRadius: 12,
                      overflow: 'hidden',
                      marginBottom: 14,
                      background: '#1C1C24',
                    }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: post.title.includes('3000 VCs') ? 'top center' : 'center',
                        display: 'block',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />

                    {/* Badge Chips Over Image */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        right: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pointerEvents: 'none',
                      }}
                    >
                      <span
                        className="font-data"
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: '#F5B400',
                          background: 'rgba(10, 10, 15, 0.88)',
                          backdropFilter: 'blur(8px)',
                          padding: '3px 9px',
                          borderRadius: 9999,
                          border: '1px solid rgba(245, 180, 0, 0.5)',
                        }}
                      >
                        {post.badge}
                      </span>

                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: '#F5F5F7',
                          background: 'rgba(10, 10, 15, 0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '3px 9px',
                          borderRadius: 9999,
                        }}
                      >
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 4px' }}>
                    <h4
                      style={{
                        fontSize: 15.5,
                        fontWeight: 800,
                        color: '#F5F5F7',
                        lineHeight: 1.35,
                        marginBottom: 6,
                      }}
                    >
                      {post.title}
                    </h4>

                    <p
                      style={{
                        fontSize: 12.5,
                        color: '#A3A3B0',
                        lineHeight: 1.55,
                        marginBottom: 16,
                        flex: 1,
                      }}
                    >
                      {post.subtitle}
                    </p>

                    {/* Author & CTA */}
                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: 10,
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <img
                          src={post.authorAvatar}
                          alt={post.author}
                          style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div style={{ fontSize: 11.5, color: '#D4D4D8', fontWeight: 600 }}>{post.date}</div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          color: '#F5B400',
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        <span>Read Directory</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Bottom Section Link */}
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <a
                href="https://morsebridge.substack.com/s/investor-data?sort=top"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic-signal"
                style={{
                  background: 'rgba(245, 180, 0, 0.12)',
                  border: '1px solid rgba(245, 180, 0, 0.4)',
                  color: '#F5B400',
                  padding: '12px 28px',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none',
                }}
              >
                <span>Explore Full 3,000+ Investor Database on Substack</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
