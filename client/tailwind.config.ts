import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0d0d0d", // main background color
        secondary: "#17161a", // secondary background color
        grey1: "#272729",
        grey2: "#c0bec4",
        accent: "#6b34f7" // neon purple
      },
      fontFamily: {
        heading: ["Roboto", "sans-serif"],
        body: ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
} satisfies Config;
