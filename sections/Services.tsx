
import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { Service } from '../types';

const Services: React.FC = () => {
  const { services } = useClinic();

  const sortedServices = [...services].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return a.featured ? -1 : 1;
  });

  const handleBooking = (service: Service) => {
    window.dispatchEvent(new CustomEvent('openBooking', { detail: service }));
  };

  return (
    <section id="servicios" className="py-32 bg-navy-luxury relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-6"
        >
          <span className="text-gold-luxury font-black tracking-[0.5em] uppercase text-[10px] block">Especialidades</span>
          <h2 className="text-5xl md:text-7xl text-white luxury-font tracking-tight">Experiencia <span className="italic font-light text-gold-luxury">Especializada</span></h2>
          <div className="w-16 h-[2px] bg-gold-luxury/40 mx-auto mt-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedServices.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white/5 backdrop-blur-sm p-12 h-full flex flex-col border transition-all duration-700 hover:-translate-y-3 ${service.featured ? 'border-gold-luxury/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]' : 'border-white/10'}`}
            >
              {service.featured && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gold-luxury text-navy-luxury text-[9px] font-black uppercase tracking-widest px-5 py-2 shadow-xl">Premium Choice</div>
                </div>
              )}

              <span className="absolute top-8 left-10 text-7xl font-bold text-white/5 select-none group-hover:text-gold-luxury/10 transition-colors">0{index + 1}</span>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-10 text-gold-luxury w-14 h-14 flex items-center justify-center border border-gold-luxury/30 rounded-sm group-hover:bg-gold-luxury group-hover:text-navy-luxury transition-all duration-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                
                <h3 className="text-2xl text-white mb-6 luxury-font font-bold tracking-tight">
                  {service.name}
                </h3>
                
                <p className="text-white/50 font-light leading-relaxed mb-10 text-sm tracking-wide flex-grow uppercase text-[11px] tracking-widest">
                  {service.description}
                </p>
                
                <div className="pt-8 border-t border-white/10 flex flex-col gap-6 mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black">Inversión Desde</span>
                    <span className="text-gold-luxury font-black text-xl tracking-tighter">${service.price.toLocaleString()} MXN</span>
                  </div>
                  
                  <button 
                    onClick={() => handleBooking(service)}
                    className="w-full py-5 text-center border border-gold-luxury/40 text-gold-luxury hover:bg-gold-luxury hover:text-navy-luxury transition-all duration-500 font-black uppercase tracking-[0.4em] text-[10px] active:scale-95"
                  >
                    Consultar Protocolo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
