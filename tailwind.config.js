/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a1a1a",
          light: "#2d2d2d",
          dark: "#0d0d0d",
        },
        secondary: {
          DEFAULT: "#d4af37", // Gold accent color
          light: "#e6c05a",
          dark: "#b38f2a",
        },
        accent: {
          DEFAULT: "#8b5a2b", // Brown accent color
          light: "#a67c52",
          dark: "#6b3e1a",
        },
        background: {
          DEFAULT: "#f8f8f8",
          dark: "#1a1a1a",
        },
        text: {
          DEFAULT: "#333333",
          light: "#666666",
          dark: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair-display)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [],
};
