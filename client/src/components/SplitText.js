import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.5,
  ease = 'power3.out',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  tag = 'h2',
  useScrollTrigger = false
}) => {
  const ref = useRef(null);
  const [chars, setChars] = useState([]);
  const animationCompleteRef = useRef(false);
  const timelineRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [isLowEndDevice] = useState(() => {
    return navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
  });

  useEffect(() => {
    const charArray = text.split('');
    setChars(charArray);
  }, [text]);

  useEffect(() => {
    if (!ref.current || chars.length === 0) return;
    
    if (hasAnimatedRef.current) {
      return;
    }

    const charElements = ref.current.querySelectorAll('.char');
    
    if (charElements.length === 0) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    hasAnimatedRef.current = true;

    // For low-end devices, use faster animation or skip complex effects
    const animationDuration = isLowEndDevice ? duration * 0.6 : duration;
    const animationDelay = isLowEndDevice ? delay * 0.7 : delay;

    const timeline = gsap.timeline({
      onComplete: () => {
        animationCompleteRef.current = true;
      }
    });

    // Simplified animation for low-end devices
    const animationConfig = isLowEndDevice
      ? { opacity: 1 } // Only fade in, no y movement
      : { ...to };

    const fromConfig = isLowEndDevice
      ? { opacity: 0 } // Only start invisible
      : { ...from };

    timeline.fromTo(
      charElements,
      fromConfig,
      {
        ...animationConfig,
        duration: animationDuration,
        ease: isLowEndDevice ? 'power2.out' : ease,
        stagger: animationDelay / 1000
      }
    );

    timelineRef.current = timeline;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [chars, delay, duration, ease, from, to, isLowEndDevice]);

  const handleMouseEnter = (e) => {
    if (!animationCompleteRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleTouchStart = (e) => {
    if (!animationCompleteRef.current) {
      e.preventDefault();
    }
  };

  const renderTag = () => {
    // Simplified styles for low-end devices
    const baseStyle = {
      textAlign: 'center',
      display: 'inline-block',
      width: '100%',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      pointerEvents: animationCompleteRef.current ? 'auto' : 'none',
      transition: isLowEndDevice ? 'none' : 'pointer-events 0.3s ease-out',
      backfaceVisibility: 'hidden',
      perspective: 1000
    };

    const charStyle = isLowEndDevice
      ? {
          display: 'inline-block'
        }
      : {
          display: 'inline-block',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden'
        };

    const content = (
      <span 
        ref={ref} 
        style={baseStyle}
        className={className}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
      >
        {chars.map((char, index) => (
          <span 
            key={index} 
            className="char" 
            style={charStyle}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );

    switch (tag) {
      case 'h1':
        return <h1 style={{ margin: 0 }}>{content}</h1>;
      case 'h2':
        return <h2 style={{ margin: 0 }}>{content}</h2>;
      case 'h3':
        return <h3 style={{ margin: 0 }}>{content}</h3>;
      case 'h4':
        return <h4 style={{ margin: 0 }}>{content}</h4>;
      case 'h5':
        return <h5 style={{ margin: 0 }}>{content}</h5>;
      case 'h6':
        return <h6 style={{ margin: 0 }}>{content}</h6>;
      case 'p':
        return <p style={{ margin: 0 }}>{content}</p>;
      default:
        return <p style={{ margin: 0 }}>{content}</p>;
    }
  };

  return renderTag();
};

export default SplitText;
