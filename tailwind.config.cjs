/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Enable dark mode with `class`
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // ✅ Ensure it scans all files in `src`
  theme: {
    extend: {},
  },
  plugins: [],
};
