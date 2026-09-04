/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kora: '#F2ECDE',
        surface: '#FBF8F1',
        ink: '#2A241C',
        indigo: {
          DEFAULT: '#22405E',
          dark: '#182D43',
          light: '#3C5A7A',
        },
        madder: {
          DEFAULT: '#A6462F',
          dark: '#873923',
        },
        turmeric: {
          DEFAULT: '#C68A2E',
          light: '#DCAE5E',
        },
        gold: '#B98D4E',
        line: '#DDD3BE',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(42,36,28,0.06), 0 8px 24px -12px rgba(42,36,28,0.18)',
      },
    },
  },
  plugins: [],
};
