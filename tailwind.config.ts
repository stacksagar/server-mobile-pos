const withMT = require("@material-tailwind/html/utils/withMT");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./views/**/*.ejs", "./public/**/*.js"],
  darkMode: "class",
  mode: "jit",
  theme: {
    screens: {
      "2xsm": "375px",
      xsm: "425px",
      "2md": "960px",
      "3xl": "2000px",
      ...defaultTheme.screens,
    },

    extend: {
      colors: {
        current: "currentColor",
        "black-2": "#010101",
        primary: "#3C50E0",
        secondary: "#80CAEE",
        success: "#219653",
        whiter: "#F5F7FD",
        danger: "#D34053",
        warning: "#FFA70B",
        dark: "#002240",
        darkblue: "#141747",
        darkblue2: "#0D0F2F",
      },
    },
  },
  plugins: [],
});
