import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LogoLoop from './LogoLoop';

function Skills() {
  const skills = [
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
  ];

  const skillCategories = [
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
  ];

  const [activeCategory, setActiveCategory] = useState(null);

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
    <div className="w-full py-6 sm:py-8 md:py-10 lg:py-12 px-3 xs:px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center px-2">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Expertise</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Proficient in full-stack development, cloud solutions, and modern web technologies.
          </p>
        </div>

        {/* Skill Categories in Single Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-12 sm:mb-16 md:mb-20"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-black/40 rounded-lg border border-white/10 p-5 hover:border-white/20 transition-all duration-300 backdrop-blur-xl hover:bg-black/50 h-full flex flex-col"
              whileHover={{ y: -2 }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/0 to-purple-600/0 group-hover:from-purple-500/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none"></div>
              
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 relative z-10">{category.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4 relative z-10 flex-grow">{category.description}</p>
              
              <div className="flex flex-wrap gap-1.5 relative z-10">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/20 rounded-sm transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
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
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
            Technology Stack
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-8 text-center">
            Tools and frameworks I work with
          </p>
          
          {/* Desktop: Animated Logo Loop */}
          <div className="hidden md:block max-w-6xl mx-auto">
            <LogoLoop
              logos={skills.map(skill => ({
                src: skill.icon,
                alt: skill.name,
                title: skill.name
              }))}
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
          </div>
          
          {/* Mobile: Professional Single Row Scroll */}
          <div className="block md:hidden">
            <div className="overflow-x-auto">
              <div className="flex gap-3 pb-4 min-w-min px-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-black/40 rounded-lg border border-white/10 p-3 hover:border-white/20 transition-all duration-300 backdrop-blur-sm hover:bg-black/50 flex flex-col items-center justify-center flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-8 h-8 object-contain mb-2 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="text-xs text-gray-300 font-medium text-center leading-tight whitespace-nowrap">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Skills;
