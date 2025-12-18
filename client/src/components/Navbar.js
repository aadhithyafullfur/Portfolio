import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import PillNav from './Pill Nav';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#leetcode', label: 'Stats' },
  { href: '#contact', label: 'Contact' },
];

function Navbar() {
  const [activeLink, setActiveLink] = useState('#home');
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tickingRef = useRef(false);
  const lastScrollRef = useRef(0);
  const activeLinkRef = useRef('#home');
  const sectionsCacheRef = useRef([]);

  // Handle smooth scrolling to sections
  const handleNavClick = useCallback((href) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveLink(href);
      activeLinkRef.current = href;
      setIsMobileMenuOpen(false); // Close menu after clicking
    }
  }, []);

  // Memoized pill nav items with click handlers
  const pillNavItems = React.useMemo(
    () => navItems.map(item => ({
      ...item,
      onClick: () => handleNavClick(item.href)
    })),
    [handleNavClick]
  );

  // Optimized scroll handler with reduced state updates
  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    
    tickingRef.current = true;
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollRef.current;
      
      // Navbar visibility logic - always keep visible for all sections
      setIsVisible(true);
      
      lastScrollRef.current = currentScrollY;
      
      // Cache sections on first run
      if (sectionsCacheRef.current.length === 0) {
        sectionsCacheRef.current = navItems.map(item => {
          const id = item.href.replace('#', '');
          return document.getElementById(id);
        });
      }
      
      // Scroll spy logic with viewport offset for better accuracy
      const scrollPosition = currentScrollY + window.innerHeight / 3;
      let foundActive = false;

      for (let i = 0; i < sectionsCacheRef.current.length; i++) {
        const section = sectionsCacheRef.current[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const newActive = navItems[i].href;
            if (activeLinkRef.current !== newActive) {
              setActiveLink(newActive);
              activeLinkRef.current = newActive;
            }
            foundActive = true;
            break;
          }
        }
      }

      // If no section found, set to first visible
      if (!foundActive && currentScrollY < 100) {
        const newActive = '#home';
        if (activeLinkRef.current !== newActive) {
          setActiveLink(newActive);
          activeLinkRef.current = newActive;
        }
      }
      
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    // Initial scroll check
    handleScroll();
    
    // Attach scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ease-out"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(0)',
        opacity: 1,
        pointerEvents: 'auto'
      }}
    >
      {/* Professional backdrop with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent backdrop-blur-lg border-b border-purple-500/20"></div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex relative justify-center items-center py-2 sm:py-3 md:py-4 px-2 xs:px-3 sm:px-4 md:px-6">
        {/* Main Navigation */}
        <PillNav
          logo="images/profile.jpg"
          logoAlt="Aadhithya Portfolio"
          items={pillNavItems}
          activeHref={activeLink}
          className="drop-shadow-lg"
          ease="power2.inOut"
          baseColor="rgba(10, 10, 10, 0.98)"
          pillColor="rgba(147, 51, 234, 0.85)"
          hoveredPillTextColor="#ffffff"
          pillTextColor="rgba(255, 255, 255, 0.95)"
          initialLoadAnimation={false}
          onMobileMenuClick={() => {
            // Mobile menu handling
          }}
        />
      </div>

      {/* Mobile Navigation Header */}
      <div className="md:hidden relative flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
        >
          Aadhithya
        </motion.div>

        {/* Hamburger Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center space-y-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300 border border-purple-500/20 hover:border-purple-400/50"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white transition-all duration-300"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white transition-all duration-300"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white transition-all duration-300"
          />
        </motion.button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] md:hidden cursor-pointer"
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden bg-black/60 backdrop-blur-sm border-t border-purple-500/20 z-[9999] relative"
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={
                isMobileMenuOpen
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -20 }
              }
              transition={{
                delay: isMobileMenuOpen ? index * 0.08 : 0,
                duration: 0.4,
              }}
              onClick={() => handleNavClick(item.href)}
              className={`w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeLink === item.href
                  ? 'bg-purple-600/80 text-white shadow-lg shadow-purple-500/20 border border-purple-400/50'
                  : 'bg-purple-500/10 text-purple-200 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-400/50'
              }`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;
