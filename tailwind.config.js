/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation : {
        'spin-slow' : 'spin 9s linear infinite',
        'spin-delay' : 'spin 9s linear infinite -4.5s'

      }
    },
  },
  plugins: [],
}