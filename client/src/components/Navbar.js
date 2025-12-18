import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PillNav from './Pill Nav';
import '../styles/mobile-professional.css';

const navItems = [
  { href: '#home', label: 'Home', icon: '🏠' },
  { href: '#about', label: 'About', icon: '👤' },
  { href: '#skills', label: 'Skills', icon: '⚡' },
  { href: '#projects', label: 'Projects', icon: '💼' },
  { href: '#leetcode', label: 'Stats', icon: '📊' },
  { href: '#contact', label: 'Contact', icon: '📧' },
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

      {/* Mobile Navigation Header - Professional Design */}
      <div className="md:hidden relative flex justify-between items-center py-2 px-4">
        {/* Logo - Smooth Animation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent whitespace-nowrap"
        >
          Aadhithya
        </motion.div>

        {/* Hamburger Menu Button - Touch Optimized */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="hamburger-menu ml-auto"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
            className="hamburger-line"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="hamburger-line"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
            className="hamburger-line"
          />
        </motion.button>
      </div>

      {/* Mobile Menu with Smooth Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="mobile-menu md:hidden"
          >
            <div className="px-0 py-3 space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.3,
                    delay: isMobileMenuOpen ? index * 0.05 : 0,
                    ease: 'easeOut'
                  }}
                  onClick={() => handleNavClick(item.href)}
                  className={`mobile-menu-item ${
                    activeLink === item.href ? 'active' : ''
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
