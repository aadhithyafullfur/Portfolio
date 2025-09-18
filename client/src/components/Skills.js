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
    <div className="container mx-auto px-4">
      {/* Title */}
      <motion.h2
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 text-left max-w-max"
      >
        Skills & Expertise
      </motion.h2>

      {/* Skill Categories in responsive grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-7xl mx-auto"
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`p-4 sm:p-5 rounded-xl cursor-pointer border text-center transition-all duration-300 h-full
              ${
                activeCategory === index
                  ? 'border-purple-500 bg-purple-900/20'
                  : 'border-gray-700 hover:bg-gray-800/30'
              }`}
            onClick={() => setActiveCategory(index === activeCategory ? null : index)}
            whileHover={{ y: -3, boxShadow: '0 5px 15px rgba(128, 90, 213, 0.3)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-purple-400 mb-2 sm:mb-3">{category.title}</h3>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 sm:px-3 py-1 bg-gray-700 rounded-full text-xs sm:text-sm text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{category.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Description below */}
      <p className="text-sm sm:text-lg text-gray-300 max-w-4xl mx-auto mb-12 sm:mb-16 text-center px-4 leading-relaxed">
        I specialize in full-stack development and machine learning, crafting responsive web apps and predictive models with modern languages and tools.
      </p>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-2xl sm:text-3xl font-semibold text-purple-400 text-center mb-6 sm:mb-8">
          Technology Stack
        </h3>
        
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
        
        {/* Mobile: Professional Grid Layout */}
        <div className="block md:hidden">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 max-w-md mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-3 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/30">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-6 h-6 object-contain filter brightness-110"
                    />
                  </div>
                  <span className="text-xs text-gray-300 font-medium text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
                
                {/* Subtle hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700 max-w-md mx-auto"
          >
            <p className="text-sm text-gray-300 text-center leading-relaxed">
              Experienced in <span className="text-purple-400 font-semibold">{skills.length}+ technologies</span> including modern web frameworks, cloud platforms, and development tools.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Skills;
