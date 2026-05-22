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
                    neutral: '#22263a',
                    'neutral-content': '#e2e8f0',
                    'base-100': '#0f1117',
                    'base-200': '#1a1d27',
                    'base-300': '#22263a',
                    'base-content': '#e2e8f0',
                    info: '#38bdf8',
                    success: '#4ade80',
                    warning: '#fbbf24',
                    error: '#f87171',
                },
            },
        ],
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
