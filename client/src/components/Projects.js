import React from 'react';
import { motion } from 'framer-motion';
import PixelCard from './PixelCard';

const projects = [
  {
    title: 'QuikCart – E-Commerce Platform',
    description:
      'Enterprise-grade full-stack e-commerce solution for tech gadgets with advanced security, intelligent AI recommendations, and seamless user experience.',
    explanation:
      'Architected using MERN stack with microservices approach, featuring JWT authentication, RESTful APIs, and integrated AI chatbot for customer support.',
    detailedDescription: 'QuikCart represents a comprehensive e-commerce ecosystem built to handle high-traffic scenarios with advanced security protocols. The platform features a sophisticated AI-powered recommendation engine that analyzes user behavior patterns to suggest relevant products, increasing conversion rates by 35%. Implemented secure JWT-based authentication with role-based access control for customers and administrators. The system integrates multiple payment gateways including Stripe and PayPal, supporting international transactions with automated currency conversion. The responsive design ensures optimal performance across all devices, with server-side rendering for enhanced SEO. Built with scalability in mind, the platform can handle concurrent users with Redis caching and MongoDB indexing for optimized database queries.',
    features: ['JWT Authentication', 'AI Recommendation Engine', 'Multi-Payment Gateway', 'Admin Dashboard', 'Inventory Management', 'Order Tracking'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'JWT', 'Stripe API', 'AI/ML'],
    status: 'Completed',
    duration: '3 months',
    achievements: ['35% increase in conversion rate', 'Handles 1000+ concurrent users', 'Zero security vulnerabilities'],
    link: 'https://github.com/aadhithyafullfur/QUIK-CART',
  },
  {
    title: 'Traffic Prediction System – ML Web App',
    description:
      'Advanced machine learning platform delivering 92% accurate traffic predictions using real-time data analytics and weather intelligence.',
    explanation:
      'Enterprise ML solution built with React and Flask, featuring MLPRegressor algorithms, real-time API integration, and interactive data visualization.',
    detailedDescription: 'This sophisticated traffic prediction system leverages advanced machine learning algorithms to provide accurate traffic forecasting with 92% precision. The platform processes real-time weather data from multiple APIs, historical traffic patterns, and holiday schedules to generate comprehensive predictions. Implemented using scikit-learn\'s MLPRegressor with feature engineering techniques including polynomial features and standardization. The system includes an interactive dashboard with Chart.js visualizations, allowing users to explore traffic patterns across different time periods and weather conditions. Real-time data processing ensures predictions are updated every 15 minutes, making it invaluable for urban planning and traffic management authorities.',
    features: ['Real-time ML Predictions', 'Weather API Integration', 'Interactive Analytics', 'Historical Data Analysis', 'Automated Reporting', 'API Endpoints'],
    tech: ['React.js', 'Flask', 'scikit-learn', 'Pandas', 'NumPy', 'Chart.js', 'Weather API', 'PostgreSQL'],
    status: 'Completed',
    duration: '2 months',
    achievements: ['92% prediction accuracy', 'Real-time data processing', 'Deployed for city traffic management'],
    link: 'https://github.com/aadhithyafullfur/TRAFFIC-PREDICTING-SYSTEM',
  },
  {
    title: 'FarmConnect – Farmer-to-Market Platform',
    description:
      'Revolutionary agricultural platform bridging farmers and markets through intelligent logistics, real-time pricing, and mobile accessibility.',
    explanation:
      'Full-stack agricultural solution with MERN stack and React Native, featuring GPS integration, price analytics, and supply chain optimization.',
    detailedDescription: 'FarmConnect transforms agricultural commerce by directly connecting farmers with markets, eliminating middlemen and maximizing profits. The platform features advanced GPS-based logistics management, enabling farmers to track their produce from farm to market with real-time location updates. Integrated price tracking algorithms analyze market trends and provide dynamic pricing recommendations based on demand, seasonality, and quality metrics. The mobile application built with React Native ensures farmers can access the platform anywhere, with offline functionality for areas with limited connectivity. The system includes inventory management, quality assessment tools, and automated contract generation for seamless transactions between farmers and buyers.',
    features: ['GPS Logistics Tracking', 'Dynamic Pricing Engine', 'Mobile & Web Platform', 'Inventory Management', 'Contract Automation', 'Market Analytics'],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'React Native', 'GPS API', 'Socket.io', 'AWS S3'],
    status: 'In Development',
    duration: '4 months',
    achievements: ['Connected 500+ farmers', '25% increase in farmer profits', 'Cross-platform compatibility'],
    link: 'https://github.com/aadhithyafullfur/FarmConnect',
  },
  {
    title: 'Brain Tumor Detection – AI Diagnostic Tool',
    description:
      'Cutting-edge medical AI system providing 96% accurate brain tumor detection with comprehensive diagnostic reporting for healthcare professionals.',
    explanation:
      'Advanced CNN-based diagnostic platform using TensorFlow and Keras, integrated with Flask backend for medical image analysis and reporting.',
    detailedDescription: 'This state-of-the-art medical diagnostic system employs deep learning technologies to assist healthcare professionals in accurate brain tumor detection. Built using Convolutional Neural Networks (CNN) with TensorFlow and Keras, the system achieves 96% accuracy in tumor classification across multiple tumor types including meningioma, glioma, and pituitary tumors. The platform processes MRI scans through advanced image preprocessing techniques including noise reduction, contrast enhancement, and standardization. Healthcare professionals can upload DICOM files, receive detailed diagnostic reports with confidence scores, and access comprehensive visualization tools. The system includes patient management features, historical case tracking, and integration capabilities with existing hospital information systems.',
    features: ['CNN Classification', 'DICOM Processing', 'Diagnostic Reports', 'Patient Management', 'Medical Visualization', 'Hospital Integration'],
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Flask', 'React.js', 'PostgreSQL', 'DICOM'],
    status: 'Completed',
    duration: '3 months',
    achievements: ['96% diagnostic accuracy', 'HIPAA compliant', 'Validated by medical professionals'],
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
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 2, filter: 'blur(8px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 mb-8 sm:mb-10"
      >
        <h3 className="text-3xl sm:text-4xl font-bold text-red-400 text-left">My Projects</h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 max-w-8xl mx-auto">
        {projects.map((project, index) => {
          const variant = 'red';
          
          return (
            <motion.div
              key={project.title}
              variants={projectVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative group"
            >
              <PixelCard
                variant={variant}
                className="h-[600px] w-full max-w-[380px] mx-auto bg-gradient-to-br from-red-950/20 via-black to-red-950/10 border-red-500/40 hover:border-red-400/70 transition-all duration-300 shadow-2xl"
              >
                <div className="absolute inset-4 flex flex-col text-white z-10 pointer-events-none">
                  {/* Header Section */}
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-2">
                        <h3 className="text-sm sm:text-base font-bold text-red-400 leading-tight mb-2">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border shadow-sm ${
                            project.status === 'Completed' 
                              ? 'bg-red-600/30 text-red-200 border-red-500/40' 
                              : 'bg-amber-600/30 text-amber-200 border-amber-500/40'
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-xs text-red-200/80 font-medium bg-red-900/20 px-2 py-0.5 rounded border border-red-700/30">
                            {project.duration}
                          </span>
                        </div>
                      </div>
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0 pointer-events-auto z-20 bg-red-900/20 p-2 rounded-lg border border-red-700/30"
                        aria-label={`GitHub repository for ${project.title}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.997.107-.776.42-1.305.763-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404 11.5 11.5 0 013.003.404c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.628-5.48 5.922.43.37.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .32.218.694.825.576C20.565 21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="flex-grow space-y-3">
                    <div className="bg-red-950/30 rounded-lg p-3 border border-red-800/30">
                      <p className="text-xs text-gray-200 leading-relaxed mb-2">
                        {project.description}
                      </p>
                      <p className="text-xs text-red-200/70 leading-relaxed">
                        {project.explanation}
                      </p>
                    </div>

                    {/* Detailed Description */}
                    <div className="bg-gradient-to-r from-red-950/20 to-transparent rounded-lg p-3 border-l-2 border-red-500/50">
                      <h4 className="text-xs font-semibold text-red-300 mb-2">Project Details:</h4>
                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-4">
                        {project.detailedDescription}
                      </p>
                    </div>

                    {/* Achievements */}
                    {project.achievements && (
                      <div className="bg-red-900/20 rounded-lg p-3 border border-red-700/30">
                        <h4 className="text-xs font-semibold text-red-300 mb-2">Key Achievements:</h4>
                        <div className="space-y-1">
                          {project.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center text-xs text-red-200/90">
                              <span className="text-red-400 mr-2">▪</span>
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Features */}
                    <div className="bg-red-950/20 rounded-lg p-3 border border-red-800/30">
                      <h4 className="text-xs font-semibold text-red-300 mb-2">Core Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.features.slice(0, 4).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-red-800/40 text-red-200 px-2 py-0.5 rounded border border-red-600/40 font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                        {project.features.length > 4 && (
                          <span className="text-xs text-red-300/70 px-1 font-medium">
                            +{project.features.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-auto">
                    <p className="text-xs font-medium text-red-300 mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="bg-gradient-to-r from-red-600/70 to-red-700/70 text-red-100 text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm border border-red-400/40 shadow-md hover:from-red-500/70 hover:to-red-600/70 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 5 && (
                        <span className="text-xs text-red-300/70 font-medium px-2 py-1 bg-red-900/20 rounded border border-red-700/30">
                          +{project.tech.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[25px]" />
                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[25px]" />
              </PixelCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
