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
        brand: {
          dark: "#0f0f0f",
          darker: "#000000",
          light: "#f9fafb",
          white: "#ffffff",
          red: "#ef4444",
          "red-hover": "#b91c1c",
          whatsapp: "#25D366",
          "whatsapp-hover": "#128C7E",
          text: "#111827",
          muted: "#4b5563",
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