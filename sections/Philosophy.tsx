
import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#c5a059 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl">
              <img 
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1200" 
                  alt="Excelencia Clínica" 
                  className="w-full h-auto"
              />
            </div>
            <div className="absolute top-12 left-12 w-full h-full border border-gold-luxury/10 -z-0"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <span className="text-gold-luxury font-bold tracking-[0.5em] uppercase text-[10px] block">Nuestra Filosofía</span>
              <h2 className="text-5xl md:text-7xl text-navy-luxury luxury-font tracking-tight leading-tight">
                Hospitalidad y <span className="italic font-light">Ciencia</span> en Armonía
              </h2>
            </div>
            
            <p className="text-slate-500 text-xl leading-relaxed font-light tracking-wide max-w-xl">
              Entendemos que el lujo reside en la tranquilidad. Hemos diseñado cada aspecto de su visita para eliminar la fricción dental.
            </p>

            <div className="space-y-8 pt-4">
                {[
                  { title: "Tecnología de Vanguardia", desc: "Sistemas CAD/CAM para resultados biológicamente perfectos." },
                  { title: "Atención de Guante Blanco", desc: "Privacidad absoluta y tiempos de espera inexistentes." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-gold-luxury/10 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-gold-luxury" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div className="ml-6">
                        <h4 className="font-bold text-navy-luxury text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-slate-400 text-sm font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
