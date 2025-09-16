/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'disney-blue': '#003DA5',
        'disney-blue-light': '#1E40AF',
        'disney-blue-dark': '#001F5C',
        'disney-gold': '#FFD700',
        'disney-red': '#E60012',
        'disney-pink': '#FF69B4',
        'disney-teal': '#00CED1',
        'disney-orange': '#FF8C00',
        'luxury-gold': '#FFD700',
        'luxury-silver': '#C0C0C0',
        'luxury-platinum': '#E5E4E2',
        'magic-blue': '#0EA5E9',
        'magic-green': '#00FF7F',
        'royal-blue': '#1E3A8A',
        'royal-gold': '#F59E0B',
      },
      fontFamily: {
        'disney': ['Walt Disney Script', 'cursive'],
        'luxury': ['Playfair Display', 'serif'],
        'modern': ['Inter', 'sans-serif'],
      },
      animation: {
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
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
          '0%': { boxShadow: '0 0 5px #D4AF37, 0 0 10px #D4AF37, 0 0 15px #D4AF37' },
          '100%': { boxShadow: '0 0 10px #D4AF37, 0 0 20px #D4AF37, 0 0 30px #D4AF37' },
        },
      },
      backgroundImage: {
        'gradient-magic': 'linear-gradient(135deg, #0EA5E9 0%, #1E40AF 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)',
        'gradient-disney': 'linear-gradient(135deg, #003DA5 0%, #1E40AF 50%, #0EA5E9 100%)',
        'gradient-royal': 'linear-gradient(135deg, #1E3A8A 0%, #0EA5E9 50%, #FFD700 100%)',
        'gradient-blue': 'linear-gradient(135deg, #003DA5 0%, #1E40AF 100%)',
        'gradient-luxury-blue': 'linear-gradient(135deg, #003DA5 0%, #0EA5E9 50%, #FFD700 100%)',
      },
    },
  },
  plugins: [],
}
