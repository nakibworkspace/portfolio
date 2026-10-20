// ============================================================
// RevealOnScroll.jsx — IntersectionObserver-driven entrance.
//
// Renders its children with a `lift-in` class the first time the
// element scrolls into the viewport. After that, it's a plain
// div — no re-triggering on scroll-back.
//
// IMPORTANT: this uses CSS keyframes (via `lift-in`) and gates
// the whole thing on `useReducedMotion()`. When motion is off,
// the component renders its children with no wrapping div and
// no observer — the cost is one hook call and one early return.
// No layout shift (no min-height, no placeholder).
//
// Why a hook and not a pure-CSS approach with `animation-timeline
// view()`? Browser support is not yet broad enough for a
// production portfolio. IntersectionObserver is universal.
//
// The "pre-reveal hidden" state lives in `.reveal-prep` (defined
// in index.css inside the no-preference media query, so it's
// also a no-op for users with reduced motion).
// ============================================================

import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

export default function RevealOnScroll({
  children,
  delay = 0,                                    // seconds
  // Default rootMargin: shrink the root rectangle 10% from the
  // bottom so elements trigger only when they've come up
  // ~one line into view. Looser than -100%, stricter than 0.
  // Each call site can pass its own to tune this (e.g. the
  // Stack uses a stricter margin so the reveal doesn't auto-
  // fire when the element is already in view at mount).
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.05,
  as: Tag = 'div',
  className = '',
  revealClass = 'lift-in',                      // applied once on intersect
  once = true,
  ...rest
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduced || revealed) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: reveal immediately so content is never invisible.
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) io.disconnect();
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      { rootMargin, threshold }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced, revealed, rootMargin, threshold, once]);

  if (reduced) {
    return <Tag ref={ref} className={className} {...rest}>{children}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      className={`${revealed ? revealClass : 'reveal-prep'} ${className}`.trim()}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
