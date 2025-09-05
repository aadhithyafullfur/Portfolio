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
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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

      {/* Skill Categories in horizontal "sleeping line" */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex space-x-6 overflow-x-auto no-scrollbar pb-6"
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`min-w-[260px] p-5 rounded-xl cursor-pointer border text-center transition-all duration-300
              ${
                activeCategory === index
                  ? 'border-purple-500 bg-purple-900/20'
                  : 'border-gray-700 hover:bg-gray-800/30'
              }`}
            onClick={() => setActiveCategory(index === activeCategory ? null : index)}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(128, 90, 213, 0.5)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-3">{category.title}</h3>
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-gray-300 whitespace-normal">{category.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Description below */}
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-16 text-center">
        I specialize in full-stack development and machine learning, crafting responsive web apps and predictive models with modern languages and tools.
      </p>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-3xl font-semibold text-purple-400 text-center mb-8">
          Technology Stack
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="w-20 h-20 rounded-xl border border-gray-700 bg-gray-800 flex items-center justify-center transition-transform"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.img
                src={skill.icon}
                alt={skill.name}
                className="w-10 h-10 object-contain"
                whileHover={{ rotate: 10, scale: 1.2 }}
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
