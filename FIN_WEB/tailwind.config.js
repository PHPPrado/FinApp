/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*{.html, js}"],
  theme: {
    extend: {      
      fontFamily:{
      nunito: ['Nunito', 'sans-serif'],
      league: ['League Spartan', 'nunito']
      },
      colors:{
        finYellow: ['#F1C93B'],
        finGreen: ['#1A5D1A'],
        finColor: ['#4ACACC'],
      } 
    },
  },
  plugins: [],
}