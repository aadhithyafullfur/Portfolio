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

    // Performance checks
    const isMobile = window.innerWidth <= 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use simpler animation for performance-constrained devices
    if (isMobile || isLowEnd || prefersReducedMotion) {
      // Simple fade-in without complex transforms
      gsap.fromTo(el, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=100px',
            toggleActions: 'play none none reverse'
          }
        }
      );
      return;
    }

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const charElements = el.querySelectorAll('.inline-block');

    // Limit character animations for very long text (performance)
    if (charElements.length > 50) {
      // Simple fade-in for long text
      gsap.fromTo(el, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: animationDuration * 0.5,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            toggleActions: 'play none none reverse'
          }
        }
      );
      return;
    }

    // Full character animation for desktop and short text
    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 80, // Reduced from 120
        scaleY: 1.5,  // Reduced from 2.3
        scaleX: 0.9,  // Reduced from 0.7
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration * 0.8, // Slightly faster
        ease: 'power2.out', // Simpler easing
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: Math.min(stagger, 0.02), // Limit stagger delay
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: 1 // Smoother scrub
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
