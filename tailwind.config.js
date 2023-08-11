/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      darkblue: '#04194f',
      blue: '#072c89',
      white: '#f4f4f9',
      'white-200': '#f4f4f9b2',
    },
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in',
        fadeInBg: 'fadeIn 1s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
