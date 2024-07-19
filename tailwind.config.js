const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dbfe01',
        secondary: '#333334',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#dbfe01",
              foreground: "#000000",
            },
            secondary:{
              DEFAULT: "#dadada",
              foreground: "#000000",
            },
            focus: "#dbfe01",
          },
        },
      },
    }),
  ],
}
