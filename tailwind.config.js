/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      "2xl": '1536px',
      "3xl": '1920px',
      "4xl": '2560px',
    },
  },
  extend: {
    backgroundImage: {
      'check': "url('/public/')",
    }
  },
  plugins: [],
}
