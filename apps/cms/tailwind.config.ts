/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        foreground: '#fafafa',
        card: {
          DEFAULT: '#18181b',
          foreground: '#fafafa',
        },
        popover: {
          DEFAULT: '#18181b',
          foreground: '#fafafa',
        },
        primary: {
          DEFAULT: '#fafafa',
          foreground: '#18181b',
        },
        secondary: {
          DEFAULT: '#27272a',
          foreground: '#fafafa',
        },
        muted: {
          DEFAULT: '#27272a',
          foreground: '#a1a1aa',
        },
        accent: {
          DEFAULT: '#27272a',
          foreground: '#fafafa',
        },
        destructive: {
          DEFAULT: '#7f1d1d',
          foreground: '#fafafa',
        },
        border: '#27272a',
        input: '#27272a',
        ring: '#52525b',
        chart: {
          '1': '#3b82f6',
          '2': '#10b981',
          '3': '#f59e0b',
          '4': '#8b5cf6',
          '5': '#ec4899',
        },
        sidebar: {
          DEFAULT: '#09090b',
          foreground: '#fafafa',
          primary: '#fafafa',
          'primary-foreground': '#18181b',
          accent: '#27272a',
          'accent-foreground': '#fafafa',
          border: '#27272a',
          ring: '#52525b',
        },
      },
      borderRadius: {
        lg: '0.625rem',
        md: '0.425rem',
        sm: '0.225rem',
      },
    },
  },
  plugins: [],
};
