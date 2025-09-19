import React, { useEffect, useRef, useCallback, useMemo } from 'react';

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay, variant = 'default') {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.variant = variant;
    this.speed = this.getRandomValue(0.1, 0.8) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.25 + 0.1;
    this.minSize = variant === 'glow' ? 0.3 : 0.2;
    this.maxSizeInteger = variant === 'enhanced' ? 1.5 : 1.2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = Math.min(delay, 120);
    this.counter = 0;
    this.counterStep = Math.random() * 3 + 1;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
    this.lastUpdate = 0;
    this.glowIntensity = 0;
    this.pulsePhase = Math.random() * Math.PI * 2;
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    if (this.size < 0.1) return;
    
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    const x = Math.round(this.x + centerOffset);
    const y = Math.round(this.y + centerOffset);
    const size = Math.ceil(this.size);
    
    // Enhanced rendering based on variant
    if (this.variant === 'glow') {
      // Add glow effect
      this.ctx.shadowColor = this.color;
      this.ctx.shadowBlur = this.glowIntensity * 8;
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(x, y, size, size);
      this.ctx.shadowBlur = 0;
    } else if (this.variant === 'enhanced') {
      // Add pulse effect
      const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
      this.ctx.globalAlpha = pulse;
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(x, y, size, size);
      this.ctx.globalAlpha = 1;
    } else {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(x, y, size, size);
    }
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    
    // Update effects based on variant
    if (this.variant === 'glow') {
      this.glowIntensity = Math.min(this.glowIntensity + 0.02, 1);
    }
    if (this.variant === 'enhanced') {
      this.pulsePhase += 0.1;
    }
    
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

function getEffectiveSpeed(value, reducedMotion) {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  const parsed = parseInt(value, 10);

  if (parsed <= min || reducedMotion) {
    return min;
  } else if (parsed >= max) {
    return max * throttle;
  } else {
    return parsed * throttle;
  }
}

const VARIANTS = {
  default: {
    activeColor: null,
    gap: 10,
    speed: 18,
    colors: '#f8fafc,#f1f5f9,#cbd5e1',
    noFocus: false
  },
  enhanced: {
    activeColor: '#ff6b6b',
    gap: 8,
    speed: 22,
    colors: '#fecaca,#f87171,#dc2626,#b91c1c',
    noFocus: false
  },
  glow: {
    activeColor: '#60a5fa',
    gap: 6,
    speed: 25,
    colors: '#dbeafe,#93c5fd,#3b82f6,#1d4ed8',
    noFocus: false
  },
  blue: {
    activeColor: '#e0f2fe',
    gap: 10,
    speed: 25,
    colors: '#e0f2fe,#7dd3fc,#0ea5e9',
    noFocus: false
  },
  yellow: {
    activeColor: '#fef08a',
    gap: 3,
    speed: 20,
    colors: '#fef08a,#fde047,#eab308',
    noFocus: false
  },
  pink: {
    activeColor: '#fecdd3',
    gap: 6,
    speed: 80,
    colors: '#fecdd3,#fda4af,#e11d48',
    noFocus: true
  }
};

const PixelCard = React.memo(function PixelCard({ variant = 'default', gap, speed, colors, noFocus, className = '', children }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timePreviousRef = useRef(performance.now());
  const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;

  const config = useMemo(() => {
    const variantCfg = VARIANTS[variant] || VARIANTS.default;
    return {
      gap: gap ?? variantCfg.gap,
      speed: speed ?? variantCfg.speed,
      colors: colors ?? variantCfg.colors,
      noFocus: noFocus ?? variantCfg.noFocus,
      variant: variant
    };
  }, [variant, gap, speed, colors, noFocus]);

  const initPixels = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    const ctx = canvasRef.current.getContext('2d', { 
      willReadFrequently: true,
      alpha: false // Better performance when alpha not needed
    });

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const colorsArray = config.colors.split(',');
    const pxs = [];
    const gapSize = parseInt(config.gap, 10);
    
    // Further reduce pixel density for optimal performance
    const maxPixels = 100; // Limit total pixels
    let pixelCount = 0;
    
    for (let x = 0; x < width && pixelCount < maxPixels; x += gapSize) {
      for (let y = 0; y < height && pixelCount < maxPixels; y += gapSize) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : Math.min(distance * 0.5, 80); // Reduced delay calculation

        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(config.speed, reducedMotion), delay, variant));
        pixelCount++;
      }
    }
    pixelsRef.current = pxs;
  }, [config, reducedMotion]);

  const doAnimate = fnName => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 20; // Further reduced to 20fps for better performance

    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;

    // Use willReadFrequently for better performance
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let allIdle = true;
    const pixelCount = pixelsRef.current.length;
    
    // Batch pixel updates for better performance
    for (let i = 0; i < pixelCount; i++) {
      const pixel = pixelsRef.current[i];
      pixel[fnName]();
      if (!pixel.isIdle) {
        allIdle = false;
      }
    }
    
    if (allIdle) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleAnimation = name => {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => doAnimate(name));
  };

  const onMouseEnter = () => handleAnimation('appear');
  const onMouseLeave = () => handleAnimation('disappear');
  const onFocus = e => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    handleAnimation('appear');
  };
  const onBlur = e => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    handleAnimation('disappear');
  };

  useEffect(() => {
    initPixels();
    const observer = new ResizeObserver(() => {
      initPixels();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [initPixels]);

  return (
    <div
      ref={containerRef}
      className={`h-[400px] w-[300px] relative overflow-hidden grid place-items-center aspect-[4/5] border border-[#27272a] rounded-[25px] isolate transition-colors duration-200 ease-[cubic-bezier(0.5,1,0.89,1)] select-none ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={config.noFocus ? undefined : onFocus}
      onBlur={config.noFocus ? undefined : onBlur}
      tabIndex={config.noFocus ? -1 : 0}
    >
      <canvas className="w-full h-full block" ref={canvasRef} />
      {children}
    </div>
  );
});

export default PixelCard;
