module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderColor: {DEFAULT: '#e36e00'}, // mytheme.primary
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: '#e36e00',
          secondary: '#912e00',
          accent: '#a6302e',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
