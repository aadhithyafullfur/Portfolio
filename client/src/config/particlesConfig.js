const particlesConfig = {
  autoPlay: true,
  background: {
    color: {
      value: "#000000"
    },
    opacity: 1
  },
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: {
        value: "#ffffff"
      },
      distance: 150,
      enable: true,
      opacity: 0.4
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce"
      },
      random: false,
      speed: 2,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      value: { min: 1, max: 3 }
    }
  },
  detectRetina: true
};

export default particlesConfig;
