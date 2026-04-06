/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#D4AF37',
        'brand-charcoal': '#1A1A1A',
        'brand-ivory': '#F5F5F0',
        'brand-emerald-dark': '#1B4D3E',
        'brand-emerald': '#2D7A6E',
        'brand-emerald-light': '#4A9B8E',
        'brand-cream': '#FAF8F3',
        'brand-gray': '#E8E8E8',
        'brand-dark-gray': '#262626',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
