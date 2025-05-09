/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/*.{js,ts,jsx,tsx}", "./src/styles/*.{js,ts,jsx,tsx}"],
  exclude: [],
  theme: {
    extend: {
      keyframes: {
        tick: {
          '0%': { transform: 'scale(1)' },
          '70%': { transform: 'scale(1.2)' },
          '85%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        'tick': 'tick 0.4s cubic-bezier(0.4, 0, 0.2, 1) infinite'
      }
    }
  },
  plugins: [],
};
