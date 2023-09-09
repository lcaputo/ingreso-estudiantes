/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#06b6d4",
        },
        secondary: {
          DEFAULT: "#706F6F",
        },
        warning: {
          DEFAULT: "#DB3A34",
        },
        dark: {
          DEFAULT: "#00171F",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
