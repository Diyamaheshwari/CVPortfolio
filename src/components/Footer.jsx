import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp, Zap, Shield, Globe } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-transparent py-24 border-t border-white/5 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center lg:items-start gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 glass bg-primary/10 pink-border rounded-xl flex items-center justify-center text-primary pink-glow">
                <span className="text-white font-bold text-2xl font-outfit">D</span>
              </div>
              <span className="text-3xl font-bold font-outfit tracking-tighter text-white">
                Diya<span className="text-primary">Maheshwari</span>
              </span>
            </div>
            <p className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.5em] mt-2">
              Technical Equilibrium & Infrastructure
            </p>
          </motion.div>

          {/* Core System Nodes */}
          <div className="flex bg-white/[0.02] pink-border p-2 rounded-3xl gap-4">
            {[
              { Icon: Github, url: "https://github.com/Diyamaheshwari", label: "Source" },
              { Icon: Linkedin, url: "https://www.linkedin.com/in/diyamaheshwari", label: "Sync" },
              { Icon: Mail, url: "mailto:maheshwaridiya6@gmail.com", label: "Comm" }
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.url}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-3 glass bg-white/[0.03] rounded-2xl text-gray-400 hover:text-primary hover:bg-white/[0.05] transition-all group"
              >
                <social.Icon size={18} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest hidden md:block">{social.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-14 h-14 glass bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center text-primary pink-glow transition-all group"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center pt-12 border-t border-white/5 border-dashed"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8">
             <div className="flex items-center gap-3">
                <Shield size={14} className="text-primary opacity-40" />
                <span className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">Protocol V1.0.D3V</span>
             </div>
             <div className="flex items-center gap-3">
                <Globe size={14} className="text-primary opacity-40" />
                <span className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">Global Node JAIPUR_IN</span>
             </div>
             <div className="flex items-center gap-3">
                <Zap size={14} className="text-primary opacity-40" />
                <span className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">Efficiency 100%</span>
             </div>
          </div>

          <p className="text-gray-700 text-[10px] font-mono uppercase tracking-[0.4em] mb-4">
            &copy; {new Date().getFullYear()} Diya Maheshwari. Neural Architecture Authorized.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-800 text-[8px] font-mono">
            BUILT_BY_DIYA <Heart size={8} className="text-primary animate-pulse" /> WITH_STRICT_LOGIC
          </div>
        </motion.div>
      </div>

      <div className="absolute -bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      {/* Decorative Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/[0.01] rounded-full blur-[120px] -z-10" />
    </footer>
  );
};

export default Footer;
