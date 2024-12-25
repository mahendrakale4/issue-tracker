module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        // ... other paths
    ],
    theme: {
        extend: {
            animation: {
                'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            colors: {
                purple: {
                    900: '#17003D',
                    800: '#1F0054',
                    700: '#24015E',
                },
            },
        },
    },
    plugins: [],
} 