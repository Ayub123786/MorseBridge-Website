import React from 'react';
import { motion } from 'framer-motion';

export default function SignalDivider({ className = '' }) {
  return (
    <div
      className={`container ${className}`}
      style={{
        position: 'relative',
        padding: '24px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1080,
          height: 2,
          background: 'rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          borderRadius: 9999,
        }}
      >
        {/* Living Traveling Pulse */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            height: '100%',
            width: '35%',
            background: 'linear-gradient(90deg, transparent 0%, #8B5CF6 50%, #F5B400 85%, transparent 100%)',
            boxShadow: '0 0 12px rgba(139, 92, 246, 0.6)',
          }}
          animate={{ x: ['-100%', '350%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Center Morse Marker */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'var(--bg-canvas)',
          padding: '0 14px',
        }}
      >
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#8B5CF6' }} />
        <span style={{ width: 14, height: 2, borderRadius: 2, background: 'rgba(255, 255, 255, 0.3)' }} />
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#F5B400' }} />
      </div>
    </div>
  );
}
