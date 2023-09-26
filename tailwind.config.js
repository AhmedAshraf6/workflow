module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '767px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
    extend: {
      colors: {
        primary: '#3b82f6',
        primaryHover: '#1d4ed8',
        light: '#fff',
        dark: '#102a43',
        bgLight: '#f0f4f8',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
// dashboard page background
// #f0f4f8
