import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-primary-black py-8 glass"
    >
      <div className="container flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <a href="https://github.com/aadhithya120" target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-6 h-6 text-white hover:text-red-400 transition-colors" />
          </a>
          <a href="https://linkedin.com/in/aadhithya120" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 text-white hover:text-red-400 transition-colors" />
          </a>
        </div>
        <p className="text-sm text-text-light">© 2025 Aadhithya R. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}

export default Footer;