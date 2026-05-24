import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center bg-black py-24 px-6 overflow-hidden"
    >
      {/* Decorative blurry circle */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#DEDBC8]/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="glass-panel-elevated rounded-3xl p-8 md:p-16 border border-[#DEDBC8]/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Card glow flare */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#DEDBC8]/5 blur-3xl pointer-events-none" />

          {/* About label */}
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DEDBC8] mb-6 font-sans"
          >
            About Me
          </motion.span>

          {/* Mixed typography layout */}
          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-6xl font-light tracking-tight text-[#E1E0CC] mb-8 leading-[1.15]"
          >
            I build <span className="font-sans font-medium text-[#E1E0CC]">systems</span>,
            <br />
            <span className="font-serif italic text-[#DEDBC8] font-normal">products</span>,
            <br />
            and <span className="font-serif italic text-[#DEDBC8] font-normal">momentum</span>.
          </motion.h3>

          {/* Narrative Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-400 font-sans leading-relaxed max-w-2xl"
          >
            I'm a second-year engineering student focused on full-stack development, product building, and creating real-world projects that solve practical problems. I enjoy shipping fast, learning through execution, and combining discipline from fitness with technical growth.
          </motion.p>

          {/* Discipline Stats Sub-panel */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#DEDBC8]/10 text-left"
          >
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-medium mb-1 font-sans">
                Core Stack Focus
              </div>
              <div className="text-sm font-semibold text-[#E1E0CC] font-sans">
                React, Node, Firebase
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-medium mb-1 font-sans">
                Philosophy
              </div>
              <div className="text-sm font-semibold text-[#E1E0CC] font-sans">
                Execution Over Theory
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-medium mb-1 font-sans">
                Discipline Anchor
              </div>
              <div className="text-sm font-semibold text-[#E1E0CC] font-sans">
                Hybrid Athlete Training
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default About;
