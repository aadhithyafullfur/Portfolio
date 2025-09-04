import React, { useEffect, Suspense, useState, useRef } from 'react';
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
import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';

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

const particlesInit = async (main) => {
  await loadFull(main);
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
      <Particles
        id={`tsparticles-${id}`}
        init={particlesInit}
        options={{
          background: { color: { value: '#000' } },
          particles: {
            number: { 
              value: window.innerWidth > 768 ? 80 : 40, 
              density: { enable: true, value_area: 800 } 
            },
            color: { value: '#8A2BE2' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { 
              value: window.innerWidth > 768 ? 3 : 2, 
              random: { enable: true, minimumValue: 1 } 
            },
            move: { 
              enable: true, 
              speed: window.innerWidth > 768 ? 2 : 1, 
              direction: 'none', 
              random: true 
            },
          },
          interactivity: {
            events: { 
              onHover: { enable: window.innerWidth > 768, mode: 'repulse' } 
            },
            modes: { 
              repulse: { 
                distance: window.innerWidth > 768 ? 100 : 50, 
                duration: 0.4 
              } 
            },
          },
        }}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
      <Navbar />
      <SymbolsBackground />

      <Section id="home" className="min-h-screen flex items-center justify-center py-16 sm:py-20 relative z-10">
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

      <Section id="about" className="py-24 sm:py-32 bg-gray-800">
        <About />
      </Section>
      <Section id="certifications" className="py-24 sm:py-32 bg-gray-900">
        <Certifications />
      </Section>
      <Section id="skills" className="py-24 sm:py-32 bg-gray-800">
        <Skills />
      </Section>
      <Section id="projects" className="py-24 sm:py-32 bg-gray-900">
        <Projects />
      </Section>
      <Section id="leetcode" className="py-24 sm:py-32 bg-gray-800">
        <Leetcode />
      </Section>
      <Section id="contact" className="py-24 sm:py-32 bg-gray-900">
        <Contact />
      </Section>
      <Footer />
    </div>
  );
}

export default App;
