
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: '#000000',
        input: '#000000',
        ring: '#000000',
        background: '#000000',
        foreground: '#FFFFFF',
        primary: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#333333',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#666666',
          foreground: '#FFFFFF'
        },
        accent: {
          DEFAULT: '#999999',
          foreground: '#000000'
        },
        card: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF'
        },
        wedding: {
          'purple': '#000000',
          'deep-purple': '#000000',
          'light-purple': '#333333',
          'gold': '#FFFFFF',
          'cream': '#CCCCCC',
          'blush': '#AAAAAA',
          'charcoal': '#000000'
        }
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(45deg, #000000 0%, #FFFFFF 50%, #000000 100%)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
