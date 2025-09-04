import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

function About() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      rotateX: 0,
      transition: { duration: 1.2, ease: 'easeOut' },
    });
  }, [controls]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50, rotateX: -30 }}
        animate={controls}
        className="glass p-10 rounded-3xl max-w-7xl mx-auto mt-16 shadow-2xl backdrop-blur-md"
        style={{ perspective: '1000px' }}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Animated Bitmoji Avatar */}
          <motion.div
            className="relative w-56 h-56 group"
            initial={{ opacity: 0, x: -20, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{ scale: 1.06, rotate: 2 }}
          >
            <div
              className="w-full h-full bg-cover bg-center rounded-full border-4 border-accent-purple shadow-[0_0_20px_rgba(155,93,229,0.5)] animate-float"
              style={{
                backgroundImage: "url('/images/bitmoji.png')",
              }}
            />
            <div className="absolute inset-0 rounded-full bg-purple-500 opacity-30 blur-3xl z-[-1] group-hover:opacity-50 group-hover:blur-2xl transition-all duration-300" />
          </motion.div>

          {/* Right Section */}
          <div className="flex-1 space-y-8 text-text-main">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, x: -20, rotateX: -15 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl font-extrabold text-accent-purple"
            >
              About<span className="text-white"></span>
            </motion.h2>

            {/* Personal Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base leading-relaxed space-y-4 text-gray-200"
            >
              <p>
                Hello, my name is <span className="font-semibold text-white">Aadhithya R</span>. I’m from Perundurai, Erode. I’m a passionate and curious individual with a deep interest in the field of technology and software development. I enjoy learning new things, exploring creative ideas, and working on meaningful projects.
              </p>
              <p>
                I’m always eager to grow, both personally and professionally, and I believe in continuous learning. I enjoy collaborating with others, sharing knowledge, and contributing to a positive and productive environment.
              </p>
              <p className="text-sm text-gray-400">Thank you for the opportunity to introduce myself.</p>
            </motion.div>

            {/* Professional Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base leading-relaxed text-gray-300"
            >
e at Kongu Engineering College. I’ve built impactful full-stack and machine learning projects like <strong className="text-white">QuikCart</strong> and <strong className="text-white">Traffic Prediction System</strong> using React, Node.js, Flask, and scikit-learn. Certified by Microsoft and IBM, and awarded at <strong className="text-white">BYTS Hackathon 2025</strong>, I’m committed to building intelligent digital solutions and growing as a developer.              I’m currently pursuing a B.Tech in Artificial Intelligence and Data Scienc
            </motion.div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateY: 15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="glass p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-500 border border-gray-600"
              >
                <h3 className="text-xl font-semibold text-accent-purple mb-3">🎓 Education</h3>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li><strong>B.Tech - AI & DS</strong>, Kongu Engineering College (2023–2027)</li>
                  <li><strong>HSC</strong>, PKD Matriculation Hr. Sec. School (2021–2023)</li>
                  <li><strong>SSLC</strong>, PKD Model Matriculation Hr. Sec. School (2020–2021) – 75.50%</li>
                </ul>
              </motion.div>

              {/* Achievements Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateY: 15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="glass p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-500 border border-gray-600"
              >
                <h3 className="text-xl font-semibold text-accent-purple mb-3">🏆 Achievements</h3>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li><strong>Best Implementation Award</strong> – BYTS India Hackathon 2025</li>
                  <li><strong>LeetCode:</strong> Solved over 100+ coding problems</li>
                  <li><strong>Microsoft Certified:</strong> Azure International Certificate (2025)</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Animation CSS */}
      <style>{`
        .animate-float {
          animation: floatImage 4s ease-in-out infinite;
        }
        @keyframes floatImage {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default About;
