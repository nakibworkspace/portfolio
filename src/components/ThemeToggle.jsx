// ============================================================
// ThemeToggle.jsx — Sun/Moon icon button
//
// Reads the current theme from the `dark` class on <html>
// (managed by useTheme) and toggles between dark and light.
// ============================================================

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

function readTheme() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);

  // Stay in sync if useTheme updates the class from elsewhere
  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(readTheme()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.localStorage.setItem('theme', next);
        } catch (e) {}
        document.documentElement.classList.toggle('dark', next === 'dark');
        setTheme(next);
      }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="
        inline-flex items-center justify-center
        w-9 h-9
        rounded-full
        text-fg-dim
        hover:text-fg hover:bg-bg-elevated
        border border-divider
        transition-all duration-200
      "
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}