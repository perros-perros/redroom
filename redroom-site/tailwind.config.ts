import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      colors: {
        burgundy: {
          50: "#FBF0F1",
          100: "#F4D6D9",
          200: "#E5A4AB",
          300: "#D2727C",
          400: "#B84954",
          500: "#9A2D38",
          600: "#7B1F2B",
          700: "#631823",
          800: "#4A121B",
          900: "#320C12",
          950: "#1C060A",
        },
        bone: {
          50: "#FAF7F2",
          100: "#F2EDE4",
          200: "#E4DCCD",
          300: "#C9BCA3",
        },
        ink: {
          400: "#807870",
          500: "#5A544D",
          700: "#2B2823",
          800: "#1A1815",
          900: "#0F0E0C",
        },
      },
      fontSize: {
        caption: ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.55" }],
        "body-lg": ["1.125rem", { lineHeight: "1.5" }],
        h5: ["1.375rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h4: ["1.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h3: ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        h2: ["3rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        h1: ["4.25rem", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        display: ["6rem", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
      },
      letterSpacing: {
        editorial: "0.18em",
        label: "0.22em",
      },
      boxShadow: {
        burgundy: "0 18px 48px -12px rgba(123, 31, 43, 0.45)",
        "burgundy-lg": "0 24px 60px -12px rgba(154, 45, 56, 0.55)",
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
} satisfies Config;
