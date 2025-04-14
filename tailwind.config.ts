
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
        border: '#333333',
        input: '#333333',
        ring: '#222222',
        background: '#000000',
        foreground: '#FFFFFF',
        primary: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#222222',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#444444',
          foreground: '#FFFFFF'
        },
        accent: {
          DEFAULT: '#666666',
          foreground: '#FFFFFF'
        },
        card: {
          DEFAULT: '#111111',
          foreground: '#FFFFFF'
        },
        wedding: {
          'purple': '#333333',
          'deep-purple': '#222222',
          'light-purple': '#555555',
          'gold': '#D4AF37',
          'cream': '#F5F5F5',
          'blush': '#D8D8D8',
          'charcoal': '#111111'
        }
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(45deg, #8A7B3C 0%, #D4AF37 50%, #8A7B3C 100%)'
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite"
      },
      keyframes: {
        "shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "0 0" }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
