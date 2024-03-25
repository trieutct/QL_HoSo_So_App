/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '14': '14px',
      },
      colors:{
        "main":"#4764c3",
        "dot":"rgb(38, 202, 82)",
        blue: {
          'hover': '#5875d4', 
        },
      }
    },
  },
  plugins: [],
}

