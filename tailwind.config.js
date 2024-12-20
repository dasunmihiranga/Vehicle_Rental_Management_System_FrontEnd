/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        background: '#2A2A2A',
        background1:'#1D1D1D',
        surface: '#353535', // Card elements color
        text: '#E0E4E8', // Text color
        primary: '#1B68C4', 
        secondary: '#F6425E', 
        muted: '#A5B3B7', 
      },
    },
  },
  plugins: [],
}
