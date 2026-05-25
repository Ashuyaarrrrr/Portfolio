import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onLoadComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const [count, setCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload critical persona asset
  useEffect(() => {
    const img = new Image();
    img.src = '/persona.png';
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Proceed even on failure to avoid blocking the page load
      setImageLoaded(true);
    };
  }, []);

  // Smooth tick counter aligned to 60fps frame budget (16ms)
  useEffect(() => {
    const duration = 1400; // total duration
    const intervalTime = 16;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Cubic ease-out curve to slow down elegantly towards the end
      const easeProgress = 1 - Math.pow(1 - progress, 3); 
      const currentVal = Math.min(Math.floor(easeProgress * 100), 100);
      setCount(currentVal);

      if (step >= totalSteps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Trigger completion only when both count reaches 100% AND critical assets are cached
  useEffect(() => {
    if (count === 100 && imageLoaded) {
      const delay = setTimeout(() => {
        onLoadComplete();
      }, 150);
      return () => clearTimeout(delay);
    }
  }, [count, imageLoaded, onLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -40, 
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000]"
    >
      <div className="w-full max-w-xs px-8 flex flex-col items-center">
        {/* Subtle branding or section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#E1E0CC] mb-8 text-center"
        >
          Ashu / Portfolio Init
        </motion.div>

        {/* Counter - Stable element, no key, no flickering! */}
        <div className="relative h-16 flex items-center justify-center">
          <span className="text-6xl font-serif font-light text-[#E1E0CC] select-none tracking-wider">
            {count.toString().padStart(3, '0')}
          </span>
        </div>

        {/* Slider bar */}
        <div className="w-full h-[1px] bg-[#DEDBC8]/10 mt-6 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#DEDBC8]"
            style={{ 
              width: `${count}%`, 
              boxShadow: '0 0 10px #DEDBC8',
              transition: 'width 16ms linear' 
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
