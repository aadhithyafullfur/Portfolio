import React, { useState, useEffect } from 'react';
import { Link, Events } from 'react-scroll';
import { motion } from 'framer-motion';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'contact', label: 'Contact' },
];

const underlineVariants = {
  hidden: { width: 0 },
  visible: {
    width: '100%',
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Scroll spy logic
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100; // Offset for better accuracy

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveLink(navLinks[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    Events.scrollEvent.register('begin', (to) => setActiveLink(to));
    Events.scrollEvent.register('end', (to) => setActiveLink(to));

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animatedGradientText = {
    background: 'linear-gradient(270deg, #7b2ff7, #f107a3, #a855f7, #7b2ff7)',
    backgroundSize: '600% 600%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'gradientAnimation 4s ease infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes gradientAnimation {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>

      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-md transition-colors duration-500 ${
          scrolled ? 'bg-primary-black/90 shadow-lg' : 'bg-primary-black/60'
        }`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-12">
          {/* Profile Image + Portfolio Text */}
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <img
              src="images/profile.jpg" // Make sure the image is in the public folder
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
            />
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-3xl font-extrabold"
              aria-label="Go to Home"
              style={{
                background: 'linear-gradient(90deg, #7b2ff7, #f107a3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Portfolio
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="lg:hidden text-text-light focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path
                initial={false}
                animate={{ d: isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16' }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: 'auto',
                transition: { duration: 0.3, ease: 'easeInOut' }
              }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-gray-800 lg:hidden"
              style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)' }}
            >
              <div className="flex flex-col py-6 px-6 space-y-4">
                {navLinks.map(({ id, label }) => (
                  <Link
                    key={id}
                    to={id}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    onClick={() => {
                      setActiveLink(id);
                      setIsOpen(false);
                    }}
                    className={`text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 text-center ${
                      activeLink === id 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <motion.a
                  href="Aadhithya R resume .pdf"
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-lg text-center"
                >
                  Download CV
                </motion.a>
              </div>
            </motion.div>
          )}

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ id, label }) => (
              <div key={id} className="cursor-pointer relative flex flex-col items-center">
                <Link
                  to={id}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="text-lg font-medium transition-colors duration-300 select-none"
                  onClick={() => {
                    setActiveLink(id);
                    setIsOpen(false);
                  }}
                  style={activeLink === id ? animatedGradientText : { color: '#ddd' }}
                >
                  {label}
                </Link>

                {activeLink === id && (
                  <motion.div
                    className="h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-full mt-1"
                    variants={underlineVariants}
                    initial="hidden"
                    animate="visible"
                  />
                )}
              </div>
            ))}

            {/* Download CV Button */}
            <motion.a
              href="Aadhithya R resume .pdf"
              download
              whileHover={{
                scale: 1.1,
                boxShadow: '0px 0px 15px rgba(138,43,226,0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-md transition-all duration-300"
            >
              Download CV
            </motion.a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
