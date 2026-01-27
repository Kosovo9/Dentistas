
import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';

const Philosophy: React.FC = () => {
  const { siteContent } = useClinic();

  return (
    <section className="py-24 md:py-32 bg-[#0d172b] overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#c5a059 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl group border border-white/10">
              <img 
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1200" 
                  alt="Excelencia Clínica Dr. Enrique Acosta" 
                  className="w-full h-auto grayscale-[20%] lg:grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 border-[10px] md:border-[20px] border-black/20 pointer-events-none"></div>
            </div>
            <div className="absolute top-6 left-6 md:top-12 md:left-12 w-full h-full border border-gold-luxury/10 md:border-gold-luxury/20 -z-0"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10 md:space-y-12 order-1 lg:order-2"
          >
            <div className="space-y-6">
              <span className="text-gold-luxury font-black tracking-[0.4em] md:tracking-[0.5em] uppercase text-[9px] md:text-[10px] block">Nuestra Filosofía</span>
              <h2 className="text-4xl md:text-7xl text-white luxury-font tracking-tight leading-tight">
                {siteContent.philosophyTitle.split(' ').map((word, i) => {
                  const lowerWord = word.toLowerCase().replace(/[.,]/g, '');
                  const isItalic = ['ciencia', 'hospitalidad', 'armonía', 'élite'].includes(lowerWord);
                  return (
                    <span key={i} className={isItalic ? "italic font-light text-gold-luxury" : ""}>
                      {word}{' '}
                    </span>
                  );
                })}
              </h2>
            </div>
            
            <p className="text-white/70 text-base md:text-xl leading-relaxed font-light tracking-wide max-w-xl">
              {siteContent.philosophyText}
            </p>

            <div className="grid gap-6 md:gap-8 pt-4">
                {[
                  { title: "Tecnología de Vanguardia", desc: "Sistemas CAD/CAM para resultados biológicamente perfectos." },
                  { title: "Atención Boutique", desc: "Privacidad absoluta y tiempos de espera inexistentes." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className="flex items-start group"
                  >
                    <div className="bg-gold-luxury/10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 group-hover:bg-gold-luxury transition-all duration-500 border border-gold-luxury/20">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-gold-luxury group-hover:text-navy-luxury transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div className="ml-5 md:ml-6">
                        <h4 className="font-black text-white text-[10px] md:text-xs uppercase tracking-widest mb-1 group-hover:text-gold-luxury transition-colors">{item.title}</h4>
                        <p className="text-white/40 text-[10px] md:text-sm font-light uppercase tracking-tighter">{item.desc}</p>
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

export default Philosophy;
