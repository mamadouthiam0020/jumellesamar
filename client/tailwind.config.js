/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: {
          DEFAULT: 'rgb(var(--color-noir) / <alpha-value>)',
          light: 'rgb(var(--color-noir-light) / <alpha-value>)',
          lighter: 'rgb(var(--color-noir-lighter) / <alpha-value>)',
        },
        platine: {
          DEFAULT: 'rgb(var(--color-platine) / <alpha-value>)',
          light: 'rgb(var(--color-platine-light) / <alpha-value>)',
          dark: 'rgb(var(--color-platine-dark) / <alpha-value>)',
        },
        ivory: {
          DEFAULT: 'rgb(var(--color-ivory) / <alpha-value>)',
          dark: 'rgb(var(--color-ivory-dark) / <alpha-value>)',
        },
        graphite: 'rgb(var(--color-graphite) / <alpha-value>)',
        argent: 'rgb(var(--color-argent) / <alpha-value>)',
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
