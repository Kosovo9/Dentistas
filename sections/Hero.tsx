
import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { siteContent } = useClinic();
  const { t } = useLanguage();
  
  const handleBooking = () => {
    window.dispatchEvent(new CustomEvent('openBooking'));
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0c1524]">
      {/* Background */}
      <motion.div 
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-luxury/80 via-navy-luxury/30 to-navy-luxury/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=90&w=2400" 
          alt="Luxury Clinic" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-20 w-full max-w-7xl px-6 py-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gold-luxury uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-black block mb-6 md:mb-8"
        >
          {t('hero_tag')}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-9xl mb-12 md:mb-16 luxury-font text-white font-bold leading-[1.1] md:leading-[1] tracking-tighter luxury-text-pop"
        >
          {siteContent.heroTitle}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative inline-block px-6 md:px-12 py-4 mb-16 border-x border-gold-luxury/30"
        >
          <div className="absolute top-0 left-0 w-4 h-[1px] bg-gold-luxury/30"></div>
          <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-gold-luxury/30"></div>
          
          <motion.p 
            className="text-white text-base md:text-2xl max-w-3xl mx-auto font-light leading-relaxed italic luxury-text-pop"
          >
            {siteContent.heroSubtitle}
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-14"
        >
          <button 
            onClick={handleBooking}
            className="w-full sm:w-auto btn-luxury-frame group relative bg-gold-luxury text-navy-luxury rounded-sm transition-all duration-700 shadow-[0_30px_70px_rgba(197,160,89,0.4)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 font-black tracking-[0.4em] uppercase text-[10px]">{t('hero_cta')}</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
          
          <a 
            href="#servicios" 
            className="text-white/40 hover:text-gold-luxury text-[10px] font-black uppercase tracking-[0.5em] transition-all border-b border-white/5 hover:border-gold-luxury pb-2"
          >
            {t('nav_servicios')}
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-gold-luxury/60 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
