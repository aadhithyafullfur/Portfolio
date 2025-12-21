import React, { Suspense, useState, useRef, useEffect, useCallback, lazy, memo } from 'react';
import Navbar from './components/Navbar.js';
import SplitText from './components/SplitText.js';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaDownload } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';

// Lazy loaded components
const About = lazy(() => import('./components/About.js'));
const Certifications = lazy(() => import('./components/Certifications.js'));
const Skills = lazy(() => import('./components/Skills.js'));
const Projects = lazy(() => import('./components/Projects.js'));
const Contact = lazy(() => import('./components/Contact.js'));
const Footer = lazy(() => import('./components/Footer.js'));
const Leetcode = lazy(() => import('./components/Leetcode.js'));

const Bitmoji3D = ({ isHovered }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    if (isHovered) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    } else {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <mesh ref={meshRef}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial color="#A855F7" />
      </mesh>
    </>
  );
};

const Bitmoji3DCanvas = memo(({ isHovered }) => (
  <Canvas
    gl={{
      outputColorSpace: 'srgb',
      antialias: true,
      alpha: true,
    }}
  >
    <Bitmoji3D isHovered={isHovered} />
  </Canvas>
));

const Section = ({ children, id, className }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

const SectionFallback = () => (
  <div className="py-24 text-center text-purple-400">Loading section...</div>
);

const App = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Particles.js removed - using simple background
  }, []);

  return (
    <div className="min-h-screen text-white bg-black relative overflow-x-hidden" style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      <div className="relative z-10" style={{ backgroundColor: 'transparent' }}>
        <Navbar />

        <main>
        {/* HOME SECTION */}
        <Section
          id="home"
          className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8"
        >
          {/* ✅ FULLY RESPONSIVE HERO SECTION */}
          <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-20">
            
            {/* LEFT TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6"
            >
              <SplitText
                text="Hi, I am Aadhithya R"
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-tight"
                tag="h1"
                splitType="chars"
                delay={80}
              />

              <TypeAnimation
                sequence={[
                  'A Full-Stack Developer 💻',
                  2000,
                  'ML Enthusiast 🤖',
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
                wrapper="h2"
                className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-purple-400 font-semibold"
              />

              <p className="mt-4 sm:mt-5 md:mt-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Passionate about building scalable web applications and AI-powered solutions.
              </p>

              <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-7 md:mt-8 flex-wrap">
                <a href="https://github.com/aadhithyafullfur" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-3.5 md:p-4 bg-black/40 hover:bg-purple-600/40 border border-purple-500/20 hover:border-purple-400/50 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 active:scale-95" aria-label="GitHub Profile">
                  <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-300" />
                </a>
                <a href="https://www.linkedin.com/in/aadhithya-r-077a7a320/" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-3.5 md:p-4 bg-black/40 hover:bg-purple-600/40 border border-purple-500/20 hover:border-purple-400/50 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 active:scale-95" aria-label="LinkedIn Profile">
                  <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-300" />
                </a>
                <a href="https://www.instagram.com/aadhi_.x18/" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-3.5 md:p-4 bg-black/40 hover:bg-purple-600/40 border border-purple-500/20 hover:border-purple-400/50 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 active:scale-95" aria-label="Instagram Profile">
                  <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-300" />
                </a>
                <a href="mailto:aadhithya@example.com" className="p-3 sm:p-3.5 md:p-4 bg-black/40 hover:bg-purple-600/40 border border-purple-500/20 hover:border-purple-400/50 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 active:scale-95" aria-label="Email Contact">
                  <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-300" />
                </a>
                <a href="Aadhithya R resume .pdf" download className="p-3 sm:p-3.5 md:p-4 bg-gradient-to-r from-purple-600/80 to-purple-500/80 hover:from-purple-500/90 hover:to-purple-400/90 border border-purple-500/30 hover:border-purple-400/50 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 active:scale-95" aria-label="Download Resume">
                  <FaDownload className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </a>
              </div>
            </motion.div>

            {/* RIGHT 3D BITMOJI - RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full border-2 sm:border-3 md:border-4 border-purple-600 shadow-xl sm:shadow-2xl overflow-hidden hover:shadow-2xl hover:border-purple-500 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Bitmoji3DCanvas isHovered={isHovered} />
              </div>
            </motion.div>

          </div>
        </Section>

        {/* OTHER SECTIONS */}
        <Section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
        </Section>

        <Section id="certifications" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <Suspense fallback={<SectionFallback />}>
            <Certifications />
          </Suspense>
        </Section>

        <Section id="skills" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </Section>

        <Section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
        </Section>

        <Section id="leetcode" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <Suspense fallback={<SectionFallback />}>
            <Leetcode />
          </Suspense>
        </Section>

        <Section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </Section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </div>
    </div>
  );
};

export default App;
