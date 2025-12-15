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
  <Canvas>
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
    // Wrap particles initialization in try-catch to prevent breaking the app
    // if the library has issues
    try {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 1000
              }
            },
            color: {
              value: '#A855F7'
            },
            shape: {
              type: 'circle'
            },
            opacity: {
              value: 0.3
            },
            size: {
              value: 2
            },
            line_linked: {
              enable: false
            },
            move: {
              enable: true,
              speed: 0.3
            }
          },
          interactivity: {
            detect_on: 'window',
            events: {
              onhover: {
                enable: false
              },
              onclick: {
                enable: false
              },
              resize: false
            }
          },
          retina_detect: false
        });
      }
    } catch (error) {
      // If particles.js fails, silently continue
      console.log('Particles.js initialization skipped');
    }
  }, []);

  return (
    <div className="min-h-screen text-white bg-black relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-transparent via-transparent to-purple-900/10 pointer-events-none"></div>
      <div id="particles-js" className="fixed inset-0 z-0"></div>
      <div className="relative z-10">
        <Navbar />

        <main>
        {/* HOME SECTION */}
        <Section
          id="home"
          className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20"
        >
          {/* ✅ MOBILE OPTIMIZED HERO SECTION */}
          <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-20 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8">
            
            {/* LEFT TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="lg:w-1/2 text-center lg:text-left w-full"
            >
              <SplitText
                text="Hi, I am Aadhithya R"
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                tag="h2"
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
                wrapper="h3"
                className="text-base xs:text-lg sm:text-2xl md:text-3xl mt-3 sm:mt-4 text-purple-400"
              />

              <p className="mt-4 sm:mt-6 text-sm xs:text-base text-gray-300 leading-relaxed">
                Passionate about building scalable web applications and AI-powered solutions.
              </p>

              <div className="flex justify-center lg:justify-start gap-4 sm:gap-6 mt-5 sm:mt-6 flex-wrap">
                <a href="https://github.com/aadhithyafullfur" className="hover:text-purple-400 transition-colors"><FaGithub size={18} className="sm:w-6 sm:h-6" /></a>
                <a href="https://www.linkedin.com/in/aadhithya-r-077a7a320/" className="hover:text-purple-400 transition-colors"><FaLinkedin size={18} className="sm:w-6 sm:h-6" /></a>
                <a href="https://www.instagram.com/aadhi_.x18/" className="hover:text-purple-400 transition-colors"><FaInstagram size={18} className="sm:w-6 sm:h-6" /></a>
                <a href="mailto:aadhithya@example.com" className="hover:text-purple-400 transition-colors"><FaEnvelope size={18} className="sm:w-6 sm:h-6" /></a>
                <a href="Aadhithya R resume .pdf" download className="hover:text-purple-400 transition-colors"><FaDownload size={18} className="sm:w-6 sm:h-6" /></a>
              </div>
            </motion.div>

            {/* RIGHT 3D BITMOJI */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="lg:w-1/2 flex justify-center w-full mt-4 sm:mt-6 md:mt-8 lg:mt-0"
            >
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full border-3 sm:border-4 border-purple-600 shadow-lg sm:shadow-xl overflow-hidden hover:shadow-xl sm:hover:shadow-2xl hover:border-purple-500 transition-all duration-300"
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
