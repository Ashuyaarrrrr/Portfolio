import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { CursorGlow } from './components/CursorGlow';
import { NoiseOverlay } from './components/NoiseOverlay';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Journey } from './sections/Journey';
import { Contact } from './sections/Contact';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Loading Entrance Screen */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <Loader onLoadComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="relative min-h-screen bg-black overflow-hidden font-sans">
        {/* SVG/CSS Film Grain Noise */}
        <NoiseOverlay />

        {/* Custom Glow Cursor Behind Cards */}
        <CursorGlow />

        {/* Floating Top Nav */}
        <Navbar />

        {/* Sections */}
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Journey />
          <Contact />
        </main>

        {/* Premium Footer */}
        <footer className="relative bg-black py-12 px-6 border-t border-[#DEDBC8]/5 z-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left">
              <span className="text-sm font-serif font-semibold tracking-widest text-[#E1E0CC]">
                ASHU<span className="text-[#DEDBC8]">.</span>
              </span>
              <p className="text-[10px] text-gray-500 font-sans tracking-wide mt-1">
                Full Stack Developer & Builder
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-[10px] text-gray-500 font-sans tracking-widest uppercase">
                © {new Date().getFullYear()} Ashu. All rights reserved.
              </p>
              <p className="text-[9px] text-gray-600 font-sans tracking-wider mt-1">
                Designed for high aesthetics & digital momentum.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
