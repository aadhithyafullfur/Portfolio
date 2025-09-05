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

    for (let i = 0; i < 30; i++) {
      generatedSymbols.push({
        id: i,
        text: symbolChars[Math.floor(Math.random() * symbolChars.length)],
        left: `${Math.random() * 100}vw`,
        delay: `${Math.random() * 15}s`,
        fontSize: `${Math.random() * 16 + 16}px`,
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      id={id}
      className={className}
    >
      <Particles
        id={`tsparticles-${id}`}
        init={particlesInit}
        options={{
          background: { color: { value: '#000' } },
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#8A2BE2' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            move: { enable: true, speed: 2, direction: 'none', random: true },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' } },
            modes: { repulse: { distance: 100, duration: 0.4 } },
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

      <Section id="home" className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="container flex flex-col-reverse lg:flex-row items-center justify-between px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <TypeAnimation
              sequence={['Hi, I am Aadhithya R 👋', 2000]}
              speed={60}
              deletionSpeed={40}
              repeat={Infinity}
              wrapper="h2"
              cursor
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-center sm:text-left bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent drop-shadow-xl"
            />
            <TypeAnimation
              sequence={['A Full‑Stack Developer 💻', 2000, 'ML Enthusiast 🤖', 2000]}
              speed={10}
              deletionSpeed={50}
              repeat={Infinity}
              wrapper="h3"
              cursor
              className="text-2xl sm:text-4xl md:text-5xl font-semibold mt-4 text-center sm:text-left text-purple-300"
            />
            <p className="text-lg md:text-xl text-gray-300 mt-6 mb-6">
              I design and develop modern, responsive web applications and explore AI to build intelligent solutions.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex justify-center lg:justify-start space-x-6"
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
                  className="group relative text-white hover:text-purple-400 transition duration-300"
                  title={label}
                >
                  <Icon className="w-6 h-6" />
                  <span className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform text-xs bg-black bg-opacity-70 text-white px-2 py-1 rounded-md">
                    {label}
                  </span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`w-72 h-72 mx-auto rounded-full border-4 border-purple-600 shadow-xl overflow-hidden bg-black/30 backdrop-blur-md transition-transform duration-300 ${
                isHovered ? 'scale-105 shadow-purple-600/70' : ''
              }`}
              style={{ cursor: 'pointer' }}
            >
              <Suspense fallback={<Lottie animationData={loaderData} style={{ width: 192, height: 192 }} />}>
                <Canvas>
                  <Bitmoji3D isHovered={isHovered} />
                </Canvas>
              </Suspense>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section id="about" className="py-20 bg-gray-800">
        <About />
      </Section>
      <Section id="certifications" className="py-20 bg-gray-900">
        <Certifications />
      </Section>
      <Section id="skills" className="py-20 bg-gray-800">
        <Skills />
      </Section>
      <Section id="projects" className="py-20 bg-gray-900">
        <Projects />
      </Section>
      <Section id="leetcode" className="py-20 bg-gray-800">
        <Leetcode />
      </Section>
      <Section id="contact" className="py-20 bg-gray-800">
        <Contact />
      </Section>
      <Footer />
    </div>
  );
}

export default App;
