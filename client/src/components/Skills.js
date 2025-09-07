import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl border border-gray-700 bg-gray-800 flex items-center justify-center transition-transform hover:border-purple-500"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.img
                src={skill.icon}
                alt={skill.name}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Skills;
