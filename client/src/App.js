import React, { Suspense, useState, useRef, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.js';
import About from './components/About.js';
import Certifications from './components/Certifications.js';
import Skills from './components/Skills.js';
import Projects from './components/Projects.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';
import Leetcode from './components/Leetcode.js';
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

const Section = ({ children, id, className }) => {
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: window.innerWidth <= 768 ? 0.05 : 0.1 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: window.innerWidth <= 768 ? 30 : 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: window.innerWidth <= 768 ? 30 : 50 }}
      transition={{ 
        duration: window.innerWidth <= 768 ? 0.6 : 0.8, 
        ease: 'easeOut',
        delay: window.innerWidth <= 768 ? 0.1 : 0 
      }}
      id={id}
      className={className}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const App = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Initialize particles.js
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: window.innerWidth > 768 ? 60 : 30,
          density: {
            enable: false
          }
        },
        color: {
          value: ['#8A2BE2', '#9370DB', '#8B008B']
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.3,
          random: false,
          anim: {
            enable: false
          }
        },
        size: {
          value: 2,
          random: true,
          anim: {
            enable: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#8A2BE2',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'repulse'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.3
            }
          },
          repulse: {
            distance: 100,
            duration: 0.4
          }
        }
      },
      retina_detect: false
    });
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
        <Navbar />
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
              speed={60}
              deletionSpeed={40}
              repeat={Infinity}
              wrapper="h2"
              cursor
              className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold text-center lg:text-left bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent drop-shadow-xl"
            />
            <TypeAnimation
              sequence={['A Full‑Stack Developer 💻', 2000, 'ML Enthusiast 🤖', 2000]}
              speed={10}
              deletionSpeed={50}
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
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <Lottie animationData={loaderData} className="w-24 h-24 sm:w-32 sm:h-32" />
                </div>
              }>
                <Canvas>
                  <Bitmoji3D isHovered={isHovered} />
                </Canvas>
              </Suspense>
            </div>
          </motion.div>
        </div>
      </Section>

  <Section id="about" className="py-24 sm:py-32">
        <About />
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
        <Footer />
      </div>
    </div>
  );
};

export default App;
