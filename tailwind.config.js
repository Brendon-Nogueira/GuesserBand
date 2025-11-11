/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d33f2",
        primaryLight: "#264dfc",
        primaryDark: "#0a28b8",
        // Tema Claro
        "background-light": "#f5f6f8",
        "text-light": "#1e1e1e",
        "subtext-light": "#4b5563",
        "card-light": "#ffffff",
        "border-light": "#d1d5db",

        // Tema Escuro
        "background-dark": "#101322",
        "text-dark": "#ffffff",
        "subtext-dark": "#a0a8c0",
        "card-dark": "#1a1e2e",
        "border-dark": "#2d3348",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
