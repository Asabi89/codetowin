/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/assets/brand",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Satoshi", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857", // Primary Green
          800: "#065F46", // Dark Green
          900: "#064E3B",
          950: "#022C22",
        },
        navy: {
          900: "#0F172A", // Dark Navy
        },
        gold: {
          400: "#FBBF24", // Gold Accent
        },
        silver: {
          400: "#9CA3AF",
        },
        bronze: {
          400: "#D97706",
        }
      },
    },
  },
  plugins: [],
}

