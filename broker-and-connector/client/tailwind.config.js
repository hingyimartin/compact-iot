/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#050315',
        background: '#fbfbfe',
        primary: '#2f27ce',
        secondary: '#dedcff',
        accent: '#433bff',
      },
    },
  },
  plugins: [],
};
