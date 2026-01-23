
import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { WHATSAPP_NUMBER } from '../constants';

const Services: React.FC = () => {
  const { services } = useClinic();

  // Ordenar para que los destacados aparezcan primero
  const sortedServices = [...services].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return a.featured ? -1 : 1;
  });

  const handleConsultation = (serviceName: string) => {
    const message = encodeURIComponent(`Hola Dr. Enrique Acosta, me interesa obtener más información sobre el tratamiento de "${serviceName}" que vi en su plataforma digital.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="servicios" className="py-32 bg-[#fcfcfc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-6"
        >
          <span className="text-gold-luxury font-bold tracking-[0.5em] uppercase text-[10px] block">Especialidades</span>
          <h2 className="text-5xl md:text-7xl text-navy-luxury luxury-font tracking-tight">Experiencia <span className="italic font-light">Especializada</span></h2>
          <div className="w-16 h-[2px] bg-gold-luxury mx-auto mt-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedServices.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white p-12 h-full flex flex-col border transition-all duration-500 hover:-translate-y-2 ${service.featured ? 'border-gold-luxury/40 shadow-xl' : 'border-slate-100 shadow-sm'}`}
            >
              {service.featured && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gold-luxury text-navy-luxury text-[8px] font-black uppercase tracking-widest px-4 py-1.5 shadow-lg">Popular</div>
                </div>
              )}

              <span className="absolute top-8 left-10 text-6xl font-bold text-slate-100/50 select-none group-hover:text-gold-luxury/10 transition-colors">0{index + 1}</span>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-10 text-gold-luxury w-12 h-12 flex items-center justify-center border border-gold-luxury/20 rounded-sm group-hover:bg-gold-luxury group-hover:text-navy-luxury transition-all duration-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                
                <h3 className="text-2xl text-navy-luxury mb-6 luxury-font font-bold">
                  {service.name}
                </h3>
                
                <p className="text-slate-500 font-light leading-relaxed mb-10 text-sm tracking-wide flex-grow">
                  {service.description}
                </p>
                
                <div className="pt-8 border-t border-slate-50 flex flex-col gap-4 mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Inversión desde</span>
                    <span className="text-navy-luxury font-bold text-lg tracking-tighter">${service.price.toLocaleString()} MXN</span>
                  </div>
                  
                  <button 
                    onClick={() => handleConsultation(service.name)}
                    className="w-full py-4 text-center border border-navy-luxury text-navy-luxury hover:bg-navy-luxury hover:text-white transition-all duration-500 font-bold uppercase tracking-[0.2em] text-[9px] active:scale-95"
                  >
                    Consultar Tratamiento
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
