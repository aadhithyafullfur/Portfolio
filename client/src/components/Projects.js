import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getAnimationSettings, getReducedMotion } from '../utils/performance';
import { gsap } from 'gsap';

const projects = [
  {
    title: 'QuikCart – E-Commerce Platform',
    description:
      'Full-stack e-commerce platform with React.js frontend and Node.js/Express backend. Features JWT authentication for secure user sessions, MongoDB for scalable data storage, Redux for efficient state management, and Stripe integration for payment processing. Implements real-time inventory management system and comprehensive analytics dashboard for tracking user behavior and sales metrics.',
    image: '/images/quikcart.svg',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Redux', 'Stripe'],
    status: 'Completed',
    link: 'https://github.com/aadhithyafullfur/QUIK-CART',
  },
  {
    title: 'Traffic Prediction System',
    description:
      'Machine learning application for urban traffic forecasting using scikit-learn algorithms. React.js frontend with Chart.js for interactive data visualization of traffic patterns. Flask backend processes historical traffic data and integrates weather API for improved prediction accuracy. Achieves 92% prediction accuracy with real-time monitoring dashboards for traffic management and congestion analysis.',
    image: '/images/traffic-prediction.svg',
    tech: ['React.js', 'Flask', 'scikit-learn', 'Chart.js', 'PostgreSQL'],
    status: 'Completed',
    link: 'https://github.com/aadhithyafullfur/TRAFFIC-PREDICTING-SYSTEM',
  },
  {
    title: 'FarmConnect – Agricultural Marketplace',
    description:
      'Agricultural marketplace platform built with MERN stack (MongoDB, Express, React, Node) and React Native for mobile accessibility. Features GPS API integration for real-time logistics tracking, Socket.io for instant notifications, and AWS S3 for secure image storage. Enables direct farmer-to-buyer connections with dynamic pricing engine and automated contract management systems.',
    image: '/images/farmconnect.svg',
    tech: ['MERN', 'React Native', 'GPS API', 'Socket.io', 'AWS S3'],
    status: 'Completed',
    link: 'https://github.com/aadhithyafullfur/FarmConnect',
  },
  {
    title: 'Brain Tumor Detection AI',
    description:
      'Medical imaging AI system using TensorFlow and Keras with CNN architecture achieving 96% detection accuracy. Python backend with OpenCV for advanced image processing and DICOM file handling. Flask REST API serves the model, React.js frontend provides user interface. HIPAA-compliant with detailed diagnostic reporting for radiologists and hospital system integration capabilities.',
    image: '/images/brain-tumor.svg',
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Flask', 'React.js'],
    status: 'Completed',
    link: 'https://github.com/aadhithyafullfur/Brain-Tumor-detector',
  },
];

const getProjectVariants = (isReducedMotion) => ({
  hidden: { 
    opacity: 0, 
    y: isReducedMotion ? 0 : 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: isReducedMotion ? 0.3 : 0.6,
      ease: 'easeOut'
    }
  },
  hover: { 
    scale: isReducedMotion ? 1 : 1.02,
    transition: {
      duration: isReducedMotion ? 0.1 : 0.2,
      ease: 'easeOut'
    }
  },
});

const createParticleElement = (x, y, color = '132, 100, 255') => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: 12 }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, '132, 100, 255')
    );
    particlesInitialized.current = true;
  }, []);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, i) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, i * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
    };

    const handleClick = e => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(132, 100, 255, 0.4) 0%, rgba(132, 100, 255, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="group h-full"
    >
      <div
        ref={cardRef}
        className="flex flex-col h-full bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-purple-500/20 hover:border-purple-500/40 overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10 group/card p-4 sm:p-6 md:p-8 relative active:scale-98"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        
        {/* Header with Title and Status */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 relative z-10">
          <div className="flex-grow">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors leading-tight">
              {project.title}
            </h3>
            {/* Status Badge */}
            <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all ${
              project.status === 'Completed'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                : 'bg-purple-400/20 text-purple-200 border-purple-400/30'
            }`}>
              {project.status}
            </span>
          </div>
          
          {/* GitHub Icon */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 sm:p-2.5 rounded-lg bg-black/40 hover:bg-purple-600/40 transition-all duration-300 border border-purple-500/20 hover:border-purple-400/50 relative z-20 active:scale-90"
            whileHover={{ scale: 1.1 }}
            title="View on GitHub"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.997.107-.776.42-1.305.763-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404 11.5 11.5 0 013.003.404c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.628-5.48 5.922.43.37.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .32.218.694.825.576C20.565 21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </motion.a>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow group-hover:text-gray-200 transition-colors relative z-10">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-4 sm:mb-6 relative z-10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 sm:mb-3">Technologies</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 sm:px-3 py-1 text-xs font-semibold bg-black/40 hover:bg-purple-600/30 text-purple-200 border border-purple-500/20 hover:border-purple-400/50 rounded-md backdrop-blur-sm transition-all duration-300 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* View Project Button */}
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600/80 to-purple-500/80 hover:from-purple-500/90 hover:to-purple-400/90 active:from-purple-700/90 active:to-purple-600/90 text-white font-semibold py-2 sm:py-2.5 px-4 sm:px-5 rounded-lg sm:rounded-xl transition-all duration-300 border border-purple-500/30 hover:border-purple-400/50 backdrop-blur-sm w-full text-xs sm:text-sm relative z-10 active:scale-95"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View Project</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

function Projects() {
  const shouldReduceMotion = useReducedMotion() || getReducedMotion();
  const projectVariants = useMemo(() => getProjectVariants(shouldReduceMotion), [shouldReduceMotion]);
  const gridRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    // Create global spotlight
    if (!gridRef.current) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(132, 100, 255, 0.15) 0%,
        rgba(132, 100, 255, 0.08) 15%,
        rgba(132, 100, 255, 0.04) 25%,
        rgba(132, 100, 255, 0.02) 40%,
        rgba(132, 100, 255, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.projects-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll('.project-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        return;
      }

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        opacity: 0.6,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Update card glow based on proximity
      const spotlightRadius = 300;
      const proximity = spotlightRadius * 0.5;
      const fadeDistance = spotlightRadius * 0.75;

      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        card.style.setProperty('--glow-intensity', glowIntensity.toString());
      });
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      gridRef.current?.querySelectorAll('.project-card').forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, []);

  return (
    <section id="projects" className="w-full py-6 sm:py-8 md:py-10 lg:py-12 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8 projects-section">
      <style>{`
        .project-card {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
          --glow-color: 132, 100, 255;
        }
        
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          rounded-2xl;
          background: radial-gradient(circle at var(--glow-x) var(--glow-y),
            rgba(var(--glow-color), calc(var(--glow-intensity) * 0.3)) 0%,
            rgba(var(--glow-color), calc(var(--glow-intensity) * 0.1)) 40%,
            transparent 70%);
          border-radius: 1rem;
          pointer-events: none;
          opacity: var(--glow-intensity);
          transition: opacity 0.2s ease;
          z-index: -1;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center px-2"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-2 md:mb-3 leading-tight">
            Featured Projects
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Innovative projects showcasing full-stack development and machine learning expertise
          </p>
        </motion.div>

        {/* 2x2 Grid Layout with MagicBento ParticleCard Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8" ref={gridRef}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;

