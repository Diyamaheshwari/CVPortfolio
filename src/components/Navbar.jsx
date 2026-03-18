import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, User, Briefcase, GraduationCap, Award, MessageSquare, ChevronDown, Download, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cvDropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cvDropdownRef.current && !cvDropdownRef.current.contains(event.target)) {
        setIsCVOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', icon: <User size={18} />, href: '#about' },
    { name: 'Skills', icon: <Code2 size={18} />, href: '#skills' },
    { name: 'Experience', icon: <Briefcase size={18} />, href: '#experience' },
    { name: 'Projects', icon: <Briefcase size={18} />, href: '#projects' },
    { name: 'Education', icon: <GraduationCap size={18} />, href: '#education' },
    { name: 'Certificates', icon: <Award size={18} />, href: '#certificates' },
    { name: 'Contact', icon: <MessageSquare size={18} />, href: '#contact' },
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-2 border-b border-primary/20' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-2xl font-bold font-outfit tracking-tight text-white/90">
                Diya<span className="text-primary sm:hidden">.</span><span className="text-primary italic hidden sm:inline">Maheshwari</span>
              </span>
            </motion.div>

            <div className="hidden lg:block border border-white/5 rounded-full px-6 py-2 glass">
              <div className="flex items-baseline space-x-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, color: '#ff007f' }}
                    whileTap={{ scale: 0.9 }}
                    className="px-1 py-1 text-sm font-medium text-gray-300 transition-colors flex items-center gap-2 relative group"
                  >
                    {link.icon}
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="lg:hidden flex items-center relative" ref={cvDropdownRef}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCVOpen(!isCVOpen)}
                className="px-4 py-2 text-xs glass pink-border rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
              >
                CV Repository
                <motion.div animate={{ rotate: isCVOpen ? 180 : 0 }}>
                  <ChevronDown size={14} className="text-primary" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isCVOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-4 right-0 w-[240px] glass-strong pink-border rounded-2xl p-2 z-50 shadow-3xl overflow-hidden backdrop-blur-3xl"
                  >
                    {[
                      { name: "General CV", file: "/Diya CV.pdf", sub: "Global Profile", icon: <User size={16} /> },
                      { name: "Specialized CV", file: "/DiyaSpecialisedCV.pdf", sub: "Tech Focus", icon: <Sparkles size={16} /> }
                    ].map((cv, i) => (
                      <a
                        key={i}
                        href={cv.file}
                        download
                        className="flex items-center justify-between p-3 hover:bg-primary/10 rounded-xl group/item transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-primary">{cv.icon}</span>
                          <div className="flex flex-col text-left">
                            <span className="text-white font-bold text-xs">{cv.name}</span>
                            <span className="text-[9px] text-gray-500 uppercase tracking-widest">{cv.sub}</span>
                          </div>
                        </div>
                        <Download size={14} className="text-gray-600 group-hover/item:text-primary transition-colors" />
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

