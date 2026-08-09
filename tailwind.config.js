/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        // Small phones (iPhone SE is 375px)
        xs: '400px',
      },
      colors: {
        brand: {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        ink: {
          DEFAULT: '#050505',
          950: '#050505',
          900: '#0b0b0c',
          850: '#0f0f10',
          800: '#141416',
          700: '#1c1c1f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.35em',
      },
      borderRadius: {
        card: '1.75rem',
        panel: '2rem',
      },
      boxShadow: {
        card: '0 20px 60px rgba(0,0,0,0.22)',
        panel: '0 30px 80px rgba(0,0,0,0.28)',
        glow: '0 0 0 1px rgba(245,158,11,0.25), 0 18px 50px -12px rgba(245,158,11,0.35)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};
