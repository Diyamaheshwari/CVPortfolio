import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  User, AtSign, Tag, Shield, Activity, 
  Zap, Terminal, Sparkles, Globe, Cpu
} from 'lucide-react';

// --- Internal Components ---

const QuantumLine = ({ isActive }) => (
  <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
    <motion.div 
      initial={{ x: "-100%" }}
      animate={{ x: isActive ? "0%" : "-100%" }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className="w-full h-full bg-primary shadow-[0_0_15px_#ff007f]"
    />
  </div>
);

const TransmissionTerminal = ({ formData, handleChange, handleSubmit, isSubmitting }) => {
  const [focusedField, setFocusedField] = useState(null);

  const fields = [
    { name: "name", label: "Identity", icon: <User size={16} />, placeholder: "Signal Name", type: "text" },
    { name: "email", label: "Communication Port", icon: <AtSign size={16} />, placeholder: "name@matrix.com", type: "email" },
    { name: "subject", label: "Priority Protocol", icon: <Tag size={16} />, placeholder: "Inquiry Logic", type: "text" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="lg:col-span-2 glass-strong p-6 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] pink-border relative overflow-hidden group shadow-cyber"
    >
      {/* Scanning Line Animation */}
      <motion.div 
        animate={{ y: ["0%", "400%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-px bg-primary/20 blur-[2px] z-0 pointer-events-none"
      />

      <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {fields.slice(0, 2).map((field) => (
            <div key={field.name} className="space-y-3 relative">
              <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="text-primary">{field.icon}</span> {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-white focus:outline-none transition-all font-outfit"
                  placeholder={field.placeholder}
                  required
                />
                <QuantumLine isActive={focusedField === field.name} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 relative">
          <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em] flex items-center gap-3">
            <span className="text-primary"><Tag size={16} /></span> Priority Protocol
          </label>
          <div className="relative">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-white focus:outline-none transition-all font-outfit"
              placeholder="Inquiry Logic"
              required
            />
            <QuantumLine isActive={focusedField === 'subject'} />
          </div>
        </div>

        <div className="space-y-3 relative">
          <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em] flex items-center gap-3">
            <span className="text-primary"><MessageSquare size={16} /></span> Data Payload
          </label>
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows="5"
              className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-white focus:outline-none transition-all font-outfit resize-none"
              placeholder="Inject mission details here..."
              required
            />
            <QuantumLine isActive={focusedField === 'message'} />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full group/btn relative overflow-hidden glass-strong bg-primary/10 pink-border py-6 rounded-3xl transition-all duration-500 hover:bg-primary"
        >
          <div className="relative z-10 flex items-center justify-center gap-4 text-white font-bold tracking-[0.4em] uppercase text-xs md:text-sm">
            {isSubmitting ? (
              <>
                <Activity size={20} className="animate-spin text-white" /> SYNCHRONIZING...
              </>
            ) : (
              <>
                Initialize Transmission <Send size={20} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
              </>
            )}
          </div>
          {/* Energy Surge Animation on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
        </motion.button>
      </form>
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const containerRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate high-tech transit
    setTimeout(() => {
      console.log('Transmission Secure:', formData);
      alert('Transmission Received. System synchronization complete.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactNodes = [
    { icon: <Mail size={22} />, label: "Quantum Mail", value: "maheshwaridiya6@gmail.com", href: "mailto:maheshwaridiya6@gmail.com" },
    { icon: <Phone size={22} />, label: "Direct Line", value: "+91 7014331100", href: "tel:+917014331100" },
    { icon: <MapPin size={22} />, label: "Origin Node", value: "Jaipur, Rajasthan", href: "#" }
  ];

  return (
    <section id="contact" ref={containerRef} className="py-24 lg:py-56 bg-transparent relative overflow-hidden">
      {/* Neural Surface Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-24 lg:mb-40"
        >
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2 glass pink-border rounded-full text-primary font-mono text-xs tracking-[0.5em] uppercase mb-10"
          >
            <Shield size={16} className="animate-pulse" />
            Establish Secure Link
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter text-white mb-6">
            Quantum <span className="text-gradient drop-shadow-[0_0_20px_rgba(255,0,127,0.3)]">Node</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light font-outfit max-w-2xl mx-auto">
             Initialize an encrypted data transmission to sync with my technical ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 xl:gap-24 max-w-7xl mx-auto items-start">
          {/* Node Connections */}
          <div className="space-y-8 order-2 lg:order-1">
            {contactNodes.map((node, i) => (
              <motion.a
                key={i}
                href={node.href}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10 }}
                className="glass-strong p-8 rounded-[2.5rem] pink-border flex items-center gap-6 group cursor-pointer transition-all duration-500 hover:border-primary/50"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary pink-glow group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {node.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-1">{node.label}</p>
                  <p className="text-white font-bold text-base md:text-lg group-hover:text-primary transition-colors truncate max-w-[180px] xl:max-w-none">{node.value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass p-10 rounded-[3rem] pink-border relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-widest leading-none">Status: Online</span>
              </div>
              <p className="text-gray-500 text-base leading-relaxed font-light">
                Secure bridge is open for industrial collaborations, mission-critical infrastructure builds, and technical consults.
              </p>
            </motion.div>
          </div>

          {/* Form Terminal */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <TransmissionTerminal 
              formData={formData} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
            />
          </div>
        </div>
      </div>

      {/* Atmospheric Energy Fields */}
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[180px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-cyan-600/2 rounded-full blur-[140px] -z-10" />
    </section>
  );
};

export default Contact;
