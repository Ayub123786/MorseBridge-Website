import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  X,
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Quote,
} from 'lucide-react';
import { useTestimonials } from '../hooks/useTestimonials';

function extractYouTubeId(urlOrId) {
  if (!urlOrId) return '';
  if (urlOrId.includes('shorts/')) {
    return urlOrId.split('shorts/')[1]?.split('?')[0] || '';
  }
  if (urlOrId.includes('watch?v=')) {
    return urlOrId.split('watch?v=')[1]?.split('&')[0] || '';
  }
  if (urlOrId.includes('youtu.be/')) {
    return urlOrId.split('youtu.be/')[1]?.split('?')[0] || '';
  }
  return urlOrId;
}

export default function CommentsCarousel3D() {
  const { testimonials, loading } = useTestimonials();
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVideo, setModalVideo] = useState(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const categories = ['All', 'Founders', 'Investors', 'Bootcamp'];

  const filteredComments =
    activeCategory === 'All'
      ? testimonials
      : testimonials.filter((item) => item.category === activeCategory);

  const total = filteredComments.length;

  // Refs for stable callback handles without re-subscribing event listeners
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const modalVideoRef = useRef(modalVideo);
  modalVideoRef.current = modalVideo;

  const filteredCommentsRef = useRef(filteredComments);
  filteredCommentsRef.current = filteredComments;

  const lastAdvanceTimeRef = useRef(0);

  // Handle category change
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  // Safe navigation
  const prevSlide = useCallback(() => {
    const list = filteredCommentsRef.current;
    const len = list.length;
    if (len === 0) return;
    const prevIdx = (currentIndexRef.current - 1 + len) % len;
    setCurrentIndex(prevIdx);
    if (modalVideoRef.current) {
      const prevEvent = list[prevIdx];
      if (prevEvent) {
        const prevVidId = prevEvent.videoId || extractYouTubeId(prevEvent.youtubeUrl);
        if (prevVidId) setModalVideo(prevVidId);
      }
    }
  }, []);

  const nextSlide = useCallback(() => {
    const list = filteredCommentsRef.current;
    const len = list.length;
    if (len === 0) return;
    const nextIdx = (currentIndexRef.current + 1) % len;
    setCurrentIndex(nextIdx);
    if (modalVideoRef.current) {
      const nextEvent = list[nextIdx];
      if (nextEvent) {
        const nextVidId = nextEvent.videoId || extractYouTubeId(nextEvent.youtubeUrl);
        if (nextVidId) setModalVideo(nextVidId);
      }
    }
  }, []);

  const goToSlide = (idx) => {
    if (idx >= 0 && idx < total) {
      setCurrentIndex(idx);
    }
  };

  // Listen for YouTube video ENDED events via postMessage to auto-advance to next video
  useEffect(() => {
    const handleMessage = (e) => {
      try {
        let data = e.data;
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        if (!data) return;

        const isEnded =
          (data.event === 'onStateChange' && (data.info === 0 || data.data === 0)) ||
          (data.event === 'infoDelivery' &&
            (data.info?.playerState === 0 || data.info?.state === 0));

        if (isEnded) {
          const now = Date.now();
          if (now - lastAdvanceTimeRef.current > 1500) {
            lastAdvanceTimeRef.current = now;
            nextSlide();
          }
        }
      } catch (err) {
        // Non-JSON message, safely ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [nextSlide]);

  // Keyboard navigation (ArrowLeft / ArrowRight / Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalVideo) {
        if (e.key === 'Escape') setModalVideo(null);
        return;
      }
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, modalVideo]);

  return (
    <section
      className="section"
      style={{
        position: 'relative',
        padding: '70px 0 80px',
        overflow: 'hidden',
        background: 'var(--bg-canvas, #0A0A0F)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Subtle Cyber Grid & Ambient Radial Glows */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ambient Radial Spotlight (Alternates Violet / Gold) */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 450,
          background:
            currentIndex % 2 === 0
              ? 'radial-gradient(ellipse, rgba(139, 92, 246, 0.16) 0%, transparent 70%)'
              : 'radial-gradient(ellipse, rgba(245, 180, 0, 0.15) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.8s ease',
        }}
      />

      <div className="container container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Title & Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 9999,
              padding: '5px 14px',
              color: currentIndex % 2 === 0 ? '#C4B5FD' : '#F5B400',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 14,
              transition: 'color 0.4s ease',
            }}
          >
            <Sparkles size={13} />
            <span>COMMUNITY TESTIMONIALS</span>
          </div>

          <h2
            className="section-title"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              marginBottom: 12,
            }}
          >
            Comments By Founders &amp; Investors
          </h2>
          <p
            className="section-subtitle"
            style={{
              color: '#A3A3B0',
              fontSize: 16,
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            What those who've built and backed say about us.
          </p>
        </div>

        {/* Category Tabs with Animated Spring Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div className="category-tab-container">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                style={{
                  position: 'relative',
                  padding: '7px 18px',
                  fontSize: 13.5,
                  fontWeight: activeCategory === cat ? 700 : 500,
                  color: activeCategory === cat ? '#FFFFFF' : '#8E8E9B',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 2,
                  transition: 'color 0.2s ease',
                }}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="commentsActiveCategoryTab"
                    className="category-tab-active-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 9999,
                      background: 'rgba(139, 92, 246, 0.75)',
                      boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ====================================================================
            TOP PAGINATION / CONTROLS BAR (CAPSULE NAVIGATION)
            ==================================================================== */}
        {total > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              marginBottom: 44,
              flexWrap: 'wrap',
            }}
          >
            {/* Number Capsules Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: 'rgba(15, 16, 25, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: 9999,
                padding: '4px 8px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
            >
              {filteredComments.map((_, idx) => {
                const isActive = idx === currentIndex;
                const isEven = idx % 2 === 0;
                const activeColor = isEven ? '#8B5CF6' : '#F5B400';
                const formattedNum = String(idx + 1).padStart(2, '0');

                return (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    style={{
                      position: 'relative',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px 11px',
                      fontSize: 12.5,
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? (isEven ? '#FFFFFF' : '#0A0A0F') : '#8E8E9B',
                      zIndex: 1,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="commentsActiveSlideCapsule"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 9999,
                          background: activeColor,
                          boxShadow: `0 0 14px ${activeColor}88`,
                          zIndex: -1,
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    {formattedNum}
                  </button>
                );
              })}
            </div>

            {/* Prev / Play / Next Controls */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(15, 16, 25, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: 9999,
                padding: '6px 14px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                aria-label="Previous comment"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: currentIndex % 2 === 0 ? '#C4B5FD' : '#F5B400',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                aria-label="Next comment"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: currentIndex % 2 === 0 ? '#C4B5FD' : '#F5B400',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <ChevronRight size={20} />
              </button>

              {/* Counter Display: 1 / 8 */}
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: '#A3A3B0',
                  marginLeft: 2,
                  paddingRight: 4,
                }}
              >
                <span
                  style={{
                    color: currentIndex % 2 === 0 ? '#A78BFA' : '#F5B400',
                    fontWeight: 800,
                  }}
                >
                  {currentIndex + 1}
                </span>
                <span style={{ margin: '0 5px', opacity: 0.6 }}>/</span>
                <span>{total}</span>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            3D ANIMATED CAROUSEL STAGE
            ==================================================================== */}
        <div
          style={{
            position: 'relative',
            height: 600,
            maxWidth: 1200,
            margin: '0 auto',
            perspective: 1400,
            perspectiveOrigin: '50% 50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          {loading ? (
            <div style={{ color: '#8E8E9B', fontSize: 16 }}>Loading founder stories...</div>
          ) : total === 0 ? (
            <div style={{ color: '#8E8E9B', fontSize: 16 }}>No comments found in this category.</div>
          ) : (
            filteredComments.map((comment, idx) => {
              // Calculate offset relative to currentIndex with circular wrap
              let offset = (idx - currentIndex) % total;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              // Render cards within range [-2, 2] for smooth 60fps performance
              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              // Alternating Violet / Gold Color Scheme (matching user's screenshot)
              const isGold = idx % 2 === 1;
              const primaryAccent = isGold ? '#F5B400' : '#8B5CF6';
              const glowColor = isGold ? 'rgba(245, 180, 0, 0.45)' : 'rgba(139, 92, 246, 0.45)';
              const playIconFill = isGold ? '#0A0A0F' : '#FFFFFF';

              // 3D Transform Coordinates
              let xPos = 0;
              let zPos = 0;
              let rotY = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 10;

              if (isCenter) {
                xPos = 0;
                zPos = 0;
                rotY = 0;
                scale = 1;
                opacity = 1;
                zIndex = 30;
              } else if (isLeft) {
                xPos = -275;
                zPos = -120;
                rotY = 24;
                scale = 0.86;
                opacity = 0.62;
                zIndex = 20;
              } else if (isRight) {
                xPos = 275;
                zPos = -120;
                rotY = -24;
                scale = 0.86;
                opacity = 0.62;
                zIndex = 20;
              } else if (offset === -2) {
                xPos = -500;
                zPos = -240;
                rotY = 34;
                scale = 0.72;
                opacity = 0.25;
                zIndex = 10;
              } else if (offset === 2) {
                xPos = 500;
                zPos = -240;
                rotY = -34;
                scale = 0.72;
                opacity = 0.25;
                zIndex = 10;
              }

              const videoId = comment.videoId || extractYouTubeId(comment.youtubeUrl);
              const thumbUrl = videoId
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : '';

              return (
                <motion.div
                  key={comment.id || idx}
                  onClick={() => {
                    if (!isCenter) {
                      goToSlide(idx);
                    }
                  }}
                  animate={{
                    x: xPos,
                    z: zPos,
                    rotateY: rotY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 28,
                  }}
                  style={{
                    position: 'absolute',
                    width: 'clamp(260px, 24vw, 310px)',
                    height: 'clamp(460px, 44vw, 550px)',
                    zIndex: zIndex,
                    cursor: isCenter ? 'default' : 'pointer',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Card Outer Shell */}
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 24,
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#0D0E16',
                      border: isCenter
                        ? `3.5px solid ${primaryAccent}`
                        : '1.5px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: isCenter
                        ? `0 0 45px ${glowColor}, 0 30px 70px rgba(0, 0, 0, 0.95)`
                        : '0 20px 40px rgba(0, 0, 0, 0.7)',
                      transition: 'border 0.3s ease, box-shadow 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: isCenter && isAutoplay ? 0 : 20,
                    }}
                  >
                    {isCenter && isAutoplay ? (
                      /* ====================================================
                         1. AUTOMATICALLY PLAYING LIVE PREVIEW
                         ==================================================== */
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                          background: '#000000',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Live YouTube Iframe Autoplaying */}
                        <iframe
                          key={`${videoId}-${isMuted}`}
                          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${
                            isMuted ? 1 : 0
                          }&playsinline=1&controls=1&rel=0&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(
                            typeof window !== 'undefined' ? window.location.origin : ''
                          )}`}
                          title={comment.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          onLoad={(e) => {
                            const postListen = () => {
                              try {
                                e.target.contentWindow?.postMessage(
                                  JSON.stringify({ event: 'listening', id: videoId }),
                                  '*'
                                );
                              } catch (err) {}
                            };
                            postListen();
                            setTimeout(postListen, 400);
                            setTimeout(postListen, 1200);
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            display: 'block',
                          }}
                        />

                        {/* Floating Top Controls Overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            right: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            zIndex: 20,
                            pointerEvents: 'none',
                          }}
                        >
                          {/* Tag Badge */}
                          <span
                            style={{
                              pointerEvents: 'auto',
                              background: 'rgba(0, 0, 0, 0.78)',
                              backdropFilter: 'blur(8px)',
                              border: '1px solid rgba(255, 255, 255, 0.18)',
                              borderRadius: 8,
                              padding: '5px 12px',
                              color: '#FFFFFF',
                              fontSize: 11,
                              fontWeight: 800,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {comment.tag || 'FOUNDER VOICES'}
                          </span>

                          {/* Sound Toggle & Fullscreen Buttons */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'auto' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMuted((m) => !m);
                              }}
                              style={{
                                background: isMuted ? 'rgba(0, 0, 0, 0.85)' : primaryAccent,
                                color: isMuted ? '#FFFFFF' : isGold ? '#0A0A0F' : '#FFFFFF',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                borderRadius: 9999,
                                padding: '5px 12px',
                                fontSize: 11.5,
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 5,
                                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.6)',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                              <span>{isMuted ? 'Tap for Sound' : 'Sound On'}</span>
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalVideo(videoId);
                              }}
                              title="Watch Fullscreen"
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                background: 'rgba(0, 0, 0, 0.85)',
                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                            >
                              <Maximize2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Bottom Title Bar Overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background:
                              'linear-gradient(0deg, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.7) 60%, transparent 100%)',
                            padding: '16px 16px 14px',
                            zIndex: 20,
                            pointerEvents: 'none',
                          }}
                        >
                          <h3
                            style={{
                              color: '#FFFFFF',
                              fontSize: 15,
                              fontWeight: 900,
                              lineHeight: 1.25,
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                              fontFamily: "'Proxima Nova', -apple-system, sans-serif",
                              margin: 0,
                              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {comment.title}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      /* ====================================================
                         2. 3D CARD THUMBNAIL VIEW (MATCHING USER SCREENSHOT)
                         ==================================================== */
                      <>
                        {/* Background Video Poster / Thumbnail */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${thumbUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 0,
                          }}
                        />

                        {/* Vignette Gradients for Text Contrast */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: `
                              linear-gradient(180deg, rgba(10, 10, 15, 0.82) 0%, rgba(10, 10, 15, 0.2) 40%, rgba(10, 10, 15, 0.4) 60%, rgba(10, 10, 15, 0.96) 100%)
                            `,
                            zIndex: 1,
                          }}
                        />

                        {/* TOP BADGES ROW */}
                        <div
                          style={{
                            position: 'relative',
                            zIndex: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 8,
                          }}
                        >
                          {/* Left Badge: Tag */}
                          <span
                            style={{
                              background: 'rgba(0, 0, 0, 0.78)',
                              backdropFilter: 'blur(8px)',
                              border: '1px solid rgba(255, 255, 255, 0.18)',
                              borderRadius: 8,
                              padding: '5px 12px',
                              color: '#FFFFFF',
                              fontSize: 11,
                              fontWeight: 800,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {comment.tag || 'FOUNDER VOICES'}
                          </span>

                          {/* Right Badge: "Live Preview" */}
                          {isCenter && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsAutoplay(true);
                              }}
                              style={{
                                background: 'rgba(0, 0, 0, 0.78)',
                                backdropFilter: 'blur(8px)',
                                border: `1px solid ${primaryAccent}66`,
                                borderRadius: 9999,
                                padding: '4px 10px',
                                color: primaryAccent,
                                fontSize: 10.5,
                                fontWeight: 800,
                                letterSpacing: '0.05em',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 5,
                                cursor: 'pointer',
                              }}
                            >
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  background: primaryAccent,
                                  boxShadow: `0 0 6px ${primaryAccent}`,
                                }}
                              />
                              Live Preview
                            </button>
                          )}
                        </div>

                        {/* CENTER PLAY BUTTON (Violet / Gold Alternating) */}
                        <div
                          style={{
                            position: 'relative',
                            zIndex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 12,
                            margin: 'auto 0',
                          }}
                        >
                          {/* Circular Play Button -> Starts Live Autoplay */}
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isCenter) {
                                setIsAutoplay(true);
                              } else {
                                goToSlide(idx);
                              }
                            }}
                            style={{
                              width: 72,
                              height: 72,
                              borderRadius: '50%',
                              background: primaryAccent,
                              border: 'none',
                              boxShadow: `0 0 35px ${glowColor}, 0 8px 24px rgba(0, 0, 0, 0.6)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: playIconFill,
                            }}
                            aria-label={`Play ${comment.title}`}
                          >
                            <Play size={28} fill={playIconFill} color={playIconFill} style={{ marginLeft: 3 }} />
                          </motion.button>

                          {/* "Click to Watch Fullscreen" Pill Badge */}
                          {isCenter && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (videoId) setModalVideo(videoId);
                              }}
                              style={{
                                background: 'rgba(0, 0, 0, 0.85)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255, 255, 255, 0.22)',
                                borderRadius: 9999,
                                padding: '6px 14px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                color: '#FFFFFF',
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
                              }}
                            >
                              <span style={{ color: primaryAccent, fontSize: 13 }}>↗</span>
                              <span>Click to Watch Fullscreen</span>
                            </motion.div>
                          )}
                        </div>

                        {/* BOTTOM TITLE & SPEAKER IN MODERN DISPLAY FONT */}
                        <div
                          style={{
                            position: 'relative',
                            zIndex: 2,
                            paddingTop: 14,
                          }}
                        >
                          <h3
                            style={{
                              color: '#FFFFFF',
                              fontSize: isCenter ? 17 : 14.5,
                              fontWeight: 900,
                              lineHeight: 1.25,
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                              fontFamily: "'Proxima Nova', -apple-system, sans-serif",
                              margin: '0 0 6px',
                              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {comment.title}
                          </h3>

                          {comment.speaker && (
                            <span
                              style={{
                                color: primaryAccent,
                                fontSize: 12,
                                fontWeight: 700,
                                letterSpacing: '0.04em',
                                display: 'block',
                              }}
                            >
                              {comment.speaker}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Channel Link Button */}
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <a
            href="https://www.youtube.com/@foundermeetinvestor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic-signal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#F5F5F7',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              padding: '12px 28px',
              borderRadius: 9999,
              fontSize: 14.5,
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#F5B400';
              e.currentTarget.style.color = '#F5B400';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
              e.currentTarget.style.color = '#F5F5F7';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Watch More Stories on YouTube (@foundermeetinvestor)</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* ====================================================================
          FULLSCREEN VIDEO THEATER MODAL
          ==================================================================== */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalVideo(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(5, 5, 8, 0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 420,
                aspectRatio: '9/16',
                borderRadius: 24,
                overflow: 'hidden',
                background: '#000000',
                boxShadow:
                  currentIndex % 2 === 1
                    ? '0 0 50px rgba(245, 180, 0, 0.3), 0 30px 80px rgba(0, 0, 0, 0.9)'
                    : '0 0 50px rgba(139, 92, 246, 0.3), 0 30px 80px rgba(0, 0, 0, 0.9)',
                border:
                  currentIndex % 2 === 1
                    ? '2px solid rgba(245, 180, 0, 0.5)'
                    : '2px solid rgba(139, 92, 246, 0.5)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setModalVideo(null)}
                aria-label="Close video player"
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  zIndex: 10,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 16,
                  transition: 'background 0.2s ease',
                }}
              >
                <X size={18} />
              </button>

              {/* Prev Video Button in Modal */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous comment"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next Video Button in Modal */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next comment"
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <ChevronRight size={20} />
              </button>

              {/* Video Info Pill */}
              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  zIndex: 10,
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 9999,
                  padding: '4px 10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: 700,
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: currentIndex % 2 === 1 ? '#F5B400' : '#8B5CF6',
                    boxShadow:
                      currentIndex % 2 === 1
                        ? '0 0 6px #F5B400'
                        : '0 0 6px #8B5CF6',
                  }}
                />
                <span>
                  {currentIndex + 1} / {total} · Auto-Next
                </span>
              </div>

              {/* YouTube Iframe Player with Auto-Advance support */}
              <iframe
                key={modalVideo}
                src={`https://www.youtube-nocookie.com/embed/${modalVideo}?autoplay=1&playsinline=1&controls=1&rel=0&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.origin : ''
                )}`}
                title="Founder & Investor Comment"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={(e) => {
                  const postListen = () => {
                    try {
                      e.target.contentWindow?.postMessage(
                        JSON.stringify({ event: 'listening', id: modalVideo }),
                        '*'
                      );
                    } catch (err) {}
                  };
                  postListen();
                  setTimeout(postListen, 400);
                  setTimeout(postListen, 1200);
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
