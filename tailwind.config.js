/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js, jsx, ts, tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'ui-sans-serif', 'system-ui'],
                mono: ['Sansation', 'monospace']
            },
            /*colors: {
                brand: {
                    dark: "#463f3a",
                    DEFAULT: "#8a817c",
                    lightGray: "#bcb8b1",
                    light:"#f4f3ee"
                },
                accent: "#e0afa0"
            }*/
        }
    },
    plugins: [],
};