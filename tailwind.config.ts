import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdfaf4',
          100: '#f7ecd7',
          200: '#eed7af',
          300: '#e2c082',
          400: '#d9a85d',
        },
        bark: {
          700: '#6a4424',
          800: '#4f2f16',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
