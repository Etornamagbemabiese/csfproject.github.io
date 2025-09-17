/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mickey's Compass Brand Colors
        'disney-blue': '#0a57a3',
        'disney-blue-light': '#1e6bb8',
        'disney-blue-dark': '#084a8a',
        'disney-gold': '#FFD700',
        'disney-gold-light': '#FFE55C',
        'disney-gold-dark': '#B8860B',
        'slate-gray': '#475569',
        'slate-light': '#64748b',
        'slate-dark': '#334155',
        'neutral-black': '#1e293b',
        'neutral-white': '#f8fafc',
        // Accent colors
        'magic-sparkle': '#FFD700',
        'castle-silver': '#C0C0C0',
        'wand-purple': '#8B5CF6',
      },
      fontFamily: {
        'disney': ['Fredoka One', 'cursive'],
        'disney-body': ['Fredoka', 'sans-serif'],
        'luxury': ['Fredoka One', 'cursive'],
        'modern': ['Inter', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
      },
      animation: {
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'compass-spin': 'compass-spin 8s linear infinite',
        'wand-sparkle': 'wand-sparkle 1.5s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'hover-lift': 'hover-lift 0.3s ease-out',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700' },
          '100%': { boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700' },
        },
        'compass-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'wand-sparkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'hover-lift': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },
      backgroundImage: {
        'gradient-compass': 'linear-gradient(135deg, #0a57a3 0%, #1e6bb8 50%, #FFD700 100%)',
        'gradient-disney': 'linear-gradient(135deg, #0a57a3 0%, #084a8a 100%)',
        'gradient-magic': 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
        'gradient-royal': 'linear-gradient(135deg, #0a57a3 0%, #475569 50%, #FFD700 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0a57a3 0%, #1e6bb8 30%, #FFD700 100%)',
        'gradient-card': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      },
    },
  },
  plugins: [],
}
