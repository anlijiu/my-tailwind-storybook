/** @type {import('tailwindcss').Config} */
const withMT = require("./src/app/components/utils/withMT");

module.exports = withMT({
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./node_modules",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
