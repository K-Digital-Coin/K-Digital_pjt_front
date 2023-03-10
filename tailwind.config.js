/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens :{
      'sm': '300px',
      // => @media (min-width: 640px) { ... }

      'md': '600px',
      // => @media (min-width: 768px) { ... }

      'lg': '800px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1000px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1400px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      animation : {
        'spin-slow' : 'spin 9s linear infinite',
        'spin-delay' : 'spin 9s linear infinite -4.5s'
      },
      backgroundImage : {
        'bg1' : 'url("https://c.wallhere.com/photos/c1/2b/5000x3000_px_Bitcoin_money-1210272.jpg!d")'
      }
    },
  },
  plugins: [],
}