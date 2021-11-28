const colors = require('tailwindcss/colors')


module.exports = {
  purge: ['./pages//*.{js,ts,jsx,tsx}', './components//*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'

  theme: {
    extend: { colors: {
        transparent: 'transparent',
        current: 'currentColor',
        emerald: colors.emerald,

      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
