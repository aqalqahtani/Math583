/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",        // 👈 add this
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#0f172a",
          500: "#38bdf8",
          600: "#0ea5e9",
        },
      },
    },
  },
  plugins: [],
};
