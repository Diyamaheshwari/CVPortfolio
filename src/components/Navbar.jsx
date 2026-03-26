import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, User, Briefcase, Award, MessageSquare, ChevronDown, Download, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const cvDropdownRef = useRef(null);
  const mobileCvDropdownRef = useRef(null);
  const [isMobileCVOpen, setIsMobileCVOpen] = useState(false);

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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Education removed as requested
  const navLinks = [
    { name: 'About', icon: <User size={16} />, href: '#about' },
    { name: 'Skills', icon: <Code2 size={16} />, href: '#skills' },
    { name: 'Experience', icon: <Briefcase size={16} />, href: '#experience' },
    { name: 'Projects', icon: <Briefcase size={16} />, href: '#projects' },
    { name: 'Certificates', icon: <Award size={16} />, href: '#certificates' },
    { name: 'Contact', icon: <MessageSquare size={16} />, href: '#contact' },
  ];

  const cvLinks = [
    { name: "General CV", file: "/Diya CV.pdf", sub: "Global Profile", icon: <User size={16} /> },
    { name: "Specialized CV", file: "/DiyaSpecialisedCV.pdf", sub: "Tech Focus", icon: <Sparkles size={16} /> }
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-cyan-400 z-[70] origin-left shadow-[0_0_15px_rgba(255,0,127,0.5)]"
        style={{ scaleX }}
      />
      
      {/* Floating Navbar Assembly */}
      <nav className={`fixed w-full z-[60] transition-all duration-500 flex justify-center ${scrolled ? 'top-4' : 'top-6'}`}>
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`flex items-center justify-between w-[95%] max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500 rounded-full border ${scrolled ? 'bg-[#0a0a0a]/70 backdrop-blur-xl border-white/10 shadow-cyber py-3' : 'bg-transparent border-transparent py-2'}`}
        >
          {/* Brand/Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer z-10"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-xl sm:text-2xl font-bold font-outfit tracking-tight text-white/90 drop-shadow-md">
              Diya<span className="text-primary italic">.M</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-2 text-sm font-medium text-gray-200 transition-colors flex items-center gap-2 group z-10"
              >
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="desktop-nav-hover"
                    className="absolute inset-0 bg-white/10 border border-white/5 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="group-hover:text-primary transition-colors opacity-70 group-hover:opacity-100">{link.icon}</span>
                <span className="group-hover:text-white">{link.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Desktop CV Repository */}
          <div className="hidden lg:flex items-center relative z-10" ref={cvDropdownRef}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCVOpen(!isCVOpen)}
              className="px-5 py-2.5 text-xs bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,0,127,0.3)] rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-md"
            >
              CV Repository
              <motion.div animate={{ rotate: isCVOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
                <ChevronDown size={14} className="text-primary" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isCVOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                  className="absolute top-[calc(100%+12px)] right-0 w-[240px] bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 z-50 shadow-3xl overflow-hidden"
                >
                  {cvLinks.map((cv, i) => (
                    <a
                      key={i}
                      href={cv.file}
                      download
                      className="flex items-center justify-between p-3 hover:bg-primary/15 rounded-xl group/item transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-primary/70 group-hover/item:text-primary transition-colors">{cv.icon}</span>
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

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center z-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white backdrop-blur-md"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden flex justify-end"
          >
            {/* Click away area */}
            <div className="absolute inset-0" onClick={() => setIsMobileMenuOpen(false)} />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-[80%] max-w-[320px] h-full bg-[#050505]/95 backdrop-blur-3xl border-l border-white/10 p-6 flex flex-col relative shadow-[-20px_0_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-bold font-outfit tracking-tight text-white/90">
                  Navigation<span className="text-primary">.</span>
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-white/5 border border-white/10 hover:bg-primary/20 rounded-full text-white transition-all"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="flex flex-col space-y-2 overflow-y-auto pb-6 custom-scrollbar">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium border border-transparent hover:border-white/5"
                  >
                    <span className="text-primary">{link.icon}</span>
                    {link.name}
                  </motion.a>
                ))}

                <div className="h-px bg-white/10 my-4" />

                {/* Mobile CV Section within Drawer */}
                <div className="px-2" ref={mobileCvDropdownRef}>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileCVOpen(!isMobileCVOpen)}
                    className="w-full flex items-center justify-between px-4 py-4 bg-primary/10 border border-primary/20 hover:bg-primary/20 rounded-2xl text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,0,127,0.1)]"
                  >
                    <div className="flex items-center gap-3">
                      <Download size={16} className="text-primary" />
                      CV Repository
                    </div>
                    <motion.div animate={{ rotate: isMobileCVOpen ? 180 : 0 }}>
                      <ChevronDown size={16} className="text-primary" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isMobileCVOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-3 space-y-2"
                      >
                        {cvLinks.map((cv, i) => (
                          <a
                            key={i}
                            href={cv.file}
                            download
                            className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-primary">{cv.icon}</span>
                              <div className="flex flex-col">
                                <span className="text-white font-bold text-xs">{cv.name}</span>
                                <span className="text-[9px] text-gray-500 uppercase tracking-widest">{cv.sub}</span>
                              </div>
                            </div>
                            <Download size={14} className="text-gray-600" />
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
