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
          {/* Animated Avatar */}
          <motion.div
            className="relative w-56 h-56 group"
            initial={{ opacity: 0, x: -20, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{ scale: 1.06, rotate: 2 }}
          >
            <div
              className="w-full h-full bg-cover bg-center rounded-full border-4 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-float"
              style={{
                backgroundImage: "url('/images/bitmoji.png')",
              }}
            />
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-30 blur-3xl z-[-1] group-hover:opacity-50 group-hover:blur-2xl transition-all duration-300" />
          </motion.div>

          {/* Right Section */}
          <div className="flex-1 space-y-8 text-text-main">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, x: -20, rotateX: -15 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl font-extrabold text-red-400"
            >
              About<span className="text-white"> Me</span>
            </motion.h2>

            {/* Personal Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base leading-relaxed space-y-4 text-gray-200"
            >
              <p>
                Hello, my name is <span className="font-semibold text-white">Aadhithya R</span>, 
                from Perundurai, Erode. I’m an enthusiastic learner with a deep interest 
                in <span className="text-white font-semibold">Artificial Intelligence Engineering</span> 
                and <span className="text-white font-semibold">MERN stack development</span>.
              </p>
              <p>
                I enjoy exploring how intelligent systems can solve real-world problems 
                and how full-stack development can bring innovative ideas to life. 
                My curiosity drives me to continuously learn, experiment, and improve.
              </p>
              <p>
                I believe in collaboration, knowledge sharing, and personal growth. 
                Alongside academics, I also like exploring technology trends, problem-solving, 
                and building creative solutions.
              </p>
            </motion.div>

            {/* Education & Achievements */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateY: 15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="glass p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-500 border border-gray-600"
              >
                <h3 className="text-xl font-semibold text-red-400 mb-3">🎓 Education</h3>
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
                <h3 className="text-xl font-semibold text-red-400 mb-3">🏆 Achievements</h3>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li><strong>Best Implementation Award</strong> – BYTS India Hackathon 2025</li>
                  <li><strong>Microsoft Certified:</strong> Azure International Certificate (2025)</li>
                  <li><strong>LeetCode:</strong> Solved over 150+ coding problems</li>
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
