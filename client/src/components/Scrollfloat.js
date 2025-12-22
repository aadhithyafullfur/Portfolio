import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="inline-block word" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Performance checks (only for reduced motion, not mobile)
    const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use simpler animation ONLY for reduced motion preference
    if (prefersReducedMotion) {
      // Simple fade-in for accessibility
      gsap.fromTo(el, 
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=50px',
            toggleActions: 'play none none none'
          }
        }
      );
      return;
    }

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const charElements = el.querySelectorAll('.inline-block');

    // Use optimized animation for all devices (mobile-friendly)
    // Limit character animations for very long text (performance)
    if (charElements.length > 50 || isLowEnd) {
      // Simpler animation for long text or low-end devices
      gsap.fromTo(el, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: animationDuration * 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            toggleActions: 'play none none none'
          }
        }
      );
      return;
    }

    // Mobile-optimized character animation (works on all devices)
    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 50,  // Lighter transform for mobile
        scaleY: 1.2,   // Subtle scale for mobile
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration * 0.7, // Faster for mobile
        ease: 'power2.out',
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        stagger: Math.min(stagger, 0.015), // Tighter stagger
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          toggleActions: 'play none none none', // No scrub on mobile
          once: true // Only animate once for better performance
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`my-5 overflow-hidden ${containerClassName}`}>
      <span className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
