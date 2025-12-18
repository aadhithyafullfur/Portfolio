import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import LogoLoop from './LogoLoop';

function Skills() {
  const skills = useMemo(() => [
    { icon: '/logos/c.png', name: 'C' },
    { icon: '/logos/python.png', name: 'Python' },
    { icon: '/logos/java.png', name: 'Java' },
    { icon: '/logos/html.png', name: 'HTML5' },
    { icon: '/logos/css.png', name: 'CSS3' },
    { icon: '/logos/js.png', name: 'JavaScript' },
    { icon: '/logos/react.png', name: 'React' },
    { icon: '/logos/nodejs.png', name: 'Node.js' },
    { icon: '/logos/express.png', name: 'Express' },
    { icon: '/logos/mongodb.png', name: 'MongoDB' },
    { icon: '/logos/git.png', name: 'Git' },
    { icon: '/logos/azure.png', name: 'Azure' },
    { icon: '/logos/canva.png', name: 'Canva' },
  ], []);

  const skillCategories = useMemo(() => [
    {
      title: "Frontend Development",
      skills: ["React", "JavaScript", "HTML5", "CSS3"],
      description: "Building responsive and interactive user interfaces with modern frameworks"
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Express", "Python", "Java"],
      description: "Developing robust server-side applications and RESTful APIs"
    },
    {
      title: "Database & Cloud",
      skills: ["MongoDB", "Azure"],
      description: "Designing scalable database architectures and cloud solutions"
    },
    {
      title: "Tools & Design",
      skills: ["Git", "Canva"],
      description: "Version control, collaboration tools, and design applications"
    }
  ], []);

  const [activeCategory, setActiveCategory] = useState(null);

  const logoArray = useMemo(() => 
    skills.map(skill => ({
      src: skill.icon,
      alt: skill.name,
      title: skill.name
    })),
    [skills]
  );

  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0, x: window.innerWidth <= 768 ? 30 : 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: window.innerWidth <= 768 ? 0.1 : 0.15,
        when: "beforeChildren",
        duration: window.innerWidth <= 768 ? 0.6 : 0.8,
        ease: 'easeOut'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: window.innerWidth <= 768 ? 15 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: window.innerWidth <= 768 ? 0.4 : 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="w-full py-6 sm:py-8 md:py-10 lg:py-12 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: window.innerWidth <= 768 ? 0.15 : 0.2 }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center px-2"
          variants={itemVariants}
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-2 md:mb-3 leading-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-500">Expertise</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Proficient in full-stack development, cloud solutions, and modern web technologies.
          </p>
        </motion.div>

        {/* Skill Categories in Single Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: window.innerWidth <= 768 ? 0.15 : 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-10 sm:mb-12 md:mb-16 lg:mb-20"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-black/40 rounded-xl sm:rounded-2xl border border-purple-500/20 hover:border-purple-500/40 p-4 sm:p-5 md:p-6 transition-all duration-300 backdrop-blur-sm hover:bg-black/50 active:scale-98 h-full flex flex-col"
              whileHover={{ y: -2 }}
            >
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
              
              <h3 className="text-sm xs:text-base sm:text-base md:text-lg font-semibold text-white mb-2 sm:mb-3 relative z-10">{category.title}</h3>
              <p className="text-gray-400 text-xs sm:text-xs md:text-sm mb-3 sm:mb-4 relative z-10 flex-grow">{category.description}</p>
              
              <div className="flex flex-wrap gap-1.5 relative z-10">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-black/40 hover:bg-purple-600/30 text-purple-200 text-xs font-semibold border border-purple-500/20 hover:border-purple-400/50 rounded-md transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-center bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
            Technology Stack
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-8 text-center">
            Tools and frameworks I work with
          </p>
          
          {/* Desktop & Mobile: Animated Logo Loop */}
          <LogoLoop
            logos={logoArray}
            speed={60}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#000000"
            ariaLabel="Technology skills and tools"
            className="py-4"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Skills;

