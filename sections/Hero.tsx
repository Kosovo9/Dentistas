
import React from 'react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../constants';
import { useClinic } from '../context/ClinicContext';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { siteContent } = useClinic();
  const { t } = useLanguage();
  
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Dr. Enrique Acosta, me gustaría agendar una cita de valoración.")}`;

  const textOutlineStyle = {
    textShadow: `0px 4px 15px rgba(0,0,0,0.6)`
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0c1524]">
      {/* Background with subtle zoom effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-luxury/60 via-navy-luxury/20 to-navy-luxury/80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=90&w=2400" 
          alt="Consultorio dental de lujo" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-20 w-full max-w-7xl px-6 py-20 flex items-center justify-center text-center">
        <div className="w-full max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={textOutlineStyle} 
            className="text-gold-luxury uppercase tracking-[0.5em] text-[10px] md:text-xs font-black block mb-10"
          >
            {t('hero_tag')}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            style={textOutlineStyle} 
            className="text-5xl md:text-8xl lg:text-9xl mb-12 luxury-font text-white font-bold leading-[1.1] tracking-tighter"
          >
            {siteContent.heroTitle}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={textOutlineStyle} 
            className="text-white/90 text-lg md:text-2xl mb-16 max-w-3xl mx-auto font-light leading-relaxed tracking-wide italic"
          >
            {siteContent.heroSubtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <a 
              href={whatsappUrl} 
              className="group relative bg-gold-luxury text-navy-luxury px-16 py-6 rounded-sm font-black tracking-[0.3em] uppercase text-[10px] shadow-[0_20px_50px_rgba(197,160,89,0.3)] hover:bg-white hover:scale-105 transition-all duration-500 overflow-hidden active:scale-95"
            >
              <span className="relative z-10">{siteContent.heroCta}</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </a>
            
            <a 
              href="#servicios" 
              className="text-white/60 hover:text-gold-luxury text-[10px] font-black uppercase tracking-[0.4em] transition-all border-b border-white/10 hover:border-gold-luxury pb-2"
            >
              Ver Especialidades
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-px h-16 bg-gradient-to-b from-gold-luxury to-transparent opacity-50"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
