import { useState, useEffect } from 'react';

/**
 * useMediaQuery hook
 * Evaluates a CSS media query string and re-renders on change.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
      return () => mediaQueryList.removeEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
      return () => mediaQueryList.removeListener(listener);
    }
  }, [query]);

  return matches;
}

/**
 * Convenience hook to check if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Convenience hook to check if device is mobile viewport (< 768px)
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}
