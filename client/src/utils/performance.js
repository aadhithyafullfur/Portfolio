// Performance utilities for optimizing animations and effects

// Check if device is low-end based on memory and CPU cores
export const isLowEndDevice = () => {
  if (typeof navigator === 'undefined') return false;
  
  const memory = navigator?.deviceMemory || 4; // Default to 4GB if not available
  const cores = navigator?.hardwareConcurrency || 4; // Default to 4 cores if not available
  
  return memory <= 4 || cores <= 2;
};

// Reduce animation complexity for low-end devices
export const getReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isLowEndDevice();
};

// Optimized animation settings based on device capability
export const getAnimationSettings = (defaultSettings) => {
  const shouldReduceMotion = getReducedMotion();
  
  if (shouldReduceMotion) {
    return {
      ...defaultSettings,
      duration: defaultSettings.duration * 0.5,
      staggerChildren: (defaultSettings.staggerChildren || 0) * 0.5,
      delayChildren: (defaultSettings.delayChildren || 0) * 0.5
    };
  }
  
  return defaultSettings;
};

// Debounce function for performance optimization
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// RAF (Request Animation Frame) throttle for smooth animations
export const rafThrottle = (func) => {
  let ticking = false;
  return (...args) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        func(...args);
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Optimize number of particles based on device capability
export const getOptimizedParticleCount = (defaultCount = 100) => {
  const shouldReduce = getReducedMotion();
  return shouldReduce ? Math.floor(defaultCount * 0.3) : defaultCount;
};

// Get optimized image size based on device
export const getOptimizedImageSize = (defaultSize) => {
  const shouldReduce = getReducedMotion();
  return shouldReduce ? Math.floor(defaultSize * 0.75) : defaultSize;
};

// Optimize animation frame rate for smooth performance
export const getOptimizedFrameRate = () => {
  const shouldReduce = getReducedMotion();
  return shouldReduce ? 30 : 60;
};
