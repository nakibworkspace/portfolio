// ============================================================
// useThemeVariant.js
//
// Returns the current theme variant ('dark' | 'light') and
// re-renders whenever the `dark` class on <html> toggles.
//
// Why this exists:
//   Any future component that needs to react to theme changes
//   (e.g., to re-read CSS variables and re-apply colors) can
//   use this hook. Reading `localStorage` in a one-shot
//   useEffect is not enough — we need a reactive signal.
//
// Usage:
//   const theme = useThemeVariant();
//   useEffect(() => { /* rebuild when theme changes */ },
//             [theme]);
// ============================================================

import { useEffect, useState } from 'react';

function readVariant() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export default function useThemeVariant() {
  const [variant, setVariant] = useState(readVariant);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const obs = new MutationObserver(() => setVariant(readVariant()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => obs.disconnect();
  }, []);

  return variant;
}
