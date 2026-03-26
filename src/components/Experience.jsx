import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, MapPin, Briefcase, ChevronRight, Zap, Target, Cpu, Sparkles } from 'lucide-react';

// --- Internal Components ---

const DataPulse = ({ scrollProgress }) => {
  const y = useTransform(scrollProgress, [0, 1], ["0%", "80%"]);
  
  return (
    <motion.div 
      style={{ top: y }}
      className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full pink-glow z-20"
    >
      <div className="absolute inset-0 bg-primary opacity-50 rounded-full animate-ping" />
    </motion.div>
  );
};

const FocalHolographicCard = ({ exp }) => {
  const cardRef = useRef(null);
  const x = useSpring(0, { stiffness: 100, damping: 20 });
  const y = useSpring(0, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) / width);
    y.set((e.clientY - centerY) / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className="relative flex justify-center [transform-style:preserve-3d]"
    >
      {/* Central Connector Node */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 -top-12 w-16 h-16 bg-black border-2 border-primary/40 rounded-full z-10 flex items-center justify-center backdrop-blur-2xl [transform:translateZ(40px)] shadow-[0_0_30px_rgba(255,0,127,0.2)]">
         <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_15px_#ff007f]" />
      </div>

      {/* Main Focus Card */}
      <div className="w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong p-6 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] pink-border group relative overflow-hidden transition-all duration-700 hover:border-primary/60 shadow-3xl"
        >
          {/* Background Atmospheric Mesh */}
          <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="pattern-focal" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#ff007f" />
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ff007f" strokeWidth="0.1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#pattern-focal)" />
            </svg>
          </div>

          {/* Focal Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-700" />

          <div className="relative z-10 [transform:translateZ(60px)]">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-cyber-lite">
                    <Briefcase size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white font-outfit tracking-tight group-hover:text-primary transition-colors leading-none">{exp.role}</h3>
                    <p className="text-primary font-mono text-base uppercase tracking-[0.3em] mt-2">{exp.company}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end gap-4 font-mono">
                <span className="flex items-center gap-2 text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 text-sm">
                  <Calendar size={14} /> <span className="text-[10px] md:text-sm">{exp.duration}</span>
                </span>
                <span className="text-gray-500 flex items-center gap-1.5 text-xs">
                  <MapPin size={14} /> {exp.location}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
              <div className="space-y-8">
                 <div className="flex items-center gap-4">
                   <div className="h-px w-12 bg-primary/30" />
                   <h4 className="text-white font-bold flex items-center gap-3 text-sm uppercase tracking-[0.2em]">
                     <Target size={18} className="text-primary" />
                     Mission Objectives
                   </h4>
                 </div>
                 
                 <ul className="space-y-6">
                   {exp.highlights.map((item, i) => (
                     <motion.li 
                       key={i}
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: false }}
                       transition={{ delay: 0.2 + (i * 0.1) }}
                       className="text-gray-400 text-lg flex gap-6 leading-relaxed group/item"
                     >
                       <div className="mt-2.5 flex-shrink-0 relative">
                          <div className="w-3 h-3 rounded-full bg-primary/20 group-hover/item:bg-primary transition-colors pink-glow" />
                          <div className="absolute inset-x-1/2 top-5 w-px h-12 bg-gradient-to-b from-primary/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                       </div>
                       <span className="group-hover/item:text-gray-200 transition-colors text-base md:text-lg">{item}</span>
                     </motion.li>
                   ))}
                 </ul>
              </div>

              <div className="space-y-10">
                <div className="p-8 glass bg-white/[0.02] rounded-3xl pink-border">
                  <h4 className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-6 block">Technology Matrix</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {exp.tech.map((skill, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 0, 127, 0.1)' }}
                        className="px-4 py-2.5 glass bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-300 uppercase tracking-widest text-center"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.a
                  href={exp.link}
                  target="_blank"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-4 text-sm uppercase tracking-[0.3em] shadow-[0_15px_30px_rgba(255,0,127,0.3)] hover:shadow-primary/50 transition-all group/btn"
                >
                  Initiate System Access
                  <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const experience = {
    company: "SS Enterprises",
    role: "Web Developer Intern",
    project: "Corporate Telecom Website (wesse.in)",
    duration: "Feb 2025 – Mar 2025",
    location: "Jaipur, Rajasthan",
    tech: ["Tailwind CSS", "JavaScript", "PHP", "SEO"],
    highlights: [
      "Engineered a fully responsive corporate telecom website for SS Enterprises.",
      "Implemented a modern interface using Tailwind CSS and JavaScript component architecture.",
      "Integrated dynamic service modules with PHP for a scalable backend.",
      "Optimized SEO and page loading performance for live production deployment."
    ],
    link: "https://wesse.in"
  };

  return (
    <section id="experience" ref={containerRef} className="py-24 lg:py-48 bg-transparent relative overflow-hidden">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ff007f 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Atmospheric Focus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           className="max-w-4xl mx-auto text-center mb-24 lg:mb-40"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-6 py-2.5 glass pink-border rounded-full text-primary font-mono text-xs tracking-[0.4em] uppercase mb-10 shadow-[0_0_20px_rgba(255,0,127,0.1)]"
          >
            <Sparkles size={16} className="animate-pulse" />
            Temporal Focus Mode
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-10 font-outfit tracking-tighter text-white">
            Career <span className="text-gradient drop-shadow-[0_0_25px_rgba(255,0,127,0.3)]">Flashpoint</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            A concentrated analysis of industrial technical deployment and high-impact digital engineering.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative pt-12">
          {/* Central Neural Connector */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent z-0">
             <div className="absolute inset-0 bg-primary/10 blur-md" />
          </div>

          {/* Liquid Pulse Tracker */}
          <DataPulse scrollProgress={scrollYProgress} />

          {/* Focus Feed */}
          <div className="relative pt-24 pb-12">
            <FocalHolographicCard exp={experience} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
