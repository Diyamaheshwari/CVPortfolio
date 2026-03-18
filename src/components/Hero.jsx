import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useScroll } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, ChevronDown, FileText, Download, User, Sparkles } from 'lucide-react';

// --- Helper Components ---

const ScrambleText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';
  
  useEffect(() => {
    let frame = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        let scrambled = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < frame / 3) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        setDisplayText(scrambled);
        frame++;
        
        if (frame > text.length * 3) {
          setDisplayText(text);
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className="inline-block">{displayText}</span>;
};

const MagneticWrapper = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
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
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const cvDropdownRef = useRef(null);
  const roles = ["Fullstack Developer", "CS Engineer", "UI/UX Enthusiast", "Problem Solver"];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Mouse Tracking for 3D Tilt & Parallax
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMoveGlobal = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    
    const handleClickOutside = (event) => {
      if (cvDropdownRef.current && !cvDropdownRef.current.contains(event.target)) {
        setIsCVOpen(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMoveGlobal);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      clearInterval(roleInterval);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Background Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 70;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.15 + 0.05;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(255, 0, 127, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const imageRotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const imageRotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const bgShiftX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const bgShiftY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  const scrollParallax = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#030303] py-20 lg:py-0">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none" />
      
      {/* Background Blobs */}
      <motion.div style={{ x: bgShiftX, y: bgShiftY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px]" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-20 z-10 w-full mt-16 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          
          {/* Narrative Pillar */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            style={{ y: scrollParallax }}
            className="text-center lg:text-left order-2 lg:order-1 space-y-8 md:space-y-10"
          >
            <div className="space-y-4">
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-8xl font-bold font-outfit tracking-tighter leading-[1.1] lg:leading-[0.9] text-white"
              >
                <div className="relative inline-block">
                  <ScrambleText text="Diya" delay={0.3} />
                </div>
                <br className="hidden lg:block" />
                <span className="text-gradient drop-shadow-[0_0_30px_rgba(255,0,127,0.3)]">
                  <ScrambleText text="Maheshwari" delay={0.6} />
                </span>
              </motion.h1>

              <motion.div variants={itemVariants} className="h-10 flex items-center justify-center lg:justify-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl md:text-2xl text-gray-400 font-light font-outfit flex items-center gap-4 italic"
                  >
                    <div className="w-10 h-[1px] bg-primary hidden md:block opacity-30" />
                    {roles[roleIndex]}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.p 
              variants={itemVariants}
              className="max-w-[32rem] mx-auto lg:mx-0 text-gray-500 text-base md:text-lg leading-relaxed font-light"
            >
              Architecting <span className="text-white">scalable digital ecosystems</span> through technical 
              mastery and <span className="text-primary">visionary design</span>.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2">
              <MagneticWrapper strength={0.3}>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(255,0,127,0.3)] hover:shadow-primary/50 transition-all group"
                >
                  Explore Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </MagneticWrapper>

              <div className="relative hidden sm:block" ref={cvDropdownRef}>
                <MagneticWrapper strength={0.4}>
                  <button
                    onClick={() => setIsCVOpen(!isCVOpen)}
                    className="w-full sm:w-auto px-8 py-4 glass pink-border rounded-2xl font-bold text-white flex items-center justify-center gap-3 hover:bg-white/5 transition-all group"
                  >
                    CV Repository 
                    <motion.div animate={{ rotate: isCVOpen ? 180 : 0 }}>
                      <ChevronDown size={18} className="text-primary" />
                    </motion.div>
                  </button>
                </MagneticWrapper>

                <AnimatePresence>
                  {isCVOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full mt-4 left-0 right-0 sm:w-[280px] glass-strong pink-border rounded-3xl p-2 z-50 shadow-3xl overflow-hidden backdrop-blur-3xl"
                    >
                      {[
                        { name: "General CV", file: "/Diya CV.pdf", sub: "Global Profile", icon: <User size={18} /> },
                        { name: "Specialized CV", file: "/DiyaSpecialisedCV.pdf", sub: "Tech Focus", icon: <Sparkles size={18} /> }
                      ].map((cv, i) => (
                        <a
                          key={i}
                          href={cv.file}
                          download
                          className="flex items-center justify-between p-4 hover:bg-primary/10 rounded-2xl group/item transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-primary">{cv.icon}</span>
                            <div className="flex flex-col text-left">
                              <span className="text-white font-bold text-sm">{cv.name}</span>
                              <span className="text-[10px] text-gray-500 uppercase tracking-widest">{cv.sub}</span>
                            </div>
                          </div>
                          <Download size={18} className="text-gray-600 group-hover/item:text-primary transition-colors" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Social Pulse */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start items-center gap-5 sm:gap-6 pt-6 pb-12 lg:pb-0 z-20 relative">
              {[
                { Icon: Github, url: "https://github.com/Diyamaheshwari" },
                { Icon: Linkedin, url: "https://linkedin.com/in/diyamaheshwari" },
                { Icon: Mail, url: "mailto:maheshwaridiya6@gmail.com" }
              ].map((social, i) => (
                <MagneticWrapper key={i} strength={0.6}>
                  <a href={social.url} target="_blank" className="w-12 h-12 rounded-full border border-white/10 glass-cyber flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,0,127,0.4)] transform hover:-translate-y-1">
                    <social.Icon size={22} className="relative z-10" />
                  </a>
                </MagneticWrapper>
              ))}
            </motion.div>
          </motion.div>

          {/* Focal Persona Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <motion.div 
              style={{ rotateX: imageRotateX, rotateY: imageRotateY }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] [transform-style:preserve-3d] [perspective:1000px] mt-8 lg:mt-0"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-[80px] animate-pulse-pink" />
              
              <div className="relative w-full h-full glass-cyber pink-border rounded-[3rem] overflow-hidden group [transform:translateZ(30px)] shadow-cyber">
                <img 
                  src="/WhatsApp_Image_2025-11-19_at_13.41.28_74786960-removebg-preview (1).png" 
                  alt="Diya Maheshwari" 
                  className="w-full h-full object-cover object-top lg:grayscale lg:group-hover:grayscale-0 transition-all duration-1000 scale-[1.1] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>

              {/* Decorative Orbital */}
              <div className="absolute inset-[-15px] border border-primary/20 rounded-[4rem] animate-spin-slow pointer-events-none opacity-40" />
              <div className="absolute inset-[-35px] border border-primary/10 rounded-[5rem] animate-reverse-spin-slow pointer-events-none opacity-20" />
            </motion.div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll Continuum */}
      <motion.button
        onClick={() => {
          const nextSection = document.getElementById('about');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        whileHover={{ scale: 1.2, opacity: 1 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          y: { repeat: Infinity, duration: 2 },
          scale: { duration: 0.2 }
        }}
        className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 text-primary opacity-40 cursor-pointer z-20 flex flex-col items-center gap-2"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;
