import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Play, Pause, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePastEvents } from '../hooks/usePastEvents';

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

export default function PastEventsCarousel3D() {
  const { pastEvents, loading } = usePastEvents();
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVideo, setModalVideo] = useState(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const categories = ['All', 'Workshops', 'Startup Fundraising', 'Community'];

  const filteredEvents = activeCategory === 'All'
    ? pastEvents
    : pastEvents.filter((item) => item.category === activeCategory);

  const total = filteredEvents.length;

  // Refs for stable callback handles without re-subscribing event listeners
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const modalVideoRef = useRef(modalVideo);
  modalVideoRef.current = modalVideo;

  const filteredEventsRef = useRef(filteredEvents);
  filteredEventsRef.current = filteredEvents;

  const lastAdvanceTimeRef = useRef(0);

  // Handle category change
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  // Safe navigation
  const prevSlide = useCallback(() => {
    const events = filteredEventsRef.current;
    const len = events.length;
    if (len === 0) return;
    const prevIdx = (currentIndexRef.current - 1 + len) % len;
    setCurrentIndex(prevIdx);
    if (modalVideoRef.current) {
      const prevEvent = events[prevIdx];
      if (prevEvent) {
        const prevVidId = prevEvent.videoId || extractYouTubeId(prevEvent.youtubeUrl);
        if (prevVidId) setModalVideo(prevVidId);
      }
    }
  }, []);

  const nextSlide = useCallback(() => {
    const events = filteredEventsRef.current;
    const len = events.length;
    if (len === 0) return;
    const nextIdx = (currentIndexRef.current + 1) % len;
    setCurrentIndex(nextIdx);
    if (modalVideoRef.current) {
      const nextEvent = events[nextIdx];
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

  // Load YouTube IFrame API script for player lifecycle
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }
  }, []);

  // Listen for YouTube video ENDED events via postMessage
  useEffect(() => {
    const handleMessage = (e) => {
      try {
        let data = e.data;
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        if (!data) return;

        // YouTube sends event "onStateChange" with info 0 (ENDED)
        // or infoDelivery with info.playerState 0
        const isEnded =
          (data.event === 'onStateChange' && (data.info === 0 || data.data === 0)) ||
          (data.event === 'infoDelivery' && (data.info?.playerState === 0 || data.info?.state === 0));

        if (isEnded) {
          const now = Date.now();
          if (now - lastAdvanceTimeRef.current > 1500) {
            lastAdvanceTimeRef.current = now;
            nextSlide();
          }
        }
      } catch (err) {
        // Non-JSON message from other extensions or windows, safely ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [nextSlide]);

  // Keyboard navigation
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
    >
      {/* Background Subtle Cyber Grid (Matches Image 2) */}
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

      <div className="container container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Title & Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
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
            Our Past Events
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
            Watch summit highlights, live pitch sessions, and masterclasses from across MENA.
          </p>
        </div>

        {/* Category Tabs with Animated Pill */}
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
                    layoutId="pastEventActiveCategoryTab"
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
            TOP PAGINATION / CONTROLS BAR (PIXEL-PERFECT IMAGE 2 MATCH)
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
              {filteredEvents.map((_, idx) => {
                const isActive = idx === currentIndex;
                const formattedNum = String(idx + 1).padStart(2, '0');
                return (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    style={{
                      position: 'relative',
                      background: isActive ? '#F5B400' : 'transparent',
                      color: isActive ? '#0A0A0F' : '#71717A',
                      border: 'none',
                      borderRadius: 9999,
                      padding: isActive ? '5px 12px' : '5px 9px',
                      fontSize: 12.5,
                      fontWeight: isActive ? 800 : 600,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#71717A';
                    }}
                  >
                    {formattedNum}
                  </button>
                );
              })}
            </div>

            {/* Left and Right Yellow Triangle Arrows + Counter (Image 2) */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              {/* Prev Button (Left Triangle Arrow) */}
              <button
                onClick={prevSlide}
                aria-label="Previous past event"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F5B400',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <svg width="22" height="26" viewBox="0 0 24 24" fill="#F5B400">
                  <polygon points="20,2 4,12 20,22" />
                </svg>
              </button>

              {/* Next Button (Right Triangle Arrow) */}
              <button
                onClick={nextSlide}
                aria-label="Next past event"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F5B400',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <svg width="22" height="26" viewBox="0 0 24 24" fill="#F5B400">
                  <polygon points="4,2 20,12 4,22" />
                </svg>
              </button>

              {/* Counter Display: 1 / 11 */}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: '#A3A3B0',
                  marginLeft: 4,
                  paddingRight: 4,
                }}
              >
                <span style={{ color: '#F5B400', fontWeight: 800 }}>{currentIndex + 1}</span>
                <span style={{ margin: '0 5px', opacity: 0.6 }}>/</span>
                <span>{total}</span>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            3D ANIMATED CAROUSEL STAGE (EXACT DECK AS SHOWN IN IMAGE 2)
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
            <div style={{ color: '#8E8E9B', fontSize: 16 }}>Loading summit highlights...</div>
          ) : total === 0 ? (
            <div style={{ color: '#8E8E9B', fontSize: 16 }}>No events found in this category.</div>
          ) : (
            filteredEvents.map((event, idx) => {
              // Calculate offset relative to currentIndex with circular wrap
              let offset = (idx - currentIndex) % total;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              // Only render cards within range [-2, 2] for smooth 60fps performance
              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              // 3D Transform Coordinates matching Image 2
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
                xPos = -270;
                zPos = -120;
                rotY = 26;
                scale = 0.86;
                opacity = 0.58;
                zIndex = 20;
              } else if (isRight) {
                xPos = 270;
                zPos = -120;
                rotY = -26;
                scale = 0.86;
                opacity = 0.58;
                zIndex = 20;
              } else if (offset === -2) {
                xPos = -490;
                zPos = -240;
                rotY = 36;
                scale = 0.72;
                opacity = 0.22;
                zIndex = 10;
              } else if (offset === 2) {
                xPos = 490;
                zPos = -240;
                rotY = -36;
                scale = 0.72;
                opacity = 0.22;
                zIndex = 10;
              }

              const videoId = event.videoId || extractYouTubeId(event.youtubeUrl);
              const thumbUrl = videoId
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : '/assets/events/investors_events_ayub.png';

              return (
                <motion.div
                  key={event.id || idx}
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
                    stiffness: 280,
                    damping: 28,
                    mass: 0.8,
                  }}
                  style={{
                    position: 'absolute',
                    width: 360,
                    height: 550,
                    borderRadius: 24,
                    zIndex: zIndex,
                    cursor: isCenter ? 'default' : 'pointer',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Card Outer Shell with Glowing Yellow Border on Center Card */}
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 24,
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#0D0E16',
                      border: isCenter
                        ? '3.5px solid #F5B400'
                        : '1.5px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: isCenter
                        ? '0 0 45px rgba(245, 180, 0, 0.4), 0 30px 70px rgba(0, 0, 0, 0.95)'
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
                         1. AUTOMATICALLY PLAYING LIVE VIDEO (PREVIEWING ON SITE)
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
                          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&playsinline=1&controls=1&rel=0&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}`}
                          title={event.title}
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
                            {event.tag || 'DEMO DAY HIGHLIGHT'}
                          </span>

                          {/* Sound Toggle Button (Tap for Sound) */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'auto' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMuted((m) => !m);
                              }}
                              style={{
                                background: isMuted ? 'rgba(0, 0, 0, 0.85)' : '#F5B400',
                                color: isMuted ? '#FFFFFF' : '#0A0A0F',
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

                            {/* Fullscreen Button */}
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
                            background: 'linear-gradient(0deg, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.7) 60%, transparent 100%)',
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
                              letterSpacing: '0.05em',
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
                            {event.title}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      /* ====================================================
                         2. 3D CARD THUMBNAIL VIEW (MATCHING IMAGE 2)
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

                        {/* TOP BADGES ROW (Image 2) */}
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
                          {/* Left Badge: e.g. "DEMO DAY HIGHLIGHT" */}
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
                            {event.tag || 'DEMO DAY HIGHLIGHT'}
                          </span>

                          {/* Right Badge: "Live Preview" (Image 2) */}
                          {isCenter && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsAutoplay(true);
                              }}
                              style={{
                                background: 'rgba(0, 0, 0, 0.78)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(245, 180, 0, 0.4)',
                                borderRadius: 9999,
                                padding: '4px 10px',
                                color: '#F5B400',
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
                                  background: '#F5B400',
                                  boxShadow: '0 0 6px #F5B400',
                                }}
                              />
                              Live Preview
                            </button>
                          )}
                        </div>

                        {/* CENTER PLAY BUTTON & FULLSCREEN ACTION (Image 2) */}
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
                          {/* Yellow Circular Play Button -> Starts Live Autoplay */}
                          <motion.button
                            whileHover={{ scale: 1.14 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsAutoplay(true);
                            }}
                            style={{
                              width: 72,
                              height: 72,
                              borderRadius: '50%',
                              background: '#F5B400',
                              border: 'none',
                              boxShadow: '0 0 35px rgba(245, 180, 0, 0.8), 0 8px 24px rgba(0, 0, 0, 0.6)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: '#0A0A0F',
                            }}
                            aria-label={`Play ${event.title}`}
                          >
                            <Play size={30} fill="#0A0A0F" color="#0A0A0F" style={{ marginLeft: 4 }} />
                          </motion.button>

                          {/* "Click to Watch Fullscreen" Pill Badge (Image 2) */}
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
                              <span style={{ color: '#F5B400', fontSize: 13 }}>↗</span>
                              <span>Click to Watch Fullscreen</span>
                            </motion.div>
                          )}
                        </div>

                        {/* BOTTOM TITLE IN FUTURISTIC TECH DISPLAY FONT (Image 2) */}
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
                              fontSize: isCenter ? 18 : 15,
                              fontWeight: 900,
                              lineHeight: 1.25,
                              letterSpacing: '0.05em',
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
                            {event.title}
                          </h3>
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
            <span>Watch More on YouTube (@foundermeetinvestor)</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* ====================================================================
          FULLSCREEN VIDEO PLAYER MODAL
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
                boxShadow: '0 0 50px rgba(245, 180, 0, 0.3), 0 30px 80px rgba(0, 0, 0, 0.9)',
                border: '2px solid rgba(245, 180, 0, 0.5)',
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
                aria-label="Previous video"
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
                aria-label="Next video"
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

              {/* Video Info Pill (Counter & Auto-play Next indicator) */}
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
                    background: '#F5B400',
                    boxShadow: '0 0 6px #F5B400',
                  }}
                />
                <span>{currentIndex + 1} / {total} · Auto-Next</span>
              </div>

              {/* YouTube Iframe Player with Auto-Advance support */}
              <iframe
                key={modalVideo}
                src={`https://www.youtube-nocookie.com/embed/${modalVideo}?autoplay=1&playsinline=1&controls=1&rel=0&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}`}
                title="Past Event Highlights"
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
