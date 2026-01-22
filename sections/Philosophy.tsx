
import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      {/* Light subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#c5a059 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative z-10 rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
              <img 
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1200" 
                  alt="Excelencia Clínica Dr. César Acosta" 
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-[3000ms]"
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute -bottom-12 -right-12 bg-navy-luxury p-14 hidden xl:block z-20 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] border-l-4 border-gold-luxury"
            >
                <p className="text-gold-luxury luxury-font text-4xl italic leading-[1.3] max-w-[300px]">
                  "La perfección dental no es un proceso, es un <span className="font-normal text-white">arte</span>."
                </p>
                <span className="text-white/30 uppercase tracking-[0.3em] text-[9px] font-bold mt-8 block">Dr. César Acosta</span>
            </motion.div>
            
            {/* Background decorative frame */}
            <div className="absolute top-12 left-12 w-full h-full border-[1px] border-gold-luxury/10 -z-0"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <span className="text-gold-luxury font-bold tracking-[0.5em] uppercase text-[10px] block opacity-80">Nuestra Filosofía</span>
              <h2 className="text-5xl md:text-7xl text-navy-luxury leading-[1.1] luxury-font tracking-tight">
                Hospitalidad y <span className="italic font-light">Ciencia</span> en Armonía
              </h2>
            </div>
            
            <p className="text-slate-500 text-xl leading-relaxed font-light tracking-wide max-w-xl">
              Entendemos que el lujo reside en la tranquilidad. Hemos diseñado cada aspecto de su visita para eliminar la fricción, integrando confort de clase mundial con la precisión de la odontología digital moderna.
            </p>

            <div className="space-y-10 pt-4">
                {[
                  { title: "Tecnología de Vanguardia", desc: "Sistemas CAD/CAM y diagnóstico 3D para resultados biológicamente perfectos." },
                  { title: "Atención de Guante Blanco", desc: "Privacidad absoluta y tiempos de espera inexistentes en un entorno zen." },
                  { title: "Excelencia Certificada", desc: "Materiales suizos y alemanes con garantía de durabilidad de por vida." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.15) }}
                    className="flex items-start group"
                  >
                    <div className="relative mt-1">
                      <div className="bg-gold-luxury/5 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-gold-luxury group-hover:scale-110 transition-all duration-500">
                        <svg className="w-5 h-5 text-gold-luxury group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    </div>
                    <div className="ml-6 border-b border-slate-100 pb-6 w-full group-hover:border-gold-luxury/20 transition-colors">
                        <h4 className="font-bold text-navy-luxury text-lg mb-2 uppercase tracking-widest text-[13px]">{item.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">{item.desc}</p>
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
