import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Colors
        bento: {
          bg:      "#070b14",
          bg2:     "#0d1424",
          surface: "#111827",
          text:    "#f0f4ff",
          dim:     "rgba(240, 244, 255, 0.6)",
          faint:   "rgba(240, 244, 255, 0.35)",
        },
        // Accent Colors
        violet: {
          DEFAULT: "#7c3aed",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        // Lighter, luminous Sage & Jade palette
        sage: {
          DEFAULT: "#6FA88B",
          50:  "#F2F8F5",
          100: "#E3F1EA",
          200: "#C6E4D5",
          300: "#A2D5BD",
          400: "#84C4A3",
          500: "#6FA88B",
          600: "#588E73",
          700: "#44715B",
          luminous: "#94DEC0",
        },
        jade: {
          DEFAULT: "#62BA92",
          50:  "#F0FAF5",
          100: "#DCF4E8",
          200: "#BDECD3",
          300: "#98DFBA",
          400: "#72CE9F",
          500: "#62BA92",
          600: "#4A9F78",
          700: "#377E5E",
          luminous: "#7FE7B8",
        },
        // Neo-Brutalist Pastel Palette
        ivory: {
          DEFAULT: "#FAF7F0",
          50:  "#FFFDF9",
          100: "#FAF7F0",
          200: "#F3EDE0",
          card: "#FFFFFF",
        },
        pastel: {
          yellow:   "#FFE57F",
          "yellow-light": "#FFF3B0",
          blue:     "#A5D8FF",
          "blue-light": "#D0EBFF",
          pink:     "#FFAEC8",
          "pink-light": "#FFD6E3",
          lavender: "#D8B4FE",
          "lavender-light": "#EDE2FE",
          mint:     "#A7F3D0",
          peach:    "#FFD8A8",
        },
      },
      fontFamily: {
        space: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "sans-serif",
        ],
        inter: [
          "var(--font-inter)",
          "Inter",
          "sans-serif",
        ],
        sans: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      boxShadow: {
        "brutal-xs":  "2px 2px 0px #000000",
        "brutal-sm":  "3px 3px 0px #000000",
        "brutal":     "5px 5px 0px #000000",
        "brutal-lg":  "8px 8px 0px #000000",
        "brutal-xl":  "12px 12px 0px #000000",
        "brutal-pink": "5px 5px 0px #FFAEC8",
        "brutal-blue": "5px 5px 0px #A5D8FF",
        "brutal-yellow": "5px 5px 0px #FFE57F",
      },
      transitionTimingFunction: {
        "out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        "800": "800ms",
        "900": "900ms",
        "1000": "1000ms",
        "1200": "1200ms",
      },
      animation: {
        "float":             "float 4s ease-in-out infinite",
        "float-delay":       "float 4s ease-in-out 1s infinite",
        "microgravity":      "microgravity 4.8s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "microgravity-slow": "microgravity 6s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "microgravity-drift":"microgravity-drift 5.2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "glow-pulse":        "glow-pulse 3s ease-in-out infinite",
        "glow-sage":         "glow-sage 4.2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "spin-slow":         "spin-slow 12s linear infinite",
        "marquee":           "marquee 30s linear infinite",
        "slide-up":          "slide-up 0.7s ease-out forwards",
        "fade-in":           "fade-in 0.5s ease-out forwards",
        "bounce-gentle":     "bounce-gentle 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        microgravity: {
          "0%, 100%": { transform: "translate3d(0, 0px, 0) rotate(0deg)" },
          "33%":      { transform: "translate3d(2px, -5px, 0) rotate(0.4deg)" },
          "66%":      { transform: "translate3d(-2px, -3px, 0) rotate(-0.3deg)" },
        },
        "microgravity-drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%":      { transform: "translate3d(3px, -6px, 0) rotate(0.6deg)" },
        },
        "glow-sage": {
          "0%, 100%": { boxShadow: "0 0 0 1px rgba(126, 196, 163, 0.10), 0 0 14px rgba(110, 182, 148, 0.06)" },
          "50%":      { boxShadow: "0 0 0 1px rgba(148, 222, 192, 0.15), 0 0 24px rgba(127, 231, 184, 0.12)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" },
          "50%":      { boxShadow: "0 0 50px rgba(139, 92, 246, 0.6), 0 0 80px rgba(139, 92, 246, 0.2)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-5px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grad-1": "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        "grad-2": "linear-gradient(135deg, #ec4899, #8b5cf6)",
        "grad-3": "linear-gradient(135deg, #06b6d4, #3b82f6)",
        "grad-sage": "linear-gradient(135deg, #78CFA7, #A2D5BD)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
