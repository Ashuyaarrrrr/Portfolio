import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  // Physics-based spring values for parallax
  const xSpring = useSpring(0, { stiffness: 80, damping: 30 });
  const ySpring = useSpring(0, { stiffness: 80, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      xSpring.set(x * 50);
      ySpring.set(y * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [xSpring, ySpring]);

  const nameLetters = "Ashu".split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 150, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const textFadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const buttonFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center bg-black overflow-hidden px-6 pt-32 pb-12 select-none"
    >
      {/* Animated gradient mesh background */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          x: xSpring,
          y: ySpring,
          background: `
            radial-gradient(circle at 20% 20%, rgba(222, 219, 200, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(26, 26, 26, 0.8) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(222, 219, 200, 0.04) 0%, transparent 60%)
          `
        }}
      />

      {/* Decorative vertical lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#DEDBC8]/5 to-transparent pointer-events-none" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#DEDBC8]/5 to-transparent pointer-events-none" />

      {/* Spacing alignment */}
      <div className="flex-1 flex flex-col justify-center items-center text-center w-full max-w-5xl z-20">
        
        {/* Main large heading "Ashu" */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex overflow-hidden pb-4"
        >
          {nameLetters.map((letter, idx) => (
            <motion.h1
              key={idx}
              variants={letterVariants}
              className="text-[26vw] md:text-[18vw] leading-none font-serif font-normal text-gradient tracking-tight"
            >
              {letter}
            </motion.h1>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          variants={textFadeIn}
          initial="hidden"
          animate="visible"
          className="text-base md:text-xl tracking-[0.25em] uppercase font-sans text-[#DEDBC8]/80 mb-6 font-medium"
        >
          Full Stack Developer & Builder
        </motion.h2>

        {/* Short bio statement */}
        <motion.p
          variants={textFadeIn}
          initial="hidden"
          animate="visible"
          className="text-sm md:text-base text-gray-400 font-sans max-w-xl leading-relaxed mb-10 text-center"
        >
          I build modern web experiences, mobile-first products, and scalable digital systems while balancing engineering, fitness, and discipline.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          variants={buttonFadeIn}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4"
        >
          <a
            href="#projects"
            className="group relative flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto text-xs tracking-widest uppercase font-sans font-semibold text-black bg-[#E1E0CC] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(222,219,200,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 ease-cinematic" />
            </span>
          </a>

          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto text-xs tracking-widest uppercase font-sans font-semibold text-[#E1E0CC] border border-[#DEDBC8]/25 rounded-full hover:bg-[#E1E0CC]/5 hover:border-[#DEDBC8]/60 transition-all duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Floating scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="z-20 flex flex-col items-center gap-2 cursor-pointer pointer-events-none mt-8"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
export default Hero;
