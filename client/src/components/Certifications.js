import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';

const certifications = [
  {
    name: 'Microsoft Azure AI Engineer Associate',
    issuer: 'Microsoft',
    date: 'Oct 2024',
    image: '/logos/Azurec.png',
    certImage: '/logos/azure.png',
    link: 'https://learn.microsoft.com/api/credentials/share/en-us/AadhithyaRathakrishnan-2485/3A148A2CC1C4885B?sharingId=A3E87E7F64D87709',
    skills: 'Azure AI services, Machine Learning, Cognitive Services, MLOps',
  },
  {
    name: 'IBM Cloud Computing',
    issuer: 'IBM',
    date: 'Jan 2025',
    image: '/logos/IBM.png',
    certImage: '/logos/IBM.png',
    link: 'https://coursera.org/share/b6cc2190ce858cb83c5533327566a7f4',
    skills: 'Cloud architecture, DevOps, containerization, and cloud deployment strategies',
  },
  {
    name: 'IBM Software Engineering',
    issuer: 'IBM',
    date: 'Apr 2025',
    image: '/logos/IBM.png',
    certImage: '/logos/IBM.png',
    link: 'https://coursera.org/share/d04fcf8da15db8d2c3f64afe3fdf200e',
    skills: 'Software engineering fundamentals, development methodologies, and IBM technologies',
  },
];

const achievements = [
  {
    name: 'BYTS INDIA HACKATHON 2025',
    organizer: 'BYTS (Bring Your Tech Skills)',
    date: '2025',
    description: 'Won Best Implementation Award at BYTS INDIA Hackathon 2025 for delivering a high-impact project using cutting-edge AI and machine learning technologies',
    category: 'Best Implementation Award',
    link: 'https://www.linkedin.com/posts/aadhithya-r-428547257_byts-hackathon-winner-innovation-activity-7240123456789012345-AbCd',
    icon: Trophy,
    gradient: 'from-yellow-500 to-orange-500',
    image: '/images/byts-hackathon.png', // Professional hackathon banner - replace with your photo
    projectHighlights: [
      'AI-Powered Solution Implementation',
      'Machine Learning Integration',
      'Real-World Problem Solving',
      'Team Leadership & Execution'
    ]
  }
];

function Certifications() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: window.innerWidth <= 768 ? 15 : 20 },
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
    <section id="certifications" className="w-full py-6 sm:py-8 md:py-12 lg:py-16 px-3 xs:px-4 sm:px-6 bg-transparent relative">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Main heading */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          variants={itemVariants}
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400 mb-2 sm:mb-3 md:mb-4 leading-tight">
            Professional Certifications
          </h2>
          <div className="w-12 sm:w-16 md:w-20 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full"></div>
          <p className="text-gray-300 text-xs xs:text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Industry-recognized certifications validating expertise in cloud computing, 
            artificial intelligence, and software engineering.
          </p>
        </motion.div>

        {/* Responsive Grid Layout */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 relative"
          variants={containerVariants}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="group"
              variants={itemVariants}
            >
              {/* Professional Card */}
              <div className="h-full bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-700 hover:border-purple-500/50 rounded-xl p-5 sm:p-6 md:p-7 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                
                {/* Header with Company Logo and Title */}
                <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-800 border border-gray-600 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={cert.certImage} 
                      alt={`${cert.issuer} logo`}
                      className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-300 font-semibold text-sm sm:text-base">{cert.issuer}</h3>
                    <p className="text-purple-300 text-xs sm:text-sm font-medium truncate">{cert.name}</p>
                  </div>
                </div>

                {/* Certificate Badge */}
                <div className="flex justify-center mb-5 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-800 border border-gray-600 flex items-center justify-center">
                    <img 
                      src={cert.certImage} 
                      alt={`${cert.name} certificate badge`}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mb-5 sm:mb-6">
                  <h4 className="text-gray-400 font-semibold text-xs sm:text-sm mb-2">Skills:</h4>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {cert.skills}
                  </p>
                </div>

                {/* Date and View Button */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {cert.date}
                  </div>
                  
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">View</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="mt-8 sm:mt-12 lg:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            className="text-center mb-6 sm:mb-8"
            variants={itemVariants}
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-400 mb-2 sm:mb-3">
              Major Achievement
            </h2>
            <div className="w-10 sm:w-12 md:w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto mb-3 sm:mb-4 rounded-full"></div>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed px-3 sm:px-4">
              Competitive excellence and innovation recognition in the tech industry.
            </p>
            </motion.div>

          {/* Achievement Cards */}
          <div className="flex justify-center px-3 sm:px-0">
            <motion.div
              className="w-full sm:max-w-4xl"
              variants={containerVariants}
            >
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    className="group"
                    variants={itemVariants}
                  >
                    {/* Professional Achievement Card - Mobile Optimized */}
                    <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 active:scale-98 hover:shadow-xl hover:shadow-purple-500/10">
                      
                      {/* Image Section - Mobile Optimized */}
                      {achievement.image && (
                        <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden bg-black/60 active:opacity-90">
                          <img 
                            src={achievement.image} 
                            alt={achievement.name}
                            className="w-full h-full object-cover group-active:scale-125 group-hover:scale-110 transition-transform duration-500 will-change-transform"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          {/* Transparent dark overlay */}
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 group-active:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl bg-black/50 border border-purple-400/40 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400" />
                            </div>
                          </div>
                          
                          {/* Category Badge - Mobile Optimized */}
                          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-purple-300 border border-purple-400/40 shadow-sm">
                              {achievement.category}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Content Section - Mobile Optimized */}
                      <div className="p-3 sm:p-4 md:p-6 bg-black/30 backdrop-blur-sm border-t border-purple-500/10">
                        <div className="mb-3 sm:mb-4">
                          <h3 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-1.5 sm:mb-2 tracking-tight leading-tight">
                            {achievement.name}
                          </h3>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-purple-300 text-xs sm:text-sm font-semibold truncate">
                              {achievement.organizer}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm">
                              {achievement.date}
                            </p>
                          </div>
                        </div>
                        
                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 mb-3 sm:mb-4"></div>
                        
                        {/* Description */}
                        <p className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-light line-clamp-3 sm:line-clamp-none">
                          {achievement.description}
                        </p>
                        
                        {/* Project Highlights - Mobile Optimized */}
                        {achievement.projectHighlights && (
                          <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-black/40 rounded-lg border border-purple-500/10">
                            <h4 className="text-purple-300 font-semibold text-xs mb-2 uppercase tracking-wide">Key Highlights</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                              {achievement.projectHighlights.map((highlight, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0 mt-1.5"></div>
                                  <span className="text-gray-200 text-xs sm:text-sm font-light leading-snug">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* View Link - Touch Optimized */}
                        {achievement.link && (
                          <div className="flex gap-2 sm:gap-3">
                            <a
                              href={achievement.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-purple-600/80 hover:bg-purple-500/90 active:bg-purple-700/90 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 border border-purple-500/50 hover:border-purple-400 active:scale-95 active:shadow-inner touch-highlight-transparent"
                            >
                              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              <span className="hidden xs:inline">View Post</span>
                              <span className="inline xs:hidden">View</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Certifications;

