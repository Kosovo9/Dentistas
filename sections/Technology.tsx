
import React from 'react';
import { motion } from 'framer-motion';

const Technology: React.FC = () => {
  return (
    <section className="py-32 bg-navy-luxury relative overflow-hidden">
      {/* Luces decorativas */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-luxury/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="order-2 lg:order-1"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gold-luxury/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
                alt="Tecnología Dental" 
                className="relative z-10 w-full rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-10 left-10 z-20 bg-white/10 backdrop-blur-md p-6 border border-white/10">
                <p className="text-white text-xs font-bold tracking-[0.3em] uppercase">Escaneo Intraoral 3D</p>
                <p className="text-gold-luxury text-[9px] uppercase font-bold mt-1">Precisión absoluta</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-10"
          >
            <div className="space-y-4">
              <span className="text-gold-luxury font-bold tracking-[0.5em] uppercase text-[10px] block">El Futuro es Hoy</span>
              <h2 className="text-5xl md:text-7xl text-white luxury-font leading-none">
                Odontología <span className="italic font-light">Digital</span>
              </h2>
            </div>
            
            <p className="text-white/60 text-lg font-light leading-relaxed">
              En el consultorio del Dr. Enrique Acosta, eliminamos las suposiciones. Utilizamos <strong>Diseño de Sonrisa Digital (DSD)</strong> para que veas el resultado final antes de tocar una sola pieza dental.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: "Planificación 3D", desc: "Simulación virtual exacta de tu nueva dentadura." },
                { title: "CAD/CAM", desc: "Restauraciones creadas con precisión robótica." },
                { title: "Sedación Consciente", desc: "Tranquilidad total para pacientes ansiosos." },
                { title: "Micro-Odontología", desc: "Mínima invasión, máximos resultados." }
              ].map((item, i) => (
                <div key={i} className="space-y-2 group">
                  <h4 className="text-white font-bold uppercase tracking-widest text-[10px] group-hover:text-gold-luxury transition-colors">{item.title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
