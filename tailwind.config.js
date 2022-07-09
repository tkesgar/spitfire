const daisyui = require('daisyui')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Exo 2"', 'sans-serif'],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['black']
  },
}
