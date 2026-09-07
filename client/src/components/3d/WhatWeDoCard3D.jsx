import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Building2,
  RotateCw,
  ExternalLink,
} from 'lucide-react';

export default function WhatWeDoCard3D({ item = {}, index = 0, href, link }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const destinationUrl = item.link || item.href || href || link;
  const caseStudy = item.caseStudy || {};

  const handleCardClick = (e) => {
    if (!destinationUrl) return;
    if (destinationUrl.startsWith('http://') || destinationUrl.startsWith('https://')) {
      window.open(destinationUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigate(destinationUrl);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(e);
    }
  };

  const handleToggleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className="wwd-3d-scene"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`Explore ${item.title || 'Offering'}`}
    >
      <div className={`wwd-3d-inner ${isFlipped ? 'is-flipped' : ''}`}>
        {/* ==================================================================
            FRONT FACE — CAPABILITY & PROGRAMS
            ================================================================== */}
        <div className="wwd-face wwd-face-front">
          {/* Top Fixed-Aspect-Ratio Image Banner */}
          {item.image && (
            <div className="what-we-do-img-wrap" style={{ marginBottom: 14, height: 215 }}>
              <img
                src={item.image}
                alt={item.title || 'MorseBridge Program'}
                className="what-we-do-img"
                loading="lazy"
                style={item.imageFit ? { objectFit: item.imageFit } : undefined}
                onError={(e) => {
                  e.currentTarget.parentElement.style.display = 'none';
                }}
              />

              {/* Zero-Shift Floating Badge */}
              <div className="wwd-view-details-pill">
                <span>Case Study</span>
                <RotateCw size={11} />
              </div>
            </div>
          )}

          {/* Title Row with Link Arrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 10,
            }}
          >
            <h3
              style={{
                margin: 0,
                color: '#F5F5F7',
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </h3>

            <div
              className="wwd-action-arrow"
              title="View details"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(e);
              }}
            >
              <ArrowUpRight size={15} />
            </div>
          </div>

          {/* Capability Bullet Points */}
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 14px 0',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {item.points &&
              item.points.map((pt, pIdx) => (
                <li
                  key={pIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    fontSize: 12.5,
                    lineHeight: 1.5,
                    color: 'var(--text-body)',
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#8B5CF6',
                      marginTop: 7,
                      flexShrink: 0,
                      boxShadow: '0 0 6px rgba(139, 92, 246, 0.6)',
                    }}
                  />
                  <span>{pt}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* ==================================================================
            BACK FACE — CASE STUDY ("LITTLE BIG CARD")
            ================================================================== */}
        <div className="wwd-face wwd-face-back">
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <div className="case-study-badge">
              <Sparkles size={11} color="#C4B5FD" />
              <span>CASE STUDY</span>
            </div>

            <button
              type="button"
              onClick={handleToggleFlip}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 9999,
                padding: '4px 10px',
                color: '#A3A3B0',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <RotateCw size={11} />
              <span>Overview</span>
            </button>
          </div>

          {/* Case Study Title */}
          <h4
            style={{
              fontSize: 16.5,
              fontWeight: 800,
              color: '#F5F5F7',
              margin: '0 0 6px',
              lineHeight: 1.3,
            }}
          >
            {caseStudy.title || item.title}
          </h4>

          {/* VC Firm Box */}
          <div className="case-study-vc-box">
            <div className="case-study-vc-icon">
              <Building2 size={16} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: '#A3A3B0',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                PARTNER VC FIRM / SYNDICATE
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: '#FFFFFF' }}>
                {caseStudy.vcFirm || 'Institutional VC Syndicate & Family Offices'}
              </div>
            </div>
          </div>

          {/* Stats Matrix: Companies & People Involved */}
          <div className="case-study-stats-grid">
            <div className="case-study-stat-card">
              <div className="case-study-stat-val purple">
                {caseStudy.companiesInvolved || '40+ Startups'}
              </div>
              <div className="case-study-stat-lbl">Companies Involved</div>
            </div>

            <div className="case-study-stat-card">
              <div className="case-study-stat-val gold">
                {caseStudy.peopleInvolved || '150+ People'}
              </div>
              <div className="case-study-stat-lbl">People / Founders</div>
            </div>

            <div className="case-study-stat-card">
              <div className="case-study-stat-val">
                {caseStudy.capitalCatalyzed || '$15M+'}
              </div>
              <div className="case-study-stat-lbl">
                {caseStudy.impactLabel || 'Capital Catalyzed'}
              </div>
            </div>

            <div className="case-study-stat-card">
              <div className="case-study-stat-val gold">
                {caseStudy.velocity || '82% Success'}
              </div>
              <div className="case-study-stat-lbl">
                {caseStudy.velocityLabel || 'Conversion Rate'}
              </div>
            </div>
          </div>

          {/* Case Study Narrative Summary */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 10,
              padding: '10px 12px',
              fontSize: 12,
              lineHeight: 1.5,
              color: '#D4D4D8',
              marginBottom: 12,
            }}
          >
            <p style={{ margin: 0 }}>
              {caseStudy.narrative ||
                'Structured institutional deal rooms and private partner dinners, pairing high-growth founders directly with vetted venture capitalists.'}
            </p>
          </div>

          {/* Action Buttons on Back Face */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href={destinationUrl || 'https://cal.com/morsebridge/30-min-intro'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  color: '#C4B5FD',
                  fontSize: 12.5,
                  fontWeight: 700,
                  padding: '10px 14px',
                  borderRadius: 10,
                  textDecoration: 'none',
                }}
              >
                <span>Schedule Consultation</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
