/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: {
          DEFAULT: '#0A0A0A',
          light: '#141414',
          lighter: '#1E1E1E',
        },
        platine: {
          DEFAULT: '#E8E8E8',
          light: '#FFFFFF',
          dark: '#A8A8A8',
        },
        ivory: {
          DEFAULT: '#F5F5F5',
          dark: '#E6E6E6',
        },
        graphite: '#2B2B2B',
        argent: '#B8B8B8',
      },
      fontFamily: {
        serifDisplay: ['"Playfair Display"', 'Georgia', 'serif'],
        sansBody: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widestTight: '0.25em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
