/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5A27',
          light: '#4A7C59',
          dark: '#1B3A19',
        },
        accent: {
          DEFAULT: '#D4956B',
          light: '#E8B4B8',
          dark: '#B87A4F',
        },
        botanical: {
          leaf: '#2D5A27',
          sage: '#87A878',
          moss: '#4A7C59',
          fern: '#6B8F71',
          cream: '#F5F0E8',
          bark: '#3D2B1F',
          petal: '#E8B4B8',
          bloom: '#D4956B',
          gold: '#C8A951',
          midnight: '#0F1A0B',
        }
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'bloom': {
          '0%': { transform: 'scale(0) rotate(-20deg)', opacity: '0' },
          '60%': { transform: 'scale(1.1) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'vine-grow': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'leaf-drift': {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.5' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'bloom': 'bloom 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'vine-grow': 'vine-grow 1.5s ease forwards',
        'leaf-drift': 'leaf-drift var(--drift-duration, 8s) linear infinite',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
    }
  },
  plugins: [],
}
