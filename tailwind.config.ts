import type { Config } from "tailwindcss";
import dotenv from 'dotenv'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  weatherstack: {
    apiKey: process.env.WEATHERSTACK_API_KEY,
    baseUrl: process.env.WEATHERSTACK_API_BASE_URL,
  },
  plugins: [],
};
export default config;
