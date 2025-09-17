import React, { useState, useEffect } from 'react';
import { Events } from 'react-scroll';
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
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Auto-hide/show navbar logic with smooth transitions
          if (currentScrollY < 50) {
            // At very top of page - always show
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
            // Scrolling down significantly - hide navbar
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY - 10) {
            // Scrolling up with some threshold - show navbar
            setIsVisible(true);
          }
          
          setLastScrollY(currentScrollY);
          
          // Scroll spy logic for pill nav
          const sections = navItems.map(item => {
            const id = item.href.replace('#', '');
            return document.getElementById(id);
          });
          
          const scrollPosition = currentScrollY + 100; // Offset for better accuracy

          sections.forEach((section, index) => {
            if (section) {
              const sectionTop = section.offsetTop;
              const sectionBottom = sectionTop + section.offsetHeight;

              if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                setActiveLink(navItems[index].href);
              }
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Optimized scroll listener with throttling
    window.addEventListener('scroll', handleScroll, { passive: true });
    Events.scrollEvent.register('begin', (to) => setActiveLink(`#${to}`));
    Events.scrollEvent.register('end', (to) => setActiveLink(`#${to}`));

    // Initial check only once
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []); // Empty dependency array ensures this runs only once

  // Handle smooth scrolling to sections
  const handleNavClick = (href) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveLink(href);
    }
  };

  // Convert nav items to include onClick handlers
  const pillNavItems = navItems.map(item => ({
    ...item,
    onClick: () => handleNavClick(item.href)
  }));

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-transparent backdrop-blur-sm"></div>
      
      {/* Centered container for the nav */}
      <div className="relative flex justify-center items-center py-4 px-4">
        {/* Main Navigation */}
        <PillNav
          logo="images/profile.jpg"
          logoAlt="Aadhithya Portfolio"
          items={pillNavItems}
          activeHref={activeLink}
          className="drop-shadow-lg"
          ease="power3.easeOut"
          baseColor="rgba(15, 15, 15, 0.4)"
          pillColor="rgba(30, 30, 30, 0.6)"
          hoveredPillTextColor="#f8fafc"
          pillTextColor="rgba(203, 213, 225, 0.9)"
          initialLoadAnimation={true}
          onMobileMenuClick={() => {
            // Optional: Add any additional mobile menu handling
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
