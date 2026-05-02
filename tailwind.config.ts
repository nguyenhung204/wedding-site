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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // Use the next/font variables. Listing fallbacks ensures Vietnamese
        // glyphs render even if the primary font has no Vietnamese subset.
        script: ["var(--font-dancing)", "Dancing Script", "cursive"],
        scriptbold: ["var(--font-dancing)", "Dancing Script", "cursive"],
        cormorant: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        serifw: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
