/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1677ff',
          dark: '#0f5dc4',
        },
      },
    },
  },
  plugins: [],
}

