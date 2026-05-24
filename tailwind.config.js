/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        primary: '#E1E0CC',
        accent: '#DEDBC8',
        card: '#101010',
        'card-elevated': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Almarai', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'noise': 'noise 0.5s steps(10) infinite',
      },
      keyframes: {
        noise: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-1%, -1%)' },
          '20%': { transform: 'translate(-2%, 1%)' },
          '30%': { transform: 'translate(1%, -2%)' },
          '40%': { transform: 'translate(-1%, 2%)' },
          '50%': { transform: 'translate(-2%, 1%)' },
          '60%': { transform: 'translate(2%, 0)' },
          '70%': { transform: 'translate(0, 2%)' },
          '80%': { transform: 'translate(-2%, 1%)' },
          '90%': { transform: 'translate(1%, 1%)' },
        }
      }
    },
  },
  plugins: [],
}
