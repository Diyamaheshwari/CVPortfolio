import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle, Ship, Star } from 'lucide-react';

const Certificates = () => {
  const certs = [
    {
      title: "ChatGPT Mahe Easy: AI Essentials For Beginners",
      issuer: "Udemy",
      date: "2025",
      icon: <Award className="text-primary" size={24} />,
      <a href= "https://drive.google.com/file/d/1f1M0HR1Su_SkZETr_in7-9sKctnDJXLI/view?usp=sharing" >status: "Verified"</a>
    },
    {
      title: "Mastering JAVA for Application Development",
      issuer: "LPU",
      date: "2025",
      icon: <Star className="text-primary" size={24} />,
      <a href= "https://drive.google.com/file/d/1hEAVkWPr6uizFDtZ4t6-7NkBpU52bb1v/view?usp=sharing" >status: "Verified"</a>
    },
    {
      title: "MongoDB Professional",
      issuer: "MongoDB University",
      date: "2024",
      icon: <CheckCircle className="text-primary" size={24} />,
      <a href= "https://drive.google.com/file/d/10tozF34Aj6JbeGbNNYoFqSZczsu_QVki/view?usp=sharing" >status: "Verified"</a>
    },
    {
      title: "NPTEL - Software Testing",
      issuer: "IIT Madras / NPTEL",
      date: "2024",
      icon: <Ship className="text-primary" size={24} />,
      <a href= "https://drive.google.com/file/d/11LtjFZPFrqYG0K-mcEVtoDeACu0oCOVU/view?usp=sharing" >status: "Verified"</a>
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15 } }
  };

  return (
    <section id="certificates" className="py-16 lg:py-32 bg-secondary/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block"
          >
            Achievements
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">
            My <span className="text-gradient">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full pink-glow" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass p-8 rounded-3xl pink-border group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-[2] transition-all duration-700">
                {cert.icon}
              </div>

              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <div className="group-hover:text-white transition-colors">
                  {cert.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 font-outfit h-14 overflow-hidden group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              
              <div className="space-y-3 mb-8">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="text-primary">•</span> {cert.issuer}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs flex items-center gap-1">
                    <Calendar size={12} /> {cert.date}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 uppercase">
                    {cert.status}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase group/btn"
              >
                Verify Certificate <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default Certificates;
