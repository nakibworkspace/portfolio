// ============================================================
// useElementSize.js
//
// Tracks the rendered size of a DOM element using
// ResizeObserver. Returns [ref, { width, height }].
//
// The first render reports {0, 0} until the observer fires —
// consumers should early-return when width === 0.
// ============================================================

import { useEffect, useRef, useState } from 'react';

export default function useElementSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Set initial size immediately (in case ResizeObserver
    // doesn't fire on first paint in some browsers)
    setSize({ width: el.clientWidth, height: el.clientHeight });

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
}
