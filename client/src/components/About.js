import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ScrollFloat from './Scrollfloat';

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
        className="glass p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl max-w-7xl mx-auto mt-6 sm:mt-10 md:mt-12 lg:mt-16 shadow-2xl backdrop-blur-md"
        style={{ perspective: '1000px' }}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Professional Avatar Section */}
          <motion.div
            className="relative w-36 h-36 xs:w-44 xs:h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 group mx-auto lg:mx-0 flex-shrink-0"
            initial={{ opacity: 0, x: -20, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{ scale: 1.02, rotate: 0.5 }}
          >
            <div
              className="w-full h-full bg-cover bg-center rounded-full border-3 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-float bg-gradient-to-br from-gray-900 to-black"
              style={{
                backgroundImage: "url('/images/bitmoji.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-purple-500/15 blur-lg z-[-1] group-hover:bg-purple-500/25 transition-all duration-300" />
          </motion.div>

          {/* Right Section */}
          <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8 text-text-main px-2 sm:px-0">
            {/* Animated Heading */}
            <ScrollFloat
              containerClassName="text-center lg:text-left mb-3 sm:mb-4"
              textClassName="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-400 leading-tight"
              animationDuration={1.2}
              stagger={0.05}
              scrollStart="top bottom-=20%"
              scrollEnd="bottom center"
            >
              About Me
            </ScrollFloat>

            {/* Professional Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-3 sm:p-4 md:p-5 rounded-xl border-l-4 border-purple-500">
                <ScrollFloat
                  containerClassName=""
                  textClassName="text-sm sm:text-base md:text-lg font-medium text-gray-200 leading-relaxed"
                  animationDuration={0.8}
                  stagger={0.02}
                  scrollStart="top bottom-=15%"
                >
                  Hello! I'm Aadhithya R, from Erode, Tamil Nadu.
                </ScrollFloat>
              </div>
              
              <div className="bg-gradient-to-r from-gray-800/30 to-transparent p-3 sm:p-4 md:p-5 rounded-xl border border-gray-700/30">
                <ScrollFloat
                  containerClassName="mb-2 sm:mb-3"
                  textClassName="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base"
                  animationDuration={1.0}
                  stagger={0.015}
                  scrollStart="top bottom-=10%"
                >
                  Aspiring Full Stack Developer, Machine Learning Enthusiast, and skilled Data Analyst with comprehensive expertise in building scalable web applications, implementing intelligent AI solutions, and extracting actionable insights from complex datasets.
                </ScrollFloat>
                <ScrollFloat
                  containerClassName=""
                  textClassName="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base"
                  animationDuration={0.8}
                  stagger={0.012}
                  scrollStart="top bottom-=5%"
                >
                  Proficient in data visualization, statistical analysis, and predictive modeling. Passionate about transforming raw data into meaningful business intelligence while integrating cutting-edge AI technologies to deliver innovative, data-driven solutions for dynamic organizations.
                </ScrollFloat>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30">Full-Stack Developer</span>
                <span className="px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30">Data Analyst</span>
                <span className="px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30">ML Engineer</span>
                <span className="px-3 py-1.5 bg-blue-600/20 text-blue-300 rounded-full text-xs sm:text-sm font-medium border border-blue-500/30">AI Specialist</span>
                <span className="px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30">Artist</span>
                <span className="px-3 py-1.5 bg-green-600/20 text-green-300 rounded-full text-xs sm:text-sm font-medium border border-green-500/30">Athlete</span>
              </div>
            </motion.div>

            {/* Professional Background */}
            <div className="w-full max-w-3xl">
              {/* Education Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="glass p-5 sm:p-6 rounded-xl shadow-lg border border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-transparent"
              >
                <div className="flex items-center mb-4 sm:mb-5">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-3 sm:mr-4"></div>
                  <ScrollFloat
                    containerClassName="flex-1"
                    textClassName="text-xl sm:text-2xl font-bold text-purple-400"
                    animationDuration={0.8}
                    stagger={0.03}
                    scrollStart="top bottom-=10%"
                  >
                    Education & Background
                  </ScrollFloat>
                </div>
                
                <div className="space-y-3">
                  <div className="border-l-4 border-purple-500/60 pl-4 bg-gradient-to-r from-purple-500/8 to-transparent p-4 rounded-r-xl">
                    <ScrollFloat
                      containerClassName="mb-1"
                      textClassName="text-white font-bold text-base sm:text-lg"
                      animationDuration={0.6}
                      stagger={0.02}
                      scrollStart="top bottom-=5%"
                    >
                      B.Tech - Artificial Intelligence & Data Science
                    </ScrollFloat>
                    <ScrollFloat
                      containerClassName="mb-1"
                      textClassName="text-purple-300 font-semibold text-sm sm:text-base"
                      animationDuration={0.5}
                      stagger={0.015}
                      scrollStart="top bottom"
                    >
                      Kongu Engineering College
                    </ScrollFloat>
                    <ScrollFloat
                      containerClassName="mb-1"
                      textClassName="text-gray-300 text-xs sm:text-sm"
                      animationDuration={0.4}
                      stagger={0.01}
                      scrollStart="top bottom+=5%"
                    >
                      2023 – 2027 | Current Student
                    </ScrollFloat>
                    <ScrollFloat
                      containerClassName=""
                      textClassName="text-gray-400 text-xs sm:text-sm"
                      animationDuration={0.5}
                      stagger={0.01}
                      scrollStart="top bottom+=10%"
                    >
                      Specializing in Machine Learning, Deep Learning, Data Analytics & Full-Stack Development
                    </ScrollFloat>
                  </div>
                  
                  <div className="border-l-4 border-blue-500/40 pl-4 bg-gradient-to-r from-blue-500/5 to-transparent p-3 rounded-r-xl">
                    <ScrollFloat
                      containerClassName="mb-1"
                      textClassName="text-white font-semibold text-sm sm:text-base"
                      animationDuration={0.5}
                      stagger={0.015}
                      scrollStart="top bottom-=5%"
                    >
                      Higher Secondary Education (HSC)
                    </ScrollFloat>
                    <ScrollFloat
                      containerClassName="mb-1"
                      textClassName="text-blue-300 font-medium text-xs sm:text-sm"
                      animationDuration={0.4}
                      stagger={0.01}
                      scrollStart="top bottom"
                    >
                      PKD Matriculation Hr. Sec. School, Pollachi
                    </ScrollFloat>
                    <ScrollFloat
                      containerClassName=""
                      textClassName="text-gray-300 text-xs"
                      animationDuration={0.3}
                      stagger={0.01}
                      scrollStart="top bottom+=5%"
                    >
                      2021 – 2023
                    </ScrollFloat>
                  </div>
                  
                  <div className="border-l-4 border-green-500/40 pl-4 bg-gradient-to-r from-green-500/5 to-transparent p-3 rounded-r-xl">
                    <ScrollFloat
                      containerClassName="mb-1"
                      textClassName="text-white font-semibold text-sm sm:text-base"
                      animationDuration={0.5}
                      stagger={0.015}
                      scrollStart="top bottom-=5%"
                    >
                      Secondary School Leaving Certificate (SSLC)
                    </ScrollFloat>
                    <ScrollFloat
                      containerClassName="mb-1"
                      textClassName="text-green-300 font-medium text-xs sm:text-sm"
                      animationDuration={0.4}
                      stagger={0.01}
                      scrollStart="top bottom"
                    >
                      PKD Model Matriculation Higher Secondary School, Pollachi
                    </ScrollFloat>
                    <ScrollFloat
                      containerClassName=""
                      textClassName="text-gray-300 text-xs"
                      animationDuration={0.3}
                      stagger={0.01}
                      scrollStart="top bottom+=5%"
                    >
                      2020 – 2021
                    </ScrollFloat>
                  </div>
                </div>

                {/* Skills & Interests Section */}
                <div className="mt-6 pt-5 border-t border-purple-500/20">
                  <ScrollFloat
                    containerClassName="mb-4"
                    textClassName="text-lg sm:text-xl font-bold text-purple-400 flex items-center"
                    animationDuration={0.6}
                    stagger={0.02}
                    scrollStart="top bottom-=5%"
                  >
                    Technical Expertise & Personal Interests
                  </ScrollFloat>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Technical Skills */}
                    <div className="bg-gradient-to-r from-purple-500/8 to-transparent p-4 rounded-xl border border-purple-500/20">
                      <ScrollFloat
                        containerClassName="mb-2"
                        textClassName="text-white font-semibold text-sm sm:text-base"
                        animationDuration={0.5}
                        stagger={0.015}
                        scrollStart="top bottom"
                      >
                        Data Analytics & Visualization
                      </ScrollFloat>
                      <ScrollFloat
                        containerClassName=""
                        textClassName="text-gray-300 text-xs sm:text-sm leading-relaxed"
                        animationDuration={0.4}
                        stagger={0.01}
                        scrollStart="top bottom+=5%"
                      >
                        Proficient in statistical analysis, data mining, and creating compelling visualizations using Python, R, and advanced analytics tools. Experience in transforming complex datasets into actionable business insights.
                      </ScrollFloat>
                    </div>

                    {/* Personal Interests */}
                    <div className="bg-gradient-to-r from-purple-500/8 to-transparent p-4 rounded-xl border border-purple-500/20">
                      <ScrollFloat
                        containerClassName="mb-2"
                        textClassName="text-white font-semibold text-sm sm:text-base"
                        animationDuration={0.5}
                        stagger={0.015}
                        scrollStart="top bottom"
                      >
                        Creative Arts & Athletics
                      </ScrollFloat>
                      <ScrollFloat
                        containerClassName=""
                        textClassName="text-gray-300 text-xs sm:text-sm leading-relaxed"
                        animationDuration={0.4}
                        stagger={0.01}
                        scrollStart="top bottom+=5%"
                      >
                        Passionate artist with creative expression through various mediums, and dedicated badminton player. These pursuits enhance creativity, strategic thinking, and maintain work-life balance while fostering innovative problem-solving approaches.
                      </ScrollFloat>
                    </div>
                  </div>
                </div>
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
