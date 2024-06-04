module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00AFF4',
        secondary: '#FF3287',
        tertiary: '#C87296',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
