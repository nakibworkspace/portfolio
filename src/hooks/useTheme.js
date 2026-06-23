// ============================================================
// useTheme.js
//
// Manages the dark/light theme. On mount, reads the user's
// preference (localStorage → OS → 'dark' default) and exposes
// a setter that toggles `dark` on <html> + persists the choice.
//
// Usage:
//   const [theme, setTheme] = useTheme();
//   <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
// ============================================================

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

function getInitial() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch (e) {}
  // The pre-paint init script in index.html has already set the
  // .dark class based on OS preference. Mirror that here so React
  // agrees with the DOM on first render.
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export default function useTheme() {
  const [theme, setThemeState] = useState(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }, [theme]);

  const setTheme = (next) => {
    if (next !== 'dark' && next !== 'light') return;
    setThemeState(next);
  };

  const toggleTheme = () =>
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'));

  return [theme, setTheme, toggleTheme];
}