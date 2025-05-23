/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'goblin': ['"Goblin One"', ...fontFamily.sans],
        'russo': ['"Russo One"', ...fontFamily.sans],
        'squada': ['"Squada One"', ...fontFamily.sans],
        'wallpoet': ['"Wallpoet"', ...fontFamily.sans],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, #3b82f6, #8b5cf6)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}

