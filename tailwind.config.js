module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screen:{
      "mobile":"360px"
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
