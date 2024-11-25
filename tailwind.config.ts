import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'todo': {
          'green': '#52FF00',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'], // This makes Inter the default font
      },
      fontWeight: {
        regular: '400',
        bold: '700',
      },
    },
  },
  plugins: [],
};

export default config;