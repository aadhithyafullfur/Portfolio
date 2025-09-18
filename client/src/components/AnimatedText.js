import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ 
  text, 
  className = '', 
  animation = 'slideUp', 
  staggerDelay = 0.05, 
  duration = 0.5, 
  delay = 0,
  redTheme = true // New prop to enable red color variations
}) => {
  // Animation variants for different effects
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  // Get character animation variants based on type
  const getCharVariants = (animationType) => {
    const variants = {
      slideUp: {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration } },
      },
      slideDown: {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration } },
      },
      slideLeft: {
        initial: { x: 50, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration } },
      },
      slideRight: {
        initial: { x: -50, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration } },
      },
      scale: {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration } },
      },
      rotate: {
        initial: { rotate: -180, opacity: 0 },
        animate: { rotate: 0, opacity: 1, transition: { duration } },
      },
      bounce: {
        initial: { y: 50, opacity: 0 },
        animate: { 
          y: 0, 
          opacity: 1, 
          transition: { 
            duration, 
            type: 'spring', 
            bounce: 0.6 
          } 
        },
      },
      elastic: {
        initial: { scale: 0, opacity: 0 },
        animate: { 
          scale: 1, 
          opacity: 1, 
          transition: { 
            duration, 
            type: 'spring', 
            stiffness: 200, 
            damping: 10 
          } 
        },
      },
    };

    return variants[animationType] || variants.slideUp;
  };

  const charVariants = getCharVariants(animation);

  // Split text into characters while preserving spaces
  const characters = text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char, // Non-breaking space
    index,
  }));

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{ display: 'inline-block' }}
    >
      {characters.map(({ char, index }) => (
        <motion.span
          key={index}
          variants={charVariants}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
