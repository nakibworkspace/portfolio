// PostCSS processes your CSS. Tailwind needs this to work.
export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}, // adds vendor prefixes for browser compatibility
    },
  };