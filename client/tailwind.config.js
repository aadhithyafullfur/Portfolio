module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-black': '#1A1A2E',
        'accent-purple': '#8A2BE2',
        'text-light': '#E0E0E0',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        gradient: 'gradient 5s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
