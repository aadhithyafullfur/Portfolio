import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ElectricBorder from './Electricboard';
import AnimatedText from './AnimatedText';

const certifications = [
  {
    name: 'Microsoft Azure AI Engineer Associate',
    issuer: 'Microsoft',
    date: 'Oct 2024',
    image: '/logos/Azurec.png',
    certImage: '/logos/azure.png',
    link: 'https://learn.microsoft.com/api/credentials/share/en-us/AadhithyaRathakrishnan-2485/3A148A2CC1C4885B?sharingId=A3E87E7F64D87709',
    skills: 'Azure AI services, Machine Learning, Cognitive Services, MLOps',
    electricColor: '#FF1493',
  },
  {
    name: 'IBM Cloud Computing',
    issuer: 'IBM',
    date: 'Jan 2025',
    image: '/logos/IBM.png',
    certImage: '/logos/IBM.png',
    link: 'https://coursera.org/share/b6cc2190ce858cb83c5533327566a7f4',
    skills: 'Cloud architecture, DevOps, containerization, and cloud deployment strategies',
    electricColor: '#FF1493',
  },
  {
    name: 'IBM Software Engineering',
    issuer: 'IBM',
    date: 'Apr 2025',
    image: '/logos/IBM.png',
    certImage: '/logos/IBM.png',
    link: 'https://coursera.org/share/d04fcf8da15db8d2c3f64afe3fdf200e',
    skills: 'Software engineering fundamentals, development methodologies, and IBM technologies',
    electricColor: '#FF1493',
  },
];

function Certifications() {
  return (
    <section id="certifications" className="w-full py-8 sm:py-16 lg:py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <AnimatedText
            text="Professional Certifications"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-red-500 mb-4"
            animation="slideUp"
            staggerDelay={0.05}
          />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-4 sm:mb-6 rounded-full"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4"
          >
            Industry-recognized certifications that validate my expertise in cloud computing, 
            artificial intelligence, and software engineering.
          </motion.p>
        </motion.div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 relative">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.7, 
                type: "spring", 
                stiffness: 100 
              }}
              whileHover={{ y: -5 }}
              className="group relative cursor-pointer"
            >
              {/* Desktop/Tablet: Enhanced Electric Border Effect */}
              <div className="hidden md:block">
                <ElectricBorder
                  color="#FF0066"
                  speed={0.5}
                  chaos={2}
                  thickness={3}
                  className="rounded-2xl h-full"
                  style={{ borderRadius: '1rem' }}
                >
                  <div className="bg-black p-4 lg:p-6 rounded-2xl h-full min-h-[300px] lg:min-h-[350px] flex flex-col relative overflow-hidden">                
                {/* Clean background for better electric border visibility */}
                <div className="absolute inset-0 bg-black/95 rounded-2xl"></div>
                
                    {/* Header with Company Logo and Title */}
                    <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6 relative z-10">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-black flex items-center justify-center relative z-10">
                        <img 
                          src={cert.certImage} 
                          alt={`${cert.issuer} logo`}
                          className="w-6 h-6 lg:w-8 lg:h-8 object-contain opacity-100"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base lg:text-lg">{cert.issuer}</h3>
                        <AnimatedText
                          text={cert.name}
                          className="text-red-300 text-xs lg:text-sm font-medium"
                          animation="slideLeft"
                          staggerDelay={0.02}
                        />
                      </div>
                    </div>

                    {/* Certificate Badge */}
                    <div className="flex justify-center mb-4 lg:mb-6 relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative"
                      >
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-black flex items-center justify-center relative z-10">
                          <img 
                            src={cert.certImage} 
                            alt={`${cert.name} certificate badge`}
                            className="w-12 h-12 lg:w-16 lg:h-16 object-contain opacity-100"
                          />
                        </div>
                    {/* Electric glow animation */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 blur-md animate-pulse"></div>
                    
                    {/* Corner electric sparks */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full opacity-70 animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-500 rounded-full opacity-60 animate-ping" style={{ animationDelay: '0.7s' }}></div>
                  </motion.div>
                </div>

                    {/* Skills Section */}
                    <div className="flex-1 relative z-10 mb-4 lg:mb-6">
                      <h4 className="text-white font-semibold text-xs lg:text-sm mb-2 lg:mb-3">Skills:</h4>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                        className="text-gray-300 text-xs lg:text-sm leading-relaxed"
                      >
                        {cert.skills}
                      </motion.p>
                    </div>

                    {/* Date and View Button */}
                    <div className="flex items-center justify-between relative z-10 flex-wrap gap-2">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                        className="flex items-center gap-2 text-cyan-400 text-xs lg:text-sm"
                      >
                        <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {cert.date}
                      </motion.div>
                  
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10"
                      >
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 bg-red-600 hover:bg-red-500 text-white text-xs lg:text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
                          View Credential
                        </a>
                  </motion.div>
                </div>


                
                {/* Subtle Electric Sparks */}
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-red-400 opacity-60 animate-ping" style={{ animationDelay: '0.8s' }}></div>
                <div className="absolute top-1/2 left-2 w-1 h-1 rounded-full bg-red-300 opacity-70 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </ElectricBorder>


            
            {/* Thin Electric Spark Connections */}
            {index < certifications.length - 1 && index % 3 !== 2 && (
              <div className="absolute -right-6 top-1/2 w-12 h-px z-0 hidden xl:block">
                <div className="w-full h-px bg-gradient-to-r from-red-500/60 via-red-500/80 to-red-600/60 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/40 via-red-500/60 to-red-600/40 blur-sm animate-pulse"></div>
                  {/* Moving spark */}
                  <div className="absolute top-0 w-2 h-px bg-white/80 animate-ping" style={{ left: '50%', transform: 'translateX(-50%)' }}></div>
                </div>
              </div>
            )}
            
            {/* Minimal Electric Glow for Border Visibility */}
            <div className="absolute inset-0 rounded-2xl opacity-20 blur-lg -z-10 transition-all duration-500 group-hover:opacity-40 bg-red-500/20"></div>
            </div>

              {/* Mobile & Small Tablet: Clean Professional Card */}
              <div className="block md:hidden">
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 hover:border-red-500/50 p-4 sm:p-5 rounded-2xl h-full min-h-[260px] sm:min-h-[280px] flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
                  
                  {/* Header with Company Logo and Title */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                      <img 
                        src={cert.certImage} 
                        alt={`${cert.issuer} logo`}
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain opacity-100"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-base sm:text-lg">{cert.issuer}</h3>
                      <p className="text-red-300 text-xs sm:text-sm font-medium leading-tight">{cert.name}</p>
                    </div>
                  </div>

                  {/* Certificate Badge */}
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-800 flex items-center justify-center">
                      <img 
                        src={cert.certImage} 
                        alt={`${cert.name} certificate badge`}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain opacity-100"
                      />
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="flex-1 mb-4 sm:mb-6">
                    <h4 className="text-white font-semibold text-xs sm:text-sm mb-2 sm:mb-3">Skills:</h4>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {cert.skills}
                    </p>
                  </div>

                  {/* Date and View Button */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {cert.date}
                    </div>
                    
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-300"
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      View
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
          className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-4"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.5 + index * 0.1, duration: 0.5, type: "spring" }}
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 opacity-80 relative shadow-lg shadow-red-500/50"
            >
              <div className="absolute inset-0 rounded-full animate-ping opacity-60 bg-red-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Certifications;
