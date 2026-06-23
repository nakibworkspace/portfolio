// ============================================================
// useReducedMotion.js
//
// Subscribes to the user's `prefers-reduced-motion: reduce`
// media query. Returns a boolean.
//
// Usage:
//   const reduced = useReducedMotion();
//   if (reduced) sim.alphaMin(1); // freeze the simulation
// ============================================================

import { useEffect, useState } from 'react';

export default function useReducedMotion() {
  // Guard for SSR / test environments
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReduced(e.matches);
    // Modern + legacy event listener support
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } else {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  return reduced;
}
