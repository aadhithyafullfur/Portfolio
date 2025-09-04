import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react'; // Install via: npm install lucide-react

const certifications = [
  {
    name: 'Microsoft Certified Azure',
    issuer: 'Microsoft',
    date: '2025',
    image: '/logos/Azurec.png',
    link: 'https://learn.microsoft.com/api/credentials/share/en-us/AadhithyaRathakrishnan-2485/3A148A2CC1C4885B?sharingId=A3E87E7F64D87709',
    platformIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-purple-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect x="3" y="3" width="8" height="8" fill="currentColor" />
        <rect x="13" y="3" width="8" height="8" fill="currentColor" opacity="0.6" />
        <rect x="3" y="13" width="8" height="8" fill="currentColor" opacity="0.4" />
        <rect x="13" y="13" width="8" height="8" fill="currentColor" opacity="0.2" />
      </svg>
    ),
  },
  {
    name: 'IBM Cloud Computing',
    issuer: 'IBM',
    date: '2025',
    image: '/logos/cloudcp.png',
    link: 'https://coursera.org/share/b6cc2190ce858cb83c5533327566a7f4', // Coursera link
    platformIcon: (
      <span className="font-bold text-purple-400 text-lg">IBM</span>
    ),
  },
  {
    name: 'IBM Software Engineering',
    issuer: 'IBM',
    date: '2024',
    image: '/logos/sfc.png',
    link: 'https://coursera.org/share/d04fcf8da15db8d2c3f64afe3fdf200e', // Coursera link
    platformIcon: (
      <span className="font-bold text-purple-400 text-lg">IBM</span>
    ),
  },
];

function Certifications() {
  return (
    <div className="container py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-purple-400 text-center mb-16 tracking-wide"
      >
        My Certifications
      </motion.h2>

      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="glass bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-md flex justify-between items-center hover:shadow-purple-400/30 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              {/* Platform Icon */}
              <div>{cert.platformIcon}</div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {cert.name}
                </h3>
                <p className="text-sm md:text-base text-gray-300 mt-1">
                  Issued by <span className="text-gray-100">{cert.issuer}</span>
                </p>
                <p className="text-sm md:text-base text-gray-400">
                  Year: {cert.date}
                </p>
              </div>
            </div>

            <a
              href={cert.link ? cert.link : cert.image} // Prefer link, fallback to image
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 p-2 rounded-full transition hover:scale-110"
              title="View Certificate"
            >
              <Eye className="w-6 h-6" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Certifications;
