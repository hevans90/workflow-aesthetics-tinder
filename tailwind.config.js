/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pampas: {
          50: '#f6f4f0',
          100: '#efece5',
          200: '#dfd7c9',
          300: '#cabda7',
          400: '#b39e84',
          500: '#a4886b',
          600: '#97785f',
          700: '#7e6250',
          800: '#675145',
          900: '#54443a',
          950: '#2d231d',
        },
        gray: {
          50: '#f7f7f6',
          100: '#e4e4e3',
          200: '#c9c9c6',
          300: '#a7a6a1',
          400: '#84837d',
          500: '#696963',
          600: '#53534e',
          700: '#454440',
          800: '#393936',
          900: '#32322f',
          950: '#0f0f0e',
        },
      },

      fontFamily: {
        crimson: 'Crimson Pro Variable, sans-serif',
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
