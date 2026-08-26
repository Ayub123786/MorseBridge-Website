import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import VideoCard3D from './VideoCard3D';
import ShimmerSkeleton from '../common/ShimmerSkeleton';

export default function PodcastStack({ podcasts = [], loading = false }) {
  return (
    <section id="podcast" className="section" style={{ position: 'relative' }}>
      <div className="container container-wide">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 38 }}>
          <h3
            style={{
              color: '#F5B400',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              margin: '0 0 14px',
              letterSpacing: '-0.02em',
              textShadow: '0 0 24px rgba(245, 180, 0, 0.25)',
            }}
          >
            Podcast
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <div
              style={{
                background: '#14141B',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '12px 28px',
                borderRadius: 14,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src="/assets/podcast/founders_talk_logo_transparent.png"
                alt="Founders Talk with Ayub"
                style={{ maxHeight: 46, maxWidth: 260, objectFit: 'contain', display: 'block' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
          <p className="section-subtitle" style={{ marginTop: 8 }}>
            Honest conversations with builders shaping what's next.
          </p>
        </div>

        {/* 4 Horizontal YouTube Episode Cards (16:9) */}
        <div className="podcast-videos-grid">
          {loading ? (
            <ShimmerSkeleton count={4} aspectRatio="16/9" />
          ) : (
            podcasts.map((ep, idx) => (
              <VideoCard3D
                key={ep.id || idx}
                video={ep}
                aspectRatio="16/9"
                index={idx}
                accent={idx % 2 === 0 ? 'violet' : 'gold'}
              />
            ))
          )}
        </div>

        {/* Watch CTA Button */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="https://youtube.com/@FoundersTalkwithAyub"
            target="_blank"
            rel="noopener noreferrer"
            className="podcast-cta-btn"
          >
            <span>Watch Full Episodes</span>
            <ArrowUpRight size={18} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
