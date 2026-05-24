import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Soft spring config for cinematic delay
  const springConfig = { damping: 50, stiffness: 250, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200); // centers the 400px glow circle
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10 h-[400px] w-[400px] rounded-full opacity-[0.14] blur-[80px] select-none"
      style={{
        x: glowX,
        y: glowY,
        background: 'radial-gradient(circle, #DEDBC8 0%, rgba(222,219,200,0) 70%)',
      }}
    />
  );
};
export default CursorGlow;
