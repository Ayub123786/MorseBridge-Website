import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

export default function CountUpNumber({ value, suffix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract pure numeric part
  const numericTarget = parseInt(value.toString().replace(/[^0-9]/g, ''), 10) || 0;
  const extractedSuffix = suffix || value.toString().replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease-out cubic formula
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * numericTarget);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(numericTarget);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [isInView, numericTarget, duration]);

  return (
    <span ref={ref} className="font-data">
      {displayValue}
      {extractedSuffix}
    </span>
  );
}
