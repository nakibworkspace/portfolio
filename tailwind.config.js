/** @type {import('tailwindcss').Config} */
export default {
    // These paths tell Tailwind: "scan these files for class names"
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {
        // Sets Inter as the default font for everything
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };