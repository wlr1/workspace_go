import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#232930",
        secondary: "#e89688",
        lightMain: "#fcfcfc",
        lightText: "#4e4e4e",
        lightBorder: "#e9e9e9",
      },
      backgroundImage: {
        bgAuth:
          'url("https://images.unsplash.com/photo-1516797045820-6edca89b2830?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      },
    },
  },
  plugins: [],
} satisfies Config;
