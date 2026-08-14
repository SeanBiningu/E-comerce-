/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: { colors: { ink: '#171716', paper: '#eeeae3', rust: '#b25230', tan: '#dad3c8', nav: '#e3ddd3' }, fontFamily: { sans: ['Sora', 'sans-serif'], serif: ['Cormorant Garamond', 'serif'], mono: ['DM Mono', 'monospace'] } } },
  plugins: [],
};
