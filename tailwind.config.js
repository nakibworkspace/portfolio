/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      // ── Theme tokens ─────────────────────────────────────
      // Every color resolves to a CSS variable defined in :root
      // (light defaults) and :root.dark. To override a color
      // for one specific surface, just edit the var in index.css.
      colors: {
        bg:             'var(--bg)',
        'bg-elevated':  'var(--bg-elevated)',
        fg:             'var(--fg)',
        'fg-dim':       'var(--fg-dim)',
        'fg-mute':      'var(--fg-mute)',

        accent:         'var(--accent)',
        'accent-soft':  'var(--accent-soft)',
        'accent-border': 'var(--accent-border)',
        'accent-text':  'var(--accent-text)',

        sky:        'var(--sky)',
        'sky-light': 'var(--sky-light)',
        'sky-dark':  'var(--sky-dark)',

        divider: 'var(--divider)',
        code:    'var(--code-bg)',

        // Back-compat aliases for existing classes
        cream: 'var(--fg)',
        navy: {
          950: 'var(--sky-dark)',
          900: 'var(--sky-dark)',
          800: 'var(--sky)',
          700: 'var(--sky-light)',
        },
      },
    },
  },
  plugins: [],
};