/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#0b0b13",
        primary: "#00E5FF",
        accent: "#7B61FF",
        secondary: "#1A1A2E",
        glass: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Satoshi', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00E5FF, 0 0 10px #00E5FF' },
          '100%': { boxShadow: '0 0 20px #00E5FF, 0 0 30px #00E5FF' },
        }
      }
    },
  },
  plugins: [],
}
