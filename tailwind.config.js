/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'source-code': ['Source Code Pro', 'monospace'],
        'roboto-serif': ['Roboto Serif', 'serif'],
      },
    },
  },
  plugins: [],
}