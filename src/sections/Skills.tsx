import React from 'react';
import { motion } from 'framer-motion';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Firebase"]
  },
  {
    title: "Tools & Git",
    skills: ["GitHub", "Git", "NPM"]
  },
  {
    title: "Deployment",
    skills: ["Vercel", "Firebase Hosting"]
  }
];

export const Skills: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  // Orbital positions configuration (desktop visualization)
  const ring1 = [
    { name: "React", angle: 0 },
    { name: "Firebase", angle: 120 },
    { name: "Node.js", angle: 240 }
  ];

  const ring2 = [
    { name: "TypeScript", angle: 0 },
    { name: "Tailwind", angle: 60 },
    { name: "Framer Motion", angle: 120 },
    { name: "Express", angle: 180 },
    { name: "GitHub", angle: 240 },
    { name: "Vercel", angle: 300 }
  ];

  return (
    <section id="skills" className="relative min-h-screen w-full bg-black py-24 px-6 overflow-hidden">
      {/* Background soft lighting */}
      <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] rounded-full bg-[#DEDBC8]/5 blur-[130px] pointer-events-none" />

      {/* Grid line guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-[#DEDBC8]/5 pointer-events-none" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-[#DEDBC8]/5 pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto z-20 relative">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.25em] text-[#DEDBC8] block mb-3 font-sans"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-[#E1E0CC]"
          >
            Technical Stack
          </motion.h2>
        </div>

        {/* Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Skill Stacks */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-panel p-6 rounded-2xl border border-[#DEDBC8]/10 hover:border-[#DEDBC8]/20 transition-all duration-300"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#DEDBC8] mb-4 font-sans border-b border-[#DEDBC8]/10 pb-2">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#E1E0CC]/80 bg-[#1A1A1A] border border-[#DEDBC8]/5 px-3 py-1.5 rounded-full hover:border-[#DEDBC8]/30 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: Dynamic Orbit Visualizer (Desktop only) */}
          <div className="hidden lg:col-span-6 lg:flex justify-center items-center h-[500px] relative">
            <div className="w-[450px] h-[450px] relative flex justify-center items-center">
              
              {/* Outer Orbit Path Ring */}
              <div className="absolute w-[360px] h-[360px] border border-[#DEDBC8]/5 rounded-full" />
              
              {/* Inner Orbit Path Ring */}
              <div className="absolute w-[200px] h-[200px] border border-[#DEDBC8]/5 rounded-full" />

              {/* Center Hub */}
              <div className="w-20 h-20 rounded-full glass-panel border border-[#DEDBC8]/25 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(222,219,200,0.1)]">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#DEDBC8] font-sans">
                  Build
                </span>
              </div>

              {/* Ring 1 - Inner Ring Orbit Nodes */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute w-[200px] h-[200px] flex items-center justify-center"
              >
                {ring1.map((node, idx) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 100;
                  const y = Math.sin(rad) * 100;
                  return (
                    <motion.div
                      key={idx}
                      className="absolute px-3 py-1.5 rounded-full glass-panel border border-[#DEDBC8]/15 text-xs text-[#E1E0CC] cursor-default font-sans text-center"
                      style={{ x, y }}
                    >
                      {/* Counter-rotation to keep the text horizontal */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                      >
                        {node.name}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Ring 2 - Outer Ring Orbit Nodes */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="absolute w-[360px] h-[360px] flex items-center justify-center"
              >
                {ring2.map((node, idx) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 180;
                  const y = Math.sin(rad) * 180;
                  return (
                    <motion.div
                      key={idx}
                      className="absolute px-3.5 py-1.5 rounded-full glass-panel border border-[#DEDBC8]/10 text-xs text-gray-400 cursor-default font-sans"
                      style={{ x, y }}
                    >
                      {/* Counter-rotation to keep the text horizontal */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                      >
                        {node.name}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
export default Skills;
