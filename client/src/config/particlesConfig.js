/**
 * Responsive Particles.js Configuration
 * Adapts particle count and behavior based on device screen size
 */

const getParticlesConfig = (isMobile = false) => {
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  // Reduce particles on mobile for better performance - NO LAG version
  const particleCount = isMobile ? 15 : isTablet ? 35 : 70;
  const particleSpeed = isMobile ? 0.15 : 0.45;
  const particleSize = isMobile ? 1.2 : 2.2;

  return {
    particles: {
      number: {
        value: particleCount,
        density: {
          enable: true,
          value_area: isMobile ? 800 : 1000
        }
      },
      color: {
        value: '#A855F7'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: isMobile ? 0.25 : 0.4,
        random: true,
        anim: {
          enable: true,
          speed: isMobile ? 0.5 : 1,
          opacity_min: isMobile ? 0.1 : 0.2,
          sync: false
        }
      },
      size: {
        value: particleSize,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.5,
          sync: false
        }
      },
      line_linked: {
        enable: !isMobile, // Disable lines on mobile for performance
        distance: 200,
        color: '#A855F7',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: particleSpeed,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: window.innerWidth < 768 ? 'window' : 'window',
      events: {
        onhover: {
          enable: window.innerWidth >= 768, // Only hover effects on desktop
          mode: 'grab'
        },
        onclick: {
          enable: window.innerWidth >= 768,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 200,
          line_linked: {
            opacity: 0.5
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true,
    fps_limit: isMobile ? 25 : 55,
    responsive: [
      {
        breakpoint: 768,
        options: {
          particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 900
              }
            },
            line_linked: {
              enable: false
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: false
              },
              onclick: {
                enable: false
              }
            }
          }
        }
      }
    ]
  };
};

export default getParticlesConfig;
