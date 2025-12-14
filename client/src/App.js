import React, { Suspense, useState, useRef, useEffect, useCallback, lazy } from 'react';
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
    // Initialize particles.js
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 1500
            }
          },
          color: {
            value: '#A855F7'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#A855F7ff'
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.2,
              sync: false
            }
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: false,
              speed: 0,
              size_min: 0,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#A855F7',
            opacity: 0.3,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.5,
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
    }
  }, []);

  return (
    <div className="min-h-screen text-white bg-black relative">
      <div id="particles-js" className="fixed inset-0 z-0"></div>
      <div className="relative z-10">
        <Navbar />

        <main>
        {/* HOME SECTION */}
        <Section
          id="home"
          className="min-h-screen flex items-center justify-center py-20"
        >
          {/* ✅ MOBILE OPTIMIZED HERO SECTION */}
          <div className="container flex flex-col-reverse lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12 lg:gap-20 px-3 xs:px-4 sm:px-6 lg:px-8">
            
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
              className="lg:w-1/2 flex justify-center w-full mt-6 sm:mt-8 lg:mt-0"
            >
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full border-4 border-purple-600 shadow-xl overflow-hidden hover:shadow-2xl hover:border-purple-500 transition-all duration-300"
              >
                <Canvas>
                  <Bitmoji3D isHovered={isHovered} />
                </Canvas>
              </div>
            </motion.div>

          </div>
        </Section>

        {/* OTHER SECTIONS */}
        <Section id="about" className="py-24">
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
        </Section>

        <Section id="certifications" className="py-24">
          <Suspense fallback={<SectionFallback />}>
            <Certifications />
          </Suspense>
        </Section>

        <Section id="skills" className="py-24">
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </Section>

        <Section id="projects" className="py-24">
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
        </Section>

        <Section id="leetcode" className="py-24">
          <Suspense fallback={<SectionFallback />}>
            <Leetcode />
          </Suspense>
        </Section>

        <Section id="contact" className="py-24">
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
