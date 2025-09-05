import React, { useState, useEffect } from 'react';
import { Link, Events } from 'react-scroll';
import { motion } from 'framer-motion';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Scroll spy logic
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'bg-black/80 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">A</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
            </div>
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-xl lg:text-2xl font-bold text-white hover:text-purple-400 transition-colors"
            >
              Aadhithya R
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(({ id, label }) => (
              <motion.div key={id} className="relative">
                <Link
                  to={id}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onClick={() => setActiveLink(id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeLink === id
                      ? 'text-white bg-purple-600/20 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
                {activeLink === id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full"
                    style={{ transform: 'translateX(-50%)' }}
                  />
                )}
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.a
              href="/Aadhithya R resume .pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-6 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 ${
              isOpen 
                ? 'bg-purple-600/20 border border-purple-400/30' 
                : 'bg-white/10 hover:bg-white/15'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="flex flex-col justify-center items-center w-6 h-6">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 6 : 0,
                }}
                className={`block h-0.5 w-6 transform transition-all duration-300 ease-in-out ${
                  isOpen ? 'bg-purple-300' : 'bg-white'
                }`}
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? 10 : 0,
                }}
                className="block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out mt-1.5"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -6 : 0,
                }}
                className={`block h-0.5 w-6 transform transition-all duration-300 ease-in-out mt-1.5 ${
                  isOpen ? 'bg-purple-300' : 'bg-white'
                }`}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 border-t border-white/10">
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
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  activeLink === id
                    ? 'text-white bg-purple-600/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            ))}
            
            <motion.a
              href="/Aadhithya R resume .pdf"
              download
              whileTap={{ scale: 0.95 }}
              className="block mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center font-semibold rounded-lg shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Download Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
  
