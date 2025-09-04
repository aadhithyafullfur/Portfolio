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
        'fall': 'fall 10s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
        'float-gentle': 'floatGentle 3s ease-in-out infinite',
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
        fall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '50%': { transform: 'translateY(-5px)', opacity: '0.7' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        'xs': '475px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
