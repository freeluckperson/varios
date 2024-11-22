/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3F3D56",
        secondary: "#6C63FF",
        background: "#1A1A1A",
      },
      fontFamily: {
        sans: ["Red Hat Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};
