/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
];
export const theme = {
    extend: {
        colors: {
            accent: {
                50: '#eaf6ff',
                100: '#d7efff',
                500: '#60a5fa' // blue accent for buttons
            },
            surface: {
                900: '#0b1220',
                800: '#0f1724',
                700: '#111827'
            }
        }
    }
};
export const plugins = [];
