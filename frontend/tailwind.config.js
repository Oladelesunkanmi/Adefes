/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      colors: {
        'brand-black': '#121212',
        'brand-gray': '#f8f8f8',
        'brand-dark-gray': '#e5e5e5',
        'brand-white': '#ffffff',
      },
    },
  },
  plugins: [],
}
