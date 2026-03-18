import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Layout, Database, Settings, Users, 
  Code2, Cpu, Globe, Zap, Shield, Rocket,
  Monitor, Smartphone, Server, Cloud, Github as GitIcon,
  CircleDot // Placeholder icons for specific tech
} from 'lucide-react';

// --- Helper Components ---

const MagneticLogo = ({ icon: Icon, color, name }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ x, y }}
      className="relative group cursor-pointer"
    >
      {/* Bioluminescent Glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 blur-2xl rounded-full z-0"
            style={{ backgroundColor: `${color}44` }}
          />
        )}
      </AnimatePresence>

      <motion.div 
        whileHover={{ scale: 1.1, z: 20 }}
        className="relative z-10 glass-cyber p-4 rounded-xl pink-border flex flex-col items-center gap-2 transition-all duration-300 group-hover:border-primary/50"
      >
        <div style={{ color: isHovered ? color : '#9ca3af' }} className="transition-colors duration-300">
          <Icon size={28} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
};

const SkillNode = ({ group }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 60, damping: 20 });
  const y = useSpring(0, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
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
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="glass-strong p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] pink-border relative overflow-hidden group h-full [transform-style:preserve-3d]"
    >
      {/* Background Hub Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-primary rounded-tr-[2rem]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-primary rounded-bl-[2rem]" />
      </div>

      <div className="flex flex-col h-full [transform:translateZ(30px)]">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
            {group.icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-outfit text-white tracking-tight">{group.title}</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {group.skills.map((skill, idx) => (
            <MagneticLogo key={idx} {...skill} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      title: "Core Languages",
      icon: <Terminal size={24} />,
      skills: [
        { name: "Java", color: "#f89820", icon: Code2 },
        { name: "Python", color: "#3776ab", icon: Terminal },
        { name: "C++", color: "#00599c", icon: Cpu },
        { name: "JS", color: "#f7df1e", icon: Globe },
        { name: "PHP", color: "#777bb4", icon: Server },
        { name: "C", color: "#a8b9cc", icon: Code2 }
      ]
    },
    {
      title: "Frontend Forge",
      icon: <Layout size={24} />,
      skills: [
        { name: "React", color: "#61dafb", icon: Zap },
        { name: "HTML5", color: "#e34f26", icon: Monitor },
        { name: "CSS3", color: "#1572b6", icon: Smartphone },
        { name: "Vite", color: "#646cff", icon: Rocket },
        { name: "Tailwind", color: "#06b6d4", icon: Layout },
        { name: "UI/UX", color: "#ff007f", icon: Globe }
      ]
    },
    {
      title: "Backend & Cloud",
      icon: <Database size={24} />,
      skills: [
        { name: "Node.js", color: "#339933", icon: Server },
        { name: "Django", color: "#092e20", icon: Shield },
        { name: "MySQL", color: "#4479a1", icon: Database },
        { name: "Mongo", color: "#47a248", icon: Cloud },
        { name: "Postgre", color: "#336791", icon: Database },
        { name: "Firebase", color: "#ffca28", icon: Zap }
      ]
    },
    {
      title: "Tools & Systems",
      icon: <Settings size={24} />,
      skills: [
        { name: "Git", color: "#f05032", icon: GitIcon },
        { name: "VS Code", color: "#007acc", icon: Monitor },
        { name: "Ubuntu", color: "#e95420", icon: Monitor },
        { name: "APIs", color: "#ff6c37", icon: Settings },
        { name: "DSA", color: "#00ffcc", icon: Cpu },
        { name: "Ubuntu", color: "#e95420", icon: Smartphone } // Duplicated in groups for grid fill
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 lg:py-40 bg-[#020202] relative overflow-hidden">
      {/* Neural Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ff007f 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          className="max-w-4xl mx-auto text-center mb-20 lg:mb-32"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-mono text-sm tracking-[0.4em] uppercase mb-6 block"
          >
            Synthesizing Technology
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold font-outfit mb-8 text-white tracking-tighter">
            Neural <span className="text-gradient">Toolkit</span>
          </h2>
          <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            A high-performance ecosystem of modern technologies, architectures, and creative interfaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <SkillNode group={group} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Atmospheric Energy Blobs */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] -z-10" />
    </section>
  );
};

export default Skills;
