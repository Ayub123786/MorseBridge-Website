import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

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

export default function VideoCard3D({
  video,
  aspectRatio = '9/16',
  index = 0,
  accent = 'violet',
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!video) return null;

  const videoId = video.videoId || extractYouTubeId(video.youtubeUrl);
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1`
    : '';
  const thumbnailUrl = videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : '';

  const isGold = accent === 'gold' || index % 2 === 1;
  const glowColor = isGold ? 'rgba(245, 180, 0, 0.6)' : 'rgba(139, 92, 246, 0.6)';
  const playBtnBg = isGold ? '#F5B400' : '#8B5CF6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 5) * 0.08 }}
      whileHover={isPlaying || prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
      className="video-card-3d-wrapper"
      style={{ aspectRatio }}
    >
      {isPlaying && embedUrl ? (
        <iframe
          src={embedUrl}
          title={video.title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="video-card-3d-iframe"
        />
      ) : (
        <div
          className="video-card-3d-thumb-container"
          onClick={() => {
            if (videoId) setIsPlaying(true);
          }}
        >
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={video.title || 'Video Preview'}
              className="video-card-3d-thumb-img"
              loading="lazy"
              onError={(e) => {
                if (!e.currentTarget.src.includes('img.youtube.com')) {
                  e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                } else if (!e.currentTarget.src.includes('/0.jpg')) {
                  e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                }
              }}
            />
          ) : (
            <div className="past-event-placeholder">
              <div className="past-event-yt-icon">▶</div>
              <div className="past-event-placeholder-title">{video.title}</div>
            </div>
          )}

          {/* Dark Scrim & Glowing Play Ring */}
          <div className="video-card-3d-overlay">
            <motion.div
              whileHover={{ scale: 1.18 }}
              whileTap={{ scale: 0.94 }}
              className="video-card-3d-play-btn"
              style={{
                background: playBtnBg,
                boxShadow: `0 0 20px ${glowColor}`,
              }}
            >
              <Play size={20} fill="#ffffff" color="#ffffff" style={{ marginLeft: 3 }} />
            </motion.div>

            {video.title && (
              <div className="video-card-3d-caption">
                <span className="video-card-3d-title-text">{video.title}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
