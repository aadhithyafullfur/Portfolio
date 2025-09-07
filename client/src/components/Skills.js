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
    { icon: '/logos/express.png', name: 'Express.js' },
    { icon: '/logos/mongodb.png', name: 'MongoDB' },
    { icon: '/logos/git.png', name: 'Git' },
    { icon: '/logos/azure.png', name: 'Azure' },
    { icon: '/logos/canva.png', name: 'Canva' },
  ];

  const skillCategories = [
    {
      title: "Frontend Engineering",
      skills: ["React", "JavaScript", "HTML5", "CSS3"],
      description: "Expertise in building modern, performant, and accessible user interfaces using React and the latest web standards. Strong focus on responsive design, UI/UX best practices, and seamless user experiences."
    },
    {
      title: "Backend & API Development",
      skills: ["Node.js", "Express.js", "Python", "Java"],
      description: "Proficient in architecting scalable server-side applications, RESTful APIs, and microservices. Experienced with authentication, business logic, and integration of third-party services."
    },
    {
      title: "Database & Cloud Solutions",
      skills: ["MongoDB", "Azure"],
      description: "Skilled in designing and managing NoSQL databases, cloud deployments, and DevOps workflows. Focused on reliability, security, and scalability for production environments."
    },
    {
      title: "Collaboration & Design Tools",
      skills: ["Git", "Canva"],
      description: "Adept with version control, agile collaboration, and visual design tools to streamline development and deliver polished products."
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
      {/* Section Intro */}
      <motion.h2
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 text-left max-w-max"
      >
        Skills & Expertise
      </motion.h2>
      <p className="text-base sm:text-lg text-gray-300 max-w-3xl mb-8 sm:mb-10 text-left leading-relaxed">
        I bring a holistic approach to software engineering, blending strong technical skills with a passion for clean code, scalable architecture, and user-centric design. My expertise spans the full stack, from crafting beautiful interfaces to deploying robust cloud solutions.
      </p>

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
            className={`p-5 sm:p-6 rounded-2xl cursor-pointer border text-center shadow-md transition-all duration-300 h-full
              ${
                activeCategory === index
                  ? 'border-purple-500 bg-gradient-to-br from-purple-900/40 to-pink-900/20 shadow-lg'
                  : 'border-gray-700 hover:bg-gray-800/30'
              }`}
            onClick={() => setActiveCategory(index === activeCategory ? null : index)}
            whileHover={{ y: -3, boxShadow: '0 5px 15px rgba(128, 90, 213, 0.3)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-purple-400 mb-2 sm:mb-3 tracking-wide uppercase">{category.title}</h3>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 sm:px-3 py-1 bg-gray-700 rounded-full text-xs sm:text-sm text-gray-200 font-medium tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">{category.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Professional Summary */}
      <p className="text-sm sm:text-lg text-gray-300 max-w-4xl mx-auto mb-12 sm:mb-16 text-center px-4 leading-relaxed">
        My commitment to continuous learning and cross-functional teamwork enables me to deliver high-quality solutions that drive business value and delight users.
      </p>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-2xl sm:text-3xl font-semibold text-purple-400 text-center mb-6 sm:mb-8 tracking-wide">
          Technology Stack
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl border border-gray-700 bg-gray-800 flex items-center justify-center transition-transform hover:border-purple-500 shadow-sm"
              whileHover={{ scale: 1.08 }}
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
