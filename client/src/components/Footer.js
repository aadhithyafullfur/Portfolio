import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-primary-black py-6 sm:py-8 glass"
    >
      <div className="container flex flex-col items-center px-4">
        <div className="flex space-x-4 sm:space-x-6 mb-3 sm:mb-4">
          <a href="https://github.com/aadhithya120" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
            <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </a>
          <a href="https://linkedin.com/in/aadhithya120" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
            <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </a>
        </div>
        <p className="text-xs xs:text-sm text-text-light text-center">© 2025 Aadhithya R. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}

export default Footer;