module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                nordstern: {
                    'color-scheme': 'dark',
                    primary: '#e36e00',
                    'primary-content': '#ffffff',
                    secondary: '#912e00',
                    'secondary-content': '#ffffff',
                    accent: '#a6302e',
                    'accent-content': '#ffffff',
                    neutral: '#2a323c',
                    'neutral-content': '#A6ADBB',
                    'base-100': '#1d232a',
                    'base-200': '#191e24',
                    'base-300': '#15191e',
                    'base-content': '#A6ADBB',
                },
            },
        ],
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
