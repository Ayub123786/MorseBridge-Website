import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';

export default function EventCard3D({ event, index = 0 }) {
  if (!event) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="event-card-3d-wrapper"
    >
      <div
        className="event-card-3d-inner with-corner-brackets"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Photo Banner Area */}
        {event.image && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 180,
              borderRadius: 14,
              overflow: 'hidden',
              marginBottom: 18,
              background: '#1C1C24',
            }}
          >
            <img
              src={event.image}
              alt={event.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onError={(e) => {
                e.currentTarget.parentElement.style.display = 'none';
              }}
            />

            {/* Floating Top Badges over Banner */}
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
                className="event-badge-pill"
                style={{
                  background: 'rgba(139, 92, 246, 0.85)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                }}
              >
                {event.badge || 'Featured Event'}
              </span>
              <span
                className="event-type-tag"
                style={{
                  background: 'rgba(10, 10, 15, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#F5F5F7',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                {event.type || 'In-Person'}
              </span>
            </div>
          </div>
        )}

        {/* Fallback badges if no image */}
        {!event.image && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="event-badge-pill">{event.badge || 'Featured Event'}</span>
            <span className="event-type-tag">{event.type || 'In-Person'}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="event-title-3d" style={{ fontSize: 19, marginBottom: 12 }}>
          {event.title}
        </h3>

        {/* Metadata in Monospace Data Font */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '10px 0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, color: 'var(--text-muted)', fontSize: 13 }}>
            <Calendar size={15} color="#8B5CF6" />
            <span className="font-data" style={{ color: '#F5F5F7', fontWeight: 600 }}>{event.date}</span>
            <span style={{ color: 'var(--text-subtle)' }}>· {event.time}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, color: 'var(--text-muted)', fontSize: 13 }}>
            <MapPin size={15} color="#F5B400" style={{ flexShrink: 0, marginTop: 2 }} />
            <span>{event.location}</span>
          </div>

          {event.seatsLeft && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#F87171', fontSize: 12.5, fontWeight: 600 }}>
              <span className="pulse-dot-red" />
              <span className="font-data">ONLY {event.seatsLeft} SEATS REMAINING</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6, marginBottom: 18, flex: 1 }}>
          {event.description}
        </p>

        {/* Tags in Monospace */}
        {event.tags && event.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {event.tags.map((tag, idx) => (
              <span key={idx} className="event-mini-tag font-data">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button with Light Sweep */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
          <a
            href={event.calLink || 'https://cal.com/morsebridge/30-min-intro'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic-signal"
            style={{
              flex: 1,
              justifyContent: 'center',
              padding: '12px 18px',
              fontSize: 14,
              background: '#8B5CF6',
              color: '#FFFFFF',
            }}
          >
            <span>RSVP Now</span>
            <ArrowUpRight size={16} />
            <div className="btn-light-sweep" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
