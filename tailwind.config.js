module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderColor: {DEFAULT: '#dc2626'}, // mytheme.primary
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#b91c1c',
          secondary: '#ffffff',
          accent: '#9ca3af',
          neutral: '#b91c1c',
          'base-100': '#111111',
          info: '#6EA7D4',
          success: '#28AF84',
          warning: '#F0AA14',
          error: '#F96C5D',
        },
      },
      'cyberpunk',
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
