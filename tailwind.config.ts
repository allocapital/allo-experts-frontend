import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-[#FFE5F8]",
    "bg-[#DBF0DB]",
    "bg-[#DAD6FF]",
    "bg-[#FFEEBE]",
    "bg-[#FFFDEB]",
    "bg-[#FFD9CE]",
    "bg-[#D3EDFE]",
    "bg-[#C8F6F6]",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["DM Mono", ...defaultTheme.fontFamily.mono],
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "hero-bg-gradient": "url('/hero-gradient-bg.png')",
        "footer-gradient-bg": "url('/footer-gradient-bg.png')",
        "allo-bg": "url('/allo-bg.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        green: {
          "500": "#185B52",
          "700": "#00433B",
        },
        blue: {
          "200": "#9EDCFF",
          "600": "#191AFE",
          "800": "#082553",
        },
        yellow: {
          "200": "#F8FFA9",
          "500": "#F0FF40",
        },
        grey: {
          "100": "#EBEBEB",
          "200": "#CACBCB",
          "400": "#979998",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    animate,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function ({ addVariant }: any) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
export default config;
