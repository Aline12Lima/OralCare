/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}, // Deixe vazio, pois o v4 lê do CSS
  },
  plugins: [],
}