module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00AFF4',
        secondary: '#FF3287',
        tertiary: '#C87296'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
