import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BackgroundWord {
  text: string;
  className: string;
  speed: number;
}

const bgWords: BackgroundWord[] = [
  { text: "DEVELOPER", className: "top-[12%] left-[-5%] bg-word-1", speed: -140 },
  { text: "BUILDER", className: "top-[32%] right-[-10%] bg-word-2", speed: 160 },
  { text: "CREATE", className: "top-[50%] left-[8%] bg-word-3", speed: -90 },
  { text: "DISCIPLINE", className: "top-[68%] right-[8%] bg-word-4", speed: 130 },
  { text: "FULL STACK", className: "top-[82%] left-[-8%] bg-word-5", speed: -170 }
];

interface Particle {
  size: number;
  top: string;
  left: string;
  duration: number;
}

const particles: Particle[] = [
  { size: 4, top: "20%", left: "15%", duration: 12 },
  { size: 6, top: "45%", left: "80%", duration: 18 },
  { size: 3, top: "70%", left: "25%", duration: 15 },
  { size: 5, top: "15%", left: "70%", duration: 10 },
  { size: 4, top: "60%", left: "60%", duration: 20 },
  { size: 6, top: "30%", left: "40%", duration: 14 },
  { size: 3, top: "85%", left: "75%", duration: 16 },
  { size: 5, top: "50%", left: "10%", duration: 22 }
];

export const Hero: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isHoverSupported, setIsHoverSupported] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Physics-based spring values for parallax coordinates
  const xSpring = useSpring(0, { stiffness: 60, damping: 25 });
  const ySpring = useSpring(0, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const checkCapabilities = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsHoverSupported(window.matchMedia('(hover: hover)').matches);
    };

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || prefersReducedMotion || ticking) return;
      
      const hasHover = window.matchMedia('(hover: hover)').matches;
      if (!hasHover) return;

      ticking = true;
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        xSpring.set(x * 50);
        ySpring.set(y * 50);
        ticking = false;
      });
    };

    window.addEventListener('resize', checkCapabilities);
    window.addEventListener('mousemove', handleMouseMove);
    checkCapabilities();

    return () => {
      window.removeEventListener('resize', checkCapabilities);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [xSpring, ySpring, prefersReducedMotion]);

  // GSAP ScrollTrigger Background Text Scrubbing
  useEffect(() => {
    if (prefersReducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      bgWords.forEach((word, idx) => {
        gsap.to(`.bg-word-${idx + 1}`, {
          x: word.speed,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          }
        });
      });
    });

    return () => ctx.revert();
  }, [isDesktop, prefersReducedMotion]);

  // Multi-multiplier coordinates mapping
  const shouldAnimate = isDesktop && isHoverSupported && !prefersReducedMotion;

  const textX = useTransform(xSpring, (val) => shouldAnimate ? val * 0.05 : 0);
  const textY = useTransform(ySpring, (val) => shouldAnimate ? val * 0.05 : 0);

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
      style={{ perspective: 1000 }}
      className="relative min-h-screen w-full flex flex-col justify-between items-center bg-black overflow-hidden px-6 pt-32 pb-12 select-none"
    >
      {/* 1. Animated Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(222,219,200,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(222,219,200,0.012)_1px,transparent_1px)] bg-[size:45px_45px] z-0 pointer-events-none opacity-40" />

      {/* 2. Floating Sparks Particles */}
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-[#DEDBC8] pointer-events-none opacity-[0.15]"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            x: useTransform(xSpring, (val) => isDesktop && !prefersReducedMotion ? val * (p.size * 0.15) : 0),
            y: useTransform(ySpring, (val) => isDesktop && !prefersReducedMotion ? val * (p.size * 0.15) : 0),
          }}
          animate={prefersReducedMotion ? {} : {
            y: [0, -35, 0],
            opacity: [0.12, 0.35, 0.12]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* 3. Scrub-Animated Background Typography */}
      <div className="absolute inset-0 overflow-hidden z-5 pointer-events-none">
        {bgWords.map((word, idx) => (
          <div
            key={idx}
            className={`absolute ${word.className} text-[#E1E0CC]/[0.025] font-black tracking-[0.25em] text-[8vw] md:text-[9vw] font-sans leading-none uppercase whitespace-nowrap`}
          >
            {word.text}
          </div>
        ))}
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#DEDBC8]/5 to-transparent pointer-events-none" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#DEDBC8]/5 to-transparent pointer-events-none" />

      {/* 5. Centered Cinematic Content wrapper */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl z-20 pt-6 pb-6">

        {/* Center Column: Text Content */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="flex flex-col justify-center items-center text-center w-full z-20 pointer-events-auto"
        >
          <div className="w-full flex flex-col items-center">
            {/* Main large heading "Ashu" */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex overflow-hidden pb-4 justify-center"
            >
              {nameLetters.map((letter, idx) => (
                <motion.h1
                  key={idx}
                  variants={letterVariants}
                  className="text-[clamp(4.5rem,24vw,9rem)] lg:text-[clamp(8rem,14vw,14rem)] leading-none font-serif font-normal text-gradient tracking-tight"
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
              className="text-[clamp(0.85rem,3.5vw,1.1rem)] lg:text-xl tracking-[0.25em] uppercase font-sans text-[#DEDBC8]/80 mb-6 font-medium text-center"
            >
              Full Stack Developer & Builder
            </motion.h2>

            {/* Short bio statement */}
            <motion.p
              variants={textFadeIn}
              initial="hidden"
              animate="visible"
              className="text-[clamp(0.85rem,3vw,0.95rem)] lg:text-base text-gray-400 font-sans leading-relaxed mb-10 max-w-xs sm:max-w-md lg:max-w-xl text-center"
            >
              I build modern web experiences, mobile-first products, and scalable digital systems while balancing engineering, fitness, and discipline.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              variants={buttonFadeIn}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center"
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
