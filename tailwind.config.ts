import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep, muted evergreen — primary actions, active states, key metrics
        forest: {
          50: "#EEF3EE",
          100: "#DCE7DC",
          200: "#B8CFB9",
          300: "#8FB090",
          400: "#5E8961",
          500: "#3F6B43",
          600: "#2D5432",
          700: "#234229",
          800: "#1B3320",
          900: "#132419",
          950: "#0C1811",
        },
        // Warm neutral surfaces
        canvas: {
          DEFAULT: "#F7F6F2",
          surface: "#FFFFFF",
          raised: "#FBFAF7",
        },
        // Slate-adjacent ink for typography, tuned slightly warm
        ink: {
          50: "#F4F5F3",
          100: "#E7E9E5",
          200: "#CDD1CA",
          300: "#A9AFA3",
          400: "#818A7C",
          500: "#636D5F",
          600: "#4C5548",
          700: "#3B4236",
          800: "#2A2F27",
          900: "#1D211B",
        },
        amber: {
          50: "#FBF3E7",
          400: "#C9963C",
          600: "#9C7128",
        },
        clay: {
          50: "#F8EEEC",
          400: "#B4574A",
          600: "#8E3F35",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(19, 36, 25, 0.04)",
        panel: "0 1px 3px 0 rgba(19, 36, 25, 0.06), 0 1px 2px -1px rgba(19, 36, 25, 0.06)",
      },
      spacing: {
        "4.5": "1.125rem",
      },
      maxWidth: {
        shell: "1400px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 220ms ease-out",
        "spin-slow": "spin-slow 900ms linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
