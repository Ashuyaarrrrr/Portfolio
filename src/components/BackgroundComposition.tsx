import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const BackgroundComposition: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  // Parallax tracking coordinate vectors
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft cinematic spring physics
  const springConfig = { damping: 90, stiffness: 120, mass: 0.8 };
  const px = useSpring(mouseX, springConfig);
  const py = useSpring(mouseY, springConfig);

  // Layer mappings: Blob layer moves more (55px), streak layer moves less (25px)
  const blobX = useTransform(px, [-0.5, 0.5], [-55, 55]);
  const blobY = useTransform(py, [-0.5, 0.5], [-55, 55]);

  const streakX = useTransform(px, [-0.5, 0.5], [-25, 25]);
  const streakY = useTransform(py, [-0.5, 0.5], [-25, 25]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      // Normalized coordinates from screen center (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize(); // trigger initial checks

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 w-full h-full bg-shifting-gradient z-0 overflow-hidden pointer-events-none select-none">
      
      {/* 1. Animated Glow Blobs Layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ x: isDesktop ? blobX : 0, y: isDesktop ? blobY : 0 }}
      >
        {/* Blob A: Warm Cream */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#DEDBC8]/[0.06] blur-[120px]"
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 40, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob B: Soft Blue */}
        <motion.div
          className="absolute top-[35%] right-[10%] w-[450px] h-[450px] rounded-full bg-blue-500/[0.04] blur-[130px]"
          animate={{
            x: [0, -35, 40, 0],
            y: [0, 45, -30, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob C: Muted Purple */}
        <motion.div
          className="absolute bottom-[15%] left-[20%] w-[480px] h-[480px] rounded-full bg-purple-500/[0.04] blur-[120px]"
          animate={{
            x: [0, 30, -45, 0],
            y: [0, -35, 45, 0],
          }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* 2. Moving Light Streaks Layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ x: isDesktop ? streakX : 0, y: isDesktop ? streakY : 0 }}
      >
        {/* Streak A: Horizontal, Top Half */}
        <motion.div
          className="light-streak w-[280px] top-[30%]"
          animate={{
            left: ['-50%', '150%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Streak B: Diagonal, Bottom Half */}
        <motion.div
          className="light-streak w-[350px] top-[65%] rotate-12"
          animate={{
            right: ['-50%', '150%'],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* 3. Dark Gradient Vignette Overlay (Protects contrast & readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      
    </div>
  );
};

export default BackgroundComposition;
