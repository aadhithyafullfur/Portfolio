// Performance monitoring utility for mobile optimization
export const performanceMonitor = {
  // Check if device is mobile
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  },

  // Measure component render time
  measureRenderTime: (componentName, renderFunction) => {
    const start = performance.now();
    const result = renderFunction();
    const end = performance.now();
    
    if (performanceMonitor.isMobile()) {
      console.log(`[Mobile] ${componentName} render time: ${end - start}ms`);
    }
    
    return result;
  },

  // Monitor memory usage (if available)
  logMemoryUsage: () => {
    if (performance.memory) {
      console.log('Memory usage:', {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      });
    }
  },

  // Debounce function for scroll events
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Optimize animations based on device capabilities
  getOptimizedAnimationDuration: (defaultDuration) => {
    if (performanceMonitor.prefersReducedMotion()) return 0.01;
    if (performanceMonitor.isMobile()) return Math.min(defaultDuration * 0.5, 0.3);
    return defaultDuration;
  }
};

export default performanceMonitor;
