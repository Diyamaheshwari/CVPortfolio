import React, { useRef } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { GraduationCap, BookOpen, School, MapPin, Cpu, Target, Sparkles } from 'lucide-react';

const About = () => {
  const scrollRef = useRef(null);
  
  // Mouse tracking for parallax blobs
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const blobX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const blobY = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  const education = [
    {
      degree: "Bachelor of Technology - Computer Science and Engineering",
      institution: "Lovely Professional University, Jalandhar",
      duration: "2023 - Present",
      grade: "CGPA: 7.27",
      icon: <GraduationCap className="text-primary" size={24} />
    },
    {
      degree: "12th with Science (Intermediate)",
      institution: "MPS International School, Jaipur",
      duration: "2021 - 2022",
      grade: "Percentage: 72%",
      icon: <BookOpen className="text-primary" size={24} />
    },
    {
      degree: "10th (Matriculation)",
      institution: "MPS International School, Jaipur",
      duration: "2019 - 2020",
      grade: "Percentage: 91%",
      icon: <School className="text-primary" size={24} />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      id="about" 
      ref={scrollRef}
      onMouseMove={handleMouseMove}
      className="py-20 lg:py-32 relative overflow-hidden bg-[#030303]"
    >
      <AboutBackground blobX={blobX} blobY={blobY} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-24 px-4"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass pink-border rounded-full text-primary font-mono text-xs tracking-widest uppercase mb-6"
          >
            <Sparkles size={14} className="animate-pulse" />
            The Origin Story
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 font-outfit tracking-tighter text-white">
            Architect of <span className="text-gradient drop-shadow-[0_0_20px_rgba(255,0,127,0.3)]">Code</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-purple-500 to-transparent mx-auto rounded-full shadow-[0_0_15px_rgba(255,0,127,0.5)]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <motion.div 
              whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
              className="glass p-6 md:p-10 rounded-[2.5rem] md:rounded-[40px] pink-border transition-all duration-500 shadow-2xl relative overflow-hidden group [transform-style:preserve-3d]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <h3 className="text-3xl font-bold mb-8 font-outfit flex items-center gap-5 text-white">
                <span className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl font-mono border border-primary/20">
                  01
                </span>
                Identity
              </h3>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 font-light">
                Based in the cultural heart of <span className="text-white font-medium">Jaipur, Rajasthan</span>, 
                I merge engineering discipline with boundless digital curiosity.
              </p>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
                Currently bridging logic and aesthetics at <span className="text-primary font-medium">LPU</span>, 
                focusing on crafting high-performance full-stack ecosystems.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "Location", val: "Jaipur", icon: <MapPin size={18} /> },
                { label: "Focus", val: "Fullstack", icon: <Cpu size={18} /> },
                { label: "Inspiration", val: "Innovation", icon: <Target size={18} /> }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="glass px-6 py-8 rounded-[32px] pink-border cursor-pointer flex flex-col items-center text-center group"
                >
                  <div className="text-primary mb-4 p-3 bg-primary/5 rounded-2xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <h4 className="text-white font-bold text-xl mb-1">{stat.val}</h4>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest font-mono">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass p-6 md:p-10 rounded-[2.5rem] md:rounded-[40px] pink-border relative overflow-hidden group [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <h3 className="text-3xl font-bold mb-12 font-outfit flex items-center gap-5 text-white">
              <span className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl font-mono border border-primary/20">
                02
              </span>
              Academic Matrix
            </h3>
            
            <div className="space-y-16 relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-purple-500 to-transparent opacity-20" />
              
              {education.map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants} 
                  className="flex gap-8 relative group/item"
                >
                  <div className="relative z-10">
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      className="w-14 h-14 bg-gray-900 rounded-2xl border border-primary/30 flex items-center justify-center group-hover/item:border-primary group-hover/item:shadow-[0_0_20px_rgba(255,0,127,0.4)] transition-all duration-500"
                    >
                      {item.icon}
                    </motion.div>
                    
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl bg-primary/20 -z-10"
                    />
                  </div>
                  
                  <div className="flex-1 group-hover/item:translate-x-3 transition-transform duration-500 px-4">
                    <h4 className="text-2xl font-bold text-white mb-2 font-outfit">{item.degree}</h4>
                    <p className="text-primary font-medium tracking-wide mb-3">{item.institution}</p>
                    <div className="flex flex-wrap gap-6 items-center">
                      <span className="text-gray-500 text-xs font-mono flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-700 rounded-full" /> {item.duration}
                      </span>
                      <span className="px-4 py-1.5 rounded-xl border border-primary/10 bg-primary/5 text-primary text-xs font-bold font-mono">
                        {item.grade}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutBackground = ({ blobX, blobY }) => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <motion.div 
      style={{ x: useTransform(blobX, (v) => v * -1), y: useTransform(blobY, (v) => v * -1) }}
      className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] mix-blend-screen"
    />
    <motion.div 
      style={{ x: blobX, y: blobY }}
      className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] mix-blend-screen"
    />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] contrast-125 pointer-events-none" />
    <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
      <pattern id="grid-about" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-about)" />
    </svg>
  </div>
);

export default About;
