import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onLoadComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1800; // total animation time in ms
    const intervalTime = 15;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Cinematic slow down at the end
      const easeProgress = 1 - Math.pow(1 - progress, 3); 
      const currentVal = Math.min(Math.floor(easeProgress * 100), 100);
      setCount(currentVal);

      if (step >= totalSteps) {
        clearInterval(timer);
        // Small delay to admire the full 100
        setTimeout(() => {
          onLoadComplete();
        }, 250);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -100, 
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000]"
    >
      <div className="w-full max-w-xs px-8 flex flex-col items-center">
        {/* Subtle branding or section label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#E1E0CC] mb-8 text-center"
        >
          Ashu / Portfolio Init
        </motion.div>

        {/* Counter */}
        <div className="relative h-20 overflow-hidden flex items-center justify-center">
          <motion.div
            key={count}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-serif font-light text-[#E1E0CC]"
          >
            {count.toString().padStart(3, '0')}
          </motion.div>
        </div>

        {/* Slider bar */}
        <div className="w-full h-[1px] bg-[#DEDBC8]/10 mt-6 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#DEDBC8]"
            style={{ width: `${count}%`, boxShadow: '0 0 10px #DEDBC8' }}
          />
        </div>
      </div>
    </motion.div>
  );
};
export default Loader;
