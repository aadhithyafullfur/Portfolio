/**
 * Particle Configuration Presets
 * Use these for quick configuration changes
 */

const PARTICLE_PRESETS = {
  // Light preset - fewer particles, less intensive
  light: {
    mobile: { count: 15, speed: 0.15, connections: false },
    tablet: { count: 30, speed: 0.3, connections: false },
    desktop: { count: 50, speed: 0.4, connections: true }
  },

  // Medium preset - balanced performance (DEFAULT)
  medium: {
    mobile: { count: 20, speed: 0.2, connections: false },
    tablet: { count: 40, speed: 0.5, connections: true },
    desktop: { count: 80, speed: 0.5, connections: true }
  },

  // Heavy preset - more particles, more intense
  heavy: {
    mobile: { count: 30, speed: 0.25, connections: false },
    tablet: { count: 60, speed: 0.6, connections: true },
    desktop: { count: 150, speed: 0.6, connections: true }
  },

  // Performance preset - optimized for older devices
  performance: {
    mobile: { count: 10, speed: 0.15, connections: false },
    tablet: { count: 20, speed: 0.25, connections: false },
    desktop: { count: 40, speed: 0.35, connections: false }
  }
};

/**
 * Get recommended preset based on device capability
 */
const getRecommendedPreset = () => {
  if (!navigator.deviceMemory) return PARTICLE_PRESETS.medium;

  // Use navigator.deviceMemory if available
  const memory = navigator.deviceMemory;
  if (memory <= 4) return PARTICLE_PRESETS.light;
  if (memory <= 8) return PARTICLE_PRESETS.medium;
  return PARTICLE_PRESETS.heavy;
};

/**
 * Detect if device has reduced motion preference
 */
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Detect if device is in low power mode
 */
const isLowPowerMode = () => {
  if (!navigator.getBattery) return false;
  return navigator.getBattery().then(battery => battery.level < 0.2);
};

/**
 * Get network information (if available)
 */
const getNetworkType = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return 'unknown';
  return connection.effectiveType; // '4g', '3g', '2g', 'slow-2g'
};

/**
 * Determine optimal preset based on multiple factors
 */
const getOptimalPreset = () => {
  const reducedMotion = prefersReducedMotion();
  if (reducedMotion) return PARTICLE_PRESETS.light;

  return getRecommendedPreset();
};

export {
  PARTICLE_PRESETS,
  getRecommendedPreset,
  prefersReducedMotion,
  isLowPowerMode,
  getNetworkType,
  getOptimalPreset
};
