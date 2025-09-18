import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ExternalLink } from 'lucide-react'; // Install via: npm install lucide-react
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
    <div className="container py-20 px-4">
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <AnimatedText
          text="My Certifications"
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-pink-500 tracking-wide"
          animation="slideUp"
          staggerDelay={0.05}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto"
        >
          Professional certifications validating expertise in cloud computing and software engineering
        </motion.p>
      </motion.div>

      {/* Professional Cards Grid with Electric Sparks */}
            {/* Professional Cards Grid with Electric Sparks */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ scale: window.innerWidth >= 768 ? 1.02 : 1, y: window.innerWidth >= 768 ? -8 : 0 }}
            className="relative group"
          >
            {/* Desktop: Electric Border Card */}
            <div className="hidden md:block">
              <ElectricBorder
                color="#FF0066"
                speed={0.5}
                chaos={2}
                thickness={3}
                className="rounded-2xl h-full"
                style={{ borderRadius: '1rem' }}
              >
              <div className="bg-black p-6 rounded-2xl h-full min-h-[400px] flex flex-col relative overflow-hidden">                
                {/* Clean background for better electric border visibility */}
                <div className="absolute inset-0 bg-black/95 rounded-2xl"></div>
                
                {/* Header with Company Logo and Title */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center relative z-10">
                    <img 
                      src={cert.certImage} 
                      alt={`${cert.issuer} logo`}
                      className="w-8 h-8 object-contain opacity-100"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{cert.issuer}</h3>
                    <AnimatedText
                      text={cert.name}
                      className="text-pink-300 text-sm font-medium"
                      animation="slideLeft"
                      staggerDelay={0.02}
                    />
                  </div>
                </div>

                {/* Certificate Badge */}
                <div className="flex justify-center mb-6 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <div className="w-32 h-32 rounded-2xl bg-black flex items-center justify-center relative z-10">
                      <img 
                        src={cert.certImage} 
                        alt={`${cert.name} certificate badge`}
                        className="w-20 h-20 object-contain opacity-100"
                      />
                    </div>
                    {/* Electric glow animation */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/20 to-red-500/20 blur-md animate-pulse"></div>
                    
                    {/* Corner electric sparks */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-70 animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-500 rounded-full opacity-60 animate-ping" style={{ animationDelay: '0.7s' }}></div>
                  </motion.div>
                </div>

                {/* Skills Section */}
                <div className="flex-1 relative z-10 mb-6">
                  <h4 className="text-white font-semibold text-sm mb-3">Skills:</h4>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                    className="text-gray-300 text-sm leading-relaxed"
                  >
                    {cert.skills}
                  </motion.p>
                </div>

                {/* Date and View Button */}
                <div className="flex items-center justify-between relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    className="flex items-center gap-2 text-cyan-400 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Opening certificate:', cert.link);
                        const newWindow = window.open(cert.link, '_blank', 'noopener,noreferrer');
                        if (!newWindow) {
                          alert('Please allow popups for this site to view the certificate.');
                        }
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Credential
                    </a>
                  </motion.div>
                </div>


                
                {/* Subtle Electric Sparks */}
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-red-400 opacity-60 animate-ping" style={{ animationDelay: '0.8s' }}></div>
                <div className="absolute top-1/2 left-2 w-1 h-1 rounded-full bg-pink-300 opacity-70 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </ElectricBorder>


            
            {/* Thin Electric Spark Connections */}
            {index < certifications.length - 1 && index % 3 !== 2 && (
              <div className="absolute -right-6 top-1/2 w-12 h-px z-0 hidden xl:block">
                <div className="w-full h-px bg-gradient-to-r from-pink-500/60 via-red-500/80 to-pink-500/60 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 via-red-500/60 to-pink-500/40 blur-sm animate-pulse"></div>
                  {/* Moving spark */}
                  <div className="absolute top-0 w-2 h-px bg-white/80 animate-ping" style={{ left: '50%', transform: 'translateX(-50%)' }}></div>
                </div>
              </div>
            )}
            
            {/* Minimal Electric Glow for Border Visibility */}
            <div className="absolute inset-0 rounded-2xl opacity-20 blur-lg -z-10 transition-all duration-500 group-hover:opacity-40 bg-red-500/20"></div>
            </div>

            {/* Mobile: Clean Professional Card */}
            <div className="block md:hidden">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 hover:border-pink-500/50 p-6 rounded-2xl h-full min-h-[350px] flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
                
                {/* Header with Company Logo and Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                    <img 
                      src={cert.certImage} 
                      alt={`${cert.issuer} logo`}
                      className="w-8 h-8 object-contain opacity-100"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{cert.issuer}</h3>
                    <p className="text-pink-300 text-sm font-medium">{cert.name}</p>
                  </div>
                </div>

                {/* Certificate Badge */}
                <div className="flex justify-center mb-6">
                  <div className="w-28 h-28 rounded-xl bg-gray-800 flex items-center justify-center">
                    <img 
                      src={cert.certImage} 
                      alt={`${cert.name} certificate badge`}
                      className="w-16 h-16 object-contain opacity-100"
                    />
                  </div>
                </div>

                {/* Skills Section */}
                <div className="flex-1 mb-6">
                  <h4 className="text-white font-semibold text-sm mb-3">Skills:</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {cert.skills}
                  </p>
                </div>

                {/* Date and View Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {cert.date}
                  </div>
                  
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Credential
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
        className="flex justify-center mt-16 gap-4"
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.5 + index * 0.1, duration: 0.5, type: "spring" }}
            className="w-4 h-4 rounded-full bg-pink-500 opacity-80 relative shadow-lg shadow-pink-500/50"
          >
            <div className="absolute inset-0 rounded-full animate-ping opacity-60 bg-pink-500"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Certifications;
