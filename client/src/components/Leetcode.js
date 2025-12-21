import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCode } from 'react-icons/fa';

function Leetcode() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: window.innerWidth <= 768 ? 20 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: window.innerWidth <= 768 ? 0.5 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="leetcode" className="w-full py-6 sm:py-8 md:py-10 lg:py-12 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: window.innerWidth <= 768 ? 0.15 : 0.2 }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 text-center px-2"
          variants={itemVariants}
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight">
            Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Statistics</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Track my coding journey and contributions across platforms
          </p>
        </motion.div>

        {/* Stats Grid - Mobile Optimized */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          
          {/* LeetCode Status */}
          <motion.div
            className="w-full md:w-1/2 max-w-md"
            variants={itemVariants}
          >
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-purple-500/40 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <FaCode className="text-orange-400 text-xl sm:text-2xl" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">LeetCode Status</h3>
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-700/50">
                <img
                  src="https://leetcard.jacoblin.cool/Aadhithya_Rathakrishnan?theme=dark&animation=true&ext=heatmap"
                  alt="LeetCode Stats"
                  className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* GitHub Contributions */}
          <motion.div
            className="w-full md:w-1/2 max-w-md"
            variants={itemVariants}
          >
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-purple-500/40 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <FaGithub className="text-purple-400 text-xl sm:text-2xl" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-400">GitHub Contributions</h3>
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-700/50">
                <img
                  src="https://ghchart.rshah.org/8b5cf6/aadhithyafullfur"
                  alt="GitHub Contribution Chart"
                  className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Leetcode;
