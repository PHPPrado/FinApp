/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*{.html, js}"],
  theme: {
    extend: {      
      fontFamily:{
      nunito: ['Nunito', 'sans-serif']
      },
      colors:{
        finYellow: ['#F1C93B'],
        finGreen: ['#1A5D1A'],
      } 
    },
  },
  plugins: [],
}