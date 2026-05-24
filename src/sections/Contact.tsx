import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  detail: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const socials: SocialLink[] = [
    {
      name: "Email",
      icon: <Mail size={16} />,
      url: "mailto:ashu@example.com",
      detail: "ashu@example.com"
    },
    {
      name: "GitHub",
      icon: <Github size={16} />,
      url: "https://github.com",
      detail: "github.com/ashu"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={16} />,
      url: "https://linkedin.com",
      detail: "linkedin.com/in/ashu"
    },
    {
      name: "Twitter / X",
      icon: <Twitter size={16} />,
      url: "https://twitter.com",
      detail: "@ashubuilds"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative min-h-screen w-full bg-black py-24 px-6 overflow-hidden">
      {/* Dynamic background radial light source */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#DEDBC8]/5 blur-[120px] pointer-events-none" />

      {/* Grid columns guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-[#DEDBC8]/5 pointer-events-none" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-[#DEDBC8]/5 pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto z-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Heading and Links */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xs uppercase tracking-[0.25em] text-[#DEDBC8] block mb-3 font-sans"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-[#E1E0CC] leading-[1.1] font-serif mb-8"
            >
              Let’s build something <span className="font-serif italic text-[#DEDBC8]">meaningful</span>.
            </motion.h2>

            {/* Social Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -3, borderColor: 'rgba(222, 219, 200, 0.3)' }}
                  className="glass-panel p-4 rounded-xl border border-[#DEDBC8]/10 flex flex-col justify-between h-28 group transition-all duration-300"
                >
                  <div className="text-gray-400 group-hover:text-[#DEDBC8] transition-colors">
                    {social.icon}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-sans mb-0.5">
                      {social.name}
                    </div>
                    <div className="text-xs text-[#E1E0CC] font-sans truncate font-medium">
                      {social.detail}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Animated Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:col-span-7 glass-panel-elevated p-8 md:p-10 rounded-2xl border border-[#DEDBC8]/10 w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2 font-sans">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-[#DEDBC8]/15 rounded-lg px-4 py-3 text-sm text-[#E1E0CC] transition-all font-sans"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2 font-sans">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-[#DEDBC8]/15 rounded-lg px-4 py-3 text-sm text-[#E1E0CC] transition-all font-sans"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2 font-sans">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-[#DEDBC8]/15 rounded-lg px-4 py-3 text-sm text-[#E1E0CC] transition-all font-sans resize-none"
                  placeholder="Describe your project or just say hi..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex items-center justify-center gap-2 py-3.5 text-xs tracking-widest uppercase font-sans font-bold text-black bg-[#E1E0CC] rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(222,219,200,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : isSent ? (
                  <span>Message Sent Successfully!</span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </span>
                )}
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
export default Contact;
