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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-md transition-colors duration-500 ${
          scrolled ? 'bg-primary-black/90 shadow-lg' : 'bg-primary-black/60'
        }`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-12 relative">
          {/* Profile Image + Portfolio Text */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer select-none"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
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
          </motion.div>

          {/* Mobile Menu Button - More professional design */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className={`lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
              isOpen 
                ? 'bg-purple-500/20 text-purple-400' 
                : 'bg-white/10 text-white hover:bg-white/20'
            } focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm`}
          >
            <div className="w-6 h-6 relative flex flex-col justify-center">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 0 : -8,
                  transformOrigin: 'center'
                }}
                className="absolute w-6 h-0.5 bg-current rounded-full"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="absolute w-6 h-0.5 bg-current rounded-full"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : 8,
                  transformOrigin: 'center'
                }}
                className="absolute w-6 h-0.5 bg-current rounded-full"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </button>

          {/* Professional Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ 
              opacity: isOpen ? 1 : 0, 
              y: isOpen ? 0 : -20,
              scale: isOpen ? 1 : 0.95,
              pointerEvents: isOpen ? 'auto' : 'none'
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mx-4 mt-2 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-purple-900/95 backdrop-blur-xl rounded-2xl border border-purple-500/20 shadow-2xl lg:hidden overflow-hidden"
          >
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 mb-6">
                {navLinks.map(({ id, label }, index) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isOpen ? 1 : 0, 
                      x: isOpen ? 0 : -20 
                    }}
                    transition={{ 
                      delay: isOpen ? index * 0.1 + 0.1 : 0,
                      duration: 0.3
                    }}
                  >
                    <Link
                      to={id}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      onClick={() => {
                        setActiveLink(id);
                        setIsOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                        activeLink === id
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeLink === id 
                            ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                            : 'bg-gray-500'
                        }`} />
                        <span>{label}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Download CV Button - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isOpen ? 1 : 0, 
                  y: isOpen ? 0 : 20 
                }}
                transition={{ delay: isOpen ? 0.4 : 0, duration: 0.3 }}
              >
                <motion.a
                  href="Aadhithya R resume .pdf"
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full block text-center px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-400/20"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Resume</span>
                  </div>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

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
