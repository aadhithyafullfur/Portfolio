import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'QuikCart',
    description:
      'A full-stack e-commerce website for tech gadgets with user authentication, responsive design, and an AI-powered chatbot for smart product assistance',
    explanation:
      'Built with React, Node.js, Express, and MongoDB, QuikCart offers secure APIs and a modern Tailwind CSS interface with animations.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    link: 'https://github.com/aadhithya120/quikcart',
  },
  {
    title: 'Traffic Prediction System',
    description:
      'A machine learning web app predicting traffic volume using weather, date, and holiday inputs with an MLPRegressor model.',
    explanation:
      'Developed with React, Flask, and scikit-learn, it features a responsive UI and API-driven predictions using pandas for data processing.',
    tech: ['React', 'Flask', 'scikit-learn', 'pandas', 'Tailwind CSS'],
    link: 'https://github.com/aadhithya120/traffic-prediction',
  },
  {
    title: 'Mental Health Analyser',
    description:
      'ML project analyzing mental health based on user input with predictive insights and recommendations.',
    explanation:
      'Built with Python and machine learning libraries, it uses classification models to assess mental health status.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'Flask'],
    link: 'https://github.com/aadhithya120/mental-health-analyser',
  },
  {
    title: 'Brain Tumor Prediction',
    description:
      'Deep learning project to classify brain tumor presence from MRI scans using CNN architectures.',
    explanation:
      'Implemented with TensorFlow and Keras, this model achieves high accuracy on MRI brain tumor detection.',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN'],
    link: 'https://github.com/aadhithya120/brain-tumor-prediction',
  },
];

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.03 },
};

function Projects() {
  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 2, filter: 'blur(8px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 mb-10"
      >
        <h3 className="text-4xl font-bold text-purple-400 text-left">My Projects</h3>
      </motion.div>

      <div className="flex justify-center gap-8 max-w-full overflow-x-auto px-4 py-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={projectVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="glass p-6 rounded-lg cursor-default flex flex-col justify-between flex-shrink-0 shadow-lg"
            style={{ width: '280px', minHeight: '280px' }}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-purple-400">{project.title}</h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-600 transition-colors"
                  aria-label={`GitHub link for ${project.title}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.997.107-.776.42-1.305.763-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404 11.5 11.5 0 013.003.404c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.628-5.48 5.922.43.37.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .32.218.694.825.576C20.565 21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>

              <p className="text-sm mb-2 text-gray-300">{project.description}</p>
              <p className="text-sm italic mb-3 text-gray-400">{project.explanation}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-purple-600 bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded-full"
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
