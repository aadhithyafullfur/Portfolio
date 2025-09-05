import React, { Suspense, useState, useRef, useEffect, useCallback, lazy } from 'react';
// Lazy load non-critical components
const Navbar = lazy(() => import('./components/Navbar.js'));
const Footer = lazy(() => import('./components/Footer.js'));
import About from './components/About.js';
import Certifications from './components/Certifications.js';
import Skills from './components/Skills.js';
import Projects from './components/Projects.js';
import Contact from './components/Contact.js';
import Leetcode from './components/Leetcode.js';
import LoadingSpinner from './components/LoadingSpinner.js';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaDownload } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lottie from 'lottie-react';
import loaderData from './assets/loader.json';
// Particles.js is loaded from public/js/particles.js

const SymbolsBackground = () => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const generatedSymbols = [];
    const symbolChars = ['< />', '{ }', '</>', '=>', '++', '&&'];
    
    // Reduce symbols on mobile for better performance
    const symbolCount = window.innerWidth > 768 ? 30 : 10;

    for (let i = 0; i < symbolCount; i++) {
      generatedSymbols.push({
        id: i,
        text: symbolChars[Math.floor(Math.random() * symbolChars.length)],
        left: `${Math.random() * 100}vw`,
        delay: `${Math.random() * 15}s`,
        fontSize: `${Math.random() * (window.innerWidth > 768 ? 16 : 12) + (window.innerWidth > 768 ? 16 : 14)}px`,
      });
    }

    setSymbols(generatedSymbols);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" id="symbols">
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className="absolute text-purple-400 animate-fall"
          style={{
            left: symbol.left,
            animationDelay: symbol.delay,
            fontSize: symbol.fontSize,
            whiteSpace: 'nowrap',
          }}
        >
          {symbol.text}
        </div>
      ))}
    </div>
  );
};

const Bitmoji3D = ({ isHovered }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh ref={meshRef}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial color="#8A2BE2" />
      </mesh>
      <OrbitControls enableZoom={false} />
    </>
  );
};

const Section = React.memo(({ children, id, className }) => {
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: window.innerWidth <= 768 ? 0.02 : 0.1, // Lower threshold for mobile
    rootMargin: window.innerWidth <= 768 ? '50px' : '0px' // Earlier trigger on mobile
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: window.innerWidth <= 768 ? 15 : 50 }} // Reduced animation distance on mobile
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: window.innerWidth <= 768 ? 15 : 50 }}
      transition={{ 
        duration: window.innerWidth <= 768 ? 0.3 : 0.8,  // Faster animations on mobile
        ease: 'easeOut',
        delay: window.innerWidth <= 768 ? 0 : 0 
      }}
      id={id}
      className={className}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
});

const App = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device and set state
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Initialize particles.js only for desktop (not mobile)
    
    // Don't initialize particles on mobile devices
    if (isMobile) {
      return;
    }
    
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ['#FF6B9D', '#C44569', '#F8B500', '#00D2FF', '#3742FA']
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 2,
            color: '#FF6B9D'
          }
        },
        opacity: {
          value: isMobile ? 0.9 : 0.7,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            opacity_min: isMobile ? 0.5 : 0.3,
            sync: false
          }
        },
        size: {
          value: 2.5,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 180,
          color: '#FF6B9D',
          opacity: 0.4,
          width: 1.5
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'bounce',
          bounce: true,
          attract: {
            enable: true,
            rotateX: 1500,
            rotateY: 3000
          }
        }
      },
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'bubble'
          },
          ontouchstart: {
            enable: true,
            mode: 'bubble'
          },
          ontouchmove: {
            enable: true,
            mode: 'grab'
          },
          ontouchend: {
            enable: true,
            mode: 'repulse'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 150,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 130,
            size: 8,
            duration: 1,
            opacity: 0.9,
            speed: 5
          },
          repulse: {
            distance: 80,
            duration: 1
          },
          push: {
            particles_nb: 2
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });

    // Enhanced cursor interaction with gravity-like effect
    const canvas = document.querySelector('#particles-js canvas');
    if (canvas) {
      let mouseX = 0;
      let mouseY = 0;
      let isInteracting = false;
      
      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isInteracting = true;
        
        // Apply stronger attraction effect
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
          const pJS = window.pJSDom[0].pJS;
          pJS.interactivity.mouse.pos_x = mouseX;
          pJS.interactivity.mouse.pos_y = mouseY;
          
          // Enhance particle attraction to mouse
          pJS.particles.array.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              const force = (150 - distance) / 150;
              particle.vx += dx * force * 0.003;
              particle.vy += dy * force * 0.003;
              
              // Add some randomness for natural movement
              particle.vx += (Math.random() - 0.5) * 0.1;
              particle.vy += (Math.random() - 0.5) * 0.1;
            }
          });
        }
      };
      
      const handleTouchStart = (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouseX = touch.clientX - rect.left;
        mouseY = touch.clientY - rect.top;
        isInteracting = true;
        
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
          const pJS = window.pJSDom[0].pJS;
          pJS.interactivity.mouse.pos_x = mouseX;
          pJS.interactivity.mouse.pos_y = mouseY;
          
          // Strong initial attraction on touch
          pJS.particles.array.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const force = (120 - distance) / 120;
              particle.vx += dx * force * 0.005;
              particle.vy += dy * force * 0.005;
            }
          });
        }
      };
      
      const handleTouchMove = (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouseX = touch.clientX - rect.left;
        mouseY = touch.clientY - rect.top;
        isInteracting = true;
        
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
          const pJS = window.pJSDom[0].pJS;
          pJS.interactivity.mouse.pos_x = mouseX;
          pJS.interactivity.mouse.pos_y = mouseY;
          
          // Enhanced touch interaction with stronger force
          pJS.particles.array.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              const force = (100 - distance) / 100;
              particle.vx += dx * force * 0.004;
              particle.vy += dy * force * 0.004;
              
              // Add movement trail effect
              particle.vx += (Math.random() - 0.5) * 0.2;
              particle.vy += (Math.random() - 0.5) * 0.2;
            }
          });
        }
      };
      
      const handleTouchEnd = (e) => {
        e.preventDefault();
        isInteracting = false;
        
        // Add dispersal effect when touch ends
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
          const pJS = window.pJSDom[0].pJS;
          
          pJS.particles.array.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
              // Repulse particles when touch ends
              particle.vx -= dx * 0.002;
              particle.vy -= dy * 0.002;
            }
          });
        }
      };
      
      const handleMouseLeave = () => {
        isInteracting = false;
      };
      
      // Add all event listeners
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      // Cleanup event listeners
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);

  return (
    <div className="min-h-screen text-white relative">
      {/* Fixed dark background */}
      <div 
        className="fixed inset-0" 
        style={{ 
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.97) 0%, rgba(0, 0, 0, 0.99) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 0 
        }} 
      />
      
      {/* Particles.js container */}
      <div 
        id="particles-js" 
        className="fixed inset-0" 
        style={{ zIndex: 1 }}
      />

      {/* Content container */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Suspense fallback={<LoadingSpinner height="60px" />}>
          <Navbar />
        </Suspense>
        <main>
          <Section id="home" className="min-h-screen flex items-center justify-center py-16 sm:py-20">
        <div className="container flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: window.innerWidth <= 768 ? 0.8 : 1.2, 
              ease: 'easeOut',
              delay: 0.1 
            }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <TypeAnimation
              sequence={['Hi, I am Aadhithya R 👋', 2000]}
              speed={isMobile ? 80 : 60} // Faster on mobile
              deletionSpeed={isMobile ? 60 : 40}
              repeat={Infinity}
              wrapper="h2"
              cursor
              className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold text-center lg:text-left bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent drop-shadow-xl"
            />
            <TypeAnimation
              sequence={['A Full‑Stack Developer 💻', 2000, 'ML Enthusiast 🤖', 2000]}
              speed={isMobile ? 30 : 10} // Much faster on mobile
              deletionSpeed={isMobile ? 70 : 50}
              repeat={Infinity}
              wrapper="h3"
              cursor
              className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-semibold mt-4 text-center lg:text-left text-purple-300"
            />
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 sm:mt-6 mb-4 sm:mb-6 px-2 sm:px-0">
              Aspiring AI Engineer | Full-Stack Developer | Data Analytics | Machine Learning Enthusiast
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: window.innerWidth <= 768 ? 0.3 : 0.5, 
                duration: window.innerWidth <= 768 ? 0.6 : 0.8,
                ease: 'easeOut'
              }}
              className="flex flex-wrap justify-center lg:justify-start space-x-4 sm:space-x-6"
            >
              {[
                { href: 'https://github.com/aadhithyafullfur', icon: FaGithub, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/aadhithya-r-077a7a320/', icon: FaLinkedin, label: 'LinkedIn' },
                { href: 'https://www.instagram.com/aadhi_.x18/', icon: FaInstagram, label: 'Instagram' },
                { href: 'mailto:aadhithya@example.com', icon: FaEnvelope, label: 'Email' },
                { href: 'Aadhithya R resume .pdf', icon: FaDownload, label: 'Resume', download: true },
              ].map(({ href, icon: Icon, label, download }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={download}
                  className="group relative text-white hover:text-purple-400 transition-all duration-300 ease-out p-2 rounded-lg hover:bg-purple-900/20 hover:scale-105 active:scale-95"
                  title={label}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="absolute bottom-[-2rem] sm:bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform text-xs bg-black bg-opacity-70 text-white px-2 py-1 rounded-md whitespace-nowrap">
                    {label}
                  </span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: window.innerWidth <= 768 ? 0.8 : 1.2, 
              ease: 'easeOut',
              delay: 0.2 
            }}
            className="lg:w-1/2 mb-8 sm:mb-12 lg:mb-0"
          >
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 mx-auto rounded-full border-4 border-purple-600 shadow-xl overflow-hidden bg-black/30 backdrop-blur-md transition-transform duration-300 ${
                isHovered ? 'scale-105 shadow-purple-600/70' : ''
              }`}
              style={{ cursor: 'pointer' }}
            >
              {!isMobile ? (
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <Lottie animationData={loaderData} className="w-24 h-24 sm:w-32 sm:h-32" />
                  </div>
                }>
                  <Canvas>
                    <Bitmoji3D isHovered={isHovered} />
                  </Canvas>
                </Suspense>
              ) : (
                // Static image for mobile instead of 3D canvas
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/bitmoji.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </Section>

  <Section id="about" className="py-24 sm:py-32">
            <About />
          </Section>

          <Section id="certifications" className="py-24 sm:py-32">
            <Certifications />
          </Section>

          <Section id="skills" className="py-24 sm:py-32">
            <Skills />
          </Section>

          <Section id="projects" className="py-24 sm:py-32">
            <Projects />
          </Section>

          <Section id="leetcode" className="py-24 sm:py-32">
            <Leetcode />
          </Section>

          <Section id="contact" className="py-24 sm:py-32">
            <Contact />
          </Section>
        </main>
        <Suspense fallback={<LoadingSpinner height="80px" />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
