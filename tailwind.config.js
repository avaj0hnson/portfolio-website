/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
          dark: '#388E3C',
        },
        accent: {
          DEFAULT: '#FF9800',
          light: '#FFB74D',
          dark: '#F57C00',
        }
      }
    }
  },
  plugins: [],
}

