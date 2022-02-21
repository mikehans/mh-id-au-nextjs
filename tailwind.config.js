module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {

    extend: {
      colors: {
        primary: "ff4800"
      },
      fontFamily: {
        heading: ['Raleway Semibold', 'Helvetica', 'Verdana', 'sans-serif'],
        subtitle: ['Raleway XLight', 'sans-serif']
      }
    },
  },
  plugins: [],
}
