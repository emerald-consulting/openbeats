const colors = require("tailwindcss/colors");

module.exports = {
  purge: false,
  darkMode: "class", 

  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        emerald: colors.emerald,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
