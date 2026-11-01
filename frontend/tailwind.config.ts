/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        emerald: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        beacon: {
          bg: "#000000",
          surface: "#0a0a0a",
          card: "#0f0f0f",
          border: "rgba(255,255,255,0.08)",
          "border-hover": "rgba(255,255,255,0.15)",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "counter": "counter 1.5s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "globe-spin": "globeSpin 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(16,185,129,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(16,185,129,0.6)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
