const colors = require("tailwindcss/colors");

module.exports = {
<<<<<<< HEAD
  purge: false,
  darkMode: "class", 
=======
  purge: ["./pages//*.{js,ts,jsx,tsx}", "./components//*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
>>>>>>> 92e221aa47661ebaeeb27f8809ad5b6dcacc51c5

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
