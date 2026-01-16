/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: ['Urbanist', 'Outfit', 'ui-sans-serif', 'system-ui'],
                secondary: ['Quicksand', 'Sansation', 'monospace']
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