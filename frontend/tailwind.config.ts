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
        canvas: "#000000",
        "bg-primary": "#0a0a0a",
        "bg-secondary": "#121212",
        "bg-tertiary": "#1a1a1a",
        "bg-elevated": "#242424",
        "bg-hover": "#2a2a2a",
        "text-primary": "#f1f5f9",
        "text-secondary": "#94a3b8",
        "text-muted": "#64748b",
        "text-accent": "#60a5fa",
        "text-inverse": "#0f172a",
        neon: {
          sky: "#90CAF9",
          blue: "#2196F3",
          cyan: "#00E5FF",
          ice: "#E3F2FD",
          cobalt: "#1565C0",
        },
      },
      boxShadow: {
        "neon-blue": "0 0 25px rgba(33, 150, 243, 0.4), 0 0 50px rgba(33, 150, 243, 0.2)",
        "neon-cyan": "0 0 25px rgba(0, 229, 255, 0.45), 0 0 50px rgba(0, 229, 255, 0.25)",
        "neon-sky": "0 0 20px rgba(144, 202, 249, 0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-neon": "pulseNeon 2.5s ease-in-out infinite",
        "pulse-cyan": "pulseCyan 2s ease-in-out infinite",
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
        pulseNeon: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(33,150,243,0.3)" },
          "50%": { boxShadow: "0 0 35px rgba(33,150,243,0.65)" },
        },
        pulseCyan: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(0,229,255,0.35)" },
          "50%": { boxShadow: "0 0 40px rgba(0,229,255,0.75)" },
        },
      },
    },
  },
  plugins: [],
};
