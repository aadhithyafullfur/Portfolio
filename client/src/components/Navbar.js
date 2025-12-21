import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      setIsMobileMenuOpen(false);
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

  // CRITICAL FIX: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isMobileMenuOpen]);

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-xl border-b border-purple-500/20"></div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex relative justify-center items-center py-3 sm:py-4 px-4 sm:px-6 md:px-8">
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
      <div className="md:hidden relative flex justify-between items-center py-4 px-4 sm:px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
        >
          Aadhithya
        </motion.div>

        {/* Hamburger Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative w-11 h-11 sm:w-12 sm:h-12 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-purple-600/20 border border-purple-500/30 backdrop-blur-sm transition-all duration-300 hover:bg-purple-600/30 hover:border-purple-400/50 active:scale-95"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white rounded-full transition-all duration-300"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white rounded-full transition-all duration-300"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white rounded-full transition-all duration-300"
          />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              /* CRITICAL FIX: Prevent body scroll without breaking layout */
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden fixed top-[60px] sm:top-[68px] left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl z-[9999]"
            style={{
              /* CRITICAL FIX: Ensure menu is always visible with proper positioning */
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full px-5 py-4 rounded-xl text-left font-semibold text-base sm:text-lg transition-all duration-300 touch-manipulation ${
                    activeLink === item.href
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30 scale-[1.02]'
                      : 'bg-purple-600/10 text-purple-200 hover:bg-purple-600/20 border border-purple-500/20 hover:border-purple-400/40 active:scale-98'
                  }`}
                >
                  {item.label}
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
