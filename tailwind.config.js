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
          primary: '#dc2626',
          secondary: '#f3f4f6',
          accent: '#9ca3af',
          neutral: '#dc2626',
          'base-100': '#111827',
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
