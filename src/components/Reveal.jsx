// ============================================================
// Reveal.jsx — SCROLL-TRIGGERED FADE-IN
//
// Wraps children and fades them in the first time they enter
// the viewport. Uses IntersectionObserver; disconnects after
// the first reveal so it never re-fires.
//
// Reduced-motion users get the content visible immediately
// (the CSS rule in index.css disables the transition).
// ============================================================

import { useEffect, useRef } from 'react';

export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced motion: reveal immediately.
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.visible = 'true';
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // small delay so reveals can stagger when siblings use
          // different `delay` props
          setTimeout(() => { el.dataset.visible = 'true'; }, delay);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
