/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sophisticated neutral palette
        'charcoal': '#1a1a1a',
        'slate': '#2d3748',
        'off-white': '#fafafa',
        'warm-gray': '#f7f7f7',
        'soft-gray': '#e2e8f0',
        'medium-gray': '#64748b',
        'dark-gray': '#334155',
        
        // Refined accent colors
        'soft-blue': '#3b82f6',
        'emerald': '#10b981',
        'gold': '#f59e0b',
        'rose': '#f43f5e',
        
        // Legacy Disney colors (refined)
        'disney-blue': '#1e40af',
        'disney-blue-light': '#3b82f6',
        'disney-blue-dark': '#1e3a8a',
        'disney-gold': '#f59e0b',
        'disney-red': '#dc2626',
        'disney-pink': '#ec4899',
        'disney-teal': '#14b8a6',
        'disney-orange': '#f97316',
        'luxury-gold': '#f59e0b',
        'luxury-silver': '#94a3b8',
        'luxury-platinum': '#e2e8f0',
        'magic-blue': '#3b82f6',
        'magic-green': '#10b981',
        'royal-blue': '#1e3a8a',
        'royal-gold': '#f59e0b',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Merriweather', 'serif'],
        'sans': ['Inter', 'Lato', 'Montserrat', 'sans-serif'],
        'disney': ['Walt Disney Script', 'cursive'],
        'luxury': ['Playfair Display', 'serif'],
        'modern': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'subheading': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'small': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
      },
      animation: {
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'hover-lift': 'hoverLift 0.2s ease-out',
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
          '0%': { boxShadow: '0 0 5px #f59e0b, 0 0 10px #f59e0b, 0 0 15px #f59e0b' },
          '100%': { boxShadow: '0 0 10px #f59e0b, 0 0 20px #f59e0b, 0 0 30px #f59e0b' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
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
