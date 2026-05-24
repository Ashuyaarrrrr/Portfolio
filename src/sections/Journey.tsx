import React from 'react';
import { motion } from 'framer-motion';

interface JourneyItem {
  title: string;
  description: string;
  period: string;
}

const journeyItems: JourneyItem[] = [
  {
    title: "Started Learning Development",
    description: "Dived into core languages (HTML, CSS, JavaScript) to learn programming basics, algorithm concepts, and how the web functions.",
    period: "2024 • Beginning"
  },
  {
    title: "Built First Deployed App",
    description: "Constructed interactive multi-page React components and deployed them to Vercel. Learned the Git flow and repository structures.",
    period: "2024 • Mid"
  },
  {
    title: "Started Shipping Projects",
    description: "Shifted focus to shipping fast. Created local business sites, custom utilities, and web layouts while integrating Tailwind styling libraries.",
    period: "2024 • End"
  },
  {
    title: "Learning Full-Stack Systems",
    description: "Enriched projects with backends using Firebase (Authentication, Firestore Database) and Node.js. Deepened responsive UI mechanics.",
    period: "2025 • Present"
  },
  {
    title: "Preparing for Internships & Freelancing",
    description: "Applying full-stack development, database patterns, and speed shipping to solve client problems and internship challenges.",
    period: "Upcoming"
  }
];

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="relative min-h-screen w-full bg-black py-24 px-6 overflow-hidden">
      {/* Structural layout grid lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-[#DEDBC8]/5 pointer-events-none" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-[#DEDBC8]/5 pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto z-20 relative">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.25em] text-[#DEDBC8] block mb-3 font-sans"
          >
            Chronology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-[#E1E0CC]"
          >
            From student to builder.
          </motion.h2>
        </div>

        {/* Timeline body */}
        <div className="relative">
          
          {/* Vertical glowing timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-[0.5px] bg-gradient-to-b from-transparent via-[#DEDBC8]/30 to-transparent" />

          {/* Timeline Nodes */}
          <div className="space-y-12 md:space-y-20">
            {journeyItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="flex flex-col md:flex-row relative">
                  
                  {/* Timeline Dot Indicator */}
                  <div className="absolute left-4 md:left-1/2 w-3.5 h-3.5 rounded-full bg-[#000000] border-2 border-[#DEDBC8] -translate-x-[6.5px] top-1.5 z-10 shadow-[0_0_12px_#DEDBC8]" />

                  {/* Left spacer / element (desktop) */}
                  <div className={`hidden md:block w-1/2 ${isEven ? 'pr-12 text-right' : 'pl-12 order-last'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      >
                        <span className="text-xs tracking-widest text-[#DEDBC8]/70 font-sans block mb-2 font-semibold">
                          {item.period}
                        </span>
                        <h3 className="text-lg font-bold text-[#E1E0CC] mb-2 font-sans">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-sans leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Right element / mobile fallback */}
                  <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${isEven ? 'md:order-last' : 'md:pl-12'}`}>
                    {/* Render card either on left/right for mobile/desktop layout */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      className="glass-panel p-6 rounded-2xl border border-[#DEDBC8]/10"
                    >
                      <span className="text-[10px] tracking-widest text-[#DEDBC8]/70 font-sans block mb-2 font-semibold md:hidden">
                        {item.period}
                      </span>
                      <h3 className="text-base font-bold text-[#E1E0CC] mb-2 font-sans md:hidden">
                        {item.title}
                      </h3>
                      {!isEven && (
                        <div className="hidden md:block">
                          <span className="text-xs tracking-widest text-[#DEDBC8]/70 font-sans block mb-2 font-semibold">
                            {item.period}
                          </span>
                          <h3 className="text-lg font-bold text-[#E1E0CC] mb-2 font-sans">
                            {item.title}
                          </h3>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
export default Journey;
