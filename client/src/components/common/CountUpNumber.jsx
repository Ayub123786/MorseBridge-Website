import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

export default function CountUpNumber({ value, end, suffix = '', prefix = '', duration = 1.8 }) {
  const val = value !== undefined ? value : (end !== undefined ? end : 0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  const strVal = (val ?? '').toString();
  // Extract pure numeric part
  const numericTarget = parseInt(strVal.replace(/[^0-9]/g, ''), 10) || 0;
  // If prefix is not explicitly passed, check if strVal starts with non-numeric like $
  const extractedPrefix = prefix || (strVal.match(/^[^0-9]+/)?.[0] || '');
  // Suffix is either explicitly passed or whatever comes after the digits
  const extractedSuffix = suffix || (strVal.replace(/^[^0-9]*/, '').replace(/[0-9,]/g, ''));
  const hasComma = strVal.includes(',') || numericTarget >= 1000;

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const durationMs = duration > 50 ? duration : duration * 1000;

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

  const formattedNumber = hasComma
    ? displayValue.toLocaleString()
    : displayValue;

  return (
    <span ref={ref} className="font-data">
      {extractedPrefix}
      {formattedNumber}
      {extractedSuffix}
    </span>
  );
}
