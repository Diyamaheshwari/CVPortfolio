import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, Layers, Cpu, Radio, Zap, Terminal, Sparkles, Globe, Shield, Activity, Database } from 'lucide-react';

// --- Internal Components ---

const ProjectDNAOverlay = ({ isHovered, tech }) => (
  <AnimatePresence>
    {isHovered && (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: 20 }}
        className="absolute -right-12 top-10 z-30 hidden xl:flex flex-col gap-4 pointer-events-none"
      >
        <div className="glass-cyan p-4 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Project DNA</span>
          </div>
          <div className="space-y-2">
            {tech.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-6">
                <span className="text-[9px] text-gray-500 font-mono uppercase">{item}</span>
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.random() * 60 + 40}%` }}
                    className="h-full bg-cyan-500/50"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ArtifactContainer = ({ project, index }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const bgX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - (left + width / 2)) / width);
    mouseY.set((e.clientY - (top + height / 2)) / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className={`relative group ${index % 2 === 0 ? 'lg:translate-y-20' : ''}`}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative glass-strong rounded-[3.5rem] p-1 border border-white/5 group-hover:border-primary/30 transition-all duration-700 [transform-style:preserve-3d]"
      >
        {/* Holographic Glow */}
        <div className="absolute inset-0 bg-primary/5 rounded-[3.5rem] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative bg-[#080808] rounded-[3.4rem] overflow-hidden">
          {/* Depth Layer 1: Moving Grid */}
          <motion.div 
            style={{ x: bgX, y: bgY }}
            className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </motion.div>

          <div className="p-6 md:p-14 relative z-10 [transform:translateZ(40px)]">
            <div className="flex items-start justify-between mb-12">
              <div className="w-16 h-16 glass bg-white/[0.02] pink-border rounded-2xl flex items-center justify-center text-primary pink-glow group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                {project.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em]">Artifact {String(index + 1).padStart(2, '0')}</span>
                <div className="w-12 h-0.5 bg-primary/20 mt-2 rounded-full overflow-hidden">
                   <motion.div animate={{ x: [-50, 50] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-full bg-primary shadow-[0_0_10px_#ff007f]" />
                </div>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold font-outfit text-white mb-6 group-hover:text-primary transition-colors tracking-tight">
              {project.title}
            </h3>

            <p className="text-gray-500 text-lg leading-relaxed mb-10 h-28 overflow-hidden font-light group-hover:text-gray-400 transition-colors">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-12">
              {project.tech.map((skill, i) => (
                <span key={i} className="px-4 py-1.5 rounded-xl text-[9px] font-bold font-mono uppercase tracking-widest bg-white/[0.03] border border-white/5 text-gray-500 group-hover:border-primary/20 group-hover:text-primary-light transition-all">
                   {skill}
                </span>
              ))}
            </div>

            <div className="flex gap-10 border-t border-white/5 pt-10">
              <motion.a
                href={project.github}
                target="_blank"
                className="flex items-center gap-2.5 text-xs font-bold font-mono uppercase tracking-[0.3em] text-gray-600 hover:text-primary transition-all group/link"
              >
                <Github size={16} /> <span>Repository</span>
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                className="flex items-center gap-2.5 text-xs font-bold font-mono uppercase tracking-[0.3em] text-gray-600 hover:text-primary transition-all group/link"
              >
                
              </motion.a>
            </div>
          </div>
        </div>

        {/* DNA Overlay Attachment */}
        <ProjectDNAOverlay isHovered={isHovered} tech={project.tech} />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  
  const projects = [
    {
      title: "Video2Summary",
      description: "Neural architecture processing large-scale video streams into condensed semantic blueprints using OpenAI & Whisper API interfaces.",
      tech: ["React.js", "Node.js", "GenAI", "Whisper"],
      github: "https://github.com/Diyamaheshwari/Video2Summary",
      icon: <Cpu size={28} />
    },
    {
      title: "PulsePoint",
      description: "Real-time global data aggregator employing headless scraping protocols and sentiment analysis for high-fidelity news extraction.",
      tech: ["Node.js", "Express", "Puppeteer", "NLP"],
      github: "https://github.com/Diyamaheshwari/PulsePoint-Real-Time-News-Aggregator-Web-App-",
      icon: <Radio size={28} />
    },
    {
      title: "LyricAI",
      description: "Music companion application decrypting sonic depth through real-time lyric translations and sentiment-driven recommendation engines.",
      tech: ["React Native", "Firebase", "GPT-4"],
      github: "https://github.com/Diyamaheshwari/AI-Personalized-Lyrics-Generator",
      icon: <Layers size={28} />
    },
    {
      title: "Car-Racing Game",
      description: "High-performance physics engine simulation utilizing Canvas API for low-latency browser-based competitive interaction.",
      tech: ["JavaScript", "Canvas API", "AudioContext"],
      github: "https://github.com/Diyamaheshwari/Simple-Car-Racing-Game",
      icon: <Code2 size={28} />
    }
  ];

  return (
    <section id="projects" ref={containerRef} className="py-28 lg:py-56 bg-transparent relative overflow-hidden">
      {/* Background: Digital Wind */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,127,0.02),transparent_70%)]" />
        {/* Particle Wind */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -100, y: Math.random() * 1000, opacity: 0 }}
            animate={{ x: 2000, opacity: [0, 0.2, 0] }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute h-px w-64 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-24 lg:mb-48"
        >
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2 glass pink-border rounded-full text-primary font-mono text-xs tracking-[0.5em] uppercase mb-10"
          >
            <Shield size={16} className="animate-pulse" />
            The Holographic Vault
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter text-white mb-6">
            Digital <span className="text-gradient drop-shadow-[0_0_20px_rgba(255,0,127,0.3)]">Artifacts</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-light font-outfit max-w-2xl mx-auto">
             Encrypted repository of high-performance technical deployments and creative architectures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 xl:gap-32 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ArtifactContainer key={index} project={project} index={index} />
          ))}
        </div>
      </div>

      <div className="absolute top-0 right-1/4 w-[1000px] h-[1000px] bg-primary/2 rounded-full blur-[200px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-blue-600/2 rounded-full blur-[180px] -z-10" />
    </section>
  );
};

export default Projects;
