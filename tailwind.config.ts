import type { Config } from "tailwindcss";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./App.tsx",
    "./main.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./shared/**/*.{js,jsx,ts,tsx}",
    "./services/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      colors: {
        premium: {
          bg: '#121212',        // Main body background
          sidebar: '#0f0f0f',   // Sidebar background
          card: '#1e1e1e',      // Card background
          hover: '#2a2a2a',     // Hover state for list items
          border: '#333333',    // Subtle borders
          red: '#ef4444',       // Brand Accent
          'red-dark': '#b91c1c',
          green: '#25D366',     // Success/Action
          'green-dark': '#128C7E',
          text: '#f3f4f6',      // Primary Text
          muted: '#9ca3af',     // Secondary Text
          gold: '#D4AF37',      // Certificate/Achievement
        },
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'pill': '9999px',
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;