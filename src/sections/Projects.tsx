import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  visualBg: string; // Gradient class for abstract cinematic visual representation
}

const projects: Project[] = [
  {
    title: "Expense Splitter App",
    description: "A Splitwise-inspired expense management app with real-time balance tracking and settlement management.",
    tech: ["React", "Firebase", "Tailwind", "Vercel"],
    demoUrl: "#",
    githubUrl: "#",
    visualBg: "from-zinc-900 via-[#1A1A1A] to-zinc-950 border-[#DEDBC8]/10"
  },
  {
    title: "Gym Tracker App",
    description: "A mobile-first workout tracking platform with workout planning, set tracking, and progress analytics.",
    tech: ["React", "Firebase", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#",
    visualBg: "from-zinc-950 via-[#101010] to-[#1A1A1A] border-[#DEDBC8]/10"
  },
  {
    title: "Business Landing Page",
    description: "High-converting modern business website built for local brands and startups.",
    tech: ["React", "Framer Motion", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#",
    visualBg: "from-zinc-900 via-[#151515] to-[#1F1F1F] border-[#DEDBC8]/10"
  }
];

export const Projects: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section id="projects" className="relative min-h-screen w-full bg-black py-24 px-6 overflow-hidden">
      {/* Decorative vertical lines extending from hero */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-[#DEDBC8]/5 pointer-events-none" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-[#DEDBC8]/5 pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto z-20 relative">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.25em] text-[#DEDBC8] block mb-3 font-sans"
          >
            Selected Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-[#E1E0CC]"
          >
            Selected Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs md:text-sm font-sans text-gray-400 mt-2 tracking-wider"
          >
            Built fast. Shipped properly.
          </motion.p>
        </div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full group hover:shadow-[0_20px_50px_rgba(222,219,200,0.06)] hover:border-[#DEDBC8]/25 transition-all duration-500 ease-cinematic"
            >
              {/* Cinematic visual placeholder box representing the project UI */}
              <div className={`h-48 w-full bg-gradient-to-br ${project.visualBg} border-b flex flex-col justify-center items-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 ease-cinematic`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(222,219,200,0.03)_0%,transparent_70%)]" />
                {/* Floating graphic representing the project */}
                <div className="border border-[#DEDBC8]/10 bg-black/60 rounded px-4 py-2 font-serif italic text-sm text-[#DEDBC8]/70 tracking-widest backdrop-blur-sm">
                  {project.title.split(" ").slice(0, 2).join(" ")}
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold tracking-wide text-[#E1E0CC] mb-3 font-sans group-hover:text-[#DEDBC8] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] tracking-wider uppercase bg-[#1A1A1A] text-[#DEDBC8]/80 px-2.5 py-1 rounded border border-[#DEDBC8]/5 font-sans"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 items-center justify-between pt-4 border-t border-[#DEDBC8]/5">
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#E1E0CC] transition-colors"
                  >
                    <Github size={14} />
                    Code
                  </a>
                  <a
                    href={project.demoUrl}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#E1E0CC] transition-colors"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Projects;
