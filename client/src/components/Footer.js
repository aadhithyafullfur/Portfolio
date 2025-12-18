import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-black/40 backdrop-blur-sm border-t border-purple-500/20 py-8 sm:py-10 md:py-12"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center space-y-4 sm:space-y-5">
          {/* Social Links */}
          <div className="flex gap-4 sm:gap-6">
            <motion.a 
              href="https://github.com/aadhithya120" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-black/40 hover:bg-purple-600/40 border border-purple-500/20 hover:border-amber-400/50 flex items-center justify-center text-purple-300 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/aadhithya120" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-black/40 hover:bg-purple-600/40 border border-purple-500/20 hover:border-amber-400/50 flex items-center justify-center text-purple-300 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </div>
          
          {/* Copyright Text */}
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          <p className="text-xs sm:text-sm text-gray-400 text-center font-medium">© 2025 Aadhithya R. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
