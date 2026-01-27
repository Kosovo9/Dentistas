
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
      {/* Background con Motion */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-luxury/90 via-navy-luxury/40 to-navy-luxury/95 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2400" 
          alt="Clínica Dental Chihuahua" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-20 w-full max-w-7xl px-4 sm:px-6 py-16 md:py-24 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gold-luxury uppercase tracking-[0.3em] sm:tracking-[0.6em] text-[8px] md:text-[10px] font-black block mb-6 md:mb-10"
        >
          {t('hero_tag')}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(2rem, 10vw, 8rem)' }}
          className="luxury-font text-white font-bold leading-[1.1] tracking-tighter luxury-text-pop mb-10 md:mb-16"
        >
          {siteContent.heroTitle}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative inline-block px-4 sm:px-12 py-4 sm:py-6 mb-12 md:mb-16 border-x border-gold-luxury/20"
        >
          <div className="absolute top-0 left-0 w-4 h-[1px] bg-gold-luxury/40"></div>
          <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-gold-luxury/40"></div>
          
          <p className="text-white/90 text-sm sm:text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed italic luxury-text-pop">
            {siteContent.heroSubtitle}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          <button 
            onClick={handleBooking}
            className="w-full sm:w-auto btn-luxury-frame group relative bg-gold-luxury text-navy-luxury rounded-sm shadow-xl"
          >
            <span className="relative z-10 font-black tracking-[0.2em] sm:tracking-[0.4em] uppercase text-[9px] md:text-[10px]">{t('hero_cta')}</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
          
          <a 
            href="#servicios" 
            className="text-white/40 hover:text-gold-luxury text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] transition-all border-b border-white/5 hover:border-gold-luxury pb-1"
          >
            {t('nav_servicios')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
