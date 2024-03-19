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
        blue: {
          'hover': '#5875d4', 
        },
      }
    },
  },
  plugins: [],
}

