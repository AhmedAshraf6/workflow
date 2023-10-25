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
    // extend: {
    //   colors: {
    //     bgLight: '#f0f4f8',
    //   },
    // },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};
// dashboard page background
// #f0f4f8
