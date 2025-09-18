import React from 'react';
import { motion } from 'framer-motion';

const projects = [
{
  title: 'QuikCart – E-Commerce Platform',
  description:
    'Full-stack e-commerce web application for tech gadgets featuring secure authentication, responsive UI, and an AI-powered chatbot for smart product assistance.',
  explanation:
    'Developed using MERN stack with RESTful APIs, QuikCart integrates MongoDB for data storage, Node.js & Express for backend services, and React with Tailwind CSS for a modern and animated interface.',
  tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'AI Chatbot'],
  link: 'https://github.com/aadhithyafullfur/QUIK-CART',
},

{
  title: 'Traffic Prediction System – ML Web App',
  description:
    'Machine learning-based web application that predicts traffic volume using real-time weather, date, and holiday inputs.',
  explanation:
    'Built with React, Flask, and scikit-learn, the system integrates an MLPRegressor model with API-driven predictions and pandas-powered preprocessing. Features a responsive UI styled with Tailwind CSS for seamless user interaction.',
  tech: ['React', 'Flask', 'scikit-learn', 'Pandas', 'Tailwind CSS'],
  link: 'https://github.com/aadhithyafullfur/TRAFFIC-PREDICTING-SYSTEM',
},
{
  title: 'FarmConnect – Farmer-to-Market Platform',
  description:
    'Web and mobile application connecting farmers directly with markets to streamline logistics and improve profitability.',
  explanation:
    'Built using MERN stack, it enables farmers to manage produce, track logistics, and connect with buyers efficiently. Includes mobile app support for real-time access.',
  tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'React Native'],
  link: 'https://github.com/aadhithyafullfur/FarmConnect',
},
{
  title: 'Brain Tumor Detection – Full Stack Application',
  description:
    'Web application for doctors to upload MRI scans and visualize tumor classification with deep learning insights.',
  explanation:
    'Developed using TensorFlow deep learning models integrated with a Flask backend and React frontend. Provides real-time predictions and visualization to assist doctors in diagnosis.',
  tech: ['Python', 'TensorFlow', 'Keras', 'Flask', 'React', 'Deep Learning'],
  link: 'https://github.com/aadhithyafullfur/Brain-Tumor-detector',
},
];

const projectVariants = {
  hidden: { opacity: 0, y: window.innerWidth <= 768 ? 15 : 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: window.innerWidth <= 768 ? 0.5 : 0.6,
      ease: 'easeOut'
    }
  },
  hover: { 
    scale: window.innerWidth <= 768 ? 1.02 : 1.03,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
};

function Projects() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 2, filter: 'blur(8px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 mb-8 sm:mb-10"
      >
        <h3 className="text-3xl sm:text-4xl font-bold text-red-400 text-left">My Projects</h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={projectVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="glass p-6 rounded-lg cursor-default flex flex-col justify-between shadow-lg h-full"
          >
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-red-400 leading-tight">{project.title}</h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 ml-2"
                  aria-label={`GitHub link for ${project.title}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="sm:w-6 sm:h-6"
                  >
                    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.997.107-.776.42-1.305.763-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404 11.5 11.5 0 013.003.404c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.628-5.48 5.922.43.37.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .32.218.694.825.576C20.565 21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>

              <p className="text-xs sm:text-sm mb-2 text-gray-300 leading-relaxed">{project.description}</p>
              <p className="text-xs sm:text-sm italic mb-3 text-gray-400 leading-relaxed">{project.explanation}</p>

              <div className="flex flex-wrap gap-1 sm:gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-red-600 bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
