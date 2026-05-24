import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Journey', href: '#journey' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section intersection observer fallback
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let current = '';

      for (const item of navItems) {
        const el = document.querySelector(item.href) as HTMLElement | null;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = item.href;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav
        className={`flex items-center justify-between w-full max-w-4xl px-6 py-3 transition-all duration-700 rounded-full border ${
          isScrolled
            ? 'glass-panel-elevated py-2.5 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-[#DEDBC8]/15'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="text-xl font-bold font-serif tracking-wider text-[#E1E0CC] hover:text-[#DEDBC8] transition-colors">
          ASHU<span className="text-[#DEDBC8]">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className="relative px-4 py-1.5 text-xs tracking-widest uppercase font-sans text-gray-400 hover:text-[#E1E0CC] transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#DEDBC8]/10 border border-[#DEDBC8]/25 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-[#E1E0CC] focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-4 right-4 p-5 glass-panel-elevated rounded-2xl md:hidden flex flex-col gap-3 border border-[#DEDBC8]/15 shadow-2xl"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`py-2 text-sm tracking-widest uppercase font-sans border-b border-[#DEDBC8]/5 hover:text-[#E1E0CC] transition-colors ${
                  activeSection === item.href ? 'text-[#DEDBC8] font-bold' : 'text-gray-400'
                }`}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
