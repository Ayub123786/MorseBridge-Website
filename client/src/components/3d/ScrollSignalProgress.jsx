import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollSignalProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        background: 'rgba(255, 255, 255, 0.04)',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          height: '100%',
          width: '100%',
          transformOrigin: '0%',
          scaleX,
          background: 'linear-gradient(90deg, #8B5CF6 0%, #C084FC 50%, #F5B400 100%)',
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
        }}
      />
    </div>
  );
}
